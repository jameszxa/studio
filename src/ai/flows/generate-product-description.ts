// src/ai/flows/generate-product-description.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating product descriptions using AI.
 *
 * - generateProductDescription - A function that generates a product description based on input.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  category: z.string().describe('The category of the product.'),
  keywords: z.string().describe('Keywords related to the product, separated by commas.'),
});
export type GenerateProductDescriptionInput = z.infer<
  typeof GenerateProductDescriptionInputSchema
>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated product description.'),
});
export type GenerateProductDescriptionOutput = z.infer<
  typeof GenerateProductDescriptionOutputSchema
>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput
): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {
    schema: z.object({
      productName: z.string().describe('The name of the product.'),
      category: z.string().describe('The category of the product.'),
      keywords: z.string().describe('Keywords related to the product.'),
    }),
  },
  output: {
    schema: z.object({
      description: z.string().describe('The generated product description.'),
    }),
  },
  prompt: `You are an expert copywriter specializing in writing compelling product descriptions.

  Based on the following information, generate a product description that is engaging, informative, and persuasive. The description should highlight the key features and benefits of the product.

  Product Name: {{{productName}}}
  Category: {{{category}}}
  Keywords: {{{keywords}}}

  Write a product description.`,
});

const generateProductDescriptionFlow = ai.defineFlow<
  typeof GenerateProductDescriptionInputSchema,
  typeof GenerateProductDescriptionOutputSchema
>(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
