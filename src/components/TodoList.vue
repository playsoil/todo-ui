<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CreateTaskService from './CreateTask.service'
import ListTaskService from './ListTask.service'
import type { Task } from '@/types/task'

const title = ref<string>('') // this variable is used to save new entered task title.
const tasks = ref<Task[]>([]) // we use this to keeps tasks in client side.

onMounted(async () => {
  tasks.value = await ListTaskService()
})

const createTask = async (): Promise<void> => {
  // we create a new task only if user entered some text
  if (title.value.trim()) {
    try {
      const newTaskTitle = await CreateTaskService(title.value)
      tasks.value.push(newTaskTitle)
      title.value = '' // clear the input after adding
    } catch (err) {
      // here we may do some error handling
      throw err
    }
  }
}
</script>

<template>
  <h2>Your Todos are:</h2>
  <div>
    <input
      type="text"
      data-testid="taskTitle"
      v-model="title"
      placeholder="Enter task"
      @keypress.enter="createTask"
    />
    <button data-testid="createButton" @click="createTask">Add</button>
  </div>
  <ul data-testid="taskList">
    <li v-for="(task, key) in tasks" :key="key" :data-testid="'task-' + task.ID">
      {{ task.title }}
    </li>
  </ul>
</template>
