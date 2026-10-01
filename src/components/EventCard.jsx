import { Link } from 'react-router-dom'
import { formatPrice, formatTime } from '../utils/format.js'

function EventCard({ event }) {
  return (
    <article className="card">
      {event.resourceCategory && <span className="tag">{event.resourceCategory}</span>}
      <h2>
        <Link to={`/events/${event.resourceId}`}>{event.resourceTitle}</Link>
      </h2>
      <p className="meta">
        {formatTime(event.resourceTime)}
        {formatTime(event.resourceTime) && (event.location?.locationName || event.resourceLocation) && ' · '}
        {event.location?.locationName ?? event.resourceLocation}
        {event.location?.city && (
          <>{event.location.locationName ? ', ' : ''}<Link to={`/cities/${event.location.city.cityId}`}>{event.location.city.cityName}</Link></>
        )}
      </p>
      <p className="price">{formatPrice(event.resourcePrice)}</p>
    </article>
  )
}

export default EventCard
