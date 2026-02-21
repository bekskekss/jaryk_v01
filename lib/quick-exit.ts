/**
 * Quick Exit: clears all sensitive app state then redirects away.
 * Uses window.location.replace to avoid leaving the app in browser history.
 */
export function quickExit() {
  // 1. Clear localStorage keys related to the app
  try {
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith("jaryk-")) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key))
  } catch {
    // localStorage unavailable
  }

  // 2. Clear sessionStorage entirely
  try {
    sessionStorage.clear()
  } catch {
    // sessionStorage unavailable
  }

  // 3. Redirect to a neutral site (replaces history entry)
  window.location.replace("https://google.com")
}
