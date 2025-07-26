import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Work Banao</h1>
          <p className="text-lg md:text-xl mb-8">
            A rural gig platform connecting villagers and workers for seamless task collaboration.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-yellow-400 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-yellow-500 transition"
            >
              Register
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Work Banao?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">For Villagers</h3>
              <p className="text-gray-600">
                Easily assign tasks to skilled workers in your community. Manage your projects efficiently with our intuitive dashboard.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">For Workers</h3>
              <p className="text-gray-600">
                Find local gigs, place bids, and grow your income. Access opportunities tailored to your skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-6">Join Work Banao today and connect with your community!</p>
          <button
            onClick={() => navigate('/register')}
            className="bg-yellow-400 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-yellow-500 transition"
          >
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;