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

import { authClient } from "@/lib/auth-client"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import React from "react"

export default function SignupForm() {

    const router = useRouter()
    const [passwordError, setPasswordError] = React.useState<string | null>(null)

    const validatePassword = (password: string) => {
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter."
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter."
        }
        if (password.length < 6) {
            return "Password must be at least 6 characters long."
        }
        return null
    }

    const handleSignup=async(e:React.SubmitEvent<HTMLElement>)=>{
        e.preventDefault()
        const formData= new FormData(e.target)
        const user=Object.fromEntries(formData.entries()) as {name:string, email: string, image: string, password: string}

        const passwordValidationError = validatePassword(user.password)
        if (passwordValidationError) {
            setPasswordError(passwordValidationError)
            toast.add({
                title: "Invalid password",
                description: passwordValidationError,
                type: "error",
                timeout: 3000,
            })
            return
        }
        setPasswordError(null)

         const {data, error}=await authClient.signUp.email({
        ...user
    })
    if(data){
        toast.add({
            title: "Registration successful!",
            description: "Your account has been created. Please sign in.",
            type: "success",
            timeout: 3000,
        })
        router.push('/signin')
    }
    if(error){
        toast.add({
            title: "Registration failed",
            description: error.message ?? "Something went wrong. Please try again.",
            type: "error",
            timeout: 3000,
        })
    }
    }
   

  return (
    <Card className="mx-auto w-full max-w-5xl px-4 py-14 sm:px-10">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" type="text" name="name" placeholder="Your name" required />
            </Field>
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
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
             <Field>
              <FieldLabel htmlFor="confirm-password">
                Insert Image
              </FieldLabel>
              <Input id="image" type="url" name="image" placeholder="Image url" />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                required
                onChange={() => passwordError && setPasswordError(null)}
              />
              {passwordError ? (
                <FieldDescription className="text-destructive">
                  {passwordError}
                </FieldDescription>
              ) : (
                <FieldDescription>
                  Must contain at least one uppercase letter, one lowercase
                  letter, and be at least 6 characters long.
                </FieldDescription>
              )}
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
               
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/signin">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
