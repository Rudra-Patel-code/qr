(function () {
    var l, C, u, s, t;
    l = {
        addListener: function (a, c, b) {
            a.addEventListener
                ? a.addEventListener(c, b, !1)
                : a.attachEvent && a.attachEvent("on" + c, b);
        },
        removeListener: function (a, c, b) {
            a.removeEventListener
                ? a.removeEventListener(c, b, !1)
                : a.detachEvent && a.detachEvent("on" + c, b);
        },
        getFirstChildWithClass: function (a, c) {
            var b, f, g;
            b = RegExp("(^|\\s)" + c + "(\\s|$)");
            for (g = 0; g < a.childNodes.length; g++)
                if (((f = a.childNodes[g]), b.test(f.className))) return f;
        },
        getElementsByClassName: function (a, c, b) {
            this.getElementsByClassName = document.getElementsByClassName
                ? function (a, g, b) {
                      b = b || document;
                      a = b.getElementsByClassName(a);
                      g = g ? RegExp("\\b" + g + "\\b", "i") : null;
                      b = [];
                      var c, d, e;
                      d = 0;
                      for (e = a.length; d < e; d += 1)
                          (c = a[d]), (g && !g.test(c.nodeName)) || b.push(c);
                      return b;
                  }
                : document.evaluate
                ? function (a, b, c) {
                      b = b || "*";
                      c = c || document;
                      var h = a.split(" "),
                          d = "",
                          e =
                              "http://www.w3.org/1999/xhtml" ===
                              document.documentElement.namespaceURI
                                  ? "http://www.w3.org/1999/xhtml"
                                  : null;
                      a = [];
                      var m, k, l;
                      k = 0;
                      for (l = h.length; k < l; k += 1)
                          d +=
                              "[contains(concat(' ', @class, ' '), ' " +
                              h[k] +
                              " ')]";
                      try {
                          m = document.evaluate(".//" + b + d, c, e, 0, null);
                      } catch (q) {
                          m = document.evaluate(
                              ".//" + b + d,
                              c,
                              null,
                              0,
                              null
                          );
                      }
                      for (; (b = m.iterateNext()); ) a.push(b);
                      return a;
                  }
                : function (a, b, c) {
                      b = b || "*";
                      c = c || document;
                      var h = a.split(" ");
                      a = [];
                      b =
                          "*" === b && c.all
                              ? c.all
                              : c.getElementsByTagName(b);
                      c = [];
                      var d, e, l, k, p;
                      d = 0;
                      for (e = h.length; d < e; d += 1)
                          a.push(RegExp("(^|\\s)" + h[d] + "(\\s|$)"));
                      e = 0;
                      for (l = b.length; e < l; e += 1) {
                          h = b[e];
                          d = !1;
                          k = 0;
                          for (
                              p = a.length;
                              k < p && ((d = a[k].test(h.className)), d);
                              k += 1
                          );
                          d && c.push(h);
                      }
                      return c;
                  };
            return this.getElementsByClassName(a, c, b);
        },
    };
    C = function (a) {
        var c, b, f, g, n, h, d, e, m, k, p;
        e = function (a) {
            return a < b ? b : a > f ? f : (a = Math.floor(a + 0.5));
        };
        m = function () {
            c.style.left = ((g - b) * h) / (f - b) + "px";
        };
        k = function (a) {
            a = a || window.event;
            a.preventDefault && a.preventDefault();
            a = a.clientX - d.x;
            a += d.k;
            a = 0 > a ? 0 : a;
            a = a > h ? h : a;
            c.style.left = a + "px";
            a = b + (a * (f - b)) / h;
            a = Math.floor(a + 0.5);
            a !== g && ((g = a), n && n(a));
            return !1;
        };
        p = function () {
            l.removeListener(document, "mouseup", p);
            l.removeListener(document, "mousemove", k);
            m();
            return !1;
        };
        c = l.getFirstChildWithClass(a, "knob");
        b = 0;
        f = 100;
        g = 0;
        (function (a) {
            var b, c;
            b = c = 0;
            if (a.offsetParent)
                for (b = a.offsetLeft, c = a.offsetTop; (a = a.offsetParent); )
                    (b += a.offsetLeft), (c += a.offsetTop);
            return [b, c];
        })(a);
        h = a.clientWidth - c.clientWidth;
        c.style.position = "relative";
        m();
        l.addListener(c, "mousedown", function (a) {
            a = a || window.event;
            a.preventDefault && a.preventDefault();
            var b = parseInt(c.style.left, 10);
            d = {
                x: a.clientX,
                k: b,
            };
            l.addListener(document, "mouseup", p);
            l.addListener(document, "mousemove", k);
            return !1;
        });
        return {
            setValue: function (a) {
                g = e(a);
                m();
                return this;
            },
            getValue: function () {
                return g;
            },
            setMin: function (a) {
                b = a;
                return this;
            },
            setMax: function (a) {
                f = a;
                return this;
            },
            setListener: function (a) {
                n = a;
                return this;
            },
        };
    };
    u = function (a, c) {
        var b, f, g, n, h, d;
        h = function () {
            b
                ? c()
                : ((b = !0),
                  window.clearInterval(f),
                  (f = window.setInterval(h, n)));
        };
        d = function () {
            window.clearInterval(f);
        };
        g = 750;
        n = 75;
        l.addListener(a, "mousedown", function () {
            b = !1;
            c();
            f = window.setInterval(h, g);
        });
        l.addListener(a, "mouseup", d);
        l.addListener(a, "mouseout", d);
        l.addListener(a, "keydown", function (a) {
            a = a || window.event;
            32 === a.keyCode && c();
        });
        return {
            setInitDelay: function (a) {
                g = a;
                return this;
            },
            setRepeatDelay: function (a) {
                n = a;
                return this;
            },
        };
    };
    s = function (a) {
        var c, b, f, g, n, h, d, e, m, k, p, q, r;
        e = function () {
            var b, c;
            f = (f + g) % g;
            for (b = c = 0; b < k.length; b++) f >= k[b].iframe && (c = b);
            b = f - k[c].iframe;
            r != c && ((a.style.backgroundImage = k[c].img), (r = c));
            a.style.backgroundPosition = "0px -" + b * d + "px";
        };
        m = function () {
            f += 1;
            e();
        };
        c = !1;
        h = 0;
        b = 10;
        f = 0;
        g = 16;
        r = -1;
        k = [];
        (n = /\baepframes_(\d+)\b/.exec(a.className)) &&
            (g = parseInt(n[1], 10));
        k.push({
            iframe: 0,
            img: a.style.backgroundImage,
        });
        p = l.getElementsByClassName("aeplayer_ext", "div", a);
        for (q = 0; q < p.length; q++)
            (n = /\aepinitframe_(\d+)\b/.exec(p[q].className)) &&
                k.push({
                    iframe: parseInt(n[1], 10),
                    img: p[q].style.backgroundImage,
                });
        d = a.clientHeight;
        return {
            play: function () {
                c ||
                    (h && window.clearInterval(h),
                    (h = window.setInterval(m, 1e3 / b)),
                    (c = !0));
                return this;
            },
            pause: function () {
                c && (window.clearInterval(h), (h = 0), (c = !1));
                return this;
            },
            isPaused: function () {
                return !c;
            },
            setFrame: function (a) {
                c || ((f = a), e());
                return this;
            },
            getFrame: function () {
                return f;
            },
            setRate: function (a) {
                b = a;
                c && (this.pause(), this.play());
                return this;
            },
            getRate: function () {
                return b;
            },
            setFrameCount: function (a) {
                g = a;
                return this;
            },
            getFrameCount: function () {
                return g;
            },
            getPlayerDiv: function () {
                return a;
            },
        };
    };
    t = function (a, c) {
        var b, f, g, n, h, d, e, m, k, p, q, r, s, v, t, D, w, x, y, z, A, B;
        A = function () {
            h &&
                (a.isPaused()
                    ? (h.innerHTML = z.replace("%d", a.getFrame()))
                    : (h.innerHTML = y.replace("%d", a.getRate())));
        };
        B = function () {
            f &&
                (a.isPaused()
                    ? ((f.className = "playpause play"), (f.innerHTML = w))
                    : ((f.className = "playpause pause"), (f.innerHTML = x)));
        };
        q = function () {
            A();
            B();
        };
        r = function (b) {
            a.isPaused() ? a.setFrame(b) : a.setRate(b);
            q();
        };
        s = function () {
            a.isPaused()
                ? (e && e.setMin(m).setMax(k).setValue(a.getRate()), a.play())
                : (a.pause(),
                  e &&
                      e
                          .setMin(0)
                          .setMax(a.getFrameCount() - 1)
                          .setValue(a.getFrame()));
            q();
        };
        v = function (b) {
            a.isPaused()
                ? (a.setFrame(a.getFrame() + b), e && e.setValue(a.getFrame()))
                : ((b = a.getRate() + b * p),
                  b < m && (b = m),
                  b > k && (b = k),
                  a.setRate(b),
                  e && e.setValue(b));
            q();
        };
        t = function () {
            v(1);
        };
        D = function () {
            v(-1);
        };
        m = 1;
        k = 25;
        p = 1;
        x = w = "";
        y = "Speed %d fps";
        z = "Frame %d";
        if (!a) return null;
        if (c) {
            if (((b = document.getElementById(c)), !b)) return null;
        } else
            (b = document.createElement("div")),
                (b.className = "aep_panel"),
                (b.innerHTML =
                    "<button class='playpause pause'></button><button class='prev'></button><div class='slider'><div class='knob'></div></div><button class='next'></button><span class='slabel'>Speed: xx fps</span>"),
                a.getPlayerDiv().nextSibling
                    ? a
                          .getPlayerDiv()
                          .parentNode.insertBefore(
                              b,
                              a.getPlayerDiv().nextSibling
                          )
                    : a.getPlayerDiv().parentNode.appendChild(b);
        f = l.getFirstChildWithClass(b, "playpause");
        g = l.getFirstChildWithClass(b, "prev");
        n = l.getFirstChildWithClass(b, "next");
        d = l.getFirstChildWithClass(b, "slider");
        h = l.getFirstChildWithClass(b, "slabel");
        f && l.addListener(f, "click", s);
        g && u(g, D);
        n && u(n, t);
        d &&
            ((e = C(d).setListener(r)),
            a.isPaused()
                ? e
                      .setMin(0)
                      .setMax(a.getFrameCount() - 1)
                      .setValue(a.getFrame())
                : e.setMin(m).setMax(k).setValue(a.getRate()));
        q();
        return {
            setMinRate: function (a) {
                m = a;
                e && e.setMin(a);
                return this;
            },
            setMaxRate: function (a) {
                k = a;
                e && e.setMax(a);
                return this;
            },
            setRateInc: function (a) {
                p = a;
                return this;
            },
            setButtonText: function (a) {
                a = a.split(";");
                w = a[0];
                x = a[1];
                B();
                return this;
            },
            setLabelText: function (a) {
                a = a.split(";");
                y = a[0];
                z = a[1];
                A();
                return this;
            },
        };
    };
    l.addListener(window, "load", function () {
        var a, c;
        a = l.getElementsByClassName("aeplayer", "div");
        for (c = 0; c < a.length; c++) t(s(a[c]).play());
    });
})();
