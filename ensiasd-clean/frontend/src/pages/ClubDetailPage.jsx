import { useParams, useNavigate } from 'react-router-dom'
import { useApp, MOCK_CLUBS } from '@/context/AppContext'
import { useState } from 'react'

const EVENTS = {
  informatique: [
    { title:'Hackathon 48h', date:'20 Jan 2025', location:'Amphi A', emoji:'💻' },
    { title:'Workshop IA', date:'27 Jan 2025', location:'Lab Informatique', emoji:'🤖' },
  ],
  sport: [
    { title:'Tournoi Football', date:'22 Jan 2025', location:'Terrain extérieur', emoji:'⚽' },
    { title:'Tournoi Basketball', date:'5 Fév 2025', location:'Gymnase', emoji:'🏀' },
  ],
  robotique: [
    { title:'Qualification RoboCup', date:'15 Jan 2025', location:'Oran', emoji:'🏆' },
  ],
}

export default function ClubDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { posts, currentUser, isJoined, joinClub, leaveClub, likePost, isAdmin, clubs } = useApp()
  const [liked, setLiked] = useState([])
  const [tab, setTab] = useState('posts')

  const club = clubs.find(c => c.slug === slug)
  if (!club) return (
    <div style={{ textAlign:'center', padding:80 }}>
      <div style={{ fontSize:48 }}>🏛️</div>
      <h2 style={{ fontFamily:'Syne,sans-serif' }}>Club introuvable</h2>
      <button onClick={() => navigate('/clubs')} className="btn-primary" style={{ marginTop:16 }}>← Retour aux clubs</button>
    </div>
  )

  const clubPosts = posts.filter(p => p.club_id === slug)
  const events = EVENTS[slug] || []
  const joined = isJoined(club.id)

  function handleLike(id) {
    if (!liked.includes(id)) { likePost(id); setLiked(p => [...p, id]) }
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {/* Back */}
      <button onClick={() => navigate('/clubs')} style={{
        display:'inline-flex', alignItems:'center', gap:8, border:'none', background:'none',
        cursor:'pointer', color:'#64748b', fontFamily:'DM Sans,sans-serif', fontSize:'.875rem', padding:0
      }}>← Retour aux clubs</button>

      {/* Hero */}
      <div className="animate-fadeUp" style={{
        background:`linear-gradient(135deg,${club.gradient})`,
        borderRadius:20, padding:32, color:'#fff', position:'relative', overflow:'hidden'
      }}>
        <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, background:'rgba(255,255,255,.08)', borderRadius:'50%' }}/>
        <div style={{ display:'flex', alignItems:'center', gap:20, position:'relative' }}>
          <div style={{
            width:72, height:72, borderRadius:20,
            background:'rgba(255,255,255,.2)', backdropFilter:'blur(10px)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:36
          }}>{club.emoji}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:'Syne,sans-serif', fontSize:'.75rem', fontWeight:700, opacity:.7, letterSpacing:'0.08em', textTransform:'uppercase' }}>{club.category}</div>
            <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:900, fontSize:'1.75rem', margin:'4px 0' }}>{club.name}</h1>
            <div style={{ opacity:.8, fontSize:'.875rem' }}>👥 {club.members_count} membres · {clubPosts.length} publications</div>
          </div>
          <button onClick={() => { if (!currentUser) { navigate('/login'); return }; if (joined) leaveClub(club.id); else joinClub(club.id) }} style={{
            padding:'10px 24px', borderRadius:12, border: joined ? '2px solid rgba(255,255,255,.4)' : '2px solid rgba(255,255,255,.8)',
            background: joined ? 'rgba(255,255,255,.1)' : 'rgba(255,255,255,.95)',
            color: joined ? '#fff' : club.color, fontFamily:'Syne,sans-serif', fontWeight:700,
            cursor:'pointer', fontSize:'.9rem', transition:'all .2s'
          }}>{joined ? '✓ Membre' : '+ Rejoindre'}</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="card animate-fadeUp delay-1" style={{ padding:6, display:'flex', gap:4 }}>
        {[['posts','📝 Publications'],['events','📅 Événements'],['about','ℹ️ À propos']].map(([id,lbl]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex:1, padding:'9px 16px', borderRadius:10, border:'none', cursor:'pointer',
            fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.85rem',
            background: tab===id ? club.color : 'transparent',
            color: tab===id ? '#fff' : '#64748b',
            transition:'all .15s',
            boxShadow: tab===id ? `0 3px 10px ${club.color}40` : 'none'
          }}>{lbl}</button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'posts' && (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {isAdmin && currentUser?.club_id === club.id && (
            <button onClick={() => navigate('/admin')} style={{
              padding:'12px', border:`2px dashed ${club.color}40`, borderRadius:14,
              background:`${club.color}08`, color:club.color,
              fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.875rem', cursor:'pointer'
            }}>+ Créer une publication</button>
          )}
          {clubPosts.length === 0 ? (
            <div className="card" style={{ padding:40, textAlign:'center' }}>
              <div style={{ fontSize:40, marginBottom:12 }}>📝</div>
              <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, color:'#64748b' }}>Aucune publication pour le moment</div>
            </div>
          ) : clubPosts.map(post => {
            const isLiked = liked.includes(post.id)
            return (
              <div key={post.id} className="card animate-fadeUp" style={{ padding:0, overflow:'hidden' }}>
                <div style={{ padding:'16px 18px 14px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                    <span style={{ fontSize:20 }}>{post.author?.avatar || '👤'}</span>
                    <div>
                      <div style={{ fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'.82rem', color:'#1e293b' }}>{post.author?.full_name}</div>
                      <div style={{ fontSize:'.72rem', color:'#94a3b8' }}>{post.created_at}</div>
                    </div>
                  </div>
                  <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1rem', color:'#0f172a', margin:'0 0 8px' }}>{post.title}</h3>
                  <p style={{ color:'#475569', fontSize:'.875rem', lineHeight:1.6, margin:0 }}>{post.content}</p>
                </div>
                <div style={{ padding:'10px 18px', borderTop:'1px solid #f8fafc', display:'flex', gap:14 }}>
                  <button onClick={() => handleLike(post.id)} style={{
                    display:'flex', alignItems:'center', gap:6, border:'none', background:'none',
                    cursor:'pointer', fontFamily:'DM Sans,sans-serif', fontSize:'.85rem',
                    color: isLiked ? '#ef4444' : '#94a3b8', fontWeight: isLiked ? 600 : 400
                  }}>{isLiked ? '❤️' : '🤍'} {post.likes_count + (isLiked ? 1 : 0)}</button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {tab === 'events' && (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {events.length === 0 ? (
            <div className="card" style={{ padding:40, textAlign:'center' }}>
              <div style={{ fontSize:40, marginBottom:12 }}>📅</div>
              <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, color:'#64748b' }}>Aucun événement planifié</div>
            </div>
          ) : events.map((ev, i) => (
            <div key={i} className="card animate-fadeUp" style={{ padding:20, display:'flex', alignItems:'center', gap:16 }}>
              <div style={{
                width:52, height:52, borderRadius:14, background:`${club.color}15`,
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, flexShrink:0
              }}>{ev.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'1rem', color:'#0f172a' }}>{ev.title}</div>
                <div style={{ fontSize:'.8rem', color:'#94a3b8', marginTop:4 }}>📅 {ev.date} · 📍 {ev.location}</div>
              </div>
              <button style={{
                padding:'7px 16px', borderRadius:10, border:`1.5px solid ${club.color}`, background:'none',
                color:club.color, fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.8rem', cursor:'pointer'
              }}>S'inscrire</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'about' && (
        <div className="card animate-fadeUp" style={{ padding:28 }}>
          <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.1rem', margin:'0 0 14px', color:'#0f172a' }}>À propos du {club.name}</h3>
          <p style={{ color:'#475569', lineHeight:1.7, margin:'0 0 20px' }}>{club.description}</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            {[
              { icon:'👥', label:'Membres', value:club.members_count },
              { icon:'📝', label:'Publications', value:clubPosts.length },
              { icon:'🏷️', label:'Catégorie', value:club.category },
              { icon:'🗓️', label:'Fondé en', value:'2019' },
            ].map(s => (
              <div key={s.label} style={{
                padding:'14px', background:'#f8fafc', borderRadius:12, border:'1px solid #e2e8f0'
              }}>
                <div style={{ fontSize:20, marginBottom:4 }}>{s.icon}</div>
                <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.1rem', color:'#0f172a' }}>{s.value}</div>
                <div style={{ fontSize:'.75rem', color:'#94a3b8' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
