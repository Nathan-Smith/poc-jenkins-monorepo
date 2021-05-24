import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import org.sonatype.nexus.blobstore.api.BlobStoreManager
import org.sonatype.nexus.security.realm.RealmManager
import org.sonatype.nexus.security.user.User
import org.sonatype.nexus.security.user.UserSearchCriteria

def payload = new Payload(new JsonSlurper().parseText(args as String))
// HTTP Response Body, that will be seriailsed into JSON
def response = [
  repositories: []
]

// Download dependencies doesn't require any User Authentication, access is controlled by the availablility of Nexus to CI/CD and local development environments.
security.setAnonymousAccess(true)

def realmManager = container.lookup(RealmManager.class.getName()) as RealmManager
// Enable authentication via NPM CLI
realmManager.enableRealm("NpmToken", true)
// Enable authentication via Docker CLI
realmManager.enableRealm("DockerToken", true)

// Provision Admin Users (if not already provisioned), what Admin Users provisioned is specified in NEXUS_ADMIN_USERS in the .env file
response.adminUsers = addUsers(payload.adminUsers, ['nx-admin'])

// Provision the Developer Role (if not already provisioned)
if (!hasRole('developer')) {
  security.addRole(
    'developer',
    'Developer',
    'User with privileges to allow read access to repo content and health check',
    ['nx-healthcheck-read', 'nx-healthcheck-summary-read'],
    ['nx-anonymous']
  )
  log.info('Role developer created')
} else {
  log.info('Role developer already exists')
}

// Provision the Deployer Role (if not already provisioned)
if (!hasRole('deployer')) {
  security.addRole(
    'deployer',
    'Deployer',
    'User with privileges to allow deployment all repositories',
    ['nx-repository-view-*-*-add', 'nx-repository-view-*-*-edit'],
    ['developer']
  )
  log.info('Role deployer created')
} else {
  log.debug('Role deployer already exists')
}

// Provision Deployer Users (if not already provisioned), what Deployer Users provisioned is specified in NEXUS_DEPLOYER_USERS in the .env file
response.deployerUsers = addUsers(payload.deployerUsers, ['deployer'])

// Change Default Admin Password
security.securitySystem.changePassword('admin', payload.adminPassword)
log.info('default password for admin changed')


// Provision NPM repositories
def newRepos = []
if (!repository.repositoryManager.exists('npmjs-org')) {
  newRepos << repository.createNpmProxy('npmjs-org', 'https://registry.npmjs.org')
}
if (!repository.repositoryManager.exists('npm-internal')) {
  newRepos << repository.createNpmHosted('npm-internal')
}
if (!repository.repositoryManager.exists('npm-all')) {
  newRepos << repository.createNpmGroup('npm-all', ['npmjs-org', 'npm-internal'])
}

// Provision Docker hosted repo and expose via https to allow deployments
if (!repository.repositoryManager.exists('docker-internal')) {
  newRepos << repository.createDockerHosted('docker-internal', null, 8082)
}

// Provision Docker proxy repo of Docker Hub and enable v1 to get search to work
// no ports since access is only indirectly via group
if (!repository.repositoryManager.exists('docker-hub')) {
  newRepos << repository.createDockerProxy('docker-hub',
    'https://registry-1.docker.io',
    'HUB',
    null,
    null,
    null,
    BlobStoreManager.DEFAULT_BLOBSTORE_NAME,
    true,
    true
  )
}

// Provision Docker group and allow access via https
if (!repository.repositoryManager.exists('docker-all')) {
  newRepos << repository.createDockerGroup('docker-all', null, 18443, ['docker-hub', 'docker-internal'], true)
}

// Record what repositories have been provisioned
newRepos.each {
  response.repositories << [name: it.name, url: it.url]
}

log.info('Script core completed successfully')

return JsonOutput.toJson(response)

class Payload {
  class User {
    String username
    String firstname
    String lastname
    String email
    String password

    User(Object map) {
      username = map.username
      firstname = map.firstname
      lastname = map.lastname
      email = map.email
      password = map.password
    }
  }

  List<User> adminUsers
  List<User> deployerUsers
  String adminPassword

  Payload(Object map) {
    adminPassword = map.adminPassword
    adminUsers = map.adminUsers.collect { new User(it) }
    deployerUsers = map.deployerUsers.collect { new User(it) }
  }
}

// Provisions a User if not already present in Nexus 3
User addUser(Payload.User user, List<String> roles) {
  if (security.securitySystem.searchUsers(new UserSearchCriteria(user.username)).size() > 0) {
    log.info("User ${user.username} already exists")
    return security.securitySystem.getUser(user.username)
  }
  def createdUser = security.addUser(user.username, user.firstname, user.lastname, user.email, true, user.password, roles)
  log.info("User ${user.username} created")
  return createdUser
}

List<User> addUsers(List<Payload.User> users, List<String> roles) {
  users.collect { addUser(it, roles) }
}

Boolean hasRole(String roleId) {
  security.securitySystem.listRoles().find { it.roleId == roleId } != null
}
