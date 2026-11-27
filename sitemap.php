<?php
header('Content-Type: application/xml; charset=utf-8');
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
$host = $_SERVER['HTTP_HOST'] ?? 'aycyzuw.tm';
$baseUrl = $protocol . "://" . $host;

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://sitemaps.org">
  <url>
    <loc><?= htmlspecialchars($baseUrl, ENT_QUOTES, 'UTF-8') ?>/</loc>
    <lastmod><?= date('Y-m-d') ?></lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
