<script setup lang="ts">

import { onMounted, ref, useTemplateRef } from 'vue';

const props = defineProps<{
    title: string
}>();

const parentWidth = ref('-100vw');
const parent = useTemplateRef<HTMLDivElement>("my-parent");

onMounted(() => {
    console.log(parent.value);
    parentWidth.value = "-" + parent.value?.clientWidth + "px"
});

const list = [
    //app
    "|",
    "blender",
    "3dsmax",
    "zbrush",
    "photoshop",
    "unreal5",
    "adobe premier",
    "autocad",
    "|",
    //general
    "video",
    "cad",
    "normal map",
    "texture"
]

const speed = list.length + "s";

</script>

<template>
    <h3>{{ props.title }}</h3>
    <div class="myBanner" ref="my-parent">
        <div>
            <template v-for="n of list">
                <span>{{ n }}</span>
            </template>
        </div>
        <div>
            <template v-for="n of list">
                <span>{{ n }}</span>
            </template>
        </div>
        <div>
            <template v-for="n of list">
                <span>{{ n }}</span>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.myBanner {
    display: flex;
    gap: 2rem;
    margin-bottom: 1rem;
    overflow: hidden;

    > div {
        transform: translate3d(0, 0, 0);
        display: flex;
        gap: 2rem;
        
        position: relative;
        animation: slide v-bind(speed) linear 0s infinite forwards;
        animation-play-state: running;

        >span{
            text-wrap: nowrap;
        }
    }
}

@keyframes slide {
    100% {
        transform: translateX(calc(-100% - 2rem));
    }
}
</style>