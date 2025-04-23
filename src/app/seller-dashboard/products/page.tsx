import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
  
export default function ProductsPage() {
  return (
<div className="p-6">
<div className="flex justify-between items-center mb-4">
<h1 className="text-2xl font-bold">Products</h1>
<Button>Add New Product</Button>
</div>
  
<div className="rounded-md border">
<Table>
<TableHeader>
<TableRow>
<TableHead className="w-[200px]">Product Name</TableHead>
<TableHead>Description</TableHead>
<TableHead className="text-right">Price</TableHead>
<TableHead className="text-right">Actions</TableHead>
</TableRow>
</TableHeader>
<TableBody>
{/* Placeholder rows - Replace with actual data */}
<TableRow>
<TableCell className="font-medium">Product 1</TableCell>
<TableCell>Description for Product 1</TableCell>
<TableCell className="text-right">$10.00</TableCell>
<TableCell className="text-right">
<Button variant="outline" size="sm">
Edit
</Button>{" "}
<Button variant="destructive" size="sm">
Delete
</Button>
</TableCell>
</TableRow>
<TableRow>
<TableCell className="font-medium">Product 2</TableCell>
<TableCell>Description for Product 2</TableCell>
<TableCell className="text-right">$25.00</TableCell>
<TableCell className="text-right">
<Button variant="outline" size="sm">
Edit
</Button>{" "}
<Button variant="destructive" size="sm">
Delete
</Button>
</TableCell>
</TableRow>
</TableBody>
</Table>
</div>
</div>
  );
}