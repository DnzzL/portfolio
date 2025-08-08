---
title: 'Machine Learning with Kotlin'
description: 'As Kotlin can leverage the JVM ecosystem, there are already good libraries to get things done.'
pubDate: '2019-04-07'
categories: ['Kotlin']
heroImage: '/thumbnails/ml-with-kotlin.webp'
---

#### TLDR

You can find the whole source code on my [Github](https://github.com/DnzzL/kotlin-ml) here.

## Python: king of the hill

No wonder Python has become the reference language for Machine Learning: its easily readable syntax, strong community support, and easy setup make it a really strong choice and appealing to mathematics researcher as well as engineers. It is a really good compromise between research and production.

However, in a more professional context, one understands the limitations of the language. Although dynamic types are deeply appreciated during prototyping, it can become a real burden in production when you have to maintain code and libraries whose types are unclear to you. Duck typing is what made me dive into Python, but lately I am more and more convinced languages with static typing are better in every aspect. **Giving up on types is giving up on comprehension.** Indeed, with types, you get documentation for free, and it becomes way easier for anyone to review and maintain your code.
Also, it is a secret for no one that Python is slowish and is not the best when it comes to scalability because of the [GIL](https://wiki.python.org/moin/GlobalInterpreterLock) that prevents taking full advantage of multiprocessor systems for CPU-bound tasks. Plus, the known "two-language problem", writing a part of the code in Cython or C++ is not a viable future in my opinion.

## So what?

Based on this conclusion, more and more people are challenging the domination of Python for Machine Learning, the biggest uppercut being [Swift for Tensorflow](https://github.com/tensorflow/swift). I won't go too much into the details on this choice but I suggest you read the [explanation](https://github.com/tensorflow/swift/blob/master/docs/WhySwiftForTensorFlow.md) of the Tensorflow Team. TLDR: They wanted a language with static types to spot bugs early, already a strong community, an easy learning curve and the possibility to implement elegant differentiable programming.

Major entities in the field are already following the steps of Tensorflow, like [FastAi](https://www.fast.ai/2019/03/06/fastai-swift/) that plans to release a course as well as a Swift version of their library. As exciting as it is, the numerical ecosystem of Swift is still far from Python, it is hard to imagine everyone ditching Python anytime soon, but I think is good news to get to choose the best language for your use case and knowing the stack you already have.

In the same direction, I would like to point out the awesome work of Olivier Wulveryck bringing the [beginning](https://blog.owulveryck.info/2019/04/03/from-a-project-to-a-product-the-state-of-onnx-go.html) of ONNX to Golang, even opening the door to Web Assembly in order to run models entirely inside the browser.

The trend is really to have more choice for your end language when it comes to development.

## A new contender

### Kotlin in brief

Kotlin is a language developed by JetBrains that can be run by the JVM, Android, the browser and even native.
It was meant from the start to be a production-ready language and a real alternative for Java in the future.
Its syntax is concise, the language has null safety, already comes with a large ecosystem as it is possible to seamlessly use existing JVM, Android and even JS libraries and the development is really smooth thanks to JetBrains IDE like IntelliJ Idea.
Learning the language shouldn't be difficult for Pythonistas as the syntax is really similar, but you will benefit from static types.

Even if rankings are not always reliable, we can see the big momentum Kotlin has in the last [Redmonk ranking](https://redmonk.com/sogrady/2019/03/20/language-rankings-1-19/), its growth being second only to Swift in the history of the rankings. Historically, Kotlin has been mostly used for Android but it is starting to be a choice for backend development as a replacement for Java and even frontend to work bring types in the Javascript ecosystem. JetBrains has even released [wrappers for React](https://github.com/JetBrains/kotlin-wrappers).

### Machine Learning ecosystem for Kotlin

As Kotlin can leverage the JVM ecosystem, there are already good libraries to get things done.

| Purpose                     |             Python             |                                                                                     JVM                                                                                      |
| :-------------------------- | :----------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Scientific computing        |             Numpy              |                                                         [ND4J](https://deeplearning4j.org/docs/latest/nd4j-overview)                                                         |
| Dataframe                   |             Pandas             |                            [Krangl (Kotlin)](https://github.com/holgerbrandl/krangl) or [Tablesaw (Java)](https://github.com/jtablesaw/tablesaw)                             |
| Visualization               | Altair or Plotly or Matplotlib | [Vegas (Scala)](https://github.com/vegas-viz/Vegas) or [Tablesaw (Java)](https://github.com/jtablesaw/tablesaw) or [Kravis (Kotlin)](https://github.com/holgerbrandl/kravis) |
| Machine Learning            |            Sklearn             |                                                                  [Smile](https://github.com/haifengl/smile)                                                                  |
| Natural Language Processing |             Spacy              |                                                              [CoreNLP](https://stanfordnlp.github.io/CoreNLP/)                                                               |

In term of features, I think these alternatives can fill all your needs except maybe for Grid Search that is not available as is in Smile contrary to Sklearn.

Other than this, as a Kotlin user, of course, you would have access to the whole Spark ecosystem.

JVM even has its own Deep Learning framework [DL4J](https://deeplearning4j.org/) that can integrate with Keras and really has awesome documentation.

All things considered, I think Kotlin has the ability to be a really good fit for Machine Learning as presented by Thomas Nield[^1] during the KotlinConf.

## End-to-end example

For this tutorial, I have tried Krangl that has a very nice syntax but unfortunately doesn't easily integrate with Smile.

So I have decided to use Apache Spark for this tutorial, where I want to reproduce the steps of my [precedent post](/python/2018/12/09/share-and-deploy-ml-services.html).

### Using Spark with Kotlin

All the code for this example is available on my [GitHub](https://github.com/DnzzL/kotlin-ml)

First, we need to add Spark dependencies. You can find all the details on [mvnrepository](https://mvnrepository.com/).

Then, we configure the Spark session in our `Main.kt`.

We are still working on our `iris.csv` dataset, so we import the data.
We specify that the data has a header and that we want the schema to be inferred.

```kotlin
val iris = spark.read()
    .format("csv")
    .option("header", "true")
    .option("inferSchema", "true")
    .csv("src/main/resources.iris.csv")
```

After this, we need to encode our target for later

```kotlin
val indexer = StringIndexer()
    .setInputCol("species")
    .setOutputCol("label")
    .fit(iris)

val indexed = indexer.transform(iris)
```

It is now time to define our pipeline. To begin with, we define the columns that will be used as inputs and the target.
Like the precedent post, we run a Principal Component Analysis and a Logistic Regression.

```kotlin
val assembler = VectorAssembler()
    .setInputCols(arrayOf("sepal_length", "sepal_width", "petal_length", "petal_width"))
    .setOutputCol("features")

val pca = PCA()
    .setInputCol("features")
    .setOutputCol("pcaFeatures)
    .setK(2)

val lr = LogisticRegression()
    .setMaxIter(10)
    .setRegParam(0.1)
    .setElasticNetParam(0.8)
    .setFeaturesCol(pca.outputCol)
    setLabelCol("label")

val pipeline = Pipeline().setStages(arrayOf(assembler, pca, lr))
```

Finally, we train the full pipeline with a 3 K-Fold Cross-validation.

```kotlin
val paramGrid = ParamGridBuilder()
    .addGrid(pca.k(), intArrayOf(2, 3))
    .addGrid(lr.regParam(), doubleArrayOf(0.1, 0.001))
    .build()

val cv = CrossValidator()
    .setEstimator(pipeline)
    .setEvaluator(MulticlassClassificationEvaluation())
    .setEstimatorParamMaps(paramGrid)
    .setNumFolds(3)
    .setSeed(12)

val cvModel = cv.fit(indexed)
```

## Conclusion

We were able to reproduce the pipeline from the precedent post quite easily.
However, Spark is not necessarily suited for small tasks and might be overkill.
It would be interesting to bridge the gap between Krangl and Smile to get a really neat experience.

I think Kotlin could have a role to play in Machine Learning due to its syntax and all the ecosystem it has access to. It feels very similar to Python in term of syntax but it is statically typed.

## Links

[^1]: [Kotlin for Data Science!](https://resources.jetbrains.com/storage/products/kotlinconf2017/slides/kotlin_for_data_science.pdf)
