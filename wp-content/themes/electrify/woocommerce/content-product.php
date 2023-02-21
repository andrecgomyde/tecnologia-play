<?php
/**
 * The template for displaying product content within loops
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @author  WooThemes
 * @package WooCommerce/Templates
 * @version 3.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

global $product, $woocommerce_loop;

// Store loop count we're currently on
if ( empty( $woocommerce_loop['loop'] ) )
	$woocommerce_loop['loop'] = 0;

// Store column count for displaying the grid
if ( empty( $woocommerce_loop['columns'] ) )
	$woocommerce_loop['columns'] = apply_filters( 'loop_shop_columns', 4 );

// Ensure visibility
if ( empty( $product ) || ! $product->is_visible() ) {
	return;
}

// Increase loop count
$woocommerce_loop['loop']++;
 
// Extra post classes
if( 3 == $woocommerce_loop['columns'] ){
    $classes[] = 'col-md-4';
} else {
    $classes[] = 'col-md-3';
}

global $post, $product;
$columns           = apply_filters( 'woocommerce_product_thumbnails_columns', 4 );
$post_thumbnail_id = get_post_thumbnail_id( $post->ID );
$full_size_image   = wp_get_attachment_image_src( $post_thumbnail_id, 'full' );
$image_title       = get_post_field( 'post_excerpt', $post_thumbnail_id );
$placeholder       = has_post_thumbnail() ? 'with-images' : 'without-images';
$wrapper_classes   = apply_filters( 'woocommerce_single_product_image_gallery_classes', array(
	'woocommerce-product-gallery',
	'woocommerce-product-gallery--' . $placeholder,
	'woocommerce-product-gallery--columns-' . absint( $columns ),
	'images',
) );

?>
<div <?php post_class( $classes ); ?>>
	<?php
	/**
	 * woocommerce_before_shop_loop_item hook.
	 *
	 * @hooked woocommerce_template_loop_product_link_open - 10
	 */
	do_action( 'woocommerce_before_shop_loop_item' );

	/**
	 * woocommerce_before_shop_loop_item_title hook.
	 *
	 * @hooked woocommerce_show_product_loop_sale_flash - 10
	 * (Removed by Pixel8es) @hooked woocommerce_template_loop_product_thumbnail - 10
	 */
	do_action( 'woocommerce_before_shop_loop_item_title' );
	
	?>
	<!-- Woo Product Item -->
	<?php
	$attributes = array(
		'title'                   => $image_title,
		'data-src'                => $full_size_image[0],
		'data-large_image'        => $full_size_image[0],
		'data-large_image_width'  => $full_size_image[1],
		'data-large_image_height' => $full_size_image[2],
	);

	if ( has_post_thumbnail() ) {
		$html = get_the_post_thumbnail( $post->ID, 'shop_catolog', $attributes );
	} else {
		$html = sprintf( '<img src="%s" alt="%s" class="wp-post-image" />', esc_url( wc_placeholder_img_src() ), esc_html__( 'Awaiting product image', 'woocommerce' ) );
	}

	?>

	<div class="staff-container woo-product-item">
			
		<div class="staff-img-con">

			<?php woocommerce_show_product_loop_sale_flash(); ?>

			<div class="staff-img">
						
				<?php echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', $html, get_post_thumbnail_id( $post->ID ) ); ?>
							
				<div class="staff-icons">
					<div class="staff-hover">

						<a href="<?php echo esc_url( $full_size_image[0] ); ?>" class="staff-icon popup-gallery"><i class="pixicon-eleganticons-52"></i></a>

						<a href="<?php echo esc_url( get_permalink() ); ?>" class="staff-icon"><i class="pixicon-eleganticons-3"></i></a>

					</div>
				</div>
			</div>

			<?php woocommerce_template_loop_price(); ?>

		</div>


		<div class="staff-content clearfix">

			<h3 class="title"><?php echo esc_html( get_the_title() ); ?></h3>
			
			<div class='line'></div>

			<?php

			/**
			 * woocommerce_shop_loop_item_title hook.
			 *
			 * @hooked woocommerce_template_loop_product_title - 10
			 */
			do_action( 'woocommerce_shop_loop_item_title' );

			/**
			 * woocommerce_after_shop_loop_item_title hook.
			 *
			 * (Removed by Pixel8es) @hooked woocommerce_template_loop_rating - 5
			 * (Removed by Pixel8es) @hooked woocommerce_template_loop_price - 10
			 */
			do_action( 'woocommerce_after_shop_loop_item_title' );

			woocommerce_template_loop_add_to_cart();
			?>
 
        </div>
 
	</div>
	<?php

	/**
	 * woocommerce_after_shop_loop_item hook.
	 *
	 * @hooked woocommerce_template_loop_product_link_close - 5
	 * (Removed by Pixel8es) @hooked woocommerce_template_loop_add_to_cart - 10
	 */
	do_action( 'woocommerce_after_shop_loop_item' );
	?>
</div>
