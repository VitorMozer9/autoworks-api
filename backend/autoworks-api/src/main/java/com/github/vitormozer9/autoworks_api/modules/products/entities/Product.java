package com.github.vitormozer9.autoworks_api.modules.products.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 160)
    private String nome;

    @Column(nullable = false, unique = true, length = 60)
    private String codigo;

    @Column(nullable = false)
    private Integer quantidade;

    @Column(length = 120)
    private String marca;

    @Column(name = "data_aquisicao")
    private LocalDate dataAquisicao;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal valor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ProductCategory categoria;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected Product() {
    }

    public Product(String nome, String codigo, Integer quantidade, String marca, LocalDate dataAquisicao,
                   BigDecimal valor, ProductCategory categoria) {
        this.nome = nome;
        this.codigo = codigo;
        this.quantidade = quantidade;
        this.marca = marca;
        this.dataAquisicao = dataAquisicao;
        this.valor = valor;
        this.categoria = categoria;
    }

    @PrePersist
    public void prePersist() {
        Instant now = Instant.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = Instant.now();
    }

    public void update(String nome, String codigo, Integer quantidade, String marca, LocalDate dataAquisicao,
                       BigDecimal valor, ProductCategory categoria) {
        this.nome = nome;
        this.codigo = codigo;
        this.quantidade = quantidade;
        this.marca = marca;
        this.dataAquisicao = dataAquisicao;
        this.valor = valor;
        this.categoria = categoria;
    }

    public void updateQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getCodigo() { return codigo; }
    public Integer getQuantidade() { return quantidade; }
    public String getMarca() { return marca; }
    public LocalDate getDataAquisicao() { return dataAquisicao; }
    public BigDecimal getValor() { return valor; }
    public ProductCategory getCategoria() { return categoria; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
