package com.github.vitormozer9.autoworks_api.modules.products.useCases;

import com.github.vitormozer9.autoworks_api.exceptions.BusinessException;
import com.github.vitormozer9.autoworks_api.exceptions.ResourceNotFoundException;
import com.github.vitormozer9.autoworks_api.modules.products.dtos.ProductResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.products.dtos.UpdateProductRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.products.entities.Product;
import com.github.vitormozer9.autoworks_api.modules.products.mappers.ProductMapper;
import com.github.vitormozer9.autoworks_api.modules.products.repositories.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UpdateProductUseCase {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public UpdateProductUseCase(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Transactional
    public ProductResponseDTO execute(Long id, UpdateProductRequestDTO request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));

        if (productRepository.existsByCodigoIgnoreCaseAndIdNot(request.codigo(), id)) {
            throw new BusinessException("Código do produto já cadastrado");
        }

        product.update(request.nome(), request.codigo(), request.quantidade(), request.marca(), request.dataAquisicao(), request.valor(), request.categoria());
        return productMapper.toResponse(product);
    }
}
