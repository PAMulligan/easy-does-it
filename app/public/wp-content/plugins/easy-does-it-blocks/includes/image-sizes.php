<?php

function edi_custom_image_sizes($sizes)
{
    return array_merge($sizes, [
        'ediLogo' => __('EDI Logo', 'easy-does-it-blocks')
    ]);
}