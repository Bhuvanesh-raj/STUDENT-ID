const express=require("express");
const router=express.Router();
const nodemailer = require('nodemailer');


router.post('/send', (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password' // Replace with your email password
        }
    });

    // Set up email data
    const mailOptions = {
        from: email,
        to: 'admin-email@example.com', // Replace with admin email
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Message sent successfully');
    });
});

module.exports=router;