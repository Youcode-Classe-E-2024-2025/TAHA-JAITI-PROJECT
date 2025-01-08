<?php

class RedisCache
{
    private $redis;

    public function __construct(){
        $this->redis = new Redis();
        $this->redis->connect('127.0.0.1', 6379);
    }

    public function set($key, $value, $ttl = 3600) {
        $this->redis->set($key, json_encode($value), $ttl);
    }

    public function get($key) {
        $data = $this->redis->get($key);
        return $data ? json_decode($data, true) : null;
    }

    public function delete($key) {
        $this->redis->del($key);
    }

    public function clear() {
        $this->redis->flushDB();
    }
}
