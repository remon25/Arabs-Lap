import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://rhtdtlsiqyzuoxxnunmq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJodGR0bHNpcXl6dW94eG51bm1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwOTc1MTksImV4cCI6MjAzMjY3MzUxOX0.m5UW0GHBPujbpyryjEz1Xh8XDrjncNWYzPCBFulGHVw";
const serviceRoleKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJodGR0bHNpcXl6dW94eG51bm1xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNzA5NzUxOSwiZXhwIjoyMDMyNjczNTE5fQ.B4J4VAphIGY8tA-hondBAHh9waZJ5fGQZh4wqnkAWcg";
const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

export default supabase;
