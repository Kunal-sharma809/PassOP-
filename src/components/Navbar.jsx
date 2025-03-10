import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800'>
      <div className="mycontainer text-black flex justify-around items-center py-2 px-6 text-white">
        <div className="logo font-bold text-2xl">
          <span className='text-green-500'>&lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span>
        </div>
        {/* <ul className='flex gap-10 items-center'>
          <a className='hover:font-bold' href="/"><li>Home</li></a>
          <a className='hover:font-bold' href="/"><li>About</li></a>
          <a className='hover:font-bold' href="/"><li>Contact</li></a>
        </ul> */}
        <button className='flex items-center gap-2 bg-green-700 px-3 py-1 rounded-full cursor-pointer ring-white ring-1'>
          <img className='w-8 invert' src="/icons/github.svg" alt="" />
          <div className='font-semibold'>GitHub</div>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
