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
client.on("ready", () => {
  console.log(`Bot ready down! @ ${client.user.tag}`); //show log
  client.user.setPresence({ game: { name: "◆!help" } }); //the bot'status
});
//VAR WILL BE INIT HERE
// thinking...
//ARRAY match the message maps
let maps = ["AG", "KURTS", "PX"]; //need put this array to a DATABASE.

//TIMER INTERVAL HERE

var sec = 0;
var random = Math.random();
const timerID = function() {
  //function code here
  sec = sec + 1; //take a sec
  console.log(
    "foo:" +
      sec +
      " sec up" +
      "\n◆" +
      Math.random() +
      "\nmaps:" +
      maps.length +
      "\nrandom:" +
      random
  );
  //client.channels.get(CHANNEL_ID).send("hello world")
  client.channels
    .get(process.env.CHANNEL_ID)
    .send("◆uptime is " + sec * 10 + " sec" + "\n◆maps:" + maps.length);
  //show boss list and time here
  //
  //
  //test Date.now
  const startTime = Date.now();
  console.log("stating time..." + startTime);
  setTimeout(() => {
    const millis = Date.now() - startTime;
    console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);
  }, 2000); //every 2sec
};
setInterval(timerID, 60000); //every 60sec run function timerID

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
  //TIMER SET INTERVAL
  //just for test to see how sec moving
  //when message noticed,here will send message to another channel
  //and reply the same message...
  //WAIT FOR ONE SECOND
  console.log("sec[9]:" + sec);
  var sec = 0;
  console.log("sec[1]:" + sec);
  const timerID = setInterval(function() {
    console.log("sec[2]:" + sec);
    sec = sec + 1;
    console.log("sec[3]:" + sec);
    client.channels
      .get(process.env.CHANNEL_ID)
      .send(
        msg.author +
          " " +
          sec +
          " time◆ " +
          "\n You said:『" +
          msg +
          "』\n" +
          Math.random()
      ); //send message to the channel
    console.log("sec[4]:" + sec);
    if (sec >= 10) {
      console.log("sec[5]:" + sec);
      clearInterval(timerID); //if one sec passed the clear timer
      console.log("sec[6]:" + sec);
    }
    console.log("sec[7]:" + sec);
  }, sec * 1000); //wait for 0-4 seconds.
  console.log("sec[8]:" + sec);

  //push pop maps here
  if (msg.content.startsWith("add")) {
    var startTime = Date.now();
    msg.channel.send("msg timestamp:" + msg.createdTimestamp); //created message timestamp
    msg.channel.send("added!" + "date is   :" + `${Date.now()}`); //UTC time
    var ping = startTime - msg.createdTimestamp;
    sendReply(msg, "Add what?" + "\nyour message ping is " + ping + "ms");

    //if add match "DK" then push it into maps[]
    return;
  }
  if (msg.content === "mapadd") {
    //check the response time start
    var startTime = Date.now();
    msg.channel.send("msg timestamp:" + msg.createdTimestamp); //created message timestamp
    msg.channel.send("added!" + "date is   :" + `${Date.now()}`); //UTC time

    //array.push
    maps.push("DK", "ELDER");
    //do shome array option here. delete or rename the list.
    console.log("array length:" + maps.length);
    console.log("array:" + maps);

    //check ping time send to channel
    var ping = startTime - msg.createdTimestamp;
    msg.channel.send(
      "maps length: " + `${maps.length}` + "\narray is   :\n" + `${maps}`
    );
    //array.forEach
    maps.forEach(function(item, index, array) {
      console.log(index, item); //繰り返す文
      //msg.channel.send(`${index}` + " " + `${item}`); //lag very slow...
    });
    msg.channel.send(Object.keys(maps)); //lag very slow...
    msg.channel.send(maps.indexOf("DK")); //

    //end of ping time

    sendReply(msg, "map added!" + "\nyour message ping is " + ping + "ms");
    return;
  }
  if (msg.content === "maps") {
    //  let map = maps[0];
    msg.channel.send(`${maps}`);
    // maps.forEach(function(item, index, array) {
    //   console.log(item, index);
    // });
    //console.log("PUSH:" + maps.length);
    console.log("maps[]:" + maps.length);
    console.log(maps[0], maps[1], maps[2], maps[3], maps[4]);
    //msg.member.roles.cache.map(role=>role.name);
    return;
  }
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
    Here is #Channel# ${client.channels.get(process.env.CHANNEL_ID).name}
    `); //send to target channel
    //write msg name & message & time to google spreed sheet
    return;
  }
  //random arry emoji
  if (msg.content === "random") {
    const Responses = ["グー", "チョキ", "パー"];
    const Answer = Math.floor(Math.random() * Responses.length);

    console.log("Array:" + Responses); //array
    console.log("random:" + Math.random()); //use Math.random() to get a random floating point number.
    console.log("Floor:" + Math.floor(Math.random() * Responses.length)); //use Math.floor() to get a integer.
    console.log("Answer:" + Responses[Answer]); //Answer will be 0,1,2,3 that length of Responses array.
    msg.channel.send(Responses[Answer]);
    msg.react("😄");
    msg.channel.send(`
      "random◆"${Math.random()}
      "length◆"${Responses.length} 
      "floor◆"${Math.floor(Math.random() * Responses.length)}
    `);
    return;
  }

  //fruit emoji
  if (msg.content === "fruit") {
    msg.react("🍎");
    msg.react("🍊");
    msg.react("🍇");

    console.error("test message:fruit error!");
    return;
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
    const moji = '```javascript\n print("Hellow World")```';
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

  if (msg.content === "field") {
    //made a form with random color
    var inline = new Boolean(false);
    var color = 1000000 * Math.random(); //7506394
    var urlID = process.env.URL_ID;
    console.log("color:" + color.valueOf());
    console.log("inline:" + inline.valueOf());
    console.log("urlID:" + urlID.valueOf());
    //embed fileds
    msg.channel.send({
      embed: {
        author: {
          name: "author name ^★click",
          url: "https://discordapp.com", // nameプロパティのテキストに紐付けられるURL
          icon_url: urlID
        },
        color: color,
        timestamp: new Date(),
        image: {
          url: urlID
        },
        footer: {
          icon_url: client.user.avatarURL, //bot's icon
          text: "©️ example | footer text"
        },
        fields: [
          {
            name: "field :one:",
            value: "([1つめのfieldだよ](urlID))",
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

//VOICE CHANNEL HERE
//nothing

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
