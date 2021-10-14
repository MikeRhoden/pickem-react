export function MockOk(): Response {
  const mockResponse: Response = {
    ok: true,
    json: async () => ({ success: true }),
    headers: undefined,
    redirected: false,
    status: 0,
    statusText: '',
    type: 'basic',
    url: '',
    clone: function (): Response {
      throw new Error('Function not implemented.')
    },
    body: undefined,
    bodyUsed: false,
    arrayBuffer: function (): Promise<ArrayBuffer> {
      throw new Error('Function not implemented.')
    },
    blob: function (): Promise<Blob> {
      throw new Error('Function not implemented.')
    },
    formData: function (): Promise<FormData> {
      throw new Error('Function not implemented.')
    },
    text: function (): Promise<string> {
      throw new Error('Function not implemented.')
    }
  }
  return mockResponse
}

export function MockUnauthorized() {
  const mockResponse: Response = {
    ok: false,
    status: 401,
    statusText: 'Unauthorized',
    json: async () => ({ message: 'Unauthorized' }),
    headers: undefined,
    redirected: false,
    type: "basic",
    url: "",
    clone: function (): Response {
      throw new Error("Function not implemented.")
    },
    body: undefined,
    bodyUsed: false,
    arrayBuffer: function (): Promise<ArrayBuffer> {
      throw new Error("Function not implemented.")
    },
    blob: function (): Promise<Blob> {
      throw new Error("Function not implemented.")
    },
    formData: function (): Promise<FormData> {
      throw new Error("Function not implemented.")
    },
    text: function (): Promise<string> {
      throw new Error("Function not implemented.")
    }
  }
  return mockResponse
}

export function MockConflict(): Response {
  const mockResponse: Response = {
    ok: false,
    status: 409,
    statusText: 'Conflict',
    json: async () => ({ message: 'Conflict' }),
    headers: undefined,
    redirected: false,
    type: "basic",
    url: "",
    clone: function (): Response {
      throw new Error("Function not implemented.")
    },
    body: undefined,
    bodyUsed: false,
    arrayBuffer: function (): Promise<ArrayBuffer> {
      throw new Error("Function not implemented.")
    },
    blob: function (): Promise<Blob> {
      throw new Error("Function not implemented.")
    },
    formData: function (): Promise<FormData> {
      throw new Error("Function not implemented.")
    },
    text: function (): Promise<string> {
      throw new Error("Function not implemented.")
    }
  }
  return mockResponse
}