<template>
    <header>
        <div class="toolbar" :class="{ vert: vert }" :shadow="shadow">
            <div class="toolbar-background" :style="{background:background,opacity:vert==undefined?1:''}"></div>
            <div @click="action" v-html="icon"></div>
            <title>
                <div><slot></slot></div>
            </title>
        </div>
    </header>
</template>
<script>
import menu from '../vuex/menu'
export default {
    data() {
            return {
                icon: '<em></em>'
            }
        },
        replace: true,
        props: ['vert', 'background', 'shadow', 'history'],
        methods: {
            action() {
                //this.action();
                this.history ? this.$router.go(-1) : menu.open();
            },
        },
        mounted() {
            this.history ? this.icon = '&nbsp;返回' : '<em></em>';
        }
};
</script>
<style lang="scss">
header {
    left: 0;
    top: 0;
    position: absolute;
    z-index: 10;
    display: block;
    width: 100%;
}

.toolbar {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    color: #fff;
    //background:#12C287;
    background: rgba(0, 0, 0, 0);
    padding: 4px;
    min-height: 45px;
    height: 45px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 100%;
    &[shadow=true] {
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    }
    contain: content;
    .toolbar-background {
        left: 0;
        top: 0;
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        border: 0;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        pointer-events: none;
        contain: strict;
        background: #5dd5ca;
        opacity: 0;
        transition: opacity 1s;
        -webkit-transition: opacity 1s;
    }
    &.vert {
        .toolbar-background {
            opacity: 1;
        }
    }
    button {
        padding: 16px;
        color: #fff;
        background: transparent;
        border: none;
    }
    title {
        left: 0;
        top: 0;
        padding-left: 90px;
        padding-right: 90px;
        padding-top: 0;
        padding-bottom: 1px;
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        pointer-events: none;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        &>div {
            font-size: 1.8rem;
            font-weight: 600;
            text-align: center;
            width: 100%;
        }
    }
    em,
    em:after,
    em:before {
        position: absolute;
        width: 22px;
        height: 0;
        left: 14px;
        top: 22px;
        border-top: solid 3px #fff
    }
    em:after,
    em:before {
        content: "";
        left: 0;
        top: -10px
    }
    em:before {
        top: 4px
    }
}
</style>
