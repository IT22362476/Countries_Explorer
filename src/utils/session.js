export function saveSession(data) {
  const existing = JSON.parse(localStorage.getItem("session") || "{}")
  const updated = { ...existing, ...data }
  localStorage.setItem("session", JSON.stringify(updated))
}

export function loadSession() {
  const session = JSON.parse(localStorage.getItem("session") || "{}")
  return {
    lastSearch: session.lastSearch || "",
    lastRegion: session.lastRegion || "All"
  }
}
