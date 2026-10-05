import { API_BASE } from './config.js'

const BASE_URL = `${API_BASE}/api/auth`

async function request(path, body) {
  const response = await fetch(`${BASE_URL}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || 'Request failed')
  }
  return data
}

export function signup(fields) {
  return request('signup', fields)
}

export function login(email, password) {
  return request('login', { userEmail: email, password })
}
