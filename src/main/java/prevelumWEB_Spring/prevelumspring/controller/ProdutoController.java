package prevelumWEB_Spring.prevelumspring.controller;

import prevelumWEB_Spring.prevelumspring.model.Produto;
import prevelumWEB_Spring.prevelumspring.service.ProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "*")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping
    public List<Produto> listar() {
        return produtoService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        Produto produto = produtoService.buscarPorId(id);

        if (produto == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(produto);
    }

    @PostMapping
    public ResponseEntity<Produto> cadastrar(@RequestBody Produto produto) {
        try {
            Produto produtoSalvo = produtoService.salvar(produto);
            return ResponseEntity.ok(produtoSalvo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/pesquisar")
    public List<Produto> pesquisar(@RequestParam String nome) {
        return produtoService.pesquisarPorNome(nome);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        Produto produto = produtoService.buscarPorId(id);

        if (produto == null) {
            return ResponseEntity.notFound().build();
        }

        produtoService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}