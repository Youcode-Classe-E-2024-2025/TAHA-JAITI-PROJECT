import sweetAlert from '@/tools/sweetAlert';
import { jwtDecode } from 'jwt-decode';
import page from 'page';

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
            if (decoded){
                localStorage.setItem('userId', JSON.stringify(decoded.sub));
                localStorage.setItem('roleId', JSON.stringify(decoded.role));
                localStorage.setItem('expire', decoded.exp.toString());

                scheduleTokenRemoval(decoded.exp);

                return decoded.role;
            }
        } catch (err) {
            console.error('Invalid token:', err);
        }
    } else {
        console.log('No token found');
    }
}

const scheduleTokenRemoval = (expirationTime: number) => {
    const currentTime = Date.now() / 1000;
    const timeUntilExpiration = (expirationTime - currentTime) * 1000;

    if (timeUntilExpiration > 0) {
        setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
            localStorage.removeItem('userId');
            localStorage.removeItem('roleId');
            sweetAlert('Token removed from localStorage after 1 hour')
        }, timeUntilExpiration);
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('expire');
        localStorage.removeItem('userId');
        localStorage.removeItem('roleId');
        sweetAlert('Token was already expired and has been removed');
    }
};

export const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('expire');

    if (token && tokenExpiration) {
        const expirationTime = parseFloat(tokenExpiration);
        const currentTime = Date.now() / 1000;        

        if (currentTime >= expirationTime) {
            localStorage.clear();
            sweetAlert('Token was expired and has been removed');
            page('/login');
        } else {
            scheduleTokenRemoval(expirationTime);
        }
    }
};
export default decodeToken;
