The Art of Unit Testing, 2nd Edition

Manual testing sucks: repetitive, time consuming, error prone.

This idea of a unit of work means, to me, that a unit can span as little as a single method and up to multiple classes and functions to achieve its purpose.

You might feel that you’d like to minimize the size of a unit of work being tested. I used to feel that way. But I don’t anymore. I believe if you can create a unit of work that’s larger, and where its end result is more noticeable to an end user of the API, you’re creating tests that are more maintainable. If you try to minimize the size of a unit of work, you end up faking things down the line that aren’t really end results to the user of a public API but instead are just train stops on the way to the main station

A unit test should have the following properties:

* It should be automated and repeatable.
* It should be easy to implement.
* It should be relevant tomorrow.
* Anyone should be able to run it at the push of a button.
* It should run quickly.
* It should be consistent in its results (it always returns the same result if you don’t change anything between runs).
* It should have full control of the unit under test.
* It should be fully isolated (runs independently of other tests).
* When it fails, it should be easy to detect what was expected and determine how to pinpoint the problem.

It’s important to realize that TDD doesn’t ensure project success or tests that are robust or maintainable. It’s quite easy to get caught up in the technique of TDD and not pay attention to the way unit tests are written: their naming, how maintainable or readable they are, and whether they test the right things or might have bugs. That’s why I’m writing this book.
The technique of TDD is quite simple:

1. Write a failing test to prove code or functionality is missing from the end product. The test is written as if the production code were already working, so the test failing means there’s a bug in the production code. If I wanted to add a new feature to a calculator class that remembers the LastSum value, I’d write a test that verifies that LastSum is indeed the correct value. The test will fail to compile, and after adding only the needed code to make it compile (without the real functionality to remember the number), the test will now run, and fail, because I haven’t implemented that functionality yet.
1. Make the test pass by writing production code that meets the expectations of your test. The production code should be kept as simple as possible.
1. Refactor your code. When the test passes, you’re free to move on to the next unit test or to refactor your code to make it more readable, to remove code duplica- tion, and so on.

DEFINITION A unit test is an automated piece of code that invokes the unit of work being tested, and then checks some assumptions about a single end result of that unit. A unit test is almost always written using a unit testing framework. It can be written easily and runs quickly. It’s trustworthy, readable, and maintainable. It’s consistent in its results as long as production code hasn’t changed.

DEFINITION Integration testing is testing a unit of work without having full control over all of it and using one or more of its real dependencies, such as time, network, database, threads, random number generators, and so on.

DEFINITION Refactoring means changing a piece of code without changing its functionality. If you’ve ever renamed a method, you’ve done refactoring. If you’ve ever split a large method into multiple smaller method calls, you’ve refactored your code. The code still does the same thing, but it becomes easier to maintain, read, debug, and change.

In the real world, you’ll want to test any method that contains logic, even if it seems simple. Logic can fail, and you want to know when it does.

## Scenario

LogAn

[SCENARIO]
Here’s the scenario. Your company has many internal products it uses to monitor its applications at customer sites. All these products write log files and place them in a special directory. The log files are written in a proprietary format that your company has come up with that can’t be parsed by any existing third-party tools. You’re tasked with building a product, LogAn, that can analyze these log files and find special cases and events in them. When it finds these cases and events, it should alert the appropri- ate parties. 


### Unit of work (Sytem Under Test) return value

Check correct extension

```
public class LogAnalyzer
{
    public bool IsValidLogFileName(string fileName)
    {
        if(!fileName.EndsWith(".SLF"))
        {
            return false;
        }
        return true;
    }
}
```

