import { motion } from 'framer-motion'

type PrayerTimesType = {
  prayerTimes: {
    Fajr: string
    Sunrise: string
    Dhuhr: string
    Asr: string
    Maghrib: string
    Isha: string
  }
}

export default function PrayerTimes({ prayerTimes }: PrayerTimesType) {
  function toArabic(prayerName: string) {
    switch (prayerName) {
      case 'Fajr':
        return 'الفجر'
      case 'Sunrise':
        return 'الشروق'
      case 'Dhuhr':
        return 'الظهر'
      case 'Asr':
        return 'العصر'
      case 'Maghrib':
        return 'المغرب'
      case 'Isha':
        return 'العشاء'
    }
  }

  function convertTime(time: string) {
    const split = time.split(':')
    const hours = Number(split[0])
    const minutes = split[1]

    if (hours < 12) return time + ' AM'

    return `${
      hours - 12 > 10
        ? `0${hours - 12}:${minutes} PM`
        : `${hours}:${minutes} PM`
    }`
  }

  return (
    <motion.ul
      variants={prayerListContainerVariants}
      initial='initial'
      animate='animate'
      className='flex flex-col items-stretch max-w-md w-full gap-3 overflow-hidden'
    >
      {Object.entries(prayerTimes).map((prayer) => {
        return (
          <motion.li
            variants={prayerVariant}
            key={prayer[0]}
            className='flex py-3 px-5 items-center justify-between flex-1 w-full bg-primary-700 text-primary-200 rounded-md text-xl'
          >
            <p>{convertTime(prayer[1])}</p>
            <p>{toArabic(prayer[0])}</p>
          </motion.li>
        )
      })}
    </motion.ul>
  )
}

const prayerListContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const prayerVariant = {
  initial: { x: '100%' },
  animate: { x: '0' },
}
