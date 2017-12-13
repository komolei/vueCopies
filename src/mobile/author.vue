<template>
  <div class="author">
     <header>
         作者
     </header>
     <section>
         <ul>
           <!-- {{new_user_info.githubUsername}}  -->
             <li><img :src="new_user_info.avatar_url">{{new_user_info.loginname}}</li>
             <li>积分：{{new_user_info.score}}</li>
         </ul>
         <!-- {{new_user_info}} -->
     </section>
     
     <!-- <div @click="logout">logout</div> -->
  </div>
</template>

<script>
import store from "../store/store_mobile";
import { mapState, mapGetters } from "vuex";
export default {
  name: "author",
  computed: {
    ...mapState(["is_visible"]),
    ...mapGetters(["new_user_info"])
  },
  methods: {
    newTopic: function() {
      console.log("new topic:");
      this.$router.push({ path: "/newTopic" });
    }
  },

};
</script>

<style lang="less" scoped>
.visible {
  display: none;
}
.author {
  border: 1px solid #f5f5f5;
  min-width: 220px;
  max-width: 290px;
  // position: absolute;
  // top: 90px;
  // right: 10px;
  border-radius: 10px;
  background: #fff;
  text-decoration: left;
  padding-left: 10px;

  header {
    padding: 5px 0;
  }
  section {
    img {
      width: 30px;
      height: 30px;
      border-radius: 5px;
    }
  }
  li {
    list-style: none;
  }
}
</style>

