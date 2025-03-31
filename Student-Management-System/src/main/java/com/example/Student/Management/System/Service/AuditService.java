package com.example.Student.Management.System.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Student.Management.System.model.AuditLog;
import com.example.Student.Management.System.repo.AuditLogRepository;

@Service
public class AuditService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    public List<AuditLog> getAllAuditData() {
        List<AuditLog> auditLogs = auditLogRepository.findAll();
        System.out.println("Fetched audit logs: " + auditLogs);
        return auditLogs;
    }

}
