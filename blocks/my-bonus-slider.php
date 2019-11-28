<?php
$query = new WP_Query(array(
    'cat'            => ALL_BONUSES_ID,
    'post_type'      => 'bonus',
    'posts_per_page' => 50,
    'post_parent'    => $post->ID,
    'meta_query'     => array(
        array(
            'key' => 'wpcf-base-identifier',
            'value'     => '',
            'compare'   => '!=',
        )
    ),
    'orderby'        => 'post_date',
    'order'          => 'DESC'
));

if ($query->posts) {
    if (count($query->posts) > 0) {

        /**
         * to get bonuses identifiers
         */
        $bonusesIdentifiers = get_post_identifier('wpcf-base-identifier','bonus');
        $result = array();

        if( !empty($bonusesIdentifiers) ) {

            $data = array(
                'type'              => 'bonus',
                'search'            => $bonusesIdentifiers,
                'limit'             => count($bonusesIdentifiers),
                'country' => CURRENT_COUNTRY,
                'lang' => CURRENT_LOCAL,
            );
            $result = WP_Curl($data);
            associate_array($result['data'],'identifier');
        } ?>

        <?php if( wpmd_is_notdevice()){ ?>
            <div class="clear" style="height: 15px"></div>
        <?php }?>

        <div class="new-bonuses-cnt" id="new-bonuses-cnt">
            <div class="fade-slider-container" id="fade-slider-container">

                <!--tabs -->
                <?php if( wpmd_is_device()){ ?><div class="scroll-cnt"><?php } ?>
                    <div class="bonus-kinds-cnt fade-slider-tabs">
                        <?php

                        /**
                         * get bonuses ids array()
                         */
                        $bonusIds = get_bonuses_ids(ALL_BONUSES_ID);

                        /**
                         * counter status
                         */
                        $statusCounterKind = '0';

                        if (!empty($bonusIds)) {

                            $i = 0;
                            foreach ($bonusIds as $bonusKey => $name) {
                                $i++;

                                /**
                                 * get bonus kind status (active or no-active tab)
                                 */
                                foreach ($query->posts as $postData) {
                                    if ( in_category(array($bonusKey), $postData->ID) ) {
                                        $$bonusKey = true;
                                    }
                                } ?>

                                <div class="one-tab one-kind
                            <?php
                                echo ($$bonusKey !=1) ? 'no-active' : 'first-active';
                                if($$bonusKey == true){$statusCounterKind ++;}
                                if( ($$bonusKey == true) && ($statusCounterKind == 1) ){echo ' super-active'; }
                                ?>" data-id="kind<?php echo $i; ?>">
                                    <div class="kind-icon">
                                        <svg class="icon-svg">
                                            <use xlink:href="<?php echo get_template_directory_uri(); ?>/svg/bonus-icons/sprite.svg#<?php echo $i; ?>"></use>
                                        </svg>
                                    </div>
                                    <div class="kind-text"><?php echo $name; ?></div>
                                </div>

                            <?php }
                        } ?>
                    </div>
                    <?php if( wpmd_is_device()){ ?></div><?php } ?>
                <!-- END tabs -->

                <div class="fade-slider-wrapper-block">
                    <?php
                    if (!empty($bonusIds)) {

                        $i = 1;
                        $counterActive = 0;
                        foreach ($bonusIds as $id => $name) {

                            $bonusTypeIdentifier = get_term_meta($id, "wpcf-cat-base-identifier", true); ?>

                            <div class="one-kind-slider bonus-kind-item-slider-cnt

                            <?php if($$id == 1){$counterActive++;} echo ( ($$id == 1) && $counterActive == 1 ) ? ' active' : ' no-active'; ?>" id="kind<?php echo $i; ?>">

                                <?php if (wpmd_is_notdevice()) { ?>
                                    <div class="bonus-img-cnt">
                                        <div class="img-block">
                                            <div id="kind<?php echo $i; ?>-icon"></div>
                                        </div>
                                    </div>
                                <?php } ?>


                                <div class="bonus-slider-block">
                                    <div class="bonus-slider">
                                        <?php
                                        $query = new WP_Query(array(
                                            'post_type'      => 'bonus',
                                            'posts_per_page' => '50',
                                            'cat'            => All_BONUS_ID,
                                            'post_parent' => $post->ID,
                                            'category__and'  => $id,
                                            'meta_query' => array(
                                                array(
                                                    'key' => 'wpcf-base-identifier',
                                                    'value' => '',
                                                    'compare' => '!=',
                                                )
                                            ),
                                            'orderby'        => 'post_date',
                                            'order'          => 'ASC'
                                        ));

                                        if ($query->posts) {

                                            $k = count($query->posts);
                                            foreach ($query->posts as $postData) {
                                                $scroll_identifier = get_post_meta($postData->ID, 'wpcf-guid', true);
                                                $identifier        = get_post_meta($postData->ID, 'wpcf-base-identifier', true);

                                                /**
                                                 * get bonuses texts and titles from storage
                                                 */
                                                $bonusTitle = '';
                                                $bonusText  = '';

                                                $bonus_max_bonus_amount = ''; $bonus_value = ''; $bonus_currency = '';
                                                $bonus_free_spins = ''; $bonus_min_deposit = ''; $bonus_wagering_requirements = '';


                                                if( !empty($result['data'][$identifier])){
                                                    $bonusTitle = $result['data'][$identifier]['title'];

                                                    /**
                                                     * get some properties from storage
                                                     */

                                                    //$bonusTypeIdentifier    = $result['data'][$identifier]["bonus_type_identifier"];
                                                    $bonus_max_bonus_amount = $result['data'][$identifier]["max_bonus_amount"];
                                                    $bonus_value            = $result['data'][$identifier]["value"];
                                                    $bonus_currency         = $result['data'][$identifier]["currency_code"];
                                                    $bonus_free_spins       = $result['data'][$identifier]["free_spins"];
                                                    $bonus_min_deposit      = $result['data'][$identifier]["min_deposit"];
                                                    $bonus_wagering_requirements = $result['data'][$identifier]["wagering_requirements"];
                                                }

                                                $bonusText = get_bonuses_type_text_template($bonusTypeIdentifier, $bonus_max_bonus_amount, $bonus_value, $bonus_currency, $bonus_free_spins, $bonus_min_deposit, $bonus_wagering_requirements);

                                                if (in_category($id, $postData->ID)) {
                                                    $kind = 'kind' . $i;
                                                    $scroll_identifier = 'head' . $scroll_identifier . '-' . $kind;
                                                } ?>

                                                <div class="one-slide <?php if ($k === 1) { echo 'active'; } ?>" id="<?php echo $scroll_identifier; ?>" data-bulet="<?php echo $k;?>">
                                                    <div class="bonus-desc">
                                                        <div class="bonus-title"><?php echo ( !empty($bonusText)) ? wp_trim_words($bonusTitle, 10, ' ...') : $bonusTitle;?></div>
                                                        <?php if (wpmd_is_device()) { ?>
                                                            <div class="bonus-img-cnt">
                                                                <div class="img-block">
                                                                    <div class="animated-icon"></div>
                                                                </div>
                                                            </div>
                                                        <?php } ?>
                                                        <div class="bonus-text-preview">
                                                            <?php //echo wp_trim_words($postData->post_content, 25); ?>
                                                            <?php echo $bonusText; ?>
                                                        </div>
                                                    </div>
                                                    <div class="slider-item-btn-cnt">
                                                        <?php
                                                        $ref = get_post_meta($post->ID, "wpcf-casino-ref-link", true);
                                                        $wl = (!empty($ref) && $ref != '') ? get_ref_code($ref, 'button', 'content', 'dms') : $ofSite;
                                                        ?>
                                                        <a href="<?php echo $wl; ?>" class="bonus_button"
                                                           rel="nofollow" target="_blank"></a>
                                                        <div class="button-icon"></div>
                                                    </div>
                                                </div>
                                                <?php $k--;
                                            }
                                        } ?>
                                    </div>
                                </div>
                                <div class="paging">
                                    <?php
                                    if ($query->posts) {

                                        $j = 1;
                                        if (count($query->posts) > 1) {

                                            foreach ($query->posts as $postData) {

                                                $scroll_identifier = get_post_meta($postData->ID, 'wpcf-guid', true);
                                                if (in_category($id, $postData->ID)) {
                                                    $kind = 'kind' . $i;
                                                    $scroll_identifier = 'head' . $scroll_identifier . '-' . $kind;
                                                } ?>

                                                <span data-bulet="<?php echo $j;?>" class="item-page <?php if ($j == 1) { ?>active<?php } ?>"
                                                      page-data-id="<?php echo $scroll_identifier; ?>"></span>

                                                <?php
                                                $j++;
                                            }
                                        }
                                    } ?>
                                </div>
                            </div>
                            <?php $i++;
                        }
                    } ?>
                    <div class="rarr-cnt">
                        <div class="left-rarr active" id="left"><i class="icon-left"></i></div>
                        <div class="right-rarr active" id="right"><i class="icon-right"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }
}?>