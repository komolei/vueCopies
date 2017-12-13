<template>
   <div class="theme">
      <ul class="themeBox">
          <li>没有人回复的话题</li>
          <!-- " -->
          <li v-for="(item,index) in items" :key="index" @click="toTopic(item)">{{item.title}}</li>
      </ul>
  </div>
</template>

<script>
import store from "../store/store_mobile";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "theme",
  data() {
    return {
      items: []
    };
  },
  methods: {
    toTopic: function(user) {
      console.log("id:", user);
      this.$router.push({ path: "/html" });
      store.dispatch("getTopic", user.id);
      store.dispatch("getUser", user.author.loginname);
    }
  },
  created() {
    let url = `https://www.vue-js.com/api/v1/topics`;
    axios.get(url).then(r => {
      this.items = r.data.data.filter(item => item.reply_count === 0);
    });
  }
};
</script>
<style lang="less" scoped>
li {
  list-style: none;
  cursor: pointer;
}
a {
  text-decoration: none;
  color: #222;
}
// a:active {
//   color: #222;
// }
// a:visited {
//   color: #ccc;
// }
.theme {
  min-width: 220px;
  max-width: 290px;
  background-color: #fff;
  margin-top: 20px;
  border-radius: 10px;
  .themeBox {
    display: flex;
    flex-flow: column nowrap;
    text-align: left;
    li {
      padding: 6px;
      word-wrap: none;
      white-space: nowrap;
      overflow: hidden;
      word-break: break-all;
      text-overflow: ellipsis;
    }
  }
}

</style>

