<script setup lang="ts">
import { ref } from 'vue'
import { CreateTaskService } from './Service'

const title = ref<string>('') // this variable is used to save new entered task title.
const tasks = ref<string[]>([]) // we use this to keeps tasks in client side.

const createTask = async () => {
  // we create a new task only if user entered some text
  if (title.value.trim()) {
    try {
      tasks.value.push(await CreateTaskService(title.value))
      title.value = '' // clear the input after adding
    } catch (err) {
      // here we may do some error handling
      throw err
    }
  }
}
</script>

<template>
  <h2>Your Todo:</h2>
  <ul>
    <li v-for="(task, key) in tasks" :key="key" :data-testid="'task-' + key">
      {{ task }}
    </li>
  </ul>
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
</template>
