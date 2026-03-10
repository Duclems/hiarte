import { useTranslation } from 'react-i18next'
import { Text } from '../components/atoms/Text'

export function AboutPage() {
  const { t } = useTranslation()
  return (
    <div className="page">
      <Text as="h1" variant="h1" className="page__title">
        {t('about.title')}
      </Text>
      <Text variant="lead">
        {t('about.subtitle')}
      </Text>

      <Text variant="body" style={{ marginTop: '1.5rem' }}>
        Hiarte est né d’une conviction simple : le numérique ne devrait jamais être seulement
        fonctionnel. Il devrait être <strong>clair, utile, beau, accessible et pensé pour durer</strong>.
      </Text>

      <Text variant="body" style={{ marginTop: '1rem' }}>
        Derrière Hiarte, il y a un profil à la croisée de plusieurs mondes :{' '}
        <strong>
          le développement logiciel, l’UX/UI, l’automatisation, la création d’outils sur mesure et une
          vraie sensibilité au design
        </strong>
        . Cette approche s’est construite au fil de projets concrets mêlant conception logicielle,
        développement full‑stack, architecture de pipelines, outillage métier et intégration de services
        tiers.
      </Text>

      <Text variant="body" style={{ marginTop: '1rem' }}>
        Hiarte, ce n’est pas une logique de production standardisée. C’est une manière de concevoir des
        solutions numériques avec <strong>exigence technique</strong> et <strong>identité forte</strong>.
        Chaque projet est pensé comme un équilibre entre structure et intuition : un code propre, une
        interface lisible, un usage fluide, et une direction visuelle qui donne du sens à l’ensemble.
      </Text>

      <Text variant="body" style={{ marginTop: '1rem' }}>
        L’<strong>accessibilité</strong> occupe une place centrale dans cette démarche. Concevoir un
        outil, ce n’est pas seulement le rendre disponible : c’est faire en sorte qu’il soit{' '}
        <strong>compréhensible, confortable, inclusif et réellement utilisable</strong>. Cela implique de
        porter attention à la hiérarchie visuelle, aux contrastes, à la lisibilité, à la clarté des
        parcours, mais aussi à la manière dont une interface accompagne des usages variés, parfois
        techniques, parfois quotidiens. Pour Hiarte, une bonne solution est une solution qui n’exclut pas.
      </Text>

      <Text variant="body" style={{ marginTop: '1rem' }}>
        Cette vision s’appuie aussi sur un parcours où la technique n’a jamais été séparée de
        l’expression. À travers des projets plus créatifs, expérimentaux ou communautaires, une autre
        dimension s’est affirmée : celle de <strong>concevoir des expériences vivantes</strong>, capables
        de créer du lien, de transmettre une intention et de porter une identité. Cet esprit nourrit
        aujourd’hui Hiarte : un studio capable de développer des outils solides, sans jamais oublier
        l’émotion, la singularité et l’humain derrière l’écran.
      </Text>

      <Text variant="body" style={{ marginTop: '1rem' }}>
        Qu’il s’agisse d’une application, d’un outil interne, d’un prototype ou d’un système
        d’automatisation, Hiarte défend la même idée :{' '}
        <strong>le sur‑mesure a de la valeur</strong>. Parce qu’un bon produit ne se contente pas de
        fonctionner. Il doit répondre à un vrai besoin, simplifier ce qui est complexe, respecter les
        personnes qui l’utilisent et incarner quelque chose de plus grand qu’une simple fonctionnalité.
      </Text>

      <Text variant="body" style={{ marginTop: '1.25rem' }}>
        <strong>Design. Code. Impact.</strong>
      </Text>
      <Text variant="body" style={{ marginTop: '0.25rem' }}>
        Trois mots qui résument la vision de Hiarte : créer des solutions numériques précises, humaines et
        durables, où la technique sert l’usage, et où l’identité renforce l’impact.
      </Text>
    </div>
  )
}
