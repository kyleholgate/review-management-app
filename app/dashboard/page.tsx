'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import BusinessManager from '../components/BusinessManager'
import SubscriptionManager from '../components/SubscriptionManager'

export default async function Dashboard() {
    const supabase = createServerComponentClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return null // or handle this case as needed
    }

    return (
        <>
            <h1 className="text-2xl font-semibold mb-5">Welcome, {user.email}</h1>
            <form action="/api/auth/signout" method="post">
                <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Log out
                </button>
            </form>
            <div className="mt-8">
                <SubscriptionManager userId={user.id} />
            </div>
        </>
    )
}