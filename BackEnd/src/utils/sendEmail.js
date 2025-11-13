// const nodemailer = require("nodemailer");

// const sendEmail = async ({ to, subject, text }) => {

//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure:false, 
//         auth: {
//             user: process.env.EMAIL_USER,

//             pass: process.env.EMAIL_PASS.replace(/\s/g, ''),
//         },
//     });

//     try {
//         await transporter.sendMail({
//             from: `"CSA CTF Platform" <${process.env.EMAIL_USER}>`,
//             to,
//             subject,
//             text,
//         });
//         console.log(`All good aryan email sent successfully`);
//     } catch (error) {

//         console.error("Nodemailer Connection/Send Error Details:", error);
        

//         throw new Error("Failed to send verification email. Please check server logs for details.");
//     }
// };

// module.exports = sendEmail;




// utils/sendEmail.js

// 1. IMPORT: Replace nodemailer with node-mailjet
const mailjet = require('node-mailjet');

// 2. INITIALIZE: Create the Mailjet client instance outside the function
// Use .connect() (or .apiConnect() in newer versions) to initialize.
// This client uses the HTTP API, which is NOT blocked on Render.
const mailjetClient = mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
);


const sendEmail = async ({ to, subject, text }) => {
    

    const fromEmail = process.env.EMAIL_USER; // Re-use your old EMAIL_USER for the FROM address


    const request = mailjetClient
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {

                    From: {
                        Email: fromEmail,
                        Name: "CSA CTF Platform"
                    },

                    To: [
                        {
                            Email: to, // The recipient email

                        }
                    ],
                    Subject: subject,

                    TextPart: text,

                    HTMLPart: `<h3>${text.split(':').join(': </strong>')}</h3><p>This is your verification email.</p>`,
                }
            ]
        });

    try {
        const result = await request;
        

        console.log(`All good aryan email sent successfully! Status: ${result.response.status}`);
        
    } catch (error) {
        

        console.error("Mailjet API Send Error Details:", error.statusCode, error.message);
        
        throw new Error("Failed to send verification email. Please check server logs and Mailjet keys/sender status.");
    }
};

module.exports = sendEmail;