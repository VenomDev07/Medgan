import React, { useEffect, useState } from 'react';
import { 
  Heart, Settings, 
  Layers, Image, Grid, FileText, Film, Upload, Maximize2, Music,
  MessageCircle, MoreHorizontal, Eye, ArrowLeft, X, LogOut
} from 'lucide-react';
import axios from 'axios';
import { env } from '../envioronment/environment.dev';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

  const navigate = useNavigate()
  const [creations, setCreation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [imageName, setImageName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);
  
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const email = userInfo?.email;
  const userName = userInfo?.name;
  const userId = userInfo?.id


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log(userInfo);
      
      const data = { userId: userInfo.id };
      const res = await axios.post(`${env.baseUrl}fetchEnhancedImg`, data);
      console.log(res.data);
      setCreation(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    debugger
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const showImagePreview = (imageUrl, imageName) => {
    setPreviewImage({ url: imageUrl, name: imageName });
    setShowPreview(true);
  };

  const closePreview = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowPreview(false);
      setPreviewImage(null);
      setFadeOut(false);
    }, 300);
  };

  const closeModal = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShowModal(false);
      setImageName("");
      setSelectedFile(null);
      setPreviewUrl(null);
      setFadeOut(false);
    }, 300);
  };

  const handleLogout = () => {
    debugger
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const handleSubmit = async () => {
    if (!selectedFile || !imageName) {
      alert("Please provide both name and image.");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("userId", userId);
    formData.append("name", imageName);
  
    try {
      const res = await axios.post(`${env.baseUrl}enhance/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Upload successful", res.data);
      closeModal();
      fetchData();
    } catch (error) {
      console.error("Upload failed", error);
    }
  };



  return (
    <div className="flex h-screen bg-gray-100 p-4">
      {/* Sidebar */}
      <div className="w-56 bg-white rounded-2xl p-5 mr-4 flex flex-col">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold cursor-pointer" onClick={() => navigate('/')} >
            M
          </div>
          <span className="ml-2 font-bold text-lg">Medgan</span>
        </div>

        {/* Menu Items */}
        <nav className="flex-1">
          <MenuLink icon={<Grid size={20} />} label="Dashboard" />
          {/* <MenuLink icon={<MessageCircle size={20} />} label="Community" />
          <MenuLink icon={<FileText size={20} />} label="Prompt Store" />
          <MenuLink icon={<Heart size={20} />} label="Favorites" />
          <MenuLink icon={<Layers size={20} />} label="Creators" hasSubmenu />
          <MenuLink icon={<Image size={20} />} label="Art Generation" hasSubmenu />
          <MenuLink icon={<MessageCircle size={20} />} label="Messages" badge="2" />
          <MenuLink icon={<Settings size={20} />} label="Settings" /> */}
          <MenuLink icon={<LogOut />} isLogout={true} label="Log out" onClick={handleLogout} />
        </nav>

        {/* User Profile */}
        <div className="flex items-center mt-4 pt-4 border-t">
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <div className="ml-2">
            <div className="text-sm font-medium">{userName}</div>
            <div className="text-xs text-gray-500">{email}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Combined Hero + Feature Section */}
        <div className="mb-4 relative">
          {/* Hero Banner */}
          <div className="bg-purple-900 rounded-2xl p-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-900 opacity-60"></div>
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-purple-600 rounded-full opacity-20"></div>
            <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-purple-600 rounded-full opacity-20"></div>
            
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-1">Make ideas truly extraordinary</h1>
              <p className="text-purple-200">Transform concepts into remarkable creations with innovation.</p>
            </div>
          </div>
          
          {/* Menu Buttons Bar */}
          <div className="w-full flex justify-center items-center absolute bottom-[-20px]">
            <div className="bg-white rounded-xl shadow-sm mt-6 flex items-center w-[70%] h-[48px] justify-between p-4">
              {/* Feature Icons - Overlapping Circle */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 -mb-8 z-20">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white border-white border-2 cursor-pointer">
                  <Image size={28} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Creations */}
        <div className="bg-white rounded-2xl flex-1 p-4 mt-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-xl">Most recent creations</h2>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
            >
              Enhance new images
            </button>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-4 gap-4 overflow-y-auto max-h-[100%]">
            {loading ? (
              // Skeleton Loader
              Array(8).fill().map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              // Actual Content
              creations.map((creation, index) => (
                <div key={index} className="rounded-xl bg-gray-100 relative group cursor-pointer">
                  <div className="relative">
                    <img 
                      src={creation.url} 
                      alt={`Creation by ${creation.author}`}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0  transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button 
                        className="p-2 bg-white rounded-full"
                        onClick={() => showImagePreview(creation.url, creation.name)}
                      >
                        <Eye size={18} className="text-gray-800" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center p-2">
                    <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                    <span className="text-xs ml-2 flex-1 truncate">{creation.name}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Enhance New Image Modal */}
      {showModal && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Enhance New Image</h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={imageName}
                  onChange={(e) => setImageName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter image name"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image to Enhance</label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-purple-500 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload size={24} className="text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Click to upload or drag and drop</span>
                    <span className="text-xs text-gray-400 mt-1">SVG, PNG, JPG,ppm (max. 800x400px)</span>
                  </label>
                </div>
              </div>
              
              {previewUrl && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Preview:</p>
                  <div className="relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 text-sm bg-purple-500 text-white rounded-md hover:bg-purple-600"
                >
                  Upload & Enhance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {showPreview && previewImage && (
        <div className={`fixed inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <div className="relative bg-purple-500 rounded-lg w-full max-w-3xl max-h-[90vh] p-6 animate-fade-in">
            <button 
              onClick={closePreview}
              className="absolute top-4 left-4 flex items-center text-gray-700 hover:text-black"
            >
              <ArrowLeft size={20} className="mr-1" />
              <span className='text-amber-50' >Back</span>
            </button>
            
            <div className="mt-10 flex flex-col items-center">
              <h1 className="text-lg text-amber-50 font-medium mb-4">{previewImage.name}</h1>
              <div className="w-full h-[60vh] flex items-center justify-center bg-gray-100 rounded-lg">
                <img 
                  src={previewImage.url} 
                  alt={previewImage.name} 
                  className="max-w-full max-h-full object-contain rounded-2xl "
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function logout () {
  debugger
  localStorage.removeItem('userInfo')
}

// Helper components
function MenuLink({ icon, label, hasSubmenu, badge, onClick }) {
  return (
    <div onClick={onClick}  className="flex items-center py-2 px-2 rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer mb-1">
      <div className="text-gray-500">{icon}</div>
      <span className="ml-3 flex-1 text-sm">{label}</span>
      {hasSubmenu && <MoreHorizontal size={16} />}
      {badge && (
        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
          {badge}
        </div>
      )}
    </div>
  );
}

// Skeleton Loader Component
function SkeletonCard() {
  return (
    <div className="rounded-xl bg-white shadow animate-pulse">
      <div className="w-full h-48 bg-gray-200 rounded-t-xl"></div>
      <div className="p-2 flex items-center">
        <div className="w-6 h-6 rounded-full bg-gray-200"></div>
        <div className="ml-2 h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
}