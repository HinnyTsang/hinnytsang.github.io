(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,a){},103:function(e,t,a){},106:function(e,t,a){},108:function(e,t,a){},110:function(e,t,a){},112:function(e,t,a){},114:function(e,t,a){},116:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(29),l=a.n(c),o=a(21),i=a(4),m=a(7),s=a(129),u=a(120),f=a(130),h={dark:{txtColor1:"#FAFAFA",txtColor2:"#F5F5F5",txtColor3:"#BBBBBB",bgColor1:"#212121",bgColor2:"#424242",bgColor3:"#616161",sdColor:"#212121",txtShadow1:"#212121",ptColor:"#FF5252"},light:{txtColor1:"#212121",txtColor2:"#424242",txtColor3:"#616161",bgColor1:"#FAFAFA",bgColor2:"#F5F5F5",bgColor3:"#EEEEEE",sdColor:"#FAFAFA",txtShadow1:"#FAFAFA",ptColor:"#7C4DFF"}},p=Object(n.createContext)(),d=function(e){var t=e.children,a=Object(n.useState)("dark"),c=Object(m.a)(a,2),l=c[0],o=c[1],i=function(e){Object.keys(h[e]).map(function(t){var a="--".concat(t);return document.body.style.setProperty(a,h[e][t]),!0}),o(e)};return Object(n.useEffect)(function(){var e=window.matchMedia("(prefers-color-scheme: dark)").matches;i(e?"dark":"light")},[]),r.a.createElement(p.Provider,{value:{theme:l,setTheme:i}},t)},E=a(59),b=(a(69),function(){var e=Object(n.useContext)(p),t=e.theme,a=e.setTheme,c=Object(n.useState)("light"===t?-.02:.2),l=Object(m.a)(c,2),i=l[0],h=l[1],d=new E.a({canvas:document.getElementById("space-travel"),backgroundColor:"light"===t?"#B2FFFF":"#01001F",throttle:i,starfield:{count:50}});return Object(n.useEffect)(function(){h("light"===t?.2:-.02),d.start()},[t]),window.addEventListener("resize",function(){d.resize()}),r.a.createElement(s.a,{expand:"lg w-100 d-flex justify-content-center",variant:t},r.a.createElement(u.a,{className:"w-75"},r.a.createElement(s.a.Brand,{as:o.b,to:"/"},"MY",r.a.createElement("span",{className:"very-small"},"stical"),"-UNIVSRSE"),r.a.createElement(s.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(s.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(f.a,{className:"me-auto"},r.a.createElement(f.a.Link,{as:o.b,to:"/home"},"Home"),r.a.createElement(f.a.Link,{as:o.b,to:"/about"},"About"),r.a.createElement(f.a.Link,{as:o.b,to:"/simulation"},"Simulation"),r.a.createElement(f.a.Link,{as:o.b,to:"/contact"},"Contact"),r.a.createElement("div",{className:"mode-switcher d-flex justify-content-between align-items-center"},"dark",r.a.createElement("div",{className:"mode-bg justify-content-".concat("light"===t?"end":"start"),onClick:function(){a("light"===t?"dark":"light")}},r.a.createElement("div",{className:"mode-button"})),"light")))))}),y=a(22),g=a.n(y),v=a(43),w=(a(77),function(e){e.children,e.darkMode;return function(){var e=Object(v.a)(g.a.mark(function e(t){var a;return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:if((a=e.sent).ok){e.next=5;break}throw new Error(a.statusText);case 5:return e.abrupt("return",a.json());case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()("https://ipgeolocation.abstractapi.com/v1/?api_key=5f3960b5491a49b7b612a8295fd6f988").then(function(e){document.getElementById("hello").innerText="Welcome my "+e.country+" friends"}).catch(function(){document.getElementById("hello").innerText="Welcome my friends"}),r.a.createElement("div",{className:"jumbotron jumbotron-fluid"},r.a.createElement(u.a,{bsPrefix:"jumbotron--container"},r.a.createElement("div",{className:"jumbotron--title--container"},r.a.createElement("p",null,"Hi, I am"),r.a.createElement("h1",null,"Hinny Tsang"),r.a.createElement("p",{id:"hello"},"Welcome my friends"))))}),M=a(121),j=a(122),x=a(123),N=(a(79),function(){return r.a.createElement(u.a,{className:"w-100 text-center",bsPrefix:"footer"},r.a.createElement(u.a,{className:"w-75 d-flex flex-row justify-content-between"},r.a.createElement("div",{style:{fontSize:"10px",textShadow:"none"}},"space-travel theme from ",r.a.createElement("a",{href:"https://www.npmjs.com/package/space-travel"},"frequin")),r.a.createElement("div",null,r.a.createElement("a",{role:"button",href:"mailto:hinny@hinnytsang.com",className:"ml-3"},r.a.createElement(M.a,{style:{fontSize:"20px"}})),r.a.createElement("a",{role:"button",href:"https://github.com/hinnytsang",className:"ml-3"},r.a.createElement(j.a,{style:{fontSize:"20px"},role:"button",href:"https://github.com/hinnytsang"})),r.a.createElement("a",{role:"button",href:"https://www.linkedin.com/in/hinnytsang/",className:"ml-3"},r.a.createElement(x.a,{style:{fontSize:"20px"}})))),r.a.createElement("div",{className:"footer--copyright"},r.a.createElement("div",{style:{fontSize:"12px",textShadow:"none"}},"\xa9 2022 Copyright: ",r.a.createElement(o.b,{to:"/about",className:"footer--link",style:{textShadow:"none"}},"Tsang Man Hin"))))}),O=(a(81),function(e){var t=e.children,a=e.title,c=Object(i.e)();return Object(n.useEffect)(function(){console.log(c.pathname),"/"!==c.pathname?window.scroll({top:window.innerHeight-70,left:0,behavior:"smooth"}):window.scroll({top:0,left:0,behavior:"smooth"})},[c]),r.a.createElement(u.a,{bsPrefix:"page--container",className:"w-75 mx-auto"},a&&r.a.createElement("h1",{className:"title"},a),t)}),k=a(16),S=a(124),C=(a(83),function(e){var t=e.x,a=e.y,n=e.density,c=(e.id,{top:50*t+150,left:50*a+150,opacity:n});return r.a.createElement("div",{className:"particle",style:c})});function A(e,t){for(var a=e.length,n=Array(a).fill().map(function(){return Array(a).fill(0)}),r=Array(a).fill().map(function(){return Array(a).fill(0)}),c=0;c<a;++c)for(var l=0;l<a;++l)n[c][l]=e[c]-e[l],r[c][l]=t[c]-t[l];return[n,r]}function F(e,t,a,n){var r=A(e,t),c=Object(m.a)(r,2);return function(e,t,a){for(var n=e.length,r=Math.pow(1/(a*Math.sqrt(2*Math.PI)),2),c=Array(n).fill().map(function(){return Array(n).fill(0)}),l=0;l<n;++l)for(var o=0;o<n;++o){var i=Math.pow(e[l][o],2)+Math.pow(t[l][o],2);c[l][o]=r*Math.exp(-i/(2*Math.pow(a,2)))}return c}(c[0],c[1],n).map(function(e){return a*e.reduce(function(e,t){return e+t})})}function I(e,t,a,n,r,c,l,o,i,s){for(var u=e.length,f=F(e,t,r,c),h=function(e,t,a){return e.map(function(e){return t*Math.pow(e,1+1/a)})}(f,l,o),p=A(e,t),d=Object(m.a)(p,2),E=function(e,t,a){for(var n=e.length,r=Array(n).fill().map(function(){return Array(n).fill(0)}),c=Array(n).fill().map(function(){return Array(n).fill(0)}),l=Math.pow(1/(a*Math.sqrt(2*Math.PI)),2)*(-1/Math.pow(a,2)),o=0;o<n;++o)for(var i=0;i<n;++i){var m=Math.pow(e[o][i],2)+Math.pow(t[o][i],2),s=Math.exp(-m/(2*Math.pow(a,2)));r[o][i]=l*s*e[o][i],c[o][i]=l*s*t[o][i]}return[r,c]}(d[0],d[1],c),b=Object(m.a)(E,2),y=b[0],g=b[1],v=Array(u).fill(0),w=Array(u).fill(0),M=0;M<u;++M){for(var j=0;j<u;++j)v[M]-=r*(h[M]/Math.pow(f[M],2)+h[j]/Math.pow(f[j],2))*y[M][j],w[M]-=r*(h[M]/Math.pow(f[M],2)+h[j]/Math.pow(f[j],2))*g[M][j];v[M]-=s*e[M]+i*a[M],w[M]-=s*t[M]+i*n[M]}return[v,w]}var T=function(e,t){var a=Object(n.useRef)();Object(n.useEffect)(function(){a.current=e},[e]),Object(n.useEffect)(function(){if(null!==t){var e=setInterval(function(){a.current()},t);return function(){return clearInterval(e)}}},[t])},P=a(128),B=(a(85),function(){var e=Object(n.useState)(10),t=Object(m.a)(e,2),a=t[0],c=(t[1],Object(n.useState)(!0)),l=Object(m.a)(c,2),o=l[0],i=l[1],s=Object(n.useState)(30),u=Object(m.a)(s,2),f=u[0],h=u[1],p=Object(n.useState)(0),d=Object(m.a)(p,2),E=d[0],b=d[1],y=1/f,g=.4*Math.pow(Math.PI,-1.5)*Math.pow(1*Object(P.a)(3.5)/Math.pow(1,2)/Object(P.a)(2),1)/1,v=function(){return Array.from({length:f},function(){return 5*(Math.random()-.5)})},w=function(){var e,t=Array.from({length:f},function(){return Math.random()-.5}),a=(e=t).reduce(function(e,t){return e+t})/e.length;return t.map(function(e){return e-a})},M=Object(n.useState)(v()),j=Object(m.a)(M,2),x=j[0],N=j[1],O=Object(n.useState)(v()),A=Object(m.a)(O,2),B=A[0],H=A[1],L=Object(n.useState)(w()),R=Object(m.a)(L,2),W=R[0],J=R[1],D=Object(n.useState)(w()),U=Object(m.a)(D,2),Y=U[0],q=U[1],G=I(x,B,W,Y,y,.1,.1,1,1,g),Q=Object(m.a)(G,2),X=Q[0],K=Q[1],V=Object(n.useState)(X),_=Object(m.a)(V,2),Z=_[0],$=_[1],ee=Object(n.useState)(K),te=Object(m.a)(ee,2),ae=te[0],ne=te[1],re=Object(n.useState)(F(x,B,y,.1)),ce=Object(m.a)(re,2),le=ce[0],oe=ce[1],ie=Array.from({length:f},function(e,t){return r.a.createElement(C,{key:t,id:t,x:x[t],y:B[t],density:le[t]})});T(function(){var e=W.concat(),t=Y.concat(),a=x.concat(),n=B.concat();e=e.map(function(e,t){return e+.04*Z[t]/2}),t=t.map(function(e,t){return e+.04*ae[t]/2});var r=I(a=a.map(function(t,a){return t+.04*e[a]}),n=n.map(function(e,a){return e+.04*t[a]}),e,t,y,.1,.1,1,1,g),c=Object(m.a)(r,2),l=c[0],o=c[1];$(l),ne(o),N(a),H(n),e=e.map(function(e,t){return e+.04*l[t]/2}),t=t.map(function(e,t){return e+.04*o[t]/2}),J(e),q(t),b(function(e){return e+.04});var i=F(a,n,y,.1);oe(i.map(function(e){return e/Math.max.apply(Math,Object(k.a)(i))})),h(f)},o?a:null);return r.a.createElement(z,null,ie,r.a.createElement("div",{className:"w-100 canvas--items"},r.a.createElement("p",{className:"counter"}," t = ",E.toFixed(2)),r.a.createElement("div",{className:"canvas--panel"},r.a.createElement(S.a,{onClick:function(){if(o){b(0),N(v()),H(v()),J(w()),q(w());var e=I(x,B,W,Y,y,.1,.1,1,1,g),t=Object(m.a)(e,2),a=t[0],n=t[1];$(a),ne(n)}else i(!0)}},o?"Restart":"Continue"),o&&r.a.createElement(S.a,{onClick:function(){return i(!1)}},"Pause"),r.a.createElement(S.a,{onClick:function(){var e=w(),t=w();J(function(t){return t.map(function(t,a){return t+5*e[a]})}),q(function(e){return e.map(function(e,a){return e+5*t[a]})})}},"Boost"))))}),H=(a(95),function(e){var t=e.children;return r.a.createElement("div",{className:"subtitle--container"},r.a.createElement("div",{className:"subtitle"},t))}),z=(a(97),function(e){var t=e.children;return r.a.createElement("div",{className:"sandbox--container"},r.a.createElement("div",{className:"sandbox"},t))}),L=(a(99),function(e){var t=e.x,a=e.y,n=e.width,c=e.density,l=(e.id,{width:"".concat(300/n,"px"),height:"".concat(300/n,"px"),top:300/n*t+150,left:300/n*a+150,opacity:c});return r.a.createElement("div",{style:l,className:"cell"})}),R=(a(101),function(){var e=Object(n.useState)(25),t=Object(m.a)(e,2),a=t[0],c=(t[1],Object(n.useState)(800)),l=Object(m.a)(c,2),o=l[0],i=(l[1],Object(n.useState)(Array.from({length:a},function(e){return Array.from({length:a},function(e){return 0})}))),s=Object(m.a)(i,2),u=s[0],f=s[1],h=a,p=a,d=50/180*Math.PI,E=50/180*Math.PI,b=Object(n.useState)(Array.from({length:o}).map(function(e,t){return t/o*Math.PI*2})),y=Object(m.a)(b,2),g=y[0],v=y[1],w=Object(n.useState)(Array.from({length:o}).map(function(e,t){return 2*Math.cos(g[t])})),M=Object(m.a)(w,2),j=M[0],x=M[1],N=Object(n.useState)(Array.from({length:o}).map(function(e,t){return 2*Math.sin(g[t])})),O=Object(m.a)(N,2),S=O[0],C=O[1],A=Array.from({length:a},function(e,t){return Array.from({length:a},function(e,n){return r.a.createElement(L,{key:t+Math.pow(a,2)*n,id:t+n,x:t-a/2,y:n-a/2,density:2*u[t][n],width:a})})});return T(function(){for(var e=j.map(function(e){return e}),t=S.map(function(e){return e}),a=g.map(function(e){return e}),n=u,r=function(r){var c=[a[r],a[r]-d,a[r]+d],l=Math.random();(c=c.map(function(a,n){for(var c=7*Math.cos(a),l=7*Math.sin(a),o=Math.max(Math.min(Math.floor((e[r]+c+p)/2),p-1),0),i=Math.max(Math.min(Math.floor((t[r]+l+h)/2),h-1),0),m=0,s=Math.max(0,o-1);s<Math.min(p,o+1);++s)for(var f=Math.max(0,i-1);f<Math.min(h,i+1);++f)m+=u[s][f]/(1+(Math.pow(o-s,2)+Math.pow(i-f,2))),s!==p-1&&0!==s&&f!==h-1&&0!==f||(m-=100);return m}))[0]>c[1]&&c[0]>c[2]||(c[0]<c[1]&&c[0]<c[2]?a[r]+=(l-.5)*E:c[1]<c[2]?a[r]+=l*E:c[2]<c[1]&&(a[r]-=l*E));var o=1.2*Math.cos(a[r]),i=1.2*Math.sin(a[r]);e[r]+o>p&&(e[r]=-p+(e[r]+o-p)),e[r]+o<-p&&(e[r]=p-e[r]+o+p),t[r]+i>p&&(t[r]=-p+(t[r]+o-p)),t[r]+i<-p&&(t[r]=p+t[r]+o+p);var m=Math.atan2(i,o);e[r]+=o,t[r]+=i,a[r]=m;var s=Math.max(Math.min(Math.floor((e[r]+p)/2),p-1),0),f=Math.max(Math.min(Math.floor((t[r]+p)/2),h-1),0);n[s][f]+=.06},c=0;c<o;++c)r(c);for(var l=0;l<p;++l)for(var i=0;i<h;++i)n[l][i]*=.7;x(e),C(t),v(a),f(n)},100),r.a.createElement(z,null,r.a.createElement("div",{className:"cover",onClick:function(e){var t=e.target.getBoundingClientRect(),a=e.clientX-t.left,n=e.clientY-t.top,r=Math.max(Math.min(Math.floor(n/300*p),p-1),0),c=Math.max(Math.min(Math.floor(a/300*p),h-1),0);f(function(e){return[].concat(Object(k.a)(e),[e[r][c]=1e8])})}}),r.a.createElement("div",{className:"filter"},A))}),W=a(125),J=a(105),D=a(126),U=(a(103),function(e){var t=e.darkMode;return r.a.createElement(O,{className:"about",title:"Tsang Man Hin",darkMode:t},r.a.createElement(W.a,null,r.a.createElement(J.a,null,r.a.createElement("p",null,"I am an MPhil student at The Chinese University of Hong Kong. Under the supervision of Prof. Li Hua-bai, I am now working on the numerical study of star formation.")),r.a.createElement(J.a,null,r.a.createElement(D.a,{src:"/images/mcnugget.jpg",className:"w-75"}))))}),Y=a(127),q=a(132),G=(a(106),function(){return r.a.createElement(O,{title:r.a.createElement("p",null,"MYstical - Universe")},r.a.createElement(W.a,{className:"description"},r.a.createElement(J.a,null,"Hi, welcome to my universe. This wepage is my personal webpage created with React.js as a learning project. I would also upload some interesting things here. Enjoy!")),r.a.createElement(H,null,"Whats New?"),r.a.createElement(Y.a,{className:"card-group mt-5"},r.a.createElement(q.a,{as:o.b,to:"../simulation#sph",className:"card"},r.a.createElement(q.a.Img,{variant:"top",src:"/images/sph-icon.png",alt:"sph",className:"card--image"}),r.a.createElement(q.a.Body,null,r.a.createElement(q.a.Title,null,"Real time star simulation"),r.a.createElement(q.a.Text,null))),r.a.createElement(q.a,{as:o.b,to:"../simulation#slime",className:"card"},r.a.createElement(q.a.Img,{variant:"top",src:"/images/slime-icon.png",alt:"sph",className:"card--image"}),r.a.createElement(q.a.Body,null,r.a.createElement(q.a.Title,null,"Real time slime mold simulation"),r.a.createElement(q.a.Text,null)))))}),Q=function(e){var t=e.darkMode;return r.a.createElement(O,{title:"Profile",darkMode:t})},X=function(e){var t=e.darkMode;return r.a.createElement(O,{title:"Page Not Found",darkMode:t},r.a.createElement("p",{style:{textAlign:"center",fontSize:20}},window.location.href," doesn't exist."))},K=(a(108),function(){return r.a.createElement(o.b,{to:"/simulation#remarks"},"*")}),V=function(){var e=Object(n.useState)(!1),t=Object(m.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)(!1),o=Object(m.a)(l,2),i=o[0],s=o[1];return r.a.createElement(O,{title:"Simulation",id:"demo"},r.a.createElement(W.a,{className:"w-100"},r.a.createElement(J.a,{className:"d-flex description"},r.a.createElement(H,{id:"sph"},"SPH",r.a.createElement(K,null)),r.a.createElement("p",{className:"section-paragraph"},"Demonstraction of a smooth particle hydrodynamics (SPH) simulation in 2D. We are simulating a toy star with SPH with a random initial conditions and a constant potential field.",r.a.createElement("br",null),"The code is receferenced by the",r.a.createElement("a",{href:"https://philip-mocz.medium.com/create-your-own-smoothed-particle-hydrodynamics-simulation-with-python-76e1cec505f1",className:"ref-url"}," blog "),"written by Philip Mocz in 2020.",r.a.createElement("br",null),r.a.createElement("br",null),a?"Click Boost to inject energy to the particles!":"Click Start to start your simulation!"),r.a.createElement(S.a,{className:"ref-btn",href:"https://github.com/HinnyTsang/hinnytsang.github.io/tree/react-app/src/components/sph"},"Check my code!")),r.a.createElement(J.a,null,a?r.a.createElement(B,null):r.a.createElement("div",{className:"preview--container"},r.a.createElement(S.a,{onClick:function(){c(!0),s(!1)}},"Start")))),r.a.createElement(W.a,{className:"w-100"},r.a.createElement(J.a,{className:"d-flex description"},r.a.createElement(H,{id:"slime"},"Slime Simulation",r.a.createElement(K,null)),r.a.createElement("p",{className:"section-paragraph"},"Demonstraction of a physarum transport networks. Inspired by Sebasian's",r.a.createElement("a",{href:"https://www.youtube.com/watch?v=X-iSQQgOd1A"}," video ")," and the algrothm is coming from Jones, Jeff's",r.a.createElement("a",{href:"https://uwe-repository.worktribe.com/output/980579",className:"ref-url"}," paper."),r.a.createElement("br",null),"Click on the sandbox to give the slime some food!."),r.a.createElement(S.a,{className:"ref-btn",href:"https://github.com/HinnyTsang/hinnytsang.github.io/tree/react-app/src/components/slime"},"Check my code!")),r.a.createElement(J.a,null,i?r.a.createElement(R,null):r.a.createElement("div",{className:"preview--container"},r.a.createElement(S.a,{onClick:function(){s(!0),c(!1)}},"Start")))),r.a.createElement("p",{id:"remarks",style:{bottom:"0px",paddingTop:"50px"}},"Current version is written by pure JavaScript. WebGL version for better performence will be update in the future."))},_=function(e){var t=e.darkMode;return r.a.createElement(O,{title:"Research",darkMode:t})},Z=a(131),$=(a(110),function(){return r.a.createElement(O,{title:"Send me a Message"},r.a.createElement("p",{className:"mb-5"},"Feel free to contact me any time. I will get back to you as soon as possible! Thank you so much!"),r.a.createElement(Z.a,{className:"w-100"},r.a.createElement(Z.a.Group,{className:"mb-3",controlId:"exampleForm.ControlInput1"},r.a.createElement(Z.a.Label,null,"Email address"),r.a.createElement(Z.a.Control,{className:"text-input",type:"email",placeholder:"name@example.com",readOnly:!0})),r.a.createElement(Z.a.Group,{className:"mb-3",controlId:"exampleForm.ControlTextarea1"},r.a.createElement(Z.a.Label,null,"Your feedback"),r.a.createElement(Z.a.Control,{className:"text-input",as:"textarea",placeholder:"under construction",rows:3,readOnly:!0}))),r.a.createElement(S.a,{className:"mb-5 btn"},"Submit"),r.a.createElement(H,null,"Contact informations"),r.a.createElement(W.a,{className:"info--container"},r.a.createElement("div",{className:"info mt-5"},r.a.createElement(M.a,{style:{fontSize:"25px"}}),r.a.createElement("a",{role:"button",href:"mailto:hinny@hinnytsang.com",className:"ml-3"},"hinny@hinnytsang.com")),r.a.createElement("div",{className:"info"},r.a.createElement(j.a,{style:{fontSize:"25px"}}),r.a.createElement("a",{role:"button",href:"https://github.com/hinnytsang",className:"ml-3"},"github.com/HinnyTsang")),r.a.createElement("div",{className:"info"},r.a.createElement(x.a,{style:{fontSize:"25px"}}),r.a.createElement("a",{role:"button",href:"https://www.linkedin.com/in/hinnytsang/",className:"ml-3"},"linkedin.com/in/hinnytsang/"))))}),ee=(a(112),function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(o.a,{basename:"/"},r.a.createElement("div",{className:"app"},r.a.createElement(b,null)),r.a.createElement(w,null),r.a.createElement(i.c,null,r.a.createElement(i.a,{path:"/",element:r.a.createElement(G,null)}),r.a.createElement(i.a,{path:"/home",element:r.a.createElement(G,null)}),r.a.createElement(i.a,{path:"/about",element:r.a.createElement(U,null)}),r.a.createElement(i.a,{path:"/research",element:r.a.createElement(_,null)}),r.a.createElement(i.a,{path:"/simulation",element:r.a.createElement(V,null)}),r.a.createElement(i.a,{path:"/profile",element:r.a.createElement(Q,null)}),r.a.createElement(i.a,{path:"/contact",element:r.a.createElement($,null)}),r.a.createElement(i.a,{path:"*",element:r.a.createElement(X,null)})),r.a.createElement(N,null)))});a(114);l.a.render(r.a.createElement(d,null,r.a.createElement(ee,null)),document.getElementById("root"))},62:function(e,t,a){e.exports=a(116)},69:function(e,t,a){},77:function(e,t,a){},79:function(e,t,a){},81:function(e,t,a){},83:function(e,t,a){},85:function(e,t,a){},94:function(e,t){},95:function(e,t,a){},97:function(e,t,a){},99:function(e,t,a){}},[[62,2,1]]]);
//# sourceMappingURL=main.f3b3f61f.chunk.js.map