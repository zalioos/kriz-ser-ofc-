const {
WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   GroupSettingChange,
   waChatKey,
   mentionedJid,
   processTime,
   processTicksAndRejections,
   ECONNABORTED,
   apikey,
   WA_DEAFULT_EPHEMERAL,
   DataView,
   TypedArray,
   device,
   Browser
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const fs = require("fs-extra")
const figlet = require('figlet')
const clc = require('chalk')
const { sleep, start, success } = require('./lib/myfunc')
const { uncache, nocache } = require('./lib/loader')
const setting = JSON.parse(fs.readFileSync('./setting.json'))
const welcome = require('./message/group')
const { getBuffer } = require('./lib/myfunc')
baterai = 'unknown'
charging = 'unknown'


require('./Bosco.js')
nocache('../Bosco.js', module => console.log(color('[WATCH]', 'cyan'), color(`'${module}'`, 'green'), 'File is updated!'))
require('./message/help.js')
nocache('../message/help.js', module => console.log(color('[WATCH]', 'cyan'), color(`'${module}'`, 'green'), 'File is updated!'))
         
    const starts = async (bosco = new WAConnection()) => {
    bosco.version = [3,3234,9]
	bosco.logger.level = 'warn'
	console.log(color(figlet.textSync('KRIZ SER OFC', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	}), 'yellow'))
	console.log(color('[KRIZ ]', 'cyan'), color('WELCOME', 'white'))
	console.log(color('[SER]', 'cyan'), color('BOT RUNNING', 'yellow'))
	bosco.browserDescription = ["KRIZ  SER OFC - [KRIZ -SER]", "edge", "3.0.0"];

	// Menunggu QR
	bosco.on('qr', () => {
		console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color('Please scan qr code'))
	})

	// Menghubungkan
	fs.existsSync(`./Denis.json`) && bosco.loadAuthInfo(`./Denis.json`)
	bosco.on('connecting', () => {
		start('2', 'Connecting...','red')
	})

	//connect
	bosco.on('open', () => {
		success('2', 'Connected')
	})

	// session
	await bosco.connect({
		timeoutMs: 10 * 1000
	})
	fs.writeFileSync(`./Denis.json`, JSON.stringify(bosco.base64EncodedAuthInfo(), null, '\t'))

	// Baterai
	bosco.on('CB:action,,battery', json => {
		global.batteryLevelStr = json[2][0][1].value
		global.batterylevel = parseInt(batteryLevelStr)
		baterai = batterylevel
		if (json[2][0][1].live == 'true') charging = true
		if (json[2][0][1].live == 'false') charging = false
		console.log(json[2][0][1])
		console.log('Battery : ' + batterylevel + '%')
	})
	global.batrei = global.batrei ? global.batrei : []
	bosco.on('CB:action,,battery', json => {
		const batteryLevelStr = json[2][0][1].value
		const batterylevel = parseInt(batteryLevelStr)
		global.batrei.push(batterylevel)
	})
	
	  // Call Block
	/*bosco.on('CB:action,,call', async json => {
        const callerId = json[2][0][1].from;
        console.log("caller "+ callerId)
        bosco.sendMessage(callerId, "Call = BLOCK!!\nDont call me!!", MessageType.text)
        await sleep(3000)
        await bosco.blockUser(callerId, "add") // Block user
   })*/
   
   bosco.on('message-delete', async (m) => {
   	await m(m)
   })
  
       // welcome
	bosco.on('group-participants-update', async (anu) => {
		await welcome(bosco, anu)
		try { 
           const mdata = await bosco.groupMetadata(anu.jid)
           console.log(anu)
		if (anu.action == 'promote'){
			num = anu.participants[0]
			try {
					ppimg = await bosco.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i.ibb.co/rvsVF3r/5012fbb87660.png'
				}
			let buff = await getBuffer(ppimg)
			const bosco1 = await bosco.prepareMessage("0@s.whatsapp.net", buff, MessageType.location,{ thumbnail: buff})
			const bosco2 = bosco1.message["ephemeralMessage"] ? bosco1.message.ephemeralMessage : bosco1
			teks = `*𝚈𝚘𝚞 𝚊𝚛𝚎 𝚗𝚘𝚠 𝚊𝚗 𝙰𝚍𝚖𝚒𝚗*
 @${num.split('@')[0]}
`
			promoteBut = [{buttonId:`hm`,buttonText:{displayText:'𝐂𝐨𝐧𝐠𝐫𝐚𝐭𝐬 𝐁𝐫𝐮𝐡..!'},type:1}]
            promoteButt = { contentText: `${teks}`, footerText: `ℙ𝕣𝕠𝕞𝕠𝕥𝕖 𝔻𝕖𝕔𝕥𝕖𝕔𝕥𝕖𝕕`, buttons: promoteBut, headerType: 6, locationMessage: bosco2.message.locationMessage}
            bosco.sendMessage(mdata.id, promoteButt, MessageType.buttonsMessage, { caption: 'hehe', "contextInfo": { "mentionedJid" : [num], },})
		    } else if (anu.action == 'demote') {
			num = anu.participants[0]
			const mdata = await bosco.groupMetadata(anu.jid)
			try {
					ppimg = await bosco.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i.ibb.co/rvsVF3r/5012fbb87660.png'
				}
			let buff = await getBuffer(ppimg)
			const bosco3= await bosco.prepareMessage("0@s.whatsapp.net", buff, MessageType.location,{ thumbnail: buff})
			const bosco4 = bosco3.message["ephemeralMessage"] ? bosco3.message.ephemeralMessage : bosco3
			teks = `*𝚈𝚘𝚞 𝚊𝚛𝚎 𝚗𝚘 𝚕𝚘𝚗𝚐𝚎𝚛 𝚊𝚗 𝙰𝚍𝚖𝚒𝚗*
 @${num.split('@')[0]}
`
			demoteBut = [{buttonId:`hm`,buttonText:{displayText:'𝐁𝐞𝐭𝐭𝐞𝐫 𝐋𝐮𝐜𝐤 𝐍𝐞𝐱𝐭 𝐓𝐢𝐦𝐞'},type:1}]
            demoteButt = { contentText: `${teks}`, footerText: `𝔻𝕖𝕞𝕠𝕥𝕖 𝔻𝕖𝕔𝕥𝕖𝕔𝕥𝕖𝕕`, buttons: demoteBut, headerType: 6, locationMessage: bosco4.message.locationMessage}
            bosco.sendMessage(mdata.id, demoteButt, MessageType.buttonsMessage, { caption: 'hehe', "contextInfo": { "mentionedJid" : [num], },})
		    }
            } catch (e) {
         console.log('Error : %s', color(e, 'red'))
      }
})

    bosco.on('group-update', async (anu) => {
    falfa = { key: {fromMe: false,participant: "0@s.whatsapp.net",
   remoteJid: "0@s.whatsapp.net"},message: {"groupInviteMessage": {"groupJid": "6288213840883-1616169743@g.us","inviteCode": "mememteeeekkeke","groupName": "Alphabot", "caption": `☠️ 𝑲𝑹𝑰𝒁 - 𝑺𝑬𝑹 ☠️`, 'jpegThumbnail': fs.readFileSync(`ds.jpg`)}}}
    metdata = await bosco.groupMetadata(anu.jid)
    if(anu.announce == 'false'){
    teks = `*[ 𝑮𝑹𝑶𝑼𝑷 𝑶𝑷𝑬𝑵𝑬𝑫 ]*\n`
    bosco.sendMessage(metdata.id, teks, MessageType.text, {quoted: falfa})
    console.log(clc.yellow(`[ Group Opened ] In ${metdata.subject}`))
  } else if(anu.announce == 'true'){
    teks = `*[ 𝑮𝑹𝑶𝑼𝑷 𝑪𝑳𝑶𝑺𝑬𝑫 ]*\n`
    bosco.sendMessage(metdata.id, teks, MessageType.text, {quoted: falfa})
    console.log(clc.yellow(`[ Group Closed ] In ${metdata.subject}`))
  } else if(!anu.desc == ''){
    tag = anu.descOwner.split('@')[0] + '@s.whatsapp.net'
    teks = `*[ 𝑮𝑹𝑶𝑼𝑷 𝑫𝑬𝑺𝑪𝑹𝑰𝑷𝑻𝑰𝑶𝑵 𝑪𝑯𝑨𝑵𝑮𝑬 ]*\n\n • *ɴᴇᴡ* : *${anu.desc}*`
    bosco.sendMessage(metdata.id, teks, MessageType.text, {contextInfo: {"mentionedJid": [tag]}, quoted: falfa})
    console.log(clc.yellow(`[ Group Description Change ] In ${metdata.subject}`))
 } else if(anu.restrict == 'false'){
    teks = `*[ 𝑮𝑹𝑶𝑼𝑷 𝑺𝑬𝑻𝑻𝑰𝑵𝑮 𝑪𝑯𝑨𝑵𝑮𝑬 ]*\n`
    bosco.sendMessage(metdata.id, teks, MessageType.text, {quoted: falfa})
    console.log(clc.yellow(`[ Group Setting Change ] In ${metdata.subject}`))
  } else if(anu.restrict == 'true'){
    teks = `*[ 𝑮𝑹𝑶𝑼𝑷 𝑺𝑬𝑻𝑻𝑰𝑵𝑮 𝑪𝑯𝑨𝑵𝑮𝑬 ]*\n`
    bosco.sendMessage(metdata.id, teks, MessageType.text, {quoted: falfa})
    console.log(clc.yellow(`[ Group Setting Change ] In ${metdata.subject}`))
   }
})

    
	bosco.on('chat-update', async (message) => {
		require('./Bosco.js')(bosco, message)
	})
}

starts()
