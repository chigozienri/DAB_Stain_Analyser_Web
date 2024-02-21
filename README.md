# DAB Stain Analyser Web UI
This is a Next.js webapp that provides a UI for https://replicate.com/chigozienri/dab_stain_analyser

## Noteworthy files

- [src/app/page.tsx](src/app/page.tsx) - The React frontend that renders the home page in the browser
- [src/app/api/predictions/route.ts](src/app/api/predictions/route.ts) - The backend API endpoint that calls Replicate's API to create a prediction
- [src/app/api/predictions/[id]/route.ts](src/app/api/predictions/[id]/route.ts) - The backend API endpoint that calls Replicate's API to get the prediction result

## Usage

Get a copy of this repo:
```console
git clone https://github.com/chigozienri/DAB_Stain_Analyser_Web
cd DAB_Stain_Analyser_Web
```

Install dependencies:

```console
npm install
```

Add your [Replicate API token](https://replicate.com/account#token) to `.env.local`:

```
REPLICATE_API_TOKEN=<your-token-here>
```

Run the development server:

```console
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Deployment

```console
npm run build
npm run start
```

or see https://nextjs.org/docs/pages/building-your-application/deploying for other options including Docker
