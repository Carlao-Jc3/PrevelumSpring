function limparCampos() {
    document.getElementById("cadastroForm").reset();
}

async function cadastrarProduto() {
    const nome = document.getElementById("nome").value.trim();
    const preco = document.getElementById("preco").value;
    const estoque = document.getElementById("estoque").value;
    const fornecedor = document.getElementById("fornecedor").value.trim();

    if (nome === "" || preco === "" || estoque === "" || fornecedor === "") {
        alert("Preencha todos os campos.");
        return;
    }

    if (Number(preco) <= 0) {
        alert("Preço inválido.");
        return;
    }

    if (Number(estoque) < 0) {
        alert("Estoque inválido.");
        return;
    }

    const produto = {
        nome: nome,
        preco: Number(preco),
        estoque: Number(estoque),
        fornecedor: fornecedor
    };

    try {
        const resposta = await fetch("http://localhost:8080/api/produtos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        });

        if (!resposta.ok) {
            alert("Erro ao cadastrar produto.");
            return;
        }

        alert("Produto cadastrado com sucesso!");
        limparCampos();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível conectar ao servidor.");
    }
}

function irParaListagem() {
    window.location.href = "produtos.html";
}