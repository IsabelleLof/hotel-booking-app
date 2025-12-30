'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaHotel, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import clsx from 'clsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Search', href: '/search' },
  ];

  if (session) {
    navLinks.push({ name: 'My Bookings', href: '/profile' });
  }

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <FaHotel className="text-2xl" />
            <span>StayEase</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-sm font-medium transition-colors hover:text-blue-600',
                  pathname === link.href ? 'text-blue-600' : 'text-gray-600'
                )}
              >
                {link.name}
              </Link>
            ))}
            
            {session ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  {session.user?.image ? (
                    <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full" />
                  ) : (
                    <FaUserCircle className="text-2xl text-gray-400" />
                  )}
                  <span>{session.user?.name}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-lg shadow-blue-600/20"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-100"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'block px-3 py-2 rounded-md text-base font-medium',
                  pathname === link.href
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-100">
              {session ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2">
                    {session.user?.image ? (
                      <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full" />
                    ) : (
                      <FaUserCircle className="text-2xl text-gray-400" />
                    )}
                    <span className="font-medium text-gray-700">{session.user?.name}</span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
