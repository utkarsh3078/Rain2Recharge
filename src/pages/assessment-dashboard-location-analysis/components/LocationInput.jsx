import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { reverseGeocode, searchAddresses } from "../../../utils/geocoding";

const LocationInput = ({ onLocationSelect, selectedLocation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUsingGPS, setIsUsingGPS] = useState(false);
  const [showPrivacyMessage, setShowPrivacyMessage] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

<<<<<<< HEAD
  // Handle address search with debouncing
  const handleAddressSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
=======
  const mockLocations = [
    {
      id: 1,
      address: "Ladpura, Kota, Rajasthan,India 324001",
      coordinates: { lat: 25.1737, lng: 75.8574 },
      type: "residential"
    },
    {
      id: 2,
      address: " Rohini, North West Delhi, Delhi 110085 ",
      coordinates: { lat: 28.71962, lng: 77.06618 },
      type: "residential"
    },
    {
      id: 3,
      address: "Jehanabad, Bihar, India 804408",
      coordinates: { lat: 25.21893, lng: 84.99058 },
      type: "residential"
>>>>>>> 3b1c99dce1662e78ef5792ed042b1dc8c30490aa
    }

    try {
      const results = await searchAddresses(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Address search failed:", error);
      setSearchResults([]);
    }
  };

  const handleGPSLocation = () => {
    setIsUsingGPS(true);
    setShowPrivacyMessage(true);
<<<<<<< HEAD
    setLocationError(null);

    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
=======
    
    // Mock GPS detection
    setTimeout(() => {
      const mockGPSLocation = {
        id: 'gps',
        address: "Current Location - Sector 16 C, Dwarka, New Delhi, Delhi 110078",
        coordinates: { lat: 28.59486, lng: 77.01783 },
        type: "current"
      };
      onLocationSelect(mockGPSLocation);
>>>>>>> 3b1c99dce1662e78ef5792ed042b1dc8c30490aa
      setIsUsingGPS(false);
      setShowPrivacyMessage(false);
      return;
    }

    // Get current position
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Get address from coordinates
          const address = await reverseGeocode(latitude, longitude);

          const currentLocation = {
            id: "gps",
            address: `Current Location - ${address}`,
            coordinates: { lat: latitude, lng: longitude },
            type: "current",
            accuracy: position.coords.accuracy,
          };

          onLocationSelect(currentLocation);
        } catch (error) {
          console.error("Error processing location:", error);
          // Still provide coordinates even if reverse geocoding fails
          const currentLocation = {
            id: "gps",
            address: `Current Location - ${latitude.toFixed(
              6
            )}, ${longitude.toFixed(6)}`,
            coordinates: { lat: latitude, lng: longitude },
            type: "current",
          };
          onLocationSelect(currentLocation);
        }

        setIsUsingGPS(false);
        setShowPrivacyMessage(false);
      },
      (error) => {
        let errorMessage = "Unable to get your location. ";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Location access was denied.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage += "Location request timed out.";
            break;
          default:
            errorMessage += "An unknown error occurred.";
            break;
        }

        setLocationError(errorMessage);
        setIsUsingGPS(false);
        setShowPrivacyMessage(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleAddressSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="bg-white rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="MapPin" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            Location Input
          </h3>
          <p className="text-sm text-text-secondary">
            Find your property to begin assessment
          </p>
        </div>
      </div>
      {/* Search Input */}
      <div className="space-y-4">
        <Input
          label="Search Address"
          type="text"
          placeholder="Enter your address or property location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="mb-4"
        />

        {/* GPS Button */}
        <Button
          variant="outline"
          fullWidth
          onClick={handleGPSLocation}
          disabled={isUsingGPS}
          loading={isUsingGPS}
          iconName="Navigation"
          iconPosition="left"
        >
          {isUsingGPS ? "Detecting Location..." : "Use Current Location"}
        </Button>

        {/* Privacy Message */}
        {showPrivacyMessage && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon
                name="Shield"
                size={16}
                color="var(--color-primary)"
                className="mt-0.5"
              />
              <div className="text-sm">
                <p className="text-blue-800 font-medium">Privacy Protected</p>
                <p className="text-blue-600">
                  Your location data is encrypted and never shared with third
                  parties.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Location Error */}
        {locationError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon
                name="AlertTriangle"
                size={16}
                color="var(--color-error)"
                className="mt-0.5"
              />
              <div className="text-sm">
                <p className="text-red-800 font-medium">Location Error</p>
                <p className="text-red-600">{locationError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && searchResults.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-text-primary">
              Search Results
            </p>
            {searchResults.map((location) => (
              <button
                key={location?.id}
                onClick={() => onLocationSelect(location)}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 hover:border-primary hover:bg-primary/5 ${
                  selectedLocation?.id === location?.id
                    ? "border-primary bg-primary/5"
                    : "border-border"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    name="MapPin"
                    size={16}
                    color="var(--color-text-secondary)"
                  />
                  <span className="text-sm text-text-primary">
                    {location?.address}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* No Results */}
        {searchQuery && searchResults.length === 0 && (
          <div className="text-center py-4">
            <Icon
              name="Search"
              size={24}
              color="var(--color-text-secondary)"
              className="mx-auto mb-2"
            />
            <p className="text-sm text-text-secondary">
              No locations found for "{searchQuery}"
            </p>
          </div>
        )}

        {/* Selected Location */}
        {selectedLocation && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Icon name="Check" size={16} color="var(--color-success)" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">
                  Location Selected
                </p>
                <p className="text-sm text-green-600">
                  {selectedLocation?.address}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Interactive Map Placeholder */}
      <div className="mt-6 h-64 bg-gray-100 rounded-lg border border-border overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Property Location Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${
            selectedLocation?.coordinates?.lat || 30.2672
          },${
            selectedLocation?.coordinates?.lng || -97.7431
          }&z=15&output=embed`}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default LocationInput;
