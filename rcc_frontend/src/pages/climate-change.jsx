import React from 'react';
import climate from '../public/climate-change.jpg'
function ClimateChange() {
  return (
    <div className=''>
    <div
    className="relative w-full bg-cover bg-center text-white "
    style={{ backgroundImage: `url(${climate})`, width: '100%',
      height: '100%',  }}
  >
    <h2 className="text-4xl font-bold pt-60 pl-10 animate-fade-in-left pb-10">Climate change</h2>
  </div>




  <div className="p-6 md:p-10 bg-white text-gray-800 w-auto  mx-10 my-6 rounded-sm shadow-lg animate-bounce-in">
  <h1 className="text-3xl md:text-4xl font-bold mb-6 text-teal-600 animate-fade-in">
    Understanding Climate Change
  </h1>
  <p className="text-base md:text-lg leading-relaxed mb-4">
    Global warming associated with increasing human-induced greenhouse gas (GHG) emissions has resulted in changes in the equilibrium state of climate over most parts of the world...
  </p>
  <p className="text-base md:text-lg leading-relaxed mb-4">
    According to IPCC (2013), global temperatures averaged over all land and ocean areas have risen by approximately 0.85°C from 1880 to 2012...
  </p>
  <p className="text-base md:text-lg leading-relaxed mb-4">
    Although there are both positive and negative effects of the changes in climate, with regard to timing, intensity, and frequency, the negative effects (cost) outweigh the positive effects (benefits)...
  </p>

  {/* Key Areas Section */}
  <div className="mb-6">
    <h2 className="text-2xl font-semibold mb-4 text-teal-600">Key Areas of Focus</h2>
    <ul className="list-disc list-inside space-y-2">
      <li>Understanding the observed and projected trends in rainfall, temperature, extremes...</li>
      <li>Attribution of recent and future climatic changes and trends over the region.</li>
      <li>Adaptation to climate change.</li>
      <li>Mitigation.</li>
    </ul>
  </div>

  <p className="text-base md:text-lg leading-relaxed">
    To address this range of topics, we utilize a wide range of datasets, tools, and techniques...
  </p>
</div>
    </div>
  );
}

export default ClimateChange;
