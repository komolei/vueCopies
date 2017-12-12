<template>
  <div class="userIndex">
    <div class="left">
          <header>
        <ul>
           <!-- {{new_user_info.githubUsername}}  -->
             <li>主页</li>
             <li><img :src="new_user_info.avatar_url">{{new_user_info.loginname}}</li>
             <li>积分：{{new_user_info.score}}</li>
             <li>{{new_user_info.collect_topics.length}}话题收藏</li>
             <li>注册时间{{new Date(new_user_info.create_at).getFullYear()}}</li>
         </ul>
      </header>
      <body>
          <ul>
              <li>最近创建的话题</li>
              <li v-for="(item,index) in new_user_info.recent_topics":key="index">
                <router-link :to="{name:'userIndex',params:{newId:item.id,user:item.author.loginname}}" class="link">
                  <img :src="item.author.avatar_url" />
                </router-link>
                <router-link :to="{name:'html',params:{newId:item.id,user:item.author.loginname}}">
                    <span>{{item.title}}</span>
                </router-link>
                <span>{{24-new Date(item.last_reply_at).getHours()}}小时前</span>
              </li>
          </ul>
      </body>
      <footer>
          <ul>
              <li>
                  最近参与的话题
              </li>
              <li v-for="(item,index) in new_user_info.recent_replies":key="index">
                <router-link :to="{name:'userIndex',params:{newId:item.id,user:item.author.loginname}}" class="link">
                  <img :src="item.author.avatar_url" />
                </router-link>
                <router-link :to="{name:'html',params:{user:item.author.loginname}}">
                    <span>{{item.title}}</span>
                </router-link>
                <span>{{24-new Date(item.last_reply_at).getHours()}}小时前</span>
              </li>
          </ul>
      </footer> 
    </div>
    <div class="right">
      <Author/>
      <Publish/>
    </div>
  </div>
     
</template>

<script>
import store from "../store/store";
import Author from "./author";
import Publish from "./publish_topic";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "userIndex",
  data() {
    return {};
  },
  components: {
    Author,
    Publish
  },
  computed: {
    ...mapGetters(["new_user_info"])
  },
  created() {
    console.log("this route params is:", this.$route.params);
    store.dispatch("getUser", this.$route.params.user);
  }
};
</script>

<style lang="less" scoped>
img {
  width: 30px;
  height: 30px;
  margin-right: 20px;
}
.userIndex {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  margin-top: 20px;
  //   padding:20px;
  .left {
    header,
    body,
    footer {
      background: #fff;
      min-width: 800px;
      max-width: 1000px;
      ul {
        a {
          text-decoration: none;
          color:#222;
        }
        li {
          padding: 10px;
          list-style: none;
          &:first-child {
            background: #ccc;
          }
          text-align: left;
        }
      }
    }
  }
}
</style>

