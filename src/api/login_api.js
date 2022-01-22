const login_api = async (username, password, success, fail) => {
  const response = await fetch(`http://localhost:800/api/token/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: username,
      password: password,
    }),
  });
  const text = await response.text();
  if (response.status === 200) {
    console.log('success', JSON.parse(text));
    success(JSON.parse(text));
  } else {
    console.log('failed', text);
    Object.entries(JSON.parse(text)).forEach(([key, value]) => {
      fail(`${key}: ${value}`);
    });
  }
};

export default login_api;
