import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import FeaturedPosts from '@/components/FeaturedPosts'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

export default function LocalePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedPosts />
      <About />
      <Contact />
      <Footer />
      <ChatWidget />
    </main>
  )
}
