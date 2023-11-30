export async function makeNetowrkRequest(input: RequestInfo, init?: RequestInit) {
  try {
    const response = await fetch(input, init);
    if (response.ok) {
      const data = await response.json();
      return { errorMessage: undefined, statusCode: undefined, data };
    }
    throw { message: response.statusText, statusCode: response.status };
  } catch (error: any) {
    console.log('network error', error);
    if (error.statusCode != undefined)
      return {
        errorMessage: error.message,
        statusCode: error.statusCode,
        data: undefined,
      };

    return {
      errorMessage: error.message,
      statusCode: undefined,
      data: undefined,
    };
  }
}
