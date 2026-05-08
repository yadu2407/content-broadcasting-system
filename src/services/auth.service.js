const MOCK_USERS = {
  'teacher@school.com': {
    id: '1', email: 'teacher@school.com', password: 'teacher123', role: 'teacher', name: 'John Teacher'
  },
  'principal@school.com': {
    id: '2', email: 'principal@school.com', password: 'principal123', role: 'principal', name: 'Jane Principal'
  }
};

class AuthService {
  async login(email, password) {
    await new Promise(resolve => setTimeout(resolve, 800));
    const user = MOCK_USERS[email];
    if (user && user.password === password) {
      const token = `mock_token_${Date.now()}`;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify({
        id: user.id, email: user.email, role: user.role, name: user.name
      }));
      return { success: true, user: { id: user.id, email: user.email, role: user.role, name: user.name }, token };
    }
    throw new Error('Invalid credentials');
  }
  
  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }
  
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

export default new AuthService();