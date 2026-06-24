package com.github.vitormozer9.autoworks_api.modules.products.controller;

import com.github.vitormozer9.autoworks_api.modules.products.dtos.CreateProductRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.products.dtos.ProductResponseDTO;
import com.github.vitormozer9.autoworks_api.modules.products.dtos.UpdateProductQuantityRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.products.dtos.UpdateProductRequestDTO;
import com.github.vitormozer9.autoworks_api.modules.products.useCases.CreateProductUseCase;
import com.github.vitormozer9.autoworks_api.modules.products.useCases.DeleteProductUseCase;
import com.github.vitormozer9.autoworks_api.modules.products.useCases.FindProductByIdUseCase;
import com.github.vitormozer9.autoworks_api.modules.products.useCases.ListProductsUseCase;
import com.github.vitormozer9.autoworks_api.modules.products.useCases.UpdateProductQuantityUseCase;
import com.github.vitormozer9.autoworks_api.modules.products.useCases.UpdateProductUseCase;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping({"/api/produtos", "/api/pecas"})
public class ProductController {

    private final CreateProductUseCase createProductUseCase;
    private final ListProductsUseCase listProductsUseCase;
    private final FindProductByIdUseCase findProductByIdUseCase;
    private final UpdateProductUseCase updateProductUseCase;
    private final UpdateProductQuantityUseCase updateProductQuantityUseCase;
    private final DeleteProductUseCase deleteProductUseCase;

    public ProductController(
            CreateProductUseCase createProductUseCase,
            ListProductsUseCase listProductsUseCase,
            FindProductByIdUseCase findProductByIdUseCase,
            UpdateProductUseCase updateProductUseCase,
            UpdateProductQuantityUseCase updateProductQuantityUseCase,
            DeleteProductUseCase deleteProductUseCase
    ) {
        this.createProductUseCase = createProductUseCase;
        this.listProductsUseCase = listProductsUseCase;
        this.findProductByIdUseCase = findProductByIdUseCase;
        this.updateProductUseCase = updateProductUseCase;
        this.updateProductQuantityUseCase = updateProductQuantityUseCase;
        this.deleteProductUseCase = deleteProductUseCase;
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> list(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String codigo,
            @RequestParam(required = false) String categoria
    ) {
        return ResponseEntity.ok(listProductsUseCase.execute(nome, codigo, categoria));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(findProductByIdUseCase.execute(id));
    }

    @PostMapping
    public ResponseEntity<ProductResponseDTO> create(@Valid @RequestBody CreateProductRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(createProductUseCase.execute(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> update(@PathVariable Long id, @Valid @RequestBody UpdateProductRequestDTO request) {
        return ResponseEntity.ok(updateProductUseCase.execute(id, request));
    }

    @PatchMapping("/{id}/quantidade")
    public ResponseEntity<ProductResponseDTO> updateQuantity(@PathVariable Long id, @Valid @RequestBody UpdateProductQuantityRequestDTO request) {
        return ResponseEntity.ok(updateProductQuantityUseCase.execute(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        deleteProductUseCase.execute(id);
        return ResponseEntity.noContent().build();
    }
}