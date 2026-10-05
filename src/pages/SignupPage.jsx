import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../api/auth.js'
import { useAuth } from '../AuthContext.jsx'

function SignupPage() {
  const [form, setForm] = useState({
    userName: '',
    userEmail: '',
    password: '',
    userPhone: '',
    userAddress: '',
    profilePicUrl: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { logIn } = useAuth()
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const user = await signup(form)
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
      <h1>Sign up</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input name="userName" value={form.userName} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="userEmail" value={form.userEmail} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} />
        </label>
        <label>
          Phone
          <input type="tel" name="userPhone" value={form.userPhone} onChange={handleChange} />
        </label>
        <label>
          Address
          <input name="userAddress" value={form.userAddress} onChange={handleChange} />
        </label>
        <label>
          Profile picture URL
          <input type="url" name="profilePicUrl" value={form.profilePicUrl} onChange={handleChange} placeholder="https://" />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={submitting}>{submitting ? 'Signing up…' : 'Sign up'}</button>
      </form>
      <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
    </section>
  )
}

export default SignupPage
