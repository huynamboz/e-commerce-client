(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{388:function(e,t,n){"use strict";n.r(t);n(11),n(32),n(33),n(370),n(220);var o={data:function(){return{fileUrl:"",fileType:""}},mounted:function(){this.fetchFile()},methods:{fetchFile:function(){var e=new XMLHttpRequest;e.open("GET","http://localhost:5000/api/uploadFile/1",!0),e.responseType="blob",e.onload=function(){if(200===e.status){var t=URL.createObjectURL(e.response),img=document.createElement("img");img.src=t,document.body.appendChild(img)}},e.send()}}},l=n(23),component=Object(l.a)(o,(function(){var e=this,t=e._self._c;return t("section",[t("label",{attrs:{for:""}}),e._v(" "),t("input",{attrs:{type:"file"},on:{change:e.uploadFile}})])}),[],!1,null,null,null);t.default=component.exports}}]);