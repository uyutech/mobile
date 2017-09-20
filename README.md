# mobile

### nginx配置
```nginx
if ($request_uri ~ ^/[^/]+/$) {
    rewrite ^/([^/]+)/$ /$1 permanent;
}

if ($request_uri ~ /search/(.*)) {
    set $search_param $1;
}

if ($request_uri ~ /author/(.*)) {
    set $author_param $1;
}

if ($request_uri ~ /works/(.*)) {
    set $works_param $1;
}

location / {
    index  index.html index.htm;
    proxy_pass http://127.0.0.1:8081;
    proxy_set_header Host $host:$server_port;
}

location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ {
    proxy_pass http://127.0.0.1:8081;
    proxy_set_header Host $host:$server_port;
}

location /follow {
    proxy_pass http://127.0.0.1:8081/follow.html;
    proxy_set_header Host $host:$server_port;
}

location /zhuanquan {
    proxy_pass http://127.0.0.1:8081/zhuanquan.html;
    proxy_set_header Host $host:$server_port;
}

location /find {
    proxy_pass http://127.0.0.1:8081/find.html;
    proxy_set_header Host $host:$server_port;
}

location /my {
    proxy_pass http://127.0.0.1:8081/my.html;
    proxy_set_header Host $host:$server_port;
}

location /search {
    proxy_pass http://127.0.0.1:8081/search.html?$search_param;
    proxy_set_header Host $host:$server_port;
}

location /author {
    proxy_pass http://127.0.0.1:8081/author.html?$author_param;
    proxy_set_header Host $host:$server_port;
}

location /works {
    proxy_pass http://127.0.0.1:8081/works.html?$works_param;
    proxy_set_header Host $host:$server_port;
}
```