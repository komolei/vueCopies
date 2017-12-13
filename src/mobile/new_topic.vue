<template>
<!-- <div > -->
<v-app light class="newTopic">
  <h4>发布话题</h4>
  <v-card color="grey lighten-4">
    <v-layout>
      <v-flex xs6>
        <v-subheader>选择板块</v-subheader>
      </v-flex>
      <v-flex xs6>
        <v-select v-bind:items="state" v-model="topic_value.tab" label="Select" single-line auto append-icon="map" hide-details></v-select>
      </v-flex>
    </v-layout>
  </v-card>

  <v-card color="grey lighten-4">
    <v-layout>
      <v-flex xs4>
        <v-subheader>10个字以上</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field name="input-1" label="标题" single-line v-model.trim="topic_value.title"></v-text-field>
      </v-flex>
    </v-layout>
  </v-card>

  <v-card color="grey lighten-4" flat>
    <v-card-text>
      <v-container fluid>
        <v-layout row>
          <v-flex xs12>
            <v-text-field name="content" label="Input content" textarea v-model.trim="topic_value.content"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>

  <v-btn color="info" :loading="loading" @click.native="publish" :disabled="loading">
    Icon Loader
    <span slot="loader" class="custom-loader">
        <v-icon light>cached</v-icon>
      </span>
  </v-btn>
</v-app>
</template>

<script>
import axios from "axios";
import store from "../store/store_mobile";
export default {
  name: "newTopic",
  data() {
    return {
      loader: null,
      loading: false,
      e2: "share",
      topic_value: {},
      items: [{
          text: "share"
        },
        {
          text: "job"
        },
        {
          text: "ask"
        }
      ],
      state: ["share", "job", "ask"]
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
    }
  },
  methods: {
    publish: function() {
      this.loader = "loading";
      this.topic_value.accesstoken = store.state.accesstoken;
      let url = "https://www.vue-js.com/api/v1/topics";
      console.log("topic:'", this.topic_value, this.e2, 'dfaf', this.items);
      axios.post(url, this.topic_value).then(r => {
        let data = r.data;
        if (!data.success) throw new Error("publish fail");
        alert('发布成功');
      });
    }
  },
  beforeCreate () {
    if(store.state.accesstoken.length==0) this.$router.push({path:'/loginandon'})
  }
};
</script>

<style lang="less" scoped>
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
</style>

