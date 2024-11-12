import type { Task } from '@/types/task'
import BackendRoutes from '../utils/BackendRoutes'

export default async (title: string): Promise<Task> => {
  const trimmedTitle = title.trim()

  if (!trimmedTitle) {
    throw new Error('Task title is required and cannot be empty.')
  }

  const response = await fetch(BackendRoutes.create, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: trimmedTitle }),
  })

  if (!response.ok) {
    throw new Error(`Failed to create task ${response.statusText}`)
  }

  const { data: task }: { data: Task } = await response.json()

  return task
}
