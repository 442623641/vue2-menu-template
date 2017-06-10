<template>
        <v-view :page="'about'">
            <i-header :shadow="true" :history="true">关于VUE</i-header>
            <v-scroll>
                <div style="background: #fff;">
                    <h3>Vue.js（读音 /vjuː/，类似于 view)</h3>
                    <br>
                    <p> 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和 Vue 生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。 如果你是有经验的前端开发者，想知道 Vue.js 与其它库/框架的区别，查看对比其它框架。
                    </p>
                    <br>
                    <p>
                        Vue 已经在全球范围内传播开来，核心团队成员甚至来自至少 6 个时区。论坛 已有 7 种语言，数字还在持续增长。我们许多文档都有积极维护的翻译。我们非常为 Vue 的国际影响力骄傲，但我们还能做得更好。 我希望现在你正在使用你的首选语言阅读这个句子。如果不是，你愿意帮我们实现它吗？ 如果你愿意的话，请随时为这些文档，或者官方维护的其他文档 fork 这个仓库，然后开始翻译吧。只要你取得了进展，就请在主仓库开一个 issue 或者 pull request，我们将号召更多的贡献者来帮助你。
                    </p>
                </div>
            </v-scroll>
         </v-view>
</template>
<script>
import view from '../components/view'
import iHeader from '../components/header'
export default {
    name: 'about',
    data() {
        return {name:'about'}
    },
    components: {
        iHeader,
        'v-view':view,
    },
    methods: {


    },
    created() {

    },
    mounted() {
        //console.log(this.$router);

    },
    beforeDestroy() {
        //console.log(this.$router);
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
[page=about] {
    .scroll-content {
      background:#fff;  
    }
}
</style>
