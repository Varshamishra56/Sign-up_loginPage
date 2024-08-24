import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupLoginForm = ({ isSignup }) => {
  const [formType, setFormType] = useState(isSignup);
  const navigate = useNavigate(); 

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleForm = () => {
    setFormType(!formType);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formType && password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const url = formType ? 'http://localhost:3001/register' : 'http://localhost:3001/login';
    const payload = formType ? { name, email, password } : { email, password };

    axios.post(url, payload)
      .then(result => {
        console.log(result);
        if (result.data === "Success") {
          navigate('/Home');
        } else {
          alert(result.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="bg-gradient-to-r from-slate-600 via-slate-700 to-slate-600 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 m-auto bg-white rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          {formType ? 'Create an Account' : 'Welcome Back'}
        </h1>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {formType && (
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter your name"
                required
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
          )}

          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="relative mt-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          {formType && (
            <div className="relative mt-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-3 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Confirm your password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-transform transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {formType ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </form>

        <p className="mt-8 text-sm font-light text-center text-gray-600">
          {formType ? 'Already have an account?' : 'Don\'t have an account yet?'}{' '}
          <button
            onClick={toggleForm}
            className="font-medium text-blue-600 hover:underline focus:outline-none"
          >
            {formType ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupLoginForm;
