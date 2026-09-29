import { useState } from 'react'
import { isIsoTime } from '../utils/format.js'

const EMPTY_FORM = {
  resourceTitle: '',
  resourceDescription: '',
  resourceCategory: '',
  resourceTime: '',
  locationName: '',
  locationAddress: '',
  locationCity: '',
  resourcePrice: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  contactWebsiteUrl: '',
}

function toLocalInput(isoTime) {
  const date = new Date(isoTime)
  const offsetMs = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16)
}

function toFormValues(event) {
  if (!event) return { ...EMPTY_FORM }
  return {
    resourceTitle: event.resourceTitle ?? '',
    resourceDescription: event.resourceDescription ?? '',
    resourceCategory: event.resourceCategory ?? '',
    resourceTime: isIsoTime(event.resourceTime) ? toLocalInput(event.resourceTime) : '',
    locationName: event.location?.locationName ?? event.resourceLocation ?? '',
    locationAddress: event.location?.locationAddress ?? '',
    locationCity: event.location?.locationCity ?? '',
    resourcePrice: event.resourcePrice ?? '',
    contactName: event.contactName ?? '',
    contactEmail: event.contactEmail ?? '',
    contactPhone: event.contactPhone ?? '',
    contactWebsiteUrl: event.contactWebsiteUrl ?? '',
  }
}

function toPayload(form, legacyTime) {
  return {
    resourceTitle: form.resourceTitle,
    resourceDescription: form.resourceDescription,
    resourceCategory: form.resourceCategory,
    resourceTime: form.resourceTime ? new Date(form.resourceTime).toISOString() : (legacyTime ?? ''),
    resourcePrice: form.resourcePrice === '' ? 0 : Number(form.resourcePrice),
    contactName: form.contactName,
    contactEmail: form.contactEmail,
    contactPhone: form.contactPhone,
    contactWebsiteUrl: form.contactWebsiteUrl,
    location: {
      locationName: form.locationName,
      locationAddress: form.locationAddress,
      locationCity: form.locationCity,
    },
  }
}

function EventForm({ initialEvent, submitLabel, onSubmit }) {
  const [form, setForm] = useState(() => toFormValues(initialEvent))
  const [status, setStatus] = useState('idle')

  const legacyTime =
    initialEvent?.resourceTime && !isIsoTime(initialEvent.resourceTime) ? initialEvent.resourceTime : null

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    try {
      await onSubmit(toPayload(form, legacyTime))
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Event</legend>
        <label>
          Title
          <input name="resourceTitle" value={form.resourceTitle} onChange={handleChange} required />
        </label>
        <label>
          Description
          <textarea name="resourceDescription" value={form.resourceDescription} onChange={handleChange} rows={4} />
        </label>
        <label>
          Category
          <input name="resourceCategory" value={form.resourceCategory} onChange={handleChange} placeholder="e.g. Meetup, Food" />
        </label>
        <label>
          Date &amp; time
          <input
            type="datetime-local"
            name="resourceTime"
            value={form.resourceTime}
            onChange={handleChange}
            required={!legacyTime}
          />
          {legacyTime && <small>Currently "{legacyTime}". Leave blank to keep it.</small>}
        </label>
        <label>
          Price (leave blank if free)
          <input type="number" name="resourcePrice" value={form.resourcePrice} onChange={handleChange} min="0" step="0.01" />
        </label>
      </fieldset>

      <fieldset>
        <legend>Location</legend>
        <label>
          Name
          <input name="locationName" value={form.locationName} onChange={handleChange} required placeholder="e.g. Community Center" />
        </label>
        <label>
          Address
          <input name="locationAddress" value={form.locationAddress} onChange={handleChange} placeholder="e.g. 123 Main St" />
        </label>
        <label>
          City
          <input name="locationCity" value={form.locationCity} onChange={handleChange} placeholder="e.g. Springfield" />
        </label>
      </fieldset>

      <fieldset>
        <legend>Contact</legend>
        <label>
          Name
          <input name="contactName" value={form.contactName} onChange={handleChange} />
        </label>
        <label>
          Email
          <input type="email" name="contactEmail" value={form.contactEmail} onChange={handleChange} />
        </label>
        <label>
          Phone
          <input type="tel" name="contactPhone" value={form.contactPhone} onChange={handleChange} />
        </label>
        <label>
          Website
          <input type="url" name="contactWebsiteUrl" value={form.contactWebsiteUrl} onChange={handleChange} placeholder="https://" />
        </label>
      </fieldset>

      {status === 'error' && <p className="error">Couldn't save the event. Please try again.</p>}
      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}

export default EventForm
