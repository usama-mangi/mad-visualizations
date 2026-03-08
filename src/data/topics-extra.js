import { topic1, topic2, topic3, topic4, topic5, topic6 } from './topics';

// ── Topic 7: Data Storage ─────────────────────────────────────────────────────
export const topic7 = {
  id: 7,
  title: "Data Storage",
  emoji: "💾",
  color: "from-yellow-600 to-orange-500",
  accent: "#d97706",
  subtopics: ["SharedPreferences", "File Storage", "SQLite Database"],

  concepts: [
    {
      title: "SharedPreferences — Key/Value Store",
      body: "SharedPreferences stores small amounts of primitive data as key-value pairs. Ideal for: user settings, login state, theme preference, last-read position.",
      code: `// WRITE
val prefs = context.getSharedPreferences("MyPrefs", Context.MODE_PRIVATE)
prefs.edit()
    .putString("USERNAME", "Usama")
    .putInt("USER_AGE", 22)
    .putBoolean("IS_LOGGED_IN", true)
    .apply()   // async — prefer over commit()

// READ
val username = prefs.getString("USERNAME", "Guest")    // default = "Guest"
val age      = prefs.getInt("USER_AGE", 0)
val loggedIn = prefs.getBoolean("IS_LOGGED_IN", false)`,
    },
    {
      title: "File Storage — Internal Storage",
      body: "Internal file storage is private to your app. Files are deleted when the app is uninstalled. Other apps cannot access these files.",
      code: `// WRITE to internal storage
val filename = "user_data.txt"
context.openFileOutput(filename, Context.MODE_PRIVATE).use { out ->
    out.write("Hello, World!".toByteArray())
}

// READ from internal storage
val content = context.openFileInput(filename)
    .bufferedReader()
    .useLines { it.joinToString("\n") }

println("Read: $content")`,
    },
    {
      title: "SQLite — Database Helper",
      body: "SQLite is built into Android for structured, relational data. Extend SQLiteOpenHelper and override onCreate() and onUpgrade().",
      code: `class DatabaseHelper(context: Context)
    : SQLiteOpenHelper(context, "MyDB.db", null, 1) {

    companion object {
        const val TABLE    = "Users"
        const val COL_ID   = "id"
        const val COL_NAME = "name"
    }

    override fun onCreate(db: SQLiteDatabase) {
        db.execSQL(
            "CREATE TABLE $TABLE ($COL_ID INTEGER PRIMARY KEY AUTOINCREMENT, $COL_NAME TEXT)"
        )
    }

    override fun onUpgrade(db: SQLiteDatabase, old: Int, new: Int) {
        db.execSQL("DROP TABLE IF EXISTS $TABLE")
        onCreate(db)
    }
}`,
    },
    {
      title: "SQLite — CRUD Operations",
      code: `// INSERT
fun insertUser(db: SQLiteDatabase, name: String): Long {
    val cv = ContentValues().apply { put("name", name) }
    return db.insert("Users", null, cv)
}

// READ ALL
fun getAllUsers(db: SQLiteDatabase): List<String> {
    val list   = mutableListOf<String>()
    val cursor = db.rawQuery("SELECT * FROM Users", null)
    if (cursor.moveToFirst()) {
        do { list.add(cursor.getString(cursor.getColumnIndexOrThrow("name"))) }
        while (cursor.moveToNext())
    }
    cursor.close()
    return list
}

// DELETE
fun deleteUser(db: SQLiteDatabase, id: Int) {
    db.delete("Users", "id = ?", arrayOf(id.toString()))
}`,
    },
  ],

  flashcards: [
    { q: "What is SharedPreferences used for?", a: "Storing small amounts of primitive key-value data: strings, ints, booleans. Used for user settings, login state, preferences." },
    { q: "Difference between apply() and commit() in SharedPreferences?", a: "apply() writes asynchronously (non-blocking, preferred). commit() writes synchronously and returns a boolean indicating success." },
    { q: "What is MODE_PRIVATE in SharedPreferences?", a: "The file can only be accessed by the calling application. Other apps cannot read or write it." },
    { q: "What class do you extend to create an SQLite database in Android?", a: "SQLiteOpenHelper. Override onCreate() (create tables) and onUpgrade() (handle schema changes)." },
    { q: "What is ContentValues used for in SQLite?", a: "A map-like object used to pass column/value pairs for INSERT and UPDATE operations in SQLite." },
    { q: "What is a Cursor in Android SQLite?", a: "An iterator over the result set of an SQLite query. Use moveToFirst(), moveToNext(), getString(), getInt() to read data." },
    { q: "Where does internal file storage save files?", a: "In the app's private directory on device internal storage. Accessible only to your app, deleted on uninstall." },
    { q: "What does rawQuery() do in SQLite?", a: "Executes a raw SQL SELECT query and returns a Cursor with the results. E.g., rawQuery(\"SELECT * FROM Users\", null)" },
  ],

  quiz: [
    { q: "Which method saves SharedPreferences asynchronously?", options: ["commit()", "save()", "apply()", "flush()"], answer: 2, explanation: "apply() writes asynchronously without blocking. commit() is synchronous." },
    { q: "Which class do you extend for SQLite database access in Android?", options: ["SQLiteManager", "DatabaseAdapter", "SQLiteOpenHelper", "ContentProvider"], answer: 2, explanation: "SQLiteOpenHelper: override onCreate() to create tables and onUpgrade() for schema migrations." },
    { q: "What does a Cursor object represent?", options: ["A database connection", "An iterator over a query result set", "A prepared SQL statement", "A database transaction"], answer: 1, explanation: "Cursor iterates over SQLite query results. Use moveToFirst(), moveToNext(), getColumnIndex() to read rows." },
    { q: "Which SharedPreferences mode makes files private to your app?", options: ["MODE_PUBLIC", "MODE_WORLD_READABLE", "MODE_PRIVATE", "MODE_APPEND"], answer: 2, explanation: "MODE_PRIVATE restricts file access to the calling application only." },
    { q: "What is the correct method to open a file in internal storage for writing?", options: ["context.openFile()", "File(context.filesDir)", "context.openFileOutput()", "context.getExternalFilesDir()"], answer: 2, explanation: "context.openFileOutput(name, mode) creates/opens a file in internal storage and returns an OutputStream." },
  ],
};

