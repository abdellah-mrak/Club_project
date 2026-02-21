import { useState } from 'react'
import { useApp, MOCK_CLUBS } from '@/context/AppContext'
import { useNavigate } from 'react-router-dom'

let _id = 200

export default function AdminPage() {
  const { currentUser, posts, addPost, updatePost, deletePost, clubs } = useApp()
  const navigate = useNavigate()
  const club = MOCK_CLUBS.find(c => c.id === currentUser?.club_id)
  const clubPosts = posts.filter(p => p.club_id === currentUser?.club_id)

  const [tab, setTab] = useState('overview')
  const [showForm, setShowForm] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [form, setForm] = useState({ title:'', content:'' })
  const [saving, setSaving] = useState(false)

  const MOCK_MEMBERS = [
    { id:'m1', name:'Sara Mansouri', avatar:'👩‍💻', year:'2ème année', joined:'Oct 2024', status:'active' },
    { id:'m2', name:'Bilal Hamdi', avatar:'👨‍🎓', year:'1ère année', joined:'Nov 2024', status:'active' },
    { id:'m3', name:'Nadia Belkaid', avatar:'👩‍🎓', year:'3ème année', joined:'Sep 2024', status:'active' },
    { id:'m4', name:'Omar Teffahi', avatar:'👨‍💻', year:'2ème année', joined:'Oct 2024', status:'pending' },
  ]

  function handleSave() {
    if (!form.title.trim() || !form.content.trim()) return
    setSaving(true)
    setTimeout(() => {
      if (editTarget) {
        updatePost(editTarget.id, { title: form.title, content: form.content })
      } else {
        addPost({ club_id: currentUser.club_id, title: form.title, content: form.content, author: { full_name: currentUser.full_name, avatar: currentUser.avatar } })
      }
      resetForm()
      setSaving(false)
      setTab('posts')
    }, 500)
  }

  function resetForm() {
    setForm({ title:'', content:'' })
    setEditTarget(null)
    setShowForm(false)
  }

  function handleEdit(post) {
    setEditTarget(post)
    setForm({ title: post.title, content: post.content })
    setShowForm(true)
    setTab('posts')
  }

  if (!currentUser || !club) {
    return (
      <div style={{ textAlign:'center', padding:80 }}>
        <div style={{ fontSize:48 }}>🔒</div>
        <h2 style={{ fontFamily:'Syne,sans-serif' }}>Accès non autorisé</h2>
        <button onClick={() => navigate('/login')} className="btn-primary" style={{ marginTop:16 }}>Se connecter</button>
      </div>
    )
  }

  const stats = [
    { label:'Publications', value:clubPosts.length, icon:'📝', color:'#1a56db', bg:'#eff6ff' },
    { label:'Membres', value:MOCK_MEMBERS.length, icon:'👥', color:'#10b981', bg:'#f0fdf4' },
    { label:'Likes total', value:clubPosts.reduce((s,p)=>s+(p.likes_count||0),0), icon:'❤️', color:'#ef4444', bg:'#fef2f2' },
    { label:'En attente', value:MOCK_MEMBERS.filter(m=>m.status==='pending').length, icon:'⏳', color:'#f59e0b', bg:'#fffbeb' },
  ]

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {/* Club Header */}
      <div className="animate-fadeUp" style={{
        background:`linear-gradient(135deg,${club.gradient})`,
        borderRadius:20, padding:28, color:'#fff', display:'flex', alignItems:'center', gap:18
      }}>
        <div style={{
          width:64, height:64, borderRadius:18, background:'rgba(255,255,255,.2)',
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:32
        }}>{club.emoji}</div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:'Syne,sans-serif', fontSize:'.75rem', fontWeight:700, opacity:.7, letterSpacing:'0.08em', textTransform:'uppercase' }}>Tableau de bord admin</div>
          <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:900, fontSize:'1.6rem', margin:'4px 0' }}>{club.name}</h1>
          <div style={{ opacity:.8, fontSize:'.85rem' }}>Géré par {currentUser.full_name}</div>
        </div>
        <div style={{ background:'rgba(255,255,255,.2)', padding:'6px 16px', borderRadius:10, fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.8rem' }}>
          ADMIN ✓
        </div>
      </div>

      {/* Stats */}
      <div className="animate-fadeUp delay-1" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background:s.bg, border:`1px solid ${s.color}20`, borderRadius:16, padding:'16px 18px' }}>
            <div style={{ fontSize:20, marginBottom:6 }}>{s.icon}</div>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:900, fontSize:'1.6rem', color:s.color }}>{s.value}</div>
            <div style={{ fontSize:'.75rem', color:'#64748b', marginTop:2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="card animate-fadeUp delay-2" style={{ padding:6, display:'flex', gap:4 }}>
        {[['overview','📊 Vue d\'ensemble'],['posts','📝 Publications'],['members','👥 Membres']].map(([id,lbl]) => (
          <button key={id} onClick={() => { setTab(id); setShowForm(false) }} style={{
            flex:1, padding:'9px', borderRadius:10, border:'none', cursor:'pointer',
            fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.83rem',
            background: tab===id ? club.color : 'transparent',
            color: tab===id ? '#fff' : '#64748b',
            transition:'all .15s'
          }}>{lbl}</button>
        ))}
      </div>

      {/* Tab: Overview */}
      {tab === 'overview' && (
        <div className="animate-scaleIn" style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {/* Quick actions */}
          <div className="card" style={{ padding:20 }}>
            <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.9rem', margin:'0 0 14px', color:'#0f172a' }}>Actions rapides</h3>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {[
                { icon:'✍️', label:'Nouvelle publication', action:() => { setTab('posts'); setShowForm(true) }, color:club.color },
                { icon:'👥', label:'Gérer les membres', action:() => setTab('members'), color:'#10b981' },
                { icon:'🏛️', label:'Voir le club', action:() => navigate(`/clubs/${club.slug}`), color:'#6366f1' },
                { icon:'🏠', label:'Retour accueil', action:() => navigate('/'), color:'#64748b' },
              ].map(a => (
                <button key={a.label} onClick={a.action} style={{
                  display:'flex', alignItems:'center', gap:10, padding:'12px 16px',
                  border:`1.5px solid ${a.color}25`, borderRadius:12, background:`${a.color}08`,
                  cursor:'pointer', textAlign:'left', transition:'all .15s'
                }} onMouseEnter={e => { e.currentTarget.style.background=`${a.color}15` }}
                   onMouseLeave={e => { e.currentTarget.style.background=`${a.color}08` }}>
                  <span style={{ fontSize:20 }}>{a.icon}</span>
                  <span style={{ fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'.85rem', color:a.color }}>{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent posts */}
          <div className="card" style={{ padding:20 }}>
            <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.9rem', margin:'0 0 14px', color:'#0f172a' }}>Publications récentes</h3>
            {clubPosts.slice(0,3).map(p => (
              <div key={p.id} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:'1px solid #f8fafc' }}>
                <div style={{ width:38, height:38, borderRadius:10, background:`${club.color}15`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>📝</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'.85rem', color:'#1e293b', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{p.title}</div>
                  <div style={{ fontSize:'.72rem', color:'#94a3b8' }}>❤️ {p.likes_count} · {p.created_at}</div>
                </div>
                <div style={{ display:'flex', gap:6 }}>
                  <button onClick={() => handleEdit(p)} style={{ width:30, height:30, borderRadius:8, border:'none', background:'#eff6ff', color:'#1a56db', cursor:'pointer', fontSize:14 }}>✏️</button>
                  <button onClick={() => deletePost(p.id)} style={{ width:30, height:30, borderRadius:8, border:'none', background:'#fef2f2', color:'#ef4444', cursor:'pointer', fontSize:14 }}>🗑</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Posts */}
      {tab === 'posts' && (
        <div className="animate-scaleIn" style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {showForm ? (
            <div className="card" style={{ padding:28 }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
                <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.05rem', margin:0, color:'#0f172a' }}>
                  {editTarget ? '✏️ Modifier la publication' : '✍️ Nouvelle publication'}
                </h3>
                <button onClick={resetForm} style={{ border:'none', background:'none', cursor:'pointer', color:'#94a3b8', fontSize:20 }}>✕</button>
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={{ display:'block', fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'.8rem', color:'#475569', marginBottom:6 }}>Titre *</label>
                <input className="input" value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} placeholder="Titre accrocheur…" />
              </div>
              <div style={{ marginBottom:20 }}>
                <label style={{ display:'block', fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'.8rem', color:'#475569', marginBottom:6 }}>Contenu *</label>
                <textarea className="input" value={form.content} onChange={e => setForm(f=>({...f,content:e.target.value}))} placeholder="Contenu de la publication…" rows={5} style={{ resize:'vertical', lineHeight:1.6 }} />
              </div>
              <div style={{ display:'flex', gap:10 }}>
                <button onClick={handleSave} className="btn-primary" disabled={saving || !form.title.trim() || !form.content.trim()} style={{ opacity: (!form.title.trim() || !form.content.trim()) ? 0.5 : 1 }}>
                  {saving ? '⏳ Publication…' : editTarget ? '✓ Modifier' : '🚀 Publier'}
                </button>
                <button onClick={resetForm} className="btn-ghost">Annuler</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowForm(true)} style={{
              padding:16, border:`2px dashed ${club.color}50`, borderRadius:14,
              background:`${club.color}06`, color:club.color,
              fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.9rem', cursor:'pointer',
              transition:'all .15s', display:'flex', alignItems:'center', justifyContent:'center', gap:8
            }} onMouseEnter={e => { e.currentTarget.style.background=`${club.color}12` }}
               onMouseLeave={e => { e.currentTarget.style.background=`${club.color}06` }}>
              + Nouvelle publication
            </button>
          )}

          <h4 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.85rem', color:'#64748b', margin:0 }}>
            Mes publications ({clubPosts.length})
          </h4>

          {clubPosts.length === 0 ? (
            <div className="card" style={{ padding:40, textAlign:'center' }}>
              <div style={{ fontSize:40, marginBottom:10 }}>📝</div>
              <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, color:'#64748b' }}>Aucune publication</div>
              <div style={{ fontSize:'.83rem', color:'#94a3b8', marginTop:6 }}>Créez votre première publication ci-dessus</div>
            </div>
          ) : clubPosts.map(p => (
            <div key={p.id} className="card" style={{ padding:'16px 18px', display:'flex', gap:14, alignItems:'flex-start' }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.95rem', color:'#0f172a', marginBottom:4 }}>{p.title}</div>
                <div style={{ fontSize:'.83rem', color:'#64748b', lineHeight:1.5, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{p.content}</div>
                <div style={{ fontSize:'.75rem', color:'#94a3b8', marginTop:8 }}>❤️ {p.likes_count} · {p.created_at}</div>
              </div>
              <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                <button onClick={() => handleEdit(p)} style={{ width:34, height:34, borderRadius:10, border:'none', background:'#eff6ff', color:'#1a56db', cursor:'pointer', fontSize:15 }}>✏️</button>
                <button onClick={() => deletePost(p.id)} style={{ width:34, height:34, borderRadius:10, border:'none', background:'#fef2f2', color:'#ef4444', cursor:'pointer', fontSize:15 }}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Members */}
      {tab === 'members' && (
        <div className="animate-scaleIn" style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <h4 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.9rem', color:'#0f172a', margin:0 }}>Membres du club ({MOCK_MEMBERS.length})</h4>
            <div>
              <span style={{ background:'#fffbeb', color:'#d97706', fontSize:'.75rem', fontWeight:700, padding:'4px 10px', borderRadius:99, fontFamily:'Syne,sans-serif' }}>
                {MOCK_MEMBERS.filter(m=>m.status==='pending').length} demande(s) en attente
              </span>
            </div>
          </div>

          {MOCK_MEMBERS.map(member => (
            <div key={member.id} className="card" style={{ padding:'14px 18px', display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:42, height:42, borderRadius:12, background:`${club.color}15`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>{member.avatar}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.9rem', color:'#0f172a' }}>{member.name}</div>
                <div style={{ fontSize:'.75rem', color:'#94a3b8' }}>{member.year} · Rejoint {member.joined}</div>
              </div>
              {member.status === 'pending' ? (
                <div style={{ display:'flex', gap:8 }}>
                  <button style={{ padding:'6px 14px', borderRadius:8, border:'none', background:'#f0fdf4', color:'#16a34a', fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.78rem', cursor:'pointer' }}>✓ Accepter</button>
                  <button style={{ padding:'6px 14px', borderRadius:8, border:'none', background:'#fef2f2', color:'#ef4444', fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.78rem', cursor:'pointer' }}>✕ Refuser</button>
                </div>
              ) : (
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{ background:'#f0fdf4', color:'#16a34a', fontSize:'.72rem', fontWeight:700, padding:'3px 10px', borderRadius:99, fontFamily:'Syne,sans-serif' }}>✓ Actif</span>
                  <button style={{ width:30, height:30, borderRadius:8, border:'none', background:'#f8fafc', color:'#94a3b8', cursor:'pointer', fontSize:14 }}>⋯</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
