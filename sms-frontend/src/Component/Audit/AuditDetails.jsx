import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Adjust the path as necessary

export default function AuditDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [audit, setAudit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAuditDetails();
  }, [id]);

  const fetchAuditDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/audit/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch audit details');
      }
      const data = await response.json();
      setAudit(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-8 flex justify-center items-center">
          <p>Loading audit details...</p>
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
            onClick={() => navigate('/view-audit')}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back to Audit Log
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="ml-64 flex-1 p-8">
        <h1 className="text-3xl font-semibold text-gray-700 mb-8">Audit Record Details</h1>
        
        <div className="max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Audit ID</h3>
                <p className="text-lg">{audit?.id}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Table Name</h3>
                <p className="text-lg">{audit?.tableName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Operation</h3>
                <p className="text-lg">{audit?.operation}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Record ID</h3>
                <p className="text-lg">{audit?.recordId}</p>
              </div>
              
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                <p className="text-lg">
                  {audit?.createdAt ? new Date(audit.createdAt).toLocaleString() : 'N/A'}
                </p>
              </div>
              
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Old Data</h3>
                <pre className="mt-2 p-4 bg-gray-50 rounded-lg overflow-x-auto text-sm">
                  {audit?.oldData ? JSON.stringify(JSON.parse(audit.oldData), null, 2) : 'N/A'}
                </pre>
              </div>
              
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-gray-500">New Data</h3>
                <pre className="mt-2 p-4 bg-gray-50 rounded-lg overflow-x-auto text-sm">
                  {audit?.newData ? JSON.stringify(JSON.parse(audit.newData), null, 2) : 'N/A'}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate('/view-audit')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Back to Audit Log
          </button>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  const navigate = useNavigate();
  
  return (
    <div className="fixed w-64 h-screen bg-blue-500">
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
  );
}