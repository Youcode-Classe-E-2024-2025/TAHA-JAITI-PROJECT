<?php

//DIR: C:\laragon\www\ADVANCED-TASKFLOW\backend\app

require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/Helpers/Debug.php';
require_once __DIR__ . '/Helpers/Secure.php';
require_once __DIR__ . '/Helpers/Array.php';

//AUTO LOADER
spl_autoload_register(function ($className) {
    $directories = [
        __DIR__ . '/Controllers',
        __DIR__ . '/Core',
        __DIR__ . '/Interfaces',
        __DIR__ . '/Models',
    ];

    $classPath = str_replace('\\', DIRECTORY_SEPARATOR, $className) . '.php';

    foreach ($directories as $directory) {
        $file = $directory . DIRECTORY_SEPARATOR . $classPath;
        if (file_exists($file)) {
            require_once $file;
            return;
        }
    }
});

// class Loader {

//     public function __construct(){
//         spl_autoload_register([$this, 'autoLoad']);
//     }

//     public function autoLoad($classname){
//         $path = str_replace('\\', DIRECTORY_SEPARATOR, $classname) . '.php';

//         $baseDir = __DIR__;

//         $this->scanDirectory($baseDir, $path);
//     }

//     public function scanDirectory($dir, $path){
//         $files = scandir($dir);
//         foreach ($files as $file){
//             if ($file === '..' || $file === '.'){
//                 continue;
//             }

//             if ($file === 'bootstrap.php'){
//                 continue;
//             }

//             $fullPath = $dir . DIRECTORY_SEPARATOR . $file;
//             if (is_dir($fullPath)){
//                 $this->scanDirectory($fullPath, $path);
//             }

//             if(is_file($fullPath) && pathinfo($fullPath, PATHINFO_EXTENSION) === 'php'){
//                 require_once $fullPath;
//             }
//         }
//     }
// }
