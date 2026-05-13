import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;
  field: string;
  deadline: string;
  slug: string;
}

export default function ScholarshipCard({
  title,
  field,
  deadline,
  slug,
}: Props) {
  return (
    <Card className="card-hover">
      <CardContent className="p-8">
        <h3 className="font-semibold text-2xl mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{field}</p>
        <p className="text-sm mb-6">
          Deadline: <span className="font-medium">{deadline}</span>
        </p>
        <Button asChild className="w-full">
          <Link href={`/scholarships/${slug}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
