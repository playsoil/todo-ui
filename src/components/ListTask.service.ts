import BackendRoutes from '../utils/BackendRoutes'

export default async () => {
  const response = await fetch(BackendRoutes.list, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to Get task list,  ${response.statusText}`)
  }

  const content = await response.json()

  return content.data
}
