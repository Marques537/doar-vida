const BASE_API = 'http://172.24.45.121:3333';

export default {
  checkToken: async (token: string) => {
    const req = await fetch(`${BASE_API}/auth/refresh`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    const json = await req.json();
    return json;
  },
  signIn: async (email: string, password: string) => {
    const req = await fetch(`${BASE_API}/user/sign`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await req.json();
    return json;
  },
  signUp: async (name: string, email: string, password: string) => {
    const res = await fetch(`${BASE_API}/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await res.json();

    return json;
  },

  getUser: async (token: string, userId: string) => {
    const res = await fetch(`${BASE_API}/user/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    const json = await res.json();

    return json;
  },

  getDonations: async (token: string, userId: string) => {
    const res = await fetch(`${BASE_API}/donations/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    const json = await res.json();

    return json;
  },

  getScheduleByDate: async (token: string, userId: string, date: string) => {
    const res = await fetch(
      `${BASE_API}/schedules?` +
        new URLSearchParams({
          user_id: userId,
          date: date,
        }),
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      }
    );
    const json = await res.json();

    return json;
  },

  getSchedules: async (token: string, userId: string) => {
    const res = await fetch(`${BASE_API}/schedules/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    const json = await res.json();

    return json;
  },
};
