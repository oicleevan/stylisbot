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
	if(self) return;

	if(message.toLowerCase().includes(`${prefix}commands`))
		client.say(channel, "a list of commands are available at https://tinyurl.com/4sfcwhcd");
		
	if(message.toLowerCase().includes(`${prefix}say`)) {
		var tts = message.replace("!say ", "");
		say.speak(`${userstate.username} said ${tts}`);
	}
	
	console.log(`[${channel} | ${userstate.username}] ${message}`);
});