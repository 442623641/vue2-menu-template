<template>
    <section>
        <transition name="color">
            <aside class="backdrop" v-if="show" @click="close">
            </aside>
        </transition>
        <transition name="menu">
            <div id="menu" v-show="show">
                <div class="menu-inner">
                    <div class="log-rm">
                        <div class="not-login">
                            <a class="btn">注册</a>
                            <a class="btn active" style="float:right">登录</a>
                        </div>
                        <div class="btn tel tl" style="margin-top:20px">
                            <a href="tel:10109955"><span>1111-1111</span><br></a>
                            <a href="tel:4009999595"><span>400-400-4040</span><br></a>
                            <span>全国统一服务热线</span>
                        </div>
                    </div>
                    <div class="list">
                        <a class="home" @click="to('')">首页</a>
                        <span>Vue</span>
                        <a class="policySearch">Vue</a>
                        <a class="claim">Vue</a>
                        <span>Vue</span>
                        <a class="about" @click="to('fish')">一条鱼</a>
                        <a class="feedback">意见反馈</a>
                        <a class="about" @click="to('about')">关于Vue</a>
                    </div>
                </div>
            </div>
        </transition>
    </section>
</template>
<script>
import menu from '../vuex/menu'
export default {
    replace: true,
    data() {
        return {
            touchstart: null,
            touchend: null,
            touchmove: null,
            show: false,
        }
    },
    watch: {
        showMenu: function(show) {
            this.show = show;

        },
        show: function(show) {
            this.show ? this.ttachEvents() : this.removeEvents();
        }
    },

    methods: {
        close() {
            this.show = false;
            menu.close();
        },
        ttachEvents() {
            let element = this.$el.lastElementChild;
            element.addEventListener("touchstart", this.touchstart, false);
            element.addEventListener("touchend", this.touchend, false);
            element.addEventListener("touchmove", this.touchmove, false);
            element.addEventListener("touchcancel", this.touchmove, false);
        },
        removeEvents() {
            let element = this.$el.lastElementChild;
            element.removeEventListener("touchstart", this.touchstart, false);
            element.removeEventListener("touchend", this.touchend, false);
            element.removeEventListener("touchmove", this.touchmove, false);
            element.removeEventListener("touchcancel", this.touchend, false);
        },
        to(name, params) {
            this.close();
            setTimeout(() => this.$router.push({
                name: name,
                params: params
            }), 260);
        }
    },

    props: ['swipeEnable'],

    mounted() {
        menu.on('menuopen', event => this.show = true);

        //debugger
        let width = this.$root.$el.offsetWidth,
            targetElement = this.$el.lastElementChild;

        let transform = (translate) => {
            translate = translate || '';
            targetElement.style.transform = translate;
            targetElement.style.webkitTransform = translate;
        }
        let opacity = (opacity) => {
            this.$el.firstElementChild.style.opacity = opacity < 0 ? '' : opacity;
        }

        //touch事件
        let touch = () => {
            let _this = this,
                startx, disX, startTimeStamp, isMove = false;

            this.touchmove = e => {

                disX = e.touches[0].pageX - startx;
                isMove = !(disX == NaN || e.timeStamp - startTimeStamp < 200);

                if (!isMove || disX >= 0 || -disX >= width) return;

                transform(`translateX(${disX}px)`);
                opacity(0.35 * (width + disX) / width);
                e.preventDefault();
            }

            this.touchstart = e => {
                startx = e.touches[0].pageX;
                startTimeStamp = e.timeStamp;
            }

            this.touchend = e => {



                if (!isMove) return;
                if (-disX > width / 2) {
                    transform('translateX(-100%)');
                    _this.close();
                } else {
                    transform('translateX(0)');
                }

                setTimeout(() => transform(), 360);
            }
        }
        touch();

    },
    beforeDestroy() {
        this.removeEvents();
    }
};
</script>
<style lang="scss">
@import '../../static/scss/menu.scss';
</style>
