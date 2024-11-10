import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fetchMock from '@fetch-mock/vitest'
import { flushPromises, mount } from '@vue/test-utils'
import TodoList from './TodoList.vue'
import backendRoutes from '../utils/BackendRoutes'

// this is the title of the task we create during tests
const newTaskTitle = 'finish test case'

// this the mocked response of  `create task` api
const mockedNewTaskCreationResponse = {
  data: {
    ID: 1,
    title: newTaskTitle,
  },
}

// we mock create task api to prevent real http call during tests
const mockCreateTaskRequest = () => {
  fetchMock
    .mockGlobal()
    .route(
      { url: backendRoutes.create, method: 'POST' },
      JSON.stringify(mockedNewTaskCreationResponse),
    )

  fetchMock
    .mockGlobal()
    .route({ url: backendRoutes.list, method: 'GET' }, JSON.stringify({ data: [] }))
}

describe('creating a task', () => {
  beforeEach(() => {
    fetchMock.mockReset()
    mockCreateTaskRequest()
  })

  afterEach(() => {
    fetchMock.mockReset()
  })

  it('by press enter key', async () => {
    const listWrapper = mount(TodoList, { props: {} })
    const taskTitle = listWrapper.find('[data-testid=taskTitle]')

    await taskTitle.setValue(newTaskTitle)
    await taskTitle.trigger('keypress', { key: 'Enter' })
    await flushPromises() // wait for api call promises to flush

    const firstTask = listWrapper.find('[data-testid=task-1]')

    expect(firstTask.exists()).toBeTruthy()
    expect(firstTask.text()).toContain(newTaskTitle)
    expect(listWrapper.find('[data-testid=taskTitle]').element.value).toBe('')
  })

  it('by clicking on add button', async () => {
    const listWrapper = mount(TodoList, { props: {} })
    const createButton = listWrapper.find('[data-testid=createButton]')

    await listWrapper.find('[data-testid=taskTitle]').setValue(newTaskTitle)
    await createButton.trigger('click')
    await flushPromises()

    const firstTask = listWrapper.find('[data-testid=task-1]')

    expect(firstTask.exists()).toBeTruthy()
    expect(firstTask.text()).toContain(newTaskTitle)
    expect(listWrapper.find('[data-testid=taskTitle]').element.value).toBe('')
  })
})
