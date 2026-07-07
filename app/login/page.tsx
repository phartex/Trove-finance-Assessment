'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (!result.success) {
        setLoginError(result.error || 'Login failed. Please try again.');
      }
    } catch {
      setLoginError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-page p-4">
      <div className="bg-card-surface rounded-2xl border border-border p-8 sm:p-12 w-full max-w-md shadow-sm animate-fade-in">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-trove-green rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-8 h-8 text-white"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <path d="M3 3v18h18"/>
              <path d="M18 17V9"/>
              <path d="M13 17V5"/>
              <path d="M8 17v-3"/>
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-text-default mb-1">
            Welcome to Trove
          </h1>
          <p className="text-sm text-text-neutral">
            Sign in to access your portfolio
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email Field */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-text-default mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors(prev => ({ ...prev, email: undefined }));
                }
              }}
              placeholder="Enter your email"
              disabled={isLoading}
              className={`w-full px-4 py-3 bg-bg-default border rounded-xl text-sm text-text-default placeholder:text-text-disabled focus:outline-none focus:border-trove-green focus:bg-card-surface transition-colors ${
                errors.email ? 'border-negative' : 'border-border'
              }`}
            />
            {errors.email && (
              <span className="text-xs text-negative mt-1 block">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-text-default mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) {
                  setErrors(prev => ({ ...prev, password: undefined }));
                }
              }}
              placeholder="Enter your password"
              disabled={isLoading}
              className={`w-full px-4 py-3 bg-bg-default border rounded-xl text-sm text-text-default placeholder:text-text-disabled focus:outline-none focus:border-trove-green focus:bg-card-surface transition-colors ${
                errors.password ? 'border-negative' : 'border-border'
              }`}
            />
            {errors.password && (
              <span className="text-xs text-negative mt-1 block">
                {errors.password}
              </span>
            )}
          </div>

          {/* General Error */}
          {loginError && (
            <div className="px-4 py-3 bg-red-100 rounded-xl text-sm text-negative">
              {loginError}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-trove-green text-white rounded-xl font-medium hover:bg-trove-green/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-2"
          >
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-bg-default rounded-xl text-xs text-text-neutral">
          <strong className="text-text-default">Demo:</strong> Use any valid email and password (min 6 chars)
        </div>
      </div>
    </div>
  );
}
