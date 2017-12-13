<template>
  <div class="pager">
      <ul class="pagerBox">
          <li @click="before"><i class="fa fa-angle-left fa-fw"></i></li>
          <li v-for="(item,index) in items" :key="index" @click="getData(item)">{{ item }}</li> 
          <li ><i class="fa fa-ellipsis-h fa-fw"></i></li>
          <li @click="after"><i class="fa fa-angle-right fa-fw"></i></li>
      </ul>
  </div>
</template>

<script>
import store from "../store/store_mobile";
export default {
  name: "pager",
  data() {
    return {
      items: [1, 2, 3]
    };
  },
  computed: {
    AnItems: function() {
      return "ss";
    }
  },
  methods: {
    before: function() {
      if (this.items[0] <= 1) return;
      this.items = this.items.map(item => item - 1);
      this.getData(this.items[0]);
    },
    after: function() {
      this.items = this.items.map(item => item + 1);
      this.getData(this.items[2]);
    },
    getData: function(index) {
      console.log("click");
      let str = `${store.state.tab}&page=${index}`;
      store.dispatch("getData", str);
    }
  }
};
</script>
<style lang="less" scoped>
.pager {
  .pagerBox {
    display: flex;
    flex-flow: row nowrap;
    background-color: #fff;
    padding: 5px 15px;
    li {
      list-style: none;
      padding: 5px;
      border: 1px solid #ccc;
      //   background: #d4d4d4;
      border-radius: 2px;
      cursor: pointer;
      margin: 0 2px;
    }
  }
}
</style>

