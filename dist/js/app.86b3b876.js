(function(e){function t(t){for(var r,o,c=t[0],u=t[1],i=t[2],l=0,g=[];l<c.length;l++)o=c[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&g.push(a[o][0]),a[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);d&&d(t);while(g.length)g.shift()();return s.push.apply(s,i||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],r=!0,o=1;o<n.length;o++){var u=n[o];0!==a[u]&&(r=!1)}r&&(s.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},s=[];function o(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-2d0a4c1e":"998ab2de","chunk-2d0c85f8":"ab4189aa","chunk-2d0d03d6":"e4ee8262"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n=a[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=a[e]=[t,r]}));t.push(n[2]=r);var s,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=o(e);var i=new Error;s=function(t){u.onerror=u.onload=null,clearTimeout(l);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src;i.message="Loading chunk "+e+" failed.\n("+r+": "+s+")",i.name="ChunkLoadError",i.type=r,i.request=s,n[1](i)}a[e]=void 0}};var l=setTimeout((function(){s({type:"timeout",target:u})}),12e4);u.onerror=u.onload=s,document.head.appendChild(u)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],i=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var d=i;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"185f":function(e,t,n){},"1f57":function(e,t,n){"use strict";var r=n("d4ec"),a=n("bee2"),s=n("7424"),o=function(){function e(){Object(r["a"])(this,e)}return Object(a["a"])(e,[{key:"getPublicContent",value:function(){return s["a"].get("/test/all")}},{key:"getUserBoard",value:function(){return s["a"].get("/test/user")}},{key:"getAdminBoard",value:function(){return s["a"].get("/test/admin")}}]),e}();t["a"]=new o},"30ef":function(e,t,n){"use strict";var r={on:function(e,t){document.addEventListener(e,(function(e){return t(e.detail)}))},dispatch:function(e,t){document.dispatchEvent(new CustomEvent(e,{detail:t}))},remove:function(e,t){document.removeEventListener(e,t)}};t["a"]=r},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),a={id:"app"},s={class:"navbar navbar-expand navbar-dark bg-dark"},o=Object(r["g"])("a",{href:"/",class:"navbar-brand"},"TeamBuilder",-1),c={class:"navbar-nav mr-auto"},u={class:"nav-item"},i=Object(r["f"])(" Home "),l={key:0,class:"nav-item"},d=Object(r["f"])("Admin Board"),g={class:"nav-item"},b=Object(r["f"])("User Check"),f={key:0,class:"navbar-nav ml-auto"},m={class:"nav-item"},p=Object(r["f"])(" Sign Up "),O={class:"nav-item"},j=Object(r["f"])(" Login "),v={key:1,class:"navbar-nav ml-auto"},h={class:"nav-item"},k={class:"nav-item"},y=Object(r["f"])(" LogOut "),w={class:"container"};function S(e,t,n,S,I,_){var P=Object(r["z"])("font-awesome-icon"),U=Object(r["z"])("router-link"),L=Object(r["z"])("router-view");return Object(r["s"])(),Object(r["d"])("div",a,[Object(r["g"])("nav",s,[o,Object(r["g"])("div",c,[Object(r["g"])("li",u,[Object(r["g"])(U,{to:"/home",class:"nav-link"},{default:Object(r["I"])((function(){return[Object(r["g"])(P,{icon:"home"}),i]})),_:1})]),_.showAdminBoard?(Object(r["s"])(),Object(r["d"])("li",l,[Object(r["g"])(U,{to:"/admin",class:"nav-link"},{default:Object(r["I"])((function(){return[d]})),_:1})])):Object(r["e"])("",!0),Object(r["g"])("li",g,[_.currentUser?(Object(r["s"])(),Object(r["d"])(U,{key:0,to:"/user",class:"nav-link"},{default:Object(r["I"])((function(){return[b]})),_:1})):Object(r["e"])("",!0)])]),_.currentUser?Object(r["e"])("",!0):(Object(r["s"])(),Object(r["d"])("div",f,[Object(r["g"])("li",m,[Object(r["g"])(U,{to:"/register",class:"nav-link"},{default:Object(r["I"])((function(){return[Object(r["g"])(P,{icon:"user-plus"}),p]})),_:1})]),Object(r["g"])("li",O,[Object(r["g"])(U,{to:"/login",class:"nav-link"},{default:Object(r["I"])((function(){return[Object(r["g"])(P,{icon:"sign-in-alt"}),j]})),_:1})])])),_.currentUser?(Object(r["s"])(),Object(r["d"])("div",v,[Object(r["g"])("li",h,[Object(r["g"])(U,{to:"/profile",class:"nav-link"},{default:Object(r["I"])((function(){return[Object(r["g"])(P,{icon:"user"}),Object(r["f"])(" "+Object(r["C"])(_.currentUser.username),1)]})),_:1})]),Object(r["g"])("li",k,[Object(r["g"])("a",{class:"nav-link",onClick:t[1]||(t[1]=Object(r["K"])((function(){return _.logOut&&_.logOut.apply(_,arguments)}),["prevent"]))},[Object(r["g"])(P,{icon:"sign-out-alt"}),y])])])):Object(r["e"])("",!0)]),Object(r["g"])("div",w,[Object(r["g"])(L)])])}n("caad"),n("2532");var I=n("30ef"),_={computed:{currentUser:function(){return this.$store.state.auth.user},showAdminBoard:function(){return!(!this.currentUser||!this.currentUser["roles"])&&this.currentUser["roles"].includes("ROLE_ADMIN")}},methods:{logOut:function(){this.$store.dispatch("auth/logout"),this.$router.push("/login")}},mounted:function(){var e=this;I["a"].on("logout",(function(){e.logOut()}))},beforeUnmount:function(){I["a"].remove("logout")}};_.render=S;var P=_,U=(n("d3b7"),n("3ca3"),n("ddb0"),n("6c02")),L={class:"container"},x={class:"jumbotron"};function T(e,t,n,a,s,o){return Object(r["s"])(),Object(r["d"])("div",L,[Object(r["g"])("header",x,[Object(r["g"])("h3",null,Object(r["C"])(s.content),1)])])}n("25f0");var E=n("1f57"),F={name:"Home",data:function(){return{content:""}},mounted:function(){var e=this;E["a"].getPublicContent().then((function(t){e.content=t.data}),(function(t){e.content=t.response&&t.response.data&&t.response.data.message||t.message||t.toString()}))}};F.render=T;var M=F,C=Object(r["L"])("data-v-728cdb1a");Object(r["v"])("data-v-728cdb1a");var J={class:"col-md-12"},q={class:"card card-container"},z=Object(r["g"])("img",{id:"profile-img",src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",class:"profile-img-card"},null,-1),$={class:"form-group"},N=Object(r["g"])("label",{for:"username"},"Email",-1),R={class:"form-group"},A=Object(r["g"])("label",{for:"password"},"Password",-1),B={class:"form-group"},H={class:"spinner-border spinner-border-sm"},D=Object(r["g"])("span",null,"Login",-1),K={class:"form-group"},G={key:0,class:"alert alert-danger",role:"alert"};Object(r["t"])();var Q=C((function(e,t,n,a,s,o){var c=Object(r["z"])("Field"),u=Object(r["z"])("ErrorMessage"),i=Object(r["z"])("Form");return Object(r["s"])(),Object(r["d"])("div",J,[Object(r["g"])("div",q,[z,Object(r["g"])(i,{onSubmit:o.handleLogin,"validation-schema":s.schema},{default:C((function(){return[Object(r["g"])("div",$,[N,Object(r["g"])(c,{name:"username",type:"text",class:"form-control"}),Object(r["g"])(u,{name:"username",class:"error-feedback"})]),Object(r["g"])("div",R,[A,Object(r["g"])(c,{name:"password",type:"password",class:"form-control"}),Object(r["g"])(u,{name:"password",class:"error-feedback"})]),Object(r["g"])("div",B,[Object(r["g"])("button",{class:"btn btn-primary btn-block",disabled:s.loading},[Object(r["J"])(Object(r["g"])("span",H,null,512),[[r["F"],s.loading]]),D],8,["disabled"])]),Object(r["g"])("div",K,[s.message?(Object(r["s"])(),Object(r["d"])("div",G,Object(r["C"])(s.message),1)):Object(r["e"])("",!0)])]})),_:1},8,["onSubmit","validation-schema"])])])})),V=n("7bb1"),W=n("506a"),X={name:"Login",components:{Form:V["c"],Field:V["b"],ErrorMessage:V["a"]},data:function(){var e=W["a"]().shape({username:W["b"]().required("Username is required!"),password:W["b"]().required("Password is required!")});return{loading:!1,message:"",schema:e}},computed:{loggedIn:function(){return this.$store.state.auth.status.loggedIn}},created:function(){this.loggedIn&&this.$router.push("/profile")},methods:{handleLogin:function(e){var t=this;this.loading=!0,this.$store.dispatch("auth/login",e).then((function(){t.$router.push("/profile")}),(function(e){t.loading=!1,t.message=e.response&&e.response.data&&e.response.data.message||e.message||e.toString()}))}}};n("6dc6");X.render=Q,X.__scopeId="data-v-728cdb1a";var Y=X,Z=Object(r["L"])("data-v-3b6f13e5");Object(r["v"])("data-v-3b6f13e5");var ee={class:"col-md-12"},te={class:"card card-container"},ne=Object(r["g"])("img",{id:"profile-img",src:"//ssl.gstatic.com/accounts/ui/avatar_2x.png",class:"profile-img-card"},null,-1),re={key:0},ae={class:"form-group"},se=Object(r["g"])("label",{for:"username"},"Email",-1),oe={class:"form-group"},ce=Object(r["g"])("label",{for:"password"},"Password",-1),ue={class:"form-group"},ie={class:"spinner-border spinner-border-sm"},le=Object(r["f"])(" Sign Up ");Object(r["t"])();var de=Z((function(e,t,n,a,s,o){var c=Object(r["z"])("Field"),u=Object(r["z"])("ErrorMessage"),i=Object(r["z"])("Form");return Object(r["s"])(),Object(r["d"])("div",ee,[Object(r["g"])("div",te,[ne,Object(r["g"])(i,{onSubmit:o.handleRegister,"validation-schema":s.schema},{default:Z((function(){return[s.successful?Object(r["e"])("",!0):(Object(r["s"])(),Object(r["d"])("div",re,[Object(r["g"])("div",ae,[se,Object(r["g"])(c,{name:"username",type:"text",class:"form-control"}),Object(r["g"])(u,{name:"username",class:"error-feedback"})]),Object(r["g"])("div",oe,[ce,Object(r["g"])(c,{name:"password",type:"password",class:"form-control"}),Object(r["g"])(u,{name:"password",class:"error-feedback"})]),Object(r["g"])("div",ue,[Object(r["g"])("button",{class:"btn btn-primary btn-block",disabled:s.loading},[Object(r["J"])(Object(r["g"])("span",ie,null,512),[[r["F"],s.loading]]),le],8,["disabled"])])]))]})),_:1},8,["onSubmit","validation-schema"]),s.message?(Object(r["s"])(),Object(r["d"])("div",{key:0,class:["alert",s.successful?"alert-success":"alert-danger"]},Object(r["C"])(s.message),3)):Object(r["e"])("",!0)])])})),ge={name:"Register",components:{Form:V["c"],Field:V["b"],ErrorMessage:V["a"]},data:function(){var e=W["a"]().shape({username:W["b"]().required("Username is required!").min(3,"Must be at least 3 characters!").max(20,"Must be maximum 20 characters!"),password:W["b"]().required("Password is required!").min(6,"Must be at least 6 characters!").max(40,"Must be maximum 40 characters!")});return{successful:!1,loading:!1,message:"",schema:e}},computed:{loggedIn:function(){return this.$store.state.auth.status.loggedIn}},mounted:function(){this.loggedIn&&this.$router.push("/profile")},methods:{handleRegister:function(e){var t=this;this.message="",this.successful=!1,this.loading=!0,this.$store.dispatch("auth/register",e).then((function(e){t.message=e.message,t.successful=!0,t.loading=!1}),(function(e){t.message=e.response&&e.response.data&&e.response.data.message||e.message||e.toString(),t.successful=!1,t.loading=!1}))}}};n("723d");ge.render=de,ge.__scopeId="data-v-3b6f13e5";var be=ge,fe=function(){return n.e("chunk-2d0d03d6").then(n.bind(null,"66aa"))},me=function(){return n.e("chunk-2d0c85f8").then(n.bind(null,"5535"))},pe=function(){return n.e("chunk-2d0a4c1e").then(n.bind(null,"0899"))},Oe=[{path:"/",name:"home",component:M},{path:"/home",component:M},{path:"/login",component:Y},{path:"/register",component:be},{path:"/profile",name:"profile",component:fe},{path:"/admin",name:"admin",component:me},{path:"/user",name:"user",component:pe}],je=Object(U["a"])({history:Object(U["b"])(),routes:Oe}),ve=je,he=n("5502"),ke=n("5530"),ye=n("d4ec"),we=n("bee2"),Se=n("7424"),Ie=function(){function e(){Object(ye["a"])(this,e)}return Object(we["a"])(e,[{key:"getLocalRefreshToken",value:function(){var e=JSON.parse(localStorage.getItem("user"));return null===e||void 0===e?void 0:e.refreshToken}},{key:"getLocalToken",value:function(){var e=JSON.parse(localStorage.getItem("user"));return null===e||void 0===e?void 0:e.token}},{key:"updateLocalToken",value:function(e){var t=JSON.parse(localStorage.getItem("user"));t.token=e,localStorage.setItem("user",JSON.stringify(t))}},{key:"getUser",value:function(){return JSON.parse(localStorage.getItem("user"))}},{key:"setUser",value:function(e){console.log(JSON.stringify(e)),localStorage.setItem("user",JSON.stringify(e))}},{key:"removeUser",value:function(){localStorage.removeItem("user")}}]),e}(),_e=new Ie,Pe=function(){function e(){Object(ye["a"])(this,e)}return Object(we["a"])(e,[{key:"login",value:function(e){var t=e.username,n=e.password;return Se["a"].post("/auth/signin",{username:t,password:n}).then((function(e){return e.data.token&&_e.setUser(e.data),e.data}))}},{key:"logout",value:function(){_e.removeUser()}},{key:"register",value:function(e){var t=e.username,n=e.password;return Se["a"].post("/auth/signup",{username:t,password:n})}}]),e}(),Ue=new Pe,Le=JSON.parse(localStorage.getItem("user")),xe=Le?{status:{loggedIn:!0},user:Le}:{status:{loggedIn:!1},user:null},Te={namespaced:!0,state:xe,actions:{login:function(e,t){var n=e.commit;return Ue.login(t).then((function(e){return n("loginSuccess",e),Promise.resolve(e)}),(function(e){return n("loginFailure"),Promise.reject(e)}))},logout:function(e){var t=e.commit;Ue.logout(),t("logout")},register:function(e,t){var n=e.commit;return Ue.register(t).then((function(e){return n("registerSuccess"),Promise.resolve(e.data)}),(function(e){return n("registerFailure"),Promise.reject(e)}))},refreshToken:function(e,t){var n=e.commit;n("refreshToken",t)}},mutations:{loginSuccess:function(e,t){e.status.loggedIn=!0,e.user=t},loginFailure:function(e){e.status.loggedIn=!1,e.user=null},logout:function(e){e.status.loggedIn=!1,e.user=null},registerSuccess:function(e){e.status.loggedIn=!1},registerFailure:function(e){e.status.loggedIn=!1},refreshToken:function(e,t){e.status.loggedIn=!0,e.user=Object(ke["a"])(Object(ke["a"])({},e.user),{},{token:t})}}},Ee=Object(he["a"])({modules:{auth:Te}}),Fe=Ee,Me=(n("4989"),n("ab8b"),n("ecee")),Ce=n("ad3d"),Je=n("c074");Me["c"].add(Je["a"],Je["d"],Je["e"],Je["b"],Je["c"]);var qe=n("1da1"),ze=(n("96cf"),function(e){Se["a"].interceptors.request.use((function(e){var t=_e.getLocalToken();return t&&(e.headers["Authorization"]="Bearer "+t),e}),(function(e){return Promise.reject(e)})),Se["a"].interceptors.response.use((function(e){return e}),function(){var t=Object(qe["a"])(regeneratorRuntime.mark((function t(n){var r,a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r=n.config,"/auth/signin"===r.url||!n.response){t.next=17;break}if(401!==n.response.status||r._retry){t.next=17;break}return r._retry=!0,t.prev=4,t.next=7,Se["a"].post("/auth/refreshtoken",{refreshToken:_e.getLocalRefreshToken()});case 7:return a=t.sent,s=a.data.token,e.dispatch("auth/refreshToken",s),_e.updateLocalToken(s),t.abrupt("return",Object(Se["a"])(r));case 14:return t.prev=14,t.t0=t["catch"](4),t.abrupt("return",Promise.reject(t.t0));case 17:return t.abrupt("return",Promise.reject(n));case 18:case"end":return t.stop()}}),t,null,[[4,14]])})));return function(e){return t.apply(this,arguments)}}())}),$e=ze;$e(Fe),Object(r["c"])(P).use(ve).use(Fe).component("font-awesome-icon",Ce["a"]).mount("#app")},"6dc6":function(e,t,n){"use strict";n("f7d1")},"723d":function(e,t,n){"use strict";n("185f")},7424:function(e,t,n){"use strict";var r=n("bc3a"),a=n.n(r),s=a.a.create({baseURL:"https://teambuilderproject.herokuapp.com/api",headers:{"Content-Type":"application/json"}});t["a"]=s},f7d1:function(e,t,n){}});
//# sourceMappingURL=app.86b3b876.js.map