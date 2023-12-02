

export default class ApiUser {
    private static userApiUri: string | undefined = process.env.REACT_APP_API_USER_URI
    static updateBalance = async (amount: number,userID:string) => {

        fetch(`${ApiUser.userApiUri}${userID}/balance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({amount:amount})
        }).then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went wrong ...')
                }
            }
        )
    };
}
