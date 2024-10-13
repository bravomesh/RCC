import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';  // Import axios
import verification from '../public/seasonal-verification.jpg';  // Make sure this path is correct

// Define the columns
const columns = [
  {
    name: 'COF No',
    selector: row => row.cof_no,
    sortable: true,
  },
  {
    name: 'Hit Rate %',
    selector: row => row.hit_rate,
    sortable: true,
  },
  {
    name: 'HSS %',
    selector: row => row.hss,
    sortable: true,
  },
  {
    name: 'Verification Document',
    selector: row => (
      row.verification_document !== '-'
        ? <a href={row.verification_document} target="_blank" rel="noopener noreferrer">Download Document</a>
        : '-'
    ),
    sortable: false,
  },
];

const Skill = () => {
  const [data, setData] = useState([]);

  // Fetch the data from the API
  useEffect(() => {
    axios.get('http://localhost:8000/api/cofrecords/')  // Replace with your API URL
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className="">
      {/* Background Image Section */}
      <div
        className="relative w-full bg-cover bg-center text-white "
        style={{ backgroundImage: `url(${verification})`, width: '100%',
          height: '100%',  }}
      >
        <h2 className="text-4xl font-bold pt-60 pl-10 animate-fade-in pb-10">Seasonal Verification</h2>
      </div>
      
      {/* Data Table Section */}
      <div className='mx-8 ml-14'>
        <h2 className="text-center text-2xl font-bold my-4">How accurate are our forecasts?</h2>
        <p className="text-center mb-6">Find our latest verification, skill, and assessment information.</p>
        <DataTable
          columns={columns}
          data={data}
          pagination
          defaultSortFieldId={1}
          responsive
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
};

export default Skill;
