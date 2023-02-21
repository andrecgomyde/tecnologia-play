<?php
electrify_require_file ( THEME_WIDGETS .'/recent-tweet.php');
electrify_require_file ( THEME_WIDGETS .'/recent-post.php');
electrify_require_file ( THEME_WIDGETS .'/flickr.php');
electrify_require_file ( THEME_WIDGETS .'/testimonial.php');
electrify_require_file ( THEME_WIDGETS .'/popular-post.php');
electrify_require_file ( THEME_WIDGETS .'/portfolio_member.php');
electrify_require_file ( THEME_WIDGETS .'/tab-recent-popular-comment.php');
electrify_require_file ( THEME_WIDGETS .'/weather.php');
electrify_require_file ( THEME_WIDGETS .'/google-map.php');
electrify_require_file ( THEME_WIDGETS .'/social.php');
electrify_require_file ( THEME_WIDGETS .'/fb-likebox.php');
if(class_exists('WPCF7_ContactForm')){
	electrify_require_file ( THEME_WIDGETS .'/contact-form.php');
}
