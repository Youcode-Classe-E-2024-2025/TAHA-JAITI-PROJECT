import { header } from "./components/header.js";

const root = document.getElementById("root");

if (!root){
    throw new Error('Root not found');
}


function clearRoot(){
    root.innerHTML = "";
    root.innerHTML += header();
}

// document.addEventListener('DOMContentLoaded', clearRoot);