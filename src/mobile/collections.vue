<template>
 <div class="collections">
     <!-- <slot>
         there is nothing!
     </slot> -->
    <Nav1/>
    <CollectionsRight/>
 </div>
</template>

<script>
// import Gotop from "./go_top.vue";
import Nav1 from "./nav";
import CollectionsRight from './collections_right';
export default {
  name: "collections",
  components: {
    Nav1,
    // CollectionsRight
  }
};
</script>

<style lang="less" scoped>
// .collections {
//   display: flex;
//   flex-flow: row nowrap;
//   padding-top:40px;
//   justify-content: space-around;
// }
</style>

