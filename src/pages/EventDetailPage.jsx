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

  if (status === 'loading') {
    return (
      <div className="detail">
        <div className="skeleton skeleton-detail" style={{ width: '100%' }} />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="detail">
        <p className="error">Couldn't find that event.</p>
        <Link to="/events" className="back-link">Back to events</Link>
      </div>
    )
  }

  return (
    <article className="detail">
      <div className="detail-actions">
        <Link to="/events" className="back-link">Back to events</Link>
        <Link to={`/events/${eventId}/edit`} className="button button-outline">Edit</Link>
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
              {event.location ? (
                <>
                  {[event.location.locationName, event.location.locationAddress].filter(Boolean).join(', ')}
                  {event.location.city && (
                    <>{(event.location.locationName || event.location.locationAddress) && ', '}<Link to={`/cities/${event.location.city.cityId}`}>{event.location.city.cityName}</Link></>
                  )}
                </>
              ) : event.resourceLocation}
            </dd>
          </>
        )}
        <dt>Price</dt>
        <dd>{formatPrice(event.resourcePrice)}</dd>
      </dl>

      {event.resourceDescription && <p>{event.resourceDescription}</p>}

      {event.postedBy && (
        <>
          <h2>Posted by</h2>
          <dl>
            {event.postedBy.userName && (
              <>
                <dt>Name</dt>
                <dd><Link to={`/users/${event.postedBy.userId}`}>{event.postedBy.userName}</Link></dd>
              </>
            )}
            {event.postedBy.userEmail && (
              <>
                <dt>Email</dt>
                <dd><a href={`mailto:${event.postedBy.userEmail}`}>{event.postedBy.userEmail}</a></dd>
              </>
            )}
            {event.postedBy.userPhone && (
              <>
                <dt>Phone</dt>
                <dd><a href={`tel:${event.postedBy.userPhone}`}>{event.postedBy.userPhone}</a></dd>
              </>
            )}
            {event.postedBy.userAddress && (
              <>
                <dt>Address</dt>
                <dd>{event.postedBy.userAddress}</dd>
              </>
            )}
          </dl>
        </>
      )}

      {isWebUrl(event.contactWebsiteUrl) && (
        <>
          <h2>Contact</h2>
          <ul className="contact">
            <li>
              <a href={event.contactWebsiteUrl} target="_blank" rel="noreferrer">
                {event.contactWebsiteUrl}
              </a>
            </li>
          </ul>
        </>
      )}
    </article>
  )
}

export default EventDetailPage
