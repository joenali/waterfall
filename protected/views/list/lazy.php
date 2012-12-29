
<div class="BoardLayout">

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
          <span class="LikesCount">
              112 likes
          </span>
          <span class="CommentsCount">
              1 comment
          </span>
            <span class="RepinsCount">
              252 repins
            </span>
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
</div>

<script type="text/javascript">
      //var _gaq = _gaq || [];
      //_gaq.push(['_trackPageview', 'pins_pageless_home']);
</script>

