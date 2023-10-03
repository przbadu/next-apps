import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
import AuthButtonServer from "./components/auth-button-server"

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })

  // redirect to login if not logged in
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // authenticated code
  const { data: tweets } = await supabase.from("tweets").select()

  return (
    <>
      <AuthButtonServer />
      <pre>{JSON.stringify(tweets, null, 2)}</pre>
    </>
  )
}
