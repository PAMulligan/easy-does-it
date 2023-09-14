<?php

function edi_setup_theme() {
  add_theme_support('editor-styles');

  add_editor_style([
    'assets/bootstrap-icons/bootstrap-icons.css',
    'assets/public/index.css',
    'assets/editor.css'
  ]);
}