// ── Topic 8: Coroutines & Threads ─────────────────────────────────────────────
export const topic8 = {
  id: 8,
  title: "Coroutines & Threads",
  emoji: "⚙️",
  color: "from-teal-600 to-cyan-500",
  accent: "#0d9488",
  subtopics: ["Threads vs Coroutines", "Suspend Functions", "Dispatchers", "launch vs async"],

  concepts: [
    {
      title: "Why Coroutines?",
      body: `Android's Main Thread (UI Thread) handles all UI rendering and user input.

Problem: Long-running tasks (network, database) on Main Thread = ANR (App Not Responding)

Old solution: Threads — heavyweight, complex lifecycle management
Modern solution: Coroutines — lightweight, structured, sequential syntax for async code

Key facts:
• Coroutines are NOT threads — they run ON threads using dispatchers
• Thousands of coroutines can run on just a few threads
• Coroutines can be paused (suspended) and resumed without blocking`,
    },
    {
      title: "Suspend Functions",
      code: `// A suspend function can pause without blocking its thread
suspend fun fetchData(): String {
    delay(1000)       // suspends (not blocks) for 1 second
    return "Hello from network!"
}

// Rules:
// 1. Can only be called from a coroutine or another suspend function
// 2. The calling thread is FREE to do other work while suspended`,
    },
    {
      title: "Dispatchers — Which Thread to Use",
      code: `// Dispatchers.Main — UI updates, user interactions
withContext(Dispatchers.Main) { textView.text = result }

// Dispatchers.IO — network calls, database, file I/O
withContext(Dispatchers.IO) { val data = api.fetchUser() }

// Dispatchers.Default — CPU-intensive: sorting, parsing
withContext(Dispatchers.Default) { val sorted = list.sortedBy { it.name } }

// Switch context within a coroutine
CoroutineScope(Dispatchers.IO).launch {
    val data = fetchData()              // IO thread
    withContext(Dispatchers.Main) { updateUI(data) }  // switch to Main
}`,
    },
    {
      title: "launch vs async",
      code: `// launch — fire and forget (no return value) → returns Job
val job = CoroutineScope(Dispatchers.IO).launch {
    sendAnalyticsEvent()
}

// async — concurrent with a result → returns Deferred<T>
CoroutineScope(Dispatchers.Main).launch {
    val userDeferred     = async(Dispatchers.IO) { fetchUser() }
    val settingsDeferred = async(Dispatchers.IO) { fetchSettings() }

    // await() suspends until result is ready (non-blocking)
    val user     = userDeferred.await()
    val settings = settingsDeferred.await()

    showProfile(user, settings)
}`,
    },
    {
      title: "ViewModel + viewModelScope",
      code: `class UserViewModel : ViewModel() {
    val userData = MutableLiveData<String>()

    fun loadUser() {
        // Auto-cancelled when ViewModel is cleared
        viewModelScope.launch {
            val result = withContext(Dispatchers.IO) {
                repository.fetchUser()   // background
            }
            userData.value = result     // back on Main thread
        }
    }
}`,
    },
  ],

  flashcards: [
    { q: "What causes an ANR (App Not Responding) error?", a: "Performing long-running operations (network, database, file I/O) on the Main Thread, blocking it for more than ~5 seconds." },
    { q: "What is a suspend function?", a: "A function marked with 'suspend' that can be paused mid-execution without blocking its thread, then resumed later. Can only be called from a coroutine." },
    { q: "What is Dispatchers.Main used for?", a: "Running code on the Android Main (UI) Thread. Used for updating UI elements after background work completes." },
    { q: "What is Dispatchers.IO used for?", a: "Optimized thread pool for I/O-bound tasks: network requests, database operations, file reading/writing." },
    { q: "What is Dispatchers.Default used for?", a: "CPU-intensive work: sorting large lists, parsing large JSON/XML files, complex calculations." },
    { q: "Difference between launch and async?", a: "launch: fire-and-forget, returns Job, no result. async: returns Deferred<T>, use .await() to get result. Both start coroutines." },
    { q: "What does .await() do?", a: "Suspends the current coroutine until the Deferred (from async) completes and returns its result — does NOT block the thread." },
    { q: "What is viewModelScope?", a: "A CoroutineScope tied to the ViewModel lifecycle. Coroutines in it are automatically cancelled when the ViewModel is cleared." },
    { q: "What does withContext() do?", a: "Switches the coroutine to a different dispatcher (thread) for a code block, then switches back automatically." },
    { q: "How are coroutines different from threads?", a: "Coroutines are lightweight — thousands can run on a few threads. They suspend without blocking. Threads are heavy OS resources." },
  ],

  quiz: [
    { q: "What happens if you run a network request on the Main Thread?", options: ["Works fine", "Causes ANR and may crash the app", "Runs automatically in background", "Throws SecurityException"], answer: 1, explanation: "Long-running operations on the Main Thread block UI updates, causing ANR after ~5 seconds." },
    { q: "Which coroutine builder returns a result from an async operation?", options: ["launch", "run", "async", "execute"], answer: 2, explanation: "async returns a Deferred<T>. Call .await() to suspend until the result is ready." },
    { q: "Which dispatcher should you use for database operations?", options: ["Dispatchers.Main", "Dispatchers.UI", "Dispatchers.Default", "Dispatchers.IO"], answer: 3, explanation: "Dispatchers.IO is optimized for I/O-bound tasks: database, network, file I/O." },
    { q: "What does a 'suspend' keyword on a function mean?", options: ["Runs on background thread automatically", "Can be paused and resumed without blocking its thread", "The function is deprecated", "Runs only once"], answer: 1, explanation: "A suspend function can pause mid-execution, freeing its thread for other work, and resume later." },
    { q: "What does viewModelScope.launch automatically do when ViewModel is cleared?", options: ["Saves state to disk", "Cancels all coroutines in that scope", "Moves coroutines to global scope", "Completes all work before cancelling"], answer: 1, explanation: "viewModelScope cancels all coroutines automatically when the ViewModel is destroyed." },
  ],
};

