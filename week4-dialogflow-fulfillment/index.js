// this is the code that will go in the index.js when you do the firebase init stuff and it creates a "functions" folder

const functions = require("firebase-functions");
const { dialogflow } = require("actions-on-google");
const Sentiment = require("sentiment");

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

	conv.close(`${conv.data.personsName}. ${result}`);
});

exports.fortuneTeller21 = functions.https.onRequest(app);
