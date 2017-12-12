<template>
<transition enter-active-class="animated fadeIn" >
<div class="todo" >
      <header>
          <!-- v-model="context" -->
          <input type="text" placeholder="what need to be done?" @keyup.enter="add($event)" value="">
      </header>
     
      <body v-if="this.lists.length"> 
          <ul class="ulBox">
              <!-- v-bind = : -->
              <!-- @change = v-on -->
           <!-- <transition-group tag="li"> -->
              <li  v-for="(list,index) in lists" v-bind:key="index" :class="{textDel:list.del,textVisable:list.visable}" >
                  <!-- <input type="checkbox" name="selected"  @click="select($event)" :key="index">{{list.msg}} -->
                  <input type="checkbox" name="selected"  @click="choose(index,$event)" :key="index">{{list.msg}}
                  <span class="del" @click="del(index)" :key="index">X</span>
                </li>
           <!-- </transition-group> -->
          </ul>
      </body> 
      
      <footer v-if="this.lists.length">
          <span class="showItem">{{itemLeft}}item left</span>
          <button class="all" @click="showAll">all</button>
          <button class="active" @click="showActive">active</button>
          <button class="completed" @click="showCompleted">completed</button>
          <button :class="{clear:isClear}" @click="clearCompleted">clear completed</button>
      </footer>
  </div>
</transition>
  
</template>

<script>
import { bus, use_bus } from "./bus";
export default {
  name: "todo",
  data() {
    return {
      lists: [
        // { msg: "a", del: false, visable: false },
        // { msg: "b", del: false, visable: false }, //true
        // { msg: "c", del: false, visable: false },
        // { msg: "d", del: false, visable: false },
        // { msg: "e", del: true, visable: false }
      ],
      isClear: true
    };
  },
  computed: {
    itemLeft: function() {
      let itemLength = this.lists.filter(el => {
        return el.del === false;
      }).length;
      return itemLength;
    }
  },
  created() {},
  beforeMount() {
    const listsBox = [];
    // !localStorage.getItem("listsbox")
    //   ? localStorage.setItem("listsbox", listsBox)
    //   : (this.lists = localStorage.getItem("listbox"));
    if (localStorage.getItem("listsbox"))
      this.lists = JSON.parse(localStorage.getItem("listsbox"));
    // this.lists = listsBox;
  },
  mounted() {
    this.lists.forEach((el, index) => {
      if (el.del) {
        // document.querySelectorAll("[type='checkbox'")[index].checked = true;
        this.isClear = false;
      }
    });
  },
  updated() {
    localStorage.setItem("listsbox", JSON.stringify(this.lists));
    let checkboxCollection = Array.from(
      document.querySelectorAll("[type=checkbox]")
    );

    this.lists.forEach((item, index) => {
      if (!item.del) {
        const el = checkboxCollection[index];
        el.checked = false;
        // console.log("el", el);
      } else {
        checkboxCollection[index].checked = true;
      }
    });
  },
  methods: {
    add: function(event) {
      let context = event.target.value.trim();
      if (context.length != 0) {
        this.lists.push(
          Object.assign({}, { msg: context, del: false, visable: false })
        );
        event.target.value = "";
        use_bus("add successfully");
      }
    },
    del: function(key) {
      // console.log('xx',key,this.lists[key]);
      this.lists.splice(key, 1);
      this.lists.forEach(el => {
        if (!el.del) {
          this.isClear = true;
          use_bus("delete successfully");
        }
      });
      //   this.isClear=true;
    },
    // select: function(event) {
    //   let result = event.target.checked;
    //   console.log(result);
    //   let index = Array.from(
    //     document.querySelectorAll("[type=checkbox]")
    //   ).findIndex(item => item === event.target);
    //   this.lists[index].del = result;
    //   result ? (this.isClear = false) : (this.isClear = true);
    // },
    choose: function(index, event) {
      //   console.log("I been selected", event.target.checked);
      //   this.textDelBtn = event.target.checked;
      let result = event.target.checked;
      //   console.log(result, index);
      //   if(result) this.lists[index].class.textDel=true;
      this.lists[index].del = result;
      //   console.log("this.list[index].del", this.lists[index].del, this.lists);
      result ? (this.isClear = false) : (this.isClear = true);
      //   result = false;
      //   console.log(this.lists);
      /*error
      let listsIndexDel = this.lists[index].del;
      //   console.log(`result`, listsIndexDel);
      listsIndexDel = result;
      //   console.log(`result`, listsIndexDel);
      //   console.log(this.lists);
      将结果复制给listsIndexDel，然后在赋值，居然不会改变。由此可看，vue是通过this来切换更新的。
      */
    },
    showAll: function() {
      this.lists.map(item => {
        item.visable = false;
      });
    },
    showActive: function() {
      this.lists.map(item => {
        if (item.del) {
          item.visable = true;
        } else if (item.visable) item.visable = false;
      });
    },
    showCompleted: function() {
      this.lists.map(item => {
        if (!item.del) {
          item.visable = true;
        } else if (item.visable) {
          item.visable = false;
        }
      });
    },
    clearCompleted: function() {
      this.lists = this.lists.filter(el => el.del === false);
      this.isClear = true;
      //   console.log("clearCompleted", this.lists);
    }
  }
};
</script>

<style scoped>
.clear {
  /* display: none; */
  visibility: hidden;
}
.textDel {
  text-decoration-line: line-through;
}
.textVisable {
  display: none;
}
.todo {
  width: 400px;
  border: 1px solid #d4c8c8;
  border-radius: 10px;
  box-shadow: 2px 2px 10px 2px #ccc;
  margin: 10px auto;
}
header > [type="text"] {
  width: 100%;
  outline: none;
  font-size: 20px;
  border: none;
}

body,
ul {
  margin: 0;
  padding: 0;
}
header,
body,
footer {
  padding: 5px;
}
body > ul {
  list-style: none;
}
body > ul > li {
  list-style: none;
  line-height: 20px;
  width: 100%;
  float: left;
  text-align: left;
}
body > ul::after {
  content: "";
  display: inline-block;
  clear: both;
}
body > ul > li > [type="checkbox"] {
  margin: 0;
  width: 20px;
  height: 20px;
  border: 1px solid #f5f5f5;
  border-radius: 50%;
  vertical-align: bottom;
  background-color: transparent;
  outline: none;
  margin-right: 4px;
}
body > ul > li > span {
  float: right;
  padding-right: 10px;
}
footer > button {
  clear: both;
  outline: none;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
}
footer > button:hover {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
}
footer > .showItem {
  float: left;
}
</style>

