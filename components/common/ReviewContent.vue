<template>
	<div class="w-full border-[1px] mt-5 bg-white flex flex-col p-5">
		<p class=" text-[20px] font-medium">Nhận xét</p>

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

				<p class=" font-semibold max-md:text-[20px] text-[30px] mt-[70px] ml-[50px]">Chưa có nhận xét</p>
			</div>
		</div>
		<!-- end not have review -->

		<!-- have review -->
		<div class="flex flex-col gap-5 mt-5">
			<div class="flex flex-col gap-5 group" v-for="(item, index) in listReview" :key="index">
				<div class="flex gap-5">
					<div class="relative h-fit cursor-pointer" @click="$router.push(`/user/${item.user.id}`)">
						<img v-if="!item.user.avatar || item.user.avatar == 'null'" src="~/assets/img/defaultavt.webp" alt="" class="w-10 h-10 rounded-full border-[1px] border-[#06a8f5]">
						<img v-else="item.user.avatar" :src="item.user?.avatar" alt="" class="w-10 h-10 rounded-full border-[1px] border-[#06a8f5]">
						<div v-if="item.user?.id == $auth.user?.id" class=" absolute px-1 rounded-md left-[5px] -bottom-1 text-xs bg-blue-400 text-white">Bạn</div>
					</div>
					<div class="flex flex-col">
						<div class="flex gap-3 items-center">
							<p class="font-semibold cursor-pointer" @click="$router.push(`/user/${item.user.id}`)">{{ item.user.name }}</p>
							<p class="text-[12px] text-gray-400">{{ new Date(item.create_at).toLocaleDateString() }}</p>
							<div v-if="item?.user.id == $auth.user?.id" class=" cursor-pointer hidden group-hover:block" @click="isCommented = !isCommented; review = item.comment" title="Chỉnh sửa nhận xét">
								<i class="fi fi-rr-edit"></i>
							</div>
							<div v-if="item?.user.id == $auth.user?.id" class=" cursor-pointer hidden group-hover:block" @click="confirmDelCmt = true" title="Xóa nhận xét">
								<i class="fi fi-rr-trash"></i>
								<vs-dialog :loading="deleting" not-close not-center v-model="confirmDelCmt">
									<template #header>
									<h4 class=" text-center text-2xl font-medium">
										Xác nhận
									</h4>
									</template>


									<div class="con-content">
									<p class="text-center">
										Bạn chắc chắn muốn xóa bình luận này?
									</p>
									</div>

									<template #footer>
									<div class="con-footer flex">
										<vs-button @click="confirmDelCmt = false" transparent>
										Đóng
										</vs-button>
										<vs-button @click="deleteCmt()">
										Đồng ý
										</vs-button>
									</div>
									</template>
								</vs-dialog>
							</div>
							<!-- <product-rating :rating="item.rating" /> -->
						</div>
						<p class=" max-w-[800px] break-words">
							{{ item.comment }} &nbsp; <span v-if="item.create_at.split('.')[0] != item.update_at.split('.')[0]" class="text-xs text-gray-400">
								<i class="fi fi-rr-pencil"></i> đã chỉnh sửa
							</span>
						</p>
					</div>
				</div>
				<div class="w-full h-[0px] border-b-[1px] bg-slate-300"></div>
			</div>

			

		</div>
		<div v-if="$auth.loggedIn && product?.user?.id != $auth.user?.id && !isCommented" class="flex items-center mt-5 p-3 pr-0 max-h-[50px] bg-slate-100 rounded-lg px-3 gap-4">
			<img v-if="!$auth.user?.avatar || $auth.user?.avatar == 'null'" src="~/assets/img/defaultavt.webp" alt="" class="w-7 h-7 rounded-full border-[1px] border-[#06a8f5]">
			<img v-else :src="$auth.user?.avatar" alt="" class="w-7 h-7 rounded-full border-[1px] border-[#06a8f5]">
			<input @keyup.enter="addReview()" v-model="review" type="text" class="w-[calc(100%_-_102px)] bg-transparent" placeholder="Viết Nhận xét">
			<button class=" whitespace-nowrap bg-blue-400 mr-1 hover:bg-blue-500 rounded-lg p-2 text-sm text-white" @click="addReview()">Nhận xét</button>
		</div>
		<!-- <product-rating v-if="product.user?.id != $auth.user?.id" :rating="rating" :font="'text-lg'" class="mt-3 ml-3" @chooseStar="chooseStar"/> -->
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
		},
		product: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			review: '',
			rating:0,
			isCommented: false,
			confirmDelCmt: false,
			deleting: false,
		}
	},
	mounted() {
		console.log(this.listReview)
		console.log(this.$route);
		
	},
	watch: {
		listReview: {
			handler() {
				this.checkCommented()
			},
			immediate: true
		}
	},
	methods: {
		checkCommented() {
			this.listReview.forEach(item => {
			if (item.user.id == this.$auth.user?.id) {
				this.isCommented = true
			}
		})
		console.log(this.isCommented)
		},
		async deleteCmt() {
			this.deleting = true
			let res = await this.$axios.delete(`/products/${this.listReview[0]?.product.id}/reviews`)
			.then(res => {
				this.$toast.success('Xóa bình luận thành công')
				this.$emit('fetch-reviews')
				this.deleting = false
			}).catch(err => {
				this.$toast.error('Xóa bình luận thất bại')
				this.deleting = false
			})
			this.confirmDelCmt = false
		},
		chooseStar(value) {
			this.rating = value
		},
		async addReview() {
			if (this.review == '') {
				this.$toast.error('Vui lòng nhập nhận xét')
				return
			}
			// if (this.rating == 0) {
			// 	this.$toast.error('Vui lòng chọn Nhận xét')
			// 	return
			// }
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