package com.test.testweb.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/manage")
public class ManageDlController {

    @PostMapping("/create/{instanceName}")
    public ResponseEntity<String> createNewInstance(
            @PathVariable String instanceName,
            @RequestParam String title,
            @RequestParam String footer,
            @RequestParam String backgroundColor,
            @RequestParam("imageFile") MultipartFile imageFile) {
        return ResponseEntity.ok("response");
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/instances")
    public ResponseEntity<List<String>> getInstances() {
        List<String> supplierNames = new ArrayList<>();
        supplierNames.add("Musab");
        supplierNames.add("Mustafa");
        supplierNames.add("Ahmed");
        return ResponseEntity.ok(supplierNames);
    }

}
