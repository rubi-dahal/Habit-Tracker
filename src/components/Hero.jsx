import React from 'react'

const Hero = ({ completed = 0, total = 0 }) => {

  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  })
  
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }
  
  return (
    <div className='flex flex-col gap-10'>
      <div className='flex justify-between gap-8 mb-6 md:mb-0 px-4 sm:px-6 md:px-10 py-4 bg-white border-b border-gray-600'>

        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 bg-green-500 rounded-full'></div>
          <span className='font-bold font-sans text-3xl'>habit</span>
        </div>

        <div className='cursor-pointer text-xl pt-1 font-medium'>
          Dashboard
        </div>

        <div className='cursor-pointer bg-green-200 font-bold border-gray-300 px-2 py-2 rounded-[50%] text-sm'>
          ♯
        </div>

      </div>
      <div className='flex flex-col items-start pb-5 my-10 px-4 sm:px-6 md:px-20'>
        <p className='text-gray-500'>
          {date}
        </p>

        <h1 className='hero-title text-4xl font-bold my-2'>
          {getGreeting()}<span className='text-green-500'>!</span>
        </h1>

        <p className='hero-subtitle text-gray-600 max-w-xl leading-7'>
          You've completed {completed} of {total} habits today. Keep it up — you're on a great streak!
        </p>
      </div>

    </div>
  )
}

export default Hero