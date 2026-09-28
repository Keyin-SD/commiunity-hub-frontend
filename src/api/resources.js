const BASE_URL = '/api/resources'

async function request(path, options) {
  const response = await fetch(`${BASE_URL}/${path}`, options)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  return response.json()
}

export function getAllResources() {
  return request('allResources')
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

export function updateResource(resourceId, resource) {
  return request(encodeURIComponent(resourceId), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resource),
  })
}
