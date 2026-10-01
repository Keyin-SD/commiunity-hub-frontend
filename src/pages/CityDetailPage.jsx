import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCityById } from '../api/cities.js'

function CityDetailPage() {
  const { cityId } = useParams()
  const [city, setCity] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false
    setStatus('loading')
    getCityById(cityId)
      .then((data) => {
        if (ignore) return
        setCity(data)
        setStatus('success')
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
