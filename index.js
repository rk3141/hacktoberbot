const { Octokit } = require("@octokit/core");
const Discord = require("discord.js");
var hfbot = new Discord.Client()
var unirest = require('unirest');

hfbot.once('ready', () => {
	console.log('Ready!');
});
const octokit = new Octokit({ auth: `` });
hfbot.on('message', async (msg) => {
    var content = msg.content;
    if (content.startsWith(':')) {
        content = content.slice(1,content.length).split(' ')
        switch(content[0]) {
            case "q":
                const repo = content[1];
                if (!repo) {
                    return
                }
                var resp = await octokit.request('GET /repos/{owner}/{repo}/topics', {
                        owner: content[1].split('/')[0],
                        repo: content[1].split('/')[1],
                        mediaType: {
                        previews: [
                            'mercy'
                        ]
                    }
                });
                
                const topics = resp["data"]["names"];
                for (var topic of topics)
                    if (topic == "hacktoberfest" || topic == "hacktoberfest2020") {
                        msg.channel.send(`Yep`)
                        return;
                    }
                    else {
                        continue;                
                    }
            break;
        }
    }
})

hfbot.login(require("./auth.json")["token"]);