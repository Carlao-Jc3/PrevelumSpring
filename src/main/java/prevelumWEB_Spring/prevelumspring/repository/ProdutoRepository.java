package prevelumWEB_Spring.prevelumspring.repository;

import prevelumWEB_Spring.prevelumspring.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findByNomeContainingIgnoreCase(String nome);
}