```
[Test]
public void IsValidFileName_BadExtension_ReturnsFalse()
{
    LogAnalyzer analyzer = new LogAnalyzer();
    bool result = analyzer.IsValidLogFileName("filewithbadextension.foo");
    Assert.False(result);
}

[Test] 
public void IsValidLogFileName_GoodExtensionLowercase_ReturnsTrue()
{
    LogAnalyzer analyzer = new LogAnalyzer();
    bool result = analyzer.IsValidLogFileName("filewithgoodextension.slf");
    Assert.True(result);
}

[Test]
public void IsValidLogFileName_GoodExtensionUppercase_ReturnsTrue()
{
    LogAnalyzer analyzer = new LogAnalyzer();
    bool result = analyzer.IsValidLogFileName("filewithgoodextension.SLF");
    Assert.True(result);
}
```

Updated class to handle all possible cases

```
public class LogAnalyzer
{
    public bool IsValidLogFileName(string fileName)
    {
        if (!fileName.EndsWith(".SLF", StringComparison.CurrentCultureIgnoreCase))
        {
            return false;
        }
        return true;
    }
}
```

Note use Factory function
Note on why factory: http://stackoverflow.com/questions/8698726/constructor-function-vs-factory-functions

```
[Test]
public void IsValidFileName_BadExtension_ReturnsFalse()
{
    LogAnalyzer analyzer = MakeAnalyzer();
    bool result = analyzer.IsValidLogFileName("filewithbadextension.foo");
    Assert.False(result);
}

[Test] 
public void IsValidLogFileName_GoodExtensionLowercase_ReturnsTrue()
{
    LogAnalyzer analyzer = MakeAnalyzer();
    bool result = analyzer.IsValidLogFileName("filewithgoodextension.slf");
    Assert.True(result);
}

[Test]
public void IsValidLogFileName_GoodExtensionUppercase_ReturnsTrue()
{
    LogAnalyzer analyzer = MakeAnalyzer();
    bool result = analyzer.IsValidLogFileName("filewithgoodextension.SLF");
    Assert.True(result);
}

private LogAnalyzer MakeAnalyzer()
{
    return new LogAnalyzer();
}
```

### SUT state changed

DEFINITION State-based testing (also called state verification) determines whether the exercised method worked correctly by examining the changed behavior of the system under test and its collaborators (dependencies) after the method is exercised.

Tests could become better by TDD, but that’s a step you take when you know how to write tests after the code.

```
public class LogAnalyzer
{
    public bool WasLastFileNameValid { get; set; }
    public bool IsValidLogFileName(string fileName)
    {
        WasLastFileNameValid = false;
        if (string.IsNullOrEmpty(fileName))
        {
￼￼￼         throw new ArgumentException("filename has to be provided");
        }

        if (!fileName.EndsWith(".SLF",StringComparison.CurrentCultureIgnoreCase))
        {
            return false;
        }

        WasLastFileNameValid = true;
        return true;
    }
}
```

```
[Test]
public void IsValidFileName_WhenCalled_ChangesWasLastFileNameValid()
{
    LogAnalyzer la = MakeAnalyzer();
    la.IsValidLogFileName("badname.foo");
    Assert.False(la.WasLastFileNameValid);
}
```

### Stubs

DEFINITION An external dependency is an object in your system that your code under test interacts with and over which you have no control. (Common examples are filesystems, threads, memory, time, and so on.)

DEFINITION A stub is a controllable replacement for an existing dependency (or collaborator) in the system. By using a stub, you can test your code without dealing with the dependency directly.

[SCENARIO]
The LogAnalyzer class application can be configured to handle multiple log filename extensions using a special adapter for each file. Let’s assume that the allowed filenames are stored somewhere on disk as a configuration setting for the application, and that the IsValidLogFileName method looks like this:

```
public bool IsValidFileName(string fileName)
{
    //read through the configuration file
    //return true if configuration says extension is supported.
}
```

How to test it? Once this test depends on the filesystem, you’re performing an integration test, and you have all the associated problems: integration tests are slower to run, they need configuration, they test multiple things, and so on.

DEFINITION Refactoring is the act of changing code without changing the code’s functionality. That is, it does exactly the same job as it did before. No more and no less. It just looks different. A refactoring example might be renaming a method and breaking a long method into several smaller methods.

DEFINITION Seams are places in your code where you can plug in different functionality, such as stub classes, adding a constructor parameter, adding a public settable property, making a method virtual so it can be overridden, or externalizing a delegate as a parameter or property so that it can be set from outside a class. Seams are what you get by implementing the Open-Closed Principle, where a class’s functionality is open for extenuation, but its source code is closed for direct modification. 

Introducing a layer of indirection to avoid a direct dependency on the filesystem. The code that calls the filesystem is separated into a FileExtensionManager class, which will later be replaced with a stub in your test.

IsValidFileName -> Filesystem

IsValidFileName -> FileExtensionManager -> Filesystem

IsValidFileName -> StubFileExtensionManager -> Filesystem

IExtensionManager -> FileExtensionManager
                  -> StubFileExtensionManager  

There are two types of dependency-breaking refactorings, and one depends on the other. I call them Type A and Type B refactorings:

* Type A—Abstracting concrete objects into interfaces or delegates
* Type B—Refactoring to allow injection of fake implementations of those delegates or interfaces

In the following list, only the first item is a Type A refactoring. The rest are Type B refactorings:

* Type A—Extract an interface to allow replacing underlying implementation.
* Type B—Inject stub implementation into a class under test.
* Type B—Inject a fake at the constructor level.
* Type B—Inject a fake as a property get or set.
* Type B—Inject a fake just before a method call.

```
public bool IsValidLogFileName(string fileName)
{
    IExtensionManager mgr = new FileExtensionManager();
    return mgr.IsValid(fileName);
}

class FileExtensionManager : IExtensionManager
{
    public bool IsValid(string fileName)
    {
        //read some file here
    }
}

public interface IExtensionManager
{
    bool IsValid (string fileName);
}
```

### Dependency Injection

##### Inject a fake at the constructor level (constructor injection)

```
public class LogAnalyzer
{
￼￼￼￼private IExtensionManager manager;
    
    public LogAnalyzer(IExtensionManager mgr)
    {
        manager = mgr;
    }

    public bool IsValidLogFileName(string fileName)
    {
        return manager.IsValid(fileName);
    }
}

public interface IExtensionManager
{
    bool IsValid(string fileName);
}

[TestFixture]
public class LogAnalyzerTests
{
￼￼￼￼[Test]
    public void IsValidFileName_NameSupportedExtension_ReturnsTrue()
    {
        FakeExtensionManager myFakeManager = new FakeExtensionManager();
        myFakeManager.WillBeValid = true;
        LogAnalyzer log = new LogAnalyzer (myFakeManager);
        bool result = log.IsValidLogFileName("short.ext");
        Assert.True(result);
    }
}

internal class FakeExtensionManager : IExtensionManager
{
    public bool WillBeValid = false;
    public bool IsValid(string fileName)
    {
        return WillBeValid;
    } 
}
```

CAVEAT: If your code under test requires more than one stub to work correctly without dependencies, add- ing more and more constructors (or more and more constructor parameters) becomes a hassle, and it can even make the code less readable and less maintainable.

Solution is using inversion of control (IoC) containers

##### Injecting a fake as a property get or set

##### Injecting a fake just before a method call using Factory class

```
public class LogAnalyzer
{   
    private IExtensionManager manager;
    public LogAnalyzer ()
    {
        manager = ExtensionManagerFactory.Create();
    }
    public bool IsValidLogFileName(string fileName)
    {
        return manager.IsValid(fileName) && Path.GetFileNameWithoutExtension(fileName).Length>5;
    }
}

[Test]
public void IsValidFileName_SupportedExtension_ReturnsTrue()
{
    //set up the stub to use, make sure it returns true
    ...
    ExtensionManagerFactory.SetManager(myFakeManager);
    //create analyzer and inject stub
    LogAnalyzer log = new LogAnalyzer ();
    //Assert logic assuming extension is supported
    ...
}

class ExtensionManagerFactory
{
    private IExtensionManager customManager=null;
    public IExtensionManager Create()
    {
        If(customManager!=null)
          return customManager;
        Return new FileExtensionManager();
    }
    public void SetManager(IExtensionManager mgr)
    {
        customManager = mgr;
    }
}
```

