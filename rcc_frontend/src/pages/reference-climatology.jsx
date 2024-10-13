import axios from 'axios';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect, useCallback } from 'react';
import '../App.css';
import L from 'leaflet';
import parseGeoraster from 'georaster';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import reference from '../public/refferece-climatology.jpg'

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
        console.log(georaster);


        const rasterLayer = new GeoRasterLayer({
          georaster,
          opacity: 1,
          resolution: 128,
          source: tiffUrl,  
          noDataValue: NaN,   
          pixelValuesToColorFn: values => {
            const pixelValue = values[0];
        
            return pixelValue === georaster.noDataValue || isNaN(pixelValue)
              ? null // Transparent for No Data values
              : (pixelValue >= 0 && pixelValue <= 15
                  ? `rgba(0, 0, 255, ${pixelValue / 15})` // Blue scale for valid data
                  : 'rgba(0,0,0,0)'); // Transparent for other invalid data
          },
          
        
        });
        console.log('Raster Layer:', rasterLayer);
        rasterLayer.addTo(map);
        map.fitBounds(rasterLayer.getBounds());

        setGeoRasterLayer(rasterLayer);
      } catch (error) {
        console.error("Error loading raster layer:", error);
      }
    };

    addRasterLayer();
  }, [tiffUrl]);

  return null;
}

function Climatology() {
  const [tempType, setTempType] = useState('mean');
  const [season, setSeason] = useState('annual');
  const [tiffUrl, setTiffUrl] = useState(null);
  const [geoRasterLayer, setGeoRasterLayer] = useState(null);

  const handleTempChange = (e) => {
    setTempType(e.target.value);
  };

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
        setTiffUrl(image.tiff_file);
      } else {
        setTiffUrl(null);
      }
    })
    .catch(error => {
      console.error('Error fetching the tiff image:', error);
      setTiffUrl(null);
    });
  }, [tempType, season]);

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

        let labels = `<strong class="text-sm">${season} - ${tempType.charAt(0).toUpperCase() + tempType.slice(1)} Temperature</strong><br>`;

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
    <div className='container'>
      <div
        className="relative w-full bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${reference})`, height: '70vh',width: '100vw'  }}
      >
        <h2 className="text-4xl font-bold pt-60 pl-10">Reference Climatology</h2>
      </div>
      <div className='ml-6'>
      <div className="flex justify-between items-center px-4 py-2">
        <select onChange={handleTempChange} value={tempType} className="px-4 py-2 border rounded-md bg-gray-100 text-gray-700">
          <option value="mean">Mean Temperature</option>
          <option value="max">Max Temperature</option>
          <option value="min">Min Temperature</option>
        </select>

        <select onChange={handleSeasonChange} value={season} className="px-4 py-2 border rounded-md bg-gray-100 text-gray-700">
          <option value="annual">Annual</option>
          <option value="MAM">Seasonal - MAM</option>
          <option value="JJAS">Seasonal - JJAS</option>
          <option value="OND">Seasonal - OND</option>
        </select>
      </div>
      <div className="h-screen">
        <MapContainer center={[9, 20]} zoom={4} className="h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <RasterLayer tiffUrl={tiffUrl} geoRasterLayer={geoRasterLayer} setGeoRasterLayer={setGeoRasterLayer} />
          <Legend />
        </MapContainer>
      </div>
      </div>
    </div>
  );
}

export default Climatology;
