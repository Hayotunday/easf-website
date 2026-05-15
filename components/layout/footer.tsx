import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-20 border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-primary font-bold text-lg">
                E
              </div>
              <div>
                <div className="font-heading text-2xl font-bold">EASF</div>
                <p className="text-xs text-white/60">Education for Africa</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Empowering the next generation of African leaders through education and mentorship.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-white/70 hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="text-white/70 hover:text-gold transition-colors">
                  Scholarships
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-white/70 hover:text-gold transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-white/70 hover:text-gold transition-colors">
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Contact</h4>
            <div className="text-sm space-y-2 text-white/70">
              <p>
                <span className="block text-white font-medium mb-1">Email</span>
                educationforafrica84@gmail.com
              </p>
              <p>
                <span className="block text-white font-medium mb-1">Phone</span>
                +234-08157450370
              </p>
              <p>
                <span className="block text-white font-medium mb-1">Web</span>
                www.eduforafrika.org
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-white">Social</h4>
            <div className="space-y-3">
              <a
                href="#"
                className="text-white/70 hover:text-gold transition-colors text-sm block"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-gold transition-colors text-sm block"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-gold transition-colors text-sm block"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-gold transition-colors text-sm block"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/60">
            <p>
              &copy; {currentYear} Education for Africa Scholarship Foundation. All Rights
              Reserved.
            </p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <Link href="#" className="hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-gold transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
