import { useState, useEffect, useReducer } from "react"
import { db } from "../Firebase/config"
import { updateDoc, doc } from "firebase/firestore"

const initialState = {

    loading: null,
    error: null,

}

const updateReducer = (state, action) => {

    switch (action.type) {

        case "LOADING":
            return { loading: true, error: null }

        case "UPDATED_DOC":
            return { loading: false, error: null }

        case "ERROR":
            return { loading: true, error: action.payload }

        default:
            return state

    }

}

export const useUpdateDocument = (docCollection) => {

    const [response, dispatch] = useReducer(updateReducer, initialState);

    //__Deal With Memory Leak__//
    const [cancelled, setCancelled] = useState(false)

    const checkIfIsCancelledBeforeDispatch = (action) => {

        if (!cancelled) {

            dispatch(action)

        }

    }

    const updateDocument = async (id, data) => {

        checkIfIsCancelledBeforeDispatch({

            type: "LOADING",

        })

        try {

            const docRef = await doc(db, docCollection, id)

            const updatedDocument = await updateDoc(docRef, data)

            checkIfIsCancelledBeforeDispatch({

                type: "UPDATED_DOC",
                payload: updatedDocument

            })

        } catch (error) {

            checkIfIsCancelledBeforeDispatch({

                type: "ERROR",
                payload: error.message

            })

        }

    }

    useEffect(() => {

        return () => setCancelled(true)

    }, [])

    return { updateDocument, response }

}