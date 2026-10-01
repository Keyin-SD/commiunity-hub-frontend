import { useEffect, useState, useRef } from 'react'
import {
  getAllResources,
  searchByTitle,
  searchByCategory,
  searchByContactName,
  searchByLocation,
  searchByCity,
} from '../api/resources.js'
import EventCard from '../components/EventCard.jsx'

const SEARCH_FIELDS = [
  { value: 'title', label: 'Title' },
  { value: 'category', label: 'Category' },
  { value: 'contact', label: 'Contact name' },
  { value: 'location', label: 'Location' },
  { value: 'city', label: 'City' },
]

const searchFns = {
  title: searchByTitle,
  category: searchByCategory,
  contact: searchByContactName,
  location: searchByLocation,
  city: searchByCity,
}

const PAGE_SIZE = 10

function EventListPage() {
  const [events, setEvents] = useState([])
  const [status, setStatus] = useState('loading')
  const [query, setQuery] = useState('')
  const [field, setField] = useState('title')
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const debounceRef = useRef(null)

  function load(searchField, searchQuery, pageNum = 0) {
    setStatus('loading')
    const isSearch = searchQuery.trim()
    const promise = isSearch
      ? searchFns[searchField](searchQuery.trim())
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
    load(field, query, 0)
  }, [])

  function handleQueryChange(e) {
    const value = e.target.value
    setQuery(value)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => load(field, value, 0), 400)
  }

  function handleFieldChange(e) {
    const newField = e.target.value
    setField(newField)
    if (query.trim()) {
      clearTimeout(debounceRef.current)
      load(newField, query, 0)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    clearTimeout(debounceRef.current)
    load(field, query, 0)
  }

  function handlePageChange(newPage) {
    load(field, query, newPage)
  }

  return (
    <section>
      <h1>Community Events</h1>

      <form className="search-bar" onSubmit={handleSubmit}>
        <select value={field} onChange={handleFieldChange}>
          {SEARCH_FIELDS.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
        <input
          type="search"
          placeholder={`Search by ${SEARCH_FIELDS.find((f) => f.value === field).label.toLowerCase()}…`}
          value={query}
          onChange={handleQueryChange}
        />
        <button type="submit">Search</button>
      </form>

      {status === 'loading' && <p>Loading events…</p>}
      {status === 'error' && <p className="error">Couldn't load events. Is the backend running?</p>}
      {status === 'success' && events.length === 0 && <p>No events found.</p>}
      {status === 'success' && events.length > 0 && (
        <>
          <div className="grid">
            {events.map((event) => (
              <EventCard key={event.resourceId} event={event} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              <button disabled={page === 0} onClick={() => handlePageChange(page - 1)}>← Previous</button>
              <span>Page {page + 1} of {totalPages}</span>
              <button disabled={page >= totalPages - 1} onClick={() => handlePageChange(page + 1)}>Next →</button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default EventListPage
