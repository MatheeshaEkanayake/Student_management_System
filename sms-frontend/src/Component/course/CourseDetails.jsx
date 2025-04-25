import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Adjust the path as necessary

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStudentId, setNewStudentId] = useState('');

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const handleDeleteCourse = async () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const response = await fetch(`http://localhost:8080/courses/delete/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete course');
        navigate('/manage-courses');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/courses/${id}`);
      if (!response.ok) throw new Error('Failed to fetch course details');
      const data = await response.json();
      setCourse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleAddStudent = async () => {
    try {
      const response = await fetch(`http://localhost:8080/courses/${id}/students/${newStudentId}`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to add student');
      fetchCourseDetails(); // Refresh course data
      setNewStudentId('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveStudent = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:8080/courses/${id}/students/delete/${studentId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to remove student');
      fetchCourseDetails(); // Refresh course data
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="flex h-screen bg-gray-100">
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

      <div className="ml-64 flex-1 p-8 overflow-x-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-semibold text-gray-700">{course?.name}</h1>
            <p className="text-gray-600 mt-2">{course?.description}</p>
        </div>
        <div className="flex gap-4">
            <button
            onClick={() => navigate('/manage-courses')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
            Back to Courses
            </button>
            <button
            onClick={handleDeleteCourse}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
            Delete Course
            </button>
        </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Enrolled Students</h2>
          
          <div className="flex gap-4 mb-6">
            <input
              type="number"
              value={newStudentId}
              onChange={(e) => setNewStudentId(e.target.value)}
              placeholder="Enter Student ID"
              className="border rounded px-3 py-2 flex-1"
            />
            <button
              onClick={handleAddStudent}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Student
            </button>
          </div>

          {course?.studentIds?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Student ID</th>
                    <th className="border p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {course.studentIds.map(studentId => (
                    <tr key={studentId} className="hover:bg-gray-50">
                      <td className="border p-2">
                        {studentId}
                      </td>
                      <td className="border p-2">
                        <button
                          onClick={() => handleRemoveStudent(studentId)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No students enrolled in this course</p>
          )}
        </div>
      </div>
    </div>
  );
}