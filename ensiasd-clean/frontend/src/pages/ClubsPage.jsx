import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'

const CATEGORIES = ['Tous', 'Tech', 'Science', 'Créatif', 'Sport', 'Culture', 'Business']

export default function ClubsPage() {
  const { clubs, isJoined, joinClub, leaveClub, currentUser, search } = useApp()
  const navigate = useNavigate()
  const [cat, setCat] = useState('Tous')

  const filtered = clubs.filter(c =>
    (cat === 'Tous' || c.category === cat) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase()))
  )

  function handleJoin(e, clubId) {
    e.stopPropagation()
    if (!currentUser) { navigate('/login'); return }
    if (isJoined(clubId)) leaveClub(clubId); else joinClub(clubId)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      {/* Hero */}
      <div className="animate-fadeUp" style={{
        background:'linear-gradient(135deg,#0f172a,#1e293b)',
        borderRadius:20, padding:'28px 32px', color:'#fff', position:'relative', overflow:'hidden'
      }}>
        <div style={{ position:'absolute', top:-30, right:60, width:180, height:180, background:'rgba(99,102,241,.15)', borderRadius:'50%' }}/>
        <div style={{ position:'absolute', bottom:-50, right:-20, width:220, height:220, background:'rgba(26,86,219,.1)', borderRadius:'50%' }}/>
        <div style={{ position:'relative' }}>
          <div style={{ fontFamily:'Syne,sans-serif', fontSize:'.75rem', fontWeight:700, letterSpacing:'0.1em', opacity:.6, textTransform:'uppercase', marginBottom:8 }}>ENSIASD · Associations</div>
          <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:900, fontSize:'2rem', margin:'0 0 8px' }}>🏛️ Clubs Étudiants</h1>
          <p style={{ opacity:.7, fontSize:'.9rem', margin:0 }}>
            {clubs.length} clubs actifs · Rejoignez une communauté, développez vos passions
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="animate-fadeUp delay-1" style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding:'7px 18px', borderRadius:99, fontSize:'.83rem',
            fontFamily:'Syne,sans-serif', fontWeight:700, cursor:'pointer',
            border: cat === c ? 'none' : '1.5px solid #e2e8f0',
            background: cat === c ? '#1a56db' : '#fff',
            color: cat === c ? '#fff' : '#64748b',
            boxShadow: cat === c ? '0 4px 12px rgba(26,86,219,.3)' : '0 1px 2px rgba(0,0,0,.04)',
            transition:'all .15s'
          }}>{c}</button>
        ))}
      </div>

      {/* Grid */}
      <div className="animate-fadeUp delay-2" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:16 }}>
        {filtered.map((club, i) => {
          const joined = isJoined(club.id)
          return (
            <div key={club.id} onClick={() => navigate(`/clubs/${club.slug}`)} style={{
              background:'#fff', border:'1px solid #e2e8f0', borderRadius:18,
              overflow:'hidden', cursor:'pointer',
              boxShadow:'0 1px 3px rgba(0,0,0,.06)',
              transition:'box-shadow .2s, transform .2s'
            }} onMouseEnter={e => { e.currentTarget.style.boxShadow='0 8px 30px rgba(0,0,0,.12)'; e.currentTarget.style.transform='translateY(-3px)' }}
               onMouseLeave={e => { e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,.06)'; e.currentTarget.style.transform='translateY(0)' }}>
              {/* Banner */}
              <div style={{
                height:80, background:`linear-gradient(135deg,${club.gradient})`,
                display:'flex', alignItems:'center', justifyContent:'center', position:'relative'
              }}>
                <span style={{ fontSize:36 }}>{club.emoji}</span>
                <span className="badge" style={{
                  position:'absolute', top:10, right:10,
                  background:'rgba(255,255,255,.25)', color:'#fff',
                  backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.3)'
                }}>{club.category}</span>
                {joined && (
                  <span className="badge" style={{
                    position:'absolute', top:10, left:10,
                    background:'rgba(16,185,129,.9)', color:'#fff'
                  }}>✓ Rejoint</span>
                )}
              </div>

              {/* Body */}
              <div style={{ padding:'16px 18px' }}>
                <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1rem', color:'#0f172a', margin:'0 0 6px' }}>{club.name}</h3>
                <p style={{ color:'#64748b', fontSize:'.82rem', lineHeight:1.5, margin:'0 0 14px', minHeight:38 }}>{club.description}</p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontSize:'.78rem', color:'#94a3b8', fontWeight:500 }}>👥 {club.members_count} membres</span>
                  <button onClick={e => handleJoin(e, club.id)} style={{
                    padding:'6px 16px', borderRadius:99, fontSize:'.8rem',
                    fontFamily:'Syne,sans-serif', fontWeight:700, cursor:'pointer',
                    border:'none',
                    background: joined ? '#fef2f2' : `linear-gradient(135deg,${club.gradient})`,
                    color: joined ? '#ef4444' : '#fff',
                    boxShadow: joined ? 'none' : `0 3px 10px ${club.color}50`,
                    transition:'all .15s'
                  }}>
                    {joined ? 'Quitter' : 'Rejoindre'}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign:'center', padding:'60px 20px', color:'#94a3b8' }}>
          <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
          <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'1rem', color:'#64748b' }}>Aucun club trouvé</div>
          <div style={{ fontSize:'.85rem', marginTop:6 }}>Essayez une autre catégorie ou recherche</div>
        </div>
      )}
    </div>
  )
}
