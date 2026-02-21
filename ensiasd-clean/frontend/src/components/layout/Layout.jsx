import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Layout() {
  return (
    <div style={{ minHeight:'100vh', background:'#f1f5f9' }}>
      <Topbar />
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 16px', display:'grid', gridTemplateColumns:'240px 1fr', gap:20, paddingTop:80 }}>
        <aside style={{ position:'sticky', top:80, height:'fit-content' }}>
          <Sidebar />
        </aside>
        <main style={{ paddingBottom:40 }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
