<?php 

$pix_options =array(


	array(
		'name' 	=> 	__('Emphasis Text', 'electrify'),
		'desc' 	=> 	__('Enter the Emphasis Content', 'electrify'),
		'id'	=>	'emphasis_con',
		'std'	=>	'Content Goes Here',
		'type'	=>	'textarea'
		),
	
	array(
		'name' 	=> 	__('Animation', 'electrify'),
		'desc' 	=> 	__('Do you like to animate this element?', 'electrify'),
		'id'	=>	'animate',		
		'std'	=>	false,
		'type'	=>	'checkbox',
		'val'   =>  array('No', 'Yes') // False Value First
		),

	array(
		'name' 	=> 	__('Animation Transition', 'electrify'),
		'desc' 	=> 	__('Choose Animation Transition', 'electrify'),
		'id'	=>	'transition',
		'std'	=>	'fadeIn',
		'options'=> array('flash','bounce','shake','tada','swing','wobble','pulse','flip','flipInX','flipInY','fadeIn','fadeInUp','fadeInDown','fadeInLeft','fadeInRight','fadeInUpBig','fadeInDownBig','fadeInLeftBig','fadeInRightBig','slideInDown','slideInLeft','slideInRight','bounceIn','bounceInUp','bounceInDown','bounceInLeft','bounceInRight','rotateIn','rotateInDownLeft','rotateInDownRight','rotateInUpLeft','rotateInUpRight','lightSpeedIn','hinge','rollIn'),
		'type'	=>	'select',
		),

	array(
		'name' 	=> 	__('Animation Duration', 'electrify'),
		'desc' 	=> 	__('Enter the Duration (Ex: 500ms or 1s)', 'electrify'),
		'id'	=>	'duration',
		'std'	=>	'1s', //optional
		'type'	=>	'text',
		),

	array(
		'name' 	=> 	__('Animation Delay', 'electrify'),
		'desc' 	=> 	__('Enter the Delay (Ex: 100ms or 1s)', 'electrify'),
		'id'	=>	'delay',
		'std'	=>	'100ms', //optional
		'type'	=>	'text',
		),

);

?>