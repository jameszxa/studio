import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function HelpAndSupport() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Help & Support</h1>

      {/* Search Bar */}
      <Input type="text" placeholder="Search for help topics..." className="w-full" />

      <Separator />

      {/* Frequently Asked Questions */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Browse our most common questions.</p>
          <Link href="#" className="text-blue-500 hover:underline">View FAQs</Link>
        </CardContent>
      </Card>

      {/* Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>Documentation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <p>Find in-depth guides and tutorials.</p>
            <Link href="#" className="text-blue-500 hover:underline">Read Documentation</Link>
        </CardContent>
      </Card>
    <Link href="#" className="text-blue-500 hover:underline">Contact Support</Link>
   </div>
  );
}