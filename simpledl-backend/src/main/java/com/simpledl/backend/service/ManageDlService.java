package com.simpledl.backend.service;

import org.springframework.stereotype.Service;
import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.io.IOException;
import java.nio.file.*;

@Service
public class ManageDlService {

    public String createNewInstance(String instanceName) throws IOException {

        Process process = Runtime.getRuntime().exec("pwd");
        printResults(process);

        System.out.println("****** creating instance ********");
        Process createProcess = Runtime.getRuntime().exec("mkdir "+instanceName);
        printResults(createProcess);

        System.out.println("****** copy instance template ********");
        Process copyTemplateProcess = Runtime.getRuntime().exec("cp simpleFiles/simpledl.tar.xz "+instanceName+"/simpledl.tar.xz ");

        Process copyTemplateProcess1 = Runtime.getRuntime().exec( "cp -R simpleFiles/db "+instanceName+"/db");
        printResults(copyTemplateProcess1);
        Process copyTemplateProcess2 = Runtime.getRuntime().exec("cp -R simpleFiles/data "+instanceName+"/data");
        printResults(copyTemplateProcess2);
        Process copyTemplateProcess3 = Runtime.getRuntime().exec("cp -R simpleFiles/public_html "+instanceName+"/public_html");
        printResults(copyTemplateProcess3);
        printResults(copyTemplateProcess);

        Process process2 = Runtime.getRuntime().exec("pwd");
        printResults(process2);

        System.out.println("****** extract instance template ********");
        String[] cmd = { "/bin/sh", "-c", "cd /var/www/html/simple-dl-app/simpledl-backend/"+instanceName+"/; tar -xf simpledl.tar.xz" };
        Process extractProcess = Runtime.getRuntime().exec(cmd);
        printResults(extractProcess);

        activateInstance(instanceName);
        return "Instance has been created successfully.";
    }

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
        Process generateProcess = Runtime.getRuntime().exec("perl "+instanceName+"/simpledl/bin/generate.pl --website --force");
        printResults(generateProcess);

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
