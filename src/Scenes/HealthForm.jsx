import React from 'react'

function HealthForm() {
  return (
    <div className='h-screen flex items-center justify-center'>
        <div className='h-[90%] w-[90%] sm:h-[70%] flex flex-col sm:w-[60%] bg-amber-200 rounded-2xl'>
            <div className='text-center'>
                <p className='font-bold lato text-[18px]'>Health Details</p>
                <p className='font-semibold lato text-[14px]'>create the contract terms with this guided process</p>
            </div>
            <div className='flex flex-row items-center justify-center mt-2 px-2 gap-x-3'>
                <div className='p-2 border-2 rounded-2xl text-[14px]'><p className='w-12'>1. Basic Details</p></div>
                <div className='p-2 border-2 rounded-2xl text-[14px]'><p className='w-12'>2. Health & fitness profile</p></div>
                <div className='p-2 border-2 rounded-2xl text-[14px]'><p className='w-12'>3. Dietary & Health preferences</p></div>
                <div className='p-2 border-2 rounded-2xl text-[14px]'><p className='w-12'>4. Lifestyle & Health Data</p></div>
            </div>
        </div>
    </div>
  )
}

export default HealthForm