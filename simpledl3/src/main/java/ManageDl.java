import java.io.*;
import java.text.ParseException;

public class ManageDl
    {
        public static void main(String[] args) throws IOException {
            updateFile();
            Process process = Runtime.getRuntime().exec("pwd");
            printResults(process);

            System.out.println("****** importing ********");
            Process importProcess = Runtime.getRuntime().exec("perl src/main/java/simpledl/bin/import.pl");
            printResults(importProcess);

            System.out.println("****** indexing ********");
            Process indexProcess = Runtime.getRuntime().exec("perl src/main/java/simpledl/bin/index.pl");
            printResults(indexProcess);

            System.out.println("****** generating ********");
            Process generateProcess = Runtime.getRuntime().exec("perl src/main/java/simpledl/bin/generate.pl --website --force");
            printResults(generateProcess);
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

        public static void updateFile()  {
            try {
                BufferedReader reader = new BufferedReader(new FileReader("src/main/java/data/config/transform2.xsl"));
                BufferedWriter writer = new BufferedWriter(new FileWriter("src/main/java/data/config/transform.xsl"));
                String line;
                while ((line=reader.readLine()) !=null) {
                    writer.write("\n"+line);
                }
                writer.close();
                reader.close();

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
