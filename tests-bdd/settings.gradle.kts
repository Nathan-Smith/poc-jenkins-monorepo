pluginManagement {
  repositories {
    mavenLocal()
    mavenCentral()
    gradlePluginPortal()
  }
  resolutionStrategy {
    eachPlugin {
      if(requested.id.id == "net.serenity-bdd.aggregator") {
        useModule("net.serenity-bdd:serenity-gradle-plugin:${requested.version}")
      }
    }
  }
}
