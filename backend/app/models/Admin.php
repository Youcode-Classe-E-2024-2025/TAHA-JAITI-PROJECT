<?php

class Admin extends User implements TaskInterface{

    public function __construct($id, $name, $email, $password){
        parent::__construct($id, $name, $email,$password);
    }



}