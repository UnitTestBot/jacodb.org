const path = require("path");
const fs = require("fs");
const lunr = require("lunr");
const cheerio = require("cheerio");


// Change these constants to suit your needs
const HTML_FOLDER = "../docs";  // folder with your HTML files
// Valid search fields: "title", "description", "keywords", "body"
const SEARCH_FIELDS = ["title", "description", "keywords", "body"];
const EXCLUDE_FILES = [];
const MAX_PREVIEW_CHARS = 275;  // Number of characters to show for a given search result
const OUTPUT_INDEX = "lunr-index.js";  // Index file


function isHtml(filename) {
    lower = filename.toLowerCase();
    return lower.endsWith("/index.html") || lower.endsWith("\index.html");
}


function findHtml(folder) {
    if (!fs.existsSync(folder)) {
        console.log("Could not find folder: ", folder);
        return;
    }

    const files = fs.readdirSync(folder);
    const htmls = [];
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(folder, files[i]);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            const recursed = findHtml(filename);
            for (let j = 0; j < recursed.length; j++) {
                recursed[j] = path.join(files[i], recursed[j]).replace(/\\/g, "/");
            }
            htmls.push.apply(htmls, recursed);
        }
        else if (isHtml(filename) && !EXCLUDE_FILES.includes(files[i])) {
            htmls.push(files[i]);
        }
    }
    return htmls;
}


function readHtml(root, file, fileId) {
    const filename = path.join(root, file);
    const txt = fs.readFileSync(filename).toString();
    const $ = cheerio.load(txt);
    let title = $("title").text();
    if (typeof title == 'undefined') title = file;
    let description = $("meta[name=description]").attr("content");
    if (typeof description == 'undefined') description = "";
    let keywords = $("meta[name=keywords]").attr("content");
    if (typeof keywords == 'undefined') keywords = "";
    let body = $("body").text();
    if (typeof body == 'undefined') body = "";
    return {
        "id": fileId,
        "link": file,
        "t": title,
        "d": description,
        "k": keywords,
        "b": body
    };
}


function buildIndex(docs) {
    return lunr(function () {
        this.ref('id');
        for (let i = 0; i < SEARCH_FIELDS.length; i++) {
            this.field(SEARCH_FIELDS[i].slice(0, 1));
        }
        docs.forEach(function (doc) {
            this.add(doc);
        }, this);
    });
}


function buildPreviews(docs) {
    const result = {};
    for (let i = 0; i < docs.length; i++) {
        const doc = docs[i];
        let preview = doc["d"];
        if (preview == "") preview = doc["b"];
        if (preview.length > MAX_PREVIEW_CHARS)
            preview = preview.slice(0, MAX_PREVIEW_CHARS) + " ...";
        result[doc["id"]] = {
            "t": doc["t"],
            "p": preview,
            "l": doc["link"]
        }
    }
    return result;
}


function main() {
    files = findHtml(HTML_FOLDER);
    const docs = [];
    console.log("Building index for these files:");
    for (let i = 0; i < files.length; i++) {
        console.log("    " + files[i]);
        docs.push(readHtml(HTML_FOLDER, files[i], i));
    }
    const idx = buildIndex(docs);
    const previews = buildPreviews(docs);
    const js = `
        export default {
            LUNR_DATA: ${JSON.stringify(idx)},
            PREVIEW_LOOKUP: ${JSON.stringify(previews)}
        };
    `;
    fs.writeFile(OUTPUT_INDEX, js, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Index saved as " + OUTPUT_INDEX);
    });
}

main();