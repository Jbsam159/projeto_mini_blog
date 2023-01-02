//__CSS__//
import styles from './CreatePost.module.css'

//__Hooks__//
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from "../../Context/AuthContext"
import { useInsertDocument } from '../../Hooks/useInsertDocument'

const CreatePost = () => {

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState("")

    const { user } = useAuthValue()

    const { insertDocument, response } = useInsertDocument("posts")

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

        insertDocument({

            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        })

        //__Redirect To Home Page__//
        navigate("/")

    }

    return (

        <div className={styles.createPost}>

            <h1>Crie Seu Post</h1>

            <p>Escreva sobre o que quiser e compartilhe o seu conhecimento</p>

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

                {!response.loading && <button className="btn">Criar post!</button>}
                {response.loading && (
                    <button className="btn" disabled>
                        Aguarde.. .
                    </button>
                )}
                {(response.error || formError) && (
                    <p className="error">{response.error || formError}</p>
                )}
            </form>

        </div >

    )

}

export default CreatePost