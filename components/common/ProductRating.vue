<template>
	<div class="flex gap-2 cursor-pointer" :class="font">
		<i class="fi fi-ss-star" @click="chooseStar(1)" :class="{'text-[#f3a632]': rating<=5 && rating >0, 'text-gray-300': rating <=0}"></i>
		<i class="fi fi-ss-star" @click="chooseStar(2)" :class="{'text-[#f3a632]': rating<=5 && rating >1, 'text-gray-300': rating <=1}"></i>
		<i class="fi fi-ss-star" @click="chooseStar(3)" :class="{'text-[#f3a632]': rating<=5 && rating >2, 'text-gray-300': rating <=2}"></i>
		<i class="fi fi-ss-star" @click="chooseStar(4)" :class="{'text-[#f3a632]': rating<=5 && rating >3, 'text-gray-300': rating <=3}"></i>
		<i class="fi fi-ss-star" @click="chooseStar(5)" :class="{'text-[#f3a632]': rating<=5 && rating >4, 'text-gray-300': rating <=4}"></i>
	</div>
</template>
<script>

export default {
	props:{
		productId:{
			type: Number,
			default: 0
		},
		rating:{
			type: Number,
			default: 0
		},
		font:{
			type: String,
			default: 'text-xs'
		}
	},
	mounted() {
		console.log(this.rating);
	},
	methods: {
		chooseStar(value) {
			this.$emit('chooseStar', value)
		}
	}
}
</script>
<style scoped>
@import url('https://cdn-uicons.flaticon.com/uicons-solid-straight/css/uicons-solid-straight.css');
</style>