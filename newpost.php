<?php
if (php_sapi_name() !== 'cli') {
    exit("Jalankan via CLI\n");
}

if ($argc < 2) {
    exit("Gunakan: php newpost.php \"Judul Post\"\n");
}

$title = $argv[1];
$date  = date('Y-m-d');
$slug  = strtolower(trim(preg_replace('/[^a-z0-9]+/i', '-', $title), '-'));

$category = 'Catatan';
$tags     = [];

$postFile = __DIR__ . "/posts/$slug.md";
$jsonFile = __DIR__ . "/posts/posts.json";
$template = __DIR__ . "/templates/post.md";

if (file_exists($postFile)) {
    exit("Post sudah ada!\n");
}

/* ---------- buat markdown ---------- */
$tpl = file_get_contents($template);
$md  = str_replace(
    ['{{title}}', '{{date}}', '{{category}}', '{{tags}}'],
    [$title, $date, $category, implode(', ', $tags)],
    $tpl
);

file_put_contents($postFile, $md);

/* ---------- update posts.json ---------- */
$posts = json_decode(file_get_contents($jsonFile), true);

$posts[] = [
    'title'    => $title,
    'slug'     => $slug,
    'date'     => $date,
    'category' => $category,
    'tags'     => $tags,
    'file'     => "$slug.md"
];

file_put_contents(
    $jsonFile,
    json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
);

echo "✔ Post dibuat: posts/$slug.md\n";
