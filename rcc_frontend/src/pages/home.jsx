import home from '../public/icpac-home.png';

function Home() {
  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div
        className="relative bg-cover bg-center flex flex-col justify-center text-white pl-10"
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
        <a href="https://www.icpac.net/feedback/" target="_blank" rel="noopener noreferrer">
          <button className="bg-blue-700 hover:bg-blue-800 transition-transform transform hover:scale-110 rounded-xl px-6 py-3 font-bold w-max animate-bounce-in">
            Give Us Feedback
          </button>
        </a>
      </div>
    </div>
  );
}

export default Home;
