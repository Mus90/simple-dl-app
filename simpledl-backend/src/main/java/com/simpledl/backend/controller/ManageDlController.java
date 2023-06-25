package com.simpledl.backend.controller;

import com.simpledl.backend.model.FileDetails;
import com.simpledl.backend.service.ManageDlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import org.springframework.http.HttpHeaders;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/")
public class ManageDlController {

    @Autowired
    private ManageDlService manageDlService;

    @GetMapping("/simple/{instanceName}")
    public ResponseEntity<String> activations(@PathVariable String instanceName) throws IOException {
        String responseMessage;
        List<String> instanceList = manageDlService.getInstances();
        if(instanceList.contains(instanceName)) {
            responseMessage = manageDlService.activateInstance(instanceName);
        } else {
            return new ResponseEntity<>("Instance does not exist.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(responseMessage, HttpStatus.OK);
    }

    @PostMapping("/simple/instance/{instanceName}")
    public ResponseEntity<String> createNewInstance(@PathVariable String instanceName) throws IOException {
        String responseMessage;
        String formattedInstanceName = instanceName.replaceAll("\\s+", "_"); // Replace spaces with underscores
        List<String> instanceList = manageDlService.getInstances();
        if(!instanceList.contains(formattedInstanceName)) {
            responseMessage = manageDlService.createNewInstance(formattedInstanceName);
        } else {
            return new ResponseEntity<>("Instance already exists.", HttpStatus.CONFLICT);
        }
        System.out.println("Response Message: " + responseMessage); // Add this line
        return new ResponseEntity<>(responseMessage, HttpStatus.OK);
    }

    @DeleteMapping("/simple/instance/{instanceName}")
    public ResponseEntity<String> deleteInstance(@PathVariable String instanceName) throws IOException {
        String responseMessage;
        List<String> instanceList = manageDlService.getInstances();
        if(instanceList.contains(instanceName)) {
            responseMessage = manageDlService.deleteInstance(instanceName);
        } else {
            return new ResponseEntity<>("Instance does not exist.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(responseMessage, HttpStatus.OK);
    }

    @GetMapping("/simple/instances")
    public ResponseEntity<List<String>> getInstances() throws IOException {
        List<String> responseMessage = manageDlService.getInstances();
        return new ResponseEntity<>(responseMessage, HttpStatus.OK);
    }

    @PostMapping("/simple")
    public ResponseEntity<String> updateFiles(@RequestBody FileDetails fileDetails) throws IOException {
        String responseMessage;
        //" simpleFiles/data/config/transform2.xsl"
        if(fileDetails.getName().equals("xsl")) {
            responseMessage = manageDlService.updateFile(fileDetails.getValue());
        } else {
            return new ResponseEntity<>(fileDetails.getName() + " File Type Not Supported", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(responseMessage, HttpStatus.OK);
    }
}
