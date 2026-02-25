import { Routes, Route } from 'react-router-dom'
import './App.css'
import { MainLayout } from './components/templates/MainLayout'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { LegalPage } from './pages/LegalPage'
import { PrivacyPage } from './pages/PrivacyPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="mentions-legales" element={<LegalPage />} />
        <Route path="politique-confidentialite" element={<PrivacyPage />} />
      </Route>
    </Routes>
  )
}

export default App
