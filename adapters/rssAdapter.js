let Parser = require('rss-parser');
let parser = new Parser();
const rssURL = `https://lawnews385264377.wordpress.com/feed/`

const getFeed = async () => {
    let feed = await parser.parseURL(rssURL);
    return feed;
}

module.exports = {
    getFeed
}