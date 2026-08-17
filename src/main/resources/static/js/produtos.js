let produtos = [];
let indiceSelecionado = null;

async function carregarProdutos() {
    try {
        const resposta = await fetch("http://localhost:8080/api/produtos");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar produtos.");
        }

        produtos = await resposta.json();

        carregarTabela(produtos);

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar os produtos.");
    }
}

function carregarTabela(lista) {
    const tabela = document.getElementById("tabelaProdutos");
    tabela.innerHTML = "";

    lista.forEach((produto) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${Number(produto.preco).toFixed(2)}</td>
            <td>${produto.estoque}</td>
            <td>${produto.fornecedor}</td>
        `;

        linha.onclick = () => selecionarLinha(produto.id, linha);

        tabela.appendChild(linha);
    });
}

function selecionarLinha(id, linha) {
    document.querySelectorAll("tbody tr")
            .forEach(tr => tr.classList.remove("selecionado"));

    linha.classList.add("selecionado");

    indiceSelecionado = id;
}

async function pesquisarProduto() {
    const termo = document.getElementById("pesquisa").value.trim();

    if (termo === "") {
        carregarTabela(produtos);
        return;
    }

    try {
        const resposta = await fetch(
            `http://localhost:8080/api/produtos/pesquisar?nome=${encodeURIComponent(termo)}`
        );

        if (!resposta.ok) {
            throw new Error("Erro na pesquisa.");
        }

        const filtrados = await resposta.json();

        carregarTabela(filtrados);

    } catch (erro) {
        console.error(erro);
        alert("Erro ao pesquisar produto.");
    }
}

async function excluirProduto() {
    if (indiceSelecionado === null) {
        alert("Selecione um produto para excluir.");
        return;
    }

    try {
        const resposta = await fetch(
            `http://localhost:8080/api/produtos/${indiceSelecionado}`,
            {
                method: "DELETE"
            }
        );

        if (resposta.status === 404) {
            alert("Produto não encontrado.");
            return;
        }

        if (!resposta.ok && resposta.status !== 204) {
            throw new Error("Erro ao excluir produto.");
        }

        alert("Produto excluído com sucesso!");

        indiceSelecionado = null;

        await carregarProdutos();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível excluir o produto.");
    }
}

function voltarCadastro() {
    window.location.href = "cadastro.html";
}

window.onload = carregarProdutos;