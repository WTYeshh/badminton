import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

const images = [
  { src: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop', alt: 'Court aerial', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1599474924187-334a4ae5bd3b?w=600&auto=format&fit=crop', alt: 'Game action' },
  { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&auto=format&fit=crop', alt: 'Training' },
  { src: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&auto=format&fit=crop', alt: 'Smash' },
  { src: 'https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=600&auto=format&fit=crop', alt: 'Court side' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop', alt: 'Academy' },
  { src: 'https://images.unsplash.com/photo-1604480133435-25b86862d276?w=800&auto=format&fit=crop', alt: 'Team' },
  { src: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&auto=format&fit=crop', alt: 'Shuttle' },
  { src: 'https://images.unsplash.com/photo-1544298621-a28e053efca7?w=600&auto=format&fit=crop', alt: 'Court net' },
]

export default function Gallery() {
  return (
    <PageLayout>
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="text-center space-y-4 mb-16">
            <SectionLabel>Gallery</SectionLabel>
            <h1 className="font-heading text-5xl md:text-6xl font-black">Inside SmashAcademy</h1>
            <p className="text-muted max-w-md mx-auto">Moments from our courts, coaching sessions, and tournaments.</p>
          </div>
        </FadeUp>

        {/* Masonry gallery */}
        <FadeUp delay={0.1}>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {images.map((img, i) => (
              <div key={i} className="break-inside-avoid overflow-hidden rounded-2xl bg-card border border-border group cursor-pointer">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ aspectRatio: i === 0 ? '4/3' : i % 3 === 0 ? '3/4' : '4/3' }}
                />
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </PageLayout>
  )
}
