<template>
  <div class="foods">
  <transition name="foodshow">
	<div class="food"  v-show ="food_show">
	   <div class="food-content">
	   	  <div class="image-food">
	   	  	<img :src="food.image">
	   	  	<div class="icon">
	   	 	   	 <i class="icon-arrow_lift" @click="show"></i>
	   	  	</div>
	   	  </div>
        <div class="desc-food">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count"> 月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">￥<span class="nowprice">{{food.price}}</span><span v-show="food.oldPrice" class="oldprice">￥{{food.oldPrice}}</span> </div>
           <transition name="con">  <div class="control" v-show="food.count!=0&&food.count!=undefined" ><cartcontrol :food="food"></cartcontrol></div></transition>
           <transition name="car"> <div class="shopcar " v-show="food.count===0||!food.count" @click.stop.prevent="add($event)" ><span>加入购物车</span></div></transition>    
        </div>
        <lines></lines>
         <div v-show="food.info">
         <div class="info" >
           <h1 class="title">商品介绍</h1>
           <p class="text">{{food.info}}</p>       
        </div><lines></lines></div>
        <div class="ratings">
            <h1 class="title">商品评价</h1>
            <div class="rating">
               <rating class="rating" :rating-type="ratingType" :only-content="onlyContent" :ratings="food.ratings" :desc="desc"></rating>
            </div>
        </div>
        <div class="border-line border-1px"></div>
        <div class=rating-wrapper>
           <ul v-show="food.ratings && food.ratings.length">
             <li class="rating border-1px" v-for="rating in food.ratings"  v-show="onlyshow(rating.rateType,rating.text)">
               <div class="time">{{rating.rateTime | formatDates}}</div>
               <div class="remark"><span class="icon" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span><span class="text">{{rating.text}}</span></div>
               <div class="user">
               <span class="uesername">{{rating.username}}</span>
               <span class="avatar"><img :src="rating.avatar" width="12" height="12"></span></div>
             </li>
           </ul>
           <div class="no-ratings" v-show="!food.ratings||!food.ratings.length"> 对不起 没有评价 </div>
        </div>
        </div>

	</div>
  </transition>
  </div>
</template>

<script>
  import MyScroll from "better-scroll"
  import lines from "../line/line"
  import cartcontrol from "../cartconcontrol/carcontrol"
  import rating from "../rating/rating"
  import Vue from "vue"
  import {formatDate} from "../../../common/js/formatDate.js"

   const ALL = 2;
   const POSITIVE = 0;
   const NEGATIVE =1;
	export default{
		components:{
      lines:lines,
      cartcontrol:cartcontrol,
      rating: rating,
    },
    filters:{
      formatDates(time){
        let date = new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm')
      }
    },
    data(){
			return {
				food_show: false,
        ratingType: { nowType:''},
        onlyContent:{ nowType:''},
        desc :{
          all: "全部",
          positive:"推荐",
          negative:"吐槽",
        }
			}
		},
		props :{
			food:{
              type:Object
		}},
		methods: {
      onlyshow(type,text){
        if(!text&&this.onlyContent.nowType===false){
          return false
        }
        if(this.ratingType.nowType === ALL){
            return true;
        }else{
          return type === this.ratingType.nowType;
        }

      },
			show (){
        this.ratingType.nowType = ALL ;
        this.onlyContent.nowType = true ;
				this.food_show=!this.food_show;
        this.$nextTick(()=>{
           if(!this.myscroll){
              this.myscroll = new MyScroll('.food',{
                click:true
              });
           }else{
              this.myscroll.refresh();
           }
        });
        },
      add (event){
        if(!event._constructed){
          return
        }
        Vue.set(this.food,'count',1)
        
      },
		},
	}
</script>
<style lang="stylus"  rel="stylesheet/stylus">
@import "../../../common/stylus/mixin.styl"

.foodshow-enter-active,.foodshow-leave-active,.car-enter-active,.car-leave-active,.con-enter-active,.con-leave-active
  transition: .5s all
.foodshow-enter,.foodshow-leave-to
  transform: translateX(-100%)
.car-enter,.car-leave-to,.con-enter,.con-leave-to
  opacity: 0
.food
  position: fixed
  left: 0
  top: 0
  bottom: 46px
  background: #fff
  z-index: 30
  width: 100%
  overflow: hidden
  .image-food
    position: relative
    width: 100%
    height: 0
    padding-top: 100%
    img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height:100%
    .icon
      position: absolute
      top:10px
      left:0px
      i
      padding:10px
      font-size:20px
      color :#fff
  .desc-food
    position: relative
    width:100%
    background: #fff
    padding: 18px 18px 0 18px
    .title
      font-size: 14px
      font-weight: 700
      color: rgb(7,17,27)
      line-height: 14px
    .detail
      margin-top: 8px
      font-size: 10px
      color: rgb(147,153,159)
      line-height: 10px
      .rating
        margin-left:12px
    .price
      margin-top:18px
      font-size: 10px
      color: rgb(240,20,20)
      font-weight: normal
      line-height: 48px
      .nowprice
        font-size: 14px
        font-weight: 700
      .oldprice  
        margin-left: 8px
        color: rgb(147,153,159)
        text-decoration: line-through
    .shopcar
      position: absolute
      bottom: 18px
      right: 0
      margin-right:55px
      background: rgb(0,160,220)
      border-radius: 24px
      width: 74px
      height: 24px
      text-align: center
      span
        font-size: 10px
        color: rgb(255,255,255)
        line-height: 24px
    .control
      position: absolute
      bottom: 14px
      right: 0
      margin-right:55px
      font-size:24px
  .info
    padding:18px
    background: #fff
    .title
      font-size: 14px
      line-height: 14px
      font-weight: 400
    .text
      margin-top: 12px
      margin-left: 8px
      font-size: 12px
      font-weight: 200
      color: rgb(77,85,93)
      line-height: 24px
  .ratings
    padding: 18px
    .title
      font-size: 14px
      font-weight: 300
    .rating
      margin-top: 18px
  .border-line
    border-top:solid 1px (rgba(7,17,27,.2))
    margin-top: -8px
  .rating-wrapper
    position:relative
    padding: 0 16px
    .rating
       padding-top:16px   
       position:relative
  
      .time
        color: rgb(147,153,159)
        font-size:10px
        line-height: 12px
      .remark
        border-1px(rgba(7,17,27,.2))
        margin-top: 6px
        padding-bottom:16px
        .icon
          font-size: 12px
          color: rgb(147,153,159)
          line-height: 24px
          &.icon-thumb_up
            color: rgb(0,160,220)
        .text
          font-size: 12px
          color: rgb(7,17,27)
          line-height: 16px
          margin-left: 4px
      .user
        position: absolute
        top: 16px
        right: 0px

</style>