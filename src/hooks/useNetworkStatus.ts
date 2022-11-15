import { useEffect, useState } from 'react'

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Online event
    addEventListener('online', (_) => {
      setIsOnline(true)
    })

    // Offline event
    addEventListener('offline', (_) => {
      setIsOnline(false)
    })

    // Removing event listener
    return () => {
      removeEventListener('online', (_) => {
        console.log()
      })
      removeEventListener('offline', (_) => {
        console.log()
      })
    }
  }, [])

  return isOnline
}

export default useNetworkStatus
