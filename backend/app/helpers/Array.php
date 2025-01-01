<?php

function parseStringToArray($string) {
    $string = trim($string, '{}');

    // Decode the JSON-like string into an array
    $array = json_decode("[$string]", true);

    return $array ?: null;
}