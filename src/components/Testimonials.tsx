import Image from 'next/image'

export default function Testimonials() {
  return (
    <section className="mt-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">What Educators Say</h2>
        <p className="mt-4 text-base sm:text-lg text-gray-600 px-4">Hear from music education professionals who know Pratik&apos;s work</p>
      </div>
      
      <div className="space-y-6">
        {/* Albert Testimonial */}
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="flex items-start gap-6">
            <Image 
              src="/assets/Albert.jpeg" 
              alt="Prof. Albert O.U. Authority" 
              width={80} 
              height={80} 
              className="w-20 h-20 rounded-full object-cover object-center flex-shrink-0"
            />
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="font-bold text-gray-900">Prof. Albert O.U. Authority</h3>
                <p className="text-sm text-gray-600">Professor of Music Theory and Composition</p>
                <p className="text-xs text-gray-500">Maryland, USA</p>
              </div>
              <blockquote className="text-gray-700 italic">
                &ldquo;Pratik Kulgod is an exceptional educator and leader. As his HoD at SIS Mumbai, I witnessed his diligence, proactive approach, and collegial nature. He consistently demonstrated a strong work ethic and dedication to music education. His leadership qualities and passion for music made his eventual promotion to subject head of music well-deserved and unsurprising.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
        
        {/* Pritha Testimonial */}
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="flex items-start gap-6">
            <Image 
              src="/assets/Pritha.jpeg" 
              alt="Pritha Ghosh" 
              width={80} 
              height={80} 
              className="w-20 h-20 rounded-full object-cover object-center flex-shrink-0"
            />
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="font-bold text-gray-900">Pritha Ghosh</h3>
                <p className="text-sm text-gray-600">Vocalist</p>
                <p className="text-xs text-gray-500">IGCSE Music Teacher</p>
              </div>
              <blockquote className="text-gray-700 italic">
                &ldquo;Pratik is a fabulous music educator with a strong foundation in the curriculum and a passion for teaching. His deep knowledge and approachable style make learning both effective and enjoyable. He has consistently supported me, especially with complex paperwork, always going the extra mile. I highly recommend him as a trainer - his experience, dedication, and professionalism are truly commendable.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
        
        {/* Kadadi Testimonial */}
        <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
          <div className="flex items-start gap-6">
            <Image 
              src="/assets/Kadadi.jpg" 
              alt="Sidharth Kadadi" 
              width={80} 
              height={80} 
              className="w-20 h-20 rounded-full object-cover object-top flex-shrink-0"
            />
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="font-bold text-gray-900">Sidharth Kadadi</h3>
                <p className="text-sm text-gray-600">Founder - Guitar Garage Inc., Zygnema, Scarfest</p>
                <p className="text-xs text-gray-500">Academic Consultant, Trinity College London, India</p>
              </div>
              <blockquote className="text-gray-700 italic">
                &ldquo;Pratik is no ordinary music educator. He is a musician at heart first and his main focus, as an educator, is to install this belief in his students&apos; mind. An accomplished and an experienced live musician, who also happens to be a highly qualified individual. Imbibing all these elements together is a very rare quality in today&apos;s time. A mix of traditional and modern approach is exactly what he does and believes in. I&apos;ve shared the stage with him for over a decade and along with that, he has been an absolute rockstar as a presenter at Trinity College London - India.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
