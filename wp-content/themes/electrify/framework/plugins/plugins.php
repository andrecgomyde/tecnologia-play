<?php
	//Other 3rd Party Plugins
    electrify_require_file (THEME_PLUGINS . '/twitter/twitter-feed-for-developers.php');//Twitter
	electrify_require_file (THEME_PLUGINS . '/aq_resizer.php');//Image Resize
	electrify_require_file (THEME_PLUGINS . '/multiple_sidebars.php');//Multiple Sidebar
	electrify_require_file (THEME_PLUGINS . '/selectivizr/selectivizr.php');//CSS3 selectors for IE support
	
	/* 
		Plugin Name: Themeforest Themes Update
		Plugin URI: https://github.com/bitfade/themeforest-themes-update
		Description: Updates all themes purchased from themeforest.net 
		Author: pixelentity
		Version: 1.0
		Author URI: http://pixelentity.com
	*/


	// to debug
	// set_site_transient('update_themes',null);
	global $smof_data;

	$themeforest_username = isset($smof_data['themeforest_username'])? $smof_data['themeforest_username'] : null;
	$themeforest_apikey = isset($smof_data['themeforest_apikey'])? $smof_data['themeforest_apikey'] : null;

	// USERNAME = buyer username on Envato
	define('THEMEFOREST_USERNAME','USERNAME');

	// APIKEY = buyer api key
	define('THEMEFOREST_APIKEY','APIKEY');

	function themeforest_themes_update($updates) {
		if (isset($updates->checked)) {
			electrify_require_file( THEME_PLUGINS. "/pixelentity-themes-updater/class-pixelentity-themes-updater.php");
			
			$username = defined('THEMEFOREST_USERNAME') ? THEMEFOREST_USERNAME : null;
			$apikey = defined('THEMEFOREST_APIKEY') ? THEMEFOREST_APIKEY : null;

			$updater = new Pixelentity_Themes_Updater($username,$apikey);
			$updates = $updater->check($updates);
		}
		return $updates;
	}

	add_filter("pre_set_site_transient_update_themes", "themeforest_themes_update");

?>