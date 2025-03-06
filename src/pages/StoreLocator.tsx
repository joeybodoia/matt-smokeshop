import React, { useEffect, useRef } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';

const locations = [
  {
    id: 1,
    address: '3579 Wheaton Wy',
    city: 'Bremerton',
    state: 'WA',
    zip: '98310',
    phone: '(360) 555-0101',
    hours: {
      monFri: '10:00 AM - 8:00 PM',
      sat: '10:00 AM - 8:00 PM',
      sun: '11:00 AM - 6:00 PM'
    },
    mapUrl: 'https://www.google.com/maps/place/3579+Wheaton+Way,+Bremerton,+WA+98310',
    coordinates: { lat: 47.591576, lng: -122.620787 }
  },
  {
    id: 2,
    address: '9505 Silverdale Way NW',
    city: 'Silverdale',
    state: 'WA',
    zip: '98383',
    phone: '(360) 555-0102',
    hours: {
      monFri: '10:00 AM - 8:00 PM',
      sat: '10:00 AM - 8:00 PM',
      sun: '11:00 AM - 6:00 PM'
    },
    mapUrl: 'https://www.google.com/maps/place/9505+Silverdale+Way+NW,+Silverdale,+WA+98383',
    coordinates: { lat: 47.656276, lng: -122.686544 }
  },
  {
    id: 3,
    address: '24090 WA-3 STE #E',
    city: 'Belfair',
    state: 'WA',
    zip: '98528',
    phone: '(360) 555-0103',
    hours: {
      monFri: '10:00 AM - 8:00 PM',
      sat: '10:00 AM - 8:00 PM',
      sun: '11:00 AM - 6:00 PM'
    },
    mapUrl: 'https://www.google.com/maps/place/24090+WA-3,+Belfair,+WA+98528',
    coordinates: { lat: 47.451382, lng: -122.826431 }
  }
];

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
          // Calculate center point of all locations
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

          // Add markers for each location
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
      // Cleanup markers
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

      {/* Map Container */}
      <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
        <div ref={mapRef} className="w-full h-[400px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {locations.map((location) => (
          <div key={location.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
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
