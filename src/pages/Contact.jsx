import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function Contact() {
  const [message, setMessage] = useState('')
  const [landLoard, setLandLoard] = useState('')
  console.log(landLoard)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useParams()
  console.log(params)
  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, 'users', params.landlordId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setLandLoard(docSnap.data())
      } else {
        toast.error('Could not get landlord data')
      }
    }
    getLandlord()
  }, [params.landlordId])
  const onChange = (e) => {
    setMessage(e.target.value)
  }
  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Contact Landlord</p>
      </header>
      {landLoard !== null && (
        <main>
          <div className='contactLandlord'>
            <p className='landlordName'>Contact {landLoard?.name}</p>
          </div>
          <form className='messageForm'>
            <div className='messageDiv'>
              <label htmlFor='message' className='messageLabel'>
                Message
              </label>
              <textarea
                name='message'
                id='message'
                className='textarea'
                value={message}
                onChange={onChange}></textarea>
            </div>
            <a
              href={`mailto:${landLoard.email}?Subject=${searchParams.get(
                'listingName'
              )}&body=${message}`}>
              <button type='button' className='primaryButton'>
                Send message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  )
}

export default Contact
