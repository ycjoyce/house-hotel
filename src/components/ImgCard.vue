<template>
  <div class="img-card">
    <router-link
      class="img-card-link"
      :to="{ path: `/room-intro/${data.id}` }"
    >
      <div class="img-card-overlay">
        <p class="img-card-title font-tertiary">
          {{data.name}}
        </p>
      </div>

      <img
        :src="data.imageUrl"
        :alt="data.name"
        class="img-card-bg"
      >
    </router-link>
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
}
</script>