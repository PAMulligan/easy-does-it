<?php

function edi_register_blocks()
{
    $blocks = [
        [ 'name' => 'edi-logo' ],
        [ 'name' => 'heading-logo']
    ];

    foreach($blocks as $block) {
        register_block_type(
        EDI_PLUGIN_DIR . 'build/blocks/' . $block['name'],
        isset($block['options']) ? $block['options'] : []
        );
    }
}