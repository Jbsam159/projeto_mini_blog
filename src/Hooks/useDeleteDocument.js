import { useState, useEffect, useReducer } from "react"
import { db } from "../Firebase/config"
import { doc, deleteDoc } from "firebase/firestore"

const initialState = {

    loading: null,
    error: null,

}

const deleteReducer = (state, action) => {

    switch (action.type) {

        case "LOADING":
            return { loading: true, error: null }

        case "DELETED_DOC":
            return { loading: false, error: null }

        case "ERROR":
            return { loading: true, error: action.payload }

        default:
            return state

    }

}

export const useDeleteDocument = (docCollection) => {

    const [response, dispatch] = useReducer(deleteReducer, initialState);

    //__Deal With Memory Leak__//
    const [cancelled, setCancelled] = useState(false)

    const checkIfIsCancelledBeforeDispatch = (action) => {

        if (!cancelled) {

            dispatch(action)

        }

    }

    const deleteDocument = async (id) => {

        checkIfIsCancelledBeforeDispatch({

            type: "LOADING",

        })

        try {

            const deletedDocument = await deleteDoc(doc(db, docCollection, id))

            checkIfIsCancelledBeforeDispatch({

                type: "DELETED_DOC",
                payload: deletedDocument

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

    return { deleteDocument, response }

}