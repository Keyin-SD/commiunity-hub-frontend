import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getResourceById, updateResource } from '../api/resources.js'
import EventForm from '../components/EventForm.jsx'

function EditEventPage() {
  const { eventId } = useParams()
  const navigate = useNavigate()
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

  async function handleSubmit(payload) {
    await updateResource(eventId, payload)
    navigate(`/events/${eventId}`)
  }

  if (status === 'loading') return <p>Loading event…</p>
  if (status === 'error') {
    return (
      <>
        <p className="error">Couldn't find that event.</p>
        <Link to="/">← Back to events</Link>
      </>
    )
  }

  return (
    <section className="detail">
      <Link to={`/events/${eventId}`}>← Back to event</Link>
      <h1>Edit Event</h1>
      <EventForm key={eventId} initialEvent={event} submitLabel="Save changes" onSubmit={handleSubmit} />
    </section>
  )
}

export default EditEventPage
