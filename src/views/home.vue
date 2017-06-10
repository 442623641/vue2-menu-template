<template>
    <section>
        <v-view :views="'home'">
            <v-header :vert="vert">Vue</v-header>
            <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :onScroll="onScroll" :cssStyles="'fullscreen no-padding'">
                <transition-group name='section'>
                    <swiper :items="banner" v-if="productions.length" :key="'swiper'"></swiper>
                    <shortcuts v-if="productions.length" :key="'shortcuts'"></shortcuts>
                    <div v-if="productions.length" :key="'list'" class="vlist">
                        <v-list :items="productions" :more="more"></v-list>
                        <v-footer></v-footer>
                    </div>
                </transition-group>
            </v-scroll>
        </v-view>
        <router-view></router-view>
    </section>
</template>
<script>
// import View from '../components/view'
import Header from '../components/header'
// import Scroll from '../components/scroll';
import Swiper from '../components/swiper'
import Shortcuts from '../components/shortcuts'
import List from '../components/list'
import Footer from '../components/footer'
export default {
    name: 'home',
    data() {
        return {
            banner: [],
            vert: false, //头部背景色控制
            rows: 10, // 一次显示多少条
            start: 0, // 开始行数
            productions: [],
            more: [] // 上拉更多的数据存放数组
        }
    },
    components: {
        //'v-view': View,
        'v-header': Header,
        //'v-scroll': Scroll,
        Swiper,
        Shortcuts,
        'v-list': List,
        'v-footer': Footer,
    },
    methods: {
        getList() {
            return this.$http.getProductions().then(res => {
                return res;
            })
        },
        onbeforeunload() {
            return window.onbeforeunload = () => {
                this.$loading.show("正在前往...", 3000);
            }
        },
        destroyEvents() {
            window.onbeforeunload = null;
            this.content = null
        },
        onScroll(event) {
            let top = event.target.scrollTop;
            if (top > 160) this.vert = true
            else if (top < 200) this.vert = false
        },
        onRefresh($refresh) {
            console.log('start refresh');
            this.$http.getBanners().then(res => {
                this.banner = res;
            });

            this.getList().then((res) => {
                this.more.length = 0;
                this.start = 0;
                this.productions = res.slice(this.start, this.rows);
                $refresh && $refresh.complete();

                this.$loading.hide();
                console.log('refresh complete');
            });

            // call done
        },
        onInfinite($infinite) {
            console.log('infinite start');
            this.getList().then((res) => {
                this.start++;
                this.more = this.more.concat(res);
                $infinite.complete();
                console.log(`infinite start ${this.start} rows ${this.rows}`)
            });
        }
    },
    mounted() {

        //this.$loading.show();
        //this.onRefresh();
        this.onbeforeunload();

    },
    beforeDestroy() {
        this.destroyEvents()
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../static/scss/mixin.scss';
@mixin enter-active($property, $duration) {
    @include transform($property);
    @include transition(all $duration cubic-bezier(0.4, 0, 0.6, 1));
    will-change: transform, -webkit-transform;
}

$transition-duration:280ms;
.section-enter-active.carousel {
    @include enter-active(translateY(0), $transition-duration);
}

.section-enter.carousel {
    @include transform(translateY(-300px))
}

.section-enter-active.shortcuts {
    @include enter-active(translateX(0), $transition-duration);
}

.section-enter.shortcuts {
    @include transform(translateX(100%))
}

.section-enter-active.vlist {
    @include enter-active(translateX(0), $transition-duration);
}

.section-enter.vlist {
    @include transform(translateX(-100%))
}
</style>
