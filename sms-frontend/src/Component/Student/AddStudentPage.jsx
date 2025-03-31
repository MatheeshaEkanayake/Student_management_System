import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    id: ''
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
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
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
      <div className="w-64 bg-blue-500">
        <div className="p-6">
          <div className="w-24 h-24 mx-auto bg-gray-400 rounded-full">
            {imagePreview && (
              <img 
                src={imagePreview} 
                alt="Student Preview" 
                className="w-24 h-24 rounded-full object-cover"
              />
            )}
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
      <div className="flex-1 p-8">
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
          
          {/* Student ID (Optional as it's auto-generated) */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Student ID</label>
            <input
              type="text"
              name="id"
              className="border rounded p-2 w-full"
              value={formData.id}
              onChange={handleChange}
              placeholder="Leave blank for auto-generation"
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
            <label className="block text-gray-700 mb-2">Student Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border rounded p-2 w-full"
            />
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