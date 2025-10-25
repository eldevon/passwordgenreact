<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 3600");

require_once __DIR__ . '/../src/CharacterClass.php';
require_once __DIR__ . '/../src/RequestValidator.php';
require_once __DIR__ . '/../src/PasswordGenerator.php';

$validator = new RequestValidator();
$result = $validator->validate($_GET);

if (!$result['valid']) {
    http_response_code(400);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'error' => 'Invalid inputs.',
        'details' => $result['errors']
    ]);
    exit;
}

$options = $result['options'];
$generator = new PasswordGenerator();
$password = $generator->generate(
    $options['length'],
    $options['useUpper'],
    $options['useLower'],
    $options['useNumber'],
    $options['useSpecial']
);

echo $password;
