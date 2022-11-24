---
title: "Technical Debt in Machine Learning"
description: "I have come across a very interesting paper about Technical debt in Machine Learning."
date: "2018-10-12"
categories: [Papers]
image: article.jpg
---

I have come across a very interesting paper [^1] about Technical debt in Machine Learning.
Before going full Data Science, I was programming in Java during my internships, and I personally don't like the common excuse I can often read online "Data Scientist don't need to do proper code, it's not software development" justifying to produce bad code.

This article aims at summarizing the key issues highlighted in the paper while trying to provide answers to them.

## Introduction

To begin with, let's clarify the term of **Technical Debt**. It's usually used in software development, and "was defined by Ward Cunningham in 1992 to help reason about the long-term costs incurred by moving quickly in software engineering". Despite all debts are not evil, it is really important to be aware of them to reduce errors and ensure it's open to future improvements.

This paper argues that Machine Learning systems produce debts as inherent to every software development, but even ML-specific ones on top of that, and I couldn't agree more. The Data Science community is mainly focused on Kaggle competitions and state of the art techniques, but while you can gain a lot of knowledge on algorithms, it is also important to keep in mind best practices to put your model in production or just to easily collaborate.

## Code-related debts

### Entanglement

ML code cannot, in essence, be encapsulated because it makes use of a lot of external data, and mix them together to find value in it. The paper introduces an interesting notion: **CACE principle** i.e Changing Anything Changes Everything. It concerns inputs as well as hyperparameters, data selection ...

Unfortunately, it is hardly evitable, yet, it's important to keep the most control out of our model.

### Correction cascades

Most of the time, we can find data and a model to solve a problem A, but our problem is slightly different, thus we try to hack the model to make it solve our problem. The problem with this is that our code becomes A-model dependent and reduce the range of possible improvements.

When faced with such issue, I like to rewrite my own solution inspired by the model I found. As a consequence, I fully understand my model and I am free to modify it.

## Data-related debts

The paper argues Data-related debts are more costly than code-ones, making it difficult to build large data dependency.

### Unstable data dependencies

It is often tempting to use external features that are provided by external systems however they might be unstable, their structure and content could change. The paper advises to create a versioned copy of data, and I think it is a really good idea because, in spite of saving data, I'm not always sure what exact data was used to train a model.

For this purpose it could be interesting to take a look at tools like [DVC](https://dvc.org/), to keep data and code synced. I am planning to write a tutorial on it. There is also a really good project called [Pachyderm](http://www.pachyderm.io/) that runs on top of Kubernetes.

### Underutilized Data Dependencies

The paper points out several ways it can hurt a model.

- Legacy features: Feature was included in the first version of a model but not removed afterward despite being redundant.
- Bundled features: To get faster results, we sometimes pour all the features we have into the model even if not useful
- Epsilon-features: Simplicity is often sacrificed in favor of a small gain in accuracy

The takeaway of this paragraph is that it is important to spend time crafting and evaluating features to get better accuracy for the least complexity.

## Anti-Patterns

### Pipeline Jungles

Usually, this issue arises during the processing step, where we tend always add more and more sources and steps, generating intermediate files. This can quickly go out of control, making it difficult to detect an error and recover from failures. As highlighted, it requires a lot of work beforehand but it is an effort to make as it will save you a lot of time in the future.

Once again, DVC can help solve this issue or you can create DAGs with [Airflow](https://airflow.apache.org/) that you can visually inspect, as well as with Jenkins.

## Dealing with Changes

### Fixed Thresholds

It is quite common to define a decision threshold for a model in order to be the most relevant possible. For instance, in sentiment analysis, you could choose to pick a neutral sentiment if the negative or positive sentiment is not strong enough. Usually, these thresholds are empirically defined, and in addition to being a pain to maintain across all models, they are not robust. The probability for the model to encounter something he hasn't seen at all before it quite important and the threshold might become invalid.

### Monitoring

As opposed to data, models don't change unless retrained, thus it is good practice to continuously control output to check that predicted labels should follow a similar distribution than training labels. It enables to detect a drop in performance of the model quite early.

## Opinion

There are three main areas I have been trying to focus on since I am a Data Scientist at Mention because I believe there is the key to have a sane ML development cycle and promote collaboration.

First of all, a Data Scientist has to find one way or another (DVC, Airflow, Luigi, Jenkins ...) to manage pipelines. It is a core part of our jobs to run processing and training tasks and it is a huge gain to be able to automate the sequencing of steps. Waiting for a step to finish in order to launch the following step is not something you want if you want to be productive. It is even more frustrating when you tune some parameters and have to always re-run the same scripts.

Also, I advocate that Machine Learning code remains Software code and so you have to make your best to make it robust. Obviously, ML code is not easy to test as it is not always deterministic (Word2Vec in gensim for instance), yet, some sanity steps can be done concerning processing steps and predictions. To go further, I've lately started to type my Python code (possible since version 3.5) along with using PyCharm so that I can catch errors before running scripts, and I encourage you to do so.

As a consequence, every project you work on ought to be reproducible. To achieve this, it is necessary to version code with Git, and as it is specific to our domain, your data as well (with DVC or Pachyderm). In addition to that, I am quite opposed to notebooks like Jupyter, I think they tend to lead to bad habits and harder software creation. Related to this, I'm linking this interesting [^2] made at JupterCon 2018. Instead, I advise writing proper scripts whose parameters are given through the command line. It can easily be done with the Fire library [^3] that is a wrapper around argparse and reduce boilerplate.

## Links

[^1]: [SCULLEY, D., HOLT, Gary, GOLOVIN, Daniel, et al. Hidden technical debt in machine learning systems. In: Advances in neural information processing systems. 2015. p. 2503-2511.](https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems.pdf)
[^2]: [Jupyter Presentation](https://docs.google.com/presentation/d/1n2RlMdmv1p25Xy5thJUhkKGvjtV-dkAIsUXP-AL4ffI/edit#slide=id.g362da58057_0_1)
[^3]: [Fire library](https://github.com/google/python-fire)
