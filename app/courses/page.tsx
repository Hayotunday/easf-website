import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const vocationalCourses = [
  { title: "Computer Repair & Maintenance Tech", category: "Technical" },
  { title: "Paints Production & Painting Tech", category: "Technical" },
  { title: "Electrical Installation Tech", category: "Technical" },
  { title: "Catering", category: "Hospitality" },
  { title: "P.O.P Installation Tech", category: "Technical" },
  { title: "Garment Making & Design", category: "Creative Arts" },
];

const academicCourses = [
  { title: "Accountancy", category: "Business" },
  { title: "Business Administration", category: "Business" },
  { title: "Science Lab Tech", category: "Science & Technology" },
  { title: "Computer Science", category: "Technology" },
  { title: "Mass Communication", category: "Media" },
  { title: "Electrical Electronics", category: "Engineering" },
  { title: "Computer Engineering", category: "Engineering" },
];

export default function CoursesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="font-heading text-5xl font-bold mb-4">Our Programs</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          World-class academic education and hands-on vocational training
          designed to empower the next generation of African leaders and
          innovators.
        </p>
      </div>

      {/* Academic & Professional Courses */}
      <section className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h2 className="font-heading text-3xl font-semibold text-center">
            Academic & Professional Courses
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {academicCourses.map((course, i) => (
            <Card key={i} className="card-hover group">
              <CardContent className="p-8">
                <div className="text-4xl mb-6 text-gold">🎓</div>
                <h3 className="font-semibold text-2xl mb-3 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {course.category}
                </p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Technical & Vocational Courses */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h2 className="font-heading text-3xl font-semibold text-center">
            Technical & Vocational Courses
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vocationalCourses.map((course, i) => (
            <Card key={i} className="card-hover group">
              <CardContent className="p-8">
                <div className="text-4xl mb-6">🛠️</div>
                <h3 className="font-semibold text-2xl mb-3 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {course.category}
                </p>
                <Button className="w-full bg-gold hover:bg-amber-500 text-primary">
                  Join Class
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <div className="mt-20 bg-primary text-white rounded-3xl p-12 text-center">
        <h3 className="font-heading text-3xl font-semibold mb-4">
          Ready to transform your future?
        </h3>
        <p className="text-lg mb-8 max-w-md mx-auto">
          Applications for the 2026/2027 session are now open.
        </p>
        <Button
          size="lg"
          className="bg-gold hover:bg-amber-500 text-primary text-lg px-10"
          asChild
        >
          <a href="/apply">Apply for Scholarship</a>
        </Button>
      </div>
    </div>
  );
}