// ── Topic 9: Background Services & WorkManager ────────────────────────────────
export const topic9 = {
  id: 9,
  title: "Services & WorkManager",
  emoji: "🔧",
  color: "from-indigo-600 to-blue-500",
  accent: "#4f46e5",
  subtopics: ["Background Services", "Foreground Services", "WorkManager", "Worker Class", "Work Requests", "Constraints"],

  concepts: [
    {
      title: "Services Overview",
      body: `A Service is an Android component that runs operations in the background WITHOUT a UI.

Types:
1. Background Service — runs silently, can be killed by OS when resources are low
2. Foreground Service — shows a persistent notification, user-visible, harder to kill
3. Bound Service — clients bind to interact with it (IPC)

Key lifecycle: onCreate() → onStartCommand() → onDestroy()`,
    },
    {
      title: "Foreground Service",
      code: `class MusicService : Service() {

    override fun onStartCommand(intent: Intent?, flags: Int, id: Int): Int {
        val notification = NotificationCompat.Builder(this, "MUSIC_CHANNEL")
            .setContentTitle("Music Playing")
            .setContentText("Now playing: My Track")
            .setSmallIcon(R.drawable.ic_music)
            .build()

        startForeground(1, notification)   // Required!

        // Do work here (play music, track location, etc.)
        return START_STICKY   // Restart if killed by OS
    }

    override fun onBind(intent: Intent?) = null
}

// AndroidManifest.xml:
// <service android:name=".MusicService"
//          android:foregroundServiceType="mediaPlayback" />`,
    },
    {
      title: "WorkManager — Why Use It?",
      body: `WorkManager is Android's recommended solution for deferrable, guaranteed background work.

Guaranteed execution — survives app exit AND device restart
Respects Doze mode and battery optimizations
Chain, sequence, and parallelize tasks
Set constraints (network required, charging, battery level)
Query work status in real-time

Use for: data sync, uploading logs, processing images in background`,
    },
    {
      title: "Worker Class + Work Requests",
      code: `// 1. Define the Worker
class SyncWorker(context: Context, params: WorkerParameters)
    : Worker(context, params) {
    override fun doWork(): Result {
        return try {
            syncData()
            Result.success()
        } catch (e: Exception) {
            Result.retry()    // or Result.failure()
        }
    }
}

// 2. OneTimeWorkRequest
val oneTime = OneTimeWorkRequestBuilder<SyncWorker>()
    .setConstraints(Constraints.Builder()
        .setRequiredNetworkType(NetworkType.CONNECTED)
        .setRequiresBatteryNotLow(true)
        .build())
    .build()

// 3. PeriodicWorkRequest (min 15 min)
val periodic = PeriodicWorkRequestBuilder<SyncWorker>(1, TimeUnit.HOURS).build()

// 4. Enqueue
WorkManager.getInstance(context).enqueue(oneTime)

// 5. Chain tasks
WorkManager.getInstance(context)
    .beginWith(stepOneRequest)
    .then(stepTwoRequest)
    .enqueue()`,
    },
  ],

  flashcards: [
    { q: "Difference between Background Service and Foreground Service?", a: "Background: silent, can be killed by OS. Foreground: must show persistent notification, user-visible, less likely to be killed." },
    { q: "What must a Foreground Service display?", a: "A persistent notification in the status bar — required by Android via startForeground() called immediately." },
    { q: "What is WorkManager best suited for?", a: "Deferrable, guaranteed background work that must complete even if the app exits or device restarts (e.g., data sync, uploads)." },
    { q: "What class do you extend to create a WorkManager task?", a: "Worker class. Override doWork() — returns Result.success(), Result.failure(), or Result.retry()." },
    { q: "Difference between OneTimeWorkRequest and PeriodicWorkRequest?", a: "OneTimeWorkRequest: runs exactly once. PeriodicWorkRequest: repeats at interval (minimum 15 minutes)." },
    { q: "What are WorkManager Constraints?", a: "Conditions before work runs: NetworkType.CONNECTED, setRequiresCharging(true), setRequiresBatteryNotLow(true)." },
    { q: "What does WorkManager.beginWith().then().enqueue() do?", a: "Chains work sequentially — each step only runs after the previous one succeeds." },
    { q: "What does START_STICKY mean in onStartCommand?", a: "If the service is killed by the OS, Android will restart it automatically (without the original Intent)." },
  ],

  quiz: [
    { q: "Which type of service MUST display a persistent notification?", options: ["Background Service", "Bound Service", "Foreground Service", "Intent Service"], answer: 2, explanation: "Foreground Services must call startForeground() with a notification immediately to signal user-visible work." },
    { q: "What does Worker.doWork() return when a task fails permanently?", options: ["Result.success()", "Result.failure()", "Result.retry()", "null"], answer: 1, explanation: "Return Result.failure() for permanent failure. Result.retry() to attempt again. Result.success() on completion." },
    { q: "What is the minimum interval for a PeriodicWorkRequest?", options: ["1 minute", "5 minutes", "10 minutes", "15 minutes"], answer: 3, explanation: "Android enforces 15 minutes minimum to respect battery life." },
    { q: "Which constraint ensures work only runs on Wi-Fi?", options: ["NetworkType.CONNECTED", "NetworkType.UNMETERED", "setRequiresWifi(true)", "NetworkType.WIFI"], answer: 1, explanation: "NetworkType.UNMETERED means unmetered connection (Wi-Fi). CONNECTED allows any network." },
    { q: "WorkManager guarantees work completes even if:", options: ["Screen turns off", "App exits or device restarts", "Internet drops", "User opens another app"], answer: 1, explanation: "WorkManager persists work to disk and re-schedules after device restarts or app process death." },
  ],
};

