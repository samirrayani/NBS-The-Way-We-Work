# Next Big Sound Java Code Convention

## What?

The Java code at Next Big Sound is written to conform with the [Google Style Guide](https://google.github.io/styleguide/javaguide.html).  This style was selected in a unanimous vote.

Truth be told, I think we most of us didn't care what the convention was as long as we had one.

The [Google Style Guide](https://google.github.io/styleguide/javaguide.html) seems sensible, and widely used.

## Why?

**Having a single code style reduces cognitive load incurred while reading code.**  When we have to switch between reading multiple code styles it causes our brains to take notice of code elements that we would otherwise be able to ignore.  

To avoid thinking any harder than we have to we _absolutely_ have to the NBS Data Engineering team decided to adopt a single Java code style.

Quoted from the [Introduction to the Oracle/Sun Java Style Guide](http://www.oracle.com/technetwork/java/javase/documentation/codeconventions-139411.html), which we chose not to use:

>1.1 Why Have Code Conventions
>Code conventions are important to programmers for a number of reasons:
>
> - 80% of the lifetime cost of a piece of software goes to maintenance.
> - Hardly any software is maintained for its whole life by the original author.
> - Code conventions improve the readability of the software, allowing engineers to understand new code more quickly and thoroughly.
> - If you ship your source code as a product, you need to make sure it is as well packaged and clean as any other product you create.


---

## IDE Setup

Instruction for configuring your IDE to make use of the Next Big Sound Java Code Convention.

### Eclipse (preferred)

#### Setup
* Download [eclipse-java-google-style.xml](https://raw.githubusercontent.com/nextbigsoundinc/The-Way-We-Work/master/Standards/Technologies/Java/Resources/eclipse-java-google-style.xml) 
* In Eclipse Preferences import `eclipse-java-google-style.xml` under `Java->Code Style->Formatter`.
* Install the Eclipse Checkstyle plugin (optional) to get improved style highlighting. Once the plugin is installed highlight 1 or more projects select `Checkstyle->Activate CheckStyle` to enable highlighting of style issues.

#### Usage
* To format a code file use the hotkey combo: `CMD + SHIFT + F`
* To format a code file on save: under `Java->Editor->Save Actions`:
   * check `Perform the selected actions on save`
   * check `Format source code`
   * select `Format all lines`
   * check `Organize imports`


### IntelliJ

#### Setup
* Install the [CheckStyle-IDEA](https://github.com/jshiell/checkstyle-idea) plugin.
* Go to `Preferences->Other Settings->Checkstyle` and click the `+` symbol to add a checkstyle configuration.  You can add [intellij-java-google-style.xml](https://raw.githubusercontent.com/nextbigsoundinc/The-Way-We-Work/master/Standards/Technologies/Java/Resources/intellij-java-google-style.xml) either by url, or by downloading the file and loading it from you computer.
* You will have a new tab for CheckStyle which you can use to check and format files.

---

## Maven/Jenkins Setup

Instructions for setting up [NBS-JVM-Libs](https://github.com/nextbigsoundinc/NBS-JVM-Libs), [NBS-JVM-Apps](https://github.com/nextbigsoundinc/NBS-JVM-Apps) and [hblocks](https://github.com/nextbigsoundinc/hblocks) to support style checking via Maven and Jenkins.

### Maven POM

pom.xml:
```xml
...
    <build>
        <pluginManagement>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-checkstyle-plugin</artifactId>
                    <version>2.17</version>
                    <dependencies>
                        <dependency>
                            <groupId>com.puppycrawl.tools</groupId>
                            <artifactId>checkstyle</artifactId>
                            <version>6.18</version>
                        </dependency>
                    </dependencies>
                    <configuration>
                        <configLocation>/google_checks.xml</configLocation>
                        <encoding>UTF-8</encoding>
                        <consoleOutput>true</consoleOutput>
                        <failsOnError>false</failsOnError>
                        <linkXRef>false</linkXRef>
                    </configuration>
                </plugin>
...

            </plugins>
        </pluginManagement>
    </build>
...
```

### Maven CLI

Run the checkstyle goal from the command line:

```bash
mvn checkstyle:check
```

### Jenkins 

In each [JVM](https://jenkins2.tnbsound.com:8080/view/JVM/) Jenkins job using Maven, click Configure.

Under the `Build->Goals and options` section of the configuration add the Maven goal `checkstyle:check`.  
