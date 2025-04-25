import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Adjust the path as necessary

export default function AddStudentPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    dateOfBirth: '',
    email: '',
    degreeProgram: '',
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const degreePrograms = [
    'COMPUTER_SCIENCE',
    'ENGINEERING',
    'BUSINESS',
    'MEDICINE',
    'ARTS'
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Create form data for multipart request
      const data = new FormData();
      
      // Add student data as JSON
      const studentData = { ...formData };
      data.append('student', new Blob([JSON.stringify(studentData)], {
        type: 'application/json'
      }));
      
      // Add image if selected
      if (imageFile) {
        data.append('imageFile', imageFile);
      }
      
      // Send request
      const response = await fetch('http://localhost:8080/students/add', {
        method: 'POST',
        body: data
      });
      
      if (!response.ok) {
        throw new Error('Failed to add student');
      }
      
      // Success
      setSuccess(true);
      setTimeout(() => {
        navigate('/manage-students');
      }, 2000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed w-64 h-screen bg-blue-500 overflow-y-auto">
        <div className="p-6">
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
          <img 
            src={logo} 
            alt="Logo" 
            className="w-full h-full object-cover"
          />
        </div>
        </div>
        
        {/* Navigation buttons (lowered by margin-top) */}
        <div className="mt-12">
          <div 
            className="bg-blue-600 p-4 text-white text-center font-medium cursor-pointer hover:bg-blue-700"
            onClick={() => navigate('/manage-students')}
          >
            Students
          </div>
          
          <div 
            className="bg-blue-600 p-4 text-white text-center font-medium cursor-pointer hover:bg-blue-700"
            onClick={() => navigate('/manage-courses')}
          >
            Courses
          </div>
          
          <div 
            className="bg-blue-600 p-4 text-white text-center font-medium cursor-pointer hover:bg-blue-700"
            onClick={() => navigate('/view-audit')}
          >
            Audit
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 flex-1 p-8 overflow-x-auto">
        <h1 className="text-2xl font-semibold text-gray-700 mb-8">Add Students</h1>
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Student added successfully! Redirecting...
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="max-w-3xl">
          {/* Name row */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Name</label>
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="border rounded p-2 w-1/2"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="border rounded p-2 w-1/2"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          {/* Address */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              className="border rounded p-2 w-full"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Date of Birth */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              placeholder="YYYY/MM/DD"
              className="border rounded p-2"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="border rounded p-2 w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Degree Program */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Degree Program</label>
            <select
              name="degreeProgram"
              className="border rounded p-2 w-64"
              value={formData.degreeProgram}
              onChange={handleChange}
              required
            >
              <option value="">Select a program</option>
              {degreePrograms.map(program => (
                <option key={program} value={program}>
                  {program.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
          
          {/* Student Image */}
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Student Image
            </label>
            <div className="flex items-center gap-4">
              <label htmlFor="studentImage" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer focus:outline-none focus:shadow-outline">
                Choose File
              </label>
              <span className="text-gray-600">
                {imageFile ? imageFile.name : 'No file chosen'}
              </span>
              <input
                type="file"
                id="studentImage"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}