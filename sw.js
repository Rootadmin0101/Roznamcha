const CACHE_NAME = 'hesab-app-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png' // اگر نام عکس آیکون شما چیز دیگری است، اینجا تغییر دهید
];

// نصب و ذخیره فایل‌ها در حافظه گوشی
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// استفاده از فایل‌های ذخیره شده در زمان قطعی اینترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// به‌روزرسانی حافظه در صورت تغییر کدها
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
