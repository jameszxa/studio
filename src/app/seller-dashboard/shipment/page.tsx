import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function ShipmentPage() {  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shipment</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Shipping Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tracking Number</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Sample Data Row (Repeat for each shipment) */}
          <TableRow>
            <TableCell>#12345</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>123 Main St, Anytown</TableCell>
            <TableCell>Shipped</TableCell>
            <TableCell>TRACK12345</TableCell>
            <TableCell className="text-right">
              <Button size="sm" variant="outline">
                Update Status
              </Button>
              <Button size="sm" variant="ghost">
                Manage
              </Button>
            </TableCell>
          </TableRow>
          {/* End Sample Data Row */}
        </TableBody>
      </Table>
    </div>
  );
}