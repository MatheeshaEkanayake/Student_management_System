import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function ManageAuditPage() {
  const [auditRecords, setAuditRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAuditRecords();
  }, []);

  const fetchAuditRecords = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/audit/all'); // Backend endpoint for fetching audit records
      if (!response.ok) {
        throw new Error('Failed to fetch audit records');
      }
      const data = await response.json();
      setAuditRecords(data);
      setError(null);
    } catch (err) {
      setError('Error fetching audit records: ' + err.message);
      setAuditRecords([]);
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
            className="bg-blue-700 p-4 text-white text-center font-medium cursor-pointer"
            onClick={() => navigate('/view-audit')}
          >
            Audit
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 flex-1 p-8 overflow-x-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Audit Records</h1>
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
                <th className="border p-2 text-left">Table Name</th>
                <th className="border p-2 text-left">Operation</th>
                <th className="border p-2 text-left">Record ID</th>
                <th className="border p-2 text-left">Old Data</th>
                <th className="border p-2 text-left">New Data</th>
                <th className="border p-2 text-left">Created At</th>
              </tr>
            </thead>
              <tbody>
              {auditRecords.length > 0 ? (
                auditRecords.map((record) => (
                  <tr 
                    key={record.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/audit/${record.id}`)}
                  >
                    <td className="border p-2">{record.id}</td>
                    <td className="border p-2">{record.tableName}</td>
                    <td className="border p-2">{record.operation}</td>
                    <td className="border p-2">{record.recordId}</td>
                    <td className="border p-2">
                      <div className="max-w-xs overflow-hidden text-ellipsis">
                        {record.oldData}
                      </div>
                    </td>
                    <td className="border p-2">
                      <div className="max-w-xs overflow-hidden text-ellipsis">
                        {record.newData}
                      </div>
                    </td>
                    <td className="border p-2">
                      {new Date(record.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
                ) : (
                  <tr>
                    <td colSpan="4" className="border p-2 text-center">
                      No audit records found
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