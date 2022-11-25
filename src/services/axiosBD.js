
export const getUsers = async () => {
    try {
        const res = await axios.put("http://localhost:3000/api/", { 
            headers: { Authorization: `Bearer ${tokenNum}` }});
            console.log(res);
            return res.data;
    } catch (error) {
        console.log("Error get users:");
        console.log(error.message);
        console.log(error);
    }
}
