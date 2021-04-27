const tmi = require('tmi.js');
const say = require('say');

const {prefix, favourite_emote } = require('./config.json');
const {oauth} = require('./secret.json'); // secret password. hidden from git ;)

const config = {
	options: {
		debug: false
	},
	connection: {
		reconnect: true
	},
	identity: {
		username: "stylisbot",
		password: oauth
	},
	channels: ["stylislol"]
};

const client = new tmi.client(config);
client.connect(); 

client.on("connected", (address, port) => {
    console.log(`connected to ${address} on port ${port}`);
});

client.on("message", function (channel, userstate, message, self) {
	
	// i had a bunch of if statements, but i think this is more elegant.
	switch(message.toLowerCase()) {
		case `${prefix}about`:
			client.say(channel, "want to know more about the project? read at https://tinyurl.com/39yyts7b");
			break;
		case `${prefix}commands`:
			client.say(channel, "a list of commands are available at https://tinyurl.com/2r3wzxy2");
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
		var tts = message.replace("!say ", "");
		say.speak(`${userstate.username} said ${tts}`);
	}

	console.log(`[${channel} | ${userstate.username}] ${message}`);
});