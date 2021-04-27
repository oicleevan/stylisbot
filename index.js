var tmi = require('tmi.js');
var say = require('say');

const prefix = '!';
const {oauth} = require('./password.js');

var config = {
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

var client = new tmi.client(config);
client.connect(); 

client.on("connected", (address, port) => {
    console.log(`connected to ${address} on port ${port}`);
});

client.on("hosted", (channel, username, viewers, autohost) => {
    if(autohost = false) say.speak(`${channel} was hosted by ${username} with ${viewers} viewers.`);
});

client.on("message", function (channel, userstate, message, self) {
	if(self) return;

	if(message.toLowerCase().includes(`${prefix}commands`))
		client.say(channel, `!say - tts your message. free for all!`);

	if(message.toLowerCase().includes(`${prefix}say`)) {
		var tts = message.replace("!say ", "");
		say.speak(`${userstate.username} says ${tts}`);
	}
	
	console.log(`[${channel} | ${userstate.username}] ${message}`);
});