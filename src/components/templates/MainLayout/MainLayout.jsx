import { Outlet } from 'react-router-dom'
import { Header } from '../../organisms/Header'
import { Footer } from '../../organisms/Footer'
import { LightRays } from '../../atoms/LightRays'
import { HeadMeta } from '../../atoms/HeadMeta'
import './MainLayout.css'

export function MainLayout() {
  return (
    <div className="main-layout">
      <HeadMeta />
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <div className="main-layout__background">
        <LightRays
          raysOrigin="top-right"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={1.6}
          rayLength={3}
          fadeDistance={1}
          saturation={2}
          followMouse={true}
          mouseInfluence={0.05}
          noiseAmount={0.5}
          distortion={0}
          pulsating={false}
        />
      </div>
      <Header />
      <main id="main-content" className="main-layout__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
