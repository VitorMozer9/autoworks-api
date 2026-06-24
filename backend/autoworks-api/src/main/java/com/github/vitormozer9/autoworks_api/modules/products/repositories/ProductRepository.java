package com.github.vitormozer9.autoworks_api.modules.products.repositories;

import com.github.vitormozer9.autoworks_api.modules.products.entities.Product;
import com.github.vitormozer9.autoworks_api.modules.products.entities.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    boolean existsByCodigoIgnoreCase(String codigo);

    boolean existsByCodigoIgnoreCaseAndIdNot(String codigo, Long id);

    @Query("""
            SELECT product FROM Product product
            WHERE (:nome IS NULL OR LOWER(product.nome) LIKE LOWER(CONCAT('%', :nome, '%')))
              AND (:codigo IS NULL OR LOWER(product.codigo) LIKE LOWER(CONCAT('%', :codigo, '%')))
              AND (:categoria IS NULL OR product.categoria = :categoria)
            ORDER BY product.nome
            """)
    List<Product> search(
            @Param("nome") String nome,
            @Param("codigo") String codigo,
            @Param("categoria") ProductCategory categoria
    );
}
