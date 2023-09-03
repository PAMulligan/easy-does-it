<?php
/**
 * Easy Does It Enqueue Function
 *
 * Enqueues all styles and scripts for this theme.
 *
 * @since 0.1.0
 */
function edi_enqueue() {
    wp_register_style(
        'edi_bootstrap_icons',
        get_theme_file_uri('assets/bootstrap-icons/bootstrap-icons.css')
      );
      wp_register_style(
        'edi_theme',
        get_theme_file_uri('assets/public/index.css')
      );
    
      wp_enqueue_style('edi_bootstrap_icons');
      wp_enqueue_style('edi_theme');
    }