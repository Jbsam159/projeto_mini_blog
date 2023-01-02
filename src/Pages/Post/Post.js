//__CSS__//
import styles from "./Post.module.css"

//__Hooks__//
import { useParams } from "react-router-dom"
import { useFetchDocument } from "../../Hooks/useFetchDocument"

const Post = () => {

    const { id } = useParams()
    const { document: post } = useFetchDocument("posts", id)

    return (

        <div className={styles.post_container}>

            {post &&

                (

                    <>

                        <h1>{post.title}</h1>
                        <img src={post.image} alt={post.title} />
                        <p>{post.body}</p>
                        <h3>Esse post trata sobre:</h3>

                        <div className={styles.tags}>

                            {post.tagsArray.map(tag => (

                                <p key={tag}><span>#</span>{tag}</p>

                            ))}

                        </div>

                    </>

                )

            }


        </div>

    )

}

export default Post