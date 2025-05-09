import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const [activeTab, setActiveTab] = useState('about');
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-12">
        <div className="text-lg font-bold text-purple-900 cursor-pointer" onClick={() => navigate('/')} >Medgan AI</div>
        <div className="flex space-x-6">
          <button 
            className={`px-3 py-1 rounded-full text-sm font-medium ${activeTab === 'about' ? 'bg-lime-300 text-gray-800' : 'text-gray-600'}`}
            onClick={() => setActiveTab('about')}
          >
            ABOUT US
          </button>
          
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-lime-50 to-purple-50 rounded-3xl p-8 mb-16">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-6">
              We build different medical imaging
            </h1>
            <p className="text-gray-600 mb-8">
              We are completely obsessed with enhancing medical images for accurate diagnostics and clinical analysis.
            </p>
            <button className="bg-purple-900 text-white px-6 py-3 rounded-full cursor-pointer font-medium"  onClick={() => navigate('/login')}   >
              Try our demo
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="relative">
              <div className="w-64 h-64 bg-lime-200 rounded-full flex items-center justify-center">
                <svg className="w-20 h-20 text-purple-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <div className="absolute -bottom-2 -left-4 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-purple-900 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 mb-8 md:mb-0">
            <div className="bg-lime-100 rounded-3xl overflow-hidden">
              <div className="flex justify-center p-8">
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="w-12 h-12 bg-white/80 rounded-lg flex items-center justify-center">
                      {item % 2 === 0 ? (
                        <div className="w-6 h-6 bg-purple-200 rounded-full"></div>
                      ) : (
                        <div className="w-6 h-6 bg-lime-300 rounded-md"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-3/5 md:pl-12">
            <p className="text-xl italic text-purple-800 mb-8">
              We are completely fixated on enhancing medical images for precise diagnostics. All of our AI algorithms are full-spectrum enhancements for medical professionals that we wholeheartedly support. Our sole goal is to improve patient outcomes through better visualization and analysis.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-900 rounded-full"></div>
                <span className="text-sm text-gray-600">AI-powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-lime-400 rounded-full"></div>
                <span className="text-sm text-gray-600">HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-sm text-gray-600">FDA Reviewed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/5 mb-8 md:mb-0">
            <div className="text-sm text-purple-600 uppercase font-medium mb-4">The Vision</div>
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6">
              Increase diagnostic potential to save more lives.
            </h2>
            <p className="text-gray-600 mb-8">
              We envision a world in which medical professionals take confidence in their image analysis, enhance visibility of pathological features, and improve the lives of patients — your patients. Collectively, we advance healthcare.
            </p>
            <div className="flex space-x-3">
              <button className="bg-lime-300 text-gray-800 px-5 py-2 rounded-full font-medium flex items-center">
                <span>See our technology</span>
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </button>
              <button className="border border-purple-900 text-purple-900 px-5 py-2 rounded-full font-medium cursor-pointer" onClick={() => navigate('/login')}>
                Book a demo
              </button>
            </div>
          </div>
          <div className="md:w-2/5 md:pl-12 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 bg-lime-200 rounded-full flex items-center justify-center">
                <div className="w-48 h-48 bg-white/70 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-purple-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L9 15"></path>
                    <path d="M22 2L13 22 9 15 2 11 22 2z"></path>
                  </svg>
                </div>
              </div>
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-yellow-300 px-4 py-2 rounded-lg font-bold text-sm rotate-12">
                BETTER RESULTS
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-purple-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="bg-gradient-to-r from-purple-50 to-lime-50 rounded-3xl p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-900 mb-4">Our Medical Imaging Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Advanced AI algorithms that enhance clarity, detect anomalies, and provide detailed analysis for various modalities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-lime-200 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-purple-900 mb-2">Image Enhancement</h3>
            <p className="text-gray-600">
              Improve visibility of features in X-rays, MRIs, CT scans, and ultrasounds with our proprietary algorithms.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-purple-900 mb-2">Anomaly Detection</h3>
            <p className="text-gray-600">
              AI-powered identification of potential issues with high precision and reduced false positives.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-purple-900 mb-2">Collaborative Analysis</h3>
            <p className="text-gray-600">
              Secure sharing and annotation tools for multi-specialist consultations and second opinions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;