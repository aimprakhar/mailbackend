const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const dotenv =require( "dotenv")
// dotenv.config()


/** send mail from testing account */
const signup = async (req, res) => {

    /** testing account */
    let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Successfully Register with us.", // plain text body
        html: "<b>Successfully Register with us.</b>", // html body
      }


    transporter.sendMail(message).then((info) => {
        return res.status(201)
        .json({ 
            msg: "you should receive an email",
            info : info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("Signup Successfully...!");
}

/** send mail from real gmail account */
const getbill = (req, res) => {
    const em=""
const ps=""
    dotenv.config()

    const { userEmail,TripCode,TripPassWord,TripLink,Name } = req.body;
    // const userEmail  = "aim.prakhar@gmail.com";
    let config = {
        service : 'gmail',
        auth : {
            user: process.env.EMAIL||em,
            pass:process.env.PASSWORD||ps
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "MyTripSaathi.com",
            link : 'https://www.mytripsaathi.com'
        }
    })

    let response = {
        body: {
            name : Name||"Unnamed",
            intro: "Your Trip credentials  has arrived!",
            table : {
                data : [
                    {
                        TripCode : TripCode||"TRIP0000000000000",
                        TripPassWord: TripPassWord||"Password",
                        TripLink : TripLink||"Link",
                    }
                ]
            },
            outro: "Love to serve you on MyTripsaathi.com"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        // from : process.env.EMAIL||em,
        from :process.env.EMAIL||em,
        to : userEmail,
        subject: "Your Trip credentials from MyTripsaathi.com",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("getBill Successfully...!");
}


module.exports = {
    signup,
    getbill
}