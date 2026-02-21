import { useState } from 'react'
import { useApp } from '@/context/AppContext'

const CONTACTS = [
  { id:'1', name:'Karim Bensalem', avatar:'👨‍💻', club:'Club Informatique', online:true,  last:'Salut, le hackathon c\'est confirmé ?' },
  { id:'2', name:'Sara Mansouri',  avatar:'👩‍💻', club:'Club Informatique', online:false, last:'Merci pour le workshop hier !' },
  { id:'3', name:'Amine Zerrouk',  avatar:'⚽',  club:'Club Sport',        online:true,  last:'Le tournoi commence demain.' },
  { id:'4', name:'Rania Khelifi',  avatar:'🚀',  club:'Entrepreneuriat',   online:false, last:'Tu viens au Pitch Day ?' },
]

const MESSAGES = {
  '1': [
    { from:'them', text:'Salut, le hackathon c\'est confirmé ?', time:'10:30' },
    { from:'me',   text:'Oui ! Thème IA pour l\'éducation. T\'es dispo ce weekend ?', time:'10:32' },
    { from:'them', text:'Bien sûr, je serai là avec mon équipe 👍', time:'10:34' },
  ],
  '2': [ { from:'them', text:'Merci pour le workshop hier !', time:'Hier' } ],
  '3': [ { from:'them', text:'Le tournoi commence demain.', time:'09:00' } ],
  '4': [ { from:'them', text:'Tu viens au Pitch Day ?', time:'Mer' } ],
}

export default function MessagingPage() {
  const { currentUser } = useApp()
  const [active, setActive] = useState('1')
  const [msgs, setMsgs] = useState(MESSAGES)
  const [input, setInput] = useState('')

  const contact = CONTACTS.find(c => c.id === active)
  const thread = msgs[active] || []

  function send() {
    if (!input.trim()) return
    setMsgs(p => ({ ...p, [active]: [...(p[active]||[]), { from:'me', text:input.trim(), time:'À l\'instant' }] }))
    setInput('')
  }

  return (
    <div style={{ display:'flex', gap:16, height:'calc(100vh - 120px)' }}>
      {/* Sidebar */}
      <div className="card" style={{ width:260, flexShrink:0, padding:0, overflow:'hidden', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'16px 16px 12px', borderBottom:'1px solid #f1f5f9' }}>
          <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1rem', color:'#0f172a' }}>💬 Messages</div>
        </div>
        <div style={{ flex:1, overflowY:'auto' }}>
          {CONTACTS.map(c => (
            <div key={c.id} onClick={() => setActive(c.id)} style={{
              display:'flex', alignItems:'center', gap:12, padding:'12px 16px',
              cursor:'pointer', background: active===c.id ? '#eff6ff' : 'transparent',
              borderLeft: active===c.id ? '3px solid #1a56db' : '3px solid transparent',
              transition:'all .15s'
            }}>
              <div style={{ position:'relative' }}>
                <div style={{ width:38, height:38, borderRadius:12, background:'#f1f5f9', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>{c.avatar}</div>
                {c.online && <div style={{ position:'absolute', bottom:0, right:0, width:10, height:10, borderRadius:'50%', background:'#10b981', border:'2px solid #fff' }}/>}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'.85rem', color: active===c.id ? '#1a56db' : '#1e293b', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.name}</div>
                <div style={{ fontSize:'.72rem', color:'#94a3b8', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.last}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="card" style={{ flex:1, padding:0, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        {/* Header */}
        <div style={{ padding:'14px 20px', borderBottom:'1px solid #f1f5f9', display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:40, height:40, borderRadius:12, background:'#f1f5f9', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{contact.avatar}</div>
          <div>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.9rem', color:'#0f172a' }}>{contact.name}</div>
            <div style={{ fontSize:'.75rem', color: contact.online ? '#10b981' : '#94a3b8' }}>{contact.online ? '● En ligne' : '○ Hors ligne'}</div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex:1, overflowY:'auto', padding:'16px 20px', display:'flex', flexDirection:'column', gap:10 }}>
          {thread.map((m, i) => (
            <div key={i} style={{ display:'flex', justifyContent: m.from==='me' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth:'70%', padding:'10px 14px', borderRadius: m.from==='me' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: m.from==='me' ? '#1a56db' : '#f8fafc',
                color: m.from==='me' ? '#fff' : '#1e293b',
                border: m.from==='me' ? 'none' : '1px solid #e2e8f0',
                fontFamily:'DM Sans,sans-serif', fontSize:'.875rem', lineHeight:1.5
              }}>
                <div>{m.text}</div>
                <div style={{ fontSize:'.68rem', opacity:.6, marginTop:3, textAlign: m.from==='me' ? 'right' : 'left' }}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding:'12px 16px', borderTop:'1px solid #f1f5f9', display:'flex', gap:10 }}>
          <input className="input" value={input} onChange={e => setInput(e.target.value)} placeholder="Écrire un message…"
            onKeyDown={e => e.key==='Enter' && send()}
            style={{ flex:1 }} />
          <button onClick={send} className="btn-primary" style={{ padding:'.65rem 1.2rem', flexShrink:0 }}>Envoyer →</button>
        </div>
      </div>
    </div>
  )
}
