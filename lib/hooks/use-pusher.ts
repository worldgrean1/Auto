"use client"

// Mock Pusher for frontend-only demo
export function usePusher() {
  // Return a mock Pusher client with the necessary methods
  return {
    subscribe: (channelName: string) => ({
      bind: (eventName: string, callback: Function) => {
        // Store the callback in a global event system for demo purposes
        if (typeof window !== "undefined") {
          window.__MOCK_PUSHER_CALLBACKS = window.__MOCK_PUSHER_CALLBACKS || {}
          window.__MOCK_PUSHER_CALLBACKS[`${channelName}:${eventName}`] = callback
        }
      },
      unbind: () => {},
    }),
    unsubscribe: () => {},
  }
}

// Add a helper to trigger mock Pusher events
export function triggerMockPusherEvent(channelName: string, eventName: string, data: any) {
  if (typeof window !== "undefined" && window.__MOCK_PUSHER_CALLBACKS) {
    const callback = window.__MOCK_PUSHER_CALLBACKS[`${channelName}:${eventName}`]
    if (callback) {
      callback(data)
    }
  }
}

// Add TypeScript declaration for our mock global
declare global {
  interface Window {
    __MOCK_PUSHER_CALLBACKS?: Record<string, Function>
  }
}

