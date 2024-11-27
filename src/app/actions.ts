"use server";

import { setTimeout } from "timers/promises";
import z from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().email("Email is required"),
  message: z.string().trim().min(10, "Message should be atleast 10 characters"),
});
type FormValues = z.infer<typeof schema>;

export async function contactFormAction(_: unknown, formData: FormData) {
  const formValues = Object.fromEntries(formData) as FormValues;
  const validation = schema.safeParse(formValues);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      formValues,
    } as const;
  }

  await setTimeout(1500);

  return {
    success: true,
    data: {
      message: "Form submitted successfully",
    },
  } as const;
}
