# Tembo Health Secrets Store

This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

You must have node and npm installed to run this application

Go here: https://nodejs.org/en/download/

### Running the application

In your terminal, run the following from the project root:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Troubleshooting

This app already came bundles with the node modules needed as well as a production build. In case you run into any
errors,
run the following in your terminal from the project root before starting the application:

```bash
npm install
npm run build
```

## Notes for Improvement

Because this app was developed with a time constraint, certain shortcuts were taken and should be addressed before the
application can be production ready. They are detailed below.

1. This app is a bootstrapped Next.js app. In production, we may want to pull out the functions
   in `pages/api/shareSecret`
   to a common library so that the entire application can use them.
2. The CSS for the app is largely Bootstrap 5 with very minor customization. This would look different in production as
   we
   want to make sure we are following company standards to maintain a uniform look.
3. The passwords and secrets are currently being stored as plaintext. For production, we would want to add some form of
   encoding/hashing to protect user information.
4. Because the user was to remain anonymous, we are not collecting any data about them. However, we may want to collect
   metadata about them in the future for analytics.
5. The secrets are currently stored in the filesystem at `json/secrets.json`. This was specifically because of the time
   constraint as this was the most straightforward and lightweight option. For production, we would want to look into
   storing
   the secrets in a database. A relational DB would be useful if we want to connect secrets to users and for easy
   searching
   by id/password.
6. There are currently no tests for this project, as this is considered a proof of concept. Before it can be ready for
   production, we should strongly consider adding unit/integration tests.
7. Instead of using alerts on the front end, we could consider using modals or redirecting to new pages. Alerts are used
   due to time. 