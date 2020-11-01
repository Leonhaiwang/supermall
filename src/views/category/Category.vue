<template>
<div>
    <div class="wrapper" ref="aaa">

   
    <ul class="content">
     <li>lo1</li>
     <li>lo2</li>
     <li>lo3</li>
     <li>lo4</li>
     <li>lo5</li>
     <li>lo6</li>
     <li>lo7</li>
     <li>lo8</li>
     <li>lo9</li>
     <li>lo10</li>
     <li>lo11</li>
     <li>lo12</li>
     <li>lo13</li>
     <li>lo14</li>
     <li>lo15</li>
     <li>lo16</li>
     <li>lo17</li>
     <li>lo18</li>
     <li>lo19</li>
     <li>lo20</li>
     <li>lo21</li>
     <li>lo22</li>
     <li>lo23</li>
     <li>lo24</li>
     <li>lo25</li>
     <li>lo26</li>
     <li>lo27</li>
     <li>lo28</li>
     <li>lo29</li>
     <li>lo30</li>
     <li>lo31</li>
     <li>lo32</li>
     <li>lo33</li>
     <li>lo34</li>
     <li>lo35</li>
     <li>lo36</li>
     <li>lo37</li>
     <li>lo38</li>
     <li>lo39</li>
     <li>lo40</li>
     <li>lo41</li>
     <li>lo42</li>
     <li>lo43</li>
     <li>lo44</li>
     <li>lo45</li>
     <li>lo46</li>
     <li>lo47</li>
     <li>lo48</li>
     <li>lo49</li>
     <li>lo50</li>
     <li>lo51</li>
     <li>lo52</li>
     <li>lo53</li>
     <li>lo54</li>
     <li>lo55</li>
     <li>lo56</li>
     <li>lo57</li>
     <li>lo58</li>
     <li>lo59</li>
     <li>lo60</li>
     <li>lo61</li>
     <li>lo62</li>
     <li>lo63</li>
     <li>lo64</li>
     <li>lo65</li>
     <li>lo66</li>
     <li>lo67</li>
     <li>lo68</li>
     <li>lo69</li>
     <li>lo70</li>
     <li>lo71</li>
     <li>lo72</li>
     <li>lo73</li>
     <li>lo74</li>
     <li>lo75</li>
     <li>lo76</li>
     <li>lo77</li>
     <li>lo78</li>
     <li>lo79</li>
     <li>lo80</li>
     <li>lo81</li>
     <li>lo82</li>
     <li>lo83</li>
     <li>lo84</li>
     <li>lo85</li>
     <li>lo86</li>
     <li>lo87</li>
     <li>lo88</li>
     <li>lo89</li>
     <li>lo90</li>
     <li>lo91</li>
     <li>lo92</li>
     <li>lo93</li>
     <li>lo94</li>
     <li>lo95</li>
     <li>lo96</li>
     <li>lo97</li>
     <li>lo98</li>
     <li>lo99</li>
     <li>lo100</li>
      
    </ul>
 </div>
</div>

</template>

<script>
import BScroll from 'better-scroll'

  export default {
    name: "Category",
    data() {
      return {
        scroll:null
      }
    },
    mounted() {
      // probeType侦测  0,1d都是不侦测 2在手指滚动的过程中侦测，手指离开后的惯性不侦测 3：只要是滚动都侦测
      this.scroll = new BScroll('.wrapper',{
        probeType:3,
        pullUpLoad:true
      })
      //监听位置的改变
      this.scroll.on('scroll',(position)=>{
        console.log(position)
      })
      //上拉加载更多
      this.scroll.on('pullingUp',()=>{
        
      })
    },
  }
</script>

<style scoped>
  .wrapper{
    background-color: blue;
    height: 150px;
     overflow: hidden;
    /* overflow-y: scroll; */
  }
</style>
