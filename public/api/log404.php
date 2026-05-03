<?php
// Log 404 hits to a JSON file on the server.
// Called via navigator.sendBeacon from the 404 page.

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(204);
    exit;
}

$logFile = __DIR__ . '/404-log.json';
$rateFile = __DIR__ . '/404-rate.json';
$maxEntries = 1000;
$rateLimit = 10; // max hits per IP per minute

// Simple rate limiting
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$now = time();
$rates = file_exists($rateFile) ? json_decode(file_get_contents($rateFile), true) : [];
if (!is_array($rates)) $rates = [];
// Clean old entries
$rates = array_filter($rates, fn($t) => $t > $now - 60);
$ipHits = count(array_filter($rates, fn($t, $k) => str_starts_with($k, $ip . ':'), ARRAY_FILTER_USE_BOTH));
if ($ipHits >= $rateLimit) {
    http_response_code(429);
    exit;
}
$rates[$ip . ':' . $now . ':' . mt_rand()] = $now;
file_put_contents($rateFile, json_encode($rates));

// Read POST body
$input = json_decode(file_get_contents('php://input'), true);
$url = $input['url'] ?? '';
if (!$url || strlen($url) > 500) {
    http_response_code(400);
    exit;
}

// Sanitize: only keep path, strip query/fragment
$url = parse_url($url, PHP_URL_PATH) ?: $url;
$url = substr($url, 0, 200);

// Append to log
$log = file_exists($logFile) ? json_decode(file_get_contents($logFile), true) : [];
if (!is_array($log)) $log = [];

$log[] = [
    'url' => $url,
    'time' => date('c'),
    'ip' => substr(hash('sha256', $ip), 0, 8), // privacy: hashed prefix only
];

// Keep max entries (FIFO)
if (count($log) > $maxEntries) {
    $log = array_slice($log, -$maxEntries);
}

file_put_contents($logFile, json_encode($log, JSON_PRETTY_PRINT));
http_response_code(204);
