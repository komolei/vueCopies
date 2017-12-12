<template >
  <div v-if="false" class="hello">
    <h1>{{ msg }}</h1>
  </div>
  <div v-else class="hello">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
import bus from "./bus";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App !"
    };
  },
  beforeCreate() {},
  created() {
    // bus.$on("toast", function(id) {
    //   console.log("fda;", id);
    // });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
</style>
