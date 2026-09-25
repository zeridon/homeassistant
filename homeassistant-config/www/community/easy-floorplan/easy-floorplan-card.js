/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ut = globalThis, kn = Ut.ShadowRoot && (Ut.ShadyCSS === void 0 || Ut.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Sn = Symbol(), ao = /* @__PURE__ */ new WeakMap();
let Er = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Sn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (kn && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = ao.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && ao.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ii = (e) => new Er(typeof e == "string" ? e : e + "", void 0, Sn), Pt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, r) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[r + 1], e[0]);
  return new Er(i, e, Sn);
}, ys = (e, t) => {
  if (kn) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = Ut.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, so = kn ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return ii(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: bs, defineProperty: vs, getOwnPropertyDescriptor: ws, getOwnPropertyNames: _s, getOwnPropertySymbols: xs, getPrototypeOf: $s } = Object, xi = globalThis, lo = xi.trustedTypes, ks = lo ? lo.emptyScript : "", Ss = xi.reactiveElementPolyfillSupport, gt = (e, t) => e, ni = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? ks : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let i = e;
  switch (t) {
    case Boolean:
      i = e !== null;
      break;
    case Number:
      i = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(e);
      } catch {
        i = null;
      }
  }
  return i;
} }, En = (e, t) => !bs(e, t), co = { attribute: !0, type: String, converter: ni, reflect: !1, useDefault: !1, hasChanged: En };
Symbol.metadata ??= Symbol("metadata"), xi.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Je = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = co) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && vs(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: r } = ws(this.prototype, t) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: o, set(a) {
      const s = o?.call(this);
      r?.call(this, a), this.requestUpdate(t, s, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? co;
  }
  static _$Ei() {
    if (this.hasOwnProperty(gt("elementProperties"))) return;
    const t = $s(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(gt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(gt("properties"))) {
      const i = this.properties, n = [..._s(i), ...xs(i)];
      for (const o of n) this.createProperty(o, i[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [n, o] of i) this.elementProperties.set(n, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const o = this._$Eu(i, n);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const o of n) i.unshift(so(o));
    } else t !== void 0 && i.push(so(t));
    return i;
  }
  static _$Eu(t, i) {
    const n = i.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const n of i.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ys(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, i, n) {
    this._$AK(t, n);
  }
  _$ET(t, i) {
    const n = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, n);
    if (o !== void 0 && n.reflect === !0) {
      const r = (n.converter?.toAttribute !== void 0 ? n.converter : ni).toAttribute(i, n.type);
      this._$Em = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = n.getPropertyOptions(o), a = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : ni;
      this._$Em = o;
      const s = a.fromAttribute(i, r.type);
      this[o] = s ?? this._$Ej?.get(o) ?? s, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, r) {
    if (t !== void 0) {
      const a = this.constructor;
      if (o === !1 && (r = this[t]), n ??= a.getPropertyOptions(t), !((n.hasChanged ?? En)(r, i) || n.useDefault && n.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: o, wrapped: r }, a) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, a ?? i ?? this[t]), r !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, r] of n) {
        const { wrapped: a } = r, s = this[o];
        a !== !0 || this._$AL.has(o) || s === void 0 || this.C(o, void 0, r, s);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Je.elementStyles = [], Je.shadowRootOptions = { mode: "open" }, Je[gt("elementProperties")] = /* @__PURE__ */ new Map(), Je[gt("finalized")] = /* @__PURE__ */ new Map(), Ss?.({ ReactiveElement: Je }), (xi.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const An = globalThis, ho = (e) => e, oi = An.trustedTypes, po = oi ? oi.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ar = "$lit$", Ae = `lit$${Math.random().toFixed(9).slice(2)}$`, Mr = "?" + Ae, Es = `<${Mr}>`, qe = document, kt = () => qe.createComment(""), St = (e) => e === null || typeof e != "object" && typeof e != "function", Mn = Array.isArray, As = (e) => Mn(e) || typeof e?.[Symbol.iterator] == "function", Bi = `[ 	
\f\r]`, ht = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, uo = /-->/g, fo = />/g, ze = RegExp(`>|${Bi}(?:([^\\s"'>=/]+)(${Bi}*=${Bi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), mo = /'/g, go = /"/g, Tr = /^(?:script|style|textarea|title)$/i, Cr = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), y = Cr(1), _ = Cr(2), be = Symbol.for("lit-noChange"), f = Symbol.for("lit-nothing"), yo = /* @__PURE__ */ new WeakMap(), He = qe.createTreeWalker(qe, 129);
function Ir(e, t) {
  if (!Mn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return po !== void 0 ? po.createHTML(t) : t;
}
const Ms = (e, t) => {
  const i = e.length - 1, n = [];
  let o, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = ht;
  for (let s = 0; s < i; s++) {
    const l = e[s];
    let h, p, c = -1, d = 0;
    for (; d < l.length && (a.lastIndex = d, p = a.exec(l), p !== null); ) d = a.lastIndex, a === ht ? p[1] === "!--" ? a = uo : p[1] !== void 0 ? a = fo : p[2] !== void 0 ? (Tr.test(p[2]) && (o = RegExp("</" + p[2], "g")), a = ze) : p[3] !== void 0 && (a = ze) : a === ze ? p[0] === ">" ? (a = o ?? ht, c = -1) : p[1] === void 0 ? c = -2 : (c = a.lastIndex - p[2].length, h = p[1], a = p[3] === void 0 ? ze : p[3] === '"' ? go : mo) : a === go || a === mo ? a = ze : a === uo || a === fo ? a = ht : (a = ze, o = void 0);
    const u = a === ze && e[s + 1].startsWith("/>") ? " " : "";
    r += a === ht ? l + Es : c >= 0 ? (n.push(h), l.slice(0, c) + Ar + l.slice(c) + Ae + u) : l + Ae + (c === -2 ? s : u);
  }
  return [Ir(e, r + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Et {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let r = 0, a = 0;
    const s = t.length - 1, l = this.parts, [h, p] = Ms(t, i);
    if (this.el = Et.createElement(h, n), He.currentNode = this.el.content, i === 2 || i === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (o = He.nextNode()) !== null && l.length < s; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const c of o.getAttributeNames()) if (c.endsWith(Ar)) {
          const d = p[a++], u = o.getAttribute(c).split(Ae), g = /([.?@])?(.*)/.exec(d);
          l.push({ type: 1, index: r, name: g[2], strings: u, ctor: g[1] === "." ? Cs : g[1] === "?" ? Is : g[1] === "@" ? Ps : $i }), o.removeAttribute(c);
        } else c.startsWith(Ae) && (l.push({ type: 6, index: r }), o.removeAttribute(c));
        if (Tr.test(o.tagName)) {
          const c = o.textContent.split(Ae), d = c.length - 1;
          if (d > 0) {
            o.textContent = oi ? oi.emptyScript : "";
            for (let u = 0; u < d; u++) o.append(c[u], kt()), He.nextNode(), l.push({ type: 2, index: ++r });
            o.append(c[d], kt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Mr) l.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = o.data.indexOf(Ae, c + 1)) !== -1; ) l.push({ type: 7, index: r }), c += Ae.length - 1;
      }
      r++;
    }
  }
  static createElement(t, i) {
    const n = qe.createElement("template");
    return n.innerHTML = t, n;
  }
}
function ot(e, t, i = e, n) {
  if (t === be) return t;
  let o = n !== void 0 ? i._$Co?.[n] : i._$Cl;
  const r = St(t) ? void 0 : t._$litDirective$;
  return o?.constructor !== r && (o?._$AO?.(!1), r === void 0 ? o = void 0 : (o = new r(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ??= [])[n] = o : i._$Cl = o), o !== void 0 && (t = ot(e, o._$AS(e, t.values), o, n)), t;
}
class Ts {
  constructor(t, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: i }, parts: n } = this._$AD, o = (t?.creationScope ?? qe).importNode(i, !0);
    He.currentNode = o;
    let r = He.nextNode(), a = 0, s = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let h;
        l.type === 2 ? h = new rt(r, r.nextSibling, this, t) : l.type === 1 ? h = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (h = new Fs(r, this, t)), this._$AV.push(h), l = n[++s];
      }
      a !== l?.index && (r = He.nextNode(), a++);
    }
    return He.currentNode = qe, o;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class rt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, i, n, o) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && t?.nodeType === 11 && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    t = ot(this, t, i), St(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== be && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : As(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && St(this._$AH) ? this._$AA.nextSibling.data = t : this.T(qe.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Et.createElement(Ir(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(i);
    else {
      const r = new Ts(o, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = yo.get(t.strings);
    return i === void 0 && yo.set(t.strings, i = new Et(t)), i;
  }
  k(t) {
    Mn(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const r of t) o === i.length ? i.push(n = new rt(this.O(kt()), this.O(kt()), this, this.options)) : n = i[o], n._$AI(r), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); t !== this._$AB; ) {
      const n = ho(t).nextSibling;
      ho(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class $i {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, o, r) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = f;
  }
  _$AI(t, i = this, n, o) {
    const r = this.strings;
    let a = !1;
    if (r === void 0) t = ot(this, t, i, 0), a = !St(t) || t !== this._$AH && t !== be, a && (this._$AH = t);
    else {
      const s = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++) h = ot(this, s[n + l], i, l), h === be && (h = this._$AH[l]), a ||= !St(h) || h !== this._$AH[l], h === f ? t = f : t !== f && (t += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Cs extends $i {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class Is extends $i {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class Ps extends $i {
  constructor(t, i, n, o, r) {
    super(t, i, n, o, r), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = ot(this, t, i, 0) ?? f) === be) return;
    const n = this._$AH, o = t === f && n !== f || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, r = t !== f && (n === f || o);
    o && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Fs {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ot(this, t);
  }
}
const Os = { I: rt }, Ls = An.litHtmlPolyfillSupport;
Ls?.(Et, rt), (An.litHtmlVersions ??= []).push("3.3.3");
const zs = (e, t, i) => {
  const n = i?.renderBefore ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const r = i?.renderBefore ?? null;
    n._$litPart$ = o = new rt(t.insertBefore(kt(), r), r, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tn = globalThis;
let Te = class extends Je {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = zs(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return be;
  }
};
Te._$litElement$ = !0, Te.finalized = !0, Tn.litElementHydrateSupport?.({ LitElement: Te });
const Ds = Tn.litElementPolyfillSupport;
Ds?.({ LitElement: Te });
(Tn.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ki = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rs = { attribute: !0, type: String, converter: ni, reflect: !1, hasChanged: En }, Ns = (e = Rs, t, i) => {
  const { kind: n, metadata: o } = i;
  let r = globalThis.litPropertyMetadata.get(o);
  if (r === void 0 && globalThis.litPropertyMetadata.set(o, r = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), r.set(i.name, e), n === "accessor") {
    const { name: a } = i;
    return { set(s) {
      const l = t.get.call(this);
      t.set.call(this, s), this.requestUpdate(a, l, e, !0, s);
    }, init(s) {
      return s !== void 0 && this.C(a, void 0, e, s), s;
    } };
  }
  if (n === "setter") {
    const { name: a } = i;
    return function(s) {
      const l = this[a];
      t.call(this, s), this.requestUpdate(a, l, e, !0, s);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function W(e) {
  return (t, i) => typeof i == "object" ? Ns(e, t, i) : ((n, o, r) => {
    const a = o.hasOwnProperty(r);
    return o.constructor.createProperty(r, n), a ? Object.getOwnPropertyDescriptor(o, r) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function F(e) {
  return W({ ...e, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Hs = (e, t, i) => (i.configurable = !0, i.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, i), i);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Cn(e, t) {
  return (i, n, o) => {
    const r = (a) => a.renderRoot?.querySelector(e) ?? null;
    return Hs(i, n, { get() {
      return r(this);
    } });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const js = { CHILD: 2 }, Si = (e) => (...t) => ({ _$litDirective$: e, values: t });
let Ei = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, i, n) {
    this._$Ct = t, this._$AM = i, this._$Ci = n;
  }
  _$AS(t, i) {
    return this.update(t, i);
  }
  update(t, i) {
    return this.render(...i);
  }
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: Ws } = Os, bo = (e) => e, vo = () => document.createComment(""), dt = (e, t, i) => {
  const n = e._$AA.parentNode, o = t === void 0 ? e._$AB : t._$AA;
  if (i === void 0) {
    const r = n.insertBefore(vo(), o), a = n.insertBefore(vo(), o);
    i = new Ws(r, a, e, e.options);
  } else {
    const r = i._$AB.nextSibling, a = i._$AM, s = a !== e;
    if (s) {
      let l;
      i._$AQ?.(e), i._$AM = e, i._$AP !== void 0 && (l = e._$AU) !== a._$AU && i._$AP(l);
    }
    if (r !== o || s) {
      let l = i._$AA;
      for (; l !== r; ) {
        const h = bo(l).nextSibling;
        bo(n).insertBefore(l, o), l = h;
      }
    }
  }
  return i;
}, De = (e, t, i = e) => (e._$AI(t, i), e), Bs = {}, Pr = (e, t = Bs) => e._$AH = t, Us = (e) => e._$AH, Ui = (e) => {
  e._$AR(), e._$AA.remove();
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wo = (e, t, i) => {
  const n = /* @__PURE__ */ new Map();
  for (let o = t; o <= i; o++) n.set(e[o], o);
  return n;
}, _e = Si(class extends Ei {
  constructor(e) {
    if (super(e), e.type !== js.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e, t, i) {
    let n;
    i === void 0 ? i = t : t !== void 0 && (n = t);
    const o = [], r = [];
    let a = 0;
    for (const s of e) o[a] = n ? n(s, a) : a, r[a] = i(s, a), a++;
    return { values: r, keys: o };
  }
  render(e, t, i) {
    return this.dt(e, t, i).values;
  }
  update(e, [t, i, n]) {
    const o = Us(e), { values: r, keys: a } = this.dt(t, i, n);
    if (!Array.isArray(o)) return this.ut = a, r;
    const s = this.ut ??= [], l = [];
    let h, p, c = 0, d = o.length - 1, u = 0, g = r.length - 1;
    for (; c <= d && u <= g; ) if (o[c] === null) c++;
    else if (o[d] === null) d--;
    else if (s[c] === a[u]) l[u] = De(o[c], r[u]), c++, u++;
    else if (s[d] === a[g]) l[g] = De(o[d], r[g]), d--, g--;
    else if (s[c] === a[g]) l[g] = De(o[c], r[g]), dt(e, l[g + 1], o[c]), c++, g--;
    else if (s[d] === a[u]) l[u] = De(o[d], r[u]), dt(e, o[c], o[d]), d--, u++;
    else if (h === void 0 && (h = wo(a, u, g), p = wo(s, c, d)), h.has(s[c])) if (h.has(s[d])) {
      const b = p.get(a[u]), v = b !== void 0 ? o[b] : null;
      if (v === null) {
        const m = dt(e, o[c]);
        De(m, r[u]), l[u] = m;
      } else l[u] = De(v, r[u]), dt(e, o[c], v), o[b] = null;
      u++;
    } else Ui(o[d]), d--;
    else Ui(o[c]), c++;
    for (; u <= g; ) {
      const b = dt(e, l[g + 1]);
      De(b, r[u]), l[u++] = b;
    }
    for (; c <= d; ) {
      const b = o[c++];
      b !== null && Ui(b);
    }
    return this.ut = a, Pr(e, l), be;
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fr = Si(class extends Ei {
  constructor() {
    super(...arguments), this.key = f;
  }
  render(e, t) {
    return this.key = e, t;
  }
  update(e, [t, i]) {
    return t !== this.key && (Pr(e), this.key = t), i;
  }
});
class _o {
  constructor(t) {
    this._hass = t;
  }
  getEntityState(t) {
    return this._hass.states[t];
  }
}
class qs {
  constructor(t, i, n) {
    this._historyService = t, this._fallback = i, this._timestamp = n, this._historicalStates = this._historyService.getStateAt(this._timestamp);
  }
  getEntityState(t) {
    const i = this._historicalStates.get(t);
    if (i) return i;
    const n = this._fallback.getEntityState(t);
    return n ? { ...n, attributes: { ...n.attributes ?? {} } } : void 0;
  }
}
function Gs(e, t, i, n) {
  return e ? i ? new qs(t, new _o(e), n) : new _o(e) : { getEntityState: () => {
  } };
}
function Ks(e, t, i, n, o) {
  if (!e) return;
  const r = Gs(e, i, n, o), a = {};
  for (const s of t)
    a[s] = r.getEntityState(s);
  return {
    states: a,
    formatEntityState: (s) => e.formatEntityState(s),
    formatEntityAttributeValue: e.formatEntityAttributeValue ? (s, l) => e.formatEntityAttributeValue(s, l) : void 0
  };
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Vs = {}, xo = Si(class extends Ei {
  constructor() {
    super(...arguments), this.ot = Vs;
  }
  render(e, t) {
    return t();
  }
  update(e, [t, i]) {
    if (Array.isArray(t)) {
      if (Array.isArray(this.ot) && this.ot.length === t.length && t.every((n, o) => n === this.ot[o])) return be;
    } else if (this.ot === t) return be;
    return this.ot = Array.isArray(t) ? Array.from(t) : t, this.render(t, i);
  }
}), Xs = /* @__PURE__ */ new Set([
  // colour
  "rgb",
  "rgba",
  "hsl",
  "hsla",
  "hwb",
  "lab",
  "lch",
  "oklab",
  "oklch",
  "color",
  "color-mix",
  "light-dark",
  // custom properties / environment
  "var",
  "env",
  // maths (calc & friends can appear inside colour components)
  "calc",
  "clamp",
  "min",
  "max",
  "abs",
  "round",
  "mod",
  "rem",
  "sin",
  "cos",
  "tan",
  "asin",
  "acos",
  "atan",
  "atan2",
  "pow",
  "sqrt",
  "hypot",
  "log",
  "exp",
  // gradients (valid for the stage `background`)
  "linear-gradient",
  "radial-gradient",
  "conic-gradient",
  "repeating-linear-gradient",
  "repeating-radial-gradient",
  "repeating-conic-gradient"
]), Ys = /^[a-z0-9#%.,/_() +*-]+$/i, Zs = /([a-z][a-z0-9-]*)\s*\(/gi;
function L(e) {
  if (typeof e != "string") return;
  const t = e.trim();
  if (!t || !Ys.test(t) || t.includes("/*") || t.includes("*/") || !/^[a-z#]/i.test(t)) return;
  let i = 0;
  for (let o = 0; o < t.length; o++) {
    const r = t[o];
    if (r === "(") i++;
    else if (r === ")" && --i < 0) return;
  }
  if (i !== 0) return;
  const n = new RegExp(Zs.source, "gi");
  for (let o; o = n.exec(t); )
    if (!Xs.has(o[1].toLowerCase())) return;
  return t;
}
function ae(e, t) {
  return L(e) ?? t;
}
function I(e, t) {
  if (e == null || typeof e == "string" && e.trim() === "") return t;
  const i = typeof e == "number" ? e : Number(e);
  return Number.isFinite(i) ? i : t;
}
function re(e) {
  if (typeof e != "string") return;
  const t = e.trim().replace(/[^a-zA-Z0-9_-]/g, "");
  return t === "" ? void 0 : t;
}
const Qs = {
  white: [255, 255, 255],
  black: [0, 0, 0],
  red: [255, 0, 0],
  green: [0, 128, 0],
  lime: [0, 255, 0],
  blue: [0, 0, 255],
  navy: [0, 0, 128],
  yellow: [255, 255, 0],
  orange: [255, 165, 0],
  gold: [255, 215, 0],
  purple: [128, 0, 128],
  pink: [255, 192, 203],
  brown: [165, 42, 42],
  maroon: [128, 0, 0],
  olive: [128, 128, 0],
  teal: [0, 128, 128],
  cyan: [0, 255, 255],
  aqua: [0, 255, 255],
  magenta: [255, 0, 255],
  fuchsia: [255, 0, 255],
  silver: [192, 192, 192],
  gray: [128, 128, 128],
  grey: [128, 128, 128],
  lightgray: [211, 211, 211],
  lightgrey: [211, 211, 211],
  darkgray: [169, 169, 169],
  darkgrey: [169, 169, 169],
  transparent: [255, 255, 255]
};
function Js(e) {
  const t = e.trim().toLowerCase(), i = Qs[t];
  if (i) return i;
  const n = /^#([0-9a-f]{3,8})$/i.exec(t);
  if (n) {
    const r = n[1];
    return r.length === 3 || r.length === 4 ? [0, 1, 2].map((a) => parseInt(r[a] + r[a], 16)) : r.length === 6 || r.length === 8 ? [0, 2, 4].map((a) => parseInt(r.slice(a, a + 2), 16)) : void 0;
  }
  const o = /^rgba?\(([^)]*)\)$/.exec(t);
  if (o) {
    const r = o[1].split(/[\s,/]+/).filter((s) => s !== "");
    if (r.length < 3) return;
    const a = r.slice(0, 3).map((s) => {
      if (s.endsWith("%")) {
        const l = Number(s.slice(0, -1));
        return Number.isFinite(l) ? l / 100 * 255 : NaN;
      }
      return Number(s);
    });
    return a.some((s) => !Number.isFinite(s)) ? void 0 : a.map((s) => Math.max(0, Math.min(255, s)));
  }
}
function In([e, t, i]) {
  const n = (o) => {
    const r = o / 255;
    return r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * n(e) + 0.7152 * n(t) + 0.0722 * n(i);
}
const el = "#212121", tl = "#ffffff", il = In([33, 33, 33]), nl = In([255, 255, 255]);
function Or(e) {
  if (typeof e != "string") return;
  const t = Js(e);
  if (!t) return;
  const i = In(t), n = (o) => (Math.max(i, o) + 0.05) / (Math.min(i, o) + 0.05);
  return n(il) >= n(nl) ? el : tl;
}
const ol = /^[a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9]+(?:-[a-z0-9]+)*$/i;
function yt(e) {
  if (typeof e != "string") return;
  const t = e.trim();
  return ol.test(t) ? t : void 0;
}
function Ce(e) {
  if (typeof e != "string") return;
  const t = e.trim().replace(/[^a-zA-Z0-9_.-]/g, "");
  return t === "" ? void 0 : t;
}
const Ai = "default", Lr = 10, ri = [
  {
    id: Ai,
    label: "Default",
    description: "Follows your Home Assistant theme",
    vars: {}
  },
  {
    id: "odnetnin",
    label: "Odnetnin",
    description: "Playful and chunky — thick outlines on warm paper",
    vars: {
      "--fp-skin-bg": "#fffdf7",
      "--fp-skin-card-bg": "#fffdf7",
      "--fp-skin-wall": "#3b3b3b",
      "--fp-skin-wall-width": "10",
      "--fp-skin-wall-filter": "none",
      "--fp-skin-accent": "#e4444c",
      // White, not the charcoal ink: on this red it reads at 4.0 where the
      // charcoal manages 2.8. The skin whose accent is dark enough to want
      // dark ink is the one that would get this wrong by reusing active-ink.
      "--fp-skin-accent-ink": "#ffffff",
      "--fp-skin-active": "#ffcb05",
      "--fp-skin-active-ink": "#3b3b3b",
      "--fp-skin-text": "#3b3b3b",
      "--fp-skin-badge-bg": "#ffffff",
      "--fp-skin-badge-border": "#3b3b3b",
      "--fp-skin-badge-border-width": "2px",
      // Rounded square rather than a circle, and a hard offset shadow instead
      // of a blur — the two together are what read as "printed sticker".
      "--fp-skin-badge-radius": "30%",
      "--fp-skin-badge-shadow": "0 2px 0 #3b3b3b",
      "--fp-skin-furniture": "#b9b3a7",
      "--fp-skin-glow": "#ffe9a8"
    }
  },
  {
    id: "pastel",
    label: "Pastel",
    description: "Soft and low-contrast — muted mauve on blush",
    vars: {
      "--fp-skin-bg": "#fdf7f9",
      "--fp-skin-card-bg": "#fdf7f9",
      "--fp-skin-wall": "#8b8296",
      "--fp-skin-wall-width": "7",
      "--fp-skin-wall-filter": "none",
      "--fp-skin-accent": "#a8c8ec",
      "--fp-skin-accent-ink": "#4a4453",
      "--fp-skin-active": "#ffd6a5",
      "--fp-skin-active-ink": "#4a4453",
      "--fp-skin-text": "#4a4453",
      "--fp-skin-badge-bg": "#ffffff",
      "--fp-skin-badge-border": "#e6dced",
      "--fp-skin-badge-border-width": "1.5px",
      "--fp-skin-badge-radius": "50%",
      "--fp-skin-badge-shadow": "0 1px 4px rgba(120, 100, 130, 0.18)",
      "--fp-skin-furniture": "#d8cfe0",
      "--fp-skin-glow": "#ffe8d6"
    }
  },
  {
    id: "tron",
    label: "Tron",
    description: "Neon lines on near-black — thin walls that glow",
    vars: {
      "--fp-skin-bg": "#05080c",
      "--fp-skin-card-bg": "#05080c",
      "--fp-skin-wall": "#7de3ff",
      // Thin, because a neon line is the light rather than the mass. The glow
      // does the work the width would have done.
      "--fp-skin-wall-width": "5",
      "--fp-skin-wall-filter": "drop-shadow(0 0 4px #22d3ee)",
      "--fp-skin-accent": "#22d3ee",
      "--fp-skin-accent-ink": "#05080c",
      "--fp-skin-active": "#ff9f1c",
      "--fp-skin-active-ink": "#05080c",
      "--fp-skin-text": "#cdf6ff",
      "--fp-skin-badge-bg": "#0b1220",
      "--fp-skin-badge-border": "#22d3ee",
      "--fp-skin-badge-border-width": "1.5px",
      "--fp-skin-badge-radius": "50%",
      "--fp-skin-badge-shadow": "0 0 8px rgba(34, 211, 238, 0.5)",
      "--fp-skin-furniture": "#1e4b57",
      "--fp-skin-glow": "#7de3ff"
    }
  }
], Ft = "var(--fp-skin-bg, var(--card-background-color, #fff))", Pn = "var(--fp-skin-wall, var(--primary-text-color))", zr = "var(--fp-skin-text, var(--primary-text-color))", U = "var(--fp-skin-accent, var(--primary-color, #03a9f4))", qi = "var(--fp-skin-active, var(--state-light-active-color, var(--state-active-color, #fdd835)))", Re = "var(--fp-skin-badge-bg, var(--card-background-color, #fff))";
function Fn(e) {
  if (typeof e == "string")
    return ri.find((t) => t.id === e);
}
function rl(e) {
  const t = Fn(e);
  return t ? Object.entries(t.vars).map(([i, n]) => `${i}:${n};`).join("") : "";
}
function al(e) {
  const t = Fn(e);
  return t && t.id !== Ai ? t.id : void 0;
}
const sl = ii(
  ri.filter((e) => e.id !== Ai).map(
    (e) => `:host([data-skin="${e.id}"]){` + Object.entries(e.vars).map(([t, i]) => `${t}:${i};`).join("") + "}"
  ).join(`
`)
), Dr = Pt`
  :host {
    --fp-skin-bg: var(--card-background-color, #fff);
    --fp-skin-card-bg: var(--ha-card-background, var(--card-background-color, #fff));
    --fp-skin-wall: var(--primary-text-color);
    --fp-skin-wall-width: 8;
    --fp-skin-wall-filter: none;
    --fp-skin-accent: var(--primary-color, #03a9f4);
    --fp-skin-accent-ink: var(--text-primary-color, #fff);
    --fp-skin-active: var(--state-light-active-color, var(--state-active-color, #fdd835));
    --fp-skin-active-ink: var(--text-primary-color, #212121);
    --fp-skin-text: var(--primary-text-color);
    --fp-skin-badge-bg: var(--card-background-color, #fff);
    --fp-skin-badge-border: var(--divider-color, #ccc);
    --fp-skin-badge-border-width: 1.5px;
    --fp-skin-badge-radius: 50%;
    --fp-skin-badge-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    --fp-skin-furniture: #9e9e9e;
    --fp-skin-glow: #ffd9a0;
  }
`, ll = 6e4, cl = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
function Rr(e) {
  return cl.has(e);
}
function On(e) {
  if (e === "") return;
  const t = Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function Nr(e) {
  let t = 0;
  for (const i of e)
    if (!Rr(i.newState)) {
      if (On(i.newState) === void 0) return !1;
      t++;
    }
  return t > 0;
}
function hl(e, t, i) {
  const n = e.map((h) => On(h.newState)), o = n.filter((h) => h !== void 0);
  if (!o.length) return e;
  const r = (Math.max(...o) - Math.min(...o)) / t;
  if (!(r > 0) && !e.some((h) => Rr(h.newState)))
    return e.length ? [e[0], e[e.length - 1]] : [];
  const a = [e[0]];
  let s = n[0], l = e[0].timestamp;
  for (let h = 1; h < e.length - 1; h++) {
    const p = n[h];
    if (p === void 0) {
      a.push(e[h]), s = void 0, l = e[h].timestamp;
      continue;
    }
    if (s === void 0) {
      a.push(e[h]), s = p, l = e[h].timestamp;
      continue;
    }
    const c = n[h - 1], d = n[h + 1], u = c !== void 0 && d !== void 0 && (p > c && p >= d || p < c && p <= d);
    (Math.abs(p - s) >= r || u && Math.abs(p - s) >= r / 2 || e[h].timestamp - l >= i) && (a.push(e[h]), s = p, l = e[h].timestamp);
  }
  return e.length > 1 && a.push(e[e.length - 1]), a;
}
function dl(e, t = {}) {
  const i = t.numericSteps ?? 0;
  return !(i > 0) || e.length < 3 || !Nr(e) ? e : hl(e, i, t.maxGapMs ?? ll);
}
function pl(e, t = {}) {
  if (!(t.numericSteps ?? 0) || e.length === 0) return e;
  const i = /* @__PURE__ */ new Map();
  for (const o of e) {
    const r = i.get(o.entityId);
    r ? r.push(o) : i.set(o.entityId, [o]);
  }
  const n = /* @__PURE__ */ new Set();
  for (const o of i.values())
    for (const r of dl(o, t)) n.add(r);
  return e.filter((o) => n.has(o));
}
function ul(e, t) {
  if (!(t > 2) || e.length <= t || !Nr(e)) return e;
  const i = e.map((a) => On(a.newState)), n = /* @__PURE__ */ new Set([0, e.length - 1]);
  for (let a = 0; a < e.length; a++)
    i[a] === void 0 && n.add(a);
  const o = [];
  let r;
  for (let a = 0; a < e.length; a++) {
    const s = i[a];
    if (s === void 0) {
      r = void 0;
      continue;
    }
    a > 0 && a < e.length - 1 && r !== void 0 && o.push({ i: a, delta: Math.abs(s - r) }), r = s;
  }
  o.sort((a, s) => s.delta - a.delta);
  for (const { i: a } of o) {
    if (n.size >= t) break;
    n.add(a);
  }
  return e.filter((a, s) => n.has(s));
}
function At(e) {
  const t = typeof e.color == "string" ? L(e.color) : void 0;
  if (t) return t;
  const i = e.attributes?.color, n = typeof i == "string" ? L(i) : void 0;
  if (n) return n;
  const o = String(e.newState ?? "").trim().toLowerCase();
  return e.entityId.startsWith("light.") ? o === "off" ? Re : qi : e.entityId.startsWith("cover.") ? o === "closed" ? Re : U : e.entityId.startsWith("sensor.") || e.entityId.startsWith("binary_sensor.") ? o === "off" ? Re : U : e.entityId.startsWith("fan.") ? o === "off" ? Re : qi : e.entityId.startsWith("media_player.") ? o === "idle" ? Re : qi : o === "on" || o === "open" || o === "playing" || o === "home" || o === "locked" || o === "unlocked" ? U : Re;
}
class fl {
  constructor(t = {}) {
    this._cache = /* @__PURE__ */ new Map(), this._events = [], this._eventsByEntity = /* @__PURE__ */ new Map(), this._maxCacheEntries = 8, this._loadCommitId = 0, this._loader = t.loader ?? (async () => []);
  }
  configure(t = {}) {
    this._context = t;
  }
  async loadHistory(t, i, n = {}) {
    const o = ++this._loadCommitId, r = n.scopeKey ?? "all", a = `${t}:${i}:${r}:${n.numericSteps ?? 0}`;
    if (this._cache.has(a)) {
      if (o === this._loadCommitId) {
        const d = this._cache.get(a);
        this._events = d, this._eventsByEntity = this._groupEventsByEntity(d);
      }
      return;
    }
    const s = n.hass ?? this._context?.hass, l = n.watched ?? this._context?.watched, p = (s && Array.isArray(l) ? await this._loadFromHass(s, t, i, l) : await this._loader(t, i, { ...this._context, ...n, hass: s, watched: l })).slice().sort((d, u) => d.timestamp - u.timestamp).map((d) => ({
      ...d,
      attributes: d.attributes ?? {}
    })), c = pl(p, { numericSteps: n.numericSteps });
    if (o === this._loadCommitId) {
      if (this._cache.set(a, c), this._cache.size > this._maxCacheEntries) {
        const d = this._cache.keys().next().value;
        d && this._cache.delete(d);
      }
      this._events = c, this._eventsByEntity = this._groupEventsByEntity(c);
    }
  }
  async loadFromHass(t, i, n, o) {
    return this._loadFromHass(t, i, n, o);
  }
  async _loadFromHass(t, i, n, o) {
    if (!o.length) return [];
    const r = t.callWS, a = t.callApi, s = new Date(i * 1e3).toISOString(), l = new Date(n * 1e3).toISOString(), h = new Set(o), p = {
      type: "history/history_during_period",
      start_time: s,
      end_time: l,
      minimal_response: !1,
      no_attributes: !1,
      significant_changes_only: !1,
      entity_ids: o
    };
    let c;
    if (typeof r == "function")
      try {
        c = await r(p);
      } catch (d) {
        console.warn("[easy-floorplan] Replay WS history query failed", { startTime: s, endTime: l, watchedCount: o.length, error: d });
      }
    if (!c && typeof a == "function")
      try {
        c = await a("GET", `history/period/${encodeURIComponent(s)}`, {
          end_time: l,
          filter_entity_id: o.join(","),
          minimal_response: !1,
          no_attributes: !1,
          significant_changes_only: !1
        });
      } catch (d) {
        console.warn("[easy-floorplan] Replay REST history query failed", { startTime: s, endTime: l, watchedCount: o.length, error: d });
      }
    if (!c)
      throw new Error(`Unable to load history via websocket or REST API (ws:${typeof r == "function" ? "yes" : "no"}, api:${typeof a == "function" ? "yes" : "no"}).`);
    return this._normalizeHistoryPayload(c, i, n, h);
  }
  _normalizeHistoryPayload(t, i, n, o) {
    const r = /* @__PURE__ */ new Map(), a = (d, u) => {
      if (typeof d == "number")
        return Number.isFinite(d) ? d > 1e12 ? d / 1e3 : d : Number.NaN;
      if (typeof d == "string") {
        const g = Number(d);
        if (Number.isFinite(g)) return g > 1e12 ? g / 1e3 : g;
        const b = Date.parse(d) / 1e3;
        return Number.isFinite(b) ? b : Number.NaN;
      }
      return Date.parse(u) / 1e3;
    }, s = (d, u) => {
      for (const g of u) {
        const b = d[g];
        if (b !== void 0) return b;
      }
    }, l = (d, u) => {
      const g = u.filter((b) => !!b && typeof b == "object");
      g.length && r.set(d, g.map((b) => {
        const v = s(b, ["state", "s"]), m = s(b, ["attributes", "a"]), $ = s(b, ["last_updated", "lu"]), E = s(b, ["last_changed", "lc"]);
        return {
          state: typeof v == "string" || typeof v == "number" || typeof v == "boolean" ? String(v) : void 0,
          attributes: m && typeof m == "object" ? m : void 0,
          last_updated: typeof $ == "string" || typeof $ == "number" ? $ : void 0,
          last_changed: typeof E == "string" || typeof E == "number" ? E : void 0
        };
      }));
    };
    if (Array.isArray(t))
      for (const d of t) {
        if (!d || typeof d != "object") continue;
        const u = d, g = typeof u.entity_id == "string" ? u.entity_id : void 0, b = Array.isArray(u.states) ? u.states : Array.isArray(u.history) ? u.history : [];
        g && b.length && l(g, b);
      }
    else if (t && typeof t == "object")
      for (const [d, u] of Object.entries(t)) {
        if (Array.isArray(u) && u.length) {
          l(d, u);
          continue;
        }
        if (u && typeof u == "object") {
          const g = u;
          Array.isArray(g.states) && g.states.length && l(d, g.states);
        }
      }
    if (!r.size)
      throw new Error("History payload contained no parseable state rows.");
    const h = [], p = new Date(n * 1e3).toISOString();
    for (const [d, u] of r.entries())
      if (u.length && o.has(d)) {
        if (u.length === 1) {
          const g = u[0], b = a(g.last_updated ?? g.last_changed, p);
          if (!Number.isFinite(b) || b < i || b > n)
            continue;
          h.push({
            timestamp: b,
            entityId: d,
            oldState: g.state ?? "unknown",
            newState: g.state ?? "unknown",
            attributes: g.attributes ?? {}
          });
          continue;
        }
        for (let g = 1; g < u.length; g += 1) {
          const b = u[g - 1], v = u[g], m = a(b.last_updated ?? b.last_changed, p), $ = a(v.last_updated ?? v.last_changed, p);
          if (!Number.isFinite(m) || !Number.isFinite($) || $ < i || m > n)
            continue;
          const E = b.state !== v.state, k = !this._attributesEqual(b.attributes ?? {}, v.attributes ?? {});
          !E && !k || h.push({
            timestamp: $,
            entityId: d,
            oldState: b.state ?? "unknown",
            newState: v.state ?? "unknown",
            attributes: {
              ...b.attributes ?? {},
              ...v.attributes ?? {}
            }
          });
        }
      }
    return h.sort((d, u) => d.timestamp - u.timestamp);
  }
  _attributesEqual(t, i) {
    if (t === i) return !0;
    if (!t || !i) return !t && !i;
    if (typeof t != typeof i) return !1;
    if (Array.isArray(t) || Array.isArray(i)) {
      if (!Array.isArray(t) || !Array.isArray(i) || t.length !== i.length) return !1;
      for (let s = 0; s < t.length; s += 1)
        if (!this._attributesEqual(t[s], i[s])) return !1;
      return !0;
    }
    if (typeof t != "object") return !1;
    const n = t, o = i, r = Object.keys(n), a = Object.keys(o);
    if (r.length !== a.length) return !1;
    for (const s of r)
      if (!(s in o) || !this._attributesEqual(n[s], o[s])) return !1;
    return !0;
  }
  clearCache() {
    this._loadCommitId += 1, this._cache.clear(), this._events = [], this._eventsByEntity.clear();
  }
  getStateAt(t) {
    const i = /* @__PURE__ */ new Map();
    for (const [n, o] of this._eventsByEntity.entries()) {
      const r = this._findLastEventAtOrBefore(o, t);
      if (r) {
        i.set(n, this._toHassEntity(n, r.newState, r.attributes, r.timestamp));
        continue;
      }
      const a = o[0];
      a && i.set(n, this._toHassEntity(n, a.oldState, a.attributes, 0));
    }
    return i;
  }
  _groupEventsByEntity(t) {
    const i = /* @__PURE__ */ new Map();
    for (const n of t) {
      const o = i.get(n.entityId) ?? [];
      o.push(n), i.set(n.entityId, o);
    }
    for (const n of i.values())
      n.sort((o, r) => o.timestamp - r.timestamp);
    return i;
  }
  _findLastEventAtOrBefore(t, i) {
    let n = 0, o = t.length - 1, r;
    for (; n <= o; ) {
      const a = n + o >> 1, s = t[a];
      s.timestamp <= i ? (r = s, n = a + 1) : o = a - 1;
    }
    return r;
  }
  _toHassEntity(t, i, n, o) {
    const r = Number.isFinite(o) ? o : Date.now() / 1e3;
    return {
      entity_id: t,
      state: i,
      attributes: n ?? {},
      last_changed: new Date(r * 1e3).toISOString(),
      last_updated: new Date(r * 1e3).toISOString(),
      context: { id: "history", parent_id: null, user_id: null }
    };
  }
  getEvents() {
    return this._events.slice();
  }
  getEventBefore(t) {
    if (!this._events.length) return;
    let i = 0, n = this._events.length - 1, o = -1;
    for (; i <= n; ) {
      const r = i + n >> 1;
      this._events[r].timestamp <= t ? (o = r, i = r + 1) : n = r - 1;
    }
    return o >= 0 ? this._events[o] : void 0;
  }
  getEventAfter(t) {
    if (!this._events.length) return;
    let i = 0, n = this._events.length - 1, o = this._events.length;
    for (; i <= n; ) {
      const r = i + n >> 1;
      this._events[r].timestamp >= t ? (o = r, n = r - 1) : i = r + 1;
    }
    return o < this._events.length ? this._events[o] : void 0;
  }
}
var ml = Object.defineProperty, gl = Object.getOwnPropertyDescriptor, Ge = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? gl(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && ml(t, i, o), o;
};
let ce = class extends Te {
  constructor() {
    super(...arguments), this.events = [], this.startTime = 0, this.endTime = 0, this.currentTime = 0, this.expanded = !1, this._dragging = !1, this._hidden = /* @__PURE__ */ new Set();
  }
  _toggleLane(e) {
    const t = new Set(this._hidden);
    t.delete(e) || t.add(e), this._hidden = t;
  }
  _showAllLanes() {
    this._hidden = /* @__PURE__ */ new Set();
  }
  _seek(e) {
    this.dispatchEvent(new CustomEvent("seek", { detail: { timestamp: e }, bubbles: !0, composed: !0 }));
  }
  _formatTimestamp(e) {
    return Number.isFinite(e) ? new Intl.DateTimeFormat(void 0, {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date(e * 1e3)) : "—";
  }
  _getMarkerLeft(e) {
    return `${(e - this.startTime) / Math.max(1, this.endTime - this.startTime) * 100}%`;
  }
  /**
   * Keep markers visually centered while preventing edge overflow that can
   * trigger horizontal scrollbars in tight containers.
   */
  _getMarkerLeftClamped(e, t) {
    const i = this._getMarkerLeft(e);
    return `clamp(${t}px, ${i}, calc(100% - ${t}px))`;
  }
  /** This timestamp as a 0-100 position in the window, unitless for calc(). */
  _pct(e) {
    return (e - this.startTime) / Math.max(1, this.endTime - this.startTime) * 100;
  }
  _markerStyle(e, t = "0px") {
    const i = At(e), n = `left:${this._getMarkerLeftClamped(e.timestamp, 7)};--stack-offset:${t};--marker-pct:${this._pct(e.timestamp)};`;
    return i ? `${n}background:${i};box-shadow:0 0 0 2px ${i}22;` : n;
  }
  _formatEventTitle(e) {
    return `${this._formatTimestamp(e.timestamp)} · ${e.entityId}: ${e.oldState} → ${e.newState}`;
  }
  _formatClusterTitle(e) {
    return e.map((t) => this._formatEventTitle(t)).join(`
`);
  }
  _visibleEvents() {
    if (!this.events.length) return [];
    const e = this.startTime, t = this.endTime;
    return this.events.filter((i) => i.timestamp >= e && i.timestamp <= t);
  }
  /**
   * The events this timeline draws — every discrete state change, and the
   * largest moves of each numeric sensor up to what a lane can show. Replay
   * itself still reads the full series; this only decides what gets a marker.
   */
  /** Each entity's lane, display-thinned. Hidden lanes are still in here, so
   *  the expanded view can keep their label on screen to switch back on. */
  _laneSeries() {
    const e = /* @__PURE__ */ new Map();
    for (const t of this._visibleEvents()) {
      const i = e.get(t.entityId);
      i ? i.push(t) : e.set(t.entityId, [t]);
    }
    for (const [t, i] of e)
      e.set(t, ul(i, ce.MAX_MARKERS_PER_LANE));
    return e;
  }
  /**
   * What the summary bar draws: every lane that is switched on. Hiding a lane
   * takes its events out of here too, which is the point — a summary that
   * still counted a lane you had switched off would not be a summary of what
   * you are looking at.
   */
  _drawnEvents() {
    const e = [];
    for (const [t, i] of this._laneSeries())
      this._hidden.has(t) || e.push(...i);
    return e.sort((t, i) => t.timestamp - i.timestamp);
  }
  _groupEventsByTimestamp() {
    const e = this._drawnEvents(), t = /* @__PURE__ */ new Map();
    for (const i of e) {
      const n = t.get(i.timestamp);
      n ? n.push(i) : t.set(i.timestamp, [i]);
    }
    return Array.from(t.entries()).map(([i, n]) => ({
      timestamp: i,
      events: n,
      left: this._getMarkerLeft(i)
    }));
  }
  _getEntityLabel(e) {
    const t = e.attributes ?? {};
    return ((typeof t.friendly_name == "string" ? t.friendly_name : void 0)?.trim() || e.entityId).replace(/^./, (o) => o.toUpperCase());
  }
  _seekFromClientX(e) {
    const t = this.expanded ? ".timeline-track-overlay" : ".timeline", i = this.shadowRoot?.querySelector(t)?.getBoundingClientRect();
    if (!i) return;
    const n = Math.max(1, this.endTime - this.startTime), o = Math.min(1, Math.max(0, (e - i.left) / i.width)), r = Math.round(this.startTime + o * n);
    this._seek(r);
  }
  _handleTimelineClick(e) {
    this._seekFromClientX(e.clientX);
  }
  _handleKeyDown(e) {
    const t = Math.max(1, this.endTime - this.startTime), i = Math.max(1, Math.round(t / 100));
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        this._seek(Math.max(this.startTime, this.currentTime - i)), e.preventDefault();
        break;
      case "ArrowRight":
      case "ArrowUp":
        this._seek(Math.min(this.endTime, this.currentTime + i)), e.preventDefault();
        break;
      case "Home":
        this._seek(this.startTime), e.preventDefault();
        break;
      case "End":
        this._seek(this.endTime), e.preventDefault();
        break;
    }
  }
  /**
   * The way back. Switching a lane off in the expanded view and then
   * collapsing would otherwise strand it: the summary bar has no labels to
   * click, so nothing on screen would say anything was missing.
   */
  _renderHiddenNotice() {
    if (!this._hidden.size) return f;
    const e = this._hidden.size;
    return y`
      <div class="lanes-hidden">
        <span>${e} lane${e === 1 ? "" : "s"} hidden</span>
        <button class="lanes-hidden-show" @click=${() => this._showAllLanes()}>Show all</button>
      </div>
    `;
  }
  _renderExpandedTimeline(e) {
    const t = this._laneSeries(), i = Array.from(t.keys()), n = (this.currentTime - this.startTime) / e * 100;
    return y`
      <div
        class="timeline-expanded timeline-interactive"
        style="--playhead-pct:${this._pct(this.currentTime)}"
        role="slider"
        tabindex="0"
        aria-label="Replay timeline"
        aria-valuemin=${this.startTime}
        aria-valuemax=${this.endTime}
        aria-valuenow=${this.currentTime}
        aria-valuetext=${this._formatTimestamp(this.currentTime)}
        @click=${(o) => this._handleTimelineClick(o)}
        @pointerdown=${(o) => this._handlePointerDown(o)}
        @pointermove=${(o) => this._handlePointerMove(o)}
        @pointerup=${(o) => this._handlePointerUp(o)}
        @pointerleave=${(o) => this._handlePointerUp(o)}
        @keydown=${this._handleKeyDown}
      >
        <div class="timeline-track-overlay" style="grid-row:1 / span ${i.length};" aria-hidden="true">
          <div class="playhead playhead-expanded" style="left:${n}%">
            <span class="playhead-time">${this._formatTimestamp(this.currentTime)}</span>
          </div>
        </div>
        ${xo([this.events, this.startTime, this.endTime, this._hidden], () => i.map((o, r) => {
      const a = t.get(o) ?? [], s = r + 1, l = this._getEntityLabel(a[0]), h = this._hidden.has(o);
      return y`
            <button
              class="lane-label ${h ? "lane-off" : ""}"
              style="grid-row:${s};"
              aria-pressed=${h ? "false" : "true"}
              title=${h ? `Show ${l} on the timeline` : `Hide ${l} from the timeline`}
              @click=${(p) => {
        p.stopPropagation(), this._toggleLane(o);
      }}
            ><span class="lane-dot" aria-hidden="true"></span><span class="lane-name">${l}</span></button>
            <div class="lane lane-track ${h ? "lane-off" : ""}" style="grid-row:${s};">
              ${(h ? [] : a).map((p) => {
        const c = At(p), d = this._getMarkerLeftClamped(p.timestamp, 4);
        return y`
                  <button
                    class="marker"
                    style=${`left:${d};--marker-pct:${this._pct(p.timestamp)};${c ? `background:${c};box-shadow:0 0 0 2px ${c}22;` : ""}`}
                    title=${this._formatEventTitle(p)}
                    @click=${(u) => {
          u.stopPropagation(), this._seek(p.timestamp);
        }}
                  ></button>
                `;
      })}
            </div>
          `;
    }))}
      </div>
    `;
  }
  _handlePointerDown(e) {
    this._dragging = !0, this._updateFromPointer(e);
  }
  _handlePointerMove(e) {
    this._dragging && this._updateFromPointer(e);
  }
  _handlePointerUp(e) {
    this._dragging && (this._dragging = !1, this._updateFromPointer(e));
  }
  _updateFromPointer(e) {
    this._seekFromClientX(e.clientX);
  }
  render() {
    if (!this.events.length)
      return y`<div class="timeline-empty">No history available.</div>`;
    const e = Math.max(1, this.endTime - this.startTime);
    return this.expanded ? y`${this._renderHiddenNotice()}${this._renderExpandedTimeline(e)}` : y`
      ${this._renderHiddenNotice()}
      <div
        class="timeline timeline-interactive"
        style="--playhead-pct:${this._pct(this.currentTime)}"
        role="slider"
        tabindex="0"
        aria-label="Replay timeline"
        aria-valuemin=${this.startTime}
        aria-valuemax=${this.endTime}
        aria-valuenow=${this.currentTime}
        aria-valuetext=${this._formatTimestamp(this.currentTime)}
        @click=${(t) => this._handleTimelineClick(t)}
        @pointerdown=${(t) => this._handlePointerDown(t)}
        @pointermove=${(t) => this._handlePointerMove(t)}
        @pointerup=${(t) => this._handlePointerUp(t)}
        @pointerleave=${(t) => this._handlePointerUp(t)}
        @keydown=${this._handleKeyDown}
      >
        <div class="track"></div>
        <div class="playhead" style="left:${this._pct(this.currentTime)}%">
          <span class="playhead-time">${this._formatTimestamp(this.currentTime)}</span>
        </div>
        ${xo([this.events, this.startTime, this.endTime], () => this._groupEventsByTimestamp().map((t) => y`
          <div
            class="marker-cluster"
            style="left:${this._getMarkerLeftClamped(t.timestamp, 7)};--marker-pct:${this._pct(t.timestamp)};"
            title=${this._formatClusterTitle(t.events)}
            @click=${(i) => {
      i.stopPropagation(), this._seek(t.timestamp);
    }}
          >
            ${t.events.map((i, n) => {
      const o = n === 0 ? "-2px" : n === 1 ? "2px" : n === 2 ? "-4px" : "4px";
      return y`
                <button
                  class="marker"
                  style=${this._markerStyle(i, o)}
                  title=${this._formatEventTitle(i)}
                  @click=${(r) => {
        r.stopPropagation(), this._seek(i.timestamp);
      }}
                ></button>
              `;
    })}
          </div>
        `))}
      </div>
    `;
  }
};
ce.MAX_MARKERS_PER_LANE = 150;
ce.styles = Pt`
    :host { display: block; }
    .timeline { position: relative; height: 24px; margin: 8px 0; cursor: pointer; }
    .timeline-expanded {
      position: relative;
      display: grid;
      grid-template-columns: minmax(90px, 140px) 1fr;
      column-gap: 8px;
      row-gap: 6px;
      margin: 8px 0;
      cursor: pointer;
      align-items: center;
    }
    .timeline-track-overlay {
      grid-column: 2;
      grid-row: 1 / -1;
      position: relative;
      align-self: stretch;
      pointer-events: none;
      z-index: 0;
    }
    .timeline-interactive { touch-action: none; }
    .lane {
      position: relative;
      z-index: 1;
      grid-column: 2;
      width: 100%;
      min-width: 0;
    }
    /*
     * The lane label is the switch for its lane, so it has to look like one
     * before it is hovered: a button box, a pointer cursor, and a dot standing
     * in for the lane's markers that fills when the lane is on and hollows out
     * when it is off. Discoverability is the whole point — a bare text label
     * that happens to be clickable is not discoverable.
     */
    .lane-label {
      grid-column: 1;
      display: flex;
      align-items: center;
      gap: 6px;
      font: inherit;
      font-size: 11px;
      text-align: left;
      color: var(--secondary-text-color, #666);
      background: none;
      border: 1px solid transparent;
      border-radius: 4px;
      padding: 1px 4px;
      margin: 0;
      cursor: pointer;
      overflow: hidden;
      white-space: nowrap;
      min-width: 0;
    }
    .lane-name {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .lane-dot {
      flex: none;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      border: 1px solid currentColor;
      background: currentColor;
    }
    .lane-label:hover,
    .lane-label:focus-visible {
      color: var(--primary-text-color);
      border-color: var(--divider-color, #ccc);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    }
    /* Switched off: the row stays, so there is something to click to get it
       back, but it reads as absent rather than empty. */
    .lane-label.lane-off {
      opacity: 0.55;
      text-decoration: line-through;
    }
    .lane-label.lane-off .lane-dot {
      background: transparent;
    }
    .lane-track.lane-off {
      opacity: 0.35;
    }
    .lanes-hidden {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
      font-size: 11px;
      color: var(--secondary-text-color, #666);
    }
    .lanes-hidden-show {
      font: inherit;
      cursor: pointer;
      padding: 1px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
    .lane-track {
      position: relative;
      height: 14px;
      border-radius: 999px;
      background: var(--divider-color, #ddd);
    }
    .track { position: absolute; inset: 0; border-radius: 999px; background: var(--divider-color, #ddd); }
    .playhead { position: absolute; top: -2px; width: 2px; height: calc(100% + 4px); background: ${ii(U)}; }
    .playhead-expanded { top: 0; bottom: 0; height: auto; transform: translateX(-50%); }
    /*
     * The clock rides the playhead rather than sitting in the header: while a
     * replay runs this is the only part of the card the eye is on, and a time
     * three inches away from it does not read as "where we are now".
     */
    .playhead-time {
      position: absolute;
      bottom: calc(100% + 4px);
      left: 50%;
      transform: translateX(-50%);
      padding: 1px 5px;
      border-radius: 4px;
      font-size: 11px;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      pointer-events: none;
      background: ${ii(U)};
      color: var(--fp-skin-accent-ink, var(--text-primary-color, #fff));
    }
    .marker-cluster {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 14px;
      height: 20px;
      cursor: pointer;
      pointer-events: auto;
    }
    .marker {
      position: absolute;
      left: 50%;
      top: calc(50% + var(--stack-offset, 0px));
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: none;
      background: var(--divider-color, #bbb);
      padding: 0;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
    }
    /*
     * "Passed" — a marker the playhead has already crossed — used to be a class
     * written per marker, which meant every one of them re-rendered on every
     * frame of playback: 8,000 nodes rebuilt 20 times a second. Both numbers
     * are now plain custom properties, so the whole effect is one variable
     * written on the container and the markers themselves never change.
     *
     * clamp() is doing the comparison: the difference is scaled far past 1, so
     * it saturates to exactly 1 when the playhead is ahead of the marker and 0
     * when it is behind — a step function built out of arithmetic, because CSS
     * has no way to ask whether one length is greater than another.
     */
    .marker,
    .marker-cluster {
      --passed: clamp(0, (var(--playhead-pct, 0) - var(--marker-pct, 0) + 0.000001) * 1000000, 1);
    }
    .marker {
      transform: translate(-50%, -50%) scale(calc(1 + 0.2 * var(--passed)));
    }
    .timeline-empty { font-size: 12px; color: var(--secondary-text-color, #666); }
  `;
Ge([
  W({ attribute: !1 })
], ce.prototype, "events", 2);
Ge([
  W({ type: Number })
], ce.prototype, "startTime", 2);
Ge([
  W({ type: Number })
], ce.prototype, "endTime", 2);
Ge([
  W({ type: Number })
], ce.prototype, "currentTime", 2);
Ge([
  W({ type: Boolean })
], ce.prototype, "expanded", 2);
Ge([
  F()
], ce.prototype, "_hidden", 2);
ce = Ge([
  ki("easy-floorplan-history-timeline")
], ce);
function J(e) {
  return e.type === "skylight";
}
const ve = ["top", "right", "bottom", "left"];
function $o(e) {
  return !!e?.haArea && (e.filterEntities ?? !0);
}
const bt = -6, tn = 6, Ln = 0.45, ai = 1, Hr = "scale", jr = "dim", ko = 0.92, So = 80, Eo = 260, nn = 0.25, on = 4, Wr = 10, rn = 1, zn = 14, yl = 3, Mi = 140, Br = "var(--fp-skin-glow, #ffd9a0)", Ao = 0.18, si = 0.6, Mo = 0.5, To = 0.45, bl = 0.5, Dn = 14, je = 34, li = 34, vt = 16, Ti = 80, Ci = 0, Ii = 360, Ur = "var(--fp-skin-furniture, #9e9e9e)", le = 1e3, ge = 600, Rn = 20, Co = 50;
function vl(e, t) {
  return e ?? t;
}
function Io(e, t) {
  return t <= 0 ? 100 : Math.round(e / t * 100);
}
function Gi(e, t) {
  return Math.max(1, Math.round(t * e / 100));
}
function Po(e) {
  const t = e?.floors;
  return !t || typeof t != "object" ? [] : Object.values(t).filter((i) => !!i && typeof i.floor_id == "string" && typeof i.name == "string").sort((i, n) => (i.level ?? 0) - (n.level ?? 0) || i.name.localeCompare(n.name));
}
function wl(e) {
  const t = e?.areas;
  return !t || typeof t != "object" ? [] : Object.values(t).filter((i) => !!i && typeof i.area_id == "string" && typeof i.name == "string").sort((i, n) => i.name.localeCompare(n.name));
}
function _l(e, t) {
  if (!("name" in e)) return e;
  const i = (e.name ?? "").toString().trim(), n = xl(t, i);
  return { ...e, name: n ? n.name : i || void 0, haArea: n?.area_id };
}
function xl(e, t) {
  const i = (t ?? "").trim();
  if (!i) return;
  const n = e.find((s) => s.name === i);
  if (n) return n;
  const o = i.toLowerCase(), r = e.find((s) => s.name.toLowerCase() === o);
  if (r) return r;
  const a = o.replace(/\s+/g, " ");
  return e.find((s) => s.name.trim().toLowerCase().replace(/\s+/g, " ") === a);
}
function $l(e, t) {
  const i = e, n = i?.entities?.[t];
  return n ? n.area_id ? n.area_id : (n.device_id ? i?.devices?.[n.device_id] : void 0)?.area_id ?? void 0 : void 0;
}
function Ki(e, t) {
  const n = e?.entities;
  return !n || typeof n != "object" ? [] : Object.keys(n).filter((o) => $l(e, o) === t);
}
function kl(e) {
  return {
    type: e,
    width: le,
    height: ge,
    grid: Rn,
    walls: [],
    openings: [],
    items: [],
    texts: [],
    furniture: [],
    trackers: [],
    areas: []
  };
}
function Sl() {
  return { overlayScale: "plan" };
}
function Q(e) {
  return `${e}_${Math.random().toString(36).slice(2, 9)}`;
}
function an(e, t) {
  if (e === t) return !0;
  if (Array.isArray(e) || Array.isArray(t))
    return !Array.isArray(e) || !Array.isArray(t) || e.length !== t.length ? !1 : e.every((o, r) => an(o, t[r]));
  if (typeof e != "object" || typeof t != "object" || e === null || t === null) return !1;
  const i = e, n = t;
  for (const o of /* @__PURE__ */ new Set([...Object.keys(i), ...Object.keys(n)]))
    if (!an(i[o], n[o])) return !1;
  return !0;
}
function El(e, t = []) {
  return {
    id: Q("floor"),
    name: e,
    walls: t,
    openings: [],
    items: [],
    texts: [],
    furniture: [],
    trackers: [],
    areas: []
  };
}
function Al(e) {
  return {
    ...e,
    walls: e.walls ?? [],
    openings: e.openings ?? [],
    items: e.items ?? [],
    texts: e.texts ?? [],
    furniture: e.furniture ?? [],
    trackers: e.trackers ?? [],
    areas: e.areas ?? []
  };
}
function Ml(e) {
  const t = /* @__PURE__ */ new Set();
  return e.map((i, n) => {
    let o = i.id || `floor_${n + 1}`;
    for (; t.has(o); ) o = `${o}_${n + 1}`;
    return t.add(o), o === i.id ? i : { ...i, id: o };
  });
}
function Tl(e, t, i) {
  const n = e.findIndex((s) => s.id === t), o = n + i;
  if (n < 0 || o < 0 || o >= e.length) return null;
  const r = [...e], [a] = r.splice(n, 1);
  return r.splice(o, 0, a), r;
}
function $e(e) {
  return e.floors && e.floors.length ? Ml(e.floors.map(Al)) : [
    {
      id: "floor_main",
      name: "Floor 1",
      walls: e.walls ?? [],
      openings: e.openings ?? [],
      items: e.items ?? [],
      texts: e.texts ?? [],
      furniture: e.furniture ?? [],
      trackers: e.trackers ?? [],
      areas: e.areas ?? []
    }
  ];
}
function ci(e, t) {
  if (!t) return null;
  const i = e?.[t.entity]?.state;
  if (i == null || i === "unavailable" || i === "unknown") return !1;
  const n = i === "on" || i === "open" || i === "home" || i === "detected";
  return t.invert ? !n : n;
}
function Fo(e, t) {
  if (!e || t == null || !Number.isFinite(t)) return null;
  const i = e.max - e.min;
  if (i === 0) return null;
  const n = (t - e.min) / i, o = Math.max(0, Math.min(1, n));
  return e.invert ? 1 - o : o;
}
const Cl = "airHandler", Il = "air handler", Pl = "utility", Fl = [
  "hvac",
  "ahu",
  "furnace",
  "ventilation"
], Ol = {
  w: 60,
  h: 56
}, Ll = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 7.142857
  },
  {
    line: [
      8,
      8,
      92,
      92
    ],
    role: "detail",
    opacity: 0.8
  },
  {
    line: [
      8,
      92,
      92,
      8
    ],
    role: "detail",
    opacity: 0.8
  }
], zl = {
  id: Cl,
  name: Il,
  category: Pl,
  keywords: Fl,
  size: Ol,
  parts: Ll
}, Dl = "bathtub", Rl = "bathtub", Nl = "bath", Hl = [
  "bath",
  "tub"
], jl = {
  w: 150,
  h: 76
}, Wl = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 5.263158
  },
  {
    rect: [
      6,
      12,
      88,
      76
    ],
    rx: 12,
    role: "line"
  },
  {
    circle: [
      14,
      50,
      5.5
    ],
    role: "thin"
  }
], Bl = {
  id: Dl,
  name: Rl,
  category: Nl,
  keywords: Hl,
  size: jl,
  parts: Wl
}, Ul = "bed", ql = "bed", Gl = "bedroom", Kl = [
  "double",
  "mattress",
  "sleep"
], Vl = {
  w: 150,
  h: 200
}, Xl = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 2.666667
  },
  {
    line: [
      0,
      26,
      100,
      26
    ],
    role: "line"
  },
  {
    rect: [
      10,
      6,
      34,
      14
    ],
    rx: 2,
    role: "thin"
  },
  {
    rect: [
      56,
      6,
      34,
      14
    ],
    rx: 2,
    role: "thin"
  }
], Yl = {
  id: Ul,
  name: ql,
  category: Gl,
  keywords: Kl,
  size: Vl,
  parts: Xl
}, Zl = "chair", Ql = "chair", Jl = "living", ec = [
  "seat"
], tc = {
  w: 44,
  h: 44
}, ic = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 9.090909
  },
  {
    line: [
      0,
      22,
      100,
      22
    ],
    role: "line"
  }
], nc = {
  id: Zl,
  name: Ql,
  category: Jl,
  keywords: ec,
  size: tc,
  parts: ic
}, oc = "cornerShowerCurved", rc = "curved corner shower", ac = "bath", sc = [
  "shower",
  "corner",
  "cubicle",
  "stall",
  "dusche"
], lc = {
  w: 100,
  h: 100
}, cc = [
  {
    path: [
      [
        "M",
        100,
        0
      ],
      [
        "L",
        100,
        100
      ],
      [
        "L",
        94,
        100
      ],
      [
        "C",
        47,
        105,
        -5,
        53,
        0,
        6
      ],
      [
        "L",
        0,
        0
      ],
      [
        "Z"
      ]
    ],
    role: "body"
  }
], hc = {
  id: oc,
  name: rc,
  category: ac,
  keywords: sc,
  size: lc,
  parts: cc
}, dc = "desk", pc = "desk", uc = "living", fc = [
  "office",
  "workstation"
], mc = {
  w: 120,
  h: 60
}, gc = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 6.666667
  },
  {
    line: [
      0,
      55,
      100,
      55
    ],
    role: "detail"
  }
], yc = {
  id: dc,
  name: pc,
  category: uc,
  keywords: fc,
  size: mc,
  parts: gc
}, bc = "dishwasher", vc = "dishwasher", wc = "kitchen", _c = [
  "dishes"
], xc = {
  w: 60,
  h: 60
}, $c = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 6.666667
  },
  {
    rect: [
      10,
      24,
      80,
      62
    ],
    rx: 5,
    role: "detail",
    opacity: 0.8
  },
  {
    line: [
      6,
      88,
      94,
      88
    ],
    role: "line"
  }
], kc = {
  id: bc,
  name: vc,
  category: wc,
  keywords: _c,
  size: xc,
  parts: $c
}, Sc = "dryer", Ec = "dryer", Ac = "utility", Mc = [
  "tumble dryer",
  "laundry"
], Tc = {
  w: 60,
  h: 62
}, Cc = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 6.666667
  },
  {
    line: [
      6,
      18,
      94,
      18
    ],
    role: "detail"
  },
  {
    circle: [
      50,
      56,
      30
    ],
    role: "line"
  },
  {
    circle: [
      50,
      56,
      13.5
    ],
    role: "detail"
  }
], Ic = {
  id: Sc,
  name: Ec,
  category: Ac,
  keywords: Mc,
  size: Tc,
  parts: Cc
}, Pc = "fishTank", Fc = "fish tank", Oc = "living", Lc = [
  "aquarium",
  "fish",
  "water"
], zc = {
  w: 100,
  h: 40
}, Dc = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 10
  },
  {
    rect: [
      5,
      12,
      90,
      76
    ],
    role: "hint"
  },
  {
    ellipse: [
      32,
      40,
      7,
      9
    ],
    role: "thin"
  },
  {
    path: [
      [
        "M",
        39,
        40
      ],
      [
        "L",
        44,
        32
      ],
      [
        "L",
        44,
        48
      ],
      [
        "Z"
      ]
    ],
    role: "solid"
  },
  {
    ellipse: [
      68,
      60,
      7,
      9
    ],
    role: "thin"
  },
  {
    path: [
      [
        "M",
        61,
        60
      ],
      [
        "L",
        56,
        52
      ],
      [
        "L",
        56,
        68
      ],
      [
        "Z"
      ]
    ],
    role: "solid"
  },
  {
    circle: [
      82,
      32,
      4
    ],
    role: "hint"
  }
], Rc = {
  id: Pc,
  name: Fc,
  category: Oc,
  keywords: Lc,
  size: zc,
  parts: Dc
}, Nc = "fridge", Hc = "fridge", jc = "kitchen", Wc = [
  "refrigerator",
  "freezer"
], Bc = {
  w: 60,
  h: 64
}, Uc = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 6.666667
  },
  {
    line: [
      0,
      40,
      100,
      40
    ],
    role: "line"
  },
  {
    line: [
      84,
      12,
      84,
      30
    ],
    role: "line"
  },
  {
    line: [
      84,
      50,
      84,
      84
    ],
    role: "line"
  }
], qc = {
  id: Nc,
  name: Hc,
  category: jc,
  keywords: Wc,
  size: Bc,
  parts: Uc
}, Gc = "hotTub", Kc = "hot tub", Vc = "bath", Xc = [
  "jacuzzi",
  "spa",
  "whirlpool"
], Yc = {
  w: 120,
  h: 120
}, Zc = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 3.333333
  },
  {
    circle: [
      50,
      50,
      36
    ],
    role: "line"
  },
  {
    circle: [
      27.68,
      27.68,
      5
    ],
    role: "hint",
    space: "square"
  },
  {
    circle: [
      72.32,
      27.68,
      5
    ],
    role: "hint",
    space: "square"
  },
  {
    circle: [
      27.68,
      72.32,
      5
    ],
    role: "hint",
    space: "square"
  },
  {
    circle: [
      72.32,
      72.32,
      5
    ],
    role: "hint",
    space: "square"
  }
], Qc = {
  id: Gc,
  name: Kc,
  category: Vc,
  keywords: Xc,
  size: Yc,
  parts: Zc
}, Jc = "piano", eh = "piano", th = "living", ih = [
  "upright",
  "keyboard",
  "music"
], nh = {
  w: 140,
  h: 60
}, oh = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 6.666667
  },
  {
    line: [
      4,
      70,
      96,
      70
    ],
    role: "thin"
  },
  {
    repeat: 7,
    step: [
      12.5,
      0
    ],
    part: {
      line: [
        12.5,
        70,
        12.5,
        94
      ],
      role: "hint"
    }
  },
  {
    line: [
      4,
      22,
      96,
      22
    ],
    role: "hint",
    opacity: 0.5
  }
], rh = {
  id: Jc,
  name: eh,
  category: th,
  keywords: ih,
  size: nh,
  parts: oh
}, ah = "plant", sh = "plant", lh = "living", ch = [
  "pot",
  "tree",
  "greenery"
], hh = {
  w: 44,
  h: 44
}, dh = "ellipse", ph = [
  {
    ellipse: [
      50,
      50,
      50,
      50
    ],
    role: "body"
  },
  {
    circle: [
      50,
      38,
      18
    ],
    role: "thin"
  },
  {
    circle: [
      34,
      58,
      18
    ],
    role: "thin"
  },
  {
    circle: [
      66,
      58,
      18
    ],
    role: "thin"
  }
], uh = {
  id: ah,
  name: sh,
  category: lh,
  keywords: ch,
  size: hh,
  footprint: dh,
  parts: ph
}, fh = "quarterTub", mh = "corner hot tub", gh = "bath", yh = [
  "hottub",
  "jacuzzi",
  "corner",
  "quarter",
  "spa",
  "whirlpool"
], bh = {
  w: 140,
  h: 140
}, vh = [
  {
    path: [
      [
        "M",
        100,
        0
      ],
      [
        "L",
        100,
        100
      ],
      [
        "C",
        50,
        100,
        0,
        50,
        0,
        0
      ],
      [
        "Z"
      ]
    ],
    role: "body"
  },
  {
    path: [
      [
        "M",
        85,
        5
      ],
      [
        "C",
        90,
        5,
        95,
        10,
        95,
        15
      ],
      [
        "L",
        95,
        95
      ],
      [
        "C",
        55,
        95,
        5,
        45,
        5,
        5
      ],
      [
        "Z"
      ]
    ],
    role: "line"
  },
  {
    path: [
      [
        "M",
        20,
        5
      ],
      [
        "C",
        75,
        10,
        90,
        25,
        95,
        80
      ]
    ],
    role: "detail"
  }
], wh = {
  id: fh,
  name: mh,
  category: gh,
  keywords: yh,
  size: bh,
  parts: vh
}, _h = "roundTable", xh = "round table", $h = "living", kh = [
  "dining",
  "circular"
], Sh = {
  w: 100,
  h: 100
}, Eh = "ellipse", Ah = [
  {
    ellipse: [
      50,
      50,
      50,
      50
    ],
    role: "body"
  }
], Mh = {
  id: _h,
  name: xh,
  category: $h,
  keywords: kh,
  size: Sh,
  footprint: Eh,
  parts: Ah
}, Th = "rug", Ch = "rug", Ih = "living", Ph = [
  "carpet",
  "mat"
], Fh = {
  w: 180,
  h: 120
}, Oh = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 12,
    role: "body",
    fillOpacity: 0.08,
    dash: [
      8,
      5
    ]
  },
  {
    rect: [
      10,
      10,
      80,
      80
    ],
    rx: 8,
    role: "detail",
    opacity: 0.6
  }
], Lh = {
  id: Th,
  name: Ch,
  category: Ih,
  keywords: Ph,
  size: Fh,
  parts: Oh
}, zh = "sectional", Dh = "sectional (L)", Rh = "living", Nh = [
  "couch",
  "sofa",
  "corner",
  "chaise"
], Hh = {
  w: 230,
  h: 180
}, jh = [
  {
    polygon: [
      [
        0,
        0
      ],
      [
        100,
        0
      ],
      [
        100,
        100
      ],
      [
        58,
        100
      ],
      [
        58,
        55
      ],
      [
        0,
        55
      ]
    ],
    role: "body"
  },
  {
    line: [
      0,
      16,
      100,
      16
    ],
    role: "line"
  },
  {
    line: [
      9,
      16,
      9,
      55
    ],
    role: "line"
  },
  {
    line: [
      58,
      16,
      58,
      100
    ],
    role: "line"
  }
], Wh = {
  id: zh,
  name: Dh,
  category: Rh,
  keywords: Nh,
  size: Hh,
  parts: jh
}, Bh = "sink", Uh = "sink", qh = "kitchen", Gh = [
  "basin",
  "tap",
  "faucet"
], Kh = {
  w: 64,
  h: 48
}, Vh = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 8.333333
  },
  {
    rect: [
      12,
      18,
      76,
      50
    ],
    rx: 8.333333,
    role: "line"
  },
  {
    circle: [
      50,
      10,
      5
    ],
    role: "line"
  }
], Xh = {
  id: Bh,
  name: Uh,
  category: qh,
  keywords: Gh,
  size: Kh,
  parts: Vh
}, Yh = "sofa", Zh = "sofa", Qh = "living", Jh = [
  "couch",
  "settee",
  "seat"
], ed = {
  w: 170,
  h: 72
}, td = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 5.555556
  },
  {
    line: [
      0,
      30,
      100,
      30
    ],
    role: "line"
  },
  {
    line: [
      12,
      30,
      12,
      100
    ],
    role: "line"
  },
  {
    line: [
      88,
      30,
      88,
      100
    ],
    role: "line"
  }
], id = {
  id: Yh,
  name: Zh,
  category: Qh,
  keywords: Jh,
  size: ed,
  parts: td
}, nd = "stairs", od = "stairs", rd = "utility", ad = [
  "steps",
  "staircase"
], sd = {
  w: 90,
  h: 170
}, ld = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 4.444444
  },
  {
    repeat: 6,
    step: [
      0,
      14.285714
    ],
    part: {
      line: [
        0,
        14.285714,
        100,
        14.285714
      ],
      role: "thin"
    }
  },
  {
    line: [
      50,
      96.470588,
      50,
      3.529412
    ],
    role: "thin"
  },
  {
    path: [
      [
        "M",
        38,
        16
      ],
      [
        "L",
        50,
        2.352941
      ],
      [
        "L",
        62,
        16
      ]
    ],
    role: "thin"
  }
], cd = {
  id: nd,
  name: od,
  category: rd,
  keywords: ad,
  size: sd,
  parts: ld
}, hd = "stove", dd = "stove", pd = "kitchen", ud = [
  "cooker",
  "hob",
  "oven",
  "range"
], fd = {
  w: 64,
  h: 64
}, md = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 6.25
  },
  {
    circle: [
      28,
      28,
      16
    ],
    role: "line"
  },
  {
    circle: [
      72,
      28,
      16
    ],
    role: "line"
  },
  {
    circle: [
      28,
      72,
      16
    ],
    role: "line"
  },
  {
    circle: [
      72,
      72,
      16
    ],
    role: "line"
  }
], gd = {
  id: hd,
  name: dd,
  category: pd,
  keywords: ud,
  size: fd,
  parts: md
}, yd = "table", bd = "table", vd = "living", wd = [
  "dining"
], _d = {
  w: 120,
  h: 80
}, xd = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 5
  }
], $d = {
  id: yd,
  name: bd,
  category: vd,
  keywords: wd,
  size: _d,
  parts: xd
}, kd = "toilet", Sd = "toilet", Ed = "bath", Ad = [
  "wc",
  "loo",
  "lavatory"
], Md = {
  w: 48,
  h: 68
}, Td = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 8.333333
  },
  {
    rect: [
      10,
      0,
      80,
      22
    ],
    rx: 6.25,
    role: "line"
  },
  {
    ellipse: [
      50,
      68,
      34,
      30
    ],
    role: "line"
  }
], Cd = {
  id: kd,
  name: Sd,
  category: Ed,
  keywords: Ad,
  size: Md,
  parts: Td
}, Id = "tv", Pd = "tv", Fd = "living", Od = [
  "television",
  "screen",
  "media"
], Ld = {
  w: 110,
  h: 18
}, zd = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 22.222222
  },
  {
    line: [
      32,
      100,
      68,
      200
    ],
    role: "line"
  }
], Dd = {
  id: Id,
  name: Pd,
  category: Fd,
  keywords: Od,
  size: Ld,
  parts: zd
}, Rd = "vanity", Nd = "vanity", Hd = "bath", jd = [
  "washbasin",
  "sink",
  "bathroom"
], Wd = {
  w: 110,
  h: 55
}, Bd = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 7.272727
  },
  {
    ellipse: [
      50,
      56,
      20,
      26
    ],
    role: "line"
  },
  {
    circle: [
      50,
      14,
      5
    ],
    role: "thin"
  }
], Ud = {
  id: Rd,
  name: Nd,
  category: Hd,
  keywords: jd,
  size: Wd,
  parts: Bd
}, qd = "wardrobe", Gd = "wardrobe", Kd = "bedroom", Vd = [
  "closet",
  "armoire",
  "cupboard"
], Xd = {
  w: 120,
  h: 55
}, Yd = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 7.272727
  },
  {
    line: [
      50,
      0,
      50,
      100
    ],
    role: "line"
  },
  {
    line: [
      44,
      40,
      44,
      60
    ],
    role: "line"
  },
  {
    line: [
      56,
      40,
      56,
      60
    ],
    role: "line"
  }
], Zd = {
  id: qd,
  name: Gd,
  category: Kd,
  keywords: Vd,
  size: Xd,
  parts: Yd
}, Qd = "washer", Jd = "washer", ep = "utility", tp = [
  "washing machine",
  "laundry"
], ip = {
  w: 60,
  h: 62
}, np = [
  {
    rect: [
      0,
      0,
      100,
      100
    ],
    rx: 6.666667
  },
  {
    line: [
      6,
      18,
      94,
      18
    ],
    role: "detail"
  },
  {
    circle: [
      50,
      56,
      30
    ],
    role: "line"
  },
  {
    circle: [
      16,
      9,
      4.5
    ],
    role: "thin"
  }
], op = {
  id: Qd,
  name: Jd,
  category: ep,
  keywords: tp,
  size: ip,
  parts: np
}, rp = "waterHeater", ap = "water heater", sp = "utility", lp = [
  "boiler",
  "cylinder",
  "tank"
], cp = {
  w: 52,
  h: 52
}, hp = "ellipse", dp = [
  {
    ellipse: [
      50,
      50,
      50,
      50
    ],
    role: "body"
  },
  {
    circle: [
      50,
      50,
      17
    ],
    role: "thin"
  }
], pp = {
  id: rp,
  name: ap,
  category: sp,
  keywords: lp,
  size: cp,
  footprint: hp,
  parts: dp
}, sn = [
  "living",
  "bedroom",
  "kitchen",
  "bath",
  "utility",
  "other"
], Pi = (e) => Object.assign(/* @__PURE__ */ Object.create(null), e), Nn = (e, t) => typeof t == "string" && Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0, Oo = Pi({
  body: { width: 2, opacity: 1, fillOpacity: 0.12 },
  line: { width: 2, opacity: 1, fillOpacity: 0 },
  thin: { width: 1.5, opacity: 1, fillOpacity: 0 },
  detail: { width: 1.5, opacity: 0.7, fillOpacity: 0 },
  hint: { width: 1, opacity: 0.6, fillOpacity: 0 },
  solid: { width: 0, opacity: 0.7, fillOpacity: 1 }
}), up = [0, 0, 100, 100], fp = 64, qr = 256, mp = 256, gp = 0.25, Lo = 8, ke = (e) => typeof e == "number" && Number.isFinite(e) ? e : null, et = (e, t, i) => Math.min(i, Math.max(t, e));
function Me(e, t) {
  if (!Array.isArray(e) || e.length !== t) return null;
  const i = [];
  for (const n of e) {
    const o = ke(n);
    if (o === null) return null;
    i.push(o);
  }
  return i;
}
function yp(e) {
  if (!Array.isArray(e) || e.length < 2 || e.length > qr) return null;
  const t = [];
  for (const i of e) {
    const n = Me(i, 2);
    if (!n) return null;
    t.push([n[0], n[1]]);
  }
  return t;
}
const bp = Pi({ M: 2, L: 2, Q: 4, C: 6, Z: 0 });
function vp(e) {
  if (!Array.isArray(e) || !e.length || e.length > mp) return null;
  const t = [];
  for (const i of e) {
    if (!Array.isArray(i) || typeof i[0] != "string") return null;
    const n = i[0].toUpperCase(), o = Nn(bp, n);
    if (o === void 0) return null;
    const r = Me(i.slice(1), o);
    if (!r) return null;
    t.push([n, ...r]);
  }
  return t[0]?.[0] !== "M" ? null : t;
}
function Ze(e, t) {
  const i = Nn(Oo, e.role) ? e.role : t, n = Oo[i], o = ke(e.width), r = ke(e.opacity), a = ke(e.fillOpacity), s = Array.isArray(e.dash) ? e.dash.map(ke) : null, l = s && s.length && s.length <= 8 && s.every((h) => h !== null) ? s.map((h) => et(h, 0, 100)) : void 0;
  return {
    role: i,
    width: o === null ? n.width : i === "solid" ? et(o, 0, Lo) : et(o, gp, Lo),
    opacity: r === null ? n.opacity : et(r, 0, 1),
    fillOpacity: a === null ? n.fillOpacity : et(a, 0, 1),
    dash: l
  };
}
function zo(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return null;
  const t = e, i = t.space === "square" ? "square" : "box";
  if ("line" in t) {
    const n = Me(t.line, 4);
    return n ? { kind: "line", a: [n[0], n[1]], b: [n[2], n[3]], space: i, style: Ze(t, "line") } : null;
  }
  if ("rect" in t) {
    const n = Me(t.rect, 4);
    return !n || n[2] < 0 || n[3] < 0 ? null : {
      kind: "rect",
      x: n[0],
      y: n[1],
      w: n[2],
      h: n[3],
      rx: Math.max(0, ke(t.rx) ?? 0),
      space: i,
      style: Ze(t, "body")
    };
  }
  if ("circle" in t) {
    const n = Me(t.circle, 3);
    return !n || n[2] < 0 ? null : { kind: "circle", cx: n[0], cy: n[1], r: n[2], space: i, style: Ze(t, "line") };
  }
  if ("ellipse" in t) {
    const n = Me(t.ellipse, 4);
    return !n || n[2] < 0 || n[3] < 0 ? null : {
      kind: "ellipse",
      cx: n[0],
      cy: n[1],
      rx: n[2],
      ry: n[3],
      space: i,
      style: Ze(t, "line")
    };
  }
  if ("polygon" in t || "polyline" in t) {
    const n = "polygon" in t, o = yp(n ? t.polygon : t.polyline);
    return o ? { kind: "poly", closed: n, pts: o, space: i, style: Ze(t, n ? "body" : "line") } : null;
  }
  if ("path" in t) {
    const n = vp(t.path);
    return n ? { kind: "path", cmds: n, space: i, style: Ze(t, "line") } : null;
  }
  return null;
}
function wp(e, t, i) {
  switch (e.kind) {
    case "line":
      return { ...e, a: [e.a[0] + t, e.a[1] + i], b: [e.b[0] + t, e.b[1] + i] };
    case "rect":
      return { ...e, x: e.x + t, y: e.y + i };
    case "circle":
      return { ...e, cx: e.cx + t, cy: e.cy + i };
    case "ellipse":
      return { ...e, cx: e.cx + t, cy: e.cy + i };
    case "poly":
      return { ...e, pts: e.pts.map(([n, o]) => [n + t, o + i]) };
    case "path":
      return {
        ...e,
        cmds: e.cmds.map((n) => {
          if (n[0] === "Z") return n;
          const o = n.slice(1).map((r, a) => r + (a % 2 === 0 ? t : i));
          return [n[0], ...o];
        })
      };
  }
}
function _p(e) {
  if (e && typeof e == "object" && "repeat" in e) {
    const i = e, n = ke(i.repeat), o = Me(i.step, 2), r = zo(i.part);
    if (n === null || !o || !r) return [];
    const a = et(Math.round(n), 1, fp);
    return Array.from({ length: a }, (s, l) => wp(r, o[0] * l, o[1] * l));
  }
  const t = zo(e);
  return t ? [t] : [];
}
function Fi(e, t, i) {
  const n = (d) => (i?.push(d), null);
  if (!e || typeof e != "object" || Array.isArray(e))
    return n("A symbol has to be a JSON object.");
  const o = e, r = typeof o.id == "string" && o.id.trim() ? o.id.trim() : t, a = re(r);
  if (!a || a !== r)
    return n('`id` is missing, or uses characters a CSS class cannot: letters, digits, "-" and "_" only.');
  if (!Array.isArray(o.parts)) return n("`parts` has to be an array of shapes.");
  const s = [];
  for (const d of o.parts)
    for (const u of _p(d)) {
      if (s.length >= qr) break;
      s.push(u);
    }
  if (!s.length)
    return n(
      "No drawable parts. Each one needs a known shape (line, rect, circle, ellipse, polygon, polyline, path) with the right number of finite numbers."
    );
  const l = o.size && typeof o.size == "object" ? o.size : {}, h = ke(l.w), p = ke(l.h), c = Me(o.viewBox, 4);
  return {
    id: a,
    name: typeof o.name == "string" && o.name.trim() ? o.name.trim().slice(0, 60) : a,
    category: typeof o.category == "string" && sn.includes(o.category) ? o.category : "other",
    keywords: Array.isArray(o.keywords) ? o.keywords.filter((d) => typeof d == "string").slice(0, 12) : [],
    size: { w: h && h > 0 ? h : 60, h: p && p > 0 ? p : 60 },
    viewBox: c && c[2] > 0 && c[3] > 0 ? c : up,
    footprint: o.footprint === "ellipse" ? "ellipse" : "rect",
    parts: s
  };
}
const Gr = Fi({
  id: "unknown",
  name: "unknown",
  size: { w: 60, h: 60 },
  parts: [{ rect: [0, 0, 100, 100], rx: 6.666667 }]
}), he = (() => {
  const e = /* @__PURE__ */ Object.assign({ "../furniture/airHandler.json": zl, "../furniture/bathtub.json": Bl, "../furniture/bed.json": Yl, "../furniture/chair.json": nc, "../furniture/cornerShowerCurved.json": hc, "../furniture/desk.json": yc, "../furniture/dishwasher.json": kc, "../furniture/dryer.json": Ic, "../furniture/fishTank.json": Rc, "../furniture/fridge.json": qc, "../furniture/hotTub.json": Qc, "../furniture/piano.json": rh, "../furniture/plant.json": uh, "../furniture/quarterTub.json": wh, "../furniture/roundTable.json": Mh, "../furniture/rug.json": Lh, "../furniture/sectional.json": Wh, "../furniture/sink.json": Xh, "../furniture/sofa.json": id, "../furniture/stairs.json": cd, "../furniture/stove.json": gd, "../furniture/table.json": $d, "../furniture/toilet.json": Cd, "../furniture/tv.json": Dd, "../furniture/vanity.json": Ud, "../furniture/wardrobe.json": Zd, "../furniture/washer.json": op, "../furniture/waterHeater.json": pp }), t = Pi({});
  for (const [i, n] of Object.entries(e)) {
    const o = Fi(n, i.split("/").pop()?.replace(/\.json$/, ""));
    o && (t[o.id] = o);
  }
  return t;
})();
function Ot(e, t) {
  return Nn(e, t);
}
let Do, Ro = he;
function qt(e) {
  if (!e || typeof e != "object") return he;
  if (e === Do) return Ro;
  const t = Pi({});
  Object.assign(t, he);
  for (const [i, n] of Object.entries(e)) {
    const o = Fi(n, i);
    o && (t[o.id] = o);
  }
  return Do = e, Ro = t, t;
}
function xp(e) {
  const t = (i) => {
    const n = sn.indexOf(i);
    return n < 0 ? sn.length : n;
  };
  return Object.values(e).sort(
    (i, n) => t(i.category) - t(n.category) || i.name.localeCompare(n.name)
  );
}
function $p(e, t) {
  const i = t.trim().toLowerCase();
  return i ? e.id.toLowerCase().includes(i) || e.name.toLowerCase().includes(i) || e.category.includes(i) || e.keywords.some((n) => n.toLowerCase().includes(i)) : !0;
}
function kp(e, t = he) {
  return Ot(t, e)?.size ?? { w: 60, h: 60 };
}
function No(e, t, i, n) {
  const [o, r, a, s] = e.viewBox, l = n === "square" ? Math.min(t, i) : t, h = n === "square" ? Math.min(t, i) : i, p = l / a, c = h / s;
  return {
    x: (d) => (d - o) * p - l / 2,
    y: (d) => (d - r) * c - h / 2,
    len: (d) => d * Math.min(p, c),
    sx: (d) => d * p,
    sy: (d) => d * c
  };
}
const K = (e) => Number.isFinite(e) ? e : 0;
function Sp(e, t) {
  const i = e.fillOpacity > 0 ? t : "none", n = e.role === "solid" ? "none" : t;
  return { fill: i, stroke: n, style: e };
}
function Ep(e, t, i, n) {
  const { fill: o, stroke: r, style: a } = Sp(e.style, i), s = n ?? o, l = a.opacity < 1 ? a.opacity : f, h = a.dash?.length ? a.dash.join(" ") : f, p = a.fillOpacity > 0 && a.fillOpacity < 1 ? a.fillOpacity : f, c = a.role === "solid" ? f : a.width;
  switch (e.kind) {
    case "line":
      return _`<line x1=${K(t.x(e.a[0]))} y1=${K(t.y(e.a[1]))}
                       x2=${K(t.x(e.b[0]))} y2=${K(t.y(e.b[1]))}
                       fill="none" stroke=${r} stroke-width=${c}
                       stroke-dasharray=${h} opacity=${l} />`;
    case "rect":
      return _`<rect x=${K(t.x(e.x))} y=${K(t.y(e.y))}
                       width=${K(t.sx(e.w))} height=${K(t.sy(e.h))}
                       rx=${e.rx > 0 ? K(t.len(e.rx)) : f}
                       fill=${s} fill-opacity=${p}
                       stroke=${r} stroke-width=${c}
                       stroke-dasharray=${h} opacity=${l} />`;
    case "circle":
      return _`<circle cx=${K(t.x(e.cx))} cy=${K(t.y(e.cy))} r=${K(t.len(e.r))}
                         fill=${s} fill-opacity=${p}
                         stroke=${r} stroke-width=${c} opacity=${l} />`;
    case "ellipse":
      return _`<ellipse cx=${K(t.x(e.cx))} cy=${K(t.y(e.cy))}
                          rx=${K(t.sx(e.rx))} ry=${K(t.sy(e.ry))}
                          fill=${s} fill-opacity=${p}
                          stroke=${r} stroke-width=${c} opacity=${l} />`;
    case "poly": {
      const d = e.pts.map(([u, g]) => `${K(t.x(u))},${K(t.y(g))}`).join(" ");
      return e.closed ? _`<polygon points=${d}
                       fill=${s} fill-opacity=${p}
                       stroke=${r} stroke-width=${c}
                       stroke-linejoin="round" opacity=${l} />` : _`<polyline points=${d} fill="none"
                        stroke=${r} stroke-width=${c}
                        stroke-linejoin="round" opacity=${l} />`;
    }
    case "path": {
      const d = e.cmds.map(
        (u) => u[0] === "Z" ? "Z" : `${u[0]} ${u.slice(1).map((g, b) => b % 2 === 0 ? K(t.x(g)) : K(t.y(g))).join(" ")}`
      ).join(" ");
      return _`<path d=${d}
                       fill=${o} fill-opacity=${p}
                       stroke=${r} stroke-width=${c}
                       stroke-linejoin="round" opacity=${l} />`;
    }
  }
}
function Kr(e, t, i, n, o) {
  const r = No(e, t, i, "box"), a = No(e, t, i, "square");
  return e.parts.map((s) => Ep(s, s.space === "square" ? a : r, n, o));
}
const Ap = /* @__PURE__ */ new Set(["light", "switch", "fan", "input_boolean"]);
function Vr(e) {
  const t = e?.split(".")[0] ?? "";
  return Ap.has(t) ? { action: "toggle" } : { action: "more-info" };
}
function me(e) {
  return e !== void 0 && e.action !== "none";
}
function Xr(e, t) {
  return t === "tap" ? e.tap_action ?? Vr(e.entity) : t === "hold" ? e.hold_action : e.double_tap_action;
}
function Hn(e, t) {
  if (!t || t.action === "none") return !1;
  switch (t.action) {
    case "toggle":
      return !!e.entity;
    case "more-info":
      return !!(t.entity ?? e.entity);
    case "navigate":
      return !!t.navigation_path;
    case "url":
      return !!t.url_path;
    case "perform-action":
    case "call-service":
      return Zr(t) !== null;
    case "fire-dom-event":
      return !0;
    default:
      return !1;
  }
}
function Yr(e, t) {
  if (!(!t || !Hn(e, t)))
    switch (t.action) {
      case "toggle":
        return e.entity;
      case "more-info":
        return t.entity ?? e.entity;
      default:
        return;
    }
}
function Mp(e) {
  return ["tap", "hold", "double_tap"].some(
    (t) => Hn(e, Xr(e, t))
  );
}
function Zr(e) {
  const t = e.perform_action ?? e.service;
  if (!t || !t.includes(".")) return null;
  const [i, n] = t.split(".", 2);
  return { domain: i, service: n, data: e.data ?? e.service_data, target: e.target };
}
function Qe(e, t, i, n) {
  if (!(!n || n.action === "none")) {
    if (n.confirmation) {
      const o = typeof n.confirmation == "object" && n.confirmation.text || `Are you sure you want to ${n.action}?`;
      if (!globalThis.confirm?.(o)) return;
    }
    switch (n.action) {
      case "toggle":
        i.entity && t.callService("homeassistant", "toggle", { entity_id: i.entity });
        break;
      case "more-info": {
        const o = n.entity ?? i.entity;
        o && e.dispatchEvent(
          new CustomEvent("hass-more-info", { detail: { entityId: o }, bubbles: !0, composed: !0 })
        );
        break;
      }
      case "navigate":
        if (n.navigation_path) {
          history.pushState(null, "", n.navigation_path);
          const o = new Event("location-changed");
          o.detail = { replace: !1 }, window.dispatchEvent(o);
        }
        break;
      case "url":
        n.url_path && window.open(n.url_path);
        break;
      case "perform-action":
      case "call-service": {
        const o = Zr(n);
        o && t.callService(o.domain, o.service, o.data, o.target);
        break;
      }
      case "fire-dom-event":
        e.dispatchEvent(new CustomEvent("ll-custom", { detail: n, bubbles: !0, composed: !0 }));
        break;
    }
  }
}
const Tp = 0.75, Ie = 8, Cp = 400;
function Vi(e, t) {
  return typeof e == "number" && Number.isFinite(e) && e > 0 ? e : t;
}
function Ip(e) {
  let t = 0;
  for (let i = 0, n = e.length - 1; i < e.length; n = i++)
    t += e[n].x * e[i].y - e[i].x * e[n].y;
  return t / 2;
}
function Pp(e, t, i, n) {
  const o = n.x - i.x, r = n.y - i.y, a = o * o + r * r;
  if (a === 0) return Math.hypot(e - i.x, t - i.y);
  let s = ((e - i.x) * o + (t - i.y) * r) / a;
  return s = Math.max(0, Math.min(1, s)), Math.hypot(e - (i.x + s * o), t - (i.y + s * r));
}
function Fp(e, t) {
  const i = [];
  for (let n = 0; n < e.length; n++) {
    const o = e[n], r = o.b.x - o.a.x, a = o.b.y - o.a.y, s = Math.hypot(r, a);
    if (s <= t) continue;
    const l = [0, 1], h = t / s;
    for (let p = 0; p < e.length; p++) {
      if (p === n) continue;
      const c = e[p], d = c.b.x - c.a.x, u = c.b.y - c.a.y, g = r * u - a * d;
      if (Math.abs(g) > 1e-9) {
        const b = ((c.a.x - o.a.x) * u - (c.a.y - o.a.y) * d) / g, v = ((c.a.x - o.a.x) * a - (c.a.y - o.a.y) * r) / g, m = t / Math.max(Math.hypot(d, u), 1e-9);
        b > h && b < 1 - h && v >= -m && v <= 1 + m && l.push(b);
        continue;
      }
      for (const b of [c.a, c.b]) {
        const v = ((b.x - o.a.x) * r + (b.y - o.a.y) * a) / (s * s);
        if (v <= h || v >= 1 - h) continue;
        const m = o.a.x + v * r, $ = o.a.y + v * a;
        Math.hypot(b.x - m, b.y - $) <= t && l.push(v);
      }
    }
    l.sort((p, c) => p - c);
    for (let p = 1; p < l.length; p++) {
      const c = l[p - 1], d = l[p];
      d - c <= h || i.push({
        a: { x: o.a.x + c * r, y: o.a.y + c * a },
        b: { x: o.a.x + d * r, y: o.a.y + d * a }
      });
    }
  }
  return i;
}
function Op(e, t) {
  const i = [], n = /* @__PURE__ */ new Map(), o = (h) => Math.floor(h / t), r = (h) => {
    const p = o(h.x), c = o(h.y);
    for (let b = -1; b <= 1; b++)
      for (let v = -1; v <= 1; v++)
        for (const m of n.get(`${p + b}:${c + v}`) ?? [])
          if (Math.hypot(i[m].x - h.x, i[m].y - h.y) <= t) return m;
    const d = i.push({ x: h.x, y: h.y }) - 1, u = `${p}:${c}`, g = n.get(u);
    return g ? g.push(d) : n.set(u, [d]), d;
  }, a = /* @__PURE__ */ new Map(), s = (h) => {
    let p = a.get(h);
    return p || a.set(h, p = /* @__PURE__ */ new Set()), p;
  };
  for (const h of e) {
    const p = r(h.a), c = r(h.b);
    p !== c && (s(p).add(c), s(c).add(p));
  }
  const l = i.map(
    (h, p) => [...a.get(p) ?? []].sort(
      (c, d) => Math.atan2(i[c].y - h.y, i[c].x - h.x) - Math.atan2(i[d].y - h.y, i[d].x - h.x)
    )
  );
  return { points: i, neighbors: l };
}
function Lp(e, t) {
  const { points: i, neighbors: n } = Op(e, t), o = /* @__PURE__ */ new Set(), r = [];
  for (let a = 0; a < i.length; a++)
    for (const s of n[a]) {
      if (o.has(`${a}>${s}`)) continue;
      const l = [];
      let h = a, p = s, c = !1;
      for (let d = 0; d <= i.length * i.length + 4; d++) {
        o.add(`${h}>${p}`), l.push(h);
        const u = n[p], g = u.indexOf(h), b = u[(g - 1 + u.length) % u.length];
        if (h = p, p = b, h === a && p === s) {
          c = !0;
          break;
        }
      }
      c && l.length >= 3 && r.push(l.map((d) => ({ x: i[d].x, y: i[d].y })));
    }
  return r;
}
function zp(e, t, i) {
  for (let n = 0, o = e.length - 1; n < e.length; o = n++)
    for (const r of t)
      if (!J(r) && Pp(r.x, r.y, e[o], e[n]) <= i)
        return !0;
  return !1;
}
function Dp(e, t, i = {}) {
  const n = Vi(i.weldEps, Tp), o = Vi(i.openingEps, Ie), r = Vi(i.minArea, Cp);
  if (e.length < 3) return [];
  const a = Fp(
    e.map((l) => ({ a: { x: l.x1, y: l.y1 }, b: { x: l.x2, y: l.y2 } })),
    n
  );
  return Lp(a, n).map((l) => ({ ring: l, area: Ip(l) })).filter((l) => l.area >= r && !zp(l.ring, t, o)).sort((l, h) => h.area - l.area).map((l) => l.ring);
}
const Ho = /* @__PURE__ */ new WeakMap();
function Qr(e, t) {
  const i = Ho.get(e);
  if (i && i.openings === t) return i.out;
  const n = Dp(e, t);
  return Ho.set(e, { openings: t, out: n }), n;
}
const Rp = 60, Jr = 400, Np = 0.4, ln = 0.35, ea = 0.85, Hp = 32, jp = 0.18, Wp = 0.34, Ue = Math.sqrt(3) / 2, Mt = 0.5, Bp = 0.26;
function cn(e) {
  return e === "iso" || e === "3d" ? "iso" : "plan";
}
function ta(e) {
  return Math.min(Jr, Math.max(0, I(e, Rp)));
}
function ia(e) {
  return Math.min(1, Math.max(0, I(e, 1)));
}
function hn(e) {
  return e.projection !== "iso" ? { w: e.w, h: e.h } : { w: (e.w + e.h) * Ue + 2 * (e.padding ?? 0), h: (e.w + e.h) * Mt + e.wallHeight + 2 * (e.padding ?? 0) };
}
function na(e, t, i, n = 0) {
  return i.projection !== "iso" ? { x: e, y: t } : {
    x: (e - t) * Ue + i.h * Ue + (i.padding ?? 0),
    y: (e + t) * Mt + i.wallHeight - n + (i.padding ?? 0)
  };
}
function Up(e, t, i) {
  if (i.projection !== "iso") return { x: e, y: t };
  const n = (e - t) * Ue, o = (e + t) * Mt, r = Math.hypot(n, o) || 1;
  return { x: n / r, y: o / r };
}
function qp(e) {
  if (e.projection !== "iso") return "";
  const t = (i) => String(+i.toFixed(6));
  return `matrix(${t(Ue)} ${t(Mt)} ${t(-Ue)} ${t(Mt)} ${t(e.h * Ue + (e.padding ?? 0))} ${t(e.wallHeight + (e.padding ?? 0))})`;
}
function ue(e, t) {
  return { x: e.x - t, y: e.y - t };
}
function Gp(e, t) {
  switch (t) {
    case 90:
      return { x: -e, y: e };
    case 180:
      return { x: e, y: e };
    case 270:
      return { x: e, y: -e };
    default:
      return { x: -e, y: -e };
  }
}
function Kp(e, t, i, n) {
  const o = [];
  for (const a of t) {
    if (J(a)) continue;
    const s = a.angle * Math.PI / 180;
    if (Math.abs(i.x * Math.sin(s) - i.y * Math.cos(s)) > Bp) continue;
    const h = a.x - e.x1, p = a.y - e.y1, c = h * i.x + p * i.y;
    if (Math.abs(h * -i.y + p * i.x) > Ie) continue;
    const u = Math.max(0, c - a.length / 2), g = Math.min(n, c + a.length / 2);
    g - u <= 0 || o.push({ s0: u, s1: g, type: a.type === "window" ? "window" : "door" });
  }
  o.sort((a, s) => a.s0 - s.s0);
  const r = [];
  for (const a of o) {
    const s = r[r.length - 1];
    s && a.s0 <= s.s1 ? s.s1 = Math.max(s.s1, a.s1) : r.push({ ...a });
  }
  return r;
}
function Vp(e, t, i, n = !0) {
  const o = [];
  for (const r of e) {
    const a = r.x2 - r.x1, s = r.y2 - r.y1, l = Math.hypot(a, s);
    if (!(l > 1e-6)) continue;
    const h = { x: a / l, y: s / l }, p = { x: -h.y, y: h.x }, c = r.thickness / 2, d = (m) => ({ x: r.x1 + h.x * m, y: r.y1 + h.y * m }), u = (m, $) => {
      const E = d(m), k = d($);
      return [
        { x: E.x + p.x * c, y: E.y + p.y * c },
        { x: k.x + p.x * c, y: k.y + p.y * c },
        { x: k.x - p.x * c, y: k.y - p.y * c },
        { x: E.x - p.x * c, y: E.y - p.y * c }
      ];
    }, g = (m, $, E, k) => {
      const S = Math.max(1, Math.ceil(($ - m) / Hp)), A = ($ - m) / S;
      for (let T = 0; T < S; T++)
        o.push({
          kind: k,
          id: r.id,
          base: u(m + A * T, m + A * (T + 1)),
          z0: 0,
          z1: E,
          hiddenEdges: [...T < S - 1 ? [1] : [], ...T > 0 ? [3] : []]
        });
    }, b = Kp(r, t, h, l);
    let v = 0;
    for (const m of b)
      m.s0 > v && g(v === 0 ? -c : v, m.s0, i, "wall"), m.type === "window" && (g(m.s0, m.s1, i * ln, "sill"), n && o.push({
        kind: "glass",
        id: r.id,
        base: [d(m.s0), d(m.s1)],
        z0: i * ln,
        z1: i * ea
      })), v = m.s1;
    v < l && g(v === 0 ? -c : v, l + c, i, "wall");
  }
  return o;
}
function Xp(e, t, i, n, o) {
  const r = (e.angle ?? 0) * Math.PI / 180, a = Math.cos(r), s = Math.sin(r), l = e.w / 2, h = e.h / 2, p = [
    [-l, -h],
    [l, -h],
    [l, h],
    [-l, h]
  ].map(([c, d]) => t(e.x + c * a - d * s, e.y + c * s + d * a));
  return { kind: "furniture", id: e.id, base: p, z0: 0, z1: i, color: n, top: o };
}
function Yp(e) {
  let t = 0;
  for (const i of e.base) t += i.x + i.y;
  return t / (e.base.length || 1);
}
const jo = (e) => String(Math.round(e * 100) / 100), Xi = (e) => e.map((t) => `${jo(t.x)},${jo(t.y)}`).join(" ");
function Zp(e, t = (i, n) => n) {
  const i = e.map((n, o) => ({ s: n, i: o, depth: Yp(n) })).sort((n, o) => n.depth - o.depth || n.i - o.i);
  return _`<g class="fp-iso">${i.map(({ s: n }) => t(n, Qp(n)))}</g>`;
}
function Qp(e) {
  const t = re(e.id) ?? f;
  if (e.kind === "glass" || e.kind === "panel" || e.kind === "opening-hit") {
    const [s, l] = e.base;
    return _`<polygon class=${`fp-iso-${e.kind}${e.glazed ? " fp-iso-glazed" : ""}`} data-id=${t}
                        style=${e.color ? `--fp-iso-color:${e.color}` : f}
                        points=${Xi(e.vertices ? e.vertices.map((h) => ue(h, h.z)) : [ue(s, e.z0), ue(l, e.z0), ue(l, e.z1), ue(s, e.z1)])} />`;
  }
  const i = e.base.length;
  let n = 0, o = 0;
  for (const s of e.base)
    n += s.x / i, o += s.y / i;
  const r = [];
  for (let s = 0; s < i; s++) {
    if (e.hiddenEdges?.includes(s)) continue;
    const l = e.base[s], h = e.base[(s + 1) % i];
    let p = h.y - l.y, c = -(h.x - l.x);
    p * (n - l.x) + c * (o - l.y) > 0 && (p = -p, c = -c), !(p + c <= 0) && r.push({
      pts: Xi([ue(l, e.z0), ue(h, e.z0), ue(h, e.z1), ue(l, e.z1)]),
      shade: Math.abs(p) >= Math.abs(c) ? jp : Wp
    });
  }
  const a = Xi(e.base.map((s) => ue(s, e.z1)));
  return _`<g class=${`fp-iso-solid fp-iso-${e.kind}`} data-id=${t}
                style=${e.color ? `--fp-iso-color:${e.color}` : f}>
    ${r.map(
    (s) => _`<polygon class="fp-iso-face" points=${s.pts} /><polygon class="fp-iso-shade" points=${s.pts} opacity=${s.shade} />`
  )}
    <polygon class="fp-iso-face fp-iso-top" points=${a} />
    ${e.top ?? f}
  </g>`;
}
const V = 8, oa = 0.05, wt = "—";
function Tt(e, t) {
  if (!t || !e) return wt;
  const i = e.states[t];
  return i ? e.formatEntityState(i) : wt;
}
function ra(e, t, i) {
  if (e.formatEntityState !== t.formatEntityState || e.formatEntityAttributeValue !== t.formatEntityAttributeValue) return !0;
  for (const n of i)
    if (e.states[n] !== t.states[n]) return !0;
  return !1;
}
function Jp(e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of $e(e))
    for (const n of i.furniture ?? [])
      for (const o of ["tap", "hold", "double_tap"]) {
        const r = xt(n, o), a = r && Yr({ entity: r.entity }, r.config);
        a && t.add(a);
      }
  return t;
}
function tt(e) {
  const t = /* @__PURE__ */ new Set();
  (e.sunDimming || e.ambientDaylight || e.sunlight && !Di(e)) && t.add("sun.sun");
  for (const i of $e(e)) {
    for (const n of i.openings)
      n.entity && t.add(n.entity), n.shutterEntity && t.add(n.shutterEntity), n.secondaryEntity && t.add(n.secondaryEntity), n.shutterSecondaryEntity && t.add(n.shutterSecondaryEntity);
    for (const n of i.items) {
      n.entity && t.add(n.entity), n.hideEntity && t.add(n.hideEntity), n.hideStateEntity && t.add(n.hideStateEntity), n.hideBadgeEntity && t.add(n.hideBadgeEntity);
      for (const o of Pe(n)) o.entity && t.add(o.entity);
    }
    for (const n of i.texts)
      n.entity && t.add(n.entity);
    for (const n of i.furniture)
      n.entity && t.add(n.entity);
    for (const n of i.areas)
      n.entity && t.add(n.entity);
    for (const n of i.trackers)
      for (const o of [n.xSensor, n.ySensor])
        o?.entity && t.add(o.entity), o?.presence?.entity && t.add(o.presence.entity);
  }
  return t;
}
function jn(e, t, i) {
  if (!t || !e) return wt;
  const n = e.states[t];
  if (!n) return wt;
  const o = e.formatEntityAttributeValue;
  if (typeof o == "function") return o(n, i);
  const r = n.attributes?.[i];
  return r == null || r === "" ? wt : String(r);
}
function eu(e, t, i) {
  const n = i.entity || (i.attribute ? t.entity : void 0);
  return n ? i.attribute ? jn(e, n, i.attribute) : Tt(e, n) : "";
}
function Pe(e) {
  return [...e.secondaryEntity || e.secondaryAttribute ? [{ entity: e.secondaryEntity, attribute: e.secondaryAttribute }] : [], ...e.readings ?? []];
}
function tu(e, t) {
  return t.attribute ? jn(e, t.entity, t.attribute) : Tt(e, t.entity);
}
function Wn(e, t) {
  if (!t.entity) return t.text ?? "";
  const i = t.attribute ? jn(e, t.entity, t.attribute) : Tt(e, t.entity);
  return t.text ? `${t.text} ${i}` : i;
}
function Oi(e, t) {
  return aa(e, t)?.color;
}
function aa(e, t) {
  if (!e?.length) return;
  const i = typeof t == "number" ? t : Number(t), n = typeof t != "boolean" && t !== "" && t != null && Number.isFinite(i), o = t == null ? "" : String(t).trim().toLowerCase();
  let r, a, s;
  for (const l of e)
    !l || typeof l != "object" || typeof l.color != "string" || (typeof l.state == "string" && l.state !== "" ? r === void 0 && o !== "" && l.state.trim().toLowerCase() === o && (r = l) : typeof l.above == "number" ? n && i > l.above && (!a || l.above > (a.above ?? -1 / 0)) && (a = l) : s === void 0 && (s = l));
  return r ?? a ?? s;
}
function Wo(e, t) {
  if (!e.entity) return;
  const i = Oi(e.stateColor, t);
  if (i) return L(i);
  if (e.activeColor && Ee(e.entity, t)) return L(e.activeColor);
}
function Bo(e, t) {
  if (!e.entity) return;
  const i = Oi(e.stateColor, t);
  if (i) return L(i);
  if (e.activeColor && Ee(e.entity, t)) return L(e.activeColor);
}
function Bn(e, t) {
  if (!t || t.state !== "on") return;
  const i = t.attributes ?? {}, n = i.brightness, o = typeof n == "number" && Number.isFinite(n) ? Math.max(0, Math.min(255, n)) : void 0, r = o === void 0 ? si : Ao + (si - Ao) * (o / 255), a = I(e.glowRadius, Mi) * (o === void 0 ? 1 : Mo + (1 - Mo) * (o / 255)), s = i.rgb_color;
  if (Array.isArray(s) && s.length >= 3) {
    const [l, h, p] = s;
    if ([l, h, p].every((c) => typeof c == "number" && Number.isFinite(c))) {
      const c = (u) => Math.max(0, Math.min(255, Math.round(u))), d = L(`rgb(${c(l)}, ${c(h)}, ${c(p)})`);
      if (d) return { color: d, opacity: r, radius: a };
    }
  }
  return { color: ae(e.glowColor, Br), opacity: r, radius: a };
}
function sa(e) {
  if (!e || e.state !== "on") return;
  const t = e.attributes ?? {}, i = t.rgb_color;
  if (!Array.isArray(i) || i.length < 3) return;
  const [n, o, r] = i;
  if (![n, o, r].every((p) => typeof p == "number" && Number.isFinite(p))) return;
  const a = t.brightness, s = typeof a == "number" && Number.isFinite(a) ? Math.max(0, Math.min(255, a)) : void 0, l = s === void 0 ? 1 : To + (1 - To) * (s / 255), h = (p) => Math.max(0, Math.min(255, Math.round(p * l)));
  return L(`rgb(${h(n)}, ${h(o)}, ${h(r)})`);
}
function iu(e, t) {
  return t ? Bn(e, t) : {
    color: ae(e.glowColor, Br),
    opacity: si,
    radius: I(e.glowRadius, Mi)
  };
}
function Un(e, t, i) {
  const n = i.x2 - i.x1, o = i.y2 - i.y1, r = n * n + o * o, a = r === 0 ? 0 : Math.max(0, Math.min(1, ((e - i.x1) * n + (t - i.y1) * o) / r)), s = i.x1 + a * n, l = i.y1 + a * o;
  return Math.hypot(e - s, t - l);
}
function qn(e, t, i, n, o) {
  const r = o.x2 - o.x1, a = o.y2 - o.y1, s = i * a - n * r;
  if (Math.abs(s) < 1e-12) return;
  const l = o.x1 - e, h = o.y1 - t, p = (l * a - h * r) / s, c = (l * n - h * i) / s;
  if (!(p <= 1e-9 || c < 0 || c > 1))
    return p;
}
function nu(e, t, i, n, o) {
  const r = e.x2 - e.x1, a = e.y2 - e.y1, s = [-r, r, -a, a], l = [e.x1 - t, n - e.x1, e.y1 - i, o - e.y1];
  let h = 0, p = 1;
  for (let c = 0; c < 4; c++) {
    if (s[c] === 0) {
      if (l[c] < 0) return;
      continue;
    }
    const d = l[c] / s[c];
    if (s[c] < 0) {
      if (d > p) return;
      d > h && (h = d);
    } else {
      if (d < h) return;
      d < p && (p = d);
    }
  }
  return {
    ...e,
    x1: e.x1 + h * r,
    y1: e.y1 + h * a,
    x2: e.x1 + p * r,
    y2: e.y1 + p * a
  };
}
function Gn(e, t, i) {
  if (X(e) === "fixed") return 0;
  const n = Math.max(0, Math.min(1, t)), o = Math.max(0, Math.min(1, i ?? t));
  if (X(e) === "swing")
    return Se(e) === "double" ? (n + o) / 2 : n * Li(e);
  if (X(e) === "awning") return n;
  switch (Lt(e)) {
    case "biparting":
      return (n + o) / 2;
    case "biparting-bypass":
    case "converging":
      return (n + o) / 4;
    default:
      return n;
  }
}
function la(e, t, i, n) {
  return n !== void 0 && n <= 0 ? [0, 0] : yi(e) ? [0, 1] : ou(e, t, i);
}
function ou(e, t, i) {
  const n = Gn(e, t, i), o = [(1 - n) / 2, (1 + n) / 2];
  if (Li(e) < 1) {
    const l = [0, n];
    return e.flipH ? [1 - l[1], 1 - l[0]] : l;
  }
  if (X(e) !== "swing" || Se(e) !== "double") return o;
  const r = Math.max(0, Math.min(1, t)), a = Math.max(0, Math.min(1, i ?? t)), s = [0.5 - r / 2, 0.5 + a / 2];
  return e.flipH ? [1 - s[1], 1 - s[0]] : s;
}
function Kn(e, t, i) {
  const n = [];
  for (const r of t) {
    if (J(r)) continue;
    const a = i(r), s = (h) => Math.max(0, Math.min(1, h)), l = typeof a == "number" ? [(1 - s(a)) / 2, (1 + s(a)) / 2] : [s(Math.min(a[0], a[1])), s(Math.max(a[0], a[1]))];
    l[1] > l[0] && n.push({ o: r, span: l });
  }
  if (!n.length) return e;
  const o = [];
  for (const r of e) {
    const a = r.x2 - r.x1, s = r.y2 - r.y1, l = a * a + s * s;
    if (l === 0) {
      o.push(r);
      continue;
    }
    const h = Math.sqrt(l), p = [];
    for (const { o: v, span: m } of n) {
      if (Un(v.x, v.y, r) > Ie) continue;
      const $ = ((v.x - r.x1) * a + (v.y - r.y1) * s) / l, E = Math.cos(v.angle * Math.PI / 180) * a + Math.sin(v.angle * Math.PI / 180) * s >= 0 ? 1 : -1, k = (D) => E * (D - 0.5) * v.length / h, S = $ + k(m[0]), A = $ + k(m[1]), T = Math.max(0, Math.min(S, A)), P = Math.min(1, Math.max(S, A));
      P > T && p.push([T, P]);
    }
    if (!p.length) {
      o.push(r);
      continue;
    }
    p.sort((v, m) => v[0] - m[0]);
    const c = [p[0]];
    for (const v of p.slice(1)) {
      const m = c[c.length - 1];
      v[0] <= m[1] ? m[1] = Math.max(m[1], v[1]) : c.push(v);
    }
    const d = (v) => ({ x: r.x1 + a * v, y: r.y1 + s * v });
    let u = 0, g = 0;
    const b = (v, m) => {
      if ((m - v) * h < V / 2) return;
      const $ = d(v), E = d(m);
      o.push({ id: `${r.id}#${g++}`, x1: $.x, y1: $.y, x2: E.x, y2: E.y });
    };
    for (const [v, m] of c)
      b(u, v), u = m;
    b(u, 1);
  }
  return o;
}
function ca(e, t, i, n) {
  const o = n.filter((c) => {
    const d = Un(e, t, c);
    return d < i && d > V;
  });
  if (!o.length) return;
  const r = i * 1.01, a = [
    { id: "b1", x1: e - r, y1: t - r, x2: e + r, y2: t - r },
    { id: "b2", x1: e + r, y1: t - r, x2: e + r, y2: t + r },
    { id: "b3", x1: e + r, y1: t + r, x2: e - r, y2: t + r },
    { id: "b4", x1: e - r, y1: t + r, x2: e - r, y2: t - r }
  ], s = o.map((c) => nu(c, e - r, t - r, e + r, t + r)).filter((c) => c !== void 0);
  if (!s.length) return;
  const l = [...s, ...a], h = [];
  for (const c of l)
    for (const [d, u] of [
      [c.x1, c.y1],
      [c.x2, c.y2]
    ]) {
      const g = Math.atan2(u - t, d - e);
      for (const b of [g - 1e-4, g, g + 1e-4]) {
        const v = Math.cos(b), m = Math.sin(b);
        let $ = 1 / 0;
        for (const E of l) {
          const k = qn(e, t, v, m, E);
          k !== void 0 && k < $ && ($ = k);
        }
        $ < 1 / 0 && h.push({ x: e + v * $, y: t + m * $, a: b });
      }
    }
  h.sort((c, d) => c.a - d.a);
  const p = (c) => Math.round(c * 100) / 100;
  return h.map(({ x: c, y: d }) => ({ x: p(c), y: p(d) }));
}
function ha(e, t, i, n) {
  const o = t.radius, r = n?.length ? ca(e.x, e.y, o, n) : void 0, a = `${i}-clip`;
  return _`
    ${r ? _`<clipPath id=${a}>
                <polygon points=${r.map((s) => `${s.x},${s.y}`).join(" ")} />
              </clipPath>` : f}
    <radialGradient id=${i} gradientUnits="userSpaceOnUse"
                    cx=${e.x} cy=${e.y} r=${o}>
      <stop offset="0" stop-color=${t.color} stop-opacity=${t.opacity} />
      <stop offset="1" stop-color=${t.color} stop-opacity="0" />
    </radialGradient>
    <circle class="fp-glow" cx=${e.x} cy=${e.y} r=${o}
            fill=${`url(#${i})`}
            clip-path=${r ? `url(#${a})` : f} />`;
}
function ru(e, t, i, n, o, r) {
  const a = e.map((l) => {
    if (!l.glow) return;
    const h = Bn(l, t?.[l.entity]);
    if (h)
      return {
        // Normalized against the glow's own ceiling, so a full-brightness lamp
        // clears the dim entirely and a dim one clears proportionally.
        strength: Math.max(0, Math.min(1, h.opacity / si)),
        // Straight off the paint, so the clearing tracks the pool as it shrinks
        // with brightness (issue #123) instead of staying at the configured size.
        radius: h.radius
      };
  });
  if (!a.some((l) => l !== void 0)) return f;
  const s = V;
  return _`
    <defs>
      <mask id=${o} maskUnits="userSpaceOnUse"
            x=${-s} y=${-s} width=${i + s * 2} height=${n + s * 2}>
        <rect x=${-s} y=${-s} width=${i + s * 2} height=${n + s * 2}
              fill="white" />
        ${e.map((l, h) => {
    const p = a[h];
    if (p === void 0) return f;
    const { strength: c, radius: d } = p, u = `${o}-${h}`, g = r?.length ? ca(l.x, l.y, d, r) : void 0, b = `${u}-clip`;
    return _`
            ${g ? _`<clipPath id=${b}>
                        <polygon points=${g.map((v) => `${v.x},${v.y}`).join(" ")} />
                      </clipPath>` : f}
            <radialGradient id=${u} gradientUnits="userSpaceOnUse"
                            cx=${l.x} cy=${l.y} r=${d}>
              <stop offset="0" stop-color="#000" stop-opacity=${c} />
              <stop offset="1" stop-color="#000" stop-opacity="0" />
            </radialGradient>
            <circle cx=${l.x} cy=${l.y} r=${d} fill=${`url(#${u})`}
                    clip-path=${g ? `url(#${b})` : f} />`;
  })}
      </mask>
    </defs>`;
}
function da(e, t, i, n, o = he) {
  const r = V;
  return _`
    <defs>
      <mask id=${n} maskUnits="userSpaceOnUse"
            x=${-r} y=${-r} width=${t + r * 2} height=${i + r * 2}>
        <rect x=${-r} y=${-r} width=${t + r * 2} height=${i + r * 2}
              fill="white" />
        ${e.map((a) => {
    const s = 1 - bl;
    return au(a, "#000", "#000", s, o);
  })}
      </mask>
    </defs>`;
}
function au(e, t, i, n, o = he) {
  const r = t;
  let a = Ot(o, e.type) ?? Gr;
  a = structuredClone(a), a.parts = a.parts.map((h) => (h.style.fillOpacity = su(h) ? n : 0, h));
  const s = Kr(a, e.w, e.h, r, i), l = e.hand === "left" ? " scale(-1 1)" : "";
  return _`<g class=${`fp-furniture-mask fp-furniture-mask-${re(e.type) ?? "unknown"}`}
                transform="translate(${e.x} ${e.y}) rotate(${e.angle ?? 0})${l}">${s}</g>`;
}
function su(e) {
  switch (e.kind) {
    case "rect":
    case "circle":
    case "ellipse":
      return !0;
    case "poly":
      return e.closed;
    case "path": {
      let t = !1;
      for (const i of e.cmds)
        if (i[0] === "M") {
          if (t) return !1;
          t = !0;
        } else i[0] === "Z" && (t = !1);
      return !t;
    }
    case "line":
      return !1;
  }
}
function pa(e, t, i) {
  if (e.enableHideByEntity) {
    const n = e.hideEntity || e.entity;
    let o = t;
    return n && i && i.states[n] && (o = e.hideAttribute ? i.states[n].attributes[e.hideAttribute] : i.states[n].state), Vn(
      o,
      e.hideMode,
      e.hideState,
      e.hideOperator,
      e.hideThreshold,
      e.hideInvert
    );
  }
  return e.hideWhenInactive ? e.entity ? !Ee(e.entity, t) : !0 : !1;
}
function lu(e, t) {
  return e.showOnlyWhenZoomed ? t ? e.area ? e.area !== t.id && e.area !== t.name : !zt(t.points ?? [], e.x, e.y) : !0 : !1;
}
function cu(e, t, i) {
  if (!e.enableHideBadgeByEntity) return !1;
  let n = t;
  if (i) {
    const o = e.hideBadgeEntity || e.entity;
    o && i.states[o] && (n = e.hideBadgeAttribute && i.states[o].attributes ? String(i.states[o].attributes[e.hideBadgeAttribute]) : i.states[o].state);
  }
  return Vn(
    n,
    e.hideBadgeMode,
    e.hideBadgeMatch,
    // Ensure this property is correctly mapped in your types, or use hideBadgeState
    e.hideBadgeOperator,
    e.hideBadgeThreshold,
    e.hideBadgeInvert
  );
}
const ua = 12;
function fa(e, t) {
  const i = [];
  if (t.showName) {
    const o = t.entity ? e?.states[t.entity]?.attributes?.friendly_name : void 0, r = t.name || o || t.entity;
    r && i.push(r);
  }
  let n = !1;
  if (t.enableHideStateByEntity && e) {
    const o = t.hideStateEntity || t.entity;
    let r;
    o && e.states[o] && (r = t.hideStateAttribute && e.states[o].attributes ? e.states[o].attributes[t.hideStateAttribute] : e.states[o].state), n = Vn(
      r,
      t.hideStateMode,
      t.hideStateMatch,
      t.hideStateOperator,
      t.hideStateThreshold,
      t.hideStateInvert
    );
  }
  if (t.entity && (t.showState ?? t.kind === "sensor") && !n && i.push(tu(e, t)), !n)
    for (const o of Pe(t)) {
      if (o.showState === !1) continue;
      const r = eu(e, t, o);
      r && i.push(r);
    }
  return i.join(" · ");
}
const Uo = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
function Vn(e, t = "state", i, n = "==", o, r = !1) {
  if (e == null || e === "") return !1;
  let a = !1;
  if (t === "threshold") {
    if (o == null) return !1;
    const s = Number(e);
    if (!Number.isFinite(s)) return !1;
    switch (n) {
      case "<":
        a = s < o;
        break;
      case "<=":
        a = s <= o;
        break;
      case "==":
        a = s === o;
        break;
      case "!=":
        a = s !== o;
        break;
      case ">=":
        a = s >= o;
        break;
      case ">":
        a = s > o;
        break;
      default:
        return !1;
    }
  } else {
    if (i == null || String(i).trim() === "") return !1;
    const s = String(e).trim().toLowerCase(), l = String(i).trim().toLowerCase();
    if (Uo.has(s) && !Uo.has(l))
      return !1;
    a = n === "!=" ? s !== l : s === l;
  }
  return r ? !a : a;
}
function hu(e) {
  return e.showName || (e.showState ?? e.kind === "sensor") ? !0 : Pe(e).some((t) => t.showState !== !1 && (t.entity || t.attribute));
}
function Xn(e) {
  const t = e.labelPosition;
  return t === "left" || t === "right" ? t : "below";
}
function du(e, t) {
  const i = fa(e, t);
  return i ? { text: i, live: !0 } : { text: t.name || t.entity || t.kind, live: !1 };
}
function ma(e) {
  return Math.min(40, Math.max(8, I(e, ua)));
}
function ga(e, t) {
  if (!e.disableLabelColor) return t;
  if (e.useCustomLabelColor)
    return L(e.labelCustomColor) ?? void 0;
}
function pu(e) {
  return Math.min(40, Math.max(8, I(e, zn)));
}
function dn(e) {
  return Math.min(Lr, Math.max(2, I(e, V)));
}
function ya(e, t) {
  if (e === void 0) return "";
  const i = dn(e);
  return t === "railing" ? `stroke-width:${Math.round(i * uu * 100) / 100};` : `stroke-width:${i};`;
}
function ba() {
  return "stroke-width:2; stroke-dasharray:2 12; opacity:0.7;";
}
const uu = 0.4;
function hi(e) {
  return e.kind === "railing";
}
const qo = /* @__PURE__ */ new WeakMap();
function va(e) {
  if (!e.some(hi)) return e;
  let t = qo.get(e);
  return t || (t = e.filter((i) => !hi(i)), qo.set(e, t)), t;
}
function di(e) {
  return e === "plan" ? "plan" : "fixed";
}
const wa = 4e3;
function pi(e) {
  if (typeof e != "number" && typeof e != "string") return;
  const t = Number(e);
  return Number.isFinite(t) && t > 0 ? Math.min(t, wa) : void 0;
}
function B(e, t) {
  return t === "plan" ? `calc(${e} * var(--fp-u, 1px))` : `${e}px`;
}
function fu(e, t) {
  return t !== "plan" && e === void 0 ? "" : `font-size:${B(pu(e), t)};`;
}
function Go(e) {
  switch (e) {
    case "light":
      return "mdi:lightbulb";
    case "switch":
      return "mdi:toggle-switch";
    case "sensor":
      return "mdi:gauge";
    case "binary_sensor":
      return "mdi:radiobox-marked";
    case "climate":
      return "mdi:thermostat";
    case "cover":
      return "mdi:window-shutter";
    case "media_player":
      return "mdi:television";
    case "fan":
      return "mdi:fan";
    case "camera":
      return "mdi:cctv";
    case "lock":
      return "mdi:lock";
    case "humidifier":
      return "mdi:air-humidifier";
    case "vacuum":
      return "mdi:robot-vacuum";
    default:
      return "mdi:circle";
  }
}
const mu = {
  media_player: { on: "mdi:television-play", off: "mdi:television-off" },
  fan: { on: "mdi:fan", off: "mdi:fan-off" },
  lock: { on: "mdi:lock-open-variant", off: "mdi:lock" },
  camera: { on: "mdi:cctv", off: "mdi:cctv-off" },
  humidifier: { on: "mdi:air-humidifier", off: "mdi:air-humidifier-off" },
  vacuum: { on: "mdi:robot-vacuum", off: "mdi:robot-vacuum-variant" }
}, gu = {
  paused: "mdi:television-pause",
  idle: "mdi:television"
}, yu = {
  off: "mdi:power",
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan"
}, bu = {
  "clear-night": "mdi:weather-night",
  cloudy: "mdi:weather-cloudy",
  exceptional: "mdi:alert-circle-outline",
  fog: "mdi:weather-fog",
  hail: "mdi:weather-hail",
  lightning: "mdi:weather-lightning",
  "lightning-rainy": "mdi:weather-lightning-rainy",
  partlycloudy: "mdi:weather-partly-cloudy",
  pouring: "mdi:weather-pouring",
  rainy: "mdi:weather-rainy",
  snowy: "mdi:weather-snowy",
  "snowy-rainy": "mdi:weather-snowy-rainy",
  sunny: "mdi:weather-sunny",
  windy: "mdi:weather-windy",
  "windy-variant": "mdi:weather-windy-variant"
}, vu = {
  battery: { on: "mdi:battery-alert", off: "mdi:battery" },
  battery_charging: { on: "mdi:battery-charging", off: "mdi:battery" },
  carbon_monoxide: { on: "mdi:smoke-detector-alert", off: "mdi:smoke-detector" },
  cold: { on: "mdi:snowflake", off: "mdi:thermometer" },
  connectivity: { on: "mdi:check-network-outline", off: "mdi:close-network-outline" },
  door: { on: "mdi:door-open", off: "mdi:door-closed" },
  garage_door: { on: "mdi:garage-open", off: "mdi:garage" },
  gas: { on: "mdi:alert-circle", off: "mdi:check-circle" },
  heat: { on: "mdi:fire", off: "mdi:thermometer" },
  light: { on: "mdi:brightness-7", off: "mdi:brightness-5" },
  lock: { on: "mdi:lock-open", off: "mdi:lock" },
  moisture: { on: "mdi:water", off: "mdi:water-off" },
  motion: { on: "mdi:motion-sensor", off: "mdi:motion-sensor-off" },
  occupancy: { on: "mdi:home", off: "mdi:home-outline" },
  opening: { on: "mdi:square-outline", off: "mdi:square" },
  plug: { on: "mdi:power-plug", off: "mdi:power-plug-off" },
  power: { on: "mdi:power-plug", off: "mdi:power-plug-off" },
  presence: { on: "mdi:home", off: "mdi:home-outline" },
  problem: { on: "mdi:alert-circle", off: "mdi:check-circle" },
  running: { on: "mdi:play", off: "mdi:stop" },
  safety: { on: "mdi:alert-circle", off: "mdi:check-circle" },
  smoke: { on: "mdi:smoke-detector-variant-alert", off: "mdi:smoke-detector-variant" },
  sound: { on: "mdi:music-note", off: "mdi:music-note-off" },
  tamper: { on: "mdi:vibrate", off: "mdi:check-circle" },
  vibration: { on: "mdi:vibrate", off: "mdi:crop-portrait" },
  window: { on: "mdi:window-open", off: "mdi:window-closed" }
}, wu = {
  temperature: "mdi:thermometer",
  humidity: "mdi:water-percent",
  battery: "mdi:battery",
  power: "mdi:flash",
  energy: "mdi:lightning-bolt",
  illuminance: "mdi:brightness-5",
  pressure: "mdi:gauge",
  carbon_dioxide: "mdi:molecule-co2",
  pm25: "mdi:air-filter",
  signal_strength: "mdi:wifi",
  voltage: "mdi:sine-wave",
  current: "mdi:current-ac"
}, _u = {
  garage: { on: "mdi:garage-open", off: "mdi:garage" },
  garage_door: { on: "mdi:garage-open", off: "mdi:garage" },
  door: { on: "mdi:door-open", off: "mdi:door-closed" },
  gate: { on: "mdi:gate-open", off: "mdi:gate" },
  window: { on: "mdi:window-open", off: "mdi:window-closed" },
  blind: { on: "mdi:blinds-open", off: "mdi:blinds" },
  shade: { on: "mdi:roller-shade", off: "mdi:roller-shade-closed" },
  shutter: { on: "mdi:window-shutter-open", off: "mdi:window-shutter" },
  curtain: { on: "mdi:curtains", off: "mdi:curtains-closed" },
  awning: { on: "mdi:awning-outline", off: "mdi:awning-outline" }
};
function xu(e) {
  return e === "on" || e === "open" || e === "home" || e === "playing";
}
const $u = {
  lock: /* @__PURE__ */ new Set(["unlocked", "unlocking", "open", "opening"]),
  vacuum: /* @__PURE__ */ new Set(["cleaning", "returning"]),
  camera: /* @__PURE__ */ new Set(["recording", "streaming"]),
  // A climate entity's state *is* its HVAC mode (issue #206) — "cool",
  // "heat", "dry"… never the generic "on" the fallback test looks for, so
  // every mode but the literal "off" read as off forever: the active
  // highlight never lit, and a configured iconAnimation never played on a
  // unit that was very much running. Every mode HA's own climate.HVACMode
  // enum defines, off excluded.
  climate: /* @__PURE__ */ new Set(["auto", "cool", "dry", "fan_only", "heat", "heat_cool"]),
  // Same trap, one domain over: a paused or idle player is still switched
  // on, just not mid-playback, and "playing" alone left everything else
  // reading as off. "standby" is the one state that means the device itself
  // dropped to low power, so it stays out.
  media_player: /* @__PURE__ */ new Set(["on", "idle", "playing", "paused", "buffering"])
};
function Ee(e, t) {
  if (!t || t === "unavailable" || t === "unknown") return !1;
  const i = e?.split(".")[0] ?? "", n = $u[i];
  return n ? n.has(t) : xu(t);
}
const ku = {
  fan: "spin",
  media_player: "pulse",
  vacuum: "pulse"
};
function _a(e) {
  return ku[e?.split(".")[0] ?? ""];
}
const Su = /* @__PURE__ */ new Set(["idle", "off"]);
function Eu(e) {
  const t = e?.hvac_action;
  return typeof t != "string" ? !0 : !Su.has(t);
}
function xa(e, t, i) {
  const n = e.iconAnimation ?? "auto";
  if (n !== "none" && Ee(e.entity, t)) {
    if (e.entity?.split(".")[0] === "climate") {
      if (!Eu(i)) return;
      if (t === "fan_only") return "spin";
    }
    return n === "spin" || n === "pulse" ? n : _a(e.entity);
  }
}
const Au = /* @__PURE__ */ new Set(["motion", "occupancy", "presence", "vibration"]);
function $a(e, t) {
  const i = e?.split(".")[0];
  return i === "device_tracker" || i === "person" ? !0 : i === "binary_sensor" && !!t && Au.has(t);
}
function ka(e, t, i, n) {
  const o = e.split(".")[0];
  if (o === "climate")
    return yu[n ?? ""] ?? (i ? "mdi:thermostat" : "mdi:power");
  if (o === "weather") return bu[n ?? ""] ?? "mdi:weather-cloudy";
  if (o === "media_player" && n) {
    const a = gu[n];
    if (a) return a;
  }
  const r = mu[o];
  if (r) return i ? r.on : r.off;
  if (t) {
    if (o === "binary_sensor") {
      const a = vu[t];
      return a ? i ? a.on : a.off : void 0;
    }
    if (o === "sensor") return wu[t];
    if (o === "cover") {
      const a = _u[t];
      return a ? i ? a.on : a.off : void 0;
    }
  }
}
function Yn(e, t) {
  if (t)
    return e.attribute ? t.attributes?.[e.attribute] : t.state;
}
function pn(e, t, i) {
  const n = yt(aa(e.stateColor, Yn(e, t))?.icon);
  if (n) return n;
  const o = yt(e.icon);
  if (o) return o;
  if (!e.entity) return Go(e.kind);
  if (i) return i;
  const r = t?.attributes?.icon;
  return r || (ka(
    e.entity,
    t?.attributes?.device_class,
    Ee(e.entity, t?.state),
    t?.state
  ) ?? Go(e.kind));
}
function Sa(e) {
  const t = Math.round(e);
  let i = Math.round(t * 0.62);
  return i % 2 !== t % 2 && (i += 1), Math.max(2, i);
}
function Ct(e) {
  return e.badgeContent === "icon" || e.badgeContent === "value" || e.badgeContent === "none" ? e.badgeContent : e.showIcon === !1 ? "none" : "icon";
}
function Gt(e) {
  const t = e.pressEffect;
  return t === "scale" || t === "ripple" || t === "flash" || t === "none" ? t : Hr;
}
function Mu(e, t, i) {
  if (e.goToFloor !== "up" && e.goToFloor !== "down") return;
  const n = t.findIndex((r) => r.id === i);
  return n < 0 ? void 0 : t[n + (e.goToFloor === "up" ? 1 : -1)]?.id;
}
function Ea(e) {
  const t = e.offlineStyle;
  return t === "dim" || t === "strike" || t === "none" ? t : jr;
}
function un(e, t) {
  return e.entity ? t === void 0 || at(t) : !1;
}
const Tu = {
  climate: { attribute: "current_temperature", unit: "°" },
  water_heater: { attribute: "current_temperature", unit: "°" },
  humidifier: { attribute: "current_humidity", unit: "%" }
};
function pt(e) {
  if (e == null || typeof e == "boolean" || typeof e == "string" && e.trim() === "") return;
  const t = typeof e == "number" ? e : Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function Cu(e) {
  if (typeof e != "string") return "";
  const t = e.trim();
  return t === "°C" || t === "°F" || t === "K" ? "°" : t === "ppm" || t === "ppb" ? "" : t.length <= 3 ? t : "";
}
function Kt(e) {
  return Math.abs(e) < 10 && !Number.isInteger(e) ? e.toFixed(1) : String(Math.round(e));
}
function Iu(e, t) {
  return t === "W" && Math.abs(e) >= 1e3 ? { n: e / 1e3, unit: "kW" } : { n: e, unit: t };
}
function Ko(e, t) {
  const i = Iu(e, Cu(t));
  return Kt(i.n) + i.unit;
}
function Aa(e, t) {
  return Ta(e, t)?.text;
}
function Ma(e) {
  return e === "primary" ? "primary" : e === "secondary" ? 0 : typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : void 0;
}
function Ta(e, t) {
  if (!e || !t.entity) return;
  const i = Pe(t), n = () => {
    const s = e.states[t.entity], l = s?.attributes, h = Tu[t.entity.split(".")[0]];
    if (t.attribute) {
      const c = pt(l?.[t.attribute]);
      if (c !== void 0)
        return Kt(c) + (t.attribute === h?.attribute ? h.unit : "");
    }
    if (h) {
      const c = pt(l?.[h.attribute]);
      if (c !== void 0) return Kt(c) + h.unit;
    }
    const p = pt(s?.state);
    return p === void 0 ? void 0 : Ko(p, l?.unit_of_measurement);
  }, o = (s) => {
    const l = i[s];
    if (!l) return;
    const h = l.entity || (l.attribute ? t.entity : void 0);
    if (!h) return;
    const p = e.states[h], c = p?.attributes;
    if (l.attribute) {
      const u = pt(c?.[l.attribute]);
      return u === void 0 ? void 0 : Kt(u);
    }
    const d = pt(p?.state);
    return d === void 0 ? void 0 : Ko(d, c?.unit_of_measurement);
  }, r = Ma(t.badgeEntity);
  if (r === "primary") {
    const s = n();
    return s === void 0 ? void 0 : { text: s, source: "primary" };
  }
  if (typeof r == "number") {
    const s = o(r);
    return s === void 0 ? void 0 : { text: s, source: r };
  }
  const a = n();
  if (a !== void 0) return { text: a, source: "primary" };
  for (let s = 0; s < i.length; s++) {
    const l = o(s);
    if (l !== void 0) return { text: l, source: s };
  }
}
const Pu = { ".": 0.28, "-": 0.38, "°": 0.45, "%": 1, k: 0.58 }, Fu = 0.7, Ou = 0.85;
function Vo(e) {
  let t = 0;
  for (const i of e)
    t += Pu[i] ?? (i >= "0" && i <= "9" ? Fu : Ou);
  return t;
}
function Ca(e, t) {
  const i = Math.round(I(e, je)), n = Math.max(0, i - 6), o = Vo(t) > 0 ? n / Vo(t) : i;
  let r = Math.round(Math.min(i * 0.46, o));
  return r % 2 !== i % 2 && (r -= 1), Math.max(6, r);
}
function Xo(e) {
  const t = e.split(".")[0];
  switch (t) {
    case "light":
    case "switch":
    case "sensor":
    case "binary_sensor":
    case "climate":
    case "cover":
    case "media_player":
    case "fan":
    case "camera":
    case "lock":
    case "humidifier":
    case "vacuum":
      return t;
    default:
      return "generic";
  }
}
const Lu = 0.62;
function de(e) {
  if (!J(e)) return 0;
  const t = Math.abs(e.length) * Lu, i = e.width;
  return typeof i != "number" || !Number.isFinite(i) || i <= 0 ? Math.max(1, t) : Math.max(1, i);
}
function X(e) {
  return J(e) ? "awning" : e.motion ?? "swing";
}
function Li(e) {
  if (X(e) !== "swing" || Se(e) !== "single") return 1;
  const t = e.sashSpan;
  return typeof t != "number" || !Number.isFinite(t) ? 1 : Math.max(oa, Math.min(1, t));
}
function Zn(e) {
  const t = e.type === "door" && X(e) === "swing";
  return e.invert ? !t : t;
}
function zu(e) {
  return { sx: e.flipH ? -1 : 1, sy: e.flipV ? -1 : 1 };
}
function Lt(e) {
  return X(e) === "slide" ? e.sliderStyle ?? "single" : "single";
}
function Ia(e) {
  return e === "biparting" || e === "biparting-bypass" || e === "converging";
}
function _t(e) {
  return X(e) === "swing" ? Se(e) === "double" : Ia(Lt(e));
}
function Pa(e) {
  return { ...e, entity: e.secondaryEntity };
}
function fn(e) {
  return e === "window" ? "double" : "single";
}
function Se(e) {
  return X(e) === "swing" ? e.sash ?? fn(e.type) : fn(e.type);
}
function We(e) {
  return e.shutterStyle === "roll" || e.shutterStyle === "swing" ? e.shutterStyle : e.shutterEntity?.split(".")[0] === "binary_sensor" ? "swing" : "roll";
}
function xe(e, t = !1) {
  if (!e || at(e.state)) return 0;
  const i = e.attributes?.current_position;
  if (typeof i == "number" && Number.isFinite(i)) {
    const o = Math.max(0, Math.min(1, i / 100));
    return t ? 1 - o : o;
  }
  const n = e.state === "open" || e.state === "opening" || e.state === "closing" || e.state === "on";
  return (t ? !n : n) ? 1 : 0;
}
function Vt(e, t = !1) {
  return !e || at(e.state) ? !1 : xe(e, t) > 0 || e.state === "opening" || e.state === "closing";
}
const Du = /* @__PURE__ */ new Set(["window", "blind", "shade", "shutter", "curtain", "awning"]), Ru = /* @__PURE__ */ new Set(["blind", "shade", "curtain"]), Nu = /* @__PURE__ */ new Set(["garage", "garage_door", "shutter"]);
function Hu(e) {
  const t = e ?? "";
  return {
    type: Du.has(t) ? "window" : "door",
    motion: Nu.has(t) ? "roll" : Ru.has(t) ? "slide" : void 0
  };
}
function ju(e, t) {
  return t ? J(e) ? {} : Hu(t) : {};
}
const Wu = 3;
function Bu(e, t) {
  return e.split(".")[0] === "cover" && t & Wu ? "cover-toggle" : "more-info";
}
function Qn(e, t, i) {
  const n = e.entity || void 0, o = e.shutterEntity || void 0, r = !!(n && o && e.tapTarget === "shutter"), a = r ? o : n ?? o, s = n && o ? r ? n : o : void 0, l = t === "tap" ? e.tap_action : t === "hold" ? e.hold_action : e.double_tap_action;
  if (l) return { entity: l.entity ?? a, config: l };
  if (t === "tap")
    return a ? {
      entity: a,
      config: {
        action: (
          // Pointing the tap at the shutter opens its dialog; it does not
          // drive the motor. Choosing *which* entity answers is not the same
          // as choosing to move hardware on a tap, and that second decision
          // stays where it is explicit — `tap_action: toggle` (issue #47).
          !r && Bu(a, i(a)) === "cover-toggle" ? "toggle" : "more-info"
        )
      }
    } : void 0;
  if (t === "hold" && s) return { entity: s, config: { action: "more-info" } };
}
function Xt(e, t) {
  const i = t === "tap" ? e.tap_action : t === "hold" ? e.hold_action : e.double_tap_action;
  if (i)
    return { entity: i.entity ?? e.entity, config: i };
}
function xt(e, t) {
  const i = t === "tap" ? e.tap_action : t === "hold" ? e.hold_action : e.double_tap_action;
  if (i)
    return { entity: i.entity ?? e.entity, config: i };
}
function Uu(e, t, i = he) {
  const n = ["tap", "hold", "double_tap"].map((r) => xt(e, r)).map((r) => r ? Yr({ entity: r.entity }, r.config) : void 0).find((r) => r) ?? e.entity;
  return (n ? t?.states[n]?.attributes?.friendly_name : void 0) || n || Ot(i, e.type)?.name || qu(e.type) || "Furniture";
}
function qu(e) {
  return String(e ?? "").replace(/[-_]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase().trim();
}
function Gu(e) {
  return ["tap", "hold", "double_tap"].some(
    (t) => me(Xt(e, t)?.config)
  );
}
function Yo(e, t) {
  return ["tap", "hold", "double_tap"].some(
    (i) => me(Qn(e, i, t)?.config)
  );
}
function at(e) {
  return e === "unavailable" || e === "unknown";
}
function Ku(e, t) {
  if (!e.entity || t === void 0) return Zn(e);
  if (Vu(e.entity, t)) return !1;
  const i = Xu(e.entity, t);
  return e.invert ? !i : i;
}
function Vu(e, t) {
  return at(t) ? !0 : e.split(".")[0] === "lock" && t === "jammed";
}
function Xu(e, t) {
  return e.split(".")[0] === "lock" ? Ee(e, t) : t === "on" || t === "open" || t === "opening" || t === "closing";
}
function Yu(e) {
  return e === "opening" || e === "closing";
}
function nt(e, t) {
  if (!e.entity || !t) return Zn(e) ? 1 : 0;
  if (at(t.state)) return 0;
  const i = t.attributes?.current_position;
  if (typeof i == "number" && Number.isFinite(i)) {
    const n = Math.max(0, Math.min(1, i / 100));
    return e.invert ? 1 - n : n;
  }
  return Ku(e, t.state) ? 1 : 0;
}
function mn(e, t) {
  return !e.entity || !t || at(t.state) ? !1 : Yu(t.state) || nt(e, t) > 0;
}
function Zo(e, t, i) {
  const n = e / 2, o = 5, r = Math.max(3, Math.round(e / 12)), a = [];
  for (let s = 1; s < r; s++) {
    const l = -n + e * s / r;
    a.push(
      _`<line x1=${l} y1=${-o / 2} x2=${l} y2=${o / 2}
            stroke=${Ft} stroke-width="0.75" />`
    );
  }
  return _`<g class="fp-roll-curtain" style="transform:scaleY(${1 - i});">
      <rect x=${-n} y=${-o / 2} width=${e} height=${o}
            style="fill:${t};" />
      ${a}
    </g>`;
}
function Zu(e, t, i, n) {
  const o = e / 2, r = t / 2, a = t * (1 - Math.max(0, Math.min(1, n)));
  if (a <= 0.5) return _``;
  const s = Math.max(2, Math.round(a / 7)), l = [];
  for (let h = 1; h < s; h++) {
    const p = -r + a * h / s;
    l.push(
      _`<line x1=${-o} y1=${p} x2=${o} y2=${p}
            stroke=${Ft} stroke-width="0.75" />`
    );
  }
  return _`<g class="fp-skylight-blind">
      <rect x=${-o} y=${-r} width=${e} height=${a}
            style="fill:${i};" opacity="0.85" />
      ${l}
    </g>`;
}
function Qu(e, t, i, n, o = 1, r = i, a = n) {
  const s = e / 2, l = 3, h = o * (t / 2 + l / 2), p = (c, d) => {
    const u = [], g = Math.max(2, Math.round(d / 14));
    for (let b = 1; b < g; b++) {
      const v = c + d * b / g;
      u.push(
        _`<line x1=${v} y1=${-l / 2} x2=${v} y2=${l / 2}
              stroke=${Ft} stroke-width="0.75" />`
      );
    }
    return u;
  };
  return _`
      <g transform="translate(${-s} ${h})">
        <g class="fp-door-leaf" style="transform:rotate(${o * 90 * n}deg);">
          <rect x="0" y=${-l / 2} width=${s} height=${l} style="fill:${i};" />
          ${p(0, s)}
        </g>
      </g>
      <g transform="translate(${s} ${h})">
        <g class="fp-leaf-r" style="transform:rotate(${-o * 90 * a}deg);">
          <rect x=${-s} y=${-l / 2} width=${s} height=${l} style="fill:${r};" />
          ${p(-s, s)}
        </g>
      </g>`;
}
const Qo = 22, ui = 14, fi = 22, mi = 15;
function Jn(e, t = 0) {
  const i = e.flipV ? -1 : 1, n = e.angle * Math.PI / 180, o = { x: -Math.sin(n) * i, y: Math.cos(n) * i };
  return t === 90 ? { x: -o.y, y: o.x } : t === 180 ? { x: -o.x, y: -o.y } : t === 270 ? { x: o.y, y: -o.x } : o;
}
function eo(e, t = Oa(e)) {
  const i = (e.flipV ? -1 : 1) * t, n = e.angle * Math.PI / 180;
  return { x: e.x - Math.sin(n) * i, y: e.y + Math.cos(n) * i };
}
function Fa(e) {
  return {
    width: Math.abs(e.length),
    height: J(e) ? de(e) : V + 4
  };
}
function Oa(e) {
  return J(e) ? Qo + de(e) / 2 : Qo;
}
function Yt(e) {
  return !!e.entity;
}
function La(e) {
  return !!e.shutterEntity && (e.showShutterIcon ?? Yt(e));
}
const Ju = { on: "mdi:window-shutter-open", off: "mdi:window-shutter" }, Jo = {
  door: { on: "mdi:door-open", off: "mdi:door-closed" },
  window: { on: "mdi:window-open", off: "mdi:window-closed" },
  skylight: { on: "mdi:window-open-variant", off: "mdi:window-closed-variant" }
};
function za(e, t, i, n, o, r) {
  const a = yt(t);
  if (a) return a;
  const s = yt(r);
  if (s) return s;
  const l = yt(i?.attributes?.icon);
  return l || (ka(e, i?.attributes?.device_class, n) ?? (n ? o.on : o.off));
}
function Da(e, t, i, n) {
  return za(
    e.shutterEntity ?? "",
    e.shutterIcon,
    t,
    i,
    Ju,
    n
  );
}
function Ra(e) {
  return !!e.entity && (e.showIcon ?? !1);
}
function Na(e, t, i, n) {
  return za(
    e.entity ?? "",
    e.icon,
    t,
    i,
    Jo[e.type] ?? Jo.door,
    n
  );
}
function Ha(e) {
  return eo(e, -Oa(e));
}
function ja(e, t = 0) {
  const i = Jn(e, t);
  return { x: -i.x, y: -i.y };
}
function Wa(e, t) {
  const { color: i, open: n = !0, active: o = !1, accent: r = U } = t, a = e.length / 2, s = V + 4, l = L(t.inactive) ?? i, h = Math.max(0, Math.min(1, t.amount ?? (n ? 1 : 0))), p = t.second ? Math.max(0, Math.min(1, t.second.amount)) : h, c = (m, $) => ae(m ? r : $ === 0 ? l : i, U), d = c(o, h), u = t.second ? c(!!t.second.active, p) : d;
  let g;
  if (J(e)) {
    const m = a, $ = de(e) / 2, E = Math.max(1.5, Math.min(4, Math.min(m, $) * 0.18)), k = Math.max(0.5, m - E), S = Math.max(0.5, $ - E), A = S * 2 * (1 - h * 0.82);
    g = _`
        <!-- the kerb -->
        <rect x=${-m} y=${-$} width=${m * 2} height=${$ * 2}
              fill="none" stroke=${i} stroke-width="2" />
        <!-- "above you": the plan convention for anything overhead -->
        <line x1=${-k} y1=${-S} x2=${k} y2=${S}
              stroke=${i} stroke-width="1" stroke-dasharray="4 4" opacity="0.55" />
        <line x1=${-k} y1=${S} x2=${k} y2=${-S}
              stroke=${i} stroke-width="1" stroke-dasharray="4 4" opacity="0.55" />
        <!-- the sash, foreshortening toward its hinge as it swings out -->
        <rect x=${-k} y=${-S} width=${k * 2} height=${A}
              fill="none" stroke=${d} stroke-width="1.5"
              stroke-dasharray=${h > 0.02 ? "5 4" : f} />
        <!-- the head it is hung from -->
        <line x1=${-k} y1=${-$} x2=${k} y2=${-$}
              stroke=${d} stroke-width="2.5" />`;
  } else if (X(e) === "swing") {
    const m = Se(e) === "double", $ = Li(e), E = m ? a : e.length * $, k = Math.PI / 2 * E, S = (T, P, D) => _`<path class="fp-door-arc" d=${T}
              fill="none" stroke-width="1.5" stroke-dasharray=${k}
              style="stroke:${P};stroke-dashoffset:${k * (1 - D)};" />`, A = e.type === "window" ? _`
        <line x1=${-a} y1=${-s / 2} x2=${-a} y2=${s / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${a} y1=${-s / 2} x2=${a} y2=${s / 2}
              stroke=${i} stroke-width="2" />` : f;
    g = _`
        ${A}
        ${m ? (
      // Two leaves hinged at opposite jambs, meeting in the middle when
      // shut and each tracing its own quarter circle outward.
      _`${S(`M 0 0 A ${a} ${a} 0 0 0 ${-a} ${-a}`, d, h)}${S(
        `M 0 0 A ${a} ${a} 0 0 1 ${a} ${-a}`,
        u,
        p
      )}`
    ) : (
      // Hinged at the −x jamb, so the tip starts `leafW` along the wall
      // and ends `leafW` out from it. At full span that is exactly the
      // arc this drew before `sashSpan` existed.
      S(`M ${-a + E} 0 A ${E} ${E} 0 0 0 ${-a} ${-E}`, d, h)
    )}
        ${// The pane the sash does not cover: fixed glass, drawn in the base
    // colour because it never opens and so is never the active part.
    // Nothing at full span, which is every opening that predates this.
    $ < 1 ? _`<line x1=${-a + E} y1="0" x2=${a} y2="0"
              stroke=${i} stroke-width=${e.type === "window" ? 1.5 : 2.5} />` : f}
        <!-- leaf hinged at the left jamb (flipH mirrors it to the right one) -->
        <g transform="translate(${-a} 0)">
          <g class="fp-door-leaf" style="transform:rotate(${-90 * h}deg);">
            <rect x="0" y="-1.25" width=${E} height="2.5" style="fill:${d};" />
          </g>
        </g>
        ${m ? (
      // The other leaf, on its own sensor when it has one (issue #159):
      // a casement pair with a contact per sash draws left-open /
      // right-shut, exactly as a two-sensor slider parts unevenly.
      _`<g transform="translate(${a} 0)">
          <g class="fp-leaf-r" style="transform:rotate(${90 * p}deg);">
            <rect x=${-a} y="-1.25" width=${a} height="2.5" style="fill:${u};" />
          </g>
        </g>`
    ) : f}
      `;
  } else if (X(e) === "fixed") {
    const m = e.type === "window" ? 1.5 : 2.5;
    g = _`
        ${e.type === "window" ? _`
        <line x1=${-a} y1=${-s / 2} x2=${-a} y2=${s / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${a} y1=${-s / 2} x2=${a} y2=${s / 2}
              stroke=${i} stroke-width="2" />` : f}
        <line x1=${-a} y1="0" x2=${a} y2="0"
              stroke=${i} stroke-width=${m} />`;
  } else if (X(e) === "awning") {
    const m = Math.min(12, e.length * 0.16), $ = 5, E = a - m / 2 - 1, k = Math.max(0, E - m / 2), S = Math.min(a * 0.62, 34) * h, A = Math.min(S * 0.16, k * 0.4), T = h > 0.02;
    g = _`
        <!-- jambs, as any window -->
        <line x1=${-a} y1=${-s / 2} x2=${-a} y2=${s / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${a} y1=${-s / 2} x2=${a} y2=${s / 2}
              stroke=${i} stroke-width="2" />
        <!-- The glass line: solid while the sash is shut and sitting in it,
             broken once the sash has swung out and left the gap behind. -->
        <line x1=${-a} y1="0" x2=${a} y2="0"
              stroke=${d} stroke-width="1.5"
              stroke-dasharray=${T ? "6 4" : f} />
        ${T ? (
      // A polyline, not a polygon, and that is the whole point of the
      // broken line above it. A closed shape strokes its own base back
      // along y=0 — straight over the dashes, solid — and the only
      // glass left uncovered would be the sliver outside `bx`, which
      // is exactly where the knuckles sit. The line would have been
      // dashed in the markup and solid on the screen at every size.
      _`<polyline
                    points="${-k},0 ${-k + A},${-S} ${k - A},${-S} ${k},0"
                    fill="none" stroke=${d} stroke-width="1.5"
                    stroke-linejoin="round" />`
    ) : f}
        <!-- Hinge knuckles, drawn whether or not it is open: they are what says
             this window is top-hung rather than fixed when it happens to be
             shut, and the request asked for them by name. -->
        ${[-E, E].map(
      (P) => _`
          <rect x=${P - m / 2} y=${-$ / 2} width=${m} height=${$}
                fill="none" stroke=${d} stroke-width="1.25" />
          <line x1=${P} y1=${-$ / 2} x2=${P} y2=${$ / 2}
                stroke=${d} stroke-width="1.25" />`
    )}`;
  } else if (X(e) === "roll")
    g = _`
        <!-- jambs -->
        <line x1=${-a} y1=${-s / 2} x2=${-a} y2=${s / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${a} y1=${-s / 2} x2=${a} y2=${s / 2}
              stroke=${i} stroke-width="2" />
        <!-- Track: stays when the curtain is up so the gap still reads as an
             opening — and wears the accent while the cover is open or moving
             (issue #154). Wide open the curtain has scaled away to nothing, so
             this line is the *only* mark left: drawn in the base colour it read
             exactly like a shut garage, which is the one thing it must not do.
             Full strength when accented, since a 0.6 tint of the accent reads
             as neither colour. -->
        <line x1=${-a} y1="0" x2=${a} y2="0"
              stroke=${d} stroke-width="0.75" opacity=${o ? 1 : 0.6} />
        ${Zo(e.length, d, h)}`;
  else {
    const m = e.type === "window" ? 1.5 : 2.5, $ = _`
        <line x1=${-a} y1=${-s / 2} x2=${-a} y2=${s / 2}
              stroke=${i} stroke-width="2" />
        <line x1=${a} y1=${-s / 2} x2=${a} y2=${s / 2}
              stroke=${i} stroke-width="2" />`, E = Lt(e);
    if (E === "bypass") {
      const S = -a * h;
      g = _`
        ${$}
        <!-- tracks -->
        <line x1=${-a} y1=${-1.75} x2=${a} y2=${-1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <line x1=${-a} y1=${1.75} x2=${a} y2=${1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <!-- fixed panel: left half, front track -->
        <rect x=${-a} y=${1.75 - m / 2} width=${a} height=${m} style="fill:${d};" />
        <!-- moving panel: right half, back track -->
        <g class="fp-slide-panel" style="transform:translateX(${S}px);">
          <rect x="0" y=${-1.75 - m / 2} width=${a} height=${m} style="fill:${d};" />
        </g>`;
    } else if (E === "biparting")
      g = _`
        ${$}
        <!-- track -->
        <line x1=${-a} y1="0" x2=${a} y2="0"
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <g class="fp-slide-panel" style="transform:translateX(${-a * h}px);">
          <rect x=${-a} y=${-m / 2} width=${a} height=${m} style="fill:${d};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${a * p}px);">
          <rect x="0" y=${-m / 2} width=${a} height=${m} style="fill:${u};" />
        </g>`;
    else if (E === "biparting-bypass") {
      const S = a / 2;
      g = _`
        ${$}
        <!-- tracks -->
        <line x1=${-a} y1=${-1.75} x2=${a} y2=${-1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <line x1=${-a} y1=${1.75} x2=${a} y2=${1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <!-- fixed panels: outer quarters, front track. Never accented, even
             wide open — the accent marks what has moved, and lighting these
             would accent exactly the half that is still glazed shut. -->
        <rect x=${-a} y=${1.75 - m / 2} width=${S} height=${m} fill=${i} />
        <rect x=${a - S} y=${1.75 - m / 2} width=${S} height=${m} fill=${i} />
        <!-- moving panels: inner quarters, back track -->
        <g class="fp-slide-panel" style="transform:translateX(${-S * h}px);">
          <rect x=${-S} y=${-1.75 - m / 2} width=${S} height=${m} style="fill:${d};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${S * p}px);">
          <rect x="0" y=${-1.75 - m / 2} width=${S} height=${m} style="fill:${u};" />
        </g>`;
    } else if (E === "converging") {
      const S = a / 2;
      g = _`
        ${$}
        <!-- tracks -->
        <line x1=${-a} y1=${-1.75} x2=${a} y2=${-1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <line x1=${-a} y1=${1.75} x2=${a} y2=${1.75}
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <!-- both panels move, so both take the accent on their own state:
             front track travels right, back track left, and they meet. -->
        <g class="fp-slide-panel" style="transform:translateX(${S * h}px);">
          <rect x=${-a} y=${1.75 - m / 2} width=${a} height=${m} style="fill:${d};" />
        </g>
        <g class="fp-slide-panel" style="transform:translateX(${-S * p}px);">
          <rect x="0" y=${-1.75 - m / 2} width=${a} height=${m} style="fill:${u};" />
        </g>`;
    } else {
      const k = e.length * h;
      g = _`
        ${$}
        <!-- track -->
        <line x1=${-a} y1="0" x2=${a} y2="0"
              stroke=${i} stroke-width="0.75" opacity="0.6" />
        <g class="fp-slide-panel" style="transform:translateX(${k}px);">
          <rect x=${-a} y=${-m / 2} width=${e.length} height=${m} style="fill:${d};" />
        </g>`;
    }
  }
  if (t.shutter) {
    const m = Math.max(0, Math.min(1, t.shutter.amount)), $ = (T, P) => ae(T ? t.shutter.accent ?? r : P === 0 ? l : i, U), E = $(t.shutter.active, m), k = t.shutter.second, S = k ? Math.max(0, Math.min(1, k.amount)) : m, A = k ? $(k.active, S) : E;
    g = _`${g}${// A roof light's blind is neither of the wall shapes: it is neither a
    // band on the wall line nor a pair of panels beside the jambs, but a
    // sheet drawn across the aperture you are looking down into. It also
    // ignores `shutterStyle` — there is only the one way a velux blind
    // travels, and offering a hinged one would be offering a shutter that
    // folds back against a roof.
    J(e) ? Zu(e.length, de(e), E, m) : t.shutter.style === "swing" ? Qu(
      e.length,
      s,
      E,
      m,
      t.shutter.flip ? -1 : 1,
      A,
      S
    ) : Zo(e.length, E, m)}`;
  }
  const { sx: b, sy: v } = zu(e);
  return _`<g class=${`fp-opening fp-opening-${re(e.type) ?? "unknown"}`}
                data-id=${re(e.id) ?? f}
                data-entity=${Ce(e.entity) ?? f}
                transform="translate(${e.x} ${e.y}) rotate(${e.angle})">
      <g transform="scale(${b} ${v})">${g}</g>
    </g>`;
}
function $t(e) {
  if (typeof e != "number" || !Number.isFinite(e)) return 0;
  const t = (e % 360 + 360) % 360;
  return t === 90 || t === 180 || t === 270 ? t : 0;
}
function ef(e, t) {
  const i = $t(e.rotation);
  if (t === void 0) return i;
  const n = t ? e.rotationPortrait : e.rotationLandscape;
  return n == null ? i : $t(n);
}
function tf(e, t) {
  return typeof e.addEventListener == "function" ? (e.addEventListener("change", t), () => e.removeEventListener?.("change", t)) : typeof e.addListener == "function" ? (e.addListener(t), () => e.removeListener?.(t)) : () => {
  };
}
function mt(e) {
  const t = e.floorSwitcher;
  if (!t || typeof t != "object") return;
  const i = er(t.x), n = er(t.y);
  return i === void 0 || n === void 0 ? void 0 : { x: i, y: n };
}
function er(e) {
  if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
  if (typeof e != "string" || e.trim() === "") return;
  const t = Number(e);
  return Number.isFinite(t) ? t : void 0;
}
function gn(e, t, i) {
  return i === 90 || i === 270 ? { w: t, h: e } : { w: e, h: t };
}
function nf(e, t) {
  return ((I(e, 0) + t) % 360 + 360) % 360;
}
function Zt(e, t, i, n, o) {
  switch (o) {
    case 90:
      return { x: n - t, y: e };
    case 180:
      return { x: i - e, y: n - t };
    case 270:
      return { x: t, y: i - e };
    default:
      return { x: e, y: t };
  }
}
function of(e, t, i) {
  switch (i) {
    case 90:
      return `translate(${t} 0) rotate(90)`;
    case 180:
      return `translate(${e} ${t}) rotate(180)`;
    case 270:
      return `translate(0 ${e}) rotate(-90)`;
    default:
      return "";
  }
}
function rf(e, t = Ln, i = ai) {
  const n = Math.min(t, i), o = Math.max(t, i);
  if (!(typeof e == "number" || typeof e == "string" && e.trim() !== "")) return o;
  const a = typeof e == "number" ? e : Number(e);
  if (!Number.isFinite(a)) return o;
  const s = tn - bt, l = Math.max(0, Math.min(1, (a - bt) / s)), h = l * l * (3 - 2 * l);
  return n + (o - n) * h;
}
const yn = 135, tr = 12;
function zi(e) {
  if (!(typeof e == "number" || typeof e == "string" && e.trim() !== "")) return;
  const i = typeof e == "number" ? e : Number(e);
  return Number.isFinite(i) ? i : void 0;
}
function af(e) {
  const t = zi(e);
  if (t === void 0) return 1;
  if (t <= 0) return 0;
  if (t >= tr) return 1;
  const i = t / tr;
  return i * i * (3 - 2 * i);
}
function sf(e, t = 0) {
  const i = (e + t) * Math.PI / 180;
  return { x: Math.sin(i), y: -Math.cos(i) };
}
function lf(e, t) {
  return Di(e) ? e.sunBearing : zi(t) ?? yn;
}
function Di(e) {
  return typeof e.sunBearing == "number" && Number.isFinite(e.sunBearing);
}
function cf(e, t) {
  return Di(e) ? 1 : af(t);
}
const gi = 0.34, hf = 30, df = 0.95, pf = 0.16, ir = 0.37, Qt = "var(--fp-skin-sunlight, #ffd9a0)", bn = "var(--fp-skin-sunshade, #000)";
function uf(e) {
  return Math.max(0.02, Math.min(1.5, I(e, gi)));
}
const ff = 0.55, nr = 2.1, mf = 1.5;
function gf(e) {
  return Math.max(0, Math.min(4, I(e, ff)));
}
function to(e) {
  const t = e.ceilingHeight;
  return typeof t != "number" || !Number.isFinite(t) ? 1 : Math.max(0.1, Math.min(8, t));
}
function Ba(e, t = 1) {
  const i = Math.max(0, Math.min(1, t));
  return { along: Math.abs(e.length) / 2, across: de(e) * i / 2 };
}
function Ua(e, t, i, n = 1) {
  const o = i * to(e), r = Math.max(0, Math.min(1, n)), a = de(e) / 2 * (1 - r) * (e.flipV ? -1 : 1), s = e.angle * Math.PI / 180;
  return {
    x: e.x + t.x * o - Math.sin(s) * a,
    y: e.y + t.y * o + Math.cos(s) * a
  };
}
function or(e, t, i, n = 1, o = 1) {
  const r = Ua(e, t, i, n), { along: a, across: s } = Ba(e, n), l = e.angle * Math.PI / 180, h = Math.cos(l) * a * o, p = Math.sin(l) * a * o, c = -Math.sin(l) * s * o, d = Math.cos(l) * s * o;
  return [
    { x: r.x - h - c, y: r.y - p - d },
    { x: r.x + h - c, y: r.y + p - d },
    { x: r.x + h + c, y: r.y + p + d },
    { x: r.x - h + c, y: r.y - p + d }
  ];
}
function yf(e, t, i, n) {
  let o = n;
  for (const r of i) {
    const a = qn(e.x, e.y, t.x, t.y, r);
    a !== void 0 && a > 1 && a < o && (o = a);
  }
  return o;
}
function bf(e) {
  const t = zi(e);
  if (t === void 0) return 1;
  const i = (o) => o * Math.PI / 180, n = Math.tan(i(hf)) / Math.tan(i(Math.max(1, Math.min(89, t))));
  return Math.max(0.45, Math.min(1.9, n));
}
function vf(e, t, i) {
  return e.sunlight === !1 || i !== void 0 && i <= 0 ? 0 : J(e) ? (yi(e) ? 1 : Math.max(0, Math.min(1, t))) * (i === void 0 ? 1 : Math.max(0, Math.min(1, i))) : yi(e) ? 1 : Math.max(0, Math.min(1, t));
}
function Ri(e) {
  return e.glazed ?? e.type !== "door";
}
function yi(e) {
  return Ri(e) && X(e) !== "roll";
}
function qa(e) {
  const t = e.angle * Math.PI / 180, i = Math.cos(t) * e.length / 2, n = Math.sin(t) * e.length / 2;
  return [
    { x: e.x - i, y: e.y - n },
    { x: e.x + i, y: e.y + n }
  ];
}
function zt(e, t, i) {
  let n = !1;
  for (let o = 0, r = e.length - 1; o < e.length; r = o++) {
    const a = e[o], s = e[r];
    a.y > i != s.y > i && t < (s.x - a.x) * (i - a.y) / (s.y - a.y) + a.x && (n = !n);
  }
  return n;
}
function wf(e, t, i) {
  for (const n of t) {
    const o = qn(e.x, e.y, -i.x, -i.y, n);
    if (o === void 0) continue;
    if (!(o <= Ie && Un(e.x, e.y, n) <= Ie)) return !1;
  }
  return !0;
}
function _f(e, t) {
  return sf(lf(e, t) + 180, e.north ?? 0);
}
function Ga(e, t, i, n) {
  return [
    e,
    t,
    { x: t.x + i.x * n, y: t.y + i.y * n },
    { x: e.x + i.x * n, y: e.y + i.y * n }
  ];
}
function xf(e, t, i, n = 1) {
  const [o, r] = qa(e), a = Math.max(0, Math.min(1, n)), s = (o.x + r.x) / 2, l = (o.y + r.y) / 2, h = (p) => ({ x: s + (p.x - s) * a, y: l + (p.y - l) * a });
  return Ga(h(o), h(r), t, i);
}
function rr(e, t, i) {
  return Ga({ x: e.x1, y: e.y1 }, { x: e.x2, y: e.y2 }, t, i);
}
function ut(e) {
  return e.map((t) => `${t.x},${t.y}`).join(" ");
}
function $f(e, t, i, n, o, r) {
  const { dir: a, openAmount: s, shutterOpen: l, strength: h = 1 } = r, p = {
    light: r.light ?? Qt,
    // `?? ` would swallow the explicit null that means "no shade at all".
    shade: r.shade === void 0 ? bn : r.shade
  };
  if (h <= 0) return f;
  const c = Math.min(i, n) * uf(r.reach), d = (x) => vf(x, s(x), l(x)), u = Kn(e, t, d), g = u.map((x) => rr(x, a, c)), b = c * gf(r.drop), v = (x) => {
    const z = b * to(x) + Math.hypot(x.length, de(x)) / 2, Z = Math.max(z, c), oe = [];
    for (const w of u) {
      const R = (w.x1 - x.x) * a.x + (w.y1 - x.y) * a.y, G = (w.x2 - x.x) * a.x + (w.y2 - x.y) * a.y;
      if (Math.max(R, G) <= 0) continue;
      let pe = w;
      if (Math.min(R, G) < 0) {
        const Oe = R / (R - G), Ve = w.x1 + (w.x2 - w.x1) * Oe, Le = w.y1 + (w.y2 - w.y1) * Oe;
        pe = R > 0 ? { ...w, x2: Ve, y2: Le } : { ...w, x1: Ve, y1: Le };
      }
      oe.push(ut(rr(pe, a, Z)));
    }
    return oe;
  }, m = t.map((x, z) => {
    const Z = {
      lightId: `${o}-b${z}`,
      shadeId: `${o}-s${z}`,
      fadeId: `${o}-f${z}`,
      shadowMaskId: `${o}-k${z}`,
      clipId: `${o}-c${z}`
    }, oe = d(x);
    if (!(oe > 0)) return;
    if (J(x)) {
      const Rt = Ua(x, a, b, oe), Xe = Ba(x, oe), Ye = (lt) => ({
        cx: Rt.x,
        cy: Rt.y,
        angle: x.angle,
        along: Math.max(1, Xe.along * lt),
        across: Math.max(1, Xe.across * lt)
      });
      return {
        ...Z,
        sky: !0,
        // Its own rectangle, moved — not a sweep. See skylightPatchPolygon.
        // Twice: the patch at its true size, and the halo spilling past it,
        // which is what keeps the edge from being a hard cut. See
        // SKYLIGHT_CORE for why one gradient cannot do both jobs.
        points: ut(or(x, a, b, oe)),
        haloPoints: ut(or(x, a, b, oe, nr)),
        // The core's own ellipse rides on the record itself, so the shared
        // gradient helper reads a skylight exactly as it reads a beam.
        ...Ye(mf),
        halo: Ye(nr),
        haloLightId: `${o}-h${z}`,
        haloShadeId: `${o}-hs${z}`,
        shadows: v(x)
      };
    }
    if (!wf(x, e, a)) return;
    const w = yf(x, a, u, c), [R, G] = qa(x), pe = G.x - R.x, Oe = G.y - R.y, Le = Math.abs(pe * a.y - Oe * a.x) * d(x) / 2;
    return {
      ...Z,
      sky: !1,
      // The outline runs past the falloff, so the ellipse is what bounds the
      // patch and never the polygon's flat far edge.
      points: ut(xf(x, a, w + x.length, oe)),
      cx: x.x,
      cy: x.y,
      along: w,
      across: Math.max(1, Le * df),
      angle: Math.atan2(a.y, a.x) * 180 / Math.PI,
      // A beam has no edge to soften — it fades along its own length — so it
      // has no second polygon, and no shadow set of its own either: the wall
      // openings all share the one global shadow mask.
      haloPoints: "",
      halo: void 0,
      haloLightId: "",
      haloShadeId: "",
      shadows: []
    };
  });
  if (!m.some((x) => x !== void 0)) return f;
  const $ = g.map(ut), E = V, k = `${o}-shade`, S = `${o}-shadow`, A = -E, T = -E, P = i + E * 2, D = n + E * 2, H = (x, z = f) => _`<rect x=${A} y=${T} width=${P} height=${D} fill=${x}>${z}</rect>`, j = (x, z) => _`<polygon points=${x} fill=${z} stroke=${z} stroke-width=${V} />`, ne = (x, z, Z, oe = "beam") => _`<radialGradient id=${z} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="1"
              gradientTransform=${`translate(${x.cx} ${x.cy}) rotate(${x.angle}) scale(${x.along} ${x.across})`}>
          ${oe === "core" ? (
    // Even, corner to corner: the ellipse circumscribes the
    // rectangle, so what ends this patch is the rectangle's own
    // outline. See SKYLIGHT_CORE.
    _`<stop offset="0" stop-color=${Z} stop-opacity="1" />
          <stop offset="0.66" stop-color=${Z} stop-opacity="0.92" />
          <stop offset="1" stop-color=${Z} stop-opacity="0.62" />`
  ) : oe === "halo" ? (
    // …and the spill past it, which is what keeps that outline
    // from reading as a cut. Never full strength: it is the
    // light around the patch, not the patch.
    _`<stop offset="0" stop-color=${Z} stop-opacity="0.5" />
          <stop offset="0.48" stop-color=${Z} stop-opacity="0.38" />
          <stop offset="1" stop-color=${Z} stop-opacity="0" />`
  ) : _`<stop offset="0" stop-color=${Z} stop-opacity="1" />
          <stop offset="0.45" stop-color=${Z} stop-opacity="0.55" />
          <stop offset="1" stop-color=${Z} stop-opacity="0" />`}
        </radialGradient>`, ee = p.shade === null ? f : _`
      <!-- Where the shade shows: everywhere, minus the patches of light, plus
           back wherever a wall stands in one. The order is the whole logic. -->
      <mask id=${k} maskUnits="userSpaceOnUse" x=${A} y=${T} width=${P} height=${D}>
        ${H("#fff")}
        ${m.map(
    (x) => x ? ne(x, x.shadeId, "#000", x.sky ? "core" : "beam") : f
  )}
        ${m.map(
    (x) => x && x.halo ? ne(x.halo, x.haloShadeId, "#000", "halo") : f
  )}
        ${m.map(
    (x) => x && !x.sky ? _`<polygon points=${x.points} fill=${`url(#${x.shadeId})`} />` : f
  )}
        ${$.map((x) => j(x, "#fff"))}
        <!-- Skylights come after the wall shade has been put back, each with
             only its OWN downwind walls restored over it. Every other wall in
             the plan is upwind of the roof light and so cannot shade it — see
             downwindShadows above.
             Each one is CLIPPED to its own halo, and that is what keeps them
             from interfering. Unclipped, a roof light's white restoration ran
             the whole width of the canvas and landed on whatever a *later*
             skylight had already punched — so a partition upwind of the lower
             of two roof lights shaded it anyway, by being downwind of the
             upper one, and swapping the two round in the openings array
             changed the drawing.
             Clipped, a skylight contributes nothing outside its own light, so
             the only arrangement left where array order decides anything is
             two patches genuinely overlapping — which is one roof light
             shining through another's floor, and has no right answer to get
             wrong. -->
        ${m.map(
    (x) => x && x.sky ? _`<g clip-path=${`url(#${x.clipId})`}>
                <polygon points=${x.haloPoints} fill=${`url(#${x.haloShadeId})`} />
                <polygon points=${x.points} fill=${`url(#${x.shadeId})`} />
                ${x.shadows.map((z) => j(z, "#fff"))}
              </g>` : f
  )}
      </mask>`;
  return _`
    <defs>
      ${ee}
      <!-- The wall shadows again, for the warm patches themselves. -->
      <mask id=${S} maskUnits="userSpaceOnUse" x=${A} y=${T} width=${P} height=${D}>
        ${H("#fff")}
        ${$.map((x) => j(x, "#000"))}
      </mask>
      <!-- The halo rectangle of each skylight, so its contribution to the
           shade mask above can be confined to its own light. Same reason the
           masks below are per-skylight: what one roof light does is nobody
           else's business. -->
      ${m.map(
    (x) => x && x.sky ? _`<clipPath id=${x.clipId} clipPathUnits="userSpaceOnUse">
              <polygon points=${x.haloPoints} />
            </clipPath>` : f
  )}
      <!-- …and one per skylight, carrying its downwind walls alone. A mask
           each rather than a shared one because "downwind" is measured from
           the roof light, so no two skylights have the same answer. -->
      ${m.map(
    (x) => x && x.sky ? _`<mask id=${x.shadowMaskId} maskUnits="userSpaceOnUse"
                      x=${A} y=${T} width=${P} height=${D}>
              ${H("#fff")}
              ${x.shadows.map((z) => j(z, "#000"))}
            </mask>` : f
  )}
    </defs>
    <g class="fp-sunlight">
      ${p.shade === null ? f : _`<rect x=${A} y=${T} width=${P} height=${D}
            style=${`fill:${ae(p.shade, bn)};`}
            opacity=${pf * h} mask=${`url(#${k})`} />`}
      ${m.map(
    (x) => x ? ne(x, x.lightId, ae(p.light, Qt), x.sky ? "core" : "beam") : f
  )}
      ${m.map(
    (x) => x && x.halo ? ne(x.halo, x.haloLightId, ae(p.light, Qt), "halo") : f
  )}
      <g mask=${`url(#${S})`} opacity=${ir * h}>
        ${m.map(
    (x) => x && !x.sky ? _`<polygon class="fp-sunbeam" points=${x.points}
                            fill=${`url(#${x.lightId})`} />` : f
  )}
      </g>
      <!-- Each roof light through a mask of its own, carrying the walls
           downwind of it and no others — the reason spelled out above. -->
      ${m.map(
    (x) => x && x.sky ? _`<g mask=${`url(#${x.shadowMaskId})`} opacity=${ir * h}>
              <polygon class="fp-sunbeam fp-skylight-halo" points=${x.haloPoints}
                       fill=${`url(#${x.haloLightId})`} />
              <polygon class="fp-sunbeam fp-skylight-patch" points=${x.points}
                       fill=${`url(#${x.lightId})`} />
            </g>` : f
  )}
    </g>`;
}
function Ka(e) {
  switch (e) {
    case "contain":
      return "xMidYMid meet";
    case "cover":
      return "xMidYMid slice";
    default:
      return "none";
  }
}
function Va(e, t, i, n) {
  const o = V + 4, r = V;
  return _`
    <defs>
      <mask id=${n} maskUnits="userSpaceOnUse"
            x=${-r} y=${-r} width=${t + r * 2} height=${i + r * 2}>
        <rect x=${-r} y=${-r} width=${t + r * 2} height=${i + r * 2}
              fill="white" />
        ${e.map((a) => {
    if (J(a)) return f;
    const s = a.length / 2;
    return _`<rect x=${a.x - s} y=${a.y - o / 2}
                           width=${a.length} height=${o} fill="black"
                           transform="rotate(${a.angle} ${a.x} ${a.y})" />`;
  })}
      </mask>
    </defs>`;
}
function io(e) {
  if (!e.length) return { x: 0, y: 0 };
  const t = e.reduce((i, n) => ({ x: i.x + n.x, y: i.y + n.y }), { x: 0, y: 0 });
  return { x: t.x / e.length, y: t.y / e.length };
}
function kf(e) {
  if (e.length < 3) return;
  let t = 0, i = 0, n = 0;
  for (let o = 0, r = e.length - 1; o < e.length; r = o++) {
    const a = e[o], s = e[r], l = s.x * a.y - a.x * s.y;
    t += l, i += (s.x + a.x) * l, n += (s.y + a.y) * l;
  }
  if (t !== 0)
    return { x: i / (3 * t), y: n / (3 * t) };
}
function Sf(e) {
  const t = kf(e);
  return t && zt(e, t.x, t.y) ? t : io(e);
}
const vn = { scale: 1, txPercent: 0, tyPercent: 0 };
function Ef(e, t, i, n, o = 0.15, r = on, a, s) {
  if (!e.length) return vn;
  const l = gn(t, i, n), h = s ?? { w: l.w, h: l.h, projection: "plan", wallHeight: 0 }, p = e.map((H) => {
    const j = Zt(H.x, H.y, t, i, n);
    return na(j.x, j.y, h);
  }), c = hn(h), d = p.map((H) => H.x), u = p.map((H) => H.y), g = Math.min(...d), b = Math.max(...d), v = Math.min(...u) - (h.projection === "iso" ? h.wallHeight : 0), m = Math.max(...u), $ = Math.max(b - g, m - v) * o, E = Math.max(b - g + $ * 2, 1), k = Math.max(m - v + $ * 2, 1), S = Math.max(1, Math.min(r, Math.min(c.w / E, c.h / k))), A = a ?? S;
  if (!Number.isFinite(A)) return vn;
  const T = (g + b) / 2 / c.w, P = (v + m) / 2 / c.h, D = (H) => Math.min(0, Math.max(100 * (1 - A), H));
  return {
    scale: A,
    txPercent: D(50 - A * T * 100),
    tyPercent: D(50 - A * P * 100)
  };
}
function Af(e) {
  const t = e.zoom;
  if (!(typeof t != "number" || !Number.isFinite(t)))
    return Math.max(1, Math.min(Wr, t));
}
function Mf(e, t) {
  if (!Number.isFinite(e) || e <= 1 || t === "auto") return 1;
  const i = typeof t == "number" && Number.isFinite(t) && t > 0 ? t : rn;
  return 1 / e * i;
}
const Yi = 12, Tf = 1.5, Cf = 0.4;
function Xa(e) {
  return _`
    <defs>
      <pattern id=${e} width=${Yi} height=${Yi}
               patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line class="fp-dead-space-line" x1="0" y1="0" x2="0" y2=${Yi}
              stroke=${Pn} stroke-width=${Tf} />
      </pattern>
    </defs>`;
}
function Ya(e, t) {
  const i = e.map((n) => `${n.x},${n.y}`).join(" ");
  return _`<polygon class="fp-dead-space" points=${i}
                      fill=${`url(#${t})`} fill-rule="nonzero"
                      fill-opacity=${Cf} stroke="none" />`;
}
function Za(e, t) {
  const i = e.points.map((r) => `${r.x},${r.y}`).join(" "), n = t !== void 0 && (e.highlight ?? "fill") !== "border", o = n ? e.activeOpacity ?? e.opacity : e.opacity;
  return _`<polygon class="fp-area" data-id=${re(e.id) ?? f}
                       data-entity=${Ce(e.entity) ?? f}
                       points=${i}
                       fill=${n ? t : ae(e.color, U)}
                       fill-opacity=${I(o, nn)}
                       stroke="none"
                       stroke-width="0" />`;
}
function Qa(e, t, i) {
  const n = t !== void 0 && (e.highlight ?? "fill") !== "fill", o = n ? t : e.borderColor ? ae(e.borderColor, "none") : void 0;
  if (o === void 0 || o === "none") return f;
  const r = e.points.map((s) => `${s.x},${s.y}`).join(" "), a = I(
    e.borderWidth,
    n ? V / 2 : yl
  );
  return !n || i === void 0 ? _`<polygon class="fp-area-border" data-id=${re(e.id) ?? f}
                        data-entity=${Ce(e.entity) ?? f}
                        points=${r} fill="none"
                        stroke=${o} stroke-width=${a} />` : _`
    <clipPath id=${i}><polygon points=${r} /></clipPath>
    <polygon class="fp-area-border" data-id=${re(e.id) ?? f}
             data-entity=${Ce(e.entity) ?? f}
             points=${r} fill="none" clip-path=${`url(#${i})`}
             stroke=${o} stroke-width=${a * 2} />`;
}
function wn(e, t, i = he) {
  const n = t ?? e.color ?? Ur, o = Kr(Ot(i, e.type) ?? Gr, e.w, e.h, n), r = e.hand === "left" ? " scale(-1 1)" : "";
  return _`<g class=${`fp-furniture fp-furniture-${re(e.type) ?? "unknown"}`}
                data-id=${re(e.id) ?? f}
                data-entity=${Ce(e.entity) ?? f}
                transform="translate(${e.x} ${e.y}) rotate(${e.angle ?? 0})${r}">${o}</g>`;
}
function bi(e, t, i, n, o, r = 3, a = "fixed") {
  function s(d) {
    return (d % 360 + 360) % 360;
  }
  function l(d, u, g) {
    return Math.max(Math.min(d, g), u);
  }
  const h = B(I(i, Ti), a), p = s(I(n, Ci)), c = l(I(o, Ii), 0, 360);
  return y`
    <div
      class="ripple ${e ? "active" : ""}"
      style="width:${h};height:${h};--fp-ripple-color:${ae(t, U)};--fp-ripple-direction:${p};--fp-ripple-width:${c}"
    >
      <span class="dot"></span>
      ${Array.from(
    { length: r },
    (d, u) => y`<span class="ring" style="animation-delay:${(u * 0.6).toFixed(2)}s;"></span>`
  )}
    </div>
  `;
}
function vi(e, t) {
  if (!t || !e) return null;
  const i = e[t]?.state;
  if (i == null || i === "unavailable" || i === "unknown") return null;
  const n = Number(i);
  return Number.isFinite(n) ? n : null;
}
function Ja(e, t) {
  const i = e.color ?? U, n = (e.dotSize ?? Dn) / 2, o = e.x + e.w / 2, r = e.y + e.h / 2, a = e.angle ?? 0, s = Fo(e.xSensor, t.xReading), l = Fo(e.ySensor, t.yReading), h = s != null, p = l != null, c = t.xPresent === !1 || t.yPresent === !1, d = e.w / 2, u = e.h / 2, g = t.editing ? _`<rect class="tracker-zone ${c ? "presence-gated" : ""}"
                x=${-d} y=${-u} width=${e.w} height=${e.h}
                fill=${i} fill-opacity="0.08" stroke=${i} stroke-width="1.5"
                stroke-dasharray="6 4" rx="4" pointer-events="none" />` : _``;
  let b;
  if (c)
    b = _``;
  else if (h && p) {
    const v = -d + s * e.w, m = -u + l * e.h, $ = `0,${-n} ${n * 0.9},${n * 0.7} ${-n * 0.9},${n * 0.7}`, E = Math.max(n * 3.5, Math.min(e.w, e.h) * 0.45);
    b = _`
      <g class="tracker-marker" style="transform:translate(${v}px, ${m}px);">
        <circle class="tracker-ring" cx="0" cy="0" r="0"
                fill="none" stroke=${i} stroke-width="1.5"
                style="--fp-tracker-ring-max:${E}px;" />
        <circle class="tracker-ring" cx="0" cy="0" r="0"
                fill="none" stroke=${i} stroke-width="1.5"
                style="--fp-tracker-ring-max:${E}px; animation-delay:0.7s;" />
        <polygon class="tracker-dot" points=${$} fill=${i} />
      </g>`;
  } else if (h || p)
    if (h) {
      const v = -d + s * e.w;
      b = _`
        <g class="tracker-line" style="transform:translate(${v}px, 0);">
          <line class="tracker-line-stroke" x1="0" y1=${-u} x2="0" y2=${u}
                stroke=${i} stroke-width="1.5" />
          <line class="tracker-band" x1="0" y1=${-u} x2="0" y2=${u}
                stroke=${i} stroke-width="3" stroke-linecap="round" />
          <line class="tracker-band" x1="0" y1=${-u} x2="0" y2=${u}
                stroke=${i} stroke-width="3" stroke-linecap="round"
                style="animation-delay:0.8s;" />
        </g>`;
    } else {
      const v = -u + l * e.h;
      b = _`
        <g class="tracker-line tracker-line-h" style="transform:translate(0, ${v}px);">
          <line class="tracker-line-stroke" x1=${-d} y1="0" x2=${d} y2="0"
                stroke=${i} stroke-width="1.5" />
          <line class="tracker-band" x1=${-d} y1="0" x2=${d} y2="0"
                stroke=${i} stroke-width="3" stroke-linecap="round" />
          <line class="tracker-band" x1=${-d} y1="0" x2=${d} y2="0"
                stroke=${i} stroke-width="3" stroke-linecap="round"
                style="animation-delay:0.8s;" />
        </g>`;
    }
  else t.editing ? b = _`<circle class="tracker-placeholder" cx="0" cy="0" r=${n}
                          fill=${i} fill-opacity="0.25" />` : b = _``;
  return _`
    <g class="tracker fp-tracker ${t.editing ? "editing" : ""}"
       data-id=${re(e.id) ?? f}
       transform="translate(${o} ${r}) rotate(${a})">
      ${g}${b}
    </g>`;
}
function ar(e, t, i, n) {
  let o = null, r = n;
  for (const a of i) {
    const s = a.x2 - a.x1, l = a.y2 - a.y1, h = s * s + l * l;
    if (h === 0) continue;
    let p = ((e - a.x1) * s + (t - a.y1) * l) / h;
    p = Math.max(0, Math.min(1, p));
    const c = a.x1 + p * s, d = a.y1 + p * l, u = Math.hypot(e - c, t - d);
    u < r && (r = u, o = { x: c, y: d, angle: Math.atan2(l, s) * 180 / Math.PI });
  }
  return o;
}
class Ni {
  static currentFloorEntityIds(t, i) {
    const n = t ? $e(t) : [], o = n.find((a) => a.id === i) ?? n[0];
    if (!o) return [];
    const r = /* @__PURE__ */ new Set();
    t?.ambientDaylight && r.add("sun.sun");
    for (const a of o.openings)
      a.entity && r.add(a.entity), a.secondaryEntity && r.add(a.secondaryEntity), a.shutterEntity && r.add(a.shutterEntity), a.shutterSecondaryEntity && r.add(a.shutterSecondaryEntity);
    for (const a of o.items) {
      a.entity && r.add(a.entity);
      for (const s of Pe(a))
        s.entity && r.add(s.entity);
    }
    for (const a of o.furniture)
      a.entity && r.add(a.entity);
    for (const a of o.areas)
      a.entity && r.add(a.entity);
    for (const a of o.trackers)
      for (const s of [a.xSensor, a.ySensor])
        s?.entity && r.add(s.entity), s?.presence?.entity && r.add(s.presence.entity);
    return Array.from(r).sort();
  }
  static scopeKey(t, i) {
    const n = Ni.currentFloorEntityIds(t, i);
    return n.length ? n.join("|") : "none";
  }
}
function If(e) {
  const t = Date.now() / 1e3, i = e?.historyReplay?.lookbackSeconds, n = typeof i == "number" && Number.isFinite(i) && i > 0 ? i : 3600;
  return { start: Math.max(0, t - n), end: t };
}
function sr(e, t) {
  const i = Math.max(0, Math.min(e, t)), n = Math.max(0, Math.max(e, t));
  return {
    start: i,
    end: Math.max(i, n)
  };
}
function Pf(e, t) {
  return Ni.currentFloorEntityIds(e, t);
}
function Ff(e, t) {
  return Ni.scopeKey(e, t);
}
function Of(e, t, i) {
  const o = Math.max(1, i - t) / 30, r = e?.historyReplay?.defaultSpeed;
  return Math.max(0.25, r ?? o);
}
function Lf(e) {
  const t = Date.parse(e);
  return Number.isNaN(t) ? Date.now() / 1e3 : t / 1e3;
}
function lr(e) {
  if (!Number.isFinite(e) || e <= 0) return "";
  const t = new Date(e * 1e3), i = t.getFullYear(), n = `${t.getMonth() + 1}`.padStart(2, "0"), o = `${t.getDate()}`.padStart(2, "0"), r = `${t.getHours()}`.padStart(2, "0"), a = `${t.getMinutes()}`.padStart(2, "0");
  return `${i}-${n}-${o}T${r}:${a}`;
}
function zf(e) {
  const t = Math.min(3, Math.max(-2, e));
  return Number((10 ** t).toPrecision(4));
}
function Df(e, t, i) {
  if (!e) return;
  if (i.has(t))
    return i.get(t);
  const n = $e(e);
  let o;
  for (const r of n) {
    for (const a of r.items ?? [])
      if (a.entity === t)
        return o = a.activeColor ?? a.rippleColor, i.set(t, o), o;
    for (const a of r.openings ?? [])
      if (a.entity === t)
        return o = a.activeColor, i.set(t, o), o;
    for (const a of r.furniture ?? [])
      if (a.entity === t)
        return o = a.activeColor, i.set(t, o), o;
  }
  i.set(t, void 0);
}
function Rf(e, t, i, n, o) {
  if (!t) return At(e);
  const r = L(Df(t, e.entityId, n)), a = Ee(e.entityId, e.newState);
  if (o && r) return a ? r : "#ffffff";
  const s = At(e);
  return a ? s : "#ffffff";
}
function Nf(e, t) {
  if (!Number.isFinite(e)) return "—";
  try {
    return t.format(new Date(e * 1e3));
  } catch {
    return new Date(e * 1e3).toISOString();
  }
}
var Hf = Object.defineProperty, jf = Object.getOwnPropertyDescriptor, Y = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? jf(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Hf(t, i, o), o;
};
function Wf(e) {
  const t = e.state.playbackController, i = e.state, o = i.enabled || i.startTime > 0 ? void 0 : e.getDefaultWindow(), r = o ? o.start : i.startTime, a = o ? o.end : i.endTime, s = e.formatReplayTime(
    o ? o.end : t.currentTime
  );
  return {
    events: i.historyEvents,
    startTime: o ? o.start : t.startTime,
    endTime: o ? o.end : t.endTime,
    currentTime: o ? o.end : t.currentTime,
    visible: i.historyVisible,
    enabled: i.enabled,
    ready: i.ready,
    playing: t.playing,
    timelineExpanded: i.timelineExpanded,
    logExpanded: i.logExpanded,
    speedExpanded: i.speedExpanded,
    error: i.error,
    rangeWarning: i.rangeWarning,
    panelId: i.panelId,
    replaySpeed: t.speed,
    currentTimeLabel: s,
    startInputValue: lr(r),
    endInputValue: lr(a),
    onToggleVisible: (l) => e.toggleHistoryVisible(l),
    onRangeChange: (l, h) => {
      e.handleRangeChange(l, { target: { value: h } });
    },
    onZoom: (l) => e.zoomWindow(l),
    onJump: (l) => e.jumpReplay(l),
    onStep: (l) => e.stepReplay(l),
    onPlayToggle: () => t.playing ? e.pauseReplay() : e.playReplay(),
    onToggleSpeedPanel: () => e.toggleSpeedPanel(),
    onSpeedSliderInput: (l) => e.setReplaySpeed(zf(l)),
    onSpeedChange: (l) => e.setReplaySpeed(l),
    onToggleTimeline: () => e.toggleTimeline(),
    onToggleLog: () => e.toggleLog(),
    onSeek: (l) => e.seekReplay(l)
  };
}
function Bf(e) {
  return y`
    <easy-floorplan-replay-panel
      .events=${e.events}
      .startTime=${e.startTime}
      .endTime=${e.endTime}
      .currentTime=${e.currentTime}
      .visible=${e.visible}
      .enabled=${e.enabled}
      .ready=${e.ready}
      .playing=${e.playing}
      .timelineExpanded=${e.timelineExpanded}
      .logExpanded=${e.logExpanded}
      .speedExpanded=${e.speedExpanded}
      .error=${e.error}
      .rangeWarning=${e.rangeWarning}
      .panelId=${e.panelId}
      .replaySpeed=${e.replaySpeed}
      .currentTimeLabel=${e.currentTimeLabel}
      .startInputValue=${e.startInputValue}
      .endInputValue=${e.endInputValue}
      @toggle-visible=${(t) => e.onToggleVisible(!!(t.detail?.visible ?? !0))}
      @range-change=${(t) => {
    const i = t.detail?.kind ?? "start";
    t.detail?.value && e.onRangeChange(i, t.detail.value);
  }}
      @zoom=${(t) => e.onZoom(t.detail?.direction ?? 1)}
      @jump=${(t) => e.onJump(t.detail?.delta ?? 0)}
      @step=${(t) => e.onStep(t.detail?.direction ?? 1)}
      @play-toggle=${() => e.onPlayToggle()}
      @toggle-speed-panel=${() => e.onToggleSpeedPanel()}
      @speed-slider-input=${(t) => {
    const i = Number(t.detail?.value ?? 0);
    Number.isFinite(i) && e.onSpeedSliderInput(i);
  }}
      @speed-change=${(t) => {
    const i = Number(t.detail?.value ?? 1);
    Number.isFinite(i) && e.onSpeedChange(i);
  }}
      @toggle-timeline=${() => e.onToggleTimeline()}
      @toggle-log=${() => e.onToggleLog()}
      @seek=${(t) => e.onSeek(t.detail?.timestamp ?? e.currentTime)}
    ></easy-floorplan-replay-panel>
  `;
}
let q = class extends Te {
  constructor() {
    super(...arguments), this.events = [], this.startTime = 0, this.endTime = 0, this.currentTime = 0, this.visible = !1, this.enabled = !1, this.ready = !1, this.playing = !1, this.timelineExpanded = !1, this.logExpanded = !1, this.speedExpanded = !1, this.panelId = "replay-panel", this.replaySpeed = 1, this.currentTimeLabel = "—", this.startInputValue = "", this.endInputValue = "";
  }
  updated(e) {
    super.updated(e), (e.has("events") || e.has("currentTime") || e.has("logExpanded")) && this._logRef && this._syncLogToCurrentEvent();
  }
  _dispatch(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  _getCurrentEvent() {
    if (!this.events.length) return;
    const e = this.currentTime;
    let t = 0, i = this.events.length - 1, n = -1;
    for (; t <= i; ) {
      const o = t + i >> 1;
      this.events[o].timestamp <= e ? (n = o, t = o + 1) : i = o - 1;
    }
    return n >= 0 ? this.events[n] : void 0;
  }
  _renderEventItem(e, t) {
    const i = e.timestamp <= this.currentTime, n = (typeof e.color == "string" ? e.color : void 0) ?? (typeof e.attributes?.color == "string" ? e.attributes.color : void 0) ?? At(e), o = L(n), r = o ? `background:${o}; box-shadow:0 0 0 2px ${o}22;` : f;
    return y`
      <li class="replay-event-item ${i ? "replay-event-passed" : ""} ${t ? "replay-event-current" : ""}" data-timestamp=${e.timestamp}>
        <span class="replay-event-dot" style=${r}></span>
        <span class="replay-event-time">${new Date(e.timestamp * 1e3).toLocaleTimeString([], { hour: "numeric", minute: "2-digit", second: "2-digit" })}</span>
        <span class="replay-event-icon"><ha-icon icon="mdi:swap-horizontal"></ha-icon></span>
        <span class="replay-event-entity">${e.entityId}</span>
        <span class="replay-event-change">${e.oldState} → ${e.newState}</span>
      </li>
    `;
  }
  _syncLogToCurrentEvent() {
    if (!this._logRef) return;
    const e = this._logRef.querySelector(".replay-event-item.replay-event-current");
    e && e.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  render() {
    if (!this.visible)
      return y`
        <div class="replay-panel-toggle">
          <button
            class="replay-show-toggle"
            aria-expanded="false"
            aria-label="Show replay history"
            aria-controls=${this.panelId}
            @click=${() => this._dispatch("toggle-visible", { visible: !0 })}
          >
            Replay
          </button>
        </div>
      `;
    const e = this._getCurrentEvent();
    return y`
      <div class="replay-panel" id=${this.panelId}>
        <!-- Closing the panel is how you get back to now, so the button says
             so. It used to say "hide", next to a separate Live button that did
             the returning; one control does both because they were never two
             things (see ReplayController.toggleHistoryVisible). -->
        <button
          class="replay-hide-toggle"
          aria-label="Close replay and return to live"
          aria-controls=${this.panelId}
          @click=${() => this._dispatch("toggle-visible", { visible: !1 })}
        >
          live
        </button>
        <div class="replay-header">
          <div class="replay-meta">
            <span class="replay-time">${this.currentTimeLabel}</span>
          </div>
          <div class="replay-status">
            ${this.error ? y`<span class="replay-error">${this.error}</span>` : f}
            ${this.rangeWarning ? y`<span class="replay-loading">${this.rangeWarning}</span>` : f}
            ${!this.ready && this.enabled && !this.error ? y`<span class="replay-loading">Loading history…</span>` : f}
          </div>
        </div>
        <div class="replay-range">
          <label class="replay-range-field">
            <span>Start</span>
            <input
              type="datetime-local"
              .value=${this.startInputValue}
              @change=${(t) => this._dispatch("range-change", { kind: "start", value: t.target.value })}
            />
          </label>
          <label class="replay-range-field">
            <span>End</span>
            <input
              type="datetime-local"
              .value=${this.endInputValue}
              @change=${(t) => this._dispatch("range-change", { kind: "end", value: t.target.value })}
            />
          </label>
          <div class="replay-range-tools">
            <button class="replay-icon-button" aria-label="Zoom out range" title="Zoom out range" @click=${() => this._dispatch("zoom", { direction: -1 })}>
              <ha-icon icon="mdi:magnify-minus-outline"></ha-icon>
            </button>
            <button class="replay-icon-button" aria-label="Zoom in range" title="Zoom in range" @click=${() => this._dispatch("zoom", { direction: 1 })}>
              <ha-icon icon="mdi:magnify-plus-outline"></ha-icon>
            </button>
          </div>
        </div>
        <div class="replay-toolbar">
          <div class="replay-transport" role="group" aria-label="Replay transport controls">
            <button class="replay-icon-button" aria-label="Jump back 30 seconds" title="Jump back 30 seconds" @click=${() => this._dispatch("jump", { delta: -30 })}>
              <ha-icon icon="mdi:rewind-30"></ha-icon>
            </button>
            <button class="replay-icon-button" aria-label="Step back one event" title="Step back" @click=${() => this._dispatch("step", { direction: -1 })}>
              <ha-icon icon="mdi:skip-previous"></ha-icon>
            </button>
            <button class="replay-run-button" title=${this.playing ? "Pause replay" : "Run replay"} @click=${() => this._dispatch("play-toggle")}>
              <ha-icon icon=${this.playing ? "mdi:pause" : "mdi:play"}></ha-icon>
              <span>${this.playing ? "Pause" : "Run"}</span>
            </button>
            <button class="replay-icon-button" aria-label="Step forward one event" title="Step forward" @click=${() => this._dispatch("step", { direction: 1 })}>
              <ha-icon icon="mdi:skip-next"></ha-icon>
            </button>
            <button class="replay-icon-button" aria-label="Jump forward 30 seconds" title="Jump forward 30 seconds" @click=${() => this._dispatch("jump", { delta: 30 })}>
              <ha-icon icon="mdi:fast-forward-30"></ha-icon>
            </button>
          </div>
          <div class="replay-toolbar-toggles">
            <button
              class="replay-speed-toggle"
              aria-expanded=${this.speedExpanded}
              @click=${() => this._dispatch("toggle-speed-panel")}
            >
              Speed ${this.replaySpeed.toFixed(2)}x
              <ha-icon icon=${this.speedExpanded ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
            </button>
          </div>
        </div>
        ${this.speedExpanded ? y`<div class="replay-speed-panel">
              <label class="replay-speed-field replay-speed-group">
                <span>Playback speed</span>
                <input
                  class="replay-speed-slider"
                  type="range"
                  min="-2"
                  max="3"
                  step="0.01"
                  .value=${String(Math.log10(this.replaySpeed || 1))}
                  @input=${(t) => this._dispatch("speed-slider-input", { value: Number(t.target.value) })}
                />
                <input
                  class="replay-speed"
                  type="number"
                  min="0.01"
                  max="1000"
                  step="0.01"
                  .value=${this.replaySpeed.toString()}
                  @change=${(t) => this._dispatch("speed-change", { value: Number(t.target.value || 1) })}
                />
              </label>
            </div>` : f}
        <div class="replay-lanes">
          <div class="replay-view-tools">
            <button class="replay-timeline-toggle" @click=${() => this._dispatch("toggle-timeline")}>
              ${this.timelineExpanded ? "Collapse lanes" : "Expand lanes"}
            </button>
          </div>
          <div class="replay-timeline-wrap">
            <easy-floorplan-history-timeline
              .events=${this.events}
              .startTime=${this.startTime}
              .endTime=${this.endTime}
              .currentTime=${this.currentTime}
              .expanded=${this.timelineExpanded}
              @seek=${(t) => this._dispatch("seek", { timestamp: t.detail.timestamp })}
            ></easy-floorplan-history-timeline>
          </div>
        </div>
        <div class=${`replay-event-log ${this.logExpanded ? "expanded" : "collapsed"}`} role="log" aria-label="Replay event log">
          <button class="replay-log-toggle" @click=${() => this._dispatch("toggle-log")}>
            ${this.logExpanded ? "Hide log" : "Show log"}
          </button>
          ${this.logExpanded ? y`<ul
                class="replay-event-list"
                ${(t) => {
      this._logRef = t instanceof HTMLUListElement ? t : void 0, this._logRef && this.events.length && this._syncLogToCurrentEvent();
    }}
              >${_e(this.events, (t, i) => `${t.timestamp}-${t.entityId}-${t.newState}-${i}`, (t) => this._renderEventItem(t, e?.timestamp === t.timestamp))}</ul>` : f}
          ${!this.logExpanded && !this.events.length ? y`<div class="replay-empty">No history events yet.</div>` : f}
        </div>
      </div>
    `;
  }
};
q.styles = Pt`
    .replay-panel {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px 12px 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 12px;
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.03));
      overflow-x: hidden;
    }
    .replay-panel-toggle {
      display: flex;
      justify-content: flex-start;
      margin: 0 0 4px;
    }
    /* Shaped like the floor buttons, and carrying the same skin tokens, so the
       card's two bits of chrome read as one set rather than two. */
    .replay-hide-toggle,
    .replay-show-toggle {
      border: 1px solid var(--fp-skin-badge-border, var(--divider-color, #ccc));
      border-radius: 6px;
      background: var(--fp-skin-badge-bg, var(--card-background-color, #fff));
      color: var(--fp-skin-text, var(--primary-text-color));
      padding: 4px 8px;
      font-size: 12px;
      line-height: 1;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      white-space: nowrap;
    }
    .replay-hide-toggle {
      position: absolute;
      top: 6px;
      right: 6px;
      z-index: 1;
      padding: 2px 8px;
      font-size: 11px;
      text-transform: lowercase;
    }
    .replay-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      padding-right: 52px;
    }
    .replay-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    /*
     * The moment being drawn, painted as its own thing rather than set in a
     * line of grey text. This is the one fact the panel exists to report --
     * with the panel open the plan is always showing the past, so "where in
     * time am I" is the only question left -- and a plain timestamp beside a
     * row of controls does not read as an answer to it. Matches the clock
     * riding the timeline playhead, which wears the same accent.
     */
    .replay-time {
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      padding: 3px 9px;
      border-radius: 999px;
      background: var(--fp-skin-accent, var(--primary-color, #03a9f4));
      color: var(--fp-skin-accent-ink, var(--text-primary-color, #fff));
      font-weight: 600;
    }
    .replay-status {
      font-size: 12px;
      color: var(--secondary-text-color, #666);
    }
    .replay-toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: end;
      justify-content: space-between;
    }
    .replay-toolbar-toggles {
      display: flex;
      gap: 6px;
      align-items: center;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .replay-lanes {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }
    .replay-transport {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
    }
    .replay-speed-toggle {
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 999px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      padding: 4px 10px;
      font-size: 12px;
      line-height: 1.2;
      cursor: pointer;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .replay-icon-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 30px;
      height: 28px;
      padding: 2px 6px;
    }
    .replay-icon-button ha-icon,
    .replay-speed-toggle ha-icon,
    .replay-run-button ha-icon {
      --mdc-icon-size: 16px;
    }
    .replay-speed-panel {
      border: 1px solid var(--divider-color, #ddd);
      border-radius: 8px;
      background: var(--card-background-color, #fff);
      padding: 8px 10px;
      min-width: 0;
    }
    .replay-range {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: end;
    }
    .replay-range-tools {
      display: flex;
      gap: 4px;
    }
    .replay-view-tools {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .replay-timeline-wrap {
      max-height: 220px;
      overflow-y: auto;
      overflow-x: hidden;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      background: var(--card-background-color, #fff);
      min-width: 0;
    }
    .replay-range-field,
    .replay-speed-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
      color: var(--secondary-text-color, #666);
    }
    .replay-range-field {
      flex: 1 1 210px;
      min-width: 180px;
    }
    .replay-speed-group {
      flex: 1 1 auto;
      min-width: 0;
      max-width: 100%;
      margin-left: 0;
    }
    .replay-range input,
    .replay-speed-slider,
    .replay-speed-field input {
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      padding: 4px 8px;
      font-size: 12px;
      min-width: 150px;
    }
    .replay-toolbar button,
    .replay-range-tools button,
    .replay-toolbar select,
    .replay-speed-field input {
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      padding: 4px 8px;
      font-size: 12px;
      line-height: 1;
    }
    .replay-speed-slider {
      padding: 0;
      width: 100%;
      min-width: 0;
      max-width: 100%;
    }
    .replay-speed {
      width: 92px;
      min-width: 0;
      align-self: flex-start;
    }
    .replay-run-button {
      min-width: 82px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .replay-toolbar button,
    .replay-range-tools button {
      cursor: pointer;
    }
    @media (max-width: 720px) {
      .replay-toolbar {
        align-items: stretch;
      }
      .replay-speed-group {
        margin-left: 0;
        max-width: 100%;
      }
    }
    .replay-event-log {
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      background: var(--card-background-color, #fff);
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .replay-event-log.collapsed {
      padding-bottom: 8px;
    }
    .replay-timeline-toggle,
    .replay-log-toggle {
      align-self: flex-start;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 999px;
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.03));
      color: var(--primary-text-color);
      padding: 4px 8px;
      font-size: 11px;
      cursor: pointer;
    }
    .replay-event-log ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
      max-height: 180px;
      overflow: auto;
      overscroll-behavior: contain;
    }
    .replay-event-item {
      display: grid;
      grid-template-columns: auto auto auto minmax(0, 1fr) auto;
      gap: 8px;
      align-items: center;
      font-size: 12px;
      color: var(--secondary-text-color, #666);
      user-select: text;
      cursor: text;
      padding: 2px 0;
    }
    .replay-event-passed {
      color: var(--primary-text-color);
    }
    .replay-event-current {
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.03));
      border-radius: 6px;
      padding: 4px 6px;
      margin: -4px -6px;
    }
    .replay-event-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--divider-color, #ccc);
      flex-shrink: 0;
    }
    .replay-event-time {
      color: var(--secondary-text-color, #666);
      white-space: nowrap;
    }
    .replay-event-entity {
      color: var(--primary-text-color);
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .replay-event-icon {
      display: inline-flex;
      align-items: center;
      color: var(--secondary-text-color, #666);
    }
    .replay-event-icon ha-icon {
      --mdc-icon-size: 16px;
    }
    .replay-event-change {
      color: var(--secondary-text-color, #666);
      white-space: nowrap;
      text-align: right;
    }
    .replay-panel-hidden {
      border: 1px dashed var(--divider-color, #ccc);
      border-radius: 8px;
      background: var(--card-background-color, #fff);
      padding: 8px 10px;
    }
    .replay-toolbar-hidden {
      justify-content: flex-end;
      margin: 0;
    }
    .replay-empty {
      font-size: 12px;
      color: var(--secondary-text-color, #666);
    }
  `;
Y([
  W({ attribute: !1 })
], q.prototype, "events", 2);
Y([
  W({ type: Number })
], q.prototype, "startTime", 2);
Y([
  W({ type: Number })
], q.prototype, "endTime", 2);
Y([
  W({ type: Number })
], q.prototype, "currentTime", 2);
Y([
  W({ type: Boolean })
], q.prototype, "visible", 2);
Y([
  W({ type: Boolean })
], q.prototype, "enabled", 2);
Y([
  W({ type: Boolean })
], q.prototype, "ready", 2);
Y([
  W({ type: Boolean })
], q.prototype, "playing", 2);
Y([
  W({ type: Boolean })
], q.prototype, "timelineExpanded", 2);
Y([
  W({ type: Boolean })
], q.prototype, "logExpanded", 2);
Y([
  W({ type: Boolean })
], q.prototype, "speedExpanded", 2);
Y([
  W({ type: String })
], q.prototype, "error", 2);
Y([
  W({ type: String })
], q.prototype, "rangeWarning", 2);
Y([
  W({ type: String })
], q.prototype, "panelId", 2);
Y([
  W({ type: Number })
], q.prototype, "replaySpeed", 2);
Y([
  W({ type: String })
], q.prototype, "currentTimeLabel", 2);
Y([
  W({ type: String })
], q.prototype, "startInputValue", 2);
Y([
  W({ type: String })
], q.prototype, "endInputValue", 2);
q = Y([
  ki("easy-floorplan-replay-panel")
], q);
const es = "--fp-color-", ts = 24;
function te(e) {
  return typeof e != "string" ? "" : e.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
}
function is(e) {
  return es + te(e);
}
function cr(e) {
  return `var(${is(e)})`;
}
function It(e) {
  if (!Array.isArray(e)) return [];
  const t = /* @__PURE__ */ new Set(), i = [];
  for (const n of e) {
    if (!n || typeof n != "object") continue;
    const { name: o, color: r } = n, a = te(o), s = L(r);
    if (!(!a || !s || t.has(a)) && (t.add(a), i.push({ name: o.trim(), color: s }), i.length >= ts))
      break;
  }
  return i;
}
function ns(e) {
  return It(e).map((t) => `${is(t.name)}:${t.color};`).join("");
}
function os(e) {
  return It(e).map((t) => `${te(t.name)}=${t.color}`).join(",");
}
const Uf = /^[Vv][Aa][Rr]\(\s*--fp-color-([\p{L}\p{N}-]+)\s*(?:,((?:[^()]|\([^()]*\))*))?\)$/u;
function rs(e) {
  return _n(e)?.slug;
}
function _n(e) {
  if (typeof e != "string") return;
  const t = Uf.exec(e.trim());
  if (!t) return;
  const i = t[2]?.trim();
  return { slug: t[1], fallback: i || void 0 };
}
function Jt(e, t) {
  const i = rs(e);
  if (!i) return e;
  const n = It(t).find((o) => te(o.name) === i);
  return n ? n.color : e;
}
function hr(e, t, i) {
  if (!t) return e;
  const n = (o) => {
    if (typeof o == "string") {
      const r = _n(o);
      if (r?.slug !== t) return o;
      const a = _n(i);
      return r.fallback && a && !a.fallback ? `var(${es}${a.slug}, ${r.fallback})` : i;
    }
    return Array.isArray(o) ? o.map(n) : o && typeof o == "object" ? Object.fromEntries(Object.entries(o).map(([r, a]) => [r, n(a)])) : o;
  };
  return n(e);
}
function qf(e, t, i, n) {
  if (!(n > 0) || !(e.length > 0)) return [];
  if (J(e)) return Kf(e, t, i, n);
  const o = [], r = e.length / 2, a = e.type === "window" ? n * ln : 0, s = n * ea, l = (k) => Math.max(0, Math.min(1, I(k, 0))), h = l(t.amount ?? (t.open === !1 ? 0 : 1)), p = t.second ? l(t.second.amount) : h, c = (k, S, A = t.accent) => ae(S ? A : k === 0 ? L(t.inactive) ?? t.color : t.color, U), d = c(h, t.active), u = t.second ? c(p, t.second.active) : d, g = Ri(e), b = e.angle * Math.PI / 180, v = (k, S) => (k *= e.flipH ? -1 : 1, S *= e.flipV ? -1 : 1, i(e.x + k * Math.cos(b) - S * Math.sin(b), e.y + k * Math.sin(b) + S * Math.cos(b))), m = (k, S, A, T, P = d, D = a, H = s, j = g) => {
    H <= D || o.push({ kind: "panel", id: e.id, base: [v(k, S), v(A, T)], z0: D, z1: H, color: P, glazed: j });
  }, $ = (k, S, A, T, P, D = d, H = u, j = -1, ne = g, ee = 0) => {
    const x = T * Math.PI / 2;
    if (m(k, ee, k + A * Math.cos(x), ee + j * A * Math.sin(x), D, a, s, ne), S > k) {
      const z = P * Math.PI / 2;
      m(S, ee, S - A * Math.cos(z), ee + j * A * Math.sin(z), H, a, s, ne);
    }
  };
  o.push({ kind: "opening-hit", id: e.id, base: [v(-r, 0), v(r, 0)], z0: a, z1: s });
  const E = X(e);
  if (E === "swing") {
    const k = Se(e) === "double", S = k ? r : e.length * Li(e);
    $(-r, k ? r : -r, S, h, p), !k && S < e.length && m(-r + S, 0, r, 0, L(t.color), a, s, !0);
  } else if (E === "fixed")
    m(-r, 0, r, 0, L(t.color));
  else if (E === "roll")
    m(-r, 0, r, 0, d, a + (s - a) * h, s, !1);
  else if (E === "awning") {
    const k = h * Math.PI / 2, S = (s - a) * Math.sin(k), A = s - (s - a) * Math.cos(k), T = v(-r, -S), P = v(r, -S);
    o.push({
      kind: "panel",
      id: e.id,
      base: [T, P],
      z0: A,
      z1: s,
      color: d,
      glazed: g,
      vertices: [
        { ...T, z: A },
        { ...P, z: A },
        { ...v(r, 0), z: s },
        { ...v(-r, 0), z: s }
      ]
    });
  } else {
    const k = Lt(e), S = r / 2, A = 1.75;
    k === "bypass" ? (m(-r, A, 0, A, L(t.color)), m(-r * h, -A, r - r * h, -A)) : k === "biparting" ? (m(-r - r * h, 0, -r * h, 0), m(r * p, 0, r + r * p, 0, u)) : k === "biparting-bypass" ? (m(-r, A, -S, A, L(t.color)), m(S, A, r, A, L(t.color)), m(-S - S * h, -A, -S * h, -A), m(S * p, -A, S + S * p, -A, u)) : k === "converging" ? (m(-r + S * h, A, S * h, A), m(-S * p, -A, r - S * p, -A, u)) : m(-r + e.length * h, 0, r + e.length * h, 0);
  }
  if (t.shutter) {
    const k = t.shutter, S = l(k.amount), A = k.second ? l(k.second.amount) : S, T = c(S, k.active, k.accent ?? t.accent), P = k.second ? c(A, k.second.active, k.accent ?? t.accent) : T;
    if (k.style === "swing") {
      const D = k.flip ? -1 : 1;
      $(-r, r, r, S, A, T, P, D, !1, D * ((V + 4) / 2 + 1.5));
    } else
      m(-r, 2, r, 2, T, a + (s - a) * S, s, !1);
  }
  return o;
}
const Gf = Math.PI / 3;
function Kf(e, t, i, n) {
  const o = e.length / 2, r = de(e) / 2;
  if (!(r > 0)) return [];
  const a = (A) => Math.max(0, Math.min(1, I(A, 0))), s = a(t.amount ?? (t.open === !1 ? 0 : 1)), l = (A, T, P = t.accent) => ae(T ? P : A === 0 ? L(t.inactive) ?? t.color : t.color, U), h = e.angle * Math.PI / 180, p = (A, T) => (A *= e.flipH ? -1 : 1, T *= e.flipV ? -1 : 1, i(e.x + A * Math.cos(h) - T * Math.sin(h), e.y + A * Math.sin(h) + T * Math.cos(h))), c = (A, T) => [p(-o, A), p(o, A), p(o, T), p(-o, T)], d = c(-r, r), u = [];
  if (u.push({
    kind: "opening-hit",
    id: e.id,
    base: d,
    z0: n,
    z1: n,
    vertices: d.map((A) => ({ ...A, z: n }))
  }), t.shutter) {
    const A = a(t.shutter.amount), T = r * 2 * (1 - A);
    if (T > 0) {
      const P = c(-r, -r + T);
      u.push({
        kind: "panel",
        id: e.id,
        base: d,
        z0: n,
        z1: n,
        color: l(A, t.shutter.active, t.shutter.accent ?? t.accent),
        glazed: !1,
        vertices: P.map((D) => ({ ...D, z: n }))
      });
    }
  }
  const g = s * Gf, b = r * 2, v = -r + b * Math.cos(g), m = n + b * Math.sin(g), [$, E] = [p(-o, -r), p(o, -r)], [k, S] = [p(o, v), p(-o, v)];
  return u.push({
    kind: "panel",
    id: e.id,
    base: d,
    z0: n,
    z1: m,
    color: l(s, t.active),
    glazed: Ri(e),
    vertices: [{ ...$, z: n }, { ...E, z: n }, { ...k, z: m }, { ...S, z: m }]
  }), u;
}
const as = 500, Vf = {
  now: () => performance.now(),
  request: (e) => requestAnimationFrame(e),
  cancel: (e) => cancelAnimationFrame(e)
};
function Xf(e) {
  if (!(e > 0)) return 0;
  if (e >= 1) return 1;
  const t = 0.25, i = 0.1, n = 0.25, o = 1, r = (p, c, d) => ((1 - p) * (1 - p) * 3 * c + (1 - p) * p * 3 * d + p * p) * p, a = (p, c, d) => 3 * (1 - p) * (1 - p) * c + 6 * (1 - p) * p * (d - c) + 3 * p * p * (1 - d);
  let s = 0, l = 1, h = e;
  for (let p = 0; p < 8; p++) {
    const c = r(h, t, n) - e;
    if (Math.abs(c) < 1e-6) break;
    c > 0 ? l = h : s = h;
    const d = a(h, t, n), u = d > 1e-6 ? h - c / d : (s + l) / 2;
    h = u > s && u < l ? u : (s + l) / 2;
  }
  return r(h, i, o);
}
class Yf {
  constructor(t, i, n = as) {
    this.frames = t, this.onFrame = i, this._travels = /* @__PURE__ */ new Map(), this._handle = null, this._duration = n;
  }
  /** Zero animates nothing, which is what prefers-reduced-motion asks for. */
  setDuration(t) {
    this._duration = Math.max(0, t);
  }
  /**
   * What to draw for `key` right now, easing toward `target` and asking for
   * another frame while it has not arrived.
   *
   * A key seen for the first time takes its target outright: a card that has
   * just loaded shows the house as it is, rather than playing every door open
   * at once.
   */
  value(t, i) {
    const n = this.frames.now(), o = this._travels.get(t);
    if (!o)
      return this._travels.set(t, { from: i, to: i, start: n }), i;
    o.to !== i && (o.from = this._at(o, n), o.to = i, o.start = n);
    const r = this._at(o, n);
    return r !== o.to && this._schedule(), r;
  }
  /** Stop asking for frames — the card is going away, or the view is flat. */
  stop() {
    this._handle !== null && this.frames.cancel(this._handle), this._handle = null;
  }
  /** True while at least one panel is still travelling. */
  get running() {
    return this._handle !== null;
  }
  _at(t, i) {
    if (this._duration <= 0) return t.to;
    const n = i - t.start;
    return n > 0 ? n >= this._duration ? t.to : t.from + (t.to - t.from) * Xf(n / this._duration) : t.from;
  }
  _schedule() {
    this._handle === null && (this._handle = this.frames.request(() => {
      this._handle = null, this.onFrame();
    }));
  }
}
const Zf = 2, ss = 600;
function Be(e) {
  if (e === !0) return { controls: !0, intervalMs: 0 };
  if (!e || typeof e != "object" || Array.isArray(e)) return;
  const t = e, i = t.controls === void 0 ? !0 : !!t.controls, n = typeof t.interval == "number" || typeof t.interval == "string" ? Number(t.interval) : NaN, o = Number.isFinite(n) && n > 0 ? Math.min(Math.max(n, Zf), ss) * 1e3 : 0, r = Array.isArray(t.rooms) ? t.rooms.filter((a) => typeof a == "string" && a !== "") : void 0;
  if (!(!i && o === 0))
    return { controls: i, intervalMs: o, ...r?.length ? { rooms: r } : {} };
}
function dr(e, t) {
  if (!t || !e?.length) return [];
  const i = new Set(e.map((n) => n.id));
  return t.rooms ? t.rooms.filter((n) => i.has(n)) : e.map((n) => n.id);
}
function Qf(e, t, i) {
  if (!e.length) return;
  const n = t === void 0 ? -1 : e.indexOf(t);
  return n < 0 ? i === 1 ? e[0] : e[e.length - 1] : e[(n + i + e.length) % e.length];
}
const Jf = 500, em = 250;
class tm extends HTMLElement {
  constructor() {
    super(...arguments), this.holdTime = Jf, this.held = !1, this.cancelled = !1;
  }
  connectedCallback() {
    Object.assign(this.style, {
      position: "fixed",
      width: "0",
      height: "0"
    }), ["touchcancel", "mouseout", "mouseup", "touchmove", "mousewheel", "wheel", "scroll"].forEach(
      (t) => {
        document.addEventListener(
          t,
          () => {
            this.cancelled = !0, this.timer && (clearTimeout(this.timer), this.timer = void 0);
          },
          { passive: !0 }
        );
      }
    );
  }
  bind(t, i = {}) {
    t.actionHandler && im(i, t.actionHandler.options) || (t.actionHandler ? (t.removeEventListener("touchstart", t.actionHandler.start), t.removeEventListener("touchend", t.actionHandler.end), t.removeEventListener("touchcancel", t.actionHandler.end), t.removeEventListener("mousedown", t.actionHandler.start), t.removeEventListener("click", t.actionHandler.end), t.removeEventListener("keydown", t.actionHandler.handleKeyDown)) : t.addEventListener("contextmenu", (n) => {
      n.preventDefault(), n.stopPropagation();
    }), t.actionHandler = { options: i }, !i.disabled && (t.actionHandler.start = () => {
      this.cancelled = !1, this.held = !1, i.hasHold && (this.timer = window.setTimeout(() => {
        this.held = !0;
      }, this.holdTime));
    }, t.actionHandler.end = (n) => {
      if (["touchend", "touchcancel"].includes(n.type) && this.cancelled) {
        this.timer && clearTimeout(this.timer), this.timer = void 0;
        return;
      }
      if ((n.type === "touchend" || n.type === "touchcancel") && (n.cancelable && n.preventDefault(), n.type === "touchcancel")) {
        this.timer && clearTimeout(this.timer), this.timer = void 0;
        return;
      }
      const o = n.target;
      i.hasHold && this.timer && (clearTimeout(this.timer), this.timer = void 0), i.hasHold && this.held ? Nt(o, "hold") : i.hasDoubleClick ? n.type === "click" && n.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
        this.dblClickTimeout = void 0, Nt(o, "tap");
      }, em) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, Nt(o, "double_tap")) : Nt(o, "tap");
    }, t.actionHandler.handleKeyDown = (n) => {
      ["Enter", " "].includes(n.key) && (n.preventDefault(), n.currentTarget.actionHandler.end(n));
    }, t.addEventListener("touchstart", t.actionHandler.start, { passive: !0 }), t.addEventListener("touchend", t.actionHandler.end), t.addEventListener("touchcancel", t.actionHandler.end), t.addEventListener("mousedown", t.actionHandler.start, { passive: !0 }), t.addEventListener("click", t.actionHandler.end), t.addEventListener("keydown", t.actionHandler.handleKeyDown)));
  }
}
function im(e, t) {
  return e.hasHold === t.hasHold && e.hasDoubleClick === t.hasDoubleClick && e.disabled === t.disabled;
}
function Nt(e, t) {
  e.dispatchEvent(
    new CustomEvent("action", { detail: { action: t }, bubbles: !0, composed: !0 })
  );
}
function nm() {
  const e = document.body, t = e.querySelector("action-handler-easy-floorplan");
  if (t) return t;
  const i = document.createElement("action-handler-easy-floorplan");
  return e.appendChild(i), i;
}
customElements.get("action-handler-easy-floorplan") || customElements.define("action-handler-easy-floorplan", tm);
const om = (e, t) => {
  nm().bind(e, t);
}, Ne = Si(
  class extends Ei {
    update(e, [t]) {
      return om(e.element, t), be;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render(e) {
    }
  }
), rm = 0.28, am = 0.8, sm = 1.15;
function ei(e, t) {
  return typeof e == "number" && Number.isFinite(e) && e > 0 ? e : t;
}
function wi(e, t) {
  return typeof e != "number" || !Number.isFinite(e) ? t : Math.max(0, Math.min(1, e));
}
function ls(e = {}) {
  return {
    strength: wi(e.strength, rm),
    depth: Math.max(0.05, Math.min(3, ei(e.depth, am))),
    spread: Math.max(0.05, Math.min(4, ei(e.spread, sm))),
    openingEps: ei(e.openingEps, Ie)
  };
}
function pr(e, t, i) {
  const n = e.points;
  if (n.length < 3) return !1;
  let o = !1;
  for (let r = 0, a = n.length - 1; r < n.length; a = r++) {
    const s = n[r], l = n[a];
    if (!(s.y > i != l.y > i)) continue;
    const p = (l.x - s.x) * (i - s.y) / (l.y - s.y) + s.x;
    t < p && (o = !o);
  }
  return o;
}
function lm(e, t, i, n) {
  const o = n.x - i.x, r = n.y - i.y, a = o * o + r * r;
  if (a === 0) return Math.hypot(e - i.x, t - i.y);
  let s = ((e - i.x) * o + (t - i.y) * r) / a;
  return s = Math.max(0, Math.min(1, s)), Math.hypot(e - (i.x + s * o), t - (i.y + s * r));
}
function cm(e, t) {
  if (e.points.length < 2) return;
  let i;
  for (let n = 0; n < e.points.length; n++) {
    const o = e.points[n], r = e.points[(n + 1) % e.points.length], a = lm(t.x, t.y, o, r);
    (!i || a < i.distance) && (i = { area: e, segmentIndex: n, distance: a });
  }
  return i;
}
function hm(e, t, i = Ie) {
  const n = ei(i, Ie);
  return t.map((o) => cm(o, e)).filter((o) => o !== void 0 && o.distance <= n).sort((o, r) => o.distance - r.distance);
}
function dm(e, t, i, n) {
  const o = e.area.points, r = o[e.segmentIndex], a = o[(e.segmentIndex + 1) % o.length], s = a.x - r.x, l = a.y - r.y, h = Math.hypot(s, l);
  if (!(h > 0)) return;
  const p = { x: -l / h, y: s / h }, c = { x: l / h, y: -s / h }, d = Math.max(1, n + 1), u = pr(e.area, t + p.x * d, i + p.y * d), g = pr(e.area, t + c.x * d, i + c.y * d);
  if (u && !g) return p;
  if (g && !u) return c;
  const b = e.area.points.reduce(
    (m, $) => ({ x: m.x + $.x / e.area.points.length, y: m.y + $.y / e.area.points.length }),
    { x: 0, y: 0 }
  ), v = { x: b.x - t, y: b.y - i };
  return p.x * v.x + p.y * v.y >= 0 ? p : c;
}
function pm(e, t, i = {}) {
  const { openingEps: n } = ls(i), o = [];
  for (const r of t) {
    const a = hm(r, e, n);
    if (a.length !== 1) continue;
    const s = a[0], l = dm(s, r.x, r.y, n);
    l && o.push({
      openingId: r.id,
      areaId: s.area.id,
      x: r.x,
      y: r.y,
      inwardX: l.x,
      inwardY: l.y,
      length: Math.max(0, r.length)
    });
  }
  return o;
}
function um(e, t = 0, i = 1) {
  return e.sunlight === !1 ? 0 : (yi(e) ? 1 : wi(t, 0)) * wi(i, 1);
}
function fm(e) {
  const t = zi(e);
  if (t === void 0 || t <= bt) return 0;
  if (t >= tn) return 1;
  const i = (t - bt) / (tn - bt);
  return i * i * (3 - 2 * i);
}
function mm(e) {
  if (!e.points.length) return 1;
  let t = 1 / 0, i = 1 / 0, n = -1 / 0, o = -1 / 0;
  for (const r of e.points)
    t = Math.min(t, r.x), i = Math.min(i, r.y), n = Math.max(n, r.x), o = Math.max(o, r.y);
  return Math.max(1, n - t, o - i);
}
function gm(e, t, i, n = () => 1, o = {}) {
  const { strength: r, depth: a, spread: s } = ls(o), l = fm(i);
  if (!(l > 0) || !(r > 0)) return [];
  const h = mm(e) * a, p = [];
  for (const c of t) {
    if (c.areaId !== e.id) continue;
    const d = wi(n(c.openingId), 0), u = Math.max(0, Math.min(1, r * l * d));
    if (!(u > 0)) continue;
    const g = -c.inwardY, b = c.inwardX, v = Math.max(1, c.length / 2), m = v + h * s, $ = c.x + c.inwardX * h, E = c.y + c.inwardY * h;
    p.push({
      openingId: c.openingId,
      areaId: c.areaId,
      points: [
        { x: c.x - g * v, y: c.y - b * v },
        { x: c.x + g * v, y: c.y + b * v },
        { x: $ + g * m, y: E + b * m },
        { x: $ - g * m, y: E - b * m }
      ],
      gradientStart: { x: c.x, y: c.y },
      gradientEnd: { x: $, y: E },
      opacity: u
    });
  }
  return p;
}
const ym = "#f4f8ff", bm = 10;
function ur(e, t, i) {
  return Math.max(t, Math.min(i, e));
}
function xn(e) {
  return Number.isFinite(e.x) && Number.isFinite(e.y);
}
function fr(e) {
  return e.length < 3 || e.some((t) => !xn(t)) ? "" : e.map((t) => `${t.x},${t.y}`).join(" ");
}
function Zi(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t ^= e.charCodeAt(n), t = Math.imul(t, 16777619);
  return `${e.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48) || "ambient"}-${(t >>> 0).toString(36)}`;
}
function vm(e, t, i = {}) {
  const n = fr(e.points);
  if (!n) return null;
  const o = i.idPrefix?.trim() || "fp-ambient", r = Zi(`${o}-clip-${e.id}`), a = Zi(`${o}-blur-${e.id}`), s = Number.isFinite(i.blur) ? ur(i.blur, 0, 40) : bm, l = i.color?.trim() || ym, h = [];
  for (let p = 0; p < t.length; p++) {
    const c = t[p];
    if (c.areaId !== e.id) continue;
    const d = fr(c.points);
    !d || !xn(c.gradientStart) || !xn(c.gradientEnd) || !Number.isFinite(c.opacity) || c.opacity <= 0 || h.push({
      openingId: c.openingId,
      points: d,
      gradientId: Zi(`${o}-gradient-${e.id}-${c.openingId}-${p}`),
      gradientStart: c.gradientStart,
      gradientEnd: c.gradientEnd,
      opacity: ur(c.opacity, 0, 1)
    });
  }
  return h.length ? { clipId: r, clipPoints: n, filterId: a, blur: s, color: l, patches: h } : null;
}
function wm(e, t, i = {}) {
  const n = vm(e, t, i);
  return n ? _`
    <g class="fp-ambient-daylight" data-area-id=${e.id} aria-hidden="true" pointer-events="none">
      <defs>
        <clipPath id=${n.clipId}>
          <polygon points=${n.clipPoints}></polygon>
        </clipPath>
        <!-- The filter region is a proportion of the patch's own box, and a
             Gaussian tail runs to roughly 3x its deviation, so the two are
             coupled: the margin has to stay wider than the blur or the falloff
             is cut off square at the region edge — a hard line exactly where
             the softness was the point. It holds comfortably at the shipped
             blur, since a patch fans most of the way across its room while the
             blur stays in single digits. Worth sizing from the blur instead if
             it ever becomes a public knob. -->
        <filter id=${n.filterId} x="-25%" y="-25%" width="150%" height="150%"
                color-interpolation-filters="sRGB">
          <feGaussianBlur stdDeviation=${n.blur}></feGaussianBlur>
        </filter>
        ${n.patches.map(
    (o) => _`
            <linearGradient id=${o.gradientId} gradientUnits="userSpaceOnUse"
                            x1=${o.gradientStart.x} y1=${o.gradientStart.y}
                            x2=${o.gradientEnd.x} y2=${o.gradientEnd.y}>
              <stop offset="0%" stop-color=${n.color} stop-opacity="1"></stop>
              <stop offset="35%" stop-color=${n.color} stop-opacity="0.72"></stop>
              <stop offset="72%" stop-color=${n.color} stop-opacity="0.25"></stop>
              <stop offset="100%" stop-color=${n.color} stop-opacity="0"></stop>
            </linearGradient>
          `
  )}
      </defs>
      <g clip-path=${`url(#${n.clipId})`}>
        ${n.patches.map(
    (o) => _`
            <polygon class="fp-ambient-daylight-patch"
                     data-opening-id=${o.openingId}
                     points=${o.points}
                     fill=${`url(#${o.gradientId})`}
                     opacity=${o.opacity}
                     filter=${n.blur > 0 ? `url(#${n.filterId})` : "none"}>
            </polygon>
          `
  )}
      </g>
    </g>
  ` : _``;
}
function _m(e) {
  return e?.ambientDaylight === !0;
}
function xm(e) {
  const t = new Set(e.map((n) => n.id)), i = /* @__PURE__ */ new Set();
  return e.map((n, o) => {
    if (!i.has(n.id))
      return i.add(n.id), n;
    let r = `${n.id}#${o}`;
    for (let a = 0; t.has(r); a++) r = `${n.id}#${o}-${a}`;
    return t.add(r), i.add(r), { ...n, id: r };
  });
}
function $m(e, t, i, n, o) {
  if (!_m(t) || e.areas.length === 0) return f;
  const r = xm(e.areas), a = pm(r, e.openings);
  if (a.length === 0) return f;
  const s = new Map(e.openings.map((c) => [c.id, c])), l = (c) => {
    const d = s.get(c);
    if (!d) return 0;
    const u = Gn(
      d,
      o.amount(d),
      o.secondAmount(d)
    ), g = d.shutterEntity ? xe(i?.states[d.shutterEntity], d.shutterInvert) : 1;
    return um(d, u, g);
  }, h = i?.states["sun.sun"]?.attributes?.elevation, p = r.map((c) => {
    const d = gm(c, a, h, l);
    return d.length ? wm(c, d, { idPrefix: n }) : f;
  });
  return p.some((c) => c !== f) ? _`${p}` : f;
}
const ie = 1e-3;
function Hi(e) {
  const t = Math.min(e.x0, e.x1), i = Math.max(e.x0, e.x1), n = Math.min(e.y0, e.y1), o = Math.max(e.y0, e.y1);
  return [
    { x: t, y: n },
    { x: i, y: n },
    { x: i, y: o },
    { x: t, y: o }
  ];
}
function ye(e) {
  if (e.length !== 4) return !1;
  const t = Fe(e);
  return Hi({
    x0: t.minX,
    y0: t.minY,
    x1: t.maxX,
    y1: t.maxY
  }).every((i, n) => i.x === e[n].x && i.y === e[n].y);
}
const km = 1;
function Ht(e, t = km) {
  if (!ye(e)) return !1;
  const i = Fe(e);
  return i.maxX - i.minX >= t && i.maxY - i.minY >= t;
}
function Sm(e, t, i) {
  const n = e[(t + 2) % 4];
  return n ? Hi({ x0: n.x, y0: n.y, x1: i.x, y1: i.y }) : e.map((o) => ({ ...o }));
}
function Em(e, t, i) {
  const n = e.map((d) => ({ ...d })), o = t % 4, r = (t + 1) % 4, a = Math.abs(n[o].y - n[r].y) < ie, s = n.map((d, u) => u === o || u === r ? a ? { ...d, y: i.y } : { ...d, x: i.x } : d), l = Math.min(...s.map((d) => d.x)), h = Math.max(...s.map((d) => d.x)), p = Math.min(...s.map((d) => d.y)), c = Math.max(...s.map((d) => d.y));
  return Hi({ x0: l, y0: p, x1: h, y1: c });
}
function Fe(e) {
  const t = e.map((n) => n.x), i = e.map((n) => n.y);
  return {
    minX: Math.min(...t),
    maxX: Math.max(...t),
    minY: Math.min(...i),
    maxY: Math.max(...i)
  };
}
function Qi(e, t, i = { dx: 0, dy: 0 }) {
  let n = Fe(e);
  for (const o of t) {
    const r = Fe(o.points);
    if (!(n.maxX > r.minX && n.minX < r.maxX && n.maxY > r.minY && n.minY < r.maxY)) continue;
    const s = n.maxX - n.minX, l = n.maxY - n.minY;
    i.dx > 0 ? n = { ...n, maxX: Math.min(n.maxX, r.minX) } : i.dx < 0 ? n = { ...n, minX: Math.max(n.minX, r.maxX) } : i.dy > 0 ? n = { ...n, maxY: Math.min(n.maxY, r.minY) } : i.dy < 0 ? n = { ...n, minY: Math.max(n.minY, r.maxY) } : s >= l ? n.minX < r.maxX ? n = { ...n, maxX: r.minX } : n = { ...n, minX: r.maxX } : n.minY < r.maxY ? n = { ...n, maxY: r.minY } : n = { ...n, minY: r.maxY };
  }
  return [
    { x: n.minX, y: n.minY },
    { x: n.maxX, y: n.minY },
    { x: n.maxX, y: n.maxY },
    { x: n.minX, y: n.maxY }
  ];
}
function Am(e, t, i = ie) {
  if (!ye(e) || !ye(t)) return [];
  const n = Fe(e), o = Fe(t), r = Math.min(n.maxY, o.maxY) - Math.max(n.minY, o.minY), a = Math.min(n.maxX, o.maxX) - Math.max(n.minX, o.minX), s = [];
  return Math.abs(n.maxX - o.minX) < i && r > i && s.push("right"), Math.abs(n.minX - o.maxX) < i && r > i && s.push("left"), Math.abs(n.maxY - o.minY) < i && a > i && s.push("bottom"), Math.abs(n.minY - o.maxY) < i && a > i && s.push("top"), s;
}
function Mm(e, t, i, n) {
  if (!ye(e) || !ye(t)) return;
  const o = Fe(e), r = Fe(t), a = Math.min(o.maxY, r.maxY) - Math.max(o.minY, r.minY), s = Math.min(o.maxX, r.maxX) - Math.max(o.minX, r.minX), l = Math.abs(i.dx) > ie, h = Math.abs(i.dy) > ie, p = (n === void 0 || n === "right") && Math.abs(o.maxX - r.minX) < ie && a > ie && l, c = (n === void 0 || n === "left") && Math.abs(o.minX - r.maxX) < ie && a > ie && l, d = (n === void 0 || n === "bottom") && Math.abs(o.maxY - r.minY) < ie && s > ie && h, u = (n === void 0 || n === "top") && Math.abs(o.minY - r.maxY) < ie && s > ie && h;
  if (!p && !c && !d && !u) return;
  const g = e.map((v) => ({ ...v })), b = t.map((v) => ({ ...v }));
  if (p) {
    const v = o.maxX + i.dx;
    g[1] = { x: v, y: g[1].y }, g[2] = { x: v, y: g[2].y }, b[0] = { x: v, y: b[0].y }, b[3] = { x: v, y: b[3].y };
  }
  if (c) {
    const v = o.minX + i.dx;
    g[0] = { x: v, y: g[0].y }, g[3] = { x: v, y: g[3].y }, b[1] = { x: v, y: b[1].y }, b[2] = { x: v, y: b[2].y };
  }
  if (d) {
    const v = o.maxY + i.dy;
    g[2] = { x: g[2].x, y: v }, g[3] = { x: g[3].x, y: v }, b[0] = { x: b[0].x, y: v }, b[1] = { x: b[1].x, y: v };
  }
  if (u) {
    const v = o.minY + i.dy;
    g[0] = { x: g[0].x, y: v }, g[1] = { x: g[1].x, y: v }, b[2] = { x: b[2].x, y: v }, b[3] = { x: b[3].x, y: v };
  }
  return { points: g, other: b };
}
function Tm(e) {
  switch (e) {
    case void 0:
    case "none":
      return "wall";
    case "wall":
      return "divider";
    case "divider":
      return "none";
    default:
      return "wall";
  }
}
function cs(e, t, i = {}) {
  if (!ye(t)) return [];
  const [n, o, r, a] = t, s = {
    top: { x1: n.x, y1: n.y, x2: o.x, y2: o.y },
    right: { x1: o.x, y1: o.y, x2: r.x, y2: r.y },
    bottom: { x1: r.x, y1: r.y, x2: a.x, y2: a.y },
    left: { x1: a.x, y1: a.y, x2: n.x, y2: n.y }
  };
  return ve.filter((l) => i[l] === "wall" || i[l] === "divider").map((l) => {
    const h = {
      id: hs(e, l),
      ...s[l],
      thickness: V
    };
    return i[l] === "divider" ? { ...h, divider: !0 } : h;
  });
}
function hs(e, t) {
  return `area-wall-${e}-${t}`;
}
const it = 26, Cm = 0.75;
function Im(e, t, i, n = Cm) {
  const o = e.find((s) => s.id === t);
  if (!o) return;
  const r = [];
  i !== 2 && r.push({ x: o.x1, y: o.y1, which: 1 }), i !== 1 && r.push({ x: o.x2, y: o.y2, which: 2 });
  const a = [];
  for (const s of e)
    if (s.id !== o.id)
      for (const l of [1, 2]) {
        const h = l === 1 ? s.x1 : s.x2, p = l === 1 ? s.y1 : s.y2, c = r.find((d) => Math.hypot(h - d.x, p - d.y) <= n);
        c && a.push({ id: s.id, end: l, which: c.which, x0: h, y0: p });
      }
  return a.length ? a : void 0;
}
function ds(e, t, i, n) {
  let o = null, r = n;
  for (const a of e) {
    const s = Math.hypot(t - a.x, i - a.y);
    s < r && (r = s, o = { x: a.x, y: a.y });
  }
  return o;
}
function ps(e, t, i, n) {
  const o = e.flatMap((r) => [
    { x: r.x1, y: r.y1 },
    { x: r.x2, y: r.y2 }
  ]);
  return ds(o, t, i, n);
}
function Pm(e, t, i, n, o) {
  const r = e.walls.flatMap((s) => [
    { x: s.x1, y: s.y1 },
    { x: s.x2, y: s.y2 }
  ]), a = (e.areas ?? []).flatMap(
    (s) => s.points.filter((l, h) => !(o && o.areaId === s.id && o.vertexIndex === h)).map((l) => ({ x: l.x, y: l.y }))
  );
  return ds([...r, ...a], t, i, n);
}
function mr(e, t, i) {
  const n = e.areas ?? [];
  for (let o = n.length - 1; o >= 0; o--)
    if (zt(n[o].points, t, i)) return n[o];
}
function Fm(e, t) {
  if (t <= 0) return [];
  const i = io(e);
  if (t === 1) return [i];
  const n = e.map((c) => c.x), o = e.map((c) => c.y), r = Math.min(...n), a = Math.max(...n), s = Math.min(...o), l = Math.max(...o), h = Math.max(a - r, 1), p = Math.max(l - s, 1);
  for (let c = 1; c <= 8; c++) {
    const d = t * c, u = Math.max(1, Math.round(Math.sqrt(d * h / p))), g = Math.max(1, Math.ceil(d / u)), b = h / (u + 1), v = p / (g + 1), m = [];
    for (let $ = 1; $ <= g; $++)
      for (let E = 1; E <= u; E++) {
        const k = r + E * b, S = s + $ * v;
        zt(e, k, S) && m.push({ x: k, y: S });
      }
    if (m.length >= t)
      return Array.from(
        { length: t },
        ($, E) => m[Math.floor(E * m.length / t)]
      );
  }
  return Array.from({ length: t }, (c, d) => {
    const u = d / t * Math.PI * 2, g = Math.min(h, p) * 0.15 * (1 + Math.floor(d / 6));
    return { x: i.x + Math.cos(u) * g, y: i.y + Math.sin(u) * g };
  });
}
function Om(e, t, i, n, o, r, a, s, l = it) {
  if (a) return { x: r(n), y: r(o) };
  const h = ps(e, n, o, l);
  if (h) return h;
  const p = n - t, c = o - i, d = Math.tan(s * Math.PI / 180);
  return Math.abs(c) <= Math.abs(p) * d ? { x: r(n), y: i } : Math.abs(p) <= Math.abs(c) * d ? { x: t, y: r(o) } : { x: r(n), y: r(o) };
}
function Lm(e, t) {
  const i = Math.min(t.x0, t.x1), n = Math.max(t.x0, t.x1), o = Math.min(t.y0, t.y1), r = Math.max(t.y0, t.y1), a = (l, h) => l >= i && l <= n && h >= o && h <= r, s = [];
  for (const l of e.walls)
    a((l.x1 + l.x2) / 2, (l.y1 + l.y2) / 2) && s.push({ kind: "wall", id: l.id });
  for (const l of e.openings) a(l.x, l.y) && s.push({ kind: "opening", id: l.id });
  for (const l of e.items) a(l.x, l.y) && s.push({ kind: "item", id: l.id });
  for (const l of e.texts) a(l.x, l.y) && s.push({ kind: "text", id: l.id });
  for (const l of e.furniture) a(l.x, l.y) && s.push({ kind: "furniture", id: l.id });
  for (const l of e.trackers ?? [])
    a(l.x + l.w / 2, l.y + l.h / 2) && s.push({ kind: "tracker", id: l.id });
  for (const l of e.areas ?? []) {
    const h = io(l.points);
    a(h.x, h.y) && s.push({ kind: "area", id: l.id });
  }
  return s;
}
function zm(e, t, i, n) {
  return {
    walls: e.walls.map((o) => {
      const r = n.get(`wall:${o.id}`);
      return r && r.kind === "wall" ? { ...o, x1: r.x1 + t, y1: r.y1 + i, x2: r.x2 + t, y2: r.y2 + i } : o;
    }),
    openings: e.openings.map((o) => {
      const r = n.get(`opening:${o.id}`);
      return r && r.kind === "pt" ? { ...o, x: r.x + t, y: r.y + i } : o;
    }),
    items: e.items.map((o) => {
      const r = n.get(`item:${o.id}`);
      return r && r.kind === "pt" ? { ...o, x: r.x + t, y: r.y + i } : o;
    }),
    texts: e.texts.map((o) => {
      const r = n.get(`text:${o.id}`);
      return r && r.kind === "pt" ? { ...o, x: r.x + t, y: r.y + i } : o;
    }),
    furniture: e.furniture.map((o) => {
      const r = n.get(`furniture:${o.id}`);
      return r && r.kind === "pt" ? { ...o, x: r.x + t, y: r.y + i } : o;
    }),
    trackers: (e.trackers ?? []).map((o) => {
      const r = n.get(`tracker:${o.id}`);
      return r && r.kind === "pt" ? { ...o, x: r.x + t, y: r.y + i } : o;
    }),
    areas: (e.areas ?? []).map((o) => {
      const r = n.get(`area:${o.id}`);
      return r && r.kind === "polygon" ? { ...o, points: r.points.map((a) => ({ x: a.x + t, y: a.y + i })) } : o;
    })
  };
}
const Dm = [
  "item",
  "text",
  "opening",
  "furniture",
  "wall",
  "tracker",
  // Room polygons are the largest thing on the plan and usually cover
  // everything else in the room, so they pick last — but they *are* in the
  // list, so cycling can still reach them.
  "area"
], ft = {
  wall: 11,
  /** Padding around an item badge / text box so small glyphs stay grabbable. */
  pad: 4
};
function jt(e, t, i, n, o) {
  const r = -(o || 0) * Math.PI / 180, a = e - i, s = t - n;
  return { x: a * Math.cos(r) - s * Math.sin(r), y: a * Math.sin(r) + s * Math.cos(r) };
}
function Rm(e, t, i) {
  const n = i.x2 - i.x1, o = i.y2 - i.y1, r = n * n + o * o;
  if (r === 0) return Math.hypot(e - i.x1, t - i.y1);
  let a = ((e - i.x1) * n + (t - i.y1) * o) / r;
  return a = Math.max(0, Math.min(1, a)), Math.hypot(e - (i.x1 + a * n), t - (i.y1 + a * o));
}
function Nm(e, t, i, n) {
  const o = [], r = (a, s, l, h) => o.push({ sel: { kind: a, id: s }, rank: Dm.indexOf(a), order: l, locked: !!h });
  return e.items.forEach((a, s) => {
    const l = (a.size ?? n.itemSize) / 2 + ft.pad;
    Math.abs(t - a.x) <= l && Math.abs(i - a.y) <= l && r("item", a.id, s, a.locked);
  }), e.texts.forEach((a, s) => {
    const l = a.size ?? n.textSize, h = l * 0.6 * Math.max(1, Wn(n.hass, a).length) / 2 + ft.pad, p = l / 2 + ft.pad, c = jt(t, i, a.x, a.y, a.angle ?? 0);
    Math.abs(c.x) <= h && Math.abs(c.y) <= p && r("text", a.id, s, a.locked);
  }), e.openings.forEach((a, s) => {
    const l = J(a) ? de(a) / 2 : n.wallThickness / 2, h = jt(t, i, a.x, a.y, a.angle ?? 0);
    Math.abs(h.x) <= a.length / 2 && Math.abs(h.y) <= l + ft.pad && r("opening", a.id, s, a.locked);
  }), e.furniture.forEach((a, s) => {
    const l = jt(t, i, a.x, a.y, a.angle ?? 0);
    Math.abs(l.x) <= a.w / 2 && Math.abs(l.y) <= a.h / 2 && r("furniture", a.id, s, a.locked);
  }), e.walls.forEach((a, s) => {
    Rm(t, i, a) <= ft.wall && r("wall", a.id, s, a.locked);
  }), (e.trackers ?? []).forEach((a, s) => {
    const l = jt(t, i, a.x + a.w / 2, a.y + a.h / 2, a.angle ?? 0);
    Math.abs(l.x) <= a.w / 2 && Math.abs(l.y) <= a.h / 2 && r("tracker", a.id, s, a.locked);
  }), (e.areas ?? []).forEach((a, s) => {
    zt(a.points, t, i) && r("area", a.id, s, a.locked);
  }), o.sort((a, s) => Number(a.locked) - Number(s.locked) || a.rank - s.rank || s.order - a.order).map((a) => a.sel);
}
function us(e, t) {
  switch (t.kind) {
    case "wall":
      return e.walls.find((i) => i.id === t.id);
    case "opening":
      return e.openings.find((i) => i.id === t.id);
    case "item":
      return e.items.find((i) => i.id === t.id);
    case "text":
      return e.texts.find((i) => i.id === t.id);
    case "furniture":
      return e.furniture.find((i) => i.id === t.id);
    case "tracker":
      return (e.trackers ?? []).find((i) => i.id === t.id);
    case "area":
      return (e.areas ?? []).find((i) => i.id === t.id);
  }
}
function Wt(e, t) {
  return !!us(e, t)?.locked;
}
function Hm(e, t) {
  return t.filter((i) => {
    const n = us(e, i);
    return !!n && !n.locked;
  });
}
function jm(e, t, i) {
  if (!e.length) return null;
  if (!i || t.length !== 1) return e[0];
  const n = e.findIndex((o) => o.kind === t[0].kind && o.id === t[0].id);
  return n < 0 ? e[0] : e[(n + 1) % e.length];
}
const we = class we {
  constructor(t = {}) {
    this.playing = !1, this._startTime = t.startTime ?? 0, this._endTime = t.endTime ?? Number.MAX_SAFE_INTEGER, this.currentTime = this._startTime, this.speed = this._normalizeSpeed(t.initialSpeed ?? 1);
  }
  get startTime() {
    return this._startTime;
  }
  get endTime() {
    return this._endTime;
  }
  _normalizeSpeed(t) {
    return Number.isFinite(t) ? Math.min(we._MAX_SPEED, Math.max(we._MIN_SPEED, t)) : Number.isNaN(t) ? 1 : we._MAX_SPEED;
  }
  play() {
    this.playing = !0;
  }
  pause() {
    this.playing = !1;
  }
  seek(t) {
    this.currentTime = this._clamp(t);
  }
  rewind(t) {
    this.seek(this.currentTime - t);
  }
  fastForward(t) {
    this.seek(this.currentTime + t);
  }
  setPlaybackSpeed(t) {
    Number.isFinite(t) && (this.speed = Math.min(we._MAX_SPEED, Math.max(we._MIN_SPEED, t)));
  }
  tick(t) {
    if (!this.playing) return;
    const i = t / 1e3;
    this.currentTime = this._clamp(this.currentTime + i * this.speed);
  }
  _clamp(t) {
    return Math.min(this._endTime, Math.max(this._startTime, t));
  }
};
we._MIN_SPEED = 0.01, we._MAX_SPEED = 1e3;
let _i = we, Wm = 0;
class Bm {
  constructor(t) {
    this._card = t, this._historyService = new fl(), this.state = {
      playbackController: new _i(),
      configured: !1,
      enabled: !1,
      ready: !1,
      error: void 0,
      historyEvents: [],
      configuredColorCache: /* @__PURE__ */ new Map(),
      loadRequested: !1,
      startTime: 0,
      endTime: 0,
      logExpanded: !1,
      timelineExpanded: !1,
      speedExpanded: !1,
      historyVisible: !1,
      rangeWarning: void 0,
      loadToken: 0,
      uiLastUpdateFrameMs: 0,
      loopId: void 0,
      lastReplayFrame: void 0,
      panelId: `fp-replay-panel-${Wm++}`
    };
  }
  logReplay(t, i) {
    this._card.getConfig()?.historyReplay?.debug && console.log(t, i ?? {});
  }
  getDefaultWindow() {
    return If(this._card.getConfig());
  }
  normalizeWindow(t, i) {
    return sr(t, i);
  }
  historyService() {
    return this._historyService;
  }
  clearHistoryCache() {
    this._historyService.clearCache();
  }
  syncHistoryServiceContext() {
    this._historyService.configure({
      hass: this._card.getHass(),
      watched: this.watchedEntities()
    });
  }
  watchedEntities() {
    return Pf(this._card.getConfig(), this._card.getActiveFloorId());
  }
  scopeKey() {
    return Ff(this._card.getConfig(), this._card.getActiveFloorId());
  }
  speedForRange(t, i) {
    return Of(this._card.getConfig(), t, i);
  }
  currentTime() {
    return this.state.playbackController.currentTime;
  }
  isHistoryVisible() {
    return this.state.historyVisible;
  }
  isReplayReady() {
    return this.state.ready;
  }
  isReplayEnabled() {
    return this.state.enabled;
  }
  /**
   * Whether the replay panel is on screen: the config offers it, and it is
   * open. Both halves, because a panel that is not rendered can neither be
   * read nor closed -- so nothing behind it may draw on the plan or keep a
   * clock running.
   */
  isReplayShowing() {
    return this._replayOffered() && this.state.historyVisible;
  }
  /** Whether the config puts a replay control on the card at all. */
  _replayOffered() {
    return !!this._card.getConfig()?.historyReplay?.enabled;
  }
  /**
   * Bring replay back in line with a config that no longer offers it.
   *
   * Switching `historyReplay.enabled` off takes the panel off screen but not,
   * on its own, the state behind it: the plan went on rendering history with
   * no control left anywhere to leave it. Called from setConfig, so it also
   * covers the ordinary case of a shut panel, where it just makes sure no
   * clock is ticking against a plan nobody is replaying.
   */
  syncToConfig() {
    this.isReplayShowing() || (this.state.historyVisible = !1, this.state.playbackController.pause(), this.stopReplayLoop());
  }
  /**
   * What the plan should draw from: history at `currentTime`, or the live
   * states Home Assistant is pushing.
   *
   * The panel being open is the whole answer. Closed, replay is not a mode the
   * plan is quietly in -- it is off, whatever the controller has loaded and
   * wherever the head happens to sit, so a plan nobody has asked to rewind is
   * indistinguishable from one with the feature switched off entirely.
   *
   * "Open" means on screen, which takes the config as well as the panel --
   * see {@link isReplayShowing}.
   *
   * Deliberately blunt, because the subtle version kept failing. Replay leaked
   * into a live plan through any path that started it without anyone opening
   * the panel -- switching floors was enough, and that path parked the head at
   * the *start* of the window rather than the end -- and the symptom was
   * silent: every watched entity with a recorded state drew from an hour ago,
   * so lights that were on drew off and a presence sensor that was tripping
   * drew still, while a light toggled from the plan really did switch, because
   * the service call is live either way. Nothing on a closed panel said why
   * (issue #256).
   */
  getRenderState() {
    return {
      enabled: this.isReplayShowing() && this.state.enabled,
      currentTime: this.state.playbackController.currentTime,
      historyVisible: this.state.historyVisible
    };
  }
  clearConfigColorCache() {
    this.state.configuredColorCache.clear();
  }
  pausePlayback() {
    this.state.playbackController.pause();
  }
  formatReplayTime(t) {
    return Nf(t, new Intl.DateTimeFormat(void 0, {
      dateStyle: "short",
      timeStyle: "medium"
    }));
  }
  handleRangeChange(t, i) {
    const n = i.target, o = Lf(n.value);
    t === "start" ? this.state.startTime = o : this.state.endTime = o, this.updateWindow(this.state.startTime, this.state.endTime);
  }
  updateWindow(t, i) {
    const { start: n, end: o } = sr(t, i), r = o - n;
    this.state.rangeWarning = r < 60 ? "Very small replay window may hide expected transitions." : void 0;
    const a = this.state.playbackController.playing;
    this.state.startTime = n, this.state.endTime = o, this.clearHistoryCache(), this.state.playbackController.pause(), this.stopReplayLoop(), this._card.requestUpdate(), !(!this._card.getHass() || !this.state.historyVisible) && this.startReplay({ preserveCurrentTime: !0, keepPlaying: a });
  }
  resetForFloorChange() {
    this.state.historyEvents = [], this.state.enabled = !1, this.state.ready = !1, this.state.error = void 0, this.state.loadRequested = !1, this.state.loadToken += 1, this.clearHistoryCache(), this.stopReplayLoop(), this._card.requestUpdate(), this._card.getHass() && this.state.historyVisible && this.startReplay({ preserveCurrentTime: !0, keepPlaying: this.state.playbackController.playing });
  }
  zoomWindow(t) {
    const i = Math.max(60, this.state.endTime - this.state.startTime), n = this.state.playbackController.currentTime, o = t > 0 ? Math.max(60, i * 0.8) : i * 1.25, r = o / 2, a = Math.max(0, n - r), s = a + o;
    this.updateWindow(a, s);
  }
  /**
   * Opening and closing the panel is the whole of turning replay on and off.
   *
   * There is no separate enable switch and no button back to now, because
   * those used to be separate questions whose answers could disagree: the plan
   * could be showing an hour ago with nothing on screen saying so. Opening
   * loads the window and parks the head at its start, so replay begins where
   * the calendar says it does; closing stops the clock and hands the plan back
   * to Home Assistant.
   *
   * Closing is not a teardown. The window and its events stay loaded, so
   * reopening on the same range costs no second history fetch -- it just
   * cannot reach the plan while the panel is shut (see {@link getRenderState}).
   */
  toggleHistoryVisible(t) {
    const i = t && this._replayOffered();
    if (this.state.historyVisible = i, !i) {
      this.state.playbackController.pause(), this.stopReplayLoop(), this.logReplay("[easy-floorplan] Replay closed, plan is live"), this._card.requestUpdate();
      return;
    }
    this._card.requestUpdate(), this._card.getHass() && this.startReplay();
  }
  toggleSpeedPanel() {
    this.state.speedExpanded = !this.state.speedExpanded, this._card.requestUpdate();
  }
  toggleTimeline() {
    this.state.timelineExpanded = !this.state.timelineExpanded, this._card.requestUpdate();
  }
  toggleLog() {
    this.state.logExpanded = !this.state.logExpanded, this._card.requestUpdate();
  }
  async startReplay(t = {}) {
    if (!this._card.getHass() || !this._card.getConfig()?.historyReplay) return;
    const i = this.state.startTime || this.getDefaultWindow().start, n = this.state.endTime || this.getDefaultWindow().end, { start: o, end: r } = this.normalizeWindow(i, n);
    this.state.startTime = o, this.state.endTime = r, this.state.enabled = !0, this.state.loadRequested = !0, this.state.error = void 0, this.state.ready = !1;
    const a = t.preserveCurrentTime ? Math.min(r, Math.max(o, this.state.playbackController.currentTime)) : o;
    this.state.playbackController = new _i({
      startTime: o,
      endTime: r,
      initialSpeed: this.speedForRange(o, r)
    }), this.state.playbackController.seek(a), t.keepPlaying && this.state.playbackController.play();
    const s = ++this.state.loadToken;
    this.logReplay("[easy-floorplan] Starting replay", { start: o, end: r, lookback: r - o }), await this.loadReplayRange(o, r, s), t.keepPlaying && this.state.enabled && this.state.playbackController.playing && this.startReplayLoop(), this._card.requestUpdate();
  }
  async loadReplayRange(t, i, n) {
    try {
      const o = this.scopeKey();
      if (await this._historyService.loadHistory(t, i, { scopeKey: o, hass: this._card.getHass(), watched: this.watchedEntities(), numericSteps: this._card.getConfig()?.historyReplay?.numericSteps }), n !== this.state.loadToken) return;
      const r = new Set(this.watchedEntities()), a = this._historyService.getEvents();
      this.state.historyEvents = a.filter((s) => r.has(s.entityId)).map((s) => ({
        ...s,
        color: Rf(s, this._card.getConfig(), this._card.getHass(), this.state.configuredColorCache, this.state.configured)
      })), this.state.ready = !0, this.state.loadRequested = !1, this.state.error = void 0, this.logReplay("[easy-floorplan] Replay history loaded", { eventCount: this.state.historyEvents.length }), this._card.requestUpdate();
    } catch (o) {
      if (n !== this.state.loadToken) return;
      this.state.ready = !1, this.state.loadRequested = !1, this.state.error = o instanceof Error ? o.message : "Unable to load history.", console.error("[easy-floorplan] Replay history loading failed", o);
    }
  }
  seekReplay(t) {
    this.state.playbackController.seek(t), this.logReplay("[easy-floorplan] Replay seek", { timestamp: t }), this._card.requestUpdate();
  }
  jumpReplay(t) {
    this.state.playbackController.seek(this.state.playbackController.currentTime + t), this.logReplay("[easy-floorplan] Replay jump", { seconds: t }), this._card.requestUpdate();
  }
  stepReplay(t) {
    if (!this.state.historyEvents.length) return;
    const i = this.state.playbackController.currentTime, n = 1e-4, o = t > 0 ? this._historyService.getEventAfter(i + n) : this._historyService.getEventBefore(i - n);
    o ? this.state.playbackController.seek(o.timestamp) : this.state.playbackController.seek(t > 0 ? this.state.playbackController.endTime : this.state.playbackController.startTime), this._card.requestUpdate();
  }
  setReplaySpeed(t) {
    this.state.playbackController.setPlaybackSpeed(t), this.logReplay("[easy-floorplan] Replay speed", { speed: t }), this._card.requestUpdate();
  }
  playReplay() {
    if (!this.state.enabled) {
      this.startReplay({ preserveCurrentTime: !0, keepPlaying: !0 });
      return;
    }
    if (!this.state.ready) {
      const t = this.state.startTime || this.state.playbackController.startTime, i = this.state.endTime || this.state.playbackController.endTime;
      this.loadReplayRange(t, i, ++this.state.loadToken);
    }
    this.state.playbackController.currentTime >= this.state.playbackController.endTime && this.state.playbackController.seek(this.state.playbackController.startTime), this.state.playbackController.play(), this.startReplayLoop(), this.logReplay("[easy-floorplan] Replay play", { currentTime: this.state.playbackController.currentTime }), this._card.requestUpdate();
  }
  pauseReplay() {
    this.state.playbackController.pause(), this.stopReplayLoop(), this.logReplay("[easy-floorplan] Replay pause", { currentTime: this.state.playbackController.currentTime }), this._card.requestUpdate();
  }
  startReplayLoop() {
    if (this.state.loopId) return;
    this.state.lastReplayFrame = void 0, this.state.uiLastUpdateFrameMs = 0;
    const t = (i) => {
      if (this.state.playbackController.playing && (this.state.lastReplayFrame === void 0 ? this.state.lastReplayFrame = i : (this.state.playbackController.tick(i - this.state.lastReplayFrame), this.state.lastReplayFrame = i, (this.state.uiLastUpdateFrameMs === 0 || i - this.state.uiLastUpdateFrameMs >= 50) && (this.state.uiLastUpdateFrameMs = i, this._card.requestUpdate())), this.state.playbackController.currentTime >= this.state.playbackController.endTime)) {
        this.pauseReplay();
        return;
      }
      this.state.loopId = window.requestAnimationFrame(t);
    };
    this.state.loopId = window.requestAnimationFrame(t);
  }
  stopReplayLoop() {
    this.state.loopId && (window.cancelAnimationFrame(this.state.loopId), this.state.loopId = void 0), this.state.lastReplayFrame = void 0;
  }
  requestUpdate() {
    this._card.requestUpdate();
  }
}
var Um = Object.defineProperty, qm = Object.getOwnPropertyDescriptor, st = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? qm(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Um(t, i, o), o;
};
const gr = /* @__PURE__ */ new Map();
function yr(e) {
  return e.map((t) => t.id).join("|");
}
let se = class extends Te {
  constructor() {
    super(...arguments), this._focusTimerMs = 0, this._wallMaskId = `fp-wall-mask-${se._nextWallMaskId++}`, this._openingTween = new Yf(Vf, () => this.requestUpdate()), this._glowIdBase = `fp-glow-${se._nextGlowId++}`, this._watchedEntities = /* @__PURE__ */ new Set(), this._nameEntities = /* @__PURE__ */ new Set(), this._replayController = new Bm({
      getConfig: () => this._config,
      getHass: () => this.hass,
      getActiveFloorId: () => this._activeFloorId,
      requestUpdate: () => this.requestUpdate()
    }), this._onOrientation = (e) => {
      this._portrait = e.matches;
    }, this._onPlanKey = (e) => {
      e.key === "ArrowRight" || e.key === "ArrowDown" ? (e.preventDefault(), this._stepFocus(1)) : e.key === "ArrowLeft" || e.key === "ArrowUp" ? (e.preventDefault(), this._stepFocus(-1)) : e.key === "Escape" && this._zoomedAreaId !== void 0 && (e.preventDefault(), this._zoomedAreaId = void 0, this._restartFocusTimer());
    }, this._onCardActivity = () => {
      this._focusTimer && this._restartFocusTimer();
    }, this._featuresOf = (e) => this.hass?.states[e]?.attributes?.supported_features ?? 0;
  }
  _syncHistoryServiceContext() {
    this._replayController.syncHistoryServiceContext();
  }
  _replayCacheKey() {
    const e = this._config?.historyReplay;
    return JSON.stringify([
      e?.enabled ?? !1,
      e?.lookbackSeconds ?? null,
      e?.defaultSpeed ?? null,
      [...this._watchedEntities].sort()
    ]);
  }
  connectedCallback() {
    if (super.connectedCallback(), typeof window > "u" || !window.matchMedia) return;
    const e = window.matchMedia("(orientation: portrait)");
    this._onOrientation(e), this._unsubscribeOrientation = tf(e, this._onOrientation);
  }
  setConfig(e) {
    if (!e || typeof e != "object") throw new Error("Invalid configuration");
    const t = e;
    for (const n of ["walls", "openings", "items", "texts", "furniture", "trackers", "areas", "floors"])
      if (t[n] != null && !Array.isArray(t[n]))
        throw new Error(`Invalid configuration: "${n}" must be a list`);
    for (const n of ["width", "height", "grid", "rotation", "rotationPortrait", "rotationLandscape", "wallHeight", "wallOpacity"])
      if (t[n] != null && typeof t[n] != "number")
        throw new Error(`Invalid configuration: "${n}" must be a number`);
    this._config = {
      ...e,
      width: e.width ?? le,
      height: e.height ?? ge,
      walls: e.walls ?? [],
      openings: e.openings ?? [],
      items: e.items ?? [],
      texts: e.texts ?? [],
      furniture: e.furniture ?? []
    }, this._watchedEntities = tt(this._config), this._nameEntities = Jp(this._config), this._syncHistoryServiceContext(), this._replayController.clearConfigColorCache();
    const i = this._replayCacheKey();
    if (i !== this._lastReplayCacheKey && (this._lastReplayCacheKey = i, this._replayController.historyService().clearCache()), this._replayController.syncToConfig(), !this._activeFloorId) {
      const n = $e(this._config), o = gr.get(yr(n));
      o && n.some((r) => r.id === o) && (this._activeFloorId = o);
    }
  }
  /**
   * HA pushes a fresh `hass` on every state change anywhere in the instance —
   * for most updates nothing on this plan moved. Skip those renders entirely.
   */
  shouldUpdate(e) {
    if (!(e.size === 1 && e.has("hass"))) return !0;
    const t = e.get("hass");
    if (!t || !this.hass || ra(t, this.hass, this._watchedEntities)) return !0;
    for (const i of this._nameEntities)
      if (t.states[i] !== this.hass.states[i]) return !0;
    return !1;
  }
  /**
   * Carry the skin as an attribute on the host, where `skinPalettes` picks it
   * up (issue #155). It has to be the host and not the template, because the
   * point is to sit *above* the `<ha-card>` a card-mod rule targets — see
   * skins.ts. Only ever a `findSkin` match, so an unrecognised `skin:` puts no
   * attribute on the element at all.
   */
  willUpdate(e) {
    if (!e.has("_config")) return;
    const t = al(this._config?.skin);
    t ? this.setAttribute("data-skin", t) : this.removeAttribute("data-skin");
  }
  updated(e) {
    super.updated(e), (e.has("hass") || e.has("_activeFloorId")) && this._syncHistoryServiceContext();
    const t = Be(this._config?.roomFocus)?.intervalMs ?? 0;
    t ? (!this._focusTimer || t !== this._focusTimerMs) && this._restartFocusTimer() : this._stopFocusTimer();
  }
  getCardSize() {
    return 6;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => Ig), document.createElement("easy-floorplan-card-editor");
  }
  static getStubConfig() {
    return Sl();
  }
  /**
   * Sections-view sizing (grid rows ≈ 56px): room for the 5:3 default canvas.
   * An instance method — HA calls it on the card element (getConfigElement /
   * getStubConfig are the static ones, called before any instance exists).
   */
  getGridOptions() {
    return { columns: 12, rows: 8, min_columns: 6, min_rows: 4 };
  }
  _isOn(e, t) {
    return Ee(e.entity, t?.states[e.entity]?.state);
  }
  /** How far open an opening should be drawn (0..1), from its entity (or default). */
  _openingAmount(e, t) {
    const i = e.entity ? t?.states[e.entity] : void 0;
    return nt(e, i);
  }
  /** Whether an opening wears its accent: drawn open, or a cover still in transit. */
  _openingActive(e, t) {
    const i = e.entity ? t?.states[e.entity] : void 0;
    return mn(e, i);
  }
  /**
   * The second leaf's own state for an opening with a sensor on each — a
   * two-panel slider (issue #145) or a hinged double (issue #159).
   * `undefined` — no second sensor, or a shape with only one leaf — leaves both
   * on the first entity, so nothing about a single-sensor opening changes.
   */
  _openingSecond(e, t) {
    if (!e.secondaryEntity || !_t(e)) return;
    const i = Pa(e), n = t?.states[e.secondaryEntity];
    return { amount: nt(i, n), active: mn(i, n) };
  }
  /**
   * The same for a hinged shutter's other panel (issue #159). Read from its
   * own key and its own resolvers — the shutter answers to `shutterInvert` and
   * is drawn from `shutterAmount` / `shutterActive`, not the sash's — and only
   * for a `swing` shutter, since a roll curtain has no second panel to drive.
   */
  _shutterSecond(e, t) {
    if (!e.shutterSecondaryEntity || We(e) !== "swing") return;
    const i = t?.states[e.shutterSecondaryEntity];
    return {
      amount: xe(i, e.shutterInvert),
      active: Vt(i, e.shutterInvert)
    };
  }
  _itemIcon(e, t) {
    return pn(
      e,
      t?.states[e.entity],
      this.hass?.entities?.[e.entity]?.icon
    );
  }
  /** The floor on show: the chosen one, the configured default, or the first. */
  _activeFloor(e) {
    const t = $e(e);
    return t.find((i) => i.id === this._activeFloorId) ?? t.find((i) => i.id === e.defaultFloor) ?? t[0];
  }
  /**
   * Walk the zoom to the next room (issue #261). The plan-zoom transition
   * animates the move, so the view travels rather than cutting — and under the
   * isometric view it frames the room where it is drawn.
   */
  _stepFocus(e) {
    const t = this._config;
    if (!t) return;
    const i = Be(t.roomFocus), n = dr(this._activeFloor(t).areas, i);
    n.length && (this._zoomedAreaId = Qf(n, this._zoomedAreaId, e), this._restartFocusTimer());
  }
  /**
   * Start the dwell again from now.
   *
   * Called on every step and on any use of the card, which is what keeps a
   * cycling plan from moving out from under someone mid-tap: the tour only
   * advances once the card has been left alone for a whole interval.
   */
  _restartFocusTimer() {
    this._stopFocusTimer();
    const e = Be(this._config?.roomFocus)?.intervalMs ?? 0;
    !e || !this.isConnected || (this._focusTimerMs = e, this._focusTimer = setTimeout(() => {
      this._focusTimer = void 0, this._stepFocus(1);
    }, e));
  }
  _stopFocusTimer() {
    this._focusTimer && clearTimeout(this._focusTimer), this._focusTimer = void 0;
  }
  _label(e, t) {
    return e.name ?? t?.states[e.entity]?.attributes?.friendly_name ?? e.entity ?? "";
  }
  disconnectedCallback() {
    this._replayController.stopReplayLoop(), this._openingTween.stop(), this._stopFocusTimer(), this._unsubscribeOrientation?.(), this._unsubscribeOrientation = void 0, super.disconnectedCallback();
  }
  _handleItemAction(e, t) {
    this.hass && Qe(this, this.hass, t, Xr(t, e.detail.action));
  }
  /** What a gesture on this opening would do, if anything. */
  _openingPress(e, t) {
    return Qn(e, t, this._featuresOf);
  }
  /**
   * Pressing an opening (issue #74 follow-up). Which entity answers — the
   * window/door or its shutter — is {@link openingActionForGesture}'s call;
   * from here it is the same Lovelace dispatch every device uses.
   */
  _onOpeningAction(e, t) {
    if (!this.hass) return;
    const i = this._openingPress(t, e.detail.action);
    i && Qe(this, this.hass, { entity: i.entity }, i.config);
  }
  /**
   * The shutter badge (issue #74 follow-up): the shutter entity's own icon,
   * beside an opening that binds both a window/door and a shutter.
   *
   * HTML rather than SVG, like the device badges: it holds a real `ha-icon`.
   * And like them it follows `overlayScale` (#148) — fixed pixels by default,
   * so it stays legible whatever canvas units the author chose, or canvas
   * units under `plan`, so it shrinks with the drawing instead of towering
   * over a scaled-down one. Both offsets follow the same choice, or the badge
   * would drift off the opening at one scale and sit on it at another.
   *
   * The glyph carries the open/closed reading on its own — HA's shutter icons
   * come in pairs — and the accent says the same thing again in colour.
   *
   * Tapping it opens the shutter, whatever the opening's own tap does. That is
   * the point of drawing it: the entity the opening symbol does not lead with
   * gets a control of its own, instead of living behind a press-and-hold
   * nobody can see.
   */
  /**
   * The frame the plan is displayed in: rotated (issue #33), then projected
   * (issue #261). The SVG's transforms, every overlay anchor and the zoom's
   * framing all come from this one description, so the layers cannot drift
   * apart.
   */
  _frame(e, t) {
    const i = gn(I(e.width, le), I(e.height, ge), t);
    return {
      w: i.w,
      h: i.h,
      projection: cn(e.view ?? e.projection),
      wallHeight: ta(e.wallHeight),
      padding: 2 + Math.max(V, ...$e(e).flatMap((n) => n.walls.map((o) => dn(o.thickness))))
    };
  }
  /**
   * A plan point on the displayed canvas, with that canvas's size — what an
   * overlay anchor's left/top percentages are taken against.
   */
  _display(e, t, i, n) {
    const o = this._frame(i, n), r = Zt(e, t, i.width, i.height, n);
    return { p: na(r.x, r.y, o), d: hn(o) };
  }
  /** A screen-space direction out of the rotated frame, turned by the projection as well. */
  _displayDirection(e, t, i) {
    return Up(e.x, e.y, this._frame(t, i));
  }
  /** Both views read opening paint and travel through this replay-aware source. */
  _openingStyle(e, t) {
    const i = this._openingAmount(e, t), n = e.shutterEntity ? t?.states[e.shutterEntity] : void 0;
    return {
      color: Pn,
      // The closed tone (issue #228). Absent, the moving parts stay
      // the wall colour, which is what a closed opening always was —
      // and that is also what an opening whose contact has dropped
      // out falls back to, so a dead sensor does not draw the same
      // emphatic "shut" as a door that really is (issue #162).
      // Guarded on `hass` for the same reason the device path is:
      // before the first states arrive every opening would read as
      // offline and the closed colour would flash off on load.
      inactive: this.hass && un(e, e.entity ? t?.states[e.entity]?.state : void 0) ? void 0 : e.inactiveColor,
      open: i > 0,
      amount: i,
      active: this._openingActive(e, t),
      accent: e.activeColor ?? U,
      // Per-leaf state for a two-sensor biparting slider (issue #145).
      second: this._openingSecond(e, t),
      // External roller shutter layer (issue #74). No entity bound
      // yet → previewed shut, like a static plan.
      shutter: e.shutterEntity ? {
        amount: xe(n, e.shutterInvert),
        active: Vt(n, e.shutterInvert),
        style: We(e),
        // The shutter's own accent, falling back to the
        // opening's and then to the skin's.
        accent: e.shutterActiveColor ?? e.activeColor ?? U,
        flip: e.shutterFlipV,
        // Per-panel state for a two-contact hinged shutter
        // (issue #159).
        second: this._shutterSecond(e, t)
      } : void 0
    };
  }
  /**
   * The same style with every travelling number eased rather than jumped
   * (issue #261 review). One key per panel that moves on its own, so the two
   * leaves of a double door and a shutter over them each keep their own clock.
   *
   * `open` is recomputed from the eased travel: a door closing is still a door
   * that is open, and dropping its panels at the first frame of the movement
   * is the jump this exists to remove.
   */
  _travelling(e, t) {
    const i = (r, a) => this._openingTween.value(`${e.id}:${r}`, a), n = i("leaf", t.amount ?? (t.open === !1 ? 0 : 1)), o = t.shutter;
    return {
      ...t,
      amount: n,
      open: n > 0,
      second: t.second ? { ...t.second, amount: i("leaf2", t.second.amount) } : void 0,
      shutter: o ? {
        ...o,
        amount: i("shutter", o.amount),
        second: o.second ? { ...o.second, amount: i("shutter2", o.second.amount) } : void 0
      } : void 0
    };
  }
  /**
   * The isometric view's standing geometry (issue #261): walls as extruded
   * boxes, cut at their doors and lowered to a sill under their windows, and
   * furniture as blocks with the plan's own glyph on top. Drawn in the
   * rotated frame, between the floor layers and the sun dimming, and painted
   * back to front so a wall hides what stands behind it.
   */
  _renderIsoLayer(e, t, i, n, o, r, a, s, l, h) {
    this._openingTween.setDuration(
      h && !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? as : 0
    );
    const p = (m, $) => Zt(m, $, i.width, i.height, n), c = t.map((m) => {
      const $ = p(m.x1, m.y1), E = p(m.x2, m.y2);
      return { id: m.id, x1: $.x, y1: $.y, x2: E.x, y2: E.y, thickness: dn(m.thickness) };
    }), d = e.openings.map((m) => {
      const $ = p(m.x, m.y);
      return { x: $.x, y: $.y, length: m.length, angle: m.angle + n, type: m.type };
    }), u = Vp(c, d, o.wallHeight, !1);
    for (const m of e.openings)
      u.push(...qf(m, this._travelling(m, this._openingStyle(m, l)), p, o.wallHeight));
    const g = o.wallHeight * Np, b = Gp(g, n);
    for (const m of e.furniture)
      u.push(
        Xp(
          m,
          p,
          g,
          s(m),
          _`<g transform=${r || f}>
                <g transform="translate(${b.x} ${b.y})">${a(m)}</g>
              </g>`
        )
      );
    const v = new Map(e.openings.map((m) => [m.id, m]));
    return Zp(u, (m, $) => {
      if (m.kind !== "panel" && m.kind !== "opening-hit") return $;
      const E = v.get(m.id);
      if (!E || !Yo(E, this._featuresOf)) return $;
      const k = m.kind === "opening-hit";
      return _`<g class="fp-iso-opening-button"
          role=${k ? "button" : f} tabindex=${k ? "0" : f}
          aria-label=${k ? E.entity ? l?.states[E.entity]?.attributes?.friendly_name ?? E.entity : E.shutterEntity ?? E.type : f}
          @action=${(S) => this._onOpeningAction(S, E)}
          .actionHandler=${Ne({
        hasHold: me(this._openingPress(E, "hold")?.config),
        hasDoubleClick: me(this._openingPress(E, "double_tap")?.config)
      })}>${$}</g>`;
    });
  }
  _renderShutterMark(e, t, i, n, o) {
    const r = e.shutterEntity, a = o?.states[r], s = xe(a, e.shutterInvert) > 0, l = Vt(a, e.shutterInvert), h = Da(e, a, s, this.hass?.entities?.[r]?.icon), p = L(e.shutterActiveColor ?? e.activeColor) ?? U, c = eo(e), { p: d, d: u } = this._display(c.x, c.y, t, i), g = this._displayDirection(Jn(e, i), t, i), b = B(ui, n), v = `translate(calc(${g.x} * ${b}), calc(${g.y} * ${b}))`, m = B(fi, n), $ = o?.states[r]?.attributes?.friendly_name ?? r;
    return y`
      <div
        class="shutter-mark ${l ? "on" : "off"}"
        data-entity=${Ce(r) ?? f}
        style="left:${d.x / u.w * 100}%; top:${d.y / u.h * 100}%;
               width:${m};height:${m};
               transform:translate(-50%,-50%) ${v};--fp-active:${p};"
        title="${$} · ${Tt(o, r)}"
        role="button"
        tabindex="0"
        @action=${() => {
      this.hass && Qe(this, this.hass, { entity: r }, { action: "more-info" });
    }}
        .actionHandler=${Ne({})}
      >
        <ha-icon
          icon=${h}
          style="--mdc-icon-size:${B(mi, n)};"
        ></ha-icon>
      </div>
    `;
  }
  /**
   * The opening's own badge (issue #154 follow-up) — the same circle as the
   * shutter's, for the entity the opening symbol itself draws.
   *
   * Opt-in, because most symbols need no help: a leaf that has swung and a
   * panel that has slid are both still on screen, in the accent, saying so. A
   * roll-up is the one that isn't — its curtain leaves the floor plane, and
   * wide open the gap holds a single coloured line. That line is honest and
   * easy to miss, so this puts the entity's own open/closed glyph beside it.
   *
   * It sits on the far side of the wall from the shutter's badge, which is
   * what keeps the two from stacking on an opening that draws both.
   */
  _renderOpeningMark(e, t, i, n, o) {
    const r = e.entity, a = o?.states[r], s = this._openingAmount(e, o) > 0, l = this._openingActive(e, o), h = Na(e, a, s, this.hass?.entities?.[r]?.icon), p = L(e.activeColor) ?? U, c = Ha(e), { p: d, d: u } = this._display(c.x, c.y, t, i), g = this._displayDirection(ja(e, i), t, i), b = B(ui, n), v = `translate(calc(${g.x} * ${b}), calc(${g.y} * ${b}))`, m = B(fi, n), $ = o?.states[r]?.attributes?.friendly_name ?? r;
    return y`
      <div
        class="shutter-mark ${l ? "on" : "off"}"
        data-entity=${Ce(r) ?? f}
        style="left:${d.x / u.w * 100}%; top:${d.y / u.h * 100}%;
               width:${m};height:${m};
               transform:translate(-50%,-50%) ${v};--fp-active:${p};"
        title="${$} · ${Tt(o, r)}"
        role="button"
        tabindex="0"
        @action=${() => {
      this.hass && Qe(this, this.hass, { entity: r }, { action: "more-info" });
    }}
        .actionHandler=${Ne({})}
      >
        <ha-icon
          icon=${h}
          style="--mdc-icon-size:${B(mi, n)};"
        ></ha-icon>
      </div>
    `;
  }
  /**
   * Switch to a floor, from the switcher or from a staircase (issue #121).
   *
   * Shared so the two cannot drift apart on the things that are easy to
   * forget: remembering the choice for the next preview the editor builds, and
   * dropping a zoom that belonged to the floor being left.
   */
  _goToFloor(e, t) {
    const i = this._activeFloorId === t;
    this._activeFloorId = t, gr.set(yr(e), t), this._zoomedAreaId = void 0, !(i || !this.hass || !this._config?.historyReplay?.enabled) && this._replayController.resetForFloorChange();
  }
  /** Tapping a room zooms the plan in to it; tapping the same room again zooms back out. */
  _onAreaClick(e) {
    this._zoomedAreaId = this._zoomedAreaId === e.id ? void 0 : e.id;
  }
  /**
   * A gesture on a room (issue #181): its configured action, or — for a tap
   * with nothing configured — the zoom the room has always done.
   *
   * The fallback is what keeps this backwards compatible. Every plan drawn
   * before areas had actions has three unset gestures, so every tap still
   * zooms and hold and double-tap still do nothing.
   */
  _onAreaAction(e, t) {
    const i = Xt(t, e.detail.action);
    if (!i) {
      e.detail.action === "tap" && this._onAreaClick(t);
      return;
    }
    this.hass && Qe(this, this.hass, { entity: i.entity }, i.config);
  }
  /**
   * A gesture on a piece of furniture (issue #284): its configured action, or —
   * for a tap with nothing configured — the floor change it already did.
   *
   * The same shape as `_onAreaAction`, and for the same reason: every plan
   * drawn before furniture had actions has three unset gestures, so a
   * staircase still changes floor on tap and nothing else answers at all.
   */
  _onFurnitureAction(e, t, i, n) {
    const o = xt(t, e.detail.action);
    if (!o) {
      e.detail.action === "tap" && n && this._goToFloor(i, n);
      return;
    }
    this.hass && Qe(this, this.hass, { entity: o.entity }, o.config);
  }
  _renderBadge(e, t, i) {
    const n = I(e.size, je), o = B(n, t), r = e.entity ? i?.states[e.entity] : void 0, a = xa(e, r?.state, r?.attributes), s = Ct(e) === "value" ? Aa(i, e) : void 0;
    return y`
      <div
        class="badge"
        style="width:${o};height:${o};transform:rotate(${I(e.angle, 0)}deg);"
      >
        ${s ? y`<span
              class="badge-value"
              style="font-size:${B(Ca(n, s), t)};"
              >${s}</span
            >` : y`<ha-icon
              class=${a ? `anim-${a}` : ""}
              icon=${this._itemIcon(e, i)}
              style="--mdc-icon-size:${B(Sa(n), t)};"
            ></ha-icon>`}
      </div>
    `;
  }
  /**
   * Start the ink ripple at the point that was actually touched (issue #134).
   * Positions are real screen pixels off the event, so they are unaffected by
   * overlayScale — the ink lands where the finger did at any plan scale.
   *
   * The position cannot come from CSS — only the event knows where the finger
   * landed — so it is handed over as two custom properties and the animation
   * itself stays in the stylesheet.
   *
   * Restarting needs the reflow: re-adding a class whose animation is still
   * running is a no-op, so a quick second tap would draw nothing at all.
   * Listeners are passive and only write style, so the gesture detection in
   * `actionHandler` is untouched.
   */
  _startInk(e) {
    const t = e.currentTarget, i = t?.querySelector(".press-ink");
    if (!i) return;
    const n = t.getBoundingClientRect();
    i.style.setProperty("--fp-ink-x", `${e.clientX - n.left}px`), i.style.setProperty("--fp-ink-y", `${e.clientY - n.top}px`), i.classList.remove("inking"), i.offsetWidth, i.classList.add("inking");
  }
  _renderItem(e, t, i, n, o) {
    const r = this._isOn(e, o), a = fa(o, e), s = e.entity ? o?.states[e.entity] : void 0, l = Yn(e, s), h = L(Oi(e.stateColor, l)), p = ga(e, h), c = !!this.hass && un(e, s?.state), d = cu(e, s?.state, o), u = Ct(e) !== "none", g = e.display ?? "badge", b = sa(s), v = L(e.activeColor) ?? b, m = r || c ? void 0 : L(e.inactiveColor), $ = e.rippleColor ?? h ?? e.activeColor ?? b ?? U, E = Or(
      Jt(
        h ?? (r ? v : m),
        this._config?.palette
      )
    ), k = e.rippleSize ?? Ti, A = nf(e.rippleDirection ?? Ci, i) * Math.PI / 180, T = this._displayDirection({ x: Math.sin(A), y: -Math.cos(A) }, t, i), P = (Math.atan2(T.x, -T.y) * 180 / Math.PI + 360) % 360, D = e.rippleWidth ?? Ii, H = d ? "visibility: hidden; pointer-events: none;" : "";
    let j = f;
    g === "ripple" ? j = y`<span style="${H}">
        ${bi(r, $, k, P, D, 3, n)}
      </span>` : g === "iconRipple" ? j = y`<div class="stack" style="${H}">
        ${bi(r, $, k, P, D, 3, n)}
        ${u ? y`<div class="stack-icon">${this._renderBadge(e, n, o)}</div>` : f}
      </div>` : u && (j = y`<span style="${H}">
        ${this._renderBadge(e, n, o)}
      </span>`);
    const { p: ne, d: ee } = this._display(e.x, e.y, t, i), x = Mp(e);
    return y`
      <div
        class="item fp-item ${r ? "on" : "off"} ${c ? "offline" : ""} ${h ? "state-colored" : ""} ${m ? "inactive-colored" : ""} ${x ? "interactive" : ""}"
        data-id=${re(e.id) ?? f}
        data-entity=${Ce(e.entity) ?? f}
        data-kind=${re(e.kind) ?? f}
        style="left:${ne.x / ee.w * 100}%; top:${ne.y / ee.h * 100}%;${h ? `--fp-state:${h};` : ""}${v ? `--fp-active:${v};` : ""}${m ? `--fp-inactive:${m};` : ""}${E ? `--fp-ink:${E};` : ""}"
        title=${this._label(e, o)}
        role=${x ? "button" : f}
        tabindex=${x ? "0" : f}
        @action=${(z) => this._handleItemAction(z, e)}
        .actionHandler=${Ne({
      hasHold: me(e.hold_action),
      hasDoubleClick: me(e.double_tap_action),
      // Unbinds the gesture listeners outright, so keyboard activation
      // cannot reach an action that would do nothing.
      disabled: !x
    })}
        @pointerdown=${x && Gt(t) === "ripple" ? (z) => this._startInk(z) : f}
      >
        ${j}
        ${x && Gt(t) === "ripple" ? y`<span class="press-ink" aria-hidden="true"></span>` : f}
        ${a ? y`<span
              class="label ${j === f ? "inflow" : ""} label-${Xn(e)}"
              style="font-size:${B(ma(e.labelSize), n)};${p ? `color:${p};` : ""}"
              >${a}</span
            >` : f}
      </div>
    `;
  }
  _renderAreaLabel(e, t, i, n) {
    if (!e.name || (e.showName ?? !0) === !1) return f;
    const o = Sf(e.points), { p: r, d: a } = this._display(o.x, o.y, t, i), s = fu(e.labelSize, n);
    return y`
      <div
        class="area-label"
        style="left:${r.x / a.w * 100}%; top:${r.y / a.h * 100}%;${s}"
      >
        ${e.name}
      </div>
    `;
  }
  _renderText(e, t, i, n) {
    const { p: o, d: r } = this._display(e.x, e.y, t, i);
    return y`
      <div
        class="text fp-text"
        data-id=${re(e.id) ?? f}
        style="left:${o.x / r.w * 100}%; top:${o.y / r.h * 100}%;
               font-size:${B(I(e.size, vt), n)};
               color:${ae(e.color, zr)};
               transform:translate(-50%,-50%) scale(var(--fp-inv-zoom,1)) rotate(${I(e.angle, 0)}deg);"
      >
        ${Wn(this.hass, e)}
      </div>
    `;
  }
  render() {
    if (!this._config) return y`${f}`;
    const e = this._config, t = this._replayController.getRenderState(), i = Ks(this.hass, this._watchedEntities, this._replayController.historyService(), t.enabled, t.currentTime), n = $e(e), o = this._activeFloor(e), r = ef(e, this._portrait), a = this._frame(e, r), s = hn(a), l = of(e.width, e.height, r), h = a.projection === "iso", p = h && a.wallHeight > 0;
    p || this._openingTween.stop();
    const c = qp(a), d = V + (h ? a.wallHeight : 0), u = (w) => {
      const R = wn(
        w,
        Wo(w, w.entity ? i?.states[w.entity]?.state : void 0),
        qt(e.symbols)
      ), G = Mu(w, n, o.id), pe = (ct) => {
        const Wi = xt(w, ct);
        return !!Wi && Hn({ entity: Wi.entity }, Wi.config);
      }, Oe = pe("hold"), Ve = pe("double_tap"), Le = pe("tap"), Rt = !!xt(w, "tap"), Xe = !!G && !Rt;
      if (!Xe && !Le && !Oe && !Ve) return R;
      const Ye = Le || Xe, lt = n.find((ct) => ct.id === G)?.name, ji = Xe ? lt ? `Go to ${lt}` : "Go to the next floor" : void 0, gs = Ye && !ji ? Uu(w, this.hass, qt(e.symbols)) : f;
      return _`<g class="fp-furniture-link"
            role=${Ye ? "button" : f}
            tabindex=${Ye ? "0" : f}
            aria-label=${gs}
            @action=${(ct) => this._onFurnitureAction(ct, w, n, G)}
            .actionHandler=${Ne({ hasHold: Oe, hasDoubleClick: Ve })}>
          <!-- An SVG tooltip is a <title> child, not a title=
               attribute: the attribute does nothing here. -->
          ${ji ? _`<title>${ji}</title>` : f}
          ${R}
        </g>`;
    }, g = (w) => Wo(w, w.entity ? i?.states[w.entity]?.state : void 0) ?? L(w.color) ?? Ur, b = di(e.overlayScale), v = b === "plan" ? pi(e.overlayMinWidth) : void 0, m = e.sunDimming ? rf(
      i?.states["sun.sun"]?.attributes?.elevation,
      I(e.sunBrightnessMin, Ln),
      I(e.sunBrightnessMax, ai)
    ) : ai, $ = o.areas.flatMap((w) => cs(w.id, w.points, w.sideWalls ?? {})), E = [...o.walls, ...$], k = p ? E.filter((w) => !w.divider) : [], S = p ? E.filter((w) => w.divider) : [], A = va(
      $.some((w) => w.divider) ? E.filter((w) => !w.divider) : E
    ), T = e.showDeadSpaces ? Qr(A, o.openings) : [], D = e.sunDimming || o.items.some((w) => w.glow) ? Kn(
      A,
      o.openings,
      (w) => (
        // Both leaves, and the travel each style actually has (issue #145):
        // asking `entity` alone left a door whose *second* panel was open
        // still blocking light outright. Glass admits it whole regardless
        // of sash — a closed window is not a hole, but light still gets
        // through it. A shutter rolled down overrides that, same as it
        // does for sunlight.
        la(
          w,
          this._openingAmount(w, i),
          this._openingSecond(w, i)?.amount,
          w.shutterEntity ? xe(i?.states[w.shutterEntity], w.shutterInvert) : void 0
        )
      )
    ) : A, H = `${this._glowIdBase}-sundim`, j = e.sunDimming ? ru(
      o.items,
      i?.states,
      e.width,
      e.height,
      H,
      D
    ) : f, ne = Be(e.roomFocus), ee = dr(o.areas, ne), x = o.areas?.find((w) => w.id === this._zoomedAreaId), z = x ? Ef(
      x.points,
      e.width,
      e.height,
      r,
      void 0,
      void 0,
      // A room may say how close to go; without one the fit decides,
      // exactly as it always has (issue #222).
      Af(x),
      a
    ) : vn, Z = e.compactHeader === !0, oe = Z && !!e.title;
    return y`
      <!-- The skin (issue #122) rides on the card rather than on .plan, so the
           floor switcher and the card's own background follow it too — a Tron
           plan floating on a white card would read as a bug. Every token the
           card draws with is declared on :host, so this only ever overrides. -->
      <!-- No skin style here: the palette comes from data-skin on the host, so
           a card-mod rule on this element still wins (issue #155). -->
      <!-- The card header is a fixed ~76px whether the title is "U8" or a
           sentence, and every part of it lives inside ha-card's shadow root
           where no rule of ours reaches. compactHeader therefore does not
           shrink it — it declines it, and draws the title inside the stage
           instead, where it costs no layout height at all (issue #152). -->
      <!-- The palette (issue #265) rides here, above everything that could
           name one of its colours — the floor switcher and the card background
           as well as the plan. Inline rather than on :host like the skin
           tokens, because unlike a skin it is per-config data and there is no
           fixed set of rules to write ahead of time. It declares only
           --fp-color-* names, so a card-mod rule on this element still owns
           every --fp-skin-* token exactly as issue #155 left it. -->
      <ha-card
        .header=${Z ? f : e.title ?? f}
        style=${ns(e.palette) || f}
        @pointerdown=${this._onCardActivity}
        @keydown=${this._onCardActivity}
      >
        <div class="card-shell ${this._replayController.isHistoryVisible() ? "replay-visible" : ""}">
          ${this._config.historyReplay?.enabled ? this._renderReplayPanel() : f}
          <div
            class="stage press-${Gt(e)} offline-${Ea(e)} ${oe ? "compact-title" : ""}"
            style="aspect-ratio: ${s.w} / ${s.h};"
          >
          <!-- The plan box: exactly the canvas ratio, fitted inside whatever
               height the card was actually given, and centred there (closes
               #115). Sized off the container's height so it shrinks when the
               height is the binding axis — clamping a full-width box with
               max-height instead would break the ratio rather than the box.

               The stage carries the same aspect-ratio so it still has a
               definite height in a content-sized (masonry) card; without it,
               size containment leaves 100cqh with nothing to resolve against
               and the plan collapses to nothing. -->
          <div
            class="plan ${b === "plan" ? "scale-plan" : ""}"
            tabindex=${ee.length > 1 ? "0" : f}
            role=${ee.length > 1 ? "group" : f}
            aria-label=${ee.length > 1 ? "Floor plan. Use the arrow keys to move between rooms, Escape to see the whole plan." : f}
            @keydown=${ee.length > 1 ? this._onPlanKey : f}
            style="aspect-ratio: ${s.w} / ${s.h};
                   width: min(100%, calc(100cqh * ${s.w} / ${s.h}));
                   --fp-plan-w: ${s.w};
                   --fp-wall-opacity: ${ia(e.wallOpacity)};
                   ${v === void 0 ? "" : `--fp-min-w: ${v}px;`}
                   background:${ae(e.background, Ft)};"
          >
          <!-- preserveAspectRatio="none" is correct here, and it took a wrong
               fix to see why. Fitting the plan into a card that is the wrong
               shape for it is .plan's job, not this line's (#115): .plan
               carries the canvas ratio, so the SVG's box always matches its
               viewBox, and "none" and "meet" are equivalent while that holds.

               "none" is still the deliberate choice, because it is the one
               that fails safely. The .items overlay is HTML, positioned with
               raw left/top percentages of .plan, and it does not letterbox. So
               if anything ever overrides .plan's ratio (card-mod, a grid row
               count), "meet" letterboxes the SVG away from the overlay and
               every icon drifts off the wall it was placed on, while "none"
               stretches both layers identically: distorted, but aligned. -->
          <!-- Zoom-to-room (tap an area). One wrapper around both the SVG and
               the HTML overlay so a CSS transform here reframes both layers
               identically — see areaZoomTransform. Wraps the keyed() skin
               block below rather than sitting inside it, so a skin change
               (which rebuilds that subtree) never disturbs this transform. -->
          <div
            class="plan-zoom"
            style="transform: translate(${z.txPercent}%, ${z.tyPercent}%) scale(${z.scale});"
          >
          <!-- Keyed on the skin (issue #122). A skin changes custom properties on
               an ancestor, and Chromium does not repaint an SVG element whose
               colour comes from a var() inside a presentation attribute or an
               inline style unless something else about it changes — Lit writes
               the same attribute string either way, so switching skins left
               every door, window and room fill painted in the previous skin's
               colours while the computed values were already correct. Keying
               rebuilds the subtree instead, which repaints by construction.
               Only on a skin change; ordinary state updates are untouched.

               Recolouring a palette entry (issue #265) is the same change seen
               from the other end — a custom property moving under a var() in a
               presentation attribute — so it is in this key too. -->
          ${Fr(
      `${e.skin ?? ""}|${os(e.palette)}`,
      _`<svg viewBox="0 0 ${s.w} ${s.h}" preserveAspectRatio="none">
            <g transform=${c || f}>
            <g transform=${l || f}>
            ${o.image ? _`<image href=${o.image} x="0" y="0" width=${e.width} height=${e.height}
                          preserveAspectRatio=${Ka(o.imageFit)}
                          opacity=${o.imageOpacity ?? 1} />` : f}
            ${o.areas?.map((w) => {
        const R = Gu(w);
        return _`<g class="area-tap-target"
                    role=${R ? "button" : f}
                    tabindex=${R ? "0" : f}
                    @action=${(G) => this._onAreaAction(G, w)}
                    .actionHandler=${Ne({
          // Only wait out the timers when a gesture can resolve:
          // otherwise every tap on an ordinary room would sit for
          // 500ms before zooming.
          hasHold: me(Xt(w, "hold")?.config),
          hasDoubleClick: me(Xt(w, "double_tap")?.config)
        })}>
                  ${Za(w, Bo(w, w.entity ? i?.states[w.entity]?.state : void 0))}
                </g>`;
      })}
            <!-- Diffuse sky light (PR #204). Reads its opening travel, shutter
                 state and sun elevation through the same replay-aware state
                 source as every other light layer, so a replayed plan shows the
                 daylight of the moment being replayed rather than of now. -->
            ${$m(
        o,
        e,
        i,
        `${this._wallMaskId}-ambient`,
        {
          amount: (w) => this._openingAmount(w, i),
          secondAmount: (w) => this._openingSecond(w, i)?.amount
        }
      )}
            <!-- Dead spaces (issue #88): the regions the walls seal off that no
                 door or window reaches, hatched. Above the room fills, so a
                 region someone has also drawn an area over still reads as
                 unreachable; below everything else, because it describes the
                 floor rather than anything standing on it. -->
            ${T.length ? _`${Xa(`${this._wallMaskId}-dead`)}
                    ${T.map(
        (w) => Ya(w, `${this._wallMaskId}-dead`)
      )}` : f}
            <!-- Light pools (issue #6). Above the room fills but below the
                 furniture and walls, so light reads as cast onto the floor
                 rather than painted over the plan. Isolated as one layer: the
                 pools screen-blend with each other (two lamps brighten where
                 they meet) without screening against the plan beneath, which
                 would wash out on a light theme. -->
            ${da(
        o.furniture,
        e.width,
        e.height,
        `${this._glowIdBase}-mask`,
        qt(e.symbols)
      )}
            <g class="fp-glows"
               mask=${o.furniture.length ? `url(#${this._glowIdBase}-mask)` : f}>
              ${o.items.map((w, R) => {
        if (!w.glow) return f;
        const G = Bn(w, i?.states[w.entity]);
        return G ? ha(w, G, `${this._glowIdBase}-${R}`, D) : f;
      })}
            </g>
            ${p ? f : o.furniture.map(u)}
            <!-- Sunlight through the openings. Under the walls on purpose:
                 light lands on the floor, and the walls stay crisp lines over
                 it rather than being tinted by the patches they let in. The
                 sun dimming further down is the whole-sky reading and still
                 has the last word — at night there is nothing to let in. -->
            ${e.sunlight ? $f(
        // The same blocking set the lamps and dead space get
        // (issue #290): generated room walls stop the sun too, and
        // a divider never does. Railings are already out, so the
        // sun passes over them (issue #182).
        A,
        o.openings,
        e.width,
        e.height,
        `${this._wallMaskId}-sun`,
        {
          // Both halves of the sun come from the same entity while
          // the plan follows it: the azimuth says where the light
          // comes from, the elevation whether there is any at all.
          // A plan that pins its own angle keeps its light on —
          // see sunlightStrengthOf.
          dir: _f(
            e,
            i?.states["sun.sun"]?.attributes?.azimuth
          ),
          strength: cf(
            e,
            i?.states["sun.sun"]?.attributes?.elevation
          ),
          // How far a patch carries, shortened as the sun climbs
          // (issue #185): a midday sun drops its light almost
          // straight down and lays a short patch, an evening one
          // rakes it across the room. A pinned bearing states a
          // picture rather than reading the sky, so it keeps the
          // plain reach — same rule as the strength above.
          // Coerced here so the elevation still scales a sane
          // base — cssNumber is what the sun brightness above
          // already uses on its own hand-edited numbers. The
          // bounds live at the sink, in sunReachFraction.
          reach: I(e.sunReach, gi) * (Di(e) ? 1 : bf(i?.states["sun.sun"]?.attributes?.elevation)),
          // The gap each style actually clears, both leaves
          // included — the same reading the lamps get above, and
          // for the same reason (#145): `entity` alone leaves a
          // door whose *second* panel is open reading as shut,
          // and a converging pair reading as twice as clear as it
          // draws. Glazing and shutters are applied on top of
          // this, inside openingSunFraction.
          openAmount: (w) => Gn(
            w,
            this._openingAmount(w, i),
            this._openingSecond(w, i)?.amount
          ),
          // A shutter that is all the way down stops the light, as
          // one does. Undefined where none is bound, so an opening
          // without a shutter is judged on itself alone.
          shutterOpen: (w) => w.shutterEntity ? xe(i?.states[w.shutterEntity], w.shutterInvert) : void 0,
          // How far a skylight's patch slides from the roof light
          // before it lands. Handed on raw: it is a fraction of
          // the reach above, which already carries the sun's
          // height, so scaling it here would apply 1/tan twice
          // and pin every patch under its own skylight at noon.
          // Bounded at the sink, in skylightDropFraction.
          drop: e.skylightDrop,
          light: e.sunlightColor ?? Qt,
          shade: e.sunShade === !1 ? null : e.sunShadeColor ?? bn
        }
      ) : f}
            ${Va(o.openings, e.width, e.height, this._wallMaskId)}
            ${(p ? S : E).map(
        (w) => _`
                <g class="fp-wall-neon"><line x1=${w.x1} y1=${w.y1} x2=${w.x2} y2=${w.y2}
                      class="wall fp-wall ${hi(w) ? "railing" : ""}"
                      data-id=${re(w.id) ?? f}
                      mask=${`url(#${this._wallMaskId})`}
                      style=${w.divider ? ba() : ya(w.thickness, w.kind)}
                      stroke-linecap="round" /></g>`
      )}
            <!-- Room outlines, above the walls they trace. An area polygon runs
                 down the centerline of the room's walls, so an outline drawn
                 with the fill is buried under the wall and never seen. Drawn
                 here it colors the wall instead. Same mask as the walls above,
                 so a doorway is a gap in the outline exactly as it is a gap in
                 the wall. Each live outline is clipped to its own room, so a
                 shared wall splits down the middle rather than going to
                 whichever area happens to sit later in the config. -->
            <g mask=${`url(#${this._wallMaskId})`}>
              ${o.areas?.map(
        (w, R) => Qa(
          w,
          Bo(w, w.entity ? i?.states[w.entity]?.state : void 0),
          `${this._wallMaskId}-area-${R}`
        )
      )}
            </g>
            ${_e(
        // Keyed by id: switching floors must create fresh DOM nodes.
        // Unkeyed, Lit morphs floor A's openings into floor B's, and the
        // 0.5s leaf/panel transitions animate the leftover state — a
        // window briefly plays a door swing (issue #50).
        p ? [] : o.openings,
        (w, R) => w.id || R,
        (w) => {
          const R = Wa(w, this._openingStyle(w, i));
          if (!Yo(w, this._featuresOf)) return R;
          const G = Fa(w);
          return _`<g class="fp-opening" role="button" tabindex="0"
                    @action=${(pe) => this._onOpeningAction(pe, w)}
                    .actionHandler=${Ne({
            // Only wait out the hold/double-tap timers when a gesture
            // actually resolves: otherwise every tap on a plain
            // contact sensor would sit for 500ms before answering.
            hasHold: me(this._openingPress(w, "hold")?.config),
            hasDoubleClick: me(this._openingPress(w, "double_tap")?.config)
          })}>
                  ${R}
                  <rect class="fp-opening-hit"
                        x=${w.x - G.width / 2} y=${w.y - G.height / 2}
                        width=${G.width} height=${G.height}
                        transform="rotate(${w.angle} ${w.x} ${w.y})" />
                </g>`;
        }
      )}
            ${_e(
        o.trackers ?? [],
        (w, R) => w.id || R,
        (w) => Ja(w, {
          editing: !1,
          xReading: vi(i?.states, w.xSensor?.entity),
          yReading: vi(i?.states, w.ySensor?.entity),
          xPresent: ci(i?.states, w.xSensor?.presence),
          yPresent: ci(i?.states, w.ySensor?.presence)
        })
      )}
            <!-- Sun dimming (issue #113). Last inside the rotated group, so it
                 covers the whole plan; the device overlay below is HTML and
                 stays at full brightness, keeping icons and state readable at
                 night. pointer-events:none is not optional — this rect spans
                 the canvas, and without it every tappable opening underneath
                 stops responding (the lesson from #108). -->
            </g>
            ${p ? this._renderIsoLayer(
        o,
        k,
        e,
        r,
        a,
        l,
        u,
        g,
        i,
        // Scrubbing history jumps from state to state on purpose;
        // easing between them would trail the scrubber.
        !t.enabled
      ) : f}
            <g transform=${l || f}>
            ${e.sunDimming ? _`${j}<rect class="fp-sun-dim"
                            x=${-d} y=${-d}
                            width=${e.width + d * 2}
                            height=${e.height + d * 2}
                            fill="#000"
                            mask=${j === f ? f : `url(#${H})`}
                            opacity=${1 - m} />` : f}
            </g>
            </g>
          </svg>`
    )}
          <div
            class="items"
            style="--fp-inv-zoom:${Mf(z.scale, e.zoomedOverlayScale)};"
          >
            ${o.areas?.map((w) => this._renderAreaLabel(w, e, r, b))}
            ${o.texts.map((w) => this._renderText(w, e, r, b))}
            ${_e(
      // Keyed like the openings above: a floor switch must build fresh
      // nodes rather than morph one floor's badges into another's.
      o.openings.filter((w) => La(w)),
      (w, R) => `${w.id || R}-shutter`,
      (w) => this._renderShutterMark(w, e, r, b, i)
    )}
            ${_e(
      o.openings.filter((w) => Ra(w)),
      (w, R) => `${w.id || R}-opening`,
      (w) => this._renderOpeningMark(w, e, r, b, i)
    )}
            ${_e(
      // No entity filter: devices that exist physically but have no HA
      // entity still deserve their badge (issue #39). Keyed by id so a
      // floor switch builds fresh DOM (see the openings comment).
      // "Only when active" devices drop out here (issue #55), and so do
      // the ones that only show inside their own room (#222) — the
      // editor still draws them, dimmed, so they stay editable.
      o.items.filter(
        (w) => !pa(
          w,
          w.entity ? i?.states[w.entity]?.state : void 0
        ) && !lu(w, x)
      ),
      (w, R) => w.id || R,
      (w) => this._renderItem(w, e, r, b, i)
    )}
          </div>
          </div>
          ${z.scale > 1 ? y`<button
                class="zoom-out"
                title="Zoom out"
                aria-label="Zoom out"
                @click=${() => this._zoomedAreaId = void 0}
              >
                <ha-icon icon="mdi:magnify-minus-outline"></ha-icon>
              </button>` : f}
          ${ne?.controls && ee.length > 1 ? y`<div class="room-focus" role="group" aria-label="Move between rooms">
                <button
                  title="Previous room"
                  aria-label="Previous room"
                  @click=${() => this._stepFocus(-1)}
                >
                  <ha-icon icon="mdi:chevron-left"></ha-icon>
                </button>
                <button title="Next room" aria-label="Next room" @click=${() => this._stepFocus(1)}>
                  <ha-icon icon="mdi:chevron-right"></ha-icon>
                </button>
              </div>` : f}
          ${oe ? y`<div class="plan-title">${e.title}</div>` : f}
          <!-- Outside the zoom wrapper on purpose, placed or not (issue #281).
               The buttons are how you change floor, and zoom-to-room can scale
               the plan well past the card: carried along, a switcher placed in
               the hall would leave the viewport the moment you tapped a room at
               the other end, and there would be no way to change floor until
               you zoomed back out. A control you can lose is a worse failure
               than one that overlaps the drawing for as long as a zoom lasts —
               and the position is chosen against the view people spend their
               time in, which is the unzoomed one. -->
          ${n.length > 1 ? this._renderFloorSwitcher(n, o, Z, e, r) : f}
        </div>
        </div>
      </ha-card>
    `;
  }
  _renderReplayPanel() {
    return Bf(Wf(this._replayController));
  }
  _renderFloorSwitcher(e, t, i = !1, n, o = 0) {
    const r = n ? mt(n) : void 0, a = r ? Zt(r.x, r.y, I(n.width, le), I(n.height, ge), o) : void 0, s = n ? gn(I(n.width, le), I(n.height, ge), o) : { w: 1, h: 1 };
    return y`
      <div
        class="floor-switcher ${i ? "row" : ""} ${a ? "placed" : ""}"
        style=${a ? `left:${a.x / s.w * 100}%; top:${a.y / s.h * 100}%;` : f}
      >
        ${e.map((l) => {
      const h = l.id === t.id ? L(l.color) : void 0;
      return y`
            <button
              class=${l.id === t.id ? "active" : ""}
              title=${l.name}
              style=${h ? `background:${h};border-color:${h};` : f}
              @click=${() => this._goToFloor(e, l.id)}
            >
              ${l.short || l.name}
            </button>
          `;
    })}
      </div>
    `;
  }
};
se._nextWallMaskId = 0;
se._nextGlowId = 0;
se.styles = [
  Dr,
  sl,
  Pt`
    ha-card {
      height: 100%;
      box-sizing: border-box;
      overflow: hidden;
      /* The skin paints the card, not just the plan: .plan is only the canvas
         box, and on a card that isn't the canvas's shape the rest would stay
         the Home Assistant theme's colour. Unskinned this is ha-card's own
         default chain, so nothing changes. */
      background: var(--fp-skin-card-bg, var(--ha-card-background, var(--card-background-color, #fff)));
      /* The title sits on that background, and ha-card colours it from this
         variable rather than inheriting — so a dark skin under a light Home
         Assistant theme would print a dark title on near-black. The default is
         ha-card's own. */
      --ha-card-header-color: var(--fp-skin-text, var(--primary-text-color));
      /* A column, so the stage takes the height left over after the card's
         own header rather than the card's whole height. With a title set, a
         full-height stage measures past the bottom of the card by exactly the
         header, and the plan is cut off by that much. */
      display: flex;
      flex-direction: column;
    }
    .card-shell {
      display: flex;
      flex-direction: column;
      gap: 12px;
      /* In fixed-height dashboards (e.g. Sections rows), replay controls can
         extend past the visible card area. Keep content reachable by letting
         this inner shell scroll inside the card instead of clipping. */
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .card-shell.replay-visible {
      display: grid;
      grid-template-rows: auto minmax(0, 1fr);
    }
    .card-shell.replay-visible .stage {
      min-height: 0;
    }
    .stage {
      position: relative;
      width: 100%;
      /* Takes the space the header leaves, and may shrink below its content:
         without min-height a flex item floors at its content size and the
         plan pushes the stage past the card again. */
      flex: 1 1 auto;
      min-height: 0;
      padding: 0;
      /* Centres the plan box in whatever the card was given, and makes the
         stage's own height queryable so the plan can size against it. */
      display: flex;
      align-items: center;
      justify-content: center;
      container-type: size;
    }
    .plan {
      position: relative;
      height: auto;
    }
    /*
     * overlayScale: plan. The container is .plan, not .stage: since #115 the
     * stage is only the box the plan is *centred in*, and it is wider than the
     * plan on any card that isn't the canvas's ratio. Measuring the stage would
     * oversize every label by exactly the letterboxing.
     *
     * --fp-u -- one canvas unit as a length -- is declared on the overlay
     * *inside* .plan rather than on .plan itself. Both work today: --fp-u is an
     * unregistered custom property, so its value is substituted as a token
     * stream and the cqw resolves wherever it is finally used -- always a
     * descendant of .plan. Declaring it here is what stays correct if --fp-u is
     * ever registered with @property, which would resolve the cqw at the
     * declaring element instead. (.plan's own width reads 100cqh against
     * .stage, since container units look at an element's *ancestor* container;
     * adding inline-size containment to .plan doesn't disturb it.)
     *
     * inline-size containment is enough for cqw and is cheaper than the size
     * containment .stage needs; .plan's height comes from its inline
     * aspect-ratio, so nothing here depends on the overlay's own size.
     */
    .plan.scale-plan {
      container-type: inline-size;
    }
    /*
     * The unit itself, declared twice on purpose.
     *
     * The fallback in var(--fp-u, 1px) is not the safety net it looks like: it
     * fires when the property is *unset*, never when its value fails to
     * resolve. A browser with no container queries parses the calc quite
     * happily -- a custom property takes almost any token stream -- and then
     * every property using it is invalid at computed-value time, so each falls
     * back to its own initial value. Width becomes auto, and a badge collapses
     * to its borders: about 3px, with its label landing on top of it because
     * the item's box collapsed with it.
     *
     * So the plain value is declared first, and the container-query one only
     * where it can actually be computed. One pixel per canvas unit is exactly
     * what overlayScale fixed draws, which is the right thing to degrade to: a
     * plan that looks like it did before canvas units existed, rather than one
     * with 3px badges.
     *
     * The guard tests the unit as well as the property, because they are two
     * features and only one of them is what the declaration is made of. A
     * browser with container-type but no cqw would pass a check for the
     * property and then fail on the value, which is the exact collapse this is
     * here to stop. Test what is actually used; it costs one more clause.
     */
    .plan.scale-plan .items {
      --fp-u: 1px;
    }
    @supports (container-type: inline-size) and (width: 1cqw) {
      .plan.scale-plan .items {
        /* Clamp the shared unit so badges and their text keep their proportions.
           The drawing and overlay positions still follow the actual plan size. */
        --fp-u: calc(max(100cqw, var(--fp-min-w, 0px)) / var(--fp-plan-w));
      }
    }
    /* The measures that aren't config-driven, so they never reach an inline
       style. Label padding goes to em rather than canvas units because it
       should track the label's own size either way.
       Hairlines are deliberately left alone: a badge border and the label's
       drop shadow are 1px-ish either way, and scaling them with the plan puts
       them below a pixel on exactly the small cards this mode is for. Skins
       own those tokens now in any case. */
    .plan.scale-plan .label {
      padding: 0.08em 0.33em;
      border-radius: 0.33em;
    }
    .plan.scale-plan .item > .label {
      top: calc(100% + 0.17em);
    }
    /* The side positions measure their gap in em too, so it tracks the label
       with the plan exactly as the below position's does. Restating top
       because the rule above sets it for every label. */
    .plan.scale-plan .item > .label.label-left,
    .plan.scale-plan .item > .label.label-right {
      top: 50%;
    }
    .plan.scale-plan .item > .label.label-left {
      right: calc(100% + 0.33em);
    }
    .plan.scale-plan .item > .label.label-right {
      left: calc(100% + 0.33em);
    }
    .floor-switcher {
      position: absolute;
      top: 8px;
      right: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      pointer-events: auto;
      z-index: 1;
    }
    /* Placed by the author (issue #281). The corner rules above are overridden
       rather than made conditional, so a plan that sets no position emits no
       inline style and renders exactly as it always has. The right:auto is the
       load-bearing half: without it the block is pinned to both edges and the
       left the card just set does nothing but stretch it. */
    .floor-switcher.placed {
      right: auto;
      transform: translate(-50%, -50%);
    }
    /* Centred on its anchor in both axes, so the point you drop it on is the
       middle of the block rather than a corner of it — which is what makes a
       drag feel like it is holding the thing it is holding. A wrapped compact
       row centres the same way. */
    /* Compact chrome (issue #152): the buttons run across the top strip
       instead of down the side, so they share it with the title chip rather
       than each claiming their own band. Wrapped, because a plan with eight
       floors is exactly the case a row is worst at — better a second short
       row than buttons off the edge of the card. Right-aligned so the row
       grows back toward the title rather than through it. */
    .floor-switcher.row {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    /* Room for the title chip on the left, so a long floor name and a long
       title don't meet in the middle — the chip's own max-width leaves the
       same margin from the other side. Only when there *is* a chip: a compact
       card with no title has the whole strip, and reserving 44% of it would
       wrap the buttons for nothing. */
    .stage.compact-title .floor-switcher.row {
      left: 44%;
    }
    .floor-switcher button {
      cursor: pointer;
      border: 1px solid var(--fp-skin-badge-border, var(--divider-color, #ccc));
      background: var(--fp-skin-badge-bg, var(--card-background-color, #fff));
      color: var(--fp-skin-text, var(--primary-text-color));
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 12px;
      line-height: 1;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .floor-switcher button.active {
      background: var(--fp-skin-accent, var(--primary-color, #03a9f4));
      /* Its own ink, not the badge's: this sits on --fp-skin-accent, and the
         skin whose accent wants dark ink is not necessarily the one whose
         active badge does. Left at the theme's text-on-primary, Pastel and
         Tron print near-white on a pale blue and a bright cyan. */
      color: var(--fp-skin-accent-ink, var(--text-primary-color, #fff));
      border-color: var(--fp-skin-accent, var(--primary-color, #03a9f4));
    }
    /* The title, drawn inside the plan (issue #152). Styled as a chip rather
       than as a heading: it is sitting *on* the drawing, and 24px of bare text
       over a wall reads as part of the plan. Same tokens as the floor buttons
       beside it, so a skin carries both. */
    .plan-title {
      position: absolute;
      top: 8px;
      left: 8px;
      z-index: 1;
      /* Stops short of the floor row's own edge, so a long title ellipsises
         rather than running under the buttons. */
      max-width: 40%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border: 1px solid var(--fp-skin-badge-border, var(--divider-color, #ccc));
      background: var(--fp-skin-badge-bg, var(--card-background-color, #fff));
      color: var(--fp-skin-text, var(--primary-text-color));
      border-radius: 6px;
      padding: 4px 8px;
      font-size: 13px;
      font-weight: 500;
      line-height: 1;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
    /* Zoom-to-room (tap an area). One wrapper around both the SVG and the
       HTML overlay so a transform here reframes both layers identically —
       transform-origin:0 0 matches the translate-percent math in
       areaZoomTransform(). Setting a transform (even the identity) makes this
       div establish the containing block for its absolutely-positioned
       svg/.items children, so it needs the same inset:0 they'd otherwise use. */
    .plan-zoom {
      position: absolute;
      inset: 0;
      transform-origin: 0 0;
      transition: transform 0.4s ease;
    }
    @media (prefers-reduced-motion: reduce) {
      .plan-zoom {
        transition: none;
      }
    }
    /* The room-focus controls (issue #261), sharing the zoom-out button's look
       and its corner — it is the same job, one room further along. */
    .room-focus {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 1;
      display: flex;
      gap: 4px;
    }
    .room-focus button {
      cursor: pointer;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      border-radius: 6px;
      padding: 4px;
      line-height: 0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
    .zoom-out {
      position: absolute;
      top: 8px;
      left: 8px;
      z-index: 1;
      cursor: pointer;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      border-radius: 6px;
      padding: 4px;
      line-height: 0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }
    /* The compact title has that corner. The zoom-out button is the transient
       one — it exists only while a room is zoomed — so it is the one that
       moves, dropping below the chip rather than landing on top of it. */
    .stage.compact-title .zoom-out {
      top: 38px;
    }
    .area-tap-target {
      cursor: pointer;
    }
    /* A staircase that changes floor (issue #121). The pointer is the whole
       affordance — the symbol already draws an arrow saying which way it
       goes — and it only exists on a piece that has somewhere to lead. */
    .fp-furniture-link {
      cursor: pointer;
    }
    .fp-furniture-link:focus-visible {
      outline: 2px solid var(--fp-skin-accent, var(--primary-color, #03a9f4));
      outline-offset: 2px;
    }
    svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
    }
    /* Sunlight through the openings. Paint only — the plan underneath stays
       pressable, which is what pointer-events:none is here for (#108). */
    .fp-sunlight {
      pointer-events: none;
    }
    /* No fill declaration here, deliberately. CSS beats the presentation attribute — the same rule the
       wall below relies on — and a patch of sunlight is filled with a
       *gradient* the renderer builds per opening. A flat colour declared here
       silently discards it: the markup keeps saying url(#…), the computed
       style says rgb(…), and the light comes out as a hard slab no matter
       what shape the falloff is given. That is issue #185, and it survived
       four rewrites of the falloff because every one of them was correct and
       none of them was ever used.

       The skin still applies: --fp-skin-sunlight is read by SUN_LIGHT_COLOR
       and lands on the gradient's own stops. */
    .wall {
      stroke: var(--fp-skin-wall, var(--primary-text-color));
      /* CSS beats the presentation attribute, so the skin sets the wall's
         weight while WALL_THICKNESS keeps owning the geometry the doorway
         mask and the opening symbols are cut from. Capped at 10 for that
         reason — see MAX_SKIN_WALL_WIDTH. */
      stroke-width: var(--fp-skin-wall-width, 8);
    }
    /* A railing (issue #182) is the same line at RAILING_WEIGHT of the weight,
       so it reads as a barrier beside the walls in every skin. An explicit
       thickness is scaled inline by wallStrokeStyle instead, which wins. */
    .wall.railing {
      stroke-width: calc(var(--fp-skin-wall-width, 8) * 0.4);
    }
    /* Neon, for the skins that want it. Everyone else gets none, which costs
       nothing.

       Two things about where this sits, and both matter.

       It is *outside* the doorway mask. CSS applies filter before mask, so a
       filter on the wall itself is computed from the uncut wall: the mask then
       removes the wall body but not the outer halo, and the leftover fringe
       runs straight through every opening. The doorway cut clears
       WALL_THICKNESS + 4 (12 units, so +-6 from the centreline) while a
       drop-shadow of blur 4 reaches about +-8.5, and that difference is
       exactly what leaked. Measured on a Tron render: 35.6 luminance inside an
       opening against a 7.8 background, versus 7.8 with the filter out here.

       It is also *per wall*, not one group around the whole collection.
       Wrapping them all together would composite the strokes before filtering,
       so two walls meeting at a corner glow once instead of twice and every
       joint quietly dims. Per-wall keeps the accumulation the card has always
       had, and keeps the editor honest, since _renderWall wraps each wall the
       same way. See issue #203. */
    .fp-wall-neon {
      filter: var(--fp-skin-wall-filter, none);
    }
    /* The isometric view (issue #261). Faces take the skin's wall colour; the
       shade laid over a side is what makes a box read as a box; a furniture
       block keeps the paper on top so its glyph still reads. Wall faces pass
       taps through; opening panels and furniture keep their own actions. */
    .fp-iso-wall polygon, .fp-iso-sill polygon { stroke: none; }
    /* Everything standing in the wall plane fades together. A closed door leaf
       left at full opacity read as a patch of wall that had refused to turn
       transparent, which is what it looks like from the front (issue #261
       review). Glazed panels keep their own glass alpha instead. */
    .fp-iso-wall, .fp-iso-sill, .fp-iso-panel:not(.fp-iso-glazed) {
      opacity: var(--fp-wall-opacity, 1);
    }
    .fp-iso-panel {
      pointer-events: none;
      fill: var(--fp-iso-color, var(--fp-skin-wall, var(--primary-text-color, #212121)));
      stroke: var(--fp-iso-color, var(--fp-skin-wall, var(--primary-text-color, #212121)));
      stroke-width: 1;
      stroke-linejoin: round;
    }
    .fp-iso-glazed {
      fill: #8ec5ff;
      fill-opacity: 0.35;
    }
    .fp-iso-opening-hit {
      pointer-events: none;
      fill: transparent;
      stroke: none;
    }
    .fp-iso-opening-button { cursor: pointer; }
    .fp-iso-opening-button > polygon { pointer-events: auto; }
    .fp-iso-opening-button:focus-visible { outline: 2px solid var(--primary-color, #03a9f4); }
    .fp-iso-face {
      fill: var(--fp-skin-wall, var(--primary-text-color, #212121));
      stroke: var(--fp-skin-wall, var(--primary-text-color, #212121));
      stroke-width: 0.6;
      stroke-linejoin: round;
      pointer-events: none;
    }
    .fp-iso-furniture .fp-iso-face {
      fill: var(--fp-iso-color, var(--fp-skin-furniture, #9e9e9e));
      stroke: var(--fp-iso-color, var(--fp-skin-furniture, #9e9e9e));
    }
    .fp-iso-furniture .fp-iso-top {
      fill: var(--fp-skin-bg, var(--card-background-color, #fff));
    }
    .fp-iso-shade {
      fill: #000;
      /* Stroked in its own colour, like the face under it: two pieces of one
         wall meet edge to edge, and without this each anti-aliased edge shows
         through the other as a hairline. */
      stroke: #000;
      stroke-width: 0.6;
      stroke-linejoin: round;
      pointer-events: none;
    }
    .fp-iso-glass {
      fill: #8ec5ff;
      fill-opacity: 0.35;
      stroke: var(--fp-skin-wall, var(--primary-text-color, #212121));
      stroke-width: 0.6;
      pointer-events: none;
    }
    /* Dead-space hatching (issue #88). It spans whole regions of the plan, so
       without this it swallows every tap inside one — and a sealed region is
       exactly where a tappable door might sit on the boundary. Same lesson as
       the light pools below (#108). */
    .fp-dead-space {
      pointer-events: none;
    }
    /* Sun dimming (issue #113): decoration, never a pointer target. The
       transition matters — HA steps the sun elevation every ~30s, and without
       it dusk arrives as a series of visible jumps rather than a fade. */
    .fp-sun-dim {
      pointer-events: none;
      transition: opacity 2s linear;
    }
    @media (prefers-reduced-motion: reduce) {
      .fp-sun-dim { transition: none; }
    }
    /* Light pools (issue #6). "isolation" gives the layer its own compositing
       group, so the pools blend with each other but not with the plan beneath
       — screening against a light theme's white background would wash them
       out entirely. Inside that group "screen" makes overlapping lights add,
       so two lamps brighten where they meet instead of the topmost winning. */
    .fp-glows {
      isolation: isolate;
      /* Light is decoration and must never take a click: these are filled
         circles drawn over the plan, so without this they swallow every tap
         inside the pool — devices stop responding under a lit lamp, and in
         the editor whole rooms become unselectable (issue #108). */
      pointer-events: none;
    }
    .fp-glow {
      mix-blend-mode: screen;
      /* Follow the light rather than snapping: a dimmer ramp reads as a ramp. */
      transition: opacity 0.4s ease;
    }
    @media (prefers-reduced-motion: reduce) {
      .fp-glow {
        transition: none;
      }
    }
    .fp-door-leaf,
    .fp-leaf-r {
      transform-box: fill-box;
      transition: transform 0.5s ease;
    }
    .fp-door-leaf {
      transform-origin: left center;
    }
    .fp-leaf-r {
      transform-origin: right center;
    }
    .fp-door-leaf rect,
    .fp-leaf-r rect {
      transition: fill 0.5s ease;
    }
    .fp-door-arc {
      transition: stroke-dashoffset 0.5s ease, stroke 0.5s ease;
    }
    .fp-opening {
      cursor: pointer;
    }
    .fp-opening-hit {
      fill: transparent;
      pointer-events: all;
    }
    /* Shutter badge (issue #74 follow-up): screen-sized, so it stays legible
       whatever canvas units the plan is drawn in — the same reason device
       badges are sized in pixels. Sits in the .items overlay, which is
       pointer-events:none, so it takes its own back. */
    .shutter-mark {
      position: absolute;
      /* transform is set inline: the pixel push along the wall normal. */
      pointer-events: auto;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      /* width/height are inline: they follow overlayScale (#148). */
      border-radius: 50%;
      background: var(--fp-skin-paper, var(--card-background-color, #fff));
      border: 1px solid var(--fp-skin-wall, var(--primary-text-color, #212121));
      color: var(--fp-skin-wall, var(--primary-text-color, #212121));
      opacity: 0.75;
      transition: color 0.3s ease, opacity 0.3s ease, border-color 0.3s ease;
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      user-select: none;
    }
    /* Open: the accent, said twice — the glyph is already the "open" half of
       HA's icon pair, and the colour repeats it for a glance across the room. */
    .shutter-mark.on {
      color: var(--fp-active, var(--fp-skin-accent, var(--primary-color, #03a9f4)));
      border-color: var(--fp-active, var(--fp-skin-accent, var(--primary-color, #03a9f4)));
      opacity: 1;
    }
    .shutter-mark ha-icon {
      /* --mdc-icon-size is inline, for the same reason. */
      display: flex;
    }
    .fp-slide-panel {
      transform-box: fill-box;
      transition: transform 0.5s ease;
    }
    .fp-slide-panel rect {
      transition: fill 0.5s ease;
    }
    /* Roll-up curtain (garage / roller shutter): thins onto the track line. */
    .fp-roll-curtain {
      transform-box: fill-box;
      transform-origin: center;
      transition: transform 0.5s ease;
    }
    .fp-roll-curtain rect {
      transition: fill 0.5s ease;
    }
    .items {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    /* A device's hit area is what you can *see* of it — the badge and its
       label — not the box its decoration happens to fill.

       A presence ripple is 80–110px of mostly empty air, and the anchor grew
       to hold it: a 30px motion icon behaved like a 110px square button, which
       also swallowed taps meant for the plan underneath it. The ring is
       decoration; it says "presence here", it is not a control. So the anchor
       stops taking pointer events and the parts that are the device take them
       back. */
    .item {
      position: absolute;
      /* Counter-scaled against the zoom-to-room transform (--fp-inv-zoom,
         set on .items) so a badge stays a constant, legible screen size
         instead of ballooning with the room it's tapped into. Same duration
         and easing as .plan-zoom's own transition, so the zoom and its
         counter-scale animate in lockstep — without this the custom property
         changes in a single frame while the plan takes 0.4s to catch up, and
         every badge is briefly the wrong size mid-transition. */
      transform: translate(-50%, -50%) scale(var(--fp-inv-zoom, 1));
      transition: transform 0.4s ease;
      pointer-events: none;
      /* Not a hand: a device with nothing bound, or tap_action set to none,
         is not a button (issue #134). Only .interactive gets the pointer. */
      cursor: default;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .item .badge,
    .item .label {
      pointer-events: auto;
    }
    /* .stack-icon spans the whole ripple (inset: 0), so it has to stay out of
       the way too — the badge inside it is the target, not its wrapper. */
    .stack-icon,
    .ripple,
    .press-ink {
      pointer-events: none;
    }
    /* A ripple-only device draws no badge, so its centre has to answer for it,
       or switching the badge off would leave the device unclickable. The dot
       is 8px across; this gives it a real touch target without drawing one.
       Deliberately a fixed size, and not scaled by overlayScale (#148): a
       minimum touch target is about fingers, which do not shrink with the
       plan. */
    .item.interactive .ripple .dot {
      pointer-events: auto;
      position: relative;
    }
    .item.interactive .ripple .dot::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: ${li}px;
      height: ${li}px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }
    .item.interactive {
      cursor: pointer;
      /* Stops the long-press magnifier / text selection on touch from firing
         over a device you are only trying to press. */
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      user-select: none;
    }

    /* ---- Press feedback (issue #134) -------------------------------------
       Chosen plan-wide; the stage carries press-scale / press-ripple /
       press-flash / press-none and each rule below is scoped to its own.
       Only .interactive devices respond, so nothing animates that would not
       then do something. */

    /* Scale: the transform has to repeat the translate, since .item is
       centred on its own anchor and a bare scale() would drop that and jump
       the device down-right by half its size. Also has to repeat the
       zoom-to-room counter-scale (--fp-inv-zoom) and multiply rather than
       replace it — restating scale(${ko}) alone would drop the
       counter-scale along with the translate, and a badge held down at 4x
       zoom would balloon to roughly 4x its resting size instead of shrinking. */
    .press-scale .item.interactive {
      transition: transform ${Eo}ms cubic-bezier(0.2, 0.8, 0.3, 1);
    }
    .press-scale .item.interactive:active {
      transform: translate(-50%, -50%) scale(calc(var(--fp-inv-zoom, 1) * ${ko}));
      transition-duration: ${So}ms;
    }

    /* Flash: drop-shadow rather than a box-shadow or a background, so the halo
       follows whatever the device actually draws — the badge's circle, a bare
       ripple ring, the label — instead of a rectangle around it. */
    .press-flash .item.interactive {
      transition: filter ${Eo}ms ease-out;
    }
    .press-flash .item.interactive:active {
      filter: drop-shadow(0 0 5px var(--fp-skin-accent, var(--primary-color, #03a9f4)));
      transition-duration: ${So}ms;
    }

    /* Ink: a circle spreading from the touch point. Positioned by
       _startInk, which is the only thing that knows where the finger landed. */
    .press-ink {
      position: absolute;
      left: var(--fp-ink-x, 50%);
      top: var(--fp-ink-y, 50%);
      width: 0;
      height: 0;
      border-radius: 50%;
      /* Decoration: it must never swallow the tap it is reporting. */
      pointer-events: none;
      opacity: 0;
      background: currentColor;
    }
    .press-ink.inking {
      animation: fp-press-ink 520ms ease-out;
    }
    @keyframes fp-press-ink {
      from {
        width: 0;
        height: 0;
        margin: 0;
        opacity: 0.32;
      }
      to {
        width: 120px;
        height: 120px;
        margin: -60px 0 0 -60px;
        opacity: 0;
      }
    }

    /* Reduced motion keeps the feedback and drops the movement: the halo, with
       no transition. Removing the effect outright would answer an
       accessibility preference by taking the affordance away. */
    @media (prefers-reduced-motion: reduce) {
      .press-scale .item.interactive,
      .press-flash .item.interactive,
      .press-ripple .item.interactive {
        transition: none;
      }
      .press-scale .item.interactive:active {
        transform: translate(-50%, -50%) scale(var(--fp-inv-zoom, 1));
      }
      .press-scale .item.interactive:active,
      .press-ripple .item.interactive:active,
      .press-flash .item.interactive:active {
        filter: drop-shadow(0 0 5px var(--fp-skin-accent, var(--primary-color, #03a9f4)));
      }
      .press-ink.inking {
        animation: none;
      }
    }
    /*
     * The item's x/y anchors its icon, not its icon-plus-label. Were the label
     * in flow, it would make the column taller and the translate would
     * push the icon up by half the label's height -- so an item showing state
     * would sit higher than a bare one beside it, at the same y. The label hangs
     * below instead, out of flow, and every icon lands on its own y.
     */
    .item > .label {
      position: absolute;
      top: calc(100% + 2px);
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
    }
    /* Label beside the badge instead of under it (issue #180). A reading under
       a badge grows in both directions at once and meets whatever is next to
       it; hung off one side it grows one way, which is what a row of devices
       along a wall needs.

       Vertically centred on the badge rather than baseline-aligned with it:
       the label is one line and the badge is a circle, so centres are what the
       eye actually pairs up. .inflow (a label-only device) ignores all of
       this — with no badge there is no side to sit on. */
    .item > .label.label-left,
    .item > .label.label-right {
      top: 50%;
      transform: translateY(-50%);
    }
    .item > .label.label-left {
      left: auto;
      right: calc(100% + 4px);
    }
    .item > .label.label-right {
      left: calc(100% + 4px);
    }
    /* Label-only items (showIcon: false) have no badge to hang under, so the
       absolute label would drop to y + 2px on a zero-height item. Put it back
       in flow so it becomes the item's box and centers on (x, y) as before. */
    .label.inflow {
      position: static;
      transform: none;
    }
    .badge {
      position: relative; /* anchors the offline mark (issue #162) */
      width: 34px;
      height: 34px;
      border-radius: var(--fp-skin-badge-radius, 50%);
      background: var(--fp-skin-badge-bg, var(--card-background-color, #fff));
      border: var(--fp-skin-badge-border-width, 1.5px) solid
        var(--fp-skin-badge-border, var(--divider-color, #ccc));
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--fp-skin-text, var(--primary-text-color));
      box-shadow: var(--fp-skin-badge-shadow, 0 1px 3px rgba(0, 0, 0, 0.2));
    }
    /* The reading standing in for the icon (issue #106). Inherits the badge's
       text color, so every rule that recolours a badge — active, --fp-state —
       carries the number with it and needs no counterpart here. The negative
       tracking buys back the width a 4-glyph reading like 1.2kW needs. */
    .badge-value {
      font-weight: 600;
      line-height: 1;
      letter-spacing: -0.02em;
      white-space: nowrap;
    }
    /*
     * --fp-active is the item's own activeColor (issue #79) when it sets one;
     * otherwise this falls through to the theme's active color, which is
     * exactly what every badge used before the option existed.
     */
    .item.on .badge {
      background: var(--fp-active, var(--fp-skin-active, var(--state-light-active-color, var(--state-active-color, #fdd835))));
      border-color: var(--fp-active, var(--fp-skin-active, var(--state-light-active-color, var(--state-active-color, #fdd835))));
      /* --fp-ink is contrastText's answer for a colour we could read; when the
         active colour came from the skin there is no per-item colour to read,
         so the skin states its own ink. A pastel badge under a dark Home
         Assistant theme would otherwise take that theme's near-white text. */
      color: var(--fp-ink, var(--fp-skin-active-ink, var(--text-primary-color, #212121)));
    }
    /* The off colour (issue #228). Its own class rather than a var() fallback
       on the base .badge rule, so a plan that never sets one emits nothing new
       and looks exactly as it did. Declared before .state-colored, which still
       wins — a threshold rule is the more specific statement. */
    .item.inactive-colored .badge {
      background: var(--fp-inactive);
      border-color: var(--fp-inactive);
      color: var(--fp-ink, var(--text-primary-color, #212121));
    }
    /* A resolved state colour paints the badge whatever the on/off state —
       thresholds exist for sensors, which are never "on". Declared *after* the
       .on rule (equal specificity) so state rules win over the active colour. */
    .item.state-colored .badge {
      background: var(--fp-state);
      border-color: var(--fp-state);
      color: var(--fp-ink, var(--text-primary-color, #212121));
    }

    /* ---- Offline devices (issue #162) ------------------------------------
       Until now a device whose entity had dropped out was drawn exactly like
       one that is simply switched off — a dead bulb and a bulb someone turned
       off were the same picture, and the plan gave that answer confidently.
       Chosen plan-wide, so the stage carries offline-dim / offline-strike /
       offline-none, exactly as it carries the press effect.

       Nothing here recolours the badge, and nothing needs to: an offline
       entity is never entityIsActive, so it has already fallen back to the
       resting badge. What is added is the *fading*, which says "we have no
       reading" rather than "the reading is off".

       That "already fallen back" is load-bearing, and issue #228 is the first
       thing that could have broken it: inactiveColor paints on exactly the
       not-active test an offline entity also fails. It is gated on this one
       too, in _renderItem — otherwise a dead device would be drawn in the
       loudest colour on the plan, and offline-none would make it identical to
       a device that really is shut.

       offline-none declares nothing at all, which is the point of it. */
    .offline-dim .item.offline {
      opacity: 0.45;
    }
    /* Strike sits a little brighter than a plain dim, so that the mark drawn
       across it still reads as red rather than as pink: the whole device is
       one composited group, so the mark fades with everything else. */
    .offline-strike .item.offline {
      opacity: 0.6;
    }
    /* The diagonal, drawn across the badge itself rather than the item, so it
       crosses out the icon and not the label hanging underneath. A little
       wider than the badge at each end, the way the "no" symbol overhangs. A
       device drawn as a bare ripple, or as a label with no badge at all, has
       nothing to cross and keeps the fade alone. */
    .offline-strike .item.offline .badge::after {
      content: "";
      position: absolute;
      left: -12%;
      right: -12%;
      top: 50%;
      height: 2px;
      margin-top: -1px;
      border-radius: 1px;
      /* Down to the right, the way every mdi "-off" glyph and the reporter's
         own mock-up draw it. */
      transform: rotate(45deg);
      background: var(--fp-offline-mark, var(--error-color, #db4437));
    }
    ha-icon {
      --mdc-icon-size: 22px;
    }
    /* Icon motion while the entity is active (issue #48). */
    ha-icon.anim-spin {
      animation: fp-icon-spin 2s linear infinite;
    }
    ha-icon.anim-pulse {
      animation: fp-icon-pulse 1.6s ease-in-out infinite;
    }
    @keyframes fp-icon-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    @keyframes fp-icon-pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      ha-icon.anim-spin,
      ha-icon.anim-pulse {
        animation: none;
      }
    }
    .label {
      /* Positioning (out-of-flow anchor + inflow fallback) lives in the
         .item > .label rules above, from #41. */
      font-size: 12px;
      line-height: 1;
      padding: 1px 4px;
      border-radius: 4px;
      background: var(--fp-skin-badge-bg, var(--card-background-color, #fff));
      color: var(--fp-skin-text, var(--primary-text-color));
      white-space: nowrap;
    }
    .text {
      position: absolute;
      pointer-events: none;
      white-space: nowrap;
      font-weight: 500;
      line-height: 1;
      /* Keeps its own counter-scale (inline, see _renderText) in step with
         .plan-zoom's transition — same reasoning as .item's transform. */
      transition: transform 0.4s ease;
    }
    .area-label {
      position: absolute;
      pointer-events: none;
      white-space: nowrap;
      transform: translate(-50%, -50%) scale(var(--fp-inv-zoom, 1));
      /* Same lockstep-with-.plan-zoom reasoning as .item and .text above. */
      transition: transform 0.4s ease;
      font-weight: 600;
      /* The default size stays a normal rule so card-mod can still override it
         — room names had no config option before overlayScale landed, and this
         selector was the only way to change them. An area's own labelSize, and
         overlayScale: plan, come through as an inline style that wins over
         this. Keep in step with DEFAULT_AREA_LABEL_SIZE. */
      font-size: ${zn}px;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      line-height: 1;
      color: var(--fp-skin-text, var(--primary-text-color));
      opacity: 0.7;
      text-shadow:
        0 1px 2px var(--fp-skin-bg, var(--card-background-color, #fff)),
        0 -1px 2px var(--fp-skin-bg, var(--card-background-color, #fff));
    }
    .stack {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .stack-icon {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ripple {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ripple .ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid var(--fp-ripple-color);
      opacity: 0;

      /* Keep only the angular slice the ring should travel along */
      -webkit-mask: conic-gradient(
        from calc(var(--fp-ripple-direction) * 1deg - var(--fp-ripple-width) * 1deg / 2),
        #000 0deg,
        #000 calc(var(--fp-ripple-width) * 1deg),
        transparent calc(var(--fp-ripple-width) * 1deg)
      );
      mask: conic-gradient(
        from calc(var(--fp-ripple-direction) * 1deg - var(--fp-ripple-width) * 1deg / 2),
        #000 0deg,
        #000 calc(var(--fp-ripple-width) * 1deg),
        transparent calc(var(--fp-ripple-width) * 1deg)
      );
    }
    .ripple.active .ring {
      animation: fp-ripple 1.8s ease-out infinite;
    }
    .ripple .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--fp-ripple-color);
      opacity: 0.4;
    }
    .ripple.active .dot {
      opacity: 0.9;
    }
    @keyframes fp-ripple {
      0% {
        transform: scale(0.15);
        opacity: 0.7;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }
    /* === Tracker animations (live card). The zone outline is editor-only —
       renderTracker is called with editing:false here, so only the marker /
       line and ripples render. Movement transitions on the group's transform
       so the dot/triangle glides between sensor updates rather than jumping. === */
    .tracker-marker {
      transition: transform 0.4s ease-out;
    }
    .tracker-dot {
      animation: fp-tracker-pulse 1.4s ease-in-out infinite;
      transform-box: fill-box;
      transform-origin: center;
    }
    .tracker-ring {
      animation: fp-tracker-ring 2.2s ease-out infinite;
      opacity: 0;
    }
    .tracker-line {
      transition: transform 0.4s ease-out;
    }
    .tracker-line-stroke {
      opacity: 0.45;
      animation: fp-tracker-pulse 1.6s ease-in-out infinite;
    }
    .tracker-band {
      opacity: 0;
      animation: fp-tracker-band 2.2s ease-out infinite;
    }
    @keyframes fp-tracker-pulse {
      0%,
      100% {
        transform: scale(0.9);
        opacity: 0.7;
      }
      50% {
        transform: scale(1.1);
        opacity: 1;
      }
    }
    @keyframes fp-tracker-ring {
      0% {
        r: 0;
        opacity: 0.7;
      }
      100% {
        r: var(--fp-tracker-ring-max, 60px);
        opacity: 0;
      }
    }
    @keyframes fp-tracker-band {
      0% {
        opacity: 0.5;
        stroke-width: 1.5;
      }
      100% {
        opacity: 0;
        stroke-width: 14;
      }
    }
  `
];
st([
  W({ attribute: !1 })
], se.prototype, "hass", 2);
st([
  F()
], se.prototype, "_config", 2);
st([
  F()
], se.prototype, "_activeFloorId", 2);
st([
  F()
], se.prototype, "_zoomedAreaId", 2);
st([
  F()
], se.prototype, "_portrait", 2);
se = st([
  ki("easy-floorplan-card")
], se);
const br = {
  request: (e) => requestAnimationFrame(e),
  cancel: (e) => cancelAnimationFrame(e)
};
class vr {
  constructor(t, i) {
    this.frames = t, this.deliver = i, this._pending = null, this._hasPending = !1, this._handle = null;
  }
  /** True while a value is queued for delivery. */
  get pending() {
    return this._hasPending;
  }
  /** Queue a value, replacing any still waiting for this frame. */
  push(t) {
    this._pending = t, this._hasPending = !0, this._handle === null && (this._handle = this.frames.request(() => {
      this._handle = null, this._deliverPending();
    }));
  }
  /**
   * Deliver the newest queued value now. For the end of a gesture: pointerup
   * must land on the last position the pointer actually reported, not on
   * whatever the previous frame happened to catch.
   */
  settle() {
    this._cancelFrame(), this._deliverPending();
  }
  /** Drop anything queued without delivering it (the gesture was canceled). */
  cancel() {
    this._cancelFrame(), this._pending = null, this._hasPending = !1;
  }
  _cancelFrame() {
    this._handle !== null && (this.frames.cancel(this._handle), this._handle = null);
  }
  _deliverPending() {
    if (!this._hasPending) return;
    const t = this._pending;
    this._pending = null, this._hasPending = !1, this.deliver(t);
  }
}
const wr = "Apply needs Home Assistant's card editor — use Save instead.", Gm = "Save this card once first — it isn't on the dashboard yet.", Km = 200;
function Vm(e) {
  let t = e;
  for (let i = 0; t && i < Km; i++) {
    const n = t;
    if (typeof n._params?.saveCardConfig == "function") return n;
    t = t.parentNode ?? t.host ?? null;
  }
  return null;
}
async function Xm(e) {
  const t = Vm(e);
  if (!t) return { ok: !1, error: wr };
  if (t._params?.isNew) return { ok: !1, error: Gm };
  const i = t._cardConfig;
  if (!i || typeof i != "object")
    return { ok: !1, error: wr };
  try {
    await t._params.saveCardConfig(i);
  } catch (n) {
    return { ok: !1, error: `Could not save — ${n instanceof Error ? n.message : String(n)}` };
  }
  return typeof t._markDirtyStateClean == "function" ? t._markDirtyStateClean() : typeof t._dirty == "boolean" && (t._dirty = !1), { ok: !0 };
}
function _r(e) {
  return "text" in e.selector || "number" in e.selector;
}
function Ym(e, t, i) {
  const n = {};
  for (const o of i)
    t[o.name] !== e[o.name] && (n[o.name] = t[o.name]);
  return n;
}
function xr(e, t) {
  const i = {};
  for (const n of t) {
    if (!(n.name in e)) continue;
    let o = e[n.name];
    if ("text" in n.selector || "icon" in n.selector || "entity" in n.selector || "attribute" in n.selector)
      (o === "" || o == null) && (o = n.required ? "" : void 0);
    else if ("number" in n.selector) {
      const r = typeof o == "string" && o !== "" ? Number(o) : o;
      if (typeof r != "number" || !Number.isFinite(r)) {
        if (n.required) continue;
        o = void 0;
      } else {
        const a = n.selector.number;
        let s = n.name === "angle" ? (r % 360 + 360) % 360 : r;
        a.min !== void 0 && s < a.min && (s = a.min), a.max !== void 0 && s > a.max && (s = a.max), o = s;
      }
    } else "boolean" in n.selector && (o = !!o);
    i[n.name] = o;
  }
  return i;
}
const Ke = (e) => e, $r = ["binary_sensor", "cover", "lock"];
function fe(e, t) {
  return { fields: t.map((n) => e.fields.find((o) => o.name === n)).filter((n) => !!n), data: e.data, toPatch: e.toPatch };
}
const Dt = () => ({
  name: "angle",
  label: "Angle",
  selector: { number: { min: 0, max: 360, step: 1, mode: "slider", unit_of_measurement: "°" } }
}), M = (e, t) => ({ value: e, label: t }), N = (...e) => ({
  select: { mode: "dropdown", options: e }
});
function fs(e = he) {
  return xp(e);
}
function Zm(e, t = he) {
  return Ot(t, e)?.name ?? e;
}
function Qm(e, t = () => 0) {
  const i = X(e), n = Lt(e), o = _t(e), r = e.type === "skylight", a = [
    {
      name: "type",
      label: "Type",
      selector: N(M("door", "Door"), M("window", "Window"), M("skylight", "Skylight"))
    }
  ];
  if (r || a.push({
    name: "motion",
    label: "Motion",
    selector: N(
      M("swing", "Swing"),
      M("slide", "Slide"),
      // Not "garage / shutter": an external shutter is the Shutter field
      // below, a layer over any opening, and naming it here read as the
      // place to set one up.
      M("roll", "Roll up (garage)"),
      ...e.type === "window" ? [M("fixed", "Fixed (does not open)"), M("awning", "Top-hinged (awning)")] : []
    )
  }), a.push({
    name: "length",
    label: "Length",
    helper: r ? "The roof window's long side" : void 0,
    required: !0,
    selector: { number: { min: 1, mode: "box" } }
  }), r && (a.push({
    name: "width",
    label: "Width",
    helper: "The short side; the patch of sun it lays is this rectangle, moved",
    required: !0,
    selector: { number: { min: 1, mode: "box" } }
  }), a.push({
    name: "ceilingHeight",
    label: "Ceiling height",
    helper: "1 is an ordinary storey; higher throws the patch of sun further across the room",
    selector: { number: { min: 0.2, max: 4, step: 0.1, mode: "slider" } }
  })), !r && i === "swing") {
    const s = e.type === "door";
    a.push({
      name: "sash",
      label: s ? "Leaves" : "Sashes",
      helper: s ? "Double = two leaves meeting in the middle, hinged at each jamb" : "Single = one full-width sash (issue #73)",
      selector: s ? N(M("single", "Single (one leaf)"), M("double", "Double (two leaves)")) : N(M("double", "Double (two leaves)"), M("single", "Single sash"))
    });
  }
  return i === "swing" && Se(e) === "single" && a.push({
    name: "sashSpan",
    label: e.type === "door" ? "Leaf width" : "Sash width",
    helper: e.type === "door" ? "Share of the opening that actually swings — the rest is a fixed panel" : "Share of the opening that actually opens — the rest is fixed glass",
    selector: { number: { min: oa, max: 1, step: 0.05, mode: "slider" } }
  }), (e.type === "door" || r) && a.push({
    name: "glazed",
    label: "Glazed",
    helper: r ? "On (a roof window): only the blind stops the light. Off (a hatch): the sash does" : "Lets sunlight through even when shut — a patio or French door",
    selector: { boolean: {} }
  }), a.push({
    name: "sunlight",
    label: "Lets sunlight in",
    helper: "Off makes it wall to the sun — for a solid door the plan draws open",
    selector: { boolean: {} }
  }), i === "swing" && Se(e) === "single" && a.push({
    name: "hinge",
    label: "Hinge",
    selector: N(M("left", "Left"), M("right", "Right"))
  }), !r && i === "swing" && a.push({
    name: "opens",
    label: "Opens",
    selector: N(M("this", "This side"), M("other", "Other side"))
  }), r && a.push({
    name: "opens",
    label: "Hinged at",
    helper: "Which edge the sash is hung from, and the edge its blind comes down from",
    selector: N(M("this", "Top edge"), M("other", "Bottom edge"))
  }), !r && i === "slide" && (o || a.push({
    name: "slide",
    label: "Slide",
    selector: N(M("left", "To left"), M("right", "To right"))
  }), a.push({
    name: "style",
    label: "Style",
    selector: N(
      M("single", "Single"),
      M("bypass", "Bypass (stack)"),
      M("biparting", "Biparting (into the walls)"),
      M("biparting-bypass", "Biparting (over fixed panels)"),
      M("converging", "Converging (both panels stack in the middle)")
    )
  })), a.push({
    name: "entity",
    label: "Entity",
    // Says locks are usable, because nothing else would: a lock is neither a
    // contact nor a cover, and its states are `locked` / `unlocked` rather
    // than anything that looks like open/closed (issue #176).
    // The device-class promise is a wall opening's. A skylight is deliberately
    // exempt from that inference (see `editor.ts`, where the guard is) —
    // Home Assistant has no roof-window class, so a velux binds to a `cover`
    // with `device_class: window`, the very class that would turn it back into
    // one. Repeating the promise here told a skylight author the opposite of
    // what the card does.
    helper: r ? "Contact or cover for the sash. A roof window keeps its type whatever the entity's device class says" : o ? "Contact, cover or lock. Drives the first leaf; type and motion follow its device class" : "Contact, cover or lock — a lock reads unlocked as open. Type and motion follow its device class",
    selector: { entity: { filter: [{ domain: $r }] } }
  }), o && e.entity && a.push({
    name: "secondaryEntity",
    label: "Second leaf",
    helper: "Its own sensor for the other leaf — leave empty to move both together",
    selector: { entity: { filter: [{ domain: $r }] } }
  }), a.push({
    name: "shutterEntity",
    label: r ? "Blind" : "Shutter",
    helper: r ? "Blackout blind over the glass — a cover, or a contact sensor. This is what stops the light" : "External shutter over this opening — a cover, or a contact sensor",
    selector: { entity: { filter: [{ domain: ["cover", "binary_sensor"] }] } }
  }), e.shutterEntity && (r || a.push({
    name: "shutterStyle",
    label: "Shutter type",
    helper: "Hinged panels fold back against the wall; roll-up slats disappear upward",
    selector: N(M("swing", "Hinged (louvered panels)"), M("roll", "Roll-up (slats)"))
  }), !r && We(e) === "swing" && a.push({
    name: "shutterSide",
    label: "Shutter side",
    helper: "Which side of the wall the panels hang on",
    selector: N(M("far", "Away from the sash"), M("near", "Same side as the sash"))
  }), !r && We(e) === "swing" && a.push({
    name: "shutterSecondaryEntity",
    label: "Second shutter panel",
    helper: "Its own contact for the other panel — leave empty to fold both together",
    selector: { entity: { filter: [{ domain: ["binary_sensor", "cover"] }] } }
  }), a.push({
    name: "shutterInvert",
    label: r ? "Invert blind animation" : "Invert shutter animation",
    selector: { boolean: {} }
  })), a.push({
    name: "invert",
    label: e.type === "door" ? "Invert door animation" : r ? "Invert skylight animation" : "Invert window animation",
    helper: e.entity ? void 0 : (
      // Only a swing door draws open with no sensor to ask
      // (openingDefaultOpen) — everything else, door, window or roof light,
      // draws shut.
      e.type === "door" && X(e) === "swing" ? "No sensor bound — draws shut instead of open" : "No sensor bound — draws open instead of shut"
    ),
    selector: { boolean: {} }
  }), a.push(Dt()), e.entity && (a.push({
    name: "showIcon",
    label: "Show icon",
    helper: X(e) === "roll" ? "A raised roll-up leaves only a line — this puts its state beside it, and opens its dialog when tapped" : "Shows this opening's state beside it, and opens its dialog when tapped",
    selector: { boolean: {} }
  }), e.showIcon && a.push({
    name: "icon",
    label: "Icon",
    helper: "Overrides the entity's own icon, which changes with its state",
    selector: { icon: {} }
  })), e.shutterEntity && (a.push({
    name: "showShutterIcon",
    label: "Shutter icon",
    helper: !e.entity && We(e) === "roll" ? "A raised roll-up leaves only a line — this puts the shutter's state beside it, and opens it when tapped" : "Shows the shutter's state beside the opening, and opens it when tapped",
    selector: { boolean: {} }
  }), (e.showShutterIcon ?? Yt(e)) && a.push({
    name: "shutterIcon",
    label: "Icon",
    helper: "Overrides the shutter entity's own icon, which changes with its state",
    selector: { icon: {} }
  })), e.entity && e.shutterEntity && a.push({
    name: "tapTarget",
    label: "Tap opens",
    helper: "The other one moves to press-and-hold. Opens the dialog; use Tap action below to move the shutter itself",
    selector: N(
      M(
        "opening",
        e.type === "door" ? "The door" : r ? "The skylight" : "The window"
      ),
      M("shutter", r ? "The blind" : "The shutter")
    )
  }), (e.entity || e.shutterEntity) && a.push(
    {
      name: "tap_action",
      label: "Tap action",
      selector: {
        ui_action: {
          default_action: Qn(e, "tap", t)?.config.action ?? "none"
        }
      }
    },
    {
      name: "hold_action",
      label: "Hold action",
      // With both bound, holding reaches whichever entity the tap does not.
      // With only one, there is nothing left for hold to open.
      helper: e.entity && e.shutterEntity ? "Opens the entity the tap doesn't" : void 0,
      selector: {
        ui_action: {
          default_action: e.entity && e.shutterEntity ? "more-info" : "none"
        }
      }
    },
    {
      name: "double_tap_action",
      label: "Double-tap action",
      selector: { ui_action: { default_action: "none" } }
    }
  ), {
    fields: a,
    data: {
      type: e.type,
      motion: i,
      length: e.length,
      // The *effective* pair, not the raw ones: a skylight placed without a
      // stated width still has one (SKYLIGHT_WIDTH_RATIO of its length), and
      // a Width box that opened empty on a rectangle plainly drawn on the
      // canvas would be a box claiming the drawing has no width.
      width: de(e),
      ceilingHeight: to(e),
      hinge: e.flipH ? "right" : "left",
      opens: e.flipV ? "other" : "this",
      slide: e.flipH ? "right" : "left",
      style: n,
      sash: Se(e),
      entity: e.entity ?? "",
      secondaryEntity: e.secondaryEntity ?? "",
      glazed: Ri(e),
      sunlight: e.sunlight ?? !0,
      shutterEntity: e.shutterEntity ?? "",
      shutterSecondaryEntity: e.shutterSecondaryEntity ?? "",
      shutterStyle: We(e),
      shutterSide: e.shutterFlipV ? "near" : "far",
      shutterInvert: e.shutterInvert ?? !1,
      showShutterIcon: e.showShutterIcon ?? Yt(e),
      shutterIcon: e.shutterIcon ?? "",
      showIcon: e.showIcon ?? !1,
      icon: e.icon ?? "",
      tapTarget: e.tapTarget ?? "opening",
      invert: e.invert ?? !1,
      angle: e.angle,
      tap_action: e.tap_action,
      hold_action: e.hold_action,
      double_tap_action: e.double_tap_action
    },
    toPatch(s) {
      const l = {};
      for (const [h, p] of Object.entries(s))
        if (h === "shutterEntity")
          l.shutterEntity = p, p || (l.shutterStyle = void 0, l.shutterFlipV = void 0, l.shutterInvert = void 0, l.shutterActiveColor = void 0, l.shutterSecondaryEntity = void 0, l.tapTarget = void 0, l.showShutterIcon = void 0, l.shutterIcon = void 0);
        else if (h === "sunlight")
          l.sunlight = p ? void 0 : !1;
        else if (h === "glazed")
          l.glazed = e.type === "door" ? p ? !0 : void 0 : r ? p ? void 0 : !1 : void 0;
        else if (h === "width")
          l.width = r && typeof p == "number" && p > 0 ? p : void 0;
        else if (h === "ceilingHeight")
          l.ceilingHeight = r && typeof p == "number" && p !== 1 ? p : void 0;
        else if (h === "entity")
          l.entity = p, p || (l.showIcon = void 0, l.icon = void 0);
        else if (h === "shutterSide") l.shutterFlipV = p === "near" || void 0;
        else if (h === "shutterInvert") l.shutterInvert = p || void 0;
        else if (h === "tapTarget") l.tapTarget = p === "shutter" ? "shutter" : void 0;
        else {
          if (h === "showShutterIcon") continue;
          if (h === "showIcon")
            l.showIcon = p ? !0 : void 0, p || (l.icon = void 0);
          else if (h === "motion") {
            const c = p === "slide" || p === "roll" || p === "fixed" || p === "awning" ? p : void 0;
            l.motion = c, p !== "slide" && (l.sliderStyle = void 0), p !== "swing" && (l.sashSpan = void 0), _t({
              ...e,
              motion: c,
              sliderStyle: p === "slide" ? e.sliderStyle : void 0
            }) || (l.secondaryEntity = void 0);
          } else h === "sashSpan" ? l.sashSpan = typeof p == "number" && p < 1 ? p : void 0 : h === "sash" ? (l.sash = p === fn(e.type) ? void 0 : p, _t({ ...e, sash: p }) || (l.secondaryEntity = void 0), p === "double" && (l.sashSpan = void 0)) : h === "shutterStyle" ? (l.shutterStyle = p, p !== "swing" && (l.shutterSecondaryEntity = void 0)) : h === "hinge" || h === "slide" ? l.flipH = p === "right" || void 0 : h === "opens" ? l.flipV = p === "other" || void 0 : h === "style" ? (l.sliderStyle = p === "single" ? void 0 : p, Ia(p) || (l.secondaryEntity = void 0)) : h === "invert" ? l.invert = p || void 0 : h === "type" ? (l.type = p, p === "skylight" ? (l.motion = void 0, l.sliderStyle = void 0, l.sashSpan = void 0, l.sash = void 0, l.secondaryEntity = void 0, l.shutterStyle = void 0, l.shutterFlipV = void 0, l.shutterSecondaryEntity = void 0, l.glazed = void 0) : r && (l.width = void 0, l.ceilingHeight = void 0, l.glazed = void 0, l.motion = void 0, l.sliderStyle = void 0, l.sashSpan = void 0, l.sash = void 0, l.secondaryEntity = void 0, l.shutterStyle = void 0, l.shutterFlipV = void 0, l.shutterSecondaryEntity = void 0)) : l[h] = p;
        }
      if (!("shutterEntity" in s && !s.shutterEntity)) {
        const h = { entity: "entity" in l ? l.entity : e.entity }, p = Yt(h);
        if ("showShutterIcon" in s) {
          const c = !!s.showShutterIcon;
          l.showShutterIcon = c === p ? void 0 : c, c || (l.shutterIcon = void 0);
        } else "entity" in l && (e.showShutterIcon === p && (l.showShutterIcon = void 0), e.shutterIcon && !(e.showShutterIcon ?? p) && (l.shutterIcon = void 0));
      }
      return l;
    }
  };
}
function no(e, t) {
  return e?.entities.length ? { entity: { include_entities: t && !e.entities.includes(t) ? [...e.entities, t] : e.entities } } : { entity: {} };
}
function oo(e, t) {
  if (!e?.entities.length) return t;
  const n = `Only entities in ${e.name ? `the ${e.name} area` : "this area"} — turn off “Filter entities” on the area to see all`;
  return t ? `${t}. ${n}` : n;
}
function ti(e) {
  if ((e.display ?? "badge") === "ripple") return "none";
  const t = Ct(e);
  if (t !== "icon") return t;
  const i = e.iconAnimation ?? "auto";
  return i === "spin" || i === "pulse" ? i : i === "auto" ? _a(e.entity) ?? "icon" : "icon";
}
function ro(e) {
  return (e.display ?? "badge") !== "badge";
}
function ms(e, t) {
  const i = {
    badgeContent: e === "value" ? "value" : e === "none" ? "none" : "icon",
    // Touching the badge retires the `showIcon` boolean it replaced (issue
    // #106), so a migrated config carries one setting rather than two that
    // could later be edited into disagreeing. Configs nobody touches keep
    // working through badgeContentOf's fallback.
    showIcon: void 0,
    display: t ? e === "none" ? "ripple" : "iconRipple" : "badge"
  };
  return e !== "value" && e !== "none" && (i.iconAnimation = e === "icon" ? "none" : e), i;
}
function Jm(e, t) {
  return {
    fields: [
      {
        name: "entity",
        label: "Entity",
        required: !0,
        helper: oo(t),
        selector: no(t, e.entity)
      },
      {
        name: "attribute",
        label: "Attribute",
        helper: "Show this attribute instead of the state (e.g. current_temperature)",
        selector: { attribute: { entity_id: e.entity } }
      }
    ],
    data: { entity: e.entity ?? "", attribute: e.attribute ?? "" },
    toPatch: Ke
  };
}
function eg(e) {
  return {
    fields: [
      { name: "name", label: "Name", selector: { text: {} } },
      {
        name: "showName",
        label: "Show name",
        helper: "Adds the name to the label line",
        selector: { boolean: {} }
      }
    ],
    data: { name: e.name ?? "", showName: e.showName ?? !1 },
    toPatch: Ke
  };
}
function tg(e) {
  return {
    fields: [
      {
        name: "showState",
        label: "Show state",
        helper: "Adds this entity's own state to the label line",
        selector: { boolean: {} }
      }
    ],
    data: { showState: e.showState ?? e.kind === "sensor" },
    toPatch: Ke
  };
}
function ig(e) {
  const t = [
    {
      name: "labelPosition",
      label: "Label position",
      helper: "Beside the badge instead of under it — a long reading then grows one way only",
      selector: N(M("below", "Below"), M("left", "Left"), M("right", "Right"))
    },
    {
      name: "labelSize",
      label: "Label size",
      selector: { number: { min: 8, max: 40, step: 1, mode: "slider", unit_of_measurement: "px" } }
    },
    {
      name: "disableLabelColor",
      label: "Disable label color",
      helper: "Keeps the text in its default color even if the icon changes color",
      selector: { boolean: {} }
    }
  ];
  return e.disableLabelColor && t.push({
    name: "useCustomLabelColor",
    label: "Own color",
    helper: "Override the theme default with a fixed custom color",
    selector: { boolean: {} }
  }), {
    fields: t,
    data: {
      labelPosition: Xn(e),
      labelSize: e.labelSize ?? ua,
      disableLabelColor: e.disableLabelColor ?? !1,
      useCustomLabelColor: e.useCustomLabelColor ?? !1,
      labelCustomColor: e.labelCustomColor ?? ""
    },
    toPatch: (i) => {
      const n = { ...i }, o = n.disableLabelColor ?? e.disableLabelColor ?? !1, r = n.useCustomLabelColor ?? e.useCustomLabelColor ?? !1;
      return n.labelPosition === "below" && (n.labelPosition = void 0), n.disableLabelColor === !1 && (n.disableLabelColor = void 0), n.useCustomLabelColor === !1 && (n.useCustomLabelColor = void 0), o ? r || (n.labelCustomColor = void 0) : (n.useCustomLabelColor = void 0, n.labelCustomColor = void 0), n.labelCustomColor === "" && (n.labelCustomColor = void 0), n;
    }
  };
}
function ng(e, t) {
  const i = [
    {
      name: "badgeMode",
      label: "Badge shows",
      helper: "Animations play only while the entity is active. Value puts the reading in the badge, falling back to the icon when there is no number",
      selector: N(
        M("icon", "Icon, still"),
        M("spin", "Icon, spinning"),
        M("pulse", "Icon, pulsing"),
        M("value", "Value"),
        M("none", "Nothing")
      )
    }
  ], n = Pe(e);
  return ti(e) === "value" && n.length && i.push({
    name: "badgeEntity",
    label: "Badge reads",
    helper: "Which of this device's readings the badge shows",
    selector: N(
      M("primary", t?.primaryLabel || e.entity || "Main entity"),
      ...n.map(
        (o, r) => M(
          String(r),
          t?.readingLabels?.[r] || o.entity || (o.attribute ? `${e.entity || "this device"} · ${o.attribute}` : `Reading ${r + 1}`)
        )
      )
    )
  }), i.push(
    {
      name: "size",
      label: "Size",
      selector: { number: { min: 16, max: 160, step: 2, mode: "slider", unit_of_measurement: "px" } }
    },
    Dt()
  ), {
    fields: i,
    data: {
      badgeMode: ti(e),
      // The dropdown's values are strings, so the stored index (or the legacy
      // "secondary") is spelled the same way here; toPatch turns it back into
      // a number. Opens on what the badge is *actually* reading when nothing
      // is chosen, which is the whole point of badgeSource (issue #136).
      badgeEntity: String(Ma(e.badgeEntity) ?? t?.source ?? "primary"),
      size: e.size ?? je,
      angle: e.angle ?? 0
    },
    // "Badge shows" is the editor's spelling of three config keys (issue
    // #127) — expand it back, carrying the ripple state off the item since
    // that control lives in another group now.
    toPatch: (o) => {
      let r = o;
      if ("badgeEntity" in r && typeof r.badgeEntity == "string" && r.badgeEntity !== "primary" && (r = { ...r, badgeEntity: Number(r.badgeEntity) }), !("badgeMode" in r)) return r;
      const { badgeMode: a, ...s } = r;
      return {
        ...s,
        ...ms(a ?? ti(e), ro(e))
      };
    }
  };
}
function og(e, t) {
  const i = ro(e), n = $a(e.entity, t), o = e.kind === "light" || e.entity?.startsWith("light.");
  if (!n && !o) return;
  const r = [];
  return n && (r.push({
    name: "ripple",
    label: "Ripple",
    // "Detected" rather than "the sensor is on": this is offered to a
    // device_tracker and a person too, and neither of those is a sensor.
    // It stays vague about *what* is detected because a vibration sensor
    // rings for a knock, not for presence (issue #202).
    helper: "Draws a pulsing ring while this device detects something",
    selector: { boolean: {} }
  }), i && (r.push({
    name: "rippleSize",
    label: "Ripple size",
    selector: {
      number: { min: 40, max: 400, step: 4, mode: "slider", unit_of_measurement: "px" }
    }
  }), r.push({
    name: "rippleDirection",
    label: "Ripple direction",
    selector: {
      number: { min: 0, max: 360, step: 1, mode: "slider", unit_of_measurement: "°" }
    }
  }), r.push({
    name: "rippleWidth",
    label: "Ripple width",
    selector: {
      number: { min: 0, max: 360, step: 1, mode: "slider", unit_of_measurement: "°" }
    }
  }))), o && (r.push({
    name: "glow",
    label: "Cast light",
    helper: "Pools the light's own color onto the plan; overlapping lights mix",
    selector: { boolean: {} }
  }), e.glow && r.push(
    {
      name: "glowRadius",
      label: "Light radius",
      selector: { number: { min: 20, max: 600, step: 10, mode: "slider" } }
    },
    {
      name: "glowColor",
      label: "Light color",
      helper: "Only for bulbs that can't report a color; others use their own",
      selector: { text: {} }
    }
  )), {
    fields: r,
    data: {
      ripple: i,
      rippleSize: e.rippleSize ?? Ti,
      rippleDirection: e.rippleDirection ?? Ci,
      rippleWidth: e.rippleWidth ?? Ii,
      glow: e.glow ?? !1,
      glowRadius: e.glowRadius ?? Mi,
      glowColor: e.glowColor ?? ""
    },
    // "Ripple" is the other half of #127's three-key spelling — same expansion
    // as the badge group's, with the badge mode read off the item.
    toPatch: (a) => {
      if (!("ripple" in a)) return a;
      const { ripple: s, ...l } = a;
      return { ...l, ...ms(ti(e), !!s) };
    }
  };
}
function rg(e) {
  const t = [
    {
      name: "showOnlyWhenZoomed",
      label: "Only show when zoomed into area",
      helper: "Hidden on the full plan, and shown once the room it sits in is zoomed into",
      selector: { boolean: {} }
    },
    {
      name: "enableHideByEntity",
      label: "Hide by condition (Entire Object)",
      selector: { boolean: {} }
    }
  ];
  if (e.enableHideByEntity) {
    const i = e.hideEntity || e.entity;
    t.push(
      {
        name: "hideEntity",
        label: "Evaluation Entity (Optional)",
        helper: "Leave empty to use the main object entity",
        selector: { entity: {} }
      },
      {
        name: "hideAttribute",
        label: "Evaluation Attribute (Optional)",
        helper: "Leave empty to use the entity's state instead of an attribute",
        selector: { attribute: { entity_id: i } }
      },
      {
        name: "hideMode",
        label: "Condition Type",
        selector: { select: { mode: "dropdown", options: [{ value: "state", label: "State Match" }, { value: "threshold", label: "Numeric Threshold" }] } }
      },
      {
        name: "hideOperator",
        label: "Operator",
        selector: {
          select: {
            mode: "dropdown",
            options: e.hideMode === "threshold" ? [{ value: "<", label: "<" }, { value: "<=", label: "<=" }, { value: "==", label: "==" }, { value: "!=", label: "!=" }, { value: ">=", label: ">=" }, { value: ">", label: ">" }] : [{ value: "==", label: "==" }, { value: "!=", label: "!=" }]
          }
        }
      }
    ), e.hideMode === "threshold" ? t.push({
      name: "hideThreshold",
      label: "Threshold Value",
      selector: { number: { mode: "box", step: "any" } }
    }) : t.push({
      name: "hideState",
      label: "Hide State",
      helper: e.hideAttribute ? "Enter the exact attribute value that triggers the hide action" : "Select the state that triggers the hide action",
      selector: e.hideAttribute || !i ? { text: {} } : { state: { entity_id: i } }
    }), t.push({
      name: "hideInvert",
      label: "Invert condition",
      helper: "Hide when condition is NOT met",
      selector: { boolean: {} }
    });
  }
  if (t.push({
    name: "enableHideStateByEntity",
    label: "Hide State by condition",
    helper: "Hides only the state text below the icon based on a condition",
    selector: { boolean: {} }
  }), e.enableHideStateByEntity) {
    const i = e.hideStateEntity || e.entity;
    t.push(
      {
        name: "hideStateEntity",
        label: "State Eval. Entity (Optional)",
        helper: "Leave empty to use the main object entity",
        selector: { entity: {} }
      },
      {
        name: "hideStateAttribute",
        label: "State Eval. Attribute (Optional)",
        helper: "Leave empty to use the entity's state instead of an attribute",
        selector: { attribute: { entity_id: i } }
      },
      {
        name: "hideStateMode",
        label: "Condition Type",
        selector: { select: { mode: "dropdown", options: [{ value: "state", label: "State Match" }, { value: "threshold", label: "Numeric Threshold" }] } }
      },
      {
        name: "hideStateOperator",
        label: "Operator",
        selector: {
          select: {
            mode: "dropdown",
            options: e.hideStateMode === "threshold" ? [{ value: "<", label: "<" }, { value: "<=", label: "<=" }, { value: "==", label: "==" }, { value: "!=", label: "!=" }, { value: ">=", label: ">=" }, { value: ">", label: ">" }] : [{ value: "==", label: "==" }, { value: "!=", label: "!=" }]
          }
        }
      }
    ), e.hideStateMode === "threshold" ? t.push({
      name: "hideStateThreshold",
      label: "Threshold Value",
      selector: { number: { mode: "box", step: "any" } }
    }) : t.push({
      name: "hideStateMatch",
      label: "Hide State Match",
      helper: e.hideStateAttribute ? "Enter the exact attribute value that triggers hiding the text" : "Select the state that triggers hiding the text",
      selector: e.hideStateAttribute || !i ? { text: {} } : { state: { entity_id: i } }
    }), t.push({
      name: "hideStateInvert",
      label: "Invert condition",
      helper: "Hide text when condition is NOT met",
      selector: { boolean: {} }
    });
  }
  if (t.push({
    name: "enableHideBadgeByEntity",
    label: "Hide Badge by condition",
    helper: "Hides only the badge (icon/bubble) based on a condition",
    selector: { boolean: {} }
  }), e.enableHideBadgeByEntity) {
    const i = e.hideBadgeEntity || e.entity;
    t.push(
      {
        name: "hideBadgeEntity",
        label: "Badge Eval. Entity (Optional)",
        helper: "Leave empty to use the main object entity",
        selector: { entity: {} }
      },
      {
        name: "hideBadgeAttribute",
        label: "Badge Eval. Attribute (Optional)",
        helper: "Leave empty to use the entity's state instead of an attribute",
        selector: { attribute: { entity_id: i } }
      },
      {
        name: "hideBadgeMode",
        label: "Condition Type",
        selector: { select: { mode: "dropdown", options: [{ value: "state", label: "State Match" }, { value: "threshold", label: "Numeric Threshold" }] } }
      },
      {
        name: "hideBadgeOperator",
        label: "Operator",
        selector: {
          select: {
            mode: "dropdown",
            options: e.hideBadgeMode === "threshold" ? [{ value: "<", label: "<" }, { value: "<=", label: "<=" }, { value: "==", label: "==" }, { value: "!=", label: "!=" }, { value: ">=", label: ">=" }, { value: ">", label: ">" }] : [{ value: "==", label: "==" }, { value: "!=", label: "!=" }]
          }
        }
      }
    ), e.hideBadgeMode === "threshold" ? t.push({
      name: "hideBadgeThreshold",
      label: "Threshold Value",
      selector: { number: { mode: "box", step: "any" } }
    }) : t.push({
      name: "hideBadgeMatch",
      label: "Hide Badge Match",
      helper: e.hideBadgeAttribute ? "Enter the exact attribute value that triggers hiding the badge" : "Select the state that triggers hiding the badge",
      selector: e.hideBadgeAttribute || !i ? { text: {} } : { state: { entity_id: i } }
    }), t.push({
      name: "hideBadgeInvert",
      label: "Invert condition",
      helper: "Hide badge when condition is NOT met",
      selector: { boolean: {} }
    });
  }
  return {
    fields: t,
    data: {
      showOnlyWhenZoomed: e.showOnlyWhenZoomed ?? !1,
      enableHideByEntity: e.enableHideByEntity ?? !1,
      hideEntity: e.hideEntity ?? "",
      hideAttribute: e.hideAttribute ?? "",
      hideMode: e.hideMode ?? "state",
      hideState: e.hideState ?? "",
      hideOperator: e.hideOperator ?? "==",
      hideThreshold: e.hideThreshold ?? 0,
      hideInvert: e.hideInvert ?? !1,
      enableHideStateByEntity: e.enableHideStateByEntity ?? !1,
      hideStateEntity: e.hideStateEntity ?? "",
      hideStateAttribute: e.hideStateAttribute ?? "",
      hideStateMode: e.hideStateMode ?? "state",
      hideStateMatch: e.hideStateMatch ?? "",
      hideStateOperator: e.hideStateOperator ?? "==",
      hideStateThreshold: e.hideStateThreshold ?? 0,
      hideStateInvert: e.hideStateInvert ?? !1,
      enableHideBadgeByEntity: e.enableHideBadgeByEntity ?? !1,
      hideBadgeEntity: e.hideBadgeEntity ?? "",
      hideBadgeAttribute: e.hideBadgeAttribute ?? "",
      hideBadgeMode: e.hideBadgeMode ?? "state",
      hideBadgeMatch: e.hideBadgeMatch ?? "",
      hideBadgeOperator: e.hideBadgeOperator ?? "==",
      hideBadgeThreshold: e.hideBadgeThreshold ?? 0,
      hideBadgeInvert: e.hideBadgeInvert ?? !1
    },
    // Off is the default, so it leaves no key behind — an untouched device's
    // YAML stays as short as it was before this switch existed.
    //
    // Only when the user actually touched it, though. `_renderForm` diffs the
    // form against the event and passes on just the keys that changed, and
    // `_updateItem` merges with a spread — so a key that is merely *present*
    // and undefined overwrites what the config had. Writing it unconditionally
    // meant every one of this group's two dozen other fields silently switched
    // this one off. The sibling forms all prune inside a walk of
    // `Object.entries(patch)`, which has the same guard built in.
    toPatch: (i) => "showOnlyWhenZoomed" in i ? { ...i, showOnlyWhenZoomed: i.showOnlyWhenZoomed || void 0 } : i
  };
}
function ag(e) {
  return {
    fields: [
      {
        name: "hideWhenInactive",
        label: "Only when active",
        helper: "Hide on the card while the entity is off/idle (still editable here)",
        selector: { boolean: {} }
      },
      {
        name: "tap_action",
        label: "Tap action",
        selector: { ui_action: { default_action: Vr(e.entity).action } }
      },
      { name: "hold_action", label: "Hold action", selector: { ui_action: { default_action: "none" } } },
      {
        name: "double_tap_action",
        label: "Double-tap action",
        selector: { ui_action: { default_action: "none" } }
      }
    ],
    data: {
      hideWhenInactive: e.hideWhenInactive ?? !1,
      tap_action: e.tap_action,
      hold_action: e.hold_action,
      double_tap_action: e.double_tap_action
    },
    toPatch: Ke
  };
}
function sg(e, t) {
  const i = [
    {
      name: "text",
      label: "Text",
      // Required only while nothing else fills the label. A text with no words
      // and no entity is an invisible element, which is what this guarded
      // against; with a reading bound the words are optional, and demanding
      // them for a label that is only ever a number would be asking for a
      // placeholder to delete.
      required: !e.entity,
      helper: e.entity ? "Shown in front of the reading — leave empty for the value alone" : void 0,
      selector: { text: {} }
    },
    {
      name: "entity",
      label: "Entity",
      helper: oo(t, "Shows this entity's value, formatted as HA formats it"),
      selector: no(t, e.entity)
    }
  ];
  return e.entity && i.push({
    name: "attribute",
    label: "Attribute",
    helper: "Show this attribute instead of the state (e.g. current_temperature)",
    selector: { attribute: { entity_id: e.entity } }
  }), i.push(
    {
      name: "size",
      label: "Size",
      selector: { number: { min: 8, max: 200, mode: "slider", unit_of_measurement: "px" } }
    },
    Dt()
  ), {
    fields: i,
    data: {
      text: e.text ?? "",
      entity: e.entity ?? "",
      attribute: e.attribute ?? "",
      size: e.size ?? vt,
      angle: e.angle ?? 0
    },
    toPatch: (n) => "entity" in n && !n.entity ? { ...n, attribute: void 0 } : n
  };
}
function lg(e, t, i = he) {
  const n = fs(i);
  return {
    fields: [
      {
        name: "type",
        label: "Type",
        selector: { select: { mode: "dropdown", options: n.some((r) => r.id === e.type) ? n.map((r) => ({ value: r.id, label: r.name })) : [{ value: e.type, label: `${e.type} (missing)` }, ...n.map((r) => ({ value: r.id, label: r.name }))] } }
      },
      // L-shaped sectional only (#40): which side the chaise extends on,
      // facing the sofa from the front. Conditional, in the same shape
      // openingForm uses for its hinge / slide fields.
      ...e.type === "sectional" ? [
        {
          name: "hand",
          label: "Chaise side",
          helper: "Facing the sofa from the front",
          selector: N(M("right", "right"), M("left", "left"))
        }
      ] : [],
      { name: "w", label: "Width", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "h", label: "Height", required: !0, selector: { number: { min: 10, mode: "box" } } },
      Dt(),
      // Optional entity that makes the drawing live (issue #82) — a soil
      // sensor on a plant, a contact sensor on a cabinet. Last, because most
      // furniture is decoration and never binds anything.
      {
        name: "entity",
        label: "Entity",
        helper: oo(t, "Optional — lets the drawing change color with a sensor"),
        selector: no(t, e.entity)
      },
      // Clicking it changes floor (issue #121). Offered on any piece rather
      // than only on the built-in `stairs`, because a plan can draw its own
      // staircase and a rule keyed on one symbol id would leave those out.
      // Empty on everything by default, so it is a row and not a nag.
      {
        name: "goToFloor",
        label: "Go to floor",
        helper: "Clicking this piece changes floor — for a staircase",
        selector: N(M("", "Nothing"), M("up", "Up one floor"), M("down", "Down one floor"))
      },
      // Actions on the piece itself (issue #284), offered on every piece the
      // way a room's actions are — furniture with no entity can still navigate or call
      // a service, and requiring one first would rule that out.
      //
      // The tap helper names what it replaces, but only when there is
      // something to replace: on an ordinary piece a tap does nothing today,
      // and claiming it "replaces the floor change" would describe a staircase
      // this piece is not.
      {
        name: "tap_action",
        label: "Tap action",
        helper: e.goToFloor ? "Replaces the floor change. Put an action on hold or double-tap to keep both" : void 0,
        selector: { ui_action: { default_action: "none" } }
      },
      { name: "hold_action", label: "Hold action", selector: { ui_action: { default_action: "none" } } },
      {
        name: "double_tap_action",
        label: "Double-tap action",
        selector: { ui_action: { default_action: "none" } }
      }
    ],
    data: {
      type: e.type,
      ...e.type === "sectional" ? { hand: e.hand ?? "right" } : {},
      w: e.w,
      h: e.h,
      angle: e.angle ?? 0,
      entity: e.entity ?? "",
      goToFloor: e.goToFloor ?? "",
      tap_action: e.tap_action,
      hold_action: e.hold_action,
      double_tap_action: e.double_tap_action
    },
    // "" is the empty option, and means the piece is ordinary furniture.
    toPatch: (r) => "goToFloor" in r && !r.goToFloor ? { ...r, goToFloor: void 0 } : r
  };
}
function cg(e) {
  return {
    fields: [
      { name: "w", label: "Width", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "h", label: "Height", required: !0, selector: { number: { min: 10, mode: "box" } } },
      { name: "x", label: "X", required: !0, selector: { number: { mode: "box" } } },
      { name: "y", label: "Y", required: !0, selector: { number: { mode: "box" } } },
      Dt(),
      {
        name: "dotSize",
        label: "Dot size",
        selector: { number: { min: 6, max: 80, mode: "slider", unit_of_measurement: "px" } }
      }
    ],
    data: {
      w: e.w,
      h: e.h,
      x: Math.round(e.x),
      y: Math.round(e.y),
      angle: e.angle ?? 0,
      dotSize: e.dotSize ?? Dn
    },
    toPatch: Ke
  };
}
function hg(e, t = []) {
  return {
    fields: [{ name: "name", label: "Name", selector: t.length ? {
      select: {
        options: t.map((n) => ({ value: n, label: n })),
        custom_value: !0,
        mode: "dropdown",
        sort: !1
      }
    } : { text: {} } }],
    data: { name: e.name ?? "" },
    toPatch: Ke
  };
}
function dg(e) {
  return {
    fields: [
      { name: "showName", label: "Show name", selector: { boolean: {} } },
      // Only while the name renders — same rule the item form uses for its
      // label size.
      ...e.showName ?? !0 ? [
        {
          name: "labelSize",
          label: "Name size",
          selector: {
            number: { min: 8, max: 40, step: 1, mode: "slider", unit_of_measurement: "px" }
          }
        }
      ] : [],
      {
        name: "opacity",
        label: "Fill opacity",
        selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } }
      },
      // How close tapping the room goes (issue #222). Only worth asking while
      // a tap still zooms: an area with its own `tap_action` has replaced the
      // zoom outright, and a number that does nothing is worse than no number.
      //
      // A toggle *and* a slider, rather than the slider alone resting at the
      // fit's ceiling. That earlier shape made "fit" and an explicit 4 the
      // same position, so a room whose fit is 1.15 — the ordinary case, and
      // the one this feature exists for — could not be told to zoom to 4 at
      // all. "Fit" is not a number on this scale; it is the absence of one,
      // and it needs its own control to say so.
      ...e.tap_action ? [] : [
        {
          name: "fitZoom",
          label: "Fit the room to the card",
          helper: "Off lets you set how close a tap goes",
          selector: { boolean: {} }
        },
        ...e.zoom === void 0 ? [] : [
          {
            name: "zoom",
            label: "Zoom level",
            helper: "How close a tap goes",
            selector: {
              number: {
                min: 1,
                max: Wr,
                step: 0.5,
                mode: "slider"
              }
            }
          }
        ]
      ],
      // Optional entity that makes the room itself live (issue #6) — a presence
      // sensor that lights the room while it is occupied. Last, because most
      // areas are just outlines and never bind anything.
      {
        name: "entity",
        label: "Entity",
        helper: "Optional — lets the room fill change color with a sensor",
        selector: { entity: {} }
      },
      // Only meaningful once something drives the colour. Offered here rather
      // than in the editor's colour rows because both are plain selectors, and
      // "Active opacity" belongs beside "Fill opacity".
      ...e.entity ? [
        {
          name: "activeOpacity",
          label: "Active opacity",
          helper: "Fill opacity while the entity resolves a color",
          selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } }
        },
        {
          name: "highlight",
          label: "Highlight",
          helper: "Border only outlines the room without tinting what's inside",
          selector: N(
            M("fill", "Fill"),
            M("border", "Border only"),
            M("both", "Fill and border")
          )
        }
      ] : [],
      // Actions on the room itself (issue #181). Tap already does something —
      // it zooms — so its default is named here rather than left blank: the
      // dropdown says "Zoom to room", which is what leaving it alone gives
      // you, on the same principle as the opening's "Tap opens".
      {
        name: "tap_action",
        label: "Tap action",
        helper: "Replaces the zoom. Put an action on hold or double-tap to keep both",
        selector: { ui_action: { default_action: "none" } }
      },
      { name: "hold_action", label: "Hold action", selector: { ui_action: { default_action: "none" } } },
      {
        name: "double_tap_action",
        label: "Double-tap action",
        selector: { ui_action: { default_action: "none" } }
      }
    ],
    data: {
      showName: e.showName ?? !0,
      labelSize: e.labelSize ?? zn,
      opacity: e.opacity ?? nn,
      entity: e.entity ?? "",
      activeOpacity: e.activeOpacity ?? e.opacity ?? nn,
      highlight: e.highlight ?? "fill",
      // "Fit" is the absence of a number, so it gets its own boolean; the
      // slider only appears once that is off, and then always shows a real
      // stored value.
      fitZoom: e.zoom === void 0,
      zoom: e.zoom ?? on,
      tap_action: e.tap_action,
      hold_action: e.hold_action,
      double_tap_action: e.double_tap_action
    },
    toPatch: (t) => {
      let i = t;
      if ("highlight" in i && i.highlight === "fill" && (i = { ...i, highlight: void 0 }), "fitZoom" in i) {
        const { fitZoom: n, ...o } = i;
        i = { ...o, zoom: n ? void 0 : on };
      }
      return i;
    }
  };
}
function pg(e) {
  const t = (i, n) => ({
    name: i,
    label: n,
    required: !0,
    selector: { number: { mode: "box" } }
  });
  return {
    fields: [
      t("x1", "Start X"),
      t("y1", "Start Y"),
      t("x2", "End X"),
      t("y2", "End Y"),
      {
        name: "thickness",
        label: "Thickness",
        // Capped at MAX_SKIN_WALL_WIDTH, not a rounder number: past that a
        // wall stops being fully cleared by its own door or window (the
        // doorway mask's cut is sized off the shared WALL_THICKNESS
        // constant, not per-wall — see render.ts's wallThickness).
        selector: {
          number: { min: 2, max: Lr, step: 1, mode: "slider", unit_of_measurement: "px" }
        }
      },
      // Issue #182. A dropdown rather than a switch: a railing is one kind of
      // line that is not a wall, and open-plan dividers are the next one asked
      // about (#288).
      {
        name: "kind",
        label: "Kind",
        helper: (e.kind ?? "wall") === "railing" ? "Drawn thin; lamp light and sunlight carry on over it, and it seals off no dead space" : "A railing is the low edge of a balcony, terrace or gallery",
        selector: N(M("wall", "Wall"), M("railing", "Railing"))
      }
    ],
    data: {
      x1: Math.round(e.x1),
      y1: Math.round(e.y1),
      x2: Math.round(e.x2),
      y2: Math.round(e.y2),
      thickness: e.thickness ?? V,
      kind: e.kind ?? "wall"
    },
    // Keep the defaults out of the YAML so untouched walls stay terse.
    toPatch: (i) => {
      const n = { ...i };
      return "thickness" in i && i.thickness === V && (n.thickness = void 0), "kind" in i && (n.kind = i.kind === "railing" ? "railing" : void 0), n;
    }
  };
}
function ug(e) {
  return {
    fields: [
      { name: "title", label: "Title", selector: { text: {} } },
      { name: "width", label: "Canvas width", required: !0, selector: { number: { min: 1, mode: "box" } } },
      { name: "height", label: "Canvas height", required: !0, selector: { number: { min: 1, mode: "box" } } },
      {
        name: "grid",
        label: "Grid size",
        required: !0,
        helper: `Gap between grid lines, in canvas units (canvas is ${e.width}×${e.height}). Smaller = finer grid.`,
        selector: { number: { min: 1, mode: "box" } }
      }
    ],
    data: { title: e.title ?? "", width: e.width, height: e.height, grid: e.grid ?? Rn },
    toPatch: Ke
  };
}
function fg(e) {
  return {
    fields: [
      {
        name: "pressEffect",
        label: "Press effect",
        helper: "Feedback when a device is pressed. Only devices that do something respond",
        selector: N(
          M("scale", "Press in"),
          M("ripple", "Ink ripple"),
          M("flash", "Flash"),
          M("none", "None")
        )
      }
    ],
    data: { pressEffect: Gt(e) },
    // The default stays out of the YAML, as the skin's does.
    toPatch: (t) => "pressEffect" in t && t.pressEffect === Hr ? { ...t, pressEffect: void 0 } : t
  };
}
function mg(e) {
  const t = e.historyReplay?.enabled ?? !1;
  return {
    fields: [
      {
        name: "historyReplayEnabled",
        label: "Enable history replay",
        helper: "Shows replay controls and loads mapped-entity history from Home Assistant",
        selector: { boolean: {} }
      }
    ],
    data: { historyReplayEnabled: t },
    toPatch: (i) => "historyReplayEnabled" in i ? i.historyReplayEnabled ? {
      historyReplay: {
        enabled: !0,
        lookbackSeconds: e.historyReplay?.lookbackSeconds,
        defaultSpeed: e.historyReplay?.defaultSpeed
      }
    } : { historyReplay: void 0 } : {}
  };
}
function gg(e) {
  const t = Fn(e.skin) ?? ri[0];
  return {
    fields: [
      {
        name: "skin",
        label: "Skin",
        helper: t.description,
        selector: N(...ri.map((i) => M(i.id, i.label)))
      }
    ],
    // An id we don't ship reads back as Default, matching what it renders as.
    data: { skin: t.id },
    toPatch: (i) => (
      // Default is the absence of a skin, so it stays out of the YAML.
      "skin" in i && i.skin === Ai ? { ...i, skin: void 0 } : i
    )
  };
}
function yg(e) {
  return {
    fields: [
      {
        name: "view",
        label: "View",
        helper: "3D shows standing walls and openings. Editing stays in 2D",
        selector: N(M("2d", "2D plan"), M("3d", "3D isometric"))
      },
      ...cn(e.view ?? e.projection) === "iso" ? [
        {
          name: "wallHeight",
          label: "Wall height",
          helper: "Canvas units. Lower walls reveal more of each room",
          selector: { number: { min: 0, max: Jr, step: 1, mode: "slider" } }
        },
        {
          name: "wallOpacity",
          label: "Wall opacity",
          helper: "1 is solid; lower values reveal the floor behind walls",
          selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } }
        }
      ] : [],
      {
        name: "rotation",
        label: "Rotate display",
        helper: "Rotates the live card only — editing stays as drawn",
        selector: N(M("0", "0°"), M("90", "90°"), M("180", "180°"), M("270", "270°"))
      },
      // Per-orientation overrides (issue #237). Two dropdowns with a "same as
      // above" default rather than a switch plus two angles: the switch would
      // be a third control whose only job is to say whether the other two
      // count, and "same as above" says that per orientation and for free.
      {
        name: "rotationPortrait",
        label: "…on a portrait screen",
        helper: "Overrides the angle above while the screen is taller than it is wide",
        selector: N(
          M("", "Same as above"),
          M("0", "0°"),
          M("90", "90°"),
          M("180", "180°"),
          M("270", "270°")
        )
      },
      {
        name: "rotationLandscape",
        label: "…on a landscape screen",
        helper: "Overrides the angle above while the screen is wider than it is tall",
        selector: N(
          M("", "Same as above"),
          M("0", "0°"),
          M("90", "90°"),
          M("180", "180°"),
          M("270", "270°")
        )
      },
      {
        name: "overlayScale",
        label: "Badge & label size",
        // Canvas units lead because they are what a plan wants and what a new
        // plan is created with; fixed pixels are what an older plan is still
        // laid out in, and the right answer for a card shown bigger than its
        // canvas or a wall tablet that wants a px floor under its text.
        helper: `Canvas units scale badges and labels with the drawing. Fixed pixels keep their size whatever width the card gets — suits a card rendered larger than its ${e.width}-wide canvas, or a wall tablet`,
        selector: N(M("plan", "Canvas units"), M("fixed", "Fixed pixels"))
      },
      ...di(e.overlayScale) === "plan" ? [{
        name: "overlayMinWidth",
        label: "Stop shrinking below",
        helper: "Keeps badges and labels sized for at least this plan width. 0 allows normal scaling; larger values can cause overlaps on small cards",
        selector: { number: { min: 0, max: wa, step: 20, mode: "slider", unit_of_measurement: "px" } }
      }] : [],
      {
        name: "compactHeader",
        label: "Compact header",
        // Says what it costs as well as what it saves — the title lands on the
        // drawing, and on a plan that fills the card that is a real trade.
        helper: "Draws the title inside the plan and the floor buttons in a row, instead of spending a header row on them",
        selector: { boolean: {} }
      },
      {
        name: "zoomedOverlayAuto",
        label: "Grow badges with the room",
        helper: "Badges and labels scale with the drawing while zoomed, so a focused room reads bigger without its devices crowding each other any worse than at full plan",
        selector: { boolean: {} }
      },
      ...e.zoomedOverlayScale === "auto" ? [] : [{
        name: "zoomedOverlayScale",
        label: "Zoomed badge size",
        helper: "Badges, labels and text while zoomed in to a room, as a multiple of their size at full plan. 1 keeps them the same",
        selector: { number: { min: 0.5, max: 3, step: 0.1, mode: "slider" } }
      }],
      {
        name: "roomFocusControls",
        label: "Room arrows",
        helper: "Previous/next controls that walk the zoom from room to room. They also let the arrow keys do it, which is otherwise impossible — a room that only zooms is not a tab stop",
        selector: { boolean: {} }
      },
      {
        name: "roomFocusInterval",
        label: "Cycle rooms every",
        helper: "Seconds on each room before moving to the next. 0 only ever moves when asked; any tap or key press starts the count again, so it never moves under someone using the card",
        selector: { number: { min: 0, max: ss, step: 1, mode: "box", unit_of_measurement: "s" } }
      },
      {
        name: "offlineStyle",
        label: "Offline devices",
        helper: "How a device is drawn when its entity is unavailable or missing",
        selector: N(
          M("dim", "Dimmed"),
          M("strike", "Dimmed and crossed out"),
          M("none", "No different")
        )
      }
    ],
    data: {
      view: cn(e.view ?? e.projection) === "iso" ? "3d" : "2d",
      wallHeight: ta(e.wallHeight),
      wallOpacity: ia(e.wallOpacity),
      rotation: String($t(e.rotation)),
      // "" is "same as above" — the absence of an override, not an angle.
      // `== null` for the same reason resolvePlanRotation uses it: a key
      // written with no value (`rotationPortrait:`) parses to `null`, and
      // reading that as an angle would show 0° here — then write it into the
      // YAML as a real override the moment this panel is saved, turning a
      // stray empty key into an instruction the plan never had.
      rotationPortrait: e.rotationPortrait == null ? "" : String($t(e.rotationPortrait)),
      rotationLandscape: e.rotationLandscape == null ? "" : String($t(e.rotationLandscape)),
      overlayScale: di(e.overlayScale),
      overlayMinWidth: pi(e.overlayMinWidth) ?? 0,
      compactHeader: e.compactHeader ?? !1,
      zoomedOverlayAuto: e.zoomedOverlayScale === "auto",
      zoomedOverlayScale: typeof e.zoomedOverlayScale == "number" ? e.zoomedOverlayScale : rn,
      roomFocusControls: Be(e.roomFocus)?.controls ?? !1,
      roomFocusInterval: (Be(e.roomFocus)?.intervalMs ?? 0) / 1e3,
      offlineStyle: Ea(e)
    },
    toPatch: (t) => {
      let i = t;
      "view" in i && (i = { ...i, projection: void 0 }), "rotation" in i && (i = { ...i, rotation: i.rotation === "0" ? void 0 : Number(i.rotation) });
      for (const n of ["rotationPortrait", "rotationLandscape"])
        n in i && (i = { ...i, [n]: i[n] === "" ? void 0 : Number(i[n]) });
      if ("overlayMinWidth" in i && (i = { ...i, overlayMinWidth: pi(i.overlayMinWidth) }), "compactHeader" in i && !i.compactHeader && (i = { ...i, compactHeader: void 0 }), "offlineStyle" in i && i.offlineStyle === jr && (i = { ...i, offlineStyle: void 0 }), "zoomedOverlayScale" in i && i.zoomedOverlayScale === rn && (i = { ...i, zoomedOverlayScale: void 0 }), "zoomedOverlayAuto" in i && (i = {
        ...i,
        zoomedOverlayScale: i.zoomedOverlayAuto ? "auto" : void 0,
        zoomedOverlayAuto: void 0
      }), "roomFocusControls" in i || "roomFocusInterval" in i) {
        const n = Be(e.roomFocus), o = "roomFocusControls" in i ? !!i.roomFocusControls : n?.controls ?? !1, r = "roomFocusInterval" in i ? Number(i.roomFocusInterval) : (n?.intervalMs ?? 0) / 1e3, a = Number.isFinite(r) && r > 0 ? r : 0, s = n?.rooms;
        i = {
          ...i,
          roomFocus: !o && !a ? void 0 : o && !a && !s?.length ? (
            // The plain case says so plainly.
            !0
          ) : { controls: o, ...a ? { interval: a } : {}, ...s?.length ? { rooms: s } : {} },
          roomFocusControls: void 0,
          roomFocusInterval: void 0
        };
      }
      return i;
    }
  };
}
function bg(e) {
  return {
    fields: [
      {
        name: "showDeadSpaces",
        label: "Mark dead spaces",
        helper: "Hatches any space the walls close off that no door or window opens onto",
        selector: { boolean: {} }
      }
    ],
    data: { showDeadSpaces: e.showDeadSpaces ?? !1 },
    // Off is the default, so it stays out of the YAML until switched on.
    toPatch: (t) => "showDeadSpaces" in t && !t.showDeadSpaces ? { ...t, showDeadSpaces: void 0 } : t
  };
}
function vg(e) {
  const t = [
    {
      name: "sunDimming",
      label: "Follow the sun",
      helper: "Dims the plan at night, using your Home Assistant's own sunrise and sunset",
      selector: { boolean: {} }
    }
  ];
  return e.sunDimming && t.push(
    {
      name: "sunBrightnessMin",
      label: "Night brightness",
      selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } }
    },
    {
      name: "sunBrightnessMax",
      label: "Day brightness",
      selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } }
    }
  ), {
    fields: t,
    data: {
      sunDimming: e.sunDimming ?? !1,
      sunBrightnessMin: e.sunBrightnessMin ?? Ln,
      sunBrightnessMax: e.sunBrightnessMax ?? ai
    },
    // Off is the default, so keep the whole feature out of the YAML until it
    // is switched on — including the two sliders it drags along with it.
    toPatch: (i) => "sunDimming" in i && !i.sunDimming ? { ...i, sunDimming: void 0, sunBrightnessMin: void 0, sunBrightnessMax: void 0 } : i
  };
}
function wg(e) {
  const t = [
    {
      name: "ambientDaylight",
      label: "Ambient daylight",
      helper: "Soft sky light through exterior windows and open or glazed doors, even when direct sun does not hit them",
      selector: { boolean: {} }
    },
    {
      name: "sunlight",
      label: "Let the sun in",
      helper: "Light through every window and open door; the rooms it never reaches go a shade darker",
      selector: { boolean: {} }
    }
  ];
  return e.sunlight && (t.push(
    {
      name: "north",
      label: "North",
      helper: "Which way north points on this plan, so the sun angle describes the house",
      selector: {
        number: { min: 0, max: 359, step: 1, mode: "slider", unit_of_measurement: "°" }
      }
    },
    {
      name: "sunShade",
      label: "Shade the rest",
      helper: "Darkens everywhere the light does not reach. Off shows the patches alone",
      selector: { boolean: {} }
    },
    {
      name: "sunReach",
      label: "Reach",
      helper: "How far a patch carries before it fades out, as a share of the plan's shorter side",
      selector: {
        number: { min: 0.05, max: 1, step: 0.01, mode: "slider" }
      }
    },
    {
      name: "sunFollows",
      label: "Follow the real sun",
      helper: "Swings through the day and goes out at night. Off keeps the light where you put it, always on",
      selector: { boolean: {} }
    }
  ), typeof e.sunBearing == "number" && t.push({
    name: "sunBearing",
    label: "Sun from",
    helper: "Compass bearing of the light: 0 = north, 90 = east, 180 = south",
    selector: {
      number: { min: 0, max: 359, step: 5, mode: "slider", unit_of_measurement: "°" }
    }
  })), {
    fields: t,
    data: {
      ambientDaylight: e.ambientDaylight ?? !1,
      sunlight: e.sunlight ?? !1,
      sunShade: e.sunShade ?? !0,
      north: e.north ?? 0,
      sunReach: e.sunReach ?? gi,
      sunFollows: typeof e.sunBearing != "number",
      sunBearing: e.sunBearing ?? yn
    },
    toPatch: (i) => {
      let n = { ...i };
      return "ambientDaylight" in n && !n.ambientDaylight && (n = { ...n, ambientDaylight: void 0 }), "sunlight" in n && !n.sunlight ? {
        ...n,
        sunlight: void 0,
        north: void 0,
        sunBearing: void 0,
        sunReach: void 0,
        sunShade: void 0,
        sunlightColor: void 0,
        sunShadeColor: void 0
      } : ("sunFollows" in n && (n.sunBearing = n.sunFollows ? void 0 : e.sunBearing ?? yn, delete n.sunFollows), "north" in n && !n.north && (n.north = void 0), "sunReach" in n && n.sunReach === gi && (n.sunReach = void 0), "sunShade" in n && n.sunShade && (n.sunShade = void 0), n);
    }
  };
}
function _g(e) {
  const t = [
    { name: "image", label: "Bg image", helper: "/local/floorplan.png or URL", selector: { text: {} } }
  ];
  return e.image && (t.push({
    name: "imageFit",
    label: "Image fit",
    helper: "Per floor, so scans of different resolutions can each fit properly",
    selector: N(
      M("stretch", "Stretch to canvas (may distort)"),
      M("contain", "Fit inside (keep proportions)"),
      M("cover", "Fill canvas (keep proportions, crop)")
    )
  }), t.push({
    name: "imageOpacity",
    label: "Image opacity",
    selector: { number: { min: 0, max: 1, step: 0.05, mode: "slider" } }
  })), {
    fields: t,
    data: {
      image: e.image ?? "",
      imageFit: e.imageFit ?? "stretch",
      imageOpacity: e.imageOpacity ?? 1
    },
    // "stretch" is the default, so keep it out of the YAML.
    toPatch: (i) => "imageFit" in i && i.imageFit === "stretch" ? { ...i, imageFit: void 0 } : i
  };
}
var xg = Object.defineProperty, $g = Object.getOwnPropertyDescriptor, O = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? $g(t, i) : t, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && xg(t, i, o), o;
};
const kg = (e) => e.label, Sg = (e) => e.helper, Ji = {
  select: { icon: "mdi:cursor-default", label: "Select" },
  wall: { icon: "mdi:wall", label: "Wall" },
  door: { icon: "mdi:door", label: "Door" },
  window: { icon: "mdi:window-closed-variant", label: "Window" },
  // A roof seen from outside, which is the one thing in the icon set that says
  // "this is overhead" without saying "window" a second time — the two tools
  // sit next to each other and have to be told apart at a glance.
  skylight: { icon: "mdi:home-roof", label: "Skylight" },
  tracker: { icon: "mdi:crosshairs-gps", label: "Tracker" },
  area: { icon: "mdi:vector-polygon", label: "Area" }
}, Bt = (e, t) => ({ x: e * 0.93, y: t * 0.08 }), en = 4, Eg = 200, Ag = {
  wall: "mdi:wall",
  opening: "mdi:door",
  item: "mdi:lightbulb-outline",
  text: "mdi:format-text",
  furniture: "mdi:sofa-outline",
  tracker: "mdi:crosshairs-gps",
  area: "mdi:floor-plan"
}, kr = 35, Mg = 8, Tg = 2e3, Cg = 10;
function Sr(e) {
  return e.some((t) => {
    const i = t, n = i.tagName?.toLowerCase();
    return n === "input" || n === "textarea" || n === "select" || n === "ha-form" || n === "ha-entity-picker" || n === "ha-icon-picker" || i.isContentEditable === !0;
  });
}
let C = class extends Te {
  constructor() {
    super(...arguments), this._wallMaskId = `fp-edit-wall-mask-${C._nextWallMaskId++}`, this._watchedEntities = /* @__PURE__ */ new Set(), this._tool = "select", this._selection = [], this._draft = null, this._draftTracker = null, this._draftArea = null, this._areaHover = null, this._areaDragStart = null, this._areaDragCurrent = null, this._areaDragTimer = null, this._areaDragMoved = !1, this._freeWalls = !1, this._defaultOpeningLength = 60, this._defaultSkylightLength = 70, this._defaultSkylightWidth = 44, this._marquee = null, this._history = [], this._future = [], this._zoom = 1, this._floorMenuOpen = !1, this._addMenuOpen = !1, this._addQuery = "", this._symbolDraft = "", this._symbolError = "", this._paletteError = "", this._projectOpen = !1, this._openGroups = /* @__PURE__ */ new Set(), this._fullscreen = !1, this._applyState = "idle", this._applyError = "", this._applyResetTimer = null, this._drag = null, this._dragMoves = new vr(br, (e) => {
      this._drag && this._applyDrag(e);
    }), this._switcherMoves = new vr(br, (e) => {
      this._switcherDrag && (this._config = { ...this._config, floorSwitcher: { x: e.x, y: e.y } });
    }), this._dragDirty = !1, this._pickAnchor = null, this._hideLabels = !1, this._pinchPts = /* @__PURE__ */ new Map(), this._pinch = null, this._gesturePointer = null, this._marqueeAdd = !1, this._clipboard = null, this._onKeyDown = (e) => this._handleKeyDown(e), this._onHostKeyDown = (e) => {
      e.key !== "Escape" || !this._fullscreen || Sr(e.composedPath()) && (e.preventDefault(), e.stopPropagation(), this._canvasWrap?.focus({ preventScroll: !0 }));
    }, this._onFocusIn = (e) => {
      this._fullscreen && !e.composedPath().includes(this) && (this._fullscreen = !1);
    }, this._preventGesture = (e) => e.preventDefault(), this._onWrapPointerDown = (e) => {
      if (e.pointerType !== "touch" || (this._pinchPts.set(e.pointerId, { x: e.clientX, y: e.clientY }), this._pinchPts.size !== 2)) return;
      this._cancelGesture();
      const t = this._canvasWrap, i = t?.getBoundingClientRect(), [n, o] = [...this._pinchPts.values()];
      this._pinch = {
        d0: Math.max(Math.hypot(o.x - n.x, o.y - n.y), 1),
        z0: this._zoom,
        cx: (n.x + o.x) / 2 - (i?.left ?? 0) + (t?.scrollLeft ?? 0),
        cy: (n.y + o.y) / 2 - (i?.top ?? 0) + (t?.scrollTop ?? 0)
      }, e.stopPropagation();
    }, this._onWrapPointerMove = (e) => {
      if (!this._pinch || !this._pinchPts.has(e.pointerId) || (this._pinchPts.set(e.pointerId, { x: e.clientX, y: e.clientY }), this._pinchPts.size < 2)) return;
      e.preventDefault(), e.stopPropagation();
      const [t, i] = [...this._pinchPts.values()], n = this._pinch;
      this._setZoom(n.z0 * (Math.hypot(i.x - t.x, i.y - t.y) / n.d0)), this.updateComplete.then(() => {
        const o = this._canvasWrap;
        if (!o || this._pinch !== n) return;
        const r = o.getBoundingClientRect(), a = this._zoom / n.z0;
        o.scrollLeft = n.cx * a - ((t.x + i.x) / 2 - r.left), o.scrollTop = n.cy * a - ((t.y + i.y) / 2 - r.top);
      });
    }, this._onWrapPointerEnd = (e) => {
      e.pointerType === "touch" && (this._pinchPts.delete(e.pointerId), this._pinchPts.size < 2 && (this._pinch = null));
    }, this._liveEditKey = null, this._onEditorPointerDown = () => {
      this._liveEditKey = null;
    }, this._gridCache = null, this._apply = async () => {
      if (this._applyState === "saving") return;
      this._applyResetTimer !== null && clearTimeout(this._applyResetTimer), this._applyState = "saving", this._applyError = "", await this.updateComplete, await new Promise((t) => setTimeout(t, 0));
      const e = await Xm(this);
      if (!e.ok) {
        this._applyState = "idle", this._applyError = e.error;
        return;
      }
      this._applyState = "saved", this._applyResetTimer = setTimeout(() => {
        this._applyResetTimer = null, this._applyState = "idle";
      }, Tg);
    }, this._onSwitcherDown = (e) => {
      if (this._tool !== "select" || e.button !== 0 || this._gesturePointer !== null) return;
      e.stopPropagation(), e.preventDefault(), this._canvasWrap?.focus({ preventScroll: !0 });
      const t = e.currentTarget;
      this._switcherDrag = {
        pointerId: e.pointerId,
        handle: t,
        moved: !1,
        at: this._toVirtual(e, !1),
        before: this._config,
        priorFuture: this._future
      }, this._gesturePointer = e.pointerId, this._capturePointer(e, t);
    }, this._onSwitcherMove = (e) => {
      const t = this._switcherDrag;
      if (!t || t.pointerId !== e.pointerId) return;
      if (e.stopPropagation(), e.buttons === 0) {
        this._forgetSwitcherTouch(e), this._cancelGesture();
        return;
      }
      const i = this._toVirtual(e, !1);
      !t.moved && Math.hypot(i.x - t.at.x, i.y - t.at.y) <= en || (t.moved || (t.priorHistory = this._history, this._pushHistory(), t.moved = !0), this._switcherMoves.push(this._toVirtual(e)));
    }, this._onSwitcherUp = (e) => {
      const t = this._switcherDrag;
      !t || t.pointerId !== e.pointerId || (e.stopPropagation(), this._forgetSwitcherTouch(e), this._releasePointer(e, t.handle), t.moved && this._switcherMoves.push(this._toVirtual(e)), this._switcherMoves.settle(), this._switcherDrag = void 0, this._gesturePointer = null, t.moved && this._emit(this._config));
    }, this._onSwitcherCancel = (e) => {
      const t = this._switcherDrag;
      !t || t.pointerId !== e.pointerId || (e.stopPropagation(), this._forgetSwitcherTouch(e), this._releasePointer(e, t.handle), this._rollBackSwitcherDrag());
    }, this._addSymbol = () => {
      let e;
      try {
        e = JSON.parse(this._symbolDraft);
      } catch (n) {
        this._symbolError = `Not valid JSON — ${n.message}`;
        return;
      }
      const t = [], i = Fi(e, void 0, t);
      if (!i) {
        this._symbolError = t[0] ?? "Not a usable symbol.";
        return;
      }
      this._patchConfig({ symbols: { ...this._config.symbols ?? {}, [i.id]: e } }), this._symbolDraft = "", this._symbolError = "";
    };
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._onKeyDown, !0), this.addEventListener("keydown", this._onHostKeyDown), window.addEventListener("focusin", this._onFocusIn);
    const e = this.renderRoot;
    e.addEventListener("pointermove", this._onSwitcherMove, !0), e.addEventListener("pointerup", this._onSwitcherUp, !0), e.addEventListener("pointercancel", this._onSwitcherCancel, !0);
  }
  disconnectedCallback() {
    window.removeEventListener("keydown", this._onKeyDown, !0), this.removeEventListener("keydown", this._onHostKeyDown), window.removeEventListener("focusin", this._onFocusIn);
    const e = this.renderRoot;
    e.removeEventListener("pointermove", this._onSwitcherMove, !0), e.removeEventListener("pointerup", this._onSwitcherUp, !0), e.removeEventListener("pointercancel", this._onSwitcherCancel, !0), this._applyResetTimer !== null && clearTimeout(this._applyResetTimer), this._clearAreaDragTimer(), this._areaDragStart = null, this._areaDragCurrent = null, this._areaDragMoved = !1, this._dragMoves.cancel(), this._flushDrag(), this._drag = null, this._switcherMoves.settle(), this._switcherDrag?.moved && this._emit(this._config), this._switcherDrag = void 0, this._gesturePointer = null, this._resetPinch(), super.disconnectedCallback();
  }
  setConfig(e) {
    const t = { ...kl(e.type || "custom:easy-floorplan-card"), ...e }, i = $e(t).map((n) => structuredClone(n));
    this._config = {
      ...t,
      floors: i,
      walls: [],
      openings: [],
      items: [],
      texts: [],
      furniture: [],
      trackers: []
    }, (!this._activeFloorId || !i.some((n) => n.id === this._activeFloorId)) && (this._activeFloorId = t.defaultFloor && i.some((n) => n.id === t.defaultFloor) ? t.defaultFloor : i[0].id), this._lastEmitted && e !== this._lastEmitted && !an(e, this._lastEmitted) && (this._history = [], this._future = [], this._liveEditKey = null), this._watchedEntities = tt(this._config);
  }
  /**
   * HA replaces `hass` on every state change in the instance; the editor's
   * render is expensive (full SVG + panels). Skip ticks that can't change
   * anything we draw. Entity pickers keep the `hass` they last rendered with —
   * acceptable, the registry data they browse changes rarely.
   */
  shouldUpdate(e) {
    if (!(e.size === 1 && e.has("hass"))) return !0;
    const t = e.get("hass");
    if (!t || !this.hass) return !0;
    const i = (n) => n.floors;
    return i(t) !== i(this.hass) ? !0 : ra(t, this.hass, this._watchedEntities);
  }
  // ---- active floor access -----------------------------------------------
  _floor() {
    const e = this._config.floors ?? [];
    return e.find((t) => t.id === this._activeFloorId) ?? e[0];
  }
  /**
   * The shipped symbol library with this config's own `symbols:` merged over
   * it (issue #90). Memoized on the config's identity inside `symbolCatalog`,
   * so calling it per cell in the picker costs one lookup.
   */
  _symbols() {
    return qt(this._config.symbols);
  }
  /** Discrete change to the active floor's elements (snapshots for undo). */
  _commitFloor(e) {
    this._commit({ ...this._config, floors: this._patchFloors(e) });
  }
  /** Live change to the active floor's elements (no history snapshot — for dragging). */
  _emitFloor(e) {
    const t = { ...this._config, floors: this._patchFloors(e) };
    if (this._drag) {
      this._config = t, this._watchedEntities = tt(t), this._dragDirty = !0;
      return;
    }
    this._emit(t);
  }
  /** Hand the host what a drag accumulated — once, on release. */
  _flushDrag() {
    this._dragDirty && (this._dragDirty = !1, this._emit(this._config));
  }
  _patchFloors(e) {
    const t = this._config.floors ?? [], i = t.find((n) => n.id === this._activeFloorId) ?? t[0];
    return t.map((n) => i && n.id === i.id ? { ...n, ...e } : n);
  }
  firstUpdated() {
    this._ensureHaComponents();
    for (const t of [
      "ha-form",
      "ha-entity-picker",
      "ha-entity-attribute-picker",
      "ha-icon-picker",
      "ha-combo-box"
    ])
      customElements.get(t) || customElements.whenDefined(t).then(() => this.requestUpdate());
    const e = this._canvasWrap;
    if (e) {
      e.addEventListener("pointerdown", this._onWrapPointerDown, { capture: !0 }), e.addEventListener("pointermove", this._onWrapPointerMove, { capture: !0 }), e.addEventListener("pointerup", this._onWrapPointerEnd, { capture: !0 }), e.addEventListener("pointercancel", this._onWrapPointerEnd, { capture: !0 });
      for (const t of ["gesturestart", "gesturechange", "gestureend"])
        e.addEventListener(t, this._preventGesture);
    }
  }
  /**
   * Defensive pinch-state reset (review feedback on #57). The listeners
   * themselves stay attached on purpose: they live on an element inside our
   * own shadow root (no leak — they die with the instance), and HA's dialog
   * reparents the editor, which fires disconnected/connected without a second
   * firstUpdated — removing them here would permanently kill pinch after a
   * reparent. Clearing the *points* is what matters: a pointerup lost to the
   * reparent would leave a stale entry behind, and the next single tap would
   * read as a phantom second finger.
   */
  _resetPinch() {
    this._pinchPts.clear(), this._pinch = null;
  }
  /**
   * Promote the expanded editor into the top layer. `position: fixed` alone is
   * not enough: HA's edit dialog puts a `transform` on its surface to offset
   * the safe areas, and any transform makes that surface the containing block
   * for fixed descendants — so a "full-viewport" overlay would fill the narrow
   * dialog instead. A popover escapes it. Collapsing drops the attribute, which
   * hides the popover on its own. Browsers without the API keep the fixed
   * fallback, which is already correct on the mobile dialog (transform: none).
   */
  updated() {
    if (!this._fullscreen) return;
    const e = this._editorEl;
    if (!(!e?.isConnected || typeof e.showPopover != "function") && !e.matches(":popover-open"))
      try {
        e.showPopover();
      } catch {
      }
  }
  /**
   * `ha-form` and the pickers are only defined once HA loads an editor that
   * imports them. The button-card editor statically imports ha-form (and the
   * ui_action selector chain); the entities editor defines ha-entity-picker
   * for the custom tracker rows. Every selector rendered by ha-form
   * lazy-loads its own picker after that.
   */
  async _ensureHaComponents() {
    if (customElements.get("ha-form") && customElements.get("ha-entity-picker")) return;
    const e = await window.loadCardHelpers?.();
    if (e) {
      for (const t of [{ type: "button" }, { type: "entities", entities: [] }])
        try {
          await (await e.createCardElement(t))?.constructor?.getConfigElement?.();
        } catch {
        }
      this.requestUpdate();
    }
  }
  get grid() {
    return this._config.grid ?? Rn;
  }
  /**
   * Resolved placement snap step. `snap` is tri-state in the config: unset
   * means "follow the grid" (the default behaviour), `0` is free placement,
   * any other number is a custom step. See {@link resolveSnap}.
   */
  get _resolvedSnap() {
    return vl(this._config.snap, this.grid);
  }
  /** Which radio option the panel's "Snap to" control shows as active. */
  get _snapMode() {
    const e = this._config.snap;
    return e == null ? "grid" : e === 0 ? "off" : "custom";
  }
  _setSnapMode(e) {
    if (e === "grid")
      this._patchConfig({ snap: void 0 });
    else if (e === "off")
      this._patchConfig({ snap: 0 });
    else {
      const t = this._config.snap;
      this._patchConfig({
        snap: t && t > 0 ? t : Gi(Co, this.grid)
      });
    }
  }
  /** Grid update plus a custom-snap rescale so its percentage of the grid is preserved. */
  _gridPatch(e) {
    const t = { grid: e };
    if (this._snapMode === "custom") {
      const i = Io(this._config.snap, this.grid);
      t.snap = Gi(i, e);
    }
    return t;
  }
  _snap(e) {
    const t = this._resolvedSnap;
    return t > 0 ? Math.round(e / t) * t : e;
  }
  _toVirtual(e, t = !0) {
    const n = this._svg.getScreenCTM();
    if (!n) return { x: 0, y: 0 };
    const o = new DOMPoint(e.clientX, e.clientY).matrixTransform(n.inverse());
    return t ? { x: this._snap(o.x), y: this._snap(o.y) } : { x: o.x, y: o.y };
  }
  /** Nearest existing wall endpoint within ENDPOINT_SNAP, or null. */
  _nearestCorner(e, t) {
    return ps(this._floor().walls, e, t, it);
  }
  /** Snap a raw point to a nearby existing wall endpoint, else to the snap step. */
  _snapWallPoint(e, t) {
    return this._nearestCorner(e, t) ?? { x: this._snap(e), y: this._snap(t) };
  }
  /**
   * Snap a raw point for Area drawing/editing: nearby wall corner or another
   * Area's vertex wins (so adjacent rooms can share an exact boundary point),
   * else the grid/snap step. `exclude` drops one vertex from the candidate
   * set — the one currently being dragged, so it can't snap to itself.
   */
  _snapAreaPoint(e, t, i) {
    return Pm(this._floor(), e, t, it, i) ?? {
      x: this._snap(e),
      y: this._snap(t)
    };
  }
  /**
   * Like {@link _snapWallPoint}, but ignores endpoints in `moving` (keys
   * `${wallId}:${end}`) — the corner cluster being dragged must not attract
   * itself.
   */
  _snapWallPointExcluding(e, t, i) {
    let n = null, o = it;
    for (const r of this._floor().walls)
      for (const a of [1, 2]) {
        if (i.has(`${r.id}:${a}`)) continue;
        const s = a === 1 ? r.x1 : r.x2, l = a === 1 ? r.y1 : r.y2, h = Math.hypot(e - s, t - l);
        h < o && (o = h, n = { x: s, y: l });
      }
    return n ?? { x: this._snap(e), y: this._snap(t) };
  }
  /** See {@link snapWallEnd}: corners win, then axis gravity, then the snap step. */
  _snapWallEnd(e, t, i, n) {
    return Om(
      this._floor().walls,
      e,
      t,
      i,
      n,
      (o) => this._snap(o),
      this._freeWalls,
      Cg,
      it
    );
  }
  _emit(e) {
    this._drag && (this._drag.emitted = !0), this._config = e, this._watchedEntities = tt(e);
    const t = { ...e };
    for (const i of ["walls", "openings", "items", "texts", "furniture", "trackers", "areas"])
      t[i]?.length || delete t[i];
    this._lastEmitted = structuredClone(t), this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: t }, bubbles: !0, composed: !0 })
    );
  }
  _pushHistory(e = null) {
    this._history = [...this._history, structuredClone(this._config)].slice(-60), this._future = [], this._liveEditKey = e;
  }
  /** Discrete change: snapshot for undo, then emit. */
  _commit(e) {
    this._pushHistory(), this._emit(e);
  }
  _undo() {
    if (this._liveEditKey = null, !this._history.length) return;
    this._future = [structuredClone(this._config), ...this._future];
    const e = this._history[this._history.length - 1];
    this._history = this._history.slice(0, -1), this._selection = [], this._emit(e);
  }
  _redo() {
    if (this._liveEditKey = null, !this._future.length) return;
    this._history = [...this._history, structuredClone(this._config)];
    const e = this._future[0];
    this._future = this._future.slice(1), this._selection = [], this._emit(e);
  }
  // ---- selection ----------------------------------------------------------
  /** The element whose properties show in the panel (the most recent selection). */
  _primary() {
    return this._selection[this._selection.length - 1] ?? null;
  }
  _selectOne(e) {
    this._selection = [e], this._liveEditKey = null;
  }
  _toggleSel(e) {
    this._selection = this._isSel(e.kind, e.id) ? this._selection.filter((t) => !(t.kind === e.kind && t.id === e.id)) : [...this._selection, e], this._liveEditKey = null;
  }
  _clearSel() {
    this._selection = [], this._liveEditKey = null;
  }
  /** Pointer-driven selection: modifier toggles; plain click selects unless already in the set. */
  _selectForPointer(e, t) {
    if (e.shiftKey || e.ctrlKey || e.metaKey) {
      this._toggleSel(t);
      return;
    }
    this._isSel(t.kind, t.id) || this._selectOne(t);
  }
  _idsOfKind(e) {
    return new Set(this._selection.filter((t) => t.kind === e).map((t) => t.id));
  }
  _mergeSel(e, t) {
    const i = [...e];
    for (const n of t) i.some((o) => o.kind === n.kind && o.id === n.id) || i.push(n);
    return i;
  }
  // ---- keyboard nudging ---------------------------------------------------
  _handleKeyDown(e) {
    const t = this.checkVisibility;
    if (t && !t.call(this)) return;
    const i = e.composedPath();
    if (!i.includes(this)) {
      this._fullscreen && e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), this._fullscreen = !1);
      return;
    }
    if (Sr(i)) return;
    const n = e.ctrlKey || e.metaKey, o = e.key.toLowerCase(), r = !!(this._drag || this._draft || this._draftTracker || this._draftArea || this._marquee || // The switcher's drag is a gesture like any other (issue #281): an undo
    // or a nudge landing mid-drag would interleave with its history snapshot
    // and its eventual emit.
    this._switcherDrag);
    if (e.key === "Backspace" && this._draftArea?.points.length) {
      e.preventDefault();
      const h = this._draftArea.points.slice(0, -1);
      this._draftArea = h.length ? { points: h } : null;
      return;
    }
    if (r && e.key !== "Escape" && !(n && o === "c")) return;
    if (n && o === "c") {
      this._selection.length && (e.preventDefault(), this._copy());
      return;
    }
    if (n && o === "v") {
      this._clipboard && (e.preventDefault(), this._paste());
      return;
    }
    if (n && o === "d") {
      this._selection.length && (e.preventDefault(), this._duplicate());
      return;
    }
    if (n && o === "z") {
      e.preventDefault(), e.shiftKey ? this._redo() : this._undo();
      return;
    }
    if (n && o === "y") {
      e.preventDefault(), this._redo();
      return;
    }
    if (e.key === "Escape") {
      if (this._floorMenuOpen || this._addMenuOpen) {
        e.preventDefault(), e.stopPropagation(), this._floorMenuOpen = !1, this._addMenuOpen = !1, this._addQuery = "";
        return;
      }
      this._draft || this._draftTracker || this._draftArea || this._marquee || this._drag || this._switcherDrag ? (e.preventDefault(), e.stopPropagation(), this._cancelGesture()) : this._selection.length ? (e.preventDefault(), e.stopPropagation(), this._clearSel()) : this._fullscreen && (e.preventDefault(), e.stopPropagation(), this._fullscreen = !1);
      return;
    }
    if ((e.key === "Delete" || e.key === "Backspace") && this._selection.length) {
      e.preventDefault(), this._deleteSelected();
      return;
    }
    if (!this._selection.length) return;
    const s = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1]
    }[e.key];
    if (!s) return;
    e.preventDefault();
    const l = e.shiftKey ? this.grid : this._resolvedSnap || 1;
    this._nudge(s[0] * l, s[1] * l);
  }
  _nudge(e, t) {
    if (!this._selection.length) return;
    const i = this._floor();
    if (!Hm(i, this._selection).length) return;
    const n = (c) => {
      const d = this._idsOfKind(c);
      for (const u of d) Wt(i, { kind: c, id: u }) && d.delete(u);
      return d;
    }, o = n("wall"), r = n("opening"), a = n("item"), s = n("text"), l = n("furniture"), h = n("tracker"), p = n("area");
    this._commitFloor({
      walls: i.walls.map(
        (c) => o.has(c.id) ? { ...c, x1: c.x1 + e, y1: c.y1 + t, x2: c.x2 + e, y2: c.y2 + t } : c
      ),
      openings: i.openings.map((c) => r.has(c.id) ? { ...c, x: c.x + e, y: c.y + t } : c),
      items: i.items.map((c) => a.has(c.id) ? { ...c, x: c.x + e, y: c.y + t } : c),
      texts: i.texts.map((c) => s.has(c.id) ? { ...c, x: c.x + e, y: c.y + t } : c),
      furniture: i.furniture.map(
        (c) => l.has(c.id) ? { ...c, x: c.x + e, y: c.y + t } : c
      ),
      trackers: (i.trackers ?? []).map(
        (c) => h.has(c.id) ? { ...c, x: c.x + e, y: c.y + t } : c
      ),
      areas: (i.areas ?? []).map(
        (c) => p.has(c.id) ? { ...c, points: c.points.map((d) => ({ x: d.x + e, y: d.y + t })) } : c
      )
    });
  }
  // ---- canvas (SVG) pointer handling: drawing walls/openings -------------
  /**
   * Best-effort pointer capture. `setPointerCapture` throws NotFoundError when
   * the pointer id isn't active (synthetic events, or HA's dialog re-targeting
   * the pointer), which would abort the rest of the calling handler — we hit
   * exactly that with the tracker tool's drag-to-draw. Capture is an
   * enhancement (smooth dragging past the canvas edge), never a requirement,
   * so failures are safe to swallow.
   */
  _capturePointer(e, t = e.target) {
    try {
      t?.setPointerCapture?.(e.pointerId);
    } catch {
    }
  }
  /** Best-effort release; pointerup releases capture implicitly anyway. */
  _releasePointer(e, t = e.target) {
    try {
      t?.releasePointerCapture?.(e.pointerId);
    } catch {
    }
  }
  _onCanvasDown(e) {
    if (e.button !== 0 || this._gesturePointer !== null) return;
    this._canvasWrap?.focus({ preventScroll: !0 });
    const t = this._toVirtual(e, !1);
    if (this._tool === "wall") {
      const i = this._freeWalls ? { x: this._snap(t.x), y: this._snap(t.y) } : this._snapWallPoint(t.x, t.y);
      this._draft = { x1: i.x, y1: i.y, x2: i.x, y2: i.y }, this._gesturePointer = e.pointerId, this._capturePointer(e);
      return;
    }
    if (this._tool === "door" || this._tool === "window" || this._tool === "skylight") {
      this._addOpening(this._tool, this._snap(t.x), this._snap(t.y));
      return;
    }
    if (this._tool === "tracker") {
      const i = this._snap(t.x), n = this._snap(t.y);
      this._draftTracker = { x0: i, y0: n, x1: i, y1: n }, this._gesturePointer = e.pointerId, this._capturePointer(e);
      return;
    }
    if (this._tool === "area") {
      const i = this._snapAreaPoint(t.x, t.y);
      if (this._draftArea) {
        this._addAreaPoint(i), this._areaHover = null;
        return;
      }
      this._areaDragStart = { x: i.x, y: i.y }, this._areaDragCurrent = null, this._areaDragMoved = !1, this._gesturePointer = e.pointerId, this._capturePointer(e);
      return;
    }
    this._pickAnchor = null, this._marqueeAdd = e.shiftKey || e.ctrlKey || e.metaKey, this._marquee = { x0: t.x, y0: t.y, x1: t.x, y1: t.y }, this._gesturePointer = e.pointerId, this._capturePointer(e);
  }
  /**
   * Abort any in-progress gesture. A moved drag is rolled back to the exact
   * pre-drag config (restoring wall-snap angle changes too) and its own
   * history snapshot — matched by identity, in case something else pushed in
   * between — is dropped, so a canceled drag leaves no trace in undo.
   */
  _cancelGesture() {
    this._rollBackSwitcherDrag(), this._dragMoves.cancel(), this._dragDirty = !1, this._gesturePointer = null, this._draft = null, this._draftTracker = null, this._draftArea = null, this._areaDragStart = null, this._areaDragCurrent = null, this._clearAreaDragTimer(), this._areaDragMoved = !1, this._marquee = null;
    const e = this._drag;
    this._drag = null, e?.moved && e.snapshot && (this._history = e.priorHistory ?? this._history.filter((t) => t !== e.snapshot), e.emitted ? this._emit(e.snapshot) : (this._config = e.snapshot, this._watchedEntities = tt(e.snapshot)), this._future = e.priorFuture ?? []);
  }
  _onPointerCancel(e) {
    this._gesturePointer !== null && e.pointerId !== this._gesturePointer || this._cancelGesture();
  }
  /** True when this event belongs to a pointer other than the gesture's. */
  _foreignPointer(e) {
    return this._gesturePointer !== null && e.pointerId !== this._gesturePointer;
  }
  _onCanvasMove(e) {
    if (!this._foreignPointer(e)) {
      if (e.buttons === 0 && (this._drag || this._draft || this._draftTracker || this._marquee || this._areaDragStart)) {
        this._cancelGesture();
        return;
      }
      if (this._tool === "wall" && this._draft) {
        const t = this._toVirtual(e, !1), i = this._snapWallEnd(this._draft.x1, this._draft.y1, t.x, t.y);
        this._draft = { ...this._draft, x2: i.x, y2: i.y };
        return;
      }
      if (this._tool === "tracker" && this._draftTracker) {
        const t = this._toVirtual(e, !1);
        this._draftTracker = {
          ...this._draftTracker,
          x1: this._snap(t.x),
          y1: this._snap(t.y)
        };
        return;
      }
      if (this._tool === "area" && this._areaDragStart) {
        const t = this._toVirtual(e, !1), i = this._areaDragStart, n = { x: t.x, y: t.y };
        if (this._areaDragCurrent = n, this._areaDragMoved) {
          this._updateAreaRectangleDraft(n);
          return;
        }
        !this._areaDragMoved && this._areaDragTimer === null && Math.hypot(n.x - i.x, n.y - i.y) > en && (this._areaDragTimer = setTimeout(() => {
          this._areaDragTimer = null;
          const o = this._areaDragCurrent;
          if (!this._areaDragStart || !o) return;
          const r = { x: this._snap(o.x), y: this._snap(o.y) };
          r.x === i.x && r.y === i.y || (this._areaDragMoved = !0, this._updateAreaRectangleDraft(o));
        }, Eg));
        return;
      }
      if (this._tool === "area" && this._draftArea) {
        const t = this._toVirtual(e, !1);
        this._areaHover = this._snapAreaPoint(t.x, t.y);
        return;
      }
      if (this._marquee) {
        const t = this._toVirtual(e, !1);
        this._marquee = { ...this._marquee, x1: t.x, y1: t.y };
        return;
      }
      this._drag && this._dragMoves.push({ ...this._toVirtual(e, !1), altKey: e.altKey });
    }
  }
  _onCanvasUp(e) {
    if (!this._foreignPointer(e)) {
      if (this._dragMoves.settle(), this._gesturePointer = null, this._tool === "wall" && this._draft) {
        const t = this._draft;
        if (this._draft = null, t.x1 !== t.x2 || t.y1 !== t.y2) {
          const i = { id: Q("wall"), ...t };
          this._commitFloor({ walls: [...this._floor().walls, i] }), this._selection = [{ kind: "wall", id: i.id }];
        }
        return;
      }
      if (this._tool === "tracker" && this._draftTracker) {
        const t = this._draftTracker;
        this._draftTracker = null, this._releasePointer(e);
        const i = Math.min(t.x0, t.x1), n = Math.min(t.y0, t.y1), o = Math.abs(t.x1 - t.x0), r = Math.abs(t.y1 - t.y0);
        o >= this.grid / 2 && r >= this.grid / 2 && this._addTracker(i, n, o, r);
        return;
      }
      if (this._tool === "area" && this._areaDragStart) {
        const t = this._areaDragStart, i = this._areaDragMoved, n = this._draftArea;
        if (this._clearAreaDragTimer(), this._areaDragStart = null, this._areaDragCurrent = null, this._areaDragMoved = !1, this._releasePointer(e), i && n) {
          const o = Math.abs(n.points[1].x - n.points[0].x), r = Math.abs(n.points[3].y - n.points[0].y);
          if (o > 0 && r > 0) {
            const a = Qi(n.points, this._floor().areas ?? [], { dx: 0, dy: 0 });
            if (!Ht(a) || (this._floor().areas ?? []).some((l) => this._rectAreasOverlap({ id: "draft-area", points: a, showName: !0 }, l))) {
              this._draftArea = null;
              return;
            }
            const s = { id: Q("area"), points: a, showName: !0 };
            this._commitFloor({ areas: [...this._floor().areas ?? [], s] }), this._selection = [{ kind: "area", id: s.id }], this._tool = "select";
          }
          this._draftArea = null;
          return;
        }
        this._addAreaPoint(t);
        return;
      }
      if (this._marquee) {
        const t = this._marquee;
        if (this._marquee = null, this._releasePointer(e), !(Math.hypot(t.x1 - t.x0, t.y1 - t.y0) > 4)) {
          this._marqueeAdd || this._clearSel();
          return;
        }
        const n = this._elementsInRect(t);
        this._selection = this._marqueeAdd ? this._mergeSel(this._selection, n) : n, this._liveEditKey = null;
        return;
      }
      this._drag && (this._drag = null, this._releasePointer(e), this._flushDrag());
    }
  }
  /** All active-floor elements whose center lies inside the marquee rect. */
  _elementsInRect(e) {
    return Lm(this._floor(), e);
  }
  // ---- dragging existing elements ----------------------------------------
  /**
   * Which element a plain click should actually select (issue #52). The
   * element whose hit area received the event is only a starting point: a big
   * tracker zone or an Area polygon can sit over a device, so we hit-test the
   * point geometrically and take the most *specific* candidate. Clicking again
   * without moving steps to the next candidate underneath and wraps, which is
   * what makes buried elements reachable at all.
   *
   * Modifier-clicks (multi-select) and explicit handles keep their old
   * behavior — they address one element on purpose.
   */
  _resolvePick(e, t) {
    if (e.shiftKey || e.ctrlKey || e.metaKey) return t;
    const i = this._toVirtual(e, !1), n = Nm(this._floor(), i.x, i.y, {
      itemSize: je,
      textSize: vt,
      wallThickness: V,
      hass: this.hass
    }), o = !!this._pickAnchor && Math.hypot(e.clientX - this._pickAnchor.clientX, e.clientY - this._pickAnchor.clientY) <= Mg;
    return this._pickAnchor = { clientX: e.clientX, clientY: e.clientY }, jm(n, this._selection, o) ?? t;
  }
  _startDrag(e, t, i, n, o) {
    if (this._tool !== "select" || (e.stopPropagation(), this._gesturePointer !== null)) return;
    this._canvasWrap?.focus({ preventScroll: !0 });
    const r = i != null || n != null || o != null, a = r ? t : this._resolvePick(e, t);
    r ? this._selectOne(a) : this._selectForPointer(e, a), !Wt(this._floor(), a) && (this._drag = {
      primary: a,
      start: this._toVirtual(e, !1),
      orig: this._snapshotSelection(),
      endpoint: i,
      areaVertex: n,
      areaEdge: o
    }, a.kind === "wall" && (this._drag.attached = this._attachedCorners(a.id, i)), this._gesturePointer = e.pointerId, this._capturePointer(e));
  }
  /** See {@link attachedCorners}: shared room corners that stretch with this wall. */
  _attachedCorners(e, t) {
    return Im(this._floor().walls, e, t);
  }
  /** Capture the start positions of every selected element on the active floor. */
  _snapshotSelection() {
    const e = this._floor(), t = /* @__PURE__ */ new Map();
    for (const i of this._selection)
      if (!Wt(e, i))
        if (i.kind === "wall") {
          const n = e.walls.find((o) => o.id === i.id);
          n && t.set(`wall:${n.id}`, { kind: "wall", x1: n.x1, y1: n.y1, x2: n.x2, y2: n.y2 });
        } else if (i.kind === "opening") {
          const n = e.openings.find((o) => o.id === i.id);
          n && t.set(`opening:${n.id}`, { kind: "pt", x: n.x, y: n.y });
        } else if (i.kind === "item") {
          const n = e.items.find((o) => o.id === i.id);
          n && t.set(`item:${n.id}`, { kind: "pt", x: n.x, y: n.y });
        } else if (i.kind === "text") {
          const n = e.texts.find((o) => o.id === i.id);
          n && t.set(`text:${n.id}`, { kind: "pt", x: n.x, y: n.y });
        } else if (i.kind === "furniture") {
          const n = e.furniture.find((o) => o.id === i.id);
          n && t.set(`furniture:${n.id}`, { kind: "pt", x: n.x, y: n.y });
        } else if (i.kind === "area") {
          const n = (e.areas ?? []).find((o) => o.id === i.id);
          n && t.set(`area:${n.id}`, { kind: "polygon", points: n.points.map((o) => ({ ...o })) });
        } else {
          const n = (e.trackers ?? []).find((o) => o.id === i.id);
          n && t.set(`tracker:${n.id}`, { kind: "pt", x: n.x, y: n.y });
        }
    return t;
  }
  /**
   * Keep full-side-adjacent rectangle rooms synchronized while one side moves.
   *
   * Returns the updated `areas` array plus the ids of rooms that actually
   * coupled to the primary room during this move.
   */
  _coupleRectAreaSharedEdges(e, t, i, n, o) {
    let r = t;
    const a = t, s = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set();
    for (const p of n) {
      if (p.id === e) continue;
      const c = s.get(p.id) ?? p.points;
      if (p.locked) continue;
      const d = Mm(a, c, i, o);
      d && (r = d.points, s.set(p.id, d.other), l.add(p.id));
    }
    return {
      areas: n.map((p) => {
        if (p.id === e) return { ...p, points: r };
        const c = s.get(p.id);
        return c ? { ...p, points: c } : p;
      }),
      coupledIds: l
    };
  }
  _rectAreasOverlap(e, t) {
    const i = e.points.map((a) => a.x), n = e.points.map((a) => a.y), o = t.points.map((a) => a.x), r = t.points.map((a) => a.y);
    return Math.max(...i) > Math.min(...o) && Math.min(...i) < Math.max(...o) && Math.max(...n) > Math.min(...r) && Math.min(...n) < Math.max(...r);
  }
  /**
   * Limit a shared-edge resize against rooms that are not part of the current
   * shared component. A coupled neighbor can encounter a new room after the
   * drag starts, so clamping only the primary room is insufficient.
   */
  _coupledEdgeResize(e, t, i, n, o) {
    const r = this._coupleRectAreaSharedEdges(e, t.points, i, n, o);
    if (!r.coupledIds.size) return { ...r, delta: i };
    const a = /* @__PURE__ */ new Set([e, ...r.coupledIds]), s = n.filter((d) => !a.has(d.id)), l = (d) => d.areas.some(
      (u) => a.has(u.id) && (!Ht(u.points) || s.some((g) => this._rectAreasOverlap(u, g)))
    );
    if (!l(r)) return { ...r, delta: i };
    let h = 0, p = 1;
    for (let d = 0; d < 18; d++) {
      const u = (h + p) / 2, g = { dx: i.dx * u, dy: i.dy * u }, b = this._coupleRectAreaSharedEdges(e, t.points, g, n, o);
      l(b) ? p = u : h = u;
    }
    const c = { dx: i.dx * h, dy: i.dy * h };
    return {
      ...this._coupleRectAreaSharedEdges(e, t.points, c, n, o),
      delta: c
    };
  }
  _applyDrag(e) {
    const t = this._drag;
    if (!t.moved) {
      if (Math.hypot(e.x - t.start.x, e.y - t.start.y) <= en) return;
      t.moved = !0, t.priorFuture = this._future, t.priorHistory = this._history, this._pushHistory(), t.snapshot = this._history[this._history.length - 1];
    }
    const i = this._floor();
    if (t.endpoint) {
      const h = e.altKey ? [] : t.attached ?? [], p = /* @__PURE__ */ new Set([
        `${t.primary.id}:${t.endpoint}`,
        ...h.map((u) => `${u.id}:${u.end}`)
      ]), c = this._snapWallPointExcluding(e.x, e.y, p), d = i.walls.map((u) => {
        let g = u;
        u.id === t.primary.id && (g = t.endpoint === 1 ? { ...g, x1: c.x, y1: c.y } : { ...g, x2: c.x, y2: c.y });
        for (const b of h)
          b.id === u.id && (g = b.end === 1 ? { ...g, x1: c.x, y1: c.y } : { ...g, x2: c.x, y2: c.y });
        return g;
      });
      this._emitFloor({ walls: d });
      return;
    }
    if (t.primary.kind === "area" && t.areaVertex != null) {
      const h = t.areaVertex, p = this._snapAreaPoint(e.x, e.y, { areaId: t.primary.id, vertexIndex: h }), c = (i.areas ?? []).find((v) => v.id === t.primary.id);
      let d = ye(c.points) ? Sm(c.points, h, p) : c.points.map((v, m) => m === h ? p : v);
      const u = { dx: p.x - c.points[h].x, dy: p.y - c.points[h].y }, g = ye(c.points) ? [ve[(h + 3) % 4], ve[h]] : [];
      let b = { areas: i.areas ?? [], coupledIds: /* @__PURE__ */ new Set() };
      for (const v of g) {
        const m = this._coupleRectAreaSharedEdges(t.primary.id, c.points, u, b.areas, v);
        b = {
          areas: m.areas,
          coupledIds: /* @__PURE__ */ new Set([...b.coupledIds, ...m.coupledIds])
        };
      }
      if (ye(c.points) && !Ht(d)) {
        this._emitFloor({ areas: i.areas ?? [] });
        return;
      }
      this._emitFloor({
        areas: b.areas.map((v) => v.id === t.primary.id ? { ...v, points: d } : v)
      });
      return;
    }
    if (t.primary.kind === "area" && t.areaEdge != null) {
      const h = t.areaEdge, p = { x: this._snap(e.x), y: this._snap(e.y) }, c = (i.areas ?? []).find((S) => S.id === t.primary.id);
      let d = Em(c.points, h, p);
      const u = c.points[h % 4], g = c.points[(h + 1) % 4], b = Math.abs(u.y - g.y) < ie, v = d[h % 4], m = b ? { dx: 0, dy: v.y - u.y } : { dx: v.x - u.x, dy: 0 }, $ = this._coupledEdgeResize(
        t.primary.id,
        c,
        m,
        i.areas ?? [],
        ve[h]
      ), E = ($.areas ?? []).filter(
        (S) => S.id !== t.primary.id && !$.coupledIds.has(S.id)
      ), k = $.coupledIds.size ? $.areas.find((S) => S.id === t.primary.id)?.points ?? d : d;
      if (d = Qi(
        k,
        E,
        $.delta
      ), !Ht(d)) {
        this._emitFloor({ areas: i.areas ?? [] });
        return;
      }
      this._emitFloor({
        areas: $.areas.map((S) => S.id === t.primary.id ? { ...S, points: d } : S)
      });
      return;
    }
    if (this._selection.length === 1 && t.primary.kind === "opening" && !J(
      i.openings.find((h) => h.id === t.primary.id) ?? { type: "door" }
    )) {
      const h = t.orig.get(`opening:${t.primary.id}`);
      if (h && h.kind === "pt") {
        const p = h.x + (e.x - t.start.x), c = h.y + (e.y - t.start.y), d = ar(p, c, i.walls, kr), u = i.openings.map(
          (g) => g.id === t.primary.id ? d ? { ...g, x: d.x, y: d.y, angle: d.angle } : { ...g, x: this._snap(p), y: this._snap(c) } : g
        );
        this._emitFloor({ openings: u });
        return;
      }
    }
    const n = t.orig.get(`${t.primary.kind}:${t.primary.id}`);
    if (!n) return;
    const o = n.kind === "wall" ? n.x1 : n.kind === "polygon" ? n.points[0].x : n.x, r = n.kind === "wall" ? n.y1 : n.kind === "polygon" ? n.points[0].y : n.y, a = this._snap(o + (e.x - t.start.x)) - o, s = this._snap(r + (e.y - t.start.y)) - r;
    let l = this._applyDelta(a, s, t.orig);
    if (t.attached?.length && !e.altKey) {
      const h = (l.walls ?? i.walls).map((p) => {
        let c = p;
        for (const d of t.attached)
          d.id !== p.id || t.orig.has(`wall:${d.id}`) || (c = d.end === 1 ? { ...c, x1: d.x0 + a, y1: d.y0 + s } : { ...c, x2: d.x0 + a, y2: d.y0 + s });
        return c;
      });
      l = { ...l, walls: h };
    }
    this._emitFloor(l);
  }
  /** Translate every snapshotted element by (dx, dy). */
  _applyDelta(e, t, i) {
    return zm(this._floor(), e, t, i);
  }
  // ---- overlay drag for items & texts (HTML, not SVG) --------------------
  _onOverlayDown(e, t) {
    if (this._tool !== "select" || (e.stopPropagation(), e.preventDefault(), this._gesturePointer !== null)) return;
    this._canvasWrap?.focus({ preventScroll: !0 });
    const i = this._resolvePick(e, t);
    this._selectForPointer(e, i), this._drag = {
      primary: i,
      start: this._toVirtual(e, !1),
      orig: this._snapshotSelection()
    }, this._gesturePointer = e.pointerId, this._capturePointer(e, e.currentTarget);
  }
  _onOverlayMove(e) {
    if (!this._foreignPointer(e)) {
      if (e.buttons === 0 && this._drag) {
        this._cancelGesture();
        return;
      }
      this._drag && this._dragMoves.push({ ...this._toVirtual(e, !1), altKey: e.altKey });
    }
  }
  _onOverlayUp(e) {
    this._foreignPointer(e) || (this._dragMoves.settle(), this._gesturePointer = null, this._drag && (this._drag = null, this._releasePointer(e, e.currentTarget), this._flushDrag()));
  }
  // ---- element creation / mutation ---------------------------------------
  _addOpening(e, t, i) {
    const n = this._floor(), o = e === "skylight", r = o ? void 0 : ar(t, i, n.walls, kr), a = {
      id: Q(e),
      type: e,
      x: r?.x ?? t,
      y: r?.y ?? i,
      // User-editable from the door/window context bar so opening size can be
      // set BEFORE placing (the previous hardcoded 60 forced place-then-resize).
      length: o ? this._defaultSkylightLength : this._defaultOpeningLength,
      angle: r?.angle ?? 0,
      // Its second side, which only a skylight has. Written out rather than
      // left to the default so the very first drag of the Width field has
      // something to move, and so the plan says what it drew.
      ...o ? { width: this._defaultSkylightWidth } : {}
    };
    this._commitFloor({ openings: [...n.openings, a] }), this._selection = [{ kind: "opening", id: a.id }], this._tool = "select";
  }
  _addItem(e) {
    const t = {
      id: Q("item"),
      entity: "",
      x: this._snap(this._config.width / 2),
      y: this._snap(this._config.height / 2),
      kind: e,
      showState: e === "sensor",
      showIcon: !0,
      size: je
    };
    this._commitFloor({ items: [...this._floor().items, t] }), this._selection = [{ kind: "item", id: t.id }], this._tool = "select";
  }
  _addFurniture(e) {
    const t = kp(e, this._symbols()), i = {
      id: Q("furn"),
      type: e,
      x: this._snap(this._config.width / 2),
      y: this._snap(this._config.height / 2),
      w: t.w,
      h: t.h,
      angle: 0
    };
    this._commitFloor({ furniture: [...this._floor().furniture, i] }), this._selection = [{ kind: "furniture", id: i.id }], this._tool = "select";
  }
  /**
   * Drop a new Tracker on the active floor sized to the user's drag and
   * select it so the per-element editor (entity pickers + sensor ranges) is
   * immediately reachable. Tool switches back to Select so the user can
   * configure / move the new tracker without re-dragging.
   */
  _addTracker(e, t, i, n) {
    const o = {
      id: Q("tracker"),
      x: e,
      y: t,
      w: i,
      h: n,
      angle: 0,
      dotSize: Dn
    };
    this._commitFloor({ trackers: [...this._floor().trackers ?? [], o] }), this._selection = [{ kind: "tracker", id: o.id }], this._tool = "select";
  }
  /** Close the in-progress Area draft into a committed polygon and select it. */
  _finishArea() {
    if (!this._draftArea || this._draftArea.points.length < 3) return;
    const e = { id: Q("area"), points: this._draftArea.points, showName: !0 };
    this._commitFloor({ areas: [...this._floor().areas ?? [], e] }), this._selection = [{ kind: "area", id: e.id }], this._draftArea = null, this._areaHover = null, this._tool = "select";
  }
  _clearAreaDragTimer() {
    this._areaDragTimer !== null && (clearTimeout(this._areaDragTimer), this._areaDragTimer = null);
  }
  _roomWallSegments(e) {
    return (e.areas ?? []).flatMap(
      (t) => cs(t.id, t.points, t.sideWalls ?? {}).filter((i) => !i.divider)
    );
  }
  _updateAreaRectangleDraft(e) {
    const t = this._areaDragStart;
    if (!t) return;
    const i = { x: this._snap(e.x), y: this._snap(e.y) };
    this._draftArea = {
      points: Qi(
        Hi({ x0: t.x, y0: t.y, x1: i.x, y1: i.y }),
        this._floor().areas ?? [],
        { dx: i.x - t.x, dy: i.y - t.y }
      )
    };
  }
  /** Add one polygon vertex, or close the draft when clicking its start. */
  _addAreaPoint(e) {
    if (!this._draftArea) {
      this._draftArea = { points: [e] };
      return;
    }
    const t = this._draftArea.points, i = t[0];
    if (t.length >= 3 && Math.hypot(e.x - i.x, e.y - i.y) <= it) {
      this._finishArea();
      return;
    }
    const n = t[t.length - 1];
    (e.x !== n.x || e.y !== n.y) && (this._draftArea = { points: [...t, e] });
  }
  _addText() {
    const e = {
      id: Q("text"),
      x: this._snap(this._config.width / 2),
      y: this._snap(this._config.height / 2),
      text: "Label",
      size: vt
    };
    this._commitFloor({ texts: [...this._floor().texts, e] }), this._selection = [{ kind: "text", id: e.id }], this._tool = "select";
  }
  _deleteSelected() {
    if (!this._selection.length) return;
    const e = this._floor(), t = this._idsOfKind("wall"), i = this._idsOfKind("opening"), n = this._idsOfKind("item"), o = this._idsOfKind("text"), r = this._idsOfKind("furniture"), a = this._idsOfKind("tracker"), s = this._idsOfKind("area");
    this._commitFloor({
      walls: e.walls.filter((l) => !t.has(l.id)),
      openings: e.openings.filter((l) => !i.has(l.id)),
      items: e.items.filter((l) => !n.has(l.id)),
      texts: e.texts.filter((l) => !o.has(l.id)),
      furniture: e.furniture.filter((l) => !r.has(l.id)),
      trackers: (e.trackers ?? []).filter((l) => !a.has(l.id)),
      areas: (e.areas ?? []).filter((l) => !s.has(l.id))
    }), this._clearSel();
  }
  // ---- clipboard (copy / paste / duplicate) ------------------------------
  _copy() {
    if (!this._selection.length) return;
    const e = this._floor(), t = this._idsOfKind("wall"), i = this._idsOfKind("opening"), n = this._idsOfKind("item"), o = this._idsOfKind("text"), r = this._idsOfKind("furniture"), a = this._idsOfKind("tracker"), s = this._idsOfKind("area");
    this._clipboard = structuredClone({
      walls: e.walls.filter((l) => t.has(l.id)),
      openings: e.openings.filter((l) => i.has(l.id)),
      items: e.items.filter((l) => n.has(l.id)),
      texts: e.texts.filter((l) => o.has(l.id)),
      furniture: e.furniture.filter((l) => r.has(l.id)),
      trackers: (e.trackers ?? []).filter((l) => a.has(l.id)),
      areas: (e.areas ?? []).filter((l) => s.has(l.id))
    });
  }
  /** Paste the clipboard onto the active floor, offset by one snap step, with fresh ids. */
  _paste() {
    if (!this._clipboard) return;
    const e = structuredClone(this._clipboard), t = this._resolvedSnap || this.grid, i = this._floor(), n = { locked: void 0 }, o = e.walls.map((c) => ({
      ...c,
      ...n,
      id: Q("wall"),
      x1: c.x1 + t,
      y1: c.y1 + t,
      x2: c.x2 + t,
      y2: c.y2 + t
    })), r = e.openings.map((c) => ({
      ...c,
      ...n,
      id: Q(c.type),
      x: c.x + t,
      y: c.y + t
    })), a = e.items.map((c) => ({
      ...c,
      ...n,
      id: Q("item"),
      x: c.x + t,
      y: c.y + t
    })), s = e.texts.map((c) => ({
      ...c,
      ...n,
      id: Q("text"),
      x: c.x + t,
      y: c.y + t
    })), l = e.furniture.map((c) => ({
      ...c,
      ...n,
      id: Q("furn"),
      x: c.x + t,
      y: c.y + t
    })), h = (e.trackers ?? []).map((c) => ({
      ...c,
      ...n,
      id: Q("tracker"),
      x: c.x + t,
      y: c.y + t
    })), p = (e.areas ?? []).map((c) => ({
      ...c,
      ...n,
      id: Q("area"),
      points: c.points.map((d) => ({ x: d.x + t, y: d.y + t }))
    }));
    this._commitFloor({
      walls: [...i.walls, ...o],
      openings: [...i.openings, ...r],
      items: [...i.items, ...a],
      texts: [...i.texts, ...s],
      furniture: [...i.furniture, ...l],
      trackers: [...i.trackers ?? [], ...h],
      areas: [...i.areas ?? [], ...p]
    }), this._selection = [
      ...o.map((c) => ({ kind: "wall", id: c.id })),
      ...r.map((c) => ({ kind: "opening", id: c.id })),
      ...a.map((c) => ({ kind: "item", id: c.id })),
      ...s.map((c) => ({ kind: "text", id: c.id })),
      ...l.map((c) => ({ kind: "furniture", id: c.id })),
      ...h.map((c) => ({ kind: "tracker", id: c.id })),
      ...p.map((c) => ({ kind: "area", id: c.id }))
    ], this._tool = "select";
  }
  _duplicate() {
    this._copy(), this._paste();
  }
  /**
   * Pin (or release) every selected element (issue #191). One history entry
   * for the whole selection, since it is one press.
   *
   * `undefined` rather than `false` when releasing: unlocked is the default,
   * so a released element goes back to saying nothing about it rather than
   * leaving `locked: false` behind in the YAML.
   */
  _setLocked(e) {
    if (!this._selection.length) return;
    const t = this._floor(), i = e || void 0, n = (o, r) => {
      const a = this._idsOfKind(r);
      return o.map((s) => a.has(s.id) ? { ...s, locked: i } : s);
    };
    this._commitFloor({
      walls: n(t.walls, "wall"),
      openings: n(t.openings, "opening"),
      items: n(t.items, "item"),
      texts: n(t.texts, "text"),
      furniture: n(t.furniture, "furniture"),
      trackers: n(t.trackers ?? [], "tracker"),
      areas: n(t.areas ?? [], "area")
    });
  }
  // ---- floors -------------------------------------------------------------
  /** Add a floor that reuses the current floor's walls (fresh ids) and nothing else. */
  _addFloor() {
    const e = this._floor().walls.map((o) => ({ ...o, id: Q("wall") })), t = (this._config.floors?.length ?? 1) + 1, i = El(`Floor ${t}`, e), n = [...this._config.floors ?? [], i];
    this._activeFloorId = i.id, this._clearSel(), this._commit({ ...this._config, floors: n });
  }
  _switchFloor(e) {
    e !== this._activeFloorId && (this._activeFloorId = e, this._clearSel());
  }
  /**
   * Move the active floor one step up/down the list (issue #66) — the safe
   * alternative to reordering floor blocks by hand in YAML. Commits through
   * history, so a mis-move is one Ctrl+Z away.
   */
  _moveFloor(e) {
    const t = Tl(this._config.floors ?? [], this._activeFloorId, e);
    t && this._commit({ ...this._config, floors: t });
  }
  _renameFloor(e, t) {
    this._commit({
      ...this._config,
      floors: (this._config.floors ?? []).map((i) => i.id === e ? { ...i, name: t } : i)
    });
  }
  /**
   * Link the active floor to a Home Assistant floor (issue #24). Linking also
   * names the floor after the HA floor — the point of the association — while
   * a later manual rename sticks (we never re-sync silently). Unlinking keeps
   * the current name.
   */
  _linkHaFloor(e) {
    const t = Po(this.hass).find((i) => i.floor_id === e);
    this._commit({
      ...this._config,
      floors: (this._config.floors ?? []).map(
        (i) => i.id === this._activeFloorId ? { ...i, haFloor: t?.floor_id, ...t ? { name: t.name } : {} } : i
      )
    });
  }
  /** HA-floor link row for the floor gear popover; hidden when HA exposes no floors. */
  _renderHaFloorRow(e) {
    const t = Po(this.hass);
    return t.length ? y`
      <div class="pop-row">
        <label>HA floor</label>
        <select
          .value=${e?.haFloor ?? ""}
          @change=${(i) => this._linkHaFloor(i.target.value)}
        >
          <option value="" ?selected=${!e?.haFloor}>(not linked)</option>
          ${t.map(
      (i) => y`<option value=${i.floor_id} ?selected=${e?.haFloor === i.floor_id}>
                ${i.name}
              </option>`
    )}
        </select>
      </div>
    ` : y`${f}`;
  }
  _deleteFloor() {
    const e = this._config.floors ?? [];
    if (e.length <= 1) return;
    const t = e.findIndex((n) => n.id === this._activeFloorId), i = e.filter((n) => n.id !== this._activeFloorId);
    this._commit({ ...this._config, floors: i }), this._activeFloorId = i[Math.max(0, t - 1)].id, this._clearSel();
  }
  _updateWall(e, t) {
    this._commitFloor({
      walls: this._floor().walls.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateOpening(e, t) {
    this._commitFloor({
      openings: this._floor().openings.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateItem(e, t) {
    this._commitFloor({
      items: this._floor().items.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateText(e, t) {
    this._commitFloor({
      texts: this._floor().texts.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateFurniture(e, t) {
    this._commitFloor({
      furniture: this._floor().furniture.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateTracker(e, t) {
    this._commitFloor({
      trackers: (this._floor().trackers ?? []).map(
        (i) => i.id === e ? { ...i, ...t } : i
      )
    });
  }
  _updateArea(e, t) {
    this._commitFloor({
      areas: (this._floor().areas ?? []).map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  /** Drop the HA-area link but keep the name the user sees on the plan. */
  _unlinkHaArea(e) {
    this._updateArea(e, { haArea: void 0 });
  }
  /**
   * Status line under the Area's name field. The name doubles as the HA-area
   * link (see {@link areaNamePatch}), so the resulting association would
   * otherwise be invisible: this shows a "Linked" chip whenever `haArea` is
   * set, with an unlink button for the one intent the merged field can't
   * express — keeping the name while dropping the link.
   */
  _renderAreaLinkRow(e, t) {
    const i = e.haArea ? t.find((n) => n.area_id === e.haArea) : void 0;
    return y`
      <div class="row wide area-name-status">
        <label></label>
        ${e.haArea ? y`<span
              class="ha-link-chip"
              title=${`Linked to the Home Assistant area "${i?.name ?? e.haArea}"`}
            >
              <ha-icon icon="mdi:link-variant"></ha-icon>Linked
              <button
                class="unlink"
                title="Keep this name but unlink the Home Assistant area"
                @click=${() => this._unlinkHaArea(e.id)}
              >
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
            </span>` : y`<span class="hint"
              >${t.length ? "Name this room after a Home Assistant area to link it." : "No Home Assistant areas available."}</span
            >`}
      </div>
    `;
  }
  /**
   * The editor's colour control: a swatch that edits live as you drag, plus a
   * text box for theme variables and named colours, committed on change.
   * Emptying the text box clears the override.
   *
   * Every colour in this editor is one of these. It lived as eight copies of
   * the same markup before the colour rules below needed a ninth.
   */
  /**
   * The plan's named colours (issue #265), usable and deduped.
   */
  _palette() {
    return It(this._config?.palette);
  }
  /**
   * The dropdown that puts a named colour into a colour field, or `nothing`
   * when the plan has no palette.
   *
   * Rendering nothing is the point of the empty case: a plan that never names a
   * colour should see the editor it saw before this feature existed, not a
   * dropdown with one greyed-out entry in it. The control appears the moment
   * the first name is added under Project and disappears with the last.
   *
   * Choosing a name stores a `var()` reference rather than the colour itself,
   * which is what makes the link live — see `src/palette.ts`. Choosing "Custom"
   * writes back the colour the name currently resolves to, so leaving the
   * palette breaks the link without changing what is on screen.
   */
  _renderPalettePicker(e, t) {
    const i = this._palette();
    if (!i.length) return f;
    const n = rs(e), o = n && i.some((r) => te(r.name) === n) ? n : void 0;
    return y`
      <select
        class="palette-pick"
        title="Use one of the plan's named colours"
        .value=${o ?? ""}
        @change=${(r) => {
      const a = r.target.value;
      if (!a) {
        o && t(Jt(e, i));
        return;
      }
      const s = i.find((l) => te(l.name) === a);
      s && t(cr(s.name));
    }}
      >
        <option value="" ?selected=${!o}>Custom…</option>
        ${i.map(
      (r) => y`<option
            value=${te(r.name)}
            ?selected=${te(r.name) === o}
          >
            ${r.name}
          </option>`
    )}
      </select>
    `;
  }
  /**
   * What an `<input type="color">` should show for a stored value: the literal
   * colour a palette reference names, since the swatch cannot resolve a var()
   * and would sit on black instead.
   */
  _swatchValue(e, t) {
    const i = Jt(e, this._config?.palette);
    return typeof i == "string" && i ? i : t;
  }
  _renderColorRow(e) {
    return y`
      <div class="row">
        <label title=${e.title ?? f}>${e.label}</label>
        <input
          type="color"
          title=${e.title ?? f}
          .value=${this._swatchValue(e.value, e.swatch)}
          @input=${(t) => e.onLive(t.target.value)}
        />
        <input
          type="text"
          placeholder=${e.placeholder}
          .value=${e.value ?? ""}
          @change=${(t) => e.onCommit(t.target.value || void 0)}
        />
        ${this._renderPalettePicker(e.value, e.onCommit)}
      </div>
    `;
  }
  /**
   * An entity's `supported_features` bitmask, or 0 when it isn't in `hass`.
   * Handed to {@link openingForm} so its Tap field can name the default the
   * live card would take — which for a `cover` depends on whether it can
   * actually open and close.
   */
  _supportedFeatures(e) {
    return this.hass?.states[e]?.attributes?.supported_features ?? 0;
  }
  /**
   * The glyph a device shows when no state rule names one — what a rule's
   * empty icon box falls back to. Resolved exactly as the card resolves it,
   * with the rules removed so a currently-matching rule cannot report itself
   * as the default.
   */
  _itemDefaultIcon(e) {
    const t = e.entity ? this.hass?.states[e.entity] : void 0;
    return pn(
      { ...e, stateColor: void 0 },
      t,
      e.entity ? this.hass?.entities?.[e.entity]?.icon : void 0
    );
  }
  /**
   * The device's icon, rendered here rather than up in the form (issue #127):
   * it is the same setting the state rules below override, so it belongs
   * beside them — like "Active color" beside the colours those rules replace.
   *
   * Unlike the colour it stays on screen once rules exist, because rules do
   * *not* replace it: a rule with no icon of its own falls through to this
   * one, which is what lets someone colour by state without naming the same
   * glyph in every row. Hiding it would strand a setting that is still
   * drawing.
   */
  _renderItemIconRow(e) {
    const t = "Icon for this device; a state rule below can swap it";
    return y`
      <div class="row wide">
        <label title=${t}>Icon</label>
        ${this._renderIconPicker(e.icon ?? "", (i) => this._updateItem(e.id, { icon: i || void 0 }), {
      // The entity's own glyph, so leaving the box empty is visibly a
      // choice rather than a blank.
      placeholder: this._itemDefaultIcon(e),
      title: t
    })}
      </div>
      ${e.stateColor?.length ? y`<p class="hint rule-note">Shown while no rule below names an icon of its own.</p>` : f}
    `;
  }
  /**
   * One titled group of the element panel, with a rule above it.
   *
   * The device panel had grown to two dozen controls in one flat run, in the
   * order they had been added rather than any order you would look for them
   * in. Grouping them costs a heading and a hairline each; what it buys is
   * that "where do I set the label position" has an answer you can guess.
   *
   * The heading is a disclosure button and the group starts collapsed (issue
   * #205): headings you can skim beat controls you have to scroll past, and
   * the panel now opens as a table of contents for the element. See
   * `_openGroups` for why the open set is keyed by title.
   *
   * Collapsed means *not rendered*, not hidden — so a closed group's `ha-form`
   * costs nothing, and reopening it rebuilds from `data` the same way a
   * selection change does.
   *
   * Takes the content rather than a field list because a group is rarely all
   * `ha-form` — the readings list, the icon row and the colour pickers are
   * hand-rolled, and they belong *inside* the group whose subject they share.
   */
  _renderGroup(e, ...t) {
    const i = this._openGroups.has(e);
    return y`
      <div class="cfg-group ${i ? "open" : ""}">
        <button
          class="cfg-group-title"
          type="button"
          aria-expanded=${i}
          @click=${() => this._toggleGroup(e)}
        >
          <ha-icon icon=${i ? "mdi:chevron-down" : "mdi:chevron-right"}></ha-icon>
          <span>${e}</span>
        </button>
        ${i ? t : f}
      </div>
    `;
  }
  /** Open a collapsed config group, or collapse an open one. */
  _toggleGroup(e) {
    const t = new Set(this._openGroups);
    t.delete(e) || t.add(e), this._openGroups = t;
  }
  /**
   * A device's other entities (issue #180): every reading beyond its own
   * state, added one at a time with "+ Add entity" rather than by putting four
   * entity dropdowns on every device that will never use them.
   *
   * Plain rows rather than `ha-form` fields for the same reason the state
   * rules are: the list is repeatable and `ha-form` has no selector for that.
   *
   * The attribute box is offered on every row, not only once an entity is
   * picked, because a row with an attribute and *no* entity is a real and
   * useful configuration — it reads that attribute off the device's own
   * entity, which is how one climate shows four of its own numbers. It is HA's
   * own attribute picker, so it lists what that entity actually has.
   */
  _renderItemReadings(e) {
    const t = Pe(e), i = (o) => this._updateItem(e.id, {
      readings: o.length ? o : void 0,
      secondaryEntity: void 0,
      secondaryAttribute: void 0,
      // `badgeEntity: "secondary"` meant index 0, which is where the legacy
      // pair still is — restate it as the index so the old spelling does not
      // outlive the keys it referred to.
      ...e.badgeEntity === "secondary" ? { badgeEntity: 0 } : {}
    }), n = (o, r) => i(t.map((a, s) => s === o ? { ...a, ...r } : a));
    return y`
      <div class="row wide">
        <label title="Further entities and attributes whose readings join this device's label line"
          >Other entities</label
        >
      </div>
      ${t.map(
      (o, r) => y`
          <div class="row wide item-reading">
            ${this._renderEntityPicker(
        o.entity ?? "",
        (a) => n(r, { entity: a || void 0 }),
        void 0,
        // Scoped to the room the device sits in, exactly as its own
        // entity picker is — an extra reading is as likely to come from
        // the same room as the first one.
        this._areaEntitiesAt(e.x, e.y)?.entities
      )}
            ${this._renderAttributePicker(
        o.entity || e.entity,
        o.attribute ?? "",
        (a) => n(r, { attribute: a || void 0 }),
        "Read this attribute instead of the state — with no entity beside it, from this device's own entity"
      )}
            <button
              class="rule-remove"
              aria-label="Remove entity"
              title="Remove this entity"
              @click=${() => i(t.filter((a, s) => s !== r))}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <!-- Under its own entity, because it is about that entity and not
               about the device: an entity can be bound for the badge to read
               and kept out of the label text. -->
          <div class="row wide reading-show">
            <!-- The input is *inside* its label rather than paired to it by
                 id: the only id available here is the element's own, which
                 comes from config and can be anything, so a generated "for"
                 would be invalid or duplicated exactly when someone
                 hand-writes their YAML. Wrapping needs no id, and clicking
                 the words toggles the box either way. -->
            <label>
              <input
                type="checkbox"
                title="Off keeps this entity bound — the badge can still read it — without printing it in the label"
                .checked=${o.showState !== !1}
                @change=${(a) => n(r, {
        // `true` is the default, so it stays out of the YAML.
        showState: a.target.checked ? void 0 : !1
      })}
              />
              Show on label
            </label>
            <span class="hint"
              >${o.showState === !1 ? "Bound but not printed — the badge can still read it." : "Its value joins the label line."}</span
            >
          </div>
        `
    )}
      <div class="row wide state-color-add">
        <button @click=${() => i([...t, {}])}>
          <ha-icon icon="mdi:plus"></ha-icon>Add entity
        </button>
      </div>
      ${t.length ? y`<p class="hint rule-note">
            These show whether or not the device's own "Show state" above is on
            — that toggle is about the device's entity, not about these. Use
            each row's own "Show on label" to keep one bound without printing it.
          </p>` : f}
    `;
  }
  /**
   * The "Color by state" block (issues #68, #79, #82): a list of rules, each
   * one a condition and a colour, plus an "Add rule" button.
   *
   * A rule's condition is either a numeric threshold or an exact state, chosen
   * per row — the two ways an entity's value comes back. A rule with neither is
   * the fallback, and reads as "otherwise" in the UI.
   *
   * These are plain rows rather than `ha-form` fields: the list is repeatable
   * and ha-form has no selector for that (its `object` selector is a raw YAML
   * box). Colours are the one part of this editor that was always hand-rolled,
   * so the block still matches its neighbours.
   */
  _renderStateColorRules(e, t, i) {
    const n = e ?? [], o = (r, a) => {
      const s = n.map((l, h) => h === r ? { ...l, ...a } : l);
      t(s);
    };
    return y`
      <div class="row wide state-colors">
        <label
          title=${i?.icons ? "Color the badge — and optionally swap its icon — by what the entity reads" : "Color the element by what its entity reads"}
          >${i?.icons ? "Color & icon by state" : "Color by state"}</label
        >
      </div>
      ${n.map((r, a) => {
      const s = typeof r.state == "string" ? "state" : typeof r.above == "number" ? "above" : "else";
      return y`
          <div class="row wide state-color-rule">
            <select
              .value=${s}
              title="When this rule applies"
              @change=${(l) => {
        const h = l.target.value;
        o(a, {
          above: h === "above" ? r.above ?? 0 : void 0,
          state: h === "state" ? r.state ?? "" : void 0
        });
      }}
            >
              <option value="above">above</option>
              <option value="state">state is</option>
              <option value="else">otherwise</option>
            </select>
            ${s === "above" ? y`<input
                  type="number"
                  class="cond"
                  .value=${String(r.above ?? 0)}
                  @change=${(l) => o(a, { above: Number(l.target.value) || 0 })}
                />` : s === "state" ? y`<input
                    type="text"
                    class="cond"
                    placeholder="on"
                    .value=${r.state ?? ""}
                    @change=${(l) => o(a, { state: l.target.value })}
                  />` : y`<span class="cond hint">any other value</span>`}
            <input
              type="color"
              .value=${this._swatchValue(r.color, "#ff0000")}
              @input=${(l) => o(a, { color: l.target.value })}
            />
            <input
              type="text"
              class="rule-color-text"
              placeholder="red"
              .value=${r.color ?? ""}
              @change=${(l) => o(a, { color: l.target.value })}
            />
            ${this._renderPalettePicker(r.color, (l) => o(a, { color: l ?? "" }))}
            ${i?.icons ? (
        // Empty means "keep the device's icon", so the device's icon is
        // the placeholder — the rule shows what leaving it blank gives
        // you, and colour-only rules need no icon at all (issue #127).
        this._renderIconPicker(r.icon ?? "", (l) => o(a, { icon: l || void 0 }), {
          placeholder: i.iconPlaceholder,
          title: "Icon while this rule matches — empty keeps the device's own"
        })
      ) : f}
            <button
              class="rule-remove"
              aria-label="Remove rule"
              title="Remove this rule"
              @click=${() => {
        const l = n.filter((h, p) => p !== a);
        t(l.length ? l : void 0);
      }}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
        `;
    })}
      <div class="row wide state-color-add">
        <button
          @click=${() => t([
      ...n,
      // A fresh rule defaults to a threshold: the numeric case is what
      // both #68 and #82 ask for, and it's the one that needs no typing.
      { above: 0, color: "#ff0000" }
    ])}
        >
          <ha-icon icon="mdi:plus"></ha-icon>Add rule
        </button>
      </div>
    `;
  }
  /**
   * Entity ids to scope a picker to for something sitting at (x, y), or
   * undefined for "offer everything".
   *
   * An element inside an Area linked to a Home Assistant area gets its pickers
   * scoped to that area, unless the area's own "Filter entities" toggle turns
   * that off. Recomputed on every render from the live coordinates, so it
   * tracks the element as it's dragged in/out of the polygon, even before the
   * form reopens.
   */
  /**
   * The Area actively scoping the selected element's entity picker, if any —
   * i.e. the element is a device/furniture, it sits inside an Area, and that
   * Area is linked to an HA area with filtering on. The canvas animates this
   * one so it is obvious *which room you are working in* and why the picker
   * is short; nothing else in the editor communicated that.
   */
  _scopingAreaId() {
    if (this._selection.length !== 1) return;
    const e = this._selection[0], t = this._floor(), i = e.kind === "item" ? t.items.find((o) => o.id === e.id) : e.kind === "furniture" ? t.furniture.find((o) => o.id === e.id) : void 0;
    if (!i) return;
    const n = mr(t, i.x, i.y);
    if ($o(n))
      return Ki(this.hass, n.haArea).length ? n.id : void 0;
  }
  _areaEntitiesAt(e, t) {
    const i = mr(this._floor(), e, t);
    return $o(i) ? { entities: Ki(this.hass, i.haArea), name: i.name } : void 0;
  }
  /** Every entity in `area`'s linked HA area not already placed as an item on this floor. */
  _pendingAreaEntities(e) {
    if (!e.haArea) return [];
    const t = new Set(this._floor().items.map((i) => i.entity));
    return Ki(this.hass, e.haArea).filter((i) => !t.has(i));
  }
  /**
   * Add a device for every entity registered to `area`'s linked HA area that
   * isn't already placed as an item on this floor, laid out across the
   * polygon's interior (`layoutPointsInPolygon`) so the new icons spread out
   * instead of stacking on top of each other.
   */
  _addAreaEntities(e) {
    const t = this._pendingAreaEntities(e);
    if (!t.length) return;
    const i = Fm(e.points, t.length), n = t.map((o, r) => {
      const a = Xo(o);
      return {
        id: Q("item"),
        entity: o,
        x: Math.round(i[r].x),
        y: Math.round(i[r].y),
        kind: a,
        showState: a === "sensor",
        showIcon: !0,
        size: je
      };
    });
    this._commitFloor({ items: [...this._floor().items, ...n] }), this._selection = n.map((o) => ({ kind: "item", id: o.id }));
  }
  /** Patch a single field on one of a tracker's sensor sub-objects (X / Y axis). */
  _updateTrackerSensor(e, t, i) {
    const n = (this._floor().trackers ?? []).find((r) => r.id === e);
    if (!n) return;
    if (i === null) {
      this._updateTracker(e, { [t]: void 0 });
      return;
    }
    const o = n[t] ?? { entity: "", min: 0, max: 5 };
    this._updateTracker(e, { [t]: { ...o, ...i } });
  }
  _patchConfig(e) {
    this._commit({ ...this._config, ...e });
  }
  /**
   * Live variants for continuous controls (sliders, color pickers, typing):
   * one undo snapshot per edit burst — keyed by element and fields — then
   * plain emits, instead of a full-config clone per input event.
   */
  _beginLive(e, t, i) {
    const n = `${e}:${t}:${Object.keys(i).sort().join(",")}`;
    this._liveEditKey !== n && this._pushHistory(n);
  }
  _updateOpeningLive(e, t) {
    this._beginLive("opening", e, t), this._emitFloor({
      openings: this._floor().openings.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateItemLive(e, t) {
    this._beginLive("item", e, t), this._emitFloor({
      items: this._floor().items.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateTextLive(e, t) {
    this._beginLive("text", e, t), this._emitFloor({
      texts: this._floor().texts.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateFurnitureLive(e, t) {
    this._beginLive("furniture", e, t), this._emitFloor({
      furniture: this._floor().furniture.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateTrackerLive(e, t) {
    this._beginLive("tracker", e, t), this._emitFloor({
      trackers: (this._floor().trackers ?? []).map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _updateAreaLive(e, t) {
    this._beginLive("area", e, t), this._emitFloor({
      areas: (this._floor().areas ?? []).map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _patchConfigLive(e) {
    this._beginLive("config", "", e), this._emit({ ...this._config, ...e });
  }
  _updateWallLive(e, t) {
    this._beginLive("wall", e, t), this._emitFloor({
      walls: this._floor().walls.map((i) => i.id === e ? { ...i, ...t } : i)
    });
  }
  _patchFloorLive(e) {
    this._beginLive("floor", this._activeFloorId, e), this._emitFloor(e);
  }
  /** Route a form patch to the right per-kind update helper (commit or burst). */
  _applyElementPatch(e, t, i, n) {
    switch (e) {
      case "opening":
        n ? this._updateOpeningLive(t, i) : this._updateOpening(t, i);
        break;
      case "item":
        n ? this._updateItemLive(t, i) : this._updateItem(t, i);
        break;
      case "text":
        n ? this._updateTextLive(t, i) : this._updateText(t, i);
        break;
      case "furniture":
        n ? this._updateFurnitureLive(t, i) : this._updateFurniture(t, i);
        break;
      case "tracker":
        n ? this._updateTrackerLive(t, i) : this._updateTracker(t, i);
        break;
      case "wall":
        n ? this._updateWallLive(t, i) : this._updateWall(t, i);
        break;
      case "area":
        n ? this._updateAreaLive(t, i) : this._updateArea(t, i);
        break;
    }
  }
  // ---- rendering ----------------------------------------------------------
  // ---- zoom ----------------------------------------------------------------
  _setZoom(e) {
    this._zoom = Math.min(3, Math.max(0.5, Math.round(e * 100) / 100));
  }
  /** Ctrl/Cmd + wheel zooms the canvas (also catches trackpad pinch); plain wheel scrolls. */
  _onCanvasWheel(e) {
    !e.ctrlKey && !e.metaKey || (e.preventDefault(), this._setZoom(this._zoom - Math.sign(e.deltaY) * 0.1));
  }
  /** Reset to 100% (where the stage fits the wrap width) and scroll home. */
  _fitView() {
    this._setZoom(1), this._canvasWrap?.scrollTo({ top: 0, left: 0 });
  }
  /** One-line description of the selected element for the Element header. */
  _selectionSummary(e) {
    const t = this._floor();
    switch (e.kind) {
      case "wall": {
        const i = t.walls.find((n) => n.id === e.id);
        return i ? `Wall · ${Math.round(Math.hypot(i.x2 - i.x1, i.y2 - i.y1))} units` : "Wall";
      }
      case "opening": {
        const i = t.openings.find((n) => n.id === e.id);
        return i ? J(i) ? `Skylight · ${Math.round(i.length)}×${Math.round(de(i))}` : `${i.type === "door" ? "Door" : "Window"} · ${Math.round(i.length)} units` : "Opening";
      }
      case "item": {
        const i = t.items.find((n) => n.id === e.id);
        return i?.entity ? `Device · ${i.entity}` : "Device";
      }
      case "text": {
        const n = t.texts.find((o) => o.id === e.id)?.text ?? "";
        return n ? `Text · “${n.length > 24 ? `${n.slice(0, 24)}…` : n}”` : "Text";
      }
      case "furniture": {
        const i = t.furniture.find((o) => o.id === e.id);
        if (!i) return "Furniture";
        const n = Zm(i.type, this._symbols());
        return `${n.charAt(0).toUpperCase()}${n.slice(1)} · ${Math.round(i.w)}×${Math.round(i.h)}`;
      }
      case "area": {
        const i = (t.areas ?? []).find((n) => n.id === e.id);
        return i ? `Area · ${i.name || `${i.points.length}-point`}` : "Area";
      }
      default: {
        const i = (t.trackers ?? []).find((n) => n.id === e.id);
        return i ? `Tracker · ${Math.round(i.w)}×${Math.round(i.h)}` : "Tracker";
      }
    }
  }
  _renderGrid() {
    const { width: e, height: t } = this._config, i = this.grid, n = `${e}x${t}x${i}`;
    if (this._gridCache?.key === n) return this._gridCache.lines;
    const o = [];
    for (let r = 0; r <= e; r += i)
      o.push(_`<line x1=${r} y1="0" x2=${r} y2=${t} class="grid" />`);
    for (let r = 0; r <= t; r += i)
      o.push(_`<line x1="0" y1=${r} x2=${e} y2=${r} class="grid" />`);
    return this._gridCache = { key: n, lines: o }, o;
  }
  _isSel(e, t) {
    return this._selection.some((i) => i.kind === e && i.id === t);
  }
  /**
   * The second toolbar row: shows controls and hints for whatever you're
   * currently doing — options for the active drawing tool, or actions for the
   * current selection. This keeps contextual controls (which come and go) out
   * of the always-present top row.
   */
  _renderContextBar() {
    const e = this._tool;
    let t, i;
    if (e === "wall")
      t = "Wall", i = y`
        <button
          class=${this._freeWalls ? "" : "active"}
          aria-pressed=${!this._freeWalls}
          title="Snap walls to horizontal/vertical and existing corners (off = draw freely)"
          @click=${() => {
        this._freeWalls = !this._freeWalls;
      }}
        >
          straighten
        </button>
        <span class="ctx-hint">Drag to draw. Endpoints snap to nearby corners to close rooms.</span>
      `;
    else if (e === "tracker")
      t = "Tracker", i = y`
        <span class="ctx-hint"
          >Drag on the canvas to draw the tracked area; bind one or two
          distance sensors in the Element editor.</span
        >
      `;
    else if (e === "area") {
      t = "Area";
      const n = this._draftArea?.points.length ?? 0;
      i = y`
        <span class="ctx-hint">
          ${n === 0 ? "Click to start a room outline; points snap to nearby corners." : n < 3 ? `${n} point${n === 1 ? "" : "s"} placed — click to add more (3+ to close).` : `${n} points placed — click the first point to close the room, or keep adding.`}
        </span>
      `;
    } else if (e === "skylight") {
      t = "Skylight";
      const n = (o, r, a, s) => y`
        <label class="ctx-field">
          ${o}
          <input
            class="num"
            type="number"
            min="1"
            .value=${String(r)}
            title=${a}
            @change=${(l) => {
        s(Math.max(1, Number(l.target.value) || r));
      }}
          />
        </label>
      `;
      i = y`
        ${n(
        "Length",
        this._defaultSkylightLength,
        "Default long side applied to the next skylight you place",
        (o) => {
          this._defaultSkylightLength = o;
        }
      )}
        ${n(
        "Width",
        this._defaultSkylightWidth,
        "Default short side applied to the next skylight you place",
        (o) => {
          this._defaultSkylightWidth = o;
        }
      )}
        <span class="ctx-hint"
          >Click anywhere inside a room to drop a roof window — it sits in the
          ceiling, so it snaps to no wall.</span
        >
      `;
    } else if (e === "door" || e === "window")
      t = e === "door" ? "Door" : "Window", i = y`
        <label class="ctx-field">
          Length
          <input
            class="num"
            type="number"
            min="1"
            .value=${String(this._defaultOpeningLength)}
            title="Default length applied to the next ${e} you place"
            @change=${(n) => {
        this._defaultOpeningLength = Math.max(
          1,
          Number(n.target.value) || this._defaultOpeningLength
        );
      }}
          />
        </label>
        <span class="ctx-hint">Click on a wall to drop a ${e}; it snaps onto the wall.</span>
      `;
    else {
      t = "Select";
      const n = this._selection.length;
      i = n === 0 ? y`<span class="ctx-hint"
              >Click an element to select it, or drag a box to select several.</span
            >` : y`
              <span class="ctx-count">${n} selected</span>
              <span class="ctx-hint">Properties and actions are in the Element section below.</span>
            `;
    }
    return y`
      <div class="context-bar">
        <span class="ctx-label">${t}</span>
        ${i}
        <span class="ctx-divider"></span>
        ${this._renderSnapControl()}
      </div>
    `;
  }
  /**
   * Snap control rendered at the end of the context bar for every tool. The
   * setting governs placement / drag / wall drawing across all tools, so the
   * control needs to be reachable regardless of which tool is active.
   */
  _renderSnapControl() {
    const e = this._snapMode, t = Io(this._config.snap, this.grid), i = [
      { id: "grid", label: "On" },
      { id: "off", label: "Off" },
      { id: "custom", label: "Custom" }
    ], n = e === "grid" ? `Snapping to the ${this.grid}-unit grid.` : e === "off" ? "No snapping — free placement." : `Snap = ${t}% of grid (${this._resolvedSnap} units).`;
    return y`
      <span class="ctx-field-label">Snap</span>
      <div class="seg" role="group" aria-label="Snap mode">
        ${i.map(
      (o) => y`
            <button
              class=${e === o.id ? "active" : ""}
              aria-pressed=${e === o.id}
              title=${o.id === "grid" ? "Snap to the grid" : o.id === "off" ? "Free placement" : "Custom step (% of grid)"}
              @click=${() => this._setSnapMode(o.id)}
            >
              ${o.label}
            </button>
          `
    )}
      </div>
      ${e === "custom" ? y`<input
              class="num"
              type="number"
              min="1"
              step="5"
              .value=${String(t)}
              title="Custom snap step, as a percentage of the grid"
              @change=${(o) => {
      const r = Math.max(
        1,
        Number(o.target.value) || Co
      );
      this._patchConfig({ snap: Gi(r, this.grid) });
    }}
            /><span class="ctx-field-label">%</span>` : f}
      <span class="ctx-hint">${n}</span>
    `;
  }
  render() {
    if (!this._config) return y`${f}`;
    const e = this._config, t = this._floor(), i = e.floors ?? [], n = this._roomWallSegments(t), o = va([...t.walls, ...n]), r = /* @__PURE__ */ new Map();
    for (const d of t.areas ?? [])
      for (const [u, g] of ve.entries())
        r.set(hs(d.id, g), { area: d, side: g, edgeIndex: u });
    const a = di(e.overlayScale), s = a === "plan" ? pi(e.overlayMinWidth) : void 0, l = this._scopingAreaId(), h = e.showDeadSpaces ? Qr(o, t.openings) : [], p = t.items.some((d) => d.glow) ? Kn(o, t.openings, (d) => la(
      d,
      ((g) => nt(d, g ? this.hass?.states[g] : void 0))(d.entity),
      d.secondaryEntity && _t(d) ? nt(
        Pa(d),
        this.hass?.states[d.secondaryEntity]
      ) : void 0,
      d.shutterEntity ? xe(this.hass?.states[d.shutterEntity], d.shutterInvert) : void 0
    )) : o, c = !t.walls.length && !t.openings.length && !t.items.length && !t.texts.length && !t.furniture.length && !(t.trackers ?? []).length && !(t.areas ?? []).length;
    return y`
      <div
        class="editor ${this._fullscreen ? "fullscreen" : ""}"
        popover=${this._fullscreen ? "manual" : f}
        @pointerdown=${this._onEditorPointerDown}
      >
        ${this._floorMenuOpen || this._addMenuOpen ? y`<div
              class="pop-backdrop"
              @click=${() => {
      this._floorMenuOpen = !1, this._addMenuOpen = !1, this._addQuery = "";
    }}
            ></div>` : f}
        <div class="toolbar">
          <!-- Tools — modes; exactly one is active at a time -->
          <div class="seg" role="group" aria-label="Tool">
            ${["select", "wall", "door", "window", "skylight", "tracker", "area"].map(
      (d) => y`
                <button
                  class=${this._tool === d ? "active" : ""}
                  aria-pressed=${this._tool === d}
                  title=${Ji[d].label}
                  @click=${() => {
        this._tool = d, this._draft = null, this._draftTracker = null, this._draftArea = null, this._areaHover = null, this._areaDragStart = null, this._areaDragCurrent = null, this._clearAreaDragTimer(), this._areaDragMoved = !1;
      }}
                >
                  <ha-icon icon=${Ji[d].icon}></ha-icon>${Ji[d].label}
                </button>`
    )}
          </div>

          <span class="divider"></span>

          <!-- Expand: break out of HA's narrow config dialog into a full-screen
               workspace. Kept next to the tools so it's reachable even when the
               toolbar wraps at dialog width. -->
          <button
            class=${this._fullscreen ? "active expand-toggle" : "expand-toggle"}
            aria-pressed=${this._fullscreen}
            title=${this._fullscreen ? "Exit full screen (Esc)" : "Edit full screen — more room for the canvas"}
            @click=${() => this._toggleFullscreen()}
          >
            <ha-icon icon=${this._fullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"}></ha-icon>
            ${this._fullscreen ? "Exit" : "Expand"}
          </button>

          <!-- Apply: save the plan to the dashboard and keep editing (issue
               #198). HA's own Save closes the dialog, and the preview beside
               the editor is too small to judge where an icon really lands, so
               checking one nudge cost a save, a close, a look, then reopening
               and re-expanding the editor. Next to Expand because that is
               where the need bites hardest: the fullscreen workspace covers
               HA's footer, Save included. -->
          <button
            class="apply-btn"
            ?disabled=${this._applyState === "saving"}
            title="Save to the dashboard without closing the editor — the card behind updates"
            @click=${this._apply}
          >
            <ha-icon
              icon=${this._applyState === "saved" ? "mdi:check" : "mdi:content-save-outline"}
            ></ha-icon>
            ${this._applyState === "saved" ? "Saved" : this._applyState === "saving" ? "Saving…" : "Apply"}
          </button>
          ${this._applyError ? y`<span class="apply-error">${this._applyError}</span>` : f}

          <!-- Labels: declutter a dense plan while editing (issue #52). -->
          <button
            class="icon-btn"
            aria-pressed=${this._hideLabels}
            title=${this._hideLabels ? "Show element labels on the canvas" : "Hide element labels — easier to aim on a dense plan"}
            @click=${() => {
      this._hideLabels = !this._hideLabels;
    }}
          >
            <ha-icon
              icon=${this._hideLabels ? "mdi:label-off-outline" : "mdi:label-outline"}
            ></ha-icon>
            Labels
          </button>

          <span class="divider"></span>

          <!-- Insert — one popover for everything droppable on the floor -->
          <span class="pop-wrap">
            <button
              aria-haspopup="true"
              aria-expanded=${this._addMenuOpen}
              @click=${() => {
      this._addMenuOpen = !this._addMenuOpen, this._floorMenuOpen = !1;
    }}
            >
              + Add
            </button>
            ${this._addMenuOpen ? this._renderAddMenu() : f}
          </span>

          <span class="spacer"></span>

          <!-- History -->
          <div class="group">
            <button aria-label="Undo" title="Undo (Ctrl/Cmd+Z)" ?disabled=${!this._history.length} @click=${this._undo}>
              <ha-icon icon="mdi:undo"></ha-icon>
            </button>
            <button aria-label="Redo" title="Redo (Ctrl/Cmd+Shift+Z)" ?disabled=${!this._future.length} @click=${this._redo}>
              <ha-icon icon="mdi:redo"></ha-icon>
            </button>
          </div>

          <span class="divider"></span>

          <!-- Floor — switch + add inline; rename/delete behind the gear -->
          <span class="floors pop-wrap">
            <label>floor</label>
            <select
              @change=${(d) => {
      this._switchFloor(d.target.value), this._canvasWrap?.focus({ preventScroll: !0 });
    }}
            >
              ${i.map(
      (d) => y`<option value=${d.id} .selected=${d.id === this._activeFloorId}>${d.name}</option>`
    )}
            </select>
            <button
              aria-label="Add floor"
              title="Add a floor (copies the current walls)"
              @click=${this._addFloor}
            >
              +
            </button>
            <button
              aria-label="Floor settings"
              title="Rename or delete this floor"
              aria-haspopup="true"
              aria-expanded=${this._floorMenuOpen}
              @click=${() => {
      this._floorMenuOpen = !this._floorMenuOpen, this._addMenuOpen = !1, this._addQuery = "";
    }}
            >
              <ha-icon icon="mdi:cog-outline"></ha-icon>
            </button>
            ${this._floorMenuOpen ? y`<div class="pop">
                  ${this._renderHaFloorRow(t)}
                  <!-- Reorder (issue #66): the safe alternative to cut-and-
                       pasting floor blocks in YAML, which drops/duplicates
                       ids. Position in this list is the switcher order. -->
                  <div class="pop-row">
                    <label>Order</label>
                    <button
                      aria-label="Move floor up"
                      title="Move this floor up the list"
                      ?disabled=${i.length < 2 || i[0]?.id === this._activeFloorId}
                      @click=${() => this._moveFloor(-1)}
                    >
                      <ha-icon icon="mdi:arrow-up"></ha-icon>
                    </button>
                    <button
                      aria-label="Move floor down"
                      title="Move this floor down the list"
                      ?disabled=${i.length < 2 || i[i.length - 1]?.id === this._activeFloorId}
                      @click=${() => this._moveFloor(1)}
                    >
                      <ha-icon icon="mdi:arrow-down"></ha-icon>
                    </button>
                  </div>
                  <div class="pop-row">
                    <label>Rename</label>
                    <input
                      class="floor-name"
                      type="text"
                      .value=${t?.name ?? ""}
                      @change=${(d) => this._renameFloor(this._activeFloorId, d.target.value)}
                    />
                  </div>
                  <!-- Issue #67: switcher-button label, per-floor accent, and
                       which floor the live card opens on. -->
                  <div class="pop-row">
                    <label>Short</label>
                    <input
                      type="text"
                      maxlength="8"
                      placeholder="e.g. GF"
                      title="Short label for the card's floor-switcher button"
                      .value=${t?.short ?? ""}
                      @change=${(d) => this._commitFloor({
      short: d.target.value.trim() || void 0
    })}
                    />
                  </div>
                  <div class="pop-row">
                    <label>Color</label>
                    <input
                      type="color"
                      title="Accent for this floor's switcher button while active"
                      .value=${t?.color ?? "#03a9f4"}
                      @input=${(d) => this._commitFloor({ color: d.target.value })}
                    />
                    <button
                      aria-label="Clear floor color"
                      title="Back to the theme color"
                      ?disabled=${!t?.color}
                      @click=${() => this._commitFloor({ color: void 0 })}
                    >
                      <ha-icon icon="mdi:water-off-outline"></ha-icon>
                    </button>
                  </div>
                  <div class="pop-row">
                    <label>Default</label>
                    <input
                      type="checkbox"
                      title="Open the live card on this floor"
                      .checked=${this._config.defaultFloor === this._activeFloorId}
                      @change=${(d) => this._commit({
      ...this._config,
      defaultFloor: d.target.checked ? this._activeFloorId : void 0
    })}
                    />
                  </div>
                  <button
                    class="danger pop-action"
                    ?disabled=${i.length <= 1}
                    @click=${() => {
      this._deleteFloor(), this._floorMenuOpen = !1;
    }}
                  >
                    <ha-icon icon="mdi:delete-outline"></ha-icon> Delete this floor
                  </button>
                </div>` : f}
          </span>
        </div>

        ${this._renderContextBar()}

        <div class="workspace">
        <div class="canvas-outer">
        <!-- The viewport keeps the canvas's aspect ratio so its height does not
             grow with the zoom level. Otherwise zooming in made this box taller,
             which pushed the zoom buttons (anchored to its bottom-right) down the
             page — you had to chase the + button between clicks. Fullscreen sizes
             the viewport from the available space instead, which is why it never
             had the problem. -->
        <div
          class="canvas-wrap"
          tabindex="0"
          style=${this._fullscreen ? f : `aspect-ratio:${I(e.width, le)} / ${I(e.height, ge)};`}
          @wheel=${this._onCanvasWheel}
        >
          <!-- The stage doubles as the card's .plan box for overlay sizing: same
               container query, same --fp-u, so a badge measured in canvas units
               previews here at the size a card of this width would draw it
               (issue #192). The editor never rotates the plan, so the canvas
               width is what 100cqw measures against. -->
          <div class="stage ${a === "plan" ? "scale-plan" : ""}"
               style="aspect-ratio: ${I(e.width, le)} / ${I(
      e.height,
      ge
    )}; width:${this._zoom * 100}%;
                   --fp-plan-w: ${I(e.width, le)};${s === void 0 ? "" : `--fp-min-w: ${s}px;`}${rl(
      e.skin
    )}${ns(e.palette)}">
            <!-- Keyed on the skin and the palette, for the repaint reason
                 documented on the card's SVG (issue #122): a var() inside a
                 presentation attribute does not repaint when the custom
                 property changes, so without this the canvas kept the previous
                 skin's doors and room fills — and, since issue #265, would show
                 a palette colour's old value while you were editing it. -->
            ${Fr(
      `${e.skin ?? ""}|${os(e.palette)}`,
      _`<svg
              viewBox="0 0 ${e.width} ${e.height}"
              preserveAspectRatio="none"
              class=${this._tool}
              @pointerdown=${this._onCanvasDown}
              @pointermove=${this._onCanvasMove}
              @pointerup=${this._onCanvasUp}
              @pointercancel=${this._onPointerCancel}
            >
              <rect
                x="0"
                y="0"
                width=${e.width}
                height=${e.height}
                fill=${e.background ?? Ft}
              />
              ${t.image ? _`<image href=${t.image} x="0" y="0" width=${e.width} height=${e.height}
                            preserveAspectRatio=${Ka(t.imageFit)}
                            opacity=${t.imageOpacity ?? 1} />` : f}
              ${this._renderGrid()}
              ${_e(
        t.areas ?? [],
        (d, u) => d.id || u,
        (d) => this._renderAreaSel(d, l)
      )}
              <!-- Dead spaces (issue #88), same layer position as the card so
                   what you draw is what you get. Live while you draw: closing
                   the last wall of a shaft hatches it, and dropping a door into
                   it clears the hatching again — which is the fastest way to
                   see that the card agrees with you about what is sealed. -->
              ${h.length ? _`${Xa(`${this._wallMaskId}-dead`)}
                      ${h.map(
        (d) => Ya(d, `${this._wallMaskId}-dead`)
      )}` : f}
              <!-- Light pools (issue #6), same layer position as the card so
                   what you place is what you get. Previewed at full strength
                   with no hass in the editor, so the radius is adjustable
                   without having to turn the real light on. -->
              ${da(
        t.furniture,
        e.width,
        e.height,
        `${this._wallMaskId}-glowmask`,
        this._symbols()
      )}
              <g class="fp-glows"
                 mask=${t.furniture.length ? `url(#${this._wallMaskId}-glowmask)` : f}>
                ${t.items.map((d, u) => {
        if (!d.glow) return f;
        const g = iu(d, this.hass?.states[d.entity]);
        return g ? ha(d, g, `${this._wallMaskId}-glow-${u}`, p) : f;
      })}
              </g>
              ${// Radius guide for the selected glow (issue #108). Sizing an
      // unlit light would otherwise be blind, now that an off light
      // correctly draws nothing. Editor-only chrome, like the
      // tracker zone outline.
      //
      // Deliberately the *configured* radius, not the brightness-
      // scaled one (issue #123): this is the handle for the value you
      // are setting, which is the pool's size at full brightness. A
      // guide that shrank as the bulb dimmed would move while you
      // dragged it, and would never show the size you actually typed.
      t.items.map(
        (d) => d.glow && this._isSel("item", d.id) ? _`<circle class="glow-guide" cx=${d.x} cy=${d.y}
                                  r=${I(d.glowRadius, Mi)} />` : f
      )}
              ${t.furniture.map((d) => this._renderFurnitureSel(d))}
              ${Va(t.openings, e.width, e.height, this._wallMaskId)}
              ${(() => {
        const d = (u, g) => this._renderWall(u, g);
        return [...t.walls, ...n].map((u) => d(u, r.get(u.id)));
      })()}
              <!-- Room outlines, same layer position as the card so what you
                   place is what you get. Only a static borderColor draws here,
                   there being no hass to resolve a live color from — but the
                   clip ids are passed anyway, so wiring a live preview in later
                   cannot silently land on the unclipped path. -->
              <g mask=${`url(#${this._wallMaskId})`}>
                ${(t.areas ?? []).map(
        (d, u) => Qa(d, void 0, `${this._wallMaskId}-area-${u}`)
      )}
              </g>
              ${_e(
        // Keyed by id: switching floors must create fresh DOM. Reused
        // nodes would CSS-transition from the previous floor's opening
        // state — a window briefly plays a door swing (issue #50).
        t.openings,
        (d, u) => d.id || u,
        (d) => this._renderOpeningSel(d)
      )}
              ${_e(
        t.trackers ?? [],
        (d, u) => d.id || u,
        (d) => this._renderTrackerSel(d)
      )}
              ${this._draftTracker ? _`<rect class="tracker-draft"
                              x=${Math.min(this._draftTracker.x0, this._draftTracker.x1)}
                              y=${Math.min(this._draftTracker.y0, this._draftTracker.y1)}
                              width=${Math.abs(this._draftTracker.x1 - this._draftTracker.x0)}
                              height=${Math.abs(this._draftTracker.y1 - this._draftTracker.y0)}
                              rx="4" />` : f}
              ${this._draft ? _`<g class="fp-wall-neon"><line x1=${this._draft.x1} y1=${this._draft.y1}
                              x2=${this._draft.x2} y2=${this._draft.y2}
                              class="wall draft" mask=${`url(#${this._wallMaskId})`}
                              stroke-width=${V} /></g>` : f}
              ${this._renderAreaDraft()}
              ${this._marquee ? _`<rect x=${Math.min(this._marquee.x0, this._marquee.x1)}
                              y=${Math.min(this._marquee.y0, this._marquee.y1)}
                              width=${Math.abs(this._marquee.x1 - this._marquee.x0)}
                              height=${Math.abs(this._marquee.y1 - this._marquee.y0)}
                              class="marquee" />` : f}
            </svg>`
    )}
            <div class="items">
              ${(e.floors ?? []).length > 1 ? this._renderSwitcherHandle(e) : f}
              ${t.texts.map((d) => this._renderTextOverlay(d, e, a))}
              ${t.openings.filter((d) => La(d)).map((d) => this._renderShutterMarkOverlay(d, e, a))}
              ${t.openings.filter((d) => Ra(d)).map((d) => this._renderOpeningMarkOverlay(d, e, a))}
              ${t.items.map((d) => this._renderItemOverlay(d, e, a))}
            </div>
          </div>
        </div>
        ${c && !this._draft && !this._draftTracker && !this._draftArea ? y`<div class="empty-hint">
              <div>
                <b>Draw your first room:</b> pick the <b>Wall</b> tool and drag on the canvas.<br />
                Then drop doors, windows and devices onto it.
              </div>
            </div>` : f}
        <div class="zoom-overlay">
          <button aria-label="Zoom out" title="Zoom out" @click=${() => this._setZoom(this._zoom - 0.25)}>
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <button class="zoom-val-btn" title="Reset zoom to 100%" @click=${() => this._setZoom(1)}>
            ${Math.round(this._zoom * 100)}%
          </button>
          <button aria-label="Zoom in" title="Zoom in" @click=${() => this._setZoom(this._zoom + 0.25)}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
          <button aria-label="Fit to view" title="Fit to view" @click=${this._fitView}>
            <ha-icon icon="mdi:fit-to-screen-outline"></ha-icon>
          </button>
        </div>
        </div>

        <div class="side">
          ${this._renderElementEdit()}
          ${this._renderPanel()}
        </div>
        </div>
      </div>
    `;
  }
  /**
   * `ha-entity-picker` when defined, else a plain entity-id input — mirrors
   * the icon-picker fallback so entity binding never silently dead-ends when
   * the helper load fails or the editor runs outside HA.
   */
  /**
   * Render a FormSpec: real `<ha-form>` (native HA selectors) when the
   * element is defined, otherwise the same schema through plain inputs.
   * Patches route through `apply(patch, live)` — `live` marks continuous
   * fields (typing, sliders) for the burst-history path.
   */
  _renderForm(e, t) {
    return customElements.get("ha-form") ? y`<ha-form
        .hass=${this.hass}
        .data=${e.data}
        .schema=${e.fields}
        .computeLabel=${kg}
        .computeHelper=${Sg}
        @value-changed=${(i) => {
      i.stopPropagation();
      const n = Ym(e.data, i.detail.value, e.fields), o = xr(n, e.fields), r = Object.keys(o);
      if (!r.length) return;
      const a = r.length === 1 && _r(e.fields.find((s) => s.name === r[0]));
      t(e.toPatch(o), a);
    }}
      ></ha-form>` : y`${e.fields.map((i) => this._renderFallbackField(e, i, t))}`;
  }
  _applyFallback(e, t, i, n, o) {
    const r = xr({ [t.name]: i }, e.fields);
    t.name in r && o(e.toPatch(r), n && _r(t));
  }
  /** One plain-input row per schema field — the outside-HA / load-failure path. */
  _renderFallbackField(e, t, i) {
    const n = e.data[t.name], o = t.selector;
    if ("select" in o) {
      const r = o.select, a = r.options;
      if (r.custom_value) {
        const s = `sel-${t.name}-${a.length}`;
        return y`<div class="row wide">
          <label>${t.label}</label>
          <input
            type="text"
            list=${s}
            .value=${String(n ?? "")}
            @change=${(l) => this._applyFallback(e, t, l.target.value, !1, i)}
          />
          <datalist id=${s}>
            ${a.map((l) => y`<option value=${l.value}></option>`)}
          </datalist>
        </div>`;
      }
      return y`<div class="row">
        <label>${t.label}</label>
        <select
          .value=${String(n ?? "")}
          @change=${(s) => this._applyFallback(e, t, s.target.value, !1, i)}
        >
          ${a.map(
        (s) => y`<option value=${s.value} ?selected=${s.value === n}>${s.label}</option>`
      )}
        </select>
      </div>`;
    }
    if ("boolean" in o)
      return y`<div class="row">
        <label>${t.label}</label>
        <input
          type="checkbox"
          .checked=${!!n}
          @change=${(r) => this._applyFallback(e, t, r.target.checked, !1, i)}
        />
      </div>`;
    if ("number" in o) {
      const r = o.number, a = r.mode === "slider";
      return y`<div class="row">
        <label>${t.label}</label>
        ${a ? y`<input
              type="range"
              min=${r.min ?? 0}
              max=${r.max ?? 100}
              step=${r.step ?? 1}
              .value=${String(n ?? r.min ?? 0)}
              @input=${(s) => this._applyFallback(e, t, Number(s.target.value), !0, i)}
            />` : f}
        <input
          class="num"
          type="number"
          min=${r.min ?? f}
          max=${r.max ?? f}
          step=${r.step ?? f}
          .value=${String(n ?? "")}
          @change=${(s) => {
        const l = s.target;
        this._applyFallback(
          e,
          t,
          l.value === "" ? void 0 : Number(l.value),
          !1,
          i
        ), l.value = String(e.data[t.name] ?? "");
      }}
        />
      </div>`;
    }
    if ("entity" in o) {
      const r = o.entity;
      return y`<div class="row wide">
        <label>${t.label}</label>
        ${this._renderEntityPicker(
        String(n ?? ""),
        (a) => this._applyFallback(e, t, a, !1, i),
        r.filter?.[0]?.domain,
        r.include_entities
      )}
      </div>`;
    }
    return "icon" in o ? y`<div class="row wide">
        <label>${t.label}</label>
        <input
          type="text"
          placeholder=${o.icon.placeholder ?? "mdi:…"}
          .value=${String(n ?? "")}
          @change=${(r) => this._applyFallback(e, t, r.target.value, !1, i)}
        />
      </div>` : "ui_action" in o ? y`${f}` : y`<div class="row">
      <label>${t.label}</label>
      <input
        type="text"
        .value=${String(n ?? "")}
        @input=${(r) => this._applyFallback(e, t, r.target.value, !0, i)}
      />
    </div>`;
  }
  _renderEntityPicker(e, t, i, n) {
    return customElements.get("ha-entity-picker") ? y`<ha-entity-picker
        .hass=${this.hass}
        .value=${e}
        .includeDomains=${i}
        .includeEntities=${n}
        allow-custom-entity
        @value-changed=${(o) => t(o.detail.value ?? "")}
      ></ha-entity-picker>` : y`<input
      type="text"
      placeholder="sensor.example"
      .value=${e}
      @change=${(o) => t(o.target.value)}
    />`;
  }
  /**
   * Attribute field for the hand-rolled rows, mirroring
   * {@link _renderEntityPicker}: HA's own attribute dropdown when the frontend
   * has registered it, a plain text input otherwise.
   *
   * The dropdown is the whole point — it lists the attributes the entity
   * *actually has*, which is what `ha-form`'s `attribute` selector gives the
   * device's own Attribute field. A repeatable row cannot go through `ha-form`,
   * but that is no reason for it to be a worse control: typing `curent_temp`
   * into a free-text box fails silently at render time, which is exactly the
   * bug a picker cannot have.
   *
   * `entityId` is what the attributes are listed from — the row's own entity
   * when it names one, else the device's, which is the same fallback the
   * reading itself resolves through.
   */
  _renderAttributePicker(e, t, i, n) {
    return customElements.get("ha-entity-attribute-picker") && e ? y`<ha-entity-attribute-picker
        class="reading-attr"
        .hass=${this.hass}
        .entityId=${e}
        .value=${t}
        allow-custom-value
        title=${n ?? f}
        @value-changed=${(o) => i(o.detail.value ?? "")}
      ></ha-entity-attribute-picker>` : y`<input
      type="text"
      class="reading-attr"
      placeholder="attribute"
      title=${n ?? f}
      .value=${t}
      @change=${(o) => i(o.target.value)}
    />`;
  }
  /**
   * Icon field for the hand-rolled rows (issue #106), mirroring
   * {@link _renderEntityPicker}: HA's searchable picker when the frontend has
   * registered it, a plain text input otherwise. Used by the state-rule list,
   * which cannot go through `ha-form` because it is repeatable, and by the
   * device's own icon row that sits beside it (issue #127).
   */
  _renderIconPicker(e, t, i) {
    return customElements.get("ha-icon-picker") ? y`<ha-icon-picker
        class="rule-icon"
        .hass=${this.hass}
        .value=${e}
        placeholder=${i?.placeholder ?? "Icon"}
        title=${i?.title ?? f}
        @value-changed=${(n) => t(n.detail.value ?? "")}
      ></ha-icon-picker>` : y`<input
      type="text"
      class="rule-icon"
      placeholder=${i?.placeholder ?? "mdi:blinds"}
      title=${i?.title ?? f}
      .value=${e}
      @change=${(n) => t(n.target.value)}
    />`;
  }
  /** Toggle the full-screen workspace. */
  _toggleFullscreen() {
    this._fullscreen = !this._fullscreen, this._fullscreen && this._canvasWrap && (this._canvasWrap.style.width = "", this._canvasWrap.style.height = ""), this._floorMenuOpen = !1, this._addMenuOpen = !1, this._addQuery = "";
  }
  /**
   * The "+ Add" popover: device, text, then every symbol as its real glyph.
   *
   * The grid is searchable and grouped (issue #90). It was 26 fixed cells over
   * six rows, which was already the tallest thing in the editor; with a
   * community library behind it the list only grows, so the query filters on id,
   * name, category and the symbol's own keywords — "couch" finds the sofa.
   */
  _renderAddMenu() {
    const e = () => {
      this._addMenuOpen = !1, this._addQuery = "";
    }, t = this._symbols(), i = fs(t).filter((r) => $p(r, this._addQuery)), n = !this._addQuery.trim();
    let o = "";
    return y`
      <div class="pop left add-pop">
        <button
          class="add-entry"
          @click=${() => {
      this._addItem("generic"), e();
    }}
        >
          <ha-icon icon="mdi:lightbulb-outline"></ha-icon> Device
        </button>
        <button
          class="add-entry"
          @click=${() => {
      this._addText(), e();
    }}
        >
          <ha-icon icon="mdi:format-text"></ha-icon> Text
        </button>
        <div class="furn-search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input
            type="search"
            placeholder="Search furniture"
            .value=${this._addQuery}
            @input=${(r) => {
      this._addQuery = r.target.value;
    }}
            @keydown=${(r) => {
      r.key === "Escape" && this._addQuery && (r.stopPropagation(), this._addQuery = "");
    }}
          />
        </div>
        <div class="add-furn-scroll">
          ${i.length ? i.map((r) => {
      const a = n && r.category !== o ? r.category : "";
      return o = r.category, y`${a ? y`<div class="furn-group">${a}</div>` : f}
                  ${this._renderFurnCell(r, e)}`;
    }) : y`<div class="furn-empty">No symbol matches “${this._addQuery}”</div>`}
        </div>
      </div>
    `;
  }
  /** One picker cell: the symbol drawn at its own default size, plus its name. */
  _renderFurnCell(e, t) {
    const { w: i, h: n } = e.size, o = Math.max(i, n) * 0.25 + 6, r = `${-i / 2 - o} ${-n / 2 - o} ${i + o * 2} ${n + o * 2}`;
    return y`
      <button
        class="furn-cell"
        title=${e.name}
        @click=${() => {
      this._addFurniture(e.id), t();
    }}
      >
        <svg viewBox=${r}>
          ${wn(
      { id: "preview", type: e.id, x: 0, y: 0, w: i, h: n },
      void 0,
      this._symbols()
    )}
        </svg>
        <span>${e.name}</span>
      </button>
    `;
  }
  /**
   * Per-element editor area, rendered BELOW the canvas with a small title.
   * Kept separate from the project panel so users can tell the two apart, and
   * separate from the context bar so the bar's height stays stable across
   * selection changes (the canvas no longer jumps when you click around).
   */
  _renderElementEdit() {
    const e = this._selection.length, t = this._primary();
    if (e === 0 || !t)
      return y`
        <section class="edit-area">
          <h3 class="section-title">Element</h3>
          <p class="hint">Select an element on the canvas to edit its properties here.</p>
        </section>
      `;
    const i = e > 1 ? `${e} elements selected` : this._selectionSummary(t), n = e > 1 ? "mdi:select-group" : Ag[t.kind];
    return y`
      <section class="edit-area">
        <div class="edit-head">
          <ha-icon icon=${n}></ha-icon>
          <span class="edit-title" title=${i}>${i}</span>
          <span class="head-spacer"></span>
          ${(() => {
      const o = this._floor(), r = this._selection.every((a) => Wt(o, a));
      return y`<button
              class=${r ? "on" : ""}
              aria-label=${r ? "Unlock" : "Lock in place"}
              aria-pressed=${r ? "true" : "false"}
              title=${r ? "Unlock — let it be dragged again" : "Lock in place — it can still be selected and edited, just not moved"}
              @click=${() => this._setLocked(!r)}
            >
              <ha-icon icon=${r ? "mdi:lock" : "mdi:lock-open-variant-outline"}></ha-icon>
            </button>`;
    })()}
          <button aria-label="Duplicate" title="Duplicate (Ctrl/Cmd+D)" @click=${this._duplicate}>
            <ha-icon icon="mdi:content-duplicate"></ha-icon>
          </button>
          <button class="danger" aria-label="Delete" title="Delete (Del)" @click=${this._deleteSelected}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
        </div>
        ${e > 1 ? y`<p class="hint">
              Edit elements one at a time. Drag any selected element to move the whole group.
            </p>` : y`${this._renderAreaScopeHint()}
              <div class="rows">${this._renderSelectionEditor()}</div>`}
      </section>
    `;
  }
  _renderWall(e, t) {
    const i = this._isSel("wall", e.id), n = i && !e.locked, o = t?.side, r = t?.edgeIndex ?? -1, a = !!t && !t.area.locked, s = t?.area.sideWalls?.[o], h = Math.abs(e.y1 - e.y2) < ie ? "ns" : "ew", p = e.divider ? ba() : ya(e.thickness, e.kind);
    return _`
      <g>
        <line x1=${e.x1} y1=${e.y1} x2=${e.x2} y2=${e.y2}
              class=${["wall-hit", t ? "side-wall-edge" : "", h].filter(Boolean).join(" ")}
              @pointerdown=${(c) => {
      if (t) {
        this._startDrag(c, { kind: "area", id: t.area.id }, void 0, void 0, r);
        return;
      }
      this._startDrag(c, { kind: "wall", id: e.id });
    }}
              @dblclick=${(c) => {
      t && (c.preventDefault(), c.stopPropagation(), this._toggleRectAreaSide(t.area, r));
    }} />
        <g class="fp-wall-neon"><line x1=${e.x1} y1=${e.y1} x2=${e.x2} y2=${e.y2}
            class="wall ${i ? "selected" : ""} ${hi(e) ? "railing" : ""} ${t ? "side-wall-edge" : ""} ${h}"
              mask=${`url(#${this._wallMaskId})`}
              style=${p} stroke-linecap="round" /></g>
        ${n ? _`
                <circle cx=${e.x1} cy=${e.y1} r="9" class="handle"
                        @pointerdown=${(c) => this._startDrag(c, { kind: "wall", id: e.id }, 1)} />
                <circle cx=${e.x2} cy=${e.y2} r="9" class="handle"
                        @pointerdown=${(c) => this._startDrag(c, { kind: "wall", id: e.id }, 2)} />` : f}
        ${a ? _`
                <path
                  d=${(() => {
      const c = (e.x1 + e.x2) / 2, d = (e.y1 + e.y2) / 2, u = 7;
      return `M ${c} ${d - u} L ${c + u} ${d} L ${c} ${d + u} L ${c - u} ${d} Z`;
    })()}
                  class=${["area-wall-toggle", s ?? "none"].join(" ")}
                  title=${s ? `Double-click to cycle this ${o} wall: ${s}` : `Double-click to add a wall on the ${o} side`}
                  @dblclick=${(c) => {
      c.preventDefault(), c.stopPropagation(), this._toggleRectAreaSide(t.area, r);
    }} />` : f}
      </g>`;
  }
  _renderOpeningSel(e) {
    const t = this._isSel("opening", e.id);
    return _`
      <g class="opening-hit"
         @pointerdown=${(i) => this._startDrag(i, { kind: "opening", id: e.id })}>
        ${Wa(e, {
      color: t ? "var(--primary-color, #03a9f4)" : Pn,
      // The closed colour previews here too (issue #228) — unless this is
      // the selected opening, whose whole symbol goes blue to show that.
      inactive: t ? void 0 : e.inactiveColor,
      open: Zn(e),
      // Draw sliding / rolling openings partly open in the editor so the
      // motion is visible — closed, both look like a plain band, which
      // would make the Motion / Slide / Style controls appear inert.
      amount: X(e) !== "swing" ? 0.55 : void 0,
      // Shutter previewed half-rolled so the layer is visible while
      // configuring, whatever the live state.
      shutter: e.shutterEntity ? { amount: 0.55, style: We(e), flip: e.shutterFlipV } : void 0
    })}
        ${// A skylight is an outline around empty floor, and the strokes are
    // all there is to grab: without this you can only pick it up by its
    // frame or by a dashed diagonal, which on a large roof light means
    // most of the shape you are looking at does not answer the pointer.
    // The card gives every pressable opening the same target for the
    // same reason (openingHitSize); the wall openings do not need one
    // here because a door's own symbol is barely wider than the target
    // would be.
    J(e) ? (() => {
      const i = Fa(e);
      return _`<rect class="skylight-hit"
                    x=${e.x - i.width / 2} y=${e.y - i.height / 2}
                    width=${i.width} height=${i.height}
                    transform="rotate(${e.angle} ${e.x} ${e.y})" />`;
    })() : f}
      </g>`;
  }
  /**
   * Render a Tracker in the editor SVG with its zone outline visible (so the
   * user can grab/resize it) plus a hit overlay for drag-to-move and a dashed
   * selection rectangle when active.
   */
  _renderTrackerSel(e) {
    const t = this._isSel("tracker", e.id), i = vi(this.hass?.states, e.xSensor?.entity), n = vi(this.hass?.states, e.ySensor?.entity), o = ci(this.hass?.states, e.xSensor?.presence), r = ci(this.hass?.states, e.ySensor?.presence);
    return _`
      <g class="tracker-hit ${t ? "selected" : ""}"
         @pointerdown=${(a) => this._startDrag(a, { kind: "tracker", id: e.id })}>
        ${Ja(e, {
      editing: !0,
      xReading: i,
      yReading: n,
      xPresent: o,
      yPresent: r
    })}
        <rect x=${e.x} y=${e.y} width=${e.w} height=${e.h}
              transform="rotate(${e.angle ?? 0} ${e.x + e.w / 2} ${e.y + e.h / 2})"
              class="tracker-hit-rect" />
        ${t ? _`<rect x=${e.x - 4} y=${e.y - 4}
                        width=${e.w + 8} height=${e.h + 8}
                        transform="rotate(${e.angle ?? 0} ${e.x + e.w / 2} ${e.y + e.h / 2})"
                        class="tracker-outline" />` : f}
      </g>`;
  }
  _renderFurnitureSel(e) {
    const t = this._isSel("furniture", e.id);
    return _`
      <g class="furn-hit ${t ? "selected" : ""}"
         @pointerdown=${(i) => this._startDrag(i, { kind: "furniture", id: e.id })}>
        ${wn(e, void 0, this._symbols())}
        ${t ? _`<rect x=${e.x - e.w / 2 - 4} y=${e.y - e.h / 2 - 4}
                        width=${e.w + 8} height=${e.h + 8}
                        transform="rotate(${e.angle ?? 0} ${e.x} ${e.y})"
                        class="furn-outline" />` : f}
      </g>`;
  }
  /**
   * A committed Area: the translucent fill (shared with the live card),
   * a transparent hit-polygon for click-to-select and whole-shape drag, and
   * — while selected — a heavier outline plus one draggable handle per
   * vertex (decision #1 in areas.md: vertices reshape independently, with
   * no cross-element corner-stretch).
   */
  /**
   * States in words what the canvas animation shows: this element sits in a
   * linked room, so its entity picker only lists that room's entities. Colour
   * alone can't carry that, and the off-switch lives on the Area element.
   */
  _renderAreaScopeHint() {
    const e = this._scopingAreaId();
    if (!e) return f;
    const t = (this._floor().areas ?? []).find((n) => n.id === e), i = t?.name ? t.name : "this area";
    return y`<p class="hint area-scope-hint">
      <ha-icon icon="mdi:vector-polygon"></ha-icon>
      <span>Only entities in <strong>${i}</strong> are listed.</span>
      <button
        class="link-btn"
        title="Turn off Filter entities for this area — every entity becomes selectable"
        @click=${() => this._updateArea(e, { filterEntities: !1 })}
      >
        Show all
      </button>
    </p>`;
  }
  _toggleRectAreaSide(e, t) {
    if (e.locked) return;
    const i = ve[t % ve.length], n = Tm(e.sideWalls?.[i]), o = { ...e.sideWalls ?? {} };
    n === "none" ? delete o[i] : o[i] = n, this._updateArea(e.id, { sideWalls: Object.keys(o).length ? o : void 0 });
  }
  _renderAreaSel(e, t) {
    const i = this._isSel("area", e.id), n = e.id === t, o = e.points.map((a) => `${a.x},${a.y}`).join(" "), r = (this._floor().areas ?? []).filter((a) => a.id !== e.id).flatMap((a) => Am(e.points, a.points).map((s) => ({ side: s, otherId: a.id }))).filter(({ otherId: a }) => e.id.localeCompare(a) < 0);
    return _`
      <g class="area-hit ${i ? "selected" : ""} ${n ? "scoping" : ""}">
        ${n ? _`<polygon points=${o} class="area-scoping" />` : f}
        ${Za(e)}
        <polygon points=${o} class="area-hit-shape"
                 @pointerdown=${(a) => this._startDrag(a, { kind: "area", id: e.id })} />
        ${i ? _`<polygon points=${o} class="area-outline" />` : f}
        ${r.map(({ side: a }) => {
      const s = ve.indexOf(a), l = e.points[s], h = e.points[(s + 1) % e.points.length], p = { x: (l.x + h.x) / 2, y: (l.y + h.y) / 2 }, c = 8, d = a === "top" || a === "bottom" ? `M ${p.x - c} ${p.y - c} L ${p.x + c} ${p.y + c} M ${p.x - c} ${p.y + c} L ${p.x + c} ${p.y - c}` : `M ${p.x - c} ${p.y + c} L ${p.x + c} ${p.y - c} M ${p.x - c} ${p.y - c} L ${p.x + c} ${p.y + c}`;
      return _`<path d=${d} class="area-shared-wall" />`;
    })}
        ${// Outline yes, vertex and edge handles no, for a pinned room — same
    // reasoning as the wall's endpoints (issue #191): still visibly
    // selected, with nothing on it that pretends to be draggable.
    i && !e.locked ? [
      ...e.points.map(
        (a, s) => _`
                    <circle cx=${a.x} cy=${a.y} r="7" class="handle"
                            @pointerdown=${(l) => this._startDrag(l, { kind: "area", id: e.id }, void 0, s)} />`
      ),
      ...ye(e.points) ? [
        ...e.points.map((a, s) => {
          const l = e.points[(s + 1) % e.points.length], p = Math.abs(a.y - l.y) < ie ? "ns" : "ew";
          return _`
                          <line
                            x1=${a.x} y1=${a.y} x2=${l.x} y2=${l.y}
                            class=${["area-edge-hit", p].join(" ")}
                            @pointerdown=${(c) => {
            this._startDrag(c, { kind: "area", id: e.id }, void 0, void 0, s);
          }}
                            @dblclick=${(c) => {
            c.preventDefault(), c.stopPropagation(), this._toggleRectAreaSide(e, s);
          }} />`;
        }),
        ...e.points.map((a, s) => {
          const l = e.points[(s + 1) % e.points.length], h = { x: (a.x + l.x) / 2, y: (a.y + l.y) / 2 }, p = Math.abs(a.y - l.y) < ie, c = ve[s], d = e.sideWalls?.[c];
          return _`
                          <circle
                            cx=${h.x}
                            cy=${h.y}
                            r="5"
                            class=${[
            "handle",
            "area-edge-handle",
            p ? "ns" : "ew",
            d ? "side-wall-toggle" : ""
          ].filter(Boolean).join(" ")}
                            title=${d ? `Double-click to cycle this ${c} wall: ${d}` : `Double-click to add a wall on the ${c} side`}
                            @pointerdown=${(u) => this._startDrag(u, { kind: "area", id: e.id }, void 0, void 0, s)}
                            @dblclick=${(u) => {
            u.preventDefault(), u.stopPropagation(), this._toggleRectAreaSide(e, s);
          }} />`;
        })
      ] : []
    ] : f}
      </g>`;
  }
  /**
  * The in-progress Area draft: committed vertices as dots and straight
  * segments between them. Once 3+ points are down the starting vertex is
  * drawn larger/hollow so it's visually obvious that clicking it closes the
  * polygon (see `_onCanvasDown`).
   */
  _renderAreaDraft() {
    const e = this._draftArea;
    if (!e) return f;
    const t = e.points, i = t.map((a) => `${a.x},${a.y}`).join(" "), n = t[t.length - 1], o = t.length >= 3, r = this._areaHover;
    return _`
      <g class="area-draft">
        ${t.length > 1 ? _`<polyline points=${i} class="area-draft-line" />` : f}
        ${r ? _`<line x1=${n.x} y1=${n.y} x2=${r.x} y2=${r.y}
                        class="area-draft-hover" />` : f}
        ${t.map(
      (a, s) => s === 0 && o ? _`<circle cx=${a.x} cy=${a.y} r="9" class="area-draft-start" />` : _`<circle cx=${a.x} cy=${a.y} r="5" class="area-draft-point" />`
    )}
      </g>`;
  }
  /**
   * The card's shutter badge, previewed (issue #74 follow-up) — an opening
   * with both entities bound shows the shutter's own icon beside it, and the
   * editor is where you find out whether it lands somewhere sensible.
   *
   * Inert here: the canvas selects and drags openings by clicking them, and a
   * badge that swallowed those clicks would make the opening under it awkward
   * to grab. On the card it is a control; here it is a picture of one.
   */
  _renderShutterMarkOverlay(e, t, i) {
    const n = e.shutterEntity, o = this.hass?.states[n], r = xe(o, e.shutterInvert) > 0, a = Da(e, o, r, this.hass?.entities?.[n]?.icon), s = L(e.shutterActiveColor ?? e.activeColor) ?? U, l = eo(e), h = Jn(e), p = B(fi, i), c = B(ui, i);
    return y`<div
      class="shutter-mark ${Vt(o, e.shutterInvert) ? "on" : "off"}"
      style="left:${l.x / t.width * 100}%; top:${l.y / t.height * 100}%;
             width:${p};height:${p};
             transform:translate(-50%,-50%)
                       translate(calc(${h.x} * ${c}), calc(${h.y} * ${c}));
             --fp-active:${s};"
      title=${`${o?.attributes?.friendly_name ?? n} — shown on the card, tap it there to open the shutter`}
    >
      <ha-icon icon=${a} style="--mdc-icon-size:${B(
      mi,
      i
    )};"></ha-icon>
    </div>`;
  }
  /**
   * The card's opening badge, previewed (issue #154 follow-up). Same reason as
   * the shutter's preview above: turning **Show icon** on and finding out where
   * the badge lands is the whole point of having a canvas. Inert here too.
   */
  _renderOpeningMarkOverlay(e, t, i) {
    const n = e.entity, o = this.hass?.states[n], r = nt(e, o) > 0, a = Na(e, o, r, this.hass?.entities?.[n]?.icon), s = L(e.activeColor) ?? U, l = Ha(e), h = ja(e), p = B(fi, i), c = B(ui, i);
    return y`<div
      class="shutter-mark ${mn(e, o) ? "on" : "off"}"
      style="left:${l.x / t.width * 100}%; top:${l.y / t.height * 100}%;
             width:${p};height:${p};
             transform:translate(-50%,-50%)
                       translate(calc(${h.x} * ${c}), calc(${h.y} * ${c}));
             --fp-active:${s};"
      title=${`${o?.attributes?.friendly_name ?? n} — shown on the card, tap it there to open its dialog`}
    >
      <ha-icon icon=${a} style="--mdc-icon-size:${B(
      mi,
      i
    )};"></ha-icon>
    </div>`;
  }
  _renderItemOverlay(e, t, i) {
    const n = this._isSel("item", e.id), o = e.entity ? this.hass?.states[e.entity] : void 0, r = pn(e, o, e.entity ? this.hass?.entities?.[e.entity]?.icon : void 0), { text: a, live: s } = du(this.hass, e), l = I(e.size, je), h = Ct(e) !== "none", p = e.display ?? "badge", c = Yn(e, o), d = L(Oi(e.stateColor, c)), u = ga(e, d), g = Ct(e) === "value" ? Aa(this.hass, e) : void 0, b = Ee(e.entity, o?.state), v = b ? L(e.activeColor) ?? sa(o) : void 0, m = !!this.hass && un(e, o?.state), $ = b || m ? void 0 : L(e.inactiveColor), E = Or(
      Jt(d ?? v ?? $, this._config?.palette)
    ), k = e.rippleColor ?? d ?? v ?? U, S = e.rippleSize ?? Ti, A = e.rippleDirection ?? Ci, T = e.rippleWidth ?? Ii, P = xa(e, o?.state, o?.attributes), D = B(l, i), H = y`<div
      class="badge ${h ? "" : "ghost"} ${d ? "state-colored" : b ? "active-colored" : $ ? "inactive-colored" : ""}"
      style="width:${D};height:${D};transform:rotate(${I(e.angle, 0)}deg);${d ? `--fp-state:${d};` : ""}${v ? `--fp-active:${v};` : ""}${$ ? `--fp-inactive:${$};` : ""}${E ? `--fp-ink:${E};` : ""}"
    >
      ${g ? y`<span
            class="badge-value"
            style="font-size:${B(Ca(l, g), i)};"
            >${g}</span
          >` : y`<ha-icon
            class=${P ? `anim-${P}` : ""}
            icon=${r}
            style="--mdc-icon-size:${B(Sa(l), i)};"
          ></ha-icon>`}
    </div>`;
    let j;
    p === "ripple" ? j = bi(!0, k, S, A, T, 3, i) : p === "iconRipple" ? j = y`<div class="stack">
        ${bi(!0, k, S, A, T, 3, i)}
        <div class="stack-icon">${H}</div>
      </div>` : j = H;
    const ne = pa(e, o?.state);
    return y`
      <div
        class="edit-item ${n ? "selected" : ""} ${ne ? "card-hidden" : ""}"
        style="left:${e.x / t.width * 100}%; top:${e.y / t.height * 100}%;"
        @pointerdown=${(ee) => this._onOverlayDown(ee, { kind: "item", id: e.id })}
        @pointermove=${this._onOverlayMove}
        @pointerup=${this._onOverlayUp}
        @pointercancel=${this._onPointerCancel}
      >
        ${j}
        <!-- The card's own label line when there is one (issue #135), so
             turning Show state on is visible here rather than only after
             leaving the editor; otherwise the dim identification fallback.
             The Labels toolbar toggle hides either on dense plans (issue
             #52), and the size previews the card's labelSize (issue #59). -->
        ${this._hideLabels ? f : y`<span
            class="ilabel ${s ? "live" : ""} ilabel-${Xn(e)}"
            style="font-size:${B(
      s || e.labelSize != null ? ma(e.labelSize) : 11,
      i
    )};${s && u ? `color:${u};` : ""}"
            >${a}</span
          >`}
      </div>
    `;
  }
  /**
   * The floor switcher, draggable on the canvas (issue #281) — "the most
   * flexible solution would be to make this part freely movable, like a piece
   * of furniture", and the maintainer's "lets start with full freedom".
   *
   * Deliberately **not** a {@link SelKind}. Every kind in that union names a
   * per-floor array of things with ids, and the editor's machinery reads it
   * that way throughout: snapshots, group drags, locking, duplicate, delete,
   * the selection summary and its icon. The switcher is one card-level thing
   * with no id, and none of those operations mean anything for it — adding a
   * kind would have put a special case in each of them, which is a lot of
   * places to be wrong in.
   *
   * So it carries its own small drag instead: three handlers and one field,
   * touching nothing the selection model owns.
   */
  _renderSwitcherHandle(e) {
    const t = I(e.width, le), i = I(e.height, ge), n = mt(e) ?? Bt(t, i), o = !!mt(e), r = e.floors ?? [];
    return y`
      <div
        class="switcher-handle ${e.compactHeader === !0 ? "row" : ""} ${this._switcherDrag ? "dragging" : ""} ${o ? "" : "default"} ${this._tool === "select" ? "" : "passive"}"
        style="left:${n.x / t * 100}%; top:${n.y / i * 100}%;"
        title=${o ? "Drag to move the floor switcher" : "Drag to move the floor switcher off the corner"}
        @pointerdown=${this._onSwitcherDown}
        @lostpointercapture=${this._onSwitcherCancel}
      >
        ${r.map(
      (a) => y`<span class="sh-btn ${a.id === this._activeFloorId ? "active" : ""}"
            >${a.short || a.name}</span
          >`
    )}
      </div>
    `;
  }
  /**
   * Take the drag's finger out of the pinch bookkeeping.
   *
   * `_onWrapPointerDown` counts every touch that lands on the canvas, the
   * switcher's included, and only `_onWrapPointerEnd` takes it out again. The
   * drag's own listeners run first — on the shadow root, above `.canvas-wrap`
   * — and stop the event, so that end handler never hears this finger lift.
   * Left counted, the next single touch reads as a second finger and starts a
   * pinch nobody is making. Called on every path that ends the drag's pointer,
   * before the event is stopped from reaching the wrap.
   */
  _forgetSwitcherTouch(e) {
    this._onWrapPointerEnd(e);
  }
  /**
   * Put the config back as it was before the switcher drag started.
   *
   * Nothing was emitted while it was live, so the host still holds the pre-drag
   * config and restoring it locally spares a round trip. The undo stack and the
   * redo stack are both put back as they stood before the first-movement push,
   * so a canceled drag is a complete no-op — the same contract `_cancelGesture`
   * keeps for an element drag.
   */
  _rollBackSwitcherDrag() {
    const e = this._switcherDrag;
    e && (this._switcherMoves.cancel(), this._switcherDrag = void 0, this._gesturePointer = null, e.moved && (e.priorHistory && (this._history = e.priorHistory), this._config = e.before, this._watchedEntities = tt(e.before), this._future = e.priorFuture));
  }
  _renderTextOverlay(e, t, i) {
    const n = this._isSel("text", e.id);
    return y`
      <div
        class="edit-text ${n ? "selected" : ""}"
        style="left:${e.x / t.width * 100}%; top:${e.y / t.height * 100}%;
               font-size:${B(I(e.size, vt), i)};
               color:${ae(e.color, zr)};
               transform:translate(-50%,-50%) rotate(${I(e.angle, 0)}deg);"
        @pointerdown=${(o) => this._onOverlayDown(o, { kind: "text", id: e.id })}
        @pointermove=${this._onOverlayMove}
        @pointerup=${this._onOverlayUp}
        @pointercancel=${this._onPointerCancel}
      >
        ${Wn(this.hass, e) || "…"}
      </div>
    `;
  }
  _renderPanel() {
    return y`
      <section class="panel">
        <button
          class="section-toggle"
          aria-expanded=${this._projectOpen}
          @click=${() => {
      this._projectOpen = !this._projectOpen;
    }}
        >
          <ha-icon icon=${this._projectOpen ? "mdi:chevron-down" : "mdi:chevron-right"}></ha-icon>
          <span class="section-title-inline">Project</span>
          ${this._projectOpen ? f : y`<span class="section-summary"
                >${this._config.title || "Untitled"} · ${this._config.width}×${this._config.height}</span
              >`}
        </button>
        ${this._projectOpen ? this._renderPanelBody() : f}
      </section>
    `;
  }
  /**
   * The Project panel, grouped on the same criteria as the element panels:
   * what the plan *is*, then how it *looks*, then what it *does*.
   *
   * It had the same problem the device panel had — nineteen controls in one
   * run, with the sun's five aiming fields separated from the two brightness
   * sliders by a press-effect dropdown, and "Offline devices" filed under
   * display next to the card's rotation.
   *
   * `offlineStyle` moves out of the display slice and joins the press effect:
   * both are statements about how *devices* look and answer, not about how the
   * card is framed. It stays in `projectDisplayForm` as a field — one form, one
   * `toPatch` — and is sliced into the group it belongs to (see `formSlice`).
   */
  _renderPanelBody() {
    const e = this._config, t = (n) => this._patchConfig(n), i = yg(e);
    return y`
      <div class="rows panel-body">
        ${this._renderGroup(
      "Project",
      this._renderForm(ug(e), (n, o) => {
        "grid" in n && typeof n.grid == "number" && (n = { ...n, ...this._gridPatch(n.grid) }), o ? this._patchConfigLive(n) : this._patchConfig(n);
      })
    )}
        ${this._renderGroup(
      // The plan's own look: its palette, its paper, and the one drawing
      // convention that is a plan-wide choice rather than an element's.
      "Look",
      this._renderForm(gg(e), t),
      this._renderColorRow({
        label: "Background",
        value: e.background,
        swatch: "#ffffff",
        placeholder: "#ffffff or empty",
        onLive: (n) => this._patchConfigLive({ background: n }),
        onCommit: (n) => this._patchConfig({ background: n })
      }),
      this._renderForm(bg(e), t)
    )}
        ${this._renderGroup(
      // Named colours (issue #265). Its own group rather than a row inside
      // Look: it is a list that grows, and it is the one thing here that
      // other panels reach back into.
      "Named colors",
      this._renderPalettePanel()
    )}
        ${this._renderGroup(
      // Where the floor switcher sits (issue #281). Under Project because
      // it is one control for the whole card, not a property of a floor —
      // and next to the plan's own look, which is what it sits on.
      "Floor switcher",
      this._renderSwitcherPlacement()
    )}
        ${this._renderGroup(
      // Per floor, not per project — but it is the floor's paper, so it
      // belongs beside the plan's own.
      "Floor image",
      this._renderForm(_g(this._floor()), (n, o) => {
        o ? this._patchFloorLive(n) : this._commitFloor(n);
      })
    )}
        ${this._renderGroup(
      // How the card is framed on the dashboard, as opposed to what is
      // drawn inside it. Set once for a surface and rarely touched again.
      "Display",
      this._renderForm(
        fe(i, [
          "view",
          "wallHeight",
          "wallOpacity",
          "rotation",
          "rotationPortrait",
          "rotationLandscape",
          "overlayScale",
          "overlayMinWidth",
          "compactHeader",
          "zoomedOverlayAuto",
          "zoomedOverlayScale",
          "roomFocusControls",
          "roomFocusInterval"
        ]),
        t
      )
    )}
        ${this._renderGroup(
      // Light through the openings (issue #177) — where it comes from and
      // what it looks like where it lands.
      "Sunlight",
      this._renderForm(wg(e), t),
      e.sunlight ? y`${this._renderColorRow({
        label: "Sun color",
        title: "Color of the light the openings let in",
        value: e.sunlightColor,
        swatch: "#ffd9a0",
        placeholder: "(warm white)",
        onLive: (n) => this._patchConfigLive({ sunlightColor: n }),
        onCommit: (n) => this._patchConfig({ sunlightColor: n })
      })}
              ${e.sunShade === !1 ? f : this._renderColorRow({
        label: "Shade color",
        title: "Color of everywhere the light does not reach",
        value: e.sunShadeColor,
        swatch: "#000000",
        placeholder: "(black)",
        onLive: (n) => this._patchConfigLive({ sunShadeColor: n }),
        onCommit: (n) => this._patchConfig({ sunShadeColor: n })
      })}` : f
    )}
        ${this._renderGroup(
      // The other half of following the sun, and a separate switch: this
      // one dims the whole plan after dark rather than casting anything.
      "Night dimming",
      this._renderForm(vg(e), t)
    )}
        ${this._renderGroup(
      // How devices look and answer, plan-wide. "Offline devices" lived
      // under display, beside the card's rotation, which is not what it is
      // about.
      "Devices",
      this._renderForm(mg(e), t),
      this._renderForm(fe(i, ["offlineStyle"]), t),
      this._renderForm(fg(e), t)
    )}
        ${this._renderGroup("Symbols", this._renderSymbolsPanel())}
      </div>
    `;
  }
  /**
   * Paste a furniture symbol into this plan (issue #90).
   *
   * The point is that you don't need a pull request to draw something the
   * library hasn't got: paste the geometry here, it lands in the config's
   * `symbols:` block, and it appears in the picker beside the built-ins. If it
   * turns out to be generally useful, the same JSON is what you contribute to
   * `furniture/`.
   *
   * It is validated through `normalizeSymbol` — the same function the shipped
   * library goes through — so a malformed paste is reported here rather than
   * becoming a broken glyph on the plan. Nothing pasted is ever parsed as
   * markup; see `symbols.ts`.
   */
  /**
   * The plan's named colours (issue #265): *"I hate copying color hex codes
   * across so many entities."*
   *
   * Names are stored, but what elements store is a `var()` built from the name
   * (see `src/palette.ts`), so the two edits that could strand a reference are
   * the ones this panel has to be careful about — and both are handled by
   * rewriting the plan rather than by warning about it:
   *
   * - **Rename** rewrites every reference to the new name, so the link
   *   survives. Blocked when the new name would collide with another entry,
   *   since two entries sharing a slug means one of them silently stops
   *   resolving.
   * - **Delete** rewrites every reference to the literal colour the entry held.
   *   A dangling `var()` is not a colour at all, so the alternative is elements
   *   turning black the moment a name is removed. This way the plan looks
   *   exactly the same afterwards and has simply lost the link.
   */
  _renderPalettePanel() {
    const e = this._config.palette ?? [], t = (n) => this._patchConfig({ palette: n.length ? n : void 0 }), i = (n, o, r = !1) => {
      const a = e.map((s, l) => l === n ? { ...s, ...o } : s);
      r ? this._patchConfigLive({ palette: a }) : this._patchConfig({ palette: a });
    };
    return y`
      <div class="row col palette-panel">
        <label>Named colors</label>
        ${e.length ? f : y`<span class="hint"
              >Name a color here and every color field on the plan can point at it.</span
            >`}
        ${e.map(
      (n, o) => y`
            <div class="row wide palette-row">
              <input
                type="text"
                class="palette-name"
                placeholder="Warm"
                .value=${n.name ?? ""}
                @change=${(r) => this._renamePaletteColor(o, r.target)}
              />
              <input
                type="color"
                .value=${this._swatchValue(n.color, "#ff8800")}
                @input=${(r) => i(o, { color: r.target.value }, !0)}
              />
              <input
                type="text"
                class="palette-color"
                placeholder="#ff8800"
                .value=${n.color ?? ""}
                @change=${(r) => this._recolorPaletteColor(o, r.target)}
              />
              <button
                class="rule-remove"
                aria-label="Remove color"
                title="Remove this color; anything using it keeps the color it has now"
                @click=${() => this._removePaletteColor(o)}
              >
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
            </div>
          `
    )}
        ${this._paletteError ? y`<div class="symbol-error">${this._paletteError}</div>` : f}
        ${e.length >= ts ? f : y`<div class="row wide state-color-add">
              <button
                @click=${() => {
      this._paletteError = "", t([...e, { name: this._nextPaletteName(e), color: "#ff8800" }]);
    }}
              >
                <ha-icon icon="mdi:plus"></ha-icon>Add color
              </button>
            </div>`}
      </div>
    `;
  }
  /** "Color 1", "Color 2", … — the first number no entry is already using. */
  _nextPaletteName(e) {
    const t = new Set(e.map((i) => te(i.name)));
    for (let i = 1; ; i++) {
      const n = `Color ${i}`;
      if (!t.has(te(n))) return n;
    }
  }
  /**
   * Takes the input rather than its value so a refused rename can put the old
   * name back. Lit will not do it: the config is unchanged, so the binding sees
   * the same value it last wrote and skips the DOM, leaving the box showing a
   * name the plan does not have.
   */
  _renamePaletteColor(e, t) {
    const i = this._config.palette ?? [], n = i[e];
    if (!n) return;
    const o = t.value.trim(), r = te(n.name), a = te(o);
    if (r === a) {
      if (this._paletteError = "", o === (n.name ?? "")) {
        t.value = o;
        return;
      }
      this._patchConfig({ palette: i.map((h, p) => p === e ? { ...h, name: o } : h) });
      return;
    }
    if (a && i.some((h, p) => p !== e && te(h.name) === a)) {
      this._paletteError = `Another color is already called “${o}”.`, t.value = n.name ?? "";
      return;
    }
    this._paletteError = "";
    const s = i.map((h, p) => p === e ? { ...h, name: o } : h), l = { ...this._config, palette: s };
    this._patchConfig(
      // Same shadowing caveat as delete: if another entry still declares the old
      // slug, its references are none of this rename's business.
      this._slugStillResolves(r, l) ? l : (
        // An empty new name leaves the entry unusable, so its references have
        // nothing to point at — freeze them at the colour, as a delete does.
        hr(l, r, a ? cr(o) : n.color)
      )
    );
  }
  /**
   * The colour half of a palette row.
   *
   * Guarded like the name half, and for the same reason. An empty or invalid
   * colour drops the entry from `paletteEntries`, so `paletteStyle` stops
   * declaring its property and every reference to it dangles — which is not a
   * fallback, it is black. That is the same damage deleting the entry does, but
   * reached without a rewrite, without an error, and with the row still sitting
   * there looking live. Refuse it and put the field back instead; the way out
   * is the remove button, which freezes the references properly.
   */
  _recolorPaletteColor(e, t) {
    const i = this._config.palette ?? [], n = i[e];
    if (!n) return;
    const o = t.value.trim();
    if (!L(o)) {
      this._paletteError = o ? `“${o}” is not a color the card can use.` : "A named color needs a color. Use the remove button to take the name away.", t.value = n.color ?? "";
      return;
    }
    this._paletteError = "", this._patchConfig({ palette: i.map((r, a) => a === e ? { ...r, color: o } : r) });
  }
  _removePaletteColor(e) {
    const t = this._config.palette ?? [], i = t[e];
    if (!i) return;
    this._paletteError = "";
    const n = t.filter((r, a) => a !== e), o = { ...this._config, palette: n.length ? n : void 0 };
    this._patchConfig(
      this._slugStillResolves(te(i.name), o) ? o : hr(o, te(i.name), i.color)
    );
  }
  /** Whether a slug is still declared by the palette in `config`. */
  _slugStillResolves(e, t) {
    return e ? It(t.palette).some((i) => te(i.name) === e) : !1;
  }
  /**
   * Says where the switcher is and offers the way back (issue #281).
   *
   * Placing is a drag on the canvas, so this is not a second way to set the
   * position — it is the half a drag cannot express: returning to the corner.
   * Without it, dropping the switcher once would be irreversible except by
   * hand-editing YAML.
   */
  _renderSwitcherPlacement() {
    const e = mt(this._config), t = this._config.floors ?? [], i = I(this._config.width, le), n = I(this._config.height, ge);
    return y`
      <div class="row col">
        <label>Position</label>
        ${t.length > 1 ? y`<span class="hint"
                >${e ? "Drag it on the canvas, or type the point here." : "In the plan's top-right corner. Drag it on the canvas, or type a point here."}</span
              >
              <!-- Coordinates as well as the drag, because the drag is the only
                   way to place it and a pointer is not the only way people
                   work: the handle takes no keyboard, so without these there
                   would be no keyboard path to the feature at all. They are
                   also the precise option, for a plan being nudged a few units
                   rather than aimed by eye. -->
              <div class="row wide">
                <!-- The visible <label>s are siblings rather than wrappers, so
                     they name nothing as far as assistive tech is concerned:
                     a screen reader would announce two unlabelled spinbuttons
                     and leave you to guess which is which. The aria-label is
                     what carries the name, and says the unit as well, since
                     "X" alone does not tell you these are canvas units. -->
                <label aria-hidden="true">X</label>
                <!-- The exact stored number, not a rounded one. With Snap off
                     (or a hand-written config) an anchor is legitimately
                     fractional, and a field that showed 12 for a stored 12.4
                     would be lying about where the switcher is — then rewrite
                     it to 13 the moment anyone touched the spinner. These are
                     meant to be the precise way to place it. Hence step="any"
                     as well: a number input defaults to whole steps, which
                     marks a stored 60.4 invalid and lets the spinner snap it. -->
                <input
                  type="number"
                  step="any"
                  aria-label="Floor switcher X, in canvas units"
                  .value=${e ? String(e.x) : ""}
                  placeholder=${Math.round(Bt(i, n).x)}
                  @change=${(o) => this._setSwitcherCoord("x", o.target.value)}
                />
                <label aria-hidden="true">Y</label>
                <input
                  type="number"
                  step="any"
                  aria-label="Floor switcher Y, in canvas units"
                  .value=${e ? String(e.y) : ""}
                  placeholder=${Math.round(Bt(i, n).y)}
                  @change=${(o) => this._setSwitcherCoord("y", o.target.value)}
                />
              </div>
              ${e ? y`<div class="row wide">
                    <button @click=${() => this._patchConfig({ floorSwitcher: void 0 })}>
                      Back to the corner
                    </button>
                  </div>` : f}` : y`<span class="hint"
              >A plan with one floor draws no switcher. Add a second floor and it appears
              here.</span
            >`}
      </div>
    `;
  }
  /**
   * Set one coordinate from the panel's number fields.
   *
   * Typing into one of them while the switcher is still in its default corner
   * has to place it, which means inventing the other half — and the only
   * honest answer is where the handle is actually drawn, since that is what
   * the field's placeholder has been showing.
   *
   * An emptied field returns the switcher to the corner rather than storing a
   * half-position: `floorSwitcher` is a point or it is nothing, which is the
   * rule `floorSwitcherAnchor` enforces at the other end.
   */
  _setSwitcherCoord(e, t) {
    const i = Number(t);
    if (t.trim() === "" || !Number.isFinite(i)) {
      this._patchConfig({ floorSwitcher: void 0 });
      return;
    }
    const n = I(this._config.width, le), o = I(this._config.height, ge), r = mt(this._config) ?? Bt(n, o);
    this._patchConfig({
      floorSwitcher: { ...r, [e]: i }
    });
  }
  _renderSymbolsPanel() {
    const e = Object.keys(this._config.symbols ?? {});
    return y`
      <div class="row col symbols-panel">
        ${e.length ? y`<div class="symbol-list">
              ${e.map(
      (t) => y`
                  <span class="symbol-chip">
                    ${t}
                    <button
                      class="chip-x"
                      title=${`Remove ${t}`}
                      @click=${() => this._removeSymbol(t)}
                    >
                      ✕
                    </button>
                  </span>
                `
    )}
            </div>` : f}
        <textarea
          class="symbol-input"
          rows="4"
          spellcheck="false"
          placeholder=${'{ "id": "my-desk", "size": { "w": 120, "h": 60 }, "parts": [ … ] }'}
          .value=${this._symbolDraft}
          @input=${(t) => {
      this._symbolDraft = t.target.value, this._symbolError = "";
    }}
        ></textarea>
        ${this._symbolError ? y`<div class="symbol-error">${this._symbolError}</div>` : f}
        <div class="symbol-actions">
          <button ?disabled=${!this._symbolDraft.trim()} @click=${this._addSymbol}>
            Add symbol
          </button>
          <a
            href="https://github.com/nicosandller/easy-floorplan/blob/main/furniture/README.md"
            target="_blank"
            rel="noreferrer"
            >How to draw one</a
          >
        </div>
      </div>
    `;
  }
  _removeSymbol(e) {
    const t = { ...this._config.symbols ?? {} };
    delete t[e], this._patchConfig({ symbols: Object.keys(t).length ? t : void 0 });
  }
  /**
   * Editor fields for the currently-selected element, rendered in the Element
   * section below the canvas (docked beside it in fullscreen). Returns nothing
   * when the selection isn't exactly one element — multi-select and
   * empty-select states are handled by the Element header itself.
   */
  _renderSelectionEditor() {
    const e = this._primary();
    if (!e || this._selection.length !== 1) return y`${f}`;
    if (e.kind === "opening") {
      const t = this._floor().openings.find((r) => r.id === e.id);
      if (!t) return y`${f}`;
      const i = Qm(t, (r) => this._supportedFeatures(r)), n = (r, a) => {
        if ("entity" in r) {
          const s = r.entity, l = s ? this.hass?.states[s]?.attributes?.device_class : void 0;
          r = { ...r, ...ju(t, l) };
        }
        this._applyElementPatch("opening", t.id, r, a);
      }, o = (r, a, ...s) => {
        const l = fe(i, a);
        return !l.fields.length && !s.some((h) => h && h !== f) ? f : this._renderGroup(r, this._renderForm(l, n), ...s);
      };
      return y`
        ${C.OPENING_GROUPS.map(
        ([r, a]) => r === "Color" ? o(
          r,
          a,
          t.entity ? y`${this._renderColorRow({
            label: "Open color",
            title: "Leaf, sash and swing arc while this opening is open",
            value: t.activeColor,
            swatch: "#03a9f4",
            placeholder: "(primary)",
            onLive: (s) => this._updateOpeningLive(t.id, { activeColor: s }),
            onCommit: (s) => this._updateOpening(t.id, { activeColor: s })
          })}
                    ${this._renderColorRow({
            label: "Closed color",
            title: "Leaf, sash and swing arc while it is closed — the jambs stay the wall's color",
            value: t.inactiveColor,
            swatch: "#c62828",
            placeholder: "(wall)",
            onLive: (s) => this._updateOpeningLive(t.id, { inactiveColor: s }),
            onCommit: (s) => this._updateOpening(t.id, { inactiveColor: s })
          })}` : f
        ) : r === "Shutter" ? o(
          r,
          a,
          // The shutter's own accent, so an open shutter over a shut
          // window can read as a separate thing from the sash it
          // covers. Falls back to the opening's, hence the placeholder.
          t.shutterEntity ? this._renderColorRow({
            label: "Shutter color",
            title: "Shutter color while it is open",
            value: t.shutterActiveColor,
            swatch: t.activeColor ?? "#03a9f4",
            placeholder: t.activeColor ? "(active color)" : "(primary)",
            onLive: (s) => this._updateOpeningLive(t.id, { shutterActiveColor: s }),
            onCommit: (s) => this._updateOpening(t.id, { shutterActiveColor: s })
          }) : f
        ) : o(r, a)
      )}
      `;
    }
    if (e.kind === "item") {
      const t = this._floor().items.find((l) => l.id === e.id);
      if (!t) return y`${f}`;
      const i = this._areaEntitiesAt(t.x, t.y), n = t.entity ? this.hass?.states[t.entity]?.attributes?.device_class : void 0, o = (l) => (l ? this.hass?.states[l]?.attributes?.friendly_name : void 0) ?? l, r = {
        source: Ta(this.hass, t)?.source ?? "primary",
        primaryLabel: o(t.entity),
        // One label per reading, positionally — the dropdown names each rather
        // than numbering them, and a reading with no entity of its own is read
        // off this device, so that is the name to show for it (issue #180).
        readingLabels: Pe(t).map((l) => o(l.entity || t.entity))
      }, a = (l, h) => {
        "entity" in l && typeof l.entity == "string" && (l = { ...l, kind: Xo(l.entity) }), this._applyElementPatch("item", t.id, l, h);
      }, s = og(t, n);
      return y`
        ${this._renderGroup("Identity", this._renderForm(eg(t), a))}
        ${this._renderGroup(
        "What it reads",
        // Entity, its attribute, whether its own state shows, then every
        // other entity — the order the label prints them in (issue #180).
        this._renderForm(Jm(t, i), a),
        this._renderForm(tg(t), a),
        this._renderItemReadings(t)
      )}
        ${hu(t) ? this._renderGroup(
        "Label",
        this._renderForm(ig(t), a),
        t.disableLabelColor && t.useCustomLabelColor ? this._renderColorRow({
          label: "Custom color",
          value: t.labelCustomColor,
          swatch: "#ffffff",
          placeholder: "e.g. #ff0000 or red",
          onLive: (l) => this._updateItemLive(t.id, { labelCustomColor: l }),
          onCommit: (l) => this._updateItem(t.id, { labelCustomColor: l })
        }) : f
      ) : f}
        ${this._renderGroup(
        "Badge",
        this._renderForm(ng(t, r), a),
        this._renderItemIconRow(t)
      )}
        ${this._renderGroup(
        "Color",
        t.stateColor?.length ? (
          // Colour by state supersedes the fixed active colour, so showing
          // both invites setting one and seeing the other. Say which one is
          // in charge instead of leaving a dead control on screen.
          y`<p class="hint rule-note">
                Colored by the state rules below — they replace the active and inactive colors.
              </p>`
        ) : y`${this._renderColorRow({
          label: "Active color",
          title: "Badge color while this device is on (issue #79)",
          value: t.activeColor,
          swatch: "#fdd835",
          placeholder: "(theme)",
          onLive: (l) => this._updateItemLive(t.id, { activeColor: l }),
          onCommit: (l) => this._updateItem(t.id, { activeColor: l })
        })}
              ${this._renderColorRow({
          label: "Inactive color",
          title: "Badge color while this device is off — closed, locked or docked, whichever this entity says (issue #228)",
          value: t.inactiveColor,
          swatch: "#c62828",
          placeholder: "(theme)",
          onLive: (l) => this._updateItemLive(t.id, { inactiveColor: l }),
          onCommit: (l) => this._updateItem(t.id, { inactiveColor: l })
        })}`,
        this._renderStateColorRules(
          t.stateColor,
          (l) => this._updateItem(t.id, { stateColor: l }),
          // Only a device draws a glyph, so only a device's rules offer an
          // icon — furniture and areas share this rule shape but paint
          // polygons (issue #106).
          { icons: !0, iconPlaceholder: this._itemDefaultIcon(t) }
        )
      )}
        ${s ? this._renderGroup(
        "Effects",
        this._renderForm(s, a),
        // The ring's colour belongs with the ring, not with the badge's.
        $a(t.entity, n) && ro(t) ? this._renderColorRow({
          label: "Ripple color",
          value: t.rippleColor,
          swatch: t.activeColor ?? "#03a9f4",
          placeholder: t.activeColor ? "(active color)" : "(primary)",
          onLive: (l) => this._updateItemLive(t.id, { rippleColor: l }),
          onCommit: (l) => this._updateItem(t.id, { rippleColor: l })
        }) : f
      ) : f}
        ${this._renderGroup("Behaviour", this._renderForm(ag(t), a))}
        ${this._renderGroup("Visibility", this._renderForm(rg(t), a))}
      `;
    }
    if (e.kind === "text") {
      const t = this._floor().texts.find((i) => i.id === e.id);
      return t ? y`
        ${this._renderForm(
        sg(t, this._areaEntitiesAt(t.x, t.y)),
        (i, n) => this._applyElementPatch("text", t.id, i, n)
      )}
        ${this._renderColorRow({
        label: "Color",
        value: t.color,
        swatch: "#000000",
        placeholder: "(theme default)",
        onLive: (i) => this._updateTextLive(t.id, { color: i }),
        onCommit: (i) => this._updateText(t.id, { color: i })
      })}
      ` : y`${f}`;
    }
    if (e.kind === "furniture") {
      const t = this._floor().furniture.find((o) => o.id === e.id);
      if (!t) return y`${f}`;
      const i = lg(t, this._areaEntitiesAt(t.x, t.y), this._symbols()), n = (o, r) => this._applyElementPatch("furniture", t.id, o, r);
      return y`
        ${C.FURNITURE_GROUPS.map(
        ([o, r]) => this._renderGroup(o, this._renderForm(fe(i, r), n))
      )}
        ${this._renderGroup(
        "Color",
        this._renderColorRow({
          label: "Color",
          value: t.color,
          swatch: "#9e9e9e",
          placeholder: "(gray)",
          onLive: (o) => this._updateFurnitureLive(t.id, { color: o }),
          onCommit: (o) => this._updateFurniture(t.id, { color: o })
        }),
        // Without an entity there is nothing to condition a colour on.
        t.entity ? y`
                ${this._renderColorRow({
          label: "Active color",
          title: "Color while the entity is on",
          value: t.activeColor,
          swatch: "#03a9f4",
          placeholder: "(no change)",
          onLive: (o) => this._updateFurnitureLive(t.id, { activeColor: o }),
          onCommit: (o) => this._updateFurniture(t.id, { activeColor: o })
        })}
                ${this._renderStateColorRules(
          t.stateColor,
          (o) => this._updateFurniture(t.id, { stateColor: o })
        )}
              ` : f
      )}
      `;
    }
    if (e.kind === "area") {
      const t = (this._floor().areas ?? []).find((a) => a.id === e.id);
      if (!t) return y`${f}`;
      const i = wl(this.hass), n = t.haArea ? this._pendingAreaEntities(t) : [], o = dg(t), r = (a, s) => this._applyElementPatch("area", t.id, a, s);
      return y`
        ${this._renderGroup(
        // The name doubles as the HA-area link, so the link status line and
        // the name-related toggles belong with it.
        "Identity",
        this._renderForm(
          hg(t, i.map((a) => a.name)),
          (a, s) => (
            // A name change also decides `haArea` (see areaNamePatch).
            this._applyElementPatch("area", t.id, _l(a, i), s)
          )
        ),
        this._renderAreaLinkRow(t, i),
        this._renderForm(fe(o, ["showName", "labelSize"]), r)
      )}
        ${this._renderGroup(
        "What it reads",
        this._renderForm(fe(o, ["entity"]), r)
      )}
        ${this._renderGroup(
        "Color",
        this._renderForm(fe(o, ["highlight", "opacity", "activeOpacity"]), r),
        this._renderColorRow({
          label: "Color",
          value: t.color,
          swatch: "#03a9f4",
          placeholder: "(primary)",
          onLive: (a) => this._updateAreaLive(t.id, { color: a }),
          onCommit: (a) => this._updateArea(t.id, { color: a })
        }),
        // The colours the bound entity drives. Same shape furniture and
        // devices already use, and gated the same way — without an entity
        // there is nothing to condition on. Until this existed the Entity
        // picker above was inert on its own: areaColor() resolves nothing
        // without an activeColor or a matching rule, so binding an entity
        // in the editor changed nothing and the feature looked unbuilt.
        t.entity ? y`
                ${this._renderColorRow({
          label: "Active color",
          title: "Color while the entity is on",
          value: t.activeColor,
          swatch: "#03a9f4",
          placeholder: "(no change)",
          onLive: (a) => this._updateAreaLive(t.id, { activeColor: a }),
          onCommit: (a) => this._updateArea(t.id, { activeColor: a })
        })}
                ${this._renderStateColorRules(
          t.stateColor,
          (a) => this._updateArea(t.id, { stateColor: a })
        )}
              ` : f
      )}
        ${this._renderGroup(
        // What tapping the room does (issue #181). Last, as it is on every
        // other element: the thing it *does*, after everything it *is*.
        "Behavior",
        this._renderForm(
          fe(o, [
            "fitZoom",
            "zoom",
            "tap_action",
            "hold_action",
            "double_tap_action"
          ]),
          r
        )
      )}
        ${t.haArea ? this._renderGroup(
        // Everything that only exists because this room is linked to a
        // Home Assistant area.
        "Home Assistant area",
        y`<div class="row wide">
                <label>Filter entities</label>
                <input
                  type="checkbox"
                  .checked=${t.filterEntities ?? !0}
                  @change=${(a) => this._updateArea(t.id, {
          filterEntities: a.target.checked
        })}
                />
                <span class="hint"
                  >Scope the entity picker, for devices placed inside this room, to this HA
                  area's entities.</span
                >
              </div>`,
        y`<div class="row wide">
                <button
                  ?disabled=${!n.length}
                  title=${n.length ? `Add ${n.length} device${n.length === 1 ? "" : "s"} from this HA area, spread out across the room` : "Every entity in this HA area is already placed on this floor"}
                  @click=${() => this._addAreaEntities(t)}
                >
                  <ha-icon icon="mdi:shape-square-plus"></ha-icon>
                  Add all devices in this HA area${n.length ? ` (${n.length})` : ""}
                </button>
              </div>`
      ) : f}
        <p class="hint">
          Drag inside the fill to move the whole room; drag a vertex handle to reshape it.
        </p>
      `;
    }
    if (e.kind === "tracker") {
      const t = (this._floor().trackers ?? []).find((o) => o.id === e.id);
      if (!t) return y`${f}`;
      const i = cg(t), n = (o, r) => this._applyElementPatch("tracker", t.id, o, r);
      return y`
        ${this._renderGroup(
        "Zone",
        this._renderForm(fe(i, C.TRACKER_GROUPS[0][1]), n)
      )}
        ${this._renderGroup(
        // The two distance sensors that place the marker inside the zone —
        // the thing a tracker actually is, so it gets its own group rather
        // than two unlabelled blocks above the box.
        "Sensors",
        this._renderTrackerSensorRows(t, "xSensor", "X sensor"),
        this._renderTrackerSensorRows(t, "ySensor", "Y sensor")
      )}
        ${this._renderGroup(
        "Marker",
        this._renderForm(fe(i, C.TRACKER_GROUPS[1][1]), n),
        this._renderColorRow({
          label: "Color",
          value: t.color,
          swatch: "#03a9f4",
          placeholder: "(primary)",
          onLive: (o) => this._updateTrackerLive(t.id, { color: o }),
          onCommit: (o) => this._updateTracker(t.id, { color: o })
        })
      )}
      `;
    }
    if (e.kind === "wall") {
      const t = this._floor().walls.find((n) => n.id === e.id);
      if (!t) return y`${f}`;
      const i = Math.round(Math.hypot(t.x2 - t.x1, t.y2 - t.y1));
      return y`
        ${this._renderForm(
        pg(t),
        (n, o) => this._applyElementPatch("wall", t.id, n, o)
      )}
        <div class="row">
          <label>Length</label>
          <input
            class="num"
            type="number"
            min="1"
            .value=${String(i)}
            @change=${(n) => {
        const o = n.target, r = Number(o.value);
        if (o.value === "" || !(r >= 1)) {
          o.value = String(i);
          return;
        }
        const a = t.x2 - t.x1, s = t.y2 - t.y1, l = Math.hypot(a, s), h = l > 0 ? a / l : 1, p = l > 0 ? s / l : 0;
        this._updateWall(t.id, {
          x2: Math.round(t.x1 + h * r),
          y2: Math.round(t.y1 + p * r)
        });
      }}
          />
          <span class="hint">Resizes from the start point, keeping the direction.</span>
        </div>
        <p class="hint">
          Or drag the line on the canvas to move it, and the round handles to move an endpoint.
        </p>
      `;
    }
    return y`${f}`;
  }
  /**
   * Editor rows for one of a tracker's two sensor mappings (X or Y). Entity
   * picker is always shown; min / max / invert appear once a sensor entity is
   * set so the panel stays compact while empty.
   */
  _renderTrackerSensorRows(e, t, i) {
    const n = e[t];
    return y`
      <div class="row wide">
        <label>${i}</label>
        ${this._renderEntityPicker(
      n?.entity ?? "",
      (o) => {
        o ? this._updateTrackerSensor(e.id, t, { entity: o }) : this._updateTrackerSensor(e.id, t, null);
      },
      ["sensor", "input_number", "number"]
    )}
      </div>
      ${n ? y`<div class="row">
            <label>${i} range</label>
            <input
              class="num"
              type="number"
              step="0.01"
              title="Reading at the near edge"
              .value=${String(n.min)}
              @change=${(o) => {
      const r = o.target, a = Number(r.value);
      r.value !== "" && Number.isFinite(a) ? this._updateTrackerSensor(e.id, t, { min: a }) : r.value = String(n.min);
    }}
            />
            <input
              class="num"
              type="number"
              step="0.01"
              title="Reading at the far edge"
              .value=${String(n.max)}
              @change=${(o) => {
      const r = o.target, a = Number(r.value);
      r.value !== "" && Number.isFinite(a) ? this._updateTrackerSensor(e.id, t, { max: a }) : r.value = String(n.max);
    }}
            />
            <label class="inline-check">
              <input
                type="checkbox"
                .checked=${n.invert ?? !1}
                @change=${(o) => this._updateTrackerSensor(e.id, t, {
      invert: o.target.checked || void 0
    })}
              />
              invert
            </label>
          </div>
          <div class="row wide">
            <label>${i} presence</label>
            ${this._renderEntityPicker(
      n.presence?.entity ?? "",
      (o) => this._updateTrackerSensor(e.id, t, {
        presence: o ? { entity: o, invert: n.presence?.invert } : void 0
      }),
      ["binary_sensor", "input_boolean", "device_tracker"]
    )}
            ${n.presence ? y`<label class="inline-check" title="Treat 'off' as detected">
                  <input
                    type="checkbox"
                    .checked=${n.presence.invert ?? !1}
                    @change=${(o) => this._updateTrackerSensor(e.id, t, {
      presence: {
        entity: n.presence.entity,
        invert: o.target.checked || void 0
      }
    })}
                  />
                  invert
                </label>` : f}
          </div>` : f}
    `;
  }
};
C._nextWallMaskId = 0;
C.OPENING_GROUPS = [
  // What it is, and how it is drawn.
  // `width` and `ceilingHeight` are the skylight's two; `openingForm` only
  // offers them for one, so they cost every other opening nothing but a
  // name in this list.
  ["Shape", [
    "type",
    "motion",
    "length",
    "width",
    "ceilingHeight",
    "sash",
    "sashSpan",
    "hinge",
    "opens",
    "slide",
    "style",
    "angle"
  ]],
  // Which contacts drive it — the opening's own, before the shutter's.
  ["What it reads", ["entity", "secondaryEntity", "invert"]],
  // How it behaves toward the sun (issue #177), which is neither shape nor
  // state but gets asked about as its own thing.
  ["Sunlight", ["glazed", "sunlight"]],
  // The shutter is a layer over the opening with its own entity, style,
  // side, second contact, badge and colour — so it gets its own group
  // rather than being scattered through the others.
  ["Shutter", [
    "shutterEntity",
    "shutterStyle",
    "shutterSide",
    "shutterSecondaryEntity",
    "shutterInvert",
    "showShutterIcon",
    "shutterIcon"
  ]],
  ["Badge", ["showIcon", "icon"]],
  // No fields of its own — the opening's accent is a colour row, not an
  // ha-form field. It is listed here so it lands in the same place in the
  // order as every other panel's Color group, rather than after Behavior.
  ["Color", []],
  ["Behavior", ["tapTarget", "tap_action", "hold_action", "double_tap_action"]]
];
C.FURNITURE_GROUPS = [
  ["Shape", ["type", "hand", "w", "h", "angle"]],
  ["What it reads", ["entity"]],
  // What clicking it does — a staircase that changes floor (issue #121).
  ["Behavior", ["goToFloor", "tap_action", "hold_action", "double_tap_action"]]
];
C.TRACKER_GROUPS = [
  ["Zone", ["w", "h", "x", "y", "angle"]],
  ["Marker", ["dotSize"]]
];
C.styles = [
  Dr,
  Pt`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    /* Full-screen workspace, shown as a popover so the top layer lifts it clear
       of HA's edit dialog (whose surface is transformed — see updated()). The
       resets undo the UA popover defaults: fit-content size, auto margins, a
       solid border and padding. The fixed position only matters to the
       non-popover fallback, where the transformed dialog surface is the
       containing block — there "fullscreen" fills the dialog, not the page. */
    .editor.fullscreen {
      position: fixed;
      inset: 0;
      z-index: 100;
      width: auto;
      height: auto;
      max-width: none;
      max-height: none;
      margin: 0;
      border: none;
      padding: 12px;
      box-sizing: border-box;
      color: inherit;
      background: var(--card-background-color, #fff);
      overflow: hidden;
    }
    /* Toolbar-icon buttons (Expand/Exit, Apply) — match the gear button's
       icon+label alignment so they read as part of the toolbar. */
    .expand-toggle,
    .apply-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    /* Apply writes to the dashboard, unlike everything else in the toolbar —
       accented so it reads as the one committing action. */
    .apply-btn {
      color: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
    }
    /* Why the last Apply didn't go through; sits in the toolbar so it is
       visible in the fullscreen workspace too, where nothing else is. */
    .apply-error {
      font-size: 12px;
      color: var(--error-color, #c62828);
    }
    /* Below the two toolbars: the canvas and the element/project sections.
       Stacked at dialog width; split into canvas + docked side panel when
       expanded so the extra width isn't wasted. */
    .workspace {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }
    .side {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }
    .editor.fullscreen .workspace {
      flex-direction: row;
      align-items: stretch;
      flex: 1 1 auto;
      min-height: 0;
    }
    .editor.fullscreen .canvas-outer {
      flex: 1 1 auto;
      min-width: 0;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }
    .editor.fullscreen .canvas-wrap {
      flex: 1 1 auto;
      min-height: 0;
      height: auto;
      resize: none;
    }
    /* Docked inspector — fixed, scrollable column beside the canvas. */
    .editor.fullscreen .side {
      flex: 0 0 340px;
      overflow-y: auto;
      overflow-x: hidden;
      padding-right: 2px;
    }
    /* At real dialog width the side panel can drop below instead of squeezing
       the canvas to nothing. */
    @media (max-width: 900px) {
      .editor.fullscreen .workspace {
        flex-direction: column;
        /* Stacked panels can exceed a short viewport (phone landscape) — the
           root clips, so the workspace itself must scroll. */
        overflow-y: auto;
      }
      .editor.fullscreen .side {
        flex: 0 0 auto;
        max-height: 40vh;
      }
    }
    .toolbar {
      display: flex;
      gap: 4px;
      align-items: center;
      flex-wrap: wrap;
    }
    .toolbar .spacer {
      flex: 1;
    }
    /* generic inline cluster of related controls */
    .group {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    /* vertical rule between toolbar groups */
    .divider {
      align-self: stretch;
      width: 1px;
      min-height: 26px;
      margin: 0 4px;
      background: var(--divider-color, #e0e0e0);
    }
    /* tools rendered as a connected segmented control (one active) */
    .seg {
      display: inline-flex;
    }
    .seg button {
      border-radius: 0;
      border-left-width: 0;
    }
    .seg button:first-child {
      border-left-width: 1px;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    .seg button:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
    /* contextual second row: options/actions for the current tool or selection */
    .context-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 6px;
      padding: 5px 10px;
      min-height: 36px;
      box-sizing: border-box;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      background: var(--secondary-background-color, #f5f5f5);
    }
    .context-bar .ctx-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--primary-color, #03a9f4);
      padding-right: 8px;
      margin-right: 2px;
      border-right: 1px solid var(--divider-color, #e0e0e0);
    }
    .context-bar .ctx-hint {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .context-bar .ctx-count {
      font-size: 12px;
      color: var(--primary-text-color);
    }
    .context-bar button {
      padding: 4px 10px;
      font-size: 13px;
    }
    /* A label + input pair inline in the context bar (e.g. default Length for
       the Door/Window tools). The <label> wraps both so clicking the text
       focuses the input. */
    .context-bar .ctx-field {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .context-bar .ctx-field input.num {
      width: 60px;
    }
    /* Inline label for a control rendered loose in the context bar (e.g. the
       "Snap" word next to the segmented control). */
    .context-bar .ctx-field-label {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .context-bar input.num {
      width: 60px;
    }
    /* Thin vertical rule separating the tool-specific contents from the
       always-on Snap control on the right side of the context bar. */
    .ctx-divider {
      flex: 0 0 1px;
      align-self: stretch;
      min-height: 22px;
      margin: 0 4px;
      background: var(--divider-color, #e0e0e0);
    }
    button {
      cursor: pointer;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      border-radius: 6px;
      padding: 6px 10px;
      text-transform: capitalize;
    }
    button.active {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      border-color: var(--primary-color, #03a9f4);
    }
    button.danger {
      color: var(--error-color, #db4437);
    }
    button[disabled] {
      opacity: 0.4;
      cursor: not-allowed;
    }
    /* The canvas is focusable so keyboard shortcuts only fire while working in
       the editor; only show the ring for keyboard focus, not pointer clicks. */
    .canvas-wrap:focus {
      outline: none;
    }
    .canvas-wrap:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: -2px;
    }
    .canvas-wrap {
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      overflow: auto;
      resize: both;
      /* Size to the canvas's own aspect ratio rather than forcing a fixed
         viewport-relative height. This avoids the empty band above and below
         the grid that used to appear with the default 1000×600 canvas, and
         leaves room for the Element / Project sections below. The user can
         still drag-resize via the corner handle (resize: both). */
      min-height: 200px;
      background: var(--secondary-background-color, #f5f5f5);
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
    }
    .stage {
      position: relative;
      width: 100%;
      flex: 0 0 auto;
      margin: auto;
      touch-action: none;
    }
    svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      display: block;
    }
    svg.wall,
    svg.door,
    svg.window,
    svg.tracker,
    svg.area {
      cursor: crosshair;
    }
    .grid {
      /* Theme text colour at low opacity so the grid stays visible over a
         background image (and on both light and dark themes); non-scaling-stroke
         keeps the lines a crisp ~1px at any canvas size / zoom. Editor-only —
         the live card never draws a grid. */
      stroke: var(--fp-skin-text, var(--primary-text-color, #212121));
      stroke-opacity: 0.25;
      stroke-width: 1;
      vector-effect: non-scaling-stroke;
      /* Purely decorative — must never intercept pointers, or a press that lands
         on a grid line would capture the pointer there and break wall drawing. */
      pointer-events: none;
    }
    /* Scoped to <line> so the rule doesn't accidentally match the <svg>,
       which carries the active-tool class (e.g. "wall") on the canvas. A
       bare ".wall" selector matched the SVG too, and because pointer-events
       is inherited in SVG, setting it to none disabled the entire canvas
       — so no pointerdown reached the wall-draw handler. */
    line.wall {
      stroke: var(--fp-skin-wall, var(--primary-text-color));
      /* Same skin hooks as the card's .wall, so the canvas draws the weight
         and glow the plan will actually have. The glow itself is on
         .fp-wall-neon, outside the doorway mask — see the note there. */
      stroke-width: var(--fp-skin-wall-width, 8);
      /* The wide transparent .wall-hit line beneath handles selection/drag.
         Without this, the visible line (painted on top) swallows clicks on the
         wall body, so you could only grab it just *outside* the body. */
      pointer-events: none;
    }
    /* Neon, matching the card. Must stay on a group *outside* the doorway
       mask: CSS applies filter before mask, so a filter on the wall itself is
       computed from the uncut wall and its halo then survives the cut,
       leaving a fringe that runs through every opening (#203). */
    .fp-wall-neon {
      filter: var(--fp-skin-wall-filter, none);
    }
    /* Thin, as the card draws a railing (issue #182) — see the card's rule. */
    line.wall.railing {
      stroke-width: calc(var(--fp-skin-wall-width, 8) * 0.4);
    }
    line.wall.selected {
      stroke: var(--primary-color, #03a9f4);
    }
    line.wall.draft {
      opacity: 0.5;
      pointer-events: none;
    }
    .fp-door-leaf,
    .fp-leaf-r {
      transform-box: fill-box;
      transition: transform 0.5s ease;
    }
    .fp-door-leaf {
      transform-origin: left center;
    }
    .fp-leaf-r {
      transform-origin: right center;
    }
    .fp-door-leaf rect,
    .fp-leaf-r rect {
      transition: fill 0.5s ease;
    }
    .fp-door-arc {
      transition: stroke-dashoffset 0.5s ease, stroke 0.5s ease;
    }
    /* Roll-up curtain: scaleY must shrink onto the band's own centerline
       (the track), not the SVG origin. */
    .fp-roll-curtain {
      transform-box: fill-box;
      transform-origin: center;
    }
    .wall-hit {
      stroke: transparent;
      stroke-width: 22;
      cursor: move;
    }
    .wall-hit.side-wall-edge.ns,
    .wall.side-wall-edge.ns {
      cursor: ns-resize;
    }
    .wall-hit.side-wall-edge.ew,
    .wall.side-wall-edge.ew {
      cursor: ew-resize;
    }
    .opening-hit {
      cursor: move;
    }
    /* The skylight's grab area — invisible, but painted, which is what makes
       it hit-testable at all: a fill of none would leave the rectangle as empty
       as the floor under it. */
    .skylight-hit {
      fill: transparent;
    }
    .furn-hit {
      cursor: move;
    }
    .furn-outline {
      fill: none;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1.5;
      stroke-dasharray: 6 4;
      pointer-events: none;
    }
    /* Toolbar icons sit inline with their labels; smaller than content icons. */
    .toolbar ha-icon {
      --mdc-icon-size: 16px;
    }
    .seg button {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    /* === Popovers (floor gear, + Add). The backdrop is a fixed transparent
       layer below the popover that closes it on any outside click. === */
    .pop-wrap {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .pop {
      position: absolute;
      top: calc(100% + 6px);
      right: 0;
      z-index: 20;
      min-width: 220px;
      padding: 8px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
    }
    .pop.left {
      left: 0;
      right: auto;
    }
    .pop-backdrop {
      position: fixed;
      inset: 0;
      z-index: 19;
    }
    .pop-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;
    }
    .pop-row label {
      flex: 0 0 60px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .pop-row input,
    .pop-row select {
      flex: 1;
      min-width: 0;
      padding: 4px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
    .pop-action {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      width: 100%;
      justify-content: center;
      font-size: 13px;
    }
    .add-pop {
      min-width: 300px;
    }
    .add-entry {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      border: none;
      background: none;
      padding: 6px 8px;
      border-radius: 6px;
      text-align: left;
      font-size: 13px;
    }
    .add-entry:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    /* Search row above the grid (issue #90): the library grows with every
       contributed symbol, so the list has to be findable, not just scrollable. */
    .furn-search {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 8px;
      padding: 4px 6px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
    }
    .furn-search ha-icon {
      --mdc-icon-size: 16px;
      color: var(--secondary-text-color);
      flex: none;
    }
    .furn-search input {
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      background: none;
      font: inherit;
      font-size: 12px;
      color: var(--primary-text-color);
    }
    .add-furn-scroll {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 4px;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--divider-color, #eee);
      /* 26 built-ins already filled six rows; a community library is unbounded. */
      max-height: 46vh;
      overflow-y: auto;
    }
    .furn-group {
      grid-column: 1 / -1;
      font-size: 10px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--secondary-text-color);
      opacity: 0.8;
      padding: 4px 2px 0;
    }
    .furn-empty {
      grid-column: 1 / -1;
      padding: 10px 2px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .furn-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      border: none;
      background: none;
      padding: 6px 2px;
      border-radius: 6px;
      font-size: 11px;
      color: var(--secondary-text-color);
      text-transform: none;
    }
    .furn-cell:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }
    .furn-cell svg {
      position: static;
      width: 38px;
      height: 30px;
      display: block;
    }
    /* === Canvas chrome: the zoom overlay and first-run hint live on a
       relative wrapper OUTSIDE the scroll container so they don't scroll
       away with the stage. === */
    .canvas-outer {
      position: relative;
    }
    .zoom-overlay {
      position: absolute;
      right: 26px;
      bottom: 12px;
      z-index: 2;
      display: flex;
      gap: 4px;
    }
    .zoom-overlay button {
      display: inline-flex;
      align-items: center;
      padding: 3px 7px;
      font-size: 12px;
      background: var(--card-background-color, #fff);
    }
    .zoom-overlay ha-icon {
      --mdc-icon-size: 15px;
    }
    .zoom-val-btn {
      min-width: 46px;
      justify-content: center;
    }
    .empty-hint {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 16px;
      font-size: 14px;
      line-height: 1.6;
      color: var(--secondary-text-color);
      /* Never block the first wall being drawn straight through the hint. */
      pointer-events: none;
    }
    .floors {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .floors label {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .floors select,
    .floors .floor-name {
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      border-radius: 6px;
      padding: 6px 8px;
    }
    .floors .floor-name {
      width: 90px;
    }
    .marquee {
      fill: var(--primary-color, #03a9f4);
      fill-opacity: 0.1;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1;
      stroke-dasharray: 4 3;
      pointer-events: none;
    }
    .handle {
      fill: var(--primary-color, #03a9f4);
      stroke: var(--card-background-color, #fff);
      stroke-width: 1.5;
      cursor: grab;
    }
    .area-shared-wall {
      fill: none;
      stroke: var(--secondary-text-color, #666);
      stroke-width: 1;
      stroke-linecap: round;
      stroke-dasharray: 3 4;
      opacity: 0.22;
      pointer-events: none;
      vector-effect: non-scaling-stroke;
    }
    .area-edge-hit {
      stroke: transparent;
      stroke-width: 18;
      cursor: pointer;
      pointer-events: stroke;
    }
    .area-edge-hit.ew,
    .area-edge-handle.ew,
    .area-wall-toggle.ew {
      cursor: ew-resize;
    }
    .area-edge-hit.ns,
    .area-edge-handle.ns,
    .area-wall-toggle.ns {
      cursor: ns-resize;
    }
    .area-edge-handle.side-wall-toggle.ew,
    .area-edge-handle.side-wall-toggle.ns,
    .area-wall-toggle {
      cursor: pointer;
      fill: var(--card-background-color, #fff);
      stroke: var(--fp-skin-wall, var(--primary-text-color));
      stroke-width: 2;
      stroke-linejoin: round;
      vector-effect: non-scaling-stroke;
    }
    .area-wall-toggle.wall {
      fill: var(--fp-skin-wall, var(--primary-text-color));
      stroke: var(--fp-skin-wall, var(--primary-text-color));
    }
    .area-wall-toggle.divider {
      fill: var(--card-background-color, #fff);
      stroke-dasharray: 2 2;
    }
    .items {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    /*
     * overlayScale: plan, previewed (issue #192). The same two lines the card
     * uses, on the box that plays the same part: the stage carries the canvas
     * ratio, so 100cqw is the plan's own width on screen and --fp-u is one
     * canvas unit. Declared on .items rather than .stage for the reason the
     * card documents — an unregistered custom property substitutes as a token
     * stream, so the cqw resolves where it is used, which stays correct if
     * --fp-u is ever registered with @property.
     *
     * Zoom falls out of it rather than needing a term of its own: the stage's
     * width is a percentage of the zoom, so zooming in widens the container and
     * every canvas-unit measure grows with the drawing — which is the mode.
     */
    .stage.scale-plan {
      container-type: inline-size;
    }
    /*
     * The unit itself, declared twice on purpose.
     *
     * The fallback in var(--fp-u, 1px) is not the safety net it looks like: it
     * fires when the property is *unset*, never when its value fails to
     * resolve. A browser with no container queries parses the calc quite
     * happily -- a custom property takes almost any token stream -- and then
     * every property using it is invalid at computed-value time, so each falls
     * back to its own initial value. Width becomes auto, and a badge collapses
     * to its borders: about 3px, with its label landing on top of it because
     * the item's box collapsed with it.
     *
     * So the plain value is declared first, and the container-query one only
     * where it can actually be computed. One pixel per canvas unit is exactly
     * what overlayScale fixed draws, which is the right thing to degrade to: a
     * plan that looks like it did before canvas units existed, rather than one
     * with 3px badges.
     *
     * The guard tests the unit as well as the property, because they are two
     * features and only one of them is what the declaration is made of. A
     * browser with container-type but no cqw would pass a check for the
     * property and then fail on the value, which is the exact collapse this is
     * here to stop. Test what is actually used; it costs one more clause.
     */
    .stage.scale-plan .items {
      --fp-u: 1px;
    }
    @supports (container-type: inline-size) and (width: 1cqw) {
      .stage.scale-plan .items {
        /* overlayMinWidth clamps the unit exactly as the card does. */
        --fp-u: calc(max(100cqw, var(--fp-min-w, 0px)) / var(--fp-plan-w));
      }
    }
    /* Label padding and offsets go to em so they track the text with the plan,
       exactly as the card's own scale-plan rules do. Hairlines stay px on
       purpose there and here: below a pixel they disappear on the small cards
       this mode is for. */
    .stage.scale-plan .ilabel {
      padding: 0.08em 0.33em;
      border-radius: 0.33em;
      top: calc(100% + 0.17em);
      max-width: none;
    }
    .stage.scale-plan .ilabel-left,
    .stage.scale-plan .ilabel-right {
      top: 50%;
    }
    .stage.scale-plan .ilabel-left {
      right: calc(100% + 0.33em);
    }
    .stage.scale-plan .ilabel-right {
      left: calc(100% + 0.33em);
    }
    /* Preview of the card's shutter badge. Inherits .items' pointer-events:
       none — the opening underneath stays clickable for selection and drag. */
    .shutter-mark {
      position: absolute;
      /* transform and size are set inline, matching the card. */
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: var(--fp-skin-paper, var(--card-background-color, #fff));
      border: 1px solid var(--fp-skin-wall, var(--primary-text-color, #212121));
      color: var(--fp-skin-wall, var(--primary-text-color, #212121));
      opacity: 0.75;
    }
    .shutter-mark.on {
      color: var(--fp-active, var(--fp-skin-accent, var(--primary-color, #03a9f4)));
      border-color: var(--fp-active, var(--fp-skin-accent, var(--primary-color, #03a9f4)));
      opacity: 1;
    }
    .shutter-mark ha-icon {
      --mdc-icon-size: 15px;
      display: flex;
    }
    /* Grab area = the visible device, matching the card's hit area. A presence
       ripple is mostly empty air, and while the anchor took pointer events for
       all of it, a 110px square sat over the plan: the wall or door underneath
       could not be clicked at all, and neither could a device standing inside
       the ring. The badge and label answer instead — enough to grab and drag,
       and it puts back what was buried. */
    .edit-item {
      position: absolute;
      transform: translate(-50%, -50%);
      pointer-events: none;
      cursor: move;
      display: flex;
      flex-direction: column;
      align-items: center;
      touch-action: none;
    }
    .edit-item .badge,
    .edit-item .ilabel {
      pointer-events: auto;
    }
    .stack-icon,
    .ripple {
      pointer-events: none;
    }
    /* A ripple-only device has no badge to grab, so its centre answers. */
    .edit-item .ripple .dot {
      pointer-events: auto;
      position: relative;
    }
    .edit-item .ripple .dot::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: ${li}px;
      height: ${li}px;
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }
    .badge {
      width: 34px;
      height: 34px;
      border-radius: var(--fp-skin-badge-radius, 50%);
      background: var(--fp-skin-badge-bg, var(--card-background-color, #fff));
      border: var(--fp-skin-badge-border-width, 1.5px) solid
        var(--fp-skin-badge-border, var(--divider-color, #ccc));
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--fp-skin-text, var(--primary-text-color));
      box-shadow: var(--fp-skin-badge-shadow, 0 1px 3px rgba(0, 0, 0, 0.25));
    }
    /* Mirrors the card's .badge-value (issue #106) — the canvas must show the
       reading exactly as the plan will draw it. */
    .badge-value {
      font-weight: 600;
      line-height: 1;
      letter-spacing: -0.02em;
      white-space: nowrap;
    }
    /* Hidden on the live card right now (issue #55): faded and dashed here so
       it reads as deliberately absent from the card, while staying selectable. */
    .edit-item.card-hidden {
      opacity: 0.4;
    }
    .edit-item.card-hidden .badge {
      border-style: dashed;
    }
    .edit-item.selected .badge {
      border-color: var(--primary-color, #03a9f4);
      border-width: 2.5px;
    }
    .badge.ghost {
      opacity: 0.35;
      border-style: dashed;
    }
    .stack {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .stack-icon {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ripple {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ripple .ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid var(--fp-ripple-color);
      opacity: 0;

      /* Keep only the angular slice the ring should travel along */
      -webkit-mask: conic-gradient(
        from calc(var(--fp-ripple-direction) * 1deg - var(--fp-ripple-width) * 1deg / 2),
        #000 0deg,
        #000 calc(var(--fp-ripple-width) * 1deg),
        transparent calc(var(--fp-ripple-width) * 1deg)
      );
      mask: conic-gradient(
        from calc(var(--fp-ripple-direction) * 1deg - var(--fp-ripple-width) * 1deg / 2),
        #000 0deg,
        #000 calc(var(--fp-ripple-width) * 1deg),
        transparent calc(var(--fp-ripple-width) * 1deg)
      );
    }
    .ripple.active .ring {
      animation: fp-ripple 1.8s ease-out infinite;
    }
    .ripple .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--fp-ripple-color);
      opacity: 0.4;
    }
    .ripple.active .dot {
      opacity: 0.9;
    }
    @keyframes fp-ripple {
      0% {
        transform: scale(0.15);
        opacity: 0.7;
      }
      100% {
        transform: scale(1);
        opacity: 0;
      }
    }
    /* === Tracker (editor + card share the same animation classes). The zone
       outline is editor-only and added by renderTracker when editing:true; in
       the live card only the marker / line shows. Movement transitions are
       applied to the marker group's transform so the dot/triangle glides
       between sensor updates rather than jumping. === */
    /* Scoped to <g> so the rule doesn't also match the <svg>, which carries
       the active-tool class (e.g. "tracker") for cursor styling. A bare
       ".tracker" matched the SVG too, and pointer-events is inherited in
       SVG — so toggling the tracker tool silently killed every pointerdown
       on the canvas, breaking drag-to-draw. Same trap as line.wall above. */
    g.tracker {
      pointer-events: none;
    }
    .tracker-zone {
      transition: opacity 0.2s ease;
    }
    /* Dim the zone when a configured presence sensor reports "clear" so the
       editor visibly confirms the marker is being gated off — without this,
       a user toggling the mock presence sensor would just see the triangle
       vanish with no other feedback. */
    .tracker-zone.presence-gated {
      opacity: 0.35;
    }
    .tracker-hit {
      cursor: move;
    }
    .tracker-hit-rect {
      /* Transparent fill turns the entire zone into a pointer target for drag,
         without obscuring the dashed outline drawn by the renderer. */
      fill: transparent;
      pointer-events: all;
    }
    .tracker-outline {
      fill: none;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1.5;
      stroke-dasharray: 6 4;
      pointer-events: none;
    }
    .area-hit {
      cursor: move;
    }
    /* Dead-space hatching (issue #88): a whole region of the canvas, so it must
       never take a pointer event — it sits over the very walls and doors you
       would click next, and over empty floor you need to be able to drag on. */
    .fp-dead-space {
      pointer-events: none;
    }
    .area-hit-shape {
      /* Transparent fill turns the whole polygon into a pointer target for
         the whole-shape drag, without covering the translucent room fill
         drawn underneath by renderArea. */
      fill: transparent;
      stroke: none;
      pointer-events: all;
    }
    .area-scope-hint {
      display: flex;
      align-items: center;
      gap: 6px;
      margin: 0 0 6px;
      color: var(--primary-color, #03a9f4);
    }
    .area-scope-hint .link-btn {
      border: none;
      background: none;
      padding: 0 2px;
      font: inherit;
      color: var(--primary-color, #03a9f4);
      text-decoration: underline;
      cursor: pointer;
      flex: 0 0 auto;
    }
    .area-scope-hint ha-icon {
      --mdc-icon-size: 16px;
      flex: 0 0 auto;
    }
    .area-outline {
      fill: none;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 2;
      pointer-events: none;
    }
    /* The room currently scoping the selected element's entity picker: a
       breathing tint plus marching-ants border, so "you are working inside
       the Kitchen — that's why the picker is short" reads at a glance. */
    .area-scoping {
      fill: var(--primary-color, #03a9f4);
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 2.5;
      stroke-dasharray: 10 6;
      pointer-events: none;
      animation: fp-area-breathe 2.2s ease-in-out infinite,
        fp-area-ants 1.4s linear infinite;
    }
    @keyframes fp-area-breathe {
      0%,
      100% {
        fill-opacity: 0.1;
      }
      50% {
        fill-opacity: 0.28;
      }
    }
    @keyframes fp-area-ants {
      to {
        stroke-dashoffset: -16;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .area-scoping {
        animation: none;
        fill-opacity: 0.2;
      }
    }
    .area-draft-line {
      fill: none;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 2;
      stroke-dasharray: 6 4;
      pointer-events: none;
    }
    .area-draft-hover {
      fill: none;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1.5;
      stroke-dasharray: 3 4;
      opacity: 0.7;
      pointer-events: none;
    }
    .area-draft-point {
      fill: var(--primary-color, #03a9f4);
      stroke: var(--card-background-color, #fff);
      stroke-width: 1.5;
      pointer-events: none;
    }
    .area-draft-start {
      fill: var(--card-background-color, #fff);
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 2;
      pointer-events: none;
    }
    /* Light pools are decoration: they must never intercept a pointer. These
       are filled circles drawn above the areas, so without this they swallow
       pointerdown and areas under a lit lamp cannot be selected (issue #108).
       The blend rules mirror the card's, so the editor previews the same
       picture it will render — overlapping lamps add rather than stack. */
    .fp-glows {
      isolation: isolate;
      pointer-events: none;
    }
    .fp-glow {
      mix-blend-mode: screen;
    }
    /* Radius guide for the selected cast-light device (issue #108). Outline
       only — it shows how far the light reaches without pretending it is on. */
    .glow-guide {
      fill: none;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1.5;
      stroke-dasharray: 6 5;
      opacity: 0.7;
      pointer-events: none;
    }
    .tracker-draft {
      fill: var(--primary-color, #03a9f4);
      fill-opacity: 0.08;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1.5;
      stroke-dasharray: 6 4;
      pointer-events: none;
    }
    .tracker-marker {
      transition: transform 0.4s ease-out;
      transform-box: fill-box;
    }
    .tracker-dot {
      animation: fp-tracker-pulse 1.4s ease-in-out infinite;
      transform-box: fill-box;
      transform-origin: center;
    }
    .tracker-ring {
      animation: fp-tracker-ring 2.2s ease-out infinite;
      opacity: 0;
    }
    .tracker-line {
      transition: transform 0.4s ease-out;
    }
    .tracker-line-stroke {
      opacity: 0.45;
      animation: fp-tracker-pulse 1.6s ease-in-out infinite;
    }
    .tracker-band {
      opacity: 0;
      animation: fp-tracker-band 2.2s ease-out infinite;
    }
    .tracker-placeholder {
      opacity: 0.6;
    }
    @keyframes fp-tracker-pulse {
      0%,
      100% {
        transform: scale(0.9);
        opacity: 0.7;
      }
      50% {
        transform: scale(1.1);
        opacity: 1;
      }
    }
    @keyframes fp-tracker-ring {
      0% {
        r: 0;
        opacity: 0.7;
      }
      100% {
        r: var(--fp-tracker-ring-max, 60px);
        opacity: 0;
      }
    }
    @keyframes fp-tracker-band {
      0% {
        opacity: 0.5;
        stroke-width: 1.5;
      }
      100% {
        opacity: 0;
        stroke-width: 14;
      }
    }
    .edit-text {
      position: absolute;
      pointer-events: auto;
      cursor: move;
      white-space: nowrap;
      font-weight: 500;
      line-height: 1;
      padding: 2px;
      touch-action: none;
    }
    .edit-text.selected {
      outline: 1.5px dashed var(--primary-color, #03a9f4);
      outline-offset: 2px;
    }
    ha-icon {
      --mdc-icon-size: 22px;
    }
    /* Icon motion while the entity is active (issue #48) — matches the card. */
    ha-icon.anim-spin {
      animation: fp-icon-spin 2s linear infinite;
    }
    ha-icon.anim-pulse {
      animation: fp-icon-pulse 1.6s ease-in-out infinite;
    }
    @keyframes fp-icon-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    @keyframes fp-icon-pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      ha-icon.anim-spin,
      ha-icon.anim-pulse {
        animation: none;
      }
    }
    .ilabel {
      /* Out of flow, hanging below the badge: the label must not change the
         element's box, so badges anchor on (x, y) whether or not a label
         renders — icons stay aligned (issue #34) and match the card. */
      position: absolute;
      top: calc(100% + 2px);
      left: 50%;
      transform: translateX(-50%);
      font-size: 11px;
      line-height: 1;
      padding: 1px 4px;
      border-radius: 4px;
      background: var(--fp-skin-badge-bg, var(--card-background-color, #fff));
      color: var(--secondary-text-color);
      white-space: nowrap;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    /* Label beside the badge (issue #180), mirroring the card's own rule so
       moving it here shows what the card will do rather than only what the
       config now says. */
    .ilabel-left,
    .ilabel-right {
      top: 50%;
      transform: translateY(-50%);
    }
    .ilabel-left {
      left: auto;
      right: calc(100% + 4px);
    }
    .ilabel-right {
      left: calc(100% + 4px);
    }
    /* The card's own label line, drawn as the card draws it (issue #135):
       full-strength ink, and no width clamp — the card has none, and clipping
       is exactly what would make a long label look right here and wrong live.
       The unclamped variant is the one you are checking; the dim fallback
       above stays clamped, being editor chrome rather than a preview. */
    .ilabel.live {
      color: var(--fp-skin-text, var(--primary-text-color));
      max-width: none;
      overflow: visible;
    }
    /* An extra-reading row (issue #180): the entity picker takes the space and
       the attribute box stays narrow beside it, the same proportions the
       state-rule rows use for their condition and colour. */
    .item-reading ha-entity-picker,
    .item-reading input[type="text"]:not(.reading-attr) {
      flex: 1 1 auto;
      min-width: 0;
    }
    .item-reading .reading-attr {
      flex: 0 0 130px;
      min-width: 0;
    }
    /* The visibility toggle belongs to the entity row above it, so it sits
       tight under it and the gap goes after the pair instead. */
    .reading-show {
      margin-top: -4px;
      margin-bottom: 12px;
      padding-left: 4px;
    }
    .reading-show label {
      flex: 0 0 auto;
      font-size: 12px;
      /* Holds the checkbox it wraps, so the pair reads as one control and the
         whole thing is a click target. */
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }
    /* The panel ("Project" config) and the new element-edit area share the
       same boxed look so the two sections below the canvas read as siblings. */
    .panel,
    .edit-area {
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 8px;
      padding: 10px;
    }
    .section-title {
      margin: 0 0 8px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--secondary-text-color);
    }
    /* Element header: kind icon + summary + the selection's actions.
       The actions are the fixed part and the summary is the elastic one: a
       device named after a long entity id used to push Duplicate and Delete
       off the panel entirely (issue #163), which is unreachable rather than
       merely ugly. So everything but the title refuses to shrink, and the
       title truncates instead — its full text stays available on hover. */
    .edit-head {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
    }
    .edit-head ha-icon {
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color);
      flex: none;
    }
    .edit-head .edit-title {
      font-size: 13px;
      font-weight: 600;
      /* min-width:0 is what lets a flex item shrink below its content. */
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .edit-head .head-spacer {
      /* Grows to push the actions right, but never shrinks the title away
         while there is still slack of its own to give back. */
      flex: 1 1 0;
      min-width: 0;
    }
    .edit-head button {
      display: inline-flex;
      align-items: center;
      padding: 4px 8px;
      flex: none;
    }
    .edit-head button ha-icon {
      --mdc-icon-size: 16px;
      color: inherit;
    }
    /* Lock in place (issue #191). The pressed state has to read at a glance:
       it is the only one of these buttons that describes a state rather than
       performing an action, and "why won't this drag" is the question it
       exists to answer. */
    .edit-head button.on {
      color: var(--primary-color);
    }
    /* Collapsible Project section header. */
    .section-toggle {
      display: flex;
      align-items: center;
      gap: 6px;
      width: 100%;
      border: none;
      background: none;
      padding: 2px 0;
      margin: 0;
      cursor: pointer;
      color: var(--secondary-text-color);
      text-align: left;
    }
    .section-toggle ha-icon {
      --mdc-icon-size: 16px;
    }
    .section-toggle .section-title-inline {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .section-toggle .section-summary {
      font-size: 12px;
      color: var(--secondary-text-color);
      opacity: 0.8;
      text-transform: none;
    }
    .panel-body {
      margin-top: 10px;
    }
    /* Field rows flow into responsive columns so the below-canvas sections
       stay short at HA-dialog width (~700px fits two columns). Rows that
       need the full width (entity pickers, long hints) opt out via .wide. */
    .rows {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      column-gap: 16px;
      align-items: start;
    }
    .rows .row.wide,
    .rows > .hint,
    .rows > p {
      grid-column: 1 / -1;
    }
    /* ---- Element panel groups --------------------------------------------
       The device panel is two dozen controls; ungrouped, finding one meant
       reading all of them. Each group is a heading and a hairline above it,
       with real space between groups so the eye can skip a whole section it
       does not want.

       The rule is on the group rather than between them, and the first group
       drops it: a line above the very first heading would read as a border
       around the panel rather than as a separator inside it. */
    .cfg-group {
      border-top: 1px solid var(--divider-color, #e0e0e0);
      padding-top: 14px;
      margin-top: 18px;
    }
    /* A collapsed group is one line, and a column of one-line headings wants
       to read as a list rather than as eight things with a gap each. */
    .cfg-group:not(.open) {
      padding-top: 8px;
      margin-top: 8px;
    }
    /* Ties with the rule above on specificity, so it has to stay below it:
       the first group leads the panel and takes no space above it whether it
       is open or shut. */
    .cfg-group:first-of-type {
      border-top: none;
      padding-top: 0;
      margin-top: 0;
    }
    /* The heading names the group without competing with the field labels
       beneath it: same size, but the primary ink and a little letter-spacing,
       so it reads as a heading rather than as one more row label.

       It is also the group's disclosure control, so it undoes the panel's
       generic button look (border, chip padding, capitalize — which would
       print "What it reads" as "What It Reads") and keeps the heading's own
       type. Full width so the whole line is the hit target, not just the
       glyph. */
    .cfg-group-title {
      display: flex;
      align-items: center;
      gap: 4px;
      width: 100%;
      margin: 0 0 10px;
      padding: 2px 0;
      border: none;
      border-radius: 0;
      background: none;
      cursor: pointer;
      text-align: left;
      text-transform: none;
      font: inherit;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.02em;
      color: var(--primary-text-color);
    }
    /* The chevron is the affordance, so it stays quieter than the title it
       points at. */
    .cfg-group-title ha-icon {
      --mdc-icon-size: 18px;
      flex: none;
      color: var(--secondary-text-color);
    }
    /* ha-form packs its own fields tightly; the last one in a group should not
       sit flush against the next group's rule. */
    .cfg-group > *:last-child {
      margin-bottom: 0;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 8px;
    }
    .row label {
      flex: 0 0 90px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .row input[type="text"],
    .row input[type="number"],
    .row select {
      flex: 1;
      min-width: 0;
      padding: 4px 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
    }
    ha-entity-picker,
    ha-icon-picker,
    ha-combo-box {
      flex: 1;
      min-width: 0;
    }
    .row input.num {
      flex: 0 0 64px;
    }
    /* Paste-a-symbol block (issue #90): a stacked row, since a JSON blob does
       not fit the label-then-control shape the rest of the panel uses. */
    .row.col {
      flex-direction: column;
      align-items: stretch;
    }
    .row.col > label {
      flex: none;
      margin-bottom: 2px;
    }
    .symbol-input {
      width: 100%;
      box-sizing: border-box;
      padding: 6px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-family: var(--code-font-family, ui-monospace, monospace);
      font-size: 11px;
      resize: vertical;
    }
    .symbol-list {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 6px;
    }
    .symbol-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 6px;
      border-radius: 10px;
      font-size: 11px;
      background: var(--secondary-background-color, #f2f2f2);
      color: var(--primary-text-color);
    }
    .symbol-chip button.chip-x {
      border: none;
      background: none;
      padding: 0;
      font-size: 11px;
      line-height: 1;
      color: var(--secondary-text-color);
    }
    .symbol-actions button[disabled] {
      opacity: 0.5;
      cursor: default;
    }
    .symbol-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 6px;
      font-size: 12px;
    }
    .symbol-actions a {
      color: var(--secondary-text-color);
    }
    .symbol-error {
      margin-top: 4px;
      font-size: 11px;
      color: var(--error-color, #c62828);
    }
    /* Compact inline checkbox+label used inside a .row that already has its
       primary <label> on the left (e.g. the Tracker sensor "invert" toggle). */
    .row .inline-check {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .hint {
      font-size: 13px;
      color: var(--secondary-text-color);
      line-height: 1.5;
    }
    /* The Area name's status line (Linked chip / hint). It sits on its own row
       under the field rather than beside it: the docked inspector is only
       340px wide in full screen, and a chip + hint sharing that row squeezed
       the name box down to a sliver. The empty label keeps it aligned with the
       field above, and -4px claws back the row's own bottom margin so the pair
       still reads as one control. */
    .area-name-status {
      margin-top: -4px;
    }
    /* "Color by state" rules (issues #68, #79, #82). The rules are a list, so
       they read as one group indented under the heading row rather than as
       more loose fields; the rail is what says "these belong together" in a
       340px panel where indentation alone is too expensive. */
    .state-colors {
      margin-bottom: 4px;
    }
    .state-colors label {
      flex: 1 1 auto;
      font-weight: 500;
    }
    .state-color-rule,
    .state-color-add {
      padding-left: 8px;
      border-left: 2px solid var(--divider-color, #ccc);
      margin-bottom: 6px;
    }
    /* The docked inspector is only 340px wide, so a rule's condition and its
       colour cannot share a line without crushing both. Wrap onto two lines
       instead of squeezing — the fullscreen visibility complaint. */
    .row.state-color-rule {
      flex-wrap: wrap;
      row-gap: 4px;
    }
    .rule-note {
      margin: 0 0 6px;
      font-style: italic;
    }
    /* The canvas preview mirrors the card: a resolved state colour paints the
       badge whether or not the entity reads "on". */
    .edit-item .badge.state-colored {
      background: var(--fp-state);
      border-color: var(--fp-state);
      color: var(--fp-ink, var(--text-primary-color, #212121));
    }
    /* An active device, painted exactly as the card paints it (issue #106):
       the device's active colour, else a colour-capable bulb's own, else the
       theme's active yellow — the same fallback chain as .item.on .badge.
       The canvas previewed none of this before, so setting "Active color"
       changed nothing here and a coloured lamp looked plain. Below
       .state-colored, which is the more specific statement. */
    .edit-item .badge.active-colored {
      background: var(--fp-active, var(--fp-skin-active, var(--state-light-active-color, var(--state-active-color, #fdd835))));
      border-color: var(--fp-active, var(--fp-skin-active, var(--state-light-active-color, var(--state-active-color, #fdd835))));
      color: var(--fp-ink, var(--fp-skin-active-ink, var(--text-primary-color, #212121)));
    }
    /* The off colour, previewed as the card paints it (issue #228). Below
       .active-colored and .state-colored in the same order the card uses. */
    .edit-item .badge.inactive-colored {
      background: var(--fp-inactive);
      border-color: var(--fp-inactive);
      color: var(--fp-ink, var(--text-primary-color, #212121));
    }
    /* The floor switcher's drag handle (issue #281). Drawn as the switcher it
       stands for rather than as a generic grip, so what you drag looks like
       what you are placing — and centred on its anchor, which is what makes
       the drop land where the pointer is. */
    .switcher-handle {
      position: absolute;
      /* The overlay it sits in is pointer-events:none so clicks reach the
         canvas underneath; anything in there that is meant to be grabbed has
         to turn them back on for itself. Without this the handle drew
         perfectly and could not be picked up at all. */
      pointer-events: auto;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      gap: 3px;
      cursor: grab;
      touch-action: none;
      z-index: 4;
    }
    /* Only the Select tool moves the switcher, so under a drawing tool the
       handle is just in the way: it sits above the canvas and would swallow a
       wall, door or area gesture started beneath it, since its own pointerdown
       handler ignores every tool but Select. It stays visible, as the footprint
       the card's buttons will cover, and lets the pointer through. */
    .switcher-handle.passive {
      pointer-events: none;
      cursor: default;
    }
    .switcher-handle.dragging {
      cursor: grabbing;
    }
    /* Compact chrome lays the card's buttons across a row rather than down a
       column (issue #152), and the handle has to agree: its whole job is to
       show the footprint the block will have, and a column standing in for a
       row can sit happily in a gap the real thing overflows. Wrapped and
       centred for the same reason the card's is wrapped — eight floors is
       exactly the case a row is worst at. */
    .switcher-handle.row {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      max-width: 50%;
    }
    /* Dimmed until it has been placed, so the canvas does not claim a position
       is stored when none is. Its tooltip says the same thing in words. */
    .switcher-handle.default {
      opacity: 0.55;
    }
    .switcher-handle .sh-btn {
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      border-radius: 6px;
      padding: 3px 7px;
      font-size: 11px;
      line-height: 1;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      max-width: 110px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      pointer-events: none;
    }
    .switcher-handle .sh-btn.active {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      border-color: var(--primary-color, #03a9f4);
    }
    .state-color-rule select {
      flex: 0 0 96px;
    }
    /* Higher specificity than the generic .row input rule above, which would
       otherwise stretch a two-digit threshold across half the panel. */
    .row.state-color-rule input.cond {
      flex: 0 0 90px;
    }
    .row.state-color-rule span.cond {
      flex: 0 0 auto;
      font-size: 12px;
      white-space: nowrap;
    }
    /* The color text box gives up width first — the condition and the swatch
       are what you read, and the swatch already shows the colour. */
    .row.state-color-rule input.rule-color-text {
      flex: 1 1 60px;
      min-width: 60px;
    }
    /* The optional icon (issue #106) takes the rule's second line rather than
       competing for the first: the condition and the colour are what you scan,
       and an icon picker needs room for its name to be readable. */
    .row.state-color-rule .rule-icon {
      flex: 1 1 100%;
      min-width: 0;
    }
    /* Named colours (issue #265). The dropdown is the narrowest control in
       the row and never grows: it holds short names, and the swatch beside it
       is what you actually read the colour off. It is absent entirely on a
       plan with no palette, so these rules cost an unpalettised editor
       nothing. */
    .row select.palette-pick {
      flex: 0 1 96px;
      min-width: 0;
    }
    .palette-panel {
      gap: 6px;
    }
    /* The name leads — it is what the dropdowns elsewhere will show — and the
       colour text box gives up width first, exactly as a state rule's does. */
    .row.palette-row input.palette-name {
      flex: 1 1 90px;
      min-width: 60px;
    }
    .row.palette-row input.palette-color {
      flex: 1 1 60px;
      min-width: 60px;
    }
    .palette-row .rule-remove,
    .state-color-rule .rule-remove,
    .state-color-add button {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 4px;
      background: var(--card-background-color, #fff);
      color: var(--secondary-text-color);
      cursor: pointer;
      padding: 3px 6px;
    }
    .state-color-rule .rule-remove {
      flex: 0 0 auto;
    }
    .state-color-rule .rule-remove ha-icon,
    .state-color-add button ha-icon {
      --mdc-icon-size: 16px;
    }
    .area-name-status label {
      /* Alignment spacer only — nothing to announce. */
      flex: 0 0 90px;
    }
    /* "Linked" badge on the Area name row: the HA-area association is implied
       by the name matching, so it needs to be visible somewhere. */
    .ha-link-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 4px 2px 8px;
      border-radius: 999px;
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
    }
    .ha-link-chip ha-icon {
      --mdc-icon-size: 14px;
    }
    .ha-link-chip .unlink {
      display: inline-flex;
      align-items: center;
      padding: 0;
      border: none;
      background: none;
      color: inherit;
      cursor: pointer;
      opacity: 0.85;
    }
    .ha-link-chip .unlink:hover {
      opacity: 1;
    }
  `
];
O([
  W({ attribute: !1 })
], C.prototype, "hass", 2);
O([
  F()
], C.prototype, "_config", 2);
O([
  F()
], C.prototype, "_tool", 2);
O([
  F()
], C.prototype, "_selection", 2);
O([
  F()
], C.prototype, "_activeFloorId", 2);
O([
  F()
], C.prototype, "_draft", 2);
O([
  F()
], C.prototype, "_draftTracker", 2);
O([
  F()
], C.prototype, "_draftArea", 2);
O([
  F()
], C.prototype, "_areaHover", 2);
O([
  F()
], C.prototype, "_areaDragStart", 2);
O([
  F()
], C.prototype, "_areaDragMoved", 2);
O([
  F()
], C.prototype, "_freeWalls", 2);
O([
  F()
], C.prototype, "_defaultOpeningLength", 2);
O([
  F()
], C.prototype, "_defaultSkylightLength", 2);
O([
  F()
], C.prototype, "_defaultSkylightWidth", 2);
O([
  F()
], C.prototype, "_marquee", 2);
O([
  F()
], C.prototype, "_history", 2);
O([
  F()
], C.prototype, "_future", 2);
O([
  F()
], C.prototype, "_zoom", 2);
O([
  F()
], C.prototype, "_floorMenuOpen", 2);
O([
  F()
], C.prototype, "_addMenuOpen", 2);
O([
  F()
], C.prototype, "_addQuery", 2);
O([
  F()
], C.prototype, "_symbolDraft", 2);
O([
  F()
], C.prototype, "_symbolError", 2);
O([
  F()
], C.prototype, "_paletteError", 2);
O([
  F()
], C.prototype, "_switcherDrag", 2);
O([
  F()
], C.prototype, "_projectOpen", 2);
O([
  F()
], C.prototype, "_openGroups", 2);
O([
  F()
], C.prototype, "_fullscreen", 2);
O([
  F()
], C.prototype, "_applyState", 2);
O([
  F()
], C.prototype, "_applyError", 2);
O([
  Cn(".editor")
], C.prototype, "_editorEl", 2);
O([
  Cn("svg")
], C.prototype, "_svg", 2);
O([
  Cn(".canvas-wrap")
], C.prototype, "_canvasWrap", 2);
O([
  F()
], C.prototype, "_hideLabels", 2);
C = O([
  ki("easy-floorplan-card-editor")
], C);
const Ig = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get FloorplanCardEditor() {
    return C;
  }
}, Symbol.toStringTag, { value: "Module" })), Pg = "0.7.2", $n = window;
$n.customCards = $n.customCards || [];
$n.customCards.push({
  type: "easy-floorplan-card",
  name: "Easy Floorplan",
  description: "Draw a floorplan with walls, doors, windows, furniture and text, then place device/light controls with a visual editor.",
  preview: !1,
  documentationURL: "https://github.com/nicosandller/easy-floorplan"
});
console.info(
  `%c EASY-FLOORPLAN %c ${Pg} `,
  "background:#03a9f4;color:#fff",
  "color:#03a9f4"
);
export {
  se as FloorplanCard
};
