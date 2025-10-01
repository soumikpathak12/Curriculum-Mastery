'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import ContactUs from '@/components/ContactUs'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import StickyEnrollBanner from '@/components/StickyEnrollBanner'
import { useSession } from 'next-auth/react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: session, status } = useSession()
  
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      
      if (response.ok) {
        alert('Successfully subscribed to newsletter!')
        setEmail('')
      } else {
        alert('Failed to subscribe. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter error:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Auto-trigger payment if redirected after sign up
  useEffect(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('paynow') === '1' && status === 'authenticated') {
      const btn = document.querySelector('[data-cashfree-pay]') as HTMLButtonElement | null;
      if (btn) btn.click();
    }
  }, [status]);

  return (
    <div className="min-h-screen" style={{backgroundColor: '#ffffff'}}>

      <Header />
      
      {/* Hero Section - Full Width */}
      <section className="relative w-full p-4 sm:p-6">
        <div className="relative mt-4 rounded-2xl p-4 sm:p-6 lg:p-10 bg-white/80 backdrop-blur-sm ring-1 ring-gray-100 overflow-hidden">
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 z-10">
            <div className="flex-1">
              <span className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-brand-neutral-light text-brand-primary">
                IB & IGCSE Music Educators Course
              </span>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                Master the Skills to Teach 
                <span className="text-brand-primary"> IB & IGCSE Music </span> 
                with Confidence
              </h1>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl leading-relaxed text-gray-700">
                <strong>Clarity. Purpose. Confidence.</strong> Get hands-on tools, expert guidance, and curriculum support designed for IB/IGCSE music teachers.
              </p>
              
              <div className="mt-5 sm:mt-6">
                <Link 
                  href="#what-youll-learn" 
                  className="inline-block rounded-lg px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 text-center bg-brand-primary"
                >
                  Learn More
                </Link>
              </div>
              
              {/* Video positioned below Learn More button on mobile */}
              <div className="mt-6 lg:hidden">
                <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[9/16] h-[416px] max-w-[260px] mx-auto">
                  <iframe
                    src="https://www.youtube.com/embed/m4kdTUWkblA?modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&playsinline=1"
                    title="Course Introduction Video"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
            
            {/* Video positioned to the right on desktop */}
            <div className="hidden lg:block w-[333px] flex-shrink-0 ml-auto">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[9/16] h-[416px] ml-auto">
                <iframe
                  src="https://www.youtube.com/embed/m4kdTUWkblA?modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&playsinline=1"
                  title="Course Introduction Video"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Layout - Starts Here */}
      <div className="flex max-w-7xl mx-auto mt-12">
        {/* Main Content Column */}
        <main className="flex-1 relative z-10 p-4 sm:p-6">

        {/* Exclusive Features */}
        <section className="mt-2 sm:mt-3">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Exclusive Features</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 px-4">Real-world training designed specifically for IB & IGCSE music educators</p>
          </div>
          <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border-2 border-brand-neutral-light p-6 transition-all hover:shadow-lg" style={{backgroundColor: '#f7f6f7'}}>
              <div className="rounded-full p-3 w-fit bg-brand-primary">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Live Weekend Sessions</h3>
              <p className="mt-2 text-gray-700">Interactive live classes held over weekends, offering real-time engagement and Q&A sessions.</p>
            </div>

            <div className="rounded-2xl border-2 border-brand-neutral-light p-6 transition-all hover:shadow-lg" style={{backgroundColor: '#f7f6f7'}}>
              <div className="rounded-full p-3 w-fit bg-brand-secondary">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Deep Dive</h3>
              <p className="mt-2 text-gray-700">A comprehensive coverage of IGCSE and IB curriculums to shorten your learning curve.</p>
            </div>

            <div className="rounded-2xl border-2 border-brand-neutral-light p-6 transition-all hover:shadow-lg" style={{backgroundColor: '#f7f6f7'}}>
              <div className="rounded-full p-3 w-fit bg-brand-primary">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Real-World Strategies</h3>
              <p className="mt-2 text-gray-700">Learn practical strategies for handling various scenarios across international school setups, examinations, submissions and performances.</p>
            </div>

            <div className="rounded-2xl border-2 border-brand-neutral-light p-6 transition-all hover:shadow-lg" style={{backgroundColor: '#f7f6f7'}}>
              <div className="rounded-full p-3 w-fit bg-brand-secondary">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">Certificate of Completion</h3>
              <p className="mt-2 text-gray-700">Receive a certificate of completion to support your professional advancement.</p>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section id="what-youll-learn" className="mt-12 sm:mt-16">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What You&apos;ll Learn</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 px-4">Comprehensive curriculum covering both IGCSE and IB frameworks</p>
          </div>
          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "IGCSE Cambridge syllabus essentials",
              "IBDP Music frameworks", 
              "Adapting global curricula for Indian classrooms",
              "Building confidence in evaluation and feedback",
              "Unit Design & Lesson Structure",
              "Command terms, rubrics, and assessments",
              "Creating student-focused learning materials",
              "Teaching with Logic Pro, MuseScore, Soundtrap",
              "Balancing performance, theory, and academics"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg border border-brand-neutral-light p-4 transition-all hover:shadow-md hover:border-brand-primary">
                <div className="rounded-full p-1 mt-1" style={{backgroundColor: 'rgba(3, 14, 80, 0.1)'}}>
                  <svg className="h-4 w-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Course Modules */}
        <section id="modules" className="mt-12 sm:mt-16">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Course Modules</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 px-4">8 comprehensive modules covering IGCSE and IB Music education</p>
          </div>
          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
            {[
              {
                number: "01",
                title: "IGCSE Music: Core Curriculum and Pedagogy",
                description: "Foundation principles and teaching methodologies for IGCSE Music"
              },
              {
                number: "02", 
                title: "Planning & Making your Own Resources",
                description: "An approach to Unit Planning and Links with IGCSE assessments"
              },
              {
                number: "03",
                title: "Music Without Borders",
                description: "A Study of World and Modern Genres in IGCSE Music"
              },
              {
                number: "04",
                title: "Understanding Western Art Music in IGCSE",
                description: "How to approach performance and composition within the curriculum"
              },
              {
                number: "05",
                title: "IBDP Music: Framework and Pedagogy", 
                description: "Core concepts and teaching strategies for IB Diploma Programme Music"
              },
              {
                number: "06",
                title: "Teaching with IB Lens",
                description: "Strategies and Concepts in IBDP Music"
              },
              {
                number: "07",
                title: "IB Assessment & Planning",
                description: "Unit planning and understanding assessment procedures in IBDP Music"
              },
              {
                number: "08",
                title: "Filling the Gaps",
                description: "An overview of IB and IGCSE programs across all school years"
              }
            ].map((module, index) => (
              <div key={index} className="rounded-2xl border-2 border-brand-neutral-light bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-brand-secondary">
                <div className="flex items-start gap-4">
                  <div className="rounded-full px-3 py-1 text-sm font-bold text-white bg-brand-primary">
                    {module.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
                    <p className="mt-2 text-gray-600">{module.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* Requirements & Resources */}
        <section className="mt-12 sm:mt-16">
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
            {/* Requirements */}
            <div className="rounded-2xl border-2 p-8" style={{backgroundColor: '#f7f6f7', borderColor: '#d7d4d4'}}>
              <h2 className="text-2xl font-bold text-gray-900">Requirements</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full p-1 mt-1" style={{backgroundColor: '#8b8c9b'}}>
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Musical Proficiency</h3>
                    <p className="text-sm text-gray-700">Be proficient at one instrument minimum (voice counts too) with some teaching experience preferred</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full p-1 mt-1" style={{backgroundColor: '#8b8c9b'}}>
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Commitment to Attendance</h3>
                    <p className="text-sm text-gray-700">Attend live sessions for the best learning experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full p-1 mt-1" style={{backgroundColor: '#8b8c9b'}}>
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Study Commitment</h3>
                    <p className="text-sm text-gray-700">4-5 hours of studying per week including notes, revision, and coursework</p>
                  </div>
                </div>
                <div className="rounded-lg p-3 mt-4" style={{backgroundColor: '#d7d4d4'}}>
                  <p className="text-sm font-medium" style={{color: '#0a2b56'}}>Limited seats available on first-come, first-serve basis. Course fee of ₹49,900 is non-refundable.</p>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="rounded-2xl border-2 p-8" style={{backgroundColor: '#f7f6f7', borderColor: '#d7d4d4'}}>
              <h2 className="text-2xl font-bold text-gray-900">Resources Provided</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full p-1 mt-1" style={{backgroundColor: '#8b8c9b'}}>
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Live Sessions</h3>
                    <p className="text-sm text-gray-700">12 hours across 4 weekends (11:30am-1:30pm & 5:30-7:30pm)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full p-1 mt-1" style={{backgroundColor: '#8b8c9b'}}>
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Teaching Materials</h3>
                    <p className="text-sm text-gray-700">Resources, examples, and samples tailored to Indian students and school expectations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full p-1 mt-1" style={{backgroundColor: '#8b8c9b'}}>
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Ongoing Support</h3>
                    <p className="text-sm text-gray-700">Guidance throughout first year via email or video meetings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full p-1 mt-1" style={{backgroundColor: '#8b8c9b'}}>
                    <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Q&A Sessions</h3>
                    <p className="text-sm text-gray-700">Dedicated time after each class to address doubts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ />

        {/* About Pratik */}
        <section className="mt-12 sm:mt-16">
          <div className="rounded-2xl p-6 sm:p-8 lg:p-12" style={{backgroundColor: '#f7f6f7'}}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">About Pratik Kulgod</h2>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-80 flex flex-col gap-6">
                {/* Image */}
                <div className="rounded-2xl overflow-hidden">
                  <Image 
                    src="/assets/Pratik.jpg" 
                    alt="Pratik Kulgod - Head of Music at Singapore International School" 
                    width={320}
                    height={240}
                    className="w-full h-60 object-cover"
                    priority
                  />
                </div>
                
                {/* Credentials */}
                <div className="rounded-2xl bg-white p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900">Credentials</h3>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full p-2" style={{backgroundColor: '#8b8c9b'}}>
                        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">PGCE, University of Warwick</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full p-2" style={{backgroundColor: '#8b8c9b'}}>
                        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">Grade 8 Distinction, Trinity College</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full p-2" style={{backgroundColor: '#8b8c9b'}}>
                        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">Head of Music, Singapore International School</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full p-2" style={{backgroundColor: '#8b8c9b'}}>
                        <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-700">Academic Consultant, Trinity College London</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Text Content */}
              <div className="flex-1">
                <div className="space-y-4 text-gray-700">
                  <p className="text-lg leading-relaxed text-justify">
                    With over <strong>14 years of experience</strong> in music education and performance, Pratik Kulgod brings passion and expertise to the field of music. He currently serves as <strong>Head of Music at Singapore International School</strong>. A strong advocate for using music that students enjoy to teach concepts, he also championed the revival of a fun interschool music competition called Conzert, hosted by his school.
                  </p>
                  <p className="text-lg leading-relaxed text-justify">
                    A dedicated drummer and educator, he holds a <strong>PGCE from the University of Warwick</strong> and earned a <strong>Distinction in Grade 8 Rock & Pop Drums from Trinity College London</strong>. His musical journey began under the guidance of the renowned drummer Gino Banks, and he continues to expand his rhythmic vocabulary through konnakol training with percussion maestro Viveick Rajagopalan.
                  </p>
                  <p className="text-lg leading-relaxed text-justify">
                    Beyond the classroom, Pratik has actively supported music teachers for the past six years - both independently and as an <strong>academic consultant with Trinity College London</strong>. His dedication to nurturing musical talent extends to the stage, where he has performed across India with bands such as Dindun, Daira, Rejected Cartoons, Vajra, and Vizia, as well as in numerous collaborative drumming sessions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <ContactUs />

        {/* Newsletter Section */}
        <section className="mt-16">
          <div className="rounded-2xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden" style={{backgroundColor: '#0a2b56'}}>
            {/* Background Music Notes */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 text-4xl animate-pulse">♪</div>
              <div className="absolute top-8 right-8 text-3xl animate-bounce">♫</div>
              <div className="absolute bottom-4 left-8 text-2xl animate-pulse">♬</div>
              <div className="absolute bottom-8 right-4 text-3xl animate-bounce">♩</div>
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Stay Updated with Music Education Insights</h2>
              <p className="text-base sm:text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Get the latest tips, course announcements, and exclusive content delivered to your inbox.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 rounded-lg text-white placeholder-white bg-white/10 border border-white/20 focus:ring-0 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
                    placeholder="Enter your email address"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-white rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 whitespace-nowrap"
                    style={{color: '#030E50'}}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-12 sm:mt-16 rounded-2xl bg-gray-100 p-6 sm:p-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Important Disclaimer</h2>
            <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 text-sm text-gray-700">
              <p>
                This course is independently developed to support music educators and is not affiliated with, endorsed by, or officially connected to Cambridge Assessment International Education or the International Baccalaureate Organization. All references to IB and IGCSE curricula are for educational and training purposes only.
              </p>
              <p>
                All content on this website, including text, materials, and media, is the intellectual property of Pratik Kulgod and may not be reproduced or distributed without permission.
              </p>
            </div>
          </div>
        </section>

        </main>
        
        {/* Right Column for Banner */}
        <aside className="hidden xl:block w-80 flex-shrink-0">
          <div className="sticky top-42 p-4">
            <StickyEnrollBanner />
          </div>
        </aside>
      </div>

      {/* Mobile Enroll Banner - Above Footer */}
      <section className="xl:hidden mx-auto max-w-6xl p-4 sm:p-6 mt-12">
        <StickyEnrollBanner />
      </section>

      <footer className="mt-16 border-t bg-gray-50">
        <div className="mx-auto max-w-6xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <span>© {new Date().getFullYear()} Pratik Kulgod. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
