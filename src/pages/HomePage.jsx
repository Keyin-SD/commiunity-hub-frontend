import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <section className="home">
      <div className="hero">
        <h1>Welcome to Community Hub</h1>
        <p>
          Your go-to place for discovering and sharing local events, meetups,
          workshops, and resources in your community. Whether you're looking for
          something to do this weekend or want to spread the word about your own
          event — this is the spot.
        </p>
        <div className="hero-actions">
          <Link to="/events" className="button">Browse events</Link>
          <Link to="/events/new" className="button button-outline">Add an event</Link>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>Discover</h3>
          <p>Find events, classes, and community resources happening near you.</p>
        </div>
        <div className="feature-card">
          <h3>Share</h3>
          <p>Post your own events and reach people in the neighbourhood.</p>
        </div>
        <div className="feature-card">
          <h3>Connect</h3>
          <p>Get contact details and links so you can join in or learn more.</p>
        </div>
      </div>
    </section>
  )
}

export default HomePage
