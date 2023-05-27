<template>
	<nuxt-link :to="`/product/${product.id}`" class="card-container">
			<!-- <div class="tag-sale" v-if="product.discount > 0">{{ product.discount }}% giảm</div> -->
			<img v-if="product.thumbnails[0]" :src="product.thumbnails[0]" @error="handleError" alt="" class="item-bg">
			<img v-else :src="fallbackImageUrl" alt="" class="item-bg">
			<div class="item-product-content">
				<h3 class="item-product-name">{{ product.name }}</h3>
				<div class="item-cost-parent flex gap-1">
					<!-- <p class="item-cost-before" v-if="product.discount > 0"><del>{{ formatPrice(product.price) }} </del> - </p> -->
					<p class="item-cost">{{ formatPrice(product.price - (product.price * product.discount / 100)) }}</p>
					<span v-show="product.discount > 0" class="price-tag">
						<span class="text-xs">{{ product.discount }}% giảm</span>
					</span>
				</div>
				<p class="addr text-sm">{{ product.user.location }}</p>
			</div>
	</nuxt-link>
</template>
<script>
export default{
	props:{
		product:{
			type: Object,
			default: () => {}
		}
	},
	data(){
		return{
			baseUrl: process.env.baseUrl,
			fallbackImageUrl: 'https://via.placeholder.com/300x300'
		}
	},
	methods:{
		formatPrice(price){
			let formatter = new Intl.NumberFormat('vi-VN', {
				style: 'currency',
				currency: 'VND',
				minimumFractionDigits: 0
			});
			return formatter.format(price);
		},
		handleError(e){
			e.target.src = this.fallbackImageUrl;
		}
	}
}
</script>
<style lang="scss" scoped>
$price-tag-background: #ff6347;
$price-tag-color: #fff;
$price-tag-height: 20px;
$price-tag-corner: 4px;
$price-tag-dot-radius: 6px;
$price-tag-dot-background: #fff;

.price-tag {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  height: $price-tag-height;
  margin-left: $price-tag-height / 2;
  padding: 0 5px 0 10px;
  color: $price-tag-color;
  border-radius: 0 $price-tag-corner $price-tag-corner 0;
  background-color: $price-tag-background;
  line-height: 1;
  justify-content: center;

  &::before,
  &::after {
    position: absolute;
    content: '';
  }

  &::before {
    $price-tag-side: round($price-tag-height / 1.428);

    left: -$price-tag-side / 2;
    width: $price-tag-side;
    height: $price-tag-side;
    transform: rotate(45deg);
    border-radius: 0 0 0 $price-tag-corner;
    background-color: $price-tag-background;
  }

  &::after {
    z-index: 1;
    top: 50%;
    left: -$price-tag-height / 2;
    width: $price-tag-dot-radius;
    height: $price-tag-dot-radius;
    transform: translate(-50%, -50%) translateX($price-tag-height / 2);
    border-radius: $price-tag-dot-radius / 2;
    background-color: $price-tag-dot-background;
  }

  &__main {
    font-size: 1.15em;
    font-weight: bold;

    ~ * {
      opacity: 0.85;
    }
  }

  span {
    position: relative;
    z-index: 1;
  }

  &--two-lines {
    $price-tag-side: round($price-tag-height / 1.428) * 2;
    margin-left: $price-tag-height;
    height: $price-tag-height * 2;

    &::before {
      left: -$price-tag-side / 2;
      width: $price-tag-side;
      height: $price-tag-side;
    }

    &::after {
      transform: translate(-50%, -50%) translateX($price-tag-height / 2) scale(2);
    }
  }

  &--one-line {
    flex-direction: row;
    align-items: center;

    span {
      &:not(:first-child) {
        &::before {
          content: ', ';
        }
      }
    }
  }
}

body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.card-container{
	width: 210px;
	min-height: 328px;
	height: 331px;
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
	padding-bottom: 10px;
	border-radius: 2px;
	overflow: hidden;
	position: relative;
	box-shadow: -1px 5px 20px 1px rgb(130 130 130 / 10%);
	@media screen and (max-width:768px) {
		max-width: 205px;
		width: calc( 100vw / 2 - 15px);
		min-height: unset;
		height: fit-content;
		max-height: unset;
		height: 280px;
	}
}
.tag-sale{
	position: absolute;
	top: 10px;
	left: 5px;
	border-radius: 5px;
	background-color: #ff4131;
	color: #ffffff;
	font-weight: 400;
	padding: 5px;
	font-size: 14px;
}
.item-bg{
	width: 100%;
	height: 100%;
	max-height: 200px;
	min-height: 200px;
	object-fit: cover;
	object-fit: cover;
	@media screen and (max-width:768px) {
		max-height: 60px;
		min-height: 160px;
		max-width: unset;
	}
}
.item-product-content{
	padding: 5px 5px 0 5px;
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: space-between;
	gap: 10px;
}
.item-cost-before{
	font-weight: 400;
	color: #adadad;
	font-size: 16px;
	@media screen and (max-width:768px) {
		font-size: 14px;
	}
}
.item-product-name{
	font-weight: 400;
	font-size: 14px;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	@media screen and (max-width:768px) {
		font-size: 14px;
	}
}
.item-cost-parent{
	display: flex;
	align-items: center;
}
.item-cost{
	font-weight: 400;
	color: #ff4131;
	font-size: 18px;
	@media screen and (max-width:768px) {
		font-size: 14px;
	}
}
.addr{
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>