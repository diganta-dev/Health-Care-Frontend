import { environmentManager, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60
            },
        },
    })
}
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (environmentManager.isServer()) {
        return makeQueryClient();
    }
    else {
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient();
        }
        return browserQueryClient;
    }
}

const QueryProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = getQueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProvider