<?php
/*
The comments page for electrify
*/
	global $smof_data;
	
	$s_comment_t = isset($smof_data['s_comment_t']) ? $smof_data['s_comment_t'] : 'Comments';
	$s_comment_form_t = isset($smof_data['s_comment_form_t']) ? $smof_data['s_comment_form_t'] : 'Leave a Comment';
	$s_comment_form_btn_t = isset($smof_data['s_comment_form_btn_t']) ? $smof_data['s_comment_form_btn_t'] : 'Add Comment';


// Do not delete these lines
  if (!empty($_SERVER['SCRIPT_FILENAME']) && 'comments.php' == basename($_SERVER['SCRIPT_FILENAME']))
    die ('Please do not load this page directly. Thanks!');

  if ( post_password_required() ) { ?>
  	<div class="alert help">
    	<p class="nucomments"><?php _e("This post is password protected. Enter the password to view comments.", "electrify"); ?></p>
  	</div>
  <?php
    return;
  }
?>

<!-- You can start editing here. -->

<?php if ( have_comments() ) : ?>

    <h3 class="title" id="comments"><?php sprintf( comments_number( __( '<span class="color">No</span>', 'electrify' ), __( '<span class="color">One</span>', 'electrify' ), '%' ), get_comments_number() ); ?> <?php echo esc_html( $s_comment_t ); ?><span class="line"></span></h3>

	<?php previous_comments_link() ?>
	<?php next_comments_link() ?>
	
	<ul class="comment-list">
		<?php wp_list_comments('type=comment&callback=electrify_comments'); ?>
	</ul>
	
	<!--<nav id="comment-nav">
		<ul class="clearfix">
	  		<li><?php previous_comments_link() ?></li>
	  		<li><?php next_comments_link() ?></li>
		</ul>
	</nav>-->
  
	<?php else : // this is displayed if there are no comments so far ?>

	<?php if ( comments_open() ) : ?>
    	<!-- If comments are open, but there are no comments. -->

	<?php else : // comments are closed ?>
	
	<!-- If comments are closed. -->
	<!--p class="nocomments"><?php _e("Comments are closed.", "electrify"); ?></p-->

	<?php endif; ?>

<?php endif; ?>


<?php if ( comments_open() ) : ?>

<div class="clear">	
	<?php 

	$commenter = wp_get_current_commenter();
	$req = get_option( 'require_name_email' );
	$aria_req = ( $req ? " aria-required='true'" : '' );

	$comments_args = array(
	  'id_form'           => 'commentform',
	  'id_submit'         => 'submit',
	  'title_reply'       => $s_comment_form_t,
	  'title_reply_to'    => __( 'Leave a Reply to %s', 'electrify' ),
	  'cancel_reply_link' => __( 'Cancel Reply', 'electrify' ),
	  'label_submit'      => $s_comment_form_btn_t,
	 

	  'comment_field' =>  '<p class="comment-form-comment  clear col-md-12"><label for="comment">Preencha os campos abaixo:<span class="color">*</span>'.
	    '</label><textarea id="comment" class="textArea" name="comment"  cols="45" rows="8" placeholder="'. esc_attr('Escreva o seu comentario...').'" aria-required="true">' .
	    '</textarea></p>',

	  'comment_notes_before' => '',  

	  'comment_notes_after' => '',

	  'fields' => apply_filters( 'comment_form_default_fields', array(

	    'author' =>
	      '<p class="comment-form-author col-md-6">' .
	      '<label for="author">' . __( 'Nome ', 'electrify' ) . 
	      ( $req ? '<span class="color">*</span>' : '' ) . '</label> ' .
	      '<input id="author" name="author"  class="textArea" type="text" value="" size="30" placeholder="Seu nome"' . $aria_req . ' /></p>',

	    'email' =>
	      '<p class="comment-form-email col-md-6"><label for="email">' . __( 'E-mail', 'electrify' ) . 
	      ( $req ? '<span class="color">*</span>' : '' ) . '</label> ' .
	      '<input id="email" name="email"  class="textArea" type="text" value="" size="30" placeholder="Seu e-mail profissional"' . $aria_req . ' /></p>'
	    )
	  ),
	);

	comment_form($comments_args);

	do_action('comment_form', $post->ID); 
	?>

</div>

<?php endif; // if you delete this the sky will fall on your head ?>