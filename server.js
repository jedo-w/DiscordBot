const http = require("http");
const querystring = require("querystring");
const discord = require("discord.js");
//const config = require('./config.json')
const client = new discord.Client();
//onst config = require("config.json");

//const math = require("discord-math");
//const math = Math.floor(Math.random() * 100);
//const channel = await client.channels.fetch(process.env.CHANNEL_ID);
//const channel = client.channels.fetch('rocess.env.CHANNEL_ID')

//HTTP SERVER HRER
http
  .createServer(function(req, res) {
    if (req.method == "POST") {
      var data = "";
      req.on("data", function(chunk) {
        data += chunk;
      });
      req.on("end", function() {
        if (!data) {
          console.log("No post data");
          res.end();
          return;
        }
        var dataObject = querystring.parse(data);
        console.log("post:" + dataObject.type);
        if (dataObject.type == "wake") {
          console.log("Woke up by post");
          res.end();
          return;
        }
        res.end();
      });
    } else if (req.method == "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Discord Bot is active now\n");
    }
  })
  .listen(3000);

//LOGIN CHECK HERE
client.once("ready", () => {
  console.log(`Bot ready down! ${client.user.tag}!`);
  client.user.setPresence({ game: { name: "◆!help" } });
});

//TIMER INTERVAL HERE
const timer = function() {
  console.log("foo:" + Math.random());
  //client.channels.get(85222222222).send("hello world")
};
setInterval(timer, 10000); //10sec

//LISTEN MESSAGE HERE
client.on("message", msg => {
  //LET
  //let args = msg.content.substring(PREFIX.length).split(" ")
  //let person = msg.guild.member(msg.mentions.users.first())
  //let time = args[2]
  // var randomAnswer = names[math.floor(math.radom()*names.length)]+answers[math.floor(math.random()*answers.length)];
  //var randomAnswer = names[math.floor(math.radom() * names.length)];
  //LOG MESSAGE
  //console.log(msg.content);
  //timer setInterval

  //SET INTERVAL2
  setInterval(function() {
    //console.log("muu:" + Math.random());
    client.channels.get(process.env.CHANNEL_ID).send("say:" + Math.random());
    //client.catch(error => console.error('One failed to interval:', error));
  }, 1000);

  //ignore author name
  if (msg.author.id == client.user.id) {
    return;
  }
  if (msg.isMemberMentioned(client.user)) {
    sendReply(msg, "Did you call me?!");
    //mention the bot
    return;
  }
  if (msg.content.match(/にゃ～ん|にゃーん|hi/)) {
    let text = "にゃ～ん";
    sendMsg(msg.channel.id, text);
    return;
  }
  //mention someone
  if (msg.content === "ping") {
    msg.channel.send("speed is " + client.ping + " ms");
    msg.reply("pong!"); //with mention
    msg.channel.send("pong!"); //without mention
    msg.author.send("This is a dm"); //with a dm
    client.channels.get(process.env.CHANNEL_ID).send(`
    <@${msg.author.id}>
    <@&${msg.author.id}>
    Hi,${client.users.get(msg.author.id).username}! 
    I am ${client.user.tag}.
    Here is #Channel# ${client.channels.get(process.env.CHANNEL_ID).name}`); //send to target channel
    //write msg name & message & time to google spreed sheet
    return;
  }
  //random arry
  if (msg.content === "random") {
    const Responses = ["グー", "チョキ", "パー"];
    const Answer = Math.floor(Math.random() * Responses.length);

    console.log(Responses); //array
    console.log(Math.random()); //use Math.random() to get a random floating point number.
    console.log(Math.floor(Math.random() * Responses.length)); //use Math.floor() to get a integer.
    console.log(Responses[Answer]); //Answer will be 0,1,2,3 that length of Responses array.

    msg.channel.send(Responses[Answer]);
    msg.react("😄");
    msg.react("😄");
    msg.channel.send(
      "1:" +
        Math.random() +
        "2:" +
        Responses.length +
        "3:" +
        Math.random() * Responses.length
    );

    //msg.react(":poop:");
    //msg.react('396548322053062656');
    //const reactionEmoji = client.emojis.cache.get(this.emojiID);
    //msg.react(reactionEmoji);
  }
  //fruit emoji
  if (msg.content === "fruit") {
    msg.react("🍎");
    msg.react("🍊");
    msg.react("🍇");
  }

  if (msg.content === "avatar") {
    // msg.reply(msg.author.displayAvatarURL());
  }
  if (msg.content === "boss") {
    // add boss array here
    var names = ["kaspa", "kurts", "if", "px"];
    var answers = ["ok!", "opps!!", "oh!", "33"];
    msg.channel.send(names);
    msg.channel.send(answers);
  }

  //reply
  if (msg.content === "kick") {
    msg.reply("why did you kick me!");
    //msg.channels.get(8xxxxx4).send('猫です')
  }
});

//TOKEN HERE
if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("DISCORD_BOT_TOKENが設定されていません。");
  process.exit(0);
}

client.login(process.env.DISCORD_BOT_TOKEN);

//FUNCTION HERE

function sendReply(message, text) {
  message
    .reply(text)
    .then(console.log("リプライ送信: " + text))
    .catch(console.error);
}

function sendMsg(channelId, text, option = {}) {
  client.channels
    .get(channelId)
    .send(text, option)
    .then(console.log("メッセージ送信: " + text + JSON.stringify(option)))
    .catch(console.error);
}