##### Injecting a fake just before a method call using Factory method (extract and override)

### Mock

Testing: Value-based vs. state-based vs. interaction testing

DEFINITION Interaction testing is testing how an object sends messages (calls methods) to other objects. You use interaction testing when calling another object is the end result of a specific unit of work.

Always choose to use interaction testing only as the last option. This is very important. It’s preferable to see if you can use the first two types (value or state) of end result tests of units of work, because so many things become much more complicated by having interaction tests, as you’ll see in this chapter. But sometimes, as is the case of a third-party call to a logger, interactions between objects are the end result. That’s when you need to test the interaction itself.

DEFINITION A mock object is a fake object in the system that decides whether the unit test has passed or failed. It does so by verifying whether the object under test called the fake object as expected. There’s usually no more than one mock per test.

DEFINITION A fake is a generic term that can be used to describe either a stub or a mock object (handwritten or otherwise), because they both look like the real object. Whether a fake is a stub or a mock depends on how it’s used in the current test. If it’s used to check an interaction (asserted against), it’s a mock object. Otherwise, it’s a stub.

The basic difference is that stubs can’t fail tests. Mocks can.

When using a stub, the assert is performed on the class under test. The stub aids in making sure the test runs smoothly.

The class under test communicates with the mock object, and all communication is recorded in the mock. The test uses the mock object to verify that the test passes.

[SCENARIO]
Let’s add a new requirement to your LogAnalyzer class. This time, it will have to interact with an external web service that will receive an error message whenever the LogAnalyzer encounters a filename whose length is too short.
Unfortunately, the web service you’d like to test against is still not fully functional, and even if it were, it would take too long to use it as part of your tests. Because of that, you’ll refactor your design and create a new interface for which you can later create a mock object. The interface will have the methods you’ll need to call on your web service and nothing else.

```
public interface IWebService
{
    void LogError(string message);
}

public class FakeWebService:IWebService
{
    public string LastError;
    public void LogError(string message)
    {
        LastError = message;
    }
}

[Test]
public void Analyze_TooShortFileName_CallsWebService()
{
     FakeWebService mockService = new FakeWebService();
     LogAnalyzer log = new LogAnalyzer(mockService);
     string tooShortFileName="abc.ext";
     log.Analyze(tooShortFileName);
     StringAssert.Contains("Filename too short:abc.ext", mockService.LastError);
}

public class LogAnalyzer
{
    private IWebService service;

    public LogAnalyzer(IWebService service)
    {
        this.service = service;
    }

    public void Analyze(string fileName)
    {
        if(fileName.Length<8)
        {
            service.LogError("Filename too short:"+ fileName);
        }     
    }
}
```

It’s perfectly OK to have multiple stubs in a single test, but more than a single mock can mean trouble, because you’re testing more than one thing.

[SCENARIO] 
This time LogAnalyzer not only needs to talk to a web service, but if the web service throws an error, LogAnalyzer has to log the error to a different external dependency, sending it by email to the web service administrator

The web service will be stubbed out to simulate an exception; then the email sender will be mocked to see if it was called correctly. The whole test will be about how LogAnalyzer interacts with other objects.

In a test where you test only one thing, there should be no more than one mock object. All other fake objects will act as stubs. Having more than one mock per test usually means you’re testing more than one thing.

### Fake chains: stubs that produce mocks or other stubs

Another good way to avoid call chains is to create special wrapper classes around the API that simplify using and testing it.

## Isolation framework

DEFINITION An isolation framework is a set of programmable APIs that makes cre- ating fake objects much simpler, faster, and shorter than hand-coding them.

Isolation frameworks, when designed well, can save the developer from the need to write repetitive code to assert or simulate object interactions, and if they’re designed very well, they can make tests last many years without making the developer come back to fix them on every little production code change.

