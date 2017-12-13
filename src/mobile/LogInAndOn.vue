<template>
<transition enter-active-class="animated fadeIn">
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
            <input type="text" id="name" placeholder="name" v-model.trim="userInfo.name" required="required" autocomplete="on">
          </div>
          <div>
            <label for="pwd"><i class="fa fa-key fa-fw"></i></label>
            <input type="password" name="pwd" id="pwd" v-model.trim="userInfo.password" required="required">
          </div>
          <div>
            <label for="surepwd"><i class="fa fa-key fa-fw"></i></label>
            <input type="password" name="surepwd" id="surepwd" v-model.trim="userInfo.surepassword" @keyup.enter="surepassword" required="required">
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
            <input type="text" id="name" placeholder="access_token" v-model.trim="userInfo.accesstoken" required="required" autocomplete="on">
          </div>
          <!-- <div>
          <label for="pwd"><i class="fa fa-key fa-fw"></i></label>
          <input type="password" name="pwd" id="pwd" required="required" >
        </div> -->
          <button @click="btnState1"><i class="fa fa-check" :class="{'fa-spinner':isSubmit,'fa-pulse':isSubmit}"></i></button>
        </div>
      </transition>
    </body>
    <div class="alert">
      <v-alert color="error" icon="info" dismissible v-model="alert">
        please login first!
      </v-alert>
    </div>
  </div>
</transition>
</template>

<script>
import axios from "axios";
import Router from "vue-router";
import store from "../store/store_mobile";
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from "vuex";
export default {
  name: "LogInAndOn",
  data() {
    return {
      alert: true,
      items: ["logon", "login"],
      userInfo: {
        accesstoken: "aabfed3e-4c7e-4a3b-8bcc-cda2ae17df53"
      },
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
    },
    btnState() {
      this.isSubmit = true;
      console.log("this userinfo", this.userInfo);
      axios
        .post("https://www.vue-js.com/signup", this.userInfo)
        .then(r => {
          return 1;
        })
        .then(() => {
          this.isShow = true;
          this.isSubmit = false;
          // setTimeout(() => {
          this.$router.push({
            path: "html"
          });
          // }, 1000);
        })
        .catch(err => console.log(err));
    },
    btnState1() {
      this.isSubmit = true;
      console.log("this userinfo", this.userInfo);
      axios
        .post("https://www.vue-js.com/api/v1/accesstoken", this.userInfo)
        .then(r => {
          console.log("axios result:", r);
          let callbackR = r.data;
          if (!callbackR.success) throw new Error("login fail");
          store.dispatch("getUser", callbackR.loginname);
          store.commit("changeAccesstoken", this.userInfo.accesstoken);
          // store.dispatch("changeState", false); //error 是action,看清楚。。。
          store.commit("changeState", false);
          
          store.dispatch("getMessageCount");
          // store.dispatch("getTopic", callbackR.id);
          // 固定登录用户名
          store.state.username = callbackR.loginname;
          this.$router.push({
            path: "/"
          });
          this.alert=false;
        })
        .then(r => {
          this.isShow = false;
          this.isSubmit = false;
          // setTimeout(() => {
          //   // this.$router.push({ path: "todo" });
          //   this.$router.push({ path: "html" });
          // }, 1000);
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
.alert {
  padding: 0;
  // margin-top:20px;
  &>div {
    margin: 0;
    background: #FF5252;
  }
}

.logInAndOn {
  // max-width: 290px;
  // min-width: 220px;
  // max-height: 180px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 2px 2px 15px 5px #ccc;
  background-color: #fff; // margin: 0 auto;
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
