<template>
	<div class="shopcart">
      <div class="content" >
      	<div class="content-left" @click="show">
      	  <div class="logo-wrapper">
      	  	<div class="logo" :class="{'height-line':totalCount>0}">
      	  	  <i class="icon-shopping_cart" :class="{'height-line':totalCount>0}"></i>
      	  	</div>
      	  	<div class="total-counts" v-show="totalCount>0">
      	  	   {{totalCount}}
      	  	</div>
      	  </div>
      	  <div class="price">￥{{totalPrice}}</div>
      	  	<div class="desc">另需配送费{{deliveryPrice}}元</div>
      	</div>
      	 <div class="content-right" @click="pay">
      	  	<div class="pay" v-if="totalCount==0">起送￥ {{minPrice}}</div>
            <div class="pay" v-else-if="totalPrice < minPrice">还差{{ minPrice-totalPrice}}元</div>
            <div class="gotopay" v-else="totalPrice >= minPrice" >请结算</div>
      	 </div>
      </div> 

      <transition name="listup" >
      <div class="shop-list border-1px" ref="shop" v-show="show1">
        <div class="shop-head">
          <h1 class="title">购物车</h1><span class="empty" @click="empty">清空</span>
        </div>
        <div class="shop-content" ref="nirima">
           <transition-group  name="foodin" tag="ul" >
              <li class="food border-1px in_listup" v-for="(food,index) in totalFoods" :key="food.name">
                  <span class="name">{{food.name}}</span>
                  <span class="totalprice"><i>￥</i>{{food.price*food.count}}</span>
                  <div  class="control-wrapper">
                      <carcontrol class="carcontrol" :food="food"></carcontrol>
                  </div>
              </li>
           </transition-group>
        </div>
      </div>
      </transition>
  </div> 
</template>

<script>
 import carcontrol from "../cartconcontrol/carcontrol"
 import MyScroll from "better-scroll"

	export default{
    data(){
        return{
           fold :false
        }
    },
    components:{
      carcontrol,
    },
    
		props :{
			deliveryPrice:{type:Number, default:0},
			minPrice:{type:Number,default:0},
      is_show: {},
			totalFoods:{
			type: Array,
			default() {
				return [
				{
					price : 2,
					count: 0
				}] ;
				}
			}
		},
      methods: {
        empty(){
           this.totalFoods.forEach((food) => {
              food.count =0;
              this.is_show.inshow =false;
           });
           
        },
       
        pay(){
         if(this.totalPrice>=this.minPrice){
            
             window.alert('成功支付'+this.totalPrice+'元');
          this.totalFoods.forEach((food) =>{
            food.count =0;
            this.is_show.inshow =false;
          });
         }
        },
        show(){
              if(this.totalCount>0){
              this.is_show.inshow = !this.is_show.inshow;

            }
        },
       
    },
	computed : {
   
		totalPrice (){
			let price = 0;
			this.totalFoods.forEach((food) =>{
				price += food.price*food.count
			});
			return price
		},
		totalCount (){
			let count = 0
			this.totalFoods.forEach((food) => {
                count +=food.count
			});
			return count
		},
    show1 (){
      if(!this.totalCount){
         this.is_show.inshow =false;
         return false;
      }
        let show =this.is_show.inshow;
       
        if(show){
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new MyScroll(".shop-content", {
                click: true
              });  
            } else {
              this.scroll.refresh();
            }
        });
      }  return show
    }
	}
}
</script>



<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/mixin.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index:500
    height:46px
    line-height:46px
    width:100%
    .content
      display: flex
      background: #141d37
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin :0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d37
          .logo
            width: 100%
            height: 100%
            text-align: center
            border-radius: 50%
            background: rgba(255,255,255,.3)
            &.height-line
              background: rgb(0,160,220)
            .icon-shopping_cart
              vertical-align: middle
              font-size: 24px
              line-height: 24px
              color: rgba(255,255,255,.5)
              &.height-line
                color: #fff
          .total-counts
            position: absolute
            top: 0
            right: 0
            height: 16px
            width: 24px
            line-height: 16px
            border-radius: 16px
            background: rgb(240,20,20)
            text-align: center
            box-shadow: 0 4px 8px 0 rgba(0,0,0,.4)
            font-size: 12px
            color: #fff
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255,255,255,.3)
          font-size: 20px
          color: rgba(255,255,255,.4)
        .desc
          display: inline-block
          vertical-align: top
          margin-top: 12px
          margin-left: 12px
          line-height:24px
          font-size: 10px
          color: #fff
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          color: rgba(255,255,255,.3)
          font-size: 14px
          background: #2b333b
        .gotopay
            height: 48px
            line-height: 48px
            text-align: center
            color: rgba(255,255,255,.3)
            font-size: 14px
            background: #00b43c
            color: #fff
    .shop-list
     position: fixed
     left: 0
     bottom: 40px
     padding:0 18px
     border-top: solid 1px rgba(7,17,27,.1)
     z-index: -1
     width:100%
     background: #fff
     &:after
       content:'sad'
       line-height: 20px
       heighet: 20px
       width:100%
       background: #fff
       visibility: hidden    
     .shop-head
       position: fixed
       left: 0
       height: 40px
       line-height: 40px
       background: #f3f5f7
       width: 100%

       .title
         display: inline-block
         font-size: 14px
         font-weight: 200
         color: rgb(7,17,27)
         padding-left: 18px

       .empty
         display: inline-block
         position: absolute
         right:18px
         top:0
         font-size: 12px
         color: rgb(0,160,220)
         padding-top:1px
     .shop-content
       transition: all 5s
       max-height:310px
       min-height:150px
       overflow: hidden
       width:100%
       background: #fff
       line-height: 48px
       margin-top: 40px      
       .food
         border-1px(rgba(7,17,27,0.2))
         .name
           font-size: 14px
           color: rgb(7,17,27)
         .totalprice
           position:absolute
           font-size: 14px
           color: rgb(240,20,20)
           line-height:48px
           font-weight: 700
           left: 50%


           i
             font-size: 10px
             font-weight: nornal
         .control-wrapper
            position: absolute
            right: 20px
            bottom: -12px
  .listup-enter-active,.listup-leave-active,.foodin-enter-active,.foodin-leave-active
    transition: .5s all
    .food
      transition: .5s all
  .listup-leave-to,.listup-enter
    transform: translateY(120%)
  .foodin-leave-to
    transform: translateX(100%)
</style>