<template>
	<div class="w-full h-fit overflow-x-auto pb-5">
		<div class="h-full w-[1400px]">
			<div class="flex gap-7 flex-wrap">
				<div class=" cursor-pointer" v-for="(item, index) in list" :key="index" @click="$router.push(`/search?keyword=&category=${item.id}`)">
					<div class="flex flex-col items-center gap-2 max-w-[90px]">
						<img :src="item.thumbnail" alt="" 
						class="object-cover w-[90px] h-[90px] 
						max-md:w-[80px] max-md:h-[80px] rounded-lg">
						<p class="text-xs">{{ item.name }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			list: [
				{
					name: 'Điện thoại',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Laptop',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
				},
			]
		}
	},
	mounted(){
		this.fetchCategory();
	},
	methods : {
		fetchCategory() {
			this.$axios.$get('/products/categories')
				.then(res => {
					this.list = res.data;
					console.log('res', res.data);
				})
		},
	}
}
</script>