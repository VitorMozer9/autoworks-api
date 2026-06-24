package com.github.vitormozer9.autoworks_api.e2e;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AgendamentoE2ETest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void shouldCreateListUpdateAndDeleteAgendamento() throws Exception {
        Long id = createAgendamento();

        mockMvc.perform(get("/api/agendamentos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(id))
                .andExpect(jsonPath("$[0].status").value("Pendente"));

        mockMvc.perform(put("/api/agendamentos/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "servico": "funilaria",
                                  "nomeCliente": "Cliente Atualizado",
                                  "telefone": "31988888888",
                                  "email": "cliente.atualizado@email.com",
                                  "cpf": "12345678900",
                                  "endereco": "Rua Atualizada",
                                  "placa": "XYZ9876",
                                  "modelo": "Onix",
                                  "nomeMecanico": "Mecânico Atualizado",
                                  "valor": 450.00
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.servico").value("funilaria"))
                .andExpect(jsonPath("$.nomeCliente").value("Cliente Atualizado"))
                .andExpect(jsonPath("$.status").value("Pendente"));

        mockMvc.perform(delete("/api/agendamentos/{id}", id))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/agendamentos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void shouldReturnValidationErrorWhenCreatingInvalidAgendamento() throws Exception {
        mockMvc.perform(post("/api/agendamentos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "servico": "",
                                  "nomeCliente": "",
                                  "email": "email-invalido",
                                  "valor": -1
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Dados inválidos"));
    }

    private Long createAgendamento() throws Exception {
        MvcResult result = mockMvc.perform(post("/api/agendamentos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "servico": "revisao",
                                  "nomeCliente": "Cliente E2E",
                                  "telefone": "31999999999",
                                  "email": "cliente.e2e@email.com",
                                  "cpf": "12345678900",
                                  "endereco": "Rua A",
                                  "placa": "ABC1234",
                                  "modelo": "Gol",
                                  "nomeMecanico": "Mecânico E2E",
                                  "valor": 250.00
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.servico").value("revisao"))
                .andExpect(jsonPath("$.nomeCliente").value("Cliente E2E"))
                .andExpect(jsonPath("$.status").value("Pendente"))
                .andReturn();

        JsonNode json = objectMapper.readTree(result.getResponse().getContentAsString());
        return json.get("id").asLong();
    }
}
