import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function StoreSettingsPage() { 
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Store Settings</h1>
      <div className="space-y-6">
        <section className="border p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Store Information</h2>
          <Form>
              <div className="grid gap-4 md:grid-cols-2">
              <FormField
                name="storeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Store Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                  name="storeDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Describe your store" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
            <Button className="mt-4" type="submit">Update Details</Button>
          </Form>
        </section>
      </div>
    </div>
  );
}