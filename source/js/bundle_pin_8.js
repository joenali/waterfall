var a;

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

var BoardLayout = function() {
    return {
        setup: function(b) {
            if (!this.setupComplete) {
                this.setupFlow();
                $(function() {
                    if (window.userIsAuthenticated) {
                        //Like.gridListeners();
                        //Follow.listeners();
                        //Comment.gridComment();
                        //RepinDialog2.setup()
                    }
                    Zoom.setup()
                });
                this.center = !!b;
                this.setupComplete = true }
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
