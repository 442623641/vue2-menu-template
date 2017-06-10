<template>

	<transition name="views" v-if="views">
		<div :views="views" v-show="path===this.$route.fullPath">
	    	<slot></slot>
	    	<aside class="backdrop" v-if="routChange"></aside>
	    </div>
	</transition>

	<transition name="page" v-else>
		<div :page="page">
	    	<slot></slot>
	    </div>
	</transition>
</template>
<script>
	export default {
    name: 'view',
    props: ['page','views'],
    data () {
    	return {
    		routChange:false,
    		transitionName:1,
    		path:'/',
    	}
    },
    watch: {
		$route:function (to, from) {
			const toDepth = to.path.length
		    const fromDepth = from.path.length
		    this.transitionName = toDepth < fromDepth ? -1 : 1
		    this.routChange=true;
			setTimeout(()=>this.routChange=false,350);
		}
	},
	mounted () {

		this.path=this.$route.fullPath;
		console.log(this.path);

	}
}
</script>
<style lang="scss">
	@import '../../static/scss/mixin.scss';
	[page],[views]{
	    width:100%;
	    height:100%;
	    position:absolute;
	}
	.willChange {
	    will-change: transform, -webkit-transform, opacity;
	}

	$cubic:cubic-bezier(0, 0, 0.2, 1); //cubic-bezier(0,0.2,0.4,1);
	.page-enter-active,
	.page-leave-active,
	.views-enter-active,
	.views-leave-active,
	 {
	    @include transition(all 350ms $cubic);
	    @extend .willChange;
	}
	.page-enter-active,
	.views-enter-active {
	    @include transform(translate3d(0, 0, 0));
	    @include opacity(1);
	    .backdrop{
	    	@include opacity(0);
	    }
	}

	.page-enter,
	.page-leave-active {
	    @include transform(translate3d(100%, 0, 0));
	    @include opacity(0.65);
	    
	}

	.page-leave{
	    @include transition(all 450ms cubic-bezier(0.4, 0, 0.6, 1));
	    @extend .willChange;
	    @include transform(translate3d(0, 0, 0));
	    @include opacity(1);

	}

	.views-enter{
		@include transition(all 450ms cubic-bezier(0, 0.6, 0.4, 1));
	    @extend .willChange;
	    @include transform(translate3d(-50%, 0, 0));
	    @include opacity(0.65);

	    .backdrop{
	    	@include transition(all 450ms cubic-bezier(0, 0.6, 0.4, 1));
	    	@extend .willChange;
	    	@include opacity(0.35);
	    }
	}


	.views-leave {
	    @include transition(all 450ms cubic-bezier(0, 0.6, 0.4, 1));
	    @extend .willChange;
	    @include transform(translate3d(0, 0, 0));
	    @include opacity(1);
	}

	.views-leave-active {
	    @include transform(translate3d(-50%, 0, 0));
	    @include opacity(0.65);
	}

</style>
