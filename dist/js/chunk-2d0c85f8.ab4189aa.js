(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c85f8"],{5535:function(n,t,e){"use strict";e.r(t);var s=e("7a23"),a={class:"container"},o={class:"jumbotron"};function c(n,t,e,c,r,d){return Object(s["s"])(),Object(s["d"])("div",a,[Object(s["g"])("header",o,[Object(s["g"])("h3",null,Object(s["C"])(r.content),1)])])}e("d3b7"),e("25f0");var r=e("1f57"),d=e("30ef"),u={name:"Admin",data:function(){return{content:""}},mounted:function(){var n=this;r["a"].getAdminBoard().then((function(t){n.content=t.data}),(function(t){n.content=t.response&&t.response.data&&t.response.data.message||t.message||t.toString(),t.response&&403===t.response.status&&d["a"].dispatch("logout")}))}};u.render=c;t["default"]=u}}]);
//# sourceMappingURL=chunk-2d0c85f8.ab4189aa.js.map