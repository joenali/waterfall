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
