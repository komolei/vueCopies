<template>
<div class="box">
    <div class="messages">
      <div class="new_messages">
        <!-- {{messages}} -->
        <ul class="new_messages_box">
          <li>新消息</li>
          <li :class="{show:messages.hasnot_read_messages.length!=0}">无消息</li>
          <li v-for="(item,index) in messages.hasnot_read_messages":key="index">
            {{item}}
          </li>
        </ul>
      </div>
      <div class="old_messages">
          <ul class="old_messages_box">
            <li>过往消息</li>
          <li v-for="(item,index) in messages.has_read_messages":key="index">
              <router-link :to="{name:'userIndex',params:{user:username}}"></router-link>
              {{item.author.loginname}}
              回复了你的话题
              <router-link :to="{name:'html',params:{newId:item.topic.id,user:username}}">{{item.topic.title}}</router-link>
          </li>
        </ul>
      </div>
    
    </div>
    <div>
      <Author/>
      <Publish/>
    </div>
</div>
</template>

<script>
import store from "../store/store";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import Author from "./author";
import Publish from "./publish_topic";

export default {
  name: "messages",
  components: {
    Author,
    Publish
  },
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
.show{
  display: none;
}
.box {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}
.messages {
  margin-top: 10px;
  min-width: 650px;
  max-width: 1000px;
  text-align: left;
  .new_messages {
    background: #fff;
    .new_messages_box {
      li {
        list-style: none;
        padding: 5px 4px;
      }
    }
  }
  .old_messages {
      background: #fff;
      .old_messages_box {
        margin-top: 10px;
        li {
          list-style: none;
          padding: 5px 4px;
        }
      }
    }
}
</style>

