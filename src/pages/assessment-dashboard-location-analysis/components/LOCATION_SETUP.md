# Location Services Setup

The LocationInput component now supports real user location detection and address search. Here's how to set it up:

## Features

✅ **Current Location Detection**: Uses browser's Geolocation API  
✅ **Address Search**: Real-time address autocomplete  
✅ **Multiple Geocoding Providers**: OpenCage, Google Maps, MapBox  
✅ **Privacy Protection**: Location data is handled securely  
✅ **Error Handling**: Graceful fallbacks for various error scenarios  
✅ **Offline Support**: Falls back to mock data when APIs are unavailable

## Setup Instructions

### 1. Choose a Geocoding Provider

**Option A: OpenCage Data (Recommended for development)**

- Free tier: 2,500 requests/day
- Sign up at: https://opencagedata.com/
- Simple to use, good for testing

**Option B: Google Maps Geocoding API**

- Paid service with generous free tier
- More accurate results
- Requires billing account setup

**Option C: MapBox Geocoding API**

- Good balance of features and pricing
- Excellent for mapping applications

### 2. Get API Keys

1. Sign up for your chosen provider
2. Get your API key
3. Copy `.env.example` to `.env`
4. Add your API key to the `.env` file

```bash
# Copy the example file
cp .env.example .env

# Edit the .env file and add your API key
REACT_APP_OPENCAGE_API_KEY=your_actual_api_key_here
```

### 3. Configure the Provider

The geocoding utility automatically uses OpenCage by default. To change the provider, modify the calls in `LocationInput.jsx`:

```javascript
// For Google Maps
const address = await reverseGeocode(latitude, longitude, "google");
const results = await searchAddresses(query, "google");

// For MapBox
const address = await reverseGeocode(latitude, longitude, "mapbox");
const results = await searchAddresses(query, "mapbox");
```

## How It Works

### Current Location Detection

1. **User clicks "Use Current Location"**
2. **Browser prompts for location permission**
3. **Gets GPS coordinates using navigator.geolocation**
4. **Converts coordinates to readable address using reverse geocoding**
5. **Updates the location in the component**

### Address Search

1. **User types in the search box**
2. **After 500ms delay (debounced), search is triggered**
3. **Query is sent to geocoding API**
4. **Results are displayed as clickable options**
5. **User can select any result**

## Privacy & Security

- Location data is only used for the current session
- No location data is stored permanently
- Users must explicitly grant permission
- All API calls are made over HTTPS
- Fallback to coordinates if address lookup fails

## Error Handling

- **Permission Denied**: Shows helpful error message
- **Location Unavailable**: Provides alternative options
- **API Failures**: Falls back to mock data
- **Network Issues**: Graceful degradation

## Testing Without API Keys

The component includes fallback mock data, so you can test the functionality even without API keys. Real location detection will still work for the "Current Location" feature.

## Troubleshooting

**"Location access was denied"**

- User needs to enable location permissions in browser
- Check if site is served over HTTPS (required for geolocation)

**"No search results"**

- Verify API key is correct and has sufficient quota
- Check browser console for API errors
- Ensure internet connection is stable

**Mock data always showing**

- API key might be missing or incorrect
- Check the `.env` file is in the root directory
- Restart the development server after adding API keys
