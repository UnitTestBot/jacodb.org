export default {
    getDeclaredMethods: {
        java: `
            class Example {
                public static MethodNode findNormalDistribution() throws Exception {
                    File commonsMath32 = new File("commons-math3-3.2.jar");
                    File commonsMath36 = new File("commons-math3-3.6.1.jar");
                    File buildDir = new File("my-project/build/classes/java/main");
                    JcDatabase database = JacoDB.async(
                            new JcSettings()
                                    .useProcessJavaRuntime()
                                    .persistent("/tmp/compilation-db/" + System.currentTimeMillis()) // persist data
                    ).get();
                    
                    // Let's load these three bytecode locations
                    database.asyncLoad(Arrays.asList(commonsMath32, commonsMath36, buildDir));
            
                    // This method just refreshes the libraries inside the database. If there are any changes in libs then
                    // the database updates data with the new results.
                    database.asyncLoad(Collections.singletonList(buildDir));
            
                    // Let's assume that we want to get bytecode info only for "commons-math3" version 3.2.
                    JcClassOrInterface jcClass = database.asyncClasspath(Arrays.asList(commonsMath32, buildDir))
                            .get().findClassOrNull("org.apache.commons.math3.distribution.NormalDistribution");
                    System.out.println(jcClass.getDeclaredMethods().size());
                    System.out.println(jcClass.getAnnotations().size());
                    System.out.println(JcClasses.getConstructors(jcClass).size());
            
                // At this point the database read the method bytecode and return the result.
                return jcClass.getDeclaredMethods().get(0).body();
            }
        }`,
        kotlin: `
        suspend fun findNormalDistribution(): Any {
        val commonsMath32 = File("commons-math3-3.2.jar")
        val commonsMath36 = File("commons-math3-3.6.1.jar")
        val buildDir = File("my-project/build/classes/java/main")
        val database = jacodb {
            useProcessJavaRuntime()
            persistent("/tmp/compilation-db/" + System.currentTimeMillis()) // persist data
        }

            // Let's load these three bytecode locations
            database.load(listOf(commonsMath32, commonsMath36, buildDir))

            // This method just refreshes the libraries inside the database. If there are any changes in libs then
            // the database updates data with the new results.
            database.load(listOf(buildDir))

            // Let's assume that we want to get bytecode info only for "commons-math3" version 3.2.
        val jcClass = database.classpath(listOf(commonsMath32, buildDir))
            .findClass("org.apache.commons.math3.distribution.NormalDistribution")
        println(jcClass.declaredMethods.size)
        println(jcClass.constructors.size)
        println(jcClass.annotations.size)

        // At this point the database read the method bytecode and return the result.
        return jcClass.methods[0].body()
    }`
    },

    watchFileSystem: {
        java: `
                public static void watchFileSystem() throws Exception {
        JcDatabase database = JacoDB.async(new JcSettings()
            .watchFileSystem()
            .useProcessJavaRuntime()
            .loadByteCode(Arrays.asList(lib1, buildDir))
            .persistent("", false)).get();
            }
        
        
            // A user rebuilds the buildDir folder.
            // The database re-reads the rebuilt directory in the background.`,
        kotlin: `
        val database = jacodb {
        watchFileSystem()
        useProcessJavaRuntime()
        loadByteCode(listOf(lib1, buildDir))
        persistent("")
    }

    // A user rebuilds the buildDir folder.
    // The database re-reads the rebuilt directory in the background.`
    },

    getTypeInformation: {
        java: `
        public static class A<T> {
            T x = null;
        }

        public static class B extends A<String> {
        }

        public static void typesSubstitution() {
            JcClassType b = (JcClassType)classpath.findTypeOrNull("org.jacodb.examples.JavaReadMeExamples.B");
            JcType xType = b.getFields()
                    .stream()
                    .filter(it -> "x".equals(it.getName()))
                    .findFirst().get().getFieldType();
            JcClassType stringType = (JcClassType) classpath.findTypeOrNull("java.lang.String");
            System.out.println(xType.equals(stringType)); // will print \"true\"
        }`,
        kotlin: `
            open class A<T>(val x: T)

            class B(x: String): A<String>(x)
        
            suspend fun typesSubstitution() {
                val db = jacodb {
                    loadByteCode(listOf(File("all-classpath")))
                }
                val classpath = db.classpath(listOf(File("all-classpath")))
                val b = classpath.findClass<B>().toType()
                println(b.fields.first { it.name == "x"}.fieldType == classpath.findClass<String>().toType()) // will print \"true\"
            }`
    },

    refreshDatabase: {
        java: `
            public static void refresh() throws Exception {
                    JcDatabase database = JacoDB.async(
                        new JcSettings()
                        .watchFileSystem()
                        .useProcessJavaRuntime()
                        .loadByteCode(Arrays.asList(lib1, buildDir))
                        .persistent("...")
                    ).get();
            
                    JcClasspath cp = database.asyncClasspath(Collections.singletonList(buildDir)).get();
                    database.asyncRefresh().get(); // does not affect cp classes
            
                    JcClasspath cp1 = database.asyncClasspath(Collections.singletonList(buildDir)).get(); // will use new version of compiled results in buildDir
                }
            `,
        kotlin: `
            val database = jacodb {
                watchFileSystem()
                useProcessJavaRuntime()
                loadByteCode(listOf(lib1, buildDir))
                persistent("")
            }
    
            val cp = database.classpath(listOf(buildDir))
                database.refresh() // does not affect cp classes
        
            val cp1 = database.classpath(listOf(buildDir)) // will use new version of compiled results in buildDir
        `},

    autoProcessing: {
        java: `
            public static void autoProcessing() throws Exception {
                JcDatabase database = JacoDB.async(
                    new JcSettings()
                        .loadByteCode(Arrays.asList(lib1))
                        .persistent("...")
                ).get();
        
                JcClasspath cp = database.asyncClasspath(Collections.singletonList(buildDir)).get(); // database will automatically process buildDir
        
            }
      
              
              `,
        kotlin: `
            val database = jacodb {
                loadByteCode(listOf(lib1))
                persistent("")
            }

            val cp = database.classpath(listOf(buildDir)) // database will automatically process buildDir
            `},

    newThread: {
        java: `
            class Example {
                public static void main(String[] args) {
                    val db = JacoDB.async(new JcSettings()).get();
            
                    new Thread(() -> db.asyncLoad(Arrays.asList(lib1, lib2)).get()).start();
            
                    new Thread(() -> {
                        // maybe created when lib2 or both are not loaded into database
                        // but buildDir will be loaded anyway
                        var cp = db.asyncClasspath(buildDir).get();
                    }).start();
                }
            }
              `,
        kotlin: `
                val db = jacodb {
                    persistent("")
                }
            
                thread(start = true) {
                    runBlocking {
                        db.load(listOf(lib1, lib2))
                    }
                }
            
                thread(start = true) {
                    runBlocking {
                        // maybe created when lib2 or both are not loaded into database
                        // but buildDir will be loaded anyway
                        val cp = db.classpath(listOf(buildDir))
                    }
                }
            
            `},


    customApplicationGraph: {
        java: `
            List\<String\> bannedPackages = new ArrayList\<\>();
            bannedPackages.addAll(ApplicationGraphFactory.getDefaultBannedPackagePrefixes());
            bannedPackages.add("my.package.that.wont.be.analyzed");
            
            JcApplicationGraph customGraph = ApplicationGraphFactory
                .asyncNewApplicationGraphForAnalysis(classpath, bannedPackages)
                .get();
               
            // Launch some analysis using customGraph...
            `,
        kotlin: `
            val bannedPackages = defaultBannedPackagePrefixes
                .plus("my.package.that.wont.be.analyzed")
                
            val customGraph = runBlocking {
                classpath.newApplicationGraphForAnalysis(bannedPackages)
            }
            
            // Launch some analysis using customGraph...
        `},

    runAnalysisExample: {
        java: `
            List\<JcMethod\> methodsToAnalyze = analyzedClass.getDeclaredMethods();
            JcApplicationGraph applicationGraph = ApplicationGraphFactory
                    .asyncNewApplicationGraphForAnalysis(classpath, null)
                    .get();
            UnitResolver\<\?\> resolver = UnitResolversLibrary.getMethodUnitResolver();
            IfdsUnitRunner runner = RunnersLibrary.getUnusedVariableRunner();
    
            AnalysisMain.runAnalysis(
                    applicationGraph,
                    resolver,
                    runner,
                    methodsToAnalyze,
                    Integer.MAX_VALUE
            );
            `,
        kotlin: `
            val applicationGraph = runBlocking { 
                classpath.newApplicationGraphForAnalysis()
            }
            
            val methodsToAnalyze = analyzedClass.declaredMethods
            val unitResolver = MethodUnitResolver
            val runner = UnusedVariableRunner

            runAnalysis(applicationGraph, unitResolver, runner, methodsToAnalyze)
        `},
}