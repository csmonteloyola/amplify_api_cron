/* import fetch from 'node-fetch'
import nodemailer from 'nodemailer' */

const nodemailer = require('nodemailer');
const https = require('https');
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context, callback) => {
    
    // setup nodemailer
    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "4f2fe852ea03c4",
            pass: "ad2baedb90b2e0"
        }
    })
 
    const response = await new Promise((resolve, reject) => {
        const req = https.get("https://catfact.ninja/fact", function(res) {
            
          res.on('data', (data) => {
            resolve({
                statusCode: 200,
                body: JSON.parse(data)
            });
          });
        });
        
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: 'Something went wrong!'
          });
        });
    });
    
   
    /* console.log("response.body.fact", response.body) */

    const message = {
        from: 'cat@fact.com',
        to: 'csmonteloyola+1@gmail.com',
        subject: 'Your hourly cat fact',
        text: response.body.fact
    }

    await transporter.sendMail(message)

    
};
