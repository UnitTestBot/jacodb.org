plugins {
    id("com.github.node-gradle.node") version "3.5.1"
}

node {
    download.set(true)
    version.set("16.19.0")
}

tasks.register<Copy>("buildAndPrepareSite") {
    dependsOn("yarn_build")
    from("public")
    into("build/generated-resources/main/static/")
}

tasks.jar.configure {
    dependsOn("buildAndPrepareSite")
}