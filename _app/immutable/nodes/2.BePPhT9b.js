import{L as Tt,s as K,d as h,Z as Mt,c as L,e as p,w as m,f as x,g as T,j as B,k,l as O,q as Et,n as z,M as U,E as Y,_ as N,b as q,h as A,t as H,i as It,$ as rt,a0 as at,a1 as kt,m as J,a2 as St,z as P,r as wt,x as ot,o as dt,y as Dt,a3 as Vt}from"../chunks/CEXF1FAX.js";import{S as X,i as Z,t as j,a as $,g as st,c as it,f as D,d as F,m as Q,e as tt,b as et,h as Lt}from"../chunks/DZDXqLKl.js";import{p as W,g as $t}from"../chunks/DV7_3WHn.js";import{d as lt,w as nt}from"../chunks/Dc98AiPE.js";function mt(a){return(a==null?void 0:a.length)!==void 0?a:Array.from(a)}function V(a,{delay:t=0,duration:s=400,easing:e=Tt}={}){const i=+getComputedStyle(a).opacity;return{delay:t,duration:s,easing:e,css:n=>`opacity: ${n*i}`}}function ht(a,t,s){const e=a.slice();return e[5]=t[s],e}function pt(a){let t,s="Exit Meditation",e,i,n,l;return{c(){t=k("button"),t.textContent=s,this.h()},l(r){t=x(r,"BUTTON",{class:!0,"data-svelte-h":!0}),N(t)!=="svelte-t4g94n"&&(t.textContent=s),this.h()},h(){m(t,"class","absolute top-4 left-1/2 transform -translate-x-1/2 btn variant-filled px-4 py-2")},m(r,d){L(r,t,d),i=!0,n||(l=Y(t,"click",a[3]),n=!0)},p:z,i(r){i||(r&&U(()=>{i&&(e||(e=D(t,V,{},!0)),e.run(1))}),i=!0)},o(r){r&&(e||(e=D(t,V,{},!1)),e.run(0)),i=!1},d(r){r&&h(t),r&&e&&e.end(),n=!1,l()}}}function _t(a){let t,s=a[5]+"",e,i,n;return{c(){t=k("p"),e=H(s),this.h()},l(l){t=x(l,"P",{class:!0});var r=T(t);e=A(r,s),r.forEach(h),this.h()},h(){m(t,"class","text-lg max-w-sm")},m(l,r){L(l,t,r),p(t,e),n=!0},p(l,r){(!n||r&2)&&s!==(s=l[5]+"")&&q(e,s)},i(l){n||(l&&U(()=>{n&&(i||(i=D(t,V,{},!0)),i.run(1))}),n=!0)},o(l){l&&(i||(i=D(t,V,{},!1)),i.run(0)),n=!1},d(l){l&&h(t),l&&i&&i.end()}}}function vt(a){let t,s="Start meditation countdown",e,i,n,l;return{c(){t=k("button"),t.textContent=s,this.h()},l(r){t=x(r,"BUTTON",{class:!0,"data-svelte-h":!0}),N(t)!=="svelte-71gbpm"&&(t.textContent=s),this.h()},h(){m(t,"class","btn variant-filled px-4 py-2 mt-4")},m(r,d){L(r,t,d),i=!0,n||(l=Y(t,"click",function(){It(a[0])&&a[0].apply(this,arguments)}),n=!0)},p(r,d){a=r},i(r){i||(r&&U(()=>{i&&(e||(e=D(t,V,{},!0)),e.run(1))}),i=!0)},o(r){r&&(e||(e=D(t,V,{},!1)),e.run(0)),i=!1},d(r){r&&h(t),r&&e&&e.end(),n=!1,l()}}}function jt(a){let t,s,e,i,n=a[1]>=3&&pt(a),l=mt(a[2].slice(0,a[1])),r=[];for(let c=0;c<l.length;c+=1)r[c]=_t(ht(a,l,c));const d=c=>j(r[c],1,1,()=>{r[c]=null});let f=a[1]>=5&&vt(a);return{c(){t=k("div"),n&&n.c(),s=O();for(let c=0;c<r.length;c+=1)r[c].c();e=O(),f&&f.c(),this.h()},l(c){t=x(c,"DIV",{class:!0});var o=T(t);n&&n.l(o),s=B(o);for(let u=0;u<r.length;u+=1)r[u].l(o);e=B(o),f&&f.l(o),o.forEach(h),this.h()},h(){m(t,"class","w-full h-full flex flex-col justify-center items-center px-6 space-y-6 text-center relative")},m(c,o){L(c,t,o),n&&n.m(t,null),p(t,s);for(let u=0;u<r.length;u+=1)r[u]&&r[u].m(t,null);p(t,e),f&&f.m(t,null),i=!0},p(c,[o]){if(c[1]>=3?n?(n.p(c,o),o&2&&$(n,1)):(n=pt(c),n.c(),$(n,1),n.m(t,s)):n&&(st(),j(n,1,1,()=>{n=null}),it()),o&6){l=mt(c[2].slice(0,c[1]));let u;for(u=0;u<l.length;u+=1){const _=ht(c,l,u);r[u]?(r[u].p(_,o),$(r[u],1)):(r[u]=_t(_),r[u].c(),$(r[u],1),r[u].m(t,e))}for(st(),u=l.length;u<r.length;u+=1)d(u);it()}c[1]>=5?f?(f.p(c,o),o&2&&$(f,1)):(f=vt(c),f.c(),$(f,1),f.m(t,null)):f&&(st(),j(f,1,1,()=>{f=null}),it())},i(c){if(!i){$(n);for(let o=0;o<l.length;o+=1)$(r[o]);$(f),i=!0}},o(c){j(n),r=r.filter(Boolean);for(let o=0;o<r.length;o+=1)j(r[o]);j(f),i=!1},d(c){c&&h(t),n&&n.d(),Mt(r,c),f&&f.d()}}}function Bt(a,t,s){let{nextStep:e}=t,{closeModal:i}=t;const n=["1. To practice focus, a short sound will play every 10s","2. When you hear the sound, **tap anywhere on the screen** if you’ve lost focus","3. Press **exit meditation** at any time to end early","4. Have fun"];let l=0;Et(()=>{W.capture("instructions_viewed");const d=setInterval(()=>{l<n.length+1?s(1,l+=1):clearInterval(d)},1e3)});const r=()=>{W.capture("instructions_exit",{instructions_viewed:l,level:0}),i()};return a.$$set=d=>{"nextStep"in d&&s(0,e=d.nextStep),"closeModal"in d&&s(4,i=d.closeModal)},[e,l,n,r,i]}class Ot extends X{constructor(t){super(),Z(this,t,Bt,jt,K,{nextStep:0,closeModal:4})}}const ut=a=>{const t=a%60;return(a/60>1?`${Math.floor(a/60)}:`:"")+`${t<10?"0":""}${t}`};function Pt(a){let t,s,e,i,n,l;return{c(){t=at("svg"),s=at("circle"),e=at("circle"),n=at("text"),l=H(a[1]),this.h()},l(r){t=rt(r,"svg",{class:!0,viewBox:!0});var d=T(t);s=rt(d,"circle",{cx:!0,cy:!0,r:!0,stroke:!0,"stroke-width":!0,fill:!0}),T(s).forEach(h),e=rt(d,"circle",{cx:!0,cy:!0,r:!0,stroke:!0,"stroke-width":!0,fill:!0,"stroke-dasharray":!0,"stroke-dashoffset":!0,transform:!0}),T(e).forEach(h),n=rt(d,"text",{x:!0,y:!0,"font-size":!0,"text-anchor":!0,fill:!0});var f=T(n);l=A(f,a[1]),f.forEach(h),d.forEach(h),this.h()},h(){m(s,"cx","50"),m(s,"cy","50"),m(s,"r","40"),m(s,"stroke","gray"),m(s,"stroke-width","5"),m(s,"fill","none"),m(e,"cx","50"),m(e,"cy","50"),m(e,"r","40"),m(e,"stroke","blue"),m(e,"stroke-width","5"),m(e,"fill","none"),m(e,"stroke-dasharray","251.2"),m(e,"stroke-dashoffset",i=251.2*a[0]),m(e,"transform","rotate(-90 50 50)"),m(n,"x","50"),m(n,"y","55"),m(n,"font-size","14"),m(n,"text-anchor","middle"),m(n,"fill","black"),m(t,"class","w-32 h-32"),m(t,"viewBox","0 0 100 100")},m(r,d){L(r,t,d),p(t,s),p(t,e),p(t,n),p(n,l)},p(r,[d]){d&1&&i!==(i=251.2*r[0])&&m(e,"stroke-dashoffset",i),d&2&&q(l,r[1])},i:z,o:z,d(r){r&&h(t)}}}function Nt(a,t,s){let e,i,{duration:n}=t,{timeLeft:l}=t;const r=kt();let d;const f=lt(l,u=>ut(u));J(a,f,u=>s(1,i=u));const c=lt(l,u=>u/n);return J(a,c,u=>s(0,e=u)),(()=>{d=setInterval(()=>{l.update(u=>u>0?u-1:(clearInterval(d),r("complete"),0))},1e3)})(),St(()=>clearInterval(d)),a.$$set=u=>{"duration"in u&&s(4,n=u.duration),"timeLeft"in u&&s(5,l=u.timeLeft)},[e,i,f,c,n,l]}class yt extends X{constructor(t){super(),Z(this,t,Nt,Pt,K,{duration:4,timeLeft:5})}}function Rt(a){let t,s,e,i,n,l="Exit Meditation",r,d,f,c;return e=new yt({props:{duration:ct,timeLeft:a[0]}}),e.$on("complete",a[1]),{c(){t=k("div"),s=k("div"),et(e.$$.fragment),i=O(),n=k("button"),n.textContent=l,this.h()},l(o){t=x(o,"DIV",{class:!0});var u=T(t);s=x(u,"DIV",{class:!0});var _=T(s);tt(e.$$.fragment,_),_.forEach(h),i=B(u),n=x(u,"BUTTON",{class:!0,"data-svelte-h":!0}),N(n)!=="svelte-hy6wnc"&&(n.textContent=l),u.forEach(h),this.h()},h(){m(s,"class","absolute flex flex-col items-center pointer-events-auto"),m(n,"class","absolute top-4 left-1/2 transform -translate-x-1/2 btn variant-outlined px-4 py-2 pointer-events-auto"),m(t,"class","w-full h-full flex flex-col items-center justify-center relative pointer-events-none")},m(o,u){L(o,t,u),p(t,s),Q(e,s,null),p(t,i),p(t,n),d=!0,f||(c=Y(n,"click",a[2]),f=!0)},p:z,i(o){d||($(e.$$.fragment,o),o&&U(()=>{d&&(r||(r=D(n,V,{},!0)),r.run(1))}),d=!0)},o(o){j(e.$$.fragment,o),o&&(r||(r=D(n,V,{},!1)),r.run(0)),d=!1},d(o){o&&h(t),F(e),o&&r&&r.end(),f=!1,c()}}}const ct=10;function At(a,t,s){let{nextStep:e}=t,{closeModal:i}=t;const n=nt(ct);W.capture("countdown_started",{level:0});const l=()=>{W.capture("countdown_complete",{level:0}),e()},r=()=>{W.capture("countdown_exit",{duration_counteddown:ct-P(n),level:0}),i()};return a.$$set=d=>{"nextStep"in d&&s(3,e=d.nextStep),"closeModal"in d&&s(4,i=d.closeModal)},[n,l,r,e,i]}class Ht extends X{constructor(t){super(),Z(this,t,At,Rt,K,{nextStep:3,closeModal:4})}}function gt(a){let t,s,e;return{c(){t=k("p"),s=H(a[1]),e=H(" distractions"),this.h()},l(i){t=x(i,"P",{class:!0});var n=T(t);s=A(n,a[1]),e=A(n," distractions"),n.forEach(h),this.h()},h(){m(t,"class","text-lg mt-4 text-center")},m(i,n){L(i,t,n),p(t,s),p(t,e)},p(i,n){n&2&&q(s,i[1])},d(i){i&&h(t)}}}function bt(a){let t;return{c(){t=k("div"),this.h()},l(s){t=x(s,"DIV",{class:!0,style:!0}),T(t).forEach(h),this.h()},h(){m(t,"class","ripple svelte-1wv6db6"),ot(t,"top",a[2].y+"px"),ot(t,"left",a[2].x+"px")},m(s,e){L(s,t,e)},p(s,e){e&4&&ot(t,"top",s[2].y+"px"),e&4&&ot(t,"left",s[2].x+"px")},d(s){s&&h(t)}}}function Ut(a){let t,s,e,i,n,l="Tap anywhere on the screen to record your distractions",r,d,f,c,o,u="Exit Meditation",_,g,b,M;e=new yt({props:{duration:a[0],timeLeft:a[3]}}),e.$on("complete",a[8]);let v=a[1]&&gt(a),y=a[2]&&bt(a);return{c(){t=k("div"),s=k("div"),et(e.$$.fragment),i=O(),n=k("p"),n.textContent=l,r=O(),v&&v.c(),d=O(),f=k("button"),y&&y.c(),c=O(),o=k("button"),o.textContent=u,this.h()},l(w){t=x(w,"DIV",{class:!0});var C=T(t);s=x(C,"DIV",{class:!0});var E=T(s);tt(e.$$.fragment,E),i=B(E),n=x(E,"P",{class:!0,"data-svelte-h":!0}),N(n)!=="svelte-1uyhl39"&&(n.textContent=l),r=B(E),v&&v.l(E),E.forEach(h),d=B(C),f=x(C,"BUTTON",{class:!0});var S=T(f);y&&y.l(S),S.forEach(h),c=B(C),o=x(C,"BUTTON",{class:!0,"data-svelte-h":!0}),N(o)!=="svelte-hy6wnc"&&(o.textContent=u),C.forEach(h),this.h()},h(){m(n,"class","text-lg mt-4 text-center"),m(s,"class","absolute flex flex-col items-center pointer-events-auto p-6"),m(f,"class","absolute inset-0 w-full h-full bg-transparent pointer-events-auto relative overflow-hidden"),m(o,"class","absolute top-4 left-1/2 transform -translate-x-1/2 btn variant-outlined px-4 py-2 pointer-events-auto"),m(t,"class","w-full h-full flex flex-col items-center justify-center relative pointer-events-none")},m(w,C){L(w,t,C),p(t,s),Q(e,s,null),p(s,i),p(s,n),p(s,r),v&&v.m(s,null),p(t,d),p(t,f),y&&y.m(f,null),p(t,c),p(t,o),g=!0,b||(M=[Y(f,"click",a[6]),Y(o,"click",a[7])],b=!0)},p(w,[C]){const E={};C&1&&(E.duration=w[0]),e.$set(E),w[1]?v?v.p(w,C):(v=gt(w),v.c(),v.m(s,null)):v&&(v.d(1),v=null),w[2]?y?y.p(w,C):(y=bt(w),y.c(),y.m(f,null)):y&&(y.d(1),y=null)},i(w){g||($(e.$$.fragment,w),w&&U(()=>{g&&(_||(_=D(o,V,{},!0)),_.run(1))}),g=!0)},o(w){j(e.$$.fragment,w),w&&(_||(_=D(o,V,{},!1)),_.run(0)),g=!1},d(w){w&&h(t),F(e),v&&v.d(),y&&y.d(),w&&_&&_.end(),b=!1,wt(M)}}}function Wt(a,t,s){let e,i,{nextStep:n}=t,{duration:l}=t;const r=kt(),d=nt(l),f=nt(0);J(a,f,v=>s(1,e=v));const c=nt([]),o=nt(null);J(a,o,v=>s(2,i=v));const u=v=>{const y=l-P(d);f.update(I=>I+1),c.update(I=>[...I,y]),console.log(`Click ${P(f)} recorded at ${y} seconds`),W.capture("game_tap",{timestamp:y,total_taps:P(f),level:0,button:"distracted"});const{clientX:w,clientY:C,currentTarget:E}=v,S=E.getBoundingClientRect();o.set({x:w-S.left,y:C-S.top}),setTimeout(()=>o.set(null),600)},_=()=>{W.capture("meditation_exit",{duration_meditated:l-P(d),total_taps:P(c).length,level:0}),r("complete",{clickTimestamps:P(c),durationMeditated:l-P(d),completed:P(d)<5}),n()},g=()=>{console.log("Meditation complete! Click data:",P(c)),W.capture("meditation_completed",{duration:l,total_taps:P(c).length,level:0}),r("complete",{clickTimestamps:P(c),durationMeditated:l,completed:!0}),n()},b=()=>{const v=new(window.AudioContext||window.webkitAudioContext),y=v.createOscillator(),w=v.createGain();y.type="sine",y.frequency.setValueAtTime(880,v.currentTime),w.gain.setValueAtTime(.2,v.currentTime),y.connect(w),w.connect(v.destination),y.start(),setTimeout(()=>{y.stop()},100)},M=lt(d,v=>{v<l&&v%10===0&&b()});return J(a,M,v=>s(11,v)),a.$$set=v=>{"nextStep"in v&&s(10,n=v.nextStep),"duration"in v&&s(0,l=v.duration)},[l,e,i,d,f,o,u,_,g,M,n]}class zt extends X{constructor(t){super(),Z(this,t,Wt,Ut,K,{nextStep:10,duration:0})}}function Gt(a){let t,s="You completed your meditation distraction-free!";return{c(){t=k("p"),t.textContent=s,this.h()},l(e){t=x(e,"P",{class:!0,"data-svelte-h":!0}),N(t)!=="svelte-j87uf1"&&(t.textContent=s),this.h()},h(){m(t,"class","text-lg mt-4")},m(e,i){L(e,t,i)},p:z,d(e){e&&h(t)}}}function Yt(a){let t,s,e=ut(a[0].durationMeditated)+"",i,n,l=a[0].clickTimestamps.length+"",r,d,f,c,o,u,_;return{c(){t=k("p"),s=H("You meditated for "),i=H(e),n=H(" and recorded "),r=H(l),d=H(" distractions, spending "),f=H(a[1]),c=H("% of your meditation distracted."),o=O(),u=k("p"),_=H(a[2]),this.h()},l(g){t=x(g,"P",{class:!0});var b=T(t);s=A(b,"You meditated for "),i=A(b,e),n=A(b," and recorded "),r=A(b,l),d=A(b," distractions, spending "),f=A(b,a[1]),c=A(b,"% of your meditation distracted."),b.forEach(h),o=B(g),u=x(g,"P",{class:!0});var M=T(u);_=A(M,a[2]),M.forEach(h),this.h()},h(){m(t,"class","text-lg mt-4"),m(u,"class","text-lg font-mono mt-2")},m(g,b){L(g,t,b),p(t,s),p(t,i),p(t,n),p(t,r),p(t,d),p(t,f),p(t,c),L(g,o,b),L(g,u,b),p(u,_)},p(g,b){b&1&&e!==(e=ut(g[0].durationMeditated)+"")&&q(i,e),b&1&&l!==(l=g[0].clickTimestamps.length+"")&&q(r,l),b&2&&q(f,g[1]),b&4&&q(_,g[2])},d(g){g&&(h(t),h(o),h(u))}}}function qt(a){let t,s,e="Great practice!",i,n,l,r,d="Share",f,c,o,u="Exit",_,g,b=`<p>Learn to meditate for real at 
			<a href="https://www.dhamma.org" target="_blank" class="text-blue-500 underline">dhamma.org ↗</a></p> <p class="mt-2">This app was made by Arjun, PM with 5 years experience. 
			Hire him to build your 0-1 consumer products! 
			<a href="https://www.linkedin.com/in/arjunkalburgi" target="_blank" class="text-blue-500 underline">View LinkedIn ↗</a></p>`,M,v;function y(E,S){return E[0].clickTimestamps.length>0?Yt:Gt}let w=y(a),C=w(a);return{c(){t=k("div"),s=k("h2"),s.textContent=e,i=O(),C.c(),n=O(),l=k("div"),r=k("button"),r.textContent=d,f=O(),c=k("div"),o=k("button"),o.textContent=u,_=O(),g=k("div"),g.innerHTML=b,this.h()},l(E){t=x(E,"DIV",{class:!0});var S=T(t);s=x(S,"H2",{class:!0,"data-svelte-h":!0}),N(s)!=="svelte-1untj5h"&&(s.textContent=e),i=B(S),C.l(S),n=B(S),l=x(S,"DIV",{class:!0});var I=T(l);r=x(I,"BUTTON",{class:!0,"data-svelte-h":!0}),N(r)!=="svelte-1wlydhx"&&(r.textContent=d),I.forEach(h),f=B(S),c=x(S,"DIV",{class:!0});var R=T(c);o=x(R,"BUTTON",{class:!0,"data-svelte-h":!0}),N(o)!=="svelte-1t5v3tb"&&(o.textContent=u),R.forEach(h),_=B(S),g=x(S,"DIV",{class:!0,"data-svelte-h":!0}),N(g)!=="svelte-k92ud0"&&(g.innerHTML=b),S.forEach(h),this.h()},h(){m(s,"class","text-2xl font-bold"),m(r,"class","btn variant-filled px-4 py-2"),m(l,"class","mt-6 flex space-x-4"),m(o,"class","btn variant-outlined px-4 py-2"),m(c,"class","mt-6 flex space-x-4"),m(g,"class","absolute bottom-6 text-center text-sm text-gray-500"),m(t,"class","w-full h-full flex flex-col justify-center items-center p-6")},m(E,S){L(E,t,S),p(t,s),p(t,i),C.m(t,null),p(t,n),p(t,l),p(l,r),p(t,f),p(t,c),p(c,o),p(t,_),p(t,g),M||(v=[Y(r,"click",a[5]),Y(o,"click",a[6])],M=!0)},p(E,[S]){w===(w=y(E))&&C?C.p(E,S):(C.d(1),C=w(E),C&&(C.c(),C.m(t,n)))},i:z,o:z,d(E){E&&h(t),C.d(),M=!1,wt(v)}}}function Jt(a,t,s){let e,i,{closeModal:n}=t,{meditationResults:l}=t;const r=nt(l),d=lt(r,u=>{if(!u.clickTimestamps)return 0;const _=new Set(u.clickTimestamps.map(b=>Math.floor(b))).size,g=Math.round(_/u.durationMeditated*100);return Math.min(100,Math.max(0,g))});J(a,d,u=>s(1,e=u));const f=lt(d,u=>{const g=Math.round(u/100*20),b=20-g;return"▓".repeat(g)+"░".repeat(b)});J(a,f,u=>s(2,i=u));const c=()=>{navigator.share?(W.capture("results_shared",{total_taps:l.clickTimestamps.length,distraction_percentage:P(d),level:0}),navigator.share({text:`The Meditation Game App
I just finished a ${l.durationMeditated/60}-minute meditation with ${l.clickTimestamps.length} distractions.
${P(f)} ${P(d)}% distracted
Meditate here: https://www.arjunkalburgi.com/the-meditation-game/?utm_source=share`}).catch(u=>console.error("Sharing failed",u))):console.log("Web Share API not supported")},o=()=>{W.capture("results_exit",{shared:navigator.share!==void 0}),n()};return a.$$set=u=>{"closeModal"in u&&s(7,n=u.closeModal),"meditationResults"in u&&s(0,l=u.meditationResults)},[l,e,i,d,f,c,o,n]}class Kt extends X{constructor(t){super(),Z(this,t,Jt,qt,K,{closeModal:7,meditationResults:0})}}function xt(a){let t,s,e,i,n,l,r;const d=[Qt,Ft,Zt,Xt],f=[];function c(o,u){return o[1]===1?0:o[1]===2?1:o[1]===3?2:3}return e=c(a),i=f[e]=d[e](a),{c(){t=k("div"),s=k("div"),i.c(),this.h()},l(o){t=x(o,"DIV",{class:!0});var u=T(t);s=x(u,"DIV",{class:!0});var _=T(s);i.l(_),_.forEach(h),u.forEach(h),this.h()},h(){m(s,"class","fixed inset-0 bg-white flex flex-col items-center justify-center"),m(t,"class","fixed inset-0 flex items-center justify-center bg-black bg-opacity-50")},m(o,u){L(o,t,u),p(t,s),f[e].m(s,null),r=!0},p(o,u){let _=e;e=c(o),e===_?f[e].p(o,u):(st(),j(f[_],1,1,()=>{f[_]=null}),it(),i=f[e],i?i.p(o,u):(i=f[e]=d[e](o),i.c()),$(i,1),i.m(s,null))},i(o){r||($(i),o&&U(()=>{r&&(n||(n=D(s,V,{duration:500},!0)),n.run(1))}),o&&U(()=>{r&&(l||(l=D(t,V,{duration:500},!0)),l.run(1))}),r=!0)},o(o){j(i),o&&(n||(n=D(s,V,{duration:500},!1)),n.run(0)),o&&(l||(l=D(t,V,{duration:500},!1)),l.run(0)),r=!1},d(o){o&&h(t),f[e].d(),o&&n&&n.end(),o&&l&&l.end()}}}function Xt(a){let t,s,e,i;return s=new Kt({props:{closeModal:a[3],meditationResults:a[2]}}),{c(){t=k("div"),et(s.$$.fragment),this.h()},l(n){t=x(n,"DIV",{class:!0});var l=T(t);tt(s.$$.fragment,l),l.forEach(h),this.h()},h(){m(t,"class","absolute inset-0 flex flex-col")},m(n,l){L(n,t,l),Q(s,t,null),i=!0},p(n,l){const r={};l&4&&(r.meditationResults=n[2]),s.$set(r)},i(n){i||($(s.$$.fragment,n),n&&U(()=>{i&&(e||(e=D(t,V,{duration:300},!0)),e.run(1))}),i=!0)},o(n){j(s.$$.fragment,n),n&&(e||(e=D(t,V,{duration:300},!1)),e.run(0)),i=!1},d(n){n&&h(t),F(s),n&&e&&e.end()}}}function Zt(a){let t,s,e,i;return s=new zt({props:{duration:Ct,nextStep:a[5]}}),s.$on("complete",a[6]),{c(){t=k("div"),et(s.$$.fragment),this.h()},l(n){t=x(n,"DIV",{class:!0});var l=T(t);tt(s.$$.fragment,l),l.forEach(h),this.h()},h(){m(t,"class","absolute inset-0 flex flex-col")},m(n,l){L(n,t,l),Q(s,t,null),i=!0},p:z,i(n){i||($(s.$$.fragment,n),n&&U(()=>{i&&(e||(e=D(t,V,{duration:300},!0)),e.run(1))}),i=!0)},o(n){j(s.$$.fragment,n),n&&(e||(e=D(t,V,{duration:300},!1)),e.run(0)),i=!1},d(n){n&&h(t),F(s),n&&e&&e.end()}}}function Ft(a){let t,s,e,i;return s=new Ht({props:{nextStep:a[5],closeModal:a[3]}}),{c(){t=k("div"),et(s.$$.fragment),this.h()},l(n){t=x(n,"DIV",{class:!0});var l=T(t);tt(s.$$.fragment,l),l.forEach(h),this.h()},h(){m(t,"class","absolute inset-0 flex flex-col")},m(n,l){L(n,t,l),Q(s,t,null),i=!0},p:z,i(n){i||($(s.$$.fragment,n),n&&U(()=>{i&&(e||(e=D(t,V,{duration:300},!0)),e.run(1))}),i=!0)},o(n){j(s.$$.fragment,n),n&&(e||(e=D(t,V,{duration:300},!1)),e.run(0)),i=!1},d(n){n&&h(t),F(s),n&&e&&e.end()}}}function Qt(a){let t,s,e,i;return s=new Ot({props:{nextStep:a[5],closeModal:a[3]}}),{c(){t=k("div"),et(s.$$.fragment),this.h()},l(n){t=x(n,"DIV",{class:!0});var l=T(t);tt(s.$$.fragment,l),l.forEach(h),this.h()},h(){m(t,"class","absolute inset-0 flex flex-col")},m(n,l){L(n,t,l),Q(s,t,null),i=!0},p:z,i(n){i||($(s.$$.fragment,n),n&&U(()=>{i&&(e||(e=D(t,V,{duration:300},!0)),e.run(1))}),i=!0)},o(n){j(s.$$.fragment,n),n&&(e||(e=D(t,V,{duration:300},!1)),e.run(0)),i=!1},d(n){n&&h(t),F(s),n&&e&&e.end()}}}function te(a){let t,s,e=a[0]&&xt(a);return{c(){e&&e.c(),t=dt()},l(i){e&&e.l(i),t=dt()},m(i,n){e&&e.m(i,n),L(i,t,n),s=!0},p(i,[n]){i[0]?e?(e.p(i,n),n&1&&$(e,1)):(e=xt(i),e.c(),$(e,1),e.m(t.parentNode,t)):e&&(st(),j(e,1,1,()=>{e=null}),it())},i(i){s||($(e),s=!0)},o(i){j(e),s=!1},d(i){i&&h(t),e&&e.d(i)}}}let Ct=120;function ee(a,t,s){let{show:e=!1}=t,i=1,n;const l=()=>{s(0,e=!1),s(1,i=1)},r=c=>{const{clickTimestamps:o,durationMeditated:u,completed:_}=c.detail,b={user_id:$t(),created_at:new Date(new Date().getTime()-u*1e3).toISOString(),level:0,duration_meditated:u,duration_planned:Ct,total_clicks:o.length,click_timestamps:o,completed:_},M=JSON.parse(localStorage.getItem("meditation_sessions")||"[]");M.push(b),localStorage.setItem("meditation_sessions",JSON.stringify(M)),s(2,n=c.detail),d()},d=()=>setTimeout(()=>s(1,i++,i),300),f=c=>r(c);return a.$$set=c=>{"show"in c&&s(0,e=c.show)},[e,i,n,l,r,d,f]}class ne extends X{constructor(t){super(),Z(this,t,ee,te,K,{show:0})}}function se(a){let t,s,e,i="Welcome to The Meditation Game!",n,l,r="Learn how to meditate through gameplay",d,f,c,o="Start meditation",u,_,g=`<p>Learn to meditate for real at 
			<a href="https://www.dhamma.org" target="_blank" class="text-blue-500 underline">dhamma.org ↗</a></p> <p class="mt-2">This app was made by Arjun Kalburgi, PM with 5 years experience. 
			Hire him to build your 0-1 consumer products! 
			<a href="https://www.linkedin.com/in/arjunkalburgi" target="_blank" class="text-blue-500 underline">View LinkedIn ↗</a></p>`,b,M,v,y,w,C;function E(I){a[2](I)}let S={};return a[0]!==void 0&&(S.show=a[0]),M=new ne({props:S}),Dt.push(()=>Lt(M,"show",E)),{c(){t=k("div"),s=k("div"),e=k("h2"),e.textContent=i,n=O(),l=k("p"),l.textContent=r,d=O(),f=k("div"),c=k("button"),c.textContent=o,u=O(),_=k("div"),_.innerHTML=g,b=O(),et(M.$$.fragment),this.h()},l(I){t=x(I,"DIV",{class:!0});var R=T(t);s=x(R,"DIV",{class:!0});var G=T(s);e=x(G,"H2",{class:!0,"data-svelte-h":!0}),N(e)!=="svelte-pdov40"&&(e.textContent=i),n=B(G),l=x(G,"P",{"data-svelte-h":!0}),N(l)!=="svelte-9lckun"&&(l.textContent=r),d=B(G),f=x(G,"DIV",{class:!0});var ft=T(f);c=x(ft,"BUTTON",{class:!0,"data-svelte-h":!0}),N(c)!=="svelte-vb0hk2"&&(c.textContent=o),ft.forEach(h),G.forEach(h),u=B(R),_=x(R,"DIV",{class:!0,"data-svelte-h":!0}),N(_)!=="svelte-1iyjdy7"&&(_.innerHTML=g),R.forEach(h),b=B(I),tt(M.$$.fragment,I),this.h()},h(){m(e,"class","h2"),m(c,"class","btn variant-filled"),m(f,"class","flex justify-center space-x-2"),m(s,"class","space-y-10 text-center flex flex-col items-center"),m(_,"class","absolute bottom-6 text-center text-sm text-gray-500"),m(t,"class","container h-full mx-auto flex justify-center items-center svelte-v1my5k")},m(I,R){L(I,t,R),p(t,s),p(s,e),p(s,n),p(s,l),p(s,d),p(s,f),p(f,c),p(t,u),p(t,_),L(I,b,R),Q(M,I,R),y=!0,w||(C=Y(c,"click",a[1]),w=!0)},p(I,[R]){const G={};!v&&R&1&&(v=!0,G.show=I[0],Vt(()=>v=!1)),M.$set(G)},i(I){y||($(M.$$.fragment,I),y=!0)},o(I){j(M.$$.fragment,I),y=!1},d(I){I&&(h(t),h(b)),F(M,I),w=!1,C()}}}function ie(a,t,s){let e=!1;const i=()=>s(0,e=!0);function n(l){e=l,s(0,e)}return[e,i,n]}class ue extends X{constructor(t){super(),Z(this,t,ie,se,K,{})}}export{ue as component};
