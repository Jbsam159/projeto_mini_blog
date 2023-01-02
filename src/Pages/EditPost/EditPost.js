//__CSS__//
import styles from './EditPost.module.css'

//__Hooks__//
import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from "../../Context/AuthContext"
import { useUpdateDocument } from '../../Hooks/useUpdateDocument'
import { useFetchDocument } from '../../Hooks/useFetchDocument'

const EditPost = () => {

    const { id } = useParams()
    const { document: post } = useFetchDocument("posts", id)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState("")

    useEffect(() => {

        if (post) {

            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)

            const textTags = post.tagsArray.join(", ")

            setTags(textTags)

        }

    }, [post])


    const { user } = useAuthValue()

    const { updateDocument, response } = useUpdateDocument("posts")

    const navigate = useNavigate()

    const handleSubmit = (e) => {

        e.preventDefault()

        setFormError("")

        //__Validate Image URL__//
        try {

            new URL(image)

        } catch (error) {

            setFormError("A imagem precisa ter uma URL")

        }

        //__create tags's array__//
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

        //__Check All The Values__//

        if (!title || !image || !tags || !body) {

            setFormError("Por favor, preencha todos os campos!")

        }

        if (formError) return

        const data = {

            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,

        }

        updateDocument(id, data)

        //__Redirect To Home Page__//
        navigate("/dashboard")

    }

    return (

        <div className={styles.editPost}>

            {post && (

                <>

                    <h1>Edite o seu Post</h1>

                    <p>Altere os dados do Post como desejar</p>

                    <form onSubmit={handleSubmit}>

                        <label>

                            <span>Título</span>

                            <input

                                type="text"
                                name="title"
                                required
                                placeholder="Pense em um bom título..."
                                onChange={e => setTitle(e.target.value)}
                                value={title}

                            />

                        </label>

                        <label>

                            <span>URL Da Imagem</span>

                            <input

                                type="text"
                                name="image"
                                required
                                placeholder="Insira uma imagem que representa o seu post"
                                onChange={e => setImage(e.target.value)}
                                value={image}

                            />

                        </label>

                        <p className={styles.previewTitle}>Preview da imagem atual</p>
                        <img className={styles.imagePreview} src={post.image} alt={post.title} />

                        <label>

                            <span>Conteúdo</span>

                            <textarea

                                required
                                name="body"
                                placeholder="Insira o conteúdo do post"
                                onChange={e => setBody(e.target.value)}
                                value={body}

                            >

                            </textarea>

                        </label>

                        <label>

                            <span>Tags</span>

                            <input

                                type="text"
                                name="tags"
                                required
                                placeholder="Insira as tags separadas por vírgula"
                                onChange={e => setTags(e.target.value)}
                                value={tags}

                            />

                        </label>

                        {!response.loading && <button className="btn">Editar post!</button>}
                        {response.loading && (
                            <button className="btn" disabled>
                                Aguarde.. .
                            </button>
                        )}
                        {(response.error || formError) && (
                            <p className="error">{response.error || formError}</p>
                        )}
                    </form>

                </>

            )}

        </div >

    )

}

export default EditPost