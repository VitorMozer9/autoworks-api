package com.github.vitormozer9.autoworks_api.modules.products.useCases;

import com.github.vitormozer9.autoworks_api.modules.products.dtos.ProductResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.products.entities.ProductCategory;
import com.github.vitormozer9.autoworks_api.modules.products.mappers.ProductMapper;
import com.github.vitormozer9.autoworks_api.modules.products.repositories.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
        return productRepository.search(blankToNull(nome), blankToNull(codigo), ProductCategory.from(categoria))
                .stream()
                .map(productMapper::toResponse)
                .toList();
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
