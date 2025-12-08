import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import "./acessos.css";


export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const logar = async () => {
    try {
      const res = await axios.post('https://helpdesck-1.onrender.com/auth/login', { email, senha })
      localStorage.setItem('token', res.data.token)
      navigate('/chamados')
    } catch {
      alert('Erro ao logar')
    }
  }

  return (
    <div class='flex'>
    <div class="conteiner">
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <button onClick={logar}>Entrar</button>

         <Link className="btn" to="/cadastro">Criar Conta</Link>
    
    </div> </div>
  )
}
