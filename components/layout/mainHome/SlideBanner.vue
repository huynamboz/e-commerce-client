<template>
	<!-- Make a div wrapped slider,set height and width -->
	<div class="h-[400px] max-md:h-[200px]" style="width:100%;margin:20px auto;">
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
import { slider, slideritem } from 'vue-concise-slider'
export default {
	el: '#app',
	data() {
		return {
			//data list [array]
			someList: [
				{
					html: '',
					style: {
						'background': 'url(https://down-vn.img.susercontent.com/file/vn-50009109-0fa7cb6875fd02f33bbd9ff98d42a222)',
						'background-size': 'contain',
						'background-position': 'center',
						'border-radius': '7px'
					}
				},
				{
					html: '',
					style: {
						'background': 'url(https://down-vn.img.susercontent.com/file/vn-50009109-b9a5f08ff283b9433a4e39a35975ac77)',
						'background-size': 'contain',
						'background-position': 'center',
						'border-radius': '7px'
					}
				},
				{
					html: '',
					style: {
						'background': 'url(https://media3.scdn.vn/img4/2023/05_22/yhgwyjbPWlB541oPoXQ4.jpg)',
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
	components: {
		slider,
		slideritem
	}
}
</script>