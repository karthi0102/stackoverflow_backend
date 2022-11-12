import nodemailer from 'nodemailer'
 
const sendMail = async(email,message) =>{
let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'karthikeyanr.20it@kongu.edu',
        pass: 'emwfbkgwcezqfgnc'
    }
});
 
let mailDetails = {
    from: 'karthikeyanr.20it@kongu.edu',
    to: email,
    subject: 'Test mail',
    text: message
};
 
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs',err.message);
    } else {
        console.log('Email sent successfully');
    }
})

}

export default sendMail

