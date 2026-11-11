<template>
    <div>
        <h1>This is test remote layer component page</h1>
        <!--這是遠端layer專案的組件-->
        <TestCard />
        <!--這是遠端layer專案的組件-->
        <RemoteLayerComp :name="'測試遠端layer組件'" :callback="callback" @counter="onCounter" />
    </div>
</template>

<script setup lang="ts">
function callback() {
    console.log('遠端組件調用此方法')
}

function onCounter(count: number) {
    console.log('counter觸發累計', count)
}
</script>