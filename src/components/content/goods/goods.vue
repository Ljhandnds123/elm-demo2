<template>
   <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-iteam" :class="{'current':currentIndex===index}" @click="_fund(index,$event)">
             <span class="text border-1px"><span  class="icon" :class="classMap[item.type]" v-show="item.type>0"></span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
             <h1 class="title">{{item.name}}</h1> 
             <ul >
                <li v-for="food in item.foods" class="food-item border-1px" >
                   <div class="icon" @click="markfood(food,$event)">
                      <img :src="food.icon" width="64" height="64">
                   </div>
                   <div class="content" >
                       <h2 class="name" @click="markfood(food,$event)">{{food.name}}</h2>
                       <p class= "desc" v-show="food.description">{{food.description}}</p>
                       <div class="extra">
                         <span class="mon">月售{{food.sellCount}}</span>
                         <span class="good">好评{{food.rating}}%</span>
                       </div>
                       <div class="price">
                          <span class="nowprice">￥{{food.price}}</span>
                          <span v-show="food.oldPrice" class="oldPrice">{{food.oldPrice}}</span>
                       </div>
                       <div class="carcontrol-wrapper">
                           <carcontrol :food="food"></carcontrol>
                       </div>
                   </div>
                </li>
             </ul>
          </li>
        </ul>
      </div>
      <shopCart :is_show="is_show" :totalFoods="totalFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopCart>
      <transition name="pipi"><div class="list-mask" v-show="is_show.inshow" @click="show"></div></transition>
      <transition name="foodshow">
      <food :food="selectFood" ref='good'></food>
      </transition>
   </div>

</template>
<script>

   import MyScroll from "better-scroll"
   import shopCart from "../shopcart/shopcart"
   import carcontrol from "../cartconcontrol/carcontrol"
   import food from "../food/food"
   const ERRNO = 0 
   
   export default{
    props:{
      seller: {
       
      }
    },
    components:{
      shopCart :shopCart,
      carcontrol: carcontrol,
      food,food
    },
    props: {
      seller: {
        
      }
    },
    data (){
       return {
         selectFood: {},
         goods :'',
         listHeight: [],
         scrollY: 0,
         is_show: { 'inshow': false}
       }
    },
    created (){
       this.classMap = ["decrease","discount","special","invoice","guarantee"];
        
       this.$http.get("/api/goods").then(function(res){
           var response = res.body ;
           if(response.errno === ERRNO){
             this.goods = response.data;
             this.$nextTick(() => {
                 this._initScroll();
                 this._getHeight();
             });
           }
       }); 
    },
    methods: {
      markfood(food,event) {
        if(!event._constructed){
          return
        } this.selectFood = food;
          this.$refs.good.show();
          
      },
      show (){
        this.is_show.inshow = !this.is_show.inshow;
      },
       _fund (index,event){
           if(!event._constructed){
                 return;
           }
           let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
              let el = foodList[index];
              this.foodscroll.scrollToElement(el, 300);
           
       },
       _initScroll (){
            this.menuscroll  =  new MyScroll(this.$refs.menuWrapper,{
                 click:true,
            });
            this.foodscroll  =  new MyScroll('.foods-wrapper',{
              probeType:3,
              click: true
            });
            this.foodscroll.on('scroll',(pos) => {
              this.scrollY =Math.abs(Math.round(pos.y));
            });
       },
       _getHeight (){
             let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
             let height= 0;
             this.listHeight.push(height);
             for(let i =0 ;i< foodList.length; i++){
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
             }
       }
    },
    computed: {
          currentIndex() {
              for(let i =0 ; i< this.listHeight.length ; i++){
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i+1];
                if(!height2 || (this.scrollY>=height1&&this.scrollY<height2)){ 
                  return i;
                }
              }return 0 ;
          },
          totalFoods() {
            let foods = [];
            for(var i =0 ;i< this.goods.length; i++){
                    let foodss = this.goods[i].foods;
                for(var j=0 ; j < foodss.length; j++){
                    let food = foodss[j];
                  if(food.count){
                     foods.push(food);
                  }
                }            
                }return foods;
            } 
             
    
  }
}
      
</script>

<style lang="stylus"  rel="stylesheet/stylus">
@import "../../../common/stylus/mixin.styl"
.goods
  display: flex
  position: absolute
  top: 184px
  bottom: 46px
  width: 100%
  overflow:hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7

    .menu-iteam
      display: table
      height: 54px
      width: 80%
      margin: 0 auto
      line-height:14px
      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background: #fff
        font-weight: 700
        .text
          border-none()
      .icon
        vertical-align: top
        display: inline-block
        height: 12px
        width: 12px
        background-size: 12px 12px
        background-repeat: no-repeat
        margin-right: 1px
        float: left
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
      .text
        display: table-cell
        vertical-align: middle
        text-align:center
        padding: 0 4px
        color: rgba(7,17,27,.5)
        border-1px(rgba(7,17,27,0.2))
        font-size: 12px
  .foods-wrapper
    flex: 1

    .title
      height: 26px
      line-height: 26px
      padding-left:14px
      font-size:12px
      color:rgb(147,153,159)
      border-left:solid 2px #d9dde1
      background: #f3f5f7
    .food-item
      position: relative
      margin:18px
      padding-bottom: 18px
      width: 100%
      border-1px(rgba(7,17,27,.3))
      font-size: 0
      &:last-child
        border-none()
        margin-bottom:0
      .icon
        display: inline-block
        vertical-align:top        
      .content
        word-wrap: break-word
        padding-left: 10px
        top: 2px
        display: inline-block
        max-width:  50% 
        .name
          font-size: 14px
          color: rgb(7,17,27)
          line-height:14px
        .desc
          word-wrap: break-word
          word-break: keep-all

          padding-top: 8px
          font-size: 10px
          line-height: 10px
          color:rgb(147,153,159)
        .extra
          padding-top: 8px
          color:rgb(147,153,159)
          .mon
            font-size: 10px
          .good
            font-size: 9px
            padding-left: 12px
        .price
          .oldPrice
            font-size: 10px
            padding-top:4px
            padding-left: 8px
            text-decoration: line-through
            color: rgb(147,153,169)

          .nowprice
            font-size: 14px
            font-weight: 700
            line-height: 24px           
        .carcontrol-wrapper
          position: absolute
          right: 80px
          bottom: 12px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 400
    backdrop-filter: blur(10px)
.pipi-enter-active,.pipi-leave-active
  transition: .5s all
.pipi-enter ,.pipi-leave-to
  opacity: 0
.foodshow-enter-active,.foodshow-leave-active
  transition: .5s all
.foodshow-enter,.foodshow-leave-to
  transform: scale(0) 
  opacity: 0
.foodshow-enter-to,.foodshow-leave
  transform: scale(1)
  opacity: 1
  background: red
</style>