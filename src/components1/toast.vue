<template>
  <div class="toast" :class="{visible:is_visible}" enter-active-class="animated fadeIn" enter-to-class="animated fadeOut">
      <!-- <span>{{message}}</span> -->
      <span>{{content}}</span>
      <!-- {{elDestroy}} -->
  </div>
</template>

<script>
import { bus } from "./bus";
export default {
  name: "Toast",
  // props: ["message", "is_visible"],
  //   props: ["callbackMsg"],
  data() {
    return {
      is_visible: true,
      content: ""
    };
  },
  computed: {
    elDestroy: function() {
      setTimeout(() => {
        console.log("i am computed");
        this.is_visible = true;
      }, 1000);
    }
  },
  beforeMount() {
    bus.$on(
      "toast",
      text => ((this.content = text), (this.is_visible = false))
    );
    bus.$on("toast_hidden", boo => (this.is_visible = boo));
  },
  updated() {
    // setTimeout(
    //   function() {
    //     console.log("this is name", this.name, this.is_visible);
    //     this.is_visible = true;
    //     console.log("this is name", this.name, this.is_visible);
    //   }.call(this, this.is_visible),
    //   1500
    // );
  },
  methods: {}
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
