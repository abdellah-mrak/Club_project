// src/context/AppContext.jsx — Mock data, no backend
import { createContext, useContext, useState } from 'react'

const AppCtx = createContext(null)
export const useApp = () => useContext(AppCtx)

export const MOCK_CLUBS = [
  { id: 'informatique', slug: 'informatique', name: 'Club Informatique', emoji: '💻', color: '#3b82f6', gradient: '#3b82f6,#1d4ed8', category: 'Tech', members_count: 87, description: 'Programmation, IA, cybersécurité et développement de projets innovants.' },
  { id: 'sciences',     slug: 'sciences',     name: 'Club Sciences',     emoji: '🔬', color: '#8b5cf6', gradient: '#8b5cf6,#6d28d9', category: 'Science', members_count: 54, description: 'Chimie, physique et biologie expérimentale en labo.' },
  { id: 'art',          slug: 'art',          name: 'Club Art',          emoji: '🎨', color: '#ec4899', gradient: '#ec4899,#be185d', category: 'Créatif', members_count: 41, description: 'Peinture, dessin, photographie et arts visuels.' },
  { id: 'sport',        slug: 'sport',        name: 'Club Sport',        emoji: '⚽', color: '#10b981', gradient: '#10b981,#059669', category: 'Sport', members_count: 123, description: 'Football, basket, tennis et tournois inter-écoles.' },
  { id: 'musique',      slug: 'musique',      name: 'Club Musique',      emoji: '🎵', color: '#f59e0b', gradient: '#f59e0b,#d97706', category: 'Créatif', members_count: 38, description: 'Concerts, ateliers et création musicale ensemble.' },
  { id: 'robotique',    slug: 'robotique',    name: 'Club Robotique',    emoji: '🤖', color: '#ef4444', gradient: '#ef4444,#b91c1c', category: 'Tech', members_count: 62, description: 'Construction de robots et compétitions nationales.' },
  { id: 'litterature',  slug: 'litterature',  name: 'Club Littérature',  emoji: '📚', color: '#6366f1', gradient: '#6366f1,#4338ca', category: 'Culture', members_count: 29, description: 'Lectures, débats et ateliers d\'écriture créative.' },
  { id: 'entrepreneuriat', slug: 'entrepreneuriat', name: 'Club Entrepreneuriat', emoji: '🚀', color: '#0ea5e9', gradient: '#0ea5e9,#0284c7', category: 'Business', members_count: 71, description: 'Startups, pitchs et développement d\'idées innovantes.' },
]

export const INITIAL_POSTS = [
  { id: '1', club_id: 'informatique', title: 'Hackathon 48h ce weekend !', content: 'Rejoignez-nous pour 48h de code intense. Thème: IA pour l\'éducation. Prix à gagner !', likes_count: 34, created_at: '2025-01-15', author: { full_name: 'Karim Bensalem', avatar: '👨‍💻' } },
  { id: '2', club_id: 'informatique', title: 'Workshop React & TypeScript', content: 'Formation intensive React avec TypeScript. Niveau intermédiaire. Places limitées à 20 étudiants.', likes_count: 21, created_at: '2025-01-12', author: { full_name: 'Sara Mansouri', avatar: '👩‍💻' } },
  { id: '3', club_id: 'sport',        title: 'Tournoi de football inter-promo', content: 'Le grand tournoi annuel commence le 20 janvier ! Inscrivez vos équipes de 7 avant vendredi.', likes_count: 57, created_at: '2025-01-14', author: { full_name: 'Amine Zerrouk', avatar: '⚽' } },
  { id: '4', club_id: 'art',          title: 'Exposition de fin de semestre', content: 'Vernissage de l\'exposition annuelle le 25 janvier. Venez découvrir les créations des membres.', likes_count: 18, created_at: '2025-01-10', author: { full_name: 'Lina Hadj', avatar: '🎨' } },
  { id: '5', club_id: 'robotique',    title: 'Qualification RoboCup Algérie ✅', content: 'Notre équipe s\'est qualifiée ! Merci à tous les membres pour leur travail acharné ces 3 mois.', likes_count: 89, created_at: '2025-01-08', author: { full_name: 'Yacine Bouali', avatar: '🤖' } },
  { id: '6', club_id: 'entrepreneuriat', title: 'Pitch Day — 5 startups ENSIASD', content: 'Cinq projets étudiants présentés devant des investisseurs. Un moment historique pour notre école !', likes_count: 63, created_at: '2025-01-06', author: { full_name: 'Rania Khelifi', avatar: '🚀' } },
]

export const MOCK_USERS = [
  { id: 'student1', full_name: 'Ahmed Benali', username: 'ahmed.b', role: 'student', avatar: '🎓', year: '2ème année', email: 'ahmed@ensiasd.dz', password: '1234' },
  { id: 'admin1',   full_name: 'Karim Bensalem', username: 'karim.b', role: 'club_admin', avatar: '👨‍💻', club_id: 'informatique', year: '3ème année', email: 'karim@ensiasd.dz', password: '1234' },
  { id: 'admin2',   full_name: 'Amine Zerrouk',  username: 'amine.z', role: 'club_admin', avatar: '⚽', club_id: 'sport', year: '4ème année', email: 'amine@ensiasd.dz', password: '1234' },
]

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [search, setSearch] = useState('')
  const [joinedClubs, setJoinedClubs] = useState([])
  const [posts, setPosts] = useState(INITIAL_POSTS)

  const isAdmin = currentUser?.role === 'club_admin' || currentUser?.role === 'super_admin'

  function login(email, password) {
    const user = MOCK_USERS.find(u => u.email === email && u.password === password)
    if (user) { setCurrentUser(user); return { success: true, user } }
    return { success: false, error: 'Email ou mot de passe incorrect' }
  }
  function loginAs(user) { setCurrentUser(user) }
  function logout() { setCurrentUser(null); setJoinedClubs([]) }

  function joinClub(clubId) { if (!joinedClubs.includes(clubId)) setJoinedClubs(p => [...p, clubId]) }
  function leaveClub(clubId) { setJoinedClubs(p => p.filter(id => id !== clubId)) }
  function isJoined(clubId) { return joinedClubs.includes(clubId) }

  let nextId = 100
  function addPost(post) { setPosts(p => [{ ...post, id: String(nextId++), likes_count: 0, created_at: new Date().toISOString().slice(0,10) }, ...p]) }
  function updatePost(id, data) { setPosts(p => p.map(x => x.id === id ? { ...x, ...data } : x)) }
  function deletePost(id) { setPosts(p => p.filter(x => x.id !== id)) }
  function likePost(id) { setPosts(p => p.map(x => x.id === id ? { ...x, likes_count: x.likes_count + 1 } : x)) }

  return (
    <AppCtx.Provider value={{
      currentUser, isAdmin, session: currentUser,
      login, loginAs, logout,
      joinedClubs, joinClub, leaveClub, isJoined,
      posts, addPost, updatePost, deletePost, likePost,
      search, setSearch,
      clubs: MOCK_CLUBS,
    }}>
      {children}
    </AppCtx.Provider>
  )
}
