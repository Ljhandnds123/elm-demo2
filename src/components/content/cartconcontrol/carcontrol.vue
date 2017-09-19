 <template>
   <div class="carcontrol">
      <transition name="gun">
          <div class="icon-remove_circle_outline" v-show="food.count >0" @click="substract"></div>
      </transition>
      <transition name="lue">
          <div class="count" v-show="food.count > 0">{{food.count}}</div>
      </transition>
      <div class="icon-add_circle" @click="addCart"></div>
   </div>
 </template>

<script>
import Vue from "vue"
	export default{
      props :{
         food:{
             type : Object,
         },
      },
      methods: {
         addCart(event) { 
         	if(!event._constructed){
         		return;
         	}
            if(!this.food.count){
            	Vue.set(this.food,'count',1);
            }else{
            	this.food.count++
            }
         },
         substract(){
         	if(!event._constructed){
         		return;
         	}
         	if(this.food.count>0){
                 this.food.count--;
         	}
         }
      },      
	}

</script>
<style lang="stylus"  rel="stylesheet/stylus">
	.carcontrol
	  font-size:0
	  .icon-remove_circle_outline
	    display: inline-block
	    padding: 6px
	    line-height: 24px
	    font-size: 24px
	    vertical-align: top

	  .gun-leave-active,.gun-enter-active
	      transition: .3s all
	  .gun-leave-to,.gun-enter
	      transform: translateX(20px) rotate(360deg)
	      opacity: 0
	  

	  .count
	    display: inline-block
	    font-size: 12px
	    width: 15px
	    vertical-align: middle
	    margin-top: -15px
	    
	    text-align:center
	    color: rgb(147,153,159)
	  .lue-leave-active
	    transition: 0s all
	  .lue-enter-active
	    transition: 1s all
	  .lue-enter,.lue-leave
	    opacity: 0


	  .icon-add_circle 
	    display: inline-block
	    padding: 6px
	    line-height: 24px
	    font-size: 24px
	    color:  rgb(0,160,220)
</style>
