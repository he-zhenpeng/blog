var posts=["email/","giffgaff/","Rustdesk/","Caddy/","CF-Tun-IPv6/","Alice/","winSDB/","GitHub/","hy2/","webssh/","nezha-argo/","qinglong-independence/","node-ws/","nezha-id/","readme/","hexo/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };