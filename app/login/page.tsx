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
    <div 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-page)',
        padding: 'var(--spacing-md)',
      }}
    >
      <div 
        className="card fade-in"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: 'var(--spacing-2xl)',
        }}
      >
        {/* Logo/Brand */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <div 
            style={{
              width: '64px',
              height: '64px',
              backgroundColor: 'var(--trove-green)',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--spacing-md)',
            }}
          >
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3v18h18"/>
              <path d="M18 17V9"/>
              <path d="M13 17V5"/>
              <path d="M8 17v-3"/>
            </svg>
          </div>
          <h1 
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: 'var(--text-default)',
              marginBottom: 'var(--spacing-xs)',
            }}
          >
            Welcome to Trove
          </h1>
          <p style={{ color: 'var(--text-neutral)', fontSize: '14px' }}>
            Sign in to access your portfolio
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          {/* Email Field */}
          <div>
            <label 
              htmlFor="email" 
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--text-default)',
                marginBottom: 'var(--spacing-sm)',
              }}
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
              className={`input ${errors.email ? 'input-error' : ''}`}
              disabled={isLoading}
            />
            {errors.email && (
              <span style={{ 
                color: 'var(--negative)', 
                fontSize: '12px', 
                marginTop: 'var(--spacing-xs)',
                display: 'block',
              }}>
                {errors.email}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label 
              htmlFor="password" 
              style={{
                display: 'block',
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--text-default)',
                marginBottom: 'var(--spacing-sm)',
              }}
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
              className={`input ${errors.password ? 'input-error' : ''}`}
              disabled={isLoading}
            />
            {errors.password && (
              <span style={{ 
                color: 'var(--negative)', 
                fontSize: '12px', 
                marginTop: 'var(--spacing-xs)',
                display: 'block',
              }}>
                {errors.password}
              </span>
            )}
          </div>

          {/* General Error */}
          {loginError && (
            <div 
              style={{
                padding: '12px 16px',
                backgroundColor: '#FEE2E2',
                borderRadius: 'var(--radius-md)',
                color: 'var(--negative)',
                fontSize: '13px',
              }}
            >
              {loginError}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            style={{ width: '100%', marginTop: 'var(--spacing-sm)' }}
          >
            {isLoading ? (
              <>
                <span className="spinner" style={{ borderTopColor: 'white' }} />
                <span>Signing in...</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div 
          style={{
            marginTop: 'var(--spacing-xl)',
            padding: 'var(--spacing-md)',
            backgroundColor: 'var(--bg-default)',
            borderRadius: 'var(--radius-md)',
            fontSize: '12px',
            color: 'var(--text-neutral)',
          }}
        >
          <strong style={{ color: 'var(--text-default)' }}>Demo:</strong> Use any valid email and password (min 6 chars)
        </div>
      </div>
    </div>
  );
}
