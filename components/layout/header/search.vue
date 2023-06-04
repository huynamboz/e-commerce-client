<template>
	<div class="section max-md:w-full">
	<div id="form-search" class=" relative search-container max-md:w-full w-[670px] max-[1130px]:w-[300px] flex bg-slate-100 py-1 px-3 pr-1 items-center rounded-md">
		<i class="fi fi-rr-cross-small h-[22px] mr-2 cursor-pointer text-[20px]" @click="keyword = ''"></i><input @focus="openRecent=true" @keyup.enter ="search()" type="text" v-model="keyword" placeholder="Search" class="search-input font-normal bg-transparent w-full">
		<div class="icon-search" @click="search()">
			<div class="icon-search-img cursor-pointer">
				<div class="h-[30px] w-[40px] flex rounded-md items-center justify-center bg-[#06a8f5] text-white">
					<i class="fi h-[18px] fi-rr-search"></i>
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
				<div class="flex flex-col overflow-y-scroll max-h-[166px]">
					<div v-for="(item,index) in keywordRecent" :key="index" class="flex justify-between gap-2 items-center p-1 hover:bg-slate-100 cursor-pointer">
						<div class="flex items-center gap-3 w-full" @click="searchFromRecent(item)">
							<i class="fi fi-rr-time-forward"></i>
							<p class="text-sm font-normal">{{item}}</p>
						</div>
						<div id="del-recent-key" class="w-[30px]" @click="deleteRecentKeyword(item); openRecent = true">
							<i class="fi fi-rr-cross-small"></i>
						</div>
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
		let x = document.getElementById("del-recent-key");
		let that = this;
		document.addEventListener("click", function (e) {
			let targetElement = e.target; // clicked element
			do {
				if (targetElement == inp || targetElement == x) {
					console.log("This is a click inside element. Do nothing, just return.");
					return;
				}
				targetElement = targetElement.parentNode;
			} while (targetElement);
			that.openRecent = false;
		});
	},
	methods: {
		deleteRecentKeyword(item){
			this.keywordRecent.splice(this.keywordRecent.indexOf(item), 1);
			localStorage.setItem("keywordRecent", JSON.stringify(this.keywordRecent));
			this.openRecent = true;
		},
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