import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

// Updated fallback URL with your actual Supabase URL
const FALLBACK_SUPABASE_URL = "https://lvzgzygfizlgxdsqydzm.supabase.co"

export const createServerClient = () => {
  // Ensure we have a valid URL by providing a fallback
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_SUPABASE_URL

  // Validate URL format before creating client
  try {
    // Test if URL is valid
    new URL(supabaseUrl)

    return createServerComponentClient<Database>({
      cookies,
      options: {
        supabaseUrl,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2emd6eWdmaXpsZ3hkc3F5ZHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3MTE5NjEsImV4cCI6MjA1ODI4Nzk2MX0.hyjCTiyEUVSWppeAEWZiVTwZidmdoO10g4Tw-uVcHh0",
      },
    })
  } catch (error) {
    console.error("Invalid Supabase URL:", error)
    throw new Error("Invalid Supabase URL configuration. Please check your environment variables.")
  }
}
