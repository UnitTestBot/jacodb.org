package org.jacodb.impl.http.resources

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import javax.xml.bind.annotation.XmlAccessType
import javax.xml.bind.annotation.XmlAccessorType
import javax.xml.bind.annotation.XmlElement
import javax.xml.bind.annotation.XmlElements
import javax.xml.bind.annotation.XmlRootElement


@Controller
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

    @GetMapping("/sitemap.xml")
    @ResponseBody
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

@XmlAccessorType(value = XmlAccessType.NONE)
@XmlRootElement(name = "urlset", namespace = "https://www.sitemaps.org/schemas/sitemap/0.9")
class XmlUrlSet {

    @XmlElements(XmlElement(name = "url", type = XmlUrl::class))
    private val xmlUrls: MutableCollection<XmlUrl> = ArrayList()

    fun addUrl(xmlUrl: XmlUrl) {
        xmlUrls.add(xmlUrl)
    }

    fun getXmlUrls(): Collection<XmlUrl> {
        return xmlUrls
    }
}

@XmlAccessorType(value = XmlAccessType.NONE)
@XmlRootElement(name = "url")
class XmlUrl {

    enum class Priority(val value: String) {
        HIGH("1.0"), MEDIUM("0.5")
    }

    @XmlElement
    var loc: String? = null
        private set

    @XmlElement
    var lastmod: String? = null
        private set

    @XmlElement
    val changefreq = "weakly"

    @XmlElement
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