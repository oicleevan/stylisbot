/*
	index.js
	Main file for my twitch bot, stylisbot
	-- oicleevan
*/

const tmi = require('tmi.js');
const say = require('say');
const sys = require('process');

const {prefix, favourite_emote, username} = require('./config.json');

var oauth;

if(sys.argv[2] != null) {
	oauth = sys.argv[2];
} else {
	console.log("Please include an oauth password.");
	sys.exit();
}

const config = {
	options: {
		debug: false
	},
	connection: {
		reconnect: true
	},
	identity: {
		username: username, // your username, configured in config.json.
		password: oauth // your login password. for purposes of security, must be entered at runtime. 
	},
	channels: ["stylislol"] // channels that this bot is enabled in.
};

const client = new tmi.client(config);
client.connect();

client.on("connected", (address, port) => {
    console.log(`connected to ${address} on port ${port}`);
})

client.on("message", function (channel, userstate, message, self) {
	
	// i had a bunch of if statements, but i think this is more elegant.
	switch(message.toLowerCase()) {
		case `${prefix}about`:
			client.say(channel, "want to know more about the project? read at https://oicleevan.github.io/stylisbot/about.html");
			break;
		case `${prefix}commands`:
			client.say(channel, "a list of commands are available at https://oicleevan.github.io/stylisbot/commands.html");
			break;
		case `${prefix}emote`:
			client.say(channel, `my favourite emote right now is...  ${favourite_emote} !`);
			break;
		case `${prefix}vanish`:
			client.timeout(channel, userstate.username, 1, "vanish").catch();
			break;
		default:
			break;
	}

	// because tts includes more than just the message, i had to exclude it from the switch
	if(message.toLowerCase().includes(`${prefix}say`)) {
		say.speak(`${userstate.username} said ${message.replace(`${prefix}say `, "")}`);
	}

	console.log(`[${channel} | ${userstate.username}] ${message}`);
})