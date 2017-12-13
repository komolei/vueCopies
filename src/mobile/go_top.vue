<template>
<transition  enter-active-class="animated zoomIn" :duration="{enter:2000}" leave-active-class="animated flipOutY">
  <div class="go_top" :class="{show:is_show}">
      <span>
          回到顶部
      </span>
  </div>
</transition>
</template>

<script>
export default {
  name: "go_top",
  data() {
    return {
      is_show: true
    };
  },
  methods: {
    fix: function() {
      if (window.scrollY > 500) {
        this.is_show = false;
        // console.log("this is ", this);
        this.$el.addEventListener("click", () => window.scrollTo(0, 0));
      } else {
        this.is_show = true;
      }
    }
  },
  mounted() {
    this.fix();
    window.onscroll = this.fix;
  }
};
</script>

<style lang="less" scoped>
.show {
  //   visibility: hidden;
  display: none;
}
.go_top {
  position: fixed;
  right: 10px;
  width: 25px;
  top: 60%;
  padding: 4px;
  //   transform: translateY(-150%);
  font-size: 15px;
  //   border: 1px solid #cccccc;
  //   box-shadow: 2px 2px 10px 8px #ffffff;
  //   border-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background: #ffffff;
  cursor: pointer;
}
</style>

