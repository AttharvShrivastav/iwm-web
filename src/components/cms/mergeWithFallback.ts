function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isEmpty(value: unknown) {
  return (
    value === undefined ||
    value === null ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  );
}

export function mergeWithFallback<T>(
  fallback: T,
  cmsData: Partial<T> | null | undefined
): T {
  if (!cmsData) {
    return fallback;
  }

  if (Array.isArray(fallback)) {
    return Array.isArray(cmsData) && cmsData.length > 0 ? (cmsData as T) : fallback;
  }

  if (!isObject(fallback) || !isObject(cmsData)) {
    return isEmpty(cmsData) ? fallback : (cmsData as T);
  }

  const merged: Record<string, unknown> = { ...fallback };

  Object.keys(fallback).forEach((key) => {
    const fallbackValue = (fallback as Record<string, unknown>)[key];
    const cmsValue = (cmsData as Record<string, unknown>)[key];

    if (isEmpty(cmsValue)) {
      merged[key] = fallbackValue;
      return;
    }

    if (isObject(fallbackValue) && isObject(cmsValue)) {
      merged[key] = mergeWithFallback(fallbackValue, cmsValue);
      return;
    }

    if (Array.isArray(fallbackValue)) {
      merged[key] =
        Array.isArray(cmsValue) && cmsValue.length > 0 ? cmsValue : fallbackValue;
      return;
    }

    merged[key] = cmsValue;
  });

  return merged as T;
}