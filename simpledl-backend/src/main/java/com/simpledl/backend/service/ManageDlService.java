package com.simpledl.backend.service;

import org.springframework.stereotype.Service;
import org.w3c.dom.*;
import javax.xml.parsers.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.*;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ManageDlService {

    public String createNewInstance(String instanceName, String title, String footer, String backgroundColor, MultipartFile imageFile) throws IOException {
        try {
            executeCommand("pwd");
            executeCommand("mkdir " + instanceName);
            executeCommand("cp simpleFiles/simpledl.tar.xz " + instanceName + "/simpledl.tar.xz");
            executeCommand("cp -R simpleFiles/db " + instanceName + "/db");
            executeCommand("cp -R simpleFiles/data " + instanceName + "/data");
            executeCommand("cp -R simpleFiles/public_html " + instanceName + "/public_html");
            executeCommand("tar -xvf " + instanceName + "/simpledl.tar.xz -C " + instanceName);

            String logoFilename = null;
            if (imageFile != null && !imageFile.isEmpty()) {
                logoFilename = imageFile.getOriginalFilename();
                Path imagePath = Paths.get(instanceName + "/public_html/images/" + logoFilename);
                Files.copy(imageFile.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
            }

            DynamicContent(instanceName, title, backgroundColor, footer, logoFilename);
            activateInstance(instanceName);

            return "Instance has been created successfully.";
        } catch (Exception e) {
            throw new RuntimeException("Error while creating instance: " + e.getMessage(), e);
        }
    }

    private String DynamicContent(String instanceName, String title, String backgroundColor, String footer, String logo) {
        try {
            File xmlFile = new File(instanceName + "/data/config/settings.xml");

            DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
            Document doc = docBuilder.parse(xmlFile);

            Node titleNode = doc.getElementsByTagName("title").item(0);
            titleNode.setTextContent(title.isEmpty() ? "Page Title" : title);

            Node bgColorNode = doc.getElementsByTagName("backgroundColor").item(0);
            bgColorNode.setTextContent(backgroundColor.isEmpty() ? "#ded7cd" : backgroundColor);

            Node footerNode = doc.getElementsByTagName("footer").item(0);
            footerNode.setTextContent(footer.isEmpty() ? "This is a collection of research papers, presentations and related files from the annual symposia of the Networked Digital Library of Theses and Dissertations" : footer);

            if (logo != null && !logo.isEmpty()) {
                Node logoNode = doc.getElementsByTagName("logo").item(0);
                logoNode.setTextContent(logo);
            }

            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource source = new DOMSource(doc);
            StreamResult result = new StreamResult(xmlFile);
            transformer.transform(source, result);

            return "Success";
        } catch (Exception ex) {
            throw new RuntimeException("Error in DynamicContent: " + ex.getMessage(), ex);
        }
    }

    public String deleteInstance(String instanceName) throws IOException {
        try {
            executeCommand("pwd");
            executeCommand("rm -rf  " + instanceName);
            return "Instance has been deleted successfully.";
        } catch (Exception e) {
            throw new RuntimeException("Error while deleting instance: " + e.getMessage(), e);
        }
    }

    public static List<String> getInstances() throws IOException {
        try {
            String[] folderList = executeCommand("ls").split("\n");
            List<String> instanceList = new ArrayList<>();
            List<String> listOfIgnored = Arrays.asList("mvnw", "mvnw.cmd", "pom.xml", "simpledl", "simpledl-backend.iml", "simpleFiles", "src", "target");
            for (String folder : folderList) {
                if (!listOfIgnored.contains(folder))
                    instanceList.add(folder);
            }
            return instanceList;
        } catch (Exception e) {
            throw new RuntimeException("Error while getting instances: " + e.getMessage(), e);
        }
    }

    public String activateInstance(String instanceName) throws IOException {
        try {
            executeCommand("pwd");
            executeCommand("perl " + instanceName + "/simpledl/bin/import.pl");
            executeCommand("perl " + instanceName + "/simpledl/bin/index.pl");
            executeCommand("perl " + instanceName + "/simpledl/bin/generate.pl --website  --force");
            executeCommand("perl " + instanceName + "/simpledl/bin/generate.pl --force");
            return "Simple DL activation process has been completed.";
        } catch (Exception e) {
            throw new RuntimeException("Error while activating instance: " + e.getMessage(), e);
        }
    }

    private static String executeCommand(String command) throws IOException {
        Process process = Runtime.getRuntime().exec(command);
        String output = printResults(process);
        if (output.contains("ERROR")) {
            throw new RuntimeException("Error executing command: " + command + ". Output: " + output);
        }
        return output;
    }

    private static String printResults(Process process) throws IOException {
        StringBuilder builder = new StringBuilder();
        BufferedReader stdInput = new BufferedReader(new InputStreamReader(process.getInputStream()));
        BufferedReader stdError = new BufferedReader(new InputStreamReader(process.getErrorStream()));

        String line;
        while ((line = stdInput.readLine()) != null) {
            builder.append(line);
            builder.append("\n");
        }

        while ((line = stdError.readLine()) != null) {
            builder.append("ERROR: ");
            builder.append(line);
            builder.append("\n");
        }

        System.out.println("  " + builder);
        return builder.toString();
    }
}
