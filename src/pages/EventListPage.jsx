import { useEffect, useState } from 'react'
import { getAllResources } from '../api/resources.js'
import EventCard from '../components/EventCard.jsx'

function EventListPage() {
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false
    getAllResources()
      .then((data) => {
        if (ignore) return
        setEvents(data)
        setStatus('success')
      })
      .catch(() => {
        if (!ignore) setStatus('error')
      })
    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') return <p>Loading events…</p>
  if (status === 'error') return <p className="error">Couldn't load events. Is the backend running?</p>

  return (
    <section>
      <h1>Community Events</h1>
      {events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <div className="grid">
          {events.map((event) => (
            <EventCard key={event.resourceId} event={event} />
          ))}
        </div>
      )}
    </section>
  )
}

export default EventListPage
