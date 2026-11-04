import { APIRequestContext } from '@playwright/test';

export type AboutData = {
  companyName: string;
  productName: string;
  version: string;
  numberOfActiveEmployee: number;
  numberOfPastEmployee: number;
};

type AboutApiResponse = {
  data: AboutData;
  meta: unknown[];
  rels: unknown[];
};

export async function getAboutData(
  request: APIRequestContext,
  endpoint: string,
): Promise<AboutData> {
  const response = await request.get(endpoint);
  if (!response.ok()) {
    throw new Error(`About API request failed with status ${response.status()}`);
  }

  const body = (await response.json()) as Partial<AboutApiResponse>;
  if (!body.data || typeof body.data !== 'object') {
    throw new Error('About API response did not contain a data object');
  }

  const { data } = body;
  if (
    typeof data.companyName !== 'string' ||
    typeof data.productName !== 'string' ||
    typeof data.version !== 'string' ||
    typeof data.numberOfActiveEmployee !== 'number' ||
    typeof data.numberOfPastEmployee !== 'number'
  ) {
    throw new Error('About API response did not match the expected schema');
  }

  return data;
}

export function formatEmployeeTotal(total: number): string {
  return String(total);
}
