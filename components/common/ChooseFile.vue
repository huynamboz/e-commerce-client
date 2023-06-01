<template>
	<section>
		<div class="main-left max-w-[400px] w-[400px]">
			<div class=" relative h-[400px] w-full p-2 border-[1px] border-gray-400 rounded-lg">
				<div class=" absolute top-0 left-0 h-full w-full">
					<label class="choose-file" for="inp-file">
						<div class="choose-icon">
							<div
								class=" shadow-lg h-10 w-10 border-[1px] border-gray-400 bg-white flex items-center justify-center pt-[3px] rounded-md text-black text-2xl">
								<i class="fi fi-rr-pencil"></i>
							</div>
						</div>
					</label>
					<input type="file" ref="fileInput" accept="image/*" multiple name="" id="inp-file"
						@change="previewImage($event)">
				</div>
				<img :src="previewUrl[0]" alt="" class="w-full h-full rounded-lg object-cover" v-if="previewUrl[0]">
				<img src="~/assets/img/upload-preview.jpg" alt="" class="w-full h-full object-cover" v-else>
				<i class="fi fi-rr-cross-circle text-white absolute top-4 left-4 cursor-pointer"
						@click="removeIMG(previewUrl[0])"></i>
			</div>
			<div class="list-img-preview">
				<div v-for="item in previewUrl" class="relative" v-if="item != previewUrl[0]">
					<i class="fi fi-rr-cross-circle text-white absolute top-2 right-2 cursor-pointer"
						@click="removeIMG(item)"></i>
					<img :src="item" alt="" class="item-img object-cover" v-if="item">
				</div>
		</div>
	</div>
</section></template>
<script>
import { type } from 'os';

export default{
	props: {
		listIMG: {
			type: Array,
			default: () => []
		}
	},
	data(){
		return{
			previewUrl: [],
			listFile: [],
			type: 'ADD',
			listIMGMark: []
		}
	},
	watch:{
		listIMG(val){
			console.log("watch",val);
			this.previewUrl = val;
			this.type = 'EDIT';
		}
	},
	mounted(){
	},
	methods:{
		previewImage(event) {
			try {
				let tmp = [];
				tmp = event.target.files;
				let listTmp = [];
				for (let i = 0; i < tmp.length; i++) {
					this.listFile.push(tmp[i]);
					listTmp.push(tmp[i]);
				}
				this.$emit('updateFile', this.listFile,this.previewUrl);
				listTmp.forEach(item => {
					const reader = new FileReader();
					reader.readAsDataURL(item);
					reader.onload = () => {
						this.previewUrl.push(reader.result);
						this.listIMGMark.push(reader.result);
					}
				})
			} catch (error) {
				console.log(error);
			}
		},
		removeIMG(item){
			console.log(this.listFile.length)
			let index = this.previewUrl.findIndex(i=>i==item)
			this.previewUrl = this.previewUrl.filter(i=>i!=item);
			let index2 = this.listIMGMark.findIndex(i=>i==item)
			console.log("index2",index2)
			if (this.listIMGMark.findIndex(i=>i==item) != -1) {
				this.listFile.splice(index2,1);
				console.log("listFile",this.listFile)
			}
			this.$emit('updateFile', this.listFile, this.previewUrl);
			console.log(this.listFile.length)
		},
	}
}
</script>
<style lang="scss" scoped>
#inp-file {
	display: none;
}
.list-img-preview {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
}
.main-left{
	display: flex;
	flex: 1;
	flex-direction: column;
	gap: 10px;
}
.item-img {
	width: 100px;
	height: 100px;
	border-radius: 6px;
}
.choose-file {
	padding: 10px;
	height: 100%;
	width: 100%;
	border-radius: 10px;
	background-color: transparent;
	cursor: pointer;
	color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	// background-image: url('~/assets/img/upload-preview.jpg');
	// background-size: cover;
	// background-repeat: no-repeat;
	// background-position: center;
}
.choose-icon{
	position: absolute;
	display: flex;
	align-items: center;
	gap: 10px;
	top: 10px;
	right: 10px;
	font-size: 34px;
	& > p{
		font-size: 14px;
	}
}</style>
