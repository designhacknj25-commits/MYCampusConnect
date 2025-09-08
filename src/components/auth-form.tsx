"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, GraduationCap, Loader2 } from "lucide-react";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const mockLogin = async (data: any) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  if (data.email === "student@test.com" && data.password === "password") {
    return { success: true, role: "student" };
  }
  if (data.email === "teacher@test.com" && data.password === "password") {
    return { success: true, role: "teacher" };
  }
  return { success: false, message: "Invalid email or password." };
};

const mockSignup = async (data: any) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true };
};


const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  role: z.enum(["student", "teacher"]).optional(),
});

export function AuthForm() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isLoginPage = pathname === "/login";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema.refine(
        (data) => isLoginPage || !!data.role, {
        message: "Please select a role.",
        path: ["role"],
      }).refine((data) => isLoginPage || (!!data.name && data.name.length > 0), {
        message: "Name is required.",
        path: ["name"],
      })
    ),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "student",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (isLoginPage) {
        const result = await mockLogin(values);
        if (result.success) {
          toast({
            title: "Login Successful",
            description: "Welcome back!",
          });
          const redirectPath = result.role === 'teacher' ? '/teacher/dashboard' : '/student/dashboard';
          localStorage.setItem('userRole', result.role);
          router.push(redirectPath);
        } else {
          toast({
            variant: "destructive",
            title: "Login Failed",
            description: result.message,
          });
        }
      } else {
        const result = await mockSignup(values);
        if (result.success) {
          toast({
            title: "Signup Successful",
            description: "Please log in with your new account.",
          });
          router.push("/login");
        }
      }
    } catch (error) {
       toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Please try again later.",
      });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-card/50 backdrop-blur-lg border border-border rounded-2xl p-8 shadow-2xl text-foreground transition-all duration-500">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <GraduationCap className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold font-headline">
          {isLoginPage ? "Welcome Back" : "Create an Account"}
        </h1>
        <p className="text-muted-foreground">
          {isLoginPage ? "Sign in to continue to MyCampusConnect" : "Join our campus community today!"}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {!isLoginPage && (
            <FormField
              control={form.control}
              name="name"
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
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
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
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute inset-y-0 right-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isLoginPage && (
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>I am a...</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="student" />
                        </FormControl>
                        <FormLabel className="font-normal">Student</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="teacher" />
                        </FormControl>
                        <FormLabel className="font-normal">Teacher</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button type="submit" className="w-full font-semibold" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoginPage ? "Login" : "Create Account"}
          </Button>
        </form>
      </Form>
      <div className="mt-6 text-center text-sm">
        {isLoginPage ? "Don't have an account? " : "Already have an account? "}
        <Link href={isLoginPage ? "/signup" : "/login"} className="font-medium text-primary hover:underline">
          {isLoginPage ? "Sign Up" : "Login"}
        </Link>
      </div>
    </div>
  );
}
