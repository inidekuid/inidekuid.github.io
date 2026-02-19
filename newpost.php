<?php

/**
 * newpost.php
 * Membuat post Markdown baru dari template
 */

if (php_sapi_name() !== 'cli') {
    exit("Jalankan via CLI\n");
}

if ($argc < 2) {
    exit("Gunakan: php newpost.php \"Judul Artikel\"\n");
}

$title = trim($argv[1]);
$date  = date('Y-m-d');

// slug aman
$slug = strtolower(trim(
    preg_replace('/[^a-z0-9]+/i', '-', $title),
    '-'
));

$postsDir = __DIR__ . '/posts';
$templateFile = __DIR__ . '/templates/post.md';
$postsJson = $postsDir . '/posts.json';

$postFile = "$postsDir/$slug.md";

// Validasi
if (!file_exists($templateFile)) {
    exit("Template post.md tidak ditemukan\n");
}

if (file_exists($postFile)) {
    exit("Post sudah ada: $postFile\n");
}

/* ===============================
   Buat file Markdown dari template
   =============================== */
$template = file_get_contents($templateFile);

$markdown = str_replace(
    ['{{title}}'],
    [$title],
    $template
);

file_put_contents($postFile, $markdown);

/* ===============================
   Update posts.json (metadata dasar)
   =============================== */
$posts = [];

if (file_exists($postsJson)) {
    $posts = json_decode(file_get_contents($postsJson), true);
    if (!is_array($posts)) {
        exit("posts.json tidak valid\n");
    }
}

$posts[] = [
    'title' => $title,
    'slug'  => $slug,
    'date'  => $date,
    // category, tags, excerpt akan diisi publish.php
    'file'  => "$slug.md"
];

file_put_contents(
    $postsJson,
    json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
);

echo "✔ Post dibuat: posts/$slug.md\n";
echo "→ Isi tag & category di komentar Markdown\n";
echo "→ Jalankan php publish.php saat siap publish\n";
