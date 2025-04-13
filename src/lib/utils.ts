export function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

export function handleError(error: unknown, context: string, type?: string): never {
  console.error(`${type ? type + ' ' : ''}Error in ${context}:`, error);
  throw error instanceof Error
    ? new Error(`${context}: ${error.message}`)
    : new Error(`Unexpected error in ${context}`);
}
