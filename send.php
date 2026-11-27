<?php
header('Content-Type: application/json; charset=utf-8');

$ADMIN_PASS = 'aynazar2026';
$DATA_DIR = __DIR__ . '/data';
if (!is_dir($DATA_DIR)) {
    @mkdir($DATA_DIR, 0755, true);
    @file_put_contents($DATA_DIR . '/.htaccess', "Deny from all\n");
}

$STATS_FILE = $DATA_DIR . '/stats.json';
$ORDERS_FILE = $DATA_DIR . '/orders_live.json';
$BAZA_FILE = __DIR__ . '/baza_live.json';

function readJson($file, $def) {
    if (!file_exists($file)) return $def;
    $raw = @file_get_contents($file);
    $d = json_decode($raw, true);
    return is_array($d) ? $d : $def;
}

function writeJson($file, $data) {
    @file_put_contents($file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$today = date('Y-m-d');

if ($method === 'GET') {
    if (($_GET['action'] ?? '') === 'visit') {
        $stats = readJson($STATS_FILE, ['total_views' => 0, 'days' => [], 'searches' => []]);
        if (!isset($stats['days'][$today])) {
            $stats['days'][$today] = ['views' => 0, 'orders' => 0, 'rev' => 0, 'ips' => []];
        }
        $ipHash = substr(md5($ip . $today), 0, 12);
        if (!in_array($ipHash, $stats['days'][$today]['ips'])) {
            $stats['days'][$today]['ips'][] = $ipHash;
            $stats['days'][$today]['views'] += 1;
            $stats['total_views'] = ($stats['total_views'] ?? 0) + 1;
            if (count($stats['days']) > 14) {
                $stats['days'] = array_slice($stats['days'], -14, 14, true);
            }
            writeJson($STATS_FILE, $stats);
        }
        echo json_encode(['ok' => true]);
        exit;
    }
    echo json_encode(['ok' => false]);
    exit;
}

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false]);
    exit;
}

$action = $data['action'] ?? 'order';

if ($action === 'search_log') {
    $term = mb_strtolower(trim((string)($data['q'] ?? '')), 'UTF-8');
    if (mb_strlen($term, 'UTF-8') >= 2 && mb_strlen($term, 'UTF-8') <= 40) {
        $stats = readJson($STATS_FILE, ['total_views' => 0, 'days' => [], 'searches' => []]);
        $stats['searches'][$term] = ($stats['searches'][$term] ?? 0) + 1;
        arsort($stats['searches']);
        $stats['searches'] = array_slice($stats['searches'], 0, 50, true);
        writeJson($STATS_FILE, $stats);
    }
    echo json_encode(['ok' => true]);
    exit;
}

if ($action === 'auth') {
    echo json_encode(['ok' => hash_equals($ADMIN_PASS, (string)($data['pass'] ?? ''))]);
    exit;
}

