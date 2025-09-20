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
import { categories } from "@/app/constant";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(50),
  description: z.string().min(1, { message: "description is required" }).max(50),
  price: z.coerce.number().min(0, { message: "price is required" }),
  unity: z.string().min(1, { message: "unity is required" }).max(50),
  type: z.string().min(1, { message: "type is required" }).max(50),
  subType: z.string().min(1, { message: "sub type is required" }).max(50),
  status: z.string().min(1, { message: "status is required" }).max(50),
  quantity: z.coerce.number().min(1, { message: "quantity is required" }),
  userId: z.coerce.number().min(1, { message: "user id is required" }),
});

const SellForme = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      quantity: 1,
      price: 0,
      type: "",
      subType: "",
      unity: "",
      status: "available",
      userId: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form Submitted:", values);
    try {
      const res = await fetch("/api/product/createProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        alert(data.error || "Product creation failed");
      } else {
        alert("Product created successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Waste Name" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="describe your product here ex ( dirty, old, new, clean ...)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Quantity */}
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="How much do you have"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Unity */}
        <FormField
          control={form.control}
          name="unity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unity</FormLabel>
              <FormControl>
                <Input
                  placeholder="unity of your quantity"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="capitize w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
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
              <FormLabel>Sub Type</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="sub type ex ( dirty, old, new, clean ...)"
                  {...field}
                />
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
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="set price here"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SellForme;
