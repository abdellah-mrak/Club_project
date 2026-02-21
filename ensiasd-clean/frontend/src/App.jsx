import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useApp } from '@/context/AppContext'
import Layout from '@/components/layout/Layout'
import { lazy, Suspense } from 'react'

const HomePage        = lazy(() => import('@/pages/HomePage'))
const ClubsPage       = lazy(() => import('@/pages/ClubsPage'))
const ClubDetailPage  = lazy(() => import('@/pages/ClubDetailPage'))
const AdminPage       = lazy(() => import('@/pages/AdminPage'))
const LoginPage       = lazy(() => import('@/pages/LoginPage'))
const RegisterPage    = lazy(() => import('@/pages/RegisterPage'))
const VideosPage      = lazy(() => import('@/pages/VideosPage'))
const MessagingPage   = lazy(() => import('@/pages/MessagingPage'))
const TeamSpacePage   = lazy(() => import('@/pages/TeamSpacePage'))
const NotFoundPage    = lazy(() => import('@/pages/NotFoundPage'))

function Spinner() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#f8fafc' }}>
      <div style={{ width:42, height:42, border:'3px solid #e2e8f0', borderTopColor:'#1a56db', borderRadius:'50%', animation:'spin 0.7s linear infinite' }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

function ProtectedRoute({ children, adminOnly }) {
  const { currentUser, isAdmin } = useApp()
  if (!currentUser) return <Navigate to="/login" replace />
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />
  return children
}

function AppRoutes() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="clubs" element={<ClubsPage />} />
          <Route path="clubs/:slug" element={<ClubDetailPage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="messages" element={<ProtectedRoute><MessagingPage /></ProtectedRoute>} />
          <Route path="team" element={<ProtectedRoute><TeamSpacePage /></ProtectedRoute>} />
          <Route path="admin" element={<ProtectedRoute adminOnly><AdminPage /></ProtectedRoute>} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  )
}
