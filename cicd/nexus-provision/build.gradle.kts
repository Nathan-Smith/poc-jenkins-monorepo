plugins {
  groovy
}

group = "nathan-smith.poc-jenkins-repo.nexus-provision"
version = "0.1.0-rc.0"

description = "Nexus 3 Provision"

repositories {
  mavenCentral()
}

dependencies {
  val nexus = "3.30.1-01"
  implementation("org.sonatype.nexus:nexus-core:$nexus")
  implementation("org.sonatype.nexus:nexus-script:$nexus")
  implementation("org.sonatype.nexus:nexus-security:$nexus")
  implementation("org.sonatype.nexus:nexus-repository:$nexus")
  implementation("org.sonatype.nexus.plugins:nexus-repository-maven:$nexus")
  implementation("org.sonatype.nexus.plugins:nexus-script-plugin:$nexus")
}
