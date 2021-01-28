<template>
  <div class="img-card">
    <router-link :to="{ path: `/room-intro/${data.id}` }">
      <div class="overlay">
        <p class="card-title">
          {{data.name}}
        </p>
      </div>

      <img
        :src="data.imageUrl"
        :alt="data.name"
        class="bg-img"
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