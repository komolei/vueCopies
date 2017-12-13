<template>
<div id="app">

  <v-container fluid class="pa-0" >
    <v-layout column wrop>
      <v-flex xs12>
        <v-bottom-nav center shift :value="true" :active.sync="e2" :color="computedColor" style="position:inherit">
          <v-btn dark @click="push('/')">
            <span>Home</span>
            <v-icon>fa-home</v-icon>
          </v-btn>
          <v-btn dark @click="getM" :class="{show:is_visible}">
            <v-badge left>
              <span slot="badge">
                   {{messages_count}} /
              </span>
              <span>Message</span>
            </v-badge>
            <v-icon>fa-commenting</v-icon>
          </v-btn>
          <v-btn @click="push('/userindex')">
            <span>User</span>
            <v-icon>fa-user</v-icon>
          </v-btn>
          <v-btn @click="logout()">
            <span :class="{show:!is_visible}">login</span>
            <span :class="{show:is_visible}">logout</span>
            <v-icon :class="{show:!is_visible}">fa-sign-in</v-icon>
            <v-icon :class="{show:is_visible}">fa-sign-out</v-icon>
          </v-btn>
        </v-bottom-nav>
      </v-flex>
    </v-layout>
  </v-container>
  <router-view/>
  <router-view name="go_top"></router-view>
</div>
</template>

<script>
import store from "./store/store_mobile";

import {
  mapState,
  mapGetters,
  mapActions
} from "vuex";

import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      count: 111,
      e2: 3,
      direction: "top",
      fab: false,
      fling: true,
      hover: false,
      tabs: null,
      top: false,
      right: false,
      bottom: false,
      left: true,
      transition: 'slide-y-reverse-transition'
    };
  },
  watch: {
    top(val) {
      this.bottom = !val
    },
    right(val) {
      this.left = !val
    },
    bottom(val) {
      this.top = !val
    },
    left(val) {
      this.right = !val
    }
  },
  computed: {
    ...mapState(["is_visible", "username"]),
    ...mapGetters(["messages_count", "new_user_info"]),
    computedColor() {
      switch (this.e2) {
        case 0:
          return "blue-grey";
          break;
        case 1:
          return "teal";
          break;
        case 2:
          return "brown";
          break;
        case 4:
          return "brown lighten-1";
          break;
        default:
          return "green darken-2";
      }
    },

  },
  methods: {
    ...mapActions(["getMessage"]),
    getM: function() {
      this.$router.push({
        path: "/message"
      });
      store.dispatch("getMessage");
    },
    logout: function() {
      console.log("dafda", store.state.accesstoken.length);
      if (store.state.accesstoken.length == 0) {
        this.$router.push({
          path: "/loginandon"
        });
      } else {
        this.$router.push({
          path: "/"
        });
        store.commit("changeAccesstoken", "");
        store.commit("changeState", true);
      }
    },
    push(str = "/") {
      if (str == "/userindex" && store.state.accesstoken.length == 0) {
        this.$router.push({
          path: "/loginandon"
        });
      } else if (str == "/userindex" && store.state.accesstoken.length != 0) {
        store.dispatch("getUser", store.state.username).then(() => {
          this.$router.push({
            path: "/userindex"
          });
        });
      } else {
        this.$router.push({
          path: str
        });
      }
    }
  }
}
</script>

<style lang="less" scoped>
.show {
  display: none;
}
 .progress-circular
    {
      margin: 1rem
    }
</style>
