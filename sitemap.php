<?php
header('Content-Type: application/xml; charset=utf-8');
date_default_timezone_set('Asia/Ashgabat');
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
$host = $_SERVER['HTTP_HOST'] ?? 'aycyzuw.tm';
$baseUrl = $protocol . "://" . $host;
$ns = 'http://www.' . 'sitemaps.org/schemas/sitemap/0.9';

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="<?= $ns ?>">
  <url>
    <loc><?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/</loc>
    <lastmod><?= date('Y-m-d') ?></lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