if ($action === 'get_admin_data') {
    if (!hash_equals($ADMIN_PASS, (string)($data['pass'] ?? ''))) { http_response_code(401); exit; }
    $stats = readJson($STATS_FILE, ['total_views' => 0, 'days' => [], 'searches' => []]);
    $cleanDays = [];
    foreach (($stats['days'] ?? []) as $d => $info) {
        $cleanDays[$d] = ['views' => $info['views'] ?? 0, 'orders' => $info['orders'] ?? 0, 'rev' => $info['rev'] ?? 0];
    }
    $orders = readJson($ORDERS_FILE, []);
    echo json_encode([
        'ok' => true, 'today' => $today, 'total_views' => $stats['total_views'] ?? 0,
        'days' => $cleanDays, 'searches' => $stats['searches'] ?? [],
        'orders' => array_slice(array_reverse($orders), 0, 60)
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($action === 'save_baza') {
    if (!hash_equals($ADMIN_PASS, (string)($data['pass'] ?? ''))) { http_response_code(401); exit; }
    if (is_array($data['items'] ?? null)) writeJson($BAZA_FILE, $data['items']);
    echo json_encode(['ok' => true]);
    exit;
}

if ($action === 'order_status') {
    if (!hash_equals($ADMIN_PASS, (string)($data['pass'] ?? ''))) { http_response_code(401); exit; }
    $oid = (string)($data['id'] ?? '');
    $st = (string)($data['status'] ?? 'Täze');
    $orders = readJson($ORDERS_FILE, []);
    foreach ($orders as &$o) { if (($o['id'] ?? '') === $oid) { $o['status'] = $st; break; } }
    writeJson($ORDERS_FILE, $orders);
    echo json_encode(['ok' => true]);
    exit;
}
function clean($str) {
    return htmlspecialchars(strip_tags(trim((string)$str)), ENT_QUOTES, 'UTF-8');
}

$defaultTo1 = 'aycyzuw.tm.arkadag@gmail.com';
$defaultTo2 = 'aycyzuw.tm2026@gmail.com';

$to1 = (!empty($data['to']) && filter_var($data['to'], FILTER_VALIDATE_EMAIL)) ? $data['to'] : $defaultTo1;
$to2 = (!empty($data['cc']) && filter_var($data['cc'], FILTER_VALIDATE_EMAIL)) ? $data['cc'] : $defaultTo2;

$subject = clean($data['subject'] ?? 'AÝ-ÇYZUW Täze Sargyt');
$invNo = clean($data['invNo'] ?? '');
$nm = clean($data['nm'] ?? '');
$ph = clean($data['ph'] ?? '');
$ad = clean($data['ad'] ?? '');
$nt = clean($data['nt'] ?? 'Ýok');
$subTot = clean($data['subTot'] ?? '0.00 m');
$deliv = clean($data['deliv'] ?? '0.00 m');
$totStr = clean($data['totStr'] ?? '0.00 m');
$totNum = (float)($data['totNum'] ?? 0);

if (empty($nm) || empty($ph) || empty($ad)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'err' => 'Missing fields']);
    exit;
}

$stats = readJson($STATS_FILE, ['total_views' => 0, 'days' => [], 'searches' => []]);
if (!isset($stats['days'][$today])) {
    $stats['days'][$today] = ['views' => 1, 'orders' => 0, 'rev' => 0, 'ips' => []];
}
$stats['days'][$today]['orders'] += 1;
$stats['days'][$today]['rev'] = round(($stats['days'][$today]['rev'] ?? 0) + $totNum, 2);
writeJson($STATS_FILE, $stats);

$items = is_array($data['items'] ?? null) ? $data['items'] : [];
$summaryLines = [];
foreach ($items as $it) {
    $summaryLines[] = clean($it['t'] ?? '') . ' (' . (int)($it['q'] ?? 1) . ' × ' . number_format((float)($it['p'] ?? 0), 2) . ' m)';
}

$liveOrders = readJson($ORDERS_FILE, []);
$liveOrders[] = [
    'id' => '#' . $invNo, 'date' => date('d.m.Y H:i'), 'nm' => $nm,
    'ph' => $ph, 'ad' => $ad, 'nt' => $nt, 'tot' => $totStr,
    'status' => 'Täze', 'det' => implode("\n", $summaryLines)
];
if (count($liveOrders) > 200) $liveOrders = array_slice($liveOrders, -200);
writeJson($ORDERS_FILE, $liveOrders);

$html = '<html><body style="font-family:Arial,sans-serif;background:#f5f7fa;padding:15px;">';
$html .= '<div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:14px;padding:22px;border:1px solid #e2e8f0;">';
$html .= '<h2 style="color:#0f4c81;margin-top:0;">AÝ-ÇYZUW — ' . $subject . '</h2>';
$html .= '<table style="width:100%;font-size:14px;margin-bottom:15px;border-collapse:collapse;">';
$html .= '<tr><td style="padding:5px 0;color:#64748b;">Faktura №:</td><td><b>' . $invNo . '</b></td></tr>';
$html .= '<tr><td style="padding:5px 0;color:#64748b;">Müşderi:</td><td><b>' . $nm . '</b></td></tr>';
$html .= '<tr><td style="padding:5px 0;color:#64748b;">Telefon:</td><td><b><a href="tel:' . str_replace(' ', '', $ph) . '">' . $ph . '</a></b></td></tr>';
$html .= '<tr><td style="padding:5px 0;color:#64748b;">Salgy:</td><td><b>' . $ad . '</b></td></tr>';
$html .= '<tr><td style="padding:5px 0;color:#64748b;">Bellik:</td><td>' . $nt . '</td></tr></table>';

$html .= '<table style="width:100%;border-collapse:collapse;font-size:13px;">';
$html .= '<tr style="background:#edf1f7;text-align:left;"><th style="padding:8px;">Surat</th><th style="padding:8px;">Haryt</th><th style="padding:8px;">Jemi</th></tr>';

foreach ($items as $it) {
    $t = clean($it['t'] ?? ''); $id = clean($it['id'] ?? '');
    $q = max(1, (int)($it['q'] ?? 1));
    $p = number_format((float)($it['p'] ?? 0), 2, '.', '');
    $sum = number_format($q * (float)($it['p'] ?? 0), 2, '.', '');
    $rawImg = trim((string)($it['img'] ?? ''));
    $validImg = (filter_var($rawImg, FILTER_VALIDATE_URL) && preg_match('/^https?:\/\//i', $rawImg)) ? htmlspecialchars($rawImg, ENT_QUOTES, 'UTF-8') : '';
    $imgTag = $validImg ? '<img src="' . $validImg . '" width="50" height="50" style="object-fit:contain;border-radius:6px;border:1px solid #e2e8f0;">' : '📦';
    $html .= '<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;width:60px;">' . $imgTag . '</td><td style="padding:8px;"><b>' . $t . '</b><br><span style="color:#64748b;font-size:11px;">Kod: ' . $id . ' | ' . $q . ' × ' . $p . ' m</span></td><td style="padding:8px;font-weight:bold;white-space:nowrap;">' . $sum . ' m</td></tr>';
}
$html .= '</table><div style="margin-top:15px;text-align:right;font-size:14px;"><div>Harytlar: <b>' . $subTot . '</b></div><div>Eltip bermek: <b>' . $deliv . '</b></div><div style="font-size:18px;color:#0f4c81;margin-top:5px;">JEMI TÖLEG: <b>' . $totStr . '</b></div></div></div></body></html>';

$host = preg_replace('/[^a-zA-Z0-9.-]/', '', $_SERVER['HTTP_HOST'] ?? '') ?: 'aycyzuw.tm';
$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\nFrom: AY-CYZUW <noreply@" . $host . ">\r\nReply-To: " . $to1 . "\r\n";
if ($to2 && $to2 !== $to1) $headers .= "Cc: " . $to2 . "\r\n";

$sent = @mail($to1, '=?UTF-8?B?' . base64_encode($subject) . '?=', $html, $headers, "-fnoreply@" . $host);
echo json_encode(['ok' => true, 'mail_sent' => $sent]);
