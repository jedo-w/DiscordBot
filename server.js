const http = require("http");
const querystring = require("querystring");
const discord = require("discord.js");
const client = new discord.Client(); //the bot
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
      res.end("Discord Bot is active now!\n");
    }
  })
  .listen(3000);

//LOGIN CHECK HERE
client.once("ready", () => {
  console.log(`Bot ready down! @ ${client.user.tag}`);
  client.user.setPresence({ game: { name: "◆!help" } }); //the player status
});
//CLEAR INIT HERE
// thinking...
//TIMER INTERVAL HERE
var sec = 1;
const timerID = function() {
  //function code here
  sec = sec + 1;
  console.log("foo:" + sec + "◆" + Math.random());
  //client.channels.get(CHANNEL_ID).send("hello world")
  client.channels
    .get(process.env.CHANNEL_ID)
    .send("◆Passing time is \n" + sec * 10 + " sec \n◆Take a break◆");
  //show boss time here
  //
  //
};
//run function timerID
setInterval(timerID, 10000); //60sec

//LISTEN MESSAGE HERE
client.on("message", msg => {
  //ignore if the message is not form specific channel
  if (msg.channel.id != process.env.BOSS_CHANNEL_ID) {
    return;
  }
  //ignore if the message is form the bot
  if (msg.author.id == client.user.id) {
    return;
  }
  //TIMER SET INTERVAL(just for test)
  var sec = 1;
  const timerID = setInterval(function() {
    sec = sec + 1;
    client.channels
      .get(process.env.CHANNEL_ID)
      .send(msg.author + "say:" + sec + "sec◆" + Math.random()); //send message to the channel
    if (sec >= 10) {
      clearInterval(timerID); //clear timer
    }
  }, 1000);

  if (msg.isMemberMentioned(client.user)) {
    //function here
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
    Hi,${msg.author}
    form:${client.users.get(msg.author.id).username}◆!!
    I am ${client.user.tag}.
    Here is #Channel# ${client.channels.get(process.env.CHANNEL_ID).name}`); //send to target channel
    //write msg name & message & time to google spreed sheet
    return;
  }
  //random arry emoji
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

    return;
  }
  //fruit emoji
  if (msg.content === "fruit") {
    msg.react("🍎");
    msg.react("🍊");
    msg.react("🍇");
    return;

    //msg.react(":poop:");
    //msg.react('396548322053062656');
    //const reactionEmoji = client.emojis.cache.get(this.emojiID);
    //msg.react(reactionEmoji);
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
    return;
  }
  if (msg.content === "kick") {
    msg.reply("why did you kick me!");
    //msg.channels.get(8xxxxx4).send('猫です')
    return;
  }
  if (msg.content === "moji") {
    //syntax highlighting
    const moji = '```python\n pint("Hellow World")```';
    msg.channel.send(moji);
    console.log(moji.charAt(3) + moji.charAt(4)); // string [0][1][2][3][4]
    console.log(moji.length); // string [0][1][2][3][4]
    console.log(`Message: ${msg}`);
    //this part is mad...
    msg
      .react("😄")
      .then(() => console.log(`sent a reply to ${msg.author.username}`))
      .catch(console.error);

    //msg.channel.send("<:bat_food_full:786954379223367710>");

    var color = 1023012 * Math.random();
    msg.channel.send({
      embed: {
        color: color,
        description: "やっはろー" + "★" + color
      }
    });
  }

  if (msg.content === "file") {
    //made a form with random color
    var inline = new Boolean(false);
    var color = 7506394 * Math.random();
    console.log("color:" + color.valueOf());
    console.log("inline:" + inline.valueOf());
    //embed fileds
    msg.channel.send({
      embed: {
        color: color,
        fields: [
          {
            name: "field :one:",
            value: "1つめのfieldだよ",
            inline: inline
          },
          {
            name: "field :two:",
            value: "2つめのfieldだよ",
            inline: inline
          },
          {
            name: "field :three:",
            value: "3つめのfieldだよ",
            inline: inline
          },
          {
            name: "field :four:",
            value: "4つめのfieldだよ",
            inline: inline
          },
          {
            name: "field :five:",
            value: "5つめのfieldだよ",
            inline: inline
          },
          {
            name: "field :six:",
            value: "6つめのfieldだよ",
            inline: inline
          }
        ]
      }
    });
    return;
  }

  if (msg.content === "joke") {
    const jokes = [
      "I went to a street where the houses were numbered 8k, 16k, 32k, 64k, 128k, 256k and 512k. It was a trip down Memory Lane.",
      "“Debugging” is like being the detective in a crime drama where you are also the murderer.",
      "The best thing about a Boolean is that even if you are wrong, you are only off by a bit.",
      "A programmer puts two glasses on his bedside table before going to sleep. A full one, in case he gets thirsty, and an empty one, in case he doesn’t.",
      "If you listen to a UNIX shell, can you hear the C?",
      "Why do Java programmers have to wear glasses? Because they don’t C#.",
      "What sits on your shoulder and says “Pieces of 7! Pieces of 7!”? A Parroty Error.",
      "When Apple employees die, does their life HTML5 in front of their eyes?",
      "Without requirements or design, programming is the art of adding bugs to an empty text file.",
      "Before software can be reusable it first has to be usable.",
      "The best method for accelerating a computer is the one that boosts it by 9.8 m/s2.",
      "I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing.",
      "There are two ways to write error-free programs; only the third one works."
    ];
    var num = Math.floor(Math.random() * jokes.length);
    msg.channel.send("【" + num + "】");
    msg.channel.send(jokes[num]);
  }

  //--------------------------
}); //END OF MESSAGE

//DISCORD TOKEN THAT SET IN PROCESS.ENV FILE
if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("DISCORD_BOT_TOKEN is not be setting!! please check .env file.");
  process.exit(0);
}
//DISCORD TOKEN THAT SET IN PROCESS.ENV FILE
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
