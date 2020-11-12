<template >
  <div class = "cart-list">
    <scroll class="content" ref="scroll">
        <cart-list-item v-for="(item,index) in cartList " :key="index" :product= "item"></cart-list-item>
        
    </scroll>
  
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import Scroll from 'components/common/scroll/scroll'
import CartListItem from './cartListitem'
export default {
  name:'CartList',
  components:{
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters({
      cartList:'cartList'
    })
  },
  activated() {
    this.$refs.scroll.refresh()
  },
}
</script>
<style scoped>
.cart-list{
  height: 82%;
}
  .content{
   overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    height: calc(100%);
    overflow: hidden;
  }
</style>