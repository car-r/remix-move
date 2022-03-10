import { Link } from 'remix'
import heroImage from '~/public/boxes.png'
import ButtonOutlined from './ButtonOutlined'

export default function Hero() {
    return (
        <div className='flex flex-col mb-12'>
            <div className='mx-auto'>
                <div className='lg:flex'>
                    <div className='mb-6 lg:mr-4 max-w-xl'>
                        <h3 className="text-2xl sm:text-3xl font-thin mb-2">Making moving easy</h3>
                        <h2 className='text-3xl sm:text-4xl font-bold'>Organize your move,</h2>
                        <h2 className='text-3xl sm:text-4xl font-bold mb-4'>one box at a time.</h2>
                        <p className='text-sm font-light sm:text-base'>Moving is stressful, time consuming, and difficult. Take control of your move by keeping it neatly organized with a room for each box and a box for every item.</p>
                        {/* <p className='text-sm font-light md:text-base'>Take control of your move by keeping it neatly organized</p>
                        <p className='text-sm font-light md:text-base'>with a room for each box and a box for every item.</p> */}
                    </div>
                    <img src='boxes.png' className='h-52 w-52 mb-6 lg:h-52 lg:w-52'/>
                </div>
                <Link to='/box' className='inline-block'>
                    <div className='flex rounded-md border-2 border-indigo-500 px-4 py-2 hover:bg-indigo-400 hover:text-white transition-all ease-in-out duration-300 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className='ml-2 font-bold'>Start Packing</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}