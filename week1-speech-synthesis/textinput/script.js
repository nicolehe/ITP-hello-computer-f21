console.log("hello from the script!");

// const is the same as var but for variables that don't change
// let is the same as var but for variables that can change
const synth = window.speechSynthesis;

document.querySelector("#button").onclick = () => {
	console.log("button clicked");
	let textInput = document.querySelector("#text-input").value;
	speak(textInput);
};

// function speak(text) {} --> this is the same as below
const speak = (text) => {
	if (synth.speaking) {
		console.error("it's speaking already");
		return;
	}

	let utterThis = new SpeechSynthesisUtterance(text);
	// optional parameters below, you can find more info at:
	// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
	
	// utterThis.lang = "de-de";
	// utterThis.pitch = 1.2;
	// utterThis.rate = 0.2;
	synth.speak(utterThis);
};
