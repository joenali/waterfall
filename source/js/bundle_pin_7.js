var a;
(function(b) {
    b.alerts = {
        verticalOffset: -75,
        horizontalOffset: 0,
        repositionOnResize: true,
        overlayOpacity: 0.01,
        overlayColor: "#FFF",
        draggable: true,
        okButton: "&nbsp;Delete&nbsp;",
        cancelButton: "&nbsp;Cancel&nbsp;",
        dialogClass: null,
        alert: function(c, e, g) {
            if (e == null) e = "Alert";
            b.alerts._show(e, c, null, "alert",
            function(f) {
                g && g(f)
            })
        },
        confirm: function(c, e, g) {
            if (e == null) e = "Confirm";
            b.alerts._show(e, c, null, "confirm",
            function(f) {
                g && g(f)
            })
        },
        prompt: function(c, e, g, f) {
            if (g == null) g = "Prompt";
            b.alerts._show(g, c, e, "prompt",
            function(d) {
                f && f(d)
            })
        },
        _show: function(c, e, g, f, d) {
            b.alerts._hide();
            b.alerts._overlay("show");
            b("BODY").append('<div id="popup_container"><h1 id="popup_title"></h1><div id="popup_content"><div id="popup_message"></div></div></div>');
            b.alerts.dialogClass && b("#popup_container").addClass(b.alerts.dialogClass);
            var h = b.browser.msie && parseInt(b.browser.version) <= 6 ? "absolute": "fixed";
            b("#popup_container").css({
                position: h,
                zIndex: 99999,
                padding: 0,
                margin: 0
            });
            b("#popup_title").text(c);
            b("#popup_content").addClass(f);
            b("#popup_message").text(e);
            b("#popup_message").html(b("#popup_message").text().replace(/\n/g, "<br />"));
            b("#popup_container").css({
                minWidth: b("#popup_container").outerWidth(),
                maxWidth: b("#popup_container").outerWidth()
            });
            b.alerts._reposition();
            b.alerts._maintainPosition(true);
            switch (f) {
            case "alert":
                b("#popup_message").after('<div id="popup_panel"><input type="button" value="' + b.alerts.okButton + '" id="popup_ok" /></div>');
                b("#popup_ok").click(function() {
                    b.alerts._hide();
                    d(true)
                });
                b("#popup_ok").focus().keypress(function(k) {
                    if (k.keyCode == 13 || k.keyCode == 27) b("#popup_ok").trigger("click")
                });
                break;
            case "confirm":
                b("#popup_message").after('<div id="popup_panel"><input type="button" value="' + b.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + b.alerts.cancelButton + '" id="popup_cancel" /></div>');
                b("#popup_ok").click(function() {
                    b.alerts._hide();
                    d && d(true)
                });
                b("#popup_cancel").click(function() {
                    b.alerts._hide();
                    d && d(false)
                });
                b("#popup_ok").focus();
                b("#popup_ok, #popup_cancel").keypress(function(k) {
                    k.keyCode == 13 && b("#popup_ok").trigger("click");
                    k.keyCode == 27 && b("#popup_cancel").trigger("click")
                });
                break;
            case "prompt":
                b("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + b.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + b.alerts.cancelButton + '" id="popup_cancel" /></div>');
                b("#popup_prompt").width(b("#popup_message").width());
                b("#popup_ok").click(function() {
                    var k = b("#popup_prompt").val();
                    b.alerts._hide();
                    d && d(k)
                });
                b("#popup_cancel").click(function() {
                    b.alerts._hide();
                    d && d(null)
                });
                b("#popup_prompt, #popup_ok, #popup_cancel").keypress(function(k) {
                    k.keyCode == 13 && b("#popup_ok").trigger("click");
                    k.keyCode == 27 && b("#popup_cancel").trigger("click")
                });
                g && b("#popup_prompt").val(g);
                b("#popup_prompt").focus().select();
                break
            }
            if (b.alerts.draggable) try {
                b("#popup_container").draggable({
                    handle: b("#popup_title")
                });
                b("#popup_title").css({
                    cursor: "move"
                })
            } catch(j) {}
        },
        _hide: function() {
            b("#popup_container").remove();
            b.alerts._overlay("hide");
            b.alerts._maintainPosition(false)
        },
        _overlay: function(c) {
            switch (c) {
            case "show":
                b.alerts._overlay("hide");
                b("BODY").append('<div id="popup_overlay"></div>');
                b("#popup_overlay").css({
                    position:
                    "absolute",
                    zIndex: 99998,
                    top: "0px",
                    left: "0px",
                    width: "100%",
                    height: b(document).height(),
                    background: b.alerts.overlayColor,
                    opacity: b.alerts.overlayOpacity
                });
                break;
            case "hide":
                b("#popup_overlay").remove();
                break
            }
        },
        _reposition: function() {
            var c = b(window).height() / 2 - b("#popup_container").outerHeight() / 2 + b.alerts.verticalOffset,
            e = b(window).width() / 2 - b("#popup_container").outerWidth() / 2 + b.alerts.horizontalOffset;
            if (c < 0) c = 0;
            if (e < 0) e = 0;
            if (b.browser.msie && parseInt(b.browser.version) <= 6) c += b(window).scrollTop();
            b("#popup_container").css({
                top: c + "px",
                left: e + "px"
            });
            b("#popup_overlay").height(b(document).height())
        },
        _maintainPosition: function(c) {
            if (b.alerts.repositionOnResize) switch (c) {
            case true:
                b(window).bind("resize", b.alerts._reposition);
                break;
            case false:
                b(window).unbind("resize", b.alerts._reposition);
                break
            }
        }
    };
    jAlert = function(c, e, g) {
        b.alerts.alert(c, e, g)
    };
    jConfirm = function(c, e, g) {
        b.alerts.confirm(c, e, g)
    };
    jPrompt = function(c, e, g, f) {
        b.alerts.prompt(c, e, g, f)
    }
})(jQuery);




new(function(b) {
    var c = b.separator || "&",
    e = b.spaces === false ? false: true,
    g = (b.prefix === false ? false: true) ? b.hash === true ? "#": "?": "",
    f = b.numbers === false ? false: true;
    jQuery.query = new(function() {
        var d = function(l, r) {
            return l != undefined && l !== null && (r ? l.constructor == r: true)
        },
        h = function(l) {
            for (var r = /\[([^[]*)\]/g, u = /^([^[]+)(\[.*\])?$/.exec(l), o = u[1], m = []; l = r.exec(u[2]);) m.push(l[1]);
            return [o, m]
        },
        j = function(l, r, u) {
            var o = r.shift();
            if (typeof l != "object") l = null;
            if (o === "") {
                l || (l = []);
                if (d(l, Array)) l.push(r.length == 0 ? u: j(null, r.slice(0), u));
                else if (d(l, Object)) {
                    for (o = 0; l[o++] != null;);
                    l[--o] = r.length == 0 ? u: j(l[o], r.slice(0), u)
                } else {
                    l = [];
                    l.push(r.length == 0 ? u: j(null, r.slice(0), u))
                }
            } else if (o && o.match(/^\s*[0-9]+\s*$/)) {
                var m = parseInt(o, 10);
                l || (l = []);
                l[m] = r.length == 0 ? u: j(l[m], r.slice(0), u)
            } else if (o) {
                m = o.replace(/^\s*|\s*$/g, "");
                l || (l = {});
                if (d(l, Array)) {
                    var q = {};
                    for (o = 0; o < l.length; ++o) q[o] = l[o];
                    l = q
                }
                l[m] = r.length == 0 ? u: j(l[m], r.slice(0), u)
            } else return u;
            return l
        },
        k = function(l) {
            var r = this;
            r.keys = {};
            l.queryObject ? jQuery.each(l.get(),
            function(u, o) {
                r.SET(u, o)
            }) : jQuery.each(arguments,
            function() {
                var u = "" + this;
                u = u.replace(/^[?#]/, "");
                u = u.replace(/[;&]$/, "");
                if (e) u = u.replace(/[+]/g, " ");
                jQuery.each(u.split(/[&;]/),
                function() {
                    var o = decodeURIComponent(this.split("=")[0] || ""),
                    m = decodeURIComponent(this.split("=")[1] || "");
                    if (o) {
                        if (f) if (/^[+-]?[0-9]+\.[0-9]*$/.test(m)) m = parseFloat(m);
                        else if (/^[+-]?[0-9]+$/.test(m)) m = parseInt(m, 10);
                        m = !m && m !== 0 ? true: m;
                        if (m !== false && m !== true && typeof m != "number") m = m;
                        r.SET(o, m)
                    }
                })
            });
            return r
        };
        k.prototype = {
            queryObject: true,
            has: function(l, r) {
                l = this.get(l);
                return d(l, r)
            },
            GET: function(l) {
                if (!d(l)) return this.keys;
                var r = h(l);
                l = r[1];
                for (r = this.keys[r[0]]; r != null && l.length != 0;) r = r[l.shift()];
                return typeof r == "number" ? r: r || ""
            },
            get: function(l) {
                l = this.GET(l);
                if (d(l, Object)) return jQuery.extend(true, {},
                l);
                else if (d(l, Array)) return l.slice(0);
                return l
            },
            SET: function(l, r) {
                r = !d(r) ? null: r;
                l = h(l);
                var u = l[0];
                this.keys[u] = j(this.keys[u], l[1].slice(0), r);
                return this
            },
            set: function(l, r) {
                return this.copy().SET(l, r)
            },
            REMOVE: function(l) {
                return this.SET(l, null).COMPACT()
            },
            remove: function(l) {
                return this.copy().REMOVE(l)
            },
            EMPTY: function() {
                var l = this;
                jQuery.each(l.keys,
                function(r) {
                    delete l.keys[r]
                });
                return l
            },
            load: function(l) {
                var r = l.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1"),
                u = l.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
                return new k(l.length == u.length ? "": u, l.length == r.length ? "": r)
            },
            empty: function() {
                return this.copy().EMPTY()
            },
            copy: function() {
                return new k(this)
            },
            COMPACT: function() {
                function l(r) {
                    var u = typeof r == "object" ? d(r, Array) ? [] : {}: r;
                    if (typeof r == "object") {
                        function o(m, q, v) {
                            if (d(m, Array)) m.push(v);
                            else m[q] = v
                        }
                        jQuery.each(r,
                        function(m, q) {
                            if (!d(q)) return true;
                            o(u, m, l(q))
                        })
                    }
                    return u
                }
                this.keys = l(this.keys);
                return this
            },
            compact: function() {
                return this.copy().COMPACT()
            },
            toString: function() {
                var l = [],
                r = [],
                u = function(q) {
                    q += "";
                    if (e) q = q.replace(/ /g, "+");
                    return encodeURIComponent(q)
                },
                o = function(q, v, w) {
                    if (! (!d(w) || w === false)) {
                        v = [u(v)];
                        if (w !== true) {
                            v.push("=");
                            v.push(u(w))
                        }
                        q.push(v.join(""))
                    }
                },
                m = function(q, v) {
                    var w = function(B) {
                        return ! v || v == "" ? "" + B: [v, "[", B, "]"].join("")
                    };
                    jQuery.each(q,
                    function(B, D) {
                        typeof D == "object" ? m(D, w(B)) : o(r, w(B), D)
                    })
                };
                m(this.keys);
                r.length > 0 && l.push(g);
                l.push(r.join(c));
                return l.join("")
            }
        };
        return new k(location.search, location.hash)
    })
})(jQuery.query || {});

(function(b) {
    function c() {
        var h = e(this);
        isNaN(h.datetime) || b(this).text(g(h.datetime));
        return this
    }
    function e(h) {
        h = b(h);
        if (!h.data("timeago")) {
            h.data("timeago", {
                datetime: d.datetime(h)
            });
            var j = b.trim(h.text());
            j.length > 0 && h.attr("title", j)
        }
        return h.data("timeago")
    }
    function g(h) {
        return d.inWords(f(h))
    }
    function f(h) {
        return (new Date).getTime() - h.getTime()
    }
    b.timeago = function(h) {
        return h instanceof Date ? g(h) : typeof h == "string" ? g(b.timeago.parse(h)) : g(b.timeago.datetime(h))
    };
    var d = b.timeago;
    b.extend(b.timeago, {
        settings: {
            refreshMillis: 6E4,
            allowFuture: false,
            strings: {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "ago",
                suffixFromNow: "from now",
                seconds: "less than a minute",
                minute: "about a minute",
                minutes: "%d minutes",
                hour: "about an hour",
                hours: "about %d hours",
                day: "a day",
                days: "%d days",
                month: "about a month",
                months: "%d months",
                year: "about a year",
                years: "%d years",
                numbers: []
            }
        },
        inWords: function(h) {
            function j(v, w) {
                return (b.isFunction(v) ? v(w) : v).replace(/%d/i, k.numbers && k.numbers[w] || w)
            }
            var k = this.settings.strings,
            l = k.prefixAgo,
            r = k.suffixAgo;
            if (this.settings.allowFuture) {
                if (h < 0) {
                    l = k.prefixFromNow;
                    r = k.suffixFromNow
                }
                h = Math.abs(h)
            }
            h = h / 1E3;
            var u = h / 60,
            o = u / 60,
            m = o / 24,
            q = m / 365;
            h = h < 45 && j(k.seconds, Math.round(h)) || h < 90 && j(k.minute, 1) || u < 45 && j(k.minutes, Math.round(u)) || u < 90 && j(k.hour, 1) || o < 24 && j(k.hours, Math.round(o)) || o < 48 && j(k.day, 1) || m < 30 && j(k.days, Math.floor(m)) || m < 60 && j(k.month, 1) || m < 365 && j(k.months, Math.floor(m / 30)) || q < 2 && j(k.year, 1) || j(k.years, Math.floor(q));
            return b.trim([l, h, r].join(" "))
        },
        parse: function(h) {
            h = b.trim(h);
            h = h.replace(/-/, "/").replace(/-/, "/");
            h = h.replace(/T/, " ").replace(/Z/, " UTC");
            h = h.replace(/([\+-]\d\d)\:?(\d\d)/, " $1$2");
            h = h.replace(/(\.\d+)/, "");
            return new Date(h)
        },
        datetime: function(h) {
            h = b(h).get(0).tagName.toLowerCase() == "time" ? b(h).attr("datetime") : b(h).attr("title");
            return d.parse(h)
        }
    });
    b.fn.timeago = function() {
        var h = this;
        h.each(c);
        var j = d.settings;
        j.refreshMillis > 0 && setInterval(function() {
            h.each(c)
        },
        j.refreshMillis);
        return h
    };
    document.createElement("abbr");
    document.createElement("time")
})(jQuery);

(function(b) {
    b.pageless = function(c) {
        b.isFunction(c) ? c.call() : b.pageless.init(c)
    };
    b.pageless.settings = {
        currentPage: 1,
        pagination: ".pagination",
        url: location.href,
        params: {},
        distance: 100,
        loaderImage: "",
        marker: null,
        scrape: function(c) {
            return c
        }
    };
    b.pageless.loaderHtml = function() {
        return b.pageless.settings.loaderHtml || '<div id="pageless-loader" style="display:none;text-align:center;width:100%;"></div>'
    };
    b.pageless.init = function(c) {
        if (!b.pageless.settings.inited) {
            b.pageless.settings.inited = true;
            c && b.extend(b.pageless.settings, c);
            b.pageless.settings.pagination && b(b.pageless.settings.pagination).remove();
            b.pageless.startListener()
        }
    };
    b.pageless.isLoading = false;
    b.fn.pageless = function(c) {
        b.pageless.init(c);
        b.pageless.el = b(this);
        if (c.loader && b(this).find(c.loader).length) b.pageless.loader = b(this).find(c.loader);
        else {
            b.pageless.loader = b(b.pageless.loaderHtml());
            b(this).append(b.pageless.loader);
            c.loaderHtml || b("#pageless-loader .msg").html(c.loaderMsg)
        }
    };
    b.pageless.loading = function(c) {
        if (c === true) {
            b.pageless.isLoading = true;
            b.pageless.loader && b.pageless.loader.fadeIn("normal")
        } else {
            b.pageless.isLoading = false;
            b.pageless.loader && b.pageless.loader.fadeOut("normal")
        }
    };
    b.pageless.stopListener = function() {
        b(window).unbind(".pageless");
        b("#" + b.pageless.settings.loader).hide()
    };
    b.pageless.startListener = function() {
        b(window).bind("scroll.pageless", b.pageless.scroll);
        b("#" + b.pageless.settings.loader).show()
    };
    b.pageless.scroll = function() {
        if (b.pageless.settings.totalPages <= b.pageless.settings.currentPage) {
            b.pageless.stopListener();
            b.pageless.settings.afterStopListener && b.pageless.settings.afterStopListener.call()
        } else {
            var c = b(document).height() - b(window).scrollTop() - b(window).height();
            if (!b.pageless.isLoading && c < b.pageless.settings.distance) {
                b.pageless.loading(true);
                b.pageless.settings.currentPage++;
                b.extend(b.pageless.settings.params, {
                    page: b.pageless.settings.currentPage
                });
                b.pageless.settings.marker && b.extend(b.pageless.settings.params, {
                    marker: b.pageless.settings.marker
                });
                c = b.pageless.settings.url;
                c = c.split("#")[0];
                b.ajax({
                    url: c,
                    type: "GET",
                    dataType: "html",
                    data: b.pageless.settings.params,
                    success: function(e) {
                        e = b.pageless.settings.scrape(e);
                        b.pageless.loader ? b.pageless.loader.before(e) : b.pageless.el.append(e);
                        b.pageless.loading(false);
                        b.pageless.settings.complete && b.pageless.settings.complete.call()
                    }
                })
            }
        }
    }
})(jQuery);



(function(b) {
    b.path = {};
    var c = {
        rotate: function(e, g) {
            var f = g * 3.141592654 / 180;
            g = Math.cos(f);
            f = Math.sin(f);
            return [g * e[0] - f * e[1], f * e[0] + g * e[1]]
        },
        scale: function(e, g) {
            return [g * e[0], g * e[1]]
        },
        add: function(e, g) {
            return [e[0] + g[0], e[1] + g[1]]
        },
        minus: function(e, g) {
            return [e[0] - g[0], e[1] - g[1]]
        }
    };
    b.path.bezier = function(e) {
        e.start = b.extend({
            angle: 0,
            length: 0.3333
        },
        e.start);
        e.end = b.extend({
            angle: 0,
            length: 0.3333
        },
        e.end);
        this.p1 = [e.start.x, e.start.y];
        this.p4 = [e.end.x, e.end.y];
        var g = c.minus(this.p4, this.p1),
        f = c.scale(g, e.start.length);
        f = c.rotate(f, e.start.angle);
        this.p2 = c.add(this.p1, f);
        g = c.scale(g, -1);
        g = c.scale(g, e.end.length);
        g = c.rotate(g, e.end.angle);
        this.p3 = c.add(this.p4, g);
        this.f1 = function(d) {
            return d * d * d
        };
        this.f2 = function(d) {
            return 3 * d * d * (1 - d)
        };
        this.f3 = function(d) {
            return 3 * d * (1 - d) * (1 - d)
        };
        this.f4 = function(d) {
            return (1 - d) * (1 - d) * (1 - d)
        };
        this.css = function(d) {
            var h = this.f1(d),
            j = this.f2(d),
            k = this.f3(d);
            d = this.f4(d);
            return {
                top: this.p1[1] * h + this.p2[1] * j + this.p3[1] * k + this.p4[1] * d + "px",
                left: this.p1[0] * h + this.p2[0] * j + this.p3[0] * k + this.p4[0] * d + "px"
            }
        }
    };
    b.path.arc = function(e) {
        for (var g in e) this[g] = e[g];
        for (this.dir = this.dir || 1; this.start > this.end && this.dir > 0;) this.start -= 360;
        for (; this.start < this.end && this.dir < 0;) this.start += 360;
        this.css = function(f) {
            f = this.start * f + this.end * (1 - f);
            f = f * 3.1415927 / 180;
            var d = Math.sin(f) * this.radius + this.center[0];
            return {
                top: Math.cos(f) * this.radius + this.center[1] + "px",
                left: d + "px"
            }
        }
    };
    b.fx.step.path = function(e) {
        var g = e.end.css(1 - e.pos);
        for (var f in g) e.elem.style[f] = g[f]
    }
})(jQuery);




/*underscore-min.js*/
/*backbone-min*/




window.Modernizr = function(b, c, e) {
    function g(n) {
        u.cssText = n
    }
    function f(n, z) {
        return typeof n === z
    }
    function d(n, z) {
        for (var A in n) if (u[n[A]] !== e) return z == "pfx" ? n[A] : true;
        return false
    }
    function h(n, z, A) {
        for (var E in n) {
            var F = z[n[E]];
            if (F !== e) return A === false ? n[E] : f(F, "function") ? F.bind(A || z) : F
        }
        return false
    }
    function j(n, z, A) {
        var E = n.charAt(0).toUpperCase() + n.substr(1),
        F = (n + " " + o.join(E + " ") + E).split(" ");
        return f(z, "string") || f(z, "undefined") ? d(F, z) : (F = (n + " " + m.join(E + " ") + E).split(" "), h(F, z, A))
    }
    var k = {},
    l = c.documentElement,
    r = c.createElement("modernizr"),
    u = r.style;
    b = " -webkit- -moz- -o- -ms- ".split(" ");
    var o = "Webkit Moz O ms".split(" "),
    m = "Webkit Moz O ms".toLowerCase().split(" ");
    r = {};
    var q = [],
    v = q.slice,
    w,
    B = function(n, z, A, E) {
        var F, Q, H, G = c.createElement("div"),
        K = c.body,
        N = K ? K: c.createElement("body");
        if (parseInt(A, 10)) for (; A--;) {
            H = c.createElement("div");
            H.id = E ? E[A] : "modernizr" + (A + 1);
            G.appendChild(H)
        }
        return F = ["&#173;<style>", n, "</style>"].join(""),
        G.id = "modernizr",
        (K ? G: N).innerHTML += F,
        N.appendChild(G),
        K || (N.style.background = "", l.appendChild(N)),
        Q = z(G, n),
        K ? G.parentNode.removeChild(G) : N.parentNode.removeChild(N),
        !!Q
    },
    D = {}.hasOwnProperty,
    I; ! f(D, "undefined") && !f(D.call, "undefined") ? (I = function(n, z) {
        return D.call(n, z)
    }) : (I = function(n, z) {
        return z in n && f(n.constructor.prototype[z], "undefined")
    });
    Function.prototype.bind || (Function.prototype.bind = function(n) {
        var z = this;
        if (typeof z != "function") throw new TypeError;
        var A = v.call(arguments, 1),
        E = function() {
            if (this instanceof E) {
                var F = function() {};
                F.prototype = z.prototype;
                F = new F;
                var Q = z.apply(F, A.concat(v.call(arguments)));
                return Object(Q) === Q ? Q: F
            }
            return z.apply(n, A.concat(v.call(arguments)))
        };
        return E
    });
    (function(n, z) {
        n = n.join("");
        var A = z.length;
        B(n,
        function(E) {
            E = E.childNodes;
            for (var F = {}; A--;) F[E[A].id] = E[A];
            k.csstransforms3d = (F.csstransforms3d && F.csstransforms3d.offsetLeft) === 9 && F.csstransforms3d.offsetHeight === 3
        },
        A, z)
    })([, ["@media (", b.join("transform-3d),("), "modernizr){#csstransforms3d{left:9px;position:absolute;height:3px;}}"].join("")], [, "csstransforms3d"]);
    r.csstransforms3d = function() {
        var n = !!j("perspective");
        return n && "webkitPerspective" in l.style && (n = k.csstransforms3d),
        n
    };
    for (var p in r) I(r, p) && (w = p.toLowerCase(), k[w] = r[p](), q.push((k[w] ? "": "no-") + w));
    return g(""),
    r = null,
    k._version = "2.5.3",
    k._prefixes = b,
    k._domPrefixes = m,
    k._cssomPrefixes = o,
    k.testProp = function(n) {
        return d([n])
    },
    k.testAllProps = j,
    k.testStyles = B,
    l.className = l.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (" js " + q.join(" ")),
    k
} (this, this.document);





var new_pins = {
    html: "",
    number: 0,
    old_title: ""
},
followers_json = null,
cache = {},
lastXhr,
media_url = "http://assets.pinterest.com/",
useLazyLoad = !window.navigator.userAgent.match(/ipad.*OS 4_/gi),
pinterestReferrer = window.location.href;
window.onerror = function(b, c, e) {
    /*$.ajax({url:"/report_error/",type:"POST",dataType:"json",data:{exception_type:b,url:c||window.location.href,line:e}});return true*/
};
function getCookie(b) {
    var c = null;
    if (document.cookie && document.cookie != "") for (var e = document.cookie.split(";"), g = 0; g < e.length; g++) {
        var f = jQuery.trim(e[g]);
        if (f.substring(0, b.length + 1) == b + "=") c = decodeURIComponent(f.substring(b.length + 1))
    }
    return c
}
$("html").ajaxSend(function(b, c) {
    c.setRequestHeader("X-Pinterest-Referrer", pinterestReferrer);
    c.setRequestHeader("X-CSRFToken", getCookie("csrftoken"))
});
function setCookie(b, c, e) {
    if (e) {
        var g = new Date;
        g.setTime(g.getTime() + e * 24 * 60 * 60 * 1E3);
        e = "; expires=" + g.toGMTString()
    } else e = "";
    document.cookie = b + "=" + c + e + "; path=/"
}
function deleteCookie(b) {
    setCookie(b, "", -1)
}
$.extend({
    getUrlVars: function() {
        for (var b = [], c, e = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), g = 0; g < e.length; g++) {
            c = e[g].split("=");
            b.push(c[0]);
            b[c[0]] = c[1]
        }
        return b
    },
    getUrlVar: function(b) {
        return $.getUrlVars()[b]
    }
});
(function(b) {
    b.fn.extend({
        defaultValue: function(c, e) {
            b(this).focus(function() {
                b(this).val() == c && b(this).val("")
            }).blur(function() {
                if (b(this).val() == "") {
                    b(this).val(c);
                    e && b(this).addClass(e)
                }
            })
        }
    })
})(jQuery);
if (!Array.indexOf) Array.prototype.indexOf = function(b) {
    for (var c = 0; c < this.length; c++) if (this[c] == b) return c;
    return - 1
};
function is_video(b) {
    return /^http:\/\/img\.youtube\.com/.test(b) || /^http:\/\/b\.vimeocdn\.com/.test(b)
}
function getHTML(b) {
    var c = $(b).wrap("<div />").parent().html();
    $(b).unwrap();
    return c
}

var ScrollToTop = ScrollToTop || {
    setup: function() {
        var b = $(window).height() / 2;
        $(window).scroll(function() { (window.innerWidth ? window.pageYOffset: document.documentElement.scrollTop) >= b ? $("#ScrollToTop").removeClass("Offscreen") : $("#ScrollToTop").addClass("Offscreen")
        });
        $("#ScrollToTop").click(function() {
            $("html, body").animate({
                scrollTop: "0px"
            },
            400);
            return false
        })
    }
},
Modal = Modal || {
    setup: function() {
        $(document).keydown(function(b) {
            if (b.keyCode == 27) {
                var c = $(".ModalContainer:visible").attr("id");
                if (c) Modal.close(c);
                else $("#zoomScroll").length && window.history.back();
                b.preventDefault()
            }
        })
    },
    show: function(b) {
        var c = $("#" + b),
        e = $(".modal:first", c),
        g = c.parent(),
        f = this;
        c.find(".close").on("click",
        function() {
            f.trigger("cancel")
        });
        if (g[0] !== $("body")[0]) {
            $("body").append(c);
            c.data("parent", g)
        }
        $("body").addClass("noscroll");
        c.show();
        g = e.outerHeight();
        e.css("margin-bottom", "-" + g / 2 + "px");
        setTimeout(function() {
            c.addClass("visible");
            c.css("-webkit-transform", "none")
        },
        1);
        this.trigger("show", b);
        return false
    },
    close: function(b) {
        var c = $("#" + b);
        c.data("parent") && c.data("parent").append(c);
        $("#zoomScroll").length === 0 && $("body").removeClass("noscroll");
        c.removeClass("visible");
        setTimeout(function() {
            c.hide();
            c.css("-webkit-transform", "translateZ(0)")
        },
        251);
        this.trigger("close", b);
        return false
    }
};

_.extend(Modal, Backbone.Events);

var Arrays = {
    conjunct: function(b) {
        if (b.length == 1) return b[0];
        else {
            b = b.slice(0);
            last = b.pop();
            b.push("and " + last);
            return b.join(", ")
        }
    }
};

$(document).ready(function() {
    ScrollToTop.setup();
    Modal.setup();
    $(".tipsyHover").tipsy({
        gravity: "n",
        delayIn: 0.1,
        delayOut: 0.1,
        opacity: 0.7,
        live: true,
        html: true
    });
    $("#query").focus(function() {
        cache && $(this).catcomplete("search", $(this).val())
    });
    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _renderMenu: function(c, e) {
            var g = this,
            f = "";
            $.each(e,
            function(d, h) {
                if (h.category != f) {
                    c.append("<li class='ui-autocomplete-category'>" + h.category + "</li>");
                    f = h.category
                }
                g._renderItem(c, h)
            });
            e = {
                link: "/search/?q=" + this.term
            };
            $("<li></li>").data("item.autocomplete", e).append("<a href='/search/?q=" + this.term + "' class='ui-corner-all' tabindex='-1' style='font-weight:bold; min-height:0 !important;'>Search for " + this.term + "</a>").appendTo(c)
        }
    });
    var b = $("#query").catcomplete({
        source: function(c, e) {
            Tagging.getFriends(c,
            function(g) {
                var f = g;
                if (myboards) {
                    f = tagmate.filter_options(myboards, c.term);
                    f = g.concat(f)
                }
                for (g = 0; g < f.length; g++) f[g].value = f[g].label;
                e(f)
            })
        },
        minLength: 1,
        delay: 0,
        appendTo: "#SearchAutocompleteHolder",
        select: function(c, e) {
            document.location.href = e.item.link
        }
    });
    if (typeof b.data("catcomplete") != "undefined") b.data("catcomplete")._renderItem = function(c, e) {
        var g = "<a href='" + e.link + "'><img src='" + e.image + "' class='AutocompletePhoto' alt='Photo of " + e.label + "' width='38px' height='38px'/><span class='AutocompleteName'>" + e.label + "</span></a>";
        return $("<li></li>").data("item.autocomplete", e).append(g).appendTo(c)
    };
    $("#query").defaultValue($("#query").attr("placeholder"), "default_value");
    $("#Search #query_button").click(function() {
        $("#Search form").submit();
        return false
    });
    $("body").on("click", "a[rel=nofollow]",
    function(c) {
        var e = $(this).attr("href");
        if (e === "#") return c.isDefaultPrevented();
        if (!e.match(/^(http|https):\/\//) || e.match(/(http:\/\/|https:\/\/|\.)pinterest\.com\//gi) || $(this).hasClass("safelink")) return true;
        c = (c = $(this).parents(".pin").attr("data-id") || $(this).parents(".pin").attr("pin-id") || $(this).attr("data-id")) ? "&pin=" + c: "";
        var g = $(this).parents(".comment").attr("comment-id");
        g = g ? "&comment_id=" + g: "";
        var f = (new jsSHA(getCookie("csrftoken"), "ASCII")).getHash("HEX");
        window.open("//" + window.location.host + "/offsite/?url=" + encodeURIComponent(e) + "&shatoken=" + f + c + g);
        return false
    })
});
Twitter = new(function() {
    var b = this;
    this.startTwitterConnect = function() {
        b._twitterWindow = window.open("/connect/twitter/", "Pinterest", "location=0,status=0,width=800,height=400");
        b._twitterInterval = window.setInterval(b.completeTwitterConnect, 1E3)
    };
    this.completeTwitterConnect = function() {
        if (b._twitterWindow.closed) {
            window.clearInterval(b._twitterInterval);
            window.location.reload()
        }
    }
});
Facebook = new(function() {
    var b = this;
    this.startFacebookConnect = function(c, e, g, f) {
        g = g == undefined ? true: g;
        var d = "/connect/facebook/",
        h = "?";
        if (c) {
            d += h + "scope=" + c;
            h = "&"
        }
        if (e) {
            d += h + "enable_timeline=1";
            h = "&"
        }
        if (f) d += h + "ref_page=" + f;
        b._facebookWindow = window.open(d, "Pinterest", "location=0,status=0,width=800,height=400");
        if (g) b._facebookInterval = window.setInterval(this.completeFacebookConnect, 1E3)
    };
    this.completeFacebookConnect = function() {
        if (b._facebookWindow.closed) {
            window.clearInterval(b._facebookInterval);
            window.location.reload()
        }
    }
});
Google = new(function() {
    var b = this;
    this.startGoogleConnect = function() {
        b._googleWindow = window.open("/connect/google/", "Google", "location=0,status=0,width=800,height=400");
        b._googleInterval = window.setInterval(b.completeGoogleConnect, 1E3)
    };
    this.completeGoogleConnect = function() {
        if (b._googleWindow.closed) {
            window.clearInterval(b._googleInterval);
            window.location.reload()
        }
    }
});
Yahoo = new(function() {
    var b = this;
    this.startYahooConnect = function() {
        b._yahooWindow = window.open("/connect/yahoo/", "Yahoo", "location=0,status=0,width=800,height=400");
        b._yahooInterval = window.setInterval(b.completeYahooConnect, 1E3)
    };
    this.completeYahooConnect = function() {
        if (b._yahooWindow.closed) {
            window.clearInterval(b._yahooInterval);
            window.location.reload()
        }
    }
});
(function(b) {
    function c(g) {
        return typeof g == "object" ? g: {
            top: g,
            left: g
        }
    }
    var e = b.scrollTo = function(g, f, d) {
        b(window).scrollTo(g, f, d)
    };
    e.defaults = {
        axis: "xy",
        duration: parseFloat(b.fn.jquery) >= 1.3 ? 0 : 1
    };
    e.window = function() {
        return b(window)._scrollable()
    };
    b.fn._scrollable = function() {
        return this.map(function() {
            var g = this;
            if (! (!g.nodeName || b.inArray(g.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1)) return g;
            g = (g.contentWindow || g).document || g.ownerDocument || g;
            return b.browser.safari || g.compatMode == "BackCompat" ? g.body: g.documentElement
        })
    };
    b.fn.scrollTo = function(g, f, d) {
        if (typeof f == "object") {
            d = f;
            f = 0
        }
        if (typeof d == "function") d = {
            onAfter: d
        };
        if (g == "max") g = 9E9;
        d = b.extend({},
        e.defaults, d);
        f = f || d.speed || d.duration;
        d.queue = d.queue && d.axis.length > 1;
        if (d.queue) f /= 2;
        d.offset = c(d.offset);
        d.over = c(d.over);
        return this._scrollable().each(function() {
            function h(m) {
                k.animate(u, f, d.easing, m &&
                function() {
                    m.call(this, g, d)
                })
            }
            var j = this,
            k = b(j),
            l = g,
            r,
            u = {},
            o = k.is("html,body");
            switch (typeof l) {
            case "number":
            case "string":
                if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(l)) {
                    l = c(l);
                    break
                }
                l = b(l, this);
            case "object":
                if (l.is || l.style) r = (l = b(l)).offset()
            }
            b.each(d.axis.split(""),
            function(m, q) {
                var v = q == "x" ? "Left": "Top",
                w = v.toLowerCase(),
                B = "scroll" + v,
                D = j[B],
                I = e.max(j, q);
                if (r) {
                    u[B] = r[w] + (o ? 0 : D - k.offset()[w]);
                    if (d.margin) {
                        u[B] -= parseInt(l.css("margin" + v)) || 0;
                        u[B] -= parseInt(l.css("border" + v + "Width")) || 0
                    }
                    u[B] += d.offset[w] || 0;
                    if (d.over[w]) u[B] += l[q == "x" ? "width": "height"]() * d.over[w]
                } else {
                    q = l[w];
                    u[B] = q.slice && q.slice( - 1) == "%" ? parseFloat(q) / 100 * I: q
                }
                if (/^\d+$/.test(u[B])) u[B] = u[B] <= 0 ? 0 : Math.min(u[B], I);
                if (!m && d.queue) {
                    D != u[B] && h(d.onAfterFirst);
                    delete u[B]
                }
            });
            h(d.onAfter)
        }).end()
    };
    e.max = function(g, f) {
        var d = f == "x" ? "Width": "Height";
        f = "scroll" + d;
        if (!b(g).is("html,body")) return g[f] - b(g)[d.toLowerCase()]();
        d = "client" + d;
        var h = g.ownerDocument.documentElement;
        g = g.ownerDocument.body;
        return Math.max(h[f], g[f]) - Math.min(h[d], g[d])
    }
})(jQuery);
(function() {
    jQuery.each({
        getSelection: function() {
            var b = this.jquery ? this[0] : this;
            return ("selectionStart" in b &&
            function() {
                var c = b.selectionEnd - b.selectionStart;
                return {
                    start: b.selectionStart,
                    end: b.selectionEnd,
                    length: c,
                    text: b.value.substr(b.selectionStart, c)
                }
            } || document.selection &&
            function() {
                b.focus();
                var c = document.selection.createRange();
                if (c == null) return {
                    start: 0,
                    end: b.value.length,
                    length: 0
                };
                var e = b.createTextRange(),
                g = e.duplicate();
                e.moveToBookmark(c.getBookmark());
                g.setEndPoint("EndToStart", e);
                var f = g.text.length,
                d = f;
                for (e = 0; e < f; e++) g.text.charCodeAt(e) == 13 && d--;
                f = g = c.text.length;
                for (e = 0; e < g; e++) c.text.charCodeAt(e) == 13 && f--;
                return {
                    start: d,
                    end: d + f,
                    length: f,
                    text: c.text
                }
            } ||
            function() {
                return {
                    start: 0,
                    end: b.value.length,
                    length: 0
                }
            })()
        },
        setSelection: function(b, c) {
            var e = this.jquery ? this[0] : this,
            g = b || 0,
            f = c || 0;
            return ("selectionStart" in e &&
            function() {
                e.focus();
                e.selectionStart = g;
                e.selectionEnd = f;
                return this
            } || document.selection &&
            function() {
                e.focus();
                var d = e.createTextRange(),
                h = g;
                for (i = 0; i < h; i++) if (e.value[i].search(/[\r\n]/) != -1) g -= 0.5;
                h = f;
                for (i = 0; i < h; i++) if (e.value[i].search(/[\r\n]/) != -1) f -= 0.5;
                d.moveEnd("textedit", -1);
                d.moveStart("character", g);
                d.moveEnd("character", f - g);
                d.select();
                return this
            } ||
            function() {
                return this
            })()
        },
        replaceSelection: function(b) {
            var c = this.jquery ? this[0] : this,
            e = b || "";
            return ("selectionStart" in c &&
            function() {
                c.value = c.value.substr(0, c.selectionStart) + e + c.value.substr(c.selectionEnd, c.value.length);
                return this
            } || document.selection &&
            function() {
                c.focus();
                document.selection.createRange().text = e;
                return this
            } ||
            function() {
                c.value += e;
                return this
            })()
        }
    },
    function(b) {
        jQuery.fn[b] = this
    })
})();

var tagmate = tagmate || {
    USER_TAG_EXPR: "@\\w+(?: \\w*)?",
    HASH_TAG_EXPR: "#\\w+",
    USD_TAG_EXPR: "\\$(?:(?:\\d{1,3}(?:\\,\\d{3})+)|(?:\\d+))(?:\\.\\d{2})?",
    GBP_TAG_EXPR: "\\\u00a3(?:(?:\\d{1,3}(?:\\,\\d{3})+)|(?:\\d+))(?:\\.\\d{2})?",
    filter_options: function(b, c) {
        for (var e = [], g = 0; g < b.length; g++) {
            var f = b[g].label.toLowerCase(),
            d = c.toLowerCase();
            d.length <= f.length && f.indexOf(d) == 0 && e.push(b[g])
        }
        return e
    },
    sort_options: function(b) {
        return b.sort(function(c, e) {
            c = c.label.toLowerCase();
            e = e.label.toLowerCase();
            if (c > e) return 1;
            else if (c < e) return - 1;
            return 0
        })
    }
};

(function(b) {
    function c(d, h, j) {
        d = d.substring(j || 0).search(h);
        return d >= 0 ? d + (j || 0) : d
    }
    function e(d) {
        return d.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
    }
    function g(d, h, j) {
        var k = {};
        for (tok in h)
        if (j && j[tok]) {
            var l = {},
            r = {};
            for (key in j[tok]) {
                var u = j[tok][key].value,
                o = j[tok][key].label,
                m = e(tok + o),
                q = ["(?:^(", ")$|^(", ")\\W|\\W(", ")\\W|\\W(", ")$)"].join(m),
                v = 0;
                for (q = new RegExp(q, "gm");
                (v = c(d.val(), q, v)) > -1;) {
                    var w = r[v] ? r[v] : null;
                    if (!w || l[w].length < o.length) r[v] = u;
                    l[u] = o;
                    v += o.length + 1
                }
            }
            for (v in r)
            k[tok + r[v]] = tok
        }
        else {
            l = null;
            for (q = new RegExp("(" + h[tok] + ")", "gm"); l = q.exec(d.val());)
            k[l[1]] = tok
        }
        d = [];
        for (m in k)
        d.push(m);
        return d
    }
    var f = {
        "@": tagmate.USER_TAG_EXPR,
        "#": tagmate.HASH_TAG_EXPR,
        $: tagmate.USD_TAG_EXPR,
        "\u00a3": tagmate.GBP_TAG_EXPR
    };
    b.fn.extend({
        getTags: function(d, h) {
            var j = b(this);
            d = d || j.data("_tagmate_tagchars");
            h = h || j.data("_tagmate_sources");
            return g(j, d, h)
        },
        tagmate: function(d) {
            function h(o, m, q) {
                for (m = new RegExp("[" + m + "]"); q >= 0 && !m.test(o[q]); q--);
                return q
            }
            function j(o) {
                var m = o.val(),
                q = o.getSelection(),
                v = -1;
                o = null;
                for (tok in u.tagchars) {
                    var w = h(m, tok, q.start);
                    if (w > v) {
                        v = w;
                        o = tok
                    }
                }
                m = m.substring(v + 1, q.start);
                if ((new RegExp("^" + u.tagchars[o])).exec(o + m)) return o + m;
                return null
            }
            function k(o, m, q) {
                var v = o.val(),
                w = o.getSelection();
                w = h(v, m[0], w.start);
                var B = v.substr(0, w);
                v = v.substr(w + m.length);
                o.val(B + m[0] + q + v);
                v = w + q.length + 1;
                o.setSelection(v, v);
                u.replace_tag && u.replace_tag(m, q)
            }
            function l(o, m) {
                m = tagmate.sort_options(m);
                for (var q = 0; q < m.length; q++) {
                    var v = m[q].label,
                    w = m[q].image;
                    q == 0 && o.html("");
                    var B = "<span>" + v + "</span>";
                    if (w) B = "<img src='" + w + "' alt='" + v + "'/>" + B;
                    v = u.menu_option_class;
                    if (q == 0) v += " " + u.menu_option_active_class;
                    o.append("<div class='" + v + "'>" + B + "</div>")
                }
            }
            function r(o, m) {
                var q = m == "down" ? ":first-child": ":last-child",
                v = m == "down" ? "next": "prev";
                m = o.children("." + u.menu_option_active_class);
                if (m.length == 0) m = o.children(q);
                else {
                    m.removeClass(u.menu_option_active_class);
                    m = m[v]().length > 0 ? m[v]() : m
                }
                m.addClass(u.menu_option_active_class);
                v = o.children();
                var w = Math.floor(b(o).height() / b(v[0]).height()) - 1;
                if (b(o).height() % b(v[0]).height() > 0) w -= 1;
                for (q = 0; q < v.length && b(v[q]).html() != b(m).html(); q++);
                q > w && q - w >= 0 && q - w < v.length && o.scrollTo(v[q - w])
            }
            var u = {
                tagchars: f,
                sources: null,
                capture_tag: null,
                replace_tag: null,
                menu: null,
                menu_class: "tagmate-menu",
                menu_option_class: "tagmate-menu-option",
                menu_option_active_class: "tagmate-menu-option-active"
            };
            return this.each(function() {
                function o() {
                    w.hide();
                    var D = j(m);
                    if (D) {
                        var I = D[0],
                        p = D.substr(1),
                        n = m.getSelection(),
                        z = h(m.val(), I, n.start);
                        n.start - z <= D.length &&
                        function(A) {
                            if (typeof u.sources[I] === "object") A(tagmate.filter_options(u.sources[I], p));
                            else typeof u.sources[I] === "function" ? u.sources[I]({
                                term: p
                            },
                            A) : A()
                        } (function(A) {
                            if (A && A.length > 0) {
                                l(w, A);
                                w.css("top", m.outerHeight() - 1 + "px");
                                w.show();
                                for (var E = m.data("_tagmate_sources"), F = 0; F < A.length; F++) {
                                    for (var Q = false, H = 0; ! Q && H < E[I].length; H++)
                                    Q = E[I][H].value == A[F].value;
                                    Q || E[I].push(A[F])
                                }
                            }
                            D && u.capture_tag && u.capture_tag(D)
                        })
                    }
                }
                d && b.extend(u, d);
                var m = b(this);
                m.data("_tagmate_tagchars", u.tagchars);
                var q = {};
                for (var v in u.sources)
                q[v] = [];
                m.data("_tagmate_sources", q);
                var w = u.menu;

                if (!w) {
                    w = b("<div class='" + u.menu_class + "'></div>");
                    m.after(w)
                }
                m.offset();
                w.css("position", "absolute");
                w.hide();
                var B = false;
                b(m).unbind(".tagmate").bind("focus.tagmate",
                function() {
                    o()
                }).bind("blur.tagmate",
                function() {
                    setTimeout(function() {
                        w.hide()
                    },
                    300)
                }).bind("click.tagmate",
                function() {
                    o()
                }).bind("keydown.tagmate",
                function(D) {
                    if (w.is(":visible")) if (D.keyCode == 40) {
                        r(w, "down");
                        B = true;
                        return false
                    } else if (D.keyCode == 38) {
                        r(w, "up");
                        B = true;
                        return false
                    } else if (D.keyCode == 13) {
                        D = w.children("." + u.menu_option_active_class).text();
                        var I = j(m);
                        if (I && D) {
                            k(m, I, D);
                            w.hide();
                            B = true;
                            return false
                        }
                    }
                    else if (D.keyCode == 27) {
                        w.hide();
                        B = true;
                        return false
                    }
                }).bind("keyup.tagmate",
                function() {
                    if (B) {
                        B = false;
                        return true
                    }
                    o()
                });
                b("." + u.menu_class + " ." + u.menu_option_class).die("click.tagmate").live("click.tagmate",
                function() {
                    var D = b(this).text(),
                    I = j(m);
                    k(m, I, D);
                    w.hide();
                    B = true;
                    return false
                })
            })
        }
    })
})(jQuery);
(function(b) {
    function c(f) {
        var d;
        if (f && f.constructor == Array && f.length == 3) return f;
        if (d = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)) return [parseInt(d[1]), parseInt(d[2]), parseInt(d[3])];
        if (d = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)) return [parseFloat(d[1]) * 2.55, parseFloat(d[2]) * 2.55, parseFloat(d[3]) * 2.55];
        if (d = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)) return [parseInt(d[1], 16), parseInt(d[2], 16), parseInt(d[3], 16)];
        if (d = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)) return [parseInt(d[1] + d[1], 16), parseInt(d[2] + d[2], 16), parseInt(d[3] + d[3], 16)];
        return g[b.trim(f).toLowerCase()]
    }
    function e(f, d) {
        var h;
        do {
            h = b.curCSS(f, d);
            if (h != "" && h != "transparent" || b.nodeName(f, "body")) break;
            d = "backgroundColor"
        } while ( f = f . parentNode );
        return c(h)
    }
    b.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"],
    function(f, d) {
        b.fx.step[d] = function(h) {
            if (h.state == 0) {
                h.start = e(h.elem, d);
                h.end = c(h.end)
            }
            h.elem.style[d] = "rgb(" + [Math.max(Math.min(parseInt(h.pos * (h.end[0] - h.start[0]) + h.start[0]), 255), 0), Math.max(Math.min(parseInt(h.pos * (h.end[1] - h.start[1]) + h.start[1]), 255), 0), Math.max(Math.min(parseInt(h.pos * (h.end[2] - h.start[2]) + h.start[2]), 255), 0)].join(",") + ")"
        }
    });
    var g = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0]
    }
})(jQuery);
jQuery.cookie = function(b, c, e) {
    if (arguments.length > 1 && String(c) !== "[object Object]") {
        e = jQuery.extend({},
        e);
        if (c === null || c === undefined) e.expires = -1;
        if (typeof e.expires === "number") {
            var g = e.expires,
            f = e.expires = new Date;
            f.setDate(f.getDate() + g)
        }
        c = String(c);
        return document.cookie = [encodeURIComponent(b), "=", e.raw ? c: encodeURIComponent(c), e.expires ? "; expires=" + e.expires.toUTCString() : "", e.path ? "; path=" + e.path: "", e.domain ? "; domain=" + e.domain: "", e.secure ? "; secure": ""].join("")
    }
    e = c || {};
    f = e.raw ?
    function(d) {
        return d
    }: decodeURIComponent;
    return (g = (new RegExp("(?:^|; )" + encodeURIComponent(b) + "=([^;]*)")).exec(document.cookie)) ? f(g[1]) : null
};
if (!window.JSON) window.JSON = {};

