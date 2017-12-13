<template>
<div class="html">
  <!-- <div class="ct">
    <header>
      <section>
        <span :class="{top:is_top}">置顶</span>
        <span class="title">{{new_topic_info.title}}</span>
      </section>
      <div>
        <span class="time">·发布于{{new Date(new_topic_info.create_at).getFullYear()}}</span>
        <span class="reply">·作者{{new_topic_info.author.loginname}}</span>
        <span class="reply1">·{{ new_topic_info.visit_count }}浏览</span>
        <span>·来自{{ tab(new_topic_info.tab) }}</span>
        <span @click="add_topic_collection(new_topic_info.id)" :class="{show:is_visible}">加入收藏</span>
        <span @click="remove_topic_collection(new_topic_info.id)" :class="{show:!is_visible}">取消收藏</span>
      </div>
    </header>
    <div v-html="new_topic_info.content" class="body"></div>
    <div class="replies">
      <ul>
        <h3>回复</h3>
        <li v-for="(item,index) in new_topic_info.replies" :key="index">
          <div>
            <img :src="item.author.avatar_url" />
            <span>{{item.author.loginname}}</span>
            <div v-html="item.content"></div>
          </div>
          <i class="fa fa-thumbs-o-up" @click="add_ups(item.id,index)">赞{{item.ups.length}}</i>
        </li>
      </ul>
    </div>
    <div class="addReplies" :class="{show:is_visible}">
      <ul>
        <li>添加回复</li>
        <li>
          <textarea name="addreplies" id="a" cols="30" rows="10" v-model="repliesText"></textarea>
        </li>
        <li>
          <button @click="replies">回复</button>
        </li>
      </ul>
    </div>
  </div> -->
  <v-app>
    <v-container fluid>
      <v-layout column nowrap>
        <v-flex xs12 sm10 offset-sm1 class="my-3">
          <v-card>
            <v-card-title>
              <span :class="{top:is_top}">置顶</span>
              <span class="title">{{new_topic_info.title}}</span>
            </v-card-title>
            <div>
              <span class="time">·发布于{{new Date(new_topic_info.create_at).getFullYear()}}</span>
              <span class="reply">·作者{{new_topic_info.author.loginname}}</span>
              <span class="reply1">·{{ new_topic_info.visit_count }}浏览</span>
              <span>·来自{{ tab(new_topic_info.tab) }}</span>
              <span @click="add_topic_collection(new_topic_info.id)" :class="{show:is_visible}">加入收藏</span>
              <span @click="remove_topic_collection(new_topic_info.id)" :class="{show:!is_visible}">取消收藏</span>
            </div>
            <v-card-title>
              <div v-html="new_topic_info.content" class="body"></div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12 sm10 offset-sm1>
          <v-card>
            <v-card-title>回复</v-card-title>
            <div>
              <v-list>
                <v-list-tile v-for="(item,index) in new_topic_info.replies" :key="index" class="ma-3 py-1">
                  <v-avatar>
                    <img :src="item.author.avatar_url" />
                  </v-avatar>
                  <v-card-text>
                    {{item.author.loginname}}
                    <div v-html="item.content"></div>
                  </v-card-text>
                  <v-list-tile-action>
                    <v-icon color="blue lighten-2" @click="add_ups(item.id,index)" class="pa-2">thumb_up</v-icon>
                    赞{{item.ups.length}}
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </div>
          </v-card>
        </v-flex>
        <v-flex xs12 sm10 offset-sm1 class="mt-3">
          <v-card class="addReplies" :class="{show:is_visible}">
            <v-card-text>
              <v-container fluid>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="content" label="添加回复" textarea v-model.trim="repliesText"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <div class="text-xs-center">
              <v-btn @click="replies(new_topic_info.id)">回复</v-btn>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
    <router-view name="go_top"></router-view>

