'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="flex w-full items-center justify-between pl-4 pr-2 py-2 sm:pl-6 sm:pr-3 sm:py-3">
        <Link href="/" className="flex items-center gap-1 hover:opacity-90 transition-opacity">
          <Image 
            src="/assets/Curriculum Mastery Logo Small (1).png" 
            alt="Curriculum Mastery Logo" 
            width={288} 
            height={288} 
            className="h-[108px] w-auto sm:h-[144px]"
            priority
          />
          <div className="flex flex-col">
            <span className="text-xl sm:text-3xl font-bold text-brand-primary leading-tight tracking-wide">Curriculum</span>
            <span className="text-2xl sm:text-4xl font-bold text-brand-primary leading-tight uppercase">MASTERY</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-brand-primary transition-colors font-medium">
            Home
          </Link>
          <Link href="#modules" className="text-gray-700 hover:text-brand-primary transition-colors font-medium">
            Modules
          </Link>
          <Link href="#contact" className="text-gray-700 hover:text-brand-primary transition-colors font-medium">
            Contact
          </Link>
          
          {session ? (
            <>
              <Link href="/dashboard" className="text-gray-700 hover:text-brand-primary transition-colors font-medium">
                Dashboard
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  Welcome, {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:border-brand-primary hover:text-brand-primary transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:border-brand-primary hover:text-brand-primary transition-colors"
              >
                Login
              </Link>
              <Link 
                href="https://payments.cashfree.com/forms?code=pay_form" 
                className="rounded-lg px-5 py-2.5 text-base font-medium text-white shadow-md hover:shadow-lg transition-all bg-brand-primary mr-[50px]"
              >
                Enroll Now
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="flex flex-col p-4 space-y-3">
            <Link 
              href="/" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="#modules" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Modules
            </Link>
            <Link 
              href="#contact" 
              className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {session ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="px-4 py-2 text-sm text-gray-600 border-t border-gray-100">
                  Welcome, {session.user?.name || session.user?.email}
                </div>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    signOut({ callbackUrl: '/' })
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="https://payments.cashfree.com/forms?code=pay_form" 
                  className="w-full text-center rounded-lg px-4 py-2.5 text-white font-medium bg-brand-primary mr-[75px]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Enroll Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
