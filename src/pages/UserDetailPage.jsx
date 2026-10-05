import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUserById, getUserResources } from '../api/users.js'
import EventCard from '../components/EventCard.jsx'

function UserDetailPage() {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [resources, setResources] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false
    setStatus('loading')
    Promise.all([getUserById(userId), getUserResources(userId)])
      .then(([userData, resourceData]) => {
        if (ignore) return
        setUser(userData)
        setResources(resourceData)
        setStatus('success')
      })
      .catch(() => {
        if (!ignore) setStatus('error')
      })
    return () => {
      ignore = true
    }
  }, [userId])

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
        <p className="error">Couldn't find that user.</p>
        <Link to="/events" className="back-link">Back to events</Link>
      </div>
    )
  }

  return (
    <div className="detail">
      <Link to="/events" className="back-link">Back to events</Link>

      <div className="user-profile-header">
        <h1>{user.userName}</h1>
        {user.profilePicUrl ? (
          <img src={user.profilePicUrl} alt={user.userName} className="user-avatar" />
        ) : (
          <div className="user-avatar user-avatar-placeholder">
            {user.userName?.charAt(0)?.toUpperCase()}
          </div>
        )}
      </div>

      <dl>
        {user.userEmail && (
          <>
            <dt>Email</dt>
            <dd><a href={`mailto:${user.userEmail}`}>{user.userEmail}</a></dd>
          </>
        )}
        {user.userPhone && (
          <>
            <dt>Phone</dt>
            <dd><a href={`tel:${user.userPhone}`}>{user.userPhone}</a></dd>
          </>
        )}
        {user.userAddress && (
          <>
            <dt>Address</dt>
            <dd>{user.userAddress}</dd>
          </>
        )}
      </dl>

      <h2>Posts ({resources.length})</h2>
      {resources.length === 0 ? (
        <p>This user hasn't posted any events yet.</p>
      ) : (
        <div className="card-grid">
          {resources.map((event) => (
            <EventCard key={event.resourceId} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

export default UserDetailPage
