<style lang="scss" scoped>
.shortcuts {
    height: 150px;
    padding: 10px;
    margin-bottom: 20px;
    background: #fff;
    .topic-cell {
        display: inline-block;
        width: 33.3%;
        float: left
    }
    .topic-cell:nth-of-type(3n) {
        width: 33.4%
    }
    .topic-cell .topic {
        margin: .55rem;
        border-radius: 4px;
        height: 4.54rem;
        position: relative;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%
    }
}
</style>

<template>
    <div class="shortcuts clear">
        <div class="topic-cell">
            <a href="https://m.zhongan.com/open/product/topic/proTopic?channelEnName=mobile_prorecom_carebaby">
                <div class="topic topic-invest" style="background-image:url(https://static.zhongan.com/upload/mobile/material/1477987917350.png)"></div>
            </a>
        </div>
        <div class="topic-cell">
            <a href="https://m.zhongan.com/open/product/topic/proTopic?channelEnName=mobile_prorecom_careadult">
                <div class="topic topic-invest" style="background-image:url(https://static.zhongan.com/upload/mobile/material/1477988125313.png)"></div>
            </a>
        </div>
        <div class="topic-cell">
            <a href="https://m.zhongan.com/open/product/topic/proTopic?channelEnName=mobile_prorecom_employeework">
                <div class="topic topic-invest" style="background-image:url(https://static.zhongan.com/upload/mobile/material/1477988347845.png)"></div>
            </a>
        </div>
        <div class="topic-cell">
            <a href="https://m.zhongan.com/open/product/topic/proTopic?channelEnName=mobile_prorecom_travelexpert">
                <div class="topic topic-invest" style="background-image:url(https://static.zhongan.com/upload/mobile/material/1477988385659.png)"></div>
            </a>
        </div>
        <div class="topic-cell">
            <a href="https://m.zhongan.com/open/product/topic/proTopic?channelEnName=mobile_prorecom_lovecar">
                <div class="topic topic-invest" style="background-image:url(https://static.zhongan.com/upload/mobile/material/1477988428254.png)"></div>
            </a>
        </div>
        <div class="topic-cell">
            <a href="https://m.zhongan.com/open/product/topic/proTopic?channelEnName=mobile_prorecom_investexpert">
                <div class="topic topic-invest" style="background-image:url(https://static.zhongan.com/upload/mobile/material/1488420386007.png)"></div>
            </a>
        </div>
    </div>
</template>
<script>
export default {
    replace: true,
}
</script>

