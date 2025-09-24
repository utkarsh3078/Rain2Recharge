// Geocoding utilities for location services
// You can replace this with your preferred geocoding service

const GEOCODING_CONFIG = {
  // OpenCage Data (free tier: 2,500 requests/day)
  OPENCAGE_API_KEY: import.meta.env.VITE_OPENCAGE_API_KEY || "YOUR_API_KEY",

  // Alternative: Google Geocoding API
  GOOGLE_API_KEY:
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_API_KEY",

  // Alternative: MapBox Geocoding API
  MAPBOX_API_KEY: import.meta.env.VITE_MAPBOX_API_KEY || "YOUR_MAPBOX_API_KEY",
};

export const reverseGeocode = async (lat, lng, provider = "opencage") => {
  try {
    switch (provider) {
      case "opencage":
        return await reverseGeocodeOpenCage(lat, lng);
      case "google":
        return await reverseGeocodeGoogle(lat, lng);
      case "mapbox":
        return await reverseGeocodeMapbox(lat, lng);
      default:
        return await reverseGeocodeOpenCage(lat, lng);
    }
  } catch (error) {
    console.warn("Reverse geocoding failed:", error);
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }
};

export const searchAddresses = async (
  query,
  provider = "opencage",
  limit = 5
) => {
  if (!query.trim()) return [];

  try {
    switch (provider) {
      case "opencage":
        return await searchAddressesOpenCage(query, limit);
      case "google":
        return await searchAddressesGoogle(query, limit);
      case "mapbox":
        return await searchAddressesMapbox(query, limit);
      default:
        return await searchAddressesOpenCage(query, limit);
    }
  } catch (error) {
    console.error("Address search failed:", error);
    return getFallbackLocations(query);
  }
};

// OpenCage Data implementation
const reverseGeocodeOpenCage = async (lat, lng) => {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${GEOCODING_CONFIG.OPENCAGE_API_KEY}`
  );
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    return data.results[0].formatted;
  }
  throw new Error("No results found");
};

const searchAddressesOpenCage = async (query, limit) => {
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      query
    )}&key=${GEOCODING_CONFIG.OPENCAGE_API_KEY}&limit=${limit}`
  );
  const data = await response.json();

  if (data.results) {
    return data.results.map((result, index) => ({
      id: `search_${index}`,
      address: result.formatted,
      coordinates: {
        lat: result.geometry.lat,
        lng: result.geometry.lng,
      },
      type: "search",
      confidence: result.confidence,
    }));
  }
  return [];
};

// Google Geocoding implementation
const reverseGeocodeGoogle = async (lat, lng) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GEOCODING_CONFIG.GOOGLE_API_KEY}`
  );
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    return data.results[0].formatted_address;
  }
  throw new Error("No results found");
};

const searchAddressesGoogle = async (query, limit) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      query
    )}&key=${GEOCODING_CONFIG.GOOGLE_API_KEY}`
  );
  const data = await response.json();

  if (data.results) {
    return data.results.slice(0, limit).map((result, index) => ({
      id: `search_${index}`,
      address: result.formatted_address,
      coordinates: {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
      },
      type: "search",
      placeId: result.place_id,
    }));
  }
  return [];
};

// MapBox implementation
const reverseGeocodeMapbox = async (lat, lng) => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${GEOCODING_CONFIG.MAPBOX_API_KEY}`
  );
  const data = await response.json();

  if (data.features && data.features.length > 0) {
    return data.features[0].place_name;
  }
  throw new Error("No results found");
};

const searchAddressesMapbox = async (query, limit) => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json?access_token=${GEOCODING_CONFIG.MAPBOX_API_KEY}&limit=${limit}`
  );
  const data = await response.json();

  if (data.features) {
    return data.features.map((feature, index) => ({
      id: `search_${index}`,
      address: feature.place_name,
      coordinates: {
        lat: feature.center[1],
        lng: feature.center[0],
      },
      type: "search",
      relevance: feature.relevance,
    }));
  }
  return [];
};

// Fallback mock data when APIs are not available
const getFallbackLocations = (query) => {
  const mockLocations = [
    {
      id: 1,
      address: "123 Oak Street, Austin, TX 78701",
      coordinates: { lat: 30.2672, lng: -97.7431 },
      type: "residential",
    },
    {
      id: 2,
      address: "456 Pine Avenue, Austin, TX 78702",
      coordinates: { lat: 30.2849, lng: -97.7341 },
      type: "residential",
    },
    {
      id: 3,
      address: "789 Maple Drive, Austin, TX 78703",
      coordinates: { lat: 30.2711, lng: -97.7494 },
      type: "residential",
    },
    {
      id: 4,
      address: "321 Cedar Lane, Austin, TX 78704",
      coordinates: { lat: 30.25, lng: -97.75 },
      type: "residential",
    },
  ];

  return mockLocations.filter((location) =>
    location.address.toLowerCase().includes(query.toLowerCase())
  );
};

export default {
  reverseGeocode,
  searchAddresses,
  GEOCODING_CONFIG,
};
