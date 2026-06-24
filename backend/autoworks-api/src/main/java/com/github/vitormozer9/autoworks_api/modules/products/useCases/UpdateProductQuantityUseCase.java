package com.github.vitormozer9.autoworks_api.modules.products.useCases;

import com.github.vitormozer9.autoworks_api.exceptions.ResourceNotFoundException;
import com.github.vitormozer9.autoworks_api.modules.products.dtos.ProductResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.products.dtos.UpdateProductQuantityRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.products.entities.Product;
import com.github.vitormozer9.autoworks_api.modules.products.mappers.ProductMapper;
import com.github.vitormozer9.autoworks_api.modules.products.repositories.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UpdateProductQuantityUseCase {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public UpdateProductQuantityUseCase(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Transactional
    public ProductResponseDTO execute(Long id, UpdateProductQuantityRequestDTO request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));
        product.updateQuantidade(request.quantidade());
        return productMapper.toResponse(product);
    }
}
