import axios from 'axios';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect, useCallback } from 'react';
import '../App.css';
import L from 'leaflet';
import parseGeoraster from 'georaster'; // Import georaster
import GeoRasterLayer from 'georaster-layer-for-leaflet'; // Import GeoRasterLayer
import reference from '../public/refferece-climatology.jpg'


function RasterLayer({ tiffUrl, geoRasterLayer, setGeoRasterLayer }) {
  const map = useMap();

  useEffect(() => {
    const addRasterLayer = async () => {
      if (!tiffUrl) {
          // Remove the existing layer if tiffUrl becomes null
      if (geoRasterLayer) {
        map.removeLayer(geoRasterLayer);
        setGeoRasterLayer(null); // Clear the GeoRasterLayer state
      }
      return; // Exit the function
    }

    try {
        const response = await fetch(tiffUrl);
        const arrayBuffer = await response.arrayBuffer();
        const georaster = await parseGeoraster(arrayBuffer);

        // Remove previous layer if it exists
        if (geoRasterLayer) {
          map.removeLayer(geoRasterLayer);
        }

        // Create and add new raster layer
        const rasterLayer = new GeoRasterLayer({
          georaster,
          opacity: 0.7,
          source: tiffUrl, // Store the source of this layer
        });

        rasterLayer.addTo(map);
        map.fitBounds(rasterLayer.getBounds());

        // Store the current raster layer for future reference
        setGeoRasterLayer(rasterLayer);
      } catch (error) {
        console.error("Error loading raster layer:", error);
      }
    };

    addRasterLayer(); // Call the function

    // Only re-run when tiffUrl or geoRasterLayer changes
  }, [tiffUrl]);

  return null; // This component does not render anything
}


function Climatology() {
  const [tempType, setTempType] = useState('mean');
  const [season, setSeason] = useState('annual');
  const [tiffUrl, setTiffUrl] = useState(null);
  const [geoRasterLayer, setGeoRasterLayer] = useState(null); // Store GeoRasterLayer instance

  // Handle temperature type change
  const handleTempChange = (e) => {
    setTempType(e.target.value);
  };

  // Handle season type change
  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
  };

  const fetchTiffImage = useCallback(() => {
    axios.get('http://localhost:8000/api/climatology-images/', {
      params: { temperature_type: tempType, season: season },
    })
    .then(response => {
      if (response.data.length > 0) {
        const image = response.data[0];
        
        setTiffUrl(image.tiff_file); // Set the TIFF file URL
      } else {
        setTiffUrl(null)
      }
    })
    .catch(error => {
      console.error('Error fetching the tiff image:', error);
      setTiffUrl(null); // Reset on error
    })
  }, [tempType, season]);

  // Use effect to trigger the fetch when tempType or season changes
 useEffect(() => {
      fetchTiffImage(); 
}, [fetchTiffImage]);

  console.log(tiffUrl)


  function Legend() {
    const map = useMap();
  
    useEffect(() => {
      const legend = L.control({ position: 'bottomright' });
  
      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend  bg-white rounded shadow-lg');
  
        // Grade values and color codes
        const grades = [-0.8, -0.6, -0.4, -0.2, -0.1, 0, 0.2, 0.4, 0.6, 0.8, 1];
        const colors = ['#08306B', '#08519C', '#2171B5', '#4292C6', '#6BAED6', '#FFFFFF', '#FDAE6B', '#F16913', '#D94801', '#A63603', '#7F2704'];
  
        // Build the labels
        let labels = `<strong class="text-sm">${season} - ${tempType.charAt(0).toUpperCase() + tempType.slice(1)} Temperature</strong><br>`;
        
        // Create the grade labels and color boxes in horizontal (landscape) format
        for (let i = 0; i < grades.length; i++) {
          labels += `
            <span class="inline-block ">
              <i style="background:${colors[i]}; width: 20px; height: 10px; display:block;"></i>
              ${grades[i]}
            </span>
          `;
        }
  
        div.innerHTML = labels;
        return div;
      };
  
      legend.addTo(map);
  
      return () => {
        legend.remove();
      };
    }, [map]);
  
    return null;
  }

  return (
    <div className='container'>
      <div
        className="relative w-full  bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${reference})`, height: '70vh', width: '100vw'}}
      >
        <h2 className="text-4xl font-bold pt-60 pl-10">Reference Climatology</h2>
      </div>
      <div className="flex justify-between items-center px-4 py-2">
        {/* Temperature Type Selector */}
        <select onChange={handleTempChange} value={tempType}>
          <option value="mean">Mean Temperature</option>
          <option value="max">Max Temperature</option>
          <option value="min">Min Temperature</option>
        </select>

        {/* Season Type Selector */}
        <select onChange={handleSeasonChange} value={season}>
          <option value="annual">Annual</option>
          <option value="MAM">Seasonal - MAM</option>
          <option value="JJAS">Seasonal - JJAS</option>
          <option value="OND">Seasonal - OND</option>
        </select>
      </div>
      <div className="h-screen">
        <MapContainer center={[0, 0]} zoom={2} className="h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
            <RasterLayer tiffUrl={tiffUrl} geoRasterLayer={geoRasterLayer} setGeoRasterLayer={setGeoRasterLayer} />
          <Legend />
        </MapContainer>
      </div>
    </div>
  );
}

export default Climatology;
