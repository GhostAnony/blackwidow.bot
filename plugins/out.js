var handler = async (m, { conn }) => {

  // controllo: deve essere gruppo
  if (!m.isGroup) {
    return conn.reply(m.chat, '❌ Questo comando funziona solo nei gruppi.', m)
  }

  // frase ad effetto
  const frase = `
╭─❖ 「 BLACKWINDOW 𝐁𝐎𝐓 」
│
│  🩸 È stato un onore servire questo gruppo
│  ⚔️ Ma il mio lavoro qui è finito.
│
│  👑 Quando avrete di nuovo bisogno di me,
│  sapete come evocarmi.
╰─❖ *Addio.*` 

  await conn.sendMessage(m.chat, { text: frase }, { quoted: m })

  // piccola pausa per far leggere il messaggio
  await new Promise(resolve => setTimeout(resolve, 1500))

  // il bot si rimuove da solo
  await conn.groupParticipantsUpdate(m.chat, [conn.user.jid], 'remove')
}

handler.help = ['out']
handler.tags = ['group']
handler.command = ['out']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
