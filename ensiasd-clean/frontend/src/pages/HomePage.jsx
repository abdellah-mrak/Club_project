import { useApp, MOCK_CLUBS } from '@/context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function HomePage() {
  const { currentUser, posts, likePost, clubs, joinedClubs, isAdmin } = useApp()
  const navigate = useNavigate()
  const [liked, setLiked] = useState([])

  const feed = posts.slice(0, 8)
  const topClubs = [...clubs].sort((a,b) => b.members_count - a.members_count).slice(0,4)

  function handleLike(id) {
    if (!liked.includes(id)) { likePost(id); setLiked(p => [...p, id]) }
  }

  return (
    <div style={{ display:'flex', gap:20 }}>
      {/* Main feed */}
      <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', gap:16 }}>
        {/* Hero */}
        {!currentUser && (
          <div className="animate-fadeUp" style={{
            background:'linear-gradient(135deg,#1a56db 0%,#4f46e5 50%,#7c3aed 100%)',
            borderRadius:20, padding:32, color:'#fff', position:'relative', overflow:'hidden'
          }}>
            <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, background:'rgba(255,255,255,.07)', borderRadius:'50%' }}/>
            <div style={{ position:'absolute', bottom:-60, left:100, width:160, height:160, background:'rgba(255,255,255,.05)', borderRadius:'50%' }}/>
            <div style={{ position:'relative' }}>
              <span style={{ background:'rgba(255,255,255,.2)', padding:'4px 14px', borderRadius:99, fontSize:'.75rem', fontFamily:'Syne,sans-serif', fontWeight:700, letterSpacing:'0.05em' }}>ENSIASD · 2025</span>
              <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:900, fontSize:'1.9rem', margin:'14px 0 8px', lineHeight:1.2 }}>
                La plateforme officielle<br/>de la vie étudiante
              </h1>
              <p style={{ opacity:.85, fontSize:'.9rem', lineHeight:1.6, marginBottom:20, maxWidth:400 }}>
                Rejoignez des clubs, suivez les actualités de l'école et collaborez avec vos camarades.
              </p>
              <div style={{ display:'flex', gap:10 }}>
                <button onClick={() => navigate('/register')} style={{
                  background:'#fff', color:'#1a56db', fontFamily:'Syne,sans-serif', fontWeight:700,
                  border:'none', borderRadius:12, padding:'10px 22px', cursor:'pointer', fontSize:'.9rem'
                }}>Rejoindre →</button>
                <button onClick={() => navigate('/clubs')} style={{
                  background:'rgba(255,255,255,.15)', color:'#fff', fontFamily:'Syne,sans-serif', fontWeight:600,
                  border:'1px solid rgba(255,255,255,.3)', borderRadius:12, padding:'10px 22px', cursor:'pointer', fontSize:'.9rem'
                }}>Explorer les clubs</button>
              </div>
            </div>
          </div>
        )}

        {currentUser && (
          <div className="card animate-fadeUp" style={{ padding:20, display:'flex', alignItems:'center', gap:14 }}>
            <span style={{ fontSize:32 }}>{currentUser.avatar}</span>
            <div>
              <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'1.05rem', color:'#0f172a' }}>
                Bonjour, {currentUser.full_name.split(' ')[0]} 👋
              </div>
              <div style={{ color:'#64748b', fontSize:'.85rem', marginTop:2 }}>
                {isAdmin ? `Vous gérez ${MOCK_CLUBS.find(c=>c.id===currentUser.club_id)?.name || 'un club'}` : `${joinedClubs.length} club(s) rejoint(s)`}
              </div>
            </div>
            {isAdmin && (
              <button onClick={() => navigate('/admin')} className="btn-primary" style={{ marginLeft:'auto', fontSize:'.85rem' }}>
                📊 Dashboard
              </button>
            )}
          </div>
        )}

        {/* Feed title */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.1rem', color:'#0f172a', margin:0 }}>Fil d'actualité</h2>
          <span style={{ fontSize:'.8rem', color:'#94a3b8' }}>{feed.length} publications</span>
        </div>

        {/* Posts */}
        {feed.map((post, i) => {
          const club = MOCK_CLUBS.find(c => c.id === post.club_id)
          const isLiked = liked.includes(post.id)
          return (
            <div key={post.id} className={`card animate-fadeUp delay-${Math.min(i+1,5)}`} style={{ padding:0, overflow:'hidden' }}>
              {/* Club header */}
              <div style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 18px', borderBottom:'1px solid #f1f5f9' }}>
                <div style={{
                  width:38, height:38, borderRadius:12, background:`${club?.color}20`,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:18
                }}>{club?.emoji}</div>
                <div>
                  <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.85rem', color:'#0f172a' }}>{club?.name}</div>
                  <div style={{ fontSize:'.75rem', color:'#94a3b8' }}>par {post.author?.full_name} · {post.created_at}</div>
                </div>
                <span className="badge" style={{ marginLeft:'auto', background:`${club?.color}15`, color:club?.color }}>
                  {club?.category}
                </span>
              </div>

              {/* Content */}
              <div style={{ padding:'16px 18px' }}>
                <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'1rem', color:'#0f172a', margin:'0 0 8px' }}>{post.title}</h3>
                <p style={{ color:'#475569', fontSize:'.875rem', lineHeight:1.6, margin:0 }}>{post.content}</p>
              </div>

              {/* Actions */}
              <div style={{ padding:'10px 18px', borderTop:'1px solid #f8fafc', display:'flex', gap:14 }}>
                <button onClick={() => handleLike(post.id)} style={{
                  display:'flex', alignItems:'center', gap:6, border:'none', background:'none', cursor:'pointer',
                  fontFamily:'DM Sans,sans-serif', fontSize:'.85rem',
                  color: isLiked ? '#ef4444' : '#94a3b8', fontWeight: isLiked ? 600 : 400
                }}>
                  {isLiked ? '❤️' : '🤍'} {post.likes_count + (isLiked ? 1 : 0)}
                </button>
                <button onClick={() => navigate(`/clubs/${post.club_id}`)} style={{
                  display:'flex', alignItems:'center', gap:6, border:'none', background:'none', cursor:'pointer',
                  fontFamily:'DM Sans,sans-serif', fontSize:'.85rem', color:'#94a3b8'
                }}>
                  💬 Voir le club
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Right sidebar */}
      <div style={{ width:260, flexShrink:0, display:'flex', flexDirection:'column', gap:14 }}>
        {/* Top clubs */}
        <div className="card animate-fadeUp delay-2" style={{ padding:16 }}>
          <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.85rem', color:'#0f172a', marginBottom:14 }}>🔥 Clubs Populaires</div>
          {topClubs.map((club, i) => (
            <div key={club.id} onClick={() => navigate(`/clubs/${club.slug}`)} style={{
              display:'flex', alignItems:'center', gap:10, padding:'8px 0',
              borderBottom: i < topClubs.length-1 ? '1px solid #f1f5f9' : 'none',
              cursor:'pointer'
            }}>
              <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'.8rem', color:'#94a3b8', width:16 }}>#{i+1}</span>
              <div style={{ width:32, height:32, borderRadius:10, background:`${club.color}18`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>{club.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'.82rem', color:'#1e293b' }}>{club.name}</div>
                <div style={{ fontSize:'.72rem', color:'#94a3b8' }}>{club.members_count} membres</div>
              </div>
            </div>
          ))}
          <button onClick={() => navigate('/clubs')} style={{
            display:'block', width:'100%', textAlign:'center', marginTop:12, padding:'9px',
            background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:10,
            fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'.8rem', color:'#1a56db', cursor:'pointer'
          }}>Voir tous les clubs →</button>
        </div>

        {/* Stats */}
        <div className="card animate-fadeUp delay-3" style={{ padding:16 }}>
          <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.85rem', color:'#0f172a', marginBottom:14 }}>📊 ENSIASD en chiffres</div>
          {[
            { label:'Étudiants inscrits', value:'1 200+', icon:'🎓' },
            { label:'Clubs actifs', value:'8', icon:'🏛️' },
            { label:'Publications ce mois', value:'47', icon:'📝' },
          ].map(s => (
            <div key={s.label} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
              <span style={{ fontSize:20 }}>{s.icon}</span>
              <div>
                <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1rem', color:'#0f172a' }}>{s.value}</div>
                <div style={{ fontSize:'.72rem', color:'#94a3b8' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
