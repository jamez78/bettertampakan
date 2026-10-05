import { useEffect } from 'react';

import L from 'leaflet';
// Fix Leaflet default marker icon issue in Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

import { config } from '@/lib/lguConfig';

const MARKER_LABEL = `${config.lgu.name} town centre (approximate)`;

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface LeafletHTMLElement extends HTMLElement {
  _leaflet_id?: number;
}

export default function WeatherMapSection() {
  // Initialize Leaflet map
  useEffect(() => {
    const container = document.getElementById('map-container');
    if (!container) {
      console.log('Map: Container not found');
      return;
    }

    // If map already exists, clean it up first
    const containerLeaflet = container as LeafletHTMLElement;
    if (containerLeaflet._leaflet_id) {
      containerLeaflet.innerHTML = '';
      delete containerLeaflet._leaflet_id;
    }

    let mapInstance: L.Map | null = null;

    // Check if Leaflet is available
    if (typeof L === 'undefined') {
      console.error('Map: Leaflet not loaded');
      return;
    }

    try {
      console.log('Map: Initializing Leaflet...');

      // Create the map
      mapInstance = L.map(container, {
        center: [
          config.location.coordinates.lat,
          config.location.coordinates.lon,
        ],
        zoom: 15,
        scrollWheelZoom: false,
        zoomControl: true,
        keyboard: true,
        keyboardPanDelta: 80,
      });

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstance);

      // Add marker
      const marker = L.marker([
        config.location.coordinates.lat,
        config.location.coordinates.lon,
      ]).addTo(mapInstance);
      const popupContent = document.createElement('div');
      popupContent.textContent = MARKER_LABEL;
      const popupSub = document.createElement('div');
      popupSub.textContent = `${config.lgu.province}, Philippines`;
      popupContent.appendChild(popupSub);
      marker.bindPopup(popupContent);

      // Force resize after a short delay to ensure proper rendering
      setTimeout(() => {
        if (mapInstance) {
          mapInstance.invalidateSize();
          console.log('Map: Initial resize complete');
        }
      }, 100);

      // Another resize after tiles might have loaded
      setTimeout(() => {
        if (mapInstance) {
          mapInstance.invalidateSize();
          console.log('Map: Secondary resize complete');
        }
      }, 500);

      console.log('Map: Leaflet initialized successfully');
    } catch (error) {
      console.error('Map: Initialization failed:', error);
    }

    return () => {
      if (mapInstance) {
        console.log('Map: Cleaning up map instance');
        try {
          mapInstance.remove();
        } catch (e) {
          console.warn('Map: Cleanup warning:', e);
        }
      }
    };
  }, []);

  return (
    <section className='border-kapwa-border-weak border-t py-12 bg-kapwa-bg-surface'>
      <div className='container px-4 mx-auto'>
        {/* Header - restored */}
        <div className='mb-12 text-center'>
          <h2 className='text-2xl font-bold md:text-3xl text-kapwa-text-strong'>
            Map of {config.lgu.name}
          </h2>
        </div>

        <div className='flex flex-col items-stretch gap-6 md:flex-row'>
          {/* Map Container */}
          <div className='flex w-full flex-col overflow-hidden rounded-xl shadow-sm hover:shadow-md '>
            <div
              id='map-container'
              className='h-64 w-full md:flex-1'
              role='application'
              aria-label={`Interactive map of ${MARKER_LABEL}`}
            >
              <noscript>
                <div className='text-kapwa-text-disabled p-4 text-sm'>
                  JavaScript is required to view the interactive map.
                  <a
                    href={`https://www.openstreetmap.org/?mlat=${config.location.coordinates.lat}&mlon=${config.location.coordinates.lon}#map=15/${config.location.coordinates.lat}/${config.location.coordinates.lon}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-kapwa-text-brand ml-1 underline'
                  >
                    View {MARKER_LABEL} on OpenStreetMap
                  </a>
                </div>
              </noscript>
            </div>
            <div className='border-kapwa-border-weak bg-kapwa-bg-surface flex items-center gap-2 border-t p-3'>
              <MapPin className='text-kapwa-text-brand h-5 w-5' />
              <span className='text-kapwa-text-support text-sm font-medium'>
                {MARKER_LABEL}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
