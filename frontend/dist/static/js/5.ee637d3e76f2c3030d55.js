webpackJsonp([5],{"6hYb":function(t,e){},OePP:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"createQuestion"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],attrs:{id:"title",type:"text",placeholder:"質問のタイトル"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}}),t._v(" "),i("div",{attrs:{id:"choiceList"}},[t._l(t.choiceList,function(e,n){return i("div",{key:n},[i("input",{staticClass:"content",attrs:{type:"text"},domProps:{value:e.choice},on:{input:function(e){return t.addInput(e,n)}}}),t._v(" "),i("button",{attrs:{id:"deleteButton"},on:{click:function(e){return t.deleteChoice(n)}}},[t._v("削除")])])}),t._v(" "),i("button",{attrs:{id:"addButton"},on:{click:t.addChoice}},[t._v("追加")])],2),t._v(" "),i("br"),t._v(" "),i("input",{attrs:{type:"button",value:"送信"},on:{click:t.submitQuestion}})])},staticRenderFns:[]};var o={components:{inputQuestions:i("VU/8")({data:function(){return{title:"",choiceList:[{choice:"選択肢1"},{choice:"選択肢2"}]}},methods:{addChoice:function(){var t="選択肢"+(this.choiceList.length+1);this.choiceList.push({choice:t})},deleteChoice:function(t){this.choiceList.splice(t,1)},addInput:function(t,e){this.choiceList[e].choice=t.target.value},submitQuestion:function(){var t=[];this.choiceList.forEach(function(e){t.push(e.choice)});var e={title:this.title,choice:t};this.$emit("submitQuestion",e)}}},n,!1,function(t){i("6hYb")},"data-v-e831131e",null).exports},methods:{submitQuestion:function(t){this.$emit("submitQuestion",t)}}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("section",[e("h3",{attrs:{id:"title"}},[this._v("作成したい質問内容を入力してください")]),this._v(" "),e("inputQuestions",{on:{submitQuestion:this.submitQuestion}})],1)},staticRenderFns:[]};var s={data:function(){return{checked:!1}},components:{createQuestions:i("VU/8")(o,c,!1,function(t){i("oCV+")},"data-v-22a326b5",null).exports,questionHeader:i("w2ky").a},methods:{submitQuestion:function(t){var e=this;t.choice.length<2?alert("選択肢は二つ以上作成してください。"):""!==t.title?this.$axios_inst.post("/create",{title:t.title,choice:t.choice}).then(function(t){var i=t.data.questionsId;e.$axios_inst.put("/setting/addChoice/"+i,{addChoice:e.checked}).then(function(t){window.location.href=e.$base_url+"/question/vote/"+i}).catch(function(t){return console.log(t)})}).catch(function(t){return console.log(t)}):alert("タイトルを入力してください")},sendAddChoice:function(){this.checked=!this.checked}}},u={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("question-header",{attrs:{checked:this.checked},on:{input:this.sendAddChoice}}),this._v(" "),e("createQuestions",{on:{submitQuestion:this.submitQuestion}})],1)},staticRenderFns:[]},r=i("VU/8")(s,u,!1,null,null,null);e.default=r.exports},"oCV+":function(t,e){}});
//# sourceMappingURL=5.ee637d3e76f2c3030d55.js.map