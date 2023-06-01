<template>
	<!-- Make a div wrapped slider,set height and width -->
	<div class="h-[250px] max-md:h-[200px] mb-4 flex gap-3" style="width:100%;">
		<div class="flex flex-col gap-2 max-md:hidden">

			<div class="h-[50%] w-[350px] bg-[#f1f3f5]">
				<slider ref="slider" :options="{
				currentPage: 0,
				speed: 300, // Sliding speed
				timingFunction: 'ease-in-out', // Sliding mode
				loop: true, // Infinite loop
				autoplay: 4500 // Auto play[ms]
			}">
					<slideritem v-for="(item, index) in someList1" :key="index" :style="item.style">{{ item.html }}
					</slideritem>
					<div slot="loading">loading...</div>
				</slider>
			</div>

			<div class="h-[50%] w-[350px] bg-[#f1f3f5]">
				<slider ref="slider" :options="options">
					<slideritem v-for="(item, index) in someList2" :key="index" :style="item.style">{{ item.html }}
					</slideritem>
					<div slot="loading">loading...</div>
				</slider>
			</div>

		</div>
		<!-- Using the slider component -->
		<slider ref="slider" :options="{
				currentPage: 0,
				speed: 300, // Sliding speed
				timingFunction: 'ease-in-out', // Sliding mode
				loop: true, // Infinite loop
				autoplay: 6500 // Auto play[ms]
			}">
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
						'border-radius': '3px'
					}
				},
				{
					html: '',
					style: {
						'background': 'url(https://salt.tikicdn.com/cache/w1080/ts/tikimsp/bb/19/2e/87cab7dae09c6f078639700d8e53a997.png.webp)',
						'background-size': 'contain',
						'background-position': 'center',
						'border-radius': '3px'
					}
				},
				{
					html: '',
					style: {
						'background': 'url(https://salt.tikicdn.com/cache/w1080/ts/tikimsp/07/df/a1/5b6194ae106d2693d9db60a543522db3.png.webp)',
						'background-size': 'contain',
						'background-position': 'center',
						'border-radius': '3px'
					}
				}
			],

			someList1: [
				{
					html: '',
					style: {
						'background': 'url(https://cf.shopee.vn/file/vn-50009109-033203bbae920a9f5235addfa3cf2ee4_xxhdpi)',
						'background-size': 'cover',
						'background-position': 'center',
						'border-radius': '3px'
					}
				},
				{
					html: '',
					style: {
						'background': 'url(https://cf.shopee.vn/file/vn-50009109-0841eb146759ede89b14f13c89a491d4_xxhdpi)',
						'background-size': 'cover',
						'background-position': 'center',
						'border-radius': '3px'
					}
				},
				{
					html: '',
					style: {
						'background': 'url(https://salt.tikicdn.com/cache/w1080/ts/tikimsp/07/df/a1/5b6194ae106d2693d9db60a543522db3.png.webp)',
						'background-size': 'cover',
						'background-position': 'center',
						'border-radius': '3px'
					}
				}
			],

			someList2: [
				{
					html: '',
					style: {
						'background': 'url(https://cf.shopee.vn/file/vn-50009109-1aa3c9f71be9d7a940a798b839f50281_xxhdpi)',
						'background-size': 'cover',
						'background-position': 'center',
						'border-radius': '3px'
					}
				},
				{
					html: '',
					style: {
						'background': 'url(https://cf.shopee.vn/file/vn-50009109-275ac283a774353f6aef5507d9c02499_xxhdpi)',
						'background-size': 'cover',
						'background-position': 'center',
						'border-radius': '3px'
					}
				},
				{
					html: '',
					style: {
						'background': 'url(https://cf.shopee.vn/file/vn-50009109-32bd234d9a4ef9ba6d96e13500823b64_xhdpi)',
						'background-size': 'cover',
						'background-position': 'center',
						'border-radius': '3px'
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