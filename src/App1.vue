<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to="/">index</router-link>
    <router-link to="/again">to /again</router-link>
    <!-- <router-link to="/last">to /last</router-link> -->
    <router-link to="/LogInAndOn">/log</router-link>
    <router-link to="/last">/last</router-link>
    <!-- <router-link to="/LogInAndOn/last">/log/last</router-link> -->
    <!-- <div>{{ $route.params.id }}</div> -->
    <!-- <router-link to="/LogInAndOn/todo">/log/todo</router-link> -->
    <!-- <router-link to="/todo">/todo</router-link> -->
    <!-- <router-link :to="{ name:again }">again</router-link>
    <router-link :to="{ name:last }">last</router-link> 还要引入组件 -->
    <!-- <router-link to="/click">/click</router-link>
    <router-link to="/click2">/click2</router-link> -->
    <router-link to="/toast">/toast</router-link> 
    <router-view/>
    <router-view name="a"></router-view>
    <router-view name="b"></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
