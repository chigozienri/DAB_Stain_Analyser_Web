"use client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

import { Prediction } from "replicate";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Home() {

  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUploaded(!!e.target.files?.length);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageUploaded) {
      // TODO: Modal to warn user of missing image, not just console.log
      console.log("Please upload an image before submitting.");
      return;
    }

    const response = await fetch("/api/predictions", {
      method: "POST",
      body: new FormData(e.currentTarget),
    });

    let prediction = await response.json();
    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }
    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id, { cache: 'no-store' });
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction });
      setPrediction(prediction);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="flex flex-col z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex bg-white p-10 border-solid border-2 border-gray-300 rounded-3xl">
        <Head>
          <title>DAB Stain Analyser</title>
        </Head>

        <p className="mb-4 text-lg text-gray-700">
          DAB Stain Analyser:{" "}
        </p>
        <p className="mb-4 text-lg text-gray-700">
          <a href="https://replicate.com/chigozienri/dab_stain_analyser" className="text-blue-500 hover:underline">
            Run with an API
          </a>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          <div className="flex items-center space-x-2">
            <label htmlFor="image" className="text-sm font-medium text-gray-700">image:</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageUpload}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="asyn_LMean" className="text-sm font-medium text-gray-700">asyn_LMean:</label>
            <input
              type="number"
              id="asyn_LMean"
              name="asyn_LMean"
              step="0.01"
              defaultValue="38.35"
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="asyn_aMean" className="text-sm font-medium text-gray-700">asyn_aMean:</label>
            <input
              type="number"
              id="asyn_aMean"
              name="asyn_aMean"
              step="0.01"
              defaultValue="27.75"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="asyn_bMean" className="text-sm font-medium text-gray-700">asyn_bMean:</label>
            <input
              type="number"
              id="asyn_bMean"
              name="asyn_bMean"
              step="0.01"
              defaultValue="24.9"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="asyn_thres" className="text-sm font-medium text-gray-700">asyn_thres:</label>
            <input
              type="number"
              id="asyn_thres"
              name="asyn_thres"
              step="0.01"
              defaultValue="15"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="cell_LMean" className="text-sm font-medium text-gray-700">cell_LMean:</label>
            <input
              type="number"
              id="cell_LMean"
              name="cell_LMean"
              step="0.01"
              defaultValue="75.4"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="cell_aMean" className="text-sm font-medium text-gray-700">cell_aMean:</label>
            <input
              type="number"
              id="cell_aMean"
              name="cell_aMean"
              step="0.01"
              defaultValue="5.5"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="cell_bMean" className="text-sm font-medium text-gray-700">cell_bMean:</label>
            <input
              type="number"
              id="cell_bMean"
              name="cell_bMean"
              step="0.01"
              defaultValue="-3.4"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="cell_thres" className="text-sm font-medium text-gray-700">cell_thres:</label>
            <input
              type="number"
              id="cell_thres"
              name="cell_thres"
              step="0.01"
              defaultValue="6"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 mt-4 w-full bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Go!
          </button>
        </form>

        {error && <div className="mt-4 text-red-500">{error}</div>}

        {prediction && (
          <div className="mt-4">
            {prediction.output && (
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex items-center space-x-2">
                  <p>Combined image:</p>
                  <Image
                    src={prediction.output[0]}
                    alt="output"
                    width={500}
                    height={500}
                    className="object-cover w-full h-full rounded-md border-gray-300"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <h2>aSyn mask:</h2>
                  <Image
                    src={prediction.output[1]}
                    alt="output"
                    width={500}
                    height={500}
                    className="object-cover w-full h-full rounded-md border-gray-300"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <h2>cell mask:</h2>
                  <Image
                    src={prediction.output[2]}
                    alt="output"
                    width={500}
                    height={500}
                    className="object-cover w-full h-full rounded-md border-gray-300"
                  />
                </div>
              </div>
            )}
            <p className="mt-4 text-lg text-gray-700">status: {prediction.status}</p>
          </div>
        )}
      </div>
    </main>
  )
}
