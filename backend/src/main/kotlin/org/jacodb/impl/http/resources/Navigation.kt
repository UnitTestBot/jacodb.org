package org.jacodb.impl.http.resources

object Navigation {
    private val documentation = listOf(
        "installation",
        "basic-usage",
        "database-features",
        "classpath-features",
        "instructions",
        "graphs",
        "migration",
        "ifds"
    ).map { "/documentation/$it" }

    private val usageExamples = listOf(
        "type-solving",
        "approximations",
        "symbolic-execution"
    ).map { "/usage-examples/$it" }

    private val about = listOf(
        "about-the-project",
        "benchmarking"
    ).map { "/about/$it" }

    val urls = documentation + about + usageExamples

}