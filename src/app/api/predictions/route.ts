import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {

  const data = await req.formData();
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  const prediction = await replicate.predictions.create({
    // Pinned version of https://replicate.com/chigozienri/dab_stain_analyser
    version: "f04dcea96d3a9ae0be7c706327c72078eef168d7a070f9cb9ef7189aa01bdb9a",

    // The inputs that will be submitted by a form on the frontend
    input: {
      // Send image as base64 URL
      image: data.get('image') ? await (data.get('image') as File).arrayBuffer().then(buffer => 'data:image/jpeg;base64,' + Buffer.from(buffer).toString('base64')) : 'https://replicate.delivery/pbxt/K1320zMQQgRHzlFxpPHkZr1dOwKU3tUvx9MmCZyElq5qdGeR/Example_Image.tif',
      asyn_LMean: data.get('asyn_LMean') ? parseFloat(data.get('asyn_LMean') as string) : 38.35,
      asyn_aMean: data.get('asyn_aMean') ? parseFloat(data.get('asyn_aMean') as string) : 27.75,
      asyn_bMean: data.get('asyn_bMean') ? parseFloat(data.get('asyn_bMean') as string) : 24.9,
      asyn_thres: data.get('asyn_thres') ? parseFloat(data.get('asyn_thres') as string) : 15,
      cell_LMean: data.get('cell_LMean') ? parseFloat(data.get('cell_LMean') as string) : 75.4,
      cell_aMean: data.get('cell_aMean') ? parseFloat(data.get('cell_aMean') as string) : 5.5,
      cell_bMean: data.get('cell_bMean') ? parseFloat(data.get('cell_bMean') as string) : -3.4,
      cell_thres: data.get('cell_thres') ? parseFloat(data.get('cell_thres') as string) : 6,
    }
  });

  if (prediction?.error) {
    return new Response(
      JSON.stringify({ detail: prediction.error.detail }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify(prediction),
    { status: 201 }
  );
}