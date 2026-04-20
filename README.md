# Old Man Drawio

[![Build and Publish Docker Image](https://github.com/pimonteiro/old-man-drawio/actions/workflows/docker-build.yml/badge.svg)](https://github.com/pimonteiro/old-man-drawio/actions/workflows/docker-build.yml)


A purposefully simplified, touch-optimized drawing application tailored specifically for elderly users on tablets.

## Use Case
This project was born out of a need for an easy-to-use, stripped-down alternative to complex drawing apps. It removes confusing options, overwhelming menus, and visual clutter. Instead, it provides a very straightforward and accessible interface focusing on standard line drawing, image imports as drawing objects, and reliable automatic saving. It is built to be extremely intuitive for those who may not be highly technical or familiar with modern, complex UI paradigms.

## Disclaimer
> **Note:** This application was 100% **vibe-coded**. 

The architecture, tooling, and designs were led heavily through iterative agentic prompt engineering rather than rigid pre-planning. Expect creative, rapidly prototyped solutions to functional requests.

## Deployment
This repository is configured to build a Dockerfile through GitHub Actions. Pushes to the `main` branch automatically build and publish a Docker image to `ghcr.io` that serves the final lightweight static site utilizing Nginx.
