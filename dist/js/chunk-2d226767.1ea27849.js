(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d226767"],{e985:function(e,t,s){"use strict";s.r(t);s("b0c0"),s("a4d3"),s("e01a");var n=s("7a23"),c={key:0,class:"alert alert-danger",role:"alert",style:{margin:"1em"}},a={key:1,class:"alert alert-success",role:"alert",style:{margin:"1em"}},o=Object(n["f"])("div",{class:"card-header"}," Ваш проект ",-1),r={class:"card-body"},i={class:"card-title"},d={class:"card-text"},l={class:"card-header text-muted"},u=Object(n["f"])("div",{class:"card-footer text-muted"}," К вашему проекту хочет присоединится ",-1),b={class:"card-body"},j={class:"card-title"},p={class:"card-text"},f={class:"card-footer text-white"},g=["onClick"],O=["onClick"];function m(e,t,s,m,h,k){return Object(n["w"])(),Object(n["e"])(n["a"],null,[null!=h.content?(Object(n["w"])(),Object(n["e"])("div",c,Object(n["H"])(h.content),1)):Object(n["d"])("",!0),0!==h.checks.length?(Object(n["w"])(),Object(n["e"])("div",a," Всего проектов: "+Object(n["H"])(h.checks.length),1)):Object(n["d"])("",!0),Object(n["f"])("div",null,[(Object(n["w"])(!0),Object(n["e"])(n["a"],null,Object(n["D"])(h.checks,(function(e){return Object(n["w"])(),Object(n["e"])("div",{class:"card text-center",style:{margin:"1em"},key:e.userProjectId},[o,Object(n["f"])("div",r,[Object(n["f"])("h5",i,Object(n["H"])(e.projectResponseDto.name),1),Object(n["f"])("p",d,Object(n["H"])(e.projectResponseDto.description),1),(Object(n["w"])(!0),Object(n["e"])(n["a"],null,Object(n["D"])(e.projectResponseDto.tagNameList,(function(e){return Object(n["w"])(),Object(n["e"])("span",{class:"badge bg-success text-white",key:e,style:{margin:"0.1em"}},Object(n["H"])(e),1)})),128))]),Object(n["f"])("div",l," Дедлайн: "+Object(n["H"])(k.formatDate(e.projectResponseDto.endDate)),1),u,Object(n["f"])("div",b,[Object(n["f"])("h5",j,Object(n["H"])(e.username),1),Object(n["f"])("p",p,Object(n["H"])(e.userDescription),1),(Object(n["w"])(!0),Object(n["e"])(n["a"],null,Object(n["D"])(e.userTagNameList,(function(e){return Object(n["w"])(),Object(n["e"])("span",{class:"badge bg-success text-white",key:e,style:{margin:"0.1em"}},Object(n["H"])(e),1)})),128))]),Object(n["f"])("div",f,[Object(n["f"])("a",{class:"btn btn-success",style:{margin:"0.1em"},onClick:function(t){return k.sendInvitation({projectId:e.projectResponseDto.id,userProjectId:e.userProjectId,isAccepted:!0,username:e.username})}},"Подходит",8,g),Object(n["f"])("a",{class:"btn btn-danger",style:{margin:"0.1em"},onClick:function(t){return k.sendInvitation({projectId:e.projectResponseDto.id,userProjectId:e.userProjectId,isAccepted:!1,username:e.username})}},"Не подходит",8,O)])])})),128))])],64)}s("d3b7"),s("25f0");var h=s("df33"),k=s("30ef"),w=s("5502"),v={name:"Notifications",data:function(){return{checks:[],content:"Проверяем, есть ли новые уведомления..."}},computed:Object(w["b"])({notifications:"socket/getNotifications"}),methods:{formatDate:function(e){return new Date(e).toLocaleString("ru-RU",{weekday:"long",year:"numeric",month:"long",day:"numeric"})},sendInvitation:function(e){var t=this;h["a"].sendInvitation(e).then((function(){t.getNotifications()}),(function(e){t.content=e.response&&e.response.data&&e.response.data.message||e.message||e.toString(),!e.response||403!==e.response.status&&401!==e.response.status||k["a"].dispatch("logout")}))},getNotifications:function(){var e=this;h["a"].getNotifications().then((function(t){e.content=null,e.checks=t.data.checkUserAsLeaderResponseDtoList,e.$store.state.socket.notifications=t.data.checkUserAsLeaderResponseDtoList.length,0===e.checks.length&&(e.content="Новых уведомлений не приходило!")}),(function(t){e.content=t.response&&t.response.data&&t.response.data.message||t.message||t.toString(),t.response&&404===t.response.status&&(e.content="Запросов не найдено!"),console.log(t.response),!t.response||403!==t.response.status&&401!==t.response.status&&"class java.lang.String cannot be cast to class org.springframework.security.core.userdetails.UserDetails (java.lang.String is in module java.base of loader 'bootstrap'; org.springframework.security.core.userdetails.UserDetails is in unnamed module of loader 'app')"!==t.response.data.message||k["a"].dispatch("logout")}))}},mounted:function(){this.getNotifications()},watch:{notifications:{handler:function(){this.getNotifications()},deep:!0}}},y=s("6b0d"),D=s.n(y);const I=D()(v,[["render",m]]);t["default"]=I}}]);
//# sourceMappingURL=chunk-2d226767.1ea27849.js.map