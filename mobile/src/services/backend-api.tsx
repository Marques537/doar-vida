const BASE_API = 'http://172.19.217.145:3333'

export default {
    checkToken: async (token: string) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();        
        return json;
    },
    signIn: async (email: string, password: string) => {
        const req = await fetch(`${BASE_API}/user/sign`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const json = await req.json();     
        return json;
    },
    signUp: async (name: string, email: string, password: string) => {   

        const res = await fetch(`${BASE_API}/user`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await res.json();
    
        return json;
    },
    // getBarbers: async (lat=null, lng=null, address=null) => {
    //     const token = await AsyncStorage.getItem('token');

    //     console.log("LAT", lat);
    //     console.log("LNG", lng);
    //     console.log("ADDRESS", address);

    //     const req = await fetch(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`);
    //     const json = await req.json();
    //     return json;
    // }

};