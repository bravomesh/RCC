import React, { useState, useEffect } from 'react';
import axios from 'axios';
import skill from '../public/skills-diagnostics.png';


const Reference = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('Annual');
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/reference/filter_by_month_and_season/`, {
        params: {
          month: selectedMonth,
          season: selectedSeason
        }
      });
      setImages(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [selectedMonth, selectedSeason]);

  return (
    <div>    <div
        className="relative w-full bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${skill})`, width: '100%',
          height: '100%',  }}
      >
        <h2 className="text-4xl font-bold pt-60 pl-10 animate-fade-in pb-10">Skill Diagnostics</h2>
      </div>
    <div className="flex flex-col items-center">
      <div className="flex gap-4 mb-4">
        {/* Month Selector */}
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="border p-2 rounded-md shadow-sm">
          <option value="Jan">January</option>
          <option value="Feb">February</option>
          <option value="Mar">March</option>
          <option value="Apr">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="Aug">August</option>
          <option value="Sept">September</option>
          <option value="Oct">October</option>
          <option value="Nov">November</option>
          <option value="Dec">December</option>
          {/* Add other month options here */}
        </select>

        {/* Season Selector */}
        <select value={selectedSeason} onChange={(e) => setSelectedSeason(e.target.value)} className="border p-2 rounded-md shadow-sm">
          <option value="Annual">Annual</option>
          <option value="JJAS">JJAS</option>
          <option value="OND">OND</option>
          <option value="DJF">DJF</option>
        </select>
      </div>

      <div className="flex gap-4">
        {images.length > 0 && images.map((img) => (
          <img key={img.image} src={img.image} alt={`${img.month} - ${img.season}`} className="w-1/2" />
        ))}
      </div>
    </div>
    </div>

  );
};

export default Reference;
