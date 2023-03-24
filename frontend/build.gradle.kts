plugins {
    id("com.github.node-gradle.node") version "3.5.1"
}

node {
    download.set(true)
    version.set("16.19.0")
}

//
////tasks.register<Copy>("distFrontend") {
////    dependsOn("yarn_install")
////    dependsOn("yarn_build")
////
////    from("dist")
////    into("idea-community/unzip")
////}
//
//tasks.clean.configure {
//    delete("dist")
//    delete("build")
//}
//
tasks.register("buildFrontend").configure {
    dependsOn("yarn_install")
    dependsOn("yarn_build")
}