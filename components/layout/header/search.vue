<template>
	<div class="search-container">
		<div class="custom-select-wrapper">
			<div class="custom-select" >
				<button class="custom-select-trigger" @click="openForm()">
					{{ selectedOption ? selectedOption : "Tất cả" }}</button>
				<div class="custom-options" v-show="isOpen">
					<span class="custom-options-item" v-for="(option, index) in options" 
					:key="index" @click="selectOption(option)">
						{{ option }}
					</span>
				</div>
			</div>
		</div>
		<input type="text" placeholder="search" class="search-input">
		<div class="icon-search">
			<i class="fi fi-rr-search"></i>
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
		document.addEventListener("click", (e) => {
			console.log(e.target);
			if (!this.$el.contains(e.target)) {
				this.isOpen = false;
			}
		});
	}
};
</script>
<style lang="scss" scoped>
.btn-search {
	color: white;
	border: none;
	margin: 0;
	width: 20px;
	height: 20px;

	&:hover {
		cursor: pointer;
	}
}

input {
	margin: 0;
	all: unset;
}

.search-input {
	border: none;
	padding: 0px 20px;
	border-radius: 6px;
	width: 100%;
}

.search-container {
	padding: 5px 5px;
	display: flex;
	align-items: center;
	border-radius: 10px;
	background-color: #ffffff;
	width: 500px;
	position: relative;
	justify-content: space-between;
}

.icon-search {
	margin-top: 5px;
	font-size: 20px;
	margin-right: 10px;
	color: #113366;
}
.custom-select-trigger{
	padding: 15px 20px;
	width: 150px;
	background-color: #113366;
	border: none;
	color: #ffffff;
	border-radius: 10px;
}
.custom-options{
	position: absolute;
	width: 220px;
	z-index: 999;
	padding: 5px;
	border-radius: 10px;
	top: calc(100% + 10px);
	display: flex;
	cursor: pointer;
	flex-direction: column;
	background-color: #ffffff;
	//make slightly drop shadow
	box-shadow:  0 4px 11px rgba(0,0,0,0.1);
	//animation
	animation: openForm 0.3s ease-in-out;
	transition: .2s ease-in-out;
}
@keyframes openForm{
	from{
		opacity: 0;
		transform: translateY(-10px);
	}
	to{
		opacity: 1;
		transform: translateY(0px);
	}
}
.custom-options-item{
	padding: 10px;
	border-radius: 10px;
	&:hover{
		background-color: #113366;
		color: #ffffff;
	}
}
</style>