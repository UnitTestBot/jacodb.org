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

    private val domain = "https://jacodb.org"

    @GetMapping(produces = ["application/xml"])
    fun main(): XmlUrlSet {
        val xmlUrlSet = XmlUrlSet()
        for (eachLink in Navigation.urls) {
            create(xmlUrlSet, eachLink)
        }
        return xmlUrlSet
    }

    private fun create(xmlUrlSet: XmlUrlSet, link: String) {
        xmlUrlSet.addUrl(XmlUrl(domain + link))
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

    var loc: String? = null
        private set

    var lastmod: String? = null
        private set

    constructor(loc: String?) {
        this.loc = loc
        setLastmod()
    }

    private fun setLastmod() {
        lastmod = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))
    }
}