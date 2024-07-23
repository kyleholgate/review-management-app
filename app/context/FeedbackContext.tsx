'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface FeedbackContextType {
    feedbackId: string | null
    setFeedbackId: (id: string | null) => void
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined)

export function FeedbackProvider({ children }: { children: ReactNode }) {
    const [feedbackId, setFeedbackId] = useState<string | null>(null)

    return (
        <FeedbackContext.Provider value={{ feedbackId, setFeedbackId }}>
            {children}
        </FeedbackContext.Provider>
    )
}

export function useFeedback() {
    const context = useContext(FeedbackContext)
    if (context === undefined) {
        throw new Error('useFeedback must be used within a FeedbackProvider')
    }
    return context
}