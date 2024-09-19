import React, { useState, useEffect } from 'react';
import axios from 'axios';
import home from '../public/icpac-home.png';

const Rcm = () => {
  const [model, setModel] = useState('WRF');
  const [baseTime, setBaseTime] = useState('Jan');
  const [leadTime, setLeadTime] = useState('1 Month Lead');
  const [time, setTime] = useState('Monthly');
  const [periodMonths, setPeriodMonths] = useState('');
  const [periodYears, setPeriodYears] = useState(2022);
  const [variable, setVariable] = useState('Precipitation');
  const [parameter, setParameter] = useState('Anomaly');
  const [productArguments, setProductArguments] = useState({});
  const [imageURL, setImageURL] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const seasons = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  const calculatePeriodMonths = () => {
    let updatedPeriodMonths = '';
    let baseIndex = months.indexOf(baseTime);
    if (time === 'Monthly') {
      let leadOffset = leadTime === '1 Month Lead' ? 1 : 2;
      updatedPeriodMonths = months[(baseIndex + leadOffset) % 12];
    } else if (time === 'Seasonal') {
      let leadOffset = leadTime === '1 Month Lead' ? 1 : 2;
      updatedPeriodMonths = seasons.slice((baseIndex + leadOffset), (baseIndex + leadOffset + 3)).join('');
    }
    setPeriodMonths(updatedPeriodMonths);
  };

  const fetchImageData = async (selectedArguments) => {
    try {
      const response = await axios.get('http://localhost:8000/api/rcm-images/', {
        params: selectedArguments,
      });
      if (response.data.length > 0) {
        setImageURL(response.data[0].image_file);
      } else {
        setImageURL('');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      setImageURL('');
    }
  };

  useEffect(() => {
    calculatePeriodMonths();
  }, [baseTime, leadTime, time]);

  useEffect(() => {
    if (isInitialLoad && periodMonths) {
      const initialArguments = {
        model,
        baseTime,
        leadTime,
        time,
        periodMonths,
        periodYears,
        variable,
        parameter,
      };
      setProductArguments(initialArguments);
      fetchImageData(initialArguments);
      setIsInitialLoad(false); // Prevent further API calls until 'Plot' is pressed
    }
  }, [periodMonths]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedArguments = {
      model,
      baseTime,
      leadTime,
      time,
      periodMonths,
      periodYears,
      variable,
      parameter,
    };
    setProductArguments(selectedArguments);
    fetchImageData(selectedArguments);
  };

  const extractFileName = (url) => {
    return url ? url.split('/').pop() : '';
  };

  return (
    <div className="container box-border">
      <div
        className="relative w-full bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${home})`, height: '70vh', width: '99vw' }}
      >
        <div className="absolute bottom-10 left-10">
          <h2 className="text-4xl font-bold">IGAD Regional Climate Center</h2>
          <p className="mt-2">A Climate Center of Excellence Designated By the World Meteorological Department</p>
          <button className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg">
            Give Us Feedback
          </button>
        </div>
      </div>

      <div className="mt-10 ml-10">
        <h1 className="text-2xl font-semibold mb-4">RCM Data Viewer</h1>
        <form onSubmit={handleSubmit} className="flex flex-row justify-start items-end flex-wrap gap-6">
          <div>
            <label className="block mb-2 font-semibold">Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="WRF">WRF</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Base Time</label>
            <select
              value={baseTime}
              onChange={(e) => setBaseTime(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Lead Time</label>
            <select
              value={leadTime}
              onChange={(e) => setLeadTime(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="1 Month Lead">1 Month Lead</option>
              <option value="2 Months Lead">2 Months Lead</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Time</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Monthly">Monthly</option>
              <option value="Seasonal">Seasonal</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Period Years</label>
            <select
              value={periodYears}
              onChange={(e) => setPeriodYears(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {[2017, 2018, 2019, 2020, 2021, 2022].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Variable</label>
            <select
              value={variable}
              onChange={(e) => setVariable(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Precipitation">Precipitation</option>
              <option value="2M-Temperature">2M-Temperature</option>
              <option value="2M-TemperatureMin">2M-TemperatureMin</option>
              <option value="2M-TemperatureMax">2M-TemperatureMax</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Parameter</label>
            <select
              value={parameter}
              onChange={(e) => setParameter(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Anomaly">Anomaly</option>
              <option value="Average">Average</option>
            </select>
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Plot
            </button>
          </div>
        </form>
      </div>

      <div className='flex flex-row gap-1 ml-20 mr-5'>
        {imageURL && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-2">Product Display Results</h2>
            <img src={imageURL} alt="RCM Plot" className="h-4/6" />
          </div>
        )}
        <div className="mt-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-2">Product Display Arguments</h2>
            {Object.entries(productArguments).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <button className="bg-blue-500 text-white rounded-full px-3 py-1">{key}</button>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>
          {imageURL && (
            <div className="flex flex-col gap-4 mt-5"> 
              <h2 className="text-xl font-semibold mb-2">Product Display Result</h2>
              <div className='flex gap-3'>
                <button className="bg-green-500 text-white rounded-full px-3 py-1">Name</button>
                <span className="text-gray-700">{extractFileName(imageURL)}</span>
              </div>
            </div>
          )}
      </div>
      </div>
      </div>
        );
};    

export default Rcm;
