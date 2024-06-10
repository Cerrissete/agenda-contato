const exibeContatos = () => {
    const tabela = document.getElementById('idTabelaContatos'); //pega a tabela
    const tbody = document.querySelector('tbody'); // pega o corpo da tabela

    tbody.innerHTML =
        `<tr>
    <th>Nome</th>
    <th>Contato</th>
    <th>Email</th>
    <th>Editar</th>
    <th>Excluir</th>
    </tr>`


    const contatos = JSON.parse(localStorage.getItem('contatos')) || [];

    contatos.forEach((contato, index) => {

        const conteudoContato =
            `<tr>
                <td>${contato.nome}</td>
                <td>${contato.sobrenome}</td>
                <td>${contato.telefone}</td>
                <td><button class="btnEditar" onclick="editaContato(${index})"><i class="fa fa-edit"></i></button></td>
                <td><button class="btnExcluir" onclick="deletaContato(${index})"><i class="fa fa-trash"></i></button></td>
            </tr>`;

        const row = tbody.insertRow();
        row.innerHTML = conteudoContato;
    });
}


const addContato = (event) => {
    event.preventDefault();
    let form = document.getElementById('idContatoForm');
    let nome = document.getElementById('idNome').value.trim();
    let sobrenome = document.getElementById('idSobrenome').value.trim();
    let telefone = document.getElementById('idTel').value.trim();
    let tipoTel = document.getElementById('idTelTipo').value.trim();
    let email = document.getElementById('idEmail').value.trim();
    let camposVazios = [];


    if (nome == "") {
        camposVazios.push("Nome");
    }
    if (sobrenome == "") {
        camposVazios.push("Sobrenome");
    }

    telefone == "" ? camposVazios.push("Telefone") : '';

    tipoTel == "" ? camposVazios.push("Tipo de telefone") : '';

    email == "" ? camposVazios.push("Email") : '';


    console.log(`Informações adicionadas
        nome: ${nome} 
        sobrenome: ${sobrenome} 
        telefone: ${telefone} 
        email: ${email} `);


    localStorage.setItem("Nome", nome);
    localStorage.setItem("Sobrenome", sobrenome);
    localStorage.setItem("Telefone", telefone);
    localStorage.setItem("tipoTel", tipoTel);
    localStorage.setItem("Email", email);


    telefone == "" ? camposVazios.push(" Telefone") : '';
    email == "" ? camposVazios.push(" Email") : "";
    sobrenome == "" ? camposVazios.push(" Sobrenome") : '';
    nome == "" ? camposVazios.push(" Nome") : "";


    if (nome == "" || sobrenome == "" || telefone == "" || email == "") {
        alert("Cadê" + camposVazios);
    }


    const contato = { //Criando um objeto para armazenar os dados
        nome: nome,
        sobrenome: sobrenome,
        telefone: telefone,
        tipoTel: tipoTel,
        email: email
    }


    let contatos = JSON.parse(localStorage.getItem('contatos')) || []; //buscar contatos salvos ou criar um array vazio


    contatos.push(contato); // adiciona um novo contato dentro da lista contatos
    localStorage.setItem('contatos', JSON.stringify(contatos));


    form.reset();
    exibeContatos();
}


const cancelaForm = (event) => {
    event.preventDefault(); //impede o comportamento do botão, enviar o formulario
    document.getElementById('idContatoForm').reset(); //limpa o formulario
}


const deletaContato = (index) => {
    let contatos = JSON.parse(localStorage.getItem('contatos')) || []; //pega a lista de contatos 
    contatos.splice(index, 1); //remove o item da lsta contatos pelo index, o numero 1 significa que ele deve remover apenas 1 elemento da lista

    localStorage.setItem('contatos', JSON.stringify(contatos));
    exibeContatos();
}

const editaContato = (index) => {
    const contatos = JSON.parse(localStorage.getItem('contatos')) || [];
    const contato = contatos[index];

    document.getElementById('idNome').value = contato.nome;
    document.getElementById('idSobrenome').value = contato.sobrenome;
    document.getElementById('idTel').value = contato.telefone;
    document.getElementById('idTelTipo').value = contato.telTipo;
    document.getElementById('idEmail').value = contato.email;

    const atualizaContato = (event) => {
        event.preventDefault();

        contato.nome = document.getElementById('idNome').value.trim();
        contato.sobrenome = document.getElementById('idSobrenome').value.trim();
        contato.telefone = document.getElementById('idTel').value.trim();
        contato.telTipo = document.getElementById('idTelTipo').value.trim();
        contato.email = document.getElementById('idEmail').value.trim();

        const upContato = JSON.stringify(contatos);
        localStorage.setItem('contato', upContato);

        exibeContatos();
        document.getElementById('idContatoForm').reset();

        document.querySelector('.btnSalvar').removeEventListener('click', atualizaContato);
        document.querySelector('.btnSalvar').addEventListener('click', addContato);

    }

        document.querySelector('.btnSalvar').removeEventListener('click', addContato);
        document.querySelector('.btnSalvar').addEventListener('click', atualizaContato);
}

const buscaContato = () => {
    const barraPesquisa = document.getElementById('idPesquisa').value.trim().toLowerCase();
    const tabela = document.getElementById('idTabelaContatos');
    const linhas = document.getElementById('tr');
    const quantidadeLinhas = linhas.length;

    for (let i = 0; i < quantidadeLinhas; i++){
        const celulas = linhas[i].getElementById('td');
        const quantidadeCelulas = celulas.length;
        let busca = false;

    for (let j = 0; j < quantidadeCelulas; j++){
        const textoCelulas = celulas[j].textContent.toLocaleLowerCase();
        if(textoCelulas.includes(barraPesquisa)){
            busca = true;
            break;
            }
        }
        busca? linhas[i].style.display = '' : linhas[i].style.display = 'none';
    }
}


// função que vai inicializar a aplicação
const init = () => {

    document.querySelector('.btnSalvar').addEventListener('click', addContato);
    document.querySelector('.btnCancelar').addEventListener('click', cancelaForm);
    document.querySelector('idPesquisa').addEventListener('input', buscaContato);
    exibeContatos();

}


init();


