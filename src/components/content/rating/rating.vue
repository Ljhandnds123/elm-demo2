<template>
	<div class="rating">
	 <div class="rating-type border-1px">
        <span @click="activeType(2,$event)" class="block all" :class="{active:ratingType.nowType===2}">{{desc.all}}<span class="count">{{positives.length + negatives.length}}</span></span>
        <span @click="activeType(0,$event)" class="block positive" :class="{active:ratingType.nowType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
        <span @click="activeType(1,$event)" class="block negative" :class="{active:ratingType.nowType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
	 </div>
	 <div @click="toggleContent" class="swith" >
	 	<span  :class="{active: onlyContent.nowType}"  class="icon-check_circle"></span>
	 	<span class="text">只看有内容的评论</span>
	 </div>
	</div>
</template>
<script>
    const ALL = 2;
    const POSITIVE = 0;
    const NEGATIVE =1;
	export default{
     props: {
       ratings :{
       	type :Array,
       	default (){
           return [];
       	}
       },
       ratingType:{
       	 type: Object,
       	 default () {
       	 	return {
       	 		nowType : ALL
       	 	}
       	 } 
       },
       onlyContent: {
       	 type: Object,
       	 default(){
       	 	return {
       	 		nowType: false
       	 	}
       	 } 
       },
       desc:{
       	type: Object,
       	default() {
            return {
            	all: '全部',
            	positive: '满意',
            	negative: '不满意'
            }
       	}
       }
     },
     computed:{
       positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives(){
      	 return this.ratings.filter((rating)=>{
      	 	return rating.rateType ===NEGATIVE;
      	 });
      }
     },
     methods:{
     	activeType(type,event){
     		if(!event._constructed){
     			return
     		}
     		this.ratingType.nowType = type;
     	},
     	toggleContent(event){
            if (!event._constructed) {
            	return
            }
            this.onlyContent.nowType =!this.onlyContent.nowType;
     	}
     },
	}
</script>
<style lang="stylus"  rel="stylesheet/stylus" scoped>
@import "../../../common/stylus/mixin.styl"
.rating
  box-sizing: border-box
  .rating-type
    font-size: 0
    line-height: 16px
    padding-bottom: 18px
    border-bottom: 1px solid rgba(7,17,27,.1)
    .block
      display: inline-block
      padding: 8px 12px
      font-size: 12px
      color: rgb(77,85,93)
      &.active
        color: #fff
      .count
        font-size: 8px   
        margin-left: 2px
      &.all
       background: rgba(0,160,220,.6)
       &.active
         background:  rgb(0,160,220)  
      &.positive
       background: rgba(0,160,220,0.2)     
       margin: 0 8px   
       &.active
         background:  rgb(0,160,220,.8)  
      &.negative
       background: rgba(77,85,93,0.2)
       &.active
         background: rgb(77,85,93)
      

  .swith
    font-size:0
    margin: 12px 0 0 0
    color: rgb(147,153,159)   
    .icon-check_circle
      display:inline-block
      font-size: 24px
      line-height: 24px
      vertical-align: top
      &.active
        color: #00c850
    .text
      display:inline-block
      font-size: 12px
      margin-left: 4px
      line-height: 24px
      padding-top:1px

    
</style>