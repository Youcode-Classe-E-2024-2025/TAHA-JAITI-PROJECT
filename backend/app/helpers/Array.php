<?php

function parseStringToArray($array) {
    if ($array === null || $array === '{NULL}') return null;
    $array = trim($array, '{}');
    if (empty($array)) return [];
    return array_map(function($item) {
        return trim($item, '"');
    }, explode(',', $array));
}