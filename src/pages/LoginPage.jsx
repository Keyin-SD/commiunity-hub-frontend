import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/auth.js'
import { useAuth } from '../AuthContext.jsx'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { logIn } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const user = await login(email, password)
      logIn(user)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <h1>Log in</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={submitting}>{submitting ? 'Logging in…' : 'Log in'}</button>
      </form>
      <p className="auth-switch">Don't have an account? <Link to="/signup">Sign up</Link></p>
    </section>
  )
}

export default LoginPage
