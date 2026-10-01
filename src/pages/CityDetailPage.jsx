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

  if (status === 'loading') return <p>Loading city…</p>
  if (status === 'error') {
    return (
      <>
        <p className="error">Couldn't find that city.</p>
        <Link to="/events">← Back to events</Link>
      </>
    )
  }

  return (
    <article className="detail">
      <Link to="/events">← Back to events</Link>
      <h1>{city.cityName}</h1>
      <p>City ID: {city.cityId}</p>
      <p>Population: {city.population}</p>
      <p>Province: {city.province}</p>

    </article>
  )
}

export default CityDetailPage
