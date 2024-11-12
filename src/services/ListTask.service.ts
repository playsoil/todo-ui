import type { Task } from '@/types/task'
import BackendRoutes from '@/utils/BackendRoutes'

export default async (url: string = BackendRoutes.list): Promise<Task[]> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to Get task list,  ${response.statusText}`)
    }

    const { data }: { data: Task[] } = await response.json()

    return data
  } catch (error: any) {
    throw new Error(`An error occurred while fetching tasks: ${error.message}`)
  }
}
