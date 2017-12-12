<template>
  <div class="newTopic">
    <ul>
      <li>
        发布话题
      </li>
      <li>
        选择板块<select v-model="topic_value.tab">
        <option value="share">分享</option>
        <option value="job">招聘</option>
        <option value="ask">问答</option>
        </select>
      </li>
      <li>
        <input type="text" name="title" id="title" placeholder="标题字数10个字以上" v-model.trim="topic_value.title">
      </li>
      <li>
        <textarea name="content" id="content" cols="30" rows="10" v-model.trim="topic_value.content"></textarea>
      </li>
      <li>
        <button @click="publish">publish</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store/store";
export default {
  name: "newTopic",
  data() {
    return {
      topic_value: {}
    };
  },
  methods: {
    publish: function() {
      this.topic_value.accesstoken = store.state.accesstoken;
      let url = "https://www.vue-js.com/api/v1/topics";
      axios.post(url, this.topic_value).then(r => {
        let data = r.data;
        if (!data.success) throw new Error("publish fail");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.newTopic {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  margin-left: 20px;
  ul {
    min-width: 650px;
    max-width: 860px;
    border: 1px solid #ccc;
    border-radius: 4px;
    li {
      box-sizing: border-box;
      padding: 5px;
      list-style: none;
      text-align: left;
      &:first-child {
        background: #ccc;
      }
      & > input {
        width: 100%;
        border: none;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
      }
      textarea {
        width: 100%;
        border: none;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 10px;
      }
      button {
        border: none;
        outline: none;
        padding: 5px 4px;
        background: #05c;
        color: #fff;
        font-size: 20px;
        border-radius: 4px;
      }
    }
  }
}
</style>

