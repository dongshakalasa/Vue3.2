<template>
    <div id="swiperTop">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="(image,key) in state.images" :key="key">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { getBanner } from '@/request/api/home'

// 声明数据
const state = reactive({
    images: [
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ]
})

// 初始化钩子
onMounted(async () => {
    let result = await getBanner()
    let {code,banners} = result.data
    if(code == 200) {
        state.images = banners
    }else {
        console.log("SwpierTop数据获取异常");
    }
})



</script>
<style lang="less">
#swiperTop {

    //需要在上面自己添加一个id
    .van-swipe {
        width: 100%;
        height: 3rem;

        .van-swipe-item {
            padding: 0 0.2rem;

            img {
                width: 100%;
                height: 100%;
                border-radius: 0.2rem;
            }
        }

        .van-swipe__indicator--active {
            background-color: rgb(219, 130, 130);
        }
    }
}
</style>