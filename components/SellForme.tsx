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
import { Separator } from "./ui/separator";
// Assuming categories is defined:
// import { categories } from "@/app/constant";
// Using a mock array for demonstration
const categories = ["Plastic", "Paper", "Metal", "Glass", "Organic"];

const formSchema = z.object({
  // Adjusted validation messages for clarity
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters." })
    .max(100),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." })
    .max(500),
  price: z.coerce
    .number()
    .min(0.01, { message: "Price must be greater than zero." }),
  unity: z
    .string()
    .min(1, { message: "Unit (e.g., kg, ton, piece) is required." })
    .max(20),
  type: z.string().min(1, { message: "A primary category is required." }),
  subType: z
    .string()
    .min(1, { message: "A specific sub-type is required." })
    .max(100),
  status: z.string(), // Assuming this is pre-filled or handled by a simpler dropdown
  quantity: z.coerce
    .number()
    .min(1, { message: "Quantity must be at least 1." }),
  userId: z.coerce.number().min(1), // Should be hidden/derived from session
});

const SellForme = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      quantity: 1,
      price: 0.01,
      type: "",
      subType: "",
      unity: "kg", // Set a common default
      status: "available",
      userId: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // API logic remains the same
    console.log("Form Submitted:", values);
    alert("Listing submitted successfully (API call skipped for now)!");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        {/* SECTION 1: Basic Information */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b pb-2 border-gray-100 dark:border-gray-800">
            1. Product Details
          </h3>

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Listing Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Clear PET Bottle Flakes, Grade A"
                    {...field}
                  />
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
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b pb-2 border-gray-100 dark:border-gray-800">
            2. Material Categorization
          </h3>

          {/* Category and Sub Type - Grouped in a responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category (Type) */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select waste category (e.g., Plastic)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category.toLowerCase()}
                        >
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
                    <Input
                      placeholder="e.g., PET Flakes, Corrugated Cardboard, Scrap Copper"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Status (Hidden/Defaulted, but included for completeness) */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* User ID (Hidden/Defaulted) */}
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <Separator className="bg-gray-200 dark:bg-gray-700" />

        {/* SECTION 3: Pricing & Quantity */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b pb-2 border-gray-100 dark:border-gray-800">
            3. Inventory & Price
          </h3>

          {/* Quantity, Unity, and Price - Grouped in a three-column grid */}
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
                    {/* Could be a Select for common units (kg, ton, piece) */}
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
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        $
                      </span>
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
        >
          Publish Listing Now
        </Button>
      </form>
    </Form>
  );
};

export default SellForme;
