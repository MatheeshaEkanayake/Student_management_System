import React from 'react';
import { Link } from 'react-router-dom';
import ManageCourse from "../assets/paper_2.jpg";
import Student from "../assets/62b53f474454b93bf3b74387.png";
import AuditImage from "../assets/3304467.jpg";

const StudentPortal = () => {
  return (
    <div className="min-h-screen w-full" style={{ 
      background: 'linear-gradient(to bottom, #EEF2FC, #8BA7E0)' 
    }}>
      <div className="container mx-auto px-12 py-16">
        <h1 className="text-4xl font-bold text-gray-700 mb-6 ml-8">
          Welcome to your Student portal
        </h1>
        
        <p className="text-lg text-gray-700 mb-12 ml-8 max-w-3xl">
          This management portal provides tools to efficiently handle student records, 
          course administration, and perform auditing tasks for educational institutions.
        </p>
        
        <div className="flex justify-center gap-10 mb-24">
          {/* Manage Students Tile */}
          <Link to="/manage-students" className="flex flex-col items-center" style={{ width: '287px' }}>
            <div className="bg-white rounded-3xl w-64 h-64 mb-4 flex items-center justify-center shadow-md">
              <img 
                src={Student} 
                alt="Student icon" 
                className="w-60 h-auto"
              />
            </div>
            <p className="text-gray-800 font-medium text-lg mb-2">Manage Students</p>
            <p className="text-gray-600 text-center text-sm px-4">
              Add, edit, and review student profiles, track academic progress, and manage enrollment status.
            </p>
          </Link>
          
          {/* Manage Courses Tile */}
          <Link to="/manage-courses" className="flex flex-col items-center" style={{ width: '287px' }}>
            <div className="bg-white rounded-3xl w-64 h-64 mb-4 flex items-center justify-center shadow-md">
              <img 
                src={ManageCourse} 
                alt="Course icon" 
                className="w-60 h-auto"
              />
            </div>
            <p className="text-gray-800 font-medium text-lg mb-2">Manage Courses</p>
            <p className="text-gray-600 text-center text-sm px-4">
              Create and modify course offerings, assign instructors, and manage course schedules and materials.
            </p>
          </Link>
          
          {/* View Audit Tile */}
          <Link to="/view-audit" className="flex flex-col items-center" style={{ width: '287px' }}>
            <div className="bg-white rounded-3xl w-64 h-64 mb-4 flex items-center justify-center shadow-md">
              <img 
                src={AuditImage} 
                alt="Audit icon" 
                className="w-60 h-auto"
              />
            </div>
            <p className="text-gray-800 font-medium text-lg mb-2">View Audit</p>
            <p className="text-gray-600 text-center text-sm px-4">
              Review system activities, generate reports, and ensure compliance with educational standards and policies.
            </p>
          </Link>
        </div>
        
        <div className="flex justify-center mt-8">
          <button className="flex items-center text-gray-800 font-medium">
            login to the portal
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <footer className="mt-8 text-center text-gray-600 text-sm">
          <p>Optimized for 1920x1080 resolution</p>
        </footer>
      </div>
    </div>
  );
};

export default StudentPortal;
