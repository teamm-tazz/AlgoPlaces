const apiFetch = {};
apiFetch.requestStrategy = async (query) => {
  console.log('Making query in apiFetch.requestStrategy: ', query);
  try {
    const response = await fetch('http://localhost:3000/api/generate', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userQuery: query}),
    });

    if (!response.ok) {
      throw new Error(
        'Error in generating approach response: ',
        response.status
      );
    }
    const data = await response.json();
    console.log('Here is the generated approach response: ', data);
    return data;
  } catch (err) {
    console.error(`This is the error in apiFetch.requestStrategy : ${err}`);
  }
};


apiFetch.requestPracticeProblems = async (query) => {
  try {
    const response = await fetch(
      'http://localhost:3000/api/practice-problems',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(
        'Error in generating practice problems: ',
        response.status
      );
    }
    const data = await response.json();
    console.log('Here are the generated practice problems: ', data);
    return data;
  } catch (err) {
    console.error(
      `This is the error in apiFetch.requestPracticeProblems : ${err}`
    );
  }
};


apiFetch.getHistory = async (obj) => {
  try {
    const response = await fetch('http://localhost3000/api/PLACEHOLDER', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        obj,
      }),
    });
    if (!response.ok) {
      throw new Error('Error in retrieving history.');
    }
    const data = await response.json();
    console.log(`Here's the generated history: ${data}`);
    return data;
  } catch (err) {
    console.error(`This is the error in apiFetch.getHistory`);
  }
};

export default apiFetch