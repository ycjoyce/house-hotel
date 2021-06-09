<template>
  <div class="slider-box">
		<slider-dots
			:amount="images.length"
			:cur-index="curIndex"
			:class="{ colored: coloredDots }"
			:dots-left="dotsLeft"
			@changeSlideIndex="slideImage"
		/>

		<slot></slot>

		<slider
			:images="images"
			:cur-index="curIndex"
		/>
	</div>
</template>

<script>
import Slider from '@src/components/Slider.vue';
import SliderDots from '@src/components/SliderDots.vue';

export default {
	components: {
		Slider,
		SliderDots,
	},
	props: {
		images: {
			type: Array,
			default: () => [],
		},
		period: {
			type: Number,
			default: 5,
		},
		autoplay: {
			type: Boolean,
			default: true,
		},
		coloredDots: {
			type: Boolean,
			default: false,
		},
		dotsLeft: String,
	},
	data() {
		return {
			curIndex: 0,
			autoPlayTimer: null,
		};
	},
	methods: {
		slideImage(index) {
			if (!index && index !== 0) {
				this.curIndex = (this.curIndex <= this.images.length - 2) ? this.curIndex + 1 : 0;
				return;
			}
			this.curIndex = index;
			if (this.autoplay) {
				clearInterval(this.autoPlayTimer);
				this.autoPlayTimer = setInterval(
					this.slideImage,
					this.period * 1000,
				);
			}
		},
	},
	created() {
		if (this.autoplay) {
			this.autoPlayTimer = setInterval(
				this.slideImage,
				this.period * 1000,
			);
		}
	},
	beforeDestroy() {
		if (this.autoplay) {
			clearInterval(this.autoPlayTimer);
		}
	},
};
</script>
