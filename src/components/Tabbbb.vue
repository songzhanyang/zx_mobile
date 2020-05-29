<template>
  <Tabs value="111">
        <TabPane v-for="item in arr" :key="item.id" :label="item.label" :name="item.id">{{item.label}}</TabPane>
    </Tabs>
</template>

<script>
export default {
    props: ['arr']
}
</script>

<style>

</style>