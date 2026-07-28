// Wrapper for all public pages

import Navbar from './Navbar'
import Footer from './Footer'

export default function PageLayout({ children, noFooter = false }) {
  return (
    <div className="min-h-screen bg-bg text-text grid-bg">
      <Navbar />
      <main>{children}</main>
      {!noFooter && <Footer />}
    </div>
  )
}
