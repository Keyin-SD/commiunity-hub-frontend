import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getResourceById } from '../api/resources.js'
import { formatPrice, formatTime, isWebUrl } from '../utils/format.js'

function EventDetailPage() {
  const { eventId } = useParams()
  const [event, setEvent] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false
    setStatus('loading')
    getResourceById(eventId)
      .then((data) => {
        if (ignore) return
        setEvent(data)
        setStatus('success')
      })
      .catch(() => {
        if (!ignore) setStatus('error')
      })
    return () => {
      ignore = true
    }
  }, [eventId])

  if (status === 'loading') return <p>Loading event…</p>
  if (status === 'error') {
    return (
      <>
        <p className="error">Couldn't find that event.</p>
        <Link to="/events">← Back to events</Link>
      </>
    )
  }

  return (
    <article className="detail">
      <div className="detail-actions">
        <Link to="/events">← Back to events</Link>
        <Link to={`/events/${eventId}/edit`} className="button">Edit</Link>
      </div>
      {event.resourceCategory && <span className="tag">{event.resourceCategory}</span>}
      <h1>{event.resourceTitle}</h1>

      <dl>
        {event.resourceTime && (
          <>
            <dt>When</dt>
            <dd>{formatTime(event.resourceTime)}</dd>
          </>
        )}
        {(event.location || event.resourceLocation) && (
          <>
            <dt>Where</dt>
            <dd>
              {event.location
                ? [event.location.locationName, event.location.locationAddress, event.location.locationCity].filter(Boolean).join(', ')
                : event.resourceLocation}
            </dd>
          </>
        )}
        <dt>Price</dt>
        <dd>{formatPrice(event.resourcePrice)}</dd>
      </dl>

      {event.resourceDescription && <p>{event.resourceDescription}</p>}

      <h2>Contact</h2>
      <ul className="contact">
        {event.contactName && <li>{event.contactName}</li>}
        {event.contactEmail && (
          <li>
            <a href={`mailto:${event.contactEmail}`}>{event.contactEmail}</a>
          </li>
        )}
        {event.contactPhone && (
          <li>
            <a href={`tel:${event.contactPhone}`}>{event.contactPhone}</a>
          </li>
        )}
        {isWebUrl(event.contactWebsiteUrl) && (
          <li>
            <a href={event.contactWebsiteUrl} target="_blank" rel="noreferrer">
              {event.contactWebsiteUrl}
            </a>
          </li>
        )}
      </ul>
    </article>
  )
}

export default EventDetailPage
