import { useState, useEffect, useRef } from 'react'
import { Text } from '../components/atoms/Text'
import projectPathConfig from '../config/projectPath.json'
import { Button } from '../components/atoms/Button'

const projectPath = projectPathConfig.projectPath
const rawSteps = projectPath.steps || []
const projectSummaryStep = rawSteps.find((step) => step.id === 'project_summary')
const baseSteps = rawSteps.filter((step) => step.id !== 'project_summary')
const reviewStep = {
  id: 'project_review',
  title: 'Récapitulatif du projet',
  description: 'Vérifiez vos réponses avant d’envoyer votre projet.',
  inputType: 'review',
  required: false,
}
const steps = [...baseSteps, reviewStep, projectSummaryStep].filter(Boolean)

export function ProjectPathPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const optionsRef = useRef(null)
  const [contactStatus, setContactStatus] = useState('idle')
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })

  if (!steps.length) {
    return (
      <div className="page">
        <Text as="h1" variant="h1" className="page__title">
          {projectPath.title}
        </Text>
        <Text variant="body">Aucun parcours n’est configuré pour le moment.</Text>
      </div>
    )
  }

  const currentStep = steps[currentStepIndex]

  useEffect(() => {
    setIsOptionsOpen(false)
  }, [currentStepIndex])

  useEffect(() => {
    if (!isOptionsOpen) return
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setIsOptionsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOptionsOpen])

  const handleContactChange = (event) => {
    const { name, value } = event.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    setContactStatus('submitting')

    try {
      const endpoint =
        import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mqednddr'

      if (!endpoint) {
        throw new Error('Endpoint not configured')
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          firstName: contactForm.firstName,
          lastName: contactForm.lastName,
          email: contactForm.email,
          phone: contactForm.phone,
          message: contactForm.message,
          projectPathAnswers: answers,
        }),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setContactStatus('success')
      setContactForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      })
    } catch (error) {
      setContactStatus('error')
    }
  }

  const updateAnswer = (stepId, value) => {
    setAnswers((prev) => ({ ...prev, [stepId]: value }))
  }

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((index) => index + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((index) => index - 1)
    }
  }

  const isStepValid = () => {
    if (!currentStep.required) return true
    const value = answers[currentStep.id]
    if (currentStep.inputType === 'textarea' || currentStep.id === 'project_features') {
      return Boolean(value && String(value).trim().length > 0)
    }
    // Étapes avec options : si "Autre" demande un texte, on le rend obligatoire
    if (
      currentStep.id !== 'project_features' &&
      currentStep.options &&
      currentStep.options.length > 0
    ) {
      if (!value) return false

      const selectedOption = currentStep.options.find((opt) => opt.value === value)
      if (selectedOption?.hasFreeText) {
        const freeTextKey = `${currentStep.id}__freeText`
        const freeTextValue = answers[freeTextKey]
        return Boolean(freeTextValue && String(freeTextValue).trim().length > 0)
      }

      return true
    }

    return Boolean(value)
  }

  const isLastStep = currentStepIndex === steps.length - 1

  const renderStepInput = (step) => {
    if (step.id === 'project_review') {
      const stepsToSummarize = steps.filter(
        (s) => s.id !== 'project_review' && s.id !== 'project_summary'
      )

      return (
        <div className="project-review">
          {stepsToSummarize.map((s) => {
            const value = answers[s.id]
            let displayValue = 'Non renseigné'

            if (value) {
              if (s.options && s.options.length > 0) {
                const opt = s.options.find((o) => o.value === value)
                displayValue = opt ? opt.label : String(value)
              } else {
                displayValue = String(value)
              }
            }

            return (
              <div key={s.id} className="project-review__item">
                <Text as="h3" variant="h3" className="project-review__label">
                  {s.title}
                </Text>
                <Text as="p" variant="body" className="project-review__value">
                  {displayValue}
                </Text>
              </div>
            )
          })}
        </div>
      )
    }

    if (step.id === 'project_summary') {
      return (
        <form
          id="project-summary-form"
          onSubmit={handleContactSubmit}
          className="contact-form"
        >
          <div className="contact-field">
            <Text as="label" variant="body" htmlFor="firstName">
              First Name *
            </Text>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={contactForm.firstName}
              onChange={handleContactChange}
              className="contact-input"
            />
          </div>

          <div className="contact-field">
            <Text as="label" variant="body" htmlFor="lastName">
              Last Name *
            </Text>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={contactForm.lastName}
              onChange={handleContactChange}
              className="contact-input"
            />
          </div>

          <div className="contact-field">
            <Text as="label" variant="body" htmlFor="email">
              Email *
            </Text>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={contactForm.email}
              onChange={handleContactChange}
              className="contact-input"
            />
          </div>

          <div className="contact-field">
            <Text as="label" variant="body" htmlFor="phone">
              Phone Number *
            </Text>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={contactForm.phone}
              onChange={handleContactChange}
              className="contact-input"
            />
          </div>

          <div className="contact-field">
            <Text as="label" variant="body" htmlFor="message">
              Description
            </Text>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={contactForm.message}
              onChange={handleContactChange}
              className="contact-textarea"
            />
          </div>
        </form>
      )
    }

    if (step.id === 'project_features') {
      return (
        <textarea
          className="contact-textarea"
          rows={6}
          placeholder="Décrivez les fonctionnalités souhaitées"
          value={answers[step.id] || ''}
          onChange={(e) => updateAnswer(step.id, e.target.value)}
        />
      )
    }

    if (step.inputType === 'textarea') {
      return (
        <textarea
          className="contact-textarea"
          rows={6}
          placeholder={step.placeholder}
          value={answers[step.id] || ''}
          onChange={(e) => updateAnswer(step.id, e.target.value)}
        />
      )
    }

    if (step.options && step.options.length > 0) {
      const selected = answers[step.id] || ''
      const sortedOptions = [...step.options].sort((a, b) => {
        if (a.value === 'other' && b.value === 'other') return 0
        if (a.value === 'other') return 1
        if (b.value === 'other') return -1
        return a.label.localeCompare(b.label, 'fr', { sensitivity: 'base' })
      })
      const selectedOption = sortedOptions.find((opt) => opt.value === selected)
      const freeTextKey = `${step.id}__freeText`
      const selectedLabel = selectedOption ? selectedOption.label : 'Sélectionnez une option'

      return (
        <div className="project-step__options" ref={optionsRef}>
          <button
            type="button"
            className="project-select"
            onClick={() => setIsOptionsOpen((open) => !open)}
          >
            {selectedLabel}
          </button>
          {isOptionsOpen && (
            <div className="project-select__menu">
              {sortedOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  className={`project-select__option${
                    selected === opt.value ? ' project-select__option--selected' : ''
                  }`}
                  onClick={() => {
                    updateAnswer(step.id, opt.value)
                    setIsOptionsOpen(false)
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
          {selectedOption?.hasFreeText && (
            <input
              type="text"
              className="contact-input"
              placeholder={selectedOption.freeTextPlaceholder}
              value={answers[freeTextKey] || ''}
              onChange={(e) => updateAnswer(freeTextKey, e.target.value)}
              style={{ marginTop: 'var(--space-sm)' }}
            />
          )}
        </div>
      )
    }

    return null
  }

  return (
    <div className="page page--project-path">
      {!hasStarted && (
        <>
          <Text as="h1" variant="h1" className="page__title">
            {projectPath.title}
          </Text>
          <Text variant="lead" className="page__subtitle">
            {projectPath.description}
          </Text>

          {projectPath.positioning.content && (
            <Text variant="body" style={{ marginTop: 'var(--space-md)' }}>
              {projectPath.positioning.content}
            </Text>
          )}

          <div className="project-start">
            <Button variant="primary" onClick={() => setHasStarted(true)}>
              Démarrer le projet accompagné
            </Button>
          </div>
        </>
      )}

      {hasStarted && (
        <div className="project-path">
        <div className="project-step">
          <Text as="h1" variant="h1" className="project-step__title">
            {currentStep.title}
          </Text>
          {currentStep.description && (
            <Text as="p" variant="lead" className="project-step__description">
              {currentStep.description}
            </Text>
          )}

          {renderStepInput(currentStep)}

          <div className="project-step__actions">
            <div className="project-step__actions-left">
              {currentStepIndex > 0 && (
                <Button variant="secondary" onClick={handlePrevious}>
                  Étape précédente
                </Button>
              )}
            </div>
            <div className="project-step__actions-right">
              {!isLastStep && (
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={!isStepValid()}
                >
                  Étape suivante
                </Button>
              )}
              {isLastStep && (
                <Button
                  type="submit"
                  form="project-summary-form"
                  variant="primary"
                  disabled={contactStatus === 'submitting'}
                >
                  {contactStatus === 'submitting' ? 'Envoi…' : 'Envoyer mon projet'}
                </Button>
              )}
            </div>
          </div>

          {isLastStep && contactStatus === 'success' && (
            <Text variant="body" style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-sm)' }}>
              Votre message a bien été envoyé.
            </Text>
          )}
          {isLastStep && contactStatus === 'error' && (
            <Text variant="body" style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-sm)' }}>
              Une erreur est survenue. Vous pouvez aussi écrire à contact@hiarte.fr.
            </Text>
          )}
        </div>
      </div>
      )}
    </div>
  )
}


