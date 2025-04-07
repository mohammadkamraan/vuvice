var b = Object.defineProperty;
var d = (e, t, s) => t in e ? b(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var o = (e, t, s) => (d(e, typeof t != "symbol" ? t + "" : t, s), s);
import { ref as f, computed as v, getCurrentInstance as p, onBeforeMount as S, onBeforeUnmount as g } from "vue";
const h = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Map();
function y() {
  const e = f();
  let t = null;
  function s(u) {
    t = u;
  }
  const r = v(() => e.value);
  function a(u) {
    if (!h.has(u)) {
      let n = function(i) {
        e.value = i;
      };
      c.set(u, n), t == null || t.attach(n);
    }
    h.add(u);
  }
  function l(u) {
    const n = c.get(u);
    n && (t == null || t.detach(n), c.delete(u));
  }
  return {
    getValue: r,
    attach: a,
    detach: l,
    setObserver: s,
    updaters: c
  };
}
function m(e, t) {
  return function(r, a, l) {
    const u = y();
    function n(i) {
      return u.setObserver(this[e]), u.attach(i), {
        value: u.updaters.has(i) ? t(u.getValue.value) : this[e].getValue(),
        unSubscribe: u.detach
      };
    }
    l.value = n;
  };
}
function x() {
  const e = p();
  return {
    uuId: e == null ? void 0 : e.uid.toString()
  };
}
function B(e) {
  const t = f(e.getValue());
  function s(a) {
    t.value = a;
  }
  const r = v(() => t.value);
  return S(() => {
    e.attach(s);
  }), g(() => {
    e.detach(s);
  }), {
    getValue: r
  };
}
class C {
  constructor(t) {
    o(this, "_value");
    o(this, "observers", []);
    this.next(t);
  }
  attach(t) {
    this.observers.push(t);
  }
  detach(t) {
    this.observers = this.observers.filter((s) => s !== t);
  }
  notify() {
    for (const t of this.observers)
      typeof t == "function" ? t(this._value) : t.update(this._value);
  }
  next(t) {
    typeof t == "function" ? this._value = t(this._value) : this._value = t, this.notify();
  }
  getValue() {
    return this._value;
  }
}
class j {
  constructor() {
    o(this, "observers", []);
  }
  attach(t) {
    this.observers.push(t);
  }
  detach(t) {
    this.observers = this.observers.filter(
      (s) => s !== t
    );
  }
  notify() {
    for (const t of this.observers)
      t.update(this);
  }
}
export {
  j as AbstractSubject,
  C as BehaviorSubject,
  m as UiSync,
  x as useComponentId,
  B as useSubscribe,
  y as useUiSync
};
