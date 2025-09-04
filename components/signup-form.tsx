"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Recycle, User } from "lucide-react";

// 🔹 Zod Schema
const signupSchema = z.object({
  username: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["Buyer", "Seller"], { required_error: "Select your role" }),
  company: z.string().optional(),
  wasteTypes: z.string().optional(),
  location: z.string().optional(),
});

export default function SignupForm() {
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: undefined,
      company: "",
      wasteTypes: "",
      location: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    console.log("Form Submitted:", values);
    // Call API here -> fetch("/api/signup", { method: "POST", body: JSON.stringify(values) })
    try {
      const res = await fetch("/api/authentication/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        alert(data.error || "Signup failed");
      } else {
        alert("User created successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center  bg-gray-50">
      <div className="bg-white h-full w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  className="w-full"
                  onClick={() => setStep(2)}
                >
                  Next
                </Button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-2 block">Select Role</FormLabel>
                      <div className="flex gap-4">
                        {/* Buyer Card */}
                        <div
                          onClick={() => field.onChange("Buyer")}
                          className={`flex flex-col items-center justify-center w-1/2 p-4 rounded-xl border cursor-pointer transition 
            ${
              field.value === "Buyer"
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
                        >
                          <User className="w-8 h-8 mb-2 text-gray-600" />
                          <span className="font-medium">Buyer</span>
                        </div>

                        {/* Seller Card */}
                        <div
                          onClick={() => field.onChange("Seller")}
                          className={`flex flex-col items-center justify-center w-1/2 p-4 rounded-xl border cursor-pointer transition 
            ${
              field.value === "Seller"
                ? "border-green-500 bg-green-50"
                : "border-gray-300"
            }`}
                        >
                          <Recycle className="w-8 h-8 mb-2 text-gray-600" />
                          <span className="font-medium">Seller</span>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Buyer Fields */}
                {form.watch("role") === "Buyer" && (
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Company Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Seller Fields */}
                {form.watch("role") === "Seller" && (
                  <>
                    <FormField
                      control={form.control}
                      name="wasteTypes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Waste Types</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Plastic, Metal"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Location</FormLabel>
                          <FormControl>
                            <Input placeholder="City, Street, ..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button type="submit">Sign Up</Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
