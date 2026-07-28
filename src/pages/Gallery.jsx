import PageLayout from '../components/layout/PageLayout'
import SectionLabel from '../components/ui/SectionLabel'
import { FadeUp, AnimatedTitle, ScaleIn } from '../components/ui/ScrollReveal'
import {
  VOL_1, VOL_2, VOL_3, VOL_4, VOL_5, VOL_6,
  VOL_7, VOL_8, VOL_9
} from '../assets/images'

const images = [
  { src: VOL_1, alt: 'Court aerial',    aspectClass: 'aspect-[4/3]' },
  { src: VOL_2, alt: 'Game action',     aspectClass: 'aspect-[4/3]' },
  { src: VOL_3, alt: 'Training',        aspectClass: 'aspect-[3/4]' },
  { src: VOL_4, alt: 'Smash',           aspectClass: 'aspect-[4/3]' },
  { src: VOL_5, alt: 'Court side',      aspectClass: 'aspect-[3/4]' },
  { src: VOL_6, alt: 'Academy',         aspectClass: 'aspect-[4/3]' },
  { src: VOL_7, alt: 'Team',            aspectClass: 'aspect-[4/3]' },
  { src: VOL_8, alt: 'Shuttle',         aspectClass: 'aspect-[3/4]' },
  { src: VOL_9, alt: 'Court net',       aspectClass: 'aspect-[4/3]' },
]

export default function Gallery() {
  return (
    <PageLayout>
      <div className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6">

        <FadeUp>
          <div className="text-center space-y-4 mb-14 sm:mb-16">
            <SectionLabel>Gallery</SectionLabel>
            <AnimatedTitle as="h1" className="font-heading text-4xl sm:text-5xl md:text-6xl font-black">
              Inside SmashAcademy
            </AnimatedTitle>
            <p className="text-muted max-w-md mx-auto">Moments from our courts, coaching sessions, and tournaments.</p>
          </div>
        </FadeUp>

        {/* Masonry gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <ScaleIn key={i} delay={i * 0.05}>
              <div className={`break-inside-avoid overflow-hidden rounded-2xl bg-card border border-border group cursor-pointer ${img.aspectClass}`}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </ScaleIn>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
