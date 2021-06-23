const http = require("http");
const querystring = require("querystring");
const discord = require("discord.js");
//const config = require('./config.json')
const client = new discord.Client();
//const config = require("config.json");

//const math = require("discord-math");
const math = Math.floor(Math.random() * 100);
//const channel = await client.channels.fetch(process.env.CHANNEL_ID);
//const channel = client.channels.fetch('rocess.env.CHANNEL_ID')
//HTTP SERVER
http.createServer(function(req, res) {
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

//LOGIN CHECK
client.once("ready", () => {
  console.log(`Bot ready down! ${client.user.tag}!`);
  client.user.setPresence({ game: { name: "◆!help" } });
});

//LISTEN MESSAGE
client.on("message", msg => {
  //LET
  //let args = msg.content.substring(PREFIX.length).split(" ")
  //let person = msg.guild.member(msg.mentions.users.first())
  //let time = args[2]
  var names = ["kaspa", "kurts", "if", "px"];
  var answers = ["ok!", "opps!!", "oh!", "33"];
  // var randomAnswer = names[math.floor(math.radom()*names.length)]+answers[math.floor(math.random()*answers.length)];
  //var randomAnswer = names[math.floor(math.radom() * names.length)];
  //LOG MESSAGE
  //console.log(msg.content);
  //ignore author name
  if (msg.author.id == client.user.id) {
    return;
  }
  if (msg.isMemberMentioned(client.user)) {
    sendReply(msg, "呼びましたか？");
    return;
  }
  if (msg.content.match(/にゃ～ん|にゃーん|hi/)) {
    let text = "にゃ～ん";
    sendMsg(msg.channel.id, text);
    return;
  }
  //mention someone
  if (msg.content === "ping") {
    msg.channel.send('speed is '+client.ping +' ms');
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
  if (msg.content === "play") {
  //  console.log(randomAnswer);
  }
  if (msg.content === "avatar") {
   // msg.reply(msg.author.displayAvatarURL());
  //  I am ${client.user.tag}.
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
