// plugins/welcome-phishy.js

let handler = async (m, { conn, text, command, isAdmin }) => {

  // ===== COMANDO ATTIVA/DISATTIVA =====
  if (['welcome'].includes(command)) {
    if (!m.isGroup) return m.reply('Questo comando funziona solo nei gruppi.')
    if (!isAdmin) return m.reply('Solo gli admin possono usare questo comando.')

    if (!text) return m.reply('Usa:\n.welcome on\n.welcome off')

    global.db.data.chats[m.chat].welcome = text === 'on'

    return m.reply(`Welcome ${text === 'on' ? 'attivato ✅' : 'disattivato ❌'}`)
  }

  // ===== EVENTO INGRESSO =====
  const addTypes = new Set([27, 31])
  if (!addTypes.has(m.messageStubType)) return
  if (!global.db.data.chats[m.chat].welcome) return

  const params = m.messageStubParameters || []
  for (let jid of params) {
    let mention = '@' + jid.split('@')[0]

    await conn.sendMessage(m.chat, {
      text: `🎉 CIAO ${mention} IO SONO PHISHY!

📚 Leggi le regole
👥 Sii rispettoso/a
🤖 Scrivi .menu per vedere i comandi

⚡ Buona permanenza!`,
      mentions: [jid]
    }, { quoted: m })
  }
}

handler.help = ['welcome on/off']
handler.tags = ['group']
handler.command = ['welcome']
handler.group = true
handler.admin = true

export default handler
