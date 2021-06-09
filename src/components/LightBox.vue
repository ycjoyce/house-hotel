<template>
    <div
			class="light-box"
			@click="closeLightBox($event)"
		>
			<button
				class="btn btn-pure btn-prev light-box-prev"
				@click="curIndex -= 1"
				:disabled="curIndex === 0"
			></button>

			<div class="light-box-inner">
				<slider
          class="slider-no-stretch"
					:images="images"
					:curIndex="curIndex"
				/>
			</div>

			<button
				class="btn btn-pure btn-next light-box-next"
				@click="curIndex += 1"
				:disabled="curIndex === images.length - 1"
			></button>
    </div>
</template>

<script>
import Slider from '@src/components/Slider.vue';

export default {
	components: {
		Slider,
	},
	props: {
		images: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			curIndex: 0,
		};
	},
	methods: {
		closeLightBox(e) {
      const { target } = e;
      const btnPrev = target.matches('.light-box-prev');
      const btnNext = target.matches('.light-box-next');
      const sliderImg = target.matches('.slider-img');
      if (btnPrev || btnNext || sliderImg) {
        return;
      }
			this.$emit('close');
		},
	},
};
</script>
