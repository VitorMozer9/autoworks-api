package com.github.vitormozer9.autoworks_api.modules.services.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "services")
public class WorkshopService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 80)
    private String codigo;

    @Column(nullable = false, length = 160)
    private String nome;

    @Column(length = 500)
    private String descricao;

    @Column(name = "valor_base", nullable = false, precision = 12, scale = 2)
    private BigDecimal valorBase;

    @Column(nullable = false)
    private Boolean ativo;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected WorkshopService() {
    }

    public WorkshopService(String codigo, String nome, String descricao, BigDecimal valorBase, Boolean ativo) {
        this.codigo = codigo;
        this.nome = nome;
        this.descricao = descricao;
        this.valorBase = valorBase;
        this.ativo = ativo == null || ativo;
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

    public void update(String codigo, String nome, String descricao, BigDecimal valorBase, Boolean ativo) {
        this.codigo = codigo;
        this.nome = nome;
        this.descricao = descricao;
        this.valorBase = valorBase;
        this.ativo = ativo == null || ativo;
    }

    public Long getId() { return id; }
    public String getCodigo() { return codigo; }
    public String getNome() { return nome; }
    public String getDescricao() { return descricao; }
    public BigDecimal getValorBase() { return valorBase; }
    public Boolean getAtivo() { return ativo; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
