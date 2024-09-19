import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css';
import L from 'leaflet';
import parseGeoraster from 'georaster'; // Import georaster
import GeoRasterLayer from 'georaster-layer-for-leaflet'; // Import GeoRasterLayer

import skill from '../public/skills-diagnostics.png';

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

function Skill() {
  const [dataType, setDataType] = useState('Raw Data');
  const [parameter, setParameter] = useState('Precipitation'); // Default to 'Precipitation'
  const [model, setModel] = useState('NASA-GEOSS');
  const [season, setSeason] = useState('MAM');
  const [leadTime, setLeadTime] = useState('1 Month');
  const [rocType, setRocType] = useState('Correlation');
  const [tiffUrl, setTiffUrl] = useState(null);
  const [geoRasterLayer, setGeoRasterLayer] = useState(null); // Store GeoRasterLayer instance


  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
    // If "Calibrated Data" is chosen, only allow "Precipitation"
    if (e.target.value === 'Calibrated Data') {
      setParameter('Precipitation');
    }
  };

  const fetchTiffImage = useCallback(() => {
    axios.get('http://localhost:8000/api/skill-images/', {
      params: { dataType, parameter,model, season, lead_time: leadTime, roc_type: rocType },
    })
    .then(response => {
      if (response.data.length > 0) {
        const image = response.data[0];
        setTiffUrl(image.tiff_file); // Set the TIFF file URL
      } else {
        setTiffUrl(null);
      }
    })
    .catch(error => {
      console.error('Error fetching the tiff image:', error);
      setTiffUrl(null); // Reset on error
    });
  }, [dataType, parameter, model, season, leadTime, rocType]);

  useEffect(() => {
    fetchTiffImage();
  }, [fetchTiffImage]);

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
        let labels = `<strong class="text-sm">${season} - ${parameter.charAt(0).toUpperCase() + parameter.slice(1)} </strong><br>`;
        
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
        className="relative w-full bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${skill})`, height: '70vh', width: '100vw' }}
      >
        <h2 className="text-4xl font-bold pt-60 pl-10">Skill Diagnostics</h2>
      </div>
      <div className="flex justify-between items-center px-4 py-2">
        {/* Raw/Calibrated Data Selector */}
        <select onChange={handleDataTypeChange} value={dataType}>
          <option value="Raw Data">Raw Data</option>
          <option value="Calibrated Data">Calibrated Data</option>
        </select>

        {/* Precipitation/Temperature Selector (Conditionally Rendered) */}
        {dataType === 'Raw Data' && (
          <select onChange={(e) => setParameter(e.target.value)} value={parameter}>
            <option value="Precipitation">Precipitation</option>
            <option value="Temperature">Temperature</option>
          </select>
        )}

        {/* First Selector (Model) */}
        <select onChange={(e) => setModel(e.target.value)} value={model}>
          <option value="NASA-GEOSS">NASA-GEOSS</option>
          <option value="CCSM4">CCSM4</option>
          <option value="CanCM3">CanCM3</option>
          <option value="GFDL-CM2p5A">GFDL-CM2p5A</option>
          <option value="DWD">DWD</option>
          <option value="MeteoFrance">MeteoFrance</option>
          <option value="ECMWF">ECMWF</option>
          <option value="GFDL-CM2p5B">GFDL-CM2p5B</option>
          <option value="UKMO">UKMO</option>
          <option value="CMCC">CMCC</option>
          <option value="CanCM4i">CanCM4i</option>
          <option value="CFSv2">CFSv2</option>
        </select>

        {/* Second Selector (Season) */}
        <select onChange={(e) => setSeason(e.target.value)} value={season}>
          <option value="MAM">MAM</option>
          <option value="JAS">JAS</option>
          <option value="OND">OND</option>
        </select>

        {/* Third Selector (Lead Time) */}
        <select onChange={(e) => setLeadTime(e.target.value)} value={leadTime}>
          <option value="1 Month">1 Month</option>
          <option value="2 Month">2 Month</option>
        </select>

        {/* Fourth Selector (ROC Type) */}
          <select onChange={(e) => setRocType(e.target.value)} value={rocType}>
          <option value="Correlation">Correlation</option>
          <option value="Root Mean Square Error">Root Mean Square Error</option>
          <option value="Fair Ranked Probability Skill Score">Fair Ranked Probability Skill Score</option>
          <option value="ROC Above">ROC Above</option>
          <option value="ROC Normal">ROC Normal</option>
          <option value="ROC Below">ROC Below</option>
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

export default Skill;
