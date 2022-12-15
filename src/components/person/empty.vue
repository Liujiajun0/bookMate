<template>
    <div class="empty_box">
         <img src="../../../images/empty.png" alt="" class="empty_img">
    </div>
    <div class="empty_title">这里空空如也</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.empty_box{
    width: 1000px;
    display: flex;
    justify-content: center;

}

.empty_title{
    font-size: 50px;
    font-weight: 700;
    color: rgb(76, 73, 70);
     text-align: center;

}

.empty_img{
  
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
}
</style>