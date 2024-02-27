
import './Home.css';
import { Route, Routes } from 'react-router-dom';

function Home() {
  return (
    <div className="Home">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className='w-full h-[400px] bg-gray-200'>01</div>
        <div className='w-full h-[400px] bg-gray-200'>02</div>
        <div className='w-full h-[400px] bg-gray-200'>01</div>
        <div className='w-full h-[400px] bg-gray-200'>02</div>
        <div className='w-full h-[400px] bg-gray-200'>01</div>
        <div className='w-full h-[400px] bg-gray-200'>02</div>
        <div className='w-full h-[400px] bg-gray-200'>01</div>
        <div className='w-full h-[400px] bg-gray-200'>02</div>
      </div>
    </div>
  );
}

export default Home;
