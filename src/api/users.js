import { API_BASE } from './config.js'

const BASE_URL = `${API_BASE}/api/users`

async function request(path) {
  const response = await fetch(`${BASE_URL}/${path}`)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return response.json()
}

export function getUserById(userId) {
  return request(encodeURIComponent(userId))
}

export function getUserResources(userId) {
  return request(`${encodeURIComponent(userId)}/resources`)
}
