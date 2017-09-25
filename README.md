# Link preview
This webserver renders a link preview by scraping the submitted link.
![screenshot](screenshot.PNG)
## Usage
Make a `GET` request to the server [https://clover-hour.glitch.me/](https://clover-hour.glitch.me/) passing link and format (optional) in the URL query. Format can be either json or html, html by default.

E.g.
[https://clover-hour.glitch.me/?link=https://www.quora.com/&format=json](https://clover-hour.glitch.me/?link=https://www.quora.com/&format=json) returns
```json
{
  "title": "Quora - A place to share knowledge and better understand the world.",
  "description": "",
  "image": "https://www.quora.com/favicon.ico"
}
```

## Style
If you want to use the pre-rendered HTML you should include [this](https://github.com/ZaninAndrea/linkPreview/blob/master/style.css) css in the page
