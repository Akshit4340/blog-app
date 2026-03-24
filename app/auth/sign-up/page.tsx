"use client"

import { signUpSchema } from "@/app/schemas/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"
import { Field, FieldLabel } from "@base-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

const SignUp = () => {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form >
          <FieldGroup>
            <Controller name="name" control={form.control} render={() => (
              <Field>
                <FieldLabel>Full Name</FieldLabel>
              </Field>
            )}/>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default SignUp