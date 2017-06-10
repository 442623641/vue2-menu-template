<template>
    <transition name="loading">
        <div v-if="show" class="i-loading">
            <div class="toast">
                <i class="loading icon-toast"></i>
                <p class="toast-content">{{text}}</p>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    data() {
            return {
                show: false,
                text: "加载中...",
                timer: null
            }
        },
        created() {
            this.$loading.on('loadingshow', event => {
                clearTimeout(this.timer);
                event = event || {};
                this.text = event.text || "加载中...";
                this.show = true;
                this.timer = event.time ? setTimeout(() => this.show = false, event.time) : null;
            });
            this.$loading.on('loadinghide', event => this.show = false);
        }
}
</script>
<style lang="scss" scoped>
@import '../../static/scss/mixin.scss';
.loadingr-enter-active {
    @include transition(all .5s cubic-bezier(0.4, 0, 0.6, 1));
    @include transform(translateY(0));
    opacity: 1;
    will-change: -webkit-transform, opacity;
}

.loading-enter {
    opacity: 0;
    @include transform(translateY(-50vh));
}

.loading-leave-active {
    // transition:all .5s;
    // -webkit-transition:all .5s;
    @include transition(all .5s cubic-bezier(0.4, 0, 0.6, 1));
    @include transform(translateY(50vh));
    // transform:translateY(50vh);
    // -webkit-transform:translateY(50vh);
    opacity: 0;
    will-change: -webkit-transform, opacity, transform;
}

.loading-leave {
    transform: translateY(0);
    -webkit-transform: translateY(0);
    opacity: 1;
}

.i-loading {
    position: absolute;
    z-index: 5000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: hsla(0, 0%, 7%, .7);
    height: 100px;
    width: 100px;
    text-align: center;
    border-radius: 6px;
    color: #fff;
    margin: auto;
}

.icon-toast.loading {
    margin: 20px 0 0;
    width: 38px;
    height: 38px;
    vertical-align: super;
}

.loading {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    -webkit-animation: rot 1s steps(12) infinite;
    animation: rot 1s steps(12) infinite;
    background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAABO1BMVEX///9aXFlbW1tdXV1fX19iZGFjY2NkYmVlZWWytLFra2ttbW1zc3N0dHRzdXJ0dnN6fHl7e3t8en18fnt9fX2CgoKChIGDg4OEhISEgoWEhoOFhYWLi4uMjouNjY309vOTk5OUlpOVlZWVl5SWlJezs7OanJmbm5udnZ2jo6OlpaWmpqarq6usqq2tra3z8/OytLGzs7O1tbW2tra6vLm8vLy8vru9vb2+vr6+vL/Dw8PEwsXExsPLy8vMzsvNzc3T09PU1tPV1dXb29vY3dfa3Nnc2t3c3Nzd3d3j4+Pi5OHk5OTl5eXr6+vq7Ons6u3t7e3z8/P19fX09vP29vb7+/v6/Pn7/fr8/Pz9/f36//n7//r8/vv9//z+/P/+/v76//n7/fr7//r8/Pz8/vv9/f39//z+/P/+/v4BUWsqAAAAYHRSTlMABQUHCQ4OEBAUFxohISMjKiosLCwxMzMzNjY2PT8/REZJSUtLS1BQUllbW2JlZWVsbG5udXV3d3d6foGBiIqKkZOTmJqampqaoaSkpKutra20trm5vcDAwMDCwsLCwsKegJjAAAABjElEQVQYGe3B6VbTUBgF0CNIxJTZIUoRAWW0IIOKAhUZChShFGurn34pRc5F3v8JLGth4w+arpvIL7I3wo2/fn4fMeyKob+DyPqUddUBRDXKc/L890vYWPtWeIErfcq66gAsHCqp07iSU1J3YGFYWFfBXwtfS/MIbH3pQripM5KniiZEMgjXLaS5+IwmhpfQyrJSvruI4WFmGrdTKt2OONbFyAyim1CS6sJC96cpBD7y0iQsHBhpQ8MbkqeahoW3UkSgo0JqAVZc/Kszu7eIRCIOZ1P2exBDgWQFUawczwF4oCR1DPaeyJmkgP4TkjoCe0+r9F0ABz5ZQhSzG6O4tHqUdZBI/A9jcx7iyCklAxszhTUEepU0ZVjoF+osGh5rrfbrJywMCfkBgVKt9mMbNvJ+5R4CnVvF97DjIHFz3mnRQzOvllNoIaM0ZTSRPTHluwi3SxrxcD0lOYJwiz6NOLheTqkuWsipTKLh0V7eQ2BlPY2W7iDgiDHiILoh1j1DdI6S2oEYBvfzHm7WH90WVaa3GYffAAAAAElFTkSuQmCC) no-repeat;
    background-size: 100%;
}

.toast-content {
    font-size: 1.4rem;
    font-weight: 600;
}

@-webkit-keyframes rot {
    0% {
        @include transform(rotate(0deg));
    }
    to {
        @include transform(rotate(1turn));
    }
}

@keyframes rot {
    0% {
        @include transform(rotate(0deg));
    }
    to {
        @include transform(rotate(1turn));
    }
}
</style>
