const staticHCMS = "hcms-site-v1"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/css/styles.css",
  "/js/bootstrap.min.js",
  "/js/in.js",
  "/js/login.js",
  "/js/jquery.min.js",
  "/js/light.js",
  "/js/main.js",
  "/js/upload.js",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticHCMS).then(cache => {
      cache.addAll(assets)
    })
  )
})
self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})