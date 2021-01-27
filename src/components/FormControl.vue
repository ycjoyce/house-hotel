<template>
  <div>
    <label
      class="form-control"
      v-for="(title, index) in data.value"
      :key="'form-control-' + index"
    >
      <p class="form-control-title">
        {{title}}
      </p>
      
      <input
        class="form-control-input"
        :type="inputType"
      >
    </label>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    inputType() {
      return this.data.name === 'tel' ? 'tel' : 'text';
    },
  },
}
</script>

<style>

</style>