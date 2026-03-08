// ── Topic 1: Introduction to Mobile App Development ──────────────────────────
export const topic1 = {
  id: 1,
  title: "Intro to Mobile App Dev",
  emoji: "📱",
  color: "from-blue-600 to-cyan-500",
  accent: "#3b82f6",
  subtopics: [
    "Mobile Operating Systems",
    "Why Android?",
    "Android Architecture",
    "App Dev Process",
    "Deployment",
  ],

  concepts: [
    {
      title: "Mobile Operating Systems",
      body: "Major platforms include Android (Linux-based, Google), iOS (Apple), Windows Mobile, BlackBerry OS, Symbian (Nokia), BADA (Samsung), and Palm OS. Android dominates globally.",
      visual: "os-tree",
    },
    {
      title: "Why Android?",
      body: "Wider customer pool · Greater innovative potential · Easier side-loading · Lower barrier to market entry · Strong device compatibility · Easier to learn · Lower OS development cost",
      visual: "why-android",
    },
    {
      title: "Android Architecture",
      body: "Android is built in layers: Linux Kernel → Hardware Abstraction Layer (HAL) → Android Runtime (ART) + Native C/C++ libraries → Java API Framework → System/User Apps",
      visual: "arch-stack",
    },
    {
      title: "App Development Process",
      body: "6 phases: Strategy → Analysis & Planning → UI/UX Design → Development → Testing → Deployment & Support",
      visual: "process-flow",
    },
  ],

  flashcards: [
    { q: "What is the Open Handset Alliance (OHA)?", a: "A consortium of 84 firms led by Google (2007) formed to develop open standards for mobile devices, resulting in Android." },
    { q: "Name 4 mobile operating systems", a: "Android, iOS, Windows Mobile, Symbian, BlackBerry OS, BADA, Palm OS" },
    { q: "What are the 6 phases of mobile app development?", a: "1. Strategy  2. Analysis & Planning  3. UI/UX Design  4. Development  5. Testing  6. Deployment & Support" },
    { q: "What metadata is needed for App Store deployment?", a: "Title, Description, Category, Keywords, Launch icon, Screenshots" },
    { q: "What does the Android Linux Kernel handle?", a: "Hardware drivers, memory management, process management, networking, and security" },
    { q: "What is Android Runtime (ART)?", a: "Replaced Dalvik VM; uses Ahead-of-Time (AOT) compilation for faster performance and better garbage collection" },
    { q: "What are CLO-1 and CLO-2 for this course?", a: "CLO-1: Understand architectures & frameworks (Knowledge)  CLO-2: Develop mobile apps using current tools (Apply)" },
    { q: "What is the Android Java API Framework layer?", a: "Provides building blocks like Content Providers, View System, Managers (Activity, Location, Notification), enabling app development" },
  ],

  quiz: [
    {
      q: "Which company leads the Open Handset Alliance?",
      options: ["Apple", "Microsoft", "Google", "Samsung"],
      answer: 2,
      explanation: "Google led the OHA formed in 2007 to develop open standards for mobile devices.",
    },
    {
      q: "What replaced the Dalvik Virtual Machine in Android?",
      options: ["JVM", "ART (Android Runtime)", "Node.js", "V8 Engine"],
      answer: 1,
      explanation: "Android Runtime (ART) replaced Dalvik, using Ahead-of-Time compilation for better performance.",
    },
    {
      q: "Which phase of app development includes Wireframes and Mockups?",
      options: ["Strategy", "Analysis & Planning", "UI/UX Design", "Testing"],
      answer: 2,
      explanation: "UI/UX Design phase covers Information Architecture, Workflows, Wireframes, Style Guide, Mockups, and Prototype.",
    },
    {
      q: "Android is based on which kernel?",
      options: ["Windows NT", "Darwin (XNU)", "Linux", "FreeBSD"],
      answer: 2,
      explanation: "Android is built on a modified Linux kernel that handles hardware drivers, memory, and process management.",
    },
    {
      q: "Which of these is NOT a reason to choose Android development?",
      options: ["Wider customer pool", "Closed source ecosystem", "Easier market entry", "Device compatibility"],
      answer: 1,
      explanation: "Android is open-source. 'Closed source ecosystem' is incorrect — that better describes iOS.",
    },
  ],
};

