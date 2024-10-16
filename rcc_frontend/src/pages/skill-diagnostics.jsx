import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, useMap, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../App.css';
import L from 'leaflet';
import parseGeoraster from 'georaster';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import skill from '../public/skills-diagnostics.png';

const { BaseLayer } = LayersControl;

function RasterLayer({ tiffUrl, geoRasterLayer, setGeoRasterLayer }) {
  const map = useMap();

  useEffect(() => {
    const addRasterLayer = async () => {
      if (!tiffUrl) {
        if (geoRasterLayer) {
          map.removeLayer(geoRasterLayer);
          setGeoRasterLayer(null);
        }
        return;
      }

      try {
        const response = await fetch(tiffUrl);
        const arrayBuffer = await response.arrayBuffer();
        const georaster = await parseGeoraster(arrayBuffer);

        if (geoRasterLayer) {
          map.removeLayer(geoRasterLayer);
        }

        const rasterLayer = new GeoRasterLayer({
          georaster,
          opacity: 0.7,
          source: tiffUrl,
          zIndex: 1000,
          pixelValuesToColorFn: values => {
            const pixelValue = values[0];
            
            if (pixelValue === georaster.noDataValue || isNaN(pixelValue)) {
              return null; // Transparent for No Data values
            }
          
            // Define a color scale based on the pixel value (0 to 15)
            const min = 0;
            const max = 15;
            
            // Normalized value between 0 and 1
            const normalizedValue = (pixelValue - min) / (max - min);
            
            // Gradient from blue (0) to green (0.5) to red (1)
            const r = Math.round(normalizedValue * 255);
            const g = Math.round((1 - Math.abs(normalizedValue - 0.5) * 2) * 255);
            const b = Math.round((1 - normalizedValue) * 255);
            
            return `rgba(${r}, ${g}, ${b}, 1)`; // RGB with full opacity
          }
          
        });

        rasterLayer.addTo(map);
        map.fitBounds(rasterLayer.getBounds());
        setGeoRasterLayer(rasterLayer);
      } catch (error) {
        console.error('Error loading raster layer:', error);
      }
    };

    addRasterLayer();
  }, [tiffUrl]);

  return null;
}

const bounds = [
  [-18, 20],
  [33, 58]
];

