import{a5 as e,_ as t,j as a,e as i,i as o,y as s,J as r,n}from"./main-ec7846c8.js";import{S as d}from"./c.79c8c092.js";import{a as u,b as l,c,d as m,U as h}from"./c.811f664e.js";import{s as p}from"./c.468b43fb.js";import{f as _}from"./c.128a6b66.js";import{i as f,a as v,b as y,d as g}from"./c.8d65df0a.js";import{p as b}from"./c.aaeac12d.js";import{u as k}from"./c.d8036e66.js";import{c as w}from"./c.d2f13ac1.js";import{a as $}from"./c.04ecc0ad.js";import{c as j}from"./c.fa0ef026.js";import"./c.227858d9.js";import"./c.417318ff.js";import"./c.0e3055bd.js";import"./c.8e28b461.js";import"./c.eea05cf6.js";import"./c.2610e8cd.js";import"./c.743a15a1.js";import"./c.a0946910.js";const x={s:1,min:60,h:3600,d:86400};b&&await b;const D=(e,t)=>I(t).format(e),I=e((e=>new Intl.DateTimeFormat("en"!==e.language||k(e)?e.language:"en-u-hc-h23",{hour:"numeric",minute:"2-digit",hour12:k(e)})));e((e=>new Intl.DateTimeFormat("en"!==e.language||k(e)?e.language:"en-u-hc-h23",{hour:k(e)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:k(e)}))),e((e=>new Intl.DateTimeFormat("en"!==e.language||k(e)?e.language:"en-u-hc-h23",{weekday:"long",hour:k(e)?"numeric":"2-digit",minute:"2-digit",hour12:k(e)}))),e((()=>new Intl.DateTimeFormat("en-GB",{hour:"numeric",minute:"2-digit",hour12:!1})));const B=(e,t,a,i)=>T(e,a,t.entity_id,t.attributes,void 0!==i?i:t.state),T=(e,t,a,i,o)=>{if(o===u||o===l)return e(`state.default.${o}`);if(f(i)){if("duration"===i.device_class&&i.unit_of_measurement&&x[i.unit_of_measurement])try{return s=o,r=i.unit_of_measurement,p(parseFloat(s)*x[r])||"0"}catch(e){}if("monetary"===i.device_class)try{return v(o,t,{style:"currency",currency:i.unit_of_measurement,minimumFractionDigits:2})}catch(e){}const e=i.unit_of_measurement?"%"===i.unit_of_measurement?(e=>{switch(e.language){case"cz":case"de":case"fi":case"fr":case"sk":case"sv":return" ";default:return""}})(t)+"%":` ${i.unit_of_measurement}`:"";return`${v(o,t)}${e}`}var s,r;const n=w(a);if("input_datetime"===n){if(void 0===o){let e;return i.has_date&&i.has_time?(e=new Date(i.year,i.month-1,i.day,i.hour,i.minute),y(e,t)):i.has_date?(e=new Date(i.year,i.month-1,i.day),_(e,t)):i.has_time?(e=new Date,e.setHours(i.hour,i.minute),D(e,t)):o}try{const e=o.split(" ");if(2===e.length)return y(new Date(e.join("T")),t);if(1===e.length){if(o.includes("-"))return _(new Date(`${o}T00:00`),t);if(o.includes(":")){const e=new Date;return D(new Date(`${e.toISOString().split("T")[0]}T${o}`),t)}}return o}catch(e){return o}}if("humidifier"===n&&"on"===o&&i.humidity)return`${i.humidity} %`;if("counter"===n||"number"===n||"input_number"===n)return v(o,t);if("button"===n||"input_button"===n||"scene"===n||"sensor"===n&&"timestamp"===i.device_class)try{return y(new Date(o),t)}catch(e){return o}var d;return"update"===n?"on"===o?c(i)?$(i,m)&&"number"==typeof i.in_progress?e("ui.card.update.installing_with_progress",{progress:i.in_progress}):e("ui.card.update.installing"):i.latest_version:i.skipped_version===i.latest_version?null!==(d=i.latest_version)&&void 0!==d?d:e("state.default.unavailable"):e("ui.card.update.up_to_date"):i.device_class&&e(`component.${n}.state.${i.device_class}.${o}`)||e(`component.${n}.state._.${o}`)||o},q={alarm_control_panel:["armed_away","armed_custom_bypass","armed_home","armed_night","armed_vacation","arming","disarmed","disarming","pending","triggered"],automation:["on","off"],binary_sensor:["on","off"],button:[],calendar:["on","off"],camera:["idle","recording","streaming"],cover:["closed","closing","open","opening"],device_tracker:["home","not_home"],fan:["on","off"],humidifier:["on","off"],input_boolean:["on","off"],input_button:[],light:["on","off"],lock:["jammed","locked","locking","unlocked","unlocking"],media_player:["idle","off","paused","playing","standby"],person:["home","not_home"],remote:["on","off"],scene:[],schedule:["on","off"],script:["on","off"],siren:["on","off"],sun:["above_horizon","below_horizon"],switch:["on","off"],timer:["active","idle","paused"],update:["on","off"],vacuum:["cleaning","docked","error","idle","paused","returning"],weather:["clear-night","cloudy","exceptional","fog","hail","lightning-rainy","lightning","partlycloudy","pouring","rainy","snowy-rainy","snowy","sunny","windy-variant","windy"]},F={alarm_control_panel:{code_format:["number","text"]},binary_sensor:{device_class:["battery","battery_charging","co","cold","connectivity","door","garage_door","gas","heat","light","lock","moisture","motion","moving","occupancy","opening","plug","power","presence","problem","running","safety","smoke","sound","tamper","update","vibration","window"]},button:{device_class:["restart","update"]},camera:{frontend_stream_type:["hls","web_rtc"]},climate:{hvac_action:["off","idle","heating","cooling","drying","fan"]},cover:{device_class:["awning","blind","curtain","damper","door","garage","gate","shade","shutter","window"]},humidifier:{device_class:["humidifier","dehumidifier"]},media_player:{device_class:["tv","speaker","receiver"],media_content_type:["app","channel","episode","game","image","movie","music","playlist","tvshow","url","video"]},number:{device_class:["temperature"]},sensor:{device_class:["apparent_power","aqi","battery","carbon_dioxide","carbon_monoxide","current","date","duration","energy","frequency","gas","humidity","illuminance","monetary","nitrogen_dioxide","nitrogen_monoxide","nitrous_oxide","ozone","pm1","pm10","pm25","power_factor","power","pressure","reactive_power","signal_strength","sulphur_dioxide","temperature","timestamp","volatile_organic_compounds","voltage"],state_class:["measurement","total","total_increasing"]},switch:{device_class:["outlet","switch"]},update:{device_class:["firmware"]},water_heater:{away_mode:["on","off"]}};t([n("ha-entity-state-picker")],(function(e,t){return{F:class extends t{constructor(...t){super(...t),e(this)}},d:[{kind:"field",decorators:[i({attribute:!1})],key:"hass",value:void 0},{kind:"field",decorators:[i()],key:"entityId",value:void 0},{kind:"field",decorators:[i()],key:"attribute",value:void 0},{kind:"field",decorators:[i({type:Boolean})],key:"autofocus",value:()=>!1},{kind:"field",decorators:[i({type:Boolean})],key:"disabled",value:()=>!1},{kind:"field",decorators:[i({type:Boolean})],key:"required",value:()=>!1},{kind:"field",decorators:[i({type:Boolean,attribute:"allow-custom-value"})],key:"allowCustomValue",value:void 0},{kind:"field",decorators:[i()],key:"label",value:void 0},{kind:"field",decorators:[i()],key:"value",value:void 0},{kind:"field",decorators:[i()],key:"helper",value:void 0},{kind:"field",decorators:[i({type:Boolean})],key:"_opened",value:()=>!1},{kind:"field",decorators:[o("ha-combo-box",!0)],key:"_comboBox",value:void 0},{kind:"method",key:"shouldUpdate",value:function(e){return!(!e.has("_opened")&&this._opened)}},{kind:"method",key:"updated",value:function(e){if(e.has("_opened")&&this._opened){const e=this.entityId?this.hass.states[this.entityId]:void 0;this._comboBox.items=this.entityId&&e?((e,t)=>{const a=j(e),i=[];switch(!t&&a in q?i.push(...q[a]):t&&a in F&&t in F[a]&&i.push(...F[a][t]),a){case"climate":t?"fan_mode"===t?i.push(...e.attributes.fan_modes):"preset_mode"===t?i.push(...e.attributes.preset_modes):"swing_mode"===t&&i.push(...e.attributes.swing_modes):i.push(...e.attributes.hvac_modes);break;case"device_tracker":case"person":t||i.push("home","not_home");break;case"fan":"preset_mode"===t&&i.push(...e.attributes.preset_modes);break;case"humidifier":"mode"===t&&i.push(...e.attributes.available_modes);break;case"input_select":case"select":t||i.push(...e.attributes.options);break;case"light":"effect"===t&&e.attributes.effect_list?i.push(...e.attributes.effect_list):"color_mode"===t&&e.attributes.supported_color_modes&&i.push(...e.attributes.supported_color_modes);break;case"media_player":"sound_mode"===t?i.push(...e.attributes.sound_mode_list):"source"===t&&i.push(...e.attributes.source_list);break;case"remote":"current_activity"===t&&i.push(...e.attributes.activity_list);break;case"vacuum":"fan_speed"===t&&i.push(...e.attributes.fan_speed_list);break;case"water_heater":t&&"operation_mode"!==t||i.push(...e.attributes.operation_list)}return t||i.push(...h),[...new Set(i)]})(e,this.attribute).map((t=>({value:t,label:this.attribute?g(this.hass,t):B(this.hass.localize,e,this.hass.locale,t)}))):[]}}},{kind:"method",key:"render",value:function(){var e;return this.hass?s`
      <ha-combo-box
        .hass=${this.hass}
        .value=${this._value}
        .autofocus=${this.autofocus}
        .label=${null!==(e=this.label)&&void 0!==e?e:this.hass.localize("ui.components.entity.entity-state-picker.state")}
        .disabled=${this.disabled||!this.entityId}
        .required=${this.required}
        .helper=${this.helper}
        .allowCustomValue=${this.allowCustomValue}
        item-value-path="value"
        item-label-path="label"
        @opened-changed=${this._openedChanged}
        @value-changed=${this._valueChanged}
      >
      </ha-combo-box>
    `:s``}},{kind:"get",key:"_value",value:function(){return this.value||""}},{kind:"method",key:"_openedChanged",value:function(e){this._opened=e.detail.value}},{kind:"method",key:"_valueChanged",value:function(e){e.stopPropagation();const t=e.detail.value;t!==this._value&&this._setValue(t)}},{kind:"method",key:"_setValue",value:function(e){this.value=e,setTimeout((()=>{r(this,"value-changed",{value:e}),r(this,"change")}),0)}}]}}),a);let C=t([n("ha-selector-state")],(function(e,t){return{F:class extends t{constructor(...t){super(...t),e(this)}},d:[{kind:"field",decorators:[i()],key:"hass",value:void 0},{kind:"field",decorators:[i()],key:"selector",value:void 0},{kind:"field",decorators:[i()],key:"value",value:void 0},{kind:"field",decorators:[i()],key:"label",value:void 0},{kind:"field",decorators:[i()],key:"helper",value:void 0},{kind:"field",decorators:[i({type:Boolean})],key:"disabled",value:()=>!1},{kind:"field",decorators:[i({type:Boolean})],key:"required",value:()=>!0},{kind:"field",decorators:[i()],key:"context",value:void 0},{kind:"method",key:"render",value:function(){var e,t;return s`
      <ha-entity-state-picker
        .hass=${this.hass}
        .entityId=${this.selector.state.entity_id||(null===(e=this.context)||void 0===e?void 0:e.filter_entity)}
        .attribute=${this.selector.state.attribute||(null===(t=this.context)||void 0===t?void 0:t.filter_attribute)}
        .value=${this.value}
        .label=${this.label}
        .helper=${this.helper}
        .disabled=${this.disabled}
        .required=${this.required}
        allow-custom-value
      ></ha-entity-state-picker>
    `}}]}}),d(a));export{C as HaSelectorState};