// ── Topic 2: Kotlin Programming Language ─────────────────────────────────────
export const topic2 = {
  id: 2,
  title: "Kotlin Language",
  emoji: "🎯",
  color: "from-purple-600 to-violet-500",
  accent: "#7c3aed",
  subtopics: [
    "Variables & Control Flow",
    "Strings & Templates",
    "Functions",
    "Classes & Objects",
    "Null Safety",
  ],

  concepts: [
    {
      title: "Variables & Loops",
      code: `val name = "Android"   // immutable
var count = 0          // mutable

for (i in 1..5) { }         // inclusive range
for (i in 1 until 5) { }    // 1–4
for (i in 10 downTo 1 step 2) { }  // 10,8,6...`,
    },
    {
      title: "String Templates",
      code: `val lang = "Kotlin"
val msg = "Hello, \$lang!"        // → Hello, Kotlin!
val expr = "2+2 = \${2 + 2}"      // → 2+2 = 4

val multiline = """
    Line 1
    Line 2
""".trimIndent()`,
    },
    {
      title: "Functions",
      code: `// Single-expression
fun square(x: Int) = x * x

// Default & named args
fun greet(name: String, greeting: String = "Hi") = "\$greeting, \$name"
greet(name = "Usama")

// Extension function
fun String.isPalindrome() = this == this.reversed()

// Lambda + higher-order
val nums = listOf(1,2,3,4,5)
val evens = nums.filter { it % 2 == 0 }
val doubled = nums.map { it * 2 }`,
    },
    {
      title: "Classes & Data Classes",
      code: `class Person(val name: String, var age: Int) {
    init { println("Created: \$name") }
    open fun greet() = "Hi, I'm \$name"
}

// data class auto-generates equals/hashCode/toString/copy
data class Point(val x: Int, val y: Int)
val p1 = Point(1, 2)
val p2 = p1.copy(y = 10)  // Point(1, 10)

// companion object = static factory
class MyClass {
    companion object {
        fun create() = MyClass()
    }
}`,
    },
    {
      title: "Null Safety",
      code: `var name: String? = null   // nullable

// Safe call — returns null instead of crashing
val len = name?.length

// Elvis operator — provide default
val len2 = name?.length ?: 0

// Smart cast
if (name != null) {
    println(name.length)  // auto-cast to non-null
}

// Safe cast
val num = value as? Int   // null if cast fails`,
    },
    {
      title: "Sealed & Object",
      code: `sealed class Result
data class Success(val data: String) : Result()
data class Error(val msg: String) : Result()

fun handle(r: Result) = when(r) {
    is Success -> "Got: \${r.data}"
    is Error   -> "Err: \${r.msg}"
}

// Singleton
object AppConfig {
    val version = "1.0"
}`,
    },
  ],

  flashcards: [
    { q: "What is the difference between `val` and `var`?", a: "`val` is immutable (read-only, like Java `final`). `var` is mutable (can be reassigned)." },
    { q: "What does the Elvis operator `?:` do?", a: "Returns the left-hand value if non-null, otherwise returns the right-hand default. E.g., `name?.length ?: 0`" },
    { q: "What does a `data class` auto-generate?", a: "`equals()`, `hashCode()`, `toString()`, `copy()`, and `componentN()` functions." },
    { q: "What is a `sealed class`?", a: "A restricted class hierarchy — all subclasses must be defined in the same file. Used with `when` for exhaustive checks." },
    { q: "What is an extension function?", a: "A function added to an existing class without modifying it. E.g., `fun String.shout() = this.uppercase()`" },
    { q: "What does `it` refer to in a lambda?", a: "The implicit single parameter of a lambda. E.g., `list.filter { it > 5 }` — `it` is each element." },
    { q: "What is a companion object?", a: "An object scoped to a class, providing static-like members. Accessed via the class name: `MyClass.create()`." },
    { q: "What is the safe call operator `?.`?", a: "Calls the method/property only if the receiver is non-null; returns null otherwise instead of throwing NullPointerException." },
    { q: "What is smart casting in Kotlin?", a: "After an `is` check, the compiler automatically casts the variable to that type within the `if` block." },
    { q: "Difference between `as` and `as?`?", a: "`as` throws ClassCastException on failure. `as?` returns null on failure (safe cast)." },
  ],

  quiz: [
    {
      q: "Which keyword declares an immutable variable in Kotlin?",
      options: ["var", "let", "val", "const"],
      answer: 2,
      explanation: "`val` declares a read-only variable (like Java's `final`). `var` is mutable.",
    },
    {
      q: "What does `name?.length ?: 0` return if name is null?",
      options: ["null", "NullPointerException", "0", "-1"],
      answer: 2,
      explanation: "The Elvis operator `?:` returns the right side (0) when the left side evaluates to null.",
    },
    {
      q: "Which of these is automatically generated by a `data class`?",
      options: ["clone()", "copy()", "serialize()", "toJson()"],
      answer: 1,
      explanation: "`data class` auto-generates `equals()`, `hashCode()`, `toString()`, `copy()`, and `componentN()` functions.",
    },
    {
      q: "What is the output of `listOf(1,2,3,4).filter { it % 2 == 0 }`?",
      options: ["[1, 3]", "[2, 4]", "[1, 2, 3, 4]", "[]"],
      answer: 1,
      explanation: "`filter` keeps elements where the predicate is true. Even numbers are 2 and 4.",
    },
    {
      q: "What does `by` keyword enable in Kotlin?",
      options: ["Lazy initialization", "Interface delegation", "Extension function", "Null safety"],
      answer: 1,
      explanation: "The `by` keyword enables interface delegation — one class delegates interface implementation to another object.",
    },
    {
      q: "What is `object` in Kotlin used for?",
      options: ["Creating arrays", "Declaring singletons", "Interface definition", "Null coalescing"],
      answer: 1,
      explanation: "`object` creates a singleton — a class with exactly one instance, created lazily.",
    },
  ],
};

