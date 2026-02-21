import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '@/context/AppContext'

export default function RegisterPage() {
  const { loginAs } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', password:'', year:'1ère année' })
  const [done, setDone] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    const user = { id: 'new-' + Date.now(), full_name: form.name, email: form.email, role:'student', avatar:'🎓', year:form.year, password:form.password }
    loginAs(user)
    setDone(true)
    setTimeout(() => navigate('/'), 1200)
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f1f5f9', display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ width:'100%', maxWidth:420 }}>
        <div style={{ textAlign:'center', marginBottom:28 }} className="animate-fadeUp">
          <Link to="/" style={{ textDecoration:'none' }}>
            <div style={{ width:52, height:52, borderRadius:14, background:'linear-gradient(135deg,#1a56db,#4f46e5)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontFamily:'Syne,sans-serif', fontWeight:900, fontSize:22, margin:'0 auto 14px', boxShadow:'0 8px 24px rgba(26,86,219,.3)' }}>E</div>
          </Link>
          <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.6rem', color:'#0f172a', margin:0 }}>Créer un compte</h1>
          <p style={{ color:'#64748b', marginTop:6, fontSize:'.875rem' }}>Rejoignez la communauté ENSIASD</p>
        </div>

        <div className="card animate-fadeUp delay-1" style={{ padding:28 }}>
          {done ? (
            <div style={{ textAlign:'center', padding:'20px 0' }}>
              <div style={{ fontSize:52, marginBottom:12 }}>🎉</div>
              <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, color:'#0f172a' }}>Bienvenue {form.name.split(' ')[0]} !</h3>
              <p style={{ color:'#64748b', fontSize:'.875rem' }}>Redirection en cours…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {[
                { key:'name', label:'Nom complet', type:'text', placeholder:'Prénom Nom' },
                { key:'email', label:'Email ENSIASD', type:'email', placeholder:'vous@ensiasd.dz' },
                { key:'password', label:'Mot de passe', type:'password', placeholder:'••••••••' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom:14 }}>
                  <label style={{ display:'block', fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'.8rem', color:'#475569', marginBottom:6 }}>{f.label}</label>
                  <input className="input" type={f.type} value={form[f.key]} onChange={e => setForm(p=>({...p,[f.key]:e.target.value}))} placeholder={f.placeholder} required />
                </div>
              ))}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:'block', fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'.8rem', color:'#475569', marginBottom:6 }}>Année d'études</label>
                <select className="input" value={form.year} onChange={e => setForm(p=>({...p,year:e.target.value}))}>
                  {['1ère année','2ème année','3ème année','4ème année','5ème année'].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <button type="submit" className="btn-primary" style={{ width:'100%', padding:'.75rem' }}>
                Créer mon compte →
              </button>
            </form>
          )}
          {!done && (
            <p style={{ textAlign:'center', marginTop:18, fontSize:'.875rem', color:'#64748b' }}>
              Déjà inscrit ? <Link to="/login" style={{ color:'#1a56db', fontWeight:600, textDecoration:'none' }}>Se connecter</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
