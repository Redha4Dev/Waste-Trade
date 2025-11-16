// components/EditForme.tsx
"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Save } from "lucide-react";
import React from "react";
import { Separator } from "./ui/separator";

// Assuming 'categories' are available (using mock data here)
const categories = ["Plastic", "Paper", "Metal", "Glass", "Organic"];

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }).max(100),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(500),
  price: z.coerce.number().min(0.01, { message: "Price must be greater than zero." }),
  unity: z.string().min(1, { message: "Unit (e.g., kg, ton, piece) is required." }).max(20),
  type: z.string().min(1, { message: "A primary category is required." }),
  subType: z.string().min(1, { message: "A specific sub-type is required." }).max(100),
  status: z.string(),
  quantity: z.coerce.number().min(1, { message: "Quantity must be at least 1." }),
  userId: z.coerce.number().min(1),
});

type FormData = z.infer<typeof formSchema>;

interface EditFormeProps {
  initialData: FormData;
  listingId: string;
}

const EditForme = ({ initialData, listingId }: EditFormeProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    // Use initialData to populate the form
    defaultValues: initialData,
  });

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    console.log(`Updating listing ${listingId} with values:`, values);
    
    // Placeholder for actual API call (PUT/PATCH request)
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    setIsSubmitting(false);
    alert(`Listing ${listingId} updated successfully!`);
    // Ideally, redirect the user after success
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        
        {/* SECTION 1: Basic Information */}
        <section className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b pb-2 border-gray-100 dark:border-gray-800">1. Product Details</h3>

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Clear PET Bottle Flakes, Grade A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the condition, color, and origin. Max 500 characters."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </section>

        <Separator className="bg-gray-200 dark:bg-gray-700" />
        
        {/* SECTION 2: Material Specification */}
        <section className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b pb-2 border-gray-100 dark:border-gray-800">2. Material Categorization</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Category (Type) */}
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Primary Category</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select waste category (e.g., Plastic)" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category.toLowerCase()}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Sub Type */}
                <FormField
                    control={form.control}
                    name="subType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Specific Sub Type / Grade</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., PET Flakes, Corrugated Cardboard, Scrap Copper" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
             {/* Status (Optional: Add current status selection here for a cleaner UI) */}
             <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Listing Status</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Current Status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="available">Available (Active)</SelectItem>
                                    <SelectItem value="draft">Draft (Inactive)</SelectItem>
                                    <SelectItem value="sold">Mark as Sold</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
        </section>

        <Separator className="bg-gray-200 dark:bg-gray-700" />

        {/* SECTION 3: Pricing & Quantity */}
        <section className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b pb-2 border-gray-100 dark:border-gray-800">3. Inventory & Price</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Quantity */}
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Available Quantity</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Total amount"
                                    {...field}
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Unity (Unit) */}
                <FormField
                    control={form.control}
                    name="unity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Unit of Measurement</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., kg, ton, bundle" {...field} /> 
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Price */}
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price (per unit)</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        className="pl-7"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </section>

        {/* Submit Button */}
        <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold h-11 text-lg shadow-md hover:shadow-lg transition-all" 
            type="submit"
            disabled={isSubmitting}
        >
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving Changes...</>
          ) : (
            <><Save className="mr-2 h-5 w-5" /> Save Changes</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EditForme;