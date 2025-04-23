import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
  
export default function Orders() {
  return (
    <div className='p-6'>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {/* Filtering and Sorting Options */}
      <div className="mb-4 flex space-x-2">
        {/* Example Filter: Status */}
        <select className="border rounded p-2">
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
       
      </div>

      {/* Orders Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead >Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Example Row - Repeat for each order */}
          <TableRow >
            <TableCell>#12345</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>2023-10-27</TableCell>
            <TableCell>Processing</TableCell>
            <TableCell>$150.00</TableCell>
            <TableCell className='text-right'>
              <Button size='sm'>View Details</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}