<template>
    <div>
        <h1>This is test remote layer component page</h1>
        <!--這是遠端layer專案的組件-->
        <TestCard />
        <!--這是遠端layer專案的組件-->
        <RemoteLayerComp :name="'測試遠端layer組件'" :callback="callback" @counter="onCounter" />
        <!--這是遠端layer專案的組件(import的dayjs是esm版本，因為存在於.c12的node_modules之下，主應用的 Vite 會當作已經轉換過的)-->
        <DateComp :format-pattern="'MM.DD.YY'" :locale="'ko'" :date="'2026-12-24'" />
    </div>
</template>

<script setup lang="ts">

const locale = ref<'en' | 'ko' | 'th'>('ko')
// 這是遠端layer專案的composable
const { format, fromNow } = useDate(locale)

function callback() {
    console.log('遠端組件調用此方法')
}

function onCounter(count: number) {
    console.log('counter觸發累計', count)
}

onMounted(() => {
    // 測試遠端layer提供的composable
    console.log('test dayjs hook', format(new Date(2020, 0, 1, 18, 50, 30), 'HH:mm:ss(YYYY.MM.DD)'))
    console.log('test dayjs hook', fromNow(new Date(2022, 0, 1, 18, 50, 30)))
})
</script>