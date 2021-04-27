var tmi = require('tmi.js');
var say = require('say');

const prefix = '!';

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
		password: "noidontthinkso"
	},
	channels: ["stylislol"]
};

var client = new tmi.client(config);
client.connect(); 

client.on("chat", function (channel, userstate, message, self) {
	if(self) return;

	if(message.toLowerCase().includes(`${prefix}commands`))
		client.say(channel, `!say - tts your message. free for all!`);

	if(message.toLowerCase().includes(`${prefix}say`)) {
		var tts = message.replace("!say ", "");
		say.speak(`${userstate.username} says ${tts}`);
	}
	
	console.log(`[${channel} | ${userstate.username}] ${message}`);
});