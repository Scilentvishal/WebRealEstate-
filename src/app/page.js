import HeroSection from '@/components/hero/Hero'
import Properties from '@/components/properties/Properties'
import { Property } from '@/components/properties/propertyData'
import Image from 'next/image'

export default function Home() {
  return (
   <>
   <HeroSection />
   <Properties properties={Property} />
   </>
  )
}
