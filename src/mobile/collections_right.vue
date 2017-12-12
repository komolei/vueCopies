<template>
  <div class="collections_right">
      <LogInAndOn :class="{show:!is_visible}" /> 
      <Author :class="{show:is_visible}" />
      <Publish/>
      <Ads/>
      <Theme/>
      
  </div>
</template>
<script>
import LogInAndOn from "./LogInAndOn";
import Ads from "./ads";
import Theme from "./theme";
import Author from "./author";
import Publish from './publish_topic';
import { mapState } from "vuex";
export default {
  name: "collections_right",
  components: {
    LogInAndOn,
    Ads,
    Theme,
    Author,
    Publish
  },
  computed: {
    ...mapState(["is_visible"])
  }
};
</script>

<style>
.show {
  display: none;
}
</style>
