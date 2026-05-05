// Runtime configuration
let runtimeConfig: {
    API_BASE_URL: string;
} | null = null;

// Configuration loading state
let configLoading = false;

// Default fallback configuration
const defaultConfig = {
    API_BASE_URL: '', // No backend - empty string
};

// Function to load runtime configuration (disabled - no backend)
export async function loadRuntimeConfig(): Promise<void> {
    // No backend available, skip API config loading
    configLoading = false;
    return;
}

// Get current configuration
export function getConfig() {
    // First try Vite environment variables
    if (import.meta.env.VITE_API_BASE_URL) {
        return {
            API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
        };
    }

    // Fall back to default (no backend)
    return defaultConfig;
}

// Dynamic API_BASE_URL getter
export function getAPIBaseURL(): string {
    const baseURL = getConfig().API_BASE_URL;
    if (baseURL === '/') {
        return '';
    }
    return baseURL;
}

export const config = {
    get API_BASE_URL() {
        return getAPIBaseURL();
    },
};