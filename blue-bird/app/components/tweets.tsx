'use client';

import { useEffect, experimental_useOptimistic as useOptimistic } from "react";

import Likes from "../likes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
  const router = useRouter()

  const [optimisticTweets, addOptimisticTweet] = useOptimistic<TweetWithAuthor[], TweetWithAuthor>(tweets, (currentOptimisticTweets, newTweet) => {
    const newOptimisticTweets = [...currentOptimisticTweets];
    const index = newOptimisticTweets.findIndex(t => t.id === newTweet.id)
    newOptimisticTweets[index] = newTweet
    return newOptimisticTweets
  })

  const supabase = createClientComponentClient()

  useEffect(() => {
    const channel = supabase.channel('realtime tweets').on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'tweets'
    }, (_payload) => {
      router.refresh()
    }).subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, router])

  return optimisticTweets.map((tweet) => (
    <div key={tweet.id} className="mb-5">
      <p>{tweet.author.name} {tweet.author.username}</p>
      <p>{tweet.title}</p>
      <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
    </div>
  ))
}
