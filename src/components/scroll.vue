<template>
    <content :class="{'down':(state===0),'up':(state==1),refreshing:(state===2),touch:touching}">
      <svg class="svg refresher offset" viewBox="0 0 375 37" v-if="onRefresh&&enableRefresh" ref="refresher">
          <path class="line" stroke-width="3" fill="none" d="M0,1 187,1 a18,18 0 0,1 0,36 a18,18 0 0,1 -12.6,-30.6" ref="line"/>
          <path class="smile" stroke-width="3" fill="none" d="M176.61,25 Q187,14 197.39,25" ref="smile"/>
      </svg>
      <div class="scroll-content" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
          <!-- <div class="pull-refresh"></div> -->
              <!-- <slot name="pull-refresh"> -->
                <!--   <i class="icon"></i>
                  <span class="down-mess">下拉更新</span>
                  <span class="up-mess">松开更新</span>
                  <span class="refresh-mess">更新中</span> -->
              <!-- </slot> -->
          <!-- </div>             -->
          <slot></slot>
          <div class="infinite" v-if="onInfinite&&enableInfinite" ref="infinite">
              <slot name="infinite">
                  <span>加载中……</span>
              </slot>
          </div>
      </div>
    </content>
</template>
<script>
export default {
    props: {
        offset: {
            type: Number,
            default: 60
        },
        enableInfinite: {
            type: Boolean,
            default: true
        },
        enableScroll: {
            type: Boolean,
            default: false
        },
        enableRefresh: {
            type: Boolean,
            default: true
        },
        onScroll: {

          type: Function,
          default: undefined,
          required: false

        },

        onRefresh: {

            type: Function,
            default: undefined,
            required: false
        },
        onInfinite: {
            type: Function,
            default: undefined,
            require: false
        },
        cssStyles: {
          type: String,
          default: ''
        }
    },
    data() {
        return {
            top: 0,
            state: 0,
            touching: false,
            infiniteLoading: false,
            refresh:Object,
            infinite:Object,
            touchstart:Function,
            touchend:Function,
            touchmove:Function,
            scroll:Function,
        }
    },

    methods: {

        ttachEvents () {

            let element = this.$el;
            if(this.onRefresh){
              element.addEventListener("touchstart", this.touchstart, false);
              element.addEventListener("touchend", this.touchend, false);
              element.addEventListener("touchmove", this.touchmove, false);
              this.refresh=this.createRefresh();
            }
            if( this.onInfinite || this.infiniteLoading|| this.onScroll){
              this.infinite=this.createInfinite();
              element.addEventListener("scroll", this.scroll, false);
            }
        },

        removeEvents() {
            let element = this.$el;
            element.removeEventListener("touchstart", this.touchstart, false);
            element.removeEventListener("touchend", this.touchend, false);
            element.removeEventListener("touchmove", this.touchmove, false);
            element.removeEventListener("scroll", this.scroll, false);
        },
        initEvents () {
          let _this=this;

          this.touchstart=e=>{
            _this.refresh.startY = e.targetTouches[0].pageY
            _this.refresh.startScroll = _this.$el.scrollTop || 0
            _this.touching = true
          }
          this.touchmove=e=>{
            if (!_this.enableRefresh || _this.$el.scrollTop > 0 || !_this.touching ) {
                return
            }
            let diff = e.targetTouches[0].pageY - _this.refresh.startY - _this.refresh.startScroll
            diff > 0 && e.preventDefault()
            _this.top = Math.pow(diff, 0.8) + (_this.state == 2 ? _this.offset : 0)

            if (_this.state == 2) { // in refreshing
                return
            }

            _this.state=_this.top >= _this.offset? 1:0
            _this.refresh.ready(diff, e.targetTouches[0].pageX);
          }

          this.touchend=e=>{
              if (!_this.enableRefresh) return
              _this.touching = false
              if (_this.state === 2) { // in refreshing
                  _this.state = 2
                  _this.top = _this.offset
                  return
              }
              if (_this.top >= _this.offset) { // do refresh
                  _this.onRefresh(_this.refresh);
                  _this.refresh.refreshing()
              } else { // cancel refresh
                  _this.state = 0
                  _this.top = 0
              }
              
          }

          this.scroll=e=>{
            _this.onScroll&&_this.onScroll(e);

            if (!_this.enableInfinite || _this.infiniteLoading) {
                return
            }

            let outerHeight = _this.$el.clientHeight,
                innerHeight = _this.$el.firstChild.clientHeight,
                scrollTop = _this.$el.scrollTop,
                ptrHeight = _this.$refs.refresher ?_this.$refs.refresher.clientHeight : 0,
                infiniteHeight = _this.$refs.infinite.offsetHeight ,
                bottom = innerHeight - outerHeight - scrollTop - ptrHeight;
            bottom < infiniteHeight && _this.infinite.infiniting();//this.onInfinite(_this.infinite)

          }


        },

        createInfinite() {
          let _this=this;
          let Infinite=()=>{}
          Infinite.prototype.infiniting=()=>{
            _this.infiniteLoading = true
            _this.onInfinite(infinite);
          }
          Infinite.prototype.complete=()=>{
             this.infiniteLoading = false
          }
          let infinite= new Infinite();
          infinite.srcElement=this.$refs.infinite;
          return infinite;
        },


        createRefresh () {
            

            const _this=this,
                  $line = this.$refs.line, 
                  $smile = this.$refs.smile,
                  smileInit = "M176.61,25 Q187,19 197.39,25",
                  smileMid = "M176.61,25 Q187,25 197.39,25",
                  smileEnd = "M176.61,25 Q187,34 197.39,25",

                  totalLen = $line.getTotalLength(),
                  upperLen = 187,
                  circleLen = totalLen - upperLen,
                  minLineLen = 20,
                  lineDragBoundries = upperLen - minLineLen,

                  pullSlowCoef = 1.2,
                  maxPullY = 150,

                  resetAT = 500,
                  releaseStep1AT = 800;

            let animating = false,
                easings = {
                      elastic: function(t, b, c, d) {
                          var ts = (t /= d) * t;
                          var tc = ts * t;
                          return b + c * (33 * tc * ts + -106 * ts * ts + 126 * tc + -67 * ts + 15 * t);
                      },
                      inCubic: function(t, b, c, d) {
                          var tc = (t /= d) * t * t;
                          return b + c * (tc);
                      }
                  };

            function addClass(el, cl) {
                let regEx = new RegExp('(?:^|\\s)' + cl + '(?!\\S)', "gi");
                if (regEx.test(el.getAttribute("class"))) return;
                el.setAttribute("class", el.getAttribute("class") + " " + cl);
            };

            function removeClass(el, cl) {
                let regEx = new RegExp('(?:^|\\s)' + cl + '(?!\\S)', "gi");
                el.setAttribute("class", el.getAttribute("class").replace(regEx, ""));
            };

            function pathTween(from, to, time, easing) {
                time = time || 600;
                easing = easing || "elastic";

                let regex = /\d+(\.\d{1,2})?/g,
                    fromD = from.getAttribute("d"),
                    fm = fromD.match(regex),
                    tm = to.match(regex),
                    diff = [],
                    curFrame = 0,
                    frames = time / 1000 * 60,

                    animate=()=>{
                        if (curFrame > frames) return;
                        let i = 0;
                        let newD = fromD.replace(regex, function(m) {
                            if (+m === 0 || // if nothing changed - skip
                                i % 2 === 0) { // in this demo I want to animate only y values
                                i++;
                                return m;
                            }
                            return +easings[easing](curFrame, +fm[i], 0 - diff[i++], frames).toFixed(2);
                        });
                        from.setAttribute("d", newD);
                        curFrame++;
                        requestAnimationFrame(animate);
                    };
                fm.forEach((item,index)=> diff.push(+item - (+tm[index])));
                animate();
            };
            let Refresh=()=>{}

            Refresh.prototype.ready =(y, x) => {
              //debugger
                let pullY = (y <= maxPullY) ? y : maxPullY;
                if (pullY < 0) pullY = 0;
                let pullCoef = pullY / maxPullY;
                $line.style['strokeDashoffset'] = circleLen + pullCoef * lineDragBoundries;
            };

            function reset() {
                addClass($line, "reset");

                setTimeout(function() {
                    removeClass($line, "reset");
                    $line.setAttribute("style", "");
                    animating = false;
                }, resetAT);
            };

            Refresh.prototype.refreshing=()=> {
              _this.state = 2
              _this.top = _this.offset
              animating = true;

              addClass($line, "show-circle");
              setTimeout(function() {
                  addClass($line, "rotating");
              }, releaseStep1AT * 0.32);
              setTimeout(function() {
                  addClass($smile, "active");
                  setTimeout(function() {
                      pathTween($smile, smileMid, 300, "inCubic");
                      setTimeout(function() {
                          pathTween($smile, smileEnd, 300, "inCubic");
                          addClass($smile, "minified");
                      }, 500);
                  }, 700);
              }, resetAT);
            };

            Refresh.prototype.complete=()=>{

                removeClass($line, "rotating");
                removeClass($line, "show-circle");
                addClass($line, "reset");
                
                setTimeout(()=>{
                  _this.state = 0
                  _this.top = 0
                },300);

                setTimeout(()=>{
                    removeClass(_this.$refs.refresher, "offset");
                    removeClass($line, "reset");
                    $line.setAttribute("style", "");
                    removeClass($smile, "minified");
                    removeClass($smile, "active");
                    pathTween($smile, smileInit, 50, "inCubic");
                    animating = false;

                   
                }, resetAT);
            }
            //refresh.prototype.refreshing=refreshing;
            let refresh= new Refresh();
            refresh.state=this.state;
            refresh.startY= this.startY;
            refresh.srcElement= this.$refs.refresher;
            //this.$refs.refresher.style.top=`${this.offset}px`;
            return refresh;
        }
    },
    mounted() {
      //debugger
      this.$el.lastElementChild.className=`${this.cssStyles} scroll-content`;
      this.initEvents();
      this.ttachEvents();
      this.refresh.refreshing&&this.refresh.refreshing();
      this.onRefresh&&this.onRefresh(this.refresh);
       
    }
}
</script>
<style lang="scss">
content {

    $height: 45px;
    position: absolute;
    //margin-top:$height;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    contain: size style layout;
    will-change: scroll-position;
    //padding:16px;

    background: #f1f1f1;
    &::before,
    &::after {
        position: absolute;
        width: 1px;
        height: 1px;
        content: "";
    }
    &::before {
        bottom: -1px;
    }
    &::after {
        top: -1px;
    }
    &[has-header] {
        margin-top: $height;
    }
    .scroll-content {
        background: #f1f1f1;
        margin-top:$height;
        position: absolute;
        min-height: calc(100vh - 45px);
        min-height: -webkit-calc(100vh - 45px);
        width: 100%;
        padding:16px;
        transition-duration: 300ms;
        transform:translate3d(0,$height,0);
        &.fullscreen{
          min-height: 100vh;
        }
    }
    
    &.touch .scroll-content {
        transition-duration: 0ms;
    }
    .pull-refresh {
        position: relative;
        left: 0;
        top: 0;
        width: 100%;
        //height: $height;
        padding: 5px;
        line-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &.down .down-mess {
        display: block;
    }
    &.up .up-mess {
        display: block;
    }
    &.refreshing{
      overflow: hidden;
       .refresh-mess {
          display: block;
      }       
    }
    .down-mess,
    .refresh-mess,
    .up-mess {
        display: none;
    }
    .infinite {
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    $topH: $height;
    $lineColor: #4EDDC8;
    $totalLen: 285.53px;
    $lineLen: 187px;
    $circleLen: $totalLen - $lineLen;
    $resetAT: 0.5s;
    $releaseStep1AT: 0.5s;
    
    .refresher {
        overflow: visible;
        position: absolute;
        left: 0;
        width: 100%;
        height: $height;
        &.offset{
          transform: translateY(40vh);
          z-index: 1;
        }

        .line {
            stroke: $lineColor;
            stroke-dashoffset: $circleLen;
            stroke-dasharray: $totalLen, $totalLen;
            transform-origin: 187px 19px;
            &.show-circle {
                transition: stroke-dashoffset $releaseStep1AT*0.65;
                stroke-dashoffset: -$lineLen !important;
            }
            &.rotating {
                animation: rotating 0.5s infinite linear;
            }
            &.reset {
                transition: stroke-dashoffset $resetAT;
                stroke-dashoffset: $circleLen !important;
                //transform: rotate(0);
                transform: rotate(180deg);
            }
        }
        .smile {
            stroke: $lineColor;
            stroke-dashoffset: 30px;
            stroke-dasharray: 30px, 30px;
            transform-origin: 187px 19px;
            opacity: 0;
            transition: opacity 0.1s, stroke-dashoffset 0.5s;
            transition-delay: 0.2s;
            transform: rotate(0);
            &.active {
                opacity: 1;
                stroke-dashoffset: 0;
            }
            &.minified {
                transition: stroke-dashoffset 0.5s 0.85s, opacity 0.1s 1.25s;
                stroke-dashoffset: 25px;
                opacity: 0;
                animation: rotating 0.5s 0.35s infinite linear;
            }
        }
    }
    &.refreshing .refresher{
        height: 55px;
    }
    @keyframes rotating {
      to {
        transform: rotate(360deg);
      }
    }
}
</style>
