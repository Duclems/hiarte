import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="page page--home">
      <div className="home-main">
        <div className="home-hero__text">
          <div className="home-hero__headline">
            <span className="home-hero__line">Design</span>
            <span className="home-hero__line">Code</span>
            <span className="home-hero__line">Impact</span>
          </div>
          <p className="home-hero__tagline">
            Façonnons des solutions numériques avec une identité forte
          </p>
        </div>
        <div className="home-intro">
          <p>
            Hiarte est une micro entreprise spécialisée dans la création de solutions numériques sur mesure : développement d'applications, automatisation et création d'outils.
          </p>
        </div>
      </div>
      <div className="home-center">
        <img src="/oui.webp" alt="" className="home-center__img" />
      </div>
      <div className="home-actions">
        <Link to="/projects" className="home-frame">
          Explorer nos services
        </Link>
        <Link to="/contact" className="home-frame home-frame--outline">
          Démarrer un projet
        </Link>
      </div>
    </div>
  )
}
