<template>
  <nav class="nav">
      <ul class="nav_bar">
         <li><span @click="getData(0,'')" class="changeCol">全部</span></li>
         <li><span @click="getData(1,'good')" >精华</span></li>
         <li><span @click="getData(2,'weex')" >weex</span></li>
         <li><span @click="getData(3,'share')">share</span></li>
         <li><span @click="getData(4,'ask')" >问答</span></li>
         <li><span @click="getData(5,'job')" >招聘</span></li>
      </ul> 
      <div class="ct">
         <transition name="ct" enter-active-class="animated fadeIn">
          <ul class="content">
              <li v-for="(item,index) in items" :key="index">
                <!-- error 应该导航到用户主页 -->
                <router-link :to="{name:'userIndex',params:{newId:item.id,user:item.author.loginname}}" class="link">

                <!-- <a :href="'https://www.vue-js.com/api/v1/user/'+item.author.loginname" class="link"> -->
                  <img :src="item.author.avatar_url" />
                <!-- </a> -->
                </router-link>
                <span class="reply">{{item.reply_count}}</span><span class="reply1">/{{item.visit_count}}</span>
                <span class="icon">{{tab(item.top,item.good,item.tab)}}</span>
                <!-- {{item.id}}:href="'https://www.vue-js.com/api/v1/topic/'+item.id" -->
                <router-link :to="{name:'html',params:{id:index,newId:item.id,user:item.author.loginname}}" class="link1"><span>{{item.title}}</span></router-link>
                <span class="time">{{24-new Date(item.last_reply_at).getHours()}}小时前</span>
              </li>
          </ul>
         </transition>
      </div>
      <Pager/>
      <router-view/>
      <router-view name="a"></router-view>
  </nav>
 
</template>

<script>
import Pager from "./pager";
import store from "../store/store";
import axios from "axios";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "nav",
  components: {
    Pager
  },
  data() {
    return {
      items: [],
      isTrue: false
    };
  },
  computed: {
    ...mapState(["data"])
  },
  methods: {
    tab: function(top, good, text) {
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
    // ...mapMutations(["changeTab"]),
    // ...mapActions(["getData"]),
    changeColor: function() {
      this.isTrue = true;
    },
    getData: function(index = 0, str = "") {
      console.log("this str:", str);
      // store.dispatch("getData", str).then(r => (this.items = r.data.data));
      //change Vuex save data
      store.dispatch("getData", str);
      this.items = store.state.data;
      store.commit("changeTab", str);
      console.log("this children:", this.$el.children[0].children);

      //change click el's color
      Array.from(this.$el.children[0].children).filter(
        item =>
          item.children[0].classList.contains("changeCol")
            ? item.children[0].classList.remove("changeCol")
            : "xx"
      );
      this.$el.children[0].children[index].children[0].classList.add(
        "changeCol"
      );
    }
  },
  mounted() {
    this.getData();
  },

  beforeUpdate() {
    //驱动数据去更新视图
    this.items = store.state.data;
  }
};
</script>

<style lang="less" scoped>
.changeCol {
  color: #fff;
  background-color: #369219;
}
a {
  text-decoration: none;
}
ul {
  margin: 0;
}
li {
  list-style: none;
}

.nav {
  display: flex;
  flex-flow: column nowrap;
  // justify-content: space-around;
  // padding: 40px;
  min-width: 650px;
  max-width: 945px;
  // flex-grow: 1;
  .nav_bar {
    display: flex;
    flex-direction: column;
    flex-flow: nowrap;
    justify-content: flex-start;
    background-color: #ededed;
    border-radius: 4px;
    color: #369219;

    // padding:10px 15px;
    li {
      list-style: none;
      // &:first-of-type > span {
      //   width: 36px;
      //   height: 25px;
      //   line-height: 25px;
      //   padding: 3px 4px;
      //   border-radius: 4px;
      //   color: #fff;
      //   background-color: #369219;
      // }
      span {
        display: inline-block;
        width: 36px;
        height: 25px;
        line-height: 25px;
        margin: 5px;
        padding: 3px 4px;
        border-radius: 4px;
        cursor: pointer;
        // &:hover {
        //   color: #fff;
        //   background-color: #369219;
        // }
      }
    }
  }
  .ct {
    .content {
      li {
        display: flex;
        padding: 10px 15px;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f5f5f5;
        background: #fff;
        &:hover {
          background: #f5f5f5;
        }
        span {
          color: #222;
        }
        .link {
          align-self: flex-end;
          img {
            width: 30px;
            height: 30px;
          }
        }
        .link1 {
          flex-grow: 10;
          text-align: left;
          padding-left: 5px;
          color: #222;
          font-weight: normal;
          font-size: 16px;
        }
        .reply {
          width: 30px;
          padding: 0 0 0 5px;
          font-size: 14px;
          // align-self: flex-start;
          text-align: right;
          color: #9e78c0;
        }
        .reply1 {
          width: 30px;
          padding-right: 10px;
          font-size: 10px;
          color: #ccc;
          text-align: left;
        }
        .icon {
          background-color: #369219;
          color: #fff;
          border-radius: 4px;
          padding: 3px;
          font-size: 10px;
        }
        .time {
          font-size: 10px;
        }
      }
    }
  }
}
</style>

