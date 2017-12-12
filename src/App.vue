<template>
  <div id="app">
  <div class="app_nav_ct">
       <ul class="app_nav_bar_left">
          <router-link to="/"><li><img src="./assets/logo.png"/></li></router-link>
          <li class="searchBox"><i class="fa fa-search fa-fw"></i><input type="text" name="" id="search" placeholder="searchs"></li>
      </ul> 
          <ul class="app_nav_bar_right">
          <router-link to="/"><li>首页</li></router-link>
          <router-link to="/message" :class="{show:is_visible}" >
            <li @click="getM">未读消息 / {{ messages_count }}</li>
          </router-link>
          <a href="http://doc.vue-js.com/"><li>VUE2.0</li></a>
          <router-link to="/">
           <li @click="logout" :class="{show:is_visible}">Log Out</li>
          </router-link>
      </ul> 
  </div>
    <!-- <router-link to="/">index</router-link>
    <router-link to="/todo">todo</router-link>
    <router-link to="/index/todo">index2</router-link> -->
    <router-view/>
    <!-- <router-view name="collections"></router-view> -->
    <router-view name="go_top"></router-view>
    <!-- <router-view name="author"></router-view> -->
    <router-view name="topics"></router-view>
    <router-view name="theme"></router-view>
    <!-- <router-view name="author"></router-view> -->
    <!-- <router-view name="lon_in"></router-view> -->
    <!-- <router-view name="b"></router-view>
    <router-view name="c"></router-view> -->
  </div>
</template>

<script>
import store from "./store/store";
import { mapState, mapGetters, mapActions } from "vuex";

import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      count: 111
    };
  },
  computed: {
    ...mapState(["is_visible"]),
    ...mapGetters(["messages_count", "new_user_info"])
  },
  methods: {
    ...mapActions(["getMessage"]),
    getM: function() {
      store.dispatch("getMessage");
    },
    logout: function() {
      // this.$router.push({ path: "/" });
      store.commit("changeAccesstoken", "");
      store.commit("changeState", true);
    }
  }
};
</script>

<style lang="less" scoped>
.show {
  // visibility: hidden;
  display: none;
}
#app {
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  text-align: center;
  color: #2c3e50;
  background-color: #e1e1e1;
  display: flex;
  flex-flow: column nowrap;
  // justify-content: center;
}
* {
  margin: 0;
  padding: 0;
}
.app_nav_ct {
  display: flex;
  background-color: #1c6132;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-around;
  align-items: center;
  .app_nav_bar_left {
    display: flex;
    justify-content: center;
    // flex-direction: row;
    // flex-wrap: nowrap;
    flex-flow: row, nowrap;
    align-items: center;

    flex-grow: 1;
    text-decoration: none;

    padding: 4px;
    li {
      list-style: none;
    }
    a {
      display: flex;
      text-decoration: none;
      color: #fff;
      li {
        list-style: none;
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
  .app_nav_bar_right {
    display: flex;
    // flex-direction: row;
    flex-flow: row, nowrap;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    li {
      list-style: none;
      // flex-shrink: 0.5;
      padding: 0 10px;
      flex-grow: 1;
    }
    a {
      text-decoration: none;
      color: #f1f1f1;
      &:hover {
        color: #fff;
      }
      li {
        list-style: none;
        img {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}

.searchBox {
  background-color: #4f9639;
  border-radius: 20px;
  transition: all 1s ease;
  &:hover,
  &:hover > input {
    background-color: #fff;
  }
  input {
    background-color: #4f9639;
    outline: none;
    border: none;
    border-radius: 10px;
    margin: 5px 0;
    font-size: 14px;
    transition: all 1s ease;
  }
}
</style>
