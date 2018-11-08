<template>
  <b-list-group-item>
    <b-form method="post" action="/api/v1/tasks" @submit.prevent="addTask">

      <b-form-group label="Description:" label-for="task-add-content">
        <b-form-input id="task-add-content" v-model="form.content" type="text" required placeholder="Have fun..." />
      </b-form-group>

      <b-form-group label="Priority:" label-for="task-add-priority">
        <form-priority v-model="form.priority" />
      </b-form-group>

      <b-button type="submit" variant="success">Add</b-button>

    </b-form>
  </b-list-group-item>
</template>

<script>
import FormPriority from '~/components/FormPriority'

export default {
  components: {
    FormPriority
  },
  data () {
    return {
      form: {
        content: '',
        priority: 0
      }
    }
  },
  methods: {
    async addTask () {
      const result = await this.$axios.$post('/tasks', {
        data: {
          attributes: {
            content: this.form.content,
            priority: parseInt(this.form.priority, 10) || 0
          }
        }
      })

      this.form.content = ''
      this.form.priority = 0
      this.$emit('add', result.data)
    }
  }
}
</script>
