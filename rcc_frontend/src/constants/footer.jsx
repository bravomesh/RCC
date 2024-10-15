import React from 'react'
import igad from '../public/icpac-logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faYoutube, faSquareXTwitter, faInstagram, faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons"

function Footer() {
  return (
    <div className="bg-teal-900 text-white pb-6 pt-4">
      <div className="">
        <div className="flex flex-col lg:flex-row mx-20 justify-between gap-8 2xl:mx-40">
          <div>
            <img src={igad} alt="IGAD Logo" className="my-4 h-48 mx-auto" />
          </div>
          <div className="max-w-md text-center lg:text-left">
            <h4 className="text-xl font-bold underline">About this Dashboard:</h4>
            <p className="mt-2 text-left">
              The Regional Climate Climatology (RCC) Dashboard is an interactive tool for monitoring and 
              analyzing climate patterns in the 11 ICPAC countries. It offers valuable insights into seasonal
              and long-term trends, supporting researchers, policymakers, and climate scientists in understanding
              regional climate variability.            
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
