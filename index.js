const { Octokit } = require("@octokit/core");
const Discord = require("discord.js");
const {suggest} = require("./suggest");
var hfbot = new Discord.Client();

hfbot.once('ready', () => {
    hfbot.user.setActivity("Watching out for :q help")
    for (var n of hfbot.guilds.cache)
    {
        console.log("i am in",n[1].name)
    }
	console.log('Ready!');
});

const octokit = new Octokit({ auth: `hacktoberbot 1.0` });

function help(message)
{
    message.channel.send(
        "Hello, I am Hacktoberbot\n\
Send a message with\n\
```\
:q repo_owner/repo_name\
```\
**or**\n\
```\
:q <SLAP_THE_GITHUB_LINK_HERE>\
    ```\
\nIf you face issues it might be due to GitHub API rate limits.")
}

hfbot.on('message', async (msg) => {
    var content = msg.content;
    if (content.startsWith(':')) {
        
        content = content.slice(1,content.length).split(' ') // Remove the colon and split the rest by ' '

        switch(content[0]) {
            case "q":
                const repo = content[1];
                if (repo == "help")
                {
                    help(msg);
                    
                    return;
                }

                if (!repo) { // Just so that no one is messing around
                    return
                }

                var owner;
                var repos;
                if (content[1].startsWith("https")) {
                    owner = content[1].slice("https://github.com/".length, content[1].length).split("/")[0]
                    repos = content[1].slice("https://github.com/".length, content[1].length).split("/")[1]
                } else {
                    owner = content[1].split('/')[0]
                    repos = content[1].split('/')[1]
                }
                var resp = await octokit.request('GET /repos/{owner}/{repo}/topics', { // make an request to the github api
                        owner: owner,                                                  // You will have to authenticate to have have higher rate
                        repo: repos,
                        mediaType: {
                        previews: [
                            'mercy'
                        ]
                    }
                });
                
                const topics = resp["data"]["names"]; // this is the array of topics
                for (var topic of topics) { // topics.includes didn't work
                    console.log(topic)
                    if (topic == "hacktoberfest" || topic == "hacktoberfest2020") {
                        msg.channel.send(`Yep\n`)
                        return;
                    }
                    else {
                        continue;  
                    }
                }
                msg.channel.send('Nope\n');
            break;

            case "suggest":
                await suggest(msg)
                break;
        }
    }
})

hfbot.login(require("./auth.json")["token"] || process.env.TOKEN);