const getCodespaceName = () => import.meta.env.VITE_CODESPACE_NAME?.trim() ?? '';

export const getApiBaseUrl = () => {
  const codespaceName = getCodespaceName();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/`;
  }

  return 'http://localhost:8000/api/';
};

export const getApiUrlForResource = (resource) => {
  const normalizedResource = resource.replace(/^\/+|\/+$/g, '');
  return `${getApiBaseUrl()}${normalizedResource}/`;
};

export const buildApiUrl = (resource) => getApiUrlForResource(resource);

export const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.results)) return payload.results;
    if (Array.isArray(payload.items)) return payload.items;
    if (Array.isArray(payload.data)) return payload.data;
    if (Array.isArray(payload.entries)) return payload.entries;
  }

  return [];
};

export const fetchCollection = async (resource) => {
  const primaryUrl = buildApiUrl(resource);
  let response = await fetch(primaryUrl);

  if (!response.ok && primaryUrl.endsWith('/')) {
    const fallbackUrl = primaryUrl.slice(0, -1);
    response = await fetch(fallbackUrl);
  }

  if (!response.ok) {
    throw new Error(`Unable to load ${resource}`);
  }

  const payload = await response.json();
  return normalizeCollection(payload);
};
