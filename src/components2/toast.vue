<template>
  <div class="toast" :class="{visible:is_visible}"  enter-active-class="animated fadeIn" enter-to-class="animated fadeOut">
      <!-- <span>{{message}}</span> -->
      <span>{{ content }}</span>
      <span>{{ text }}</span>
      <!-- {{elDestroy}} -->
  </div>
</template>

<script>
import { bus } from "./bus";
import store from "../store/store";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Toast",
  // props: ["message", "is_visible"],
  //   props: ["callbackMsg"],
  data() {
    return {
      // is_visible: false
      // content: ""
    };
  },
  computed: {
    ...mapState(["content", "is_visible"]),
    ...mapGetters(["text"])
  },
  methods: {
    ...mapActions(["changeState"])
  },
  mounted() {
    // setTimeout(() => {
    // store.dispatch("changeState");
    // }, 1000);
  },
  updated() {
    // setTimeout(() => {
    //   store.state.is_visible = true;
    // }, 1000);
    console.log("updated:", store.state.is_visible);
  }
};
</script>

<style lang="less" scoped>
@keyframes an {
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.visible {
  visibility: hidden;
}
.toast {
  position: fixed;
  padding: 5px;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -100%);
  border: 1px solid #ccc;
  box-shadow: 5px 5px 8px 2px #ccc;
  border-radius: 5px;
  line-height: 24px;
  text-align: center;
  animation: 1s an ease-in;
  span {
    padding: 5px;
  }
  &:hover {
    animation-play-state: paused;
  }
}
</style>
