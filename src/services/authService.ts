const AUTH_API_URL = '/api/auth.php';

export interface AuthStatus {
    logged_in: boolean;
    username: string | null;
}

export const authService = {
    async login(username: string, password: string): Promise<{ success: boolean; message: string }> {
        try {
            console.log('Attempting login for:', username);
            const response = await fetch(`${AUTH_API_URL}?endpoint=login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            
            console.log('Login Response Status:', response.status);
            const result = await response.json();
            console.log('Login Result:', result);
            
            return {
                success: result.success,
                message: result.message || (result.success ? 'Login successful' : 'Login failed')
            };
        } catch (error) {
            console.error('CRITICAL: Login fetch error:', error);
            return { success: false, message: 'Server error during login: ' + (error instanceof Error ? error.message : 'Unknown error') };
        }
    },

    async logout(): Promise<boolean> {
        try {
            const response = await fetch(`${AUTH_API_URL}?endpoint=logout`);
            const result = await response.json();
            return result.success;
        } catch (error) {
            console.error('Logout error:', error);
            return false;
        }
    },

    async checkAuth(): Promise<AuthStatus> {
        try {
            const response = await fetch(`${AUTH_API_URL}?endpoint=check`);
            const result = await response.json();
            if (result.success) {
                return result.data;
            }
            return { logged_in: false, username: null };
        } catch (error) {
            console.error('Auth check error:', error);
            return { logged_in: false, username: null };
        }
    }
};
