<template>
  <div class="topics_right">
      <Author/>
      <Topics/>
      <Theme/>
  </div>
</template>
<script>
import Author from "./author";
import Topics from "./topics";
import Theme from "./theme";
export default {
  name: "topics_right",
  components: {
    Author,
    Topics,
    Theme
  }
};
</script>

<style>

</style>