import { useState } from 'react'
import { useApp } from '@/context/AppContext'

const TASKS = [
  { id:'1', title:'Préparer la présentation Hackathon', club:'Club Informatique', priority:'high', done:false, assignee:'Sara M.' },
  { id:'2', title:'Réserver le terrain de football', club:'Club Sport', priority:'medium', done:true, assignee:'Amine Z.' },
  { id:'3', title:'Créer le design de l\'affiche', club:'Club Art', priority:'low', done:false, assignee:'Lina H.' },
  { id:'4', title:'Contacter les sponsors du Pitch Day', club:'Club Entrepreneuriat', priority:'high', done:false, assignee:'Rania K.' },
  { id:'5', title:'Finir la programmation du robot', club:'Club Robotique', priority:'high', done:true, assignee:'Yacine B.' },
]

const PRIORITY_COLORS = { high:'#ef4444', medium:'#f59e0b', low:'#10b981' }
const PRIORITY_LABELS = { high:'Urgent', medium:'Moyen', low:'Faible' }

export default function TeamSpacePage() {
  const { currentUser } = useApp()
  const [tasks, setTasks] = useState(TASKS)
  const [newTask, setNewTask] = useState('')

  function toggle(id) { setTasks(p => p.map(t => t.id===id ? {...t,done:!t.done} : t)) }

  const done = tasks.filter(t=>t.done).length
  const progress = Math.round(done/tasks.length*100)

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div className="animate-fadeUp" style={{
        background:'linear-gradient(135deg,#1e1b4b,#312e81)',
        borderRadius:20, padding:'24px 28px', color:'#fff'
      }}>
        <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:900, fontSize:'1.8rem', margin:'0 0 6px' }}>👥 Team Space</h1>
        <p style={{ opacity:.65, fontSize:'.875rem', margin:0 }}>Espace collaboratif — tâches et coordination des clubs</p>
      </div>

      {/* Progress */}
      <div className="card animate-fadeUp delay-1" style={{ padding:20 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
          <div style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'.9rem', color:'#0f172a' }}>Avancement général</div>
          <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1rem', color:'#4f46e5' }}>{progress}%</div>
        </div>
        <div style={{ height:8, background:'#f1f5f9', borderRadius:99, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${progress}%`, background:'linear-gradient(90deg,#4f46e5,#7c3aed)', borderRadius:99, transition:'width .5s ease' }}/>
        </div>
        <div style={{ fontSize:'.75rem', color:'#94a3b8', marginTop:8 }}>{done} / {tasks.length} tâches terminées</div>
      </div>

      {/* Quick add */}
      <div className="card animate-fadeUp delay-2" style={{ padding:16, display:'flex', gap:10 }}>
        <input className="input" value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Nouvelle tâche…"
          onKeyDown={e => { if(e.key==='Enter' && newTask.trim()) { setTasks(p=>[{id:String(Date.now()),title:newTask.trim(),club:'Général',priority:'medium',done:false,assignee:currentUser?.full_name?.split(' ')[0]||'Moi'},...p]); setNewTask('') } }}
          style={{ flex:1 }} />
        <button onClick={() => { if(newTask.trim()) { setTasks(p=>[{id:String(Date.now()),title:newTask.trim(),club:'Général',priority:'medium',done:false,assignee:'Moi'},...p]); setNewTask('') } }} className="btn-primary" style={{ flexShrink:0, padding:'.65rem 1.2rem' }}>+ Ajouter</button>
      </div>

      {/* Tasks */}
      <div className="animate-fadeUp delay-3" style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {tasks.map(task => (
          <div key={task.id} className="card" style={{ padding:'14px 18px', display:'flex', alignItems:'center', gap:14, opacity: task.done ? .6 : 1, transition:'opacity .2s' }}>
            <button onClick={() => toggle(task.id)} style={{
              width:24, height:24, borderRadius:8, border:`2px solid ${task.done ? '#4f46e5' : '#e2e8f0'}`,
              background: task.done ? '#4f46e5' : 'transparent', cursor:'pointer', flexShrink:0,
              display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:12, transition:'all .2s'
            }}>{task.done ? '✓' : ''}</button>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'.88rem', color:'#0f172a', textDecoration: task.done ? 'line-through' : 'none' }}>{task.title}</div>
              <div style={{ fontSize:'.73rem', color:'#94a3b8', marginTop:2 }}>{task.club} · {task.assignee}</div>
            </div>
            <span style={{ background:`${PRIORITY_COLORS[task.priority]}15`, color:PRIORITY_COLORS[task.priority], fontSize:'.7rem', fontWeight:700, padding:'3px 10px', borderRadius:99, fontFamily:'Syne,sans-serif', flexShrink:0 }}>
              {PRIORITY_LABELS[task.priority]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
