import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { MOCK_CLUBS } from '@/context/AppContext'

const NAV = [
  { to: '/',        icon: '🏠', label: 'Accueil',    end: true },
  { to: '/clubs',   icon: '🏛️', label: 'Clubs' },
  { to: '/videos',  icon: '🎬', label: 'Reels' },
  { to: '/messages',icon: '💬', label: 'Messages',  auth: true },
  { to: '/team',    icon: '👥', label: 'Team Space', auth: true },
  { to: '/admin',   icon: '📊', label: 'Admin',      admin: true },
]

export default function Sidebar() {
  const { currentUser, isAdmin, joinedClubs } = useApp()
  const navigate = useNavigate()

  const myClubs = MOCK_CLUBS.filter(c => joinedClubs.includes(c.id))

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
      {/* Main Nav */}
      <div className="card" style={{ padding:8 }}>
        <div style={{ fontFamily:'Syne,sans-serif', fontSize:'.7rem', fontWeight:700, color:'#94a3b8', letterSpacing:'0.08em', padding:'4px 10px 8px', textTransform:'uppercase' }}>Navigation</div>
        {NAV.filter(l => {
          if (l.admin) return isAdmin
          if (l.auth) return !!currentUser
          return true
        }).map(l => (
          <NavLink key={l.to} to={l.to} end={l.end} style={({ isActive }) => ({
            display:'flex', alignItems:'center', gap:10, padding:'9px 12px',
            borderRadius:10, textDecoration:'none', fontFamily:'DM Sans,sans-serif',
            fontSize:'.9rem', fontWeight: isActive ? 600 : 400,
            color: isActive ? '#1a56db' : '#475569',
            background: isActive ? '#eff6ff' : 'transparent',
            transition:'all .15s'
          })}>
            <span style={{ fontSize:16 }}>{l.icon}</span>
            {l.label}
          </NavLink>
        ))}
      </div>

      {/* Mes clubs */}
      {currentUser && myClubs.length > 0 && (
        <div className="card" style={{ padding:8 }}>
          <div style={{ fontFamily:'Syne,sans-serif', fontSize:'.7rem', fontWeight:700, color:'#94a3b8', letterSpacing:'0.08em', padding:'4px 10px 8px', textTransform:'uppercase' }}>Mes Clubs</div>
          {myClubs.map(c => (
            <button key={c.id} onClick={() => navigate(`/clubs/${c.slug}`)} style={{
              display:'flex', alignItems:'center', gap:10, width:'100%',
              padding:'8px 12px', borderRadius:10, border:'none', background:'none',
              cursor:'pointer', fontFamily:'DM Sans,sans-serif', fontSize:'.85rem', color:'#475569',
              textAlign:'left', transition:'background .15s'
            }} onMouseEnter={e => e.currentTarget.style.background='#f8fafc'} onMouseLeave={e => e.currentTarget.style.background='none'}>
              <span style={{ fontSize:16 }}>{c.emoji}</span>
              <span style={{ fontWeight:500 }}>{c.name}</span>
              <span style={{ marginLeft:'auto', width:7, height:7, borderRadius:'50%', background:c.color, flexShrink:0 }}/>
            </button>
          ))}
        </div>
      )}

      {/* CTA */}
      {!currentUser && (
        <div style={{
          background:'linear-gradient(135deg,#1a56db,#4f46e5)',
          borderRadius:14, padding:16, color:'#fff'
        }}>
          <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.95rem', marginBottom:6 }}>Rejoignez la communauté</div>
          <div style={{ fontSize:'.8rem', opacity:.85, marginBottom:14, lineHeight:1.5 }}>Accédez aux clubs, reels et espaces collaboratifs.</div>
          <NavLink to="/register" style={{ display:'block', textAlign:'center', background:'rgba(255,255,255,.2)', color:'#fff', padding:'8px', borderRadius:10, textDecoration:'none', fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.85rem', border:'1px solid rgba(255,255,255,.3)' }}>
            S'inscrire gratuitement →
          </NavLink>
        </div>
      )}
    </div>
  )
}
