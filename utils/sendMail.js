const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SENDGRID_API_KEY } = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

const sendMail = async data => {
  try {
    const mail = { ...data, from: 'sukhobok@ukr.net' }
    await sgMail.send(mail)
    return true
  } catch (error) {
    return false
  }
}

module.exports = sendMail