// ── Topic 3: Android Studio & Build Systems ───────────────────────────────────
export const topic3 = {
  id: 3,
  title: "Android Studio & Build",
  emoji: "🏗️",
  color: "from-emerald-600 to-teal-500",
  accent: "#059669",
  subtopics: [
    "IDE Features",
    "Project Structure",
    "Gradle Build System",
    "ART vs Dalvik",
    "Debugging Tools",
  ],

  concepts: [
    {
      title: "Android Studio Features",
      body: "Built on IntelliJ IDEA · Flexible Gradle build system · Feature-rich emulator · Instant Run · Code templates & GitHub integration · C++/NDK support · Google Cloud Platform support · Lint static analysis",
    },
    {
      title: "Project Structure",
      body: `Key directories:
📁 manifests/  → AndroidManifest.xml (permissions, activities)
📁 java/       → Kotlin/Java source code
📁 res/        → Resources
   📁 drawable/  → Images & vector graphics
   📁 layout/    → XML UI layouts
   📁 mipmap/    → App launcher icons
   📁 values/    → strings.xml, colors.xml, themes.xml
📁 gen/        → Auto-generated R.java (resource IDs)
📁 test/       → Unit tests`,
    },
    {
      title: "Gradle Build Process",
      body: `Build pipeline:
1. Kotlin/Java sources → compiled to .class files
2. .class files → converted to DEX (Dalvik Executable) bytecode
3. DEX + Resources → packaged by AAPT (Asset Packaging Tool)
4. APK Packager signs with Debug or Release keystore
5. Output: Signed .apk file ready for deployment`,
    },
    {
      title: "build.gradle Structure",
      code: `// Module-level build.gradle
android {
    compileSdk 34
    defaultConfig {
        applicationId "com.example.myapp"
        minSdk 24
        targetSdk 34
        versionCode 1
    }
    buildTypes {
        release { minifyEnabled true }
    }
}
dependencies {
    implementation "androidx.compose.ui:ui:1.6.0"
}`,
    },
    {
      title: "ART vs Dalvik",
      body: `Dalvik VM (old):
• Just-in-Time (JIT) compilation — compiles at runtime
• Higher CPU usage, slower startup

ART (Android Runtime, current):
• Ahead-of-Time (AOT) compilation — compiles at install
• Faster app launch · Better garbage collection
• Improved debugging support · Lower runtime overhead`,
    },
    {
      title: "Debugging Tools",
      body: `• Inline debugging: See variable values inline while debugging
• Memory Profiler: Track heap usage, find memory leaks, capture HPROF heap dumps
• CPU Profiler: CPU usage, method tracing
• Lint: Static analysis for correctness, security, performance, usability, accessibility
• Logcat: Real-time device log output
• Live Templates: Code snippets for rapid development
• Code Completion: Basic, Smart, Statement completion modes`,
    },
  ],

  flashcards: [
    { q: "What is an APK?", a: "Android Package Kit — the file format used to distribute and install Android apps, containing DEX bytecode, resources, and manifest." },
    { q: "What does AAPT stand for?", a: "Android Asset Packaging Tool — packages resources and assets into the APK during the build process." },
    { q: "What is DEX bytecode?", a: "Dalvik Executable — the bytecode format for Android apps, optimized for mobile (multiple class files merged into one .dex file)." },
    { q: "What is R.java?", a: "Auto-generated file in the `gen/` folder that contains integer IDs for every resource, allowing code to reference resources like `R.layout.main`." },
    { q: "What is AndroidManifest.xml?", a: "The app's blueprint — declares app components (activities, services), permissions, hardware requirements, and intent filters." },
    { q: "What is ART's compilation approach?", a: "Ahead-of-Time (AOT) — compiles app bytecode to native machine code at install time, resulting in faster app launch." },
    { q: "What are build variants in Gradle?", a: "Different build configurations (e.g., debug/release) that can produce different APKs with different settings, resources, or code." },
    { q: "What does Lint check for?", a: "Correctness, security, performance, usability, and accessibility issues in code and resources without running the app." },
    { q: "What is an HPROF file?", a: "A binary heap dump file format used by Android Profiler to analyze memory usage and find leaks." },
    { q: "What does `minSdk` mean in build.gradle?", a: "The minimum Android API level the app supports. Devices below this version cannot install the app." },
  ],

  quiz: [
    {
      q: "What file format does Android use for packaged apps?",
      options: [".jar", ".exe", ".apk", ".ipa"],
      answer: 2,
      explanation: "APK (Android Package Kit) is the file format for Android app distribution and installation.",
    },
    {
      q: "What is the main advantage of ART over Dalvik?",
      options: [
        "Uses less storage",
        "Ahead-of-Time compilation for faster launch",
        "Better internet connectivity",
        "Smaller APK size",
      ],
      answer: 1,
      explanation: "ART uses AOT compilation at install time, resulting in faster app launches and lower runtime CPU usage.",
    },
    {
      q: "Which tool is used to check code for accessibility and security issues?",
      options: ["Profiler", "Gradle", "Lint", "AAPT"],
      answer: 2,
      explanation: "Lint is Android's static analysis tool that checks for correctness, security, performance, usability, and accessibility.",
    },
    {
      q: "Where are app launcher icons stored in an Android project?",
      options: ["res/drawable/", "res/mipmap/", "res/icons/", "assets/"],
      answer: 1,
      explanation: "Launcher icons are stored in `res/mipmap/` in multiple densities (mdpi, hdpi, xhdpi, etc.).",
    },
    {
      q: "What does the `gen/` directory contain?",
      options: [
        "Generated test reports",
        "Auto-generated R.java with resource IDs",
        "Gradle build cache",
        "Native C++ code",
      ],
      answer: 1,
      explanation: "The `gen/` folder contains auto-generated files like R.java that map resource names to integer IDs.",
    },
  ],
};

