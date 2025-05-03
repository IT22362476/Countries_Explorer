export function saveSession(data) {
    Object.entries(data).forEach(([key, value]) => {
      localStorage.setItem(key, value)
    })
  }
  
  export function loadSession() {
    return {
      lastSearch: localStorage.getItem("lastSearch") || "",
      lastRegion: localStorage.getItem("lastRegion") || "All"
    }
}