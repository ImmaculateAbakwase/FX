export interface SettingsStore {
  [pageKey: string]: unknown
}

export interface LastSettingsPage {
  key: string
  path: string
  title: string
  updatedAt: number
}

const STORAGE_KEY = 'kflix-admin-system-settings-v1'
const LAST_PAGE_KEY = 'kflix-admin-system-settings-last-page'

const safeParse = (raw: string | null): SettingsStore => {
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw) as unknown
    if (parsed && typeof parsed === 'object') return parsed as SettingsStore
    return {}
  } catch {
    return {}
  }
}

export const loadAllSettings = (): SettingsStore => {
  if (typeof window === 'undefined') return {}
  return safeParse(localStorage.getItem(STORAGE_KEY))
}

export const loadPageSettings = <T = Record<string, unknown>>(pageKey: string, fallback: T): T => {
  const all = loadAllSettings()
  const value = all[pageKey]
  if (value && typeof value === 'object') return value as T
  return fallback
}

export const savePageSettings = (pageKey: string, value: unknown) => {
  if (typeof window === 'undefined') return
  const all = loadAllSettings()
  all[pageKey] = value
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export const resetPageSettings = (pageKey: string) => {
  if (typeof window === 'undefined') return
  const all = loadAllSettings()
  delete all[pageKey]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export const loadLastSettingsPage = (): LastSettingsPage | null => {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(LAST_PAGE_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as LastSettingsPage
    if (!parsed || typeof parsed !== 'object') return null
    if (!parsed.key || !parsed.path || !parsed.title) return null
    return parsed
  } catch {
    return null
  }
}

export const saveLastSettingsPage = (page: LastSettingsPage) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(LAST_PAGE_KEY, JSON.stringify(page))
}
