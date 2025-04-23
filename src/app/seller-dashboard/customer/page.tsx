import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CustomerPage () {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Customer Management</h1>

      {/* Search and Filtering */}
      <div className="flex items-center mb-4 space-x-4">
        <Input type="text" placeholder="Search customers..." className="w-1/3" />
        {/* Add filter options here if needed */}
      </div>

      {/* Customer Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Order History</TableHead>
            <TableHead className="text-right">Total Spent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Dummy rows for structure */}
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john.doe@example.com</TableCell>
            <TableCell>5 orders</TableCell>
            <TableCell className="text-right">$500</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane.smith@example.com</TableCell>
            <TableCell>2 orders</TableCell>
            <TableCell className="text-right">$200</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mike Brown</TableCell>
            <TableCell>mike.brown@example.com</TableCell>
            <TableCell>10 orders</TableCell>
            <TableCell className="text-right">$1200</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Alice Johnson</TableCell>
            <TableCell>alice.johnson@example.com</TableCell>
            <TableCell>1 orders</TableCell>
            <TableCell className="text-right">$50</TableCell>
          </TableRow>
          {/* Add more rows as needed */}
        </TableBody>
      </Table>
    </div>
  );
};