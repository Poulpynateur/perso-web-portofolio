<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

$app->get('/', function (Request $request, Response $response) {

    $strJsonFileContents = file_get_contents(__DIR__.'/../ressources/skills.json');
    $skills = json_decode($strJsonFileContents, true);

    $strJsonFileContents = file_get_contents(__DIR__.'/../ressources/projects.json');
    $projects = json_decode($strJsonFileContents, true);

    return $this->view->render($response, 'home.html', [
        'skills' => $skills,
        'projects' => $projects
    ]);
});