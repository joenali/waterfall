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
