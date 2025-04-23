'use server';
/**
 * @fileOverview AI-powered suggestions for similar products based on the product I am currently viewing.
 *
 * - suggestSimilarProducts - A function that handles the similar product suggestion process.
 * - SuggestSimilarProductsInput - The input type for the suggestSimilarProducts function.
 * - SuggestSimilarProductsOutput - The return type for the suggestSimilarProducts function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SuggestSimilarProductsInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productDescription: z.string().describe('The description of the product.'),
  productCategory: z.string().describe('The category of the product.'),
  searchTerm: z.string().optional().describe('The search term used by the user.'),
});
export type SuggestSimilarProductsInput = z.infer<typeof SuggestSimilarProductsInputSchema>;

const SuggestSimilarProductsOutputSchema = z.object({
  similarProducts: z.array(
    z.object({
      name: z.string().describe('The name of the similar product.'),
      description: z.string().describe('A short description of the similar product.'),
      relevanceScore: z.number().describe('A score indicating how relevant the product is.'),
    })
  ).describe('A list of similar products with their descriptions and relevance scores.'),
});
export type SuggestSimilarProductsOutput = z.infer<typeof SuggestSimilarProductsOutputSchema>;

export async function suggestSimilarProducts(input: SuggestSimilarProductsInput): Promise<SuggestSimilarProductsOutput> {
  return suggestSimilarProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSimilarProductsPrompt',
  input: {
    schema: z.object({
      productName: z.string().describe('The name of the product.'),
      productDescription: z.string().describe('The description of the product.'),
      productCategory: z.string().describe('The category of the product.'),
      searchTerm: z.string().optional().describe('The search term used by the user.'),
    }),
  },
  output: {
    schema: z.object({
      similarProducts: z.array(
        z.object({
          name: z.string().describe('The name of the similar product.'),
          description: z.string().describe('A short description of the similar product.'),
          relevanceScore: z.number().describe('A score indicating how relevant the product is (0-1).'),
        })
      ).describe('A list of similar products with their descriptions and relevance scores.'),
    }),
  },
  prompt: `You are an AI assistant specializing in recommending similar products.

  Based on the details of the product that the user is viewing, suggest other products that they might be interested in.
  Return a list of similar products. Each similar product should have a name, a description, and a relevance score.

  Product Name: {{{productName}}}
  Product Description: {{{productDescription}}}
  Product Category: {{{productCategory}}}
  ${'{{#if searchTerm}}'}
  Search Term: {{{searchTerm}}}
  ${'{{/if}}'}

  Consider these factors when determining similarity:
  - Category: Products in the same category are more likely to be similar.
  - Features: Products with similar features are more likely to be similar.
  - Price: Products with a similar price range are more likely to be similar.
  - Brand: Products from the same brand may be similar.
  - Usage: Products that are used in similar ways may be similar.

  The relevance score should be between 0 and 1, with 1 being the most relevant and 0 being the least relevant.
  Do not suggest the same product that the user is currently viewing.
  Make sure each similar product has a different name than the current product.
`,
});

const suggestSimilarProductsFlow = ai.defineFlow<
  typeof SuggestSimilarProductsInputSchema,
  typeof SuggestSimilarProductsOutputSchema
>({
  name: 'suggestSimilarProductsFlow',
  inputSchema: SuggestSimilarProductsInputSchema,
  outputSchema: SuggestSimilarProductsOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
