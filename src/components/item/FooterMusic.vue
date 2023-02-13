<template>
    <div class="FooterMusic">
        <div class="footerLeft" @click="updateDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="" />
            <div>
                <p>{{ playList[playListIndex].name }}</p>
                <span>横滑切换上下首哦</span>
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon liebiao" aria-hidden="true" @click="play" v-if="isbtnShow">
                <use xlink:href="#icon-bofanganniu"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true" @click="play" v-else>
                <use xlink:href="#icon-weibiaoti--"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
        <audio ref="audio"
            :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
         <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%', width: '100%' }">
            <MusicDetail 
                :musicList="playList[playListIndex]" 
                :play="play" :isbtnShow="isbtnShow"
                :addDuration = "addDuration"
             />
        </van-popup> 
    </div>
</template>
<script setup>
import MusicDetail from '@/components/item/MusicDetail.vue'
import { computed ,watch ,onUpdated,onMounted,ref}from 'vue'
import { getCurrentInstance } from '@vue/runtime-core';
import { useStore} from 'vuex'

// $store
let store = useStore()
// 获取state数据
const playList = computed(()=>store.state.playList)
const playListIndex = computed(() => store.state.playListIndex)
const isbtnShow = computed(() => store.state.isbtnShow)
const detailShow = computed(() => store.state.detailShow)

// refs
const currentInstance = getCurrentInstance()
let interVal = ref(0)

// 播放按钮
function play(){
    // 判断音乐是否播放
    if (currentInstance.ctx.$refs.audio.paused){
        // 播放音乐
        currentInstance.ctx.$refs.audio.play()
        store.commit("updateIsbtnShow", false)
        // 触发更新音乐当前播放时间
        updateTime()
    }else {
        // 暂停播放音乐
        currentInstance.ctx.$refs.audio.pause()
        store.commit("updateIsbtnShow", true)
        // 清除更新音乐当前播放时间定时器
        clearInterval(interVal)
    }
}

// 监听音乐是否切换
watch(playListIndex, (newValue, oldValue)=>{
    //监听如果下标发生了改变，就自动播放音乐
    currentInstance.ctx.$refs.audio.autoplay = true;
    if (currentInstance.ctx.$refs.audio.paused) {
        //如果是暂停状态，改变图标
        store.commit("updateIsbtnShow", false)
    }
})
// 监听音乐列表的切换
watch(()=>playList,(newValue,oldValue)=>{
    if (isbtnShow) {
        currentInstance.ctx.$refs.audio.autoplay = true;
        store.commit("updateIsbtnShow", false)
    }
}, { deep: true })

// 弹出层的切换
function updateDetailShow(){
    store.commit("updateDetailShow")
}

// 更新钩子
onUpdated(()=>{
    store.dispatch("getLyric", playList.value[playListIndex.value].id);
    addDuration()
})

// 更新时长
function addDuration(){
    store.commit("updateDuration", currentInstance.ctx.$refs.audio.duration)
}

// 改变时间
function updateTime(){
    interVal = setInterval(()=>{
        store.commit("updateCurrentTime", currentInstance.ctx.$refs.audio.currentTime)
    },600)
}

// 初始化钩子
onMounted(()=>{
    store.dispatch("getLyric", playList.value[playListIndex.value].id);
    // 触发更新音乐当前播放时间
    updateTime()
})
</script>
<style lang="less" scoped>
.FooterMusic {
    width: 100%;
    height: 1.4rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #999;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;

    .footerLeft {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }
    }

    .footerRight {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon {
            width: 0.6rem;
            height: 0.6rem;
        }
    }
}
</style>