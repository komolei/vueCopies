<template>
  <div class="click">
  <p>{{ count }}</p>
  <p>{{ content }}</p>
  <p>{{ user.age }} {{ user.name}}</p>
  <p>{{ user }}</p>
  <p>getter: {{ moreThanArr }}</p>
  <p>sum: {{ sum }}</p>
  <p>
    <button @click="increment(142)">+</button>
    <button @click="decrement(decrement1)">-</button> 
    <!-- <button @click="decrement({type:decrement,accoumt:4444})">-</button> 这两种方式都可以-->
    <button @click="changeContent">changeContent</button>
    <button @click="getUser">getUser</button>
    <button @click="increment1">inc</button>
  </p>
</div>
</template>

<script>
import store from "../store/store1";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "click",
  data() {
    return {
      decrement1: {
        accoumt: 500
      }
    };
  },
  computed: {
    ...mapState(["content", "count", "user"]),
    ...mapGetters(["moreThanArr", "sum"])
    // content() {
    //   return store.state.content;
    // },
    // count() {
    //   return store.state.count;
    // },
    // user() {
    //   return store.state.user;
    // },
    // moreThanArr() {
    //   return store.getters.moreThanArr;
    // },
    // sum() {
    //   return store.getters.sum;
    // }
  },
  methods: {
    ...mapMutations(["increment", "decrement", "changeContent"]),
    // increment() {
    //   store.commit("increment", 1200);
    // },
    // decrement() {
    //   store.commit({ type: "decrement", accoumt: 100 });
    // },
    // changeContent() {
    //   store.commit("changeContent");
    // },
    getUser() {
      store.commit("get_user", { name: "xxx", age: 24 });
    },
    // ...mapActions({ inc: "increment" })
    ...mapActions(["increment1"])
  },
  // created() {
  //   this.decrement(this.decrement1);
  // }
};
</script>

<style>

</style>
