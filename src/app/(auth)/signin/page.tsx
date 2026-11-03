'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { redirect } from "next/navigation"
import React from "react"
import { useRouter } from "next/navigation"

export default function LoginForm() {

  const router = useRouter()

    const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData.entries()) as {
        email: string
        password: string
    }

         const {data, error}=await authClient.signIn.email({
        ...user
    })
    if (data) {
    toast.add({
        title: "Login successful!",
        description: "Welcome back!",
        type: "success",
        timeout: 3000,
    })

    router.push('/')
}

if (error) {
    toast.add({
        title: "Login failed",
        description: error.message ?? "Invalid email or password.",
        type: "error",
        timeout: 3000,
    })
}
    }

    const handleGoogleSignIn=async()=>{
      const data = await authClient.signIn.social({
    provider: "google",
  });
    }
   
    
  return (
    <Card className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-10">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Sign in to your account</CardTitle>
        <CardDescription>
          Enter your information below to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignin}>
          <FieldGroup>
        
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Your email"
                required
              />
              <FieldDescription>
               Please enter your valid registered email address
              </FieldDescription>
            </Field>
          
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" required />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <FieldGroup>
             <Field>
                <Button type="submit">Login</Button>
                <Button onClick={handleGoogleSignIn} variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href={'/signup'}>Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
