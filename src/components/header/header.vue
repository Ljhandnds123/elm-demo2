<template>
   <div class="heade">
      <div class="content-wrapper">
          <div class="avatar">
              <img width="64" height="64" :src="seller.avatar">
          </div> 
          <div class= "content">
              <div class="title">
                   <span class="brand"></span>
                   <span class="name">{{seller.name}}</span>
              </div>
              <div class = "description">
              	{{seller.description}} / {{seller.deliveryTime}}分钟内送达
              </div>
              <div class= "support" v-if="seller.supports">
                <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                <span class="text">{{seller.supports[0].description}}</span>
              </div>
          </div>
          <div v-if="seller.supports" class="support-count" @click="shoeDetail">
            <span class="count">{{seller.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
          </div>
      </div>
      <div class="bulletin-wrapper" @click="shoeDetail">
          <span class = "bulletin-title"></span><span class = "bulletin-text">{{seller.bulletin}}</span>
          <i class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="background">
         <img :src="seller.avatar" width="100%" height="100%">
      </div>
      <transition
            enter-active-class="animated tada"
            leave-active-class="animated bounceOutRight"
    >
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
            <div class="detail-main">
              <h1 class="detail-name">{{seller.name}}</h1>
              <star :size="48" :score="seller.score" class="detail-star"></star>
              <div class="detail-br">
                <div class="line border-1px"></div>
                <div class="title">优惠信息</div>
                <div class="line border-1px"></div></div>
                 <ul v-if="seller.supports" class="supports">
                   <li v-for="item in seller.supports" class="item">
                   <span class="icon" :class="classMap[item.type]"></span><span class="text">{{item.description}}</span>
                   </li>
                  </ul>
                  <div class="detail-br-t">
                <div class="line border-1px"></div>
                <div class="title">商家公告</div>
                <div class="line border-1px"></div></div>
                <div class="bulletin-text">{{seller.bulletin}}</div>
            </div>
           
        </div>
        <div class="detail-close"  @click="noDetail"><i class="icon-close"></i></div>
 
      </div></transition>
   </div>
</template>

<script>
 import star from "../star/star.vue"
 import animate from 'animate.css'
export default {
   components:{
       star,
   },
   props:{
      seller:{
          }
   },
   data (){
      return {
         detailShow : false
      }
   },
   methods :{
    shoeDetail(){
      this.detailShow = true
    },
    noDetail(){
      this.detailShow = false
    }
   },
   created (){
    this.classMap = ["decrease","discount","special","invoice","guarantee"]
   }

}

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
 @import "../../common/stylus/mixin.styl"

  .heade
    overflow: hidden
    position: relative
    background: rgba(7,17,27,0.5)
    color: #fff
    .content-wrapper
      position: relative
      padding: 24px 16px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        img
          border-radius: 4px
      .content
        display: inline-block
        vertical-align: top
        font-size: 14px;
        margin 2px 0 8px 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat

          .name
            display: inline-block
            margin-left: 6px
            font-size: 16px 
            color: rgb(255,255,255)
            font-weight: bold
            line-height: 18px;
        .description
          margin: 0 0 10px 0
          color:rgb(255,255,255)
          font-weight: 200
          font-size: 12px
          line-height: 12px 
        .support
          .icon
            vertical-align: top
            display: inline-block
            height: 12px
            width: 12px
            background-size: 12px 12px
            background-repeat: no-repeat
            margin-right: 4px
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            display: inline-block
            vertical-align: top
            font-size: 10px
            color: rgb(255,255,255)
            font-weight: 200
            line-height: 12px
      .support-count
        position: absolute
        right: 12px
        bottom: 18px
    
        background: rgba(0,0,0,.2)
        height:20px
        line-height:20px
        padding: 5px 6px 5px 8px
        border-radius: 14px
        text-align: center
        .count
          font-size: 10px
        .icon-keyboard_arrow_right
          font-size:14px
          position: relative
          top: 3px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      padding: 0 42px 0 12px
      background: rgba(7,17,27,.2)
      .bulletin-title
        display: inline-block
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        margin-top: 7px
      .bulletin-text
        overflow: hidden
        text-overflow: ellipsis
        font-size: 10px
        display: inline-block
        vertical-align: top
        padding-left: 6px
      .icon-keyboard_arrow_right
        position: absolute
        font-size:10px
        right: 10px
        margin-left: 4px
        top:9px
    .background
      position: absolute
      top:0
      left:0
      width:100%
      height:100%
      z-index: -1
      filter: blur(10px)
    .detail
       position: fixed
       top: 0
       left: 0
       width: 100%
       height: 100%
       overflow: auto
       background: rgba(7,17,27,.8)
       backdrop-filter: blur(10px)
       z-index:999999
       .detail-wrapper
         min-height: 100%
         width: 100%
         .detail-main
           text-align:center
           margin-top: 64px
           padding-bottom: 64px
           .detail-name
              font-size: 16px
              font-weight: 700
              color: rgb(255,255,255)
              line-height: 16px
           .detail-star
              margin: 16px 0 28px 0
           .detail-br
             display: flex
             width: 80%
             margin 0 auto;
             .line
                position:relative
                top: -7px
                flex: 1
                border-bottom: 1px solid rgba(255,255,255,.2)
             .title
                padding:0 12px
                font-size: 14px
                font-weight: 700
           .supports
             width:80%
             text-align: left
             margin: 24px auto 0 auto
             li
               verlical-align: middle
               line-height: 24px
               .icon
                 display: inline-block
                 width:16px
                 height: 16px
                 vertical-align:middle
                 background-size: 16px 16px
                 margin-top: 12px
                 &:first-child
                   margin-top: 0
                 &.decrease
                   bg-image('decrease_2')
                 &.discount
                   bg-image('discount_2')
                 &.guarantee
                   bg-image('guarantee_2')
                 &.invoice
                   bg-image('invoice_2')
                 &.special
                   bg-image('special_2')
               .text
                 vertical-align:middle
                 margin-left:6px
                 font-size: 12px
                 font-weight: 200
                 color: rgb(255,255,255)
                 line-height: 12px
           .detail-br-t
             display: flex
             width: 80%
             margin 28px auto;
             .line
                position:relative
                top: -7px
                flex: 1
                border-bottom:  solid  1px rgba(255,255,255,.2)
             .title
                padding:0 12px
                font-size: 14px
                font-weight: 700
           .bulletin-text
             width:75%
             margin: 0 auto
             text-align: left
             font-size: 12px
             font-weight: 200
             color:rgb(255,255,255)
             line-height: 24px

       .detail-close
         position: relative
         width: 32px
         height: 32px
         margin: -64px auto 0 auto
         font-size: 32px
</style>