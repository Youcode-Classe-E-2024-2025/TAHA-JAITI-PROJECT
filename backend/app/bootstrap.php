<?php

//DIR: C:\laragon\www\ADVANCED-TASKFLOW\backend\app

require_once __DIR__ . '/config/config.php';

class Loader {

    public function __construct(){
        spl_autoload_register([$this, 'autoLoad']);
    }

    public function autoLoad($classname){
        $path = str_replace('\\', DIRECTORY_SEPARATOR, $classname) . '.php';

        $baseDir = __DIR__;

        $this->scanDir($baseDir, $path);
    }

    public function scanDir($dir, $path){
        $files = scandir($dir);

        foreach ($files as $file){
            if ($file === '..' || $file === '.'){
                continue;
            }

            $fullPath = $dir . DIRECTORY_SEPARATOR . $file;

            if (is_dir($fullPath)){
                $this->scanDir($fullPath, $path);
            } elseif (is_file($fullPath) && pathinfo($fullPath, PATHINFO_EXTENSION) === 'php'){
                require_once $fullPath;
            }
        }
    }
}
