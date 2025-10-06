'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function StickyEnrollBanner() {
  const { data: session } = useSession()
  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-xl p-6">

        {/* Course Details */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#0a2b56'}}>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <span className="font-medium text-gray-900">Duration:</span>
              <span className="text-gray-700 ml-1">12 Hours</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#0a2b56'}}>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Completion Certificate</span>
          </div>


        </div>

        {/* Enroll Button */}
        <Link 
          href={session ? "/dashboard" : "https://payments.cashfree.com/forms?code=pay_form"}
          className="block w-full text-center rounded-lg px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 bg-brand-primary"
        >
          {session ? "Go to Dashboard" : "Enroll Now"}
        </Link>

        {/* Additional Info */}
        <p className="text-xs text-gray-500 text-center mt-3">
          Limited seats available on first-come, first-serve basis
        </p>
      </div>
    </div>
  )
}
