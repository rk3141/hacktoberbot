const fetch = require("node-fetch")

async function suggest(msg) {
    fetch("https://api.github.com/search/repositories?q=topic:hacktoberfest")
    .then(res => res.json())
    .then(json => {

        var i
        var repo
        var array = []

        for(i = 0; i < 20; i++) {
            array.push(json.items[i])
        }

        var repo = array[Math.floor(Math.random() * 20)];

        return msg.channel.send(`Here's a repository you can contribute to - https://github.com/${repo.owner.login}/${repo.name}`)
    })
}

module.exports = {
    suggest
}