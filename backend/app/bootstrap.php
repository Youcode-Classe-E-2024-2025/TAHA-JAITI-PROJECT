<?php

//DIR: C:\laragon\www\ADVANCED-TASKFLOW\backend\app

require_once __DIR__ . '/config/config.php';

class Loader {


    public static function load(){
        spl_autoload_register([self::class, 'autoLoad']);
    }


    public static function autoLoad($classname){
        

        $path = str_replace('\\', DIRECTORY_SEPARATOR, $classname) . '.php';

        self::scanDir(__DIR__, $path);
    }


    public static function scanDir($dir, $path){

        $files = scandir($dir);

        foreach ($files as $file){
            if ($file === '..' || $file === '.'){
                continue;
            }

            $fullPath = $dir . DIRECTORY_SEPARATOR . $file;
            
            if (is_dir($fullPath)){
                self::scanDir($fullPath, $path);
            } elseif (is_file($fullPath) && basename($fullPath) === $path){
                
                require_once $fullPath;
                return true;
            }

        }

        return false;
    }
}

Loader::load();
