const BASE_API = 'http://192.168.100.147:3333';

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
  signUp: async (
    name: string,
    email: string,
    password: string,
    gender: string
  ) => {
    const res = await fetch(`${BASE_API}/user`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, gender }),
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

  createDonation: async (
    token: string,
    userId: string,
    date: string,
    local: string
  ) => {
    const res = await fetch(`${BASE_API}/donation`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ user_id: userId, date, local }),
    });
    const json = await res.json();

    return json;
  },

  createReminder: async (
    token: string,
    userId: string,
    date: string,
    local: string,
    description?: string
  ) => {
    const res = await fetch(`${BASE_API}/schedules`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ user_id: userId, date, local, description }),
    });
    const json = await res.json();

    return json;
  },

  updateUserProfile: async (token: string, userId: string, name: string) => {
    const res = await fetch(`${BASE_API}/user/update`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ id: userId, name }),
    });
    const json = await res.json();

    return json;
  },
};
