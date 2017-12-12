<template>
  <div class="ads">
      <ul class="adsBox">
          <li>There are advertisement</li>
          <li><img src="../assets/logo.png" alt=""></li>
          <li></li>
          <li></li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "ads"
};
</script>
<style lang="less" scoped>
li {
  list-style: none;
  max-width: 290px;
    min-width: 220px;

  padding:5px 0;
  img{
    width:80%;
  }
}
.ads {
  background-color: #fff;
  margin-top:20px;
  border-radius: 10px;
  .adsBox {
    display: flex;
    flex-flow: column nowrap;
  }
}
</style>