</div>
</template>
<script>
// import TopicsRight from "./topics_right";
import store from "../store/store_mobile";
import axios from "axios";
import {
  mapGetters,
  mapState
} from "vuex";
export default {
  name: "html",
  components: {},
  data() {
    return {
      is_up: true,
      is_top: true,
      repliesText: ""
    };
  },
  computed: {
    ...mapState(["is_visible", "accesstoken", "topic_info"]),
    ...mapGetters(["new_topic_info", "new_user_info"])
  },
  created() {
    console.log("this route params is:", this.$route.params);
    store.dispatch("getTopic", this.$route.params.newId);
    store.dispatch("getUser", this.$route.params.user);
  },
  mounted() {
    // store.dispatch("getUser", this.$route.params.user); //发送用户的id，去获取user的信息
  },
  methods: {
    replies: function() {
      let url = `https://www.vue-js.com/api/v1/topic/${this.new_topic_info
        .id}/replies`;
      console.log("replies", url);
      let option = Object.assign({}, {
        topic_id: this.new_topic_info.id,
        accesstoken: this.accesstoken,
        content: this.repliesText
      });
      console.log("option is", option, "\n\n");
      axios.post(url, option).then(r => {
        console.log("result:", r);
        let callbackR = r.data;
        if (!callbackR.success) throw new Error("login fail");
        console.log("reply success");
      });
    },
    tab: function(text) {
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
    add_topic_collection: function(id) {
      let url = "https://www.vue-js.com/api/v1/topic/collect";
      console.log("fafdoadjfpqhgrq");
      console.log(id, this.accesstoken, this.new_topic_info.id);
      console.log("fafdoadjfpqhgrq");

      let option = Object.assign({}, {
        topic_id: this.new_topic_info.id,
        accesstoken: this.accesstoken
      });
      console.log("options", option);
      axios.post(url, option).then(r => {
        console.log("result:", r);
        let callbackR = r.data;
        if (!callbackR.success) throw new Error("login fail");
        console.log("add success");
        store.commit("changeState", true);
      });
    },
    remove_topic_collection: function(id) {
      let url = "https://www.vue-js.com/api/v1/topic/decollect ";
      let option = Object.assign({}, {
        topic_id: this.new_topic_info.id,
        accesstoken: this.accesstoken
      });
      console.log("options", option);
      axios.post(url, option).then(r => {
        console.log("result:", r);
        let callbackR = r.data;
        if (!callbackR.success) throw new Error("login fail");
        console.log("remove success");
        store.commit("changeState", false);
      });
    },
    add_ups: function(id, index) {
      // https://www.vue-js.com/api/v1/reply/5a2de570f4eae0865305a4e6/ups
      let url = `https://www.vue-js.com/api/v1/reply/${id}/ups`;
      let option = Object.assign({}, {
        accesstoken: this.accesstoken
      });
      console.log("options", option);
      console.log("store.state.new_topic_info:", store.state.topic_info);
      axios.post(url, option).then(r => {
        console.log("result:", r);
        let callbackR = r.data;
        let ups = store.state.topic_info.replies[index].ups;
        if (!callbackR.success) {
          throw new Error("connect fail");
        }
        console.log("ups success");
        // update ups number
        console.log("boolean:", ups.includes(id), callbackR.action);
        if (callbackR.action == "down") {
          let new_ups = ups.splice(ups.findIndex(item => item == id), 1);
        } else {
          ups.push(id);
        }
      });
    }
  }
};
</script>

//<style lang="less" scoped>
.show {
  display: none;
}

// li {
//   list-style-type: none;
// }
// .top {
//   background-color: #369219;
//   color: #fff;
//   border-radius: 4px;
//   padding: 3px;
//   font-size: 10px;
// }
// .html {
//   text-align: left;
//   display: flex;
//   justify-content: space-around;
//   align-items: baseline;
//   margin: 20px;
//   align-items: flex-start;
//   .ct {
//     background: #fff;
//     max-width: 1000px;
//     padding: 10px; // margin-top:20px;
//     header {
//       padding: 10px 0;
//       border-bottom: 1px solid #e5e5e5;
//       span {
//         font-size: 12px;
//         padding: 0 4px;
//         margin-left: 10px;
//       }
//       section {
//         padding-bottom: 15px;
//       }
//       .title {
//         font-size: 22px;
//         font-weight: bold;
//       }
//     }
//     .replies {
//       ul {
//         li {
//           display: flex;
//           flex-flow: row nowrap;
//           justify-content: space-between;
//           align-items: flex-start;
//           padding: 4px;
//           border-bottom: 1px solid #ccc;
//           div {
//             &:first-child {
//               p {
//                 margin: 0;
//               }
//               img {
//                 width: 30px;
//                 height: 30px;
//               }
//               span {
//                 &:first-child {
//                   align-self: baseline;
//                 }
//               }
//             }
//           }
//           i {
//             cursor: pointer;
//           }
//         }
//       }
//     }
//     .addReplies {
//       margin-top: 10px;
//       border-top: 1px solid #ccc;
//       ul {
//         li {
//           box-sizing: border-box;
//           padding: 4px;
//           textarea {
//             width: 100%;
//             border: 1px solid #ccc;
//             border-radius: 4px;
//             box-sizing: border-box;
//             padding: 10px;
//           }
//           button {
//             border: none;
//             outline: none;
//             padding: 5px 4px;
//             background: #05c;
//             color: #fff;
//             font-size: 20px;
//             border-radius: 4px;
//           }
//         }
//       }
//     }
//   }
// }
// .body {
//   margin-left: 20px;
//   li {
//     list-style: none;
//   }
//   a {
//     color: #ccc;
//     text-decoration: none;
//   }
// }
//
</style>
