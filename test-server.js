const http = require("http")
const url = require("url")
const fs = require("fs")

http.createServer(function (request, response) {
	const requestedPath = url.parse(request.url, true).pathname

	switch (requestedPath) {
		case "":
		case "/":
		case "/index.html":
			response.writeHead(200, { "Content-Type": "text/html" })

			fs.readFile("./index.html", function(error, filecontent) {
				response.write(filecontent)
				response.end()
			})

			break

		case "/all-words.js":
			response.writeHead(200, { "Content-Type": "application/javascript" })

			response.write("const ENGLISH_WORDS = " + JSON.stringify([ "cat", "dog", "camel" ]))
			response.end()

			break

		default:
			response.writeHead(404, { "Content-Type": "text/plain" })
			response.write("404 Not Found")
			response.end()
			break
	}
}).listen(80, "0.0.0.0")
