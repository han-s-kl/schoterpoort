<?php
// Return aggregated 404 hits sorted by frequency.
// Used by the CMS "404 meldingen" panel.

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-store');

$logFile = __DIR__ . '/404-log.json';

if (!file_exists($logFile)) {
    echo '[]';
    exit;
}

$log = json_decode(file_get_contents($logFile), true);
if (!is_array($log)) {
    echo '[]';
    exit;
}

// Aggregate by URL
$counts = [];
foreach ($log as $entry) {
    $url = $entry['url'] ?? '';
    if (!$url) continue;
    if (!isset($counts[$url])) {
        $counts[$url] = ['url' => $url, 'count' => 0, 'last' => ''];
    }
    $counts[$url]['count']++;
    if (($entry['time'] ?? '') > $counts[$url]['last']) {
        $counts[$url]['last'] = $entry['time'];
    }
}

// Sort by count descending
$result = array_values($counts);
usort($result, fn($a, $b) => $b['count'] - $a['count']);

echo json_encode($result);
