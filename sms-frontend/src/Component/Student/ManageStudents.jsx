import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentManagementPage() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/students/all');
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
      setError(null);
    } catch (err) {
      setError('Error fetching students: ' + err.message);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchStudents();
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/students/search?name=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('Failed to search students');
      }
      const data = await response.json();
      setStudents(data);
      setError(null);
    } catch (err) {
      setError('Error searching students: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-500">
        <div className="p-6">
          <div className="w-24 h-24 mx-auto bg-gray-400 rounded-full"></div>
        </div>
        
        {/* Lowered nav buttons by adding margin-top */}
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

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between mb-6">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="search"
              className="w-full p-2 pl-4 bg-gray-300 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <button 
            onClick={() => navigate('/add-student')}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md">
            Add Student
          </button>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}
        
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">ID</th>
                  <th className="border p-2 text-left">First Name</th>
                  <th className="border p-2 text-left">Last Name</th>
                  <th className="border p-2 text-left">Email</th>
                  <th className="border p-2 text-left">Degree Program</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="border p-2">{student.id}</td>
                      <td className="border p-2">{student.firstName}</td>
                      <td className="border p-2">{student.lastName}</td>
                      <td className="border p-2">{student.email}</td>
                      <td className="border p-2">{student.degreeProgram}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="border p-2 text-center">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}