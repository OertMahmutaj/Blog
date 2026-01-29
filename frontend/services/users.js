const baseUrl = "http://localhost:3001/api/users"

const getAll = async() => {
    const response = await fetch(baseUrl)

    if(!response.ok){
        throw new Error(`Failed to get users`)
    }
    const data = await response.json();
    console.log(data)
    return data;
};

export default { getAll };