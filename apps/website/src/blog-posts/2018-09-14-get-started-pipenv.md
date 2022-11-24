---
title:  "Reproducible Python project with Pipenv"
description: "Pipenv provides a simple way to create and manage independent Python environment as well as installing/removing packages.
Nowadays it is the recommended tool to handle your Python projects."
date: "2018-09-14"
categories: [Python]
image: pipenv.jpg
---

Pipenv[^1] provides a simple way to create and manage independent Python environment as well as installing/removing packages.
Nowadays it is the recommended tool to handle your Python projects.

## Why you should care

### Reproducibility

It is something important you always have to keep in mind for every project you are working on,
so that your team can collaborate or even for yourself if you go back to it.

For that purpose, you need to be able to create independent environments for every project so that you can choose
the right Python version that suits your needs.
More than that, it is important to specify library dependencies along with their version, ensuring a single way to
build the project.

### Facilitating your workflow

- Unifies different tools, no need to use `virtualenv` and `pip` separately.
- More robust dependencies details with Pipfile and Pipfile.lock files.
- Can separate development packages from production ones.
- Loads `.env` files.

## Get started

Be aware it is easy to dive in as it is compatible with `setup.py` and `requirements.txt`.

### Create a Python environment

```shell
pipenv --python 3.7
```

### Install packages

#### From scratch

```shell
pipenv install --dev matplotlib # To install development dependencies
pipenv install --dev numpy pandas sklearn # Otherwise
```

#### From a Pipfile

```shell
pipenv install --dev # To install all dependencies including development
pipenv install # Otherwise
```

### Activate your environment

```shell
pipenv shell
```

Activating the environment created in the working directory, making its dependencies available.

### Run your file

```shell
python my_script.py
```

## Links

[^1]: [Pipenv github repository](https://github.com/pypa/pipenv)
