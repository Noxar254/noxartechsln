// Advanced Service Worker for Performance Optimization
const CACHE_NAME = 'noxartech-v2.1';
const STATIC_CACHE = 'noxartech-static-v2.1';
const DYNAMIC_CACHE = 'noxartech-dynamic-v2.1';

// Critical resources to cache immediately
const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/quote.html',
  '/styles.css',
  '/script.js',
  '/config.js',
  '/firebase-config.js',
  '/firebase-performance.js',
  '/direct-email.js',
  '/images/logo.png',
  '/manifest.json'
];

// External resources to cache
const EXTERNAL_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Install event - cache critical resources
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache critical assets
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Service Worker: Caching critical assets');
        return cache.addAll(CRITICAL_ASSETS);
      }),
      // Cache external assets
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Service Worker: Caching external assets');
        return cache.addAll(EXTERNAL_ASSETS);
      })
    ]).then(() => {
      console.log('Service Worker: Installation complete');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== STATIC_CACHE && cache !== DYNAMIC_CACHE) {
            console.log('Service Worker: Deleting old cache', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve cached content with network fallback
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip Firebase API calls
  if (url.hostname.includes('firebase') || url.hostname.includes('googleapis') || url.hostname.includes('emailjs')) {
    return fetch(request);
  }
  
  // Handle different types of requests
  if (url.origin === location.origin) {
    // Same origin requests - use cache first strategy
    event.respondWith(cacheFirstStrategy(request));
  } else {
    // External requests - use stale while revalidate
    event.respondWith(staleWhileRevalidateStrategy(request));
  }
});

// Cache First Strategy - for static assets
async function cacheFirstStrategy(request) {
  try {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log('Service Worker: Serving from cache', request.url);
      return cachedResponse;
    }
    
    console.log('Service Worker: Fetching from network', request.url);
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Service Worker: Fetch failed', error);
    
    // Return fallback for HTML pages
    if (request.destination === 'document') {
      return caches.match('/index.html');
    }
    
    throw error;
  }
}

// Stale While Revalidate Strategy - for external resources
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Fetch from network and update cache in background
  const networkResponsePromise = fetch(request).then(response => {
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(error => {
    console.warn('Service Worker: Network fetch failed', error);
  });
  
  // Return cached version immediately if available
  return cachedResponse || networkResponsePromise;
}

// Performance monitoring
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PERFORMANCE_MEASURE') {
    console.log('Service Worker: Performance measurement', event.data);
  }
});

console.log('Service Worker: Advanced caching and performance optimization loaded');
