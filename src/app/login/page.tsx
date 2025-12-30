'use client';

import { signIn } from 'next-auth/react';
import { FaGoogle, FaUser } from 'react-icons/fa';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-500 mb-8">Sign in to access your bookings and profile</p>

        <div className="space-y-4">
          <Button
            onClick={() => signIn('google', { callbackUrl: '/profile' })}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm"
          >
            <FaGoogle className="text-red-500" />
            <span>Continue with Google</span>
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or for testing</span>
            </div>
          </div>

          <Button
            onClick={() => signIn('credentials', { username: 'demo', callbackUrl: '/profile' })}
            className="w-full flex items-center justify-center gap-3"
          >
            <FaUser />
            <span>Sign in as Demo User</span>
          </Button>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
