<template>
<div class="nav" width='100%'>
  <v-layout row wrap>
    <v-flex xs12 sm10 offset-sm1>
      <v-btn-toggle class="text-xs-center">
        <v-btn flat @click="getData(0,'')">
          全部
        </v-btn>
        <v-btn flat @click="getData(1,'good')">
          精华
        </v-btn>
        <v-btn flat @click="getData(2,'weex')">
          weex
        </v-btn>
        <v-btn flat @click="getData(3,'share')">
          share
        </v-btn>
        <v-btn flat @click="getData(4,'ask')">
          问答
        </v-btn>
        <v-btn flat @click="getData(5,'job')">
          招聘
        </v-btn>
      </v-btn-toggle>
    </v-flex>
  </v-layout>
  <v-layout column nowrap>



    <v-flex xs12>
      <v-list-tile v-for="(item,index) in items" :key="index" class="pt-3">
        <v-flex xs2 sm1 md1 offset-sm1>
          <router-link :to="{name:'userIndex',params:{newId:item.id,user:item.author.loginname}}">
            <v-list-tile-avatar>
              <img :src="item.author.avatar_url" />
            </v-list-tile-avatar>
          </router-link>
        </v-flex>
        <v-flex xs2 sm1 md1 caption>
          <v-list-tile-sub-title>{{item.reply_count}}/{{item.visit_count}}</v-list-tile-sub-title>
        </v-flex>
        <v-flex xs2 sm1 md1>
          <v-list-tile-sub-title class="px-2">{{save(item.top,item.good,item.tab)}}</v-list-tile-sub-title>
        </v-flex>
        <v-flex xs5 sm6 md6>
          <router-link :to="{name:'html',params:{id:index,newId:item.id,user:item.author.loginname}}" class="link1">
            <v-list-tile-sub-title>{{item.title}}</v-list-tile-sub-title>
          </router-link>
        </v-flex>
        <v-flex xs2 sm1 md1 text-xs-right>
          <v-list-tile-sub-title xs1>{{24-new Date(item.last_reply_at).getHours()}}小时前</v-list-tile-sub-title>
        </v-flex>
      </v-list-tile>
    </v-flex>
    <v-flex>
      <v-progress-circular indeterminate color="grey" :class="{show:arr_bottom}" style="left:50%"></v-progress-circular>
    </v-flex>
  </v-layout>
</div>
</template>
<script>
import store from "../store/store_mobile";
import axios from "axios";
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from "vuex";
export default {
  name: "nav",
  data() {
    return {
      items: [],
      isTrue: false,
      active: null,
      index: 20,
      arr_bottom: false
    };
  },
  computed: {
    ...mapState(["data"])
  },
  methods: {
    lazy_load: function() {
      let bottomParams =
        document.body.offsetHeight -
        document.documentElement.clientHeight -
        100;
      console.log("params", bottomParams);
      if (window.scrollY >= bottomParams) {
        this.getPager(this.index);
        this.index = this.index + 10;
      }
    },
    getPager(index) {
      console.log("click");
      let str = `${store.state.tab}&limit=${index}`;
      // let str = `${store.state.tab}&page=${index}`;
      store
        .dispatch("getData", str)
        .then(
          r =>
          r.state == 0 ? (this.arr_bottom = true) : (this.arr_bottom = false)
        );
    },
    save: function(top, good, text) {
      if (top) return "置顶";
      if (good) return "精华";
      text = text.trim();
      switch (text) {
        case "good":
          return "精华";
          break;
        case "job":
          return "招聘";
          break;
        case "ask":
          return "问答";
          break;
        case "share":
          return "分享";
          break;
        default:
          return text;
          break;
      }
    },
    changeColor: function() {
      this.isTrue = true;
    },
    getData: function(index = 0, str = "") {
      store.dispatch("getData", str);
      this.items = store.state.data;
      store.commit("changeTab", str);
    }
  },
  mounted() {
    this.getData();
    // this.lazy_load();
  },

  beforeUpdate() {
    window.onscroll = this.lazy_load;
    //驱动数据去更新视图
    this.items = store.state.data;
  }
};
</script>

<style>
a {
  text-decoration: none ;
  color:gray;
 
}
a:link{
  color:blueviolet;
}
</style>

