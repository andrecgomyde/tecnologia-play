<?php
/*
Author: Eddie Machado
URL: htp://themble.com/pixel8es/

This is where you can drop your custom functions or
just edit things like thumbnail sizes, header images,
sidebars, comments, ect.
*/

function electrify_require_file ( $file_path ) {
    require_once ( $file_path );
}

require_once('framework/theme-init.php'); //if you remove this, electrify Theme will break
/************* INCLUDE NEEDED FILES ***************/

/*
1. library/electrify.php
	- head cleanup (remove rsd, uri links, junk css, ect)
	- enqueueing scripts & styles
	- theme support functions
	- custom menu output & fallbacks
	- related post function
	- page-navi function
	- removing <p> from around images
	- customizing the post excerpt
	- custom google+ integration
	- adding custom fields to user profiles
*/
require_once( 'library/electrify.php' ); // if you remove this, pixel8es will break


/*
3. library/admin.php
	- removing some default WordPress dashboard widgets
	- an example custom dashboard widget
	- adding custom login css
	- changing text in footer of admin
*/
// require_once( 'library/admin.php' ); // this comes turned off by default

/*
4. library/translation/translation.php
	- adding support for other languages
*/
require_once( 'library/translation/translation.php' ); // this comes turned off by default

/************* ACTIVE SIDEBARS ********************/


// Sidebars & Widgetizes Areas
function pixel8es_register_sidebars() {

	register_sidebar(array(
		'id' => 'header-widgets',
		'name' => __( 'Header Widgets', 'electrify' ),
		'description' => __( 'The header widgets this will be the default widget for header.', 'electrify' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s clearfix">',
		'after_widget' => '</div>',
		'before_title' => '<h3 class="widgettitle">',
		'after_title' => '</h3>',
	));

	register_sidebar(array(
		'id' => 'primary-sidebar',
		'name' => __( 'Primary Sidebar', 'electrify' ),
		'description' => __( 'The primary sidebar this will be the default sidebar for pages.', 'electrify' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s clearfix">',
		'after_widget' => '</div>',
		'before_title' => '<h3 class="widgettitle">',
		'after_title' => '</h3>',
		));

	register_sidebar(array(
		'id' => 'flyin-sidebar',
		'name' => __( 'Flyin Sidebar', 'electrify' ),
		'description' => __( 'The primary sidebar this will be the default sidebar for pages.', 'electrify' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s clearfix">',
		'after_widget' => '</div>',
		'before_title' => '<h3 class="widgettitle">',
		'after_title' => '</h3>',
		));

	register_sidebar(array(
		'id' => 'blog-sidebar',
		'name' => __( 'Blog Sidebar', 'electrify' ),
		'description' => __( 'This is default sidebar for Blog, catergories, Archives and single posts pages.', 'electrify' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s clearfix">',
		'after_widget' => '</div>',
		'before_title' => '<h3 class="widgettitle">',
		'after_title' => '</h3>',
		));
	
	register_sidebar(array(
		'id' => 'footer-widgets',
		'name' => __('Footer Widgets', 'electrify'),
		'description' => __('Add Widgets to display in footer.', 'electrify'),
		'before_widget' => '<div id="%1$s" class="widget %2$s clearfix">',
		'after_widget' => '</div>',
		'before_title' => '<h3 class="widgettitle">',
		'after_title' => '</h3>',
		));

	if (class_exists('Woocommerce')) {
		register_sidebar(array(
			'id' => 'shop',
			'name' => __('Shop', 'electrify'),
			'description' => __('Add Widgets to display in Shop Page.', 'electrify'),
			'before_widget' => '<div id="%1$s" class="widget %2$s clearfix">',
			'after_widget' => '</div>',
			'before_title' => '<h3 class="widgettitle">',
			'after_title' => '</h3>',
		));
	}

	
} // don't remove this bracket!

//Content Width
if (!isset($content_width)){$content_width = 1140;}

/************* COMMENT LAYOUT *********************/

// Comment Layout
function electrify_comments( $comment, $args, $depth ) {
   $GLOBALS['comment'] = $comment; ?>
	<li <?php comment_class(); ?>>
		<article id="comment-<?php comment_ID(); ?>" class="clearfix">
			<header class="comment-author vcard">
				<?php
				/*
					this is the new responsive optimized comment image. It used the new HTML5 data-attribute to display comment gravatars on larger screens only. What this means is that on larger posts, mobile sites don't have a ton of requests for comment images. This makes load time incredibly fast! If you'd like to change it back, just replace it with the regular wordpress gravatar call:
					echo get_avatar($comment,$size='32',$default='<path_to_url>' );
				*/
				?>
				<?php // custom gravatar call ?>
				<?php
					// create variable
					$bgauthemail = get_comment_author_email();
				?>
				<img data-gravatar="http://www.gravatar.com/avatar/<?php echo md5( $bgauthemail ); ?>?s=32" class="load-gravatar avatar avatar-48 photo" height="60" width="60" src="<?php echo get_template_directory_uri(); ?>/library/images/nothing.gif" />
                
				<?php // end custom gravatar call ?>
                
			</header>
            
			<?php if ($comment->comment_approved == '0') : ?>
				<div class="alert alert-info">
					<p><?php _e( 'Your comment is awaiting moderation.', 'electrify' ) ?></p>
				</div>
			<?php endif; ?>
			<section class="comment_content clearfix">
            		
				<?php printf(__( '<cite class="fn">%s</cite>', 'electrify' ), get_comment_author_link()) ?>
                
				<time datetime="<?php echo comment_time('Y-m-j'); ?>"><?php comment_time(__( 'F jS, Y', 'electrify' )); ?> /<?php comment_reply_link(array_merge( $args, array('depth' => $depth, 'max_depth' => $args['max_depth']))) ?></time>
                
				
                
				<?php comment_text() ?>
			</section>
			
		</article>
	<?php // </li> is added by WordPress automatically ?>
<?php
} // don't remove this bracket!

/************* SEARCH FORM LAYOUT *****************/

// Search Form
function pixel8es_wpsearch($form) {
	global $smof_data;
	$search_text = isset($smof_data['search_text'])? $smof_data['search_text'] : 'Search';

	$form = '<form role="search" method="get" class="searchform" action="' . esc_url( home_url( '/' ) ) . '" >
	<input type="text" value="' . esc_attr( get_search_query() ) . '" name="s" class="s" placeholder="'. esc_attr( $search_text ) .'" />
	<button type="submit" class="searchsubmit"></button>
	</form>';
	return $form;
} // don't remove this bracket!


/*-----------------------------------------------------------------------------------*/
/* WooCommerce
/*-----------------------------------------------------------------------------------*/
if (class_exists('Woocommerce')) {
    
    
    add_filter( 'loop_shop_per_page', 'pix_products_per_page');
    function pix_products_per_page() {
    	global $smof_data;
		$shop_count = isset($smof_data['shop_count'])? $smof_data['shop_count'] : '';
        
        return $shop_count;
    }
    
}

?>