<?php
/**
 * Plugin Name: Easy Does It Blocks
 * Plugin URI: https://github.com/PAMulligan/easy-does-it.git
 * Description: Custom blocks for the EDI theme
 * Version: 1.0.0
 * Requires at least: 5.9
 * Requires PHP: 8.2
 * Author: Paul Mulligan
 * Author URI: https://github.com/PAMulligan
 * Text Domain: easy-does-it-blocks
 * Domain Path: /languages
 */

 if (!function_exists('add_action')) {
    echo "Nothing to see here folks";
    exit;
 }

 // Setup
define('EDI_PLUGIN_DIR', plugin_dir_path(__FILE__));

// Includes
$rootFiles = glob(EDI_PLUGIN_DIR . 'includes/*.php');
$subdirectoryFiles = glob(EDI_PLUGIN_DIR . 'includes/**/*.php');
$allFiles = array_merge($rootFiles, $subdirectoryFiles);

foreach($allFiles as $filename) {
  include_once($filename);
}

// Hooks
register_activation_hook(__FILE__, 'edi_activate_plugin');
add_action('init', 'edi_register_blocks');
add_action('after_setup_theme', 'edib_setup_theme');
add_filter('image_size_names_choose', 'edi_custom_image_sizes');