import { Link } from 'react-router-dom'
import { Text } from '../components/atoms/Text'

export function NotFoundPage() {
  return (
    <div className="page">
      <Text as="h1" variant="h1" className="page__title">
        Oh non, vous faites quoi ici ?
      </Text>
      <Text variant="lead" className="page__subtitle">
        La page que vous cherchez n’existe pas ou n’est plus disponible.
      </Text>
      <Link to="/" className="home-frame">
        Retour à l’accueil
      </Link>
    </div>
  )
}

