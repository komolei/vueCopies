<template>
<div class="box">
  <v-app>
    <v-layout>
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
          <v-card-title>
            <v-card-text>
              <v-icon large color="blue darken-2">chat</v-icon> 新消息
            </v-card-text>
            <v-list>
              <v-list-tile v-for="(item,index) in messages.hasnot_read_messages" :key="index">
                {{item}}
              </v-list-tile>
            </v-list>
          </v-card-title>
        </v-card>
        <v-card class="my-3">
          <v-card-title>
            <v-card-text>
              <v-icon large color="blue darken-2">chat</v-icon> 过往消息
            </v-card-text>
            <v-list>
              <v-list-tile v-for="(item,index) in messages.has_read_messages" :key="index">
                <router-link :to="{name:'userIndex',params:{user:username}}">
                  {{item.author.loginname}}
                </router-link>
                回复了你的话题
                <router-link :to="{name:'html',params:{newId:item.topic.id,user:username}}">{{item.topic.title}}</router-link>
              </v-list-tile>
            </v-list>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</div>
</template>

<script>
import store from "../store/store_mobile";
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from "vuex";
export default {
  name: "messages",
  computed: {
    ...mapGetters(["messages"]),
    ...mapState(["username"])
  },
  methods: {
    // ...mapActions(["getMessage"])
  },
  created() {
    // store.dispatch("getMessage");
    console.log("fadpofqepgrj");
  }
};
</script>
<style lang="less" scoped>
.show {
  display: none;
}

// .box {
//   display: flex;
//   flex-flow: row nowrap;
//   justify-content: space-around;
// }
// .messages {
//   margin-top: 10px;
//   min-width: 650px;
//   max-width: 1000px;
//   text-align: left;
//   .new_messages {
//     background: #fff;
//     .new_messages_box {
//       li {
//         list-style: none;
//         padding: 5px 4px;
//       }
//     }
//   }
//   .old_messages {
//       background: #fff;
//       .old_messages_box {
//         margin-top: 10px;
//         li {
//           list-style: none;
//           padding: 5px 4px;
//         }
//       }
//     }
// }
</style>

