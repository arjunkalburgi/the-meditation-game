import{z as pe,s as de,A as D,d as v,B as M,C as O,D as G,w as n,x as Y,c as A,e as C,E as Se,f as R,g as k,j as T,k as w,l as U,F as ve,G as Z,H as y,I as Ee,h as _e,t as he,q as Pe}from"../chunks/CEXF1FAX.js";import{S as ge,i as me,t as S,a as d,g as j,c as q,d as Fe,m as He,e as Le,b as Re}from"../chunks/DZDXqLKl.js";import{a as ke}from"../chunks/CpW4H565.js";import{w as we,r as Ie}from"../chunks/Dc98AiPE.js";import{g as Ce,p as J}from"../chunks/DV7_3WHn.js";const K={};function x(l){return l==="local"?localStorage:sessionStorage}function W(l,e,a){const s=JSON,r="local";function t(o,i){x(r).setItem(o,s.stringify(i))}if(!K[l]){const o=we(e,P=>{const F=x(r).getItem(l);F&&P(s.parse(F));{const I=L=>{L.key===l&&P(L.newValue?s.parse(L.newValue):null)};return window.addEventListener("storage",I),()=>window.removeEventListener("storage",I)}}),{subscribe:i,set:u}=o;K[l]={set(P){t(l,P),u(P)},update(P){const F=P(pe(o));t(l,F),u(F)},subscribe:i}}return K[l]}W("modeOsPrefers",!1);W("modeUserPrefers",void 0);W("modeCurrent",!1);const be="(prefers-reduced-motion: reduce)";function Ae(){return window.matchMedia(be).matches}Ie(Ae(),l=>{{const e=s=>{l(s.matches)},a=window.matchMedia(be);return a.addEventListener("change",e),()=>{a.removeEventListener("change",e)}}});const De=l=>({}),$=l=>({}),Me=l=>({}),ee=l=>({}),Oe=l=>({}),te=l=>({}),Ge=l=>({}),le=l=>({}),Ve=l=>({}),se=l=>({}),ze=l=>({}),oe=l=>({});function ae(l){let e,a,s;const r=l[19].header,t=D(r,l,l[18],oe);return{c(){e=w("header"),t&&t.c(),this.h()},l(o){e=R(o,"HEADER",{id:!0,class:!0});var i=k(e);t&&t.l(i),i.forEach(v),this.h()},h(){n(e,"id","shell-header"),n(e,"class",a="flex-none "+l[8])},m(o,i){A(o,e,i),t&&t.m(e,null),s=!0},p(o,i){t&&t.p&&(!s||i&262144)&&M(t,r,o,o[18],s?G(r,o[18],i,ze):O(o[18]),oe),(!s||i&256&&a!==(a="flex-none "+o[8]))&&n(e,"class",a)},i(o){s||(d(t,o),s=!0)},o(o){S(t,o),s=!1},d(o){o&&v(e),t&&t.d(o)}}}function re(l){let e,a;const s=l[19].sidebarLeft,r=D(s,l,l[18],se);return{c(){e=w("aside"),r&&r.c(),this.h()},l(t){e=R(t,"ASIDE",{id:!0,class:!0});var o=k(e);r&&r.l(o),o.forEach(v),this.h()},h(){n(e,"id","sidebar-left"),n(e,"class",l[7])},m(t,o){A(t,e,o),r&&r.m(e,null),a=!0},p(t,o){r&&r.p&&(!a||o&262144)&&M(r,s,t,t[18],a?G(s,t[18],o,Ve):O(t[18]),se),(!a||o&128)&&n(e,"class",t[7])},i(t){a||(d(r,t),a=!0)},o(t){S(r,t),a=!1},d(t){t&&v(e),r&&r.d(t)}}}function ie(l){let e,a,s;const r=l[19].pageHeader,t=D(r,l,l[18],le),o=t||Be();return{c(){e=w("header"),o&&o.c(),this.h()},l(i){e=R(i,"HEADER",{id:!0,class:!0});var u=k(e);o&&o.l(u),u.forEach(v),this.h()},h(){n(e,"id","page-header"),n(e,"class",a="flex-none "+l[5])},m(i,u){A(i,e,u),o&&o.m(e,null),s=!0},p(i,u){t&&t.p&&(!s||u&262144)&&M(t,r,i,i[18],s?G(r,i[18],u,Ge):O(i[18]),le),(!s||u&32&&a!==(a="flex-none "+i[5]))&&n(e,"class",a)},i(i){s||(d(o,i),s=!0)},o(i){S(o,i),s=!1},d(i){i&&v(e),o&&o.d(i)}}}function Be(l){let e;return{c(){e=he("(slot:header)")},l(a){e=_e(a,"(slot:header)")},m(a,s){A(a,e,s)},d(a){a&&v(e)}}}function fe(l){let e,a,s;const r=l[19].pageFooter,t=D(r,l,l[18],te),o=t||Ne();return{c(){e=w("footer"),o&&o.c(),this.h()},l(i){e=R(i,"FOOTER",{id:!0,class:!0});var u=k(e);o&&o.l(u),u.forEach(v),this.h()},h(){n(e,"id","page-footer"),n(e,"class",a="flex-none "+l[3])},m(i,u){A(i,e,u),o&&o.m(e,null),s=!0},p(i,u){t&&t.p&&(!s||u&262144)&&M(t,r,i,i[18],s?G(r,i[18],u,Oe):O(i[18]),te),(!s||u&8&&a!==(a="flex-none "+i[3]))&&n(e,"class",a)},i(i){s||(d(o,i),s=!0)},o(i){S(o,i),s=!1},d(i){i&&v(e),o&&o.d(i)}}}function Ne(l){let e;return{c(){e=he("(slot:footer)")},l(a){e=_e(a,"(slot:footer)")},m(a,s){A(a,e,s)},d(a){a&&v(e)}}}function ne(l){let e,a;const s=l[19].sidebarRight,r=D(s,l,l[18],ee);return{c(){e=w("aside"),r&&r.c(),this.h()},l(t){e=R(t,"ASIDE",{id:!0,class:!0});var o=k(e);r&&r.l(o),o.forEach(v),this.h()},h(){n(e,"id","sidebar-right"),n(e,"class",l[6])},m(t,o){A(t,e,o),r&&r.m(e,null),a=!0},p(t,o){r&&r.p&&(!a||o&262144)&&M(r,s,t,t[18],a?G(s,t[18],o,Me):O(t[18]),ee),(!a||o&64)&&n(e,"class",t[6])},i(t){a||(d(r,t),a=!0)},o(t){S(r,t),a=!1},d(t){t&&v(e),r&&r.d(t)}}}function ue(l){let e,a,s;const r=l[19].footer,t=D(r,l,l[18],$);return{c(){e=w("footer"),t&&t.c(),this.h()},l(o){e=R(o,"FOOTER",{id:!0,class:!0});var i=k(e);t&&t.l(i),i.forEach(v),this.h()},h(){n(e,"id","shell-footer"),n(e,"class",a="flex-none "+l[2])},m(o,i){A(o,e,i),t&&t.m(e,null),s=!0},p(o,i){t&&t.p&&(!s||i&262144)&&M(t,r,o,o[18],s?G(r,o[18],i,De):O(o[18]),$),(!s||i&4&&a!==(a="flex-none "+o[2]))&&n(e,"class",a)},i(o){s||(d(t,o),s=!0)},o(o){S(t,o),s=!1},d(o){o&&v(e),t&&t.d(o)}}}function Te(l){let e,a,s,r,t,o,i,u,P,F,I,L,H,z,Q,_=l[10].header&&ae(l),h=l[10].sidebarLeft&&re(l),g=l[10].pageHeader&&ie(l);const V=l[19].default,E=D(V,l,l[18],null);let m=l[10].pageFooter&&fe(l),b=l[10].sidebarRight&&ne(l),p=l[10].footer&&ue(l);return{c(){e=w("div"),_&&_.c(),a=U(),s=w("div"),h&&h.c(),r=U(),t=w("div"),g&&g.c(),o=U(),i=w("main"),E&&E.c(),P=U(),m&&m.c(),I=U(),b&&b.c(),L=U(),p&&p.c(),this.h()},l(f){e=R(f,"DIV",{id:!0,class:!0,"data-testid":!0});var c=k(e);_&&_.l(c),a=T(c),s=R(c,"DIV",{class:!0});var B=k(s);h&&h.l(B),r=T(B),t=R(B,"DIV",{id:!0,class:!0});var N=k(t);g&&g.l(N),o=T(N),i=R(N,"MAIN",{id:!0,class:!0});var X=k(i);E&&E.l(X),X.forEach(v),P=T(N),m&&m.l(N),N.forEach(v),I=T(B),b&&b.l(B),B.forEach(v),L=T(c),p&&p.l(c),c.forEach(v),this.h()},h(){n(i,"id","page-content"),n(i,"class",u="flex-auto "+l[4]),n(t,"id","page"),n(t,"class",F=l[1]+" "+ce),Y(t,"scrollbar-gutter",l[0]),n(s,"class","flex-auto "+je),n(e,"id","appShell"),n(e,"class",l[9]),n(e,"data-testid","app-shell")},m(f,c){A(f,e,c),_&&_.m(e,null),C(e,a),C(e,s),h&&h.m(s,null),C(s,r),C(s,t),g&&g.m(t,null),C(t,o),C(t,i),E&&E.m(i,null),C(t,P),m&&m.m(t,null),C(s,I),b&&b.m(s,null),C(e,L),p&&p.m(e,null),H=!0,z||(Q=Se(t,"scroll",l[20]),z=!0)},p(f,[c]){f[10].header?_?(_.p(f,c),c&1024&&d(_,1)):(_=ae(f),_.c(),d(_,1),_.m(e,a)):_&&(j(),S(_,1,1,()=>{_=null}),q()),f[10].sidebarLeft?h?(h.p(f,c),c&1024&&d(h,1)):(h=re(f),h.c(),d(h,1),h.m(s,r)):h&&(j(),S(h,1,1,()=>{h=null}),q()),f[10].pageHeader?g?(g.p(f,c),c&1024&&d(g,1)):(g=ie(f),g.c(),d(g,1),g.m(t,o)):g&&(j(),S(g,1,1,()=>{g=null}),q()),E&&E.p&&(!H||c&262144)&&M(E,V,f,f[18],H?G(V,f[18],c,null):O(f[18]),null),(!H||c&16&&u!==(u="flex-auto "+f[4]))&&n(i,"class",u),f[10].pageFooter?m?(m.p(f,c),c&1024&&d(m,1)):(m=fe(f),m.c(),d(m,1),m.m(t,null)):m&&(j(),S(m,1,1,()=>{m=null}),q()),(!H||c&2&&F!==(F=f[1]+" "+ce))&&n(t,"class",F),c&1&&Y(t,"scrollbar-gutter",f[0]),f[10].sidebarRight?b?(b.p(f,c),c&1024&&d(b,1)):(b=ne(f),b.c(),d(b,1),b.m(s,null)):b&&(j(),S(b,1,1,()=>{b=null}),q()),f[10].footer?p?(p.p(f,c),c&1024&&d(p,1)):(p=ue(f),p.c(),d(p,1),p.m(e,null)):p&&(j(),S(p,1,1,()=>{p=null}),q()),(!H||c&512)&&n(e,"class",f[9])},i(f){H||(d(_),d(h),d(g),d(E,f),d(m),d(b),d(p),H=!0)},o(f){S(_),S(h),S(g),S(E,f),S(m),S(b),S(p),H=!1},d(f){f&&v(e),_&&_.d(),h&&h.d(),g&&g.d(),E&&E.d(f),m&&m.d(),b&&b.d(),p&&p.d(),z=!1,Q()}}}const Ue="w-full h-full flex flex-col overflow-hidden",je="w-full h-full flex overflow-hidden",ce="flex-1 overflow-x-hidden flex flex-col",qe="flex-none overflow-x-hidden overflow-y-auto",Qe="flex-none overflow-x-hidden overflow-y-auto";function Je(l,e,a){let s,r,t,o,i,u,P,F,{$$slots:I={},$$scope:L}=e;const H=ve(I);let{scrollbarGutter:z="auto"}=e,{regionPage:Q=""}=e,{slotHeader:_="z-10"}=e,{slotSidebarLeft:h="w-auto"}=e,{slotSidebarRight:g="w-auto"}=e,{slotPageHeader:V=""}=e,{slotPageContent:E=""}=e,{slotPageFooter:m=""}=e,{slotFooter:b=""}=e;function p(f){Ee.call(this,l,f)}return l.$$set=f=>{a(21,e=Z(Z({},e),y(f))),"scrollbarGutter"in f&&a(0,z=f.scrollbarGutter),"regionPage"in f&&a(1,Q=f.regionPage),"slotHeader"in f&&a(11,_=f.slotHeader),"slotSidebarLeft"in f&&a(12,h=f.slotSidebarLeft),"slotSidebarRight"in f&&a(13,g=f.slotSidebarRight),"slotPageHeader"in f&&a(14,V=f.slotPageHeader),"slotPageContent"in f&&a(15,E=f.slotPageContent),"slotPageFooter"in f&&a(16,m=f.slotPageFooter),"slotFooter"in f&&a(17,b=f.slotFooter),"$$scope"in f&&a(18,L=f.$$scope)},l.$$.update=()=>{a(9,s=`${Ue} ${e.class??""}`),l.$$.dirty&2048&&a(8,r=`${_}`),l.$$.dirty&4096&&a(7,t=`${qe} ${h}`),l.$$.dirty&8192&&a(6,o=`${Qe} ${g}`),l.$$.dirty&16384&&a(5,i=`${V}`),l.$$.dirty&32768&&a(4,u=`${E}`),l.$$.dirty&65536&&a(3,P=`${m}`),l.$$.dirty&131072&&a(2,F=`${b}`)},e=y(e),[z,Q,F,P,u,i,o,t,r,s,H,_,h,g,V,E,m,b,L,I,p]}class Ke extends ge{constructor(e){super(),me(this,e,Je,Te,de,{scrollbarGutter:0,regionPage:1,slotHeader:11,slotSidebarLeft:12,slotSidebarRight:13,slotPageHeader:14,slotPageContent:15,slotPageFooter:16,slotFooter:17})}}function We(l){let e;const a=l[0].default,s=D(a,l,l[1],null);return{c(){s&&s.c()},l(r){s&&s.l(r)},m(r,t){s&&s.m(r,t),e=!0},p(r,t){s&&s.p&&(!e||t&2)&&M(s,a,r,r[1],e?G(a,r[1],t,null):O(r[1]),null)},i(r){e||(d(s,r),e=!0)},o(r){S(s,r),e=!1},d(r){s&&s.d(r)}}}function Xe(l){let e,a;return e=new Ke({props:{$$slots:{default:[We]},$$scope:{ctx:l}}}),{c(){Re(e.$$.fragment)},l(s){Le(e.$$.fragment,s)},m(s,r){He(e,s,r),a=!0},p(s,[r]){const t={};r&2&&(t.$$scope={dirty:r,ctx:s}),e.$set(t)},i(s){a||(d(e.$$.fragment,s),a=!0)},o(s){S(e.$$.fragment,s),a=!1},d(s){Fe(e,s)}}}function Ye(l,e,a){let{$$slots:s={},$$scope:r}=e;return ke(t=>{var o;(o=t.to)!=null&&o.url&&J.capture("$pageview",{path:t.to.url.pathname})}),Pe(()=>{const t=Ce();J.identify(t),J.capture("$pageview",{path:window.location.pathname,utm_source:new URLSearchParams(window.location.search).get("utm_source")})}),l.$$set=t=>{"$$scope"in t&&a(1,r=t.$$scope)},[s,r]}class tt extends ge{constructor(e){super(),me(this,e,Ye,Xe,de,{})}}export{tt as component};
