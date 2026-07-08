'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  error?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

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

  // TanStack Query mutation for login
  const loginMutation = useMutation<LoginResponse, Error, LoginData>({
    mutationFn: async (data: LoginData) => {
      const result = await login(data.email, data.password);
      return result;
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success('Login Successful', {
          position: 'top-center',
        });
        // Navigate to dashboard
        router.push('/dashboard');
      } else {
        toast.error(response.error || 'Login failed', {
          position: 'top-center',
        });
      }
    },
    onError: (error) => {
      toast.error(error.message || 'An unexpected error occurred', {
        position: 'top-center',
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Trigger the mutation
    loginMutation.mutate({ email, password });
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
              <path d="M3 3v18h18" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-text-default mb-1">
            Welcome to Trove
          </h1>
          <p className="text-sm text-text-neutral">
            Sign in to your acount
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-[12px] font-medium text-text-neutral mb-2"
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
              disabled={loginMutation.isPending}
              className={`w-full px-4 py-3 bg-bg-default border rounded-xl text-sm text-text-default placeholder:text-text-disabled focus:outline-none focus:border-trove-green focus:bg-card-surface transition-colors ${errors.email ? 'border-negative' : 'border-border'
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
              className="block text-[12px] font-medium text-text-neutral mb-2"
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
              disabled={loginMutation.isPending}
              className={`w-full px-4 py-3 bg-bg-default border rounded-xl text-sm text-text-default placeholder:text-text-disabled focus:outline-none focus:border-trove-green focus:bg-card-surface transition-colors ${errors.password ? 'border-negative' : 'border-border'
                }`}
            />
            {errors.password && (
              <span className="text-xs text-negative mt-1 block">
                {errors.password}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-trove-green text-white rounded-xl font-medium hover:bg-trove-green/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-2"
          >
            {loginMutation.isPending ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span className='text-[12px]'>Sign In</span>
            )}
          </button>
        </form>

        <div className='py-2 items-center text-center'>
          <p className='text-trove-green text-[12px] my-7'>Forgot password?</p>

          <p className='text-text-default text-[12px]'>Don't have an account?</p>


          <button

            className="w-full flex text-[12px] items-center justify-center gap-2 px-6 py-3 mt-8 text-text-neutral rounded-xl font-medium border-2 border-border disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-2"
          >

            <p className='text-[12px]'>Create a Trove Account</p>

          </button>
        </div>


      </div>
    </div>
  );
}
