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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProductE2ETest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void shouldCreateListUpdateQuantityAndDeleteProduct() throws Exception {
        Long id = createProduct();

        mockMvc.perform(get("/api/produtos").param("categoria", "motor"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(id))
                .andExpect(jsonPath("$[0].categoria").value("motor"));

        mockMvc.perform(put("/api/produtos/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "nome": "Filtro de óleo premium",
                                  "codigo": "PROD-E2E-001",
                                  "quantidade": 8,
                                  "marca": "Bosch",
                                  "dataAquisicao": "2026-06-24",
                                  "valor": 89.90,
                                  "categoria": "oleo"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Filtro de óleo premium"))
                .andExpect(jsonPath("$.categoria").value("oleo"));

        mockMvc.perform(patch("/api/produtos/{id}/quantidade", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "quantidade": 12
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.quantidade").value(12));

        mockMvc.perform(delete("/api/produtos/{id}", id))
                .andExpect(status().isNoContent());
    }

    private Long createProduct() throws Exception {
        MvcResult result = mockMvc.perform(post("/api/produtos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "nome": "Filtro de óleo",
                                  "codigo": "PROD-E2E-001",
                                  "quantidade": 5,
                                  "marca": "Bosch",
                                  "dataAquisicao": "2026-06-24",
                                  "valor": 79.90,
                                  "categoria": "motor"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nome").value("Filtro de óleo"))
                .andExpect(jsonPath("$.codigo").value("PROD-E2E-001"))
                .andReturn();

        JsonNode json = objectMapper.readTree(result.getResponse().getContentAsString());
        return json.get("id").asLong();
    }
}