(function() {
    function b(r) {
        return r < 10 ? "0" + r: r
    }
    function c(r) {
        d.lastIndex = 0;
        return d.test(r) ? '"' + r.replace(d,
        function(u) {
            var o = k[u];
            return typeof o === "string" ? o: "\\u" + ("0000" + u.charCodeAt(0).toString(16)).slice( - 4)
        }) + '"': '"' + r + '"'
    }
    function e(r, u) {
        var o, m, q = h,
        v, w = u[r];
        if (w && typeof w === "object" && typeof w.toJSON === "function") w = w.toJSON(r);
        if (typeof l === "function") w = l.call(u, r, w);
        switch (typeof w) {
        case "string":
            return c(w);
        case "number":
            return isFinite(w) ? String(w) : "null";
        case "boolean":
        case "null":
            return String(w);
        case "object":
            if (!w) return "null";
            h += j;
            v = [];
            if (Object.prototype.toString.apply(w) === "[object Array]") {
                m = w.length;
                for (r = 0; r < m; r += 1)
                v[r] = e(r, w) || "null";
                u = v.length === 0 ? "[]": h ? "[\n" + h + v.join(",\n" + h) + "\n" + q + "]": "[" + v.join(",") + "]";
                h = q;
                return u
            }
            if (l && typeof l === "object") {
                m = l.length;
                for (r = 0; r < m; r += 1) {
                    o = l[r];
                    if (typeof o === "string") if (u = e(o, w)) v.push(c(o) + (h ? ": ": ":") + u)
                }
            }
            else {
                for (o in w)
                if (Object.hasOwnProperty.call(w, o)) if (u = e(o, w)) {
                    v.push(c(o) + (h ? ": ": ":") + u);
                }
            }
            u = v.length === 0 ? "{}": h ? "{\n" + h + v.join(",\n" + h) + "\n" + q + "}": "{" + v.join(",") + "}";
            h = q;
            return u
        }
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + b(this.getUTCMonth() + 1) + "-" + b(this.getUTCDate()) + "T" + b(this.getUTCHours()) + ":" + b(this.getUTCMinutes()) + ":" + b(this.getUTCSeconds()) + "Z": null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        }
    }
    var g = window.JSON,
    f = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    d = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    h, j, k = {
        "\u0008": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\u000c": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    },
    l;
    if (typeof g.stringify !== "function") g.stringify = function(r, u, o) {
        var m;
        j = h = "";
        if (typeof o === "number") for (m = 0; m < o; m += 1) j += " ";
        else if (typeof o === "string") j = o;
        if ((l = u) && typeof u !== "function" && (typeof u !== "object" || typeof u.length !== "number")) throw new Error("JSON.stringify");
        return e("", {
            "": r
        })
    };
    if (typeof g.parse !== "function") g.parse = function(r, u) {
        function o(m, q) {
            var v, w, B = m[q];
            if (B && typeof B === "object") for (v in B) if (Object.hasOwnProperty.call(B, v)) {
                w = o(B, v);
                if (w !== undefined) B[v] = w;
                else delete B[v]
            }
            return u.call(m, q, B)
        }
        r = String(r);
        f.lastIndex = 0;
        if (f.test(r)) r = r.replace(f,
        function(m) {
            return "\\u" + ("0000" + m.charCodeAt(0).toString(16)).slice( - 4)
        });
        if (/^[\],:{}\s]*$/.test(r.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
            r = eval("(" + r + ")");
            return typeof u === "function" ? o({
                "": r
            },
            "") : r
        }
        throw new SyntaxError("JSON.parse");
    }
})();

