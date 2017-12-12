<template>
  <div class='publish' :class="{visible:is_visible}" @click="newTopic">发布主题</div>
</template>

<script>
import store from "../store/store";
import { mapState } from "vuex";
export default {
  name: "publish",
  computed: {
    ...mapState(["is_visible"])
  },
  methods: {
    newTopic: function() {
      console.log("new topic:");
      this.$router.push({ path: "/newTopic" });
    }
  }
};
</script>

<style>
.visible {
  display: none;
}
.publish {
  background: #fff;
  padding: 10px 0;
  margin-top: 20px;
  border-radius: 10px;
}
</style>
