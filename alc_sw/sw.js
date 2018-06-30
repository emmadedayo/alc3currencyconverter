 /**
* Author: Adenagbe Emmanuel Adedayo
* Version: 1.0.0
* Signature: emmadenagbe
* Email: emmadenagbe@gmail.com
* ALC Currency Converter
*/

/* Service Worker Registration */
var cacheName = 'alc3-cuc-v2';
var cacheAccess = [
	  'https://github.com/emmanzley/alc3currencyconverter',
	  'https://github.com/emmanzley/alc3currencyconverter/index.html',
	  'https://github.com/emmanzley/alc3currencyconverter/css/font-awesome.min.css',
	  'https://github.com/emmanzley/alc3currencyconverter/css/lightbox.min.css',
	  'https://github.com/emmanzley/alc3currencyconverter/css/materialize.min.css',
	  'https://github.com/emmanzley/alc3currencyconverter/css/owl.carousel.css',
	  'https://github.com/emmanzley/alc3currencyconverter/css/owl.theme.css',
	  'https://github.com/emmanzley/alc3currencyconverter/css/owl.transitions.css',
	  'https://github.com/emmanzley/alc3currencyconverter/css/slick.css',
	  'https://github.com/emmanzley/alc3currencyconverter/css/slick-theme.css',
	  'https://github.com/emmanzley/alc3currencyconverter/css/style.css',
	
	  'https://github.com/emmanzley/alc3currencyconverter/js/alc_app.js',
	  'https://github.com/emmanzley/alc3currencyconverter/js/custom.js',
	  'https://github.com/emmanzley/alc3currencyconverter/js/lightbox.min.js',
	  'https://github.com/emmanzley/alc3currencyconverter/js/materialize.min.js',
	  'https://github.com/emmanzley/alc3currencyconverter/js/owl.carousel.min.js',
	  'https://github.com/emmanzley/alc3currencyconverter/js/slick.min.js',
	  'https://github.com/emmanzley/alc3currencyconverter/img/1.jpg',
	  'https://github.com/emmanzley/alc3currencyconverter/img/2.jpg',
	  'https://github.com/emmanzley/alc3currencyconverter/img/3.jpg',
	  'https://github.com/emmanzley/alc3currencyconverter/img/4.jpg',
	  'https://github.com/emmanzley/alc3currencyconverter/img/favicon.png',
	  'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
	  'https://free.currencyconverterapi.com/api/v5/currencies',
	  
];


/* OnState Install */
self.addEventListener('install', function(event){

	console.log('install');
	event.waitUntil(

	caches.open(cacheName).then(function(cache){

	return cache.addAll(cacheAccess);
	})
	);
});

/* OnActivation Install */
self.addEventListener('activate', function(event){

	console.log('activate');

	event.waitUntil(

	caches.keys().then(function(cacheNames){

	return Promise.all(

	cacheNames.filter(function(cacheName){

	return cacheName.startsWith('alc3-') && cacheName !== cacheName;

	}).map(function(cacheName){

	return caches.delete(cacheName);
	}));
		})
	);
});

/* Onfetch State */
self.addEventListener('fetch', function(event){

	console.log('fetch');

	event.respondWith(

	caches.match(event.request).then(function(response){

	if(response){

	return response;	
	}
	return fetch(event.request);
	}));
});

/* Action Result */

	self.addEventListener('message', function(event){

	if(event.data.action == 'skipWaiting'){

	self.skipWaiting();

	}
});
