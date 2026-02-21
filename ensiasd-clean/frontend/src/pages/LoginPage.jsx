import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '@/context/AppContext'

export default function LoginPage() {
  const { login, loginAs, MOCK_USERS } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = login(form.email, form.password)
    if (res.success) {
      setTimeout(() => navigate('/'), 300)
    } else {
      setError(res.error)
      setLoading(false)
    }
  }

  const DEMO_ACCOUNTS = [
    { label: '🎓 Étudiant', email: 'ahmed@ensiasd.dz', password: '1234', desc: 'Naviguer & rejoindre des clubs' },
    { label: '👨‍💻 Admin Info', email: 'karim@ensiasd.dz', password: '1234', desc: 'Admin Club Informatique' },
    { label: '⚽ Admin Sport', email: 'amine@ensiasd.dz', password: '1234', desc: 'Admin Club Sport' },
  ]

  return (
    <div style={{
      minHeight:'100vh', background:'#f1f5f9', display:'flex', alignItems:'center', justifyContent:'center', padding:20
    }}>
      <div style={{ width:'100%', maxWidth:440 }}>
        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:32 }} className="animate-fadeUp">
          <Link to="/" style={{ textDecoration:'none' }}>
            <div style={{
              width:56, height:56, borderRadius:16, background:'linear-gradient(135deg,#1a56db,#4f46e5)',
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#fff', fontFamily:'Syne,sans-serif', fontWeight:900, fontSize:24,
              margin:'0 auto 16px', boxShadow:'0 8px 24px rgba(26,86,219,.3)'
            }}>E</div>
          </Link>
          <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.7rem', color:'#0f172a', margin:0 }}>Bon retour !</h1>
          <p style={{ color:'#64748b', marginTop:6, fontSize:'.9rem' }}>Connectez-vous à votre compte ENSIASD</p>
        </div>

        {/* Demo accounts */}
        <div className="card animate-fadeUp delay-1" style={{ padding:16, marginBottom:20 }}>
          <div style={{ fontFamily:'Syne,sans-serif', fontSize:'.72rem', fontWeight:700, color:'#94a3b8', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10 }}>Comptes démo — cliquez pour vous connecter</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {DEMO_ACCOUNTS.map(acc => (
              <button key={acc.email} onClick={() => { login(acc.email, acc.password); navigate('/') }} style={{
                display:'flex', alignItems:'center', gap:12, padding:'10px 14px',
                border:'1.5px solid #e2e8f0', borderRadius:12, background:'#fafafa',
                cursor:'pointer', textAlign:'left', transition:'all .15s'
              }} onMouseEnter={e => { e.currentTarget.style.background='#eff6ff'; e.currentTarget.style.borderColor='#bfdbfe' }}
                 onMouseLeave={e => { e.currentTarget.style.background='#fafafa'; e.currentTarget.style.borderColor='#e2e8f0' }}>
                <span style={{ fontSize:22 }}>{acc.label.split(' ')[0]}</span>
                <div>
                  <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.85rem', color:'#1e293b' }}>{acc.label.slice(3)}</div>
                  <div style={{ fontSize:'.75rem', color:'#94a3b8' }}>{acc.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="card animate-fadeUp delay-2" style={{ padding:28 }}>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'1rem', margin:'0 0 20px', color:'#0f172a' }}>Ou connectez-vous manuellement</h2>
          {error && (
            <div style={{ background:'#fef2f2', border:'1px solid #fecaca', borderRadius:10, padding:'10px 14px', color:'#dc2626', fontSize:'.85rem', marginBottom:16 }}>
              ⚠️ {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:14 }}>
              <label style={{ display:'block', fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'.8rem', color:'#475569', marginBottom:6 }}>Email</label>
              <input className="input" type="email" value={form.email} onChange={e => setForm(f => ({...f, email:e.target.value}))} placeholder="vous@ensiasd.dz" required />
            </div>
            <div style={{ marginBottom:22 }}>
              <label style={{ display:'block', fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'.8rem', color:'#475569', marginBottom:6 }}>Mot de passe</label>
              <input className="input" type="password" value={form.password} onChange={e => setForm(f => ({...f, password:e.target.value}))} placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn-primary" style={{ width:'100%', padding:'.75rem' }} disabled={loading}>
              {loading ? '...' : 'Se connecter →'}
            </button>
          </form>
          <p style={{ textAlign:'center', marginTop:18, fontSize:'.875rem', color:'#64748b' }}>
            Pas encore inscrit ? <Link to="/register" style={{ color:'#1a56db', fontWeight:600, textDecoration:'none' }}>Créer un compte</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
