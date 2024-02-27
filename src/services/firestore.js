import { db } from '../services/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { useToast } from '@chakra-ui/react';
import { getDoc } from 'firebase/firestore';
import { useCallback } from 'react';

export const useFirestore = () => {
  const toast = useToast();
  const addDocument = async (collectionName, data) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef;
  };

  const addToWatchlist = async (userId, dataId, data) => {
    try {
      if (await checkIfInWatchlist(userId, dataId)) {
        toast({
          title: 'Error!',
          description: 'This Movie/TV Show is already in your watchlist.',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-center',
        });
        return false;
      }

      await setDoc(doc(db, 'users', userId, 'watchlist', dataId), data);
      toast({
        title: 'Success',
        description: 'Added to watchlist',
        status: 'success',
        isClosable: true,
        position: 'top-center',
      });
    } catch (error) {
      console.log(error, 'Error adding document.');
      toast({
        title: 'Error!',
        description: 'An error occurred while adding to watchlist.',
        status: 'error',
        isClosable: true,
        position: 'top-center',
      });
    }
  };

  const checkIfInWatchlist = async (userId, dataId) => {
    const docRef = doc(
      db,
      'users',
      userId?.toString(),
      'watchlist',
      dataId?.toString()
    );

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };

  const removeFromWatchlist = async (userId, dataId) => {
    try {
      await deleteDoc(
        doc(db, 'users', userId?.toString(), 'watchlist', dataId?.toString())
      );
      toast({
        title: 'Success',
        description: 'Removed from watchlist',
        status: 'success',
        isClosable: true,
        position: 'top-center',
      });
    } catch (error) {
      console.log(error, 'Error removing document.');
      toast({
        title: 'Error!',
        description: 'An error occurred while removing from watchlist.',
        status: 'error',
        isClosable: true,
        position: 'top-center',
      });
    }
  };

  const getWatchlist = useCallback(async (userId) => {
    const querySnapshot = await getDocs(
      collection(db, 'users', userId, 'watchlist')
    );

    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return data;
  }, []);

  return {
    addDocument,
    addToWatchlist,
    checkIfInWatchlist,
    removeFromWatchlist,
    getWatchlist,
  };
};
