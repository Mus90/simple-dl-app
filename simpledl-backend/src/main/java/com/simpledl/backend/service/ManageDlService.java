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

    public static void printResults(Process process) throws IOException {
        StringBuilder builder = new StringBuilder();
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line = "";
        while ((line = reader.readLine()) != null) {
            builder.append(line);
            builder.append("\n");
            //  System.out.println(line);
        }
        System.out.println("xxxxxxxxxxxx"+builder.toString());

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
