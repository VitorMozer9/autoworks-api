package com.github.vitormozer9.autoworks_api.modules.appointments.entities;

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

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String servico;

    @Column(name = "nome_cliente", nullable = false, length = 180)
    private String nomeCliente;

    @Column(length = 40)
    private String telefone;

    @Column(length = 180)
    private String email;

    @Column(length = 30)
    private String cpf;

    @Column(length = 255)
    private String endereco;

    @Column(length = 20)
    private String placa;

    @Column(length = 120)
    private String modelo;

    @Column(name = "nome_mecanico", length = 180)
    private String nomeMecanico;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal valor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private AppointmentStatus status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    protected Appointment() {
    }

    public Appointment(String servico, String nomeCliente, String telefone, String email, String cpf, String endereco,
                     String placa, String modelo, String nomeMecanico, BigDecimal valor) {
        this.servico = servico;
        this.nomeCliente = nomeCliente;
        this.telefone = telefone;
        this.email = email;
        this.cpf = cpf;
        this.endereco = endereco;
        this.placa = placa;
        this.modelo = modelo;
        this.nomeMecanico = nomeMecanico;
        this.valor = valor;
        this.status = AppointmentStatus.PENDENTE;
    }

    @PrePersist
    public void prePersist() {
        Instant now = Instant.now();
        createdAt = now;
        updatedAt = now;
        if (status == null) {
            status = AppointmentStatus.PENDENTE;
        }
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = Instant.now();
    }

    public void update(String servico, String nomeCliente, String telefone, String email, String cpf, String endereco,
                       String placa, String modelo, String nomeMecanico, BigDecimal valor) {
        this.servico = servico;
        this.nomeCliente = nomeCliente;
        this.telefone = telefone;
        this.email = email;
        this.cpf = cpf;
        this.endereco = endereco;
        this.placa = placa;
        this.modelo = modelo;
        this.nomeMecanico = nomeMecanico;
        this.valor = valor;
    }

    public Long getId() { return id; }
    public String getServico() { return servico; }
    public String getNomeCliente() { return nomeCliente; }
    public String getTelefone() { return telefone; }
    public String getEmail() { return email; }
    public String getCpf() { return cpf; }
    public String getEndereco() { return endereco; }
    public String getPlaca() { return placa; }
    public String getModelo() { return modelo; }
    public String getNomeMecanico() { return nomeMecanico; }
    public BigDecimal getValor() { return valor; }
    public AppointmentStatus getStatus() { return status; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
