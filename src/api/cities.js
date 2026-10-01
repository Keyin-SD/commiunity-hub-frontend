import { API_BASE } from './config.js'

const BASE_URL = `${API_BASE}/api/cities`

export async function getCityById(cityId) {
  const response = await fetch(`${BASE_URL}/${encodeURIComponent(cityId)}`)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return response.json()
}

export async function getAllCities() {
  const response = await fetch(BASE_URL)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return response.json()
}
