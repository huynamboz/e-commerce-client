<template>
	<div class="section max-md:w-full">
	<div id="form-search" class=" relative search-container max-md:w-full w-[500px] max-[1130px]:w-[300px] flex bg-slate-100 py-2 px-3 items-center rounded-lg">
		<input @focus="openRecent=true" @keyup.enter ="search()" type="text" v-model="keyword" placeholder="search" class="search-input bg-transparent w-full">
		<div class="icon-search" @click="search()">
			<div class="icon-search-img cursor-pointer">
				<div class="h-[25px] w-[25px] flex items-center justify-center bg-[#06a8f5] text-white rounded-full">
					<i class="fi fi-rr-search"></i>
				</div>
			</div>
		</div>
		<div class=" absolute w-full top-[calc(100%_+_5px)] left-0" v-show="openRecent">
			<div class=" bg-white shadow-lg h-fit max-h-[200px] w-full">
				<div class="flex gap-2 justify-between items-center p-1 bg-slate-100">
					<div class="flex gap-2">
						<i class="fi fi-rr-time-forward"></i>
						<p class="text-sm font-medium">Tìm kiếm gần đây</p>
					</div>
					<p class="text-sm cursor-pointer" @click="clearRecent()">Xóa tất cả</p>
				</div>
				<div class="flex flex-col">
					<div v-for="(item,index) in keywordRecent" :key="index" class="flex gap-2 items-center p-1 hover:bg-slate-100 cursor-pointer" @click="searchFromRecent(item)">
						<i class="fi fi-rr-time-forward"></i>
						<p class="text-sm font-normal">{{item}}</p>
					</div>
				</div>
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
			openRecent: false,
			keywordRecent: [],
			data:{
				name: "",
				phone: "",
				urlCompany: "",
				email: "",
				nameCompany: "",
				content: "",
			},
		};
	},
	mounted() {
		this.fetchKeywordRecent();
		let inp = document.getElementById("form-search");
		let that = this;
		document.addEventListener("click", function (e) {
			let targetElement = e.target; // clicked element
			do {
				if (targetElement == inp) {
					console.log("This is a click inside element. Do nothing, just return.");
					return;
				}
				targetElement = targetElement.parentNode;
			} while (targetElement);
			that.openRecent = false;
		});
	},
	methods: {
		clearRecent() {
			this.keywordRecent = [];
			localStorage.setItem("keywordRecent", JSON.stringify(this.keywordRecent));
		},
		searchFromRecent(val) {
			this.keyword = val;
			this.$router.push(`/search?keyword=${this.keyword}`);
			this.openRecent = false;
		},
		fetchKeywordRecent() {
			this.keywordRecent = JSON.parse(localStorage.getItem("keywordRecent"));
			if (!this.keywordRecent) {
				this.keywordRecent = [];
			}
		},
		search() {
			try {
				this.openRecent = false;
				console.log(this.keyword);
				if (this.keyword?.length > 0) {
					if (this.keywordRecent?.length > 0) {
						if (this.keywordRecent.includes(this.keyword)) {
							this.keywordRecent.splice(this.keywordRecent.indexOf(this.keyword), 1);
						}
						this.keywordRecent.unshift(this.keyword);
						localStorage.setItem("keywordRecent", JSON.stringify(this.keywordRecent));
					} else {
						this.keywordRecent.unshift(this.keyword);
						localStorage.setItem("keywordRecent", JSON.stringify(this.keywordRecent));
					}
					this.$router.push(`/search?keyword=${this.keyword}`);
				}
			} catch (error) {
				console.log(error);
			}
		},
	}
};
</script>
<style lang="scss" scoped></style>