import { useState, useEffect } from 'react'

// Definir o formato de um Aluno
interface Aluno {
  id: number
  nome: string
  email: string
  curso: string
}

function App() {
  const [paginaAtual, setPaginaAtual] = useState<'inicio' | 'cadastro' | 'lista'>('inicio')
  
  // Carregar os alunos guardados no localStorage ao iniciar (ou usar a lista padrão se estiver vazio)
  const [alunos, setAlunos] = useState<Aluno[]>(() => {
    const dadosSalvos = localStorage.getItem('cadastro_alunos')
    if (dadosSalvos) {
      try {
        return JSON.parse(dadosSalvos)
      } catch (e) {
        console.error("Erro ao ler dados salvos", e)
      }
    }
    return [
      { id: 1, nome: 'Ana Silva', email: 'ana@email.com', curso: 'Gestão de TI' },
      { id: 2, nome: 'Carlos Souza', email: 'carlos@email.com', curso: 'Desenvolvimento Web' }
    ]
  })

  // Guardar automaticamente no localStorage sempre que a lista de alunos mudar
  useEffect(() => {
    localStorage.setItem('cadastro_alunos', JSON.stringify(alunos))
  }, [alunos])

  // Campos do formulário
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [curso, setCurso] = useState('')

  // Função para adicionar um novo aluno
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome || !email || !curso) {
      alert('Por favor, preenche todos os campos!')
      return
    }

    const novoAluno: Aluno = {
      id: Date.now(),
      nome,
      email,
      curso
    }

    setAlunos([...alunos, novoAluno])
    setNome('')
    setEmail('')
    setCurso('')
    setPaginaAtual('lista') // Redireciona para a lista após cadastrar
  }

  // Função para apagar um aluno
  const handleDelete = (id: number) => {
    setAlunos(alunos.filter(aluno => aluno.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Cabeçalho */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <h1 className="text-xl font-bold tracking-wide text-emerald-400">
              Sistema de Alunos
            </h1>
          </div>

          {/* Navegação */}
          <nav className="flex gap-2 w-full sm:w-auto justify-center">
            <button
              onClick={() => setPaginaAtual('inicio')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                paginaAtual === 'inicio' ? 'bg-emerald-500 text-slate-950 font-semibold shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Início
            </button>
            <button
              onClick={() => setPaginaAtual('cadastro')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                paginaAtual === 'cadastro' ? 'bg-emerald-500 text-slate-950 font-semibold shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Novo Aluno
            </button>
            <button
              onClick={() => setPaginaAtual('lista')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                paginaAtual === 'lista' ? 'bg-emerald-500 text-slate-950 font-semibold shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Ver Alunos ({alunos.length})
            </button>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
        {paginaAtual === 'inicio' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl text-center space-y-4">
            <h2 className="text-2xl font-bold text-white">Bem-vindo ao Gestor de Alunos</h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Gerencie estudantes, visualize cadastros e mantenha o controlo académico de forma simples e rápida. Os dados ficam salvos no teu navegador.
            </p>
            <button
              onClick={() => setPaginaAtual('cadastro')}
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold py-3 px-6 rounded-xl transition shadow-lg"
            >
              Registar Novo Aluno
            </button>
          </div>
        )}

        {paginaAtual === 'cadastro' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4 text-emerald-400">Registar Novo Aluno</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Nome Completo</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Maria Oliveira"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex: maria@email.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Curso</label>
                <input
                  type="text"
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                  placeholder="Ex: Engenharia Informática"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold py-3 px-4 rounded-xl transition shadow-lg mt-2"
              >
                Salvar Aluno
              </button>
            </form>
          </div>
        )}

        {paginaAtual === 'lista' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-emerald-400">Alunos Cadastrados</h2>
              <button
                onClick={() => setPaginaAtual('cadastro')}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-sm font-semibold py-2 px-4 rounded-xl transition"
              >
                + Novo Aluno
              </button>
            </div>

            {alunos.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-8">Nenhum aluno registado até ao momento.</p>
            ) : (
              <div className="space-y-3">
                {alunos.map((aluno) => (
                  <div key={aluno.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-white text-lg">{aluno.nome}</h3>
                      <p className="text-sm text-slate-400">{aluno.email} • <span className="text-emerald-400">{aluno.curso}</span></p>
                    </div>
                    <button
                      onClick={() => handleDelete(aluno.id)}
                      className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold py-1.5 px-3 rounded-lg transition"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Rodapé */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-900">
        Desenvolvido com React, Vite e Tailwind CSS 🚀
      </footer>
    </div>
  )
}

export default App