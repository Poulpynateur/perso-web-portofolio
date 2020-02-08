<?php
require __DIR__ . '/../vendor/autoload.php';

/**
 * For developpement web server
 */
if (PHP_SAPI == 'cli-server') {
    $url  = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    if (is_file($file)) {
        return false;
    }
}

session_start();

/**
 * Config
 */
$config = ['settings' => [
    'displayErrorDetails' => true, // set to false in production
    'addContentLengthHeader' => false
]];

return new \Slim\App($config);