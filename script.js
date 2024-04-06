let participantes = [
    {
        nome: "Diego Fernandes",
        email: "diego@gmail.com",
        dataInscricao: new Date(2024, 2, 1, 12, 23),
        dataCheckin: new Date(2024, 2, 15, 20, 20),
    },
    {
        nome: "Mayk Brito",
        email: "mayk@gmail.com",
        dataInscricao: new Date(2024, 1, 2, 19, 23),
        dataCheckin: null
    },
    {
        nome: "Ana Silva",
        email: "ana@gmail.com",
        dataInscricao: new Date(2024, 0, 15, 10, 30),
        dataCheckin: new Date(2024, 0, 20, 11, 15),
    },
    {
        nome: "João Oliveira",
        email: "joao@gmail.com",
        dataInscricao: new Date(2024, 2, 10, 14, 45),
        dataCheckin: new Date(2024, 2, 15, 15, 30),
    },
    {
        nome: "Maria Souza",
        email: "maria@gmail.com",
        dataInscricao: new Date(2024, 1, 5, 8, 0),
        dataCheckin: null
    },
    {
        nome: "Pedro Santos",
        email: "pedro@gmail.com",
        dataInscricao: new Date(2024, 0, 20, 12, 0),
        dataCheckin: new Date(2024, 0, 25, 13, 30),
    },
    {
        nome: "Carla Lima",
        email: "carla@gmail.com",
        dataInscricao: new Date(2024, 2, 5, 17, 0),
        dataCheckin: new Date(2024, 2, 10, 18, 30),
    },
    {
        nome: "Rafaela Costa",
        email: "rafaela@gmail.com",
        dataInscricao: new Date(2024, 1, 15, 20, 0),
        dataCheckin: null
    },
    {
        nome: "Luiz Pereira",
        email: "luiz@gmail.com",
        dataInscricao: new Date(2024, 0, 25, 9, 0),
        dataCheckin: null
    },
    {
        nome: "Fernanda Oliveira",
        email: "fernanda@gmail.com",
        dataInscricao: new Date(2024, 0, 10, 15, 0),
        dataCheckin: new Date(2024, 0, 15, 16, 30),
    }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now())
    .to(participante.dataInscricao)

    let dataCheckin = dayjs(Date.now())
    .to(participante.dataCheckin)

    if(participante.dataCheckin == null) {
        dataCheckin = `
            <button 
                data-email="${participante.email}"
                onclick="fazerCheckin(event)"
            >
                Confirmar check-in
            </button>
        `
    }
    
    return `
    <tr>
        <td>
            <strong>
                ${participante.nome}
            </strong>
            <br>
            <small>
                ${participante.email}
            </small>
        </td>
        <td>
            ${dataInscricao}
        </td>
        <td>
            ${dataCheckin}
        </td>
    </tr>
    `
}

const atualizarLista = (participantes) => {
    let output = ""
    for(let participante of participantes) {
        output = output + criarNovoParticipante(participante)
    }

    document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)

    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckin: null,
    }

// verificar se o participante já existe
    const participanteExiste = participantes.find((p) => 
        p.email == participante.email
)

if(participanteExiste) {
    alert('Email já cadastrado!')
    return
}

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

// limpar o formulário
    event.target.querySelector('[name="nome"]').value = ''
    event.target.querySelector('[name="email"]').value = ''
}

const fazerCheckin = (event) => {
// confirmar se a pessoa quer mesmo fazer o check-in
const msgConfirm = "Tem certeza que deseja fazer o check-in?"

if(confirm(msgConfirm) == false) {
    return
}

// encontar o participante dentro da lista
    const participante = participantes.find((p) => 
         p.email == event.target.dataset.email
)

// atualizar o check-in do participante
    participante.dataCheckin = new Date()

// atualizar a lista de participantes
    atualizarLista(participantes)
}