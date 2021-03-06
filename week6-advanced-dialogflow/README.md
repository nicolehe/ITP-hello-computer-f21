# corpora-to-dialogflow.py

This is a helper script that converts (most) files from [Corpora]([Corpora](https://github.com/dariusk/corpora)) to a JSON format that can be imported into Dialogflow's entities.

First, download your selected file from Corpora. 

Then, in your terminal, run

```
python corpora-to-dialogflow.py [OBJECT KEY] [INPUT FILE NAME] [OUTPUT FILENAME]
```
For example, for [https://github.com/dariusk/corpora/blob/master/data/foods/vegetables.json](https://github.com/dariusk/corpora/blob/master/data/foods/vegetables.json), run:

```
python corpora-to-dialogflow.py vegetables vegetables.json vegetables-output.json
```

Then, in Dialogflow, go to the Entities tab, then create a new entity. Click the three dots and select "Switch to raw mode", then open the JSON tab. Paste the results of your output file into the box and save.

NOTE: This will only work with files with the same formatting as the vegetable one.

# dialogflow folder

## Importing `fortune_teller_week6`

To import the agent into Dialogflow, right click the "fortune_teller_week6" folder and click "Compress fortune_teller_week6". It should create a file called `fortune_teller_week6.zip`.

In Dialogflow, click the gear under the logo on the left and then "Export and Import." Then either click "RESTORE FROM ZIP" or "IMPORT FROM ZIP" to import the zip file.

Make a note of your Google Project ID - it's in the General tab of your Dialogflow settings.

## Setting up Firebase

Install Firebase CLI (details here: [https://firebase.google.com/docs/cli/](https://firebase.google.com/docs/cli/))

```
npm install -g firebase-tools
firebase login
firebase init
```
In `firebase init`, when it asks you what you want to install, select (by hitting the spacebar) `Functions`. To link it to your existing Dialogflow agent, select `Add Firebase to an existing Google Cloud Platform project` and then select the Project ID that you found in Dialogflow (details above).

The rest can be default. It should then generate a few things in your folder, including a `functions` folder that contains an `index.js` file. 

You can replace the contents of the `index.js` with our example code from class in this repo. Or, check out the boilerplate code template here: [https://github.com/actions-on-google/dialogflow-webhook-boilerplate-nodejs/blob/master/functions/index.js](https://github.com/actions-on-google/dialogflow-webhook-boilerplate-nodejs/blob/master/functions/index.js).

To deploy your webhook:

```
cd functions
firebase deploy
```

When it's done, go to the [firebase console](https://console.firebase.google.com/) and select the project associated with your Dialogflow agent. Then click "Functions" from the sidebar. It should show you a URL under `Trigger`: this is what you will copy into the appropriate text box in Dialogflow.

## Linking your webhook to your Dialogflow agent

Back in Dialogflow, click `Fulfillment` from the sidebar. Enable the Webhook. In the URL text box, paste the URL you got above.

Remember for each intent that you want to use with your webhook, you have go into the intent in Dialogflow, scroll to the bottom, enable Fulfillment, and turn on `Enable webhook call for this intent`!