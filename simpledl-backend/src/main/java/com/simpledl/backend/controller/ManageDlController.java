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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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

/*    @PostMapping("/simple/instance/{instanceName}")
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
    }*/


    @PostMapping("/simple/instance/{instanceName}")
    public ResponseEntity<String> createNewInstance(
            @PathVariable String instanceName,
            @RequestBody Map<String, String> requestData
    ) throws IOException, InterruptedException {
        String responseMessage;
        String formattedInstanceName = instanceName.replaceAll("\\s+", "_"); // Replace spaces with underscores
        List<String> instanceList = manageDlService.getInstances();

        if (!instanceList.contains(formattedInstanceName)) {
            // Extract title, footer, and background color from the requestData map
            String title = requestData.get("title");
            String footer = requestData.get("footer");
            String backgroundColor = requestData.get("backgroundColor");
            responseMessage = manageDlService.createNewInstance(formattedInstanceName, title, footer, backgroundColor);

        } else {
            return new ResponseEntity<>("Instance already exists.", HttpStatus.CONFLICT);
        }

        System.out.println("Response Message: " + responseMessage);
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
}
