(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{735:function(t,e,n){var content=n(762);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("21508608",content,!0,{sourceMap:!1})},761:function(t,e,n){"use strict";n(735)},762:function(t,e,n){var o=n(16)(!1);o.push([t.i,".finedTitle[data-v-26a47956]{font-weight:900;text-shadow:2px 2px #000}.social-icon[data-v-26a47956]{font-size:21px;color:#fff}",""]),t.exports=o},763:function(t,e,n){var content=n(764);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("0cd63bd9",content,!0,{sourceMap:!1})},764:function(t,e,n){var o=n(16)(!1);o.push([t.i,".v-parallax{position:relative;overflow:hidden;z-index:0}.v-parallax__image-container{position:absolute;top:0;left:0;right:0;bottom:0;z-index:1;contain:strict}.v-parallax__image{position:absolute;bottom:0;left:50%;min-width:100%;min-height:100%;display:none;transform:translate(-50%);will-change:transform;transition:opacity .3s cubic-bezier(.25,.8,.5,1);z-index:1}.v-parallax__content{color:#fff;height:100%;z-index:2;position:relative;display:flex;flex-direction:column;justify-content:center;padding:0 1rem}",""]),t.exports=o},796:function(t,e,n){"use strict";n.r(e);var o={name:"App",data:function(){return{imageLink:{sub_main:"https://www.prensalibre.com/wp-content/uploads/2020/01/Antigua-Guatemala-8.jpg"},subscribed:!1}},layout:"empty",methods:{},computed:{},mounted:function(){this.$api.post("/verificacion",{tag:this.$route.query.tag}).then((function(t){console.log("RESPUESTA ----------------------\x3e ",t)})).catch((function(t){return console.log(t)}))}},r=(n(761),n(27)),l=n(102),c=n.n(l),h=n(698),d=n(152),f=n(701),m=n(702),w=(n(18),n(763),n(3).a.extend({name:"translatable",props:{height:Number},data:function(){return{elOffsetTop:0,parallax:0,parallaxDist:0,percentScrolled:0,scrollTop:0,windowHeight:0,windowBottom:0}},computed:{imgHeight:function(){return this.objHeight()}},beforeDestroy:function(){window.removeEventListener("scroll",this.translate,!1),window.removeEventListener("resize",this.translate,!1)},methods:{calcDimensions:function(){var t=this.$el.getBoundingClientRect();this.scrollTop=window.pageYOffset,this.parallaxDist=this.imgHeight-this.height,this.elOffsetTop=t.top+this.scrollTop,this.windowHeight=window.innerHeight,this.windowBottom=this.scrollTop+this.windowHeight},listeners:function(){window.addEventListener("scroll",this.translate,!1),window.addEventListener("resize",this.translate,!1)},objHeight:function(){throw new Error("Not implemented !")},translate:function(){this.calcDimensions(),this.percentScrolled=(this.windowBottom-this.elOffsetTop)/(parseInt(this.height)+this.windowHeight),this.parallax=Math.round(this.parallaxDist*this.percentScrolled)}}})),x=n(4),v=Object(x.a)(w).extend().extend({name:"v-parallax",props:{alt:{type:String,default:""},height:{type:[String,Number],default:500},src:String,srcset:String},data:function(){return{isBooted:!1}},computed:{styles:function(){return{display:"block",opacity:this.isBooted?1:0,transform:"translate(-50%, ".concat(this.parallax,"px)")}}},mounted:function(){this.init()},methods:{init:function(){var t=this,img=this.$refs.img;img&&(img.complete?(this.translate(),this.listeners()):img.addEventListener("load",(function(){t.translate(),t.listeners()}),!1),this.isBooted=!0)},objHeight:function(){return this.$refs.img.naturalHeight}},render:function(t){var e=t("div",{staticClass:"v-parallax__image-container"},[t("img",{staticClass:"v-parallax__image",style:this.styles,attrs:{src:this.src,srcset:this.srcset,alt:this.alt},ref:"img"})]),content=t("div",{staticClass:"v-parallax__content"},this.$slots.default);return t("div",{staticClass:"v-parallax",style:{height:"".concat(this.height,"px")},on:this.$listeners},[e,content])}}),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{light:""}},[n("v-main",[n("section",[n("v-parallax",{attrs:{src:t.imageLink.sub_main,height:"800"}},[n("v-layout",{staticClass:"white--text",attrs:{column:"","align-center":"","justify-center":""}},[n("h1",{staticClass:"white--text mb-2 display-1 text-xs-center",staticStyle:{"font-weight":"900","text-shadow":"3px 2px #000000"}},[t._v("Bienvenido a la familia Antigua Travel, Comencemos...")]),t._v(" "),n("v-btn",{staticClass:"blue lighten-2 mt-5",attrs:{dark:"",large:"",href:"/"}},[t._v("\n                    Inicio\n                    ")])],1)],1)],1)])],1)}),[],!1,null,"26a47956",null);e.default=component.exports;c()(component,{VApp:h.a,VBtn:d.a,VLayout:f.a,VMain:m.a,VParallax:v})}}]);