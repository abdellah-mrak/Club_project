import { Link } from 'react-router-dom'
export default function NotFoundPage() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#f1f5f9', fontFamily:'Syne,sans-serif' }}>
      <div style={{ fontSize:72, marginBottom:16 }}>404</div>
      <h1 style={{ fontWeight:800, fontSize:'1.5rem', color:'#0f172a', margin:'0 0 8px' }}>Page introuvable</h1>
      <p style={{ color:'#64748b', marginBottom:24 }}>Cette page n'existe pas ou a été déplacée.</p>
      <Link to="/" style={{ background:'#1a56db', color:'#fff', textDecoration:'none', padding:'10px 24px', borderRadius:12, fontWeight:700 }}>← Retour à l'accueil</Link>
    </div>
  )
}
