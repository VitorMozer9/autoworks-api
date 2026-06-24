package com.github.vitormozer9.autoworks_api.modules.appointments.repositories;

import com.github.vitormozer9.autoworks_api.modules.appointments.entities.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
