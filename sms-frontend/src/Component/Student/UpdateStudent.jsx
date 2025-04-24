import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    dateOfBirth: '',
    email: '',
    degreeProgram: '',
  });

  useEffect(() => {
    // Fetch student details to prefill the form
    async function fetchStudent() {
      const response = await fetch(`http://localhost:8080/students/${id}`);
      const data = await response.json();
      setFormData(data);
    }
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8080/students/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    navigate('/manage-students');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Update Student</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}