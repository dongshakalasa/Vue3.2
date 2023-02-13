<template>
    <itemMusicTop :playlist="state.playList" />
    <itemMusicList 
        :itemList="state.itemList"
        :subscribedCount="state.playList.subscribedCount"
    />
</template>
<script setup>
import itemMusicTop from '@/components/item/ItemMusicTop.vue'
import itemMusicList from '@/components/item/itemMusicList.vue';
import { getMusicItemList, getItemList } from '@/request/api/item'
import { onBeforeMount,reactive,ref,onMounted } from 'vue';
import { useRoute } from 'vue-router'

// 数据声明
const state = reactive({
    playList: {}, //歌单的详情页的数据
    itemList: [] // 歌单的歌曲
})

// 初始化钩子
onBeforeMount(async()=>{
    // 获取通过路由传输的id
    let id = useRoute().query.id;
    // 获取歌单详情页
    let res = await getMusicItemList(id);
    if(res.data.code == 200) {
        state.playList = res.data.playlist
    }else {
        console.log("itemMusic的数据加载错误");
    }
    // 获取歌单的歌曲
    let result = await getItemList({id,limit:10,offset: 0})
    if(result.data.code == 200) {
        state.itemList = result.data.songs
    }else {
        console.log("itemMusic的数据加载错误");
    }
    //   防止页面刷新，数据丢失，将数据保存到sessionStorage中
    sessionStorage.setItem("itemDetail", JSON.stringify(state));
})

</script>
<style lang="">
    
</style>