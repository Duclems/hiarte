import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="page page--home">
      <div className="home-main">
        <div className="home-hero__text">
          <div className="home-hero__headline">
            <span className="home-hero__line">Design.</span>
            <span className="home-hero__line">Code.</span>
            <span className="home-hero__line">Impact</span>
          </div>
          <p className="home-hero__tagline">
            Façonnons des solutions numériques où la précision technique rencontre une identité forte
          </p>
        </div>
        <div className="home-intro">
          <p>
            Hiarte est une structure indépendante spécialisée dans la création de solutions numériques sur mesure : développement d'applications, IA, automatisation, outils créateurs et projets innovants.
          </p>
          <p>
            Chaque projet est conçu avec exigence, précision et vision long terme.
          </p>
        </div>
      </div>
      <div className="home-actions">
        <Link to="/projects" className="home-frame">
          Explorer nos services
        </Link>
        <Link to="/contact" className="home-frame">
          Démarrer un projet
        </Link>
      </div>
    </div>
  )
}
