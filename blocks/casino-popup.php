<?php
$closed         = get_post_meta($post->ID, "wpcf-closed-casino", true);
$blacklisted    = get_post_meta($post->ID, "wpcf-blacklisted-casino", true);
$banned         = get_post_meta($post->ID, "wpcf-banned-casino", true);
?>

<!-- casino popup -->
<div class="casino-shadow-block"></div>
<div class="popup-casino-block">

    <div class="icon-coner popup-icon"></div>
    <div class="icon-popup-close-icon popup-close-icon"></div>

    <?php
    $titlePopupText = '';
    $meta_key = '';

    if( ($closed == 1) || ($blacklisted == 1) || ($banned == 1) ) {
        if ($closed == 1) {
            $meta_key = 'wpcf-show-in-closed-casino';
            $titlePopupText = '<span>Tämä kasino on suljettu  Suomessa.</span> <span>Kokeile niitä</span>';  ?>
        <?php } ?>
        <?php if ($blacklisted == 1) {
            $meta_key = 'wpcf-show-in-blacklisted-casino';
            $titlePopupText = '<span>Tämä kasino on mustalla listalla Suomessa.</span> <span>Kokeile niitä</span>'; ?>
        <?php } ?>
        <?php if ($banned == 1) {
            $meta_key = 'wpcf-show-in-banned-casino';
            $titlePopupText = '<span>Tämä kasino on kielletty Suomessa.</span> <span>Kokeile niitä</span>'; ?>
        <?php }
    }?>

    <div class="title-popup">
        <?php echo $titlePopupText; ?>
    </div>
    <div class="closed-c-cnt">
        <?php
        wp_reset_query();
        $args = array(
            'cat' => ALL_CASINOS_ID,
            'post_type'      => 'casino',
            'posts_per_page' => 3,
            'meta_query' => array(
                array(
                    'key' => $meta_key,
                    'value' => '1',
                    'compare' => '=',
                )
            ),
            'orderby'        => 'meta_value_num',
            'meta_key'       => 'ratings_average',
            'order'          => 'DESC',

        );
        $query = new WP_Query($args);

        $casinoIdentifiers = array();
        if ($query->posts) {
            foreach ($query->posts as $postData) {
                $identifier = get_post_meta($postData->ID, "wpcf-base-identifier", true);
                $casinoIdentifiers[] = $identifier;
            }
        }

        $result = array();
        if(!empty($casinoIdentifiers)) {
            $data = array(
                'type' => 'casino',
                'country' => CURRENT_COUNTRY,
                'lang' => CURRENT_LOCAL,
                'search' => $casinoIdentifiers,
                'limit'  => count($casinoIdentifiers),
            );

            $result = WP_Curl($data);
            associate_array($result['data'],'identifier');
        }

        if(wpmd_is_notdevice()){
            if( ($closed == 1) || ($blacklisted == 1) || ($banned == 1) ){ ?>
                <div class="d-recommended-casino-block d-filter-casinos d-recommended-casino-block-bottom d-closed-cas category-casinos-block" id="d-recommended-casino-block-bottom">
                    <ul>
                        <?php
                        if ($query->posts) {
                            foreach ($query->posts as $postData) {

                                $postId = $postData->ID;
                                $name = $postData->post_title;
                                $link = get_the_permalink($postId);
                                $ref = get_post_meta($postId, "wpcf-casino-ref-link", true);
                                $logoUrl = get_the_post_thumbnail_url($postId, 'big-casino-logo');
                                $identifier = get_post_meta($postId, "wpcf-base-identifier", true);
                                $alt = $name . ' arvostelu ' . DOMAIN;

                                $offSiteLink = $result['data'][$identifier]["url"];
                                $casinoBonus = $result['data'][$identifier]['bonuses'][0]["title"];

                                require(PATH_ROOT . '/mode_blocks/laptop/_casino_item.php');
                            }
                        } ?>
                    </ul>
                </div>
            <?php }
        }else{?>
            <div class="d-casino-promo-cnt">
                <?php
                if ($query->posts) {
                    foreach ($query->posts as $postData) {

                        $postId     = $postData->ID;
                        $name       = $postData->post_title;
                        $link       = get_the_permalink($postId);
                        $ref        = get_post_meta($postId, "wpcf-casino-ref-link", true);
                        $logoUrl    = get_the_post_thumbnail_url($postId, 'full' );
                        $alt        = $name. ' arvostelu '.DOMAIN;

                        $identifier_casino = get_post_meta($post->ID, "wpcf-base-identifier", true);
                        ?>
                        <div class="d-one-casino-item">
                            <div class="col-lg-7 col-md-7 col-sm-6 col-xs-6 d-cas-logo">
                                <?php
                                $refLink = '';
                                if ($ref) {
                                    $refLink = get_ref_code($ref, 'button', 'sidebar', 'dms');
                                } else {
                                    $refLink = $link;
                                } ?>
                                <a href="<?php echo $refLink; ?>" target="_blank" class="casino_bonus popup_casino" rel="nofollow">
                                    <img src="<?php echo get_template_directory_uri(); ?>/dist/img/219x134.jpg"
                                         alt="<?php echo $alt; ?>" title="<?php echo $name; ?>"
                                         class="casino-page-img lazyload" data-src="<?php echo $logoUrl; ?>"/>
                                </a>
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-6 col-xs-6 d-value center">
                                <?php  get_component('rating', $postData) ?>

                                <?php if($ref){?>
                                    <a class="d-csinos-btn casino_button popup_casino" target="_blank" rel="nofollow" href="<?php echo get_ref_code($ref,'button','sidebar','dms')?>">Pelata</a>
                                <?php }else if($link){?>
                                    <a class="d-csinos-btn casino_button popup_casino" target="_blank" rel="nofollow" href="<?php echo $link;?>">Pelata</a>
                                <?php } ?>
                            </div>
                        </div>
                        <?php
                    }
                } ?>
            </div>
        <?php } ?>

    </div>
</div>