<template>
	<div class="section">
	<div class="search-container w-[500px] flex bg-slate-100 py-2 px-3 items-center rounded-2xl">
		<input type="text" v-model="keyword" placeholder="search" class="search-input bg-transparent w-full">
		<div class="icon-search" @click="$router.push(`/search?keyword=${keyword}`)">
			<div class="icon-search-img">
				<i class="fi fi-rr-search"></i>
			</div>
		</div>
	</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			isOpen: false,
			selectedOption: null,
			hoverIndex: -1,
			isCheck: false,
			isError: false,
			keyword: "",
			checked: false,
			data:{
				name: "",
				phone: "",
				urlCompany: "",
				email: "",
				nameCompany: "",
				content: "",
			},
			options: [
				"Thiết bị điện tử",
				"Đồ gia dụng",
				"Quần áo",
				"Bàn ghế",
				"Đồ dùng",
			],
		};
	},
	methods: {
		openForm() {
			this.isOpen = !this.isOpen;
			this.$forceUpdate();
			console.log("hi");
		},
		selectOption(option) {
			this.selectedOption = option;
			this.isOpen = !this.isOpen;
		},
		setHover(index) {
			this.hoverIndex = index;
		},
		scrollTop() {
			window.scrollTo({
				top: 60,
				left: 0,
				behavior: "smooth",
			});
		},
	},
	mounted() {
	}
};
</script>
<style lang="scss" scoped></style>