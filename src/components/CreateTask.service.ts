import BackendRoutes from '../utils/BackendRoutes'

export default async (title: string): Promise<string> => {
  const response = await fetch(BackendRoutes.create, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: title.trim() }),
  })

  if (!response.ok) {
    throw new Error(`Failed to create task ${response.statusText}`)
  }

  const content = await response.json()

  return content.data.title
}
