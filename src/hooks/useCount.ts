import { useState, useEffect } from 'react';
import { database } from '../services/firebase';

export function useCount(){
    const [count, setCount] = useState<number>();
    const surveyId = localStorage.getItem('surveyId');
    const ref = database.ref(`surveys/${surveyId}`).get();

    useEffect(() => {
        async function handleCount(){
          if(await (await ref).val().endedAt){
            setCount(0);
          }
          setCount(1);
        console.log(count)
        }
        handleCount();
    },[])

    return count;
}