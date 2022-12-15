<template>
    <div>
        <!-- 我是收藏书籍界面 -->
    </div>

    <booklists></booklists>
    
    <div >
    <hr class="my-4" />
    <el-pagination
      :hide-on-single-page="pagevalue"
      :total="5"
      layout="prev, pager, next"
    />
  </div>

</template>

<script setup lang="ts">
import { onMounted,reactive, ref } from 'vue';
import{useStore} from 'vuex'
import { useRouter } from "vue-router";
import {getBookDetailByISBN} from '@/api/search/search'
import booklists from "@/components/person/booklistForCollect.vue"


const store = useStore();
const router = useRouter();

let typelist ={
  typename:['小说','文学','动漫','传记','艺术','童书','教材','历史','政治军事','法律','哲学宗教',]
}






const pagevalue = ref(false)
</script>

<style scoped>
.card-label {
  z-index: 1;
  width: 100px;
  height: 30px;
  border-radius: 25px;
  background-color: rgb(222, 238, 255);
  font-size: 10px;
  margin: 15px;
  display: flex;
  flex-direction:start;
  justify-content: center;
  align-items: center;
}
.cardlabel_one {
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>