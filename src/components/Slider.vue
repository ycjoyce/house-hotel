<template>
  <div class="slider-container">
    <ul
      class="slider"
      :style="{ transform: `translateX(-${curIndex * 100}%)` }"
    >
      <li
        v-for="image in images"
        :key="image"
        class="slider-img-box"
      >
        <img
          :src="image"
          class="slider-img"
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
	props: {
		images: Array,
		curIndex: Number,
	},
};
</script>
