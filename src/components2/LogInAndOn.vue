<template>
<transition enter-active-class="animated fadeIn" >
<div class="logInAndOn">
  <header> 
    <span @click="changeState_1">logOn</span>
    <span @click="changeState_1">logIn</span>
   
  </header>

  <body>
    <transition name="logIn" enter-active-class="animated zoomIn" :duration="{ enter: 2000}">
      <div class="login" v-if="isShow">
        <div>
          <label for="name"><i class="fa fa-user fa-fw"></i></label>
          <input type="text" id="name" placeholder="input name" v-model.trim="userInfo.name" required="required" autocomplete="on">
        </div>
        <div>
          <label for="pwd"><i class="fa fa-key fa-fw"></i></label>
          <input type="password" name="pwd" id="pwd" v-model.trim="userInfo.password" required="required" >
        </div>
        <div>
          <label for="surepwd"><i class="fa fa-key fa-fw"></i></label>
          <input type="password" name="surepwd" id="surepwd" v-model.trim="userInfo.surepassword" @keyup.enter="surepassword"  required="required" >
        </div>
        <div>
          <label for="email"><i class="fa fa-envelope-o fa-fw"></i></label>
          <input type="email" name="email" id="email" v-model.trim="userInfo.email" @keyup.tab="surepassword" required="required" autocomplete="on">
        </div>
        <button @click="btnState"><i class="fa fa-check" :class="{'fa-spinner':isSubmit,'fa-pulse':isSubmit}"></i></button>
      </div>
    </transition>
    <transition name="logOn" enter-active-class="animated zoomIn" :duration="{enter:2000}">
      <div class="logon" v-if="!isShow">
        <div>
          <label for="name"><i class="fa fa-user fa-fw"></i></label>
          <input type="text" id="name" placeholder="input name" required="required" autocomplete="on">
        </div>
        <div>
          <label for="pwd"><i class="fa fa-key fa-fw"></i></label>
          <input type="password" name="pwd" id="pwd" required="required" >
        </div>
       <button @click="btnState1"><i class="fa fa-check" :class="{'fa-spinner':isSubmit,'fa-pulse':isSubmit}"></i></button>
      </div>
    </transition>
  </body>
</div>
</transition>
</template>

<script>
const use_bus = text => {
  if (text.length == 0) {
    store.dispatch("changeState");
  } else {
    store.state.content = text;
    store
      .dispatch("changeState")
      .then(r => console.log("this is callback ", r));
  }
};
import axios from "axios/dist/axios";
import Router from "vue-router";
import store from "../store/store";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "LogInAndOn",
  data() {
    return {
      userInfo: {},
      isShow: true,
      isSubmit: false
    };
  },
  computed: {
    ...mapState(["content"])
  },
  methods: {
    ...mapMutations(["changeState"]),
    changeState_1() {
      console.log("change");
      this.isShow = !this.isShow;
      use_bus(this.isShow ? "logOn" : "logIn");
    },
    btnState() {
      this.isSubmit = true;
      console.log("this userinfo", this.userInfo);
      axios
        .post(
          "http://rap.taobao.org/mockjsdata/29896/index/users/logon",
          this.userInfo
        )
        .then(r => {
          console.log("this is result", r);
          if (Number(r.data.status) === 0) {
            use_bus("logon successfully");
          } else {
            use_bus("logon fail");
            this.isSubmit = false;
            throw new Error("gg");
          }
        })
        .then(() => {
          this.isShow = true;
          this.isSubmit = false;
          setTimeout(() => {
            this.$router.push({ path: "todo" });
          }, 1000);
        })
        .catch(err => console.log(err));
    },
    btnState1() {
      this.isSubmit = true;
      console.log("this userinfo", this.userInfo);
      axios
        .post(
          "http://rap.taobao.org/mockjsdata/29896/index/users/login",
          this.userInfo
        )
        .then(r => {
          console.log("this is result", r);
          if (Number(r.data.status) === 0) {
            use_bus("logIn successfully");
          } else {
            use_bus("logIn fail");
            this.isSubmit = false;
            throw new Error("gg");
          }
        })
        .then(r => {
          this.isShow = false;
          this.isSubmit = false;
          setTimeout(() => {
            this.$router.push({ path: "todo" });
          }, 1000);
        })
        .catch(err => console.log(err));
    },
    surepassword() {
      if (this.userInfo.password != this.userInfo.surepassword) {
        alert("password is not same");
        this.userInfo.surepassword = "";
      }
    }
  }
};
</script>


<style lang="less" scoped>
.logInAndOn {
  width: 220px;
  // height: 180px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 2px 2px 15px 5px #ccc;
  margin: 0 auto;
  cursor: pointer;
  div {
    padding: 4px 0;
    input {
      outline: none;
      border: none;
      border-bottom: 1px solid #ccc;
    }
  }
  button {
    background: transparent;
    outline: none;
    border: none;
    cursor: pointer;
  }
}
</style>
