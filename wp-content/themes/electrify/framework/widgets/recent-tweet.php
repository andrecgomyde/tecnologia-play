<?php 

class pix_RecentTweet extends WP_Widget {
	
	function __construct(){
		$widget_options = array('classname' => 'recentTweets', 'description' => __('Display Recent Tweets','electrify'));
		parent::__construct('pix_recent_tweets','Pixel8es:: Recent Tweets',$widget_options);
	}
	
	function widget($args, $instance){
		extract($args);
		$title = ($instance['title']) ? $instance['title'] : __('Recent Tweets','electrify');
		$twtUsr = ($instance['twtUsr']) ? $instance['twtUsr'] : 'envato';
		$twtCount = ($instance['twtCount']) ? $instance['twtCount'] : '3';
		$slider = ($instance['slider']) ? $instance['slider'] : 'yes';
		$follow = $instance['displayFollowMeLink'];
		$class = $slider_data = $output = '';
		?>
		<?php echo $before_widget; ?>
		<?php echo $before_title . $title . $after_title ; ?>
		<?php if (!empty($twtUsr)){

			if($slider == 'yes'){
				$class = ' owl-carousel';
				$slider_data = ' data-single-item="true" data-auto-height="true" data-pagination="true" data-touch-drag="true" data-mouse-drag="false" data-stop-on-hover="true" data-navigation="false" data-slide-speed="5000" data-auto-play="true"';
			}else{
				$class = ' no-slider';
			}
			echo '<div class="tweets'. $class .'"'. $slider_data .'>';
			$tweets = getTweets(20, $twtUsr);
			$i = 1;
			foreach($tweets as $tweet){
				if(!empty($tweet['text']) && $tweet['text'] != "T" && $tweet['text'] != "M"){
				        echo '<div class="tweet"><span class="tweet-icon pixicon-twitter"></span><div class="tweet-content">';
					echo make_twitter(link_it($tweet['text']));
					echo '<span class="tweetDate"> - ' . get_elapsedtime(strtotime($tweet['created_at'])) .'</span>';
					echo '</div></div>';
								
					if($i == $twtCount){ break; }
								
					$i++;
				}else{
                                     if(!empty($tweet['text'])){
					echo '<div>' . $tweets['error'] .'</div>';
				   }
				}
			}

			echo '</div>';
		}
		
		if ($follow == "yes"){
			echo '<p>Follow <a href="https://twitter.com/'. $twtUsr .'">@'.$twtUsr.'</a></p>';	
		}
		
		?>
		
		<?php echo $after_widget; ?>
		<?php		
	}

	function form($instance){
		?>
		
		<p><label for="<?php echo $this->get_field_id('title');?>">
		<?php _e('Title:','electrify') ?>
		<input class="widefat" id="<?php echo $this->get_field_id('title');?>" name="<?php echo $this->get_field_name('title');?>" value="<?php echo esc_attr(isset($instance['title']) ? $instance['title'] : ''); ?>" type="text"></label></p>
		
		<p><label for="<?php echo $this->get_field_id('twtUsr');?>">
		<?php _e('Twitter Username (without @ eg:"envato"):','electrify') ?>
		<input class="widefat" id="<?php echo $this->get_field_id('twtUsr');?>" name="<?php echo $this->get_field_name('twtUsr');?>" value="<?php echo esc_attr(isset($instance['twtUsr']) ? $instance['twtUsr'] : ''); ?>" type="text"></label></p>
		
		<p><label for="<?php echo $this->get_field_id('twtCount');?>">
		<?php _e('Tweet Count (Max 20):','electrify') ?>
		<input class="widefat" id="<?php echo $this->get_field_id('twtCount');?>" name="<?php echo $this->get_field_name('twtCount');?>" value="<?php echo esc_attr((isset($instance['title']) || !empty($instance['twtCount']) ? $instance['twtCount'] : '3' )) ; ?>" type="number" style="width:40px;" min="1" max="10"></label></p>

		<p><label for="<?php echo $this->get_field_id('slider');?>">
			<?php _e('Display as slider:','electrify') ?>
			<select id="<?php echo $this->get_field_id('slider');?>" name="<?php echo $this->get_field_name('slider');?>">
				<?php $slider = isset($instance['slider']) ? $instance['slider'] : 'yes';?>
				<option value="yes" <?php selected( $slider, "yes" ); ?>>Yes</option>
				<option value="no" <?php selected( $slider, "no" ); ?>>No</option>
			</select>
		</p>
		
		<p>
			<label><?php _e('Display "Follow Me" Link?','electrify') ?></label> 
			<select id="<?php echo $this->get_field_id('displayFollowMeLink');?>" name="<?php echo $this->get_field_name('displayFollowMeLink');?>">
				<?php $displayFollowMeLink = isset($instance['displayFollowMeLink']) ? $instance['displayFollowMeLink'] : 'no';?>
				<option value="yes" <?php selected( $displayFollowMeLink, "yes" ); ?>>Yes</option>
				<option value="no" <?php selected( $displayFollowMeLink, "no" ); ?>>No</option>
			</select>
		</p>
		
		<?php
	}
	
}

function pix_recent_tweet_widget_init(){
	register_widget('pix_RecentTweet');	
}
add_action('widgets_init','pix_recent_tweet_widget_init');