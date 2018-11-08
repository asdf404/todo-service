<template>
  <b-list-group-item>
    <div>
      <p>
        <b-badge pill variant="danger">{{ task.attributes.priority }}</b-badge>
        {{ task.attributes.content }}
      </p>
    </div>
    <div>
      <form-status v-model="task.attributes.status" @change="updateTask"/>

      <button type="button" class="btn btn-danger btn-sm" @click="removeTask">remove</button>
    </div>
  </b-list-group-item>
</template>

<script>
import FormStatus from '~/components/FormStatus'

export default {
  components: {
    FormStatus
  },
  props: {
    task: { default: Object, type: Object }
  },
  methods: {
    async updateTask (status) {
      await this.$axios.$patch(`/tasks/${this.task.id}`, {
        data: {
          attributes: { status }
        }
      })
    },
    async removeTask () {
      await this.$axios.$delete(`/tasks/${this.task.id}`)
      this.$emit('delete', this.task.id)
    }
  }
}
</script>
