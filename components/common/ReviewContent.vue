<template>
	<div class="w-full border-[1px] mt-5 bg-white flex flex-col p-5">
		<p class=" text-[20px] font-medium">Đánh giá</p>

		<!-- not have review -->
		<div class="flex justify-center w-full h-[250px] max-md:h-[200px]" v-show="listReview.length==0">
			<div class="relative w-[40%] h-[80px] max-md:mt-4 max-md:w-[80%]">
				<div class="bg-white shadow-md rounded-lg h-[80px] w-full flex gap-5 items-center px-5">
					<img src="~/assets/img/defaultavt.webp" alt="" class="w-12 h-12 rounded-full border-[2px] border-[#06a8f5]">
					<div class="flex flex-col w-full gap-2">
						<div class="h-[25px] w-full bg-slate-100 rounded-[8px]">
						</div>
						<div class="h-[25px] w-[60%] bg-slate-100 rounded-[8px]">
						</div>
					</div>
				</div>

				<div class=" absolute top-[70%] left-[15%] bg-white shadow-md rounded-lg h-[80px] w-full flex gap-5 items-center px-5">
					<img src="~/assets/img/defaultavt.webp" alt="" class="w-12 h-12 rounded-full border-[2px] border-[#b1a2d5]">
					<div class="flex flex-col w-full gap-2">
						<div class="h-[25px] w-full bg-slate-100 rounded-[8px]">
						</div>
						<div class="h-[25px] w-[60%] bg-slate-100 rounded-[8px]">
						</div>
					</div>
				</div>

				<p class=" font-semibold max-md:text-[20px] text-[30px] mt-[70px] ml-[50px]">Chưa có đánh giá</p>
			</div>
		</div>
		<!-- end not have review -->

		<!-- have review -->
		<div class="flex flex-col gap-5 mt-5">
			<div class="flex flex-col gap-5" v-for="(item, index) in listReview" :key="index">
				<div class="flex gap-5">
					<div class="relative">
						<img v-show="!item.user.avatar" src="~/assets/img/defaultavt.webp" alt="" class="w-10 h-10 rounded-full border-[1px] border-[#06a8f5]">
						<img v-show="item.user.avatar" :src="item.user.avatar" alt="" class="w-10 h-10 rounded-full border-[1px] border-[#06a8f5]">
						<div v-if="item.user.id == $auth.user?.id" class=" absolute px-1 rounded-md left-[5px] bottom-1 text-xs bg-blue-400 text-white">Bạn</div>
					</div>
					<div class="flex flex-col">
						<div class="flex gap-3 items-center">
							<p class="font-semibold">{{ item.user.name }}</p>
							<p class="text-[12px] text-gray-400">{{ new Date(item.create_at).toLocaleDateString() }}</p>
							<product-rating :rating="item.rating" />
						</div>
						<p>
							{{ item.comment }}
						</p>
					</div>
				</div>
				<div class="w-full h-[0px] border-b-[1px] bg-slate-300"></div>
			</div>

			

		</div>
		<div class="flex items-center mt-5 p-3 pr-0 max-h-[50px] bg-slate-100 rounded-lg px-3 gap-4">
			<img src="~/assets/img/defaultavt.webp" alt="" class="w-7 h-7 rounded-full border-[1px] border-[#06a8f5]">
			<input @keyup.enter="addReview()" v-model="review" type="text" class="w-[calc(100%_-_102px)] bg-transparent" placeholder="Viết đánh giá">
			<button class=" whitespace-nowrap bg-blue-400 mr-1 hover:bg-blue-500 rounded-lg p-2 text-sm text-white" @click="addReview()">Đánh giá</button>
		</div>
		<product-rating :rating="rating" :font="'text-lg'" class="mt-3 ml-3" @chooseStar="chooseStar"/>
	</div>
</template>
<script>
import ProductRating from './ProductRating.vue'
export default {
	components: {
		ProductRating
	},
	props: {
		listReview: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			review: '',
			rating:0,
		}
	},
	mounted() {
		console.log(this.listReview)
		console.log(this.$route)
	},
	methods: {
		chooseStar(value) {
			this.rating = value
		},
		async addReview() {
			if (this.review == '') {
				this.$toast.error('Vui lòng nhập đánh giá')
				return
			}
			if (this.rating == 0) {
				this.$toast.error('Vui lòng chọn đánh giá')
				return
			}
			let data = {
				comment: this.review,
				rating: this.rating,
			}
			console.log(this.listReview)
			let res = await this.$axios.post(`/products/${this.listReview[0]?.product.id ? this.listReview[0]?.product.id : this.$route.params.id}/reviews`, data)
				this.$emit('fetch-reviews')
				this.review = '';
				this.rating = 0
		}
	}
}
</script>