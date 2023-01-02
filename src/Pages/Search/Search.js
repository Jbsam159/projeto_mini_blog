//__CSS__//
import styles from "./Search.module.css"

//___Hooks_//
import { useFetchDocuments } from "../../Hooks/useFetchDocuments"
import { useQuery } from "../../Hooks/useQuery"
import { Link } from "react-router-dom"

//__Components__//
import PostDetails from "../../Components/PostDetails"

const Search = () => {

    const query = useQuery()
    const search = query.get("q")

    const { documents: posts } = useFetchDocuments("posts", search)

    return (

        <div class={styles.search_container}>

            <h2>Search</h2>

            <div>

                {posts && posts.length === 0 && (

                    <div className={styles.noposts}>

                        <p>Não foram encontrados posts a partir da sua busca...</p>
                        <Link to="/" className="btn btn-dark">Voltar</Link>

                    </div>

                )}

                {posts && posts.map(post => (

                    <PostDetails key={post.id} post={post} />

                ))}

            </div>

        </div>

    )
}

export default Search