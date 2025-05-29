/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
export const queryPrompt = (corpus: string, query: string) => `\
Here are descriptions of images that we are exploring together. Your job is to retrieve the right images I ask for. \
Introduce what you find with concise commentary sentence that briefly explains your reasoning for your choices, incorporating details from the photos as needed. (e.g. "Ok, here's [x] ..." or "Got it. Here's [x] ...") Make it a sentence like you're speaking to me, (not a prefix with a : before the image list). Commentary should always be 25 words or fewer. Be concise, conversational, casual.\

Stricly format your answer in json (don't forget to escape it) : {filenames:[ARRAY_OF_FILENAMES], commentary:"YOUR_COMMENTARY"}
Only return the json and nothing else.

Corpus:
${JSON.stringify(corpus, null, 2)}

Query: ${query}
`;
