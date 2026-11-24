<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'err' => 'Method not allowed']);
    exit;
}

// Domen/Origin barlagy
$host = $_SERVER['HTTP_HOST'] ?? '';
$origin = $_SERVER['HTTP_ORIGIN'] ?? ($_SERVER['HTTP_REFERER'] ?? '');
if ($origin && $host) {
    $originHost = parse_url($origin, PHP_URL_HOST);
    if ($originHost && $originHost !== $host) {
        http_response_code(403);
        echo json_encode(['ok' => false, 'err' => 'Forbidden']);
        exit;
    }
}

// Spam goragy (1 IP-den 30 sekuntda diňe 1 sargyt)
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/aycyzuw_rate_' . md5($ip);
if (file_exists($rateFile) && (time() - filemtime($rateFile)) < 30) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'err' => 'Too many requests']);
    exit;
}
@touch($rateFile);

$data = json_decode(file_get_contents('php://input'), true);
if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'err' => 'Invalid data']);
    exit;
}

function clean($str) {
    return htmlspecialchars(strip_tags(trim((string)$str)), ENT_QUOTES, 'UTF-8');
}

// Poçta salgylary howpsuzlyk üçin serverde berkidildi
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

if (empty($nm) || empty($ph) || empty($ad)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'err' => 'Missing required fields']);
    exit;
}

$html = '<html><body style="font-family:Arial,sans-serif;background:#f4f7fb;padding:15px;">';
$html .= '<div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;padding:20px;border:1px solid #e2e8f0;">';
$html .= '<h2 style="color:#13669e;margin-top:0;">AÝ-ÇYZUW — ' . $subject . '</h2>';
$html .= '<table style="width:100%;font-size:14px;margin-bottom:15px;border-collapse:collapse;">';
$html .= '<tr><td style="padding:5px 0;color:#64748b;">Faktura №:</td><td><b>' . $invNo . '</b></td></tr>';
$html .= '<tr><td style="padding:5px 0;color:#64748b;">Müşderi:</td><td><b>' . $nm . '</b></td></tr>';
$html .= '<tr><td style="padding:5px 0;color:#64748b;">Telefon:</td><td><b>' . $ph . '</b></td></tr>';
$html .= '<tr><td style="padding:5px 0;color:#64748b;">Salgy:</td><td><b>' . $ad . '</b></td></tr>';
$html .= '<tr><td style="padding:5px 0;color:#64748b;">Bellik:</td><td>' . $nt . '</td></tr>';
$html .= '</table>';

$html .= '<table style="width:100%;border-collapse:collapse;font-size:13px;">';
$html .= '<tr style="background:#eef2f6;text-align:left;"><th style="padding:8px;">Surat</th><th style="padding:8px;">Haryt</th><th style="padding:8px;">Jemi</th></tr>';

$items = is_array($data['items'] ?? null) ? $data['items'] : [];
foreach ($items as $it) {
    $t = clean($it['t'] ?? '');
    $id = clean($it['id'] ?? '');
    $q = max(1, (int)($it['q'] ?? 1));
    $p = number_format((float)($it['p'] ?? 0), 2, '.', '');
    $sum = number_format($q * (float)($it['p'] ?? 0), 2, '.', '');
    
    $rawImg = trim((string)($it['img'] ?? ''));
    $validImg = (filter_var($rawImg, FILTER_VALIDATE_URL) && preg_match('/^https?:\/\//i', $rawImg)) ? htmlspecialchars($rawImg, ENT_QUOTES, 'UTF-8') : '';
    $imgTag = $validImg ? '<img src="' . $validImg . '" width="50" height="50" style="object-fit:contain;border-radius:6px;border:1px solid #e2e8f0;">' : '📦';

    $html .= '<tr style="border-bottom:1px solid #e2e8f0;">';
    $html .= '<td style="padding:8px;width:60px;">' . $imgTag . '</td>';
    $html .= '<td style="padding:8px;"><b>' . $t . '</b><br><span style="color:#64748b;font-size:11px;">Kod: ' . $id . ' | ' . $q . ' × ' . $p . ' m</span></td>';
    $html .= '<td style="padding:8px;font-weight:bold;white-space:nowrap;">' . $sum . ' m</td>';
    $html .= '</tr>';
}
$html .= '</table>';

$html .= '<div style="margin-top:15px;text-align:right;font-size:14px;">';
$html .= '<div>Harytlar: <b>' . $subTot . '</b></div>';
$html .= '<div>Eltip bermek: <b>' . $deliv . '</b></div>';
$html .= '<div style="font-size:18px;color:#13669e;margin-top:5px;">JEMI TÖLEG: <b>' . $totStr . '</b></div>';
$html .= '</div></div></body></html>';

$cleanHost = preg_replace('/[^a-zA-Z0-9.-]/', '', $host) ?: 'aycyzuw.tm';
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: AY-CYZUW <noreply@" . $cleanHost . ">\r\n";
if ($to2 && $to2 !== $to1) {
    $headers .= "Cc: " . $to2 . "\r\n";
}

$sent = @mail($to1, '=?UTF-8?B?' . base64_encode($subject) . '?=', $html, $headers);
echo json_encode(['ok' => $sent]);
