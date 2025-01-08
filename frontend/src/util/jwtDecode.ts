import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    aud: string,
    iss: string,
    iat: number,
    exp: number,
    sub: number,
    role: number,
}

// 'iss' => 'taskflow',
//             'aud' => 'taskflow.client',
//             'iat' => time(),
//             'exp' => time() + self::$jwtExp,
//             'sub' => $user->id,
//             'role' => $user->role,



const decodeToken = () => {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            console.log(decoded);
        } catch (err) {
            console.error('Invalid token:', err);
        }
    } else {
        console.log('No token found');
    }
}

export default decodeToken;