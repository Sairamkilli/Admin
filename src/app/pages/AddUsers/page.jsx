'use client'

import React, { useState, useEffect } from 'react';

const Employedetails = () => {
  const [template, setTemplate] = useState('');
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [employees, setEmployees] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleAdd = () => {
    if (template && name && dateOfBirth) {
      if (employees.some(emp => emp.id === template)) {
        setError('Employee with this template already exists');
        return;
      }
      const newEmployee = { id: template, name, dateOfBirth };
      setEmployees([...employees, newEmployee]);
      clearForm();
    } else {
      setError('Please fill all fields');
    }
  };

  const handleUpdate = () => {
    if (template && name && dateOfBirth) {
      const existingEmployeeIndex = employees.findIndex(emp => emp.id === template);
      if (existingEmployeeIndex !== -1) {
        const updatedEmployees = [...employees];
        updatedEmployees[existingEmployeeIndex] = { id: template, name, dateOfBirth };
        setEmployees(updatedEmployees);
        clearForm();
        setEditMode(false);
      } else {
        setError('Employee not found. You may add a new employee instead.');
      }
    } else {
      setError('Please fill all fields');
    }
  };

  const handleDelete = () => {
    if (template) {
      const updatedEmployees = employees.filter(emp => emp.id !== template);
      setEmployees(updatedEmployees);
      clearForm();
      setEditMode(false);
    } else {
      setError('Please select an employee to delete');
    }
  };

  const handleEdit = (employee) => {
    setTemplate(employee.id);
    setName(employee.name);
    setDateOfBirth(employee.dateOfBirth);
    setEditMode(true);
  };

  const clearForm = () => {
    setTemplate('');
    setName('');
    setDateOfBirth('');
    setEditMode(false);
    setError('');
  };

  const handleTemplateChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setTemplate(value);
    }
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleDownload = () => {
    const csvContent = Object.keys(employees[0]).join(",") + "\n" + employees.map(row => Object.values(row).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "employees.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>ADD USER</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px', marginBottom: '20px' }}>
        <input
          type="number"
          placeholder="Template"
          value={template}
          onChange={handleTemplateChange}
          onClick={() => setEditMode(false)}
          style={{ padding: '10px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '4px', WebkitAppearance: 'none', MozAppearance: 'textfield' }}
          min="1"
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={handleDateOfBirthChange}
          style={{ padding: '10px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '4px' }}
        />
      </div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <button onClick={handleAdd} style={{ padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', transition: 'background-color 0.3s' }}>Add</button>
        <button onClick={handleDownload} style={{ padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', transition: 'background-color 0.3s' }}>Download</button>
      </div>
      <div style={{ width: '100%', maxWidth: '900px', margin: 'auto', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>USERS LIST</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {employees.map((employee) => (
            <li key={employee.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', marginBottom: '0', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <span style={{ flex: 1, marginRight: '10px', textAlign: 'center', fontWeight: 'bold' }}>Template: {employee.id}</span>
              <span style={{ flex: 1, marginRight: '10px', textAlign: 'center', fontWeight: 'bold' }}>Name: {employee.name}</span>
              <span style={{ flex: 1, textAlign: 'center', display: 'inline-block', fontWeight: 'bold' }}>Date of Birth: {employee.dateOfBirth}</span>
              <button onClick={() => handleEdit(employee)} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', marginLeft: '10px' }}>Select</button>
              <button onClick={() => handleUpdate()} style={{ padding: '10px 15px', backgroundColor: '#008CBA', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', marginLeft: '10px' }}>Update</button>
              <button onClick={() => handleDelete()} style={{ padding: '10px 15px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', marginLeft: '10px' }}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
    </div>
  );
};

export default Employedetails;