//We create an array of all files of our app that we want to cache
const cacheFiles = [
   '/',
   '/index.html',
   '/restaurant.html',
   '/css/styles.css',
   '/js/dbhelper.js',
   '/js/main.js',
   '/js/restaurant_info.js',
   '/data/restaurants.json',
   '/img/1.jpg',
   '/img/2.jpg',
   '/img/3.jpg',
   '/img/4.jpg',
   '/img/5.jpg',
   '/img/6.jpg',
   '/img/7.jpg',
   '/img/8.jpg',
   '/img/9.jpg',
   '/img/10.jpg',


];
//We listen for the installation event when our service worker is registered.
self.addEventListener('install', function(e) {
	e.waitUntil(
		//We open the caches object matching a cache name, and if cache name does not exist, we create one with the cache name
		caches.open('v1').then(function(cache) {
			return cache.addAll(cacheFiles);
		})


		);

});

//We also want to listen for the fetch event and use it.
self.addEventListener('fetch', function(e) {
	e.respondWith(
		//We use the match method to determine if the event request url already exists within the cahce we loaded back in the installation.
		caches.match(e.request).then(function(response) {
			if(response) {
				console.log('Found', e.request, ' in cacahe');
				return response;
				//If there is no cache
			} else {
				console.log('Could not find', e.request, ' in cache, FETCHING !');
				return fetch(e.request)
				//We add it to the catche for later
				.then(function(response) {
				     const clonedResponse = response.clone();
					caches.open('v1').then(function(cache) {
						cache.put(e.request, clonedResponse)
					})
					return response;
				})
				.catch(function(err) {
					console.error(err);
				});
			}
		})

		);
}); 