import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FeedbackPage(): JSX.Element {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Feedback</h1>

      <div className="flex items-center space-x-4">
        <Input type="search" placeholder="Search feedback" className="w-1/3" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="highest-rated">Highest Rated</SelectItem>
            <SelectItem value="lowest-rated">Lowest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(9)].map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Customer Name</CardTitle>
              <CardDescription>Product Name - Rating: ⭐⭐⭐⭐⭐</CardDescription>
            </CardHeader>
            <CardContent className="text-sm">This is a feedback comment.</CardContent>
            <CardFooter className="text-xs text-muted-foreground">Timestamp: YYYY-MM-DD HH:MM</CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}