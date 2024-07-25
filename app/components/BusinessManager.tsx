import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '../types/database'

type Business = Database['public']['Tables']['businesses']['Row']
type Subscription = Database['public']['Tables']['subscriptions']['Row']

interface BusinessManagerProps {
    userId: string;
    subscription?: Subscription;
}

export default async function BusinessManager({ userId, subscription }: BusinessManagerProps) {
    const supabase = createServerComponentClient<Database>({ cookies })

    const { data: businesses, error: businessesError } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', userId)

    if (businessesError) {
        console.error('Error fetching businesses:', businessesError)
    }

    const hasActiveSubscription = subscription && subscription.status === 'active'

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-semibold mb-4">Your Businesses</h2>
            {subscription && (
                <p className="mb-4">Subscription Tier: {subscription.tier} (Max Businesses: {subscription.max_businesses})</p>
            )}
            <ul className="mb-4">
                {businesses && businesses.map((business: Business) => (
                    <li key={business.id} className="mb-2 p-2 border rounded">
                        <span className="font-semibold">{business.name}</span> - Status: {hasActiveSubscription ? business.status : 'inactive'}
                        {hasActiveSubscription && (
                            <form action="/api/business/toggle-status" method="post" className="inline ml-2">
                                <input type="hidden" name="businessId" value={business.id} />
                                <input type="hidden" name="currentStatus" value={business.status} />
                                <button type="submit" className={`${business.status === 'active' ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-green-500 hover:bg-green-700'} text-white font-bold py-1 px-2 rounded text-sm`}>
                                    {business.status === 'active' ? 'Deactivate' : 'Activate'}
                                </button>
                            </form>
                        )}
                    </li>
                ))}
            </ul>
            {hasActiveSubscription && (
                <form action="/api/business/add" method="post" className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Business Name"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <input
                            type="url"
                            name="logo_url"
                            placeholder="Logo URL"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add Business
                    </button>
                </form>
            )}
            {!hasActiveSubscription && (
                <p className="text-red-500">You need an active subscription to add or manage businesses.</p>
            )}
        </div>
    )
}