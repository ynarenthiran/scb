(this.webpackJsonpscb=this.webpackJsonpscb||[]).push([[0],{159:function(e,t,s){},160:function(e,t,s){},161:function(e,t,s){},308:function(e,t,s){},313:function(e,t,s){"use strict";s.r(t);var a=s(0),r=s.n(a),i=s(26),l=s.n(i),n=(s(159),s(140)),c=s(141),d=s(152),j=s(150),o=(s(160),s(323)),u=s(317),b=s(318),h=s(324),m=s(97),O=s(325),x=s(326),v=(s(161),s(320)),f=s(321),p=s(322),g=s(319),M=s(37),q=s(7);var w=function(e){return Object(q.jsxs)("div",{className:"form",children:[Object(q.jsxs)("div",{className:"title",children:["review"===e.status?"Review of ":"","Order Details"]}),Object(q.jsxs)(v.a,{layout:"vertical",fields:e.fields,onFieldsChange:function(t,s){e.onChange(s)},form:e.form,children:[Object(q.jsx)(u.a,{children:Object(q.jsxs)(h.b,{children:[Object(q.jsx)(v.a.Item,{name:"title",label:"Title",rules:[{required:!0,message:"Username is required!"}],children:Object(q.jsxs)(f.a,{disabled:"review"===e.status,size:"large",placeholder:"Please Select...",children:[Object(q.jsx)(M.Option,{value:"Mr.",children:"Mr."}),Object(q.jsx)(M.Option,{value:"Mrs.",children:"Mrs."})]})}),Object(q.jsxs)(v.a.Item,{name:"firstName",label:"First Name",rules:[{required:!0,message:"Username is required!"}],children:[Object(q.jsx)(p.a,{disabled:"review"===e.status,size:"large",placeholder:"First Name"}),!1]}),Object(q.jsxs)(v.a.Item,{name:"lastName",label:"Last Name",rules:[{required:!0,message:"Username is required!"}],children:[Object(q.jsx)(p.a,{disabled:"review"===e.status,size:"large",placeholder:"Last Name"}),!1]})]})}),Object(q.jsx)(u.a,{children:Object(q.jsxs)(h.b,{children:[Object(q.jsxs)(v.a.Item,{name:"mobileNumber",label:"Mobile Number",rules:[{required:!0,message:"Username is required!"}],children:[Object(q.jsx)(p.a,{disabled:"review"===e.status,size:"large",placeholder:"Mobile Number"}),!1]}),Object(q.jsxs)(v.a.Item,{name:"emailAddress",label:"Email Address",rules:[{required:!0,message:"Username is required!"}],children:[Object(q.jsx)(p.a,{disabled:"review"===e.status,size:"large",placeholder:"Email Address"}),!1]})]})}),Object(q.jsx)(u.a,{children:Object(q.jsxs)(h.b,{children:[Object(q.jsx)(v.a.Item,{name:"collectionBranch",label:"Collection Branch",rules:[{required:!0,message:"Username is required!"}],children:Object(q.jsx)(f.a,{disabled:"review"===e.status,size:"large",placeholder:"Please Select...",children:["1","2","3","4","5","6","7","8"].map((function(e){return Object(q.jsxs)(M.Option,{value:e,children:["Branch ",e]})}))})}),Object(q.jsx)(v.a.Item,{name:"collectionDate",label:"Collection Date",rules:[{required:!0,message:"Username is required!"}],children:Object(q.jsx)(g.a,{disabled:"review"===e.status,size:"large",style:{width:"100%"}})}),Object(q.jsx)(v.a.Item,{name:"collectionTimeslot",label:"Collection Timeslot",rules:[{required:!0,message:"Username is required!"}],children:Object(q.jsxs)(f.a,{disabled:"review"===e.status,size:"large",placeholder:"Please Select...",children:[Object(q.jsx)(M.Option,{value:"10-11",children:"10.00 AM - 11.00 AM"}),Object(q.jsx)(M.Option,{value:"11-12",children:"11.00 AM - 12.00 PM"}),Object(q.jsx)(M.Option,{value:"12-13",children:"12.00 PM - 01.00 PM"}),Object(q.jsx)(M.Option,{value:"14-15",children:"02.00 PM - 03.00 PM"}),Object(q.jsx)(M.Option,{value:"15-16",children:"03.00 PM - 04.00 PM"}),Object(q.jsx)(M.Option,{value:"16-17",children:"04.00 PM - 05.00 PM"}),Object(q.jsx)(M.Option,{value:"17-18",children:"05.00 PM - 06.00 PM"}),Object(q.jsx)(M.Option,{value:"18-19",children:"06.00 PM - 07.00 PM"}),Object(q.jsx)(M.Option,{value:"19-20",children:"07.00 PM - 08.00 PM"})]})})]})}),Object(q.jsx)(v.a.Item,{label:"Quantity",children:Object(q.jsx)("span",{className:"ant-form-text",children:"1"})})]})]})};s(308);var N=function(){return Object(q.jsxs)("div",{className:"important-notes",children:[Object(q.jsx)("div",{className:"title",children:"Important Notes"}),Object(q.jsxs)("ol",{children:[Object(q.jsx)("li",{children:"Each client can only submit one pre-order application"}),Object(q.jsx)("li",{children:"xxx xxx xxx"}),Object(q.jsx)("li",{children:"xxx xxx xxx"})]})]})},P=o.a.Header,y=o.a.Footer,C=o.a.Content,S=[{name:["title"],value:null,required:!0,disabled:!1},{name:["firstName"],value:null,required:!0,disabled:!1},{name:["lastName"],value:null,required:!0,disabled:!1},{name:["mobileNumber"],value:null,required:!0,disabled:!1},{name:["emailAddress"],value:null,required:!0,disabled:!1},{name:["collectionBranch"],value:null,required:!0,disabled:!1},{name:["collectionDate"],value:null,required:!0,disabled:!1},{name:["collectionTimeslot"],value:null,required:!0,disabled:!1}],k=function(e){Object(d.a)(s,e);var t=Object(j.a)(s);function s(){var e;Object(n.a)(this,s);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).form=void 0,e.state={fields:S,orderStatus:"change"},e}return Object(c.a)(s,[{key:"submitOrder",value:function(e){console.log(e)}},{key:"reviewOrder",value:function(e){this.setState({orderStatus:"review"}),e=S.map((function(e){return e.disabled=!0,e})),this.setState({fields:e})}},{key:"backToChange",value:function(){this.setState({orderStatus:"change"})}},{key:"render",value:function(){var e=this;return Object(q.jsxs)(o.a,{children:[Object(q.jsxs)(P,{children:[Object(q.jsx)("div",{className:"header",children:"Chinese New Year Banknotes Booking"}),Object(q.jsx)("div",{children:"Please fill in the below ordering form to complete the registration"})]}),Object(q.jsxs)(C,{children:[Object(q.jsx)(N,{}),Object(q.jsx)(w,{form:this.form,fields:this.state.fields,status:this.state.orderStatus,onChange:function(t){e.setState({fields:t})}})]}),Object(q.jsx)(y,{children:Object(q.jsx)(u.a,{className:"footer-row",children:Object(q.jsx)(b.a,{span:4,offset:20,children:Object(q.jsxs)(u.a,{children:["review"===this.state.orderStatus&&Object(q.jsxs)(h.b,{align:"end",children:[Object(q.jsx)(b.a,{span:12,children:Object(q.jsx)(m.a,{danger:!0,type:"primary",icon:Object(q.jsx)(O.a,{}),onClick:function(){return e.backToChange()},children:"Back"})}),Object(q.jsx)(b.a,{span:12,children:Object(q.jsx)(m.a,{type:"primary",icon:Object(q.jsx)(x.a,{}),onClick:function(){return e.submitOrder(e.state.fields)},children:"Submit"})})]}),"change"===this.state.orderStatus&&Object(q.jsx)(b.a,{span:12,offset:12,children:Object(q.jsx)(m.a,{type:"primary",icon:Object(q.jsx)(x.a,{}),onClick:function(){return e.reviewOrder(e.state.fields)},children:"Review"})})]})})})})]})}}]),s}(a.Component),I=k,B=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,327)).then((function(t){var s=t.getCLS,a=t.getFID,r=t.getFCP,i=t.getLCP,l=t.getTTFB;s(e),a(e),r(e),i(e),l(e)}))},z=s(149);l.a.render(Object(q.jsx)(z.a,{children:Object(q.jsx)(r.a.StrictMode,{children:Object(q.jsx)(I,{})})}),document.getElementById("root")),B()}},[[313,1,2]]]);
//# sourceMappingURL=main.fef89a25.chunk.js.map