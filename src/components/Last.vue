<template>
  <div>
      <h3>There is nothing .</h3>
      <h4>{{msg}}</h4>
  </div>
</template>

<script>
export default {
  name: "last",
  data() {
    return {
      msg: "last time to see"
    };
  }
};
</script>

<style>
h3 {
  color: red;
}
</style>
