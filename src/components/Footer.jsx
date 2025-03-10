import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 flex flex-col items-center gap-1 fixed bottom-0 w-full'>
            <a href=""><div className="logo font-bold text-2xl">
                <span className='text-green-500'>&lt;</span>
                <span className='text-white'>Pass</span>
                <span className='text-green-500'>OP/&gt;</span>
            </div></a>
            <div className='flex items-center gap-1 font-semibold'>
                <span className='invert'>Created with </span><script src="https://cdn.lordicon.com/lordicon.js"></script>
                <lord-icon
                    src="https://cdn.lordicon.com/zqggznpp.json"
                    trigger="hover">
                </lord-icon> <span className='invert'>By Kunal Sharma</span>
            </div>
        </div>
    )
}

export default Footer
