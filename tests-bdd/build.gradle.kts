plugins {
  `java-library`
  kotlin("jvm") version "1.5.21"
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



apply(plugin = "java")
apply(plugin = "eclipse")
apply(plugin = "idea")
apply(plugin = "net.serenity-bdd.aggregator")

java {
  sourceCompatibility = JavaVersion.VERSION_11
  targetCompatibility = JavaVersion.VERSION_11
}

dependencies {
  val slf4jVersion = "1.7.7"
  val serenityCoreVersion = "2.4.24"
  val serenityCucumberVersion = "2.4.24"
  val junitVersion = "4.13.1"
  val assertJVersion = "3.8.0"
  val logbackVersion = "1.2.3"

  "implementation"("ch.qos.logback:logback-classic:${logbackVersion}")

  "testImplementation"("net.serenity-bdd:serenity-core:${serenityCoreVersion}")
  "testImplementation"("net.serenity-bdd:serenity-cucumber6:${serenityCucumberVersion}")
  "testImplementation"("net.serenity-bdd:serenity-screenplay:${serenityCoreVersion}")
  "testImplementation"("net.serenity-bdd:serenity-screenplay-webdriver:${serenityCoreVersion}")
  "testImplementation"("net.serenity-bdd:serenity-ensure:${serenityCoreVersion}")
  "testImplementation"("junit:junit:${junitVersion}")
  "testImplementation"("org.assertj:assertj-core:${assertJVersion}")
}

tasks {
  test {
    testLogging.showStandardStreams = true
//    systemProperties(System.getProperties())
  }
}

//gradle.startParameter.continueOnFailure = true

//test.finalizedBy(aggregate)
