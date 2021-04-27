const tmi = require('tmi.js');
const say = require('say');

const prefix = '!';
const {oauth} = require('./password.js');

const config = {
	options: {
		debug: false
	},
	connection: {
		cluster: "aws",
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
	if(message.toLowerCase() === `${prefix}about`)
		client.say(channel, "want to know more about the project? read at https://tinyurl.com/39yyts7b")

	if(message.toLowerCase() === `${prefix}commands`)
		client.say(channel, "a list of commands are available at https://tinyurl.com/2r3wzxy2");
		
	if(message.toLowerCase() === `${prefix}emote`)
		client.say(channel, "my favourite emote right now is... SlimHardo !");

	if(message.toLowerCase() === `${prefix}say`) {
		var tts = message.replace("!say ", "");
		say.speak(`${userstate.username} said ${tts}`);
	}
	
	if(message.toLowerCase() === `${prefix}vanish`) {
		client.timeout(channel, userstate.username, 1, "vanish").catch();
	}

	console.log(`[${channel} | ${userstate.username}] ${message}`);
});