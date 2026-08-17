package prevelumWEB_Spring.prevelumspring.service;

import prevelumWEB_Spring.prevelumspring.model.Produto;
import prevelumWEB_Spring.prevelumspring.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<Produto> listar() {
        return produtoRepository.findAll();
    }

    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElse(null);
    }

    public Produto salvar(Produto produto) {
        validarProduto(produto);
        return produtoRepository.save(produto);
    }

    public void excluir(Long id) {
        produtoRepository.deleteById(id);
    }

    public List<Produto> pesquisarPorNome(String nome) {
        return produtoRepository.findByNomeContainingIgnoreCase(nome);
    }

    public void validarProduto(Produto produto) {

        if (produto == null) {
            throw new IllegalArgumentException("Produto não pode ser nulo");
        }

        if (produto.getNome() == null || produto.getNome().isBlank()) {
            throw new IllegalArgumentException("Nome do produto é obrigatório");
        }

        if (produto.getPreco() <= 0) {
            throw new IllegalArgumentException("Preço inválido");
        }

        if (produto.getEstoque() < 0) {
            throw new IllegalArgumentException("Estoque inválido");
        }
    }
}