import { useState, useEffect } from 'react'

const localeTimeString = new Date()
export default function CountryClock({ timeZone }: { timeZone: string }) {
  const [currentTime, setCurrentTime] = useState(
    localeTimeString.toLocaleTimeString('en-US', { timeZone })
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().getTime()
      const updatedTime = new Date(timestamp)
      setCurrentTime(updatedTime.toLocaleTimeString('en-US', { timeZone }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <p className='font-black text-5xl sm:text-6xl text-center'>{currentTime}</p>
  )
}
