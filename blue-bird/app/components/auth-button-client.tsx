'use client';

import { createClientComponentClient, Session } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import GithubButton from "../login/github-button";

export default function AuthButtonClient({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return session ? (
    <button onClick={handleSignOut} className="text-xs text-gray-400">Logout</button>
  ) : (
    <div className="flex-1 flex justify-center items-center">
      <GithubButton />
    </div>
  )
}
