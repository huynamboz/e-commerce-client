<template>
	<div class="w-full h-fit overflow-x-auto pb-5">
		<div class="h-full w-[1400px]">
			<div class="flex gap-7 flex-wrap">
				<div v-for="(item, index) in list" :key="index">
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
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F1000.png&w=256&q=95'
				},
				{
					name: 'Laptop',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F5000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
				},
				{
					name: 'Thú cưng',
					thumbnail: 'https://lighthouse.chotot.com/_next/image?url=https%3A%2F%2Fstatic.chotot.com%2Fstorage%2Fchapy-pro%2Fnewcats%2Fv8%2F12000.png&w=256&q=95'
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