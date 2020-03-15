<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

function loadJson($path) {
    $strJsonFileContents = file_get_contents($path);
    return json_decode($strJsonFileContents, true);
}

function loadAndRender($targetLang) {
    $skills = loadJson(__DIR__.'/../ressources/'.$targetLang.'/skills.json');
    $projects = loadJson(__DIR__.'/../ressources/'.$targetLang.'/projects.json');

    $lang = loadJson(__DIR__.'/../ressources/'.$targetLang.'/lang.json');

    return [
        'skills' => $skills,
        'projects' => $projects,
        'lang' => $lang
    ];
}

$app->get('/', function (Request $request, Response $response) {
    return $this->view->render($response, 'home.html', loadAndRender('fr'));
});
$app->get('/fr', function (Request $request, Response $response) {
    return $this->view->render($response, 'home.html', loadAndRender('fr'));
});
$app->get('/eng', function (Request $request, Response $response) {
    return $this->view->render($response, 'home.html', loadAndRender('eng'));
});