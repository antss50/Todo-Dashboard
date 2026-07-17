import { useEffect, useState } from 'react'

const reviveDates = (_key: string, value: unknown) => {
  if ( typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
    return new Date(value)
  }
  return value
}

const readLocalStorage = <T,>(key: string, initialValue: T): T => {
  try {
    const item = window.localStorage.getItem(key)
    return item ? (JSON.parse(item, reviveDates) as T) : initialValue
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error)
    return initialValue
  }
}

const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => readLocalStorage(key, initialValue))

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
