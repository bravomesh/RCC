import home from '../public/icpac-home.png'


function Home() {
  return (
    <div className='container'>
    <div
      className="relative w-full  bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${home})`, height: '70vh', width: '100vw'}} // 50vh makes it take half the screen height
    >
      <h2 className="text-4xl font-bold pt-60 ml-10">IGAD Regional CLimate Center</h2>
      <p className='ml-10'> A Climate Center of Excellence Designated By the World Meteoroligical Department </p>
       <button className='bg-blue-700 rounded-xl font-bold ml-10 px-3 py-1'>Give Us Feedback</button>
    </div>
     
    </div>
  )
}

export default Home