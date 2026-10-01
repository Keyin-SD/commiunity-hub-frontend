import { API_BASE } from './config.js'

const BASE_URL = `${API_BASE}/api/resources`

async function request(path, options) {
  const response = await fetch(`${BASE_URL}/${path}`, options)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return response.json()
}

export function getAllResources(page = 0, size = 10, sortBy = 'resourceId') {
  return request(`allResources?page=${page}&size=${size}&sortBy=${encodeURIComponent(sortBy)}`)
}

export function getResourceById(resourceId) {
  return request(`searchResourceById/${encodeURIComponent(resourceId)}`)
}

// The backend replies with a plain-text message, not JSON, so this skips request().
export async function createResource(resource) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resource),
  })
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
}

export function searchByTitle(title) {
  return request(`searchByTitle/${encodeURIComponent(title)}`)
}

export function searchByCategory(category) {
  return request(`searchByCategory/${encodeURIComponent(category)}`)
}

export function searchByContactName(contactName) {
  return request(`searchByContactName/${encodeURIComponent(contactName)}`)
}

export function searchByLocation(location) {
  return request(`searchByLocation/${encodeURIComponent(location)}`)
}

export function searchByCity(city) {
  return request(`searchByCity/${encodeURIComponent(city)}`)
}

export function updateResource(resourceId, resource) {
  return request(encodeURIComponent(resourceId), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resource),
  })
}
