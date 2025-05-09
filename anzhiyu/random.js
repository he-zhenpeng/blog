var posts=["2025/05/08/hy2/","2025/05/08/webssh/","2025/05/05/readme/","2025/05/03/node-ws/","2025/05/03/nezha-argo/","2025/05/03/nezha-id/","2025/05/03/qinglong-independence/","2025/05/01/hexo-document/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };