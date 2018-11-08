<template>
  <div>
    <b-list-group>
      <task-form @add="onAdd" />
      <b-list-group-item>
        <b-form-group label="Filter:">
          <form-priority @change="onSearch('filter[priority]', $event)" />
          <form-status @change="onSearch('filter[status]', $event)" />
        </b-form-group>
      </b-list-group-item>
      <task-item v-for="task in tasks" :key="task.id" :task="task" @delete="onDelete" />
    </b-list-group>
  </div>
</template>

<script>
import TaskForm from '~/components/TaskForm'
import TaskItem from '~/components/TaskItem'
import FormStatus from '~/components/FormStatus'
import FormPriority from '~/components/FormPriority'

export default {
  middleware: 'auth',
  components: {
    TaskForm,
    TaskItem,
    FormStatus,
    FormPriority
  },
  watchQuery: true,
  async asyncData ({ $axios, query }) {
    const data = await $axios.$get('/tasks', { params: query }).then(res => res.data)

    return {
      tasks: data || []
    }
  },
  methods: {
    onAdd (task) {
      this.tasks.unshift(task)
    },
    onDelete (id) {
      this.tasks = this.tasks.filter(task => task.id !== id)
    },
    onSearch (field, value) {
      const query = {
        ...this.$route.query,
        [field]: value
      }
      this.$router.push({ path: '/', query })
    }
  }
}
</script>
