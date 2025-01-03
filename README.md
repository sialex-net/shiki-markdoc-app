# Shiki syntax highlighting on Cloudflare Workers platform

An edge implementation of Shiki syntax highlighting, made with:

- Shiki JavaScript Engine
- Markdoc
- React Router 7
- Cloudflare Workers

This project has two main pieces:

- Service worker providing on-demand syntax highlighting ([sialex-net/shiki-markdoc-worker](https://github.com/sialex-net/shiki-markdoc-worker))
- Client app (this repo)

They are connected by [service binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/).

## Getting Started

### Installation

Install dependencies:

```bash
pnpm install
```

Get Workers runtime types:

```bash
pnpm cf:typegen
```

Set up `AUTH_KEY`. See included project files for details:

- `.example.dev.vars`
- `.example.dev.vars.json`

## Deployment

### Service Worker

Deploy to Cloudflare:

```bash
pnpm cf:deploy
```

Upload `AUTH_KEY` to Cloudflare:

```bash
pnpm cf:secrets
```

### Client App

Deploy to Cloudflare:

```bash
pnpm cf:deploy
```

Upload `AUTH_KEY` to Cloudflare:

```bash
pnpm cf:secrets
```

That's it!
