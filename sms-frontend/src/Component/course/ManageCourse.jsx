import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Adjust the path as necessary

export default function CourseManagementPage() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/courses/all');
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      setCourses(data);
      setError(null);
    } catch (err) {
      setError('Error fetching courses: ' + err.message);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchCourses();
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/courses/search?name=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('Failed to search courses');
      }
      const data = await response.json();
      setCourses(data);
      setError(null);
    } catch (err) {
      setError('Error searching courses: ' + err.message);
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
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
          <img 
            src={logo} 
            alt="Logo" 
            className="w-full h-full object-cover"
          />
        </div>
        </div>
        
        <div className="mt-12">
          <div className="bg-blue-600 p-4 text-white text-center font-medium cursor-pointer hover:bg-blue-700" onClick={() => navigate('/manage-students')}>Students</div>
          <div className="bg-blue-700 p-4 text-white text-center font-medium cursor-pointer">Courses</div>
          <div className="bg-blue-600 p-4 text-white text-center font-medium cursor-pointer hover:bg-blue-700" onClick={() => navigate('/view-audit')}>Audit</div>
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
          <button onClick={() => navigate('/add-course')} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md">Add Course</button>
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
                  <th className="border p-2 text-left">Course Name</th>
                  <th className="border p-2 text-left">Description</th>
                  <th className="border p-2 text-left">StudentIds</th>
                </tr>
              </thead>
              <tbody>
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <tr 
                      key={course.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/course-details/${course.id}`)}
                    >
                      <td className="border p-2">{course.id}</td>
                      <td className="border p-2">{course.name}</td>
                      <td className="border p-2">{course.description}</td>
                      <td className="border p-2">
                        {Array.isArray(course.studentIds) 
                          ? course.studentIds.join(', ')
                          : course.studentIds || 'No students'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="border p-2 text-center">No courses found</td>
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
