<template>
    <div id="app">
        <i-menu :swipeEnable="true"></i-menu>
        <home></home>
        <loading></loading>
    </div>
</template>
<script>
import home from './views/home'
import iMenu from './components/menu'
import loading from './components/loading'

export default {
    name: 'app',
    components: {
        iMenu,
        loading,
        home
    },
}
</script>
<style lang="scss">
@import '../static/scss/main.scss';
</style>
