import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '../types/database'
import BusinessManager from './BusinessManager'

type Subscription = Database['public']['Tables']['subscriptions']['Row']

export default async function SubscriptionManager({ userId }: { userId: string }) {
    const supabase = createServerComponentClient<Database>({ cookies })
    const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single()

    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error)
    }

    return (
        <>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-xl font-semibold mb-4">Your Subscription</h2>
                {subscription ? (
                    <>
                        <p className="mb-2">Tier: {subscription.tier}</p>
                        <p className="mb-2">Max Businesses: {subscription.max_businesses}</p>
                        <p className="mb-2">Status: {subscription.status}</p>
                        <p className="mb-4">Renews on: {new Date(subscription.current_period_end || '').toLocaleDateString()}</p>
                        <div className="flex space-x-4">
                            <form action="/api/subscription/upgrade" method="post">
                                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                    Upgrade Subscription
                                </button>
                            </form>
                            <form action="/api/subscription/cancel" method="post">
                                <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Cancel Subscription
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <>
                        <p className="mb-4">You don't have an active subscription.</p>
                        <form action="/api/subscription/create" method="post">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Subscribe Now
                            </button>
                        </form>
                    </>
                )}
            </div>
            <BusinessManager userId={userId} subscription={subscription || undefined} />
        </>
    )
}