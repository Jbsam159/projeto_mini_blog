import styles from "./Register.module.css"

//__Hooks__//
import { useState, useEffect } from "react"
import { useAuthentication } from "../../Hooks/useAuthentication"

const Register = () => {

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const { createUser, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {

        e.preventDefault()

        setError("")

        const user = {

            displayName,
            email,
            password

        }

        //__Validations__//

        if (password !== confirmPassword) {

            setError("As senhas precisam ser iguais")
            return

        }

        const res = await createUser(user)

        console.log(res)

    }


    useEffect(() => {

        if (authError) {

            setError(authError);

        }

    }, [authError]);

    return (

        <div className={styles.register}>

            <h2>Cadastre-se</h2>

            <p>Crie seu usuário e compartilhe suas histórias</p>

            <form onSubmit={handleSubmit}>

                <label>

                    <span>Nome</span>
                    <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} name="displayName" required placeholder="Digite o seu nome" />

                    <span>Email</span>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required placeholder="Digite o seu Email" />

                    <span>Senha</span>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required placeholder="Digite o sua sua senha" />

                    <span>Confirmação de Senha</span>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confirmPassword" required placeholder="Digite a sua senha novamente" />

                </label>

                {!loading && <button class="btn">Cadastrar</button>}
                {loading && <button class="btn" disabled>Aguarde...</button>}
                {error && <p className="error">{error}</p>}


            </form>

        </div>

    )

}

export default Register