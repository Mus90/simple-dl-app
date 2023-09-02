package com.simpledl.backend.service;

import org.springframework.stereotype.Service;
import org.w3c.dom.*;
import java.io.*;
import javax.xml.parsers.*;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.io.IOException;
import java.nio.file.*;
import java.util.Objects;

@Service
public class ManageDlService {

    public String createNewInstance(String instanceName, String title, String footer, String backgroundColor) throws IOException {

        Process process = Runtime.getRuntime().exec("pwd");
        printResults(process);

        System.out.println("****** creating instance ********");
        Process createProcess = Runtime.getRuntime().exec("mkdir "+instanceName);
        printResults(createProcess);

        System.out.println("****** copy instance template ********");
        Process copyTemplateProcess = Runtime.getRuntime().exec("cp simpleFiles/simpledl.tar.xz "+instanceName+"/simpledl.tar.xz ");
        printResults(copyTemplateProcess);

        Process copyTemplateProcess1 = Runtime.getRuntime().exec( "cp -R simpleFiles/db "+instanceName+"/db");
        printResults(copyTemplateProcess1);

        Process copyTemplateProcess2 = Runtime.getRuntime().exec("cp -R simpleFiles/data "+instanceName+"/data");
        printResults(copyTemplateProcess2);

        Process copyTemplateProcess3 = Runtime.getRuntime().exec("cp -R simpleFiles/public_html "+instanceName+"/public_html");
        printResults(copyTemplateProcess3);

        Process process2 = Runtime.getRuntime().exec("pwd");
        printResults(process2);

        System.out.println("****** extract instance template ********");
        // copy simpledl directory which is in the current directory to instance directory include all subsequent directories and files
        Process extractProcess = Runtime.getRuntime().exec("tar -xvf "+instanceName+"/simpledl.tar.xz -C "+instanceName);
        printResults(extractProcess);

        String indexPath = instanceName + "/public_html/index.html";
       //String styleCssPath = getStyleCssPath(instanceName);
       //modifyIndexHtml(indexPath, styleCssPath, title, footer, backgroundColor);

        DynamicContent(instanceName, title, backgroundColor);
        activateInstance(instanceName);

        return "Instance has been created successfully.";
    }

    private void DynamicContent(String instanceName, String title, String backgroundColor){
        try{
            File xmlFile = new File(instanceName+ "/data/config/settings.xml");

            if(Objects.equals(title, "")) {
                title = "Page Title";
            }

            if(Objects.equals(backgroundColor, "")){
                backgroundColor = "#ded7cd";
            }

            StringBuilder stringBuilder = new StringBuilder();

            try (BufferedReader reader = new BufferedReader(new FileReader(xmlFile))){
                String line;

                while ((line = reader.readLine()) != null){
                    stringBuilder.append(line).append(System.lineSeparator());
                }
            }

            String updateXlmContent = stringBuilder.toString()
                    .replaceAll("<title>.*</title>", "<title>" + title + "</title>")
                    .replaceAll("<backgroundColor>.*</backgroundColor>", "<backgroundColor>" + backgroundColor + "</backgroundColor>");

            try(BufferedWriter writer = new BufferedWriter(new FileWriter(xmlFile, false))){
                writer.write(updateXlmContent);
            }
            System.out.println("Title Updated Successfully");


        }catch (Exception ex){
            ex.printStackTrace();
        }
    }

//    private void modifyIndexHtml(String indexPath, String stylePath, String title, String footer, String backgroundColor) throws IOException {
//        Path path = Paths.get(indexPath);
//        Path path_two = Paths.get(stylePath);
//        List<String> lines = Files.readAllLines(path, StandardCharsets.UTF_8);
//        List<String> lines_two = Files.readAllLines(path_two, StandardCharsets.UTF_8);
//        boolean insideAboutDiv = false;
//
//        for (int i = 0; i < lines.size(); i++) {
//            String line = lines.get(i);
//
//            // Modify the <title> tag
//            if (line.contains("<title>")) {
//                lines.set(i, "      <title>" + title + "</title>");
//            }
//
//            if (line.contains("<div class=\"aboutfhya linesection\">")) {
//                insideAboutDiv = true;
//                continue;
//            }
//
//            if (insideAboutDiv && line.contains("<p>")) {
//
//                lines.set(i, "    <p>" + footer + "</p>");
//                insideAboutDiv = false;
//            }
//
//            boolean insideBodySelector = false;
//
//            for (int s = 0; s < lines_two.size(); s++) {
//                String line_two = lines_two.get(s);
//
//                if (insideBodySelector) {
//                    if (line_two.contains("}")) {
//                        insideBodySelector = false;
//                    } else if (line_two.contains("background-color")) {
//                        line_two = line_two.replace("background-color: #ded7cd;", "background-color: " + backgroundColor + ";");
//                        lines_two.set(s, line_two);
//                    }
//                } else if (line_two.contains("body {")) {
//                    insideBodySelector = true;
//                }
//            }
//
//        }
//
//        Files.write(path, lines, StandardCharsets.UTF_8);
//        Files.write(path_two, lines_two, StandardCharsets.UTF_8);
//    }
//    private String getStyleCssPath(String instanceName) {
//
//        String styleCssPath = instanceName + "/public_html/styles/style.css";
//        return styleCssPath;
//    }
    public String deleteInstance(String instanceName) throws IOException {

        Process process = Runtime.getRuntime().exec("pwd");
        printResults(process);
        System.out.println("****** delete instance ********");
        Process deleteProcess = Runtime.getRuntime().exec("rm -rf  " + instanceName);
        printResults(deleteProcess);

        return "Instance has been deleted successfully.";
    }

    public static List<String> getInstances() throws IOException {
        Process process = Runtime.getRuntime().exec("ls");
        String[] folderList = printResults(process).split("\n");
        List<String> instanceList = new ArrayList<>();
        List<String> listOfIgnored = Arrays.asList(new String[]{"mvnw", "mvnw.cmd", "pom.xml", "simpledl", "simpledl-backend.iml", "simpleFiles", "src", "target"});
        for(int i=0;i<folderList.length-1;i++)
        {
            if(!listOfIgnored.contains(folderList[i]))
                instanceList.add(folderList[i]);
        }

        return instanceList;
    }

    public String activateInstance(String instanceName) throws IOException {

        Process process = Runtime.getRuntime().exec("pwd");
        printResults(process);

        System.out.println("****** importing ********");
        Process importProcess = Runtime.getRuntime().exec("perl "+instanceName+"/simpledl/bin/import.pl");
        printResults(importProcess);

        System.out.println("****** indexing ********");
        Process indexProcess = Runtime.getRuntime().exec("perl "+instanceName+"/simpledl/bin/index.pl");
        printResults(indexProcess);

        System.out.println("****** generating ********");
        Process generateProcess = Runtime.getRuntime().exec("perl "+instanceName+"/simpledl/bin/generate.pl --website  --force");
        printResults(generateProcess);


        System.out.println("****** generating ********");
        Process generateProcessForce = Runtime.getRuntime().exec("perl "+instanceName+"/simpledl/bin/generate.pl --force");
        printResults(generateProcessForce);

        return "Simple DL activation process has been completed.";
    }

    public static String printResults(Process process) throws IOException {
        StringBuilder builder = new StringBuilder();
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line = "";
        while ((line = reader.readLine()) != null) {
            builder.append(line);
            builder.append("\n");
        }
        System.out.println("  "+builder);
      return builder.toString();
    }
}
