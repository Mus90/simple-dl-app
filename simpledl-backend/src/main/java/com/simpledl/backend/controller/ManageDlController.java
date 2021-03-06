package com.simpledl.backend.controller;


import com.simpledl.backend.model.FileDetails;
import com.simpledl.backend.service.ManageDlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/")
public class ManageDlController {

    @Autowired
    ManageDlService manageDlService;

    @GetMapping("/simple/{activationCode}")
    public ResponseEntity<String> activations(@PathVariable String activationCode) throws IOException {
        String responseMessage;
        responseMessage= manageDlService.activation(activationCode);
        return new ResponseEntity<>(responseMessage, HttpStatus.OK);
    }

    @PostMapping("/simple")
    public ResponseEntity<String> updateFiles(@RequestBody FileDetails fileDetails) throws IOException {
        String responseMessage;
        //" simpleFiles/data/config/transform2.xsl"
        if(fileDetails.getName().equals("xsl"))
            responseMessage = manageDlService.updateFile(fileDetails.getValue());
        else
            return new ResponseEntity<>(fileDetails.getName()+" File Type Not Supported", HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(responseMessage, HttpStatus.OK);
    }

}
