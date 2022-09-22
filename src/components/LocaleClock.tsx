import { useState, useEffect } from 'react'

const localeTimeString = new Date().toLocaleTimeString()
export default function LocaleClock() {
  const [currentTime, setCurrentTime] = useState(localeTimeString)

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().getTime()
      const updatedTime = new Date(timestamp)
      setCurrentTime(updatedTime.toLocaleTimeString())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='flex flex-col items-center justify-center gap-1 font-bold p-3 border border-primary-200 shadow-lg rounded-lg max-w-xs mx-auto text-center'>
      <span className='text-sm'>الوقت المحلي</span>
      <span className='text-3xl'>{currentTime}</span>
    </div>
  )
}
