import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { useState } from 'react'

export default function Topbar() {
  const { currentUser, logout, search, setSearch, isAdmin } = useApp()
  const navigate = useNavigate()
  const [menu, setMenu] = useState(false)

  return (
    <header style={{
      position:'fixed', top:0, left:0, right:0, zIndex:100,
      background:'rgba(255,255,255,0.9)', backdropFilter:'blur(20px)',
      borderBottom:'1px solid #e2e8f0', height:64,
      display:'flex', alignItems:'center', padding:'0 24px', gap:16
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
        <div style={{
          width:36, height:36, borderRadius:10,
          background:'linear-gradient(135deg,#1a56db,#4f46e5)',
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'#fff', fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:16
        }}>E</div>
        <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:17, color:'#0f172a', letterSpacing:'-0.3px' }}>
          ENSI<span style={{ color:'#1a56db' }}>ASD</span>
        </span>
      </Link>

      {/* Search */}
      <div style={{ flex:1, maxWidth:440 }}>
        <input
          className="input"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍  Rechercher clubs, publications…"
          style={{ paddingLeft:'1rem', fontSize:'.875rem', background:'#f8fafc' }}
        />
      </div>

      {/* Right */}
      <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:12 }}>
        {currentUser ? (
          <div style={{ position:'relative' }}>
            <button onClick={() => setMenu(!menu)} style={{
              display:'flex', alignItems:'center', gap:8, padding:'6px 12px',
              border:'1.5px solid #e2e8f0', borderRadius:12, background:'#fff',
              cursor:'pointer', fontFamily:'DM Sans,sans-serif'
            }}>
              <span style={{ fontSize:20 }}>{currentUser.avatar}</span>
              <span style={{ fontSize:'.875rem', fontWeight:500, color:'#1e293b' }}>{currentUser.full_name.split(' ')[0]}</span>
              {isAdmin && <span style={{ background:'#eff6ff', color:'#1a56db', fontSize:'.65rem', fontWeight:700, padding:'2px 6px', borderRadius:6, fontFamily:'Syne,sans-serif' }}>ADMIN</span>}
              <span style={{ color:'#94a3b8', fontSize:12 }}>▼</span>
            </button>
            {menu && (
              <div style={{
                position:'absolute', right:0, top:'calc(100% + 8px)',
                background:'#fff', border:'1px solid #e2e8f0', borderRadius:14,
                boxShadow:'0 8px 30px rgba(0,0,0,.12)', minWidth:180, padding:6, zIndex:200
              }}>
                {isAdmin && (
                  <button onClick={() => { navigate('/admin'); setMenu(false) }} style={{
                    display:'block', width:'100%', textAlign:'left', padding:'9px 14px',
                    borderRadius:10, border:'none', background:'none', cursor:'pointer',
                    fontFamily:'DM Sans,sans-serif', fontSize:'.875rem', color:'#1a56db', fontWeight:600
                  }}>📊 Dashboard Admin</button>
                )}
                <button onClick={() => { navigate('/'); setMenu(false) }} style={{
                  display:'block', width:'100%', textAlign:'left', padding:'9px 14px',
                  borderRadius:10, border:'none', background:'none', cursor:'pointer',
                  fontFamily:'DM Sans,sans-serif', fontSize:'.875rem', color:'#475569'
                }}>🏠 Accueil</button>
                <hr style={{ margin:'4px 8px', borderColor:'#f1f5f9' }} />
                <button onClick={() => { logout(); setMenu(false) }} style={{
                  display:'block', width:'100%', textAlign:'left', padding:'9px 14px',
                  borderRadius:10, border:'none', background:'none', cursor:'pointer',
                  fontFamily:'DM Sans,sans-serif', fontSize:'.875rem', color:'#ef4444', fontWeight:500
                }}>→ Se déconnecter</button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={() => navigate('/login')} className="btn-ghost" style={{ fontSize:'.875rem', padding:'.5rem 1.1rem' }}>Connexion</button>
            <button onClick={() => navigate('/register')} className="btn-primary" style={{ fontSize:'.875rem', padding:'.5rem 1.1rem' }}>S'inscrire</button>
          </div>
        )}
      </div>
    </header>
  )
}
