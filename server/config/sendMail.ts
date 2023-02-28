
import { OAuth2Client } from 'google-auth-library';

import { ISendMail } from '../interfaces/Auth';

const nodemailer = require('nodemailer');

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const CLIENT_ID = `${process.env.OAUTH_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.OAUTH_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.OAUTH_REFRESH_TOKEN}`;
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;

const sendMail = async (user: ISendMail) => {
  const oAuth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    OAUTH_PLAYGROUND
  );

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: SENDER_MAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      }
    });

    const url = `${user.origin}/verify-email?token=${user.verificationToken}&email=${user.email}`;

    const mailOptions = {
      from: SENDER_MAIL,
      to: user.email,
      subject: 'Email Confirmation',
      html: `
              <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; background-color: #fff">
              <h1>Hi ${user.name}</h1>
              <p>Please verify your account to able to login</p>
              <a href=${url} >Verify your account</a>   
              <p>Good luck</p>
              </div>
            `,
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default sendMail;
