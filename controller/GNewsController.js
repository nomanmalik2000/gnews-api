const { default: axios } = require("axios");
require("dotenv").config();
const { GNEWS_API_KEY } = process.env;
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "data", "./../../articleCache.txt");
const GNEWS_BASE_URL = "https://gnews.io/api/v4";

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "{}");
}
// creating read stream
const articleReadStream = fs.createReadStream(filePath);
let articleCache = "";
articleReadStream.on("readable", () => {
  const data = articleReadStream.read();

  if (data) {
    articleCache += data;
  }
});
articleReadStream.on("end", (data) => {
  articleCache = JSON.parse(articleCache);
  console.log("read all data");
});

const fetchArticles = async (req, res, next) => {
  try {
    const { count, keyword, title } = req.query;
    let inCache = articleCache[keyword];
    if (!inCache) {
      // creating a write stream
      const articleWriteStream = fs.createWriteStream(filePath);

      // creating request params
      const articleCount = count > 10 ? 10 : count;
      const title_search = title == "true" || false;
      const url = `${GNEWS_BASE_URL}/search?q=${keyword}&max=${articleCount}${
        title_search ? `&in=title` : ""
      }&apikey=${GNEWS_API_KEY}`;
      let articles = await axios.get(url);

      //   add data to cache
      articleCache[keyword] = articles.data.articles;
      articleWriteStream.write(JSON.stringify(articleCache));
      articleWriteStream.end();

      return res.send({ data: articles.data });
    }

    return res.send({ data: { ...inCache }, cached: true });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  fetchArticles,
};
