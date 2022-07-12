/*a
 * Starter Project for WhatsApp Echo Bot Tutorial
 *
 * Remix this as the starting point for following the WhatsApp Echo Bot tutorial
 *
 */

"use strict";

// Access token for your app
// (copy token from DevX getting started page
// and save it as environment variable into the .env file)
const token = process.env.WHATSAPP_TOKEN;

// Imports dependencies and set up http server
const request = require("request"),
  express = require("express"),
  body_parser = require("body-parser"),
  axios = require("axios").default,
  app = express().use(body_parser.json()),
        mongoose = require('mongoose'); // creates express http server
 // creates express http server
  const Message = require('./message_model.js')
  const SentMessageStatus = require('./sent_message_response_model.js')
 const formidable = require("formidable");
 const fs = require("fs");
 const crypto = require("crypto");


const connectDB = () => {
	try {
		const mongoURI = process.env.MONGOURI;
		const db =  mongoose.connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB Connected");
		 console.log(db);
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

// Sets server port and logs message on success

const start = async () =>{
  try{
    connectDB();  
    app.listen(process.env.PORT || 1337, () => console.log("webhook is listening"));
  }
  catch(err){
    console.log(err)
  }
}
 start();

// Accepts POST requests at /webhook endpoint
app.post("/webhook", (req, res) => {
  // Parse the request body from the POST
  let body = req.body;

  // Check the Incoming webhook message
  console.log(JSON.stringify(req.body, null, 2));

  
try{
    var obj = (req.body.entry[0].changes[0].value)
    if(obj.hasOwnProperty("contacts"))
    {
    try {
        const received_message = obj.messages[0];
        const initVector = crypto.randomBytes(16);
		    const securityKey = crypto.randomBytes(32);

		try {
			const cipher = crypto.createCipheriv(process.env.ALGORITHM, securityKey, initVector);
			let encryptedData = cipher.update(JSON.stringify(received_message), "utf-8", "hex");
			encryptedData += cipher.final("hex");
    //  console.log(encryptedData)
			const message = new Message({
                user_wabaID: req.body.entry[0].id,
                phoneNumber: obj.contacts[0].wa_id,
                sent_or_received: "received",
                message_data: encryptedData
			});
			//STORE THIS OBJECT IN DB
			message.save(async (err, newMessage) => {
                if(err){
                    console.log(err);
                }
                else{
                  try {
                    const encryptedData = newMessage.message_data;
                    const decipher = crypto.createDecipheriv('aes-256-cbc', securityKey, initVector);
                    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
                    decryptedData += decipher.final("utf8");
                    console.log("DECRYPTED DATA", JSON.parse(decryptedData));
                    
                    
                  } catch (e) {
console.log(e)                  }
              
                }
			});
		} catch (err) {
			console.log(err)
		}

        console.log("Message Received status saved", )

        }

        catch (error) {
            console.log(error)
        }
    }

    else{
    try {


        const sent_message_status = new SentMessageStatus({
        user_wabaID: req.body.entry[0].id,
        statuses: req.body.entry[0].changes[0].value.statuses[0]

        });
        sent_message_status.save()
        console.log("Message Sent Status saved")
        } catch (error) {
        console.log(error)
        }

        }
    }
    catch(err){
    console.log(err)
    } 

  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      let phone_number_id =
        req.body.entry[0].changes[0].value.metadata.phone_number_id;
      let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
      let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
      axios({
        method: "POST", // Required, HTTP method, a string, e.g. POST, GET
        url:
          "https://graph.facebook.com/v12.0/" +
          phone_number_id +
          "/messages?access_token=" +
          token,
        data: {
          messaging_product: "whatsapp",
          to: from,
          text: { body: "Ack: " + msg_body },
        },
        headers: { "Content-Type": "application/json" },
      });
    }
    res.sendStatus(200);
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    res.sendStatus(404);
  }
});

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests 
app.get("/webhook", (req, res) => {
  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
  **/
  const verify_token = "sai";

  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});
