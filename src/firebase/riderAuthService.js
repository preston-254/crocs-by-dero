// Rider Authorization Service
import { db, isFirebaseConfigured } from './config'
import { doc, getDoc, collection, getDocs, query, where, addDoc, deleteDoc } from 'firebase/firestore'

const AUTHORIZED_RIDERS_COLLECTION = 'authorizedRiders'

// Check if user email is authorized to access rider dashboard
export async function isRiderAuthorized(email) {
  if (!isFirebaseConfigured || !db || !email) {
    console.log('Authorization check failed: Firebase not configured or no email')
    return false
  }

  try {
    const emailLower = email.toLowerCase()
    console.log('Checking authorization for email:', emailLower)
    
    // Check if email exists in authorizedRiders collection (case-insensitive)
    const q = query(
      collection(db, AUTHORIZED_RIDERS_COLLECTION),
      where('email', '==', emailLower)
    )
    const querySnapshot = await getDocs(q)
    
    console.log('Authorization query result:', {
      email: emailLower,
      found: !querySnapshot.empty,
      count: querySnapshot.size,
      docs: querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    })
    
    return !querySnapshot.empty
  } catch (error) {
    console.error('Error checking rider authorization:', error)
    return false
  }
}

// Get all authorized rider emails (for admin use)
export async function getAuthorizedRiders() {
  if (!isFirebaseConfigured || !db) {
    return []
  }

  try {
    const querySnapshot = await getDocs(collection(db, AUTHORIZED_RIDERS_COLLECTION))
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error getting authorized riders:', error)
    return []
  }
}

// Add authorized rider email (for admin use)
export async function addAuthorizedRider(email, name = '') {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase not configured')
  }

  try {
    // Check if already exists
    const q = query(
      collection(db, AUTHORIZED_RIDERS_COLLECTION),
      where('email', '==', email.toLowerCase())
    )
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      throw new Error('Rider email already authorized')
    }

    // Add to collection
    const docRef = await addDoc(collection(db, AUTHORIZED_RIDERS_COLLECTION), {
      email: email.toLowerCase(),
      name: name || email,
      createdAt: new Date().toISOString()
    })

    return docRef.id
  } catch (error) {
    throw error
  }
}

// Remove authorized rider email (for admin use)
export async function removeAuthorizedRider(email) {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Firebase not configured')
  }

  try {
    const q = query(
      collection(db, AUTHORIZED_RIDERS_COLLECTION),
      where('email', '==', email.toLowerCase())
    )
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) {
      throw new Error('Rider email not found')
    }

    // Delete all matching documents
    const deletePromises = querySnapshot.docs.map(doc => 
      doc.ref.delete()
    )
    await Promise.all(deletePromises)
  } catch (error) {
    throw error
  }
}

