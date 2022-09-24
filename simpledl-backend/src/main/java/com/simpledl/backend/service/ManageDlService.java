package com.simpledl.backend.service;

import org.springframework.stereotype.Service;
import java.io.*;

@Service
public class ManageDlService {

    public String activation(String name) throws IOException {

        Process process = Runtime.getRuntime().exec("pwd");
        printResults(process);

        System.out.println("****** importing ********");
        Process importProcess = Runtime.getRuntime().exec("perl simpleFiles/simpledl/bin/import.pl");
        printResults(importProcess);

        System.out.println("****** indexing ********");
        Process indexProcess = Runtime.getRuntime().exec("perl simpleFiles/simpledl/bin/index.pl");
        printResults(indexProcess);

        System.out.println("****** generating ********");
        Process generateProcess = Runtime.getRuntime().exec("perl simpleFiles/simpledl/bin/generate.pl --website --force");
        printResults(generateProcess);

        return "Simple DL activation process has been completed.";
    }

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

        return "Simple DL creating instance process has been completed.";
    }

    public String deleteInstance(String instanceName) throws IOException {

        Process process = Runtime.getRuntime().exec("pwd");
        printResults(process);
        //TODO: check if the instance exist
        System.out.println("****** delete instance ********");
        Process deleteProcess = Runtime.getRuntime().exec("rm -rf  "+instanceName);
        printResults(deleteProcess);

        return "Simple DL delete instance process has been completed.";
    }


    public static void printResults(Process process) throws IOException {
        StringBuilder builder = new StringBuilder();
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line = "";
        while ((line = reader.readLine()) != null) {
            builder.append(line);
            builder.append("\n");
            //  System.out.println(line);
        }
        System.out.println("Printing Results : "+builder.toString());
    }

    public String updateFile(String path)  {
        try {
            BufferedReader reader = new BufferedReader(new FileReader(path));
            BufferedWriter writer = new BufferedWriter(new FileWriter("simpleFiles/data/config/transform.xsl"));
            String line;
            while ((line=reader.readLine()) !=null) {
                writer.write("\n"+line);
            }
            writer.close();
            reader.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
        return "File has been Updated";
    }

}
