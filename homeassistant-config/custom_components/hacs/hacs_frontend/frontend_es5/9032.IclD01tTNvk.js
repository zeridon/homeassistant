"use strict";(self.webpackChunkhacs_frontend=self.webpackChunkhacs_frontend||[]).push([[9032],{59039:function(e,t,r){r.d(t,{l:function(){return a}});var o=r(33994),i=r(22858),a=function(){var e=(0,i.A)((0,o.A)().mark((function e(t){var r;return(0,o.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!navigator.clipboard){e.next=9;break}return e.prev=1,e.next=4,navigator.clipboard.writeText(t);case 4:return e.abrupt("return");case 7:e.prev=7,e.t0=e.catch(1);case 9:(r=document.createElement("textarea")).value=t,document.body.appendChild(r),r.select(),document.execCommand("copy"),document.body.removeChild(r);case 15:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}()},17066:function(e,t,r){var o,i=r(64599),a=r(41981),n=r(33994),d=r(22858),s=r(35806),l=r(71008),u=r(62193),c=r(2816),h=r(27927),f=r(35890),p=(r(71499),r(81027),r(95737),r(79243),r(97741),r(89655),r(50693),r(29193),r(10507),r(39790),r(66457),r(7760),r(99019),r(16891),r(96858),r(66360)),m=r(29818),v=r(94100),y=r(50880),k=r(42946),_={key:"Mod-s",run:function(e){return(0,y.r)(e.dom,"editor-save"),!0}},C=function(e){var t=document.createElement("ha-icon");return t.icon=e.label,t};(0,h.A)([(0,m.EM)("ha-code-editor")],(function(e,t){var h,M,b=function(t){function r(){var t;(0,l.A)(this,r);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return t=(0,u.A)(this,r,[].concat(i)),e(t),t}return(0,c.A)(r,t),(0,s.A)(r)}(t);return{F:b,d:[{kind:"field",key:"codemirror",value:void 0},{kind:"field",decorators:[(0,m.MZ)()],key:"mode",value:function(){return"yaml"}},{kind:"field",key:"hass",value:void 0},{kind:"field",decorators:[(0,m.MZ)({type:Boolean})],key:"autofocus",value:function(){return!1}},{kind:"field",decorators:[(0,m.MZ)({type:Boolean})],key:"readOnly",value:function(){return!1}},{kind:"field",decorators:[(0,m.MZ)({type:Boolean})],key:"linewrap",value:function(){return!1}},{kind:"field",decorators:[(0,m.MZ)({type:Boolean,attribute:"autocomplete-entities"})],key:"autocompleteEntities",value:function(){return!1}},{kind:"field",decorators:[(0,m.MZ)({type:Boolean,attribute:"autocomplete-icons"})],key:"autocompleteIcons",value:function(){return!1}},{kind:"field",decorators:[(0,m.MZ)({type:Boolean})],key:"error",value:function(){return!1}},{kind:"field",decorators:[(0,m.wk)()],key:"_value",value:function(){return""}},{kind:"field",key:"_loadedCodeMirror",value:void 0},{kind:"field",key:"_iconList",value:void 0},{kind:"set",key:"value",value:function(e){this._value=e}},{kind:"get",key:"value",value:function(){return this.codemirror?this.codemirror.state.doc.toString():this._value}},{kind:"get",key:"hasComments",value:function(){if(!this.codemirror||!this._loadedCodeMirror)return!1;var e=this._loadedCodeMirror.highlightingFor(this.codemirror.state,[this._loadedCodeMirror.tags.comment]);return!!this.renderRoot.querySelector("span.".concat(e))}},{kind:"method",key:"connectedCallback",value:function(){(0,f.A)(b,"connectedCallback",this,3)([]),this.hasUpdated&&this.requestUpdate(),this.addEventListener("keydown",k.d),this.codemirror&&!1!==this.autofocus&&this.codemirror.focus()}},{kind:"method",key:"disconnectedCallback",value:function(){var e=this;(0,f.A)(b,"disconnectedCallback",this,3)([]),this.removeEventListener("keydown",k.d),this.updateComplete.then((function(){e.codemirror.destroy(),delete e.codemirror}))}},{kind:"method",key:"scheduleUpdate",value:(M=(0,d.A)((0,n.A)().mark((function e(){var t;return(0,n.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null===(t=this._loadedCodeMirror)||void 0===t){e.next=4;break}e.next=7;break;case 4:return e.next=6,Promise.all([r.e(2915),r.e(2487),r.e(7126)]).then(r.bind(r,77126));case 6:this._loadedCodeMirror=e.sent;case 7:(0,f.A)(b,"scheduleUpdate",this,3)([]);case 8:case"end":return e.stop()}}),e,this)}))),function(){return M.apply(this,arguments)})},{kind:"method",key:"update",value:function(e){if((0,f.A)(b,"update",this,3)([e]),this.codemirror){var t,r=[];if(e.has("mode")&&r.push({effects:this._loadedCodeMirror.langCompartment.reconfigure(this._mode)}),e.has("readOnly")&&r.push({effects:this._loadedCodeMirror.readonlyCompartment.reconfigure(this._loadedCodeMirror.EditorView.editable.of(!this.readOnly))}),e.has("linewrap")&&r.push({effects:this._loadedCodeMirror.linewrapCompartment.reconfigure(this.linewrap?this._loadedCodeMirror.EditorView.lineWrapping:[])}),e.has("_value")&&this._value!==this.value&&r.push({changes:{from:0,to:this.codemirror.state.doc.length,insert:this._value}}),r.length>0)(t=this.codemirror).dispatch.apply(t,r);e.has("error")&&this.classList.toggle("error-state",this.error)}else this._createCodeMirror()}},{kind:"get",key:"_mode",value:function(){return this._loadedCodeMirror.langs[this.mode]}},{kind:"method",key:"_createCodeMirror",value:function(){if(!this._loadedCodeMirror)throw new Error("Cannot create editor before CodeMirror is loaded");var e=[this._loadedCodeMirror.lineNumbers(),this._loadedCodeMirror.history(),this._loadedCodeMirror.drawSelection(),this._loadedCodeMirror.EditorState.allowMultipleSelections.of(!0),this._loadedCodeMirror.rectangularSelection(),this._loadedCodeMirror.crosshairCursor(),this._loadedCodeMirror.highlightSelectionMatches(),this._loadedCodeMirror.highlightActiveLine(),this._loadedCodeMirror.keymap.of([].concat((0,a.A)(this._loadedCodeMirror.defaultKeymap),(0,a.A)(this._loadedCodeMirror.searchKeymap),(0,a.A)(this._loadedCodeMirror.historyKeymap),(0,a.A)(this._loadedCodeMirror.tabKeyBindings),[_])),this._loadedCodeMirror.langCompartment.of(this._mode),this._loadedCodeMirror.haTheme,this._loadedCodeMirror.haSyntaxHighlighting,this._loadedCodeMirror.readonlyCompartment.of(this._loadedCodeMirror.EditorView.editable.of(!this.readOnly)),this._loadedCodeMirror.linewrapCompartment.of(this.linewrap?this._loadedCodeMirror.EditorView.lineWrapping:[]),this._loadedCodeMirror.EditorView.updateListener.of(this._onUpdate)];if(!this.readOnly){var t=[];this.autocompleteEntities&&this.hass&&t.push(this._entityCompletions.bind(this)),this.autocompleteIcons&&t.push(this._mdiCompletions.bind(this)),t.length>0&&e.push(this._loadedCodeMirror.autocompletion({override:t,maxRenderedOptions:10}))}this.codemirror=new this._loadedCodeMirror.EditorView({state:this._loadedCodeMirror.EditorState.create({doc:this._value,extensions:e}),parent:this.renderRoot})}},{kind:"field",key:"_getStates",value:function(){return(0,v.A)((function(e){return e?Object.keys(e).map((function(t){return{type:"variable",label:t,detail:e[t].attributes.friendly_name,info:"State: ".concat(e[t].state)}})):[]}))}},{kind:"method",key:"_entityCompletions",value:function(e){var t=e.matchBefore(/[a-z_]{3,}\.\w*/);if(!t||t.from===t.to&&!e.explicit)return null;var r=this._getStates(this.hass.states);return r&&r.length?{from:Number(t.from),options:r,validFor:/^[a-z_]{3,}\.\w*$/}:null}},{kind:"field",key:"_getIconItems",value:function(){var e=this;return(0,d.A)((0,n.A)().mark((function t(){var o;return(0,n.A)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e._iconList){t.next=9;break}0,o=[],t.next=8;break;case 5:return t.next=7,r.e(3174).then(r.t.bind(r,83174,19));case 7:o=t.sent.default;case 8:e._iconList=o.map((function(e){return{type:"variable",label:"mdi:".concat(e.name),detail:e.keywords.join(", "),info:C}}));case 9:return t.abrupt("return",e._iconList);case 10:case"end":return t.stop()}}),t)})))}},{kind:"method",key:"_mdiCompletions",value:(h=(0,d.A)((0,n.A)().mark((function e(t){var r,o;return(0,n.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((r=t.matchBefore(/mdi:\S*/))&&(r.from!==r.to||t.explicit)){e.next=3;break}return e.abrupt("return",null);case 3:return e.next=5,this._getIconItems();case 5:return o=e.sent,e.abrupt("return",{from:Number(r.from),options:o,validFor:/^mdi:\S*$/});case 7:case"end":return e.stop()}}),e,this)}))),function(e){return h.apply(this,arguments)})},{kind:"field",key:"_onUpdate",value:function(){var e=this;return function(t){t.docChanged&&(e._value=t.state.doc.toString(),(0,y.r)(e,"value-changed",{value:e._value}))}}},{kind:"get",static:!0,key:"styles",value:function(){return(0,p.AH)(o||(o=(0,i.A)([":host(.error-state) .cm-gutters{border-color:var(--error-state-color,red)}"])))}}]}}),p.mN)},9032:function(e,t,r){var o,i,a,n,d,s=r(33994),l=r(22858),u=r(64599),c=r(35806),h=r(71008),f=r(62193),p=r(2816),m=r(27927),v=r(35890),y=r(91001),k=(r(81027),r(51431)),_=r(66360),C=r(29818),M=r(50880),b=r(56974),g=(r(17066),r(59578)),A=r(59039);(0,m.A)([(0,C.EM)("ha-yaml-editor")],(function(e,t){var r,m=function(t){function r(){var t;(0,h.A)(this,r);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return t=(0,f.A)(this,r,[].concat(i)),e(t),t}return(0,p.A)(r,t),(0,c.A)(r)}(t);return{F:m,d:[{kind:"field",decorators:[(0,C.MZ)({attribute:!1})],key:"hass",value:void 0},{kind:"field",decorators:[(0,C.MZ)()],key:"value",value:void 0},{kind:"field",decorators:[(0,C.MZ)({attribute:!1})],key:"yamlSchema",value:function(){return k.my}},{kind:"field",decorators:[(0,C.MZ)()],key:"defaultValue",value:void 0},{kind:"field",decorators:[(0,C.MZ)({type:Boolean})],key:"isValid",value:function(){return!0}},{kind:"field",decorators:[(0,C.MZ)()],key:"label",value:void 0},{kind:"field",decorators:[(0,C.MZ)({type:Boolean})],key:"autoUpdate",value:function(){return!1}},{kind:"field",decorators:[(0,C.MZ)({type:Boolean})],key:"readOnly",value:function(){return!1}},{kind:"field",decorators:[(0,C.MZ)({type:Boolean})],key:"required",value:function(){return!1}},{kind:"field",decorators:[(0,C.MZ)({type:Boolean})],key:"copyClipboard",value:function(){return!1}},{kind:"field",decorators:[(0,C.MZ)({type:Boolean})],key:"hasExtraActions",value:function(){return!1}},{kind:"field",decorators:[(0,C.wk)()],key:"_yaml",value:function(){return""}},{kind:"method",key:"setValue",value:function(e){try{this._yaml=e&&!function(e){if("object"!==(0,y.A)(e))return!1;for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}(e)?(0,k.Bh)(e,{schema:this.yamlSchema,quotingType:'"',noRefs:!0}):""}catch(t){console.error(t,e),alert("There was an error converting to YAML: ".concat(t))}}},{kind:"method",key:"firstUpdated",value:function(){this.defaultValue&&this.setValue(this.defaultValue)}},{kind:"method",key:"willUpdate",value:function(e){(0,v.A)(m,"willUpdate",this,3)([e]),this.autoUpdate&&e.has("value")&&this.setValue(this.value)}},{kind:"method",key:"render",value:function(){return void 0===this._yaml?_.s6:(0,_.qy)(o||(o=(0,u.A)([" ",' <ha-code-editor .hass="','" .value="','" .readOnly="','" mode="yaml" autocomplete-entities autocomplete-icons .error="','" @value-changed="','" dir="ltr"></ha-code-editor> '," "])),this.label?(0,_.qy)(i||(i=(0,u.A)(["<p>","","</p>"])),this.label,this.required?" *":""):"",this.hass,this._yaml,this.readOnly,!1===this.isValid,this._onChange,this.copyClipboard||this.hasExtraActions?(0,_.qy)(a||(a=(0,u.A)(['<div class="card-actions"> ',' <slot name="extra-actions"></slot> </div>'])),this.copyClipboard?(0,_.qy)(n||(n=(0,u.A)([' <mwc-button @click="','"> '," </mwc-button>"])),this._copyYaml,this.hass.localize("ui.components.yaml-editor.copy_to_clipboard")):_.s6):_.s6)}},{kind:"method",key:"_onChange",value:function(e){var t;e.stopPropagation(),this._yaml=e.detail.value;var r=!0;if(this._yaml)try{t=(0,k.Hh)(this._yaml,{schema:this.yamlSchema})}catch(o){r=!1}else t={};this.value=t,this.isValid=r,(0,M.r)(this,"value-changed",{value:t,isValid:r})}},{kind:"get",key:"yaml",value:function(){return this._yaml}},{kind:"method",key:"_copyYaml",value:(r=(0,l.A)((0,s.A)().mark((function e(){return(0,s.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.yaml){e.next=4;break}return e.next=3,(0,A.l)(this.yaml);case 3:(0,g.P)(this,{message:this.hass.localize("ui.common.copied_clipboard")});case 4:case"end":return e.stop()}}),e,this)}))),function(){return r.apply(this,arguments)})},{kind:"get",static:!0,key:"styles",value:function(){return[b.RF,(0,_.AH)(d||(d=(0,u.A)([".card-actions{border-radius:var(--actions-border-radius,0px 0px var(--ha-card-border-radius,12px) var(--ha-card-border-radius,12px));border:1px solid var(--divider-color);padding:5px 16px}ha-code-editor{flex-grow:1}"])))]}}]}}),_.WF)},59578:function(e,t,r){r.d(t,{P:function(){return i}});var o=r(50880),i=function(e,t){return(0,o.r)(e,"hass-notification",t)}}}]);
//# sourceMappingURL=9032.IclD01tTNvk.js.map