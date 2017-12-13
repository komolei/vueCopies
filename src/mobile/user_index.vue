<template>
<div class="userIndex">
  <v-container>
    <v-layout column wrap>
      <v-flex xs12 sm10 offset-sm1 class="my-3">
        <v-card>
          <v-card-title>
            用户主页
          </v-card-title>
          <v-list>
            <v-list-tile class="ml-3">
              <v-avatar>
                <img :src="new_user_info.avatar_url" alt="avatar" />
              </v-avatar>
              <v-list-tile-content>
                <v-list-tile-title>
                  <v-icon>fa-user-o</v-icon> {{new_user_info.loginname}}
                  <v-icon>fa-github-square</v-icon> {{new_user_info.githubUsername}}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  积分:{{new_user_info.score}} 话题收藏 {{new_user_info.collect_topics.length}} 注册时间 {{new Date(new_user_info.create_at).getFullYear()}}
                </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 class="my-3">
        <v-card>
          <v-card-title>
            最近创建的话题
          </v-card-title>
          <v-list>
            <v-list-tile v-for="(item,index) in new_user_info.recent_topics" :key="index">
              <v-list-tile-content>
                <v-list-tile>
                  <router-link :to="{name:'userIndex',params:{newId:item.id,user:item.author.loginname}}" class="link">
                    <v-avatar>
                      <img :src="item.author.avatar_url" />
                    </v-avatar>
                  </router-link>
                  <router-link :to="{name:'html',params:{newId:item.id,user:item.author.loginname}}">
                    <span>{{item.title}}</span>
                  </router-link>
                  <span class="text-xs-right">{{24-new Date(item.last_reply_at).getHours()}}小时前</span>
                </v-list-tile>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 sm10 offset-sm1 class="my-3">
        <v-card>
          <v-card-title>
            最近参与的话题
          </v-card-title>
          <v-list>
            <v-list-tile v-for="(item,index) in new_user_info.recent_replies" :key="index">
              <v-list-tile-content>
                <v-list-tile>
                  <router-link :to="{name:'userIndex',params:{newId:item.id,user:item.author.loginname}}">
                    <v-avatar>
                      <img :src="item.author.avatar_url" />
                    </v-avatar>
                  </router-link>
                  <router-link :to="{name:'html',params:{newId:item.id,user:item.author.loginname}}">
                    <span>{{item.title}}</span>
                  </router-link>
                  <span class="text-xs-right">{{24-new Date(item.last_reply_at).getHours()}}小时前</span>
                </v-list-tile>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-btn :loading="loading" @click.native="newTopic" :disabled="loading" color="blue-grey" class="white--text">
        发布主题
        <v-icon right dark>cloud_upload</v-icon>
      </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import store from "../store/store_mobile";
import Publish from "./publish_topic";

import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from "vuex";
export default {
  name: "userIndex",
  data() {
    return {
      loader: null,
      loading: false
    };
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },
  components: {
    Publish
  },
  computed: {
    ...mapState(["is_visible"]),
    ...mapGetters(["new_user_info"])
  },
  methods: {
    newTopic: function() {
      this.loader = 'loading'
      console.log("new topic:");
      this.$router.push({
        path: "/newTopic"
      });
    }
  },
  created() {
    console.log("this route params is:", this.$route.params);
    store.dispatch("getUser", this.$route.params.user);
  }
};
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

// img {
//   width: 30px;
//   height: 30px;
//   margin-right: 20px;
// }
// .userIndex {
//   display: flex;
//   flex-flow: row nowrap;
//   justify-content: space-around;
//   margin-top: 20px; //   padding:20px;
//   .left {
//     header,
//     body,
//     footer {
//       background: #fff;
//       min-width: 800px;
//       max-width: 1000px;
//       ul {
//         a {
//           text-decoration: none;
//           color: #222;
//         }
//         li {
//           padding: 10px;
//           list-style: none;
//           &:first-child {
//             background: #ccc;
//           }
//           text-align: left;
//         }
//       }
//     }
//   }
// }
//
</style>

