import org.springframework.boot.gradle.tasks.bundling.BootJar

val coroutinesVersion: String by rootProject
val jacodbVersion: String = "1.0-SNAPSHOT"

plugins {
    id("org.springframework.boot") version "2.7.5"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
}

dependencies {
    implementation(project(":frontend"))

    implementation(group = "org.jacodb", name = "jacodb-api", version = jacodbVersion)
    implementation(group = "org.jacodb", name = "jacodb-core", version = jacodbVersion)

    implementation(group = "org.jetbrains.kotlinx", name = "kotlinx-coroutines-reactor", version = coroutinesVersion)

    implementation(group = "org.springframework.boot", name = "spring-boot-starter-web")
    implementation(group = "org.springframework.boot", name = "spring-boot-starter-json")
    implementation(group = "org.springframework.boot", name = "spring-boot-starter-webflux")
    implementation(group = "org.glassfish.jersey.media", name = "jersey-media-multipart")
    implementation(group = "org.springdoc", name = "springdoc-openapi-ui", version = "1.6.13")
    implementation(group = "org.springdoc", name = "springdoc-openapi-kotlin", version = "1.6.13")

    implementation(group = "com.fasterxml.jackson.module", name = "jackson-module-kotlin", version = "2.13.1")
    implementation(group = "com.github.ajalt.clikt", name = "clikt", version = "3.2.0")

    annotationProcessor(group = "org.springframework.boot", name = "spring-boot-configuration-processor")
}

tasks.named<BootJar>("bootJar") {
//    dependsOn("copySite")
    from(rootProject.file("frontend/build/generated-resources"))
    archiveFileName.set("jacodb-site.jar")
}

tasks