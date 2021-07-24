plugins {
  kotlin("jvm") version "1.5.21"
  id("net.serenity-bdd.aggregator") version "2.4.24"
}

defaultTasks("clean", "test", "aggregate")

repositories {
  mavenLocal()
  mavenCentral()
}

buildscript {
  repositories {
    mavenLocal()
    mavenCentral()
  }
  dependencies {
    classpath("net.serenity-bdd:serenity-gradle-plugin:2.4.24")
  }
}

java {
  sourceCompatibility = JavaVersion.VERSION_11
  targetCompatibility = JavaVersion.VERSION_11
}

dependencies {
  val serenityCore = "2.4.24"
  val serenityCucumber = "2.4.24"
  val junit = "4.13.1"
  val assertJ = "3.8.0"
  val logback = "1.2.3"

  implementation("ch.qos.logback:logback-classic:${logback}")

  testImplementation("net.serenity-bdd:serenity-core:${serenityCore}")
  testImplementation("net.serenity-bdd:serenity-cucumber6:${serenityCucumber}")
  testImplementation("net.serenity-bdd:serenity-screenplay:${serenityCore}")
  testImplementation("net.serenity-bdd:serenity-screenplay-webdriver:${serenityCore}")
  testImplementation("net.serenity-bdd:serenity-ensure:${serenityCore}")
  testImplementation("junit:junit:${junit}")
  testImplementation("org.assertj:assertj-core:${assertJ}")
}

tasks {
  test {
    testLogging.showStandardStreams = true
    finalizedBy("aggregate")
  }
}

gradle.startParameter.isContinueOnFailure = true
