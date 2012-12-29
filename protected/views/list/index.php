<!DOCTYPE html>
<html lang="en" class="en">
    <head>
        <title>Pinterest / Home </title>
        <script type="text/javascript">var P_TIMER_START = new Date();</script>
        <link rel="stylesheet" href="/gw/source/css/pinboard.css" type="text/css" media="all"/>
        <script type="text/javascript">var _sf_startpt=(new Date()).getTime()</script>
        <script type="text/javascript">if (!window.console) { window.console = {log: function(){}} };</script>
        <script type="text/javascript">window.userIsAuthenticated = false; </script>
        <script type="text/javascript" src="/gw/source/js/jquery.min.js"></script>
        <script src="/gw/source/js/jquery-ui.js" type="text/javascript" charset="utf-8"></script>
        <script src="/gw/source/js/plugin/jquery.form.js" type="text/javascript" charset="utf-8"></script>
        <script src="/gw/source/js/plugin/jquery.jcarousel.js" type="text/javascript" charset="utf-8"></script>
        <script src="/gw/source/js/plugin/jalert.js" type="text/javascript" charset="utf-8"></script>
        <script src="/gw/source/js/plugin/other1.js" type="text/javascript" charset="utf-8"></script>
        <script src="/gw/source/js/plugin/jquery.pageless.min.js" type="text/javascript" charset="utf-8"></script>
        <script src="/gw/source/js/plugin/other2.js" type="text/javascript" charset="utf-8"></script>

        <script src="/gw/source/js/plugin/jquery.tipsy.js" type="text/javascript" charset="utf-8"></script>
        <script src="/gw/source/js/plugin/underscore-min.js" type="text/javascript" charset="utf-8"></script>
        <script src="/gw/source/js/plugin/backbone-min.js" type="text/javascript" charset="utf-8"></script>
        <script src="/gw/source/js/bundle_pin_8.js" type="text/javascript" charset="utf-8"></script>
    </head>

    <body id="CategoriesBarPage">
        <script type="text/javascript">
            $(document).ready(function() {
                Nag.setup('UnauthCallout');
            });
        </script>

        <div id="wrapper" class="BoardLayout">

            <div id="ColumnContainer" style="margin-top: 49px;">
                <div class="memo" style="display: none"></div>

                    <?php foreach ($data as $item) { ?>
                        <div class="pin"  data-id="<?php echo $item['id'];?>" data-closeup-url="http://media-cache0.pinterest.com/upload/215680269624225523_03gzaDtF_c.jpg" data-width="600" data-height="784">
                        <div class="PinHolder">
                          <div class="actions">
                      <a class="Button Button11 WhiteButton ContrastButton repin_link" data-componentType="MODAL_REPIN" data-id="113575221824524565" href="/login/?next=%2Fpin%2F113575221824524565%2F">
                        <em></em><span>Repin</span>
                      </a>
                      <a class="Button WhiteButton ContrastButton Button11 likebutton" data-id="113575221824524565" data-text-like="Like" data-text-unlike="Unlike" href="/login/?next=%2Fpin%2F113575221824524565%2F">
                        <em></em>Like
                      </a>
                      <a class="Button Button11 WhiteButton ContrastButton comment" data-id="113575221824524565" href="/login/?next=%2Fpin%2F113575221824524565%2F">
                        <em></em>Comment
                      </a>
                          </div>
                          <a href="/pin/113575221824524565/" class="PinImage ImgLink">
                              <img src="<?php echo $item['url'];?>" alt="Christmas nails" data-componentType="MODAL_PIN" class="PinImageImg" style="height: <?php echo $item['img_height']?>px;" />
                          </a>
                        </div>
                        <p class="description">Christmas nails</p>
                        <p class="stats colorless">
                          <span class="LikesCount"> 112 likes </span>
                          <span class="CommentsCount"> 1 comment </span>
                            <span class="RepinsCount"> 252 repins </span>
                        </p>
                        <div class="convo attribution clearfix">
                            <a href="/mrsgroff11/" title="Jessica Groff" class="ImgLink">
                              <img src="http://media-cache-ec3.pinterest.com/avatars/mrsgroff11-49.jpg"
                                   alt="Profile picture of Jessica Groff" />
                            </a>
                            <p class="NoImage">
                                    <a href="/mrsgroff11/" data-elementType="PIN_USER">Jessica Groff</a> via <a href="/catacake/" data-elementType="PIN_REPIN_USER">Catalina Fierros</a> onto <a href="/mrsgroff11/style-is-knowing-who-you-are-what-you-want-to-say-/" data-elementType="PIN_BOARD_PIN">Style is knowing who you are, what you want to say, and not giving a damn. </a>
                            </p>
                        </div>
                          <div class="comments colormuted">
                                <div class="comment convo clearfix" comment-id="113575427980678830">
                    <a href="/debjoo/" class="ImgLink"
                       >
                    <img src="http://media-cache-ec1.pinterest.com/avatars/debjoo_1345604523.jpg"
                         class="profile user_image"
                         alt="Profile picture of Deborah Jones" />
                    </a>
                  <p><a href="/debjoo/">Deborah Jones</a> Festive</p>
                                </div>
                          </div>
                      </div>
                <?php } ?>
            </div><!-- #ColumnContainer -->

            <!-- Paginator -->
            <a class="MoreGrid Button WhiteButton Button18" href="?marker=&page=11" style="display:none">See More Pins</a>
            <!-- Infinite scroll loading indicator -->
            <div id="LoadingPins"><img src="http://passets-ec.pinterest.com/images/BouncingLoader.gif" alt="Pin Loader Image" /><span>Fetching pins&hellip;</span></div>

        </div><!-- #wrapper -->

        <script type="text/javascript">
            BoardLayout.setup();
            //Home.setup();

            $.pageless.settings.complete = function() {
                if ($.pageless.settings.currentPage == 10) {
                    if ($.pageless.settings.currentPage < 10) {
                        $(".MoreGrid").css('display', 'block');
                    }
                }
                BoardLayout.newPins();
            };

            $(document).ready(function() {
                    // iPad with iOS 4 doesn't like the lazy load
                    var params = {'lazy':'1'};
                    if (!useLazyLoad) {
                        params['lazy'] = 0
                    }

                    $('#ColumnContainer').pageless({
                        "totalPages": 10,
                        "currentPage": 1,
                        "loader":"LoadingPins",
                        "distance": 3000,
                        "marker": "",
                        "params": params
                    });

                    if (50 > 47) {
                        $('#LoadingPins').hide();
                    }

                });
        </script>
    </body>

    <div id="SearchAutocompleteHolder"></div>
    <button id="ScrollToTop" class="Button WhiteButton Offscreen Indicator" type="button">Scroll to Top</button>
    <script type="text/javascript">
    $(document).ready(function() {
        if (top != self) {
            $('body').html('<h1>Unauthorized</h1>')
        }
    });
    </script>

    <div id="ErrorDialog" class="ModalContainer alertBox">
    <div class="modal">
        <div class="closeBtn closeButton">&nbsp;</div>
        <div class="message"></div>
        <div class="footer">
          <button class="Button RedButton Button18 closeButton" type="button">Close</button>
        </div>
    </div>
    <div class="overlay"></div>
</div>

<div id="ConfirmationDialog" class="ModalContainer alertBox">
    <div class="modal">
        <div class="closeBtn closeButton">&nbsp;</div>
        <h2>Confirmation</h2>
        <div class="message"></div>
        <div class="footer">
          <button class="Button RedButton Button18 okButton confOkButton" type="button">Ok</button>
          <button class="Button RedButton Button18 okButton confOkButton2 hidden" type="button"></button>
          <button class="Button WhiteButton Button18 closeButton confCloseButton" type="button">Cancel</button>
        </div>
    </div>
    <div class="overlay"></div>
</div>
