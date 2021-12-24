const p=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}};p();const m="_input-ele_z81k2_1",g="_info_z81k2_15",h="_header-fields_z81k2_45",y="_field-item_z81k2_61",v="_field-name_z81k2_75",_="_field-value_z81k2_103",L="_json-text-area_z81k2_125";var o={inputEle:m,info:g,headerFields:h,fieldItem:y,fieldName:v,fieldValue:_,jsonTextArea:L};const d=(n,i=0,t=-1)=>{t===-1&&(t=n.byteLength);const r=[],e=n.slice(i,i+t),s=new Uint8Array(e),a=s.length;for(let l=0;l<a;l++)r.push(String.fromCharCode(s[l]));return r.join("")},f=(n,i,t=!0)=>{const r=n.getUint32(i,t),e=n.getUint32(i+4,t),s=t?r+2**32*e:2**32*r+e;return Number.isSafeInteger(s)||console.warn(s,"exceeds MAX_SAFE_INTEGER. Precision may be lost"),s},$=n=>{const i=new DataView(n),t={magic:d(n,0,4),version:i.getUint32(4,!0),jsonByteLength:f(i,8),binaryByteLength:f(i,16)},r=d(n,24,t.jsonByteLength),e=JSON.parse(r);return{headerInfo:t,subtreeHeaderJson:e}},c=document.querySelector("#app"),u=async(n,i)=>{const t=n.files;if((t==null?void 0:t.length)!==1)return;const r=t.item(0);if(!r)return;const e=await r.arrayBuffer(),s=$(e);i(s)};if(c){const n=document.createElement("input");n.type="file",n.id="file-input",n.accept=".subtree",n.classList.add(o.inputEle);const i=document.createElement("div");i.classList.add(o.info);const t=r=>{i.innerHTML=`
    <div class=${o.headerFields}>
      <div class=${o.fieldItem}>
        <span class=${o.fieldName}>magic</span><span class=${o.fieldValue}>${r.headerInfo.magic}</span>
      </div>
      <div class=${o.fieldItem}>
        <span class=${o.fieldName}>version</span><span class=${o.fieldValue}>${r.headerInfo.version}</span>
      </div>
      <div class=${o.fieldItem}>
        <span class=${o.fieldName}>jsonByteLength</span><span class=${o.fieldValue}>${r.headerInfo.jsonByteLength}</span>
      </div>
      <div class=${o.fieldItem}>
        <span class=${o.fieldName}>binaryByteLength</span><span class=${o.fieldValue}>${r.headerInfo.binaryByteLength}</span>
      </div>
    </div>
    <pre class=${o.jsonTextArea}>${JSON.stringify(r.subtreeHeaderJson,null,2)}</pre>
    `};n.addEventListener("drop",()=>{u(n,t)}),n.addEventListener("change",()=>{u(n,t)}),c.appendChild(n),c.appendChild(i)}
//# sourceMappingURL=index.1dac600b.js.map