function Skill() {
  const [dataType, setDataType] = useState('Raw Data');
  const [parameter, setParameter] = useState('Precipitation');
  const [model, setModel] = useState('NASA-GEOSS');
  const [season, setSeason] = useState('MAM');
  const [leadTime, setLeadTime] = useState('1 Month');
  const [rocType, setRocType] = useState('Correlation');
  const [tiffUrl, setTiffUrl] = useState(null);
  const [geoRasterLayer, setGeoRasterLayer] = useState(null);

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
    if (e.target.value === 'Calibrated Data') {
      setParameter('Precipitation');
    }
  };

  const fetchTiffImage = useCallback(() => {
    axios.get('http://localhost:8000/api/skill-images/', {
      params: { dataType, parameter, model, season, lead_time: leadTime, roc_type: rocType },
    })
      .then(response => {
        if (response.data.length > 0) {
          const image = response.data[0];
          setTiffUrl(image.tiff_file);
        } else {
          setTiffUrl(null);
        }
      })
      .catch(error => {
        console.error('Error fetching the tiff image:', error);
        setTiffUrl(null);
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
        const div = L.DomUtil.create('div', 'info legend bg-white rounded shadow-lg');

        const grades = [-0.8, -0.6, -0.4, -0.2, -0.1, 0, 0.2, 0.4, 0.6, 0.8, 1];
        const colors = ['#08306B', '#08519C', '#2171B5', '#4292C6', '#6BAED6', '#FFFFFF', '#FDAE6B', '#F16913', '#D94801', '#A63603', '#7F2704'];

        let labels = `<strong class="text-sm">${season} - ${parameter.charAt(0).toUpperCase() + parameter.slice(1)} </strong><br>`;

        for (let i = 0; i < grades.length; i++) {
          labels += `
            <span class="inline-block">
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
    <div>
      <div
        className="relative w-full bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${skill})`, width: '100%',
          height: '100%',  }}
      >
        <h2 className="text-4xl font-bold pt-60 pl-10 animate-fade-in pb-10">Skill Diagnostics</h2>
      </div>
      <div className='m-10'>
      <div className="flex flex-wrap justify-between items-center px-4 py-4 bg-gray-100 rounded shadow-lg mt-4 animate-fade-in-left">
        <select onChange={handleDataTypeChange} value={dataType} className="form-select p-2 bg-white rounded border-gray-300 shadow hover:bg-teal-600 focus:bg-teal-600 transition duration-300">
          <option value="Raw Data">Raw Data</option>
          <option value="Calibrated Data">Calibrated Data</option>
        </select>

        {dataType === 'Raw Data' && (
          <select onChange={(e) => setParameter(e.target.value)} value={parameter} className="form-select p-2 bg-white rounded border-gray-300 shadow hover:bg-teal-600 focus:bg-teal-600 transition duration-300">
            <option value="Precipitation">Precipitation</option>
            <option value="Temperature">Temperature</option>
          </select>
        )}

        <select onChange={(e) => setModel(e.target.value)} value={model} className="form-select p-2 bg-white rounded border-gray-300 shadow hover:bg-teal-600 focus:bg-teal-600 transition duration-300">
          <option value="NASA-GEOSS">NASA-GEOSS</option>
          <option value="CCSM4">CCSM4</option>
          <option value="DWD">DWD</option>
          <option value="ECMWF">ECMWF</option>
        </select>

        <select onChange={(e) => setSeason(e.target.value)} value={season} className="form-select p-2 bg-white rounded border-gray-300 shadow hover:bg-teal-600 focus:bg-teal-600 transition duration-300">
          <option value="MAM">MAM</option>
          <option value="JAS">JAS</option>
          <option value="OND">OND</option>
        </select>

        <select onChange={(e) => setLeadTime(e.target.value)} value={leadTime} className="form-select p-2 bg-white rounded border-gray-300 shadow hover:bg-teal-600 focus:bg-teal-600 transition duration-300">
          <option value="1 Month">1 Month</option>
          <option value="2 Month">2 Month</option>
        </select>

        <select onChange={(e) => setRocType(e.target.value)} value={rocType} className="form-select p-2 bg-white rounded border-gray-300 shadow hover:bg-teal-600 focus:bg-teal-600 transition duration-300">
          <option value="Correlation">Correlation</option>
          <option value="Root Mean Square Error">Root Mean Square Error</option>
          <option value="ROC Above">ROC Above</option>
          <option value="ROC Normal">ROC Normal</option>
          <option value="ROC Below">ROC Below</option>
        </select>
      </div>

      <div className="h-screen ">
        <MapContainer center={[9, 20]}  zoom={5} maxBounds={bounds} 
        minZoom={4}  className="h-full">
        <LayersControl position="topright">
        <BaseLayer  name="Stadia Dark">
        <TileLayer
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
       </BaseLayer>
        <BaseLayer  name="OpenStreetMap">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>
        <BaseLayer checked name="Esri World Imagery">
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </BaseLayer>
      <BaseLayer  name="Esri World Terrain">
      <TileLayer
        attribution='Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}"
      />
    </BaseLayer>
    <BaseLayer name="ICPAC Drought Watch">
      <TileLayer
        attribution='&copy; <a href="https://eahazardswatch.icpac.net/">ICPAC Drought Watch</a>'
        url="https://eahazardswatch.icpac.net/tileserver-gl/styles/droughtwatch/{z}/{x}/{y}.png"
        tileSize={512}
        zoomOffset={-1}
      />
    </BaseLayer>
        </LayersControl>

          <RasterLayer tiffUrl={tiffUrl} geoRasterLayer={geoRasterLayer} setGeoRasterLayer={setGeoRasterLayer} />
          <Legend />
        </MapContainer>
      </div>
    </div>
    </div>
  );
}

export default Skill;
