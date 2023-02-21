<?php 
//Animation
$animation = array('fadeIn','fadeInUp','fadeInDown','fadeInLeft','fadeInRight','flash','bounce','shake','tada','swing','wobble','pulse','flip','flipInX','flipInY','fadeInUpBig','fadeInDownBig','fadeInLeftBig','fadeInRightBig','slideInDown','slideInLeft','slideInRight','bounceIn','bounceInUp','bounceInDown','bounceInLeft','bounceInRight','rotateIn','rotateInDownLeft','rotateInDownRight','rotateInUpLeft','rotateInUpRight','lightSpeedIn','hinge','rollIn');

$theme_default = '#fcc21f';

//Add new param to vc
function icon_field($settings, $value) {
	
	return '<div class="icon_field menu-item-settings">'
	.'<input type="hidden" class="edit-menu-item-icon wpb_vc_param_value wpb-textinput '.$settings['param_name'].' '.$settings['type'].'_field" name="'.$settings['param_name'].'" value="'.$value.'"/>

	<span class="pix-inserted-icon"></span>

	<a href="#" class="button pix-insert-menu-icon"><i class="fa fa-arrow-circle-o-down"></i> '. __('Insert Icon', 'electrify') .'</a>
	<a href="#" class="button pix-remove-menu-icon hidden"><i class="fa fa-times"></i> '. __('Remove Icon', 'electrify') .'</a>
</div>';
}
vc_add_shortcode_param('icon', 'icon_field', THEME_FUNCTIONS_URI .'/pix-menu-extend/js/dialog.js');

// Pie Chart
vc_remove_element("vc_pie");
vc_remove_element("vc_posts_slider");
vc_remove_element("vc_images_carousel");
vc_remove_element("vc_carousel_js");

//Remove unwanted row parm
vc_remove_param("vc_row", "full_width");
vc_remove_param("vc_row", "video_bg");
vc_remove_param("vc_row", "video_bg_url");
vc_remove_param("vc_row", "video_bg_parallax");
vc_remove_param("vc_row", "el_id");
vc_remove_param("vc_row", "parallax");
vc_remove_param("vc_row", "parallax_image");
vc_remove_param("vc_row", "parallax_speed_video");
vc_remove_param("vc_row", "parallax_speed_bg");


//Theme primary colors as bg
vc_add_param("vc_row",array(
       "type" => "dropdown",
       "heading" => __("Do you want to use Dot Navigation?", "electrify"),
       "param_name" => "dot_nav",
       "value" => array( __('No', "electrify") => "no", __('Yes', "electrify") => "yes" ),
       "description" => __("Choose Yes if you want to appear dot navigation for this row.", "electrify")
));

// VC ROW
vc_add_param("vc_row", array(
	"type" => "textfield",
	"heading" => __("Dot Navigation Text", "electrify"),
	"param_name" => "dot_nav_text",
	"value" => "",
	"description" => "Enter the id if you like to use single page (or) Anchor navigation.",
    "dependency" => Array('element' => "dot_nav", 'value' => array('yes'))
	));

// VC ROW
vc_add_param("vc_row", array(
	"type" => "textfield",
	"heading" => __("Anchor Id", "electrify"),
	"param_name" => "anchor_id",
	"value" => "",
	"description" => "Enter the id if you like to use single page (or) Anchor navigation. Enter row ID (Note: make sure it is unique and valid according to <a href=\"http://www.w3schools.com/tags/att_global_id.asp\" target=\"_blank\">w3c specification</a>)."
	));

//Theme primary colors as bg
vc_add_param("vc_row",array(
       "type" => "dropdown",
       "heading" => __("Use theme primary color as background Color", "electrify"),
       "param_name" => "theme_primary",
       "value" => array( __('No', "electrify") => "no", __('Yes', "electrify") => "yes" ),
       "description" => __("Choose yes if you like to theme primary color as background color", "electrify"),
       'group' => __( 'Design Options', 'electrify' )
));

//bg color opacity
vc_add_param("vc_row", array(
       "type" => "textfield",
       "heading" => __("Enter Alpha Value, if you like to use alpha transparency in bg (rgba)", "electrify"),
       "param_name" => "theme_primary_alpha",
       "value" => "1",
       "description" => __("Enter alpha transparency value (should be inbetween 0.1 to 1 Ex: 0.7)", "electrify"),
       "dependency" => Array('element' => "theme_primary", 'value' => array('yes')),
       'group' => __( 'Design Options', 'electrify' )
       ));

// VC ROW
vc_add_param("vc_row", array(
	"type" => "dropdown",
	"class" => "",
	"heading" => __("Row Type", "electrify"),
	"param_name" => "type",
	"value" => array(__('Normal', "electrify") => "normal", 
					 __('Full Width', "electrify") => "full-width", 
					 __('Expandable', "electrify") => "expandable"),
	"description" => __("Choose the Type of Row.<br> <b>Normal</b> => Just a normal section (boxed),<br> <b>Full Width</b> => Choose this if you want full background image / color or video background etc,<br> <b>Exapandable</b> => Choose this to Snaps the content to the edge of the screen (eg: Full width portfolio).", "electrify"),
	));

//Social 
vc_map( array(
	"name" => __("Social Icons", "electrify"), //Title
	"base" => "social", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array()
));

//Color Style
vc_add_param("vc_row", array(
	"type" => "dropdown",
	"class" => "",
	"heading" => __("Text Color", "electrify"),
	"param_name" => "color_style",
	"value" => array(__('Black', "electrify") => "dark",
					 __('White', "electrify") => "light"),
	"description" => __("Choose the font color you want to apply. <br> Alternatively you can choose your own color at the top of this section", "electrify"),
	));

//Video
vc_add_param("vc_row", array(
	"type" => "checkbox",
	"class" => "",
	"heading" => __("Video background", "electrify"),
	"param_name" => "video",
	"value" => array(__("Use video background?", "electrify") => "video_bg" ),
	"description" => __("Do you like add video background for this section", "electrify"),
	"dependency" => Array('element' => "type", 'value' => array('full-width'))
	));

vc_add_param("vc_row", array(
	"type" => "textfield",
	"class" => "",
	"heading" => __("Video background url for (webm) file", "electrify"),
	"param_name" => "video_webm",
	"value" => "",
	"description" => "",
	"dependency" => Array('element' => "video", 'value' => array('video_bg'))
	));

vc_add_param("vc_row", array(
	"type" => "textfield",
	"class" => "",
	"heading" => __("Video background url for (mp4) file", "electrify"),
	"param_name" => "video_mp4",
	"value" => "",
	"description" => "",
	"dependency" => Array('element' => "video", 'value' => array('video_bg'))
	));

vc_add_param("vc_row", array(
	"type" => "textfield",
	"class" => "",
	"heading" => __("Video background url for (ogg) file", "electrify"),
	"param_name" => "video_ogg",
	"value" => "",
	"description" => "",
	"dependency" => Array('element' => "video", 'value' => array('video_bg'))
	));

vc_add_param("vc_row", array(
	"type" => "attach_image",
	"class" => "",
	"heading" => __("Video preview image", "electrify"),
	"value" => "",
	"param_name" => "video_image",
	"description" => __("This image will apply before video loads", "electrify"),
	"dependency" => Array('element' => "video", 'value' => array('video_bg'))
	));

// Parallax Option
vc_add_param("vc_row", array(
	"type" => "dropdown",
	"class" => "",
	"heading" => __("Parallax", "electrify"),
	"param_name" => "parallax",
	"value" => array(__('No', "electrify") => "no", 
					 __('Yes', "electrify") => "yes"),
	"description" => __("Do You like to enable Parallax Section? If yes don't forget to add background image", "electrify"),
	"dependency" => Array('element' => "type", 'value' => array('full-width'))
	));

vc_add_param("vc_row", array(
	"type" => "textfield",
	"heading" => __("Parallax Ratio", "electrify"),
	"param_name" => "parallax_ratio",
	"value" => "0.5",
	"description" => __("Enter the parallax ratio. This affect the parallax movement speed. The value should be in between 0.1 to 2. The ratio is relative to the natural scroll speed, so a ratio of 0.5 would cause the element to scroll at half-speed, a ratio of 1 would have no effect, and a ratio of 2 would cause the element to scroll at twice the speed. <strong>Default value is 0.5</strong>", "electrify"),
	"dependency" => Array('element' => "parallax", 'value' => array('yes'))
	));

vc_add_param("vc_row", array(
	"type" => "textfield",
	"heading" => __("Parallax Offset", "electrify"),
	"param_name" => "parallax_offset",
	"value" => "",
	"description" => __("<strong>Leave it empty to apply default.</strong> Enter the parallax offset. All elements will return to their original positioning when their offset parent meets the edge of the screen-plus or minus your own optional offset. This allows you to create intricate parallax patterns very easily.", "electrify"),
	"dependency" => Array('element' => "parallax", 'value' => array('yes'))
	));

vc_add_param("vc_row", array(
	"type" => "dropdown",
	"class" => "",
	"heading" => __("Overlay style", "electrify"),
	"param_name" => "overlay",
	"value" => array(__('None', "electrify") => "none",
					 __('Pattern', "electrify") => "pattern",
					 __('Solid color (With alpha or opacity)', "electrify") => "color"),
	"description" => __("You can add overlay on top of the image to see text better.<br> Choose <b>\"None\"</b> to disable,<br> <b>\"Pattern\"</b> to apply pattern and <br><b>\"Solid color\"</b> to apply color with alpha", "electrify"),
	"dependency" => Array('element' => "type", 'value' => array('full-width'))
	));

vc_add_param("vc_row", array(
	"type" => "colorpicker",
	"class" => "",
	"heading" => __("Overlay color", "electrify"),
	"param_name" => "overlay_color",
	"value" => '',
	"description" => __("Choose Overlay color and don't forget to adjust opacity", "electrify"),
	"dependency" => Array('element' => "overlay", 'value' => array('color'))
	));

vc_add_param("vc_row", array(
	"type" => "dropdown",
	"class" => "",
	"heading" => __("Background Pattern", "electrify"),
	"param_name" => "pattern_style",
	"value" => array(__('Style 1', "electrify") => "style1", 
					 __('Style 2', "electrify") => "style2", 
					 __('Style 3', "electrify") => "style3", 
					 __('Style 4', "electrify") => "style4", 
					 __('Style 5', "electrify") => "style5"),
	"description" => __("Choose a pattern style", "electrify"),
	"dependency" => Array('element' => "overlay", 'value' => 'pattern'),
	));

vc_add_param("vc_row", array(
	"type" => "textfield",
	"heading" => __("Pattern Opacity", "electrify"),
	"param_name" => "pattern_opacity",
	"value" => "1",
	"description" => __("Enter the opactiy value for pattern, Value inbetween .1 to 1", "electrify"),
	"dependency" => Array('element' => "overlay", 'value' => array('pattern'))
	));

//Line shortcode
vc_map( array(
	"name" => __("seperator Line", "electrify"), //Title
	"base" => "line", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(
        array(
            "type" => "dropdown",
            "heading" => __("Line Style", "electrify"),
            "param_name" => "line_style",
			"admin_label" => true,
            "value" => array(__('Line Style1', "electrify") => "line-style1", 
                             __('Line Style2', "electrify") => "line-style2",
                             __('Line Style3', "electrify") => "line-style3",
                             __('Line Style4', "electrify") => "line-style4",
                             __('Line Style5', "electrify") => "line-style5"),
            "description" => __("Do you like to animate this element", "electrify"),
           
            ),

		array(
			"type" => "textfield",
			"heading" => __("Width in px", "electrify"),
			"param_name" => "width",
			"value" => "",
			"description" => __("Enter Width in Pixels or in percent (eg: 50px or 50%), Leave empty to apply default 75px", "electrify"),
             "dependency" => Array('element' => "line_style", 'value' => array('line-style1'))
			),
            
            

		array(
			"type" => "textfield",
			"heading" => __("Line Thickness in px", "electrify"),
			"param_name" => "thickness",
			"value" => "1px",
			"description" => __("Enter thickness in Pixels (eg: 4px), Leave empty to apply default 1px", "electrify"),
             "dependency" => Array('element' => "line_style", 'value' => array('line-style1'))
			),

		array(
			"type" => "dropdown",
			"heading" => __("Align", "electrify"),
			"param_name" => "align",
			"value" => array(__('Align left', "electrify") => "left alignLeft", __('Align center', "electrify") => "center alignCenter",  __('Align right', "electrify") => "right alignRight"),
			"description" => ''
			),

		array(
			"type" => "colorpicker",
			"class" => "",
			"heading" => __("Line color", "electrify"),
			"param_name" => "color", //Shortcode_attr name
			"value" => '', //Default Red color
			"description" => __("Choose line color if you want custom color, leave empty to apply theme default", "electrify"),
            "dependency" => Array('element' => "line_style", 'value' => array('line-style1'))
			)
		)
) );

