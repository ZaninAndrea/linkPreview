const request = require("request")
const cheerio = require("cheerio")

// finds title in the DOM passed
const findTitleInDom = ($dom) => {
    return $dom("meta[property='og:title']").attr("content") ||
		$dom("title").text() ||
		$dom("meta[name=title]").attr("content");
}

// finds description in the DOM passed
const findDescriptionInDom = ($dom) => {
    return $dom("meta[property='og:description']").attr("content") ||
		$dom("meta[name=description]").attr("content") ||
		$dom("div .description").text();
}

// finds image in the DOM passed
const findImageInDom = ($dom) => {
    var imageSrc = $dom("meta[property='og:image']").attr("content") ||
		$dom("meta[itemprop=image]").attr("content") ||
		$dom("link[rel=image_src]").attr("content") ||
		$dom("img").attr("src")
    return imageSrc;
}

// const validateUrl = (value) => (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9:%._\+~#=^@]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9:%_\+.~#?&//=^@]*)/g).test(value)

const generatePreview = (url, format, callback) => {
    // fetches the provided url
    if (!url){
            callback(JSON.stringify({error:"No url provided"}))     
    }
    request(url, function(error, response, body) {
        if (!error) {
            const $dom = cheerio.load(body)
            const descr = findDescriptionInDom($dom)
            let title = findTitleInDom($dom)
            title = title ? title : url
            let img = findImageInDom($dom)
            img = img ?
                  img.startsWith('/') ? (url.endsWith('/') ? url.substr(0,url.length-1): url)+img : img
                : url.endsWith("/") ? url+"favicon.ico" : url+"/favicon.ico"

          if (format=="json"){
            callback(JSON.stringify({title:title, description: descr, image:img}))
          }else{
            const html = `<div class="linkPreviewContainer">
                <a href="${url}" data-href="${url}" title="${url}" rel="nofollow" target="_blank" class="linkPreviewText">
                    <strong>${title}</strong><br>
                    <em>${descr}</em>${url}</a>
                <a
                    href="${url}" class="linkPreviewImage" target="_blank" style="background-image: url(${img}); background-color: #eee8d5"></a>
            </div>`

            callback(html)
          }            
        } else {
            // if the fetch fails (no internet connection or dead link) return a plain link
          if (format=="json"){
            console.log(error)
            callback(JSON.stringify({error:"Url not found"}))
          }
          else{
            const html = `<div class="linkPreviewContainer">
                <a href="${url}" data-href="${url}" title="${url}" rel="nofollow" target="_blank" class="linkPreviewText">
                    <strong>${url}</strong><br>
                    <em></em></a>
                <a
                    href="${url}" class="linkPreviewImage" target="_blank"></a>
            </div>`
            console.log(error)
            callback(html)
          }            
        }
    });
}

module.exports = generatePreview
