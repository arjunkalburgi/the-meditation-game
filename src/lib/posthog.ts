import posthog, { PostHog } from 'posthog-js';

const isBrowser = typeof window !== 'undefined';
const isDev = import.meta.env.VITE_NODE_ENV === 'development';

// Adding to the window ensures we're not re-initializing PostHog when using posthog.ts within multiple components.
declare global {
    interface Window {
        posthog?: Partial<PostHog>;
    }
}

// Creating a mock allows us to see PostHog events in the console in development env.
const mockPosthog: Partial<PostHog> = {
    identify: (id: string, props?: Record<string, any>) => {
        console.debug(`[PostHog Disabled] identify(${id}, ${JSON.stringify(props)})`);
    },
    capture: (event: string, props?: Record<string, any>): undefined => {
        console.debug(`[PostHog Disabled] capture(${event}, ${JSON.stringify(props)})`);
        return undefined;
    },
    reset: () => {
        console.debug(`[PostHog Disabled] reset()`);
    },
    setPersonProperties: (props: Record<string, any>) => {
        console.debug(`[PostHog Disabled] setPersonProperties(${JSON.stringify(props)})`);
    },
    init: () => console.debug(`[PostHog Disabled] init()`),
    getSessionId: () => '',
    getProperty: () => null,
    hasOptedOutCapturing: () => false,
    hasOptedInCapturing: () => false,
    optOutCapturing: () => {},
    optInCapturing: () => {},
    getFeatureFlag: () => null,
    getFeatureFlagPayload: () => null,
    isFeatureEnabled: () => false,
    reloadFeatureFlags: () => {},
    onFeatureFlags: () => {},
    getPeople: () => ({}),
    setPersonPropertiesOnce: () => {},
    register: () => {},
    registerOnce: () => {},
    unregister: () => {},
    group: () => {},
    resetGroups: () => {},
    setGroup: () => {},
    addGroup: () => {},
    removeGroup: () => {},
    alias: () => {},
    get_distinct_id: () => '',
    get_groups: () => ({}),
} as unknown as Partial<PostHog>;

if (isBrowser && !window.posthog) {
    if (isDev) {
        console.log(`PostHog tracking is disabled for ${import.meta.env.VITE_NODE_ENV} environment.`);
        window.posthog = mockPosthog;
    } else {
        posthog.init('phc_zZuNtM0e2XLHmICw7GvZpqcNFWC91b1L8zg5tMJXlk8', {
            api_host: 'https://us.i.posthog.com',
            person_profiles: 'always',
            autocapture: true,
            capture_pageview: false,
            persistence: 'localStorage'
        });

        window.posthog = posthog;
    }
}

export default isBrowser ? (window.posthog as PostHog) : (mockPosthog as PostHog);
