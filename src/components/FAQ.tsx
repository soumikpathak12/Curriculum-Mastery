'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "Is this course right for me?",
      answer: "If you wish to teach music as an academic subject in the IB and/or IGCSE school curriculum, then yes. While most schools currently do not require a specific degree for this role, they typically hire based on prior teaching experience, proficiency in at least one instrument, and the ability to manage the complex curriculum. The subject scores or grades affect a student's overall average and their chances of being admitted to their desired universities abroad."
    },
    {
      question: "What makes this course unique - what can I learn here that I cannot find elsewhere or figure out on my own?",
      answer: "In this course, we teach you both IGCSE + IBDP Music curricula for a much smaller fee compared to your other options. In other available courses, you pay Rs 33,000 for IGCSE Music (Introduction + Assessment Workshop) and Rs 1,20,000 for IB DP Music (Category 1 + Category 2 + Category 3 Workshops). We created this course based on my years of experience, insights gained from excellent mentors, and extensive involvement in instrument training, academic teaching, grading, and coordinating a music department - from setting up the music room to supporting students' bands, performances, and portfolios."
    },
    {
      question: "What should I do if I miss a class?",
      answer: "It's only 3 hours split over 4 days spread across 4 weeks. Consider it a taste of school teaching life, which requires a level of consistency and discipline - perhaps a test of your seriousness in pursuing a career as a music educator. This is a short commitment compared to the actual work you will be prepared for after completing this course."
    },
    {
      question: "Would this enable me to get a job at an IB or IGCSE school?",
      answer: "This course is a hands-on teacher training module designed to empower you to confidently manage the diverse responsibilities that come with the role. You will also become part of a supportive community where you can seek guidance if you encounter challenges or simply reach out to us via email."
    }
  ]

  return (
    <section className="mt-12 sm:mt-16">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <p className="mt-4 text-base sm:text-lg text-gray-600 px-4">Get answers to common questions about the course</p>
      </div>
      <div className="mt-8 sm:mt-12 space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-2xl border-2 border-gray-100 bg-white shadow-sm overflow-hidden">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                <svg
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            {openFaq === index && (
              <div className="px-6 pb-6">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