(function() {
    var b = function(o) {
        var m = [],
        q = o.length * 8,
        v;
        for (v = 0; v < q; v += 8)
        m[v >> 5] |= (o.charCodeAt(v / 8) & 255) << 24 - v % 32;
        return m
    },
    c = function(o) {
        var m = [],
        q = o.length,
        v,
        w;
        for (v = 0; v < q; v += 2) {
            w = parseInt(o.substr(v, 2), 16);
            if (isNaN(w)) return "INVALID HEX STRING";
            else m[v >> 3] |= w << 24 - 4 * (v % 8)
        }
        return m
    },
    e = function(o) {
        var m = "",
        q = o.length * 4,
        v, w;
        for (v = 0; v < q; v += 1) {
            w = o[v >> 2] >> (3 - v % 4) * 8;
            m += "0123456789abcdef".charAt(w >> 4 & 15) + "0123456789abcdef".charAt(w & 15)
        }
        return m
    },
    g = function(o) {
        var m = "",
        q = o.length * 4,
        v, w, B;
        for (v = 0; v < q; v += 3) {
            B = (o[v >> 2] >> 8 * (3 - v % 4) & 255) << 16 | (o[v + 1 >> 2] >> 8 * (3 - (v + 1) % 4) & 255) << 8 | o[v + 2 >> 2] >> 8 * (3 - (v + 2) % 4) & 255;
            for (w = 0; w < 4; w += 1)
            m += v * 8 + w * 6 <= o.length * 32 ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(B >> 6 * (3 - w) & 63) : ""
        }
        return m
    },
    f = function(o, m) {
        return o << m | o >>> 32 - m
    },
    d = function(o, m, q) {
        return o ^ m ^ q
    },
    h = function(o, m, q) {
        return o & m ^ ~o & q
    },
    j = function(o, m, q) {
        return o & m ^ o & q ^ m & q
    },
    k = function(o, m) {
        var q = (o & 65535) + (m & 65535);
        return ((o >>> 16) + (m >>> 16) + (q >>> 16) & 65535) << 16 | q & 65535
    },
    l = function(o, m, q, v, w) {
        var B = (o & 65535) + (m & 65535) + (q & 65535) + (v & 65535) + (w & 65535);
        return ((o >>> 16) + (m >>> 16) + (q >>> 16) + (v >>> 16) + (w >>> 16) + (B >>> 16) & 65535) << 16 | B & 65535
    },
    r = function(o, m) {
        var q = [],
        v,
        w,
        B,
        D,
        I,
        p,
        n,
        z,
        A = [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
        E = [1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1518500249, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 1859775393, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 2400959708, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782, 3395469782];
        o[m >> 5] |= 128 << 24 - m % 32;
        o[(m + 65 >> 9 << 4) + 15] = m;
        z = o.length;
        for (p = 0; p < z; p += 16) {
            m = A[0];
            v = A[1];
            w = A[2];
            B = A[3];
            D = A[4];
            for (n = 0; n < 80; n += 1) {
                q[n] = n < 16 ? o[n + p] : f(q[n - 3] ^ q[n - 8] ^ q[n - 14] ^ q[n - 16], 1);
                I = n < 20 ? l(f(m, 5), h(v, w, B), D, E[n], q[n]) : n < 40 ? l(f(m, 5), d(v, w, B), D, E[n], q[n]) : n < 60 ? l(f(m, 5), j(v, w, B), D, E[n], q[n]) : l(f(m, 5), d(v, w, B), D, E[n], q[n]);
                D = B;
                B = w;
                w = f(v, 30);
                v = m;
                m = I
            }
            A[0] = k(m, A[0]);
            A[1] = k(v, A[1]);
            A[2] = k(w, A[2]);
            A[3] = k(B, A[3]);
            A[4] = k(D, A[4])
        }
        return A
    },
    u = function(o, m) {
        this.strToHash = this.strBinLen = this.sha1 = null;
        if ("HEX" === m) {
            if (0 !== o.length % 2) return "TEXT MUST BE IN BYTE INCREMENTS";
            this.strBinLen = o.length * 4;
            this.strToHash = c(o)
        }
        else if ("ASCII" === m || "undefined" === typeof m) {
            this.strBinLen = o.length * 8;
            this.strToHash = b(o)
        }
        else return "UNKNOWN TEXT INPUT TYPE"
    };
    u.prototype = {
        getHash: function(o) {
            var m = null,
            q = this.strToHash.slice();
            switch (o) {
            case "HEX":
                m = e;
                break;
            case "B64":
                m = g;
                break;
            default:
                return "FORMAT NOT RECOGNIZED"
            }
            if (null === this.sha1) this.sha1 = r(q, this.strBinLen);
            return m(this.sha1)
        },
        getHMAC: function(o, m, q) {
            var v;
            v = [];
            var w = [];
            switch (q) {
            case "HEX":
                q = e;
                break;
            case "B64":
                q = g;
                break;
            default:
                return "FORMAT NOT RECOGNIZED"
            }
            if ("HEX" === m) {
                if (0 !== o.length % 2) return "KEY MUST BE IN BYTE INCREMENTS";
                m = c(o);
                o = o.length * 4
            }
            else if ("ASCII" === m) {
                m = b(o);
                o = o.length * 8
            }
            else return "UNKNOWN KEY INPUT TYPE";
            if (64 < o / 8) {
                m = r(m, o);
                m[15] &= 4294967040
            }
            else if (64 > o / 8) m[15] &= 4294967040;
            for (o = 0; o <= 15; o += 1) {
                v[o] = m[o] ^ 909522486;
                w[o] = m[o] ^ 1549556828
            }
            v = r(v.concat(this.strToHash), 512 + this.strBinLen);
            v = r(w.concat(v), 672);
            return q(v)
        }
    };
    window.jsSHA = u
})();

var Router = function() {
    var b;
    if (!window.history.pushState) return null;
    b = new Backbone.Router({
        routes: {
            "pin/:pinID/": "zoom",
            "pin/:pinID/repin/": "repin",
            ".*": "other"
        }
    });
    Backbone.history.start({
        pushState: true,
        silent: true
    });
    return b
} ();
var BoardLayout = function() {
    return {
        setup: function(b) {
            if (!this.setupComplete) {
                this.setupFlow();
                $(function() {
                    if (window.userIsAuthenticated) {
                        Like.gridListeners();
                        Follow.listeners();
                        Comment.gridComment();
                        RepinDialog2.setup()
                    }
                    Zoom.setup()
                });
                this.center = !!b;
                this.setupComplete = true
            }
        },
        setupFlow: function(b) {
            if (!this.flowSetupComplete) {
                BoardLayout.allPins();
                b || $(window).resize(_.throttle(function() {
                    BoardLayout.allPins()
                },
                200));
                this.flowSetupComplete = true
            }
        },
        pinsContainer: ".BoardLayout",
        pinArray: [],
        orderedPins: [],
        mappedPins: {},
        nextPin: function(b) {
            b = this.orderedPins.indexOf(b) + 1;
            if (b >= this.orderedPins.length) return 0;
            return this.orderedPins[b]
        },
        previousPin: function(b) {
            b = this.orderedPins.indexOf(b) - 1;
            if (b >= this.orderedPins.length) return 0;
            return this.orderedPins[b]
        },
        columnCount: 4,
        columns: 0,
        columnWidthInner: 192,
        columnMargin: 15,
        columnPadding: 30,
        columnContainerWidth: 0,
        allPins: function() {
            var b = $(this.pinsContainer + " .pin"),
            c = this.getContentArea();
            this.columnWidthOuter = this.columnWidthInner + this.columnMargin + this.columnPadding;
            this.columns = Math.max(this.columnCount, parseInt(c / this.columnWidthOuter, 10));
            if (b.length < this.columns) this.columns = Math.max(this.columnCount, b.length);
            c = this.columnWidthOuter * this.columns - this.columnMargin;
            var e = document.getElementById("wrapper");
            if (e) e.style.width = c + "px";
            $(".LiquidContainer").css("width", c + "px");
            for (c = 0; c < this.columns; c++)
            this.pinArray[c] = 0;
            document.getElementById("SortableButtons") ? this.showPins() : this.flowPins(b, true);
            if ($("#ColumnContainer .pin").length === 0 && window.location.pathname === "/") {
                $("#ColumnContainer").addClass("empty");
                setTimeout(function() {
                    window.location.reload()
                },
                5E3)
            }
        },
        newPins: function() {
            var b = window.jQuery ? ":last": ":last-of-type",
            c = $(this.pinsContainer + b + " .pin");
            c = c.length > 0 ? c: $(this.pinsContainer + b + " .pin");
            this.flowPins(c)
        },
        flowPins: function(b, c) {
            if (c) {
                this.mappedPins = {};
                this.orderedPins = []
            }
            if (this.pinArray.length > this.columns) this.pinArray = this.pinArray.slice(0, this.columns);
            for (c = 0; c < b.length; c++)
            this.positionPin(b[c]);
            this.updateContainerHeight();
            this.showPins();

            window.useLazyLoad && LazyLoad.invalidate()
        },
        positionPin: function(b) {
            var c = $(b).attr("data-id");
            if (c && this.mappedPins[c]) $(b).remove();
            else {
                var e = _.indexOf(this.pinArray, Math.min.apply(Math, this.pinArray)),
                g = this.shortestColumnTop = this.pinArray[e];
                b.style.top = g + "px";
                b.style.left = e * this.columnWidthOuter + "px";
                b.setAttribute("data-col", e);
                this.pinArray[e] = g + b.offsetHeight + this.columnMargin;
                this.mappedPins[c] = this.orderedPins.length;
                this.orderedPins.push(c)
            }
        },
        showPins: function() {
            $.browser.msie && parseInt($.browser.version, 10) == 7 || $(this.pinsContainer).css("opacity", 1);
            var b = $(this.pinsContainer);
            setTimeout(function() {
                b.css({
                    visibility: "visible"
                })
            },
            200)
        },
        imageLoaded: function() {
            $(this).removeClass("lazy")
        },
        getContentArea: function() {
            return this.contentArea || document.documentElement.clientWidth
        },
        updateContainerHeight: function() {
            $("#ColumnContainer").height(Math.max.apply(Math, this.pinArray))
        }
    }
} ();
var LazyLoad = new(function() {
    var b = this,
    c = 0,
    e = 0,
    g = 100,
    f = $(window);
    b.images = {};
    b.invalidate = function() {
        $("img.lazy").each(function(u, o) {
            u = $(o);
            b.images[u.attr("data-id")] = u;
            h(u) && j(u)
        })
    };
    b.check = function() {
        var u, o = false;
        return function() {
            if (!o) {
                o = true;
                clearTimeout(u);
                u = setTimeout(function() {
                    o = false;
                    d()
                },
                200)
            }
        }
    } ();
    var d = function() {
        var u = 0,
        o = 0;
        for (var m in b.images) {
            var q = b.images[m];
            u++;
            if (h(q)) {
                j(q);
                o++
            }
        }
    };
    b.stop = function() {
        f.unbind("scroll", k);
        f.unbind("resize", l)
    };
    var h = function(u) {
        return u.offset().top <= g
    },
    j = function(u) {
        if (u.hasClass("lazy")) {
            var o = u.attr("data-src"),
            m = u.attr("data-id");
            u.load(function() {
                if (u[0]) u[0].style.opacity = "1";
                delete b.images[m]
            });
            u.attr("src", o);
            u.removeClass("lazy");
            if (u[0]) u[0].style.opacity = "0"
        }
    },
    k = function() {
        c = $(window).scrollTop();
        r();
        b.check()
    },
    l = function() {
        e = $(window).height();
        r();
        b.check()
    },
    r = function() {
        g = c + e + 600
    };
    if (window.useLazyLoad) {
        f.ready(function() {
            k();
            l()
        });
        f.scroll(k);
        f.resize(l)
    }
});
var FancySelect = function() {
    var b;
    return {
        setup: function(c, e, g) {
            function f() {
                b.hide();
                j.hide()
            }
            function d() {
                j.show();
                b.show()
            }
            var h = $('<div class="FancySelect"><div class="current"><span class="CurrentSelection"></span><span class="DownArrow"></span></div><div class="FancySelectList"><div class="wrapper"><ul></ul></div></div></div>'),
            j = $(".FancySelectList", h),
            k = $("ul", j),
            l = $(".CurrentSelection", h),
            r = "",
            u,
            o;
            b || (b = $('<div class="FancySelectOverlay"></div>').appendTo("body"));
            c = $(c);
            u = c.prop("selectedIndex");
            e = e ||
            function() {
                return '<li data="' + $(this).val() + '"><span>' + $(this).text() + "</span></li>"
            };
            o = $("option", c);
            o.each(function(m) {
                r += e.call(this, m, m === u)
            });
            k.html(r);
            l.text(o.eq(u).text());
            c.before(h);
            c.hide();
            h.click(function() {
                d()
            });
            b.click(function() {
                f()
            });
            k.on("click", "li",
            function() {
                var m = $(this).prevAll().length;
                l.text($(this).text());
                c.prop("selectedIndex", m);
                f();
                g && g($(this).attr("data"));
                return false
            })
        }
    }
} ();

var boardPicker = function() {
    return {
        setup: function(b, c, e) {
            b = $(b);
            var g = $(".boardListOverlay", b.parent()),
            f = $(".boardList", b),
            d = $(".currentBoard", b),
            h = $("ul", f);
            b.click(function() {
                f.show();
                g.show()
            });
            g.click(function() {
                f.hide();
                g.hide()
            });
            $(h).on("click", "li",
            function() {
                if (!$(this).hasClass("noSelect")) {
                    d.text($(this).text());
                    g.hide();
                    f.hide();
                    c && c($(this).attr("data"))
                }
                return false
            });
            b = $(".createBoard", f);
            var j = $("input", b),
            k = $(".Button", b),
            l = $(".CreateBoardStatus", b);
            j.defaultValue("Create New Board");
            k.click(function() {
                if (k.attr("disabled") == "disabled") return false;
                if (j.val() == "Create New Board") {
                    l.html("Enter a board name").css("color", "red").show();
                    return false
                }
                l.html("").hide();
                k.addClass("disabled").attr("disabled", "disabled");
                $.post("/board/create/", {
                    name: j.val(),
                    pass_category: true
                },
                function(r) {
                    if (r && r.status == "success") {
                        h.append("<li data='" + r.id + "'><span>" + $("<div/>").text(r.name).html() + "</span></li>");
                        f.hide();
                        d.text(r.name);
                        j.val("").blur();
                        k.removeClass("disabled").removeAttr("disabled");
                        e && e(r.id)
                    }
                    else {
                        l.html(r.message).css("color", "red").show();
                        k.removeClass("disabled").removeAttr("disabled")
                    }
                },
                "json");
                return false
            })
        }
    }
} ();

var CropImage = function() {
    this.initialize.apply(this, arguments)
};

(function() {
    var b = Backbone.View.extend({
        el: "#CropImage",
        events: {
            "click .cancel": "onClose",
            "click .save": "onSave",
            "mousedown .drag": "onStartDrag"
        },
        dragging: false,
        mousePosition: {},
        initialize: function() {
            _.bindAll(this, "onDragging", "onStopDragging", "onImageLoaded");
            _.defaults(this.options, {
                title: "Crop Image",
                buttonTitle: "Save",
                size: {
                    width: 222,
                    height: 150
                }
            });
            this.$holder = this.$el.find(".holder");
            this.$bg = this.$el.find(".holder .bg");
            this.$overlay = this.$el.find(".holder .overlayContent");
            this.$frame = this.$el.find(".holder .frame");
            this.$mask = this.$el.find(".holder .mask");
            this.$footer = this.$el.find(".footer");
            this.$button = this.$el.find(".footer .Button.save");
            this.$spinner = this.$el.find(".holder .spinner")
        },
        render: function() {
            this.$el.find(".header span").text(this.options.title);
            this.$button.text(this.options.buttonTitle).removeClass("disabled");
            this.$holder.show().css("height", this.options.size.height + 120 + 40);
            this.$footer.find(".buttons").css("visibility", "visible");
            this.$footer.find(".complete").hide();
            this.$bg.html("").show();
            this.$spinner.hide();
            this.options.className && this.$el.addClass(this.options.className);
            this.options.overlay && this.$overlay.html("").append(this.options.overlay);
            var c = this.bounds = {
                left: this.$holder.width() / 2 - this.options.size.width / 2,
                width: this.options.size.width,
                top: 60,
                height: this.options.size.height
            };
            c.ratio = c.height / c.width;
            this.$frame.css(c);
            this.$mask.find("span").each(function(e, g) {
                e === 0 && $(g).css({
                    top: 0,
                    left: 0,
                    right: 0,
                    height: c.top
                });
                e === 1 && $(g).css({
                    top: c.top,
                    left: c.left + c.width,
                    right: 0,
                    height: c.height
                });
                e === 2 && $(g).css({
                    top: c.top + c.height,
                    left: 0,
                    right: 0,
                    bottom: 0
                });
                e === 3 && $(g).css({
                    top: c.top,
                    left: 0,
                    width: c.left,
                    height: c.height
                })
            });
            this.options.image && this.setImage(this.options.image)
        },
        onClose: function() {
            this.trigger("close");
            return false
        },
        onSave: function() {
            this.trigger("save");
            return false
        },
        onImageLoaded: function(c) {
            if (this.$img.height() === 0) return setTimeout(this.onImageLoaded, 200, c);
            this.$img.removeAttr("width").removeAttr("height");
            c = this.imageBounds = {
                originalWidth: this.$img.width(),
                originalHeight: this.$img.height()
            };
            c.ratio = c.originalHeight / c.originalWidth;
            this.$img.css({
                visibility: "visible",
                opacity: 1
            });
            this.fitImage();
            this.centerImage();
            this.hideSpinner()
        },
        onStartDrag: function(c) {
            this.mousePosition = {
                x: c.pageX,
                y: c.pageY
            };
            this.startPosition = {
                x: parseInt(this.$bg.css("left"), 10),
                y: parseInt(this.$bg.css("top"), 10)
            };
            this.trigger("startDrag");
            this.dragging = true;
            $("body").on({
                mousemove: this.onDragging,
                mouseup: this.onStopDragging
            });
            c.preventDefault()
        },
        onDragging: function(c) {
            var e = {
                top: this.startPosition.y + (c.pageY - this.mousePosition.y),
                left: this.startPosition.x + (c.pageX - this.mousePosition.x)
            };
            if (this.enforceBounds(e)) {
                this.$bg.css(e);
                c.preventDefault()
            }
        },
        onStopDragging: function() {
            this.trigger("stopDrag");
            this.dragging = false;
            $("body").off({
                mousemove: this.onDragging,
                mouseup: this.onStopDragging
            })
        },
        enforceBounds: function(c) {
            c.top = Math.min(c.top, this.bounds.top);
            c.left = Math.min(c.left, this.bounds.left);
            if (c.left + this.imageBounds.width < this.bounds.left + this.bounds.width) c.left = this.bounds.left + this.bounds.width - this.imageBounds.width + 1;
            if (c.top + this.imageBounds.height < this.bounds.top + this.bounds.height) c.top = this.bounds.top + this.bounds.height - this.imageBounds.height + 1;
            return c
        },
        showComplete: function() {
            this.$footer.find(".buttons").css("visibility", "hidden");
            this.$footer.find(".complete").fadeIn(300);
            this.hideSpinner()
        },
        setImage: function(c) {
            this.showSpinner();
            var e = this.$img = $("<img>");
            e.load(this.onImageLoaded).css({
                opacity: "0.01",
                visibility: "hidden"
            });
            e.attr("src", c);
            this.$bg.html(e)
        },
        fitImage: function() {
            var c = 1;
            c = this.imageBounds.ratio >= this.bounds.ratio ? this.bounds.width / this.imageBounds.originalWidth: this.bounds.height / this.imageBounds.originalHeight;
            this.scaleImage(c, 10)
        },
        centerImage: function() {
            var c = this.$holder.height() - 40,
            e = this.$holder.width();
            this.$bg.css({
                top: c / 2 - this.$bg.height() / 2 + 1,
                left: e / 2 - this.$bg.width() / 2 + 1
            })
        },
        scaleImage: function(c, e) {
            var g = this.imageBounds.width = this.imageBounds.originalWidth * c + e || 0;
            c = this.imageBounds.height = this.imageBounds.originalHeight * c + e || 0;
            this.$img.attr("width", g);
            this.$img.attr("height", c)
        },
        getOffset: function() {
            return {
                x: Math.abs(parseInt(this.$bg.css("left"), 10) - this.bounds.left),
                y: Math.abs(parseInt(this.$bg.css("top"), 10) - this.bounds.top)
            }
        },
        getScale: function() {
            return this.$img.width() / this.imageBounds.originalWidth
        },
        saving: function() {
            this.showSpinner();
            this.$button.addClass("disabled")
        },
        showSpinner: function() {
            this.$spinner.show()
        },
        hideSpinner: function() {
            this.$spinner.hide()
        }
    });
    CropImage.prototype = {
        initialize: function() {
            _.bindAll(this, "save", "close")
        },
        show: function(c) {
            var e = this;
            c = this.view = new b(c);
            this.options = this.view.options;
            c.on("save", this.save);
            c.on("close", this.close);
            c.on("stopDrag",
            function() {
                e.trigger("dragComplete")
            });
            Modal.show("CropImage");
            c.render()
        },
        setImage: function(c) {
            this.view.setImage(c)
        },
        setParams: function(c) {
            this.options.params = c
        },
        save: function() {
            var c = this,
            e = this.view.getOffset(),
            g = this.view.getScale();
            e = _.extend({
                x: e.x,
                y: e.y,
                width: this.options.size.width,
                height: this.options.size.height,
                scale: g
            },
            this.options.params || {});
            this.view.saving();
            this.trigger("saving", e);
            $.ajax({
                url: this.options.url,
                data: e,
                dataType: "json",
                type: "POST",
                success: function(f) {
                    c.view.hideSpinner();
                    c.trigger("save", f);
                    c.options.delay !== 0 && c.view.showComplete();
                    setTimeout(c.close, c.options.delay || 1200)
                }
            })
        },
        close: function() {
            Modal.close("CropImage");
            this.view.undelegateEvents();
            this.trigger("close");
            delete this.view;
            delete this.options
        }
    };
    _.extend(CropImage.prototype, Backbone.Events)
})();
var BoardCoverSelector = function() {
    this.initialize.apply(this, arguments)
};
(function() {
    var b = null;
    BoardCoverSelector.prototype = {
        pins: null,
        index: null,
        boardURL: null,
        initialize: function() {
            if (b) {
                b.cancel();
                b = null
            }
            _.bindAll(this, "onKeyup", "onPinsLoaded", "onSave", "onSaving", "removeListeners", "next", "previous");
            b = this;
            this.options = {};
            this.imageCrop = new CropImage;
            this.imageCrop.on("close", this.removeListeners);
            this.imageCrop.on("save", this.onSave);
            this.imageCrop.on("saving", this.onSaving);
            this.imageCrop.on("dragComplete",
            function() {
                trackGAEvent("board_cover", "dragged")
            });
            this.$img = $("<img>")
        },
        loadPins: function() {
            $.ajax({
                url: this.options.boardURL + "pins/",
                dataType: "json",
                success: this.onPinsLoaded
            });
            this.boardURL = this.options.boardURL
        },
        show: function(c) {
            this.options = c;
            this.imageCrop.show({
                className: "BoardCover",
                overlay: this.overlayContent(),
                params: {
                    pin: c.pin
                },
                image: this.options.image,
                size: {
                    width: 222,
                    height: 150
                },
                title: c.title || "Select a cover photo and drag to position it.",
                buttonTitle: c.buttonTitle || "Set Cover",
                url: this.options.boardURL + "cover/",
                delay: c.delay
            });
            if (!this.pins || this.boardURL != this.options.boardURL) this.loadPins();
            else this.options.image || this.setIndex(0);
            trackGAEvent("board_cover", "show");
            $("body").keyup(this.onKeyup)
        },
        onPinsLoaded: function(c) {
            var e = null;
            if (this.options.image) {
                var g = this.options.image;
                _.each(c.pins,
                function(f, d) {
                    if (e == null && g.match(new RegExp(f.image_key, "gi"))) e = d
                })
            }
            this.index = e || 0;
            this.pins = c.pins;
            if (this.pins.length !== 0) {
                this.pins.length === 1 ? this.hideArrows() : this.preload([e - 1, e + 1]);
                e === null && this.setIndex(0)
            }
        },
        onKeyup: function(c) {
            if (this.index !== null) {
                c.keyCode === 37 && this.previous();
                c.keyCode === 39 && this.next();
                c.keyCode === 27 && this.imageCrop.close();
                c.keyCode === 13 && this.imageCrop.save()
            }
        },
        overlayContent: function() {
            var c = this.$holder = $("<div class='BoardOverlay'></div>"),
            e = $('<button class="prev Button WhiteButton Button13" type="button"><em></em></button>').click(this.previous),
            g = $('<button class="next Button WhiteButton Button13" type="button"><em></em></button>').click(this.next);
            c.append("<h3 class='serif'>" + this.options.boardName + "</h3>");
            c.append(e, g);
            return c
        },
        next: function() {
            this.index === this.pins.length - 1 ? this.setIndex(0) : this.setIndex(this.index + 1);
            trackGAEvent("board_cover", "toggle_pin");
            return false
        },
        previous: function() {
            this.index === 0 ? this.setIndex(this.pins.length - 1) : this.setIndex(this.index - 1);
            trackGAEvent("board_cover", "toggle_pin");
            return false
        },
        setIndex: function(c) {
            var e = this.pins[c];
            if (e) {
                this.imageCrop.setImage(e.url);
                this.imageCrop.setParams({
                    pin: e.id
                });
                this.index = c;
                this.preload([this.index - 2, this.index - 1, this.index + 1, this.index + 2])
            }
        },
        preload: function(c) {
            var e = this;
            _.each(c,
            function(g) {
                if (g = e.pins[g])(new Image).src = g.url
            })
        },
        hideArrows: function() {
            this.$holder.find(".arrow").hide()
        },
        removeListeners: function() {
            $("body").unbind("keyup", this.onKeyup)
        },
        onSaving: function() {
            this.hideArrows()
        },
        onSave: function(c) {
            this.options.success && this.options.success(c);
            trackGAEvent("board_cover", "saved")
        }
    };
    _.extend(BoardCoverSelector.prototype, Backbone.Events)
})();

var AddDialog = function() {
    return {
        setup: function(b) {
            var c = "#" + b,
            e = $(c),
            g = $(".Buttons .RedButton", e),
            f = $(".mainerror", e),
            d = $(".DescriptionTextarea", e);
            BoardPicker.setup(c + " .BoardPicker",
            function(h) {
                $(c + " #id_board").val(h)
            },
            function(h) {
                $(c + " #id_board").val(h)
            });
            AddDialog.shareCheckboxes(b);
            Tagging.initTextarea(c + " .DescriptionTextarea");
            Tagging.priceTag(c + " .DescriptionTextarea", c + " .ImagePicker");
            CharacterCount.setup(c + " .DescriptionTextarea", c + " .CharacterCount", c + " .Button");
            g.click(function() {
                if (g.hasClass("disabled")) return false;
                trackGAEvent("pin", "clicked", "add_dialogue");
                if (d.val() === "" || d.val() === "Describe your pin...") {
                    f.html("Please describe your pin").slideDown(300);
                    return false
                }
                else f.slideUp(300,
                function() {
                    f.html("")
                });
                g.addClass("disabled").html("Pinning...");
                $("#id_details", e).val(d.val());
                Tagging.loadTags(c + " .DescriptionTextarea", c + " #peeps_holder", c + " #id_tags", c + " #currency_holder");
                $("form", e).ajaxSubmit({
                    url: "/pin/create/",
                    type: "POST",
                    dataType: "json",
                    iframe: true,
                    success: function(h) {
                        if (h.status == "success") {
                            trackGAEvent("pin", "success", "add_dialogue");
                            window.location = h.url
                        }
                        else if (h.captcha) {
                            RecaptchaDialog.challenge();
                            AddDialog.reset(b)
                        }
                        else f.html(h.message).slideDown(300)
                    }
                });
                return false
            })
        },
        reset: function(b) {
            b === "CreateBoard" && CreateBoardDialog.reset();
            b === "ScrapePin" && ScrapePinDialog.reset();
            b === "UploadPin" && UploadPinDialog.reset();
            AddDialog._resets[b] && AddDialog._resets[b]()
        },
        close: function(b, c) {
            $("#" + b).addClass("super");
            Modal.show(c)
        },
        childClose: function(b, c) {
            var e = this,
            g = $("#" + c);
            $(".ModalContainer", g);
            e.reset(c);
            $("#" + b).removeClass("super");
            Modal.close(b);
            Modal.close(c)
        },
        pinBottom: function(b) {
            var c = $("#" + b);
            $(".PinBottom", c).slideDown(300,
            function() {
                var e = $(".modal:first", c);
                e.css("margin-bottom", "-" + e.outerHeight() / 2 + "px")
            })
        },
        shareCheckboxes: function(b) {
            function c(f) {
                var d = $("#" + b),
                h = $(".publish_to_" + f, d),
                j = $("#id_publish_to_" + f, d);
                h.change(function() {
                    if (h.is(":checked")) {
                        j.attr("checked", "checked");
                        h.parent().addClass("active")
                    }
                    else {
                        j.removeAttr("checked");
                        h.parent().removeClass("active")
                    }
                });
                var k = h.is(":checked");
                return function() {
                    if (k) {
                        h.parent().addClass("active");
                        h.attr("checked", "checked")
                    }
                    else {
                        h.parent().removeClass("active");
                        h.removeAttr("checked")
                    }
                }
            }
            var e = c("facebook"),
            g = c("twitter");
            AddDialog._resets = AddDialog._resets || {};
            AddDialog._resets[b] = function() {
                e();
                g()
            }
        }
    }
} ();
var Home = function() {
    return {
        setup: function() {
            var b = null,
            c = $(window),
            e = false;
            $(document).ready(function() {
                if ($("#CategoriesBarPage #TopNagCallout").length) {
                    $("#SearchAutocompleteHolder ul").css("top", "71px");
                    $("#UnauthCallout .Nag").css("top", "110px")
                }
            });
            $(window).scroll(function() {
                var g = c.scrollTop() >= 44;
                if ($("#CategoriesBarPage #TopNagCallout").length) g = c.scrollTop() >= 80;
                b || (b = $("#CategoriesBar, .Nag"));
                if (!e && g) {
                    b.addClass("fixed");
                    e = true
                } else if (e && !g) {
                    b.removeClass("fixed");
                    e = false
                }
            });
            $("#home_request_invite_button").click(function() {
                var g = $(this);
                if ($("#home_request_invite").val() == "Your Email Address" || $("#home_request_invite").val() == "") $(".signup span").html("Please enter an email").css("color", "red");
                else {
                    g.addClass("pressed").attr("disabled", "disabled");
                    $.post("/", {
                        email: $("#home_request_invite").val()
                    },
                    function(f) {
                        if (f.status == "success") {
                            $(".signup span").html("Thanks. You're on the list!").css("color", "green");
                            $("#home_request_invite").val("")
                        } else {
                            $(".signup span").html(f.message).css("color", "red");
                            this_button.removeAttr("disabled").removeClass("pressed")
                        }
                    },
                    "json")
                }
                return false
            });
            $(".remove_activity_rec").live("click",
            function() {
                $this_element = $(this);
                $.get("/remove_follow_recommend/?rec_id=" + $(this).attr("data-remove_id"),
                function(g) {
                    if (g && g.status == "success") {
                        window.activity_feed.update_ui_followed_succeeded($this_element);
                        g = $(this).parent().siblings(".hidden")[0];
                        $(g).removeClass("hidden")
                    } else alert(g.message)
                })
            });
            $(".remove_activity_invite").live("click",
            function() {
                var g = $(this);
                $.get("/remove_invite/?rec_id=" + $(this).attr("data-remove_id"),
                function(f) {
                    if (f.status == "success") {
                        window.activity_feed.update_ui_invited_user(g);
                        f = $(this).parent().siblings(".hidden")[0];
                        $(f).removeClass("hidden")
                    } else alert(f.message)
                })
            });
            $("#follow_all_link").live("click",
            function() {
                $.get("/follow_all_recommends/",
                function(g) {
                    g && g.status == "success" ? window.activity_feed.update_ui_followed_all_recommened() : alert(g.message)
                })
            });
            $("#invite_all_link").live("click",
            function() {
                $.get("/invite_all/",
                function(g) {
                    g && g.status == "success" ? window.activity_feed.update_ui_invited_all_users() : alert(g.message)
                })
            })
        },
        activityFeedSupport: function() {
            this.init = function() {
                this.invite_all_link = $("#invite_all_link");
                this.follow_all_link = $("#follow_all_link")
            };
            this.update_ui_invited_user = function(b) {
                this.fade_row(b);
                if (this.invite_all_link && this.invite_all_link.length) if (this.invite_all_link.attr("data-total_count")) {
                    b = this.invite_all_link.attr("data-total_count");
                    if (b == "1") this.hide_invites();
                    else {
                        this.invite_all_link.attr("data-total_count", b - 1);
                        this.invite_all_link.html("Invite all (" + (b - 1) + ")")
                    }
                }
            };
            this.update_ui_followed_succeeded = function(b) {
                this.fade_row(b);
                if (this.follow_all_link && this.follow_all_link.length) if (this.follow_all_link.attr("data-total_count")) {
                    b = this.follow_all_link.attr("data-total_count");
                    if (b == "1") this.hide_recommends();
                    else {
                        this.follow_all_link.attr("data-total_count", b - 1);
                        this.follow_all_link.html("Follow all (" + (b - 1) + ")")
                    }
                }
            };
            this.update_ui_invited_all_users = function() {
                this.hide_invites()
            };
            this.update_ui_followed_all_recommened = function() {
                this.hide_recommends()
            };
            this.fade_row = function(b) {
                b.parents(".story:first").fadeOut()
            };
            this.hide_invites = function() {
                this.invite_all_link.parents("#invite_friends:first").fadeOut()
            };
            this.hide_recommends = function() {
                this.follow_all_link.parents("#recommended_friends:first").fadeOut()
            }
        }
    }
} ();
var GetNewPins = function() {
    return {
        timeout: null,
        timeoutLength: 8192,
        timeoutLengthMax: 524288,
        marker: 0,
        indicator: "#NewIndicator",
        newPins: {
            html: "",
            number: 0,
            old_title: $("title").html()
        },
        setTimeout: function() {
            var b = this;
            b.timeout = setTimeout("GetNewPins.checkForPins()", b.timeoutLength)
        },
        resetTimeout: function() {
            window.clearTimeout(this.timeout);
            this.setTimeout()
        },
        trigerOnScroll: function() {
            var b = this;
            b.setTimeout();
            $(window).bind("scroll",
            function() {
                b.timeoutLength = 8192;
                b.resetTimeout()
            })
        },
        checkForPins: function() {
            var b = this;
            $.get("/new/", {
                marker: b.marker,
                number: b.newPins.number
            },
            function(c) {
                if (c.number > 0) {
                    var e = b.indicator;
                    b.marker = c.marker;
                    b.newPins.html += c.html;
                    b.newPins.number += c.number;
                    $("title").html("(" + b.newPins.number + ") " + b.newPins.old_title);
                    $(e).html(c.total_number_str);
                    $(e).hasClass("Offscreen") && $(e).removeClass("Offscreen");
                    if (b.timeoutLength < b.timeoutLengthMax) b.timeoutLength *= 2;
                    b.setTimeout()
                }
            })
        },
        showNewPins: function() {
            var b = this,
            c = b.indicator;
            $(".feed").length > 0 ? $(".feed").after(b.newPins.html) : $("#ColumnContainer").prepend(b.newPins.html);
            BoardLayout.allPins();
            $(c).addClass("Offscreen");
            $(c).html("");
            $("title").html(b.newPins.old_title);
            b.newPins = {
                html: "",
                number: 0,
                old_title: $("title").html()
            };
            b.resetTimeout();
            $("html, body").animate({
                scrollTop: "0px"
            },
            400);
            return false
        }
    }
} ();
var BoardSort = BoardSort || {
    StartButton: "#slk_sort_boards",
    SaveButton: "#RearrangeButton",
    FollowButtons: ".followBoard .Button",
    Container: ".sortable",
    Objects: ".pinBoard",
    Helper: "#SortableButtons",
    showControls: function() {
        $(this.Helper).slideDown();
        $(this.FollowButtons).hide();
        $(this.Objects).addClass("inMotion")
    },
    hideControls: function() {
        $(this.Helper).slideUp();
        $(this.FollowButtons).show();
        $(this.Objects).removeClass("inMotion")
    },
    start: function() {
        this.showControls();
        $(this.Container).sortable();
        return false
    },
    save: function() {
        trackGAEvent("rearrange_board_save", "clicked");
        this.hideControls();
        $(this.Container).sortable("destroy");
        $(this.Objects).removeClass("inMotion");
        var b = [];
        $(this.Objects).each(function() {
            b.push(this.id.replace("board", ""))
        });
        $.post($(this.SaveButton).attr("href"), {
            order_array: b.toString()
        },
        function(c) {
            if (c.status == "success") {
                trackGAEvent("rearrange_board_save", "success");
                console.log("Sorting saved.");
                $("#SortStatus").html("Saved!").css("color", "green").stop().css("opacity", "1").animate({
                    opacity: "0"
                },
                5E3)
            } else {
                console.log("Sorting failed.");
                $("#SortStatus").html("Saved Failed &mdash; <a href='#' onclick='boardSort.save(); return false' style='font-weight: 300;'>Try Again</a>?").css("color", "#221919").css("opacity", "1")
            }
        });
        return false
    },
    cancel: function() {
        this.hideControls();
        window.location.reload();
        return false
    }
};
var Follow = function() {
    return {
        listeners: function() {
            var b = this;
            $(".followbutton").live("click",
            function() {
                trackGAEvent("follow_board", "clicked");
                b.followBoard($(this));
                return false
            });
            $(".unfollowbutton").live("click",
            function() {
                trackGAEvent("unfollow_board", "clicked");
                b.unfollowBoard($(this));
                return false
            });
            $(".followuserbutton").live("click",
            function() {
                trackGAEvent("follow_user", "clicked");
                b.followUser($(this));
                return false
            });
            $(".unfollowuserbutton").live("click",
            function() {
                trackGAEvent("unfollow_user", "clicked");
                b.unfollowUser($(this));
                return false
            });
            $(".ignorerecommendationbutton").live("click",
            function() {
                b.ignoreUser($(this));
                return false
            })
        },
        followBoard: function(b) {
            var c = this;
            this.setFollowBoardButton(b, {
                follow: false,
                disabled: true
            });
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                error: function() {
                    c.setFollowBoardButton(b, {
                        follow: true,
                        disabled: false
                    })
                },
                success: function(e) {
                    if (e.status == "failure") {
                        if (e.captcha) {
                            RecaptchaDialog.challenge();
                            return false
                        }
                        c.setFollowBoardButton(b, {
                            follow: true,
                            disabled: true
                        });
                        alert(e.message);
                        return false
                    }
                    trackGAEvent("follow_board", "success");
                    c.setFollowBoardButton(b, {
                        follow: false,
                        disabled: false
                    })
                }
            })
        },
        unfollowBoard: function(b) {
            var c = this;
            this.setFollowBoardButton(b, {
                follow: true,
                disabled: true
            });
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                data: {
                    unfollow: 1
                },
                error: function() {
                    c.setFollowBoardButton(b, {
                        follow: false,
                        disabled: false
                    })
                },
                success: function() {
                    trackGAEvent("unfollow_board", "success");
                    c.setFollowBoardButton(b, {
                        follow: true,
                        disabled: false
                    })
                }
            })
        },
        followUser: function(b) {
            var c = $("#profile").length != 0 ? "Unfollow All": "Unfollow",
            e = this;
            if (b.data("text-unfollow")) c = b.data("text-unfollow");
            var g = b.text();
            b.text(c).removeClass("followuserbutton").addClass("disabled unfollowuserbutton").attr("disabled", "disabled");
            var f = $(".followbutton");
            f.each(function() {
                e.setFollowBoardButton($(this), {
                    follow: false,
                    disabled: false
                })
            });
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                error: function() {},
                success: function(d) {
                    if (d.status == "failure") {
                        if (d.captcha) {
                            RecaptchaDialog.challenge();
                            return false
                        }
                        b.text(g).removeClass("disabled clickable unfollowuserbutton").addClass("followuserbutton").attr("disabled", "disabled");
                        f.each(function() {
                            e.setFollowBoardButton($(this), {
                                follow: true,
                                disabled: false
                            })
                        });
                        alert(d.message);
                        return false
                    }
                    trackGAEvent("follow_user", "success");
                    b.removeAttr("disabled").addClass("clickable");
                    $(window).trigger("user:followed", [b])
                }
            })
        },
        unfollowUser: function(b) {
            var c = $("#profile").length != 0 ? "Follow All": "Follow",
            e = this;
            if (b.data("text-follow")) c = b.data("text-follow");
            b.text(c).removeClass("disabled clickable unfollowuserbutton").addClass("followuserbutton").attr("disabled", "disabled");
            $(".unfollowbutton").each(function() {
                e.setFollowBoardButton($(this), {
                    follow: true,
                    disabled: false
                })
            });
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                data: {
                    unfollow: 1
                },
                error: function() {},
                success: function() {
                    trackGAEvent("unfollow_user", "success");
                    b.removeAttr("disabled");
                    $(window).trigger("user:unfollowed", [b])
                }
            })
        },
        ignoreUser: function(b) {
            var c = _.map(b.closest(".section").find(".FollowStory"),
            function(e) {
                return $(e).attr("data-user-id")
            });
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                data: {
                    displayed_user_ids: c
                },
                error: function() {},
                success: function(e) {
                    var g = b.closest(".story"),
                    f = b.closest(".section"),
                    d = Follow.countStories(f);
                    trackGAEvent("ignore_user", "success", "source", b.data("source"));
                    e = $(e.html).css("padding-top", g.css("padding-top"));
                    e.insertAfter(g).hide();
                    Follow.replaceRecommendation(g, d, e, f)
                }
            })
        },
        replaceRecommendation: function(b, c, e, g) {
            b.fadeOut(350,
            function() {
                b.remove();
                Follow.handleChangingStories(c, Follow.countStories(g));
                e.fadeIn(350)
            })
        },
        countStories: function(b) {
            return b.find(".FollowStory").length
        },
        handleChangingStories: function(b, c) {
            if (c == 0) {
                var e = $("#UserRecommendations");
                e.fadeOut(350,
                function() {
                    e.remove()
                })
            }
            b != c && BoardLayout.allPins()
        },
        followUserHomeActivity: function(b) {
            $.ajax({
                url: b.attr("href"),
                type: "POST",
                dataType: "json",
                data: {
                    is_home: true
                },
                error: function() {},
                success: function() {
                    trackGAEvent("follow_user_home_activity", "success");
                    window.activity_feed.update_ui_followed_succeeded(b)
                }
            })
        },
        pullRecommendation: function(b, c) {
            b = _.map($(b).closest(".section").find(".FollowStory"),
            function(e) {
                return $(e).attr("data-user-id")
            });
            $.ajax({
                url: "/recommendations/",
                type: "GET",
                dataType: "json",
                data: {
                    displayed_user_ids: b
                },
                success: function(e) {
                    c($(e.html))
                }
            })
        },
        setFollowBoardButton: function(b, c) {
            var e = c.disabled;
            if (c.follow) {
                c = b.data("text-follow") || "Follow";
                b.removeClass("disabled clickable unfollowbutton").addClass("followbutton")
            } else {
                c = b.data("text-unfollow") || "Unfollow";
                b.removeClass("followbutton").addClass("disabled clickable unfollowbutton")
            }
            e ? b.attr("disabled", "disabled") : b.removeAttr("disabled");
            b.text(c)
        }
    }
} ();
var Comment = function() {
    return {
        gridShowButton: function(b) {
            b.show();
            BoardLayout.allPins()
        },
        gridComment: function() {
            var b = this;
            $(".write textarea");
            $("#ColumnContainer").on("focus", ".write .GridComment",
            function() {
                var c = $(this).parents(".pin").first(),
                e = $(this).parent().find(".Button");
                b.gridShowButton(e);
                e = b.getCommenters(c.find(".comments .comment"));
                c = b.getPinner(c.find("div.attribution:first"));
                e[c.link] = c;
                Tagging.initTextarea($(this), e)
            });
            $("#ColumnContainer").on("click", ".actions .comment",
            function() {
                trackGAEvent("comment_button", "clicked");
                var c = $(this),
                e = c.parents(".pin").find(".write"),
                g = e.find(".Button");
                if (c.hasClass("disabled")) {
                    e.slideUp("fast",
                    function() {
                        e.find("textarea").blur();
                        BoardLayout.allPins()
                    });
                    c.removeClass("disabled clickable")
                } else {
                    g.css("visibility", "hidden");
                    e.slideDown("fast",
                    function() {
                        g.css("visibility", "visible");
                        e.find("textarea").focus()
                    });
                    c.addClass("disabled clickable")
                }
                return false
            });
            $("#ColumnContainer").on("click", ".write .Button",
            function() {
                trackGAEvent("comment_submit", "clicked", "grid");
                var c = $(this),
                e = c.parent(),
                g = c.parents("form"),
                f = c.parents(".pin"),
                d = $(".CommentsCount", f),
                h = $("textarea", f),
                j = h.val(),
                k = $("div.comments", f),
                l = $(".all", f);
                if (j != "") {
                    Tagging.loadTags($(".GridComment", e), $(".pin_comment_replies", e));
                    if (!c.hasClass("disabled")) {
                        c.addClass("disabled");
                        $.ajax({
                            url: g.attr("action"),
                            type: "POST",
                            dataType: "json",
                            data: {
                                text: j,
                                replies: $(".pin_comment_replies", e).val(),
                                home: "1",
                                path: window.location.pathname
                            },
                            error: function(r) {
                                alert(r.message)
                            },
                            success: function(r) {
                                trackGAEvent("comment_submit", "success", "grid");
                                if (r.status == "fail" && r.captcha) {
                                    RecaptchaDialog.challenge();
                                    return false
                                }
                                var u = $(r.html).hide();
                                d.html(r.count_str);
                                if (l.length != 0) {
                                    l.before(u);
                                    l.html(r.all_str)
                                } else if (k.length === 0) {
                                    f.find(".attribution").after("<div class='comments colormuted'></div>");
                                    f.find(".comments").html(u);
                                    d.removeClass("hidden")
                                } else f.find("div.comments .comment:last").after(u);
                                h.remove();
                                g.prepend(h.clone().text(""));
                                u.slideDown("fast",
                                function() {
                                    BoardLayout.allPins()
                                })
                            },
                            complete: function() {
                                c.removeClass("disabled")
                            }
                        })
                    }
                }
            })
        },
        closeupComment: function() {
            var b = $("#CloseupComment"),
            c = $("#PostComment");
            b.focus(function() {
                $("#PinAddCommentControls").slideDown(250)
            });
            b.bind("keyup",
            function() {
                $("#CloseupComment").val() != "" ? c.removeClass("disabled") : c.addClass("disabled")
            });
            var e = this.getCommenters(".PinComments .comment"),
            g = this.getPinner("#PinPinner");
            e[g.link] = g;
            Tagging.initTextarea("#CloseupComment", e);
            c.click(function() {
                trackGAEvent("comment_submit", "clicked", "closeup");
                Tagging.loadTags("#CloseupComment", "#pin_comment_replies");
                var f = $(this),
                d = $("#pin_comment_replies").val(),
                h = b.val();
                if (h != "") {
                    $.trim(h);
                    if (!f.hasClass("disabled")) {
                        f.addClass("disabled");
                        $.ajax({
                            url: $("#post_comment_url").val(),
                            type: "POST",
                            dataType: "json",
                            data: {
                                text: h,
                                replies: d,
                                path: window.location.pathname
                            },
                            error: function(j) {
                                alert(j.message)
                            },
                            success: function(j) {
                                if (j.status == "fail" && j.captcha) {
                                    RecaptchaDialog.challenge(function() {
                                        f.removeClass("disabled")
                                    });
                                    return false
                                } else if (j.status == "fail") alert(j.message);
                                else {
                                    trackGAEvent("comment_submit", "success", "closeup");
                                    Tagging.initTextarea("#CloseupComment");
                                    b.val("");
                                    $("#pin_comment_replies").val("");
                                    var k = $(j.html).css({
                                        "background-color": "#fbffcc"
                                    });
                                    $(".PinComments").append(k)
                                }
                                k.removeClass("hidden").animate({
                                    backgroundColor: "#f2f0f0",
                                    display: "block"
                                },
                                1200)
                            }
                        })
                    }
                }
                return false
            })
        },
        zoomComment: function() {
            var b = $("#zoom"),
            c = $("#CloseupComment", b),
            e = $("#PostComment", b);
            c.focus(function() {
                $("#PinAddCommentControls", b).slideDown(250)
            });
            c.bind("keyup",
            function() {
                c.val() != "" ? e.removeClass("disabled") : e.addClass("disabled")
            });
            var g = this.getCommenters("#zoom .PinComments .comment"),
            f = this.getPinner("#PinPinner");
            g[f.link] = f;
            Tagging.initTextarea("#CloseupComment", g);
            e.click(function() {
                trackGAEvent("comment_submit", "clicked", "zoom");
                Tagging.loadTags("#CloseupComment", "#pin_comment_replies");
                var d = $(this),
                h = $("#pin_comment_replies", b).val(),
                j = c.val();
                if (j != "") {
                    $.trim(j);
                    if (!d.hasClass("disabled")) {
                        d.addClass("disabled");
                        $.ajax({
                            url: $("#post_comment_url", b).val(),
                            type: "POST",
                            dataType: "json",
                            data: {
                                text: j,
                                replies: h,
                                path: window.location.pathname
                            },
                            error: function(k) {
                                alert(k.message)
                            },
                            success: function(k) {
                                if (k.status == "fail" && k.captcha) {
                                    RecaptchaDialog.challenge(function() {
                                        d.removeClass("disabled")
                                    });
                                    return false
                                } else if (k.status == "fail") alert(k.message);
                                else {
                                    trackGAEvent("comment_submit", "success", "zoom");
                                    Tagging.initTextarea("#CloseupComment");
                                    c.val("");
                                    $("#pin_comment_replies", b).val("");
                                    k = $(k.html).css({
                                        "background-color": "#fbffcc"
                                    });
                                    $(".PinComments", b).append(k)
                                }
                                k.removeClass("hidden").animate({
                                    backgroundColor: "#ffffff",
                                    display: "block"
                                },
                                220)
                            }
                        })
                    }
                }
                return false
            })
        },
        getCommenters: function(b) {
            var c = {};
            $(b).each(function(e, g) {
                g = $(g);
                e = g.find("p a:first").attr("href"); ! e || c[e] || (c[e] = {
                    label: g.find("p a:first").text(),
                    value: e.replace(/\//g, ""),
                    image: g.find("img:first").attr("src"),
                    link: e
                })
            });
            return c
        },
        getPinner: function(b) {
            b = $(b);
            var c = b.find("a").attr("href");
            return {
                label: b.find("p:first a:first").text(),
                value: c.replace(/\//g, ""),
                image: b.find("a img:first").attr("src"),
                link: c
            }
        }
    }
} ();
var Logout = function() {
    return {
        logout: function() {
            trackGAEvent("logout", "attempt");
            $.ajax({
                url: "/logout/",
                type: "POST",
                dataType: "json",
                data: {},
                error: function(b) {
                    alert(b.message)
                },
                success: function() {
                    trackGAEvent("logout", "success");
                    window.location = "/"
                }
            })
        }
    }
} ();
var zoomCount = 0,
Zoom = function() {
    return {
        HTMLloading: "<div id='loading'><img src='" + media_url + "images/rotating_pin.png' alt='Loading Animation' /></div>",
        HTMLshow: "<div id='zoomScroll' class='visible loading'><div id='zoom' class='pin' pin-id='%PIN_ID%'></div></div>",
        HTMLzoom: "<div id='zoomScroll'><div id='zoom' class='pin' pin-id='%PIN_ID%'></div></div>",
        setup: function() {
            if (window.location.hash == "#_=_") window.location.hash = "";
            var b = this,
            c = !navigator.userAgent.match(/ipad|ipod|iphone|android/i) && !!window.Router;
            isWebkit = $.browser.webkit;
            isFireFox = $.browser.mozilla;
            isChrome = navigator.userAgent.match(/chrome/i);
            isFireFox && $("body").addClass("extraScroll");
            isChrome && $("body").addClass("hidefixed");
            if (c) {
                Router.on("route:zoom",
                function(e) {
                    if (!b.open) {
                        isWebkit ? b.zoom(e) : b.show(e);
                        b.open = true
                    }
                });
                Router.on("route:other",
                function() {
                    b.close()
                });
                if (isWebkit) {
                    zoomTimer = 220;
                    c = '<style type="text/css">#zoomScroll,#zoomScroll.visible #zoom,#zoomScroll.visible .PinImage img,#zoom .PriceContainer,#zoom .PriceContainer *,#zoom .convo .ImgLink,#zoom .convo .ImgLink img,#zoom .comments .comment,#zoom #loading img{-moz-transition: all ' + zoomTimer / 1E3 + "s ease-out; -webkit-transition: all " + zoomTimer / 1E3 + "s ease-out;}</style>";
                    $("head").append(c);
                    $("#ColumnContainer").on("mousedown", ".PinImage",
                    function() {
                        $(this).parents(".pin").addClass("spring")
                    });
                    $("#ColumnContainer").on("mouseout", ".spring",
                    function() {
                        $(this).removeClass("spring")
                    })
                }
                $("#ColumnContainer").on("click", ".PinImage",
                function(e) {
                    if (e.cntrlKey || e.metaKey) return true;
                    e = $(this).parents(".pin").attr("data-id");
                    zoomCount++;
                    trackGAEvent("zoom_pin", "clicked", zoomCount);
                    Router.navigate("/pin/" + e + "/", {
                        trigger: true
                    });
                    return false
                })
            }
        },
        zoom: function(b) {
            var c = this;
            htmlZoom = c.HTMLzoom.replace("%PIN_ID%", b);
            $("body").addClass("noscroll").append(htmlZoom);
            var e = $("#zoomScroll"),
            g = $("#zoom");
            setTimeout(function() {
                e.addClass("visible");
                var h = $(window).width() / 2;
                g.css("left", h + "px");
                d.filmDimensions[1] != 0 && d.elem.css({
                    width: d.filmDimensions[0] + "px",
                    height: d.filmDimensions[1] + "px"
                });
                if (f.isVideo) {
                    $(".PinImage", g).css("background-color", "black");
                    d.elem.css({
                        opacity: "0"
                    })
                }
                setTimeout(function() {
                    zoomFinished = true;
                    e.addClass("loading");
                    f.isVideo ? f.elem.find(".video").show() : d.elem.attr("src", d.src)
                },
                zoomTimer)
            },
            1);
            var f = {};
            f.id = b;
            f.elem = $('div[data-id="' + f.id + '"]');
            f.elem.addClass("zoomed");
            f.elem.find(".video").hide();
            f.HTMLimage = getHTML(f.elem.find(".PinImage"));
            f.offset = f.elem.offset();
            f.isVideo = f.elem.find(".video").length;
            f.elem.removeClass("spring");
            var d = {};
            d.src = f.elem.find(".PinImageImg").attr("src").replace("_b.jpg", "_f.jpg");
            d.preload = new Image;
            d.preload.src = d.src;
            g.html(f.HTMLimage).css({
                top: f.offset.top - $(window).scrollTop() + "px",
                left: f.offset.left + "px"
            }).append(c.HTMLloading).find(".PinImage").attr("href", "javascript:void[0]").wrap("<div id='PinImageHolder'></div>");
            d.elem = $(".PinImageImg", g);
            d.origin = $(".zoomed .PinImageImg");
            d.thumbDimensions = f.isVideo ? ["192", "144"] : [d.origin.width(), d.origin.height()];
            d.filmDimensions = [f.elem.attr("data-width"), f.elem.attr("data-height")];
            d.elem.css({
                width: d.thumbDimensions[0] + "px",
                height: d.thumbDimensions[1] + "px"
            });
            c.ajax(f.id);
            c.closeListeners(f.id)
        },
        show: function(b) {
            var c = this,
            e = c.HTMLshow.replace("%PIN_ID%", b);
            $("body").addClass("noscroll").append(e);
            $("#zoomScroll");
            e = $("#zoom");
            var g = {};
            g.id = b;
            g.elem = $('div[data-id="' + g.id + '"]');
            g.elem.addClass("zoomed");
            g.HTMLimage = getHTML(g.elem.find(".PinImage"));
            g.isVideo = g.elem.find(".video").length;
            e.html(g.HTMLimage).append(c.HTMLloading).find(".PinImage").attr("href", "javascript:void[0]").wrap("<div id='PinImageHolder'></div>");
            b = $(window).width() / 2;
            e.css("left", (isFireFox ? b - 7 : b) + "px");
            b = {};
            b.elem = $(".PinImageImg", e);
            b.src = g.elem.find(".PinImageImg").attr("src").replace("_b.jpg", "_f.jpg");
            b.filmDimensions = g.isVideo ? ["600", "450"] : [g.elem.attr("data-width"), g.elem.attr("data-height")];
            g.isVideo && e.find(".video").remove();
            b.elem.attr("src", b.src).css({
                width: b.filmDimensions[0] + "px",
                height: b.filmDimensions[1] + "px"
            });
            c.ajax(g.id);
            c.closeListeners(g.id)
        },
        ajax: function(b) {
            var c = this,
            e = $("#zoom");
            this.cancelAjax();
            this.xhr = $.ajax({
                url: "/pin/" + b + "/",
                dataType: "json",
                error: function(g, f) {
                    if (f !== "abort") {
                        f = "Could not fetch pin :-/";
                        if (navigator.onLine) {
                            if (g.status === 404) f = "This pin has been deleted."
                        } else f = "No Internet Connection :-/";
                        e.append("<div id='error'><p class='colormuted'></p></div>").removeClass("loaded");
                        $("#error p").html(f)
                    }
                },
                success: function(g) {
                    if (isWebkit) typeof zoomFinished != "undefined" ? c.renderSuccess(g) : e.one("webkitTransitionEnd",
                    function() {
                        c.renderSuccess(g)
                    });
                    else c.renderSuccess(g)
                },
                complete: function() {
                    c.xhr = null
                },
                timeout: 2E4
            })
        },
        renderSuccess: function(b) {
            var c = $("#zoomScroll"),
            e = $("#zoom");
            e.prepend(b.header);
            $("#PinImageHolder").append(b.buttons);
            e.append(b.footer);
            c.addClass("loaded");
            c.removeClass("loading");
            $("<div>&nbsp;</div>").css({
                height: 0,
                "margin-top": "-10px"
            }).insertAfter(e)
        },
        closeListeners: function() {
            var b = this;
            $("#zoomScroll").click(function(c) {
                if ($(c.target).is("#zoomScroll, #SocialShare ul, #SocialShare li")) {
                    window.history.back();
                    b.close();
                    b.cancelAjax()
                }
            })
        },
        close: function() {
            if (this.open) {
                trackGAEvent("zoom_pin", "closed", zoomCount);
                $("#zoomScroll").remove();
                $("body").removeClass("noscroll");
                $(".zoomed").removeClass("zoomed");
                delete zoomFinished;
                return this.open = false
            }
        },
        cancelAjax: function() {
            if (this.xhr && this.xhr.abort) {
                this.xhr.abort();
                this.xhr = null
            }
        }
    }
} ();
var Like = function() {
    function b(c) {
        var e = $(c).height();
        window.setTimeout(function() {
            e !== $(c).height() && BoardLayout.allPins()
        },
        1)
    }
    return {
        ajaxLike: function(c, e, g, f) {
            $.ajax({
                url: "/pin/" + c + "/like/",
                type: "POST",
                dataType: "json",
                data: f,
                error: function(d) {
                    e(d)
                },
                success: function(d) {
                    g(d)
                },
                timeout: 2E4
            })
        },
        ajaxUnlike: function(c, e, g, f) {
            $.ajax({
                url: "/pin/" + c + "/like/",
                type: "POST",
                dataType: "json",
                data: f,
                error: function(d) {
                    e(d)
                },
                success: function(d) {
                    g(d)
                },
                timeout: 2E4
            })
        },
        gridListeners: function() {
            var c = this;
            $("#ColumnContainer").on("click", ".likebutton",
            function() {
                trackGAEvent("like", "clicked", "grid");
                c.gridLike($(this));
                return false
            });
            $("#ColumnContainer").on("click", ".unlikebutton",
            function() {
                trackGAEvent("unlike", "clicked", "grid");
                c.gridUnlike($(this));
                return false
            })
        },
        gridLike: function(c) {
            c.removeClass("likebutton").addClass("disabled unlikebutton").html(c.data("text-unlike"));
            var e = c.parents(".pin"),
            g = e.children(".stats"),
            f = g.find(".LikesCount");
            this.ajaxLike(e.attr("data-id"),
            function() {},
            function(d) {
                if (d.status == "success") {
                    b(g);
                    f.removeClass("hidden").html(d.count_str);
                    trackGAEvent("like", "success");
                    c.addClass("clickable")
                } else {
                    if (d.captcha) {
                        RecaptchaDialog.challenge();
                        return false
                    }
                    c.removeClass("disabled unlikebutton").addClass("likebutton");
                    alert(d.message)
                }
            })
        },
        gridUnlike: function(c) {
            c.removeClass("disabled clickable unlikebutton").addClass("likebutton").html("<em></em> " + c.data("text-like"));
            c = c.parents(".pin");
            var e = c.children(".stats"),
            g = e.find(".LikesCount");
            this.ajaxUnlike(c.attr("data-id"),
            function() {},
            function(f) {
                b(e);
                g.html(f.count_str);
                f.count || g.addClass("hidden");
                f.status == "success" && trackGAEvent("unlike", "success")
            },
            {
                unlike: 1
            })
        },
        zoomListeners: function() {
            var c = this;
            $("#PinImageHolder").on("click", ".ZoomLikeButton",
            function() {
                trackGAEvent("like", "clicked", "zoom");
                c.zoomLike($(this));
                return false
            });
            $("#PinImageHolder").on("click", ".ZoomUnlikeButton",
            function() {
                c.zoomUnlike($(this));
                return false
            })
        },
        zoomLike: function(c) {
            c.removeClass("ZoomLikeButton").addClass("ZoomUnlikeButton disabled clickable").html(c.data("text-unlike"));
            this.gridLike($(".zoomed .likebutton"))
        },
        zoomUnlike: function(c) {
            c.removeClass("ZoomUnlikeButton disabled clickable ").addClass("ZoomLikeButton").html("<em></em>" + c.data("text-like"));
            this.gridUnlike($(".zoomed .unlikebutton"))
        },
        closeupListeners: function() {
            var c = this;
            $("#PinActionButtons").on("click", ".like_pin",
            function() {
                trackGAEvent("like", "clicked", "closeup");
                c.closeupLike($(this));
                return false
            });
            $("#PinActionButtons").on("click", ".unlike_pin",
            function() {
                trackGAEvent("unlike", "clicked", "closeup");
                c.closeupUnlike($(this));
                return false
            })
        },
        closeupLike: function(c) {
            var e = this,
            g = $("#PinLikes");
            c.removeClass("like_pin").addClass("disabled clickable unlike_pin").html(c.data("text-unlike"));
            g.removeClass("hidden");
            c = c.attr("data-id");
            e.ajaxLike(c,
            function() {
                e.closeupUnlike()
            },
            function(f) {
                if (f.status == "fail" && f.captcha) {
                    RecaptchaDialog.challenge();
                    return false
                }
                trackGAEvent("like", "success");
                g.append(f.html)
            })
        },
        closeupUnlike: function(c) {
            var e = this,
            g = $("#PinLikes");
            c.removeClass("disabled clickable unlike_pin").addClass("like_pin").html("<em></em>" + c.data("text-like"));
            $("a", g).length === 1 && g.addClass("hidden");
            c = c.attr("data-id");
            e.ajaxUnlike(c,
            function() {
                e.closeupLike()
            },
            function(f) {
                trackGAEvent("unlike", "success");
                $("#PinLikes a[href='/" + f.username + "/']").fadeOut("fast").remove()
            },
            {
                unlike: 1
            })
        }
    }
} ();
var Closeup = function() {
    return {
        setup: function() {
            $("#PinReport").live("click",
            function() {
                trackGAEvent("pinreport", "clicked", "closeup");
                Modal.show("ReportModal");
                return false
            });
            $("#ReportModal .Button").click(function() {
                trackGAEvent("report_modal", "clicked", "closeup");
                $.post("flag/", {
                    reason: $("#ReportModal input[name=reason]:checked").val(),
                    explanation: $("#ReportModal textarea").val()
                },
                function(c) {
                    $("#ReportModal .SubmitButton").addClass("disabled").text("Reporting...");
                    if (c.status == "success") {
                        trackGAEvent("report_modal", "success", "closeup");
                        $("#ReportModal .modal").addClass("PostSuccess");
                        $("#ReportModal .modal form").hide();
                        $(".PostSuccess").append('<p class="ReportSuccess">Thanks for reporting this pin! Our team will review the pin and delete it if it violates the <a href="/about/terms/">Pinterest Terms of Use</a>.</p>');
                        setTimeout(function() {
                            Modal.close("ReportModal");
                            Closeup.resetReportModal();
                            $("#ReportModal .SubmitButton").addClass("disabled").html("Send Email")
                        },
                        5E3);
                        $("#PinReport").remove()
                    } else alert(c.message)
                },
                "json");
                return false
            });
            var b;
            $("body").on("click", "a.ReportComment",
            function() {
                trackGAEvent("commentreport", "clicked", "closeup");
                b = $(this);
                Modal.show("ReportCommentModal");
                return false
            });
            $("#ReportCommentModal .Button").click(function() {
                trackGAEvent("report_comment_modal", "clicked", "closeup");
                $.post(b.attr("href"), {
                    comment_id: b.attr("data"),
                    reason: $("#ReportCommentModal input[name=reason]:checked").siblings("label").text(),
                    explanation: $("#ReportCommentModal textarea").val()
                },
                function(c) {
                    $("#ReportModal .SubmitButton").addClass("disabled").text("Reporting...");
                    if (c.status == "success") {
                        trackGAEvent("report_modal", "success", "closeup");
                        $("#ReportCommentModal .modal").addClass("PostSuccess");
                        $("#ReportCommentModal .modal form").hide();
                        $(".PostSuccess").append('<p class="ReportSuccess">Our team will review the delete the comment if it violates our <br/><a href="http://pinterest.com/about/use">Acceptable Use Policy</a>.</p>');
                        setTimeout(function() {
                            Modal.close("ReportCommentModal");
                            Closeup.resetReportCommentModal();
                            $("#ReportCommentModal .SubmitButton").addClass("disabled").html("Send Email")
                        },
                        1500);
                        b.replaceWith('<p class="floatRight" style="margin-right:0px"><strong>Thanks for reporting!</strong></p>')
                    } else alert(c.message)
                },
                "json");
                return false
            });
            $("#EmailModal form").submit(function() {
                trackGAEvent("email_modal", "submit", "closeup");
                var c = $("#MessageRecipientName").val(),
                e = $("#MessageRecipientEmail").val(),
                g = $("#MessageBody").val();
                if (!c) {
                    $("#MessageRecipientName").parent().find(".error").html("Please enter recipient name.");
                    return false
                }
                if (!e) {
                    $("#MessageRecipientEmail").parent().find(".error").html("Please enter recipient email.");
                    return false
                }
                $("#EmailModal .SubmitButton").addClass("disabled").text("Sending...");
                $.ajax({
                    type: "POST",
                    url: $(this).attr("action"),
                    data: {
                        name: c,
                        email: e,
                        message: g
                    },
                    complete: function(f) {
                        f = $.parseJSON(f.responseText);
                        if (f.status == "success") {
                            trackGAEvent("email_modal", "success", "closeup");
                            $("#EmailModal .SubmitButton").text("Sent!");
                            setTimeout(function() {
                                Modal.close("EmailModal");
                                Closeup.resetEmailModal();
                                $("#EmailModal .SubmitButton").addClass("disabled").html("Send Email")
                            },
                            500)
                        } else {
                            $("#EmailModal .SubmitButton").removeClass("disabled").html("Send Email");
                            f.message == "Invalid email address" && $("#MessageRecipientEmail").parent().after($("#EmailModal .error"));
                            $("#EmailModal .error").html(f.message)
                        }
                    }
                });
                return false
            });
            $("#SocialShare #PinEmbed").click(function() {
                trackGAEvent("pin_embed", "clicked", "closeup");
                var c = $("#PinImageHolder img");
                if ($("#PinImageHolder iframe").length) c = $("#PinImageHolder iframe");
                var e = c.width();
                c = c.height();
                max_closeup_image_width = e;
                max_closeup_image_height = c;
                $("#EmbedImageWidth").val(e);
                $("#EmbedImageHeight").val(c);
                $("#EmbedHTMLCode").val(embed_code_html_1 + e + "' height ='" + c + embed_code_html_2);
                Modal.show("EmbedModal")
            });
            $("#EmbedImageWidth").keyup(function() {
                $(this).val() > max_closeup_image_width && $("#EmbedImageWidth").val(max_closeup_image_width);
                var c = parseInt($("#EmbedImageWidth").val() * max_closeup_image_height / max_closeup_image_width, 10);
                $("#EmbedImageHeight").val(c);
                $("#EmbedHTMLCode").val(embed_code_html_1 + $("#EmbedImageWidth").val() + "' height ='" + $("#EmbedImageHeight").val() + embed_code_html_2);
                return false
            });
            $("#EmbedImageHeight").keyup(function() {
                $(this).val() > max_closeup_image_height && $("#EmbedImageHeight").val(max_closeup_image_height);
                var c = parseInt(Math.ceil($("#EmbedImageHeight").val() * max_closeup_image_width / max_closeup_image_height), 10);
                $("#EmbedImageWidth").val(c);
                $("#EmbedHTMLCode").val(embed_code_html_1 + $("#EmbedImageWidth").val() + "' height ='" + $("#EmbedImageHeight").val() + embed_code_html_2);
                return false
            });
            $(".DeleteComment").live("click",
            function() {
                trackGAEvent("delete_comment", "clicked", "closeup");
                var c = $(this);
                if (c.attr("ban")) if (!confirm("Are you sure you want to ban " + c.attr("username") + "?")) return false;
                c.trigger("mouseleave");
                var e = c.parents(".comment");
                e.slideUp("slow");
                $.ajax({
                    url: c.attr("href"),
                    type: "POST",
                    dataType: "json",
                    data: {
                        comment: c.attr("data")
                    },
                    error: function(g) {
                        e.show();
                        g.message.length > 0 && alert(g.message)
                    },
                    success: function() {
                        trackGAEvent("delete_comment", "success", "closeup");
                        e.remove()
                    }
                });
                return false
            })
        },
        resetReportModal: function() {
            $("#ReportModal .PostSuccess").removeClass("PostSuccess");
            $("#ReportModal .ReportSuccess").remove();
            $('#ReportModal .option input[type="radio"]').attr("checked", false);
            $("#ReportModal select option:first-child").attr("selected", "selected");
            $("#ReportModal .Button").addClass("disabled");
            $("#ReportPin").val("").blur();
            $("#ReportModal form").show()
        },
        resetReportCommentModal: function() {
            $("#ReportCommentModal .PostSuccess").removeClass("PostSuccess");
            $("#ReportCommentModal .ReportSuccess").remove();
            $('#ReportCommentModal .option input[type="radio"]').attr("checked", false);
            $("#ReportCommentModal select option:first-child").attr("selected", "selected");
            $("#ReportCommentModal .Button").addClass("disabled");
            $("#ReportCommentModal form").show()
        },
        resetEmailModal: function() {
            $("#MessageRecipientEmail").val("").blur();
            $("#MessageRecipientName").val("").blur();
            $("#MessageBody").val("").blur();
            $("#EmailModal .error").html("")
        }
    }
} ();
var InviteForm = function() {
    return {
        setup: function() {
            var b = $("#SendInvites"),
            c = $("#EmailAddresses .email");
            b.click(function() {
                trackGAEvent("invite_form", "clicked");
                c.each(function() {
                    var e = $(this),
                    g = $("textarea[name=message]"),
                    f = e.parent("li").children(".helper"); ! e.val() == "" && InviteForm.submit(e.val(), g.val(), "somebody",
                    function() {
                        trackGAEvent("invite_form", "success");
                        e.removeClass("error");
                        f.html("Invite Sent!").css("color", "green").slideDown();
                        e.val("").keyup();
                        g.val("").keyup()
                    },
                    function(d) {
                        e.addClass("error");
                        f.html(d.message).css("color", "red").slideDown()
                    })
                })
            })
        },
        submit: function(b, c, e, g, f) {
            $.post("/invite/new/", {
                name: e,
                message: c,
                email: b
            },
            function(d) {
                d.status == "success" ? g(d) : f(d)
            },
            "json")
        }
    }
} ();
var InviteModal = function() {
    return {
        show: function(b, c) {
            var e = this;
            $("#InviteModalName").empty().text(b);
            $("#InviteModalEmail").empty().text(c);
            Modal.show("InviteModal");
            $("#InviteModalMessage").val("").keyup().focus();
            $("#InviteModal .SubmitButton").unbind("click").click(function() {
                var g = $(this),
                f = $("#InviteModalMessage").val(),
                d = $(".inputstatus");
                g.addClass("disabled");
                InviteForm.submit(c, f, b,
                function() {
                    d.text("").empty().css("margin-bottom", "0px");
                    d.removeClass("error").html("<span style='color: green; font-size: 18px; font-weight: 300;'>Success!</span>").css("margin-bottom", "14px");
                    setTimeout(function() {
                        Modal.close("InviteModal");
                        d.text("").empty().css("margin-bottom", "0px");
                        g.removeClass("disabled")
                    },
                    1300);
                    e.trigger("invite:sent")
                },
                function() {
                    d.text("Sorry, an error has occurred. Please try again.").css("margin-bottom", "14px");
                    g.removeClass("disabled");
                    e.trigger("invite:failed")
                })
            })
        }
    }
} ();
_.extend(InviteModal, Backbone.Events);

var FancyForm = function() {
    return {
        inputs: ".Form input, .Form textarea",
        button: ".SubmitButton",
        setup: function() {
            var b = this;
            this.inputs = $(this.inputs);
            b.inputs.each(function() {
                var c = $(this);
                b.checkVal(c)
            });
            b.inputs.live("keyup blur",
            function() {
                var c = $(this);
                b.checkVal(c);
                var e = c.parents("ul"),
                g = c.parents(".Form").find(b.button);
                c.parents("li").hasClass("NoCheck") || b.checkDisabled(e, g)
            });
            $(b.button).live("click",
            function() {
                var c = $(this).attr("data-form");
                if ($(this).hasClass("disabled")) return false;
                else $("#" + c + " form").submit()
            })
        },
        checkVal: function(b) {
            b.val().length > 0 ? b.parent("li").addClass("val") : b.parent("li").removeClass("val")
        },
        checkDisabled: function(b, c) {
            b.children("li:not(.optional)").length <= b.children("li.val").length ? c.removeClass("disabled") : c.addClass("disabled")
        }
    }
} ();

var MAX_PIN_CHARACTER_COUNT = 500,
CharacterCount = CharacterCount || {
    setup: function(b, c, e, g) {
        b = $(b);
        c = $(c);
        e = $(e);
        b.focus(function() {
            CharacterCount.showCount(b, c, e, g)
        }).bind("keyup.cc input.cc paste.cc",
        function() {
            CharacterCount.showCount(b, c, e, g)
        })
    },
    truncateData: function(b, c) {
        b = $(b);
        c = c || MAX_PIN_CHARACTER_COUNT;
        b.val().length > c && b.val(b.val().substr(0, c - 3) + "...")
    },
    showCount: function(b, c, e, g) {
        g = g || MAX_PIN_CHARACTER_COUNT;
        b = g - b.val().length;
        c.text(b).show();
        b < 0 || b >= g ? e.addClass("disabled") : e.removeClass("disabled");
        b < 0 ? c.addClass("error") : c.removeClass("error")
    }
};

var Tagging = function() {
    return {
        friends: null,
        friendsLinks: {},
        getFriends: function(b, c, e) {
            var g = b.term;
            (function(f) {
                Tagging.friends ? f() : $.get("/x2ns4tdf0cd7cc9b/_getfriends/",
                function(d) {
                    Tagging.friends = [];
                    $.each(d,
                    function(h, j) {
                        Tagging.friends.push({
                            label: j.name,
                            value: j.username,
                            image: j.image,
                            link: "/" + j.username + "/",
                            category: "People"
                        });
                        Tagging.friendsLinks["/" + j.username + "/"] = 1
                    });
                    f()
                })
            })(function() {
                var f = [];
                if (e) for (name in e) Tagging.friendsLinks[name] || !e.hasOwnProperty(name) || f.push(e[name]);
                f = f.concat(Tagging.friends);
                if (Tagging.ignore) f = _.filter(f,
                function(d) {
                    return ! Tagging.ignore[d.link]
                });
                if (g) f = tagmate.filter_options(f, g);
                c(f)
            })
        },
        initInput: function(b, c, e) {
            b = $(b);
            var g = $("<div class='CollabAutocompleteHolder'></div>");
            b.after(g);
            b.autocomplete({
                source: Tagging.getFriends,
                minLength: 1,
                delay: 5,
                appendTo: g,
                change: function(f, d) {
                    c && c(d.item)
                },
                select: function(f, d) {
                    c && c(d.item, true);
                    return false
                },
                position: {
                    my: "left top",
                    at: "left bottom",
                    offset: "0 -1"
                }
            }).keydown(function(f) {
                f.which == 13 && e && e()
            });
            b.data("autocomplete")._renderItem = function(f, d) {
                return $("<li></li>").data("item.autocomplete", d).append("<a href='" + d.link + "'><img src='" + d.image + "' class='AutocompletePhoto' alt='Photo of " + d.label + "' width='38px' height='38px'/><span class='AutocompleteName'>" + d.label + "</span></a>").appendTo(f)
            }
        },
        initTextarea: function(b, c) {
            b = $(b);
            var e = {};
            e["@"] = tagmate.USER_TAG_EXPR;
            e["#"] = tagmate.HASH_TAG_EXPR;
            e.$ = tagmate.USD_TAG_EXPR;
            e["\u00a3"] = tagmate.GBP_TAG_EXPR;
            b.tagmate({
                tagchars: e,
                sources: {
                    "@": function(g, f) {
                        Tagging.getFriends(g, f, c)
                    }
                }
            })
        },
        loadTags: function(b, c, e, g) {
            b = $(b).getTags();
            for (var f = [], d = [], h = null, j = 0; j < b.length; j++) {
                b[j][0] == "@" && f.push(b[j].substr(1));
                b[j][0] == "#" && d.push(b[j].substr(1));
                if (b[j][0] == "$" || b[j][0] == "\u00a3") h = b[j]
            }
            $(c).val(f.join(","));
            $(e).val(d.join(","));
            $(g).val(h)
        },
        priceTag: function(b, c) {
            function e() {
                var g = $(".price", c);
                if (g.length <= 0) {
                    g = $("<div class='price'></div>");
                    c.prepend(g)
                }
                var f = b.getTags({
                    $: tagmate.USD_TAG_EXPR,
                    "\u00a3": tagmate.GBP_TAG_EXPR
                });

                if (f && f.length > 0) {
                    g.text(f[f.length - 1]);
                    g.addClass("visible")
                }
                else {
                    g.removeClass("visible");
                    g.text("")
                }
            }
            b = $(b);
            c = $(c);
            b.unbind(".priceTag").bind("keyup.priceTag", e).bind("focus.priceTag", e).bind("change.priceTag", e);
            e()
        }
    }
} ();

var ScrapePinDialog = ScrapePinDialog || {
    id: "ScrapePin",
    setup: function() {
        var b = this;
        AddDialog.setup(b.id);
        b.initScraperInput()
    },
    initScraperInput: function() {
        function b(k) {
            return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(k)
        }
        function c(k) {
            var l = true;
            if (k.indexOf("http") != 0) k = "http://" + k;
            if (k == "") l = false;
            if (k == "http://") l = false;
            if (k.length < 2) l = false;
            if (k.indexOf(".") == -1) l = false;
            b(k) || (l = false);
            return l
        }
        function e() {
            var k = $("#" + ScrapePinDialog.id),
            l = $("#ScrapePinInput").val();
            if (j !== l) {
                j = l;
                if (c(l)) {
                    if (l.indexOf("http") != 0) l = "http://" + l;
                    $(".load", k).show();
                    $(".ImagePicker .Images ul", k).empty();
                    l = escape(l);
                    setTimeout(g, 5E3);
                    images_count = 0;
                    imagesArray = [];
                    msg = "";
                    $.getJSON("/pin/create/find_images/", {
                        url: l
                    },
                    function(r) {
                        if (r.status === "success") {
                            images_count = r.images.length;
                            for (var u = 0; u < r.images.length; u++) {
                                urlImage = new Image;
                                urlImage.src = r.images[u];
                                msg += "<br/>Loading " + urlImage.src;
                                urlImage.onload = function() {
                                    images_count -= 1;
                                    images_count == 0 && f()
                                };
                                imagesArray.push(urlImage)
                            }
                            r.title.length > 80 ? $("#id_title").val(r.title.substring(0, 79)) : $("#id_title").val(r.title);
                            $(".load", k).hide();
                            $("#id_link").val($("#scrape_url").val());
                            $("#PinSourceURL").html("Source: " + l).removeClass("hidden");
                            AddDialog.pinBottom("ScrapePin");
                            $(".Arrows", k).addClass("holla").show();
                            $("#ScrapeButton").removeClass("disabled")
                        } else {
                            $(".load", k).hide();
                            $("#ScrapeButton").removeClass("disabled");
                            alert("We couldn't find any images: " + r.message)
                        }
                    })
                } else alert("Not a valid URL!")
            }
        }
        function g() {
            if (images_count > 0) {
                images_count = -1;
                f()
            }
        }
        function f() {
            strHtml = "";
            imgFound = false;
            for (var k = foundCtr = 0; k < imagesArray.length; k++) {
                img = imagesArray[k];
                if (img.width >= 150 && img.height >= 50) {
                    imgFound = true;
                    foundCtr++;
                    strHtml += "<li>" + (is_video(img.src) ? "<img src='" + media_url + "images/VideoIndicator.png' alt='Video Icon' class='video' />": "") + "<img src='" + img.src + "' width='156px' alt='' /></li>"
                }
            }
            if (strHtml != "") {
                $("#ScrapePin .ImagePicker .Images ul").html(strHtml);
                d(foundCtr)
            } else alert("No Large Images Found.")
        }
        function d() {
            var k = function(r, u) {
                im = $(u).find("img")[0];
                if ($(im).hasClass("video")) im = $(u).find("img")[1];
                src = $(im).attr("src");
                $("#id_img_url").val(src);
                $("#id_link").val($("#ScrapePinInput").val())
            },
            l = $("#ScrapePin .ImagePicker .Images").jcarousel({
                buttonNextHTML: null,
                buttonPrevHTML: null,
                initCallback: function(r) {
                    $("#ScrapePin .imagePickerNext").click(function() {
                        r.next();
                        return false
                    });
                    $("#ScrapePin .imagePickerPrevious").click(function() {
                        r.prev();
                        return false
                    })
                },
                animation: "fast",
                itemVisibleInCallback: {
                    onAfterAnimation: k
                },
                scroll: 1
            });
            k(l, $("#ScrapePin .ImagePicker").find("li")[0], 1, "next")
        }
        function h() {
            var k = $("#ScrapeButton");
            if (c($("#ScrapePinInput").val())) {
                k.addClass("disabled");
                e()
            } else {
                alert("Please enter a valid website URL");
                k.removeClass("disabled")
            }
        }
        var j = "";
        $("#ScrapePinInput").bind("keydown",
        function(k) {
            k.keyCode === 13 && h()
        });
        $("#ScrapeButton").click(function() {
            h();
            return false
        })
    },
    reset: function() {
        var b = $("#" + this.id);
        $("#ScrapePinInput", b).val("");
        $(".PinBottom", b).hide();
        $(".modal", b).css("margin-bottom", "0");
        $(".Buttons .Button", b).removeClass("disabled").html("Pin It");
        ScrapePinDialog.initScraperInput()
    }
};
var Nag = Nag || {
    setup: function(b) {
        var c = $(".Nag").outerHeight();
        $("#" + b + " .NagSpacer").css("height", c + "px");
        if ($(".CloseupLeft").length > 0) {
            b = parseInt($(".CloseupLeft").css("top"), 10) + c;
            $(".CloseupLeft").css("top", b + "px")
        }
    },
    hide: function(b) {
        b = $("#" + b);
        var c = $(".Nag", b).outerHeight();
        $(".Sheet", b).css("top", "-" + c + "px").css("bottom", c + "px");
        setTimeout("$('.UndoSheet').css('top','0px').css('bottom','0px')", 1100)
    }
};
var CategorizeBoard = function() {
    return {
        setup: function(b) {
            Nag.setup(b);
            $("#" + b + " select").bind("change",
            function() {
                $("#" + b + " option:selected").attr("value") != "" && setTimeout("CategorizeBoard.hideSheets()", 100)
            })
        },
        hideSheets: function() {
            Nag.hide("CategoryCallout");
            CategorizeBoard.addCategory()
        },
        addCategory: function() {
            var b = $("#CategorySelect option:selected"),
            c = b.text();
            b = b.attr("value");
            $("#CategoryCallout .UndoSheet").show().find("p span").text(c);
            $.post(boardEndpoint, {
                category: b
            },
            function(e) {
                data = $.parseJSON(e);
                if (!data.status == "success") {
                    $("#CategoryCallout .error").html(data.message).show();
                    CategorizeBoard.undoCategory()
                }
            });
            return false
        },
        undoCategory: function() {
            $("#CategoryCallout .Nag").outerHeight();
            $(".UndoSheet").css("top", "-100px").css("bottom", "100px");
            $("#CategorySelect option:first").attr("selected", "selected");
            $.post(boardEndpoint, {
                undo: "1"
            },
            function() {});
            setTimeout("CategorizeBoard.newHeights()", 750)
        },
        newHeights: function() {
            $("#CategoryCallout .Sheet1").css("top", "auto").css("bottom", "auto !important");
            $("#CategoryCallout .Sheet2").css("top", "0px").css("bottom", "-3px");
            $("#CategoryCallout .Sheet3").css("top", "0px").css("bottom", "-5px")
        }
    }
} ();
var UploadPinDialog = UploadPinDialog || {
    id: "UploadPin",
    setup: function() {
        var b = this,
        c = $("#" + b.id);
        AddDialog.setup(b.id);
        $("input[type=file]", c).change(function() {
            trackGAEvent("upload_file", "submitted");
            AddDialog.pinBottom(b.id);
            $(".ImagePicker ul", c).html("<li><img src='http://passets-cdn.pinterest.com/images/load2.gif' class='load' alt='Loading Indicator' /></li>");
            $(".ImagePicker .load", c).show();
            $("form", c).ajaxSubmit({
                type: "POST",
                dataType: "json",
                iframe: true,
                url: "/pin/preview/",
                success: function(e) {
                    if (e.status === "success") {
                        trackGAEvent("upload_file", "success");
                        $(".load", c).hide();
                        $(".ImagePicker ul", c).html("<li><img src='" + e.image_url + "' /></li>")
                    } else alert(e.message)
                }
            });
            return false
        })
    },
    reset: function() {
        var b = $("#" + this.id);
        $("input[type=file]", b).val("");
        $(".PinBottom", b).hide();
        $(".modal", b).css("margin-bottom", "0");
        $(".Buttons .Button", b).removeClass("disabled").html("Pin It")
    }
};
var RecaptchaPublicKey = "6LdYxc8SAAAAAHyLKDUP3jgHt11fSDW_WBwSPPdF",
RecaptchaDialog = function() {
    return {
        challenge: function(b) {
            var c = $("#CaptchaDialog");
            Modal.show("CaptchaDialog");
            $.getScript("http://www.google.com/recaptcha/api/js/recaptcha_ajax.js",
            function() {
                Recaptcha.create(RecaptchaPublicKey, $("#Captcha", c)[0], {
                    theme: "clean",
                    callback: Recaptcha.focus_response_field
                });
                $(".Button", c).click(function() {
                    $("#CaptchaDialog span.error").text("").hide();
                    RecaptchaDialog.submit(Recaptcha.get_challenge(), Recaptcha.get_response(), b)
                })
            })
        },
        submit: function(b, c, e) {
            $.post("/verify_captcha/", {
                challenge: b,
                response: c
            },
            function(g) {
                if (g.status == "success") {
                    Modal.close("CaptchaDialog");
                    Recaptcha.destroy();
                    e && e()
                } else {
                    $("#CaptchaDialog span.error").text("Try again").slideDown();
                    Recaptcha.reload()
                }
            },
            "json")
        }
    }
} (),
RecaptchaPrompt = function() {
    return {
        challenge: function() {
            var b = $(".CaptchaPrompt");
            Recaptcha.create(RecaptchaPublicKey, $("#Captcha div", b)[0], {
                theme: "clean",
                callback: Recaptcha.focus_response_field
            });
            $("#Button", b).click(function() {
                $("#CaptchaError").text("").hide();
                RecaptchaPrompt.submit(Recaptcha.get_challenge(), Recaptcha.get_response())
            })
        },
        submit: function(b, c) {
            $.post("/verify_captcha/" + window.location.search, {
                challenge: b,
                response: c
            },
            function(e) {
                if (e.status == "success") window.location = e.url;
                else {
                    $("#CaptchaError").text("Try again").show();
                    Recaptcha.reload()
                }
            },
            "json")
        }
    }
} ();
var CreateBoardDialog = function() {
    return {
        setup: function() {
            function b() {
                if (!f) {
                    f = true;
                    Tagging.initInput("#CreateBoard input.collaborator_name",
                    function(d, h) {
                        g = d;
                        h && $("#CreateBoard .submit_collaborator").click()
                    },
                    function() {})
                }
            }
            function c() {
                var d = [];
                $("#CurrentCollaborators .collaborator", e).each(function() {
                    d.push($(this).attr("username"))
                });
                return d
            }
            var e = $("#CreateBoard"),
            g = null,
            f = false;
            b();
            $("#CreateBoard input.collaborator_name").defaultValue($("#CreateBoard input.collaborator_name").val());
            $(".submit_collaborator", e).click(function() {
                trackGAEvent("submit_board_collaborator", "clicked", "create_board_dialogue");
                if (g) {
                    var d = '<li username="' + g.value + '" class="collaborator invite"><a href="' + g.value + '"><img class="collaborator_image" src="' + g.image + '" alt="Collaborator Photo"></a><a class="collaborator_name" href="' + g.value + '">' + g.label + '</a><a href="#" class="delete_collaborator invite" value="' + g.value + '">Remove</a></li>';
                    $("#CurrentCollaborators", e).prepend(d);
                    $(".collaborator_name", e).val("");
                    g = null
                }
            });
            $(".delete_collaborator", e).live("click",
            function() {
                trackGAEvent("delete_collaborator", "clicked", "create_board_dialogue");
                $(this).parent().remove();
                return false
            });
            BoardPicker.setup("#CreateBoard .BoardPicker",
            function(d) {
                $("#id_category", e).val(d)
            });
            $("#BoardName", e).keyup(function() {
                $(".board_name.error", e).html() !== "" && $(".board_name.error", e).html("")
            });
            $(".Submit .Button", e).click(function() {
                trackGAEvent("create_board", "clicked", "create_board_dialogue");
                if ($("#BoardName", e).val() == "Board Name" || $("#BoardName", e).val() == "") {
                    $(".CreateBoardStatus", e).html("Please enter a board name").show();
                    return false
                }
                var d = $("#id_category", e).val(),
                h = $(".Submit .Button", e);
                h.attr("disabled", "disabled").addClass("disabled").html("Creating &hellip;");
                var j = {
                    name: $("#BoardName", e).val(),
                    collaborator: $("input[name='change_BoardCollaborators']:checked", e).val(),
                    collaborators: c()
                };
                if (d) j.category = d;
                $.post("/board/create/", j,
                function(k) {
                    if (k.status == "success") {
                        trackGAEvent("create_board", "success", "create_board_dialogue");
                        e.hide();
                        $("#BoardName", e).val("Board Name");
                        $(".CreateBoardStatus", e).html("").hide();
                        $("#id_category", e).val("");
                        $(".CurrentCategory", e).text("Select a Category");
                        window.location = k.url
                    }
                    else {
                        $(".CreateBoardStatus", e).html(k.message).show();
                        h.removeAttr("disabled").removeClass("pressed").html("Create")
                    }
                },
                "json");
                return false
            })
        },
        reset: function() {
            $("#BoardName").val("");
            $("input[value='me']").attr("checked", true);
            $("#CurrentCollaborators").empty()
        }
    }
} ();
var Login = function() {
    return {
        setup: function() {
            $(".AuthForm").submit(function() {
                $(".Button", this).addClass("disabled")
            });
            $("#resetPassword").click(function() {
                $("#AuthForm").hide();
                $("#ResetForm").show();
                return false
            });
            $("#backToLogin").click(function() {
                $("#AuthForm").show();
                $("#ResetForm").hide();
                return false
            })
        }
    }
} ();

var EditPin = function() {
    return {
        setup: function() {
            Tagging.initTextarea("#description_pin_edit");
            Tagging.priceTag("#description_pin_edit", "#PinEditPreview");
            $("#PinEdit").submit(function() {
                Tagging.loadTags("#description_pin_edit", "#id_pin_replies", "#pin_tags", "#id_buyable")
            });
            $("#description_pin_edit").keyup(function() {
                $("#postDescription").html($(this).val())
            })
        },
        deletePin: function() {
            var b = $("#DeletePin .SubmitButton");
            b.addClass("disabled").text(b.data("text-deleting"));
            $.post("/pin/" + pinID + "/delete/", {},
            function(c) {
                if (c.status == "success") {
                    trackGAEvent("delete_pin", "success");
                    window.location = c.url
                }
                else alert(c.message)
            },
            "json")
        }
    }
} ();

var EditBoard = function() {
    return {
        setup: function() {
            $("#BoardEdit input.collaborator_name").defaultValue($("#BoardEdit input.collaborator_name").val());
            BoardPicker.setup("#BoardEdit .BoardPicker",
            function(b) {
                $("#BoardEdit #id_category").val(b)
            });
            $("#BoardEdit .submit_collaborator").click(function() {
                trackGAEvent("submit_collaborator", "clicked", "edit_board_dialogue");
                if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test($("#BoardEdit input.collaborator_name").val())) {
                    $("#InviteCollaborator").show();

                    $("#InviteCollaborator #invite_email").val($("#BoardEdit input.collaborator_name").val());
                    invite_email = $("#BoardEdit input.collaborator_name").val();
                    $("#invite_email, #invite_message").blur();
                    $("#BoardEdit input.collaborator_name").val("Enter a name")
                }
                else {
                    var b = $("#BoardEdit .add_collaborators").find("input").serialize();
                    $.post(board_collaborator, b,
                    function(c) {
                        if (c.status == "success") {
                            Tagging.ignore[c.profile_url] = 1;
                            trackGAEvent("submit_collaborator", "success", "edit_board_dialogue");
                            $("#BoardEdit input.collaborator_username").val("");
                            $("#BoardEdit input.collaborator_name").val("");
                            c = '<li class="collaborator unaccepted"><a href="' + c.profile_url + '"><img class="collaborator_image" src="' + c.avatar_url + '" alt="Collaborator Photo" /></a><a class="collaborator_name" href="' + c.profile_url + '">' + c.full_name + '</a><a href="#" class="delete_collaborator" value="' + c.username + '" tooltip="Remove ' + c.full_name + '">x</a><span class="note">Invite sent!</span></li>';
                            c = $(c);
                            $("#BoardEdit .add_collaborators ul").prepend(c);
                            c.find("a.delete_collaborator").tipsy({
                                title: "tooltip",
                                gravity: "s",
                                fade: true,
                                html: true
                            })
                        }
                        else alert("Looks like something went wrong! We're looking into it. Try again.")
                    })
                }
                return false
            });
            $("body").on("click", "a.delete_collaborator",
            function() {
                trackGAEvent("delete_colaborator", "clicked", "edit_board_dialogue");

                var b = $(this),
                c = b.hasClass("invite") ? board_collaborator + "delete/": board_collaborator,
                e = b.attr("data-name") || b.parent().find(".collaborator_name").text(),
                g = "Are you sure you want to remove " + e + " from this board?";
                if (e === "yourself") g = "Are you sure you want to leave this board and remove it from your profile?";
                $("#DeleteCollaborator .message").text(g);
                Modal.show("DeleteCollaborator");
                EditBoard.deleteCollaborator = function() {
                    $.post(c, {
                        collaborator_username: b.attr("value"),
                        remove: true
                    },
                    function(f) {
                        if (f.status == "success") {
                            trackGAEvent("delete_collaborator", "success", "edit_board_dialogue");
                            b.parent().remove();
                            if (e === "yourself") window.location.href = "/me/";
                            Tagging.ignore && delete Tagging.ignore["/" + b.attr("value") + "/"]
                        }
                        else alert("Something went wrong. Try Again.");
                        Modal.close("DeleteCollaborator")
                    })
                };
                return false
            });
            $("#invite_submit").submit(function() {
                trackGAEvent("invite_board", "submit", "edit_board_dialogue");
                $.post("/invite/new/", {
                    name: "somebody",
                    email: $("#invite_email").val(),
                    message: $("#invite_message").val(),
                    board_user: board_username,
                    board_name: board_slug
                },
                function(b) {
                    data = $.parseJSON(b);
                    if (data.status == "success") {
                        trackGAEvent("invite_board", "success", "edit_board_dialogue");
                        $("#invite_name").val("");
                        $("#invite_email").val("");
                        $("#invite_response").html("Invite sent successfully to " + invite_email + ".").show().delay(2E3).fadeOut(500)
                    }
                    else $("#invite_response").html(data.message)
                });
                return false
            });
            $("#invite_submit").submit(function() {
                var b = 'Hi!\n\nI wanted to invite you to Pinterest so you can help contribute to my pinboard, "' + board_body_name + '". Pinterest is a place to catalog things you love. You can create pinboards on anything, from fashion, to gadgets, to art.\n\nEnjoy!';
                $("#InviteCollaborator").fadeOut(250);
                $("#InviteCollaborator #invite_email").val("");
                $("#InviteCollaborator #invite_message").val(b);
                $("#InviteCollaborator #invite_response").val("")
            })
        },
        init_ac: function() {
            if (!ac_init) {
                ac_init = true;
                Tagging.ignore = {};
                $("#BoardEdit .add_collaborators a.collaborator_name").each(function(b, c) {
                    Tagging.ignore[$(c).attr("href")] = 1
                });
                Tagging.initInput("#BoardEdit input.collaborator_name",
                function(b, c) {
                    $("#BoardEdit input.collaborator_username").val(b ? b.value: "");
                    $("#BoardEdit input.collaborator_name").val(b ? b.label: "");
                    c && $("#BoardEdit .submit_collaborator").click()
                },
                function() {})
            }
        },
        deleteBoard: function() {
            trackGAEvent("delete_board", "clicked", "edit_board_dialogue");
            var b = $("#DeleteBoard .SubmitButton"),
            c = window.location.pathname.split("/")[1];
            b.addClass("disabled").text("Deleting...");
            $.ajax({
                type: "DELETE",
                dataType: "json",
                url: board_settings,
                success: function(e) {
                    trackGAEvent("delete_board", "success", "edit_board_dialogue");
                    if (e.status == "done") window.location = "/" + c;
                    else alert("Board delete failed - please refresh and try again. We are very sorry :-/")
                },
                error: function() {
                    alert("Board delete failed - please refresh and try again. We are very sorry :-/")
                }
            })
        }
    }
} ();

(function(b) {
    b.fn.extend({
        switcher: function(c) {
            b.extend({},
            c);
            if (! (b.browser.msie && b.browser.version < 9)) return this.each(function() {
                function e() {
                    h.checkbox.bind("change.switch", d);
                    h.switcher.live("click.switch", f)
                }
                function g(l, r) {
                    return b('<div class="switch"><div class="shadow"></div><div class="border"><div class="knob"><div class="circle"><div class="inner circle"></div></div><div class="labels"><label class="on">' + l + '</label><label class="off">' + r + "</label></div></div></div></div>")
                }
                function f() {
                    h.checkbox.attr("checked") !== "checked" ? h.checkbox.prop("checked", true) : h.checkbox.prop("checked", false);
                    d()
                }
                function d() {
                    h.x = h.switcher.find(".knob").offset().left;
                    var l = b(".shadow", h.switcher);
                    if (h.checkbox.attr("checked") == "checked") {
                        b(".knob", h.switcher).css("margin-left", "62%");
                        l.addClass("on");
                        console.log("moveKnob on")
                    } else {
                        b(".knob", h.switcher).css("margin-left", "0%");
                        l.removeClass("on");
                        console.log("moveKnob off")
                    }
                }
                var h = {
                    checkbox: b(),
                    switcher: b(),
                    clicked: false,
                    moved: false,
                    startX: 0,
                    x: 0
                },
                j = b(this).data("text-on"),
                k = b(this).data("text-off");
                h.switcher = g(j, k);
                h.checkbox = b(this);
                h.checkbox.hide();
                h.checkbox.after(h.switcher);
                h.startX = h.switcher.find(".knob").offset().left;
                e();
                d()
            })
        }
    })
})(jQuery);
var SelectedFriendView = Backbone.View.extend({
    tagName: "li",
    className: "friend",
    events: {
        "click .close": "unselect"
    },
    initialize: function(b) {
        this.selector = b.selector;
        this.friend = b.friend;
        this.unselectedView = b.unselectedView;
        this.render()
    },
    render: function() {
        this.$el.html(FriendSelector.templates.selectedFriend(this.friend));
        this.$el.appendTo(this.selector.addedList);
        return this
    },
    unselect: function() {
        this.unselectedView.toggleSelectedMultiple();
        this.remove()
    }
}),
UnselectedFriendView = Backbone.View.extend({
    tagName: "li",
    className: "friend",
    initialize: function(b) {
        this.ul = b.ul;
        this.friend = b.friend;
        this.selector = b.selector;
        this.isSelected = false;
        this.render()
    },
    events: {
        "click .Button": "toggleSelected"
    },
    toggleSelected: function() {
        this.selector.multiple ? this.toggleSelectedMultiple() : this.toggleSelectedSingle()
    },
    toggleSelectedMultiple: function() {
        if (this.isSelected) {
            this.selector.toggleSelected(this);
            this.$el.removeClass("added");
            this.isSelected = false;
            this.$el.show()
        } else if (this.selector.canAdd()) {
            new SelectedFriendView({
                friend: this.friend,
                selector: this.selector,
                unselectedView: this
            });
            this.selector.toggleSelected(this);
            this.$el.addClass("added");
            this.isSelected = true;
            this.$el.hide()
        }
    },
    toggleSelectedSingle: function() {
        this.selector.toggleSelected(this);
        this.$el.find(".Button").toggleClass("disabled");
        (this.isSelected = !this.isSelected) && this.selector.selectionComplete()
    },
    applyFilter: function(b) {
        var c = this.$el,
        e = c.find(".name");
        if (this.friend.name.match(b)) {
            e.data("original", c.html() + "");
            b = (e.text() + "").replace(b, "<strong>$1</strong>");
            e.html(b);
            this.selector.unaddedList.append(c)
        } else {
            c.data("original") && c.html(c.data("original"));
            c.detach()
        }
        return c
    },
    render: function() {
        this.$el.html($(FriendSelector.templates.unselectedFriend(this.friend)));
        this.ul.append(this.$el);
        return this
    }
}),
Poller = function(b) {
    this.options = {
        maxRetries: 0
    };
    this.tries = 0;
    this.options = _.extend(this.options, b);
    this.start = function() {
        this.poll()
    };
    this.stop = function() {
        if (this.timeout) {
            window.clearTimeout(this.timeout);
            this.timeout = null
        }
    };
    this.poll = function() {
        var c = this;
        $.ajax({
            url: c.options.url,
            dataType: "json",
            cache: false,
            success: function(e) {
                c.tries += 1;
                if (e.success && _.isFunction(c.options.success)) c.options.success(e);
                else if (c.options.maxRetries > 0 && c.tries > c.options.maxRetries) _.isFunction(c.options.retriesExceeded) && c.options.retriesExceeded();
                else {
                    c.timeout = window.setTimeout(c.poll, c.options.timeout);
                    _.isFunction(c.options.error) && c.options.error(e)
                }
            }
        })
    };
    _.bindAll(this);
    return this
},
FriendSelector = Backbone.View.extend({
    events: {
        "click .ActionButton": "selectionComplete",
        "keyup .filter-term": "filterFriends"
    },
    initialize: function(b) {
        _.isUndefined(FriendSelector.templates) && FriendSelector.loadTemplates();
        this.multiple = _.isBoolean(b.multiple) ? b.multiple: true;
        this.url = this.$el.data("url");
        this.maxSelections = parseInt(this.$el.data("max-selections"));
        this.unaddedList = this.$el.find(".friend-list");
        this.loading = this.$el.find(".loading");
        this.confirm = this.$el.find(".invite-confirm");
        this.confirmRecipients = this.$el.find(".invite-recipients");
        this.unaddedList.hide();
        if (this.multiple) {
            this.addedList = this.$el.find(".added-friends ul");
            this.counter = this.$el.find(".current-selections")
        }
        this.maxRetries = b.maxRetries ? b.maxRetries: 8;
        _.isFunction(b.selectionMade) && this.$el.on("selection:made", b.selectionMade);
        _.isFunction(b.noAccess) && this.$el.on("selection:no-access", b.noAccess);
        this.filterFriends = _.debounce(this.filterFriends, 100);
        this.unselectedFriends = [];
        this.selectedFriends = [];
        this.friendList = b.friendList;
        var c = this;
        this.poller = new Poller({
            url: c.url,
            timeout: 1E3,
            maxRetries: c.maxRetries,
            retriesExceeded: b.retriesExceeded,
            error: function(e) {
                if (!e.has_access) {
                    c.poller.stop();
                    c.loading.fadeOut(300,
                    function() {
                        c.$el.trigger("selection:no-access", [e, c])
                    })
                }
            },
            success: function(e) {
                if (e.friends && e.friends.length > 0) window.location.reload();
                else {
                    c.friendList = e.friends;
                    c.loading.fadeOut(350);
                    c.buildFriendViews()
                }
            }
        });
        if (_.isArray(this.friendList)) this.buildFriendViews();
        else {
            this.friendList = null;
            this.findFriends()
        }
        this.updateCounter();
        this.$el.data("selector", this);
        this.$el.find(".filter-term").val("");
        this.setOffsets();
        $(window).resize(_.bind(this.setOffsets, this))
    },
    setOffsets: function() {
        var b = this.$el.find(".unadded-friends");
        this.$el.find(".added-friends").css("left", b.offset().left + b.width() + 20)
    },
    findFriends: function() {
        this.loading.removeClass("hidden");
        this.poller.start();
        return this
    },
    filterFriends: function(b) {
        b = $(b.currentTarget).val();
        var c = new RegExp("(" + b + ")", "i");
        _.each(this.unselectedFriends,
        function(e) {
            e.applyFilter(c)
        })
    },
    removeFriends: function(b) {
        this.friendList = _.reject(this.friendList,
        function(e) {
            return _.include(b, e.id)
        });
        _.each(this.unselectedFriends,
        function(e) {
            _.include(b, e.friend.id) && e.$el.remove()
        });
        this.selectedFriends = [];
        if (this.addedList) {
            var c = this.addedList.find("li");
            c.fadeOut(350,
            function() {
                c.remove()
            })
        }
    },
    canAdd: function() {
        return this.maxSelections ? this.selectedFriends.length < this.maxSelections: true
    },
    toggleSelected: function(b) {
        b.isSelected ? this.setUnselected(b) : this.setSelected(b);
        this.updateCounter()
    },
    updateCounter: function() {
        if (this.counter) {
            this.unaddedList.fadeTo(this.canAdd() ? 1 : 0.2);
            this.counter.html(this.maxSelections - this.selectedFriends.length)
        }
    },
    setSelectedState: function(b, c) {
        if (!this.multiple) this.selectedFriends = [];
        if (c) this.selectedFriends.push(b);
        else this.selectedFriends = _.without(this.selectedFriends, b)
    },
    setUnselected: function(b) {
        this.selectedFriends = this.multiple ? _.without(this.selectedFriends, b) : []
    },
    setSelected: function(b) {
        if (this.multiple) this.selectedFriends.push(b);
        else this.selectedFriends = [b]
    },
    buildFriendViews: function() {
        var b = this;
        _.each(this.friendList,
        function(c) {
            c = new UnselectedFriendView({
                ul: b.unaddedList,
                friend: c,
                selector: b
            });
            b.unselectedFriends.push(c.render())
        });
        this.unaddedList.fadeIn(350)
    },
    afterSelection: function() {
        var b = _.pluck(this.selectedFriends, "friend");
        this.removeFriends(_.pluck(b, "id"));
        this.confirmRecipients.html(Arrays.conjunct(_.pluck(b, "name")));
        this.confirm.fadeIn(500).delay(3E3).fadeOut(500)
    },
    selectionCancelled: function() {
        _.each(this.selectedFriends,
        function(b) {
            b.toggleSelected()
        });
        this.selectedFriends = [];
        this.unaddedList.find(".disabled").toggleClass("disabled")
    },
    selectionComplete: function() {
        this.$el.trigger("selection:made", [_.pluck(this.selectedFriends, "friend"), this])
    }
},
{
    initAll: function() {
        FriendSelector.loadTemplates();
        $(".friend-selector").each(function(b, c) {
            new FriendSelector({
                el: c
            })
        })
    },
    loadTemplates: function() {
        FriendSelector.templates = {
            unselectedFriend: _.template($("#template-unselected-friend").html()),
            selectedFriend: _.template($("#template-selected-friend").html())
        }
    }
});
$(window).ready(function() {
    "placeholder" in document.createElement("input") || $("[placeholder]").focus(function() {
        var b = $(this);
        if (b.val() == b.attr("placeholder")) {
            b.val("");
            b.removeClass("placeholder")
        }
    }).blur(function() {
        var b = $(this);
        if (b.val() == "" || b.val() == b.attr("placeholder")) {
            b.addClass("placeholder");
            b.val(b.attr("placeholder"))
        }
    }).blur().parents("form").submit(function() {
        $(this).find("[placeholder]").each(function() {
            var b = $(this);
            b.val() == b.attr("placeholder") && b.val("")
        })
    })
});
var RepinDialog2 = function() {
    function b(H) {
        var G = {};
        G[A + "transform"] = H;
        return G
    }
    function c(H, G) {
        return b("scale(" + H + "," + G + ")")
    }
    function e(H, G) {
        H = Math.floor(H);
        G = Math.floor(G);
        return w && !I ? {
            left: H + "px",
            top: G + "px"
        }: b("translate(" + H + "px," + G + "px)")
    }
    function g(H, G) {
        G = $.extend({
            url: "/pin/" + H + "/repindata/",
            dataType: "json",
            success: function() {},
            failure: function() {
                RepinDialog2.close()
            }
        },
        G || {});
        $.ajax(G)
    }
    function f(H) {
        return $('div[data-id="' + H + '"]')
    }
    function d(H, G) {
        var K = Math.min(Math.floor(G / H * v), q);
        H = Math.floor(K / G * H);
        return {
            height: K,
            width: H
        }
    }
    function h(H, G, K) {
        H = u(H, G, K);
        $("body").append(H.css({
            visibility: "hidden",
            position: "absolute"
        }));
        G = {
            base: H,
            height: H.height(),
            width: H.width()
        };
        H.remove().css({
            visibility: "",
            position: ""
        });
        return G
    }
    function j(H, G) {
        var K = $("form", G),
        N = $(".Buttons .Button", G),
        s = $(".DescriptionTextarea", G);
        H = $(".CharacterCount", G);
        var x = $(".mainerror", G);
        AddDialog.shareCheckboxes("Repin2");
        CharacterCount.setup(s, H, N);
        $("#publish_to_facebook", G).click(function() {
            $(this).data("publish-fb") || Facebook.startFacebookConnect("publish_stream", false, false)
        });
        N.click(function() {
            if (s.val() == "") {
                x.html(s.data("text-error-empty")).slideDown();
                return false
            }
            $("#repin_details", K).val(s.val());
            Tagging.loadTags(s, $("#repin_comment_replies", K), $("#repin_tags", K), $("#repin_currency_holder", K));
            K.submit();
            return false
        });
        K.submit(function() {
            if (N.hasClass("disabled")) return false;
            trackGAEvent("repin_submit", "clicked", "dialogue");
            N.addClass("disabled").html(N.data("text-pinning"));
            $.ajax({
                type: "POST",
                url: $(this).attr("action"),
                dataType: "json",
                data: $(this).serialize(),
                success: function(y) {
                    var C;
                    if (y.status == "success") {
                        trackGAEvent("repin_submit", "success", "dialogue");
                        C = $('<div class="PostSuccess">' + $("#Repin .PostSuccess").html() + "</div>");
                        $(".BoardLink", C).attr("href", y.board_url).text(y.board_name);
                        $(".PinLink", C).attr("href", y.repin_url);
                        $("#repin_success_board_id", C).val(y.board_id);
                        G.empty().append(C);
                        C = 2500;
                        var J = $("#Repin2 .PostSuccess .suggestion");
                        if (y.suggestion) {
                            trackGAEvent("repin_submit", "viewed", "suggestion");
                            J.find(".boardHolder").html(y.suggestion);
                            J.fadeIn(500);
                            C = 1E4;
                            $(".pinBoard .followBoard a", J).click(function() {
                                clearTimeout(E);
                                trackGAEvent("repin_submit", "clicked", "suggestion");
                                E = setTimeout(function() {
                                    RepinDialog2.close()
                                },
                                1E3)
                            })
                        } else J.hide();
                        clearTimeout(E);
                        E = setTimeout(function() {
                            RepinDialog2.close()
                        },
                        C)
                    } else {
                        N.removeClass("disabled").html(N.data("text-pin-it"));
                        alert(y.message)
                    }
                },
                error: function() {
                    N.removeClass("disabled").html(N.data("text-pin-it"))
                }
            });
            return false
        });
        Tagging.initTextarea(s);
        Tagging.priceTag(s, $(".PinImagePreview", G));
        CharacterCount.truncateData(s, 500);
        BoardPicker.setup($(".BoardPicker", G),
        function(y) {
            $("#repin_board", G).val(y)
        },
        function(y) {
            $("#repin_board", G).val(y)
        });
        $.browser.msie || window.setTimeout(function() {
            s.focus().select()
        },
        1)
    }
    function k() {
        var H, G, K, N;
        if (!p) {
            G = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;visibility:hidden;"><div style="height:100px;"></div>');
            H = $("div", G);
            K = $('<div style="width:50px;height:50px;overflow:hidden;overflow-y:scroll;position:absolute;visibility:hidden;"><div style="height:100px;"></div>');
            N = $("div", K);
            $("body").append(G, K);
            H = H.innerWidth() - N.innerWidth();
            G.remove();
            K.remove();
            $("head").append('<style type="text/css">.noscroll.extraScroll,.noscroll.extraScroll #CategoriesBar,.noscroll.extraScroll #Header {margin-right:' + H + "px;}</style>");
            $("body").addClass("extraScroll");
            D && $("body").addClass("hidefixed");
            p = true
        }
    }
    function l(H, G) {
        var K = new Image;
        if (typeof G === "function") K.onload = G;
        K.src = H
    }
    function r(H, G) {
        H && H.length && l(H.attr("src").replace(/_(b|c)\.jpg$/, "_f.jpg"), G)
    }
    function u(H, G, K) {
        var N = $("#Repin"),
        s = $('<div id="Repin2"></div>'),
        x = $(".PinForm", N).clone();
        K && x.prepend(K.clone());
        x.prepend($('<div class="PinImagePreview pin priceReveal"></div>').css({
            height: G.height + "px"
        }));
        s.append(x, $("#repinform", N).clone());
        $("#repin_pin_id", s).val(H);
        $("form", s).attr("action", "/pin/" + H + "/repin/");
        return s
    }
    function o(H, G, K) {
        K = '<div class="PinBorder"></div><img class="PinImagePreviewImg" src="' + G.imgurl + '" width="' + K.width + '" height="' + K.height + '" />';
        if (G.video) K += '<img src="' + media_url + 'images/VideoIndicator.png" alt="Video Icon" class="video" />';
        if (G.buyable) K += '<div class="price">$' + G.buyable + "</div>";
        $(".PinImagePreview", H).html(K);
        $(".DescriptionTextarea", H).val(G.details).parent("li").addClass("val");
        $("#repin_tags", H).val(G.tags.join(","));
        $("#repin_comment_replies", H).val(G.reply_usernames.join(","));
        return H
    }
    var m = "visible",
    q = 300,
    v = 370,
    w = $.browser.webkit,
    B = $.browser.mozilla,
    D = navigator.userAgent.match(/chrome/i),
    I = navigator.userAgent.match(/ipad/i),
    p = false,
    n = Modernizr.csstransforms3d && !navigator.userAgent.match(/ipod|iphone|android/i),
    z = !!window.Router,
    A = "",
    E = 0,
    F = {},
    Q = {};
    if (w) A = "-webkit-";
    else if (B) A = "-moz-";
    if (z) {
        Router.on("route:repin",
        function(H) {
            RepinDialog2.show(H, true)
        });
        Router.on("route:zoom",
        function() {
            RepinDialog2.close(true)
        });
        Router.on("route:other",
        function() {
            RepinDialog2.close(true)
        })
    }
    return {
        setup: function() {
            var H = this,
            G;
            $("#ColumnContainer").on("click", ".repin_link",
            function(K) {
                trackGAEvent("repin_button", "clicked", "board_layout");
                G = $(this).closest(".pin").attr("data-id");
                H.show(G);
                K.preventDefault()
            })
        },
        show: function(H, G) {
            if (!this.currentPinID) {
                k();
                this.currentPinID = H;
                z && !G && Router.navigate("/pin/" + H + "/repin/");
                if (n) if ($("#zoom").length) this.flipFromCloseupModal(H);
                else $(".CloseupRight").length ? this.flipFromCloseupPage(H) : this.flipFromGrid(H);
                else if ($("#zoom").length) this.simpleShowFromCloseupModal(H);
                else $(".CloseupRight").length ? this.simpleShowFromCloseupPage(H) : this.simpleShowFromGrid(H)
            }
        },
        flip: function(H, G, K, N, s, x, y) {
            function C() {
                if (!R.isFlipping && R.backContent && S) {
                    var V = $(".PinImagePreviewImg", ea);
                    V.attr("src", V.attr("src").replace("_b.jpg", "_f.jpg"))
                }
            }
            function J() {
                var V = $(window),
                ga = V.height();
                V = V.width();
                ba.css(e(V < X ? X / 2 : V / 2, ga < W ? W / 2 : ga / 2))
            }
            function L() {
                J()
            }
            function M() {
                if (!R.isFlipping && R.backContent) {
                    ea.empty().append(R.backContent);
                    C();
                    j(H, R.backContent);
                    B && !ca.length && Y.addClass(m);
                    $(window).on("resize", L)
                }
            }
            var O = this,
            S = false,
            R = {
                isFlipping: true,
                frontSource: N
            },
            T = d(G, K);
            G = N.outerWidth();
            K = N.outerHeight();
            var U = N.offset();
            y = h(H, T, y);
            var aa = y.base,
            X = y.width,
            W = y.height,
            Z = G / X,
            da = K / W,
            ca = $("#zoomScroll"),
            Y,
            ba,
            fa,
            ea;
            r(s,
            function() {
                S = true;
                C()
            });
            Y = $('<div id="flipScroll" class="repinMask"><div id="flip"><div class="front face"><div class="repinWrapper"></div></div><div class="back face"><div class="repinWrapper"></div></div></div></div>');
            R.startScale = [Z, da];
            R.container = Y;
            R.resizeFn = L;
            ba = $("#flip", Y);
            s = $(".front", ba);
            fa = $(".repinWrapper", s);
            y = $(".back", ba);
            ea = $(".repinWrapper", y);
            ba.css(e(U.left + G / 2, U.top - $(window).scrollTop() + K / 2));
            s.css({
                top: -Math.floor(K / 2) + "px",
                left: -Math.floor(G / 2) + "px"
            });
            fa.append(x, $('<div class="faceMask"></div>')).css({
                height: K + "px",
                width: G + "px"
            });
            y.css({
                top: -Math.floor(W / 2) + "px",
                left: -Math.floor(X / 2) + "px"
            });
            ea.html("<img id='BackLoader' src='" + media_url + "images/MidLoader.gif' alt='Loading...' />").css($.extend({
                height: W + "px",
                width: X + "px"
            },
            c(Z, da)));
            ca.addClass("notransition");
            $("body").addClass("noscroll").append(Y);
            N.addClass("invisible");
            g(H, {
                success: function(V) {
                    if (!R.isClosing) {
                        R.backContent = o(aa, V, T);
                        M()
                    }
                }
            });
            setTimeout(function() {
                var V = $(window).height();
                J();
                V < W && Y.scrollTop(W - V);
                fa.css(c(1 / Z, 1 / da));
                ea.css(b(""));
                ba.addClass("flipping flipped"); ! B && !ca.length && Y.addClass(m);
                setTimeout(function() {
                    ba.removeClass("flipping");
                    if (!R.isClosing) {
                        R.isFlipping = false;
                        M()
                    }
                },
                401)
            },
            1);
            O.closeListeners(H);
            F[H] = R
        },
        flipFromCloseupModal: function(H) {
            var G = $("#zoom"),
            K = $(".PinImageImg", G),
            N = K.height(),
            s = K.width();
            if (K && !K.length) {
                K = $(".PinImage", G);
                N = K.attr("data-height");
                s = K.attr("data-width");
                K = null
            }
            this.flip(H, s, N, G, K, $('<div id="zoom" class="pin"></div>').html(G.html()), $(".AttributionSource", G))
        },
        flipFromCloseupPage: function(H) {
            var G = $(".CloseupRight > .WhiteContainer"),
            K = $("#pinCloseupImage"),
            N = K.height(),
            s = K.width();
            if (K && !K.length) {
                K = $("#pinCloseupVideo");
                N = K.attr("data-height");
                s = K.attr("data-width");
                K = null
            }
            this.flip(H, s, N, G, K, G.clone(), $(".AttributionSource", G))
        },
        flipFromGrid: function(H) {
            var G = f(H);
            this.flip(H, G.attr("data-width"), G.attr("data-height"), G, $(".PinImageImg", G), $('<div class="pin"></div>').html(G.html()), $(".AttributionSource", G))
        },
        simpleShow: function(H, G, K, N) {
            function s() {
                var T = $(window),
                U = T.height();
                T = T.width();
                U = U < O ? 0 : Math.floor((U - O) / 2);
                T = T < M ? 0 : Math.floor((T - M) / 2);
                (R || C).css({
                    top: U + "px",
                    left: T + "px"
                })
            }
            function x() {
                s()
            }
            var y = $('<div class="repinMask simpleRepin"><div id="Repin2"><img id="BackLoader" src="' + media_url + 'images/MidLoader.gif" alt="Loading..." /></div></div>'),
            C = $("#Repin2", y),
            J = d(G, K);
            G = h(H, J, N);
            var L = G.base,
            M = G.width,
            O = G.height,
            S = {};
            G = $("body");
            K = this;
            var R;
            G.addClass("noscroll");
            y.addClass(m);
            C.css({
                height: O + "px",
                width: M + "px"
            });
            s();
            G.append(y);
            S.resizeFn = x;
            S.container = y;
            g(H, {
                success: function(T) {
                    var U = $(window).height();
                    if (!S.isClosing) {
                        trackGAEvent("flip_grid_form", "success", "repin");
                        R = o(L, T, J);
                        C.replaceWith(R);
                        s();
                        U < O && y.scrollTop(O - U);
                        j(H, R);
                        $(window).on("resize", x)
                    }
                }
            });
            K.closeListeners(H);
            Q[H] = S
        },
        simpleShowFromCloseupModal: function(H) {
            var G = $("#zoom"),
            K = $(".PinImageImg", G);
            this.simpleShow(H, K.width(), K.height(), $(".AttributionSource", G))
        },
        simpleShowFromCloseupPage: function(H) {
            var G = $(".CloseupRight > .WhiteContainer"),
            K = $("#pinCloseupImage");
            this.simpleShow(H, K.width(), K.height(), $(".AttributionSource", G))
        },
        simpleShowFromGrid: function(H) {
            var G = f(H);
            this.simpleShow(H, G.attr("data-width"), G.attr("data-height"), $(".AttributionSource", G))
        },
        closeListeners: function() {
            var H = this,
            G = $(".repinMask");
            G.click(function(K) {
                $(K.target).is(G) && H.close()
            });
            $(document).keydown(function(K) {
                if (K.keyCode == 27) {
                    H.close();
                    K.preventDefault()
                }
            })
        },
        close: function(H) {
            function G() {
                C.remove();
                K.length || $("body").removeClass("noscroll")
            }
            var K = $("#zoomScroll"),
            N,
            s,
            x,
            y,
            C,
            J;
            if (J = this.currentPinID) {
                clearTimeout(E);
                (function() {
                    var L = $("#Repin .CurrentBoard"),
                    M = $("#Repin2 .CurrentBoard"),
                    O = $("#Repin2 #repin_board"),
                    S = $("#Repin #repin_board");
                    if (!M.length) {
                        M = $("#Repin2 .BoardLink");
                        O = $("#Repin2 #repin_success_board_id")
                    }
                    if (M.length) {
                        L.text(M.text());
                        S.val(O.val())
                    }
                })();
                z && !H && window.history.back();
                this.currentPinID = null;
                if (F[J]) {
                    N = $("#flip", C).addClass("flipping");
                    H = F[J];
                    H.isClosing = true;
                    H.isFlipping = false;
                    s = H.startScale;
                    y = H.frontSource;
                    x = y.offset();
                    C = H.container;
                    C.removeClass(m);
                    N.removeClass("flipped").css(e(x.left + y.outerWidth() / 2, x.top - $(window).scrollTop() + y.outerHeight() / 2));
                    $(".back .repinWrapper", N).empty().css(c(s[0], s[1]));
                    $(".front .repinWrapper", N).css(b(""));
                    N.addClass("flipping");
                    setTimeout(function() {
                        y.removeClass("invisible");
                        window.setTimeout(function() {
                            K.removeClass("notransition")
                        },
                        1);
                        G();
                        F[J] = null
                    },
                    401);
                    $(window).off("resize", H.resizeFn)
                } else if (Q[J]) {
                    H = Q[J];
                    H.isClosing = true;
                    C = H.container;
                    G();
                    Q[J] = null;
                    $(window).off("resize", H.resizeFn)
                }
            }
        }
    }
} ();
var MobileNagControl = function() {
    this.hideNagCookie = P.MobileNagConfig.HIDE_NAG_COOKIE;
    this.csrf = P.MobileNagConfig.CSRF_TOKEN;
    this.nagType = P.MobileNagConfig.nag_type;
    this.hasTopNag = P.MobileNagConfig.has_top_nag;
    this.enabledNags = P.MobileNagConfig.nag_support;
    this.body = $(document.body);
    this.currentLocation = window.location;
    this.userAgent = navigator ? navigator.userAgent: "";
    this.nagBar = $("#AppNag")
};
a = MobileNagControl.prototype;
a.init = function() {
    $(".Nag").length && this.body.addClass("hazYellowNag");
    document.URL.match(/\/pin\//) && this.body.addClass("hazCloseUp");
    this.hasTopNag && $(document.body).addClass("topNag");
    this.nagType && this.nagType != "unauth" && $(document.body).addClass("appNag");
    this.renderUnauthNags();
    this.attachHandlers()
};
a.getRequestPath = function() {
    return this.currentLocation.pathname
};
a.attachHandlers = function() {
    var b = this;
    $(".close", this.nagBar).click(function() {
        CookieManager.set_cookie(b.hideNagCookie, "1");
        b.closeNag();
        b.trackCloseNag();
        return false
    });
    $(".open", this.nagBar).click(function() {
        b.trackClickNag();
        window.setTimeout(function() {
            DeepLinking.redirectApp()
        },
        300);
        return false
    })
};
a.closeNag = function() {
    this.body.removeClass("appNag");
    this.nagBar.hide()
};
a.trackCloseNag = function() {
    $.post("/close_mobile_nag/", {
        nag_type: this.nagType,
        csrfmiddlewaretoken: this.csrf,
        request_path: this.getRequestPath()
    })
};
a.trackClickNag = function() {
    $.post("/click_mobile_nag/", {
        nag_type: this.nagType,
        csrfmiddlewaretoken: this.csrf,
        request_path: this.getRequestPath()
    })
};
a.trackViewNag = function(b) {
    $.post("/view_mobile_nag/", {
        nag_type: b,
        csrfmiddlewaretoken: this.csrf,
        request_path: this.getRequestPath()
    })
};
a.renderUnauthNags = function() {
    var b = "",
    c = navigator ? navigator.userAgent: "",
    e = CookieManager.get_cookie(this.hideNagCookie);
    if (this.nagType == "unauth" && !e) {
        if (c.match(/iphone/i)) b = "iphone";
        else if (c.match(/ipad/i)) b = "ipad";
        else if (c.match(/android/i)) b = "android";
        if (b && this.enabledNags && this.enabledNags.indexOf(b) >= 0) {
            $(document.body).addClass("topNag");
            $("." + b, this.appNag).show();
            $(".unauth", this.appNag).show();
            this.trackViewNag(b)
        }
    }
};
var DeepLinking = {
    android_app_dl_url: "https://play.google.com/store/apps/details?id=com.pinterest",
    apple_app_dl_url: "http://itunes.apple.com/us/app/pinterest/id429047995",
    app_url: "pinterest://",
    app_url2: "pinit12://",
    deep_link_cookie: "deep_linking_cookie",
    current_location: window.location,
    android_redirect_key: "p_android_return",
    init: function() { ! CookieManager.get_cookie(this.deep_link_cookie) && this.handleDeepLink()
    },
    handleDeepLink: function() {
        return this.isValidSource() && this.isIOS()
    },
    isValidSource: function() {
        var b = this.current_location.search;
        return b && b.match(/utm_medium=email/g) != null
    },
    isIOS: function() {
        return navigator && navigator.userAgent.match(/iP/i) != null
    },
    isAndroid: function() {
        return navigator && navigator.userAgent.match(/android/i) != null
    },
    redirectApp: function() {
        var b = this,
        c = b.app_url + this.current_location.href,
        e = null,
        g = b.app_url2 + this.current_location.href.replace(/(http:\/\/)|(https:\/\/)/, "");
        CookieManager.delete_cookie(this.deep_link_cookie);
        if (this.isIOS()) {
            window.location = c;
            window.setTimeout(function() {
                CookieManager.set_cookie(b.deep_link_cookie, "1");
                window.location = b.apple_app_dl_url
            },
            50)
        } else if (this.isAndroid()) {
            e = document.createElement("iframe");
            e.style.visibility = "hidden";
            e.src = g;
            e.onload = function() {
                window.location = b.android_app_dl_url
            };
            document.body.appendChild(e)
        }
    },
    getAndroidRedirectUrl: function(b) {
        b = b.indexOf("?") >= 0 ? b + "&": b + "?";
        b += this.android_redirect_key + "=1";
        return b
    }
},
CookieManager = {
    set_cookie: function(b, c, e) {
        var g = new Date,
        f = "";
        if (e) {
            g.setTime(g.getTime() + e * 24 * 60 * 60 * 1E3);
            f = "; expires=" + g.toGMTString()
        }
        document.cookie = b + "=" + c + f + "; path=/"
    },
    delete_cookie: function(b) {
        this.set_cookie(b, "", -1)
    },
    get_cookie: function(b) {
        var c = null,
        e = null,
        g = null;
        if (document.cookie && document.cookie != "") {
            e = document.cookie.split(";");
            for (var f = 0; f < e.length; f++) {
                g = jQuery.trim(e[f]);
                if (g.substring(0, b.length + 1) == b + "=") c = decodeURIComponent(g.substring(b.length + 1))
            }
        }
        return c
    }
};
DeepLinking.init();
$(document).bind("ready.deep_links",
function() {
    window.P && window.P.MobileNagConfig && window.P.MobileNagConfig.nag_type && (new MobileNagControl).init()
});
(function(b) {
    b.fn.passStrength = function(c, e, g, f) {
        return this.each(function() {
            var d = b(this);
            b(d).unbind().bind("keyup blur",
            function() {
                if (b(this).val() !== null) {
                    var h = b.fn.teststrength(b(this).val(), f, g);
                    if (h[2]) {
                        c.attr("disabled", "disabled");
                        c.addClass("disabled")
                    } else {
                        c.removeAttr("disabled");
                        c.removeClass("disabled")
                    }
                    e.html(h[0]);
                    e.removeClass(f.badPassStyle);
                    e.removeClass(f.goodPassStyle);
                    e.removeClass(f.strongPassStyle);
                    e.addClass(h[1])
                }
            })
        })
    };
    b.fn.teststrength = function(c, e, g) {
        var f = 0;
        if (c.length < 6) return [e.shortPassStr, e.badPassStyle, 1];
        if (e.userid.length > 0 && c.toLowerCase() == e.userid.toLowerCase()) return [e.samePasswordStr, e.badPassStyle, 1];
        if (jQuery.inArray(c.toLowerCase(), g) > -1) return [e.blackPassStr, e.badPassStyle, 1];
        f += c.length * 2;
        f += b.fn.uniqueCharacters(c) * 3;
        if (c.match(/(.*[0-9].*[0-9].*[0-9])/)) f += 15;
        if (c.match(/(.*[!,@,#,$,%,\^,&,*,?,_,~].*[!,@,#,$,%,\^,&,*,?,_,~])/)) f += 15;
        if (c.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) f += 10;
        if (c.match(/([a-zA-Z])/) && c.match(/([0-9])/)) f += 15;
        if (c.match(/([!,@,#,$,%,\^,&,*,?,_,~])/) && c.match(/([0-9])/)) f += 15;
        if (c.match(/([!,@,#,$,%,\^,&,*,?,_,~])/) && c.match(/([a-zA-Z])/)) f += 15;
        if (c.match(/^[a-z]+$/) || c.match(/^[A-Z]+$/) || c.match(/^\d+$/)) f -= 10;
        if (f < 34) return [e.badPassStr, e.badPassStyle, 0];
        if (f < 68) return [e.goodPassStr, e.goodPassStyle, 0];
        return [e.strongPassStr, e.strongPassStyle, 0]
    }
})(jQuery);
$.fn.uniqueCharacters = function(b) {
    for (var c = {}, e = 0, g = 0; g < b.length; g++) if (! (b.charAt(g) in c)) {
        c[b.charAt(g)] = true;
        e++
    }
    return e
};
