import { Routes, Route } from 'react-router-dom'
import './App.css'
import { MainLayout } from './components/templates/MainLayout'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { ProjectPathPage } from './pages/ProjectPathPage'
import { LegalPage } from './pages/LegalPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="demarrer-un-projet" element={<ProjectPathPage />} />
        <Route path="mentions-legales" element={<LegalPage />} />
        <Route path="politique-confidentialite" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
