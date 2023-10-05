import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
import AuthButtonServer from "./components/auth-button-server"
import NewTweet from "./new-tweet"
import Likes from "./likes"

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })

  // redirect to login if not logged in
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // authenticated code
  const { data } = await supabase
    .from("tweets")
    .select('*, author: profiles(*), likes(user_id)')

  const tweets = data?.map(tweet => ({
    ...tweet,
    author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
    user_has_liked_tweet: !!tweet.likes.find(like => like.user_id === session.user.id),
    likes: tweet.likes.length,
  })) ?? []

  return (
    <>
      <AuthButtonServer />
      <NewTweet />
      {tweets?.map(tweet => (
        <div key={tweet.id} className="mb-5">
          <p>{tweet.author.name} {tweet.author.username}</p>
          <p>{tweet.title}</p>
          <Likes tweet={tweet} />
        </div>
      ))}
    </>
  )
}
