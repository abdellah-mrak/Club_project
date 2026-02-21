import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const REELS = [
  { id:'1', club:'Club Robotique', emoji:'🤖', title:'Notre robot en action !', views:1240, duration:'0:42', color:'#ef4444' },
  { id:'2', club:'Club Sport', emoji:'⚽', title:'Finale du tournoi — top moments', views:2100, duration:'1:15', color:'#10b981' },
  { id:'3', club:'Club Informatique', emoji:'💻', title:'Demo IA — projet de fin d\'année', views:892, duration:'2:30', color:'#3b82f6' },
  { id:'4', club:'Club Art', emoji:'🎨', title:'Timelapse de l\'exposition', views:543, duration:'0:58', color:'#ec4899' },
  { id:'5', club:'Club Musique', emoji:'🎵', title:'Concert de fin de semestre', views:1670, duration:'3:20', color:'#f59e0b' },
  { id:'6', club:'Club Entrepreneuriat', emoji:'🚀', title:'Pitch Day highlights', views:789, duration:'1:45', color:'#0ea5e9' },
]

export default function VideosPage() {
  const [active, setActive] = useState(null)
  const navigate = useNavigate()

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <div className="animate-fadeUp" style={{
        background:'linear-gradient(135deg,#0f172a,#1e293b)',
        borderRadius:20, padding:'24px 28px', color:'#fff'
      }}>
        <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:900, fontSize:'1.8rem', margin:'0 0 6px' }}>🎬 Reels ENSIASD</h1>
        <p style={{ opacity:.65, fontSize:'.875rem', margin:0 }}>Courtes vidéos des clubs — moments forts et projets</p>
      </div>

      <div className="animate-fadeUp delay-1" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:14 }}>
        {REELS.map((r, i) => (
          <div key={r.id} onClick={() => setActive(r)} style={{
            background:'#fff', borderRadius:16, overflow:'hidden', cursor:'pointer',
            border:'1px solid #e2e8f0', boxShadow:'0 1px 3px rgba(0,0,0,.06)',
            transition:'all .2s'
          }} onMouseEnter={e => { e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,0,0,.12)' }}
             onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,.06)' }}>
            <div style={{
              height:130, background:`linear-gradient(135deg,${r.color}cc,${r.color}88)`,
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', position:'relative'
            }}>
              <span style={{ fontSize:40 }}>{r.emoji}</span>
              <div style={{
                position:'absolute', bottom:8, right:8,
                background:'rgba(0,0,0,.5)', color:'#fff', fontSize:'.7rem', fontWeight:600,
                padding:'2px 8px', borderRadius:99, fontFamily:'Syne,sans-serif'
              }}>{r.duration}</div>
              <div style={{
                position:'absolute', inset:0, background:'rgba(0,0,0,.0)',
                display:'flex', alignItems:'center', justifyContent:'center',
                transition:'background .2s'
              }}>
                <div style={{ width:44, height:44, borderRadius:'50%', background:'rgba(255,255,255,.25)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>▶</div>
              </div>
            </div>
            <div style={{ padding:'10px 12px' }}>
              <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.83rem', color:'#0f172a', marginBottom:4, lineHeight:1.3 }}>{r.title}</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:'.7rem', color:'#94a3b8' }}>{r.club}</span>
                <span style={{ fontSize:'.7rem', color:'#94a3b8' }}>👁 {r.views.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {active && (
        <div onClick={() => setActive(null)} style={{
          position:'fixed', inset:0, background:'rgba(0,0,0,.75)', backdropFilter:'blur(8px)',
          display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:20
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background:'#fff', borderRadius:20, overflow:'hidden', width:'100%', maxWidth:480,
            boxShadow:'0 24px 80px rgba(0,0,0,.4)'
          }}>
            <div style={{ height:260, background:`linear-gradient(135deg,${active.color},${active.color}88)`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12 }}>
              <span style={{ fontSize:64 }}>{active.emoji}</span>
              <div style={{ background:'rgba(0,0,0,.3)', backdropFilter:'blur(4px)', width:56, height:56, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, color:'#fff', cursor:'pointer' }}>▶</div>
              <div style={{ color:'rgba(255,255,255,.7)', fontSize:'.8rem', fontFamily:'Syne,sans-serif' }}>Aperçu simulé · vidéo non disponible en démo</div>
            </div>
            <div style={{ padding:24 }}>
              <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.1rem', color:'#0f172a', margin:'0 0 6px' }}>{active.title}</h3>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
                <span style={{ fontSize:'.8rem', color:'#64748b' }}>{active.club}</span>
                <span style={{ fontSize:'.8rem', color:'#94a3b8' }}>· 👁 {active.views.toLocaleString()} vues</span>
                <span style={{ fontSize:'.8rem', color:'#94a3b8' }}>· ⏱ {active.duration}</span>
              </div>
              <button onClick={() => setActive(null)} className="btn-ghost" style={{ width:'100%' }}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
