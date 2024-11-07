import fetch from 'node-fetch';

async function makePostRequest() {
  const url = 'http://localhost:4444';
  const data = {
    key: 'value',
    anotherKey: 'anotherValue',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log('Resposta do servidor:', responseData);
  } catch (error) {
    console.error('Erro ao fazer o POST request:', error);
  }
}

makePostRequest();
