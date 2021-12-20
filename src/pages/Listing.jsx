import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  const auth = getAuth()
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setListing(docSnap.data())
        console.log(docSnap.data())
        setLoading(false)
      }
    }
    fetchListing()
  }, [navigate, params.listingId])
  console.log(params)
  return (
    <div>
      <h1>Listing</h1>
    </div>
  )
}

export default Listing
