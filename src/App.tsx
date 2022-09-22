import { useRef, useState } from 'react'

import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'

import axios from 'axios'
import Input from './components/Input'

import PrayerTimes from './components/PrayerTimes'
import LocaleClock from './components/LocaleClock'
import CountryClock from './components/CountryClock'
import { CircleSpinner } from 'react-spinners-kit'

const ALADHAN_API_BASE_URL = 'https://api.aladhan.com/v1/timingsByCity'
const BIGDATACLOUD_BASE_URL =
  'https://api.bigdatacloud.net/data/reverse-geocode-client'

type DateType = {
  gregorian: string
  hijri: {
    day: string
    month: { number: number }
    weekday: { ar: string }
    year: string
  }
}

type LocationNameType = {
  city: string
  country: string
  timezone: string
}

type PrayerTimesType = {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
}

function App() {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesType | null>(null)
  const [date, setDate] = useState<DateType | null>(null)
  const [locationName, setLocationName] = useState<LocationNameType | null>(
    null
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (inputRef.current !== null) {
      if (inputRef.current.value === '') return
      setIsLoading(true)
      searchForLocation(inputRef.current.value)
    }
  }

  async function searchForLocation(city: string) {
    axios
      .get(ALADHAN_API_BASE_URL, {
        params: {
          city,
          country: city,
        },
      })
      .then((response) => {
        const data = response.data.data

        const { day, month, weekday, year } = data.date.hijri
        setDate({
          gregorian: data.date.readable,
          hijri: { day, month: month.number, weekday, year },
        })

        const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = data.timings
        setPrayerTimes({ Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha })

        const { latitude, longitude, timezone } = data.meta
        searchLocationName(latitude, longitude, timezone)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
        setIsError(true)
        toast.error('لا يوجد مكان بهذا الأسم')
      })
  }

  async function searchLocationName(
    latitude: number,
    longitude: number,
    timezone: string
  ) {
    axios
      .get(BIGDATACLOUD_BASE_URL, {
        params: {
          latitude,
          longitude,
          localityLanguage: 'ar',
        },
      })
      .then((response) => {
        const { city, countryName } = response.data
        setLocationName({ city, country: countryName, timezone })
      })
      .catch((err) => {
        console.error(err)
        if (inputRef.current !== null) {
          setLocationName({
            city: inputRef.current.value,
            country: '',
            timezone,
          })
        }
      })
      .finally(() => {
        setIsLoading(false)
        setIsError(false)
      })
  }

  const hijriDate = `(${date?.hijri.year}/${date?.hijri.month}/${date?.hijri.day})`
  const gregorianDate = date?.gregorian

  return (
    <motion.div className='min-h-screen pt-5 px-5 sm:px-10'>
      <header>
        <nav>
          <ul className='flex flex-col gap-5 py-2 '>
            <li>
              <LocaleClock />
            </li>
            <li>
              <form onSubmit={handleSubmit}>
              <Input inputRef={inputRef} />
              </form>
            </li>
          </ul>
        </nav>
      </header>
      {isLoading ? (
        <div className='flex justify-center mt-10'>
          <CircleSpinner loading={isLoading} size={40} />
        </div>
      ) : isError ? (
        <h1 className='p-3 mt-10 font-semibold text-3xl text-center'>❌</h1>
      ) : (
        <main className='flex flex-col gap-5 justify-center items-center my-10'>
          {locationName === null ? (
            <h1 className='p-3 font-semibold text-3xl text-center'>
              اكتب اسم المدينة في خانة البحث
            </h1>
          ) : (
            <>
              <h1 className='py-2 px-10 rounded-full bg-primary-700 text-primary-200 text-xl mb-5'>
                {locationName.city} {',' + locationName.country}
              </h1>

              <div className='flex flex-col items-center mb-10'>
                <p className='text-5xl mb-3'>{date?.hijri.weekday.ar}</p>
                <CountryClock timeZone={locationName.timezone} />
                <div className='flex gap-5 mt-3'>
                  <p className='font-bold text-lg'>{gregorianDate}</p>
                  <p className='font-black text-lg'>{hijriDate}</p>
                </div>
              </div>

              <PrayerTimes prayerTimes={prayerTimes as PrayerTimesType} />
            </>
          )}
        </main>
      )}
    </motion.div>
  )
}

export default App
