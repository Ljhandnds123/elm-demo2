<template>
   <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" ></span>

  </div>

</template>


<script>

const LENGTH =5;
const ON ="on" ;
const HALF = "half" ;
const OFF = "off" ;

export default {
  props :{
    size: {
       type: Number
    },
    score:{
       type: Number
    }
  },
  computed : {
    starType (){
      return "star-" + this.size;
    },
    itemClasses (){
       let result = [];
       let num_dob = Math.floor(this.score*2)/2;
       let num_int = Math.floor(this.score);
       let is_dob = (num_dob%1 !==0);
       for( let i =0 ; i<num_int ;i++){
           result.push(ON);
       }
       if( is_dob){
       	 result.push(HALF);
       }
       while(LENGTH>result.length){
       	result.push(OFF);
       }
       return result;
    }
  }
 
}


</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
.star
   font-size: 0
   .star-item
     display: inline-block
   &.star-48
     .star-item
       width: 20px
       height: 20px
       background-size: 20px 20px
       margin-right: 22px
       &:last-child
         margin-right: 0
       &.on
         bg-image('star48_on')
       &.half
         bg-image('star48_half')
       &.off
         bg-image('star48_off')
    &.star-36
       .star-item
         width: 15px
         height: 15px
         background-size: 15px 15px
         margin-right: 6px
         &:last-child
           margin-right: 0
         &.on
           bg-image('star36_on')
         &.half
           bg-image('star36_half')
         &.off
           bg-image('star36_off')
    &.star-24
       .star-item
         width: 10px
         height: 10px
         background-size: 10px 10px
         margin-right: 3px
         &:last-child
           margin-right: 0
         &.on
           bg-image('star24_on')
         &.half
           bg-image('star24_half')
         &.off
           bg-image('star24_off')
  
</style>