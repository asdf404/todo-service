<template>
  <b-form-radio-group id="task-add-priority" v-model="v" :value="value" size="sm" buttons @input="$emit('input', $event)" @change="$emit('change', $event)">
    <b-form-radio value="0" button-variant="outline-success">low</b-form-radio>
    <b-form-radio value="1" button-variant="outline-warning">medium</b-form-radio>
    <b-form-radio value="2" button-variant="outline-danger">high</b-form-radio>
  </b-form-radio-group>
</template>

<script>
export default {
  props: {
    value: { default: '', type: [ String, Number ] },
    withReset: { default: false, type: Boolean }
  },
  data () {
    return { v: this.value }
  }
}
</script>
