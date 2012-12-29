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
