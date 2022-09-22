import { useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'

type InputType = {
  inputRef: React.RefObject<HTMLInputElement>
}

export default function Input({ inputRef }: InputType) {
  const [searchInput, setSearchInput] = useState('')

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(() => e.target.value)

    if (inputRef.current !== null) {
      const firstLetter = inputRef.current.value[0]
      const inputLength = inputRef.current.value.length
      if (inputLength === 1) {
        if (
          65 <= firstLetter.charCodeAt(0) &&
          122 >= firstLetter.charCodeAt(0)
        ) {
          inputRef.current.classList.add('inputLTR')
        } else {
          inputRef.current.classList.remove('inputLTR')
        }
      }
    }
  }

  return (
    <div className='relative max-w-sm w-full mx-auto'>
      <BiSearchAlt className='w-5 h-5 fill-black absolute top-[50%] translate-y-[-50%] left-2' />
      <input
        ref={inputRef}
        onChange={handleInput}
        value={searchInput}
        className='rounded-md ring-2 ring-primary-400 border-0 px-8 inputRTL w-full text-xl text-primary-800'
        placeholder='اسم المدينة'
        type='text'
        name='search'
      />
    </div>
  )
}
