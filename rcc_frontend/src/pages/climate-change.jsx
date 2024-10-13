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
    <h2 className="text-4xl font-bold pt-60 pl-10 animate-fade-in pb-10">Climate change</h2>
  </div>
    <div className="p-6 md:p-10 bg-white text-gray-800 max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Climate Change</h1>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        Global warming associated with increasing human-induced greenhouse gas (GHG) emissions has resulted in changes in the equilibrium state of climate over most parts of the world. Carbon dioxide (CO2), one of the most significant contributors to the greenhouse effect, has increased from 315.97 ppm in 1959 to 400.83 ppm in 2015. There is strong scientific evidence of increased temperatures (for example, Figure 1, which shows projected trends in temperature over GHA), changes in the variability of onset and cessation of rainfall, and increased intensity and frequency of extreme rainfall and temperature events, which are associated with increased greenhouse gas concentrations.
      </p>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        According to IPCC (2013), global temperatures averaged over all land and ocean areas have risen by approximately 0.85 °C from 1880 to 2012. Global temperatures have continued to rise since then, with devastating impacts, with each year recording average global temperatures warmer than the long-term mean (see Reports on the statement of the status of global climate by WMO).
      </p>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        Although there are both positive and negative effects of the changes in climate, with regard to timing, intensity, and frequency, the negative effects (cost) outweigh the positive effects (benefits). Climate change has disproportionately affected the lives and livelihoods of the populations living in the poorest countries such as those in Africa, and these impacts are expected to continue into the future if concrete measures are not put in place to mitigate climate change. The climate change group at ICPAC works to address the climate change issues over the Greater Horn of Africa (GHA) region.
      </p>
      <p className="text-base md:text-lg leading-relaxed mb-4">
        We mainly focus on three key areas:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Understanding the observed and projected trends and changes in rainfall, temperature, extremes as well as onset/cessation of rainfall.</li>
        <li>Attribution of recent and future climatic changes and trends over the region.</li>
        <li>Adaptation to climate change.</li>
        <li>Mitigation.</li>
      </ul>
      <p className="text-base md:text-lg leading-relaxed">
        To address this range of topics, we utilize a wide range of datasets, tools, and techniques. To find detailed information on our research products, you can look at the links on the sidebar menu.
      </p>
    </div>
    </div>
  );
}

export default ClimateChange;
