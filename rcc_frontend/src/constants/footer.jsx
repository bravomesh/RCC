import React from 'react'
import igad from '../public/icpac-logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faYoutube, faSquareXTwitter, faInstagram, faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons"

function Footer() {
  return (
    <div className="bg-teal-900 text-white py-8">
      <div className="">
        <div className="flex flex-col lg:flex-row mx-20 justify-between gap-8 2xl:mx-40">
          <div>
            <img src={igad} alt="IGAD Logo" className="my-4 h-48 mx-auto" />
          </div>
          <div className="max-w-md text-center lg:text-left">
            <h4 className="text-xl font-bold underline">About this Dashboard:</h4>
            <p className="mt-2 text-left">
            The Regional Climate Climatology (RCC) Dashboard is a comprehensive tool designed to monitor and analyze climate patterns 
            across the 11 countries in the ICPAC region. This interactive platform allows users to visualize and interact with
             climatological data. The RCC dashboard serves as an essential resource for researchers,
              policymakers, and climate scientists, offering valuable insights into seasonal and long-term climate trends.
               It aids in understanding regional climate variability, supporting climate adaptation, mitigation efforts, 
               and resilience planning across East African.            
            </p>
          </div>
          <div className="max-w-xs text-left">
            <h4 className="text-xl font-bold  text-center underline">About Us:</h4>
            <p className="mt-2 ">
              IGAD Climate Prediction and Applications Centre (ICPAC)
              <br />
              Ngong Town, Kibiko A Road
              <br />
              P.O BOX 10304-00100
            </p>
            <button className="bg-teal-600 text-white  font-bold py-2 px-4 mt-4 rounded">Feed Back</button>
            <div className="mt-4 flex justify-around ">
                <button><FontAwesomeIcon className='h-7 w-7' icon={faFacebook} /></button>
                <button><FontAwesomeIcon className='h-7 w-7' icon={faYoutube} /></button>
                <button><FontAwesomeIcon className='h-7 w-7' icon={faSquareXTwitter} /></button>
                <button><FontAwesomeIcon className='h-7 w-7' icon={faEnvelope} /></button>
                <button><FontAwesomeIcon className='h-7 w-7' icon={faGithub} /></button>
                <button><FontAwesomeIcon className='h-7 w-7' icon={faInstagram} /></button>
                <button><FontAwesomeIcon className='h-7 w-7' icon={faLinkedin} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
