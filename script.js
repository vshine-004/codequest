let timer;
let timeLeft = 15 * 60;
let currentLevel = "";
let correctCount = 0;
let totalQuestions = 20;
let topicPerformance = {};
let usedQuestions = new Set();
let currentQuestions = [];
let currentQuestionIndex = 0;
let answeredQuestions = 0;
let completedLevels = new Set();

const questions = {
  basic: {
      syntax: [
  { question: "What is the correct way to declare a variable in Java?", options: ["var x = 5;", "int x = 5;", "x = 5;", "variable x = 5;"], correct: 1, topic: "syntax" },
  { question: "Which statement is used to exit a loop in Java?", options: ["exit;", "break;", "stop;", "end;"], correct: 1, topic: "syntax" },
  { question: "What is the correct way to write a single-line comment in Java?", options: ["// Comment", "/* Comment */", "# Comment", "-- Comment"], correct: 0, topic: "syntax" },
  { question: "What is the correct way to declare a constant in Java?", options: ["const int NUM = 5;", "final int NUM = 5;", "static int NUM = 5;", "constant int NUM = 5;"], correct: 1, topic: "syntax" },
  { question: "Which is the correct way to declare a method in Java?", options: ["void myMethod[]", "void myMethod()", "void myMethod{}", "void myMethod;"], correct: 1, topic: "syntax" }
],
datatypes: [
  { question: "What is the default value of an int variable?", options: ["0", "null", "1", "undefined"], correct: 0, topic: "datatypes" },
  { question: "Which datatype is used to store decimal numbers in Java?", options: ["int", "decimal", "double", "float"], correct: 2, topic: "datatypes" },
  { question: "What is the size of boolean datatype in Java?", options: ["1 bit", "1 byte", "2 bytes", "4 bytes"], correct: 0, topic: "datatypes" },
  { question: "Which is the correct way to declare a String variable?", options: ["String str = 'Hello';", "String str = \"Hello\";", "string str = \"Hello\";", "Str str = \"Hello\";"], correct: 1, topic: "datatypes" },
  { question: "What is the range of byte data type in Java?", options: ["-128 to 127", "-256 to 255", "-32768 to 32767", "0 to 255"], correct: 0, topic: "datatypes" }
],
operators: [
  { question: "What is the result of 5 / 2 in Java?", options: ["2.5", "2", "2.0", "3"], correct: 1, topic: "operators" },
  { question: "Which operator is used for string concatenation?", options: ["+", "&", "||", ","], correct: 0, topic: "operators" },
  { question: "What does the === operator do in Java?", options: ["Compares values", "Compares references", "Not valid in Java", "Assigns values"], correct: 2, topic: "operators" },
  { question: "What is the result of 10 % 3?", options: ["3.33", "1", "0", "3"], correct: 1, topic: "operators" },
  { question: "Which operator is used to check if an object is an instance of a class?", options: ["instanceof", "typeof", "istype", "is"], correct: 0, topic: "operators" }
],
controlflow: [
  { question: "Which loop is guaranteed to execute at least once?", options: ["for loop", "while loop", "do-while loop", "foreach loop"], correct: 2, topic: "controlflow" },
  { question: "What is the correct syntax for an if statement?", options: ["if (condition) {}", "if condition {}", "if condition then {}", "if (condition:)"], correct: 0, topic: "controlflow" },
  { question: "Which statement is used to skip the current iteration of a loop?", options: ["skip;", "continue;", "break;", "pass;"], correct: 1, topic: "controlflow" },
  { question: "What is the correct syntax for a switch statement?", options: ["switch(expression) {}", "switch{expression}", "switch expression {}", "switch: expression"], correct: 0, topic: "controlflow" },
  { question: "Which loop is best for iterating over an array?", options: ["while loop", "do-while loop", "for loop", "if loop"], correct: 2, topic: "controlflow" }
],
arrays: [
  { question: "How do you declare an array in Java?", options: ["int[] arr;", "array int arr;", "int arr[];", "Both A and C"], correct: 3, topic: "arrays" },
  { question: "What is the index of the first element in an array?", options: ["1", "0", "-1", "None of these"], correct: 1, topic: "arrays" },
  { question: "How do you find the length of an array?", options: ["array.length()", "array.size()", "array.length", "array.size"], correct: 2, topic: "arrays" },
  { question: "Which statement correctly creates and initializes an array?", options: ["int[] arr = {1, 2, 3};", "int arr = new int[3]{1,2,3};", "int[] arr = new [3];", "int[] arr = new int[1,2,3];"], correct: 0, topic: "arrays" },
  { question: "What happens if you try to access an array index that is out of bounds?", options: ["Program crashes", "Returns null", "ArrayIndexOutOfBoundsException", "Returns -1"], correct: 2, topic: "arrays" }
],
basics: [
  { question: "What is the main method signature in Java?", options: ["public static void main()", "public void main(String[] args)", "public static void main(String[] args)", "void main(String[] args)"], correct: 2, topic: "basics" },
  { question: "What is JVM?", options: ["Java Virtual Machine", "Java Variable Method", "Java Virtual Method", "Java Variant Machine"], correct: 0, topic: "basics" },
  { question: "Which file extension is used for Java source files?", options: [".java", ".class", ".jar", ".jvm"], correct: 0, topic: "basics" },
  { question: "What is the default package in Java?", options: ["java.lang", "java.util", "java.io", "java.net"], correct: 0, topic: "basics" },
  { question: "Which statement is true about Java?", options: ["Platform dependent", "Platform independent", "OS dependent", "Hardware dependent"], correct: 1, topic: "basics" }
]              
},//end of basic Questions
intermediate: {
oop: [
  { question: "What is encapsulation in Java?", options: ["Bundling data and methods", "Inheritance", "Method overloading", "Data hiding"], correct: 0, topic: "oop" },
  { question: "What is the purpose of the 'this' keyword?", options: ["Reference current class methods", "Reference current class instance", "Reference parent class", "Reference static methods"], correct: 1, topic: "oop" },
  { question: "What is method overloading?", options: ["Same method name, different parameters", "Same method name, same parameters", "Different method names", "Extending methods"], correct: 0, topic: "oop" },
  { question: "What is the default access modifier in Java?", options: ["public", "private", "protected", "package-private"], correct: 3, topic: "oop" },
  { question: "Which keyword is used to inherit a class?", options: ["extends", "implements", "inherits", "using"], correct: 0, topic: "oop" }
],
exceptions: [
  { question: "What is the parent class of all exceptions?", options: ["Exception", "Error", "Throwable", "RuntimeException"], correct: 2, topic: "exceptions" },
  { question: "Which keyword is used to handle exceptions?", options: ["try", "catch", "throw", "All of these"], correct: 3, topic: "exceptions" },
  { question: "What is the purpose of the finally block?", options: ["Always executes", "Optional block", "Handles exceptions", "Throws exceptions"], correct: 0, topic: "exceptions" },
  { question: "Which exception is thrown when dividing by zero?", options: ["DivideByZeroException", "ArithmeticException", "MathException", "NumberFormatException"], correct: 1, topic: "exceptions" },
  { question: "What happens if an exception is not caught?", options: ["Program continues", "Program terminates", "Exception is ignored", "Runtime error"], correct: 1, topic: "exceptions" }
],
collections: [
  { question: "Which interface is the root of the collection hierarchy?", options: ["Collection", "List", "Set", "Map"], correct: 0, topic: "collections" },
  { question: "Which collection type allows duplicate elements?", options: ["Set", "List", "Map", "Queue"], correct: 1, topic: "collections" },
  { question: "What is the difference between ArrayList and LinkedList?", options: ["Implementation", "Functionality", "Size", "Elements allowed"], correct: 0, topic: "collections" },
  { question: "Which collection is thread-safe?", options: ["ArrayList", "HashMap", "Vector", "HashSet"], correct: 2, topic: "collections" },
  { question: "Which interface represents a collection that maps keys to values?", options: ["List", "Set", "Map", "Queue"], correct: 2, topic: "collections" }
],
inheritance: [
  { question: "Can a class inherit from multiple classes in Java?", options: ["Yes", "No", "Sometimes", "Depends on JVM"], correct: 1, topic: "inheritance" },
  { question: "What is the purpose of the 'super' keyword?", options: ["Call parent constructor", "Call current constructor", "Create object", "Access static members"], correct: 0, topic: "inheritance" },
  { question: "Can we override static methods?", options: ["Yes", "No", "Only in same package", "Only with inheritance"], correct: 1, topic: "inheritance" },
  { question: "What is method overriding?", options: ["Same method in child class", "Different method in child class", "Same method name different parameters", "Static method inheritance"], correct: 0, topic: "inheritance" },
  { question: "Which methods cannot be overridden?", options: ["public methods", "private methods", "final methods", "static methods"], correct: 2, topic: "inheritance" }
],
interfaces: [
  { question: "Can an interface contain concrete methods?", options: ["Yes, with default keyword", "No", "Yes, always", "Only static methods"], correct: 0, topic: "interfaces" },
  { question: "Can an interface extend multiple interfaces?", options: ["Yes", "No", "Only one", "Depends on implementation"], correct: 0, topic: "interfaces" },
  { question: "What is the purpose of interfaces?", options: ["Multiple inheritance", "Code reuse", "Data storage", "Exception handling"], correct: 0, topic: "interfaces" },
  { question: "Can interfaces have constructors?", options: ["Yes", "No", "Only default", "Only private"], correct: 1, topic: "interfaces" },
  { question: "What is the default method modifier in interfaces?", options: ["private", "public", "protected", "package-private"], correct: 1, topic: "interfaces" }
],
strings: [
  { question: "Is String immutable in Java?", options: ["Yes", "No", "Depends on JVM", "Depends on implementation"], correct: 0, topic: "strings" },
  { question: "Which class is mutable alternative to String?", options: ["StringBuffer", "StringBuilder", "Both A and B", "None"], correct: 2, topic: "strings" },
  { question: "What is String pooling?", options: ["Memory optimization", "String concatenation", "String comparison", "String creation"], correct: 0, topic: "strings" },
  { question: "Which method is used to compare strings?", options: ["equals()", "==", "compareTo()", "compare()"], correct: 0, topic: "strings" },
  { question: "What is the output of 'null' + 'hello'?", options: ["nullhello", "null", "Exception", "hello"], correct: 0, topic: "strings" }
]
},
  advanced: {
  concurrency: [
  { question: "What is the difference between volatile and synchronized?", options: ["volatile is for variables, synchronized for methods", "volatile is faster, synchronized is slower", "volatile is thread-safe, synchronized isn't", "They are identical"], correct: 0, topic: "concurrency" },
  { question: "What is a deadlock in Java?", options: ["When two threads wait for resources", "When a thread stops executing", "When program crashes", "When memory is full"], correct: 0, topic: "concurrency" },
  { question: "Which of these is a thread-safe implementation?", options: ["HashMap", "ConcurrentHashMap", "ArrayList", "LinkedList"], correct: 1, topic: "concurrency" },
  { question: "What is the purpose of the CompletableFuture class?", options: ["Asynchronous programming", "File handling", "Database connection", "Exception handling"], correct: 0, topic: "concurrency" },
  { question: "What is thread starvation?", options: ["Thread never gets CPU time", "Thread uses too much memory", "Thread crashes", "Thread deadlock"], correct: 0, topic: "concurrency" }
],
reflection: [
  { question: "What is the purpose of Java Reflection API?", options: ["Examine classes at runtime", "Compile-time checking", "Memory management", "Exception handling"], correct: 0, topic: "reflection" },
  { question: "Which class is the entry point for reflection?", options: ["Class", "Object", "Method", "Field"], correct: 0, topic: "reflection" },
  { question: "What is the performance impact of reflection?", options: ["Slower than direct access", "Faster than direct access", "No impact", "Depends on JVM"], correct: 0, topic: "reflection" },
  { question: "Can reflection access private members?", options: ["Yes, with setAccessible(true)", "No, never", "Only in same package", "Only with inheritance"], correct: 0, topic: "reflection" },
  { question: "What is the purpose of getClass() method?", options: ["Get runtime class information", "Get compile time class", "Get superclass", "Get interfaces"], correct: 0, topic: "reflection" }
],
generics: [
  { question: "What is type erasure in Java generics?", options: ["Removal of type information at runtime", "Compile error", "Runtime error", "Type checking"], correct: 0, topic: "generics" },
  { question: "What is a bounded type parameter?", options: ["Restricts generic type", "Removes type checking", "Allows all types", "Runtime binding"], correct: 0, topic: "generics" },
  { question: "Can we create an array of generic type?", options: ["No", "Yes", "Only with casting", "Depends on type"], correct: 0, topic: "generics" },
  { question: "What is the purpose of wildcard in generics?", options: ["Flexible type usage", "Performance improvement", "Memory management", "Exception handling"], correct: 0, topic: "generics" }
],
jvm: [
  { question: "What is JIT compiler?", options: ["Just-In-Time compiler", "Java Internal Tool", "Java Interface Type", "Java Implementation Tool"], correct: 0, topic: "jvm" },
  { question: "What is the purpose of PermGen space?", options: ["Store class metadata", "Heap memory", "Stack memory", "Thread storage"], correct: 0, topic: "jvm" },
  { question: "What is garbage collection mark-and-sweep?", options: ["Memory cleanup algorithm", "Thread management", "Exception handling", "File management"], correct: 0, topic: "jvm" },
  { question: "What is class loading in Java?", options: ["Dynamic loading of classes", "Memory allocation", "Thread creation", "Exception handling"], correct: 0, topic: "jvm" },
  { question: "What is the difference between Stack and Heap?", options: ["Memory type and usage", "Performance", "Size limitation", "Access speed"], correct: 0, topic: "jvm" }
],
nio: [
  { question: "What is the advantage of NIO over IO?", options: ["Non-blocking operations", "Simpler to use", "Better performance always", "Thread safety"], correct: 0, topic: "nio" },
  { question: "What is a Channel in NIO?", options: ["Bidirectional data transfer", "One-way communication", "Thread management", "Memory management"], correct: 0, topic: "nio" },
  { question: "What is the purpose of ByteBuffer?", options: ["Buffer management", "Thread management", "Exception handling", "File handling"], correct: 0, topic: "nio" },
  { question: "What is a Selector in NIO?", options: ["Multiplexer for channels", "Thread pool", "Memory manager", "File handler"], correct: 0, topic: "nio" },
  { question: "What is memory-mapped file in NIO?", options: ["File mapped to memory", "Regular file access", "Buffer management", "Channel type"], correct: 0, topic: "nio" }
],
security: [
  { question: "What is a SecurityManager in Java?", options: ["Access controller", "Memory manager", "Thread manager", "File manager"], correct: 0, topic: "security" },
  { question: "What is the purpose of doPrivileged?", options: ["Temporary privilege elevation", "Memory access", "Thread priority", "File access"], correct: 0, topic: "security" },
  { question: "What is SSL context in Java?", options: ["Secure connection factory", "Thread context", "Memory context", "File context"], correct: 0, topic: "security" },
  { question: "What is the purpose of KeyStore?", options: ["Store security credentials", "Store regular data", "Thread management", "Memory management"], correct: 0, topic: "security" },
  { question: "What is JAAS?", options: ["Java Authentication and Authorization", "Java Advanced Access", "Java Array Access", "Java Application Access"], correct: 0, topic: "security" }
]             
}
};
function startTest(level) {
    if (!["basic", "intermediate", "advanced"].includes(level)) {
      console.error("Invalid test level");
      alert("An error occurred. Please try again.");
      return;
    }
  
    currentLevel = level;
    correctCount = 0;
    usedQuestions.clear();
    timeLeft = 15 * 60; // Reset to 15 minutes
    currentQuestions = [];
    currentQuestionIndex = 0;
    answeredQuestions = 0;
  
    resetTopicPerformance();
  
    document.getElementById("testIntro").classList.add("hidden");
    document.getElementById("testSection").classList.remove("hidden");
    document.getElementById("scoreSection").classList.add("hidden");
  
    document.getElementById("testLevelTitle").innerText = `${capitalize(level)} Level Test`;
  
    try {
      loadAllQuestions();
    } catch (error) {
      console.error("Error loading questions:", error);
      alert("An error occurred while loading questions. Please try again.");
      return;
    }
  
    document.getElementById("timer").innerText = "Time Left: 15:00";
    startTimer();
  
    // Hide submit button initially
    // const submitButton = document.querySelector('button[onclick="submitTest()"]');
    // if (submitButton) {
    //   submitButton.style.display = "none";
    // }
  
    window.scrollTo(0, 0);
  
    console.log(`${capitalize(level)} level test started`);
  }
  
  function loadAllQuestions() {
    const firstSetContainer = document.getElementById("firstSet");
    const secondSetContainer = document.getElementById("secondSet");
    firstSetContainer.innerHTML = "";
    secondSetContainer.innerHTML = "";
  
    currentQuestions = selectAllQuestions();
  
    // Create HTML for first 10 questions
    for (let i = 0; i < 10; i++) {
      firstSetContainer.innerHTML += createQuestionHTML(currentQuestions[i], i);
    }
  
    // Create HTML for next 10 questions
    for (let i = 10; i < 20; i++) {
      secondSetContainer.innerHTML += createQuestionHTML(currentQuestions[i], i);
    }
  
    showQuestionSet('first');
  
    // Add event listener for radio button changes
    document.getElementById("questions").addEventListener("change", handleQuestionAnswer);
  }
  
  function resetTopicPerformance() {
    topicPerformance = {};
    Object.keys(questions[currentLevel]).forEach((topic) => {
      topicPerformance[topic] = {
        asked: 0,
        correct: 0,
      };
    });
  }
  
  function selectAllQuestions() {
    const allQuestions = [];
    const topics = Object.keys(questions[currentLevel]);
  
    // Select 2 questions from each topic
    topics.forEach((topic) => {
      const topicQuestions = questions[currentLevel][topic];
      const selected = selectRandomQuestions(topicQuestions, 2);
      allQuestions.push(...selected);
    });
  
    // Randomly select remaining questions to reach 20
    const remainingCount = 20 - allQuestions.length;
    const remainingQuestions = selectRandomQuestions(
      topics.flatMap(topic => questions[currentLevel][topic])
        .filter((q) => !allQuestions.includes(q)),
      remainingCount
    );
    allQuestions.push(...remainingQuestions);
  
    // Shuffle the questions
    return shuffleArray(allQuestions);
  }
  
  function selectRandomQuestions(questionPool, count) {
    const selected = [];
    const unusedQuestions = questionPool.filter(
      (q) => !usedQuestions.has(q.question)
    );
  
    for (let i = 0; i < count && unusedQuestions.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
      const question = unusedQuestions[randomIndex];
      selected.push(question);
      usedQuestions.add(question.question);
      unusedQuestions.splice(randomIndex, 1);
    }
  
    return selected;
  }
  
  function showQuestionSet(setName) {
    const firstSet = document.getElementById("firstSet");
    const secondSet = document.getElementById("secondSet");
    const prevBtn = document.getElementById("prevSet");
    const nextBtn = document.getElementById("nextSet");
  
    if (setName === 'first') {
      firstSet.classList.add("active");
      secondSet.classList.remove("active");
      prevBtn.style.display = "none";  // Hide the previous button
      nextBtn.style.display = "none"; //change 9:25
      nextBtn.disabled = false;
    } else {
      firstSet.classList.remove("active");
      secondSet.classList.add("active");
      prevBtn.style.display = "inline-block";  // Show the previous button
      prevBtn.disabled = false;
      nextBtn.style.display = "none";  // Hide the next button
    }
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function createQuestionHTML(q, index) {
    return `
        <div class="question mb-8 p-6 bg-gray-50 rounded-lg shadow-sm" id="question${index}">
            <div class="flex justify-between items-center mb-4">
                <p class="font-semibold text-gray-800 text-lg">${index + 1}. ${q.question}</p>
                <span class="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                    ${capitalize(q.topic)}
                </span>
            </div>
            ${q.options
                .map(
                    (opt, i) => `
                    <div class="ml-4 mb-3 flex items-center">
                        <input type="radio" 
                            id="q${index}opt${i}" 
                            name="question${index}" 
                            value="${i}" 
                            data-topic="${q.topic}"
                            class="w-5 h-5 text-blue-600 mr-3" />
                        <label for="q${index}opt${i}" class="text-gray-700 cursor-pointer">${opt}</label>
                    </div>
                `
                )
                .join("")}
        </div>
    `;
}
  function initializeLevelProgression() {
    const savedProgress = localStorage.getItem('levelProgress');
    if (savedProgress) {
      completedLevels = new Set(JSON.parse(savedProgress));
    } else {
      completedLevels = new Set();
    }
    updateLevelButtonStates();
  }
  
  // Update level button states based on progression
  function updateLevelButtonStates() {
    const basicBtn = document.getElementById("basicBtn");
    const intermediateBtn = document.getElementById("intermediateBtn");
    const advancedBtn = document.getElementById("advancedBtn");
  
    // Basic is always accessible
    basicBtn.disabled = false;
    basicBtn.className = "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded";
  
    // Intermediate requires basic completion
    if (!completedLevels.has('basic')) {
      intermediateBtn.disabled = true;
      intermediateBtn.className = "bg-gray-400 text-white font-bold py-2 px-4 rounded cursor-not-allowed";
    } else {
      intermediateBtn.disabled = false;
      intermediateBtn.className = "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded";
    }
  
    // Advanced requires intermediate completion
    if (!completedLevels.has('intermediate')) {
      advancedBtn.disabled = true;
      advancedBtn.className = "bg-gray-400 text-white font-bold py-2 px-4 rounded cursor-not-allowed";
    } else {
      advancedBtn.disabled = false;
      advancedBtn.className = "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded";
    }
  }
  function handleQuestionAnswer(event) {
    if (event.target.type === "radio") {
        answeredQuestions++;
        updateProgressBar();

        // If exactly 10 questions are answered, load the next set
        if (answeredQuestions === 10) {
            loadNextQuestionsBelow();
        }

       
          
          
      
        
    }
}
  
function loadNextQuestionsBelow() {
  const questionsContainer = document.getElementById("questions");
  const secondSetHTML = currentQuestions.slice(10).map((q, i) => 
      createQuestionHTML(q, i + 10)
  ).join("");
  
  // Create and append the second set container
  const secondSetContainer = document.createElement('div');
  secondSetContainer.id = "secondSet";
  secondSetContainer.innerHTML = secondSetHTML;
  questionsContainer.appendChild(secondSetContainer);
  
  // Remove navigation buttons as they're no longer needed
  const navButtons = document.getElementById("questionSetNav");
  if (navButtons) {
      navButtons.remove();
  }
 
}

  
  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      document.getElementById(
        "timer"
      ).innerText = `Time Left: ${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        submitTest();
      }
    }, 1000);
  }
  
  function submitTest() {
    clearInterval(timer);
    const score = evaluateAnswers();
    displayResults(score);
  }
  
  function evaluateAnswers() {
    let score = 0;
  
    currentQuestions.forEach((question, index) => {
      const selected = document.querySelector(
        `input[name="question${index}"]:checked`
      );
      if (selected) {
        const topic = question.topic;
        const isCorrect = parseInt(selected.value) === question.correct;
  
        topicPerformance[topic].asked++;
        if (isCorrect) {
          topicPerformance[topic].correct++;
          score++;
        }
      }
    });
  
    return score;
  }
  function displayResults(score) {
    const incorrectCount = totalQuestions - score;
    const percentageScore = (score / totalQuestions) * 100;
  
    document.getElementById("testSection").classList.add("hidden");
    document.getElementById("scoreSection").classList.remove("hidden");
  
    // Update score text
    const scoreText = document.getElementById("scoreText");
    if (scoreText) {
      scoreText.textContent = `Your score: ${score}/${totalQuestions} (${percentageScore.toFixed(2)}%)`;
    }
  
    // Create charts
    createPerformanceChart(score, incorrectCount);
    createTopicPerformanceChart();
  
    // Update level progression
    if (percentageScore >= 90) {
      completedLevels.add(currentLevel);
      localStorage.setItem('levelProgress', JSON.stringify([...completedLevels]));
      
      // Show next level button if there's a next level available
      const levels = ["basic", "intermediate", "advanced"];
      const currentIndex = levels.indexOf(currentLevel);
      const nextLevelBtn = document.getElementById("nextLevelBtn");
      if (nextLevelBtn) {
        if (currentIndex < levels.length - 1) {
          nextLevelBtn.classList.remove("hidden");
        } else {
          nextLevelBtn.classList.add("hidden");
        }
      }
    } else {
      const nextLevelBtn = document.getElementById("nextLevelBtn");
      if (nextLevelBtn) {
        nextLevelBtn.classList.add("hidden");
      }
    }
  
    // Display comprehensive results
    displayComprehensiveResults(score);
  
    // Update button visibility
    const retryBtn = document.getElementById("retryBtn");
    const backToIntroBtn = document.getElementById("backToIntroBtn");
    if (retryBtn) retryBtn.classList.remove("hidden");
    if (backToIntroBtn) backToIntroBtn.classList.remove("hidden");
  
    // Scroll to top of results
    window.scrollTo(0, 0);
  }
  function createTopicPerformanceChart() {
    const ctx = document.getElementById("topicChart").getContext("2d");
    const topics = Object.keys(topicPerformance);
    const correctData = topics.map(topic => topicPerformance[topic].correct);
    const incorrectData = topics.map(topic => topicPerformance[topic].asked - topicPerformance[topic].correct);
  
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: topics.map(capitalize),
        datasets: [
          {
            label: "Correct",
            data: correctData,
            backgroundColor: "#4CAF50",
          },
          {
            label: "Incorrect",
            data: incorrectData,
            backgroundColor: "#F44336",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Performance by Topic",
          },
        },
      },
    });
  }
  
  function createPerformanceChart(score, incorrectCount) {
    const ctx = document.getElementById("scoreChart").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Correct", "Incorrect"],
        datasets: [
          {
            data: [score, incorrectCount],
            backgroundColor: ["#4CAF50", "#F44336"],
            borderColor: ["#43A047", "#E53935"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Test Performance",
          },
        },
      },
    });
  }
  function displayComprehensiveResults(score) {
    const resultsContainer = document.getElementById("comprehensiveResults");
    resultsContainer.innerHTML = "";
  
    const topicAnalysis = analyzeTopicPerformance();
    const overallAssessment = createOverallAssessment(score, totalQuestions);
    const weakestTopic = findWeakestTopic();
    const strongestTopic = findStrongestTopic();
  
    resultsContainer.innerHTML += `
      <div class="mb-4">
        <h3 class="text-xl font-semibold text-gray-800">Overall Assessment</h3>
        <p class="text-gray-700">${overallAssessment}</p>
      </div>
      <div class="mb-4">
        <h3 class="text-xl font-semibold text-gray-800">Strongest Topic</h3>
        <p class="text-gray-700">${capitalize(strongestTopic)}: ${topicAnalysis[strongestTopic]}</p>
      </div>
      <div class="mb-4">
        <h3 class="text-xl font-semibold text-gray-800">Area for Improvement</h3>
        <p class="text-gray-700">${capitalize(weakestTopic)}: ${topicAnalysis[weakestTopic]}</p>
      </div>
      <div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Topic Breakdown</h3>
        ${Object.entries(topicAnalysis)
          .map(
            ([topic, analysis]) => `
            <div class="mb-2">
              <h4 class="font-semibold text-gray-700">${capitalize(topic)}</h4>
              <p class="text-gray-600">${analysis}</p>
            </div>
          `
          )
          .join("")}
      </div>
    `;
  }
  
  function findWeakestTopic() {
    return Object.entries(topicPerformance).reduce((weakest, [topic, performance]) => {
      const percentage = (performance.correct / performance.asked) * 100;
      if (!weakest || percentage < weakest.percentage) {
        return { topic, percentage };
      }
      return weakest;
    }, null).topic;
  }
  
  function findStrongestTopic() {
    return Object.entries(topicPerformance).reduce((strongest, [topic, performance]) => {
      const percentage = (performance.correct / performance.asked) * 100;
      if (!strongest || percentage > strongest.percentage) {
        return { topic, percentage };
      }
      return strongest;
    }, null).topic;
  }
  
  function analyzeTopicPerformance() {
    const analysis = {};
  
    Object.entries(topicPerformance).forEach(([topic, performance]) => {
      const percentage = (performance.correct / performance.asked) * 100;
      let assessment;
  
      if (percentage >= 80) {
        assessment = "Excellent understanding";
      } else if (percentage >= 60) {
        assessment = "Good understanding, but room for improvement";
      } else if (percentage >= 40) {
        assessment = "Fair understanding, needs more practice";
      } else {
        assessment = "Needs significant improvement";
      }
  
      analysis[
        topic
      ] = `${assessment}. Scored ${performance.correct}/${performance.asked}.`;
    });
  
    return analysis;
  }
  
  function createOverallAssessment(score, totalQuestions) {
    const percentage = (score / totalQuestions) * 100;
  
    if (percentage >= 80) {
      return "Excellent performance! You have a strong grasp of Java concepts at this level.";
    } else if (percentage >= 60) {
      return "Good job! You have a solid understanding, but there's room for improvement in some areas.";
    } else if (percentage >= 40) {
      return "Fair attempt. You've shown some understanding, but more practice is needed to improve your Java skills.";
    } else {
      return "You're just getting started. Don't worry! With more study and practice, you'll see improvement in your Java knowledge.";
    }
  }
  
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  function retryTest() {
    if (confirm("Are you sure you want to retry? All progress will be reset.")) {
        // Reset all variables
        correctCount = 0;
        usedQuestions.clear();
        timeLeft = 15 * 60;
        currentQuestions = [];
        answeredQuestions = 0;
        
        // Clear results
        document.getElementById("comprehensiveResults").innerHTML = "";
        
        // Reset charts
        const scoreChart = document.getElementById("scoreChart");
        const topicChart = document.getElementById("topicChart");
        if (scoreChart) scoreChart.getContext('2d').clearRect(0, 0, scoreChart.width, scoreChart.height);
        if (topicChart) topicChart.getContext('2d').clearRect(0, 0, topicChart.width, topicChart.height);
        
        // Show test section and hide results
        document.getElementById("scoreSection").classList.add("hidden");
        document.getElementById("testSection").classList.remove("hidden");
        
        // Start fresh test
        startTest(currentLevel);
    }
}
  
  function goToNextLevel() {
    const levels = ["basic", "intermediate", "advanced"];
    const currentIndex = levels.indexOf(currentLevel);
    if (currentIndex < levels.length - 1) {
      startTest(levels[currentIndex + 1]);
    } else {
      alert("Congratulations! You've completed all levels.");
    }
  }
  
  function showNextQuestionSet() {
    // Transition from first 10 to last 10 questions
    showQuestions(10, 20);
  }
  function showQuestions(start, end) {
    const questions = document.querySelectorAll('.question');
    questions.forEach((q, index) => {
      if (index >= start && index < end) {
        q.classList.remove('hidden');
      } else {
        q.classList.add('hidden');
      }
    });
  }
  
  function showPreviousQuestionSet() {
    // Transition from last 10 to first 10 questions
    showQuestions(0, 10);
  }
  
  function goToTestIntro() {
    document.getElementById("scoreSection").classList.add("hidden");
    document.getElementById("testIntro").classList.remove("hidden");
    resetQuiz();
    updateLevelButtonStates();
  }
  
  function resetQuiz() {
    // Reset all quiz-related variables and UI elements
    currentLevel = "";
    correctCount = 0;
    usedQuestions.clear();
    timeLeft = 15 * 60;
    currentQuestions = [];
    currentQuestionIndex = 0;
    answeredQuestions = 0;
    resetTopicPerformance();
  
    // Clear question containers
    document.getElementById("firstSet").innerHTML = "";
    document.getElementById("secondSet").innerHTML = "";
  
    // Reset timer display
    document.getElementById("timer").innerText = "Time Left: 15:00";
  
    // Clear results
    document.getElementById("comprehensiveResults").innerHTML = "";
    const chartCanvas = document.getElementById("scoreChart");
    if (chartCanvas) {
      chartCanvas.getContext('2d').clearRect(0, 0, chartCanvas.width, chartCanvas.height);
    }
    const topicChartCanvas = document.getElementById("topicChart");
    if (topicChartCanvas) {
      topicChartCanvas.getContext('2d').clearRect(0, 0, topicChartCanvas.width, topicChartCanvas.height);
    }
  
    console.log("Quiz reset completed");
  }
  
  
  // Event Listeners
  document.addEventListener("DOMContentLoaded", () => {
    const testSection = document.getElementById("testSection");
    testSection.insertAdjacentHTML('afterbegin', timelineHTML);
    
    initializeLevelProgression();
    
    document.getElementById("retryBtn").addEventListener("click", retryTest);
    document.getElementById("nextLevelBtn").addEventListener("click", goToNextLevel);
    document.getElementById("backToIntroBtn").addEventListener("click", goToTestIntro);

    // Add event listeners for difficulty selection buttons
    document.getElementById("basicBtn").addEventListener("click", () => startTest("basic"));
    document.getElementById("intermediateBtn").addEventListener("click", () => startTest("intermediate"));
    document.getElementById("advancedBtn").addEventListener("click", () => startTest("advanced"));
  
    // Apply custom styles to radio buttons
    const style = document.createElement('style');
    style.textContent = `
      input[type="radio"] {
        transform: scale(1.5);
        cursor: pointer;
      }
      input[type="radio"]:checked {
        border-color: #2563eb;
      }
    `;
    document.head.appendChild(style);
  });
  const timelineHTML = `
    <div class="relative pt-1 mb-4">
        <div class="flex mb-2 items-center justify-between">
            <div class="text-xl font-semibold text-gray-700" id="timer"></div>
            <button onclick="leaveTest()" 
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                Leave Test
            </button>
        </div>
        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div id="timelineBar" 
                class="shadow-none flex flex-col text-center whitespace-nowrap 
                text-white justify-center bg-blue-500 transition-all duration-500">
            </div>
        </div>
    </div>
`;

  // Remove the question highlight feature
  function toggleQuestionHighlight(questionElement) {
    // Function intentionally left empty to remove highlighting functionality
  }
  
  // Helper function to format time
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  // Update timer display
  function updateTimerDisplay() {
    const timerElement = document.getElementById("timer");
    timerElement.innerText = `Time Left: ${formatTime(timeLeft)}`;
  }
  function updateTimelineBar() {
    const timelineBar = document.getElementById("timelineBar");
    const progressPercentage = ((15 * 60 - timeLeft) / (15 * 60)) * 100;
    timelineBar.style.width = `${progressPercentage}%`;
    
    // Change color based on time remaining
    if (timeLeft <= 300) { // Last 5 minutes
        timelineBar.classList.remove('bg-blue-500');
        timelineBar.classList.add('bg-red-500');
    }
}


  
  // Function to handle when time runs out
  function handleTimeUp() {
    clearInterval(timer);
    alert("Time's up! Submitting your test now.");
    submitTest();
  }
  
  // Enhanced startTimer function
  function startTimer() {
    clearInterval(timer);
    updateTimerDisplay();
    updateTimelineBar();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        updateTimelineBar();
        
        if (timeLeft <= 0) {
            handleTimeUp();
        }
    }, 1000);
}
  
 
  // Add event listener for question highlighting
  document.getElementById("questions").addEventListener("click", (event) => {
    if (event.target.classList.contains('question') || event.target.closest('.question')) {
      const questionElement = event.target.closest('.question');
      toggleQuestionHighlight(questionElement);
    }
  });
  
  // Function to save quiz state
  function saveQuizState() {
    const quizState = {
      currentLevel,
      timeLeft,
      currentQuestions,
      answeredQuestions,
      topicPerformance
    };
    localStorage.setItem('quizState', JSON.stringify(quizState));
  }
  
  // Function to load quiz state
  function loadQuizState() {
    const savedState = localStorage.getItem('quizState');
    if (savedState) {
      const quizState = JSON.parse(savedState);
      currentLevel = quizState.currentLevel;
      timeLeft = quizState.timeLeft;
      currentQuestions = quizState.currentQuestions;
      answeredQuestions = quizState.answeredQuestions;
      topicPerformance = quizState.topicPerformance;
      // Restore other necessary state
      return true;
    }
    return false;
  }
  
  // Function to clear saved quiz state
  function clearQuizState() {
    localStorage.removeItem('quizState');
  }
  
  // Add auto-save functionality
  setInterval(saveQuizState, 30000); // Save every 30 seconds
  
  // Modify startTest function to check for saved state
  function startTest(level) {
    if (!["basic", "intermediate", "advanced"].includes(level)) {
        console.error("Invalid test level");
        alert("An error occurred. Please try again.");
        return;
    }

    // Reset all variables
    currentLevel = level;
    correctCount = 0;
    usedQuestions.clear();
    timeLeft = 15 * 60;
    currentQuestions = [];
    answeredQuestions = 0;
    
    resetTopicPerformance();
    
    // Update UI
    document.getElementById("testIntro").classList.add("hidden");
    document.getElementById("testSection").classList.remove("hidden");
    document.getElementById("scoreSection").classList.add("hidden");
    document.getElementById("testLevelTitle").innerText = `${capitalize(level)} Level Test`;

    try {
        loadInitialQuestions();
    } catch (error) {
        console.error("Error loading questions:", error);
        alert("An error occurred while loading questions. Please try again.");
        return;
    }

    startTimer();
    
 
    
    window.scrollTo(0, 0);
}
function loadInitialQuestions() {
  const questionsContainer = document.getElementById("questions");
  questionsContainer.innerHTML = ""; // Clear existing questions
  
  currentQuestions = selectAllQuestions();
  
  // Create HTML for first 10 questions only
  const firstSetHTML = currentQuestions.slice(0, 10).map((q, i) => 
      createQuestionHTML(q, i)
  ).join("");
  
  questionsContainer.innerHTML = `
      <div id="firstSet">
          ${firstSetHTML}
      </div>
  `;
  
  // Add event listener for radio button changes
  document.getElementById("questions").addEventListener("change", handleQuestionAnswer);
}
function leaveTest() {
  if (confirm("Are you sure you want to leave the test? Your progress will be lost.")) {
      clearInterval(timer);
      goToTestIntro();
  }
}
  function startTest(level) {
    if (!["basic", "intermediate", "advanced"].includes(level)) {
      console.error("Invalid test level");
      alert("An error occurred. Please try again.");
      return;
    }
  
    // Check for saved state
    clearQuizState();
  
    // Start new quiz
    currentLevel = level;
    correctCount = 0;
    usedQuestions.clear();
    timeLeft = 15 * 60; // Reset to 15 minutes
    currentQuestions = [];
    currentQuestionIndex = 0;
    answeredQuestions = 0;
  
    resetTopicPerformance();
  
    document.getElementById("testIntro").classList.add("hidden");
    document.getElementById("testSection").classList.remove("hidden");
    document.getElementById("scoreSection").classList.add("hidden");
  
    document.getElementById("testLevelTitle").innerText = `${capitalize(level)} Level Test`;
  
    try {
      loadAllQuestions();
    } catch (error) {
      console.error("Error loading questions:", error);
      alert("An error occurred while loading questions. Please try again.");
      return;
    }
  
    updateTimerDisplay();
    startTimer();
  
    // Hide submit button initially
   
  
    // Show first set of questions
    showQuestionSet('first');
  
    window.scrollTo(0, 0);
  
    console.log(`${capitalize(level)} level test started`);
  
    // Start autosave
    startAutoSave();
  }
  
  function startAutoSave() {
    // Clear any existing autosave interval
    if (window.autoSaveInterval) {
      clearInterval(window.autoSaveInterval);
    }
    
    // Set new autosave interval
    window.autoSaveInterval = setInterval(saveQuizState, 30000); // Save every 30 seconds
  }
  
  function stopAutoSave() {
    if (window.autoSaveInterval) {
      clearInterval(window.autoSaveInterval);
    }
  }
  
  // Modify submitTest to stop autosave
  function submitTest() {
    clearInterval(timer);
    stopAutoSave();
    clearQuizState(); // Clear saved state as the test is complete
    const score = evaluateAnswers();
    displayResults(score);
  }


// ffffffffffff
