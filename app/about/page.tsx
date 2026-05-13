import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="font-heading text-6xl md:text-7xl font-bold tracking-tighter mb-6">
          About EASF
        </h1>
        <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
          Empowering the next generation of African leaders through education,
          mentorship, and opportunity.
        </p>
      </div>

      {/* Mission & Story */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="font-heading text-4xl font-semibold mb-6">
            Our Story
          </h2>
          <div className="prose prose-lg font-serif text-muted-foreground">
            <p className="text-xl leading-relaxed">
              Founded in 2024, the Education for Africa Scholarship Foundation
              (EASF) is a private, non-profit organization committed to breaking
              down financial barriers that prevent talented African youth from
              accessing quality higher education.
            </p>
            <p className="text-xl leading-relaxed">
              We believe talent is universal, but opportunity is not. Our
              mission is to identify high-achieving students across Africa and
              provide them with the resources, support, and networks they need
              to become the next generation of leaders.
            </p>
          </div>
        </div>

        <div className="relative h-105 rounded-3xl overflow-hidden">
          <Image
            src="/images/about-students.jpg"
            alt="EASF Scholars"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Core Belief */}
      <div className="bg-primary text-white rounded-3xl p-12 md:p-16 text-center mb-20">
        <p className="text-3xl md:text-4xl font-serif leading-tight max-w-4xl mx-auto">
          &ldquo;Money should never be an obstacle to a quality
          education.&rdquo;
        </p>
        <p className="mt-6 text-primary-foreground/80">— EASF Core Belief</p>
      </div>

      {/* Our Identity & Focus */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <Card>
          <CardContent className="p-10">
            <h3 className="font-heading text-2xl font-semibold mb-4">
              Our Identity
            </h3>
            <p className="text-muted-foreground">
              A private, non-governmental, non-profit organization established
              with a singular vision: to provide higher education access to
              talented individuals across the African continent.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-10">
            <h3 className="font-heading text-2xl font-semibold mb-4">
              Our Focus
            </h3>
            <p className="text-muted-foreground">
              Enhancing youth capability by removing the daunting financial
              barriers that stand between potential and achievement.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Goals */}
      <div className="mb-20">
        <h2 className="font-heading text-4xl font-semibold text-center mb-12">
          Strategic Goals
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                📚
              </div>
              <h3 className="font-semibold text-xl mb-3">
                Academic Excellence
              </h3>
              <p className="text-muted-foreground">
                Providing comprehensive information about university admissions
                and vocational paths.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                👥
              </div>
              <h3 className="font-semibold text-xl mb-3">Expert Mentorship</h3>
              <p className="text-muted-foreground">
                Personalized career counseling and academic mentorship to help
                students align passions with market needs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
                💰
              </div>
              <h3 className="font-semibold text-xl mb-3">Financial Support</h3>
              <p className="text-muted-foreground">
                Direct scholarship grants and financial planning assistance to
                cover tuition, books, and living costs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Impact Numbers */}
      <div className="bg-surface-container rounded-3xl py-16 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold text-gold">500+</div>
            <div className="mt-2 text-muted-foreground">Scholars Supported</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-gold">12+</div>
            <div className="mt-2 text-muted-foreground">Countries Reached</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-gold">100%</div>
            <div className="mt-2 text-muted-foreground">Tuition Coverage</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-gold">15+</div>
            <div className="mt-2 text-muted-foreground">Vocational Tracks</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="font-heading text-4xl font-semibold mb-6">
          Join Our Mission
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Whether you're a student, mentor, or donor — together we can build a
          brighter future for Africa.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="bg-gold hover:bg-amber-500 text-primary"
            asChild
          >
            <a href="/apply">Apply for Scholarship</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/donate">Become a Donor</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
