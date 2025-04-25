package com.example.Student.Management.System.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Student.Management.System.Service.AuditService;
import com.example.Student.Management.System.model.AuditLog;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/audit")
public class AuditController {

    @Autowired
    private AuditService auditService;

    @GetMapping("/all")
    public List<AuditLog> getAuditLogs() {
        return auditService.getAllAuditData();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<AuditLog> getAuditLogById(@PathVariable Long id) {
        AuditLog auditLog = auditService.getAuditLogById(id);
        if (auditLog != null) {
            return ResponseEntity.ok(auditLog);
        }
        return ResponseEntity.notFound().build();
    }
    
}
