<template>
    <div>
        <ul class="list">
            <li class="item" v-for="item in items">
                <div class="pic">
                    <a :href="item.adsUrl">
                        <div class="img">
                            <img :src="item.filePath">
                        </div>
                    </a>
                </div>
                <div class="box">
                    <h3 class="short">{{item.title}}</h3>
                    <p>{{item.summary}}</p>
                    <p class="bt"><b><em class="yen">￥</em>{{item.startingPrice}}</b><span class="status">  {{item.id}}</span>
                    </p>
                </div>
            </li>
            <li class="item" v-for="item in more">
                <div class="pic">
                    <a :href="item.adsUrl">
                        <div class="img">
                            <img :src="item.filePath">
                        </div>
                    </a>
                </div>
                <div class="box">
                    <h3 class="short">{{item.title}}</h3>
                    <p>{{item.summary}}</p>
                    <p class="bt"><b><em class="yen">￥</em>{{item.startingPrice}}</b><span class="status">  {{item.id}}</span>
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    replace: true,
    props: {
        items: Array,
        more: Array,
    },
}
</script>
<style lang="scss">
ul.list {
    overflow: hidden;
    list-style-type: none;
    display: inline-block;
    .item {
        margin-bottom: 1.33%;
        width: 49.33%;
        float: right;
        background: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, .12);
        font-size: 12px;
        &:nth-child(2n) {
            float: left;
        }
        .pic {
            position: relative;
            width: 100%;
            background: #F1F1F1;
        }
        .img {
            position: relative;
            padding-bottom: 70%;
        }
        img {
            position: absolute;
            width: 100%;
        }
        .merits {
            position: absolute;
            right: 6px;
            bottom: 2px;
            left: 10px;
            .merit .merit-info {
                display: inline-block;
                border-radius: 3px;
                background: rgba(0, 0, 0, .75);
                line-height: 12px;
                padding: 3px 5px;
                max-width: 100%;
                box-sizing: border-box;
                color: #fff;
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .box {
            padding: 5px 10px;
            height: 110px;
        }
        h3.short {
            -webkit-line-clamp: 1;
            max-height: 18px;
            min-height: 18px;
            height: 18px;
            color: #666;
        }
        .box .bt {
            clear: both;
            overflow: hidden;
            b {
                color: #0eac76;
            }
        }
        .items-normal-m .box .bt b {
            color: #e61414;
            font-size: 20px;
            float: left;
        }
        p {
            color: #999;
            padding: 5px 0;
        }
        .bt .status {
            overflow: hidden;
            // display: block;
            font-size: 12px;
            color: #999;
            line-height: 28px;
            height: 24px;
            white-space: nowrap;
            text-align: right;
            padding-left: 5px;
        }
    }
}
</style>
