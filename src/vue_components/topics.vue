<template>
  <div class="topics">
      <h3>作者其他话题</h3>
      <!-- {{new_user_info}} -->
      <ul class="ct">
          <li v-for="(list,index) in new_user_info.recent_topics" :key="index">
                <span @click="toTopic(list.id)">{{list.title}}</span>
          </li>
      </ul>
  </div>
</template>

<script>
import store from "../store/store";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "topics",
  computed: {
    ...mapGetters(["new_user_info"])
  },
  methods: {
    toTopic: function(id) {
      console.log("you are clicking");
      store.dispatch("getTopic", id); //发送topic的id去获取新的信息，然后渲染
      // store.dispatch("getUser", id);
    }
  }
};
</script>

<style lang="less" scoped>
.topics {
  border: 1px solid #f5f5f5;
  min-width: 220px;
  max-width: 290px;
  //   position: absolute;
  //   top: 190px;
  //   right: 10px;
  border-radius: 10px;
  background: #fff;
  text-decoration: left;
  margin-top: 20px;
  padding-left: 10px;
  li {
    list-style: none;
    cursor: pointer;
  }
}
</style>

