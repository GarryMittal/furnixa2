<div align="center">

# Furnixa

### Furniture marketplace with live chat & video-call assembly support

Buy a piece of furniture, then video-call a specialist the moment it arrives to help you put it together — instead of guessing from a paper manual.

React, Node.js, TypeScript, PostgreSQL — deployed on AWS ECS (Fargate) behind an Application Load Balancer.

**Live:** https://www.furnixa.org

</div>
---

## Screenshots

| Homepage | Shop | Product detail |
|---|---|---|
| ![Homepage](.github/screenshots/furnixa.org_home.png) | ![Shop](.github/screenshots/furnixa.org_shop.png) | ![Product detail](.github/screenshots/furnixa.org_productdetails.png) |

| Admin dashboard | Orders | Order support | Order video call |
|---|---|---|---|
| ![Admin dashboard](.github/screenshots/furnixa.org_admin.png) | ![Orders](.github/screenshots/furnixa.org_orders.png) | ![Order support](.github/screenshots/furnixa.org_order_support.png) | ![Order video call](.github/screenshots/www.furnixa.org_orders_call.png) |

---

## Features

**Customer**
Browse by category, product detail pages, cart, checkout, order history with real-time status, video consultation on paid orders, Clerk authentication, responsive design.

**Admin**
Product CRUD, multi-image upload via ImageKit, category and active/inactive management, order visibility across all customers.

**Payments**
Polar Checkout integration, checkout-return handling, order creation on confirmed payment.

**Communication**
Stream Video SDK for post-purchase assembly consultation calls.

**Monitoring**
Sentry error tracking, performance tracing, session replay.

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, React Router, TanStack Query, Clerk |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL, Drizzle ORM |
| Payments | Polar |
| Media | ImageKit |
| Video | Stream Video SDK |
| Monitoring | Sentry |
| Infra | Docker, AWS ECR, AWS ECS (Fargate), Application Load Balancer |

---

## Why these choices

- **One Docker image, not separate frontend/backend services** — Express serves the built React app directly. Simpler to deploy and reason about for a project this size; a split deployment would add operational overhead without a real benefit yet.
- **ECS Fargate over Lambda** — the app is a long-running Express server with a persistent DB connection pool, which fits a container model more naturally than a request-scoped function.
- **Drizzle over Prisma** — SQL-first schema definitions and lighter runtime, at the cost of a smaller ecosystem than Prisma's.
- **Separate `productImages` table over a single `imageUrl` column** — products can have multiple photos (different angles) with one marked primary, rather than being limited to a single image per product.

---

## Architecture

```
                     User
                      │
                      ▼
        Application Load Balancer (HTTPS)
                      │
                      ▼
              AWS ECS (Fargate)
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
  React (static build)      Express REST API
                                    │
              ┌─────────────┬───────┴───────┬─────────────┐
              ▼             ▼               ▼             ▼
           Clerk       PostgreSQL       ImageKit    Polar / Stream
```

**Deployment path:** GitHub → `docker build` → push to Amazon ECR → ECS service pulls new image → ALB routes traffic → `www.furnixa.org`.

Currently built and pushed manually; automating this via GitHub Actions is the next infra improvement (see below).

---

## Docker

Single production image: builds the React frontend, compiles the Express/TypeScript backend, and serves the frontend through Express — one container, one process.

```bash
docker build -t furnixa .
docker run -p 3001:3001 furnixa
```

---

## Environment variables

**Backend**
```env
DATABASE_URL=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
POLAR_ACCESS_TOKEN=
POLAR_WEBHOOK_SECRET=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
STREAM_API_KEY=
STREAM_SECRET=
SENTRY_DSN=
FRONTEND_URL=
```

**Frontend**
```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_IMAGEKIT_URL_ENDPOINT=
VITE_SENTRY_DSN=
VITE_API_URL=
```

---

## Local development

```bash
git clone https://github.com/GarryMittal/furnixa.git

cd frontend && npm install && npm run dev
cd backend && npm install && npm run dev
```

---

## Future improvements

- CI/CD via GitHub Actions (auto build/push to ECR, auto ECS deploy on merge)
- Automated tests (currently none)
- Wishlist, product reviews, search & filters
- Email notifications
- Inventory management, coupons/discounts
- Analytics dashboard

---

## Author

**Garry Mittal** — Full-stack developer

[GitHub](https://github.com/GarryMittal) · [LinkedIn](https://www.linkedin.com/in/garry-mittal/) · [furnixa.org](https://www.furnixa.org)

---

If this project was useful or interesting, a star is appreciated.