<?php 

$pix_options =array(


	array(
		'name' 	=> 	__('Author Name (Optional)', 'electrify'),
		'desc' 	=> 	__('Enter the author name', 'electrify'),
		'id'	=>	'author_name',
		'std'	=>	'John Deo', //optional
		'type'	=>	'text'
		),

	array(
		'name' 	=> 	__('Content', 'electrify'),
		'desc' 	=> 	__('Enter the  blockquote content', 'electrify'),
		'id'	=>	'blockquote_con',
		'std'	=>	'Content Goes Here',
		'type'	=>	'textarea',
		'con'	=>	true //true to display inbetween shortcodes
		),

	array(
		'name' 	=> 	__('Alignment', 'electrify'),
		'desc' 	=> 	__('BlockQuote alignment left or right', 'electrify'),
		'id'	=>	'align',
		'std'	=>	'left',
		'options'=> array('left','right'),
		'type'	=>	'select'
		),

);

?>