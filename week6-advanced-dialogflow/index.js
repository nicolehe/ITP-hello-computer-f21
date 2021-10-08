const functions = require("firebase-functions");
const { dialogflow } = require("actions-on-google");
const Sentiment = require("sentiment");
const _ = require("lodash");
const fs = require("fs");
const sausagesRaw = fs.readFileSync("sausages.json");
const sausages = JSON.parse(sausagesRaw);

const sentiment = new Sentiment();
const app = dialogflow();

app.intent("Default Welcome Intent", (conv) => {
	conv.ask(
		`<speak>Hi class!<break time="2s"/>Okay.<prosody rate="slow" pitch="-2st">Cool times.</prosody></speak>`
	);
});

app.intent("how_are_you", (conv) => {
	conv.ask(
		`<speak><audio src="https://storage.googleapis.com/crying-robot/crying.wav">crying</audio></speak>`
	);
});

app.intent("get_fortune", (conv, params) => {
	conv.data.myFavoriteFood = "ice cream"; // just an example to show how to use conv.data
	conv.data.personsName = params.name; // conv.data = {personsName: "Bob"}
	// conv.ask("Hello, " + params.name + ", you're gonna have a cool life.");
	conv.ask(`Hello, ${params.name}, what did you dream about last night?`);
});

app.intent("dream", (conv) => {
	let dream = conv.query;
	let dreamSentiment = sentiment.analyze(dream);

	let result = "";

	if (dreamSentiment.score < -2) {
		result = "You're gonna have a horrifying life.";
	} else if (dreamSentiment.score >= -2 && dreamSentiment.score < 2) {
		result = "You're going to have a calm, but boring life.";
	} else {
		result =
			"You're in luck! Your life will be excellent and you will be successful.";
	}

	conv.data.dreamResult = result;

	conv.ask(`Very interesting dream. Tell me, what is your favorite animal?`);
});

app.intent("animal", (conv, params) => {
	conv.data.favAnimal = params.animals;
	conv.ask(
		`So ${conv.data.personsName}, your favorite creature is the ${conv.data.favAnimal}. Fascinating. One more question: who is your favorite musician?`
	);
});

app.intent("musician", (conv, params) => {
	let musician = "Santa Claus";
	if (params["music-artist"] != null) {
		musician = params["music-artist"];
	} else if (params.person != null) {
		musician = params.person;
	}

	let sausage = _.sample(sausages.sausages);
	let fortune = `${conv.data.personsName} - ${conv.data.dreamResult}. ${musician} riding a ${conv.data.favAnimal} will one day give you a ${sausage}.`;
	conv.ask(fortune);
});

exports.fortuneTeller21 = functions.https.onRequest(app);
