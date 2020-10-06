export class MockAuthService {
  login(email: string, password: string) {
    const correctEmail = 'test@email.com';
    const correctPassword = 'p4$w004rd';

    if (!email || !password) {
      throw new Error('Must provide both email and password');
    }

    if (email !== correctEmail && password !== correctPassword) {
      throw new Error(`wrong credentials`);
    }

    return 'Success!';
  }
}