// ── Topic 4: Jetpack Compose UI ───────────────────────────────────────────────
export const topic4 = {
  id: 4,
  title: "Jetpack Compose UI",
  emoji: "🎨",
  color: "from-orange-600 to-amber-500",
  accent: "#ea580c",
  subtopics: [
    "Declarative UI Paradigm",
    "Three Phases of a Frame",
    "@Composable Functions",
    "Basic Components",
    "Layouts",
    "Material Components",
  ],

  concepts: [
    {
      title: "Declarative vs Imperative UI",
      body: `Imperative (old XML way):
• Manually inflate XML layouts
• Use findViewById() to get references
• Call setters: textView.setText("Hello")
• Manage view state yourself

Declarative (Compose way):
• Describe WHAT the UI looks like for a given state
• Framework handles HOW to update/recompose
• No getters/setters — just pure functions of state`,
    },
    {
      title: "Three Phases of a Frame",
      body: `Every frame rendered by Compose goes through 3 phases:

1. Composition
   • @Composable functions execute
   • Build/update the UI tree describing what to show

2. Layout
   • Measure each element
   • Place elements in 2D coordinate space

3. Drawing
   • Render elements to the Canvas (pixels)`,
    },
    {
      title: "@Composable & @Preview",
      code: `@Composable
fun Greeting(name: String) {
    Text(
        text = "Hello, \$name!",
        style = MaterialTheme.typography.headlineMedium,
        color = Color.White
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    Greeting("Android")
}`,
    },
    {
      title: "Modifiers",
      code: `// Modifiers are applied left-to-right — order matters!
Box(
    modifier = Modifier
        .size(100.dp)
        .padding(16.dp)
        .clip(CircleShape)
        .background(Color.Blue)
        .clickable { /* handle click */ }
)

// Semantic modifier for accessibility
Image(
    modifier = Modifier
        .semantics { contentDescription = "Profile photo" }
)`,
    },
    {
      title: "Layouts",
      code: `// Column — vertical stack
Column(
    verticalArrangement = Arrangement.SpaceEvenly,
    horizontalAlignment = Alignment.CenterHorizontally
) { /* content */ }

// Row — horizontal stack
Row(
    horizontalArrangement = Arrangement.SpaceBetween
) { /* content */ }

// Box — overlapping layers
Box(contentAlignment = Alignment.Center) {
    Image(...)
    Text("Overlay", modifier = Modifier.align(Alignment.BottomCenter))
}`,
    },
    {
      title: "Material Components",
      code: `// Scaffold — standard layout structure
Scaffold(
    topBar = { TopAppBar(title = { Text("My App") }) },
    floatingActionButton = {
        FloatingActionButton(onClick = {}) {
            Icon(Icons.Default.Add, "Add")
        }
    }
) { padding ->
    // content with padding
}

// Card
Card(elevation = CardDefaults.cardElevation(8.dp)) {
    Text("Card content", modifier = Modifier.padding(16.dp))
}

// AlertDialog
AlertDialog(
    onDismissRequest = { showDialog = false },
    title = { Text("Confirm") },
    confirmButton = { Button(onClick={}) { Text("OK") } }
)`,
    },
  ],

  flashcards: [
    { q: "What is recomposition in Jetpack Compose?", a: "When state changes, only the affected @Composable functions re-execute (re-compose) to update the UI. Unchanged composables are skipped." },
    { q: "What are the 3 phases of a Compose frame?", a: "1. Composition (build UI tree)  2. Layout (measure & place)  3. Drawing (render to canvas)" },
    { q: "What does @Preview annotation do?", a: "Shows a live preview of the composable in Android Studio's Design tab without running the app on a device." },
    { q: "What is a Modifier in Compose?", a: "A chain of transformations applied to a composable — controls size, padding, background, click behavior, semantics, etc. Order matters!" },
    { q: "Difference between Column, Row, and Box?", a: "Column: stacks children vertically. Row: stacks horizontally. Box: overlaps children (like FrameLayout)." },
    { q: "What is Scaffold?", a: "A Material Design layout structure providing slots for topBar, bottomBar, floatingActionButton, snackbarHost, and content." },
    { q: "What is ContentScale in Images?", a: "Controls how the image is scaled to fit its bounds. Options: Fit, Crop, FillBounds, FillWidth, FillHeight, Inside, None." },
    { q: "What is ConstraintLayout in Compose?", a: "A layout that positions elements relative to each other using constraints (createRefs, constrainAs, linkTo)." },
    { q: "What are the 4 types of Chips in Material 3?", a: "Assist Chip, Filter Chip, Input Chip, Suggestion Chip" },
    { q: "What are the 4 types of FAB?", a: "FloatingActionButton (ordinary), SmallFloatingActionButton, LargeFloatingActionButton, ExtendedFloatingActionButton" },
  ],

  quiz: [
    {
      q: "In what order do the three Compose phases execute?",
      options: [
        "Drawing → Layout → Composition",
        "Layout → Composition → Drawing",
        "Composition → Layout → Drawing",
        "Composition → Drawing → Layout",
      ],
      answer: 2,
      explanation: "Compose always executes: Composition (build tree) → Layout (measure/place) → Drawing (render).",
    },
    {
      q: "What does `Arrangement.SpaceEvenly` do in a Column?",
      options: [
        "Puts all space before the first item",
        "Distributes equal space between, before, and after items",
        "Puts all space after the last item",
        "No spacing",
      ],
      answer: 1,
      explanation: "SpaceEvenly distributes equal space before, between, and after all children.",
    },
    {
      q: "Which composable overlaps its children (like a Z-stack)?",
      options: ["Column", "Row", "Box", "LazyColumn"],
      answer: 2,
      explanation: "Box stacks children on top of each other. Later children are drawn on top of earlier ones.",
    },
    {
      q: "What is the correct way to make a composable clickable?",
      options: [
        ".onClick { }",
        "Modifier.clickable { }",
        "onClick = { }",
        "setOnClickListener { }",
      ],
      answer: 1,
      explanation: "Use `Modifier.clickable { }` to add click handling to any composable.",
    },
    {
      q: "What does @Composable annotation do?",
      options: [
        "Marks a function as a background task",
        "Marks a function that can emit UI and participate in Compose's runtime",
        "Creates a new thread",
        "Enables null safety",
      ],
      answer: 1,
      explanation: "@Composable marks functions that can emit UI elements and be called within Compose's tree-building process.",
    },
  ],
};

