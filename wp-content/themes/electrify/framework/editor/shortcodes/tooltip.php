<?php 

$pix_options =array(


	array(
		'name' 	=> 	__('Tooltip Text', 'electrify'),
		'desc' 	=> 	__('Enter the tooltip text', 'electrify'),
		'id'	=>	'tooltip_title',
		'std'	=>	'Tooltip Text', //optional
		'type'	=>	'text',
		//'con'	=>	false //true to display inbetween shortcodes
		),

	array(
		'name' 	=> 	__('Alignment', 'electrify'),
		'desc' 	=> 	__('Choose the alignment you want', 'electrify'),
		'id'	=>	'align',
		'std'	=>	'top',
		'options'=> array('left','right','top','bottom'),
		'type'	=>	'select',
		),

	array(
		'name' 	=> 	__('Tooltip URL', 'electrify'),
		'desc' 	=> 	__('Enter the Tooltip URL', 'electrify'),
		'id'	=>	'link',
		'std'	=>	'#', //optional
		'type'	=>	'text',
		//'con'	=>	false //true to display inbetween shortcodes
		),

	array(
		'name' 	=> 	__('Tooltip Content', 'electrify'),
		'desc' 	=> 	__('Enter the tooltip content', 'electrify'),
		'id'	=>	'tooltip_content',
		'std'	=>	'Tooltip Content', //optional
		'type'	=>	'text',
		//'con'	=>	false //true to display inbetween shortcodes
		),

);

?>