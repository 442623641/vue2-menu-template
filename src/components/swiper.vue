<template>
    <div class="carousel" :action="action">
        <transition-group tag='ul' class="clearfix slide" name='image'>
            <li v-for='(image,index) in items' :key='index' v-show='index===mark'>
                <a :href="image.adsUrl"><img :src="image.filePath"></a>
            </li>
        </transition-group>
        <div class="bullet">
            <span v-for='(item,index) in items.length' :class="{'active':index===mark}" @click='change(index)'></span>
        </div>
    </div>
</template>
<script>
export default {
    replace: true,
    props: {
        items: Array,
    },
    data() {
        return {
            mark: 0,
            timer: null,
            timeout: null,
            action: "next",
            touchstart: null,
            touchend: null,
        }
    },
    mounted() {
        this.play();
        //touch事件
        let touch = () => {
            let _this = this,
                startx, starty;
            //获得角度
            function getAngle(angx, angy) {
                return Math.atan2(angy, angx) * 180 / Math.PI;
            };
            //根据起点终点返回方向
            function getDirection(startx, starty, endx, endy) {
                var angx = endx - startx;
                var angy = endy - starty;
                var result = 0;

                //如果滑动距离太短
                if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
                    return result;
                }

                var angle = getAngle(angx, angy);
                console.log(angle);
                if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                    _this.next();
                } else if (angle >= -45 && angle <= 45) {
                    _this.prev();
                }
            }

            //this.nativeElement=document.querySelector('.carousel');
            this.touchstart = e => {
                startx = e.touches[0].pageX;
                starty = e.touches[0].pageY;
            }
            this.touchend = e => {
                let endx, endy;
                endx = e.changedTouches[0].pageX;
                endy = e.changedTouches[0].pageY;
                getDirection(startx, starty, endx, endy);
            }
        }
        touch();
        this.$el.addEventListener("touchstart", this.touchstart, false);
        this.$el.addEventListener("touchend", this.touchend, false);

    },
    methods: {
        //切换
        change(i) {
            this.mark = i % this.items.length
            console.log(this.mark)
        },
        //自动切换
        autoPlay() {
            this.mark++
                this.mark = this.mark % this.items.length
        },
        //停止切换
        stopPlay() {
            clearInterval(this.timer);
            clearTimeout(this.timeout);
        },
        //开始切换
        play() {
            this.timer = setInterval(this.autoPlay, 3000);
        },
        //前一张
        prev() {
            this.action = "prev";
            this.stopPlay();
            this.change((this.mark || this.items.length) - 1);
            this.play();
        },
        //下一张
        next() {
            this.action = "next";
            this.stopPlay();
            this.change(this.mark + 1);
            this.play();
        }
    },
    beforeDestroy() {
        this.$el.removeEventListener("touchstart", this.touchstart, false);
        this.$el.removeEventListener("touchend", this.touchend, false);
    }
}
</script>
<style lang="scss" scoped>
@import '../../static/scss/mixin.scss';
.clearfix {
    content: '';
    clear: both;
    display: block;
}

.carousel {
    height: 200px;
    width: 100vw;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.slide {
    height: 200px;
    width: 100vw;
}

li {
    position: absolute;
    list-style: none;
}

img {
    height: 200px;
    width: 100vw;
}

.bullet {
    width: 100%;
    position: absolute;
    bottom: 10px;
    margin: 0 auto;
    text-align: center;
    z-index: 10;
}

span {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    background: #fff;
    opacity: 0.4;
    margin: 0 5px;
    &.active {
        opacity: 0.8
    }
}

.image-enter-active {
    @include transform(translateX(0));
    @include transition(all 1s ease);
    will-change: transform, -webkit-transform;
}

[action=next] {
    .image-enter {
        @include transform(translateX(100%));
    }
    .image-leave-active {
        @include transform(translateX(-100%));
        @include transition(all 1s ease);
        will-change: transform, -webkit-transform;
    }
}

[action=prev] {
    .image-enter {
        @include transform(translateX(-100%));
    }
    .image-leave-active {
        @include transform(translateX(100%));
        @include transition(all 1s ease);
        will-change: transform, -webkit-transform;
    }
}

.image-leave {
    @include transform(translateX(0));
}
</style>