// ── Topic 5: State Management ─────────────────────────────────────────────────
export const topic5 = {
  id: 5,
  title: "State Management",
  emoji: "⚡",
  color: "from-pink-600 to-rose-500",
  accent: "#e11d48",
  subtopics: [
    "State & Events",
    "remember & mutableStateOf",
    "Recomposition",
    "rememberSaveable",
    "State Hoisting",
    "ViewModel & LiveData",
  ],

  concepts: [
    {
      title: "State & Events",
      body: `State: Any value that changes over time and affects the UI.
Examples: text in a TextField, scroll position, loaded data, user preferences

Events: Inputs that trigger state changes.
• User events: button click, text input, swipe
• System events: network response, timer, sensor data

The pattern: Event → Update State → Recomposition → New UI`,
    },
    {
      title: "remember & mutableStateOf",
      code: `@Composable
fun Counter() {
    // remember: keeps value across recompositions
    // mutableStateOf: triggers recomposition when changed
    var count by remember { mutableStateOf(0) }

    Column {
        Text("Count: \$count")
        Button(onClick = { count++ }) {
            Text("Increment")
        }
    }
}

// Without remember — value resets every recomposition!
// Without mutableStateOf — UI won't update`,
    },
    {
      title: "Configuration Changes & rememberSaveable",
      body: `Problem: Device rotation/language change recreates the Activity.
→ 'remember' is lost on Activity recreation!

Solution: rememberSaveable
• Survives configuration changes (rotation, language)
• Stores value in a Bundle (like savedInstanceState)
• Works for primitives and Parcelable types automatically
• Custom types need a Saver`,
      code: `var text by rememberSaveable { mutableStateOf("") }
// Survives rotation — text is not lost!`,
    },
    {
      title: "State Hoisting",
      code: `// ❌ Stateful (harder to reuse/test)
@Composable
fun BadInput() {
    var text by remember { mutableStateOf("") }
    TextField(value = text, onValueChange = { text = it })
}

// ✅ State Hoisting — move state UP to parent
@Composable
fun GoodInput(value: String, onValueChange: (String) -> Unit) {
    TextField(value = value, onValueChange = onValueChange)
}

@Composable
fun Parent() {
    var text by remember { mutableStateOf("") }
    GoodInput(value = text, onValueChange = { text = it })
}`,
    },
    {
      title: "ViewModel Integration",
      code: `// ViewModel holds and survives configuration changes
class MyViewModel : ViewModel() {
    private val _count = MutableLiveData(0)
    val count: LiveData<Int> = _count

    fun increment() { _count.value = (_count.value ?: 0) + 1 }
}

@Composable
fun Screen(viewModel: MyViewModel = viewModel()) {
    val count by viewModel.count.observeAsState(0)

    Button(onClick = { viewModel.increment() }) {
        Text("Count: \$count")
    }
}`,
    },
  ],

  flashcards: [
    { q: "What is 'state' in Jetpack Compose?", a: "Any value that changes over time and triggers UI updates when it changes (e.g., text content, boolean flags, loaded data, scroll position)." },
    { q: "What does `remember` do?", a: "Stores a value in the Composition so it survives recompositions. Without it, the value resets every time the composable re-executes." },
    { q: "What does `mutableStateOf` do?", a: "Creates an observable state holder. When its value changes, Compose schedules recomposition of any composable reading that state." },
    { q: "When does `remember` fail? What's the fix?", a: "`remember` is lost on configuration changes (rotation). Fix: use `rememberSaveable` which persists through Activity recreation via Bundle." },
    { q: "What is State Hoisting?", a: "Moving state UP from a child composable to a parent, making the child stateless. The parent passes state down and receives events up." },
    { q: "What is the benefit of stateless composables?", a: "Easier to test, reuse, and preview. The same composable can display different states without internal mutation." },
    { q: "What does ViewModel provide?", a: "A lifecycle-aware holder for UI-related data that survives configuration changes. State is kept even when the Activity is recreated." },
    { q: "What is LiveData?", a: "An observable data holder from Android Architecture Components. UI components observe it and auto-update when data changes." },
    { q: "Explain the Unidirectional Data Flow (UDF) pattern", a: "State flows DOWN from parent to child. Events flow UP from child to parent. This makes data flow predictable and debuggable." },
    { q: "What triggers a recomposition?", a: "Any change to a `MutableState` (or other observable) that is read during Composition causes the affected composables to recompose." },
  ],

  quiz: [
    {
      q: "Which API prevents state loss during device rotation?",
      options: ["remember", "mutableStateOf", "rememberSaveable", "LiveData"],
      answer: 2,
      explanation: "`rememberSaveable` persists state through configuration changes by storing it in a Bundle, unlike `remember` which only survives recompositions.",
    },
    {
      q: "In State Hoisting, which direction does state flow?",
      options: [
        "State flows UP, events flow DOWN",
        "State flows DOWN, events flow UP",
        "Both flow in the same direction",
        "State doesn't flow — it's static",
      ],
      answer: 1,
      explanation: "In Unidirectional Data Flow: state flows down (parent → child) and events flow up (child → parent callback).",
    },
    {
      q: "What happens WITHOUT `remember` in a composable?",
      options: [
        "App crashes immediately",
        "State is shared globally",
        "Value resets to initial on every recomposition",
        "State persists forever",
      ],
      answer: 2,
      explanation: "Without `remember`, the variable is re-initialized every time the composable function re-executes during recomposition.",
    },
    {
      q: "Which of these correctly declares observable state in Compose?",
      options: [
        "var x = 0",
        "val x = StateFlow(0)",
        "var x by remember { mutableStateOf(0) }",
        "var x = mutableListOf(0)",
      ],
      answer: 2,
      explanation: "`remember { mutableStateOf(0) }` creates state that is both remembered across recompositions and triggers UI updates when changed.",
    },
    {
      q: "What is the main purpose of ViewModel?",
      options: [
        "Format strings for display",
        "Survive configuration changes and hold UI state",
        "Execute network requests synchronously",
        "Manage navigation",
      ],
      answer: 1,
      explanation: "ViewModel is lifecycle-aware and survives configuration changes (like rotation), keeping UI state intact.",
    },
  ],
};

