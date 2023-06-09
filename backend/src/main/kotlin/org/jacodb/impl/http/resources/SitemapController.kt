package org.jacodb.impl.http.resources

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate
import java.time.format.DateTimeFormatter


@RestController
@RequestMapping("/sitemap.xml")
class SitemapController {
    companion object {
        val urls = listOf(
            "/",
            "/migration",
            "/about",
            "/getting-started/introduction",
            "/getting-started/control-flow-graph",
            "/getting-started/available-features",
            "/getting-started/benchmarks",
            "/getting-started/types-classes",
            "/api-ref/api-reference",
            "/api-ref/instructions-and-graphs",
            "/analysis/overview",
        )
    }

    private val domain = "https://jacodb.org"

    @GetMapping(produces = ["application/xml"])
    fun main(): XmlUrlSet {
        val xmlUrlSet = XmlUrlSet()
        for (eachLink in urls) {
            create(xmlUrlSet, eachLink, XmlUrl.Priority.HIGH)
        }
        return xmlUrlSet
    }

    private fun create(xmlUrlSet: XmlUrlSet, link: String, priority: XmlUrl.Priority) {
        xmlUrlSet.addUrl(XmlUrl(domain + link, priority))
    }
}

@JacksonXmlRootElement(localName = "urlset", namespace = "https://www.sitemaps.org/schemas/sitemap/0.9")
class XmlUrlSet {

    @JacksonXmlProperty(localName = "url")
    @JacksonXmlElementWrapper(useWrapping = false)
    private val xmlUrls: MutableCollection<XmlUrl> = ArrayList()

    fun addUrl(xmlUrl: XmlUrl) {
        xmlUrls.add(xmlUrl)
    }

    fun getXmlUrls(): Collection<XmlUrl> {
        return xmlUrls
    }
}

class XmlUrl {

    enum class Priority(val value: String) {
        HIGH("1.0"), MEDIUM("0.5")
    }

    var loc: String? = null
        private set

    var lastmod: String? = null
        private set

    val changefreq = "weakly"

    var priority: String? = null
        private set

    constructor(loc: String?, priority: Priority) {
        this.loc = loc
        this.priority = priority.value
        setLastmod()
    }

    private fun setLastmod() {
        lastmod = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))
    }
}