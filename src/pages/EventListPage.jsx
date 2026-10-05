import { useEffect, useState } from 'react'
import { getAllResources, search } from '../api/resources.js'
import EventCard from '../components/EventCard.jsx'

const PAGE_SIZE = 10

function EventListPage() {
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading')
  const [query, setQuery] = useState('')
  const [activeQuery, setActiveQuery] = useState('')
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  function load(searchQuery, pageNum = 0) {
    setStatus('loading')
    const isSearch = searchQuery.trim()
    const promise = isSearch
      ? search(searchQuery.trim())
      : getAllResources(pageNum, PAGE_SIZE)

    promise
      .then((data) => {
        if (isSearch) {
          setEvents(Array.isArray(data) ? data : [])
          setTotalPages(1)
          setPage(0)
        } else {
          setEvents(Array.isArray(data.content) ? data.content : [])
          setTotalPages(data.totalPages ?? 1)
          setPage(data.number ?? 0)
        }
        setStatus('success')
      })
      .catch(() => setStatus('error'))
  }

  useEffect(() => {
    load('', 0)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setActiveQuery(query)
    load(query, 0)
  }

  function handlePageChange(newPage) {
    load(activeQuery, newPage)
  }

  return (
    <section>
      <h1>Events</h1>

      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search events…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {status === 'loading' && (
        <div className="grid">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="card skeleton skeleton-card" />
          ))}
        </div>
      )}
      {status === 'error' && <p className="error">Couldn't load events. Is the backend running?</p>}
      {status === 'success' && events.length === 0 && (
        <div className="empty-state">
          <p>No events found.</p>
        </div>
      )}
      {status === 'success' && events.length > 0 && (
        <>
          <div className="grid">
            {events.map((event) => (
              <EventCard key={event.resourceId} event={event} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              <button disabled={page === 0} onClick={() => handlePageChange(page - 1)}>Previous</button>
              <span>{page + 1} / {totalPages}</span>
              <button disabled={page >= totalPages - 1} onClick={() => handlePageChange(page + 1)}>Next</button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default EventListPage
