<template>
  <div id="app">

   <heade :seller="seller"></heade>
   <div class='tab'>
      <div class="tab-item" >
         <router-link to="/goods" >商品</router-link>
      </div>
      <div class='tab-item'>
         <router-link to="/ratings">评论</router-link>
      </div>
      <div class='tab-item'>
         <router-link to="/seller" >商家</router-link>
      </div>
   </div>     
    <router-view :seller="seller"></router-view>

  </div>
</template>

<script>
import header from'./components/header/header.vue'; 
import content from'./components/content/content.vue';

const ERR_OK = 0;

export default {
  name: 'app',
  data (){
     return{
        seller:''
     }
  },
  created (){

     this.$http.get('/api/seller').then((res) => {
        var response = res.body;
        if(response.errno ===ERR_OK){
          this.seller = response.data;
        }
     })
  },
  components:{
    heade : header,
    contente : content,
      }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import "./common/stylus/mixin.styl"



  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, .1))
   .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>


 
  