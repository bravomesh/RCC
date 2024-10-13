import React, { useState, useEffect } from 'react';
import axios from 'axios';
import home from '../public/icpac-home.png';

const Gcm = () => {
  const [model, setModel] = useState('Ensemble Mean');
  const [baseTime, setBaseTime] = useState('Jan');
  const [leadTime, setLeadTime] = useState('1 Month Lead');
  const [time, setTime] = useState('Monthly');
  const [periodMonths, setPeriodMonths] = useState('');
  const [periodYears, setPeriodYears] = useState(2022);
  const [variable, setVariable] = useState('Precipitation');
  const [parameter, setParameter] = useState('Anomaly');
  const [productArguments, setProductArguments] = useState({});
  const [imageURL, setImageURL] = useState('');
  const [method, setMethod] = useState('Regression');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let seasons = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

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
      const response = await axios.get('http://localhost:8000/api/gcm-images/', {
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
  console.log(imageURL)
  useEffect(() => {
    calculatePeriodMonths();
  }, [baseTime, leadTime, time]);

  useEffect(() => {
    if(isInitialLoad && periodMonths){
    const initialArguments = {
      model,
      baseTime,
      leadTime,
      time,
      periodMonths,
      periodYears,
      variable,
      parameter,
      method,
    };
    setProductArguments(initialArguments);
    fetchImageData(initialArguments);
    setIsInitialLoad(false); // Set isInitialLoad to false after initial API call 
  }}, [periodMonths]); // Run initial API call on component load and when periodMonths changes

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
      method,
    };
    setProductArguments(selectedArguments);
    fetchImageData(selectedArguments);
  };
  const extractFileName = (url) => {
    return url ? url.split('/').pop() : '';
  };
  return (
    <div className="  box-border">
    <div className='h-screen'>
    <div
    className="relative  h-screen bg-cover bg-center flex flex-col justify-center text-white pl-10"
    style={{
      backgroundImage: `url(${home})`,
      width: '100%',
      height: '100%', 
    }}
  >
 
    <h2 className="text-5xl font-bold mb-4 animate-fade-in-left">IGAD Regional Climate Center</h2>
    <p className="text-lg mb-6 animate-fade-in-left delay-200">
      A Climate Center of Excellence Designated By the World Meteorological Department
    </p>
    <button className="bg-blue-700 hover:bg-blue-800 transition-transform transform hover:scale-110 rounded-xl px-6 py-3 font-bold w-max animate-bounce-in">
      Give Us Feedback
    </button>
    </div> 
  </div>

      <div className="mt-10 ml-10">
        <h1 className="text-2xl font-semibold mb-4">GCM Data Viewer</h1>
        <form onSubmit={handleSubmit} className="flex flex-row justify-start items-end flex-wrap gap-6">
        <div className="">
        <label className="block mb-2 font-semibold">Model</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="CanSIPS-IC3">CanSIPS-IC3</option>
          <option value="MetF">MetF</option>
          <option value="NCEP-CFSv2">NCEP-CFSv2</option>
          <option value="NASA-GEOSS">NASA-GEOSS</option>
          <option value="GFDL_SPEAR">GFDL_SPEAR</option>
          <option value="COLA-CCSM4">COLA-CCSM4</option>
          <option value="ECMWF">ECMWF</option>
          <option value="CMCC">CMCC</option>
          <option value="DWD">DWD</option>
          <option value="Ensemble Mean">Ensemble Mean</option>
        </select>
      </div>

      <div className="">
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

      <div className="">
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

      <div className="">
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

      <div className="">
        <label className="block mb-2 font-semibold">Period Months</label>
        <input
          value={periodMonths}
          readOnly
          className="w-full p-2 border rounded"
        >
        </input>
      </div>

      <div className="">
        <label className="block mb-2 font-semibold">Period Years</label>
        <select
          value={periodYears}
          onChange={(e) => setPeriodYears(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {[2021, 2022, 2023].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="">
        <label className="block mb-2 font-semibold">Variable</label>
        <select
          value={variable}
          onChange={(e) => setVariable(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Precipitation">Precipitation</option>
          <option value="Temperature">Temperature</option>
        </select>
      </div>

      <div className="">
        <label className="block mb-2 font-semibold">Parameter</label>
        <select
          value={parameter}
          onChange={(e) => setParameter(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Anomaly">Anomaly</option>
          <option value="Empirical Based Tercile Probability">
            Empirical Based Tercile Probability
          </option>
          <option value="Normal Based Tercile Probability">
            Normal Based Tercile Probability
          </option>
          <option value="Total">Total</option>
        </select>
      </div>

      <div className="">
        <label className="block mb-2 font-semibold">Method</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Regression">Regression</option>
          <option value="Bias Correction">Bias Correction</option>
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

      {/* Product Display Arguments as Blue Buttons */}
      <div className='flex flex-row gap-1 ml-20 mr-5'>
      {imageURL && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Product Display Results</h2>
          <img src={imageURL} alt="GCM Plot" className="h-4/6" />
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
            <div className="flex flex-col items-start ">
             <h2 className='text-xl font-semibold m-2'>Product Display Results</h2>
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

export default Gcm;
