const fetch = require("node-fetch")

async function suggest(msg) {
    var json = await ((await fetch("https://api.github.com/search/repositories?q=topic:hacktoberfest"))
    .json())

    var repo = json.items[Math.floor(Math.random() * json.items.length)];

    return msg.channel.send(`Here's a repository you can contribute to - https://github.com/${repo.owner.login}/${repo.name}`)
    
}

module.exports = {
    suggest
}