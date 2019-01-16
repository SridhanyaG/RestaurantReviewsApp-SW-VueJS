let staticCacheName = "restaurants-v10";
let urlsToCache = [
  "./",
  "js/sw_create.js",
  "index.html",  
  "restaurant.html",
  "css/styles.css",
  "data/restaurants.json",
  "js/dbhelper.js",
  "js/main.js",
  "js/restaurant_info.js",
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg",
  "img/6.jpg",
  "img/7.jpg",
  "img/8.jpg",
  "img/9.jpg",
  "img/10.jpg",
  "css/lib/bootstrap.min.css",
  'js/lib/jquery-3.2.1.slim.min.js',
  'js/lib/popper.min.js',
  'js/lib/bootstrap.min.js'
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches
      .open(staticCacheName)
      .then(cache => cache.addAll(urlsToCache)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(cacheNames.map(cache => {
      if (cache !== staticCacheName) {
        console.log("sw delete cache ", cache);
        return caches.delete(cache);
      }
    })))
  )
})

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  //these pages are individual resaurant.html?id=x
  if (url.pathname.startsWith('/restaurant.html')) {
      event.respondWith(
          caches.match('restaurant.html')
          .then(response => {
              return response || fetch(event.request)
          })
      );
      return;
  }  
  event.respondWith(  
    caches.match(event.request).then(response => {  
          // Cache hit - return response  
          return response || fetch(event.request);
      }) 
  );  
});