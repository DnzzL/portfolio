---
layout: post
title: "Brand new website hosted on Dokku"
description: "I've decided to refresh my personal website."
date: "2021-04-07"
categories: [Dokku]
---

## A crazy 2020 year

2020 has been crazy for obvious reasons, but also on the personal side as I changed of company to join Ornikar, a leading digital driving school in France where I joined a Data team of 3 members that has been growing since then.

For all these reasons, I didn't take the time to write new blog posts and my previous site was feeling empty.
So, recently, I've decided to recreate my site from scratch while keeping my articles written in Markdown, and little did I know it was going to be painful!

## More emphasis on projects

Likewise, I have been writing less articles because I've spent quite some time on personal projects that eventually gained some traction like [Encadrement](https://www.encadrement-loyers.fr). Indeed, we (Aymeric and I) had the chance to be invited to the town hall of Paris and we have been contacted by the famous [Fondation Abbé Pierre](https://www.fondation-abbe-pierre.fr/), an association whose mission is to enable any person in need to have access to decent housing and a dignified life, to create a barometer of compliance to the rent control law.

As a consequence, I'll write **more short posts about the evolution of my current projects**.

## Brand new website

I wanted to become less dependent of Heroku, on which I heavily rely on for my personal project, so I decided to buy a 5 $ DigitalOcean droplet and deploy a self-hosted [**Dokku**](https://github.com/dokku/dokku): a docker-powered PaaS that helps you build and manage the lifecycle of applications and my personal website was the perfect first project to battle-test this brand new infrastructure. It's really trivial to do in a click as DigitalOcean already has an App Image.

To complete the setup, I followed [this tutorial](https://richardwillis.info/blog/monitor-dokku-server-prometheus-loki-grafana) to get a Promethes-Loki-cAdvisor-Grafana monitoring suite because what's the point of doing a personal project if not to overkill it!

## Deployment with Dokku

To deploy with Dokku, first ssh into your host machine and

```bash
dokku apps:create my_app
```

then you have two choice, add a new remote to your project (a good thing to do when you iterate at the beginning of the project)

```bash
git remote add dokku dokku@DOKKU_HOST:my_app
git push dokku main:master
```

or as a part of your GitHub workflow, once you have defined the secrets in the settings of your project repository:

- SSH_PRIVATE_KEY: the ssh private key of the dokky host, [generate a new one](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) if you don't have one yet
- DOKKU_HOST: the IP address of your dokku server
- DOKKU_APP_NAME: the name of the app you want to deploy

```yml
name: Deploy to dokku
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-20.04
    env:
      NODE_OPTIONS: "--max_old_space_size=4096"
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - id: deploy
        name: Deploy to dokku
        uses: idoberko2/dokku-deploy-github-action@v1
        with:
          ssh-private-key: ${{ secrets.SSH_PRIVATE_KEY }}
          dokku-host: ${{ secrets.DOKKU_HOST }}
          app-name: ${{ secrets.DOKKU_APP_NAME }}
```

once this is configured, everytime you push to master or merge a Pull Request the deploy will be triggered.

This website is based on React and Tailwind CSS, so I use the following multi stage Dockerfile to deploy

```docker
FROM node:15 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN GENERATE_SOURCEMAP=false npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

I had to trigger `GENERATE_SOURCEMAP=false` otherwise I was having a `Javascript heap out of memory` error even after I increased my swap size.

In the end, **welcome to my brand new website**!

You can find the whole source code on my [Github](https://github.com/dnzzl/portfolio) here.
