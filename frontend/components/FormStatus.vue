<template>
  <b-form-radio-group v-model="v" button-variant="outline-primary" size="sm" buttons @input="$emit('input', $event)" @change="$emit('change', $event)">
    <b-form-radio value="PENDING">pending</b-form-radio>
    <b-form-radio value="IN_PROGRESS">in progress</b-form-radio>
    <b-form-radio value="DONE">done</b-form-radio>
  </b-form-radio-group>
</template>

<script>
export default {
  props: {
    value: { default: '', type: String },
    withReset: { default: false, type: Boolean }
  },
  data () {
    return { v: this.value }
  }
}
</script>
