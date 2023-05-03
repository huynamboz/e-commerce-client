<template>
    <div class="cate-container w-full pt-[20px] relative">
		<div class="w-full h-full bg-[#f8fbff] 
		flex gap-14 
		justify-between 
		py-8 px-12 
		relative 
		z-[1] 
		rounded-[60px]
		max-md:flex-col">
			<div class="flex flex-col gap-6">
				<div class="bg-[#e6a5dc] w-fit py-2 px-4 font-medium text-white text-xs rounded-lg">
					Mua sắm thả ga
				</div>
				<p class="hero-text text-6xl max-w-sm text-[#352957]">Shoping cùng Gút market!</p>
				<p class="text-[#352957] max-w-sm">Hỗ trợ <b>kết nối người bán và người mua</b> là một trong những mục tiêu cốt lõi của chúng tôi 
					để tạo ra một môi trường mua bán an toàn và tin cậy. 
				</p>
				<div class="flex">
					<button class="bg-[#9778f3] shadow-2xl shadow-[#a78cf8a3] text-white py-3 px-9 rounded-2xl">Mua sắm ngay</button>
				</div>
			</div>
			<div class=" right-0 bottom-0 relative">
				<img src="~/assets/img/hero_bg.png" alt="" class="w-[70%] object-contain">
				<div class="absolute top-[20%] right-[10%]">
					<div class="relative h-[250px] w-[180px]">
						<div class="absolute z-[2] w-[300px] -left-[49%] -top-[8%]">
								<img src="~/assets/img/hero_tag.png" alt="" class=" w-full">
							</div>
						<div class="absolute z-[1] w-[200px] h-[220px] bg-white shadow-lg right-5 rounded-3xl">
							
						</div>
						<div class="absolute flex flex-col justify-between p-5 z-0 w-[200px] h-[220px] top-[25px] left-[10px] -rotate-12 bg-white shadow-lg right-5 rounded-3xl">
							<div>
								<p>sdcsdc</p>
							</div>
							<div class="flex justify-between items-end">
								<p class="font-pacifico">120.000đ</p>
								<button class="bg-[#f3a632] text-white p-2 h-fit rounded-2xl">
									100%
								</button>
							</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>
		<!-- <div class="bg w-full h-full absolute top-[0] z-0"></div> -->
    </div>
</template>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
.cate-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
	
}
.font-pacifico{
	font-family: 'Pacifico', cursive;
}
.hero-text{
	font-family: 'Pacifico', cursive;
	line-height: 1.5;
}
.bg
{
 background: url("~/assets/img/gradient_img.png") no-repeat center center fixed;
    /* ff 3.6+ */
    // background:-moz-radial-gradient(circle at 50% 50%, rgba(151, 120, 243, 1) 0%, rgba(238, 130, 238, 0) 88%);

    // /* safari 5.1+,chrome 10+ */
    // background:-webkit-radial-gradient(circle at 50% 50%, rgba(151, 120, 243, 1) 0%, rgba(238, 130, 238, 0) 88%);

    // /* opera 11.10+ */
    // background:-o-radial-gradient(circle at 50% 50%, rgba(151, 120, 243, 1) 0%, rgba(238, 130, 238, 0) 88%);

    // /* ie 10+ */
    // background:-ms-radial-gradient(circle at 50% 50%, rgba(151, 120, 243, 1) 0%, rgba(238, 130, 238, 0) 88%);

    // /* global 92%+ browsers support */
    // background:radial-gradient(circle at 50% 50%, rgba(151, 120, 243, 1) 0%, rgba(238, 130, 238, 0) 88%);

}
</style>