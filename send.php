<?php
header('Content-Type: application/json; charset=utf-8');
date_default_timezone_set('Asia/Ashgabat');

if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 2097152) {
    http_response_code(413);
    echo json_encode(['ok' => false, 'err' => 'Payload too large']);
    exit;
}

$ADMIN_PASS = 'aynazar2026';
$DATA_DIR = __DIR__ . '/data';
if (!is_dir($DATA_DIR)) @mkdir($DATA_DIR, 0755, true);
if (!file_exists($DATA_DIR . '/.htaccess')) @file_put_contents($DATA_DIR . '/.htaccess', "Require all denied\nDeny from all\n");
if (!file_exists($DATA_DIR . '/index.php')) @file_put_contents($DATA_DIR . '/index.php', "<?php http_response_code(403); exit; ?>");

$STATS_FILE = $DATA_DIR . '/stats.json';
$ORDERS_FILE = $DATA_DIR . '/orders_live.json';
$SETTINGS_FILE = $DATA_DIR . '/settings.json';
$LIMITS_FILE = $DATA_DIR . '/rate_limits.json';
$BAZA_FILE = __DIR__ . '/baza_live.json';
$BAZA_JS_FILE = __DIR__ . '/baza.js';

function updateJsonAtomic($file, $def, callable $cb) {
    $fp = @fopen($file, 'c+');
    if (!$fp) {
        $d = $def; $r = $cb($d);
        @file_put_contents($file, json_encode($d, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
        return $r;
    }
    flock($fp, LOCK_EX);
    $raw = stream_get_contents($fp);
    $d = $raw ? json_decode($raw, true) : $def;
    if (!is_array($d)) $d = $def;
    $r = $cb($d);
    ftruncate($fp, 0); rewind($fp);
    fwrite($fp, json_encode($d, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    fflush($fp); flock($fp, LOCK_UN); fclose($fp);
    return $r;
}

function readJsonSafe($file, $def) {
    if (!file_exists($file)) return $def;
    $fp = @fopen($file, 'r');
    if (!$fp) return $def;
    flock($fp, LOCK_SH);
    $raw = stream_get_contents($fp);
    flock($fp, LOCK_UN); fclose($fp);
    $d = $raw ? json_decode($raw, true) : $def;
    return is_array($d) ? $d : $def;
}

function getBazaList($jsonFile, $jsFile) {
    $list = readJsonSafe($jsonFile, []);
    if (!empty($list)) return $list;
    if (file_exists($jsFile)) {
        $raw = preg_replace('/^\s*var\s+githubBaza\s*=\s*/', '', @file_get_contents($jsFile));
        $dec = json_decode(preg_replace('/;\s*$/', '', trim($raw)), true);
        if (is_array($dec) && !empty($dec)) {
            updateJsonAtomic($jsonFile, [], function (&$d) use ($dec) { $d = $dec; });
            return $dec;
        }
    }
    return [];
}

function getSettings($file) {
    $def = ['m1' => 'aycyzuw.tm.arkadag@gmail.com', 'm2' => 'aycyzuw.tm2026@gmail.com', 'sms' => '+99365637644', 'ord_cnt' => 100];
    return array_merge($def, readJsonSafe($file, $def));
}

function checkRate($file, $key, $max, $sec) {
    $now = time();
    return updateJsonAtomic($file, [], function (&$lim) use ($key, $max, $sec, $now) {
        foreach ($lim as $k => $v) if (($v['exp'] ?? 0) < $now) unset($lim[$k]);
        if (!isset($lim[$key])) { $lim[$key] = ['cnt' => 1, 'exp' => $now + $sec]; return true; }
        if ($lim[$key]['cnt'] >= $max) return false;
        $lim[$key]['cnt']++; return true;
    });
}

function cleanStr($str, $max = 300) {
    $s = str_replace(["\r", "\n"], ' ', strip_tags(trim((string)$str)));
    if (mb_strlen($s, 'UTF-8') > $max) $s = mb_substr($s, 0, $max, 'UTF-8');
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ipHash = substr(md5($ip), 0, 12);
$today = date('Y-m-d');

if ($method === 'GET') {
    if (($_GET['action'] ?? '') === 'visit') {
        updateJsonAtomic($STATS_FILE, ['total_views' => 0, 'days' => [], 'searches' => []], function (&$st) use ($today, $ip) {
            if (!isset($st['days'][$today])) $st['days'][$today] = ['views' => 0, 'orders' => 0, 'rev' => 0, 'ips' => []];
            $dip = substr(md5($ip . $today), 0, 12);
            if (!in_array($dip, $st['days'][$today]['ips'])) {
                $st['days'][$today]['ips'][] = $dip;
                $st['days'][$today]['views']++;
                $st['total_views'] = ($st['total_views'] ?? 0) + 1;
                if (count($st['days']) > 14) $st['days'] = array_slice($st['days'], -14, 14, true);
            }
        });
        $cfg = getSettings($SETTINGS_FILE);
        echo json_encode(['ok' => true, 'sms' => $cfg['sms']], JSON_UNESCAPED_UNICODE);
        exit;
    }
    echo json_encode(['ok' => false]); exit;
}

if ($method !== 'POST') { http_response_code(405); echo json_encode(['ok' => false]); exit; }
$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) { http_response_code(400); echo json_encode(['ok' => false]); exit; }

$action = $data['action'] ?? 'order';

if ($action === 'search_log') {
    if (checkRate($LIMITS_FILE, 'srch_' . $ipHash, 30, 60)) {
        $term = preg_replace('/[<>"\'\\\\]/u', '', mb_strtolower(trim((string)($data['q'] ?? '')), 'UTF-8'));
        if (mb_strlen($term, 'UTF-8') >= 2 && mb_strlen($term, 'UTF-8') <= 40) {
            updateJsonAtomic($STATS_FILE, ['total_views' => 0, 'days' => [], 'searches' => []], function (&$st) use ($term) {
                $st['searches'][$term] = ($st['searches'][$term] ?? 0) + 1;
                arsort($st['searches']);
                $st['searches'] = array_slice($st['searches'], 0, 50, true);
            });
        }
    }
    echo json_encode(['ok' => true]); exit;
}

if ($action === 'auth') {
    if (!checkRate($LIMITS_FILE, 'auth_' . $ipHash, 5, 900)) {
        http_response_code(429); echo json_encode(['ok' => false, 'err' => '15 minut garaşyň']); exit;
    }
    echo json_encode(['ok' => hash_equals($ADMIN_PASS, (string)($data['pass'] ?? ''))]); exit;
}

$isAdmin = hash_equals($ADMIN_PASS, (string)($data['pass'] ?? ''));

if ($action === 'get_admin_data') {
    if (!$isAdmin) { http_response_code(401); echo json_encode(['ok' => false]); exit; }
    $st = readJsonSafe($STATS_FILE, ['total_views' => 0, 'days' => [], 'searches' => []]);
    $days = [];
    foreach (($st['days'] ?? []) as $d => $v) $days[$d] = ['views' => $v['views'] ?? 0, 'orders' => $v['orders'] ?? 0, 'rev' => $v['rev'] ?? 0];
    echo json_encode([
        'ok' => true, 'today' => $today, 'total_views' => $st['total_views'] ?? 0,
        'days' => $days, 'searches' => $st['searches'] ?? [],
        'orders' => array_slice(array_reverse(readJsonSafe($ORDERS_FILE, [])), 0, 80),
        'settings' => getSettings($SETTINGS_FILE)
    ], JSON_UNESCAPED_UNICODE); exit;
}

if ($action === 'save_settings') {
    if (!$isAdmin) { http_response_code(401); echo json_encode(['ok' => false]); exit; }
    $m1 = filter_var(trim((string)($data['m1'] ?? '')), FILTER_VALIDATE_EMAIL) ?: 'aycyzuw.tm.arkadag@gmail.com';
    $m2 = filter_var(trim((string)($data['m2'] ?? '')), FILTER_VALIDATE_EMAIL) ?: '';
    $sms = preg_replace('/[^0-9+ ]/', '', trim((string)($data['sms'] ?? '+99365637644'))) ?: '+99365637644';
    updateJsonAtomic($SETTINGS_FILE, [], function (&$s) use ($m1, $m2, $sms) {
        $s['m1'] = $m1; $s['m2'] = $m2; $s['sms'] = $sms;
        if (!isset($s['ord_cnt'])) $s['ord_cnt'] = 100;
    });
    echo json_encode(['ok' => true]); exit;
}

if ($action === 'save_baza') {
    if (!$isAdmin) { http_response_code(401); echo json_encode(['ok' => false]); exit; }
    if (is_array($data['items'] ?? null)) updateJsonAtomic($BAZA_FILE, [], function (&$d) use ($data) { $d = $data['items']; });
    echo json_encode(['ok' => true]); exit;
}

if ($action === 'order_status') {
    if (!$isAdmin) { http_response_code(401); echo json_encode(['ok' => false]); exit; }
    $oid = (string)($data['id'] ?? ''); $st = cleanStr($data['status'] ?? 'Täze', 30);
    updateJsonAtomic($ORDERS_FILE, [], function (&$ords) use ($oid, $st) {
        foreach ($ords as &$o) if (($o['id'] ?? '') === $oid) { $o['status'] = $st; break; }
    });
    echo json_encode(['ok' => true]); exit;
}

if ($action === 'delete_order') {
    if (!$isAdmin) { http_response_code(401); echo json_encode(['ok' => false]); exit; }
    $oid = (string)($data['id'] ?? '');
    updateJsonAtomic($ORDERS_FILE, [], function (&$ords) use ($oid) {
        $ords = array_values(array_filter($ords, function ($o) use ($oid) { return ($o['id'] ?? '') !== $oid; }));
    });
    echo json_encode(['ok' => true]); exit;
}
if (!checkRate($LIMITS_FILE, 'ord_' . $ipHash, 4, 60)) {
    http_response_code(429); echo json_encode(['ok' => false, 'err' => 'Gaty köp sargyt, 1 minut garaşyň']); exit;
}

$nm = cleanStr($data['nm'] ?? '', 100);
$ph = cleanStr($data['ph'] ?? '', 30);
$ad = cleanStr($data['ad'] ?? '', 250);
$nt = cleanStr($data['nt'] ?? 'Ýok', 300);
$cityVal = cleanStr($data['city'] ?? 'arkadag', 30);
$items = is_array($data['items'] ?? null) ? $data['items'] : [];

if (!$nm || !$ph || !$ad || !$items) {
    http_response_code(400); echo json_encode(['ok' => false, 'err' => 'Maglumatlar doly däl']); exit;
}

$bazaList = getBazaList($BAZA_FILE, $BAZA_JS_FILE);
$bazaMap = [];
foreach ($bazaList as $idx => $bIt) {
    $bid = trim((string)($bIt['id'] ?? ''));
    if ($bid !== '') $bazaMap[$bid] = $idx;
}

$verified = []; $subTot = 0.0; $lines = [];
foreach ($items as $it) {
    $id = trim((string)($it['id'] ?? ''));
    $reqQ = max(1, (int)($it['q'] ?? 1));
    if ($id === '' || !isset($bazaMap[$id])) continue;
    $bIdx = $bazaMap[$id];
    $avail = max(0, (int)($bazaList[$bIdx]['s'] ?? 0));
    if ($avail <= 0) continue;
    $q = min($reqQ, $avail);
    $p = round(max(0, (float)($bazaList[$bIdx]['p'] ?? 0)), 2);
    $sum = round($p * $q, 2);
    $subTot = round($subTot + $sum, 2);
    $bazaList[$bIdx]['s'] = max(0, $avail - $q);
    $t = cleanStr($bazaList[$bIdx]['t'] ?? ($it['t'] ?? ''), 160);
    $verified[] = ['id' => cleanStr($id, 50), 't' => $t, 'q' => $q, 'p' => $p, 'sum' => $sum, 'img' => trim((string)($it['img'] ?? ''))];
    $lines[] = $t . ' (' . $q . ' × ' . number_format($p, 2, '.', '') . ' m)';
}

if (!$verified) {
    http_response_code(409); echo json_encode(['ok' => false, 'err' => 'Saýlanan harytlar dükanda gutardy']); exit;
}

updateJsonAtomic($BAZA_FILE, [], function (&$d) use ($bazaList) { $d = $bazaList; });

$cities = ['arkadag' => 'Arkadag şäheri', 'gokdepe' => 'Gökdepe', 'ashgabat' => 'Aşgabat şäheri', 'anew' => 'Änew', 'baherden' => 'Bäherden'];
$cityLbl = $cities[$cityVal] ?? 'Arkadag şäheri';
$deliv = ($cityVal === 'arkadag') ? ($subTot >= 200 ? 0.0 : 10.0) : ($cityVal === 'gokdepe' ? 50.0 : ($cityVal === 'ashgabat' ? 70.0 : 100.0));
$grandTot = round($subTot + $deliv, 2);
$subStr = number_format($subTot, 2, '.', '') . ' m';
$delStr = number_format($deliv, 2, '.', '') . ' m (' . $cityLbl . ')';
$totStr = number_format($grandTot, 2, '.', '') . ' m';
$fullAd = $cityLbl . ', ' . $ad;

$invInt = updateJsonAtomic($SETTINGS_FILE, [], function (&$s) { $s['ord_cnt'] = ((int)($s['ord_cnt'] ?? 100)) + 1; return $s['ord_cnt']; });
$invNo = str_pad((string)$invInt, 5, '0', STR_PAD_LEFT);

updateJsonAtomic($STATS_FILE, ['total_views' => 0, 'days' => [], 'searches' => []], function (&$st) use ($today, $grandTot) {
    if (!isset($st['days'][$today])) $st['days'][$today] = ['views' => 1, 'orders' => 0, 'rev' => 0, 'ips' => []];
    $st['days'][$today]['orders']++;
    $st['days'][$today]['rev'] = round(($st['days'][$today]['rev'] ?? 0) + $grandTot, 2);
});

updateJsonAtomic($ORDERS_FILE, [], function (&$ords) use ($invNo, $nm, $ph, $fullAd, $nt, $totStr, $lines) {
    $ords[] = ['id' => '#' . $invNo, 'date' => date('d.m.Y H:i'), 'nm' => $nm, 'ph' => $ph, 'ad' => $fullAd, 'nt' => $nt, 'tot' => $totStr, 'status' => 'Täze', 'det' => implode("\n", $lines)];
    if (count($ords) > 250) $ords = array_slice($ords, -250);
});

$cfg = getSettings($SETTINGS_FILE);
$subj = 'Faktura № ' . $invNo . ' (' . $cityLbl . ' - ' . $totStr . ')';
$html = '<html><body style="font-family:Arial,sans-serif;background:#f5f7fa;padding:15px;"><div style="max-width:600px;margin:0 auto;background:#fff;border-radius:14px;padding:22px;border:1px solid #e2e8f0;"><h2 style="color:#0f4c81;margin-top:0;">AÝ-ÇYZUW — ' . $subj . '</h2><table style="width:100%;font-size:14px;margin-bottom:15px;"><tr><td>Faktura №:</td><td><b>' . $invNo . '</b></td></tr><tr><td>Müşderi:</td><td><b>' . $nm . '</b></td></tr><tr><td>Telefon:</td><td><b>' . $ph . '</b></td></tr><tr><td>Salgy:</td><td><b>' . $fullAd . '</b></td></tr><tr><td>Bellik:</td><td>' . $nt . '</td></tr></table><table style="width:100%;border-collapse:collapse;font-size:13px;table-layout:fixed;"><tr style="background:#edf1f7;text-align:left;"><th style="padding:8px;width:58px;">Surat</th><th style="padding:8px;">Haryt</th><th style="padding:8px;width:85px;text-align:right;">Jemi</th></tr>';

foreach ($verified as $v) {
    $img = (filter_var($v['img'], FILTER_VALIDATE_URL) && preg_match('/^https?:\/\//i', $v['img'])) ? '<img src="' . htmlspecialchars($v['img'], ENT_QUOTES, 'UTF-8') . '" width="45" height="45" style="object-fit:contain;">' : '📦';
    $html .= '<tr style="border-bottom:1px solid #e2e8f0;"><td style="padding:8px;">' . $img . '</td><td style="padding:8px;word-break:break-word;"><b>' . $v['t'] . '</b><br><small style="color:#64748b;">Kod: ' . $v['id'] . ' | ' . $v['q'] . ' × ' . number_format($v['p'], 2, '.', '') . ' m</small></td><td style="padding:8px;font-weight:bold;text-align:right;">' . number_format($v['sum'], 2, '.', '') . ' m</td></tr>';
}
$html .= '</table><div style="margin-top:15px;text-align:right;font-size:14px;">Harytlar: <b>' . $subStr . '</b><br>Eltip bermek: <b>' . $delStr . '</b><br><div style="font-size:18px;color:#0f4c81;margin-top:5px;">JEMI: <b>' . $totStr . '</b></div></div></div></body></html>';

$host = preg_replace('/[^a-zA-Z0-9.-]/', '', $_SERVER['HTTP_HOST'] ?? '') ?: 'aycyzuw.tm';
$hdrs = "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\nFrom: AY-CYZUW <noreply@" . $host . ">\r\nReply-To: " . $cfg['m1'] . "\r\n";
if ($cfg['m2'] && $cfg['m2'] !== $cfg['m1']) $hdrs .= "Cc: " . $cfg['m2'] . "\r\n";

$sent = @mail($cfg['m1'], '=?UTF-8?B?' . base64_encode($subj) . '?=', $html, $hdrs, "-fnoreply@" . $host);
echo json_encode(['ok' => true, 'mail_sent' => $sent, 'invNo' => $invNo, 'totStr' => $totStr, 'subTot' => $subStr, 'deliv' => $delStr, 'fullAd' => $fullAd, 'items' => $verified], JSON_UNESCAPED_UNICODE);
