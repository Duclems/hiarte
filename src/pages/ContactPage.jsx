import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '../components/atoms/Text'
import { Button } from '../components/atoms/Button'

export function ContactPage() {
  const { t } = useTranslation()
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setStatus('submitting')

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
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setStatus('success')
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      })
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="page contact-page">
      <Text as="h1" variant="h1" className="page__title">
        {t('contact.title') || 'Nous contacter'}
      </Text>
      <Text variant="lead">
        {t('contact.subtitle')}
      </Text>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="contact-field">
          <Text as="label" variant="body" htmlFor="firstName">
            First Name *
          </Text>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={handleChange}
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
            value={form.lastName}
            onChange={handleChange}
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
            value={form.email}
            onChange={handleChange}
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
            value={form.phone}
            onChange={handleChange}
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
            value={form.message}
            onChange={handleChange}
            className="contact-textarea"
          />
        </div>

        <div className="contact-actions">
          <Button type="submit" variant="primary" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Envoi…' : t('contact.sendMessage')}
          </Button>
          {status === 'success' && (
            <Text variant="body" style={{ color: 'var(--color-text-muted)' }}>
              Votre message a bien été envoyé.
            </Text>
          )}
          {status === 'error' && (
            <Text variant="body" style={{ color: 'var(--color-text-muted)' }}>
              Une erreur est survenue. Vous pouvez aussi écrire à contact@hiarte.fr.
            </Text>
          )}
        </div>
      </form>
    </div>
  )
}
