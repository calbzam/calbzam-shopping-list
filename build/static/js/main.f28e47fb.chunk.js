(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(2),r=t(0),u=t.n(r),o=t(13),c=t.n(o),l=function(e){return u.a.createElement(u.a.Fragment,null,u.a.createElement("form",{onSubmit:e.addPerson},u.a.createElement("div",null,"name:",u.a.createElement("input",{value:e.name,onChange:e.onChangeName})),u.a.createElement("div",null,"number:",u.a.createElement("input",{value:e.number,onChange:e.onChangeNumber})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add"))))},m=function(e){return u.a.createElement(u.a.Fragment,null,u.a.createElement("p",null,u.a.createElement("div",null,e.name," ",e.number," ",u.a.createElement("button",{onClick:e.toggleButton},"delete"))))},i=t(3),s=t.n(i),d=function(){return s.a.get("/api/persons").then(function(e){return e.data})},f=function(e){return s.a.post("/api/persons",e).then(function(e){return e.data})},b=function(e){return s.a.delete("".concat("/api/persons","/").concat(e))},h=function(e,n){return e.filter(function(e){return e.name.toLowerCase().includes(n.toLowerCase())}).length===e.length},v=function(e){var n=e.message;return null===n?null:u.a.createElement("div",{className:"error"},n)};t(37);c.a.render(u.a.createElement(function(){var e=Object(r.useState)([]),n=Object(a.a)(e,2),t=n[0],o=n[1],c=Object(r.useState)(""),i=Object(a.a)(c,2),s=i[0],E=i[1],p=Object(r.useState)(""),g=Object(a.a)(p,2),w=g[0],C=g[1],j=Object(r.useState)(""),O=Object(a.a)(j,2),k=O[0],y=O[1],S=Object(r.useState)(null),N=Object(a.a)(S,2),L=N[0],B=N[1];Object(r.useEffect)(function(){d().then(function(e){o(e)})},[]);var P=h(t,k)?t:t.filter(function(e){return e.name.toLowerCase().includes(k.toLowerCase())});return u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(v,{message:L}),u.a.createElement("div",null,"filter shown with: ",u.a.createElement("input",{value:k,placeholder:"Search a name here",onChange:function(e){y(e.target.value)}})),u.a.createElement("h3",null,"Add a new:"),u.a.createElement(l,{addPerson:function(e){e.preventDefault();var n={name:s,number:w};void 0===t.find(function(e){return e.name===s})?f(n).then(function(e){o(t.concat(e)),E(""),C(""),B("".concat(n.name," was successfuly added to the phonebook")),setTimeout(function(){B(null)},4e3)}).catch(function(e){B("cannot save person:".concat(n.name))}):alert("".concat(n.name," is already added to phonebook"))},name:s,onChangeName:function(e){E(e.target.value)},number:w,onChangeNumber:function(e){C(e.target.value)}}),u.a.createElement("h2",null,"Numbers"),u.a.createElement("div",null,P.map(function(e){return u.a.createElement(m,{key:e.name,name:e.name,number:e.number,toggleButton:function(){return n=e.id,a=e.name,void(window.confirm("Do you really want to delete ".concat(a," ?"))&&b(n).then(function(){var e=t.filter(function(e){return e.id!==n});o(e),B("".concat(a," was successfuly removed from the phonebook")),setTimeout(function(){B(null)},4e3)}));var n,a}})})))},null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.f28e47fb.chunk.js.map