import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-primary font-bold text-2xl">
              E
            </div>
            <div className="font-heading text-3xl font-bold">EASF</div>
          </div>
          <p className="text-primary-foreground/80">
            Empowering the next generation of African leaders through education.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/scholarships" className="hover:underline">
                Scholarships
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:underline">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/apply" className="hover:underline">
                Apply Now
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-sm text-primary-foreground/80">
            www.eduforafrika.org
            <br />
            educationforafrica84@gmail.com
            <br />
            +234-08157450370
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <p className="text-sm mb-3">Stay updated with our impact</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm flex-1"
            />
            <Button variant="secondary" className="bg-gold text-primary">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
        &copy; 2024 Education for Africa Scholarship Foundation. All Rights
        Reserved.
      </div>
    </footer>
  );
}
