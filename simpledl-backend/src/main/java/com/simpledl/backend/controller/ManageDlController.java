package com.simpledl.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.simpledl.backend.service.ManageDlService;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/manage")
public class ManageDlController {

    private final ManageDlService manageDlService;

    @Autowired
    public ManageDlController(ManageDlService manageDlService) {
        this.manageDlService = manageDlService;
    }

    @PostMapping("/create/{instanceName}")
    public ResponseEntity<String> createNewInstance(
            @PathVariable String instanceName,
            @RequestParam String title,
            @RequestParam String footer,
            @RequestParam String backgroundColor,
            @RequestParam("imageFile") MultipartFile imageFile) {
        try {
            String response = manageDlService.createNewInstance(instanceName, title, footer, backgroundColor, imageFile);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/instances")
    public ResponseEntity<List<String>> getInstances() {
        try {
            List<String> instances = manageDlService.getInstances();
            return ResponseEntity.ok(instances);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/delete/{instanceName}")
    public ResponseEntity<String> deleteInstance(@PathVariable String instanceName) {
        try {
            String response = manageDlService.deleteInstance(instanceName);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/activate/{instanceName}")
    public ResponseEntity<String> activateInstance(@PathVariable String instanceName) {
        try {
            String response = manageDlService.activateInstance(instanceName);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
