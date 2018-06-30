 /**
* Author: Adenagbe Emmanuel Adedayo
* Version: 1.0.0
* Signature: emmadenagbe
* Email: emmadenagbe@gmail.com
* ALC Currency Converter
*/

/* Service Worker Registration */
var cacheName = 'alc-cuc-v2';
var cacheAccess = [
	    
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

	return cacheName.startsWith('alc-') && cacheName !== cacheName;

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
