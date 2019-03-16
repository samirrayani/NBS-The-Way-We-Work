
# Logging in Java

## Overview
Our preferred standard is **SLF4J**. We may decide to rely on Mesos, which schedules and runs our apps in production, for log collection.
 
The SLF4J library is a façade that can make use of many different Java logging implementations.  This is a perfect solution for us because we can change the logging implementation at the maven dependency level without ever changing a line of code.  See http://www.slf4j.org/ to learn more about SLF4J

Our current logging implmentation is **log4j**. More info below.

If you have not seen it before, here’s an example of using slf4j for logging:

```
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class YourClass() {
  private static final Logger logger = LoggerFactory.getLogger(YourClass.class);

  public static void helloWorld() {
     logger.info(“Hello, world!”);
  }
}
```

Things you may notice:

1. Legacy com.nextbigsound.lib.log.LogFactory and com.nextbigsound.lib.log.Log are removed (11/17/2016)

2. com.nextbigsound.app.App no longer has any logging methods, with the exception of the logging that can occur on a call to App.exit().

## Log4j Implementation details

**log4j.properties configuration files** These files must be included in your app, to control logging. These files are included in your build by Maven. See more on this below.

**Output Configuration, a.k.a Appender** Our log4j configuration currently defines on 2 appenders for controlling where log output goes: `file` and `stdout`. (To be clear, both are arbitrary names we've chosen). You specify which one as jvm argument to your app.

**Our best practice for log capturing should be discussed.  One proposal is to write use the `stdout`
configuration and let the logs be capture by mesos, which is kind of nice, however seems to limit our log analysis from simple bash commands, which has been very practical so far, but also was limited**

**`file`** - writes to log. How to configure? More detail needed here

**`stdout`** - (DEFAULT). It causes your apps to log output to the console, which can then be caught

## Maven Dependencies

Since SLF4J is a façade it requires multiple Maven dependencies.

The first is slf4j-api, which provides the unified logging API.

Example Maven dependency:

```
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-api</artifactId>
  <version>__someversion__</version>
</dependency>
```

The other requirement is slf4j-api, which provides the unified logging API.  We use slf4j-log4j12, which implements slf4j over log4j 1.2.x.

Example Maven dependencies (log4j 1.2.x also required!):

```
<dependency>
  <groupId>log4j</groupId>
  <artifactId>log4j</artifactId>
  <version>1.2.x</version> <!-- specify actual version number rather than 'x' -->
</dependency>

<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-log4j12</artifactId> <!-- slf4j implementation for log4j 1.2.x -->
  <version>__someversion__</version>
</dependency>
```

## Known Problems and Fixes

1. Multiple SLF4J implementations in classpath.

If you import a large library that has many of it's own dependencies you may accidentally import another slf4j-\<implementation\>.  When this happens you will see a warning message saying that SLF4J found [multiple bindings](http://www.slf4j.org/codes.html#multiple_bindings) when your java application is launched.

Example:

```
SLF4J: Class path contains multiple SLF4J bindings.
SLF4J: Found binding in [jar:file:/Users/rhaase/.m2/repository/org/slf4j/slf4j-simple/1.7.5/slf4j-simple-1.7.5.jar!/org/slf4j/imp/StaticLoggerBinder.class]
SLF4J: Found binding in [jar:file:/Users/rhaase/.m2/repository/org/slf4j/slf4j-log4j12/1.7.19/slf4j-log4j12-1.7.19.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: Found binding in [jar:file:/Users/rhaase/.m2/repository/org/slf4j/slf4j-jdk14/1.5.6/slf4j-jdk14-1.5.6.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
SLF4J: Actual binding is of type [org.slf4j.impl.SimpleLoggerFactory.class]
```

In the example above, three SLF4J implementations are found.  The API guesses (mostly wrong) about which binding you actually want to use.  In this case, the Simple Logging binding is selected even though we have log4j12 included.

To fix this problem you will need to track down where the offending bindings are being imported, and then exclude those libraries from being imported with the rest of the package you are intentionally including.

To see a listing of your projects dependency tree run this maven command, or do fancy stuff from your IDE.

```
mvn dependency:tree 
```

When you find the package that is importing the extra binding you will need to add an `<exclude>` clause to the correct `<dependency>` clause in your projects POM file.

Example of excluding conflicting logging bindings from NBS-JVM-Libs:

```
<dependency>
  <groupId>com.twitter</groupId>
  <artifactId>finagle-serversets</artifactId>
  <version>6.3.0</version>
  <scope>compile</scope>
  <exclusions>
    <exclusion>
      <artifactId>slf4j-jdk14</artifactId>
      <groupId>org.slf4j</groupId>
    </exclusion>
  </exclusions>
</dependency>
```
