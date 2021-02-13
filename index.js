const tmi = require('tmi.js');

const client = new tmi.Client({
	connection: { reconnect: true },
	identity: {
		username: process.env.Username,
		password: process.env.Token
	},
	channels: [process.env.Username, "robotic_obsession"]
});

client.on('message', (channel, tags, message, self) => {
	if(self || !message.startsWith('!')) return;

	const args = message.slice(1).split(' ');
  const badges = tags.badges || {};
	const command = args.shift().toLowerCase();

	if(command === "help") {
		client.say(channel, "Check out the commands at https://steve.roboticobsession.xyz/twitch/commands");
	}

	if(command === "say") {
		client.say(channel, args.join(' '));
	}

/*
  if(command == "ban" && badges.mod || badges.broadcaster) {
    client.say(channel, "Banned " + args.join(' '));
    client.ban(channel, args.join(' '))
  }
  */

  if(command === "addmod" && badges.broadcaster && args.length) {
    client.say(channel, args[0] + " is now mod.")
    client.mod(channel, args[0]);
    }
  
  if(command == "join"){
    client.say(channel, "Joined " + args.join(' '));
    client.join(args.join(' '));
  }

  if(command == "ping"){
    ping = client.ping();
    client.say(channel, "Pong!");
  }
});

client.connect(
  console.log("Bot Up!")
);