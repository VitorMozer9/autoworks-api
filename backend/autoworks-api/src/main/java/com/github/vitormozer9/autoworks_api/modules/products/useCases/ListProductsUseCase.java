package com.github.vitormozer9.autoworks_api.modules.products.useCases;

import com.github.vitormozer9.autoworks_api.modules.products.dtos.ProductResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.products.entities.Product;
import com.github.vitormozer9.autoworks_api.modules.products.entities.ProductCategory;
import com.github.vitormozer9.autoworks_api.modules.products.mappers.ProductMapper;
import com.github.vitormozer9.autoworks_api.modules.products.repositories.ProductRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class ListProductsUseCase {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ListProductsUseCase(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Transactional(readOnly = true)
    public List<ProductResponseDTO> execute(String nome, String codigo, String categoria) {
        String nomeFiltrado = blankToNull(nome);
        String codigoFiltrado = blankToNull(codigo);
        ProductCategory categoriaFiltrada = ProductCategory.from(categoria);

        return productRepository.findAll(
                        buildSpecification(nomeFiltrado, codigoFiltrado, categoriaFiltrada),
                        Sort.by(Sort.Direction.ASC, "nome")
                )
                .stream()
                .map(productMapper::toResponse)
                .toList();
    }

    private Specification<Product> buildSpecification(String nome, String codigo, ProductCategory categoria) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (nome != null) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("nome")),
                        contains(nome)
                ));
            }

            if (codigo != null) {
                predicates.add(criteriaBuilder.like(
                        criteriaBuilder.lower(root.get("codigo")),
                        contains(codigo)
                ));
            }

            if (categoria != null) {
                predicates.add(criteriaBuilder.equal(root.get("categoria"), categoria));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    private String contains(String value) {
        return "%" + value.toLowerCase(Locale.ROOT) + "%";
    }
}