// ── Topic 10: Networking ──────────────────────────────────────────────────────
export const topic10 = {
  id: 10,
  title: "Networking",
  emoji: "🌐",
  color: "from-sky-600 to-blue-400",
  accent: "#0369a1",
  subtopics: ["OkHttp", "GET Requests", "JSON Parsing", "XML Parsing"],

  concepts: [
    {
      title: "OkHttp Setup",
      body: `OkHttp is an efficient HTTP client for Android.
Features: Connection pooling, GZIP compression, response caching, async callbacks.

Add to build.gradle:
implementation 'com.squareup.okhttp3:okhttp:4.12.0'

Add to AndroidManifest.xml:
<uses-permission android:name="android.permission.INTERNET" />`,
    },
    {
      title: "Async GET Request",
      code: `val client = OkHttpClient()

fun fetchData(url: String) {
    val request = Request.Builder().url(url).build()

    // enqueue = async on background thread
    client.newCall(request).enqueue(object : Callback {
        override fun onFailure(call: Call, e: IOException) {
            e.printStackTrace()
        }

        override fun onResponse(call: Call, response: Response) {
            response.use {
                if (!response.isSuccessful) return
                val body = response.body?.string()
                // Must switch to Main thread to update UI
                runOnUiThread { textView.text = body }
            }
        }
    })
}`,
    },
    {
      title: "OkHttp + Coroutines (Recommended)",
      code: `class NewsViewModel : ViewModel() {
    private val client = OkHttpClient()
    val news = MutableLiveData<String>()

    fun loadNews() {
        viewModelScope.launch {
            val result = withContext(Dispatchers.IO) {
                val req = Request.Builder()
                    .url("https://api.example.com/news")
                    .build()
                client.newCall(req).execute().body?.string()
            }
            news.value = result   // auto back on Main thread
        }
    }
}`,
    },
    {
      title: "JSON Parsing",
      code: `// Built-in JSONObject
val json = """{ "name": "Usama", "age": 22 }"""
val obj  = JSONObject(json)
val name = obj.getString("name")  // "Usama"
val age  = obj.getInt("age")      // 22

// JSONArray
val arr = JSONArray("""[{"id":1},{"id":2}]""")
for (i in 0 until arr.length()) {
    println(arr.getJSONObject(i).getInt("id"))
}

// Gson — auto-map to data class
data class User(val name: String, val age: Int)
val user = Gson().fromJson(json, User::class.java)
println(user.name)  // "Usama"`,
    },
    {
      title: "XML Parsing with XmlPullParser",
      code: `val parser = XmlPullParserFactory.newInstance().newPullParser()
parser.setInput(inputStream, "UTF-8")

val items   = mutableListOf<String>()
var event   = parser.eventType

while (event != XmlPullParser.END_DOCUMENT) {
    if (event == XmlPullParser.START_TAG && parser.name == "title") {
        items.add(parser.nextText())
    }
    event = parser.next()
}`,
    },
  ],

  flashcards: [
    { q: "What is OkHttp?", a: "A popular HTTP client for Android. Supports connection pooling, GZIP, caching. Used for GET/POST network requests." },
    { q: "What permission is required for internet access?", a: "<uses-permission android:name=\"android.permission.INTERNET\" /> in AndroidManifest.xml." },
    { q: "Difference between execute() and enqueue() in OkHttp?", a: "execute() is synchronous (blocks). enqueue() is async (background thread with callback). Never use execute() from Main Thread." },
    { q: "What is JSON?", a: "JavaScript Object Notation — lightweight data format used by most REST APIs. Android provides JSONObject and JSONArray for parsing." },
    { q: "What is Gson?", a: "Google's library converting Java/Kotlin objects to/from JSON. fromJson() deserializes, toJson() serializes." },
    { q: "What is XmlPullParser?", a: "Android's event-based XML parser. Reads START_TAG, TEXT, END_TAG events sequentially — memory efficient." },
    { q: "Why can't you update UI from OkHttp's onResponse callback?", a: "onResponse runs on a background thread. UI updates must happen on Main Thread — use runOnUiThread{} or LiveData." },
    { q: "What does response.use{} do in OkHttp?", a: "Ensures the response body is closed after use, preventing resource leaks." },
  ],

  quiz: [
    { q: "Which OkHttp method makes an asynchronous request?", options: ["call.execute()", "call.enqueue()", "call.async()", "call.fetch()"], answer: 1, explanation: "enqueue() runs asynchronously on a background thread and calls back onResponse() or onFailure()." },
    { q: "What format do most modern REST APIs use?", options: ["XML", "HTML", "JSON", "CSV"], answer: 2, explanation: "JSON is the most common REST API format — lightweight and human-readable." },
    { q: "What happens if you call execute() from the Main Thread?", options: ["Works normally", "Throws NetworkOnMainThreadException", "Runs in coroutine automatically", "Opens new thread"], answer: 1, explanation: "Android throws NetworkOnMainThreadException for synchronous network calls on the Main Thread." },
    { q: "Which XML parser is memory-efficient in Android?", options: ["DOM Parser", "SAX Parser", "XmlPullParser", "StAX"], answer: 2, explanation: "XmlPullParser reads documents event-by-event without loading the entire file into memory." },
    { q: "What does Gson's fromJson() do?", options: ["Converts object to JSON string", "Deserializes JSON string into a Kotlin object", "Validates JSON format", "Makes a network request"], answer: 1, explanation: "fromJson(jsonString, MyClass::class.java) automatically maps JSON fields to the data class." },
  ],
};

