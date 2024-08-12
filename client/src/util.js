export const nameRegex = /^[A-Za-z\s]+$/;

export async function graphQLCommand(query, variables) {
  try {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: variables
        ? JSON.stringify({ query, variables })
        : JSON.stringify({ query }),
    });

    if (response.ok) {
      const result = await response.json();
      return result.data;
    } else {
      console.log('Error in sending data to server:', response.statusText);
    }
  } catch (error) {
    console.log('Error in sending data to server:', error);
  }
}
