import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddCoursePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    studentIds: []
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Send request
      const response = await fetch('http://localhost:8080/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add course');
      }
      
      // Success
      setSuccess(true);
      setTimeout(() => {
        navigate('/manage-courses');
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
            {/* Course icon or logo could go here */}
          </div>
        </div>
        
        {/* Navigation buttons */}
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
        <h1 className="text-2xl font-semibold text-gray-700 mb-8">Add Course</h1>
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Course added successfully! Redirecting...
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="max-w-3xl">
          {/* Course Name */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Course Name</label>
            <input
              type="text"
              name="name"
              className="border rounded p-2 w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Course Description */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              className="border rounded p-2 w-full h-32"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Note about students */}
          <div className="mb-8 text-gray-600 italic">
            Students can be assigned to this course after creation.
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}