// ── Topic 11: Notifications & Deployment ──────────────────────────────────────
export const topic11 = {
  id: 11,
  title: "Notifications & Deployment",
  emoji: "🔔",
  color: "from-rose-600 to-pink-500",
  accent: "#e11d48",
  subtopics: ["Notification Channels", "Building Notifications", "Signed APK", "Play Store"],

  concepts: [
    {
      title: "Notification Channels (Android 8+)",
      body: `Required since Android 8.0 (API 26). Every notification must belong to a channel.
Users can control each channel independently.

Importance levels:
IMPORTANCE_HIGH — heads-up notification (urgent, pops up)
IMPORTANCE_DEFAULT — makes sound, no popup
IMPORTANCE_LOW — no sound
IMPORTANCE_MIN — silent, no status bar icon`,
      code: `if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    val channel = NotificationChannel(
        "CHANNEL_ID",
        "My Notifications",
        NotificationManager.IMPORTANCE_DEFAULT
    ).apply { description = "General app notifications" }

    val nm = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    nm.createNotificationChannel(channel)
}`,
    },
    {
      title: "Building a Notification",
      code: `val notification = NotificationCompat.Builder(this, "CHANNEL_ID")
    .setSmallIcon(R.drawable.ic_notification)
    .setContentTitle("New Message")
    .setContentText("You have 3 unread messages")
    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
    .setAutoCancel(true)   // dismiss on tap
    .setContentIntent(
        PendingIntent.getActivity(
            this, 0,
            Intent(this, MainActivity::class.java),
            PendingIntent.FLAG_IMMUTABLE
        )
    )
    .build()

// Show (needs POST_NOTIFICATIONS permission on API 33+)
NotificationManagerCompat.from(this).notify(1001, notification)`,
    },
    {
      title: "Creating a Signed APK",
      body: `Release APK must be signed with a keystore before publishing.

Steps in Android Studio:
1. Build → Generate Signed Bundle / APK
2. Choose APK or AAB (Android App Bundle — recommended for Play Store)
3. Create keystore (.jks): alias, password, validity, certificate
4. Choose Release build variant
5. Finish — generates signed APK/AAB

Debug APK: signed with debug keystore (testing only)
Release APK: signed with your release keystore (publishing)`,
      code: `// build.gradle signing config
android {
    signingConfigs {
        release {
            storeFile file("my-key.jks")
            storePassword "storePass"
            keyAlias "myAlias"
            keyPassword "keyPass"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true   // R8 code shrinking
        }
    }
}`,
    },
    {
      title: "Play Store Deployment Metadata",
      body: `Required for Play Store submission:

App Listing:
• Title (max 30 chars)
• Short description (max 80 chars)
• Full description (max 4000 chars)
• Category (Education, Tools, etc.)

Graphics:
• Launch icon — 512×512 PNG
• Feature graphic — 1024×500
• Screenshots (phone, tablet)

Technical:
• Signed APK or AAB
• Target API level (recent required)
• Privacy Policy URL`,
    },
  ],

  flashcards: [
    { q: "What are Notification Channels?", a: "Introduced in Android 8.0 — groups notifications users control independently (sound, vibration, importance). Every notification must have a channel." },
    { q: "What permission is needed to post notifications on Android 13+?", a: "android.permission.POST_NOTIFICATIONS — must be requested at runtime on API 33+." },
    { q: "What is IMPORTANCE_HIGH in a notification channel?", a: "Creates a heads-up notification that pops up at the top of the screen — used for urgent alerts." },
    { q: "What does setAutoCancel(true) do?", a: "Automatically dismisses the notification when the user taps it." },
    { q: "What is a PendingIntent in notifications?", a: "Wraps an Intent granting permission to the system to trigger it later. Used to define the tap action on a notification." },
    { q: "Difference between APK and AAB?", a: "APK is a complete installable file. AAB (Android App Bundle) is the preferred Play Store format — Google creates smaller device-specific APKs from it." },
    { q: "What does minifyEnabled do in a Release build?", a: "Enables R8/ProGuard code shrinking — removes unused classes and obfuscates code, reducing APK size." },
    { q: "What metadata does the Play Store require?", a: "Title, short/full description, category, launch icon (512×512), feature graphic, screenshots, signed APK/AAB, privacy policy." },
  ],

  quiz: [
    { q: "From which Android version are Notification Channels required?", options: ["Android 5.0 (API 21)", "Android 7.0 (API 24)", "Android 8.0 (API 26)", "Android 10.0 (API 29)"], answer: 2, explanation: "Notification Channels were introduced in Android 8.0 (Oreo, API 26)." },
    { q: "What is the recommended format for uploading to the Play Store?", options: ["APK", "AAB (Android App Bundle)", "ZIP", "JAR"], answer: 1, explanation: "AAB is preferred — Google Play splits it into optimized APKs per device configuration." },
    { q: "What does setAutoCancel(true) do to a notification?", options: ["Cancels after a timeout", "Dismisses when user taps it", "Prevents dismissal", "Sets low priority"], answer: 1, explanation: "setAutoCancel(true) automatically removes the notification from the status bar when tapped." },
    { q: "Which file format is used for Android keystores?", options: [".pem", ".p12", ".jks", ".cert"], answer: 2, explanation: ".jks (Java KeyStore) format is used for Android signing keystores." },
    { q: "What is the required launch icon size for the Play Store?", options: ["256×256 PNG", "512×512 PNG", "1024×1024 PNG", "192×192 PNG"], answer: 1, explanation: "Play Store requires a 512×512 PNG launch icon for the store listing." },
  ],
};