// Blog
vc_map( array(
	"name" => __("Recent Blog", "electrify"), //Title
	"base" => "blog", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "dropdown",
			"heading" => __("Insert Blog Post By", "electrify"),
			"param_name" => "insert_type",
			"admin_label" => true,
			"value" => array(__('Blog Posts', "electrify") => "posts", 
				__('Blog Post Id', "electrify") => "id", __('Blog Post Category', "electrify") => "category"),
			"description" => ''
			),

		array(
			"type" => "textfield",
			"heading" => __("No. of Recentblog", "electrify"),
			"param_name" => "no_of_items",
			"value" => 4,
			"dependency" => Array('element' => "insert_type", 'value' => array('posts','category')),
			"description" => __("Enter the number of Posts you want to display (only numbers), Enter -1 for all posts", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Post Id", "electrify"),
			"param_name" => "blog_post_id",
			"value" => "",
			"dependency" => Array('element' => "insert_type", 'value' => 'id'),
			"description" => __("Enter the blog post ids seperated by commas (,). Example: 2,54,8", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Exclude Post", "electrify"),
			"param_name" => "exclude_blog_post",
			"value" => "",
			"dependency" => Array('element' => "insert_type", 'value' => array('posts','category')),
			"description" => __("Enter the exclude blog post ids seperated by commas (,). Example: 2,54,8", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Category Name", "electrify"),
			"param_name" => "blog_post_category",
			"value" => "",
			"dependency" => Array('element' => "insert_type", 'value' => 'category'),
			"description" => __("Enter the blog post category seperated by commas (,). Example: design,illustration,print", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Order By", "electrify"),
			"param_name" => "order_by",
			"value" => array( __('Date', "electrify") => "date",  
							  __('Rand', "electrify") => "rand",
							  __('ID', "electrify") => "ID", 
							  __('Title', "electrify") => "title", 
							  __('Author', "electrify") => "author",
							  __('Name', "electrify") => "modified",
							  __('Parent', "electrify") => "parent",
							  __('Date Modified', "electrify") => "date",
							  __('Menu Order', "electrify") => "menu_order",
							  __('None', "electrify") => "none"),
			"description" => __("Order posts By choosen order", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Order", "electrify"),
			"param_name" => "order",
			"value" => array( __('Ascending order', "electrify") => "asc",  
							  __('descending order', "electrify") => "desc"),
			"description" => __("In which Order, you want to display posts", "electrify")
			), 

		array(
			"type" => "dropdown",
			"heading" => __("Title Tag", "electrify"),
			"param_name" => "title_tag",
			"value" => array('h2','h1','h3','h4','h5','h6'),
			"description" => __("Select title tag.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Display Date", "electrify"),
			"param_name" => "display_date",
			"value" => array(__('Yes', "electrify") => "yes",  
							 __('No', "electrify") => "no"),
			"description" => __('Do you like to display date in post', "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Choose a style", "electrify"),
			"param_name" => "style",
			"value" => array( __('style 1', "electrify") => "style1",  
							  __('style 2', "electrify") => "style2"),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Number of Columns", "electrify"),
			"param_name" => "columns",
			"value" => array(__('3 Columns', "electrify") => "col3",
							 __('4 Columns', "electrify") => "col4"),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Display Comments", "electrify"),
			"param_name" => "display_comments",
			"value" => array(__('Yes', "electrify") => "yes",  
							 __('No', "electrify") => "no"),
			"description" => __('Do you like to display comments number in post', "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Blog Description", "electrify"),
			"param_name" => "blog_desc",
			"value" => array(__('Yes', "electrify") => "yes",  
							 __('No', "electrify") => "no"),
			"description" => __('Do you like to display short description', "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Slider", "electrify"),
			"param_name" => "slider",
			"value" => array( __('Yes', "electrify") => "yes",
							  __('No', "electrify") => "no"),
			"description" => __("Do you like use this as carousel?", "electrify"),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Autoplay", "electrify"),
			"param_name" => "autoplay",
			"value" => "4000",
			"description" => __("Enter the Value in milesecond (Ex: 5000), Enter 'false' to disable autoplay.", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Slide Speed", "electrify"),
			"param_name" => "slide_speed",
			"value" => "500",
			"description" => __("Enter the Value in milesecond (Ex: 500)", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Arrow", "electrify"),
			"param_name" => "slide_arrow",
			"value" => array( __('Yes', "electrify") => "true",
							  __('No', "electrify") => "false"),
			"description" => __("Do you like to show arrow navigation to move carousel.", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),        

		array(
			"type" => "dropdown",
			"heading" => __("Arrow Style", "electrify"),
			"param_name" => "arrow_type",
			"value" => array( __('Default', "electrify") => "",
							  __('Arrow Top Right', "electrify") => "arrow-style2"),
			"description" => __("Where you want to display arrow", "electrify"),
			"dependency" => Array('element' => "slide_arrow", 'value' => array('true')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Pagination", "electrify"),
			"param_name" => "pagination",
			"value" => array( __('Yes', "electrify") => "true",
				__('No', "electrify") => "false"),
			"description" => __("Do you like to show dot navigation to move carousel", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Auto Height", "electrify"),
			"param_name" => "slider_height",
			"value" => array( __('No', "electrify") => "false",
							  __('Yes', "electrify") => "true"),
			"description" => __("By Enabling this, slider height will vary depends on content for each slide. Please turn off this if you have more content below Blog to avoid page moving.", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Stop On Hover", "electrify"),
			"param_name" => "stop_on_hover",
			"value" => array( __('Yes', "electrify") => "true",
							  __('No', "electrify") => "false"),
			"description" => '',
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			), 

		array(
			"type" => "dropdown",
			"heading" => __("Do you like to move carousel Mouse Drag?", "electrify"),
			"param_name" => "mouse_drag",
			"value" => array( __('Yes', "electrify") => "true",
							  __('No', "electrify") => "false"),
			"description" => __("Do you like to move carousel Mouse Drag?", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Touch Drag", "electrify"),
			"param_name" => "touch_drag",
			"value" => array( __('Yes', "electrify") => "true",
							  __('No', "electrify") => "false"),
			"description" => __("Do you like to move carousel Touch Drag?", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),  
		) 
) ); 

// Video Popup
vc_map( array(
	"name" => __("Video Popup", "electrify"), //Title
	"base" => "video_popup", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "textfield",
			"heading" => __("Enter the Url", "electrify"),
			"param_name" => "url",
			"value" => "#",
			"description" => __("Please Enter the You-Tube or Vimeo Url.", "electrify")
			),

		array( 
			"type" => "dropdown",
			"heading" => __("Popup Trigger", "electrify"),
			"param_name" => "title_format",
			"value" => array(__('Icon', "electrify") =>'icon',
							 __('Text', "electrify") =>'title'),
			"description" => __("Trigger Popup by text or icon.", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Trigger Text", "electrify"),
			"param_name" => "text",
			"value" => "Title",
			"description" => __("Enter the trigger text.", "electrify"),
			"dependency" => Array('element' => "title_format", 'value' => array('title'))
			),

		array(
			"type" => "icon",
			"heading" => __("Trigger Icon", "electrify"),
			"param_name" => "icon_name",
			"value" => '',
			"description" => __("Select Trigger icon.", "electrify"),
			"dependency" => Array('element' => "title_format", 'value' => array('icon'))
			),

		array(
			"type" => "dropdown",
			"heading" => __("Alignment", "electrify"),
			"param_name" => "align",
			"value" => array(__('Align Center', "electrify") => "center", 
							 __('Align Left', "electrify") => "left", 
							 __('Align Right', "electrify") => "right"),
			"description" => __("Select icon box alignment.", "electrify")
			),
		)
) );

// Icon Box
vc_map( array(
	"name" => __("Icon Box", "electrify"), //Title
	"base" => "icon_box", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "dropdown",
			"heading" => __("Insert Font icon or Image icon", "electrify"),
			"param_name" => "icon_type",
			"value" => array(__('Font Icon', "electrify") =>'icon',
							 __('Image Icon', "electrify") =>'image'),
			"description" => '',
			"dependency" => Array('element' => "icon_image_con", 'value' => array('no')),
			"group"	=> __('Icon', 'electrify')
			),

		array(
			"type" => "icon",
			"heading" => __("Insert Icon", "electrify"),
			"param_name" => "icon_name",
			"value" => '',
			"description" => '',
			"dependency" => Array('element' => "icon_type", 'value' => array('icon')),
			"group"	=> __('Icon', 'electrify')
			),

		array(
			"type" => "attach_image",
			"heading" => __("Image Icon", "electrify"),
			"param_name" => "icon_img",
			"value" => "",
			"description" => __("Select a icon image from media library.", "electrify"),
			"dependency" => Array('element' => "icon_type", 'value' => array('image')),
			"group"	=> __('Icon', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Use Image instead of icon", "electrify"),
			"param_name" => "icon_image_con",
			"value" => array(__('No', "electrify") =>'no',
					 __('Yes', "electrify") =>'yes'),
			"description" => __('If you choose yes you can insert large image instead of icon (act as image box)', "electrify"),
			"group"	=> __('Icon', 'electrify')
			),

		array(
			"type" => "attach_image",
			"heading" => __("Image Icon", "electrify"),
			"param_name" => "icon_image",
			"value" => "",
			"description" => __("Select a icon image from media library.", "electrify"),
			"dependency" => Array('element' => "icon_image_con", 'value' => array('yes')),
			"group"	=> __('Icon', 'electrify')
			),

		array( 
			"type" => "dropdown",
			"heading" => __("Insert Font icon or Image icon", "electrify"),
			"param_name" => "icon_image_style",
			"value" => array(__('Square', "electrify") =>'rectangle',
							 __('Circle', "electrify") =>'rounded'),
			"description" => '',
			"dependency" => Array('element' => "icon_image_con", 'value' => array('yes')),
			"group"	=> __('Icon', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Icon Style", "electrify"),
			"param_name" => "icon_style",
			"value" => array(__('Default', "electrify") => "bg-none",
							 __('Circle', "electrify") => "circle",
							 __('Square', "electrify") => "square",
							 __('Double Circle', "electrify") => "double-circle",
							 __('Double Square', "electrify") => "double-square",
							 __('Small Circle', "electrify") => "double-circle small-circle",
							 __('Circle Front Square Back', "electrify") => "square-front circle-front",
							 __('Square Front Circle Back', "electrify") => "square-front",
							 __('Square Front Circle Back 2', "electrify") => "square-front rotate-none",
							 __('Circle Inside Square', "electrify") => "square-front circle-inside-square"),
			"description" => __("Select icon style.", "electrify"),
			"group"	=> __('Icon', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Hover Icon", "electrify"),
			"param_name" => "icon_hover",
			"value" => array(__('Yes', "electrify") => "yes", 
							 __('No', "electrify") => "no"),
			"description" => __("Do you want to Icon Hover Background?", "electrify"),
			"group"	=> __('Icon', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Icon Color", "electrify"),
			"param_name" => "icon_color",
			"value" => array(__('Theme Default Color', "electrify") => "color", 
							 __('Black', "electrify") => "default"),
			"description" => __("Choose icon color.", "electrify"),
			"group"	=> __('Icon', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Title", "electrify"),
			"param_name" => "title",
			"admin_label" => true,
			"value" => "Section Title",
			"description" => __("Enter the title.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Title Tag", "electrify"),
			"param_name" => "title_tag",
			"value" => array('h2','h1','h3','h4','h5','h6'),
			"description" => __("Select title tag.", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Custom Title Font Size?", "electrify"),
			"param_name" => "custom_size",
			"value" => "",
			"description" => __("Enter the font size in px(Ex: 50px) or Leave it empty to apply theme default", "electrify")
			),

		array(
			"type" => "textarea_html",
			"class" => "",
			"heading" => __("Icon Box Content", "electrify"),
			"param_name" => "content", 
			"value" => '', 
			"description" => __("Enter the Icon Box Content", "electrify")
			),
		
		array(
			"type" => "dropdown",
			"heading" => __("Line", "electrify"),
			"param_name" => "line",
			"value" => array(__('No', "electrify") => "no",
							 __('Yes', "electrify") => "yes"), 
			"description" => __("Display line below title?", "electrify")
			),
                
        array(
			"type" => "dropdown",
			"heading" => __("Line Style", "electrify"),
			"param_name" => "line_style",
			"value" => array(__('Line Style1', "electrify") => "line-style1", 
                             __('Line Style2', "electrify") => "line-style2",
                             __('Line Style3', "electrify") => "line-style3",
                             __('Line Style4', "electrify") => "line-style4",
                             __('Line Style5', "electrify") => "line-style5"),
			"description" => __("Do you like to animate this element", "electrify"),
            "dependency" => Array('element' => "line", 'value' => array('yes'))
			),

		array(
			"type" => "dropdown",
			"heading" => __("Display Button?", "electrify"),
			"param_name" => "display_button",
			"value" => array(__('Yes', "electrify") => "yes", 
							 __('No', "electrify") => "no"),
			"description" => __("Do you want to display button in icon box?", "electrify"),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Button Text", "electrify"),
			"param_name" => "button_text",
			"value" => "Read More",
			"description" => __("Enter the Button Text", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "vc_link",
			"heading" => __("Button URL", "electrify"),
			"param_name" => "button_link",
			"value" => "#",
			"description" => __("Enter the button link", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Button Style", "electrify"),
			"param_name" => "button_style",
			"value" => array(__('Outline', "electrify") => "outline", 
							 __('Solid', "electrify") => "solid", 
							 __('Default', "electrify") => "simple"),
			"description" => __("Select button style", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Button Color", "electrify"),
			"param_name" => "button_color",
			"value" => array(__('Theme default color', "electrify") => "color", 
							 __('black', "electrify") => "no-color",
							 __('white', "electrify") => "white"), 
			"description" => __("Please choose button color", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Button Size", "electrify"),
			"param_name" => "button_size",
			"value" => array(__('Medium', "electrify") => "md", 
							 __('Small', "electrify") => "sm", 
							 __('Large', "electrify") => "lg"),
			"description" => __("Select button size", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "icon",
			"heading" => __("Button Icon", "electrify"),
			"param_name" => "button_icon",
			"value" => '',
			"description" => __("Select button icon.", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Alignment", "electrify"),
			"param_name" => "align",
			"value" => array(__('Align Center', "electrify") => "center", 
							 __('Align Left', "electrify") => "left", 
							 __('Align Right', "electrify") => "left right"),
			"description" => __("Select icon box alignment.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Description below Icon?", "electrify"),
			"param_name" => "icon_align",
			"value" => array(__('No', "electrify") => "no", 
							 __('Yes', "electrify") => "yes"),
			"description" => __("Do you want to display description below the icon?", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Title and description under Icon?", "electrify"),
			"param_name" => "icon_below",
			"value" => array(__('No', "electrify") => "no", 
							 __('Yes', "electrify") => "yes"),
			"description" => __("Do you like to Title and description under Icon?", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Box Animation", "electrify"),
			"param_name" => "animate",
			"value" => array(__('No', "electrify") => "no", 
							 __('Yes', "electrify") => "yes"),
			"description" => __("Do you like to animate this element", "electrify"),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Animation Transition", "electrify"),

			"param_name" => "transition",
			"value" => $animation,
			"description" => __("Choose Animation Transition.", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Animation Duration", "electrify"),
			"param_name" => "duration",
			"value" => "",
			"description" => __("Enter the Duration (Ex: 500ms or 1s)", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Animation Delay", "electrify"),
			"param_name" => "delay",
			"value" => "",
			"description" => __("Enter the Delay (Ex: 100ms or 1s)", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Extra class name", "electrify"),
			"param_name" => "el_class",
			"value" => "",
			"description" => __("If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file.", "electrify")
			),
		)
) );


// Icon Shortcode
vc_map( array(
	"name" => __("Icon", "electrify"), //Title
	"base" => "icon", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "dropdown",
			"heading" => __("Alignment", "electrify"),
			"param_name" => "align",			 
			"value" => array(__('Align center', "electrify") => "center", 
							 __('Align left', "electrify") => "left",
							 __('Align Right', "electrify") => "right"),
			"description" => __("Select alignment.", "electrify")
			),

		array(
			"type" => "icon",
			"heading" => __("Insert Icon", "electrify"),
			"param_name" => "icon_name",
			"admin_label" => true,
			"value" => '',
			"description" => '',
			),

		array(
			"type" => "dropdown",
			"heading" => __("Icon Style", "electrify"),
			"param_name" => "icon_style",
			"value" => array(__('Default', "electrify") => "bg-none",
							 __('Solid', "electrify") => "solid",
							 __('Outline', "electrify") => "outline"),
			"description" => __("Select icon style.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Icon Type", "electrify"),
			"param_name" => "icon_type",
			"value" => array(__('Circle', "electrify") => "icon-circle",
							 __('Square', "electrify") => "icon-square"),
			"description" => __("Select icon apperance.", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Custom Icon Size?", "electrify"),
			"param_name" => "icon_size",
			"value" => "",
			"description" => __("Enter the font size in px(Ex: 50px) if you want use your own font size or Leave it empty to apply theme default", "electrify")
			),

		array(
			"type" => "colorpicker",
			"class" => "",
			"heading" => __("Custom Icon Color", "electrify"),
			"param_name" => "icon_color", 
			"value" => '',
			"description" => __("Choose Icon color (or) Leave it empty to apply theme default", "electrify")
			),

		array(
			"type" => "colorpicker",
			"class" => "",
			"heading" => __("Custom Icon Background Color", "electrify"),
			"param_name" => "icon_bg_color", 
			"value" => '', 
			"description" => __("Choose Icon Background Color (or) Leave it empty to apply theme default", "electrify"),
			"dependency" => Array('element' => "icon_style", 'value' => array('solid'))
			),

		array(
			"type" => "textfield",
			"heading" => __("Title", "electrify"),
			"param_name" => "title",
			"value" => "",
			"description" => __("Enter the title.", "electrify"),
			"group"	=> __('Title', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Title Tag", "electrify"),
			"param_name" => "title_tag",
			"value" => array('h2','h1','h3','h4','h5','h6', 'p'),
			"description" => __("Select title tag.", "electrify"),
			"group"	=> __('Title', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Custom Title Font Size?", "electrify"),
			"param_name" => "text_font",
			"value" => "",
			"description" => __("Enter the font size in px (Ex: 50px) if you want custom font size or Leave it empty to apply theme default", "electrify"),
			"group"	=> __('Title', 'electrify')
			),

		array(
			"type" => "colorpicker",
			"class" => "",
			"heading" => __("Custom Text Color", "electrify"),
			"param_name" => "text_color", //Shortcode_attr name
			"value" => '', //Default Red color
			"description" => __("Choose text color if you want custom color (or) Leave it empty to apply theme default", "electrify"),
			"group"	=> __('Title', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Content Margin", "electrify"),
			"param_name" => "margin",
			"value" => "",
			"description" => __("Value should be in css format [top right bottom left] in px (Ex: -10px 20px 30px 40px).", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Box Animation", "electrify"),
			"param_name" => "animate",
			"value" => array(__('No', "electrify") => "no", 
							 __('Yes', "electrify") => "yes"),
			"description" => __("Do you like to animate this element", "electrify"),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Animation Transition", "electrify"),
			"param_name" => "transition",
			"value" => $animation,
			"description" => __("Choose Animation Transition.", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Animation Duration", "electrify"),
			"param_name" => "duration",
			"value" => "",
			"description" => __("Enter the Duration (Ex: 500ms or 1s)", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Animation Delay", "electrify"),
			"param_name" => "delay",
			"value" => "",
			"description" => __("Enter the Delay (Ex: 100ms or 1s)", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			)

		)
) );

// Google Map
vc_map( array(
	"name" => __("Google Map", "electrify"), //Title
	"base" => "googlemap", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "textfield",
			"heading" => __("Width", "electrify"),
			"param_name" => "width",
			"value" => "100%",
			"description" => __("Enter the Width. Eg: 400 (or) 98%", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Height", "electrify"),
			"param_name" => "height",
			"value" => "300",
			"description" => __("Enter the Height. Eg: 400", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Latitude", "electrify"),
			"param_name" => "lat",
			"value" => "-37.81731",
			"description" => __("Enter the latitude value (from http://universimmedia.pagesperso-orange.fr/geo/loc.htm)", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Longitude", "electrify"),
			"param_name" => "lng",
			"value" => "144.95432",
			"description" => __("Enter the longitude value (from http://universimmedia.pagesperso-orange.fr/geo/loc.htm)", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Zoom", "electrify"),
			"param_name" => "zoom",
			"value" => "13",
			"description" => __("Enter the zoom level of the map(Ex: 9))", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Zoom Control?", "electrify"),
			"param_name" => "zoomcontrol",
			"value" => array( __('Yes', "electrify") => "true",
							  __('No', "electrify") => "false"),
			"description" => __("Do you want to display Zoom Control?", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Pan Control", "electrify"),
			"param_name" => "pancontrol",
			"value" => array( __('Yes', "electrify") => "true",
							  __('No', "electrify") => "false"),
			"description" => __("Do you want to display Pancontrol?", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("MapType Control", "electrify"),
			"param_name" => "maptypecontrol",
			"value" => array( __('Yes', "electrify") => "true",
							  __('No', "electrify") => "false"),
			"description" => __("Do you want to display MapType Control?", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Scale Control", "electrify"),
			"param_name" => "scalecontrol",
			"value" => array( __('Yes', "electrify") => "true",
							  __('No', "electrify") => "false"),
			"description" => __("Do you want to display Scale Control?", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Street View Control", "electrify"),
			"param_name" => "streetviewcontrol",
			"value" => array( __('Yes', "electrify") => "true",
							  __('No', "electrify") => "false"),
			"description" => __("Do you want to display Street View Control?", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Overview Map control", "electrify"),
			"param_name" => "overviewmapcontrol",
			"value" => array( __('Yes', "electrify") => "true",
							  __('No', "electrify") => "false"),
			"description" => __("Do you want to display Overview Map control?", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Do you want to show info on top of the map?", "electrify"),
			"param_name" => "contact_info",
			"value" => array( __('Yes', "electrify") => "yes",
							  __('No', "electrify") => "no"),
			"description" => '',
			"group"	=> __('Contact Info', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Email", "electrify"),
			"param_name" => "email",
			"value" => "",
			"description" => __("Enter the email address.", "electrify"),
			"dependency" => Array('element' => "contact_info", 'value' => array('yes')),
			"group"	=> __('Contact Info', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Address Title", "electrify"),
			"param_name" => "address_title",
			"value" => "Envato Headquarters",
			"description" => __("Title which display above address. Leave it empty if you don't want.", "electrify"),
			"dependency" => Array('element' => "contact_info", 'value' => array('yes')),
			"group"	=> __('Contact Info', 'electrify')
			),

		array(
			"type" => "textarea",
			"class" => "",
			"heading" => __("Address", "electrify"),
			"param_name" => "address", 
			"value" => '121 King Street,<br>Melbourne Victoria 3000,<br>Australia', 
			"description" => __("Enter the address", "electrify"),
			"dependency" => Array('element' => "contact_info", 'value' => array('yes')),
			"group"	=> __('Contact Info', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Contact Number", "electrify"),
			"param_name" => "contact_number",
			"value" => "+61 3 8376 6284",
			"description" => __("Enter the contact number.", "electrify"),
			"dependency" => Array('element' => "contact_info", 'value' => array('yes')),
			"group"	=> __('Contact Info', 'electrify')
			),

		)
) );

// Clients
vc_map( array(
	"name" => __("Clients", "electrify"), //Title
	"base" => "clients", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "attach_images",
			"heading" => __("Images", "electrify"),
			"param_name" => "images",
			"value" => "",
			"description" => __("Select images from media library.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Add Link client images?", "electrify"),
			"param_name" => "link",
			"value" => array( __('Yes', "electrify") => "yes",
				__('No', "electrify") => "no"),
			"description" => ''
			),

		array(
			"type" => "textarea",
			"class" => "",
			"heading" => __("Enter links for each client here", "electrify"),
			"param_name" => "custom_links", 
			"value" => '', 
			"description" => __("Enter links for each client here. Divide links with comma (,).", "electrify"),
			"dependency" => Array('element' => "link", 'value' => array('yes'))
			),

		array(
			"type" => "dropdown",
			"heading" => __("Client (company) Names on Hover", "electrify"),
			"param_name" => "title_on_hover",
			"value" => array( __('Yes', "electrify") => "yes",
				__('No', "electrify") => "no"),
			"description" => __("Do you want to display client (company) names on Hover over client image?.", "electrify")
			),

		array(
			"type" => "textarea",
			"class" => "",
			"heading" => __("Enter Company name for each client here", "electrify"),
			"param_name" => "titles", 
			"value" => '', 
			"description" => __("Enter Company name for each client here. Divide links with comma (,).", "electrify"),
			"dependency" => Array('element' => "title_on_hover", 'value' => array('yes'))
			),

		array(
			"type" => "dropdown",
			"heading" => __("Clients Style", "electrify"),
			"param_name" => "style",
			"admin_label" => true,
			"value" => array(__('Style1', "electrify") => "", 
							 __('Style2', "electrify") => "style2", 
							 __('Style3', "electrify") => "style3",
							 __('Style4', "electrify") => "style4",
							 __('Style5', "electrify") => "style4 style5"),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("No of Items", "electrify"),
			"param_name" => "items",
			"value" => array(__('4', "electrify") => "4",
							 __('5', "electrify") => "5",
							 __('6', "electrify") => "6",
							 __('2', "electrify") => "2"),
			"description" => __("Choose Number of items", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Enable Carousel?", "electrify"),
			"param_name" => "slider",
			"value" => array( __('Yes', "electrify") => "yes",
							  __('No', "electrify") => "no"),
			"description" => '',
			"group"	=> __('Slider', 'electrify')
			),
		array(
			"type" => "textfield",
			"heading" => __("Autoplay", "electrify"),
			"param_name" => "autoplay",
			"value" => "4000",
			"description" => __("Enter the Value in milesecond (Ex: 5000), Enter 'false' to disable autoplay.", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Slide Speed", "electrify"),
			"param_name" => "slide_speed",
			"value" => "500",
			"description" => __("Enter the Value in milesecond (Ex: 500)", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),   

		array(
			"type" => "dropdown",
			"heading" => __("Arrow", "electrify"),
			"param_name" => "slide_arrow",
			"value" => array( __('Yes', "electrify") => "true",
							  __('No', "electrify") => "false"),
			"description" => __("Display navigation arrow?", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),        

		array(
			"type" => "dropdown",
			"heading" => __("Arrow Style", "electrify"),
			"param_name" => "arrow_type",
			"value" => array( __('Default', "electrify") => "",
							  __('Arrow Top Right', "electrify") => "arrow-style2"),
			"description" => __("select the arrow Style", "electrify"),
			"dependency" => Array('element' => "slide_arrow", 'value' => array('true')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Pagination", "electrify"),
			"param_name" => "pagination",
			"value" => array( __('Yes', "electrify") => "true",
							  __('No', "electrify") => "false"),
			"description" => __("Show pagination (dot nav) to slide images.", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Auto Height", "electrify"),
			"param_name" => "slider_height",
			"value" => array( __('No', "electrify") => "false",
							  __('Yes', "electrify") => "true"),
			"description" => __("By Enabling this, slider height will vary depends on content for each slide. Please turn off this if you have more content below Clients to avoid page moving.", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),  

		array(
			"type" => "dropdown",
			"heading" => __("Stop On Hover", "electrify"),
			"param_name" => "stop_on_hover",
			"value" => array( __('Yes', "electrify") => "true",
							  __('No', "electrify") => "false"),
			"description" => __("Stop autoplaying carousel on mouerover", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			), 
		array(
			"type" => "dropdown",
			"heading" => __("Mouse Drag", "electrify"),
			"param_name" => "mouse_drag",
			"value" => array( __('Yes', "electrify") => "true",
							  __('No', "electrify") => "false"),
			"description" =>  __("Do you like to move carousel Mouse Drag?", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			), 
		array(
			"type" => "dropdown",
			"heading" => __("Touch Drag", "electrify"),
			"param_name" => "touch_drag",
			"value" => array( __('Yes', "electrify") => "true",
				__('No', "electrify") => "false"),
			"description" => __("Do you like to move carousel Touch Drag (in touch devices)?", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),             
		)
) );

// Button
vc_map( array(
	"name" => __("Button", "electrify"), //Title
	"base" => "button", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "textfield",
			"heading" => __("Button Text", "electrify"),
			"param_name" => "button_text",
			"admin_label" => true,
			"value" => "Button Text",
			"description" => __("Enter the Button Text", "electrify")
			),

		array(
			"type" => "vc_link",
			"heading" => __("Button URL", "electrify"),
			"param_name" => "button_link",
			"value" => "#",
			"description" => __("Enter the button link", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Button Style", "electrify"),
			"param_name" => "button_style",
			"value" => array(__('Outline', "electrify") => "outline", 
							 __('Solid', "electrify") => "solid", 
							 __('Simple (No Bg and No Border)', "electrify") => "simple"),
			"description" => __("Select button style?", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Button Color", "electrify"),
			"param_name" => "button_color",
			"value" => array(__('Theme default color', "electrify") => "color", 
							 __('black', "electrify") => "no-color",
							 __('white', "electrify") => "white"), 
			"description" => __("Please choose button color", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Button Size", "electrify"),
			"param_name" => "button_size",
			"value" => array(__('Medium', "electrify") => "md", 
							 __('Small', "electrify") => "sm", 
							 __('Large', "electrify") => "lg"),
			"description" => __("Select button size?", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Custom Font Size?", "electrify"),
			"param_name" => "custom_size",
			"value" => array(__('No', "electrify") => "no",
							 __('Yes', "electrify") => "yes"),
			"description" => __("Do you want to custom font size?", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Font Size", "electrify"),
			"param_name" => "font_size",
			"value" => "",
			"description" => __("Enter the font size in px(Ex: 50px)", "electrify"),
			"dependency" => Array('element' => "custom_size", 'value' => array('yes'))
			),

		array(
			"type" => "textfield",
			"heading" => __("Custom Padding", "electrify"),
			"param_name" => "padding_custom",
			"value" => "",
			"description" => __("Enter the padding (in css format [top right bottom left]) in px(Ex: 50px 50px 50px 50px)", "electrify"),
			"dependency" => Array('element' => "custom_size", 'value' => array('yes'))
			),

		array(
			"type" => "dropdown",
			"heading" => __("Button Align", "electrify"),
			"param_name" => "button_align",
			"value" => array(__('Left', "electrify") => "", 
							 __('Center', "electrify") => "button-center", 
							 __('Right', "electrify") => "button-right"),
			"description" => __("Select button Align?", "electrify")
			),		

		array(
			"type" => "icon",
			"heading" => __("Button Icon", "electrify"),
			"param_name" => "button_icon",
			"value" => '',
			"description" => __("choose button icon.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Button Icon Align", "electrify"),
			"param_name" => "button_icon_align",
			"value" => array(__('Front', "electrify") => "front", 
					 __('Back', "electrify") => "back"), 
			"description" => __("Where you want to display Icon?", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Button Animation", "electrify"),
			"param_name" => "animate",
			"value" => array(__('No', "electrify") => "no", 
				__('Yes', "electrify") => "yes"),
			"description" => __("Do you like to animate this element", "electrify"),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Animation Transition", "electrify"),
			"param_name" => "transition",
			"value" => $animation,
			"description" => __("Choose animation transition.", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Animation Duration", "electrify"),
			"param_name" => "duration",
			"value" => "",
			"description" => __("Enter the duration (Ex: 500ms or 1s)", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Animation Delay", "electrify"),
			"param_name" => "delay",
			"value" => "",
			"description" => __("Enter the delay (Ex: 100ms or 1s)", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),
		)
) );

// Title 
vc_map( array(
	"name" => __("Title", "electrify"), //Title
	"base" => "title", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "textfield",
			"heading" => __("Title", "electrify"),
			"param_name" => "title",
			"admin_label" => true,
			"value" => "Title",
			"description" => __("Enter the title.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Title Style", "electrify"),
			"param_name" => "style",
			"value" => array(__('Normal Title', "electrify") => "normal-title", 
					         __('Fancy Title (title with bg color and bottom arrow)', "electrify") => "bg_text",
                             __('Box Title', "electrify") => "box-title",
                             __('Box Title Small ', "electrify") => "box-small",
                             __('Title Right Border', "electrify") => "title-right-border",
                             __('Title Sep', "electrify") => "title-sep"),
                             
			"description" => __("Choose Title style", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Title Alignment", "electrify"),
			"param_name" => "align",
			"value" => array(__('Align Left', "electrify") => "", 
							 __('Align Center', "electrify") => "center", 
							 __('Align Right', "electrify") => "right"),
			"description" => __("Choose Title alignment.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Font Size", "electrify"),
			"param_name" => "font_size",
			"value" => array(__('small', "electrify") => "size-sm", 
							 __('Medium', "electrify") => "size-md", 
							 __('Large', "electrify") => "size-lg"),
			"description" => __("Select Font Size.", "electrify")
			),
            array(
				"type" => "textfield",
				"heading" => __("Custom Font Size", "electrify"),
				"param_name" => "custom_font_size",
				"value" => "",
				"description" => __("Enter the Custom title Font Size in px (Ex : 30px). Leave it empty to apply theme default.", "electrify")
			),
            array(
				"type" => "textfield",
				"heading" => __("Title Margin", "electrify"),
				"param_name" => "title_margin",
				"value" => "",
				"description" => __("Value should be in css format top right bottom left in px (Ex: -10px 20px 30px 40px), Leave it empty to apply theme default.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Title Tag", "electrify"),
			"param_name" => "title_tag",
			"value" => array('h2','h1','h3','h4','h5','h6'),
			"description" => __("Select title tag.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Do you want subtitle?", "electrify"),
			"param_name" => "sub_title",
			"value" => array(__('No', "electrify") => "no",
				         __('Yes', "electrify") => "yes"), 
			"description" => __("Do you want subtitle?", "electrify"),
			"dependency" => Array('element' => "style", 'value' => array('normal-title','box-title','box-small','title-sep','title-right-border'))
			),

		array(
			"type" => "dropdown",
			"heading" => __("Do you want sub_title_style?", "electrify"),
			"param_name" => "sub_title_style",
			"value" => array(__('Normal', "electrify") => "",
					 __('Italic', "electrify") => "italic"), 
			"description" => __("Do you want subtitle?", "electrify"),
			"dependency" => Array('element' => "sub_title", 'value' => array('yes'))
			),

		array(
			"type" => "textfield",
			"heading" => __("subtitle text", "electrify"),
			"param_name" => "sub_title_text",
			"value" => "sub title text",
			"description" => __("Enter the sub title text.", "electrify"),
			"dependency" => Array('element' => "sub_title", 'value' => array('yes'))
			),
		 array(
				"type" => "textfield",
				"heading" => __("Sub Title Margin Bottom", "electrify"),
				"param_name" => "sub_title_margin",
				"value" => "",
				"description" => __("Margin bottom for sub title margin bottom in px (Ex: 20px), Leave it empty to apply theme default.", "electrify"),
				"dependency" => Array('element' => "sub_title", 'value' => array('yes'))
			),

		array(
			"type" => "dropdown",
			"heading" => __("Line", "electrify"),
			"param_name" => "line",
			"value" => array(__('Yes', "electrify") => "yes", 
							 __('No', "electrify") => "no"), 
			"description" => __("Display line below title?", "electrify")
			),
            
        array(
			"type" => "dropdown",
			"heading" => __("Line Positions", "electrify"),
			"param_name" => "line_positions",
			"value" => array(__('Below Title', "electrify") => "below-title", 
							 __('Below Sub Title', "electrify") => "below-sub-title"), 
			"description" => __("Display line below title?", "electrify"),
             "dependency" => Array('element' => "line", 'value' => array('yes'))
			),
                
        array(
			"type" => "dropdown",
			"heading" => __("Line Style", "electrify"),
			"param_name" => "line_style",
			"value" => array(__('Line Style1', "electrify") => "line-style1", 
                             __('Line Style2', "electrify") => "line-style2",
                             __('Line Style3', "electrify") => "line-style3",
                             __('Line Style4', "electrify") => "line-style4",
                             __('Line Style5', "electrify") => "line-style5"),
			"description" => __("Do you like to animate this element", "electrify"),
            "dependency" => Array('element' => "line", 'value' => array('yes'))
			),
                

		array(
			"type" => "dropdown",
			"heading" => __("Title Animation", "electrify"),
			"param_name" => "animate",
			"value" => array(__('No', "electrify") => "no", 
							 __('Yes', "electrify") => "yes"),
			"description" => __("Do you like to animate this element", "electrify"),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Animation Transition", "electrify"),
			"param_name" => "transition",
			"value" => $animation,
			"description" => __("Choose Animation Transition.", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Animation Duration", "electrify"),
			"param_name" => "duration",
			"value" => "",
			"description" => __("Enter the Duration (Ex: 500ms or 1s)", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Animation Delay", "electrify"),
			"param_name" => "delay",
			"value" => "",
			"description" => __("Enter the Delay (Ex: 100ms or 1s)", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Extra class name", "electrify"),
			"param_name" => "el_class",
			"value" => "",
			"description" => __("If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file.", "electrify")
			),
		)
) );

// Counters 
vc_map( array(
	"name" => __("Counters", "electrify"), //Title
	"base" => "counter", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "textfield",
			"heading" => __("Counter Number", "electrify"),
			"param_name" => "number",
			"admin_label" => true,
			"value" => "5000",
			"description" => __("Enter the counter number.", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Counter Number Font Size in px", "electrify"),
			"param_name" => "number_font_size",
			"value" => "",
			"description" => __("Enter Font Size in Pixels(eg: 16px), Leave empty to apply theme default", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Counter Text", "electrify"),
			"param_name" => "text",
			"admin_label" => true,
			"value" => "Pizzas ordered",
			"description" => __("Enter the counter Text.", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Counter Text Font Size in px", "electrify"),
			"param_name" => "text_font_size",
			"value" => "",
			"description" => __("Enter Font Size in Pixels(eg: 16px), Leave empty to apply theme default", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Icon", "electrify"),
			"param_name" => "icon",
			"value" => array(__('Yes', "electrify") => "yes", 
							 __('No', "electrify") => "no"), 
			"description" => __("Do you like to add icon?", "electrify")
			),

		array(
			"type" => "icon",
			"heading" => __("Insert Icon", "electrify"),
			"param_name" => "icon_name",
			"value" => '',
			"description" => __("Choose an icon.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Icon Alignment", "electrify"),
			"param_name" => "icon_align",
			"value" => array(__('Align Left', "electrify") => "", 
							 __('Align Center', "electrify") => "center", 
							 __('Align Right', "electrify") => "right"),
			"description" => __("Select icon alignment.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Display Icon in Theme Default Color?", "electrify"),
			"param_name" => "icon_color",
			"value" => array(__('Yes', "electrify") => " color", 
							 __('No', "electrify") => "no"), 
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Border", "electrify"),
			"param_name" => "border",
			"value" => array(__('Yes', "electrify") => " border", 
							 __('No', "electrify") => "no"), 
			"description" => __("Display border around counter?", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Extra class name", "electrify"),
			"param_name" => "el_class",
			"value" => "",
			"description" => __("If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file.", "electrify")
			),
		)
) );

// Callout Box
vc_map( array(
	"name" => __("Callout Box", "electrify"), 
	"base" => "callout_box", 
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es',
	"params" => array(

		array(
			"type" => "dropdown",
			"heading" => __("Callout Box Style", "electrify"),
			"param_name" => "callout_style",
			"value" => array(__('Default (No background Color)', "electrify") => "default", 
							 __('Normal (In Grey Background)', "electrify") => "background",
							 __('classic (Grey Background with Border on  left)', "electrify") => "background border"),
			"description" => __("Select Call out box style.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Callout Box Alignment", "electrify"),
			"param_name" => "callout_align",
			"value" => array(__('Align center', "electrify") => "center", 
							 __('Align left', "electrify") => "left"),
			"description" => __("Select box alignment.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Title Tag", "electrify"),
			"param_name" => "title_tag",
			"value" => array('h2','h1','h3','h4','h5','h6'),
			"description" => __("Select title tag.", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Title", "electrify"),
			"param_name" => "title",
			"admin_label" => true,
			"value" => "Callout Title goes here",
			"description" => __("Enter the title.", "electrify")
			),

		array(
			"type" => "textarea_html",
			"class" => "",
			"heading" => __("Callout Box Content", "electrify"),
			"param_name" => "content", 
			"value" => '', 
			"description" => __("Enter the callout box content", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Display Button?", "electrify"),
			"param_name" => "display_button",
			"value" => array(__('Yes', "electrify") => "yes", 
							 __('No', "electrify") => "no"),
			"description" => __("Do you want to display button?", "electrify"),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Button Text", "electrify"),
			"param_name" => "button_text",
			"value" => "Button Text",
			"description" => __("Enter the Button Text", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "vc_link",
			"heading" => __("Button URL", "electrify"),
			"param_name" => "button_link",
			"value" => "#",
			"description" => __("Enter the button link", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Button Style", "electrify"),
			"param_name" => "button_style",
			"value" => array(__('Outline', "electrify") => "outline", 
							 __('Solid', "electrify") => "solid", 
							 __('Default', "electrify") => "simple"),
			"description" => __("Select button style?", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Button Color", "electrify"),
			"param_name" => "button_color",
			"value" => array(__('Theme default color', "electrify") => "color", 
							 __('black', "electrify") => "no-color",
							 __('white', "electrify") => "white"), 
			"description" => __("Please choose button color", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Button Size", "electrify"),
			"param_name" => "button_size",
			"value" => array(__('Medium', "electrify") => "md", 
							 __('Small', "electrify") => "sm", 
							 __('Large', "electrify") => "lg"),
			"description" => __("Select button size", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "icon",
			"heading" => __("Button Icon", "electrify"),
			"param_name" => "button_icon",
			"value" => '',
			"description" => __("Insert button icon.", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Display Second Button?", "electrify"),
			"param_name" => "display_button2",
			"value" => array(__('No', "electrify") => "no",
							 __('Yes', "electrify") => "yes"),
			"description" => __("Do you want to display Second button?", "electrify"),
			"dependency" => Array('element' => "callout_align", 'value' => array('center')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Button Text 2", "electrify"),
			"param_name" => "button_text2",
			"value" => "Button Text",
			"description" => __("Enter the Button Text 2", "electrify"),
			"dependency" => Array('element' => "display_button2", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "vc_link",
			"heading" => __("Button 2 URL", "electrify"),
			"param_name" => "button_link2",
			"value" => "#",
			"description" => __("Enter the button link 2", "electrify"),
			"dependency" => Array('element' => "display_button2", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Button 2 Style", "electrify"),
			"param_name" => "button_style2",
			"value" => array(__('Outline', "electrify") => "outline", 
							 __('Solid', "electrify") => "solid", 
							 __('Default', "electrify") => "simple"),
			"description" => __("Select button 2 style", "electrify"),
			"dependency" => Array('element' => "display_button2", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Display Button 2 in Color", "electrify"),
			"param_name" => "button_color2",
			"value" => array(__('Theme default color', "electrify") => "color", 
							 __('black', "electrify") => "no-color",
							 __('white', "electrify") => "white"), 
			"description" => __("Do you want to display button in default theme color?", "electrify"),
			"dependency" => Array('element' => "display_button2", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Button 2 Size", "electrify"),
			"param_name" => "button_size2",
			"value" => array(__('Medium', "electrify") => "md", 
							 __('Small', "electrify") => "sm", 
							 __('Large', "electrify") => "lg"),
			"description" => __("Select button size", "electrify"),
			"dependency" => Array('element' => "display_button2", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "icon",
			"class" => "",
			"heading" => __("Button 2 Icon", "electrify"),
			"param_name" => "button_icon2",
			"value" => '',
			"description" => __("Insert an icon for second button.", "electrify"),
			"dependency" => Array('element' => "display_button2", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Callout Animation", "electrify"),
			"param_name" => "animate",
			"value" => array(__('No', "electrify") => "no", 
				__('Yes', "electrify") => "yes"),
			"description" => __("Do you like to animate this element", "electrify"),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Animation Transition", "electrify"),
			"param_name" => "transition",
			"value" => $animation,
			"description" => __("Choose Animation Transition.", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Animation Duration", "electrify"),
			"param_name" => "duration",
			"value" => "",
			"description" => __("Enter the Duration (Ex: 500ms or 1s)", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Animation Delay", "electrify"),
			"param_name" => "delay",
			"value" => "",
			"description" => __("Enter the Delay (Ex: 100ms or 1s)", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Extra class name", "electrify"),
			"param_name" => "el_class",
			"value" => "",
			"description" => __("If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file.", "electrify")
			),
		)
) );

// Process
vc_map( array(
	"name" => __("Process", "electrify"), //Title
	"base" => "process", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "dropdown",
			"heading" => __("Process Style", "electrify"),
			"param_name" => "type",
			"value" => array(__('Circle', "electrify") => "default", 
							 __('Square', "electrify") => "default process_square"),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Process Background", "electrify"),
			"param_name" => "style",
			"value" => array(__('Default', "electrify") => "default", 
							 __('Solid Color Background', "electrify") => "background",
							 __('Solid Grey Background', "electrify") => "background grey"),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Process Inner Content", "electrify"),
			"param_name" => "text",
			"value" => array(__('Number', "electrify") => "number", 
							 __('Icon', "electrify") => "icon",
							 __('Text', "electrify") => "text"),
			"description" => ''
			),

		array(
			"type" => "textfield",
			"heading" => __("Process Number", "electrify"),
			"param_name" => "circle_text",
			"value" => "01",
			"description" => __("Enter Process Number.", "electrify"),
			"dependency" => Array('element' => "text", 'value' => array('number'))
			),

		array(
			"type" => "icon",
			"heading" => __("Insert Icon", "electrify"),
			"param_name" => "icon_name",
			"value" => '',
			"description" => __("Insert an icon.", "electrify"),
			"dependency" => Array('element' => "text", 'value' => array('icon'))
			),

		array(
			"type" => "textfield",
			"heading" => __("Process Title", "electrify"),
			"param_name" => "title",
			"admin_label" => true,
			"value" => "Title",
			"description" => __("Enter the Process title.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Display Process Description?", "electrify"),
			"param_name" => "process_content",
			"value" => array(__('No', "electrify") => 'no', 
							 __('Yes', "electrify") => 'yes'),
			"description" => __("Do you want to display process description", "electrify")
			),

		array(
			"type" => "textarea",
			"class" => "",
			"heading" => __("Process description", "electrify"),
			"param_name" => "content", 
			"value" => '', 
			"description" => __("Enter the process description", "electrify"),
			"dependency" => Array('element' => "process_content", 'value' => array('yes'))
			),

		array(
			"type" => "dropdown",
			"heading" => __("Process Arrow Style", "electrify"),
			"param_name" => "process_style",
			"value" => array(__('Inclined Arrow', "electrify") => "nav-style",
							 __('Straight Arrow', "electrify") => "nav-style straight",
							 __('Straight Arrow 2', "electrify") => "nav-style straight round",
							 __('none', "electrify") => "default"),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Process Animation", "electrify"),
			"param_name" => "animate",
			"value" => array(__('No', "electrify") => "no", 
							 __('Yes', "electrify") => "yes"),
			"description" => __("Do you like to animate this element", "electrify"),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Animation Transition", "electrify"),
			"param_name" => "transition",
			"value" => $animation,
			"description" => __("Choose Animation Transition.", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Animation Duration", "electrify"),
			"param_name" => "duration",
			"value" => "",
			"description" => __("Enter the Duration (Ex: 500ms or 1s)", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Animation Delay", "electrify"),
			"param_name" => "delay",
			"value" => "",
			"description" => __("Enter the Delay (Ex: 100ms or 1s)", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Extra class name", "electrify"),
			"param_name" => "el_class",
			"value" => "",
			"description" => __("If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file.", "electrify")
			),
		)
) );

// VC Accordion
vc_add_param("vc_accordion", array(
	"type" => "dropdown",
	"class" => "",
	"heading" => __("Accordion Style", "electrify"),
	"param_name" => "style",
	"value" => array(__('Default', "electrify") => "default",
		__('Content Background Color', "electrify") => "default background",
		__('Content Border', "electrify") => "default border",
		__('Content Background Default Color', "electrify") => "default border border-background"),
	"description" => '',
	));

// VC Tabs



vc_add_param("vc_tabs", array(
	"type" => "dropdown",
	"class" => "",
	"heading" => __("Tabs Style", "electrify"),
	"param_name" => "style",
	"value" => array(__('Default', "electrify") => "default",
					 __('Default Background', "electrify") => "default style2",
					 __('Background Color', "electrify") => "default style3",
					 __('Color Highlight', "electrify") => "default style3 style4"),
	"description" => "",
	));

vc_add_param("vc_tabs", array(
	"type" => "dropdown",
	"class" => "",
	"heading" => __("Tabs Alignment", "electrify"),
	"param_name" => "align",
	"value" => array(__('Left', "electrify") => "default",
					 __('Right', "electrify") => "right-align",
					 __('Center', "electrify") => "center-align"),
	"description" => "",
	));

vc_add_param("vc_tabs", array(
	"type" => "dropdown",
	"class" => "",
	"heading" => __("Tabs Nav View", "electrify"),
	"param_name" => "side",
	"value" => array(__('Top', "electrify") => "default",
					 __('Left', "electrify") => "tabs-left",
					 __('Right', "electrify") => "tabs-left tabs-right",
					 __('Bottom', "electrify") => "tabs-bottom"),
	"description" => "",
	));

vc_add_param("vc_tab",
	array(
		"type" => "icon",
		"class" => "",
		"heading" => __("Insert Icon", "electrify"),
		"param_name" => "icon_name",
		"value" => '',
		"description" => __("Insert an icon for tab.", "electrify")
		)
	);

// Progress Bar
vc_remove_param("vc_progress_bar", "bgcolor");

//remove animation from single image
vc_remove_param("vc_single_image", "css_animation");

vc_add_param("vc_progress_bar", array(
	"type" => "dropdown",
	"class" => "",
	"heading" => __("Progress Bar Style", "electrify"),
	"param_name" => "style",
	"value" => array(__('Style1', "electrify") => "style1",
					 __('Style2', "electrify") => "style2",
					 __('Style3', "electrify") => "style2 style3",
					 __('Style4', "electrify") => "style4"
		),
	"description" => "",
	));

// Spacer
vc_map( array(
	"name" => __("Spacer", "electrify"), //Title
	"base" => "spacer", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "textfield",
			"heading" => __("Spacer", "electrify"),
			"param_name" => "height",
			"value" => "30px",
			"description" => __("Enter the Space in px (Ex: 30px)", "electrify")
			),

		)
	) );

// Contact
vc_map( array(
       "name" => __("Contact", "electrify"), //Title
       "base" => "contact", //Shortcode name
       "class" => "",
       "icon" => "icon-pixel8es",
       "category" => 'By Pixel8es', //category
       "params" => array(
       	array(
       		"type" => "textfield",
       		"heading" => __("Email", "electrify"),
       		"param_name" => "mailto",
       		"value" => "",
       		"description" => __("Enter the email where you want receive from contact form", "electrify"),
       		),         
       	)
));

// Pie Chart
vc_map( array(
	"name" => __("Pie Chart", "electrify"), //Title
	"base" => "pie_chart", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "dropdown",
			"heading" => __("Pie Chart Style", "electrify"),
			"param_name" => "style",
			"value" => array(__('Style1', "electrify") => "style1",
							 __('Style2', "electrify") => "style2",
							 __('Style3', "electrify") => "style3",
							 __('Style4', "electrify") => "style2 style4",
							 __('Style5', "electrify") => "style2 style5",
							 __('Style6', "electrify") => "style2 style6",
							 __('Style7', "electrify") => "style3 style7",
							 __('Style8', "electrify") => "style3 style8"),
			"description" => ""),

		array(
			"type" => "textfield",
			"heading" => __("Percentage", "electrify"),
			"param_name" => "percentage",
			"value" => "50",
			"admin_label" => true,
			"description" => __("Enter the Percentage Value (Ex: 50).", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("custom_color", "electrify"),
			"param_name" => "custom_color",
			"value" => array(__('Default', "electrify") => "default",
				__('Custom', "electrify") => "custom"),
			"description" => __("Select title tag.", "electrify")
			),

		array(
			"type" => "colorpicker",
			"class" => "",
			"heading" => __("Bar Color", "electrify"),
			"param_name" => "barcolor", 
			"value" => '',
			"description" => __("Choose Bar color, theme default color code is: ", "electrify") . $theme_default,
			"dependency" => Array('element' => "custom_color", 'value' => array('custom'))
			),

		array(
			"type" => "dropdown",
			"heading" => __("Line Cap", "electrify"),
			"param_name" => "linecap",
			"value" => array(__('Default', "electrify") => "butt",
							 __('Round', "electrify") => "round",
							 __('Square', "electrify") => "square"),
			"description" => ''
			),

		array(
			"type" => "textfield",
			"heading" => __("Animate Duration", "electrify"),
			"param_name" => "animate_duration",
			"value" => "2000",
			"description" => __("Enter the Animate Duration in ms (2000ms = 2s) Ex: 2000.", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Line Width", "electrify"),
			"param_name" => "line_width",
			"value" => "6",
			"description" => __("Enter the Line Width.", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Circle Size", "electrify"),
			"param_name" => "size",
			"value" => "200",
			"description" => __("Enter the Circle Size in px (EX: 200).", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Text Position", "electrify"),
			"param_name" => "text_position",
			"value" => array(__('Outside', "electrify") => "",
							 __('Inside', "electrify") => "inside"),
			"description" => __("Select text position.", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Text", "electrify"),
			"param_name" => "text",
			"admin_label" => true,
			"value" => "",
			"description" => __("Enter the text.", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Extra class name", "electrify"),
			"param_name" => "el_class",
			"value" => "",
			"description" => __("If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file.", "electrify")
			),
		)
) );


// Staffs
vc_map( array(
	"name" => __("Staffs", "electrify"), //Title
	"base" => "staffs", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "dropdown",
			"heading" => __("Insert Staffs by", "electrify"),
			"param_name" => "insert_type",
			"admin_label" => true,
			"value" => array(__('Staffs Posts', "electrify") => "posts", 
							 __('Staff Id', "electrify") => "id"),
			"description" => ''
			),

		array(
			"type" => "textfield",
			"heading" => __("No. of Staffs", "electrify"),
			"param_name" => "no_of_staff",
			"value" => '6',
			"dependency" => Array('element' => "insert_type", 'value' => 'posts'),
			"description" => __("Enter the number of staffs you want to display (only numbers), Enter -1 for all posts", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Order By", "electrify"),
			"param_name" => "order_by",
			"value" => array( __('Date', "electrify") => "date",  
							__('Rand', "electrify") => "rand",
							__('ID', "electrify") => "ID", 
							__('Title', "electrify") => "title", 
							__('Author', "electrify") => "author",
							__('Name', "electrify") => "modified",
							__('Parent', "electrify") => "parent",
							__('Date Modified', "electrify") => "date",
							__('Menu Order', "electrify") => "menu_order",
							__('None', "electrify") => "none"),
			"dependency" => Array('element' => "insert_type", 'value' => 'posts'),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Order By", "electrify"),
			"param_name" => "order",
			"value" => array( __('Ascending order', "electrify") => "ASC",  
							  __('descending order', "electrify") => "DESC"),
			"dependency" => Array('element' => "insert_type", 'value' => 'posts'),
			"description" => __('Choose staffs posts Order', "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Staff Id", "electrify"),
			"param_name" => "staff_id",
			"value" => "",
			"dependency" => Array('element' => "insert_type", 'value' => 'id'),
			"description" => __("Enter the staff ids seperated by commas (,). Example: 2,54,8", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Exclude Staffs", "electrify"),
			"param_name" => "exclude_staffs",
			"value" => "",
			"description" => __("Enter the staff id you don't want to display. Divide id with comma (,).", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Number of Columns", "electrify"),
			"param_name" => "columns",
			"value" => array( __('4 Columns', "electrify") => "col4",  
							  __('3 Columns', "electrify") => "col3",
							  __('2 Columns', "electrify") => "col2"),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Choose a style", "electrify"),
			"param_name" => "style",
			"value" => array( __('style 1', "electrify") => "style1",  
							 __('style 2', "electrify") => "style2",
							 __('style 3', "electrify") => "style3",
							 __('style 4', "electrify") => "style4",
							 __('style 5', "electrify") => "style5"),
			"description" => __("This theme have 5 staffs styles, please choose one", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("HTML Tag for Staff Name", "electrify"),
			"param_name" => "title_tag",
			"value" => array('h2','h3','h4','h5','h6','h1', 'p'),
			"description" => __("Choose which html tag you want use for staff name.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Staff Description", "electrify"),
			"param_name" => "staff_desc",
			"value" => array(__('Yes', "electrify") => "yes",  
							 __('No', "electrify") => "no"),
			"description" => __("Do you like to show staff description", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Do you need light box for staff image", "electrify"),
			"param_name" => "lightbox",
			"value" => array(__('Yes', "electrify") => "yes",  
							 __('No', "electrify") => "no"),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Link to single staff page?", "electrify"),
			"param_name" => "single_staff_link",
			"value" => array(__('Yes', "electrify") => "yes",  
							 __('No', "electrify") => "no"),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Enable carousel?", "electrify"),
			"param_name" => "slider",
			"value" => array(__('Yes', "electrify") => "yes",  
							 __('No', "electrify") => "no"),
			"description" => __("Do you like to display staffs in carousel?", "electrify"),
			"group"	=> __('Slider', 'electrify')
			),
		array(
			"type" => "textfield",
			"heading" => __("Autoplay", "electrify"),
			"param_name" => "autoplay",
			"value" => "4000",
			"description" => __("Enter the Value in milesecond (Ex: 5000), Enter 'false' to disable autoplay.", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Slide Speed", "electrify"),
			"param_name" => "slide_speed",
			"value" => "500",
			"description" => __("Enter the Value in milesecond (Ex: 500)", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),      

		array(
			"type" => "dropdown",
			"heading" => __("Arrow", "electrify"),
			"param_name" => "slide_arrow",
			"value" => array( __('Yes', "electrify") => "true",
				          __('No', "electrify") => "false"),
			"description" => __("Do you want to display carousel arrow?", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),       

		array(
			"type" => "dropdown",
			"heading" => __("Arrow Style", "electrify"),
			"param_name" => "arrow_type",
			"value" => array( __('Default', "electrify") => "",
							  __('Arrow Top Right', "electrify") => "arrow-style2"),
			"description" => __("Choose arrow postion", "electrify"),
			"dependency" => Array('element' => "slide_arrow", 'value' => array('true')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Pagination", "electrify"),
			"param_name" => "pagination",
			"value" => array( __('Yes', "electrify") => "true",
				__('No', "electrify") => "false"),
			"description" => __("Do you want to display carousel dot nav?", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Auto Height", "electrify"),
			"param_name" => "slider_height",
			"value" => array( __('No', "electrify") => "false",
							  __('Yes', "electrify") => "true"),
			"description" => __("By Enabling this, slider height will vary depends on content for each slide. Please turn off this if you have more content below Staffs to avoid page moving.", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),  

		array(
			"type" => "dropdown",
			"heading" => __("Stop On Hover", "electrify"),
			"param_name" => "stop_on_hover",
			"value" => array( __('Yes', "electrify") => "true",
							  __('No', "electrify") => "false"),
			"description" => __("Stop auto moving carousel on mouseover", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			), 
		array(
			"type" => "dropdown",
			"heading" => __("Do you like to move carousel Mouse Drag?", "electrify"),
			"param_name" => "mouse_drag",
			"value" => array( __('Yes', "electrify") => "true",
							  __('No', "electrify") => "false"),
			"description" => __("Do you like to move carousel Mouse Drag?", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			), 

		array(
			"type" => "dropdown",
			"heading" => __("Touch Drag", "electrify"),
			"param_name" => "touch_drag",
			"value" => array( __('Yes', "electrify") => "true",
				__('No', "electrify") => "false"),
			"description" => __("Do you like to move carousel Touch Drag (in touch devices)?", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),  

		)
) );

// Portfolio
vc_map( array(
	"name" => __("Portfolio", "electrify"), //Title
	"base" => "portfolio", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "dropdown",
			"heading" => __("Portfolio Style", "electrify"),
			"param_name" => "portfolio_style",
			"admin_label" => true,
			"value" => array(__('Grid', "electrify") => "grid", 
							 __('Masonry', "electrify") => "masonry"),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Insert Portfolio by", "electrify"),
			"param_name" => "insert_type",
			"admin_label" => true,
			"value" => array(__('Portfolio Posts', "electrify") => "posts", 
							 __('portfolio Id', "electrify") => "id"),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Filterable", "electrify"),
			"param_name" => "pix_filterable",
			"value" => array(__('Yes', "electrify") => "yes",  
							 __('No', "electrify") => "no"),
			"description" => __('Filter only displays if you choose carousel "No"', "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Filter Style", "electrify"),
			"param_name" => "filter_style",
			"value" => array(__('Simple', "electrify") => "normal simple",
							 __('Normal', "electrify") => "normal",  
							 __('Dropdown', "electrify") => "dropdown"),
			"dependency" => Array('element' => "pix_filterable", 'value' => 'yes'),
			"description" => ''
			),

		array(
			"type" => "textfield",
			"heading" => __("No. of Portfolio", "electrify"),
			"param_name" => "no_of_items",
			"value" => '12',
			"dependency" => Array('element' => "insert_type", 'value' => 'posts'),
			"description" => __("Enter the number of Portfolio you want to display (only numbers), Enter -1 for all portfolio items", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Order By", "electrify"),
			"param_name" => "order_by",
			"value" => array( __('Date', "electrify") => "date",  
							 __('Rand', "electrify") => "rand",
							 __('ID', "electrify") => "ID", 
							 __('Title', "electrify") => "title", 
							 __('Author', "electrify") => "author",
							 __('Name', "electrify") => "modified",
							 __('Parent', "electrify") => "parent",
							 __('Date Modified', "electrify") => "date",
							 __('Menu Order', "electrify") => "menu_order",
							 __('None', "electrify") => "none"),
			"dependency" => Array('element' => "insert_type", 'value' => 'posts'),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Order By", "electrify"),
			"param_name" => "order",
			"value" => array( __('Ascending order', "electrify") => "ASC",  
							  __('descending order', "electrify") => "DESC"),
			"dependency" => Array('element' => "insert_type", 'value' => 'posts'),
			"description" => ''
			),

		array(
			"type" => "textfield",
			"heading" => __("portfolio Id", "electrify"),
			"param_name" => "portfolio_id",
			"value" => "",
			"dependency" => Array('element' => "insert_type", 'value' => 'id'),
			"description" => __("Enter the portfolio ids seperated by commas (,). Example: 2,54,8", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Exclude Portfolio", "electrify"),
			"param_name" => "exclude_portfolio",
			"value" => "",
			"description" => __("Enter the portfolio id you don't want to display. Divide id with comma (,).", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Number of Columns", "electrify"),
			"param_name" => "columns",
			"value" => array( __('4 Columns', "electrify") => "col4",  
							  __('3 Columns', "electrify") => "col3",
							  __('2 Columns', "electrify") => "col2"),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Choose a style", "electrify"),
			"param_name" => "style",
			"value" => array( __('style 1', "electrify") => "style1",  
							  __('style 2', "electrify") => "style2",
							  __('style 3', "electrify") => "style3",
							  __('style 4', "electrify") => "style4",
							  __('style 5', "electrify") => "style5",
							  __('style 6', "electrify") => "style6",
							  __('style 7', "electrify") => "style7"),
			"description" => __("This theme have 6 Portfolio styles, please choose one", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("HTML Tag for portfolio Name", "electrify"),
			"param_name" => "title_tag",
			"value" => array('h2','h3','h4','h5','h6','h1', 'p'),
			"description" => __("Choose which html tag you want use for portfolio name.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Do you need light box for portfolio image", "electrify"),
			"param_name" => "lightbox",
			"value" => array(__('Yes', "electrify") => "yes",  
							 __('No', "electrify") => "no"),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Do you like to show like button", "electrify"),
			"param_name" => "like",
			"value" => array(__('Yes', "electrify") => "yes",  
							 __('No', "electrify") => "no"),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Link to single portfolio page?", "electrify"),
			"param_name" => "single_portfolio_link",
			"value" => array(__('Yes', "electrify") => "yes",  
							 __('No', "electrify") => "no"),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Enable carousel?", "electrify"),
			"param_name" => "slider",
			"value" => array(__('No', "electrify") => "no",
							 __('Yes', "electrify") => "yes"),
			"description" => __("Do you like to display Portfolio in carousel?", "electrify"),
			"group"	=> __('Slider', 'electrify')
			),  
		array(
			"type" => "textfield",
			"heading" => __("Autoplay", "electrify"),
			"param_name" => "autoplay",
			"value" => "4000",
			"description" => __("Enter the Value in milesecond (Ex: 5000), Enter 'false' to disable autoplay.", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Slide Speed", "electrify"),
			"param_name" => "slide_speed",
			"value" => "500",
			"description" => __("Enter the Value in milesecond (Ex: 500)", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),      

		array(
			"type" => "dropdown",
			"heading" => __("Arrow", "electrify"),
			"param_name" => "slide_arrow",
			"value" => array( __('Yes', "electrify") => "true",
				__('No', "electrify") => "false"),
			"description" => __("select the arrow if you want", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),       

		array(
			"type" => "dropdown",
			"heading" => __("Arrow Style", "electrify"),
			"param_name" => "arrow_type",
			"value" => array( __('Default', "electrify") => "",
							 __('Arrow Top Right', "electrify") => "arrow-style2"),
			"description" => __("Do you like to show arrow navigation to move carousel.", "electrify"),
			"dependency" => Array('element' => "slide_arrow", 'value' => array('true')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Pagination", "electrify"),
			"param_name" => "pagination",
			"value" => array( __('Yes', "electrify") => "true",
							  __('No', "electrify") => "false"),
			"description" => __("Do you want to display carousel dot nav?", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Auto Height", "electrify"),
			"param_name" => "slider_height",
			"value" => array( __('No', "electrify") => "false",
							  __('Yes', "electrify") => "true"),
			"description" => __("By Enabling this, slider height will vary depends on content for each slide. Please turn off this if you have more content below portfolio to avoid page moving.", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),  

		array(
			"type" => "dropdown",
			"heading" => __("Stop On Hover", "electrify"),
			"param_name" => "stop_on_hover",
			"value" => array( __('Yes', "electrify") => "true",
				__('No', "electrify") => "false"),
			"description" => __("Stop On Hover", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			), 
		array(
			"type" => "dropdown",
			"heading" => __("Do you like to move carousel Mouse Drag?", "electrify"),
			"param_name" => "mouse_drag",
			"value" => array( __('Yes', "electrify") => "true",
				__('No', "electrify") => "false"),
			"description" => __("Do you like to move carousel Mouse Drag?", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			), 

		array(
			"type" => "dropdown",
			"heading" => __("Touch Drag", "electrify"),
			"param_name" => "touch_drag",
			"value" => array( __('Yes', "electrify") => "true",
				__('No', "electrify") => "false"),
			"description" => __("Do you like to move carousel Touch Drag (in touch devices)?", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),    
		)
) );

// Pricing Tables
vc_map( array(
	"name" => __("Pricing Tables", "electrify"), //Title
	"base" => "pricing_tables", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "dropdown",
			"heading" => __("Choose a style", "electrify"),
			"param_name" => "style",
			"value" => array( __('Style 1', "electrify") => "style1",  
							  __('Style 2', "electrify") => "style2",
							  __('Style 3', "electrify") => "style3",
							  __('Style 4', "electrify") => "style4",
							  __('Style 5', "electrify") => "style5",
							  __('Style 6', "electrify") => "style6",
							  __('Style 7', "electrify") => "style7",
							  __('Style 8', "electrify") => "style8",
							  __('Style 9', "electrify") => "style9",
							  __('Style 10', "electrify") => "style10"),
			"description" => __("This theme have 2 pricing tables styles, please choose one", "electrify")
			),

		array(
			"type" => "attach_image",
			"heading" => __("Plan Name Background Image", "electrify"),
			"param_name" => "pricing_table_img",
			"value" => "",
			"dependency" => Array('element' => "style", 'value' => array('style7')),
			"description" => __("Select a image if you want to display image behind plan name.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Title Tag", "electrify"),
			"param_name" => "title_tag",
			"value" => array('h2','h1','h3','h4','h5','h6'),
			"description" => __("Select title tag.", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Title", "electrify"),
			"param_name" => "title",
			"admin_label" => true,
			"value" => "Title",
			"description" => __("Enter the title.", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Currency Symbol", "electrify"),
			"param_name" => "currency",
			"value" => '$',
			"description" => __("Enter the symbol.", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("price", "electrify"),
			"param_name" => "price",
			"value" => '99.99',
			"description" => __("Enter the price.", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("period", "electrify"),
			"param_name" => "period",
			"value" => 'per month',
			"description" => __("Enter the period.", "electrify")
			),

		array(
			"type" => "textarea_html",
			"class" => "",
			"heading" => __("Pricing Content", "electrify"),
			"param_name" => "content", //Shortcode_attr name
			"value" => '<ul><li>3 Wordpress</li><li>Single usage</li><li>One User</li><li>5 GB storage</li><li>6 months free Support</li></ul>', //Default Red color
			"description" => __("Enter the Icon Box Content", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Highlight", "electrify"),
			"param_name" => "highlight_box",
			"value" => array(__('No', "electrify") => "no", 
				__('Yes', "electrify") => "yes"),
			"description" => __("Do you want to highlight the box?", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Display Button?", "electrify"),
			"param_name" => "display_button",
			"value" => array(__('Yes', "electrify") => "yes", 
				__('No', "electrify") => "no"),
			"description" => __("Do you want to display button?", "electrify"),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Button Text", "electrify"),
			"param_name" => "button_text",
			"value" => "Order Now",
			"description" => __("Enter the Button Text", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "vc_link",
			"heading" => __("Button URL", "electrify"),
			"param_name" => "button_link",
			"value" => "#",
			"description" => __("Enter the button link", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Button Style", "electrify"),
			"param_name" => "button_style",
			"value" => array(__('Outline', "electrify") => "outline", 
				__('Solid', "electrify") => "solid", 
				__('Default', "electrify") => "simple"),
			"description" => __("Select button style?", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Button Color", "electrify"),
			"param_name" => "button_color",
			"value" => array(__('Theme default color', "electrify") => "color", 
							 __('black', "electrify") => "no-color",
							 __('white', "electrify") => "white"), 
			"description" => __("Please choose button color", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Button Size", "electrify"),
			"param_name" => "button_size",
			"value" => array(__('Medium', "electrify") => "md", 
				__('Small', "electrify") => "sm", 
				__('Large', "electrify") => "lg"),
			"description" => __("Select button size?", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "icon",
			"class" => "",
			"heading" => __("Button Icon", "electrify"),
			"param_name" => "button_icon",
			"value" => '',
			"description" => __("Insert an icon for button.", "electrify"),
			"dependency" => Array('element' => "display_button", 'value' => array('yes')),
			"group"	=> __('Button', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Pricing Tables Animation", "electrify"),
			"param_name" => "animate",
			"value" => array(__('No', "electrify") => "no", 
				__('Yes', "electrify") => "yes"),
			"description" => __("Do you like to animate this element", "electrify"),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Animation Transition", "electrify"),

			"param_name" => "transition",
			"value" => $animation,
			"description" => __("Choose Animation Transition.", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Animation Duration", "electrify"),
			"param_name" => "duration",
			"value" => "",
			"description" => __("Enter the Duration (Ex: 500ms or 1s)", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Animation Delay", "electrify"),
			"param_name" => "delay",
			"value" => "",
			"description" => __("Enter the Delay (Ex: 100ms or 1s)", "electrify"),
			"dependency" => Array('element' => "animate", 'value' => array('yes')),
			"group"	=> __('Animate', 'electrify')
			),
		)
) );


//Social 
vc_map( array(
	"name" => __("Social Icons", "electrify"), //Title
	"base" => "social", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "dropdown",
			"heading" => __("Choose a style", "electrify"),
			"param_name" => "style",
			"admin_label" => true,
			"value" => array( __('style 1', "electrify") => "style1",  
				__('style 2', "electrify") => "style2",
				__('style 3', "electrify") => "style3"),
			"description" => __("This theme have 3 Social Icon styles, please choose one. Leave below fields empty to hide icons ", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Facebook Url", "electrify"),
			"param_name" => "facebook",
			"value" => "",
			"description" => __("Enter the facebook Url", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Twitter Url", "electrify"),
			"param_name" => "twitter",
			"value" => "",
			"description" => __("Enter the twitter Url", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("GooglePlus Url", "electrify"),
			"param_name" => "gplus",
			"value" => "",
			"description" => __("Enter the gplus Url", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("LinkedIn Url", "electrify"),
			"param_name" => "linkedin",
			"value" => "",
			"description" => __("Enter the linkedin Url", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Dribbble Url", "electrify"),
			"param_name" => "dribble",
			"value" => "",
			"description" => __("Enter the dribbble Url", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Flickr Url", "electrify"),
			"param_name" => "flickr",
			"value" => "",
			"description" => __("Enter the flickr Url", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Pinterest Url", "electrify"),
			"param_name" => "pinterest",
			"value" => "",
			"description" => __("Enter the pinterest Url", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Tumblr Url", "electrify"),
			"param_name" => "tumblr",
			"value" => "",
			"description" => __("Enter the tumblr Url", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Instagrem Url", "electrify"),
			"param_name" => "instagrem",
			"value" => "",
			"description" => __("Enter the instagrem Url", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("RSS Url", "electrify"),
			"param_name" => "rss",
			"value" => "",
			"description" => __("Enter the rss Url", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Github Url", "electrify"),
			"param_name" => "github",
			"value" => "",
			"description" => __("Enter the github Url", "electrify")
			),

		)
));


// Testimonial
vc_map( array(
	"name" => __("Testimonials", "electrify"), //Title
	"base" => "testimonial", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "dropdown",
			"heading" => __("Insert testimonials by", "electrify"),
			"param_name" => "insert_type",
			"value" => array(__('testimonials Posts', "electrify") => "posts", 
				__('testimonial Id', "electrify") => "id"),
			"description" => ''
			),

		array(
			"type" => "textfield",
			"heading" => __("No. of testimonials", "electrify"),
			"param_name" => "no_of_testimonial",
			"value" => 3,
			"dependency" => Array('element' => "insert_type", 'value' => 'posts'),
			"description" => __("Enter the number of testimonials you want to display (only numbers), Enter -1 for all posts", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Order By", "electrify"),
			"param_name" => "order_by",
			"value" => array( __('Date', "electrify") => "date",  
				__('Rand', "electrify") => "rand",
				__('ID', "electrify") => "ID", 
				__('Title', "electrify") => "title", 
				__('Author', "electrify") => "author",
				__('Name', "electrify") => "modified",
				__('Parent', "electrify") => "parent",
				__('Date Modified', "electrify") => "date",
				__('Menu Order', "electrify") => "menu_order",
				__('None', "electrify") => "none"),
			"dependency" => Array('element' => "insert_type", 'value' => 'posts'),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Order By", "electrify"),
			"param_name" => "order",
			"value" => array( __('descending order', "electrify") => "DESC", 
							 __('Ascending order', "electrify") => "ASC",  
				),
			"dependency" => Array('element' => "insert_type", 'value' => 'posts'),
			"description" => ''
			),

		array(
			"type" => "textfield",
			"heading" => __("testimonial Id", "electrify"),
			"param_name" => "testimonial_id",
			"value" => "",
			"dependency" => Array('element' => "insert_type", 'value' => 'id'),
			"description" => __("Enter the testimonial ids seperated by commas (,). Example: 2,54,8", "electrify")
			),

		array(
			"type" => "textfield",
			"heading" => __("Exclude Testimonials", "electrify"),
			"param_name" => "exclude_testimonial",
			"value" => "",
			"description" => __("Enter the testimonial id you don't want to display. Divide id with comma (,).", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Choose a style", "electrify"),
			"param_name" => "style",
			"value" => array( __('style 1', "electrify") => "style1",  
				__('style 2', "electrify") => "style2",
				__('style 3', "electrify") => "style3",
				__('style 4', "electrify") => "style4",
				__('style 5', "electrify") => "style5",
				__('style 6', "electrify") => "style6"),
			"description" => __("This theme have 6 testimonials styles, please choose one", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Number of columns", "electrify"),
			"param_name" => "no_of_col",
			"value" => array(__('One Column', "electrify") => 1, 
				__('Two Columns', "electrify") => 2,
				__('Three Columns', "electrify") => 3,
				__('Four Columns', "electrify") => 4),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Do you want to display Rating?", "electrify"),
			"param_name" => "rating_no",
			"value" => array(__('Yes', "electrify") => "yes",  
				__('No', "electrify") => "no"),
			"description" => ''
			),
		array(
			"type" => "textfield",
			"heading" => __("Autoplay", "electrify"),
			"param_name" => "autoplay",
			"value" => "4000",
			"description" => __("Enter the Value in milesecond (Ex: 5000), Enter 'false' to disable autoplay.", "electrify"),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Slide Speed", "electrify"),
			"param_name" => "slide_speed",
			"value" => "500",
			"description" => __("Enter the Value in milesecond (Ex: 500)", "electrify"),
			"group"	=> __('Slider', 'electrify')
			),      

		array(
			"type" => "dropdown",
			"heading" => __("Arrow", "electrify"),
			"param_name" => "slide_arrow",
			"value" => array( __('No', "electrify") => "false",
				__('Yes', "electrify") => "true"),
			"description" => __("select the arrow if you want", "electrify"),
			"group"	=> __('Slider', 'electrify')
			),       

		array(
			"type" => "dropdown",
			"heading" => __("Arrow Style", "electrify"),
			"param_name" => "arrow_type",
			"value" => array( __('Default', "electrify") => "",
				__('Arrow Top Right', "electrify") => "arrow-style2"),
			"description" => __("Do you like to show arrow navigation to move carousel.", "electrify"),
			"dependency" => Array('element' => "slide_arrow", 'value' => array('true')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Pagination", "electrify"),
			"param_name" => "pagination",
			"value" => array( __('Yes', "electrify") => "true",
				__('No', "electrify") => "false"),
			"description" => __("Do you want to display carousel dot nav?", "electrify"),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Auto Height", "electrify"),
			"param_name" => "slider_height",
			"value" => array( __('No', "electrify") => "false",
							  __('Yes', "electrify") => "true"),
			"description" => __("By Enabling this, slider height will vary depends on content for each slide. Please turn off this if you have more content below testimonial to avoid page moving.", "electrify"),
			"group"	=> __('Slider', 'electrify')
			),  

		array(
			"type" => "dropdown",
			"heading" => __("Stop On Hover", "electrify"),
			"param_name" => "stop_on_hover",
			"value" => array( __('Yes', "electrify") => "true",
				__('No', "electrify") => "false"),
			"description" => __("Stop On Hover", "electrify"),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Do you like to move carousel Mouse Drag?", "electrify"),
			"param_name" => "mouse_drag",
			"value" => array( __('Yes', "electrify") => "true",
				__('No', "electrify") => "false"),
			"description" => __("Do you like to move carousel Mouse Drag?", "electrify"),
			"group"	=> __('Slider', 'electrify')
			), 
		
		array(
			"type" => "dropdown",
			"heading" => __("Touch Drag", "electrify"),
			"param_name" => "touch_drag",
			"value" => array( __('Yes', "electrify") => "true",
				__('No', "electrify") => "false"),
			"description" => __("Do you like to move carousel Touch Drag (in touch devices)?", "electrify"),
			"group"	=> __('Slider', 'electrify')
			),       

		)
) );



// Tweets
vc_map( array(
	"name" => __("Latest Tweets", "electrify"), //Title
	"base" => "tweets", //Shortcode name
	"class" => "",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"params" => array(

		array(
			"type" => "textfield",
			"heading" => __("Twitter Username", "electrify"),
			"param_name" => "twtusr",
			"value" => "envato",
			"description" => __("Enter the Twitter Username", "electrify")
			), 

		array(
			"type" => "textfield",
			"heading" => __("No. of Tweets", "electrify"),
			"param_name" => "twtcount",
			"value" => '3',
			"description" => __("Enter the number of tweets you want to display (only numbers).", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Choose a style", "electrify"),
			"param_name" => "style",
			"value" => array( __('style 1', "electrify") => "style1",
				__('style 2', "electrify") => "style2",
				__('style 3', "electrify") => "style3"),
			"description" => __("This theme have 3 Tweets styles, please choose one", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Tweets Alignment", "electrify"),
			"param_name" => "tweet_align",
			"value" => array(__('Align center', "electrify") => "center", 
							 __('Align left', "electrify") => "left"),
			"description" => __("Select tweets alignment.", "electrify")
			),

		array(
			"type" => "dropdown",
			"heading" => __("Number of columns", "electrify"),
			"param_name" => "no_of_col",
			"value" => array(__('One Column', "electrify") => 1, 
							 __('Two Columns', "electrify") => 2,
							 __('Three Columns', "electrify") => 3),
			"description" => ''
			),

		array(
			"type" => "dropdown",
			"heading" => __("Enable Slider?", "electrify"),
			"param_name" => "slider",
			"value" => array(__('Yes', "electrify") => "yes",  
							 __('No', "electrify") => "no"),
			"description" => '',
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Autoplay", "electrify"),
			"param_name" => "autoplay",
			"value" => "4000",
			"description" => __("Enter the Value in milesecond (Ex: 5000), Enter 'false' to disable autoplay.", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "textfield",
			"heading" => __("Slide Speed", "electrify"),
			"param_name" => "slide_speed",
			"value" => "500",
			"description" => __("Enter the Value in milesecond (Ex: 500)", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),      

		array(
			"type" => "dropdown",
			"heading" => __("Arrow", "electrify"),
			"param_name" => "slide_arrow",
			"value" => array( __('No', "electrify") => "false",
				__('Yes', "electrify") => "true"),
			"description" => __("select the arrow if you want", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),       

		array(
			"type" => "dropdown",
			"heading" => __("Arrow Style", "electrify"),
			"param_name" => "arrow_type",
			"value" => array( __('Default', "electrify") => "",
				__('Arrow Top Right', "electrify") => "arrow-style2"),
			"description" => __("Do you like to show arrow navigation to move carousel.", "electrify"),
			"dependency" => Array('element' => "slide_arrow", 'value' => array('true')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Pagination", "electrify"),
			"param_name" => "pagination",
			"value" => array( __('Yes', "electrify") => "true",
				__('No', "electrify") => "false"),
			"description" => __("Do you want to display carousel dot nav?", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Auto Height", "electrify"),
			"param_name" => "slider_height",
			"value" => array( __('No', "electrify") => "false",
							  __('Yes', "electrify") => "true"),
			"description" => __("By Enabling this, slider height will vary depends on content for each slide. Please turn off this if you have more content below tweets to avoid page moving.", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),  

		array(
			"type" => "dropdown",
			"heading" => __("Stop carousel On Hover", "electrify"),
			"param_name" => "stop_on_hover",
			"value" => array( __('Yes', "electrify") => "true",
				__('No', "electrify") => "false"),
			"description" => '',
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),

		array(
			"type" => "dropdown",
			"heading" => __("Do you like to move carousel Mouse Drag?", "electrify"),
			"param_name" => "mouse_drag",
			"value" => array( __('Yes', "electrify") => "true",
				__('No', "electrify") => "false"),
			"description" => __("Do you like to move carousel Mouse Drag?", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			), 
		
		array(
			"type" => "dropdown",
			"heading" => __("Touch Drag", "electrify"),
			"param_name" => "touch_drag",
			"value" => array( __('Yes', "electrify") => "true",
				__('No', "electrify") => "false"),
			"description" => __("Do you like to move carousel Touch Drag (in touch devices)?", "electrify"),
			"dependency" => Array('element' => "slider", 'value' => array('yes')),
			"group"	=> __('Slider', 'electrify')
			),       

		)
) );

if (class_exists('Woocommerce')) {

	// Woo Commerce Recent Product
	vc_map( array(
		"name" => __("Woo Commerce Recent Product", "electrify"), //Title
		"base" => "recent_products", //Shortcode name
		"class" => "",
		"icon" => "icon-pixel8es",
		"category" => 'By Pixel8es', //category
		"params" => array(

			array(
				"type" => "textfield",
				"heading" => __("Products Per Page", "electrify"),
				"param_name" => "per_page",
				"value" => "8",
				"description" => __("How many products you want to shown in per page", "electrify")
				),

			array(
				"type" => "dropdown",
				"heading" => __("Order By", "electrify"),
				"param_name" => "orderby",
				"value" => array( __('Date', "electrify") => "date",  
								  __('Rand', "electrify") => "rand",
								  __('ID', "electrify") => "ID"),
				"description" => __("Order posts By choosen order", "electrify")
				),

			array(
				"type" => "dropdown",
				"heading" => __("Order", "electrify"),
				"param_name" => "order",
				"value" => array( __('Ascending order', "electrify") => "ASC",  
								  __('descending order', "electrify") => "DESC"),
				"description" => __("In which Order, you want to display posts", "electrify")
				),
			)
	) );


	// Woo Commerce Feature Product
	vc_map( array(
		"name" => __("Woo Commerce Feature Product", "electrify"), //Title
		"base" => "featured_products", //Shortcode name
		"class" => "",
		"icon" => "icon-pixel8es",
		"category" => 'By Pixel8es', //category
		"params" => array(

			array(
				"type" => "textfield",
				"heading" => __("Products Per Page", "electrify"),
				"param_name" => "per_page",
				"value" => "8",
				"description" => __("How many products you want to shown in per page", "electrify")
				),

			array(
				"type" => "dropdown",
				"heading" => __("Order By", "electrify"),
				"param_name" => "orderby",
				"value" => array( __('Date', "electrify") => "date",  
								  __('Rand', "electrify") => "rand",
								  __('ID', "electrify") => "ID"),
				"description" => __("Order posts By choosen order", "electrify")
				),

			array(
				"type" => "dropdown",
				"heading" => __("Order", "electrify"),
				"param_name" => "order",
				"value" => array( __('Ascending order', "electrify") => "ASC",  
								  __('descending order', "electrify") => "DESC"),
				"dependency" => Array('element' => "insert_type", 'value' => 'posts'),
				"description" => __("In which Order, you want to display posts", "electrify")
				),
			)
	) );


	// Woo Commerce Sale Product
	vc_map( array(
		"name" => __("Woo Commerce Sale Product", "electrify"), //Title
		"base" => "sale_products", //Shortcode name
		"class" => "",
		"icon" => "icon-pixel8es",
		"category" => 'By Pixel8es', //category
		"params" => array(

			array(
				"type" => "textfield",
				"heading" => __("Products Per Page", "electrify"),
				"param_name" => "per_page",
				"value" => "8",
				"description" => __("How many products you want to shown in per page", "electrify")
				),

			array(
				"type" => "dropdown",
				"heading" => __("Order By", "electrify"),
				"param_name" => "orderby",
				"value" => array( __('Date', "electrify") => "date",  
								  __('Rand', "electrify") => "rand",
								  __('ID', "electrify") => "ID"),
				"description" => __("Order posts By choosen order", "electrify")
				),

			array(
				"type" => "dropdown",
				"heading" => __("Order", "electrify"),
				"param_name" => "order",
				"value" => array( __('Ascending order', "electrify") => "ASC",  
								  __('descending order', "electrify") => "DESC"),
				"description" => __("In which Order, you want to display posts", "electrify")
				),
			)
	) );


	// Woo Commerce Top Rated Product
	vc_map( array(
		"name" => __("Woo Commerce Top Rated Product", "electrify"), //Title
		"base" => "top_rated_products", //Shortcode name
		"class" => "",
		"icon" => "icon-pixel8es",
		"category" => 'By Pixel8es', //category
		"params" => array(

			array(
				"type" => "textfield",
				"heading" => __("Products Per Page", "electrify"),
				"param_name" => "per_page",
				"value" => "8",
				"description" => __("How many products you want to shown in per page", "electrify")
				),

			array(
				"type" => "dropdown",
				"heading" => __("Order By", "electrify"),
				"param_name" => "orderby",
				"value" => array( __('Date', "electrify") => "date",  
								  __('Rand', "electrify") => "rand",
								  __('ID', "electrify") => "ID"),
				"description" => __("Order posts By choosen order", "electrify")
				),

			array(
				"type" => "dropdown",
				"heading" => __("Order", "electrify"),
				"param_name" => "order",
				"value" => array( __('Ascending order', "electrify") => "ASC",  
								  __('descending order', "electrify") => "DESC"),
				"description" => __("In which Order, you want to display posts", "electrify")
				),
			)
	) );


	// Woo Commerce Selected Products
	vc_map( array(
		"name" => __("Woo Commerce Selected Product", "electrify"), //Title
		"base" => "products", //Shortcode name
		"class" => "",
		"icon" => "icon-pixel8es",
		"category" => 'By Pixel8es', //category
		"params" => array(

			array(
				"type" => "textfield",
				"heading" => __("Products ID", "electrify"),
				"param_name" => "ids",
				"value" => "",
				"description" => __("Type the products id's separated by commas", "electrify")
				),

			array(
				"type" => "dropdown",
				"heading" => __("Order By", "electrify"),
				"param_name" => "orderby",
				"value" => array( __('Date', "electrify") => "date",  
								  __('Rand', "electrify") => "rand",
								  __('ID', "electrify") => "ID"),
				"description" => __("Order posts By choosen order", "electrify")
				),

			array(
				"type" => "dropdown",
				"heading" => __("Order", "electrify"),
				"param_name" => "order",
				"value" => array( __('Ascending order', "electrify") => "ASC",  
								  __('descending order', "electrify") => "DESC"),
				"description" => __("In which Order, you want to display posts", "electrify")
				),
			)
	) );
}


//Register "container" content element. It will hold all your inner (child) content elements
vc_map( array(
	"name" => __("Lists", "electrify"),
	"base" => "list",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
    "as_parent" => array('only' => 'li'), // Use only|except attributes to limit child shortcodes (separate multiple values with comma)
    "content_element" => true,
    "show_settings_on_create" => false,
    /*"params" => array(
        // add params same as with any other content element
    	array(
    		"type" => "dropdown",
    		"heading" => __("Style", "electrify"),
    		"param_name" => "style",
    		"value" => array( __('default', "electrify") => "default",
    			__('style1', "electrify") => "style1",
    			__('style2', "electrify") => "style2"),
    		"description" => __("Choose list style", "electrify"),
    		)
    	),*/
    "js_view" => 'VcColumnView'
    ) );
vc_map( array(
	"name" => __("List Item", "electrify"),
	"base" => "li",
	"icon" => "icon-pixel8es",
	"category" => 'By Pixel8es', //category
	"content_element" => true,
    "as_child" => array('only' => 'list'), // Use only|except attributes to limit parent (separate multiple values with comma)
    "params" => array(
        // add params same as with any other content element
    	array(
    		"type" => "icon",
    		"heading" => __("Insert Icon", "electrify"),
    		"param_name" => "icon_name",
    		"value" => '',
    		"description" => __("Choose icon if you to display icons before list", "electrify")
    		),

    	/*content*/
    	array(
    		"type" => "textarea",
    		"holder" => "li",
    		"class" => "",
    		"heading" => __("Content", "electrify"),
    		"param_name" => "content",
    		"value" => "Enter your list item text here",
    		"description" => __("Enter your list item content.", "electrify")
    		),

    	array(
    		"type" => "dropdown",
    		"heading" => __("Icon Color", "electrify"),
    		"param_name" => "icon_color",
    		"value" => array(__('black', "electrify") => "",  
    			__('Theme Primary Color', "electrify") => "color",
    			__('custom color', "electrify") => "custom"),
    		"description" => ''
    		),

    	array(
    		"type" => "colorpicker",
    		"class" => "",
    		"heading" => __("Text color", "electrify"),
    		"param_name" => "user_icon_color",
    		"value" => '', 
    		"description" => __("Choose text color", "electrify"),
    		"dependency" => Array('element' => "icon_color", 'value' => array('custom'))
    		),
    	)
) );
//Your "container" content element should extend WPBakeryShortCodesContainer class to inherit all required functionality
if ( class_exists( 'WPBakeryShortCodesContainer' ) ) {
	class WPBakeryShortCode_list extends WPBakeryShortCodesContainer {
	}
}
if ( class_exists( 'WPBakeryShortCode' ) ) {
	class WPBakeryShortCode_li extends WPBakeryShortCode {
	}
}