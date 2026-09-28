import { Link, useNavigate } from 'react-router-dom'
import { createResource } from '../api/resources.js'
import EventForm from '../components/EventForm.jsx'

function AddEventPage() {
  const navigate = useNavigate()

  async function handleSubmit(payload) {
    await createResource(payload)
    navigate('/')
  }

  return (
    <section className="detail">
      <Link to="/">← Back to events</Link>
      <h1>Add an Event</h1>
      <EventForm submitLabel="Add event" onSubmit={handleSubmit} />
    </section>
  )
}

export default AddEventPage