// ── Topic 12: Gestures & User Input ───────────────────────────────────────────
export const topic12 = {
  id: 12,
  title: "Gestures & Input",
  emoji: "👆",
  color: "from-violet-600 to-purple-500",
  accent: "#7c3aed",
  subtopics: ["MotionEvent", "GestureDetector", "Compose Gestures", "Form Input"],

  concepts: [
    {
      title: "MotionEvent & Touch Events",
      body: `MotionEvent: Passed to touch listeners when user touches the screen.

Key actions:
ACTION_DOWN — finger first touches (start of gesture)
ACTION_MOVE — finger drags
ACTION_UP   — finger lifts off

Contains: X/Y coordinates, pressure, pointer count (multi-touch)`,
      code: `view.setOnTouchListener { _, event ->
    when (event.action) {
        MotionEvent.ACTION_DOWN -> {
            println("Touched at: \${event.x}, \${event.y}"); true
        }
        MotionEvent.ACTION_MOVE -> {
            println("Dragging to: \${event.x}, \${event.y}"); true
        }
        MotionEvent.ACTION_UP   -> {
            println("Released"); true
        }
        else -> false
    }
}`,
    },
    {
      title: "GestureDetector",
      code: `// GestureDetector converts MotionEvents into gesture callbacks
val detector = GestureDetector(context, object : GestureDetector.SimpleOnGestureListener() {

    override fun onFling(
        e1: MotionEvent?, e2: MotionEvent,
        velocityX: Float, velocityY: Float
    ): Boolean {
        println("Fling! VelocityX: $velocityX")
        return true
    }

    override fun onDoubleTap(e: MotionEvent): Boolean {
        println("Double tap!")
        return true
    }

    override fun onLongPress(e: MotionEvent) {
        println("Long press at: \${e.x}, \${e.y}")
    }
})

// Pass touch events to the detector
override fun onTouchEvent(event: MotionEvent?) =
    detector.onTouchEvent(event!!)`,
    },
    {
      title: "Compose — combinedClickable & draggable",
      code: `// Multiple gesture types on one element
Box(
    modifier = Modifier.combinedClickable(
        onClick      = { println("Tap") },
        onLongClick  = { println("Long press") },
        onDoubleClick = { println("Double tap") }
    )
)

// Drag gesture — horizontal
var offsetX by remember { mutableStateOf(0f) }
Box(
    modifier = Modifier
        .offset { IntOffset(offsetX.roundToInt(), 0) }
        .draggable(
            orientation = Orientation.Horizontal,
            state = rememberDraggableState { delta -> offsetX += delta }
        )
)`,
    },
    {
      title: "Compose — pointerInput (Custom Gestures)",
      code: `Box(
    modifier = Modifier.pointerInput(Unit) {
        detectTapGestures(
            onTap       = { offset -> println("Tap at $offset") },
            onDoubleTap = { offset -> println("Double tap") },
            onLongPress = { offset -> println("Long press") }
        )
    }
)

// Detect drag with raw pointer data
Box(
    modifier = Modifier.pointerInput(Unit) {
        detectDragGestures { change, dragAmount ->
            change.consume()
            println("Dragged: $dragAmount")
        }
    }
)`,
    },
    {
      title: "Compose Form Input",
      code: `@Composable
fun LoginForm() {
    var email    by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var remember by remember { mutableStateOf(false) }

    Column(modifier = Modifier.padding(16.dp)) {
        TextField(
            value = email,
            onValueChange = { email = it },
            label = { Text("Email") },
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email)
        )
        TextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            visualTransformation = PasswordVisualTransformation()
        )
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(checked = remember, onCheckedChange = { remember = it })
            Text("Remember me")
        }
        // RadioButton group
        listOf("Admin", "User", "Guest").forEach { role ->
            Row {
                RadioButton(selected = (selected == role), onClick = { selected = role })
                Text(role)
            }
        }
    }
}`,
    },
  ],

  flashcards: [
    { q: "What is a MotionEvent?", a: "An object passed to touch listeners with touch action type (DOWN, MOVE, UP), X/Y coordinates, pressure, and pointer count." },
    { q: "What does ACTION_DOWN represent?", a: "The moment a finger first touches the screen — the start of a touch gesture." },
    { q: "What is GestureDetector used for?", a: "Translates raw MotionEvents into high-level gesture callbacks: onFling(), onDoubleTap(), onLongPress(), onScroll(), onSingleTapUp()." },
    { q: "What Compose modifier handles click, long-click, and double-click?", a: "combinedClickable — provides onClick, onLongClick, onDoubleClick parameters." },
    { q: "What is pointerInput in Compose?", a: "A low-level Modifier for raw pointer events. Used with detectTapGestures and detectDragGestures for custom gesture handling." },
    { q: "How do you hide a password in a Compose TextField?", a: "Use visualTransformation = PasswordVisualTransformation() to mask characters with dots." },
    { q: "What KeyboardType should you use for an email TextField?", a: "KeyboardOptions(keyboardType = KeyboardType.Email) — shows an email keyboard with @ symbol." },
    { q: "What is draggable() Modifier used for?", a: "Detects drag gestures along one axis (Horizontal or Vertical) using rememberDraggableState { delta -> }." },
  ],

  quiz: [
    { q: "Which MotionEvent action fires when a finger first touches the screen?", options: ["ACTION_START", "ACTION_BEGIN", "ACTION_DOWN", "ACTION_PRESS"], answer: 2, explanation: "ACTION_DOWN fires when a pointer first makes contact with the screen." },
    { q: "Which Compose modifier handles both click and long-press?", options: ["clickable", "tapGesture", "combinedClickable", "pressable"], answer: 2, explanation: "combinedClickable provides onClick, onLongClick, and onDoubleClick in one modifier." },
    { q: "What does PasswordVisualTransformation() do?", options: ["Encrypts the password", "Replaces characters with dots/asterisks", "Prevents keyboard from showing", "Validates password strength"], answer: 1, explanation: "PasswordVisualTransformation() visually replaces typed characters with bullet points." },
    { q: "Which Compose API gives low-level access to pointer events?", options: ["clickable", "scrollable", "pointerInput", "gestureDetector"], answer: 2, explanation: "pointerInput is the low-level Compose gesture API used with detectTapGestures and detectDragGestures." },
    { q: "What does GestureDetector.onFling() detect?", options: ["A slow scroll", "A long press", "A fast swipe with velocity", "A double tap"], answer: 2, explanation: "onFling() is called for a quick swipe (fling) gesture, providing X and Y velocity." },
  ],
};

