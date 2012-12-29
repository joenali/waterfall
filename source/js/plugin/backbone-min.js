(function() {
    var b = this,
    c = b.Backbone,
    e = Array.prototype.slice,
    g = Array.prototype.splice,
    f;
    f = typeof exports !== "undefined" ? exports: (b.Backbone = {});
    f.VERSION = "0.9.1";
    var d = b._;
    if (!d && typeof require !== "undefined") d = require("underscore");
    var h = b.jQuery || b.Zepto || b.ender;
    f.setDomLibrary = function(p) {
        h = p
    };
    f.noConflict = function() {
        b.Backbone = c;
        return this
    };
    f.emulateHTTP = false;
    f.emulateJSON = false;
    f.Events = {
        on: function(p, n, z) {
            var A;
            p = p.split(/\s+/);
            for (var E = this._callbacks || (this._callbacks = {}); A = p.shift();) {
                A = E[A] || (E[A] = {});
                var F = A.tail || (A.tail = A.next = {});
                F.callback = n;
                F.context = z;
                A.tail = F.next = {}
            }
            return this
        },
        off: function(p, n, z) {
            var A, E, F;
            if (p) {
                if (E = this._callbacks) for (p = p.split(/\s+/); A = p.shift();) {
                    F = E[A];
                    delete E[A];
                    if (n && F) for (;
                    (F = F.next) && F.next;) F.callback === n && (!z || F.context === z) || this.on(A, F.callback, F.context)
                }
            } else delete this._callbacks;
            return this
        },
        trigger: function(p) {
            var n, z, A, E;
            if (! (z = this._callbacks)) return this;
            A = z.all;
            for ((p = p.split(/\s+/)).push(null); n = p.shift();) {
                A && p.push({
                    next: A.next,
                    tail: A.tail,
                    event: n
                });
                if (n = z[n]) p.push({
                    next: n.next,
                    tail: n.tail
                })
            }
            for (E = e.call(arguments, 1); n = p.pop();) {
                z = n.tail;
                for (A = n.event ? [n.event].concat(E) : E;
                (n = n.next) !== z;) n.callback.apply(n.context || this, A)
            }
            return this
        }
    };
    f.Events.bind = f.Events.on;
    f.Events.unbind = f.Events.off;
    f.Model = function(p, n) {
        var z;
        p || (p = {});
        if (n && n.parse) p = this.parse(p);
        if (z = D(this, "defaults")) p = d.extend({},
        z, p);
        if (n && n.collection) this.collection = n.collection;
        this.attributes = {};
        this._escapedAttributes = {};
        this.cid = d.uniqueId("c");
        if (!this.set(p, {
            silent: true
        })) throw new Error("Can't create an invalid model");
        delete this._changed;
        this._previousAttributes = d.clone(this.attributes);
        this.initialize.apply(this, arguments)
    };
    d.extend(f.Model.prototype, f.Events, {
        idAttribute: "id",
        initialize: function() {},
        toJSON: function() {
            return d.clone(this.attributes)
        },
        get: function(p) {
            return this.attributes[p]
        },
        escape: function(p) {
            var n;
            if (n = this._escapedAttributes[p]) return n;
            n = this.attributes[p];
            return this._escapedAttributes[p] = d.escape(n == null ? "": "" + n)
        },
        has: function(p) {
            return this.attributes[p] != null
        },
        set: function(p, n, z) {
            var A, E;
            if (d.isObject(p) || p == null) {
                A = p;
                z = n
            } else {
                A = {};
                A[p] = n
            }
            z || (z = {});
            if (!A) return this;
            if (A instanceof f.Model) A = A.attributes;
            if (z.unset) for (E in A) A[E] = void 0;
            if (!this._validate(A, z)) return false;
            if (this.idAttribute in A) this.id = A[this.idAttribute];
            n = this.attributes;
            var F = this._escapedAttributes,
            Q = this._previousAttributes || {},
            H = this._setting;
            this._changed || (this._changed = {});
            this._setting = true;
            for (E in A) {
                p = A[E];
                d.isEqual(n[E], p) || delete F[E];
                z.unset ? delete n[E] : (n[E] = p);
                if (this._changing && !d.isEqual(this._changed[E], p)) {
                    this.trigger("change:" + E, this, p, z);
                    this._moreChanges = true
                }
                delete this._changed[E];
                if (!d.isEqual(Q[E], p) || d.has(n, E) != d.has(Q, E)) this._changed[E] = p
            }
            if (!H) { ! z.silent && this.hasChanged() && this.change(z);
                this._setting = false
            }
            return this
        },
        unset: function(p, n) { (n || (n = {})).unset = true;
            return this.set(p, null, n)
        },
        clear: function(p) { (p || (p = {})).unset = true;
            return this.set(d.clone(this.attributes), p)
        },
        fetch: function(p) {
            p = p ? d.clone(p) : {};
            var n = this,
            z = p.success;
            p.success = function(A, E, F) {
                if (!n.set(n.parse(A, F), p)) return false;
                z && z(n, A)
            };
            p.error = f.wrapError(p.error, n, p);
            return (this.sync || f.sync).call(this, "read", this, p)
        },
        save: function(p, n, z) {
            var A, E;
            if (d.isObject(p) || p == null) {
                A = p;
                z = n
            } else {
                A = {};
                A[p] = n
            }
            z = z ? d.clone(z) : {};
            if (z.wait) E = d.clone(this.attributes);
            p = d.extend({},
            z, {
                silent: true
            });
            if (A && !this.set(A, z.wait ? p: z)) return false;
            var F = this,
            Q = z.success;
            z.success = function(H, G, K) {
                G = F.parse(H, K);
                if (z.wait) G = d.extend(A || {},
                G);
                if (!F.set(G, z)) return false;
                Q ? Q(F, H) : F.trigger("sync", F, H, z)
            };
            z.error = f.wrapError(z.error, F, z);
            n = this.isNew() ? "create": "update";
            n = (this.sync || f.sync).call(this, n, this, z);
            z.wait && this.set(E, p);
            return n
        },
        destroy: function(p) {
            p = p ? d.clone(p) : {};
            var n = this,
            z = p.success,
            A = function() {
                n.trigger("destroy", n, n.collection, p)
            };
            if (this.isNew()) return A();
            p.success = function(F) {
                p.wait && A();
                z ? z(n, F) : n.trigger("sync", n, F, p)
            };
            p.error = f.wrapError(p.error, n, p);
            var E = (this.sync || f.sync).call(this, "delete", this, p);
            p.wait || A();
            return E
        },
        url: function() {
            var p = D(this.collection, "url") || D(this, "urlRoot") || I();
            if (this.isNew()) return p;
            return p + (p.charAt(p.length - 1) == "/" ? "": "/") + encodeURIComponent(this.id)
        },
        parse: function(p) {
            return p
        },
        clone: function() {
            return new this.constructor(this.attributes)
        },
        isNew: function() {
            return this.id == null
        },
        change: function(p) {
            if (this._changing || !this.hasChanged()) return this;
            this._moreChanges = this._changing = true;
            for (var n in this._changed) this.trigger("change:" + n, this, this._changed[n], p);
            for (; this._moreChanges;) {
                this._moreChanges = false;
                this.trigger("change", this, p)
            }
            this._previousAttributes = d.clone(this.attributes);
            delete this._changed;
            this._changing = false;
            return this
        },
        hasChanged: function(p) {
            if (!arguments.length) return ! d.isEmpty(this._changed);
            return this._changed && d.has(this._changed, p)
        },
        changedAttributes: function(p) {
            if (!p) return this.hasChanged() ? d.clone(this._changed) : false;
            var n, z = false,
            A = this._previousAttributes;
            for (var E in p) if (!d.isEqual(A[E], n = p[E]))(z || (z = {}))[E] = n;
            return z
        },
        previous: function(p) {
            if (!arguments.length || !this._previousAttributes) return null;
            return this._previousAttributes[p]
        },
        previousAttributes: function() {
            return d.clone(this._previousAttributes)
        },
        isValid: function() {
            return ! this.validate(this.attributes)
        },
        _validate: function(p, n) {
            if (n.silent || !this.validate) return true;
            p = d.extend({},
            this.attributes, p);
            p = this.validate(p, n);
            if (!p) return true;
            n && n.error ? n.error(this, p, n) : this.trigger("error", this, p, n);
            return false
        }
    });
    f.Collection = function(p, n) {
        n || (n = {});
        if (n.comparator) this.comparator = n.comparator;
        this._reset();
        this.initialize.apply(this, arguments);
        p && this.reset(p, {
            silent: true,
            parse: n.parse
        })
    };
    d.extend(f.Collection.prototype, f.Events, {
        model: f.Model,
        initialize: function() {},
        toJSON: function() {
            return this.map(function(p) {
                return p.toJSON()
            })
        },
        add: function(p, n) {
            var z, A, E, F, Q, H = {},
            G = {};
            n || (n = {});
            p = d.isArray(p) ? p.slice() : [p];
            z = 0;
            for (A = p.length; z < A; z++) {
                if (! (E = p[z] = this._prepareModel(p[z], n))) throw new Error("Can't add an invalid model to a collection");
                if (H[F = E.cid] || this._byCid[F] || (Q = E.id) != null && (G[Q] || this._byId[Q])) throw new Error("Can't add the same model to a collection twice");
                H[F] = G[Q] = E
            }
            for (z = 0; z < A; z++) { (E = p[z]).on("all", this._onModelEvent, this);
                this._byCid[E.cid] = E;
                if (E.id != null) this._byId[E.id] = E
            }
            this.length += A;
            g.apply(this.models, [n.at != null ? n.at: this.models.length, 0].concat(p));
            this.comparator && this.sort({
                silent: true
            });
            if (n.silent) return this;
            z = 0;
            for (A = this.models.length; z < A; z++) if (H[(E = this.models[z]).cid]) {
                n.index = z;
                E.trigger("add", E, this, n)
            }
            return this
        },
        remove: function(p, n) {
            var z, A, E, F;
            n || (n = {});
            p = d.isArray(p) ? p.slice() : [p];
            z = 0;
            for (A = p.length; z < A; z++) if (F = this.getByCid(p[z]) || this.get(p[z])) {
                delete this._byId[F.id];
                delete this._byCid[F.cid];
                E = this.indexOf(F);
                this.models.splice(E, 1);
                this.length--;
                if (!n.silent) {
                    n.index = E;
                    F.trigger("remove", F, this, n)
                }
                this._removeReference(F)
            }
            return this
        },
        get: function(p) {
            if (p == null) return null;
            return this._byId[p.id != null ? p.id: p]
        },
        getByCid: function(p) {
            return p && this._byCid[p.cid || p]
        },
        at: function(p) {
            return this.models[p]
        },
        sort: function(p) {
            p || (p = {});
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            var n = d.bind(this.comparator, this);
            if (this.comparator.length == 1) this.models = this.sortBy(n);
            else this.models.sort(n);
            p.silent || this.trigger("reset", this, p);
            return this
        },
        pluck: function(p) {
            return d.map(this.models,
            function(n) {
                return n.get(p)
            })
        },
        reset: function(p, n) {
            p || (p = []);
            n || (n = {});
            for (var z = 0, A = this.models.length; z < A; z++) this._removeReference(this.models[z]);
            this._reset();
            this.add(p, {
                silent: true,
                parse: n.parse
            });
            n.silent || this.trigger("reset", this, n);
            return this
        },
        fetch: function(p) {
            p = p ? d.clone(p) : {};
            if (p.parse === undefined) p.parse = true;
            var n = this,
            z = p.success;
            p.success = function(A, E, F) {
                n[p.add ? "add": "reset"](n.parse(A, F), p);
                z && z(n, A)
            };
            p.error = f.wrapError(p.error, n, p);
            return (this.sync || f.sync).call(this, "read", this, p)
        },
        create: function(p, n) {
            var z = this;
            n = n ? d.clone(n) : {};
            p = this._prepareModel(p, n);
            if (!p) return false;
            n.wait || z.add(p, n);
            var A = n.success;
            n.success = function(E, F) {
                n.wait && z.add(E, n);
                A ? A(E, F) : E.trigger("sync", p, F, n)
            };
            p.save(null, n);
            return p
        },
        parse: function(p) {
            return p
        },
        chain: function() {
            return d(this.models).chain()
        },
        _reset: function() {
            this.length = 0;
            this.models = [];
            this._byId = {};
            this._byCid = {}
        },
        _prepareModel: function(p, n) {
            if (p instanceof f.Model) {
                if (!p.collection) p.collection = this
            } else {
                p = p;
                n.collection = this;
                p = new this.model(p, n);
                p._validate(p.attributes, n) || (p = false)
            }
            return p
        },
        _removeReference: function(p) {
            this == p.collection && delete p.collection;
            p.off("all", this._onModelEvent, this)
        },
        _onModelEvent: function(p, n, z, A) {
            if (! ((p == "add" || p == "remove") && z != this)) {
                p == "destroy" && this.remove(n, A);
                if (n && p === "change:" + n.idAttribute) {
                    delete this._byId[n.previous(n.idAttribute)];
                    this._byId[n.id] = n
                }
                this.trigger.apply(this, arguments)
            }
        }
    });
    d.each(["forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "initial", "rest", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "groupBy"],
    function(p) {
        f.Collection.prototype[p] = function() {
            return d[p].apply(d, [this.models].concat(d.toArray(arguments)))
        }
    });
    f.Router = function(p) {
        p || (p = {});
        if (p.routes) this.routes = p.routes;
        this._bindRoutes();
        this.initialize.apply(this, arguments)
    };
    var j = /:\w+/g,
    k = /\*\w+/g,
    l = /[-[\]{}()+?.,\\^$|#\s]/g;
    d.extend(f.Router.prototype, f.Events, {
        initialize: function() {},
        route: function(p, n, z) {
            f.history || (f.history = new f.History);
            d.isRegExp(p) || (p = this._routeToRegExp(p));
            z || (z = this[n]);
            f.history.route(p, d.bind(function(A) {
                A = this._extractParameters(p, A);
                z && z.apply(this, A);
                this.trigger.apply(this, ["route:" + n].concat(A));
                f.history.trigger("route", this, n, A)
            },
            this));
            return this
        },
        navigate: function(p, n) {
            f.history.navigate(p, n)
        },
        _bindRoutes: function() {
            if (this.routes) {
                var p = [];
                for (var n in this.routes) p.unshift([n, this.routes[n]]);
                n = 0;
                for (var z = p.length; n < z; n++) this.route(p[n][0], p[n][1], this[p[n][1]])
            }
        },
        _routeToRegExp: function(p) {
            p = p.replace(l, "\\$&").replace(j, "([^/]+)").replace(k, "(.*?)");
            return new RegExp("^" + p + "$")
        },
        _extractParameters: function(p, n) {
            return p.exec(n).slice(1)
        }
    });
    f.History = function() {
        this.handlers = [];
        d.bindAll(this, "checkUrl")
    };
    var r = /^[#\/]/,
    u = /msie [\w.]+/,
    o = false;
    d.extend(f.History.prototype, f.Events, {
        interval: 50,
        getFragment: function(p, n) {
            if (p == null) if (this._hasPushState || n) {
                p = window.location.pathname;
                if (n = window.location.search) p += n
            } else p = window.location.hash;
            p = decodeURIComponent(p);
            p.indexOf(this.options.root) || (p = p.substr(this.options.root.length));
            return p.replace(r, "")
        },
        start: function(p) {
            if (o) throw new Error("Backbone.history has already been started");
            this.options = d.extend({},
            {
                root: "/"
            },
            this.options, p);
            this._wantsHashChange = this.options.hashChange !== false;
            this._wantsPushState = !!this.options.pushState;
            this._hasPushState = !!(this.options.pushState && window.history && window.history.pushState);
            p = this.getFragment();
            var n = document.documentMode;
            if (n = u.exec(navigator.userAgent.toLowerCase()) && (!n || n <= 7)) {
                this.iframe = h('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;
                this.navigate(p)
            }
            if (this._hasPushState) h(window).bind("popstate", this.checkUrl);
            else if (this._wantsHashChange && "onhashchange" in window && !n) h(window).bind("hashchange", this.checkUrl);
            else if (this._wantsHashChange) this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
            this.fragment = p;
            o = true;
            p = window.location;
            n = p.pathname == this.options.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !n) {
                this.fragment = this.getFragment(null, true);
                window.location.replace(this.options.root + "#" + this.fragment);
                return true
            } else if (this._wantsPushState && this._hasPushState && n && p.hash) {
                this.fragment = p.hash.replace(r, "");
                window.history.replaceState({},
                document.title, p.protocol + "//" + p.host + this.options.root + this.fragment)
            }
            if (!this.options.silent) return this.loadUrl()
        },
        stop: function() {
            h(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl);
            clearInterval(this._checkUrlInterval);
            o = false
        },
        route: function(p, n) {
            this.handlers.unshift({
                route: p,
                callback: n
            })
        },
        checkUrl: function() {
            var p = this.getFragment();
            if (p == this.fragment && this.iframe) p = this.getFragment(this.iframe.location.hash);
            if (p == this.fragment || p == decodeURIComponent(this.fragment)) return false;
            this.iframe && this.navigate(p);
            this.loadUrl() || this.loadUrl(window.location.hash)
        },
        loadUrl: function(p) {
            var n = this.fragment = this.getFragment(p);
            return d.any(this.handlers,
            function(z) {
                if (z.route.test(n)) {
                    z.callback(n);
                    return true
                }
            })
        },
        navigate: function(p, n) {
            if (!o) return false;
            if (!n || n === true) n = {
                trigger: n
            };
            var z = (p || "").replace(r, "");
            if (! (this.fragment == z || this.fragment == decodeURIComponent(z))) {
                if (this._hasPushState) {
                    if (z.indexOf(this.options.root) != 0) z = this.options.root + z;
                    this.fragment = z;
                    window.history[n.replace ? "replaceState": "pushState"]({},
                    document.title, z)
                } else if (this._wantsHashChange) {
                    this.fragment = z;
                    this._updateHash(window.location, z, n.replace);
                    if (this.iframe && z != this.getFragment(this.iframe.location.hash)) {
                        n.replace || this.iframe.document.open().close();
                        this._updateHash(this.iframe.location, z, n.replace)
                    }
                } else window.location.assign(this.options.root + p);
                n.trigger && this.loadUrl(p)
            }
        },
        _updateHash: function(p, n, z) {
            if (z) p.replace(p.toString().replace(/(javascript:|#).*$/, "") + "#" + n);
            else p.hash = n
        }
    });
    f.View = function(p) {
        this.cid = d.uniqueId("view");
        this._configure(p || {});
        this._ensureElement();
        this.initialize.apply(this, arguments);
        this.delegateEvents()
    };
    var m = /^(\S+)\s*(.*)$/,
    q = ["model", "collection", "el", "id", "attributes", "className", "tagName"];
    d.extend(f.View.prototype, f.Events, {
        tagName: "div",
        $: function(p) {
            return this.$el.find(p)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            this.$el.remove();
            return this
        },
        make: function(p, n, z) {
            p = document.createElement(p);
            n && h(p).attr(n);
            z && h(p).html(z);
            return p
        },
        setElement: function(p, n) {
            this.$el = h(p);
            this.el = this.$el[0];
            n !== false && this.delegateEvents();
            return this
        },
        delegateEvents: function(p) {
            if (p || (p = D(this, "events"))) {
                this.undelegateEvents();
                for (var n in p) {
                    var z = p[n];
                    d.isFunction(z) || (z = this[p[n]]);
                    if (!z) throw new Error('Event "' + p[n] + '" does not exist');
                    var A = n.match(m),
                    E = A[1];
                    A = A[2];
                    z = d.bind(z, this);
                    E += ".delegateEvents" + this.cid;
                    A === "" ? this.$el.bind(E, z) : this.$el.delegate(A, E, z)
                }
            }
        },
        undelegateEvents: function() {
            this.$el.unbind(".delegateEvents" + this.cid)
        },
        _configure: function(p) {
            if (this.options) p = d.extend({},
            this.options, p);
            for (var n = 0, z = q.length; n < z; n++) {
                var A = q[n];
                if (p[A]) this[A] = p[A]
            }
            this.options = p
        },
        _ensureElement: function() {
            if (this.el) this.setElement(this.el, false);
            else {
                var p = D(this, "attributes") || {};
                if (this.id) p.id = this.id;
                if (this.className) p["class"] = this.className;
                this.setElement(this.make(this.tagName, p), false)
            }
        }
    });
    f.Model.extend = f.Collection.extend = f.Router.extend = f.View.extend = function(p, n) {
        p = B(this, p, n);
        p.extend = this.extend;
        return p
    };
    var v = {
        create: "POST",
        update: "PUT",
        "delete": "DELETE",
        read: "GET"
    };
    f.sync = function(p, n, z) {
        var A = v[p],
        E = {
            type: A,
            dataType: "json"
        };
        if (!z.url) E.url = D(n, "url") || I();
        if (!z.data && n && (p == "create" || p == "update")) {
            E.contentType = "application/json";
            E.data = JSON.stringify(n.toJSON())
        }
        if (f.emulateJSON) {
            E.contentType = "application/x-www-form-urlencoded";
            E.data = E.data ? {
                model: E.data
            }: {}
        }
        if (f.emulateHTTP) if (A === "PUT" || A === "DELETE") {
            if (f.emulateJSON) E.data._method = A;
            E.type = "POST";
            E.beforeSend = function(F) {
                F.setRequestHeader("X-HTTP-Method-Override", A)
            }
        }
        if (E.type !== "GET" && !f.emulateJSON) E.processData = false;
        return h.ajax(d.extend(E, z))
    };
    f.wrapError = function(p, n, z) {
        return function(A, E) {
            E = A === n ? E: A;
            p ? p(n, E, z) : n.trigger("error", n, E, z)
        }
    };
    var w = function() {},
    B = function(p, n, z) {
        var A;
        A = n && n.hasOwnProperty("constructor") ? n.constructor: function() {
            p.apply(this, arguments)
        };
        d.extend(A, p);
        w.prototype = p.prototype;
        A.prototype = new w;
        n && d.extend(A.prototype, n);
        z && d.extend(A, z);
        A.prototype.constructor = A;
        A.__super__ = p.prototype;
        return A
    },
    D = function(p, n) {
        if (! (p && p[n])) return null;
        return d.isFunction(p[n]) ? p[n]() : p[n]
    },
    I = function() {
        throw new Error('A "url" property or function must be specified');
    }
}).call(this);
