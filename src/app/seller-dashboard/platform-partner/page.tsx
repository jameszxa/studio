import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PlatformPartner() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Platform Partner</h1>

      <Card>
        <CardHeader>
          <CardTitle>Partnership Programs</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p>
            Learn about our partnership programs and how you can benefit from
            joining our network.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Commission Rates</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p>View detailed information about our commission structure.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Support Resources</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p>Access resources and support to help you succeed as a partner.</p>
        </CardContent>
      </Card>
    </div>
  );
}