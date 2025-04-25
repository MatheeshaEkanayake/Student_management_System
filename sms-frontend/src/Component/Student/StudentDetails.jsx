import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Adjust the path as necessary

export default function StudentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  useEffect(() => {
    fetchStudentDetails();
  }, [id]);
  
  const fetchStudentDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/students/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch student details');
      }
      const data = await response.json();
      setStudent(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdate = () => {
    navigate(`/update-student/${id}`);
  };
  
  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8080/students/delete/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete student');
      }
      
      // Redirect to student list on success
      navigate('/manage-students');
    } catch (err) {
      setError(err.message);
      setConfirmDelete(false);
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-8 flex justify-center items-center">
          <p>Loading student details...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
          <button 
            onClick={() => navigate('/manage-students')}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back to Students
          </button>
        </div>
      </div>
    );
  }
  
  if (!student) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-8">
          <p>No student found with ID: {id}</p>
          <button 
            onClick={() => navigate('/manage-students')}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back to Students
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="ml-64 flex-1 p-8 overflow-x-auto">
        <h1 className="text-3xl font-semibold text-gray-700 mb-8">Student Details</h1>
        
        <div className="flex max-w-3xl">
          {/* Left side - Student Image */}
          <div className="w-1/3 pr-8 flex flex-col items-center">
            <div className="w-48 h-48 bg-gray-300 rounded-full overflow-hidden mb-4">
              {student.image ? (
                <img 
                  src={`data:${student.imageType};base64,${student.image}`} 
                  alt={`${student.firstName} ${student.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-400 flex items-center justify-center text-gray-600">
                  No Image
                </div>
              )}
            </div>
          </div>
          
          {/* Right side - Student Info */}
          <div className="w-2/3">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p className="text-lg">{student.firstName} {student.lastName}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500">Address</h3>
              <p className="text-lg">{student.address || 'N/A'}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
              <p className="text-lg">{formatDate(student.dateOfBirth)}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500">Student ID</h3>
              <p className="text-lg">{student.id}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="text-lg">{student.email || 'N/A'}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500">Degree Program</h3>
              <p className="text-lg">{student.degreeProgram?.replace('_', ' ') || 'N/A'}</p>
            </div>
          </div>
        </div>
        
        {/* Actions Buttons */}
        <div className="flex mt-8 space-x-4">
          <button 
            onClick={handleUpdate}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Update student
          </button>
          
          <button 
            onClick={handleDelete}
            className={`px-4 py-2 rounded ${
              confirmDelete 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            {confirmDelete ? 'Confirm removal' : 'Remove student'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Sidebar Component
function Sidebar() {
  const navigate = useNavigate();
  
  return (
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
      
      <div className="mt-12">
        <div 
          className="bg-blue-700 p-4 text-white text-center font-medium cursor-pointer"
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
  );
}