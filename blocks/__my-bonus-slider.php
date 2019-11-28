<?php
$query = new WP_Query(array(
    'post_type'      => 'bonus',
    'posts_per_page' => '15',
    'cat'            => $category_id,
    'orderby'        => 'date',
    'order'          => 'DESC'
));

$off_site_link = types_render_termmeta("official-website-url", array( "term_id" => $category_id));
$wl = types_render_termmeta("wl-code-casino", array( "term_id" => $category_id));

$refLink = '';
if($wl){
    $refLink = get_ref_code($wl,'button','sidebar','dms');
}else{
    $refLink = $off_site_link;
}

if ($query->posts) {

    //var_dump($category_id);?>
    <div class="clear" style="height: 15px"></div>
    <div class="new-bonuses-cnt">
        <div class="fade-slider-container" id="fade-slider-container">

            <!--tabs -->
            <?php if( wpmd_is_device()){ ?><div class="scroll-cnt"><?php } ?>
                <div class="bonus-kinds-cnt fade-slider-tabs">
                    <?php
                    $kind   = '';
                    $bonusIds = get_bonuses_ids();
                    $bonusesKinds = get_all_bonuses();

                    /**
                     * counter status
                     */
                    $statusCounterKind = 0;
                    $bonusCounter = 1;
                    foreach($bonusesKinds as $bonusKey => $bonusKind){

                        /**
                         * get bonus kind status (active or no-active tab)
                         */
                        foreach ($query->posts as $postData) {
                            if ( in_category(array($bonusKind['id']), $postData->ID) ) {
                                $$bonusKey = true;
                            }
                        }?>

                        <div class="one-tab one-kind
                        <?php
                        echo ($$bonusKey !=1) ? 'no-active' : 'first-active';
                        if($$bonusKey == true){$statusCounterKind ++;}
                        echo ( ($$bonusKey == true) &&($statusCounterKind == 1)) ? ' super-active' : '';
                        ?>" data-id="kind<?php echo $bonusCounter;?>">
                            <div class="kind-icon">
                                <svg class="icon-svg">
                                    <use xlink:href="<?php echo get_template_directory_uri(); ?>/dist/img/icons/bonus-icons/sprite.svg#<?php echo $bonusKind['img'];?>"></use>
                                </svg>
                            </div>
                            <div class="kind-text">
                                <?php echo $bonusKind['title'];?>
                            </div>
                        </div>

                        <?php $bonusCounter++;
                    } ?>
                </div>
                <?php if( wpmd_is_device()){?></div><?php } ?>
            <!-- END tabs -->

            <div class="fade-slider-wrapper-block">
                <?php
                $i = 1;
                $counterActive = 0;
                foreach($bonusIds as $key=>$id){ ?>
                    <div class="one-kind-slider bonus-kind-item-slider-cnt <?php if($$key == 1){$counterActive++;} echo ( ($$key == 1) && $counterActive == 1 ) ? 'active' : ' no-active'; ?> " id="kind<?php echo $i;?>">
                        <div class="bonus-slider-block">
                            <div class="bonus-slider">
                                <?php
                                $query = new WP_Query(array(
                                    'post_type'      => 'bonus',
                                    'posts_per_page' => '50',
                                    'cat'            => $category_id,
                                    'category__and'  => $id,
                                    'orderby'        => 'date',
                                    'order'          => 'ASC'
                                ));
                                if ($query->posts) {
                                    $k = 1;
                                    foreach ($query->posts as $postData) {

                                        $kind = returnBonusIsKinds($postData->ID);

                                        $scroll_identifier = get_post_meta($postData->ID, '_Scroll_identifier', true);
                                        $scroll_identifier = 'head'.strtolower($scroll_identifier).'-'.$kind; ?>

                                        <div class="one-slide <?php if($k == 1){?>active<?php }?>" id="<?php echo $scroll_identifier;?>" data-bulet="<?php echo $k;?>">

                                            <?php if( wpmd_is_notdevice()){?>
                                                <div class="bonus-img-cnt">
                                                    <div class="img-block bonus_button">
                                                        <a href="<?php echo $refLink; ?>" class="bonus_button" rel="nofollow" target="_blank">
                                                            <div class="bonusKindButton<?php echo $i;?>"></div>
                                                        </a>
                                                    </div>
                                                </div>
                                            <?php }?>
                                            <div class="bonus-desc">
                                                <div class="bonus-title"><?php echo $postData->post_title;?></div>
                                                <?php if( wpmd_is_device()){?>
                                                    <div class="bonus-img-cnt">
                                                        <div class="img-block bonus_button">
                                                            <a href="<?php echo $refLink; ?>" rel="nofollow" target="_blank">
                                                                <div class="bonusKindButton<?php echo $i;?>"></div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                <?php }?>
                                                <div class="bonus-text-preview">
                                                    <?php echo wp_trim_words($postData->post_content, 15, '  ...');?>
                                                </div>
                                            </div>
                                            <div class="slider-item-btn-cnt">
                                                <?php
                                                if($wl){?>
                                                    <a href="<?php echo get_ref_code($wl,'button','content','dms')?>" target="_blank" class="bonus_button" rel="nofollow"></a>
                                                <?php }else if($off_site_link){?>
                                                    <a href="<?php echo $off_site_link;?>" class="bonus_button" rel="nofollow" target="_blank"></a>
                                                <?php } ?>
                                                <div class="button-icon"></div>
                                            </div>
                                        </div>
                                        <?php
                                        $k++;
                                    }
                                }?>
                            </div>
                        </div>
                        <div class="paging">
                            <?php
                            $query = new WP_Query(array(
                                'post_type'      => 'bonus',
                                'posts_per_page' => '50',
                                'cat'            => $category_id,
                                'category__and'  => $id,
                                'orderby'        => 'date',
                                'order'          => 'ASC'
                            ));
                            if ($query->posts) {
                                $j = 1;
                                if( count($query->posts)>1 ){
                                    foreach ($query->posts as $postData) {

                                        /* add for bonuses link */
                                        $kind = returnBonusIsKinds($postData->ID);
                                        /* add for bonuses link */

                                        $scroll_identifier = get_post_meta($postData->ID, '_Scroll_identifier', true);
                                        $scroll_identifier = 'head'.strtolower($scroll_identifier).'-'.$kind; ?>

                                        <span data-bulet="<?php echo $j;?>" class="item-page <?php if($j == 1){?>active<?php }?>" page-data-id="<?php echo $scroll_identifier;?>"></span>
                                        <?php
                                        $j++;
                                    }
                                }
                            }?>
                        </div>
                    </div>
                    <?php $i++;
                }?>
                <div class="rarr-cnt">
                    <div class="left-rarr active" id="left"><i class="icon-left"></i></div>
                    <div class="right-rarr active" id="right"><i class="icon-right"></i></div>
                </div>
            </div>
        </div>
    </div>
<?php } ?>