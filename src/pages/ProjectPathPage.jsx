import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '../components/atoms/Text'
import projectPathConfig from '../config/projectPath.json'
import { Button } from '../components/atoms/Button'

const projectPath = projectPathConfig.projectPath
const adaptiveFlow = projectPath.adaptiveFlow || null
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
  const { t, i18n } = useTranslation()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const optionsRef = useRef(null)
  const [contactStatus, setContactStatus] = useState('idle')
  const [toast, setToast] = useState(null)
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
          {t('projectPath.title')}
        </Text>
        <Text variant="body">{t('projectPath.noConfig')}</Text>
      </div>
    )
  }

  const currentStep = steps[currentStepIndex]

  const getCurrentLang = () => {
    const lang = i18n.language || 'fr'
    return lang.startsWith('en') ? 'en' : 'fr'
  }

  const getStepTitle = (step) => {
    if (!step) return ''
    const lang = getCurrentLang()
    if (lang === 'en' && step.title_en) return step.title_en
    return step.title
  }

  const getStepDescription = (step) => {
    if (!step) return ''
    const lang = getCurrentLang()
    if (lang === 'en' && step.description_en) return step.description_en
    return step.description || ''
  }

  const getOptionLabel = (option) => {
    if (!option) return ''
    const lang = getCurrentLang()
    if (lang === 'en' && option.label_en) return option.label_en
    return option.label
  }

  const getFreeTextPlaceholder = (option) => {
    if (!option) return ''
    const lang = getCurrentLang()
    if (lang === 'en' && option.freeTextPlaceholder_en) return option.freeTextPlaceholder_en
    return option.freeTextPlaceholder || ''
  }

  const buildFrenchAnswers = () => {
    const result = {}

    rawSteps.forEach((step) => {
      if (!step || step.id === 'project_summary') return

      const value = answers[step.id]
      const freeTextKey = `${step.id}__freeText`
      const freeTextValue = answers[freeTextKey]

      let label = 'Non renseigné'

      if (step.options && step.options.length > 0) {
        if (value) {
          const opt = step.options.find((o) => o.value === value)
          const baseLabel = opt ? opt.label : String(value)
          if (opt && opt.hasFreeText && freeTextValue) {
            label = `${baseLabel} — ${String(freeTextValue)}`
          } else if (freeTextValue) {
            label = `${baseLabel} — ${String(freeTextValue)}`
          } else {
            label = baseLabel
          }
        }
      } else if (step.inputType === 'textarea' || step.id === 'project_features') {
        if (value && String(value).trim().length > 0) {
          label = String(value)
        }
      } else if (value) {
        label = String(value)
      }

      result[step.title] = label
    })

    return result
  }

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(timer)
  }, [toast])

  const getActiveProfile = () => {
    if (!adaptiveFlow || !adaptiveFlow.profiles) return null
    const projectType = answers.project_type
    if (!projectType) return null

    return adaptiveFlow.profiles.find((profile) => {
      const trigger = profile.trigger
      if (!trigger || trigger.stepId !== 'project_type') return false
      return Array.isArray(trigger.includes) && trigger.includes.includes(projectType)
    })
  }

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
    const nextValue = name === 'phone' ? value.replace(/\D/g, '') : value
    setContactForm((prev) => ({ ...prev, [name]: nextValue }))
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
          prenom: contactForm.firstName,
          nom: contactForm.lastName,
          email: contactForm.email,
          telephone: contactForm.phone,
          description: contactForm.message,
          reponsesParcours: buildFrenchAnswers(),
          langue: 'fr',
        }),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setContactStatus('success')
      setToast({ type: 'success', message: t('projectPath.successMessage') })
      setContactForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      })
    } catch (error) {
      setContactStatus('error')
      setToast({ type: 'error', message: t('projectPath.errorMessage') })
    }
  }

  const updateAnswer = (stepId, value) => {
    setAnswers((prev) => ({ ...prev, [stepId]: value }))
  }

  const shouldSkipStep = (step) => {
    if (!step) return false
    if (step.id === 'project_review') return false

    const profile = getActiveProfile()
    if (!profile) return false

    const { showSteps, hideSteps } = profile

    if (Array.isArray(hideSteps) && hideSteps.includes(step.id)) {
      return true
    }

    if (Array.isArray(showSteps) && showSteps.length > 0 && !showSteps.includes(step.id)) {
      return true
    }

    return false
  }

  const getNextIndex = (index) => {
    let next = index + 1
    while (next < steps.length && shouldSkipStep(steps[next])) {
      next += 1
    }
    return next
  }

  const getPreviousIndex = (index) => {
    let prev = index - 1
    while (prev >= 0 && shouldSkipStep(steps[prev])) {
      prev -= 1
    }
    return prev
  }

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((index) => getNextIndex(index))
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((index) => getPreviousIndex(index))
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
            let displayValue = t('projectPath.notProvided')

            if (value) {
              if (s.options && s.options.length > 0) {
                const opt = s.options.find((o) => o.value === value)
                displayValue = opt ? getOptionLabel(opt) : String(value)
              } else {
                displayValue = String(value)
              }
            }

            return (
              <div key={s.id} className="project-review__item">
                <Text as="h3" variant="h3" className="project-review__label">
                  {getStepTitle(s)}
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
              Prénom *
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
              Nom *
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
              Téléphone (optionnel)
            </Text>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
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
          placeholder={t('projectPath.featuresPlaceholder')}
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

      let options = step.options
      const profile = getActiveProfile()
      if (profile && profile.allowedOptions && profile.allowedOptions[step.id]) {
        const allowed = new Set(profile.allowedOptions[step.id])
        options = options.filter((opt) => allowed.has(opt.value))
      }

      const sortedOptions = [...options].sort((a, b) => {
        if (a.value === 'other' && b.value === 'other') return 0
        if (a.value === 'other') return 1
        if (b.value === 'other') return -1
        const labelA = getOptionLabel(a)
        const labelB = getOptionLabel(b)
        const locale = getCurrentLang()
        return labelA.localeCompare(labelB, locale, { sensitivity: 'base' })
      })
      const selectedOption = sortedOptions.find((opt) => opt.value === selected)
      const freeTextKey = `${step.id}__freeText`
      const selectedLabel = selectedOption
        ? getOptionLabel(selectedOption)
        : t('projectPath.selectPlaceholder')

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
                  {getOptionLabel(opt)}
                </button>
              ))}
            </div>
          )}
          {selectedOption?.hasFreeText && (
            <input
              type="text"
              className="contact-input"
              placeholder={getFreeTextPlaceholder(selectedOption)}
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
      {toast && (
        <div className={`project-toast project-toast--${toast.type}`}>
          {toast.message}
        </div>
      )}
      {!hasStarted && (
        <>
          <Text as="h1" variant="h1" className="page__title">
            {t('projectPath.title')}
          </Text>
          <Text variant="lead" className="page__subtitle">
            {t('projectPath.subtitle')}
          </Text>

          {projectPath.positioning.content && (
            <Text variant="body" style={{ marginTop: 'var(--space-md)' }}>
              {projectPath.positioning.content}
            </Text>
          )}

          <div className="project-start">
            <Button variant="primary" onClick={() => setHasStarted(true)}>
              {t('projectPath.startCta')}
            </Button>
          </div>
        </>
      )}

      {hasStarted && (
        <div className="project-path">
        <div className="project-step">
          <Text as="h1" variant="h1" className="project-step__title">
            {currentStep.id === 'project_review'
              ? t('projectPath.reviewTitle')
              : getStepTitle(currentStep)}
          </Text>
          {(() => {
            if (currentStep.id === 'project_review') {
              return t('projectPath.reviewDescription')
            }
            return getStepDescription(currentStep)
          })() && (
            <Text as="p" variant="lead" className="project-step__description">
              {currentStep.id === 'project_review'
                ? t('projectPath.reviewDescription')
                : getStepDescription(currentStep)}
            </Text>
          )}

          {renderStepInput(currentStep)}

          <div className="project-step__actions">
            <div className="project-step__actions-left">
              {currentStepIndex > 0 && (
                <Button variant="secondary" onClick={handlePrevious}>
                  {t('projectPath.previousStep')}
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
                  {t('projectPath.nextStep')}
                </Button>
              )}
              {isLastStep && (
                <Button
                  type="submit"
                  form="project-summary-form"
                  variant="primary"
                  disabled={contactStatus === 'submitting'}
                >
                  {contactStatus === 'submitting'
                    ? t('projectPath.sending')
                    : t('projectPath.sendProject')}
                </Button>
              )}
            </div>
          </div>

          {isLastStep && contactStatus === 'success' && (
            <Text variant="body" style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-sm)' }}>
              {t('projectPath.successMessage')}
            </Text>
          )}
          {isLastStep && contactStatus === 'error' && (
            <Text variant="body" style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-sm)' }}>
              {t('projectPath.errorMessage')}
            </Text>
          )}
        </div>
      </div>
      )}
    </div>
  )
}


