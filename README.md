<!-- <IfModule mod_rewrite.c>
    Options -Multiviews
    RewriteEngine On

    RewriteCond %{REQUEST_URI} ^/api/
    RewriteRule ^api/(.*)$ backend/index.php?url=$1 [QSA,L]

    RewriteCond %{REQUEST_FILENAME} -f
    RewriteRule ^ - [L]

    RewriteRule ^ frontend/index.html [QSA,L]
</IfModule> -->