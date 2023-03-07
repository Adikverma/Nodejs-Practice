const http = require("http");
const fs = require("fs");
const url = require("url");

const fillTemplate = require("./Modules/fillTemplate.js");

const overviewTemp = fs.readFileSync(
  `${__dirname}/templates/Template_Overview.html`,
  "utf-8"
);
const cardTemp = fs.readFileSync(
  `${__dirname}/templates/Template_Cards`,
  "utf-8"
);
const productTemp = fs.readFileSync(
  `${__dirname}/templates/Template_Product.html`,
  "utf-8"
);

const json = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const jsonObject = JSON.parse(json);

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/OVERVIEW") {
    res.writeHead(200, {
      "constent-type": "text/html",
    });
    const cards = jsonObject.map((el) => fillTemplate(cardTemp, el)).join("");
    const html = overviewTemp.replace("{%PRODUCT_CARDS%}", cards);
    res.end(html);
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "constent-type": "text/html",
    });
    const product = jsonObject[query.id];
    const html = fillTemplate(productTemp, product);
    res.end(html);
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(dataAPI);
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to the req on the port 8000");
});
