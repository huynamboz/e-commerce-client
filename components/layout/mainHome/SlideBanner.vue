<template>
	<!-- Make a div wrapped slider,set height and width -->
	<div class="h-[250px] max-md:h-[200px] mb-4" style="width:100%;">
		<!-- Using the slider component -->
		<slider ref="slider" :options="options">
			<!-- slideritem wrapped package with the components you need -->
			<slideritem v-for="(item, index) in someList" :key="index" :style="item.style">{{ item.html }}</slideritem>
			<!-- Customizable loading -->
			<div slot="loading">loading...</div>
		</slider>
	</div>
</template>
<script>
// import slider components
export default {
	data() {
		return {
			//data list [array]
			someList: [
				{
					html: '',
					style: {
						'background': 'url(https://salt.tikicdn.com/cache/w1080/ts/tka/0d/e1/6f/7beb243488a74f0712a451fe8e8d3df8.png.webp)',
						'background-size': 'contain',
						'background-position': 'center',
						'border-radius': '7px'
					}
				},
				{
					html: '',
					style: {
						'background': 'url(https://salt.tikicdn.com/cache/w1080/ts/tikimsp/bb/19/2e/87cab7dae09c6f078639700d8e53a997.png.webp)',
						'background-size': 'contain',
						'background-position': 'center',
						'border-radius': '7px'
					}
				},
				{
					html: '',
					style: {
						'background': 'url(https://salt.tikicdn.com/cache/w1080/ts/tikimsp/07/df/a1/5b6194ae106d2693d9db60a543522db3.png.webp)',
						'background-size': 'contain',
						'background-position': 'center',
						'border-radius': '7px'
					}
				}
			],
			//Slider configuration [obj]
			options: {
				currentPage: 0,
				speed: 300, // Sliding speed
				timingFunction: 'ease-in-out', // Sliding mode
				loop: true, // Infinite loop
				autoplay: 2500 // Auto play[ms]
			}
		}
	},
}
</script>
<style lang="scss" scoped>
iframe {
        width: 100%;
        height: 500px;
    }
</style>