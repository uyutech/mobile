# mobile

### nginx配置
```nginx
if ($request_uri ~ ^/[^/]+/$) {
    rewrite ^/([^/]+)/$ /$1 permanent;
}

if ($request_uri ~ /search/(.*)) {
    set $search_param $1;
}

location / {
    index  index.html index.htm;
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host:$server_port;
}

location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host:$server_port;
}

location /follow {
    proxy_pass http://127.0.0.1:8080/follow.html;
    proxy_set_header Host $host:$server_port;
}

location /zhuanquan {
    proxy_pass http://127.0.0.1:8080/zhuanquan.html;
    proxy_set_header Host $host:$server_port;
}

location /find {
    proxy_pass http://127.0.0.1:8080/find.html;
    proxy_set_header Host $host:$server_port;
}

location /my {
    proxy_pass http://127.0.0.1:8080/my.html;
    proxy_set_header Host $host:$server_port;
}

location /search {
    proxy_pass http://127.0.0.1:8080/search.html?$search_param;
    proxy_set_header Host $host:$server_port;
}
```