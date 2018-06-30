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
	  'https://github.com/emmanzley/alc3currencyconverter.github.io',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/index.html',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/css/font-awesome.min.css',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/css/lightbox.min.css',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/css/materialize.min.css',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/css/owl.carousel.css',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/css/owl.theme.css',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/css/owl.transitions.css',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/css/slick.css',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/css/slick-theme.css',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/css/style.css',
	
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/js/alc_app.js',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/js/custom.js',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/js/lightbox.min.js',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/js/materialize.min.js',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/js/owl.carousel.min.js',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/js/slick.min.js',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/img/1.jpg',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/img/2.jpg',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/img/3.jpg',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/img/4.jpg',
	  'https://github.com/emmanzley/alc3currencyconverter.github.io/img/favicon.png',
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
