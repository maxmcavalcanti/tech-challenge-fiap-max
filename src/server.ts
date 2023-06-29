import express from 'express'
import clienteRoutes from './routes/cliente.routes'
import funcionarioRoutes from './routes/funcionario.routes'
import pedidoRoutes from './routes/pedido.routes'
import produtoRoutes from './routes/produto.routes'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
// Registrar as rotas
app.use(clienteRoutes)
app.use(funcionarioRoutes)
app.use(produtoRoutes)
app.use(pedidoRoutes)
// Configuração das rotas
app.get('/', (req, res) => {
  res.send('Bem-vindo à API da Lanchonete!')
})

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`)
})
