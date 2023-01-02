import styles from "./Login.module.css"

//__Hooks__//
import { useState, useEffect } from "react"
import { useAuthentication } from "../../Hooks/useAuthentication"

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { login, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {

        e.preventDefault()

        setError("")

        const user = {

            email,
            password

        }

        //__Validations__//

        const res = await login(user)

        console.log(res)

    }


    useEffect(() => {

        if (authError) {

            setError(authError);

        }

    }, [authError]);

    return (

        <div className={styles.login}>

            <h2>Entrar</h2>

            <p>Faça o Login para utilizar o sistema</p>

            <form onSubmit={handleSubmit}>

                <label>

                    <span>Email</span>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required placeholder="Digite o seu Email" />

                    <span>Senha</span>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required placeholder="Digite o sua sua senha" />

                </label>

                {!loading && <button class="btn">Entrar</button>}
                {loading && <button class="btn" disabled>Aguarde...</button>}
                {error && <p className="error">{error}</p>}


            </form>


        </div>

    )

}

export default Login