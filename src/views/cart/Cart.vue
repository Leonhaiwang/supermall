<template>
    <div class="Cart">
      <nav-bar class="Navbar">
        <div slot="center">购物车({{length}})</div>
      </nav-bar>

      <cart-list></cart-list>

      <cart-total></cart-total>
    </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import CartList from './childComps/cartList'
import CartTotal from './childComps/CartTotal'
import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartTotal
    },
    data() {
      return {
        
      }
    },
    computed: {
      // ...mapGetters([
      //   'cartLength'
      // ])
      ...mapGetters({
        length:'cartLength'
      })
    },
  }
</script>

<style scoped>
  .Cart{
    height:100vh;
  }
  .Navbar{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 200;
  }
</style>