// ── Notebook-sourced Cross-Topic Mega Quiz ────────────────────────────────────
export const notebookQuiz = {
  id: 99,
  title: "Notebook Mega Quiz",
  emoji: "🏆",
  color: "from-amber-500 to-yellow-400",
  accent: "#f59e0b",
  isSpecial: true,
  description: "20 questions sourced directly from your NotebookLM notebook — covers all topics",
  subtopics: ["All Topics Combined"],

  concepts: [
    {
      title: "How to Use This Quiz",
      body: `This mega quiz draws all its questions directly from your NotebookLM notebook sources.

It covers:
• Kotlin syntax and null safety
• Jetpack Compose UI phases and components
• State management and hoisting
• Navigation and intents
• Android Studio and build systems
• Data storage, services, networking

Aim for 80%+ before your midterm!`,
    },
  ],

  flashcards: [
    { q: "Summarize the complete Android build process", a: "Source code → compiler → .class files → DEX files (bytecode) → AAPT packs resources + DEX → APK Packager → signed Debug or Release APK" },
    { q: "What is the Navigation Component's NavHostFragment?", a: "The UI widget (container) that displays the current navigation destination. It swaps out composables/fragments as the user navigates." },
    { q: "What does AndroidManifest.xml declare?", a: "App components (activities, services, broadcast receivers), permissions, hardware features, intent filters, and app metadata." },
    { q: "Explain Unidirectional Data Flow (UDF) in Compose", a: "State flows DOWN (parent to child). Events flow UP (child to parent via callbacks). Makes data flow predictable and testable." },
    { q: "What is the difference between debug and release APK?", a: "Debug APK: signed with auto-generated debug keystore, for testing only. Release APK: signed with your release keystore, used for distribution." },
  ],

  quiz: [
    { q: "What is the primary function of the Elvis operator (?:) in Kotlin?", options: ["Safely calls a method on a nullable object", "Converts a variable to a String", "Returns left value if non-null, otherwise right value", "Throws NullPointerException if null"], answer: 2, explanation: "The Elvis operator: if left side is non-null use it, otherwise use the right side default. E.g., name?.length ?: 0" },
    { q: "How do you correctly declare mutable state in a Composable?", options: ["var value = mutableStateOf(0)", "val value = stateOf(0)", "var value by remember { mutableStateOf(0) }", "val value by rememberState(0)"], answer: 2, explanation: "remember keeps the value across recompositions; mutableStateOf makes it observable to trigger UI updates." },
    { q: "What are the three phases of a Compose frame in order?", options: ["Layout, Drawing, Rendering", "Composition, Layout, Drawing", "Initialization, Composition, Drawing", "Measurement, Placement, Rendering"], answer: 1, explanation: "Composition → Layout → Drawing. Each frame executes all three phases in this order." },
    { q: "Which Compose layout stacks children vertically?", options: ["Row", "Box", "Column", "Surface"], answer: 2, explanation: "Column stacks children vertically. Row is horizontal. Box overlaps." },
    { q: "Which Scaffold parameter holds the app bar?", options: ["topBar", "navigationIcon", "arrangement", "contentScale"], answer: 0, explanation: "Scaffold's topBar parameter accepts a composable for the top navigation bar." },
    { q: "What triggers a composable to recompose?", options: ["Device rotation", "Update to observable state the composable reads", "Calling setContentView()", "Launching an implicit intent"], answer: 1, explanation: "Any change to MutableState (or other observable) read during composition triggers recomposition." },
    { q: "Why choose rememberSaveable over remember?", options: ["Stores data in SQLite", "Hoists state automatically", "Preserves state across configuration changes", "Passes state between Activities"], answer: 2, explanation: "rememberSaveable persists through rotation/language changes via Bundle. remember only survives recompositions." },
    { q: "What does State Hoisting mean?", options: ["Moving state to a composable's caller to make it stateless", "Moving all state into a ViewModel", "Lifting composables into an Activity", "Passing data via intents"], answer: 0, explanation: "Hoisting: move state UP to the parent. Child becomes stateless with (value, onValueChange) parameters." },
    { q: "Explicit vs Implicit Intent — key difference?", options: ["Explicit needs permissions", "Explicit for system apps, implicit for yours", "Explicit defines exact destination; implicit lets OS find handler", "Implicit uses putExtra, explicit doesn't"], answer: 2, explanation: "Explicit Intent: specifies exact class. Implicit Intent: specifies action, OS matches via Intent Filters." },
    { q: "Three components of Android Navigation architecture?", options: ["NavGraph, NavHostFragment, NavController", "Intent, IntentFilter, Action", "ViewModel, LiveData, State", "Activity, Fragment, Service"], answer: 0, explanation: "Navigation Graph (destinations) + NavHostFragment (container) + NavController (back stack manager)." },
    { q: "Which file declares Android app components and permissions?", options: ["build.gradle", "AndroidManifest.xml", "R.java", "MainActivity.kt"], answer: 1, explanation: "AndroidManifest.xml is the app blueprint — declares all components, permissions, and intent filters." },
    { q: "What does Gradle do in Android development?", options: ["Renders the UI", "Manages device hardware", "Compiles, tests, and packages the app into an APK", "Handles network requests"], answer: 2, explanation: "Gradle is the build system — compiles code, runs tests, packages resources, and creates signed APKs." },
    { q: "What does the build process convert source code into?", options: ["Direct APK", "DEX (Dalvik Executable) bytecode files", "Native machine code", "Multiple APKs automatically"], answer: 1, explanation: "Source → .class files → DEX files (Dalvik bytecode). DEX + resources = APK." },
    { q: "Which method adds data to an Intent for the destination Activity?", options: ["getIntent()", "startActivityForResult()", "putExtra()", "getStringExtra()"], answer: 2, explanation: "putExtra(key, value) attaches data. getStringExtra(key) retrieves it at the destination." },
    { q: "Which built-in Android database is used for local structured data?", options: ["MySQL", "SQLite", "MongoDB", "PostgreSQL"], answer: 1, explanation: "SQLite is the lightweight relational database built into Android, accessed via SQLiteOpenHelper." },
    { q: "Which Service type requires a persistent notification?", options: ["Background", "Bound", "Foreground", "Intent"], answer: 2, explanation: "Foreground Services must call startForeground() with a notification — signals user-visible work." },
    { q: "WorkManager work request types?", options: ["Sync & Async", "Immediate & Delayed", "OneTime & Periodic", "Foreground & Background"], answer: 2, explanation: "OneTimeWorkRequest (runs once) and PeriodicWorkRequest (repeats, min 15 min)." },
    { q: "Which library + formats does the course use for networking?", options: ["Retrofit + Protobuf", "Volley + HTML", "OkHTTP + JSON and XML", "HttpClient + YAML"], answer: 2, explanation: "OkHTTP for HTTP requests, JSON and XML for parsing responses." },
    { q: "Minimum interval for a PeriodicWorkRequest?", options: ["1 minute", "5 minutes", "10 minutes", "15 minutes"], answer: 3, explanation: "Android enforces 15 minutes minimum to protect device battery life." },
    { q: "Which APK format is recommended for Google Play Store?", options: ["APK", "AAB (Android App Bundle)", "ZIP", "JAR"], answer: 1, explanation: "AAB is preferred — Google Play generates device-specific APKs from it, reducing download sizes." },
  ],
};

export const allTopics = [
  topic1, topic2, topic3, topic4, topic5, topic6,
  topic7, topic8, topic9, topic10, topic11, topic12,
];
