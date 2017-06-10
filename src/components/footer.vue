<template>
    <div class="pro-footer">
        <div class="footer-list-lk">
            <a class="footer-cell" href="http://static.zhongan.com/website/app/html/downLoadLink/build/html/index.html?channel=SHOUGUANXIAZAI">下载APP</a>
            <a class="footer-cell" href="//m.zhongan.com/open/feedback">意见反馈</a>
            <a class="footer-cell" href="//m.zhongan.com/open/channel/about">关于众安</a>
        </div>
    </div>
</template>
<script>
export default {
    replace: true,
}
</script>
<style lang="scss" scoped>
.pro-footer {
    padding: 16px;
}

.pro-footer .footer-cell {
    color: #909090;
    font-size: .85786rem
}

.pro-footer .footer-list-lk {
    width: 100%;
    display: table;
    background: #fff;
    border-radius: .35786rem;
    text-align: center
}

.pro-footer .footer-list-lk .footer-cell {
    position: relative;
    display: table-cell;
    height: 2.85786rem;
    line-height: 2.85786rem
}

.pro-footer .footer-list-lk .footer-cell:after {
    display: block;
    content: "";
    border-right: 1px solid #d8d8d8;
    position: absolute;
    right: 0;
    top: 1.07214rem;
    height: .715rem;
    width: 1px
}

.pro-footer .footer-list-lk .footer-cell:last-of-type:after {
    display: none
}

.pro-footer .footer-list-tp {
    margin: 0 auto;
    display: table;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding: .35786rem 0 1.07214rem
}

.pro-footer .footer-list-tp .footer-cell {
    display: table-cell;
    line-height: 1.00071rem;
    height: 1.00071rem;
    vertical-align: middle;
    position: relative;
    padding: 0 0 0 1.42929rem
}

.pro-footer .footer-list-tp .footer-cell.wap:after {
    display: inline-block;
    content: "";
    border-right: 1px solid #d8d8d8;
    height: 1.00071rem;
    width: 1px;
    margin: 0 .715rem;
    vertical-align: middle
}

.pro-footer .footer-list-tp .footer-cell.pc {
    margin-left: .715rem
}
</style>