// ── Topic 6: Navigation & Intents ─────────────────────────────────────────────
export const topic6 = {
  id: 6,
  title: "Navigation & Intents",
  emoji: "🧭",
  color: "from-cyan-600 to-sky-500",
  accent: "#0284c7",
  subtopics: [
    "What are Intents?",
    "Explicit Intents",
    "Implicit Intents",
    "Intent Filters",
    "Compose Navigation",
    "NavController & NavHost",
  ],

  concepts: [
    {
      title: "What is an Intent?",
      body: `An Intent is an abstract description of an operation to perform.
Used with startActivity() to start components.

Intent Components:
• Action: What to do (ACTION_VIEW, ACTION_DIAL, ACTION_SEND)
• Data: URI of data to act on (tel:, geo:, content:, http:)
• Extras: Key-value pairs of additional data (putExtra/getStringExtra)
• Component: Target class (for explicit intents)`,
    },
    {
      title: "Explicit vs Implicit Intents",
      code: `// Explicit Intent — exact destination
val intent = Intent(this, DetailActivity::class.java)
intent.putExtra("KEY_ID", 42)
startActivity(intent)

// Implicit Intent — system finds handler
val intent = Intent(Intent.ACTION_VIEW).apply {
    data = Uri.parse("https://google.com")
}
startActivity(intent)

// Phone call
val callIntent = Intent(Intent.ACTION_DIAL).apply {
    data = Uri.parse("tel:+923001234567")
}`,
    },
    {
      title: "Intent Filters in Manifest",
      code: `<!-- In AndroidManifest.xml -->
<activity android:name=".ViewActivity">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:scheme="https" android:host="myapp.com" />
    </intent-filter>
</activity>

<!-- MAIN launcher intent filter -->
<activity android:name=".MainActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>`,
    },
    {
      title: "Jetpack Compose Navigation Setup",
      code: `// 1. Add dependency
// implementation "androidx.navigation:navigation-compose:2.7.0"

// 2. Define routes as constants
object Routes {
    const val HOME = "home"
    const val DETAIL = "detail/{itemId}"
}

// 3. Set up NavHost
@Composable
fun AppNavigation() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = Routes.HOME
    ) {
        composable(Routes.HOME) {
            HomeScreen(onNavigate = { id ->
                navController.navigate("detail/\$id")
            })
        }
        composable(Routes.DETAIL) { backStack ->
            val id = backStack.arguments?.getString("itemId")
            DetailScreen(itemId = id)
        }
    }
}`,
    },
    {
      title: "NavController Navigation",
      code: `// Navigate to destination
navController.navigate("detail/42")

// Navigate and clear back stack
navController.navigate("home") {
    popUpTo("login") { inclusive = true }
}

// Go back
navController.popBackStack()

// Navigate with options
navController.navigate("profile") {
    launchSingleTop = true  // don't create duplicate
    restoreState = true     // restore saved state
}`,
    },
  ],

  flashcards: [
    { q: "What is an Intent in Android?", a: "An abstract description of an operation to perform. Used to start activities, services, or broadcast events. Has action, data, extras, and optional component." },
    { q: "Difference between explicit and implicit intents?", a: "Explicit: specifies exact destination class. Implicit: specifies an action, Android OS finds a matching app/component via Intent Filters." },
    { q: "What is an Intent Filter?", a: "Declared in AndroidManifest.xml to advertise what implicit intents a component can handle (action, category, data URI)." },
    { q: "What are Intent Extras?", a: "Key-value pairs attached to an intent for passing data. Use `putExtra(key, value)` to add and `getStringExtra(key)` to retrieve." },
    { q: "What is NavController?", a: "The central API for Compose Navigation. Tracks back stack and current destination. Used to call `navigate()`, `popBackStack()`." },
    { q: "What is NavHost?", a: "A composable container that displays the current navigation destination. Requires a NavController and startDestination." },
    { q: "How do you pass arguments with Compose Navigation?", a: "Define route with placeholders: `detail/{itemId}`. Navigate: `navController.navigate(\"detail/42\")`. Retrieve: `backStack.arguments?.getString(\"itemId\")`." },
    { q: "What is `rememberNavController()`?", a: "Creates and remembers a NavController instance in Composition. Should be created at the top-level composable." },
    { q: "What does `popUpTo` with `inclusive=true` do?", a: "Removes all destinations up to AND including the specified destination from the back stack. Used to prevent return to login screen." },
    { q: "What is `launchSingleTop`?", a: "Navigation option that prevents creating a duplicate of the destination if it's already at the top of the back stack." },
  ],

  quiz: [
    {
      q: "Which type of intent specifies the exact Activity to launch?",
      options: ["Implicit Intent", "Broadcast Intent", "Explicit Intent", "Pending Intent"],
      answer: 2,
      explanation: "Explicit intents specify the exact component (class) to start, used within your own app.",
    },
    {
      q: "Where are Intent Filters declared?",
      options: [
        "In the Activity's onCreate()",
        "In a separate filters.xml file",
        "In AndroidManifest.xml",
        "In build.gradle",
      ],
      answer: 2,
      explanation: "Intent Filters are declared in AndroidManifest.xml within the `<activity>`, `<service>`, or `<receiver>` tags.",
    },
    {
      q: "What does `ACTION_DIAL` do?",
      options: [
        "Makes a phone call immediately",
        "Opens the dialer app pre-populated with a number",
        "Sends an SMS",
        "Opens contacts",
      ],
      answer: 1,
      explanation: "`ACTION_DIAL` opens the phone dialer with the provided number pre-filled but does NOT make the call automatically.",
    },
    {
      q: "Which composable hosts the navigation graph?",
      options: ["NavGraph", "NavController", "NavHost", "NavBackStack"],
      answer: 2,
      explanation: "`NavHost` is the composable container that displays the current destination based on the NavController's back stack.",
    },
    {
      q: "How do you navigate back programmatically in Compose Navigation?",
      options: [
        "navController.back()",
        "navController.popBackStack()",
        "navController.goBack()",
        "navController.navigateUp()",
      ],
      answer: 1,
      explanation: "`navController.popBackStack()` pops the current destination off the back stack, navigating to the previous screen.",
    },
  ],
};

// Topics 7–12 and allTopics export are in topics-extra.js
