import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCityById } from '../api/cities.js'

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY

function CityDetailPage() {
  const { cityId } = useParams()
  const [city, setCity] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false
    setStatus('loading')
    getCityById(cityId)
      .then((data) => {
        if (ignore) return
        setCity(data)
        setStatus('success')
        if (UNSPLASH_KEY && data.cityName) {
          fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(data.cityName + ' city')}&per_page=1&orientation=landscape`, {
            headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
          })
            .then((r) => r.json())
            .then((json) => {
              if (!ignore && json.results?.[0]) setPhoto(json.results[0])
            })
            .catch(() => {})
        }
      })
      .catch(() => {
        if (!ignore) setStatus('error')
      })
    return () => {
      ignore = true
    }
  }, [cityId])

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
        <p className="error">Couldn't find that city.</p>
        <Link to="/events" className="back-link">Back to events</Link>
      </div>
    )
  }

  return (
    <article className="detail">
      <Link to="/events" className="back-link">Back to events</Link>
      {photo && (
        <div className="city-photo">
          <img
            src={photo.urls.regular}
            alt={photo.alt_description || city.cityName}
          />
          <p className="city-photo-credit">
            Photo by{' '}
            <a href={`${photo.user.links.html}?utm_source=community_hub&utm_medium=referral`} target="_blank" rel="noreferrer">
              {photo.user.name}
            </a>
            {' '}on{' '}
            <a href="https://unsplash.com/?utm_source=community_hub&utm_medium=referral" target="_blank" rel="noreferrer">
              Unsplash
            </a>
          </p>
        </div>
      )}
      <h1>{city.cityName}</h1>

      <div className="city-stats">
        <div className="city-stat">
          <p className="city-stat-label">City ID</p>
          <p className="city-stat-value">{city.cityId}</p>
        </div>
        <div className="city-stat">
          <p className="city-stat-label">Population</p>
          <p className="city-stat-value">{city.population?.toLocaleString() ?? '—'}</p>
        </div>
        <div className="city-stat">
          <p className="city-stat-label">Province</p>
          <p className="city-stat-value">{city.province ?? '—'}</p>
        </div>
      </div>
    </article>
  )
}

export default CityDetailPage
