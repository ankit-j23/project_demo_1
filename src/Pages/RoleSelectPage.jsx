import React from 'react'
import { useNavigate } from 'react-router-dom'
import applogo from '../assets/app-logo.png'

const RoleSelectPage = ({setShowNav}) => {
    const navigate = useNavigate();
    // const onRoleSelectCsr = ()=> {
    //     navigate('/csrdashboard')
    //     setShowNav(true)
    // }
  return (
<div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-8">
          <div className="mb-4 ml-24">
            <img src={applogo} alt="" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Select Dashboard</h1>
          <p className="text-gray-600">Choose your role to continue</p>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => {navigate('/admindashboard')}}
            className="w-full bg-blue-900 text-white py-3 px-4 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
          >
            Admin Dashboard
          </button>
          <button
            onClick={() => {navigate('/csrdashboard');setShowNav(true)}}
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
          >
            CSR Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoleSelectPage;
