<template>
  <div class="click">
  <p>{{ count }}</p>
  <p>{{ content }}</p>
  <p>{{ user.age }}</p>
  <p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="changeContent">changeContent</button>
    <button @click="getUser">getUser</button>
  </p>
</div>
</template>

<script>
import store from "../store/store1";
export default {
  name: "click",
  data() {
    return {};
  },
  computed: {
    content() {
      return store.state.content;
    },
    count() {
      return store.state.count;
    },
    user() {
      return store.state.user;
    }
  },
  methods: {
    increment() {
      store.commit("increment", 200);
    },
    decrement() {
      store.commit({ type: "decrement", accoumt: 100 });
    },
    changeContent() {
      store.commit("changeContent");
    },
    getUser() {
      store.commit("get_user", { name: "xxx", age: 24 });
    }
  }
};
</script>

<style>

</style>
