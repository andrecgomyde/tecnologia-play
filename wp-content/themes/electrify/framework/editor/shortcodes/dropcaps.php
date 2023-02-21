<?php 

$pix_options =array(

	array('break' =>  false),

	array(
		'name' 	=> 	__('Dropcaps Style', 'electrify'),
		'desc' 	=> 	__('Choose the style you want', 'electrify'),
		'id'	=>	'style',
		'std'	=>	'default',
		'options'=> array('default','square','circle'),
		'type'	=>	'select'
		),

	array(
		'name' 	=> 	__('Dropcaps Text', 'electrify'),
		'desc' 	=> 	__('Enter the dropcaps text', 'electrify'),
		'id'	=>	'dropcap_text',
		'std'	=>	'S', //optional
		'type'	=>	'text',
		'con'   =>  true 
	)

);

?>