import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';

const locations = [
  {
    id: 1,
    address: '3579 Wheaton Wy',
    city: 'Bremerton',
    state: 'WA',
    zip: '98310',
    phone: '(360) 377-2117',
    hours: {
      monFri: '8:00 AM - 8:00 PM',
      sat: '8:00 AM - 8:00 PM',
      sun: '9:00 AM - 7:00 PM'
    },
    mapUrl: 'https://www.google.com/maps/place/3579+Wheaton+Way,+Bremerton,+WA+98310',
    coordinates: { lat: 47.591576, lng: -122.620787 },
    images: [
      'https://i.imgur.com/go50RhH.png',
      'https://i.imgur.com/YA8dRbR.png',
      'https://i.imgur.com/hw5NLh2.png',
      'https://i.imgur.com/Xcpbf8g.png'
    ]
  },
  {
    id: 2,
    address: '9505 Silverdale Way NW',
    city: 'Silverdale',
    state: 'WA',
    zip: '98383',
    phone: '(360) 517-2099',
    hours: {
      monFri: '9:00 AM - 9:00 PM',
      sat: '9:00 AM - 9:00 PM',
      sun: '9:00 AM - 9:00 PM'
    },
    mapUrl: 'https://www.google.com/maps/place/9505+Silverdale+Way+NW,+Silverdale,+WA+98383',
    coordinates: { lat: 47.656276, lng: -122.686544 },
    images: [
      'https://i.imgur.com/2aSoRwf.png',
      'https://i.imgur.com/IiqUiwi.png',
      'https://i.imgur.com/Gyz6XPA.png'
    ]
  },
  {
    id: 3,
    address: '24090 WA-3 STE #E',
    city: 'Belfair',
    state: 'WA',
    zip: '98528',
    phone: '(360) 275-4604',
    hours: {
      monFri: '9:00 AM - 9:00 PM',
      sat: '9:00 AM - 9:00 PM',
      sun: '9:00 AM - 9:00 PM'
    },
    mapUrl: 'https://www.google.com/maps/place/24090+WA-3,+Belfair,+WA+98528',
    coordinates: { lat: 47.451382, lng: -122.826431 },
    images: [
      'https://i.imgur.com/KeLkXQ7.png',
      'https://i.imgur.com/0A2Tlvi.png',
      'https://i.imgur.com/pvqPRaA.png',
      'https://i.imgur.com/qgWb6wk.png'
    ]
  }
];

const ImageGallery = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <div className="aspect-video relative overflow-hidden rounded-lg">
        <img
          src={images[currentIndex]}
          alt={`Store view ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex justify-center mt-2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const StoreLocator = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyBE91tY5lTTAM0PwHCO6UdIJ4ID8YwvmF0',
        version: 'weekly'
      });

      try {
        const google = await loader.load();
        
        if (mapRef.current) {
          const bounds = new google.maps.LatLngBounds();
          locations.forEach(location => {
            bounds.extend(location.coordinates);
          });

          const map = new google.maps.Map(mapRef.current, {
            center: bounds.getCenter(),
            zoom: 10,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          googleMapRef.current = map;
          map.fitBounds(bounds);

          locations.forEach(location => {
            const marker = new google.maps.Marker({
              position: location.coordinates,
              map: map,
              title: `${location.city} Location`,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#9333ea',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
              }
            });

            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div class="p-2">
                  <h3 class="font-semibold">${location.city} Location</h3>
                  <p>${location.address}</p>
                  <p>${location.city}, ${location.state} ${location.zip}</p>
                  <p class="mt-2">
                    <a href="${location.mapUrl}" target="_blank" style="color: #9333ea; text-decoration: underline;">
                      Get Directions
                    </a>
                  </p>
                </div>
              `
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });

            markersRef.current.push(marker);
          });
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Locations</h1>
        <p className="text-xl text-gray-600">
          Visit one of our convenient locations throughout Washington State
        </p>
      </div>

      <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
        <div ref={mapRef} className="w-full h-[400px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {locations.map((location) => (
          <div key={location.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <ImageGallery images={location.images} />
            
            <div className="p-6">
              <div className="flex items-start space-x-3 mb-4">
                <MapPin className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{location.city} Location</h3>
                  <p className="text-gray-600">
                    {location.address}<br />
                    {location.city}, {location.state} {location.zip}
                  </p>
                  <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 text-sm mt-2 inline-block"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-4">
                <Phone className="h-6 w-6 text-purple-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-gray-600">{location.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 text-purple-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Hours</h4>
                  <div className="text-gray-600">
                    <p>Mon-Fri: {location.hours.monFri}</p>
                    <p>Saturday: {location.hours.sat}</p>
                    <p>Sunday: {location.hours.sun}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4">
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-purple-600 text-white text-center px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
              >
                View on Map
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600">
          All locations are open to customers 21 years and older.<br />
          Please bring a valid ID for age verification.
        </p>
      </div>
    </div>
  );
};

export default StoreLocator;
