---

### 2. `content/projects/worknest.md`

```markdown
# WorkNest: Automated Deployment Pipeline

**WorkNest** focuses on the structural engineering of scalable backend services, utilizing optimized cloud environments and automated release cycles to achieve zero-downtime deployments.

## The Infrastructure Challenge

Managing deployments manually introduces human error and creates bottlenecks. WorkNest required a robust CI/CD pipeline capable of testing, building, and deploying backend microservices seamlessly across different cloud hosting providers.

## CI/CD Pipeline Architecture

The deployment ecosystem was engineered to trigger automatically via GitHub release versions. The backend web application components were configured and successfully launched utilizing a dual-provider strategy across **Render** and **Vercel**.

*   **Version Control:** GitHub
*   **Automation:** GitHub Actions
*   **Hosting Providers:** Render (Stateful Services), Vercel (Edge Functions)
*   **Containerization:** Docker

## Deployment Webhook Configuration

Below is a snippet of the GitHub Actions configuration used to automate the deployment payload whenever a new project release is tagged.

```yaml
name: WorkNest Production Release

on:
  release:
    types: [published]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Trigger Render Deployment
        run: |
          curl -X POST \
          -H "Accept: application/json" \
          -H "Authorization: Bearer ${{ secrets.RENDER_API_KEY }}" \
          [https://api.render.com/v1/services/$](https://api.render.com/v1/services/$){{ secrets.RENDER_SERVICE_ID }}/deploys
