package com.example.Student.Management.System.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Student.Management.System.Service.AuditService;
import com.example.Student.Management.System.model.AuditLog;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/audit")
public class AuditController {

    @Autowired
    private AuditService auditService;

    @GetMapping("/all")
    public List<AuditLog> getAuditLogs() {
        return auditService.getAllAuditData();
    }
    

}
