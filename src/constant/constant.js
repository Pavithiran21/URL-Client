// export const API_URL="https://reset-passwords.herokuapp.com/user"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const API_URL="https://shortner-app.herokuapp.com/"
export const USER_SESSION=cookies.get('user_token')
export const USER_DETAILS=cookies.get('user_details')
