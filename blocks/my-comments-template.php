<?php
global $post;
wp_reset_query();
$post = get_post();
$postId = $post->ID;

$args = array(
    'post_id' => $postId,
    'status'  => 'approve'
);

$comments = get_comments($args);
if(count($comments)){ ?>
    <div class="container-fluid d-comments-bg my-comments-block">
        <div class="container">
            <div class="row">
                <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                    <div class="d-comments-cnt">
                        <?php
                        foreach($comments as $comment) {?>
                            <div class="one-comment-cnt">
                                <div class="d-comment-author">@<?php echo($comment->comment_author);?>: <span class="comment-date"><?php echo date("d.n.Y",strtotime($comment->comment_date));?></span></div>
                                <div class="d-comment-text">
                                    <?php echo($comment->comment_content);?>
                                </div>
                                <?php
                                if(count($comment->comment_content)> 160){?>
                                    <div class="d-comments-hide" style="display: block;"></div>
                                    <div class="all-comment">Lue lisää</div>
                                <?php } ?>
                            </div>
                        <?php } ?>
                    </div>

                    <div class="d-comments-form">
                        <div class="d-rating-stars"></div>
                        <?php
                        $comments_args = array(
                            'label_submit' => 'Skicka',
                            'fields'               => array(
                                'author' => '<p class="comment-form-author"><label for="author">NIMI*</label> <input id="author" name="author" type="text" value="" size="30"></p>',
                                'email'  => '<p class="comment-form-email"><label for="email">E-mail*</label> <input id="email" name="email" type="text" value="" size="30" aria-describedby="email-notes"></p>',
                            ),
                            'comment_field' => '<p class="comment-form-comment"><label for="comment">Viesti*</label> <textarea id="comment" name="comment" cols="45" rows="8" aria-required="true" required="required"></textarea></p>',
                        );

                        comment_form($comments_args);
                        ?>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <div class="clear" style="height: 25px;"></div>
                    <?php get_component('_best_rating_casino');?>

                    <div class="clear" style="height: 15px;"></div>
                    <?php get_component('_new_casinos');?>
                </div>
            </div>
        </div>
    </div>
<?php } ?>