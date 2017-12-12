<template>
<transition enter-active-class="animated fadeIn" >
<div class="logInAndOn">
  <header> 
    <span @click="changeState">logOn</span>
    <span @click="changeState">logIn</span>
   
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
  <!-- <Toast v-bind:message="callbackMsg"></Toast> -->
  <!-- <Toast v-bind="callbackMsg" ></Toast> -->
</div>
</transition>
</template>

<script>
import axios from "axios/dist/axios";
import Toast from "./toast.vue";
import Router from "vue-router";
import {use_bus} from "./bus";

export default {
  components: { Toast },
  name: "LogInAndOn",
  // props: ['message'],
  data() {
    return {
      userInfo: {},
      isShow: true,
      isSubmit: false,
      // callbackMsg: "ccccc",
      callbackMsg: {
        message: "xxx",
        is_visible: true
      }
    };
  },
  created() {},
  updated() {},
  mounted() {
    console.log(this.$route.params);
  },
  updated() {
    // this.callbackMsg.is_visible = true;
    // setTimeout(() => {
    //   this.callbackMsg.is_visible = true;
    // }, 500);
  },

  methods: {
    changeState() {
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
          // this.$router.push({ path: "todo" });
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

/* .logIn-enter-active {
  transition: all 0.3s ease;
}

.logIn-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.logIn-enter,
.logIn-leave-to {
  opacity: 0;
} */
</style>
