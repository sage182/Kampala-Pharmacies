# Kampala Pharmacy & Wellness Store

A responsive pharmacy storefront demo for Kampala, Uganda. The project showcases a product catalog, basket interactions, demo orders, and simulated order tracking.

## Features

- Product search and category filtering
- Add-to-basket shopping flow
- Quantity updates and removal from cart
- Demo customer order form
- Simulated order status tracking
- Mobile-friendly responsive layout

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Node.js for local and Railway deployment

## Local Development

1. Open a terminal in the project root.
2. Run:
   ```bash
   npm start
   ```
3. Visit:
   ```text
   http://localhost:3000
   ```

## GitHub Setup

Initialize the repository, add the remote, and push the main branch:

```bash
git init
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin https://github.com/sage182/Kampala-Pharmacies..git
git push -u origin main
```

> If the repository already exists in GitHub, use the exact repository URL and ensure you have access to it.

## Railway Deployment

1. Sign in to Railway.
2. Create a new project.
3. Import this repository from GitHub.
4. Railway will detect the Node.js app automatically using the provided `package.json` and `railway.json` configuration.
5. The app will start with the command:
   ```bash
   npm start
   ```
6. Deploy and visit the generated Railway URL.

## Project Notes

This is a student demo project and does not process actual payments or deliveries. It is intended for learning, showcasing UI and e-commerce interactions, and deployment practice.

## License

This project is licensed under the MIT License.
