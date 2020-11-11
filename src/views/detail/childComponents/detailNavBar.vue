<template >
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" :key = index
        class="title-item"
        :class = "{active: index === currentIndex}"
        @click = "titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>

  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar';
export default {
  name:'deatilNavBar',
  components:{
    NavBar
  },
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods: {
    titleClick(index){
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.go(-1)
    }
  },

}
</script>
<style scoped>
  .title{
    display: flex;

  }
  .title-item{
    font-size: 13px;
    flex: 1;
    /* padding-top: 10px; */
    
  }
  .active{
    color:var(--color-tint)
  }
  .back img{
    margin-top:12px ;
    margin-left: 10px;
  }
</style>