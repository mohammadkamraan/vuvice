var f = Object.defineProperty;
var v = (s, e, r) => e in s ? f(s, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : s[e] = r;
var a = (s, e, r) => (v(s, typeof e != "symbol" ? e + "" : e, r), r);
import { ref as b, computed as d } from "vue";
class g {
  constructor() {
    a(this, "observers", []);
  }
  attach(e) {
    this.observers.push(e);
  }
  detach(e) {
    this.observers = this.observers.filter(
      (r) => r !== e
    );
  }
  notify() {
    for (const e of this.observers)
      e.update(this);
  }
}
const l = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Map();
function p() {
  const s = b();
  let e = null;
  function r(t) {
    e = t;
  }
  const o = d(() => s.value);
  function h(t) {
    if (!l.has(t)) {
      let u = function(i) {
        s.value = i;
      };
      c.set(t, u), e == null || e.attach(u);
    }
    l.add(t);
  }
  function n(t) {
    const u = c.get(t);
    u && (e == null || e.detach(u), c.delete(t));
  }
  return {
    getValue: o,
    attach: h,
    detach: n,
    setObserver: r,
    updaters: c
  };
}
function V(s, e) {
  return function(o, h, n) {
    const t = p();
    function u(i) {
      return t.setObserver(this[s]), t.attach(i), {
        value: t.updaters.has(i) ? e(t.getValue.value) : this[s].getValue(),
        unSubscribe: t.detach
      };
    }
    n.value = u;
  };
}
class x {
  constructor(e) {
    a(this, "_value");
    a(this, "observers", []);
    this.next(e);
  }
  attach(e) {
    this.observers.push(e);
  }
  detach(e) {
    this.observers = this.observers.filter((r) => r !== e);
  }
  notify() {
    for (const e of this.observers)
      typeof e == "function" ? e(this._value) : e.update(this._value);
  }
  next(e) {
    typeof e == "function" ? this._value = e(this._value) : this._value = e, this.notify();
  }
  getValue() {
    return this._value;
  }
}
export {
  g as AbstractSubject,
  x as BehaviorSubject,
  V as UiSync,
  p as useUiSync
};
