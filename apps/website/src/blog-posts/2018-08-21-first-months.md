---
title: "What does a Data Scientist do on a daily basis?"
description: "Data Scientist is often presented as the trendy job at the moment. As a consequence, many, including myself, try to find their way to get this job."
date: "2018-08-20"
categories: [Others]
image: first-months.jpg
---

Data Scientist is often presented as the trendy job at the moment. As a consequence, many, including myself, try to find their way to get this job. As courses are sometimes very theoretical, hopefully [Kaggle](https://www.kaggle.com/) competitions are there to give a taste of applied Machine Learning. Yet, it is hard to picture what a Data Scientist is really doing on a daily basis. I will try to give some insights I would have liked to know earlier, after several months of experience.

## The basics

Despite you won't do the calculations by yourself, it is important to know what is going on under the hood to be able to debug or improve your models.

Statistics is used in exploratory phase to get to know the data, make some transformations, look distributions.
Linear Algebra is involved in all matrix operations and is required to understand norms and distance between vectors.
And of course, algorithms and optimization to find the most suitable way to solve the problem with complexity and scalability in mind.

I won't go further into details as many sources[^1] already talk about it.

## Handling data

Before going into the fancy algorithms, you will need to spend a lot of time getting your data. Depending on the sources, you might need to do some **SQL** queries if it is on a database, or get to know some **APIs**. For example, at Mention, I have to know Twitter and Facebook APIs to get an idea of what is achievable and how to gather it.

Data is then often stored in a **database**, or as **CSV** or **JSON** files. A lot of time is spent to get a nice, clean and, if possible, a single file. This is the most important step in the data science workflow, as the motto says:

> Garbage in, garbage out.

When a model is trained, it is usually stored as a **pickle** or **h5** file.

## Don’t overdo it

It is really tempting now that the dirty work is done to make fun and benchmark every algorithm on earth. However, let's be honest, many daily problems can be solved thanks to statistics. _Machine Learning isn't always the go-to solution_, especially when you don't have a lot of data. They are also easier to explain, to debug and to implement. About that topic, I recommend a really interesting talk[^2] from Vincent D. Warmerdam. To sum up, solutions should not be tool-oriented, that is to say, based on algorithms, but rather data-oriented. After all, we are doing Data Science! It is indeed really beneficial to get a good vision of your data, you'll then know what actions to take. It is also a good reason to not forget your math skills.

Yet, nobody argues that Machine Learning enables to solve problems that could hardly be solved in another way. Concerning learning materials, I strongly recommend the famous Coursera Mooc[^3] designed by the famous Andrew Ng or the John Hopkins Mooc[^4].

## Work in a team

Competitions are a thing, but working as a part as a team in a firm is a totally different story. **Reproducibility** is a key concept in every team, it is a guarantee of quality and maintainability. Using **Git** is a necessity, as well as setting a development environment for every project you work on, to make them independent. For that purpose, the recommended tool is **Pipenv**, which enables you to create a Python environment as simple as `pipenv --python 3.6` and install dependencies. The main benefit compared to Pip is being able to separate dev packages, like matplotlib, from production ones. The best would even be to use **Docker** to ensure your service will work for every configuration.

_Data Scientist is a job at the crossroads of many topics in which you'll learn every day._

## Links

[^1]: [The Mathematics of Machine Learning](https://towardsdatascience.com/the-mathematics-of-machine-learning-894f046c568)
[^2]: [Winning with Simple, even Linear, Models](https://www.youtube.com/watch?v=68ABAU_V8qI)
[^3]: [Machine Learning MOOC](https://www.coursera.org/course/ml)
[^4]: [Practical Machine Learning MOOC](https://fr.coursera.org/learn/practical-machine-learning)
