import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import fetchMock from '@fetch-mock/vitest'
import { flushPromises, mount } from '@vue/test-utils'
import TodoList from './TodoList.vue'
import backendRoutes from '../utils/BackendRoutes'

// this the mocked response of  `create task` api
export const mockedTaskListResponse = {
  data: [
    {
      ID: 1,
      title: 'task a',
    },
    {
      ID: 2,
      title: 'task b',
    },
    {
      ID: 3,
      title: 'task c',
    },
  ],
}

// we mock create task api to prevent real http call during tests
const mockTaskListRequest = () => {
  fetchMock.mockReset()
  fetchMock
    .mockGlobal()
    .route({ url: backendRoutes.list, method: 'GET' }, JSON.stringify(mockedTaskListResponse))
}

describe('list task', () => {
  beforeEach(() => {
    fetchMock.mockReset()
    mockTaskListRequest()
  })

  afterEach(() => {
    fetchMock.mockReset()
  })

  it('should be rendered', async () => {
    const listWrapper = mount(TodoList, { props: {} })
    const taskList = listWrapper.find('[data-testid=taskList]')

    await flushPromises() // wait for api call promises to flush

    expect(taskList.exists()).toBeTruthy()

    mockedTaskListResponse.data.map((task) => expect(taskList.text()).toContain(task.title))
  })
})
