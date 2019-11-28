<?php
global $post;
$args = array(
//    'cat' => ALL_NEWS_ID,
    'post_type'      => 'new',
    'posts_per_page' => 5,
    'post_parent'    => $post->ID,
    'meta_query' => array(
        array(
            'key' => 'wpcf-guid',
            'value' => '',
            'compare' => '!=',
        )
    ),
    'orderby'        => 'post_date',
    'order'          => 'DESC',

);
$query = new WP_Query($args);

if ($query->posts) { ?>
    <div class="container">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="news-block">
                    <div class="news-block-title"><?php echo single_cat_title("",false);?> UUTISET</div>
                    <div class="news">
                        <?php
                        if ($query->posts) {
                            foreach ($query->posts as $postData) {
                                $alt = get_post_meta( get_post_thumbnail_id($postData->ID) , '_wp_attachment_image_alt', true);
                                $scroll_identifier = get_post_meta($postData->ID, 'wpcf-guid', true); ?>

                                <div class="new" id="head<?php echo $scroll_identifier;?>">
                                    <div class="new-desc">
                                        <?php $imgUrl = get_the_post_thumbnail_url( $postData->ID, 'slot' ); ?>
                                        <img src="<?php echo get_template_directory_uri(); ?>/dist/img/205x120.jpg" class="alignleft lazyload" title="<?php echo $postData->post_title;?>" alt="<?php echo $alt;?>" data-src="<?php echo $imgUrl; ?>" />
                                        <div class="new-title"><?php echo $postData->post_title;?></div>
                                        <div class="new-content">
                                            <?php echo $postData->post_content;?>
                                        </div>
                                    </div>
                                    <div class="d-new-hide" style="display: block;"></div>
                                    <div class="show-text"><i class="icon-down-rarr"></i>Lue lisää</div>
                                </div>
                            <?php }
                        } ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php } ?>