import React, { useState } from 'react';
import icpac from '../public/icpac-logo.svg';

export default function Navbar() {
  // State to track which dropdown is open, if any
  const [openDropdown, setOpenDropdown] = useState(null);

  // Toggle dropdown function
  const toggleDropdown = (menu) => {
    setOpenDropdown(prevState => prevState === menu ? null : menu);
  };

  return (
    <nav className="bg-green-900 bg-opacity-85 text-white p-2 w-full absolute top-0 left-0 z-50">
      <div className="flex justify-center mb-4">
        <img src={icpac} style={{ height: '90px' }} alt="icpac_logo" />
      </div>

      {/* Divider Line */}
      <hr className="border-t-2 border-white mb-4 w-full" />

      <div className="container mx-auto flex justify-between items-center">
        {/* Menu Items */}
        <div className="flex items-center">
          <a href="/" className="text-white px-3 py-2 rounded hover:bg-teal-700">
            HOME
          </a>

          {/* Long Range Forecast Dropdown */}
          <div className="relative ml-4">
            <button
              onClick={() => toggleDropdown('longRangeForecast')}
              className="inline-flex items-center px-3 py-2 rounded text-white hover:bg-teal-700"
            >
              LONG RANGE FORECAST
            </button>
            {openDropdown === 'longRangeForecast' && (
              <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a href="/skill" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100" role="menuitem">
                    Skill Diagnostics
                  </a>
                  <a href="/gcm" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100" role="menuitem">
                    GCM
                  </a>
                  <a href="/rcm" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100" role="menuitem">
                    RCM - WRF Deterministic
                  </a>
                  <a href="/verification" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100" role="menuitem">
                    Seasonal Verification
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Climate Monitoring Dropdown */}
          <div className="relative ml-4">
            <button
              onClick={() => toggleDropdown('climateMonitoring')}
              className="inline-flex items-center px-3 py-2 rounded text-white hover:bg-teal-700"
            >
              CLIMATE MONITORING
            </button>
            {openDropdown === 'climateMonitoring' && (
              <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a href="/reference" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100" role="menuitem">
                    Reference Climatology
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Climate Change Link */}
          <div className="relative ml-4">
            <a href="/climate-change" className="text-white px-3 py-2 rounded hover:bg-teal-700">
              CLIMATE CHANGE
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}