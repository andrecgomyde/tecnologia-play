<?php
/**
 * Pixel8es Custom Walker
 *
 * @access      public
 * @since       1.0 
 * @return      void
*/
class Pix_Menu_Extend_Walker extends Walker_Nav_Menu
{
    private $img;
    function start_lvl( &$output, $depth = 0, $args = array() ) {
        $indent = str_repeat("\t", $depth);
        $style = $pix_images_gallery = $images_gallery = $img = '';
        if($this->img){
            $pix_images_gallery = htmlspecialchars_decode($this->img);
            $images_gallery = json_decode($pix_images_gallery,true);

            if(!empty($images_gallery)){
                $image_thumb_url = wp_get_attachment_image_src( $images_gallery[0]['itemId'], 'full');

                if(!empty($image_thumb_url)){
                    $img = $image_thumb_url[0];
                }

            }
            $style = ' style="background-image: url('. $img .'); background-repeat: no-repeat; background-position: right bottom;"';
        }
        $output .= "\n$indent<ul class=\"sub-menu\"$style>\n";
    }

    function end_lvl( &$output, $depth = 0, $args = array() ) {
        $indent = str_repeat("\t", $depth);
        $output .= "$indent</ul>\n";
    }

    function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 )
    {
        $indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

        $class_names = $value = '';

        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;

        //Build Icon HTML
        if( !empty( $item->icon )){
            $icon = '<i class="menu-icon '.$item->icon.'"></i> ';
            $classes[] = 'pix-icon-menu';
        }else{
            $icon = '';
        }

        $col = '';
        if( $depth == 0){
            if($item->megamenu){
                $classes[] = 'pix-megamenu';
                $col = $item->megamenucol;
                if(isset($col) && ($col == 2 || $col == 3 || $col == 4 || $col == 5 || $col == 6)){
                    $classes[] = 'pix-megamenu-col'.$col;
                }
                if(isset($col) && ($col == 2)){
                    if(!$item->megamenupos){
                         $classes[] = 'pix-megamenu-pos-left';
                    }
                }
            }else{
                $classes[] = 'pix-submenu';
            }
        }

        if($item->megamenubgimg){
            $this->img = $item->megamenubgimg;
        }else{
            $this->img = '';
        }
        
        if( $depth == 1){
            if( $item->megamenutitle ){
                $classes[] = 'pix-hide-menu-title';
            }
        }

        $hashed_url = ( isset( $item->url ) && !empty( $item->url ) ) ? $item->url : '#';

        if(!empty($hashed_url)){
            $hashed_url = explode('#', $hashed_url);
            if(isset($hashed_url[1]) && !empty($hashed_url[1])){
                $menu_item_class = '';
            }else{
                $menu_item_class = ' class="external"';
                $classes[] = 'external';
            }
        }

        /**
         * Filter the CSS class(es) applied to a menu item's <li>.
         *
         * @since 3.0.0
         *
         * @param array  $classes The CSS classes that are applied to the menu item's <li>.
         * @param object $item    The current menu item.
         * @param array  $args    An array of arguments. @see wp_nav_menu()
         */
        $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );
        $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';



        /**
         * Filter the ID applied to a menu item's <li>.
         *
         * @since 3.0.1
         *
         * @param string The ID that is applied to the menu item's <li>.
         * @param object $item The current menu item.
         * @param array $args An array of arguments. @see wp_nav_menu()
         */
        $id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args );
        $id = $id ? ' id="' . esc_attr( $id ) . '"' : '';

        $output .= $indent . '<li' . $id . $value . $class_names .'>';

        $atts = array();
        $atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
        $atts['target'] = ! empty( $item->target )     ? $item->target     : '';
        $atts['rel']    = ! empty( $item->xfn )        ? $item->xfn        : '';
        $atts['href']   = ! empty( $item->url )        ? $item->url        : '';

        



        /**
         * Filter the HTML attributes applied to a menu item's <a>.
         *
         * @since 3.6.0
         *
         * @param array $atts {
         *     The HTML attributes applied to the menu item's <a>, empty strings are ignored.
         *
         *     @type string $title  The title attribute.
         *     @type string $target The target attribute.
         *     @type string $rel    The rel attribute.
         *     @type string $href   The href attribute.
         * }
         * @param object $item The current menu item.
         * @param array  $args An array of arguments. @see wp_nav_menu()
         */
        $atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args );

        $attributes = '';
        foreach ( $atts as $attr => $value ) {
          if ( ! empty( $value ) ) {
            $value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
            $attributes .= ' ' . $attr . '="' . $value . '"';
        }
    }

    $item_output = $args->before;
    $item_output .= '<a'. $attributes . $menu_item_class .'>';
    /** This filter is documented in wp-includes/post-template.php */
    $item_output .= $icon . $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
    $item_output .= '</a>';
    $item_output .= $args->after;

        /**
         * Filter a menu item's starting output.
         *
         * The menu item's starting output only includes $args->before, the opening <a>,
         * the menu item's title, the closing </a>, and $args->after. Currently, there is
         * no filter for modifying the opening and closing <li> for a menu item.
         *
         * @since 3.0.0
         *
         * @param string $item_output The menu item's starting HTML output.
         * @param object $item        Menu item data object.
         * @param int    $depth       Depth of menu item. Used for padding.
         * @param array  $args        An array of arguments. @see wp_nav_menu()
         */
        $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
    }
}