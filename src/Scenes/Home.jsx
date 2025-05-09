import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'



function Home() {
  
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} >
      <div className="min-h-screen bg-gray-100 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="src/assets/homeimg.jpg"
            alt="Runner at sunset"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Navigation */}
          <nav className="flex justify-between items-center p-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="text-white text-2xl font-semibold">
                ▲MEDGAN
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white/80 hover:text-white">Health Hub</a>
              <a href="#" className="text-white/80 hover:text-white" onClick={() => navigate('about')} >Why MEDGAN</a>
              <button onClick={() => navigate('login')} className="bg-[#DAFF00] px-6 py-2 rounded-full cursor-pointer text-black font-medium hover:bg-[#c4e600]">
                START YOUR JOURNEY
              </button>
            </div>
          </nav>


          {/* Main Content */}
          <div className="flex-1 flex items-end pb-24">
            <div className="container mx-auto px-6">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                 Enhancing Medical Vision,
                  <br />
                  One Pixel at a Time
                </h1>
                <p className="text-amber-50 font-light text-lg mb-8 max-w-xl">
                  Welcome to your MEDGAN Journey
                </p>
                <div className="flex items-center space-x-4">
                  
                  <button className="flex items-center cursor-pointer space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-3">
                    <span className="text-white">Have a Question?</span>
                    <img
                      src="/api/placeholder/24/24"
                      alt="Play button"
                      className="w-6 h-6 rounded-full"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
)
}

export default Home