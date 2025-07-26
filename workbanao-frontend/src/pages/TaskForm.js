import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { getUserId, getUserRole } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

function TaskForm() {
  const [task, setTask] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = getUserRole();
    if (role !== 'VILLAGER') {
      setError('Only Villagers can create tasks.');
      setTimeout(() => navigate('/'), 3000); // Redirect to homepage after 3s
    }
  }, [navigate]);

  const validateForm = () => {
    if (!task.title || task.title.length < 3) {
      setError('Title must be at least 3 characters long.');
      return false;
    }
    if (!task.description || task.description.length < 10) {
      setError('Description must be at least 10 characters long.');
      return false;
    }
    if (!task.location || task.location.length < 3) {
      setError('Location must be at least 3 characters long.');
      return false;
    }
    if (!task.category || task.category.length < 3) {
      setError('Category must be at least 3 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const userId = getUserId();
    console.log('userId:', userId);
    console.log('accessToken:', localStorage.getItem('accessToken'));

    if (!userId) {
      setError('Please log in to create a task.');
      setLoading(false);
      return;
    }

    try {
     await api.post(`/tasks/create/${userId}`, task, {
       headers: { 'X-Skip-Redirect': true }
     });
      alert('Task created successfully!');
      setTask({ title: '', description: '', location: '', category: '' });
    } catch (err) {
      console.error('Task creation failed:', err.response?.data || err.message);
      if (err.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
      } else {
        setError(err.response?.data?.message || 'Failed to create task. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl animate-fade-in">
        <h2 className="text-3xl font-extrabold text-white text-center mb-8">
          Create a New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-white">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              placeholder="Enter task title"
              required
              className="mt-2 block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              placeholder="Enter task description"
              required
              className="mt-2 block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
              rows="4"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-white">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={task.location}
              onChange={(e) => setTask({ ...task, location: e.target.value })}
              placeholder="Enter task location"
              required
              className="mt-2 block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-white">
              Category
            </label>
            <input
              id="category"
              name="category"
              type="text"
              value={task.category}
              onChange={(e) => setTask({ ...task, category: e.target.value })}
              placeholder="Enter task category"
              required
              className="mt-2 block w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm animate-fade-in">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 rounded-lg shadow-md text-sm font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-transform transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Creating Task...' : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;