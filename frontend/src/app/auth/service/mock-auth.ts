import { of } from 'rxjs';

export class MockAuthService {
  login(email: string, password: string) {
    const correctEmail = 'test@email.com';
    const correctPassword = 'p4$w004rd';

    if (!email || !password) {
      throw new Error('Must provide both email and password');
    }

    if (email !== correctEmail || password !== correctPassword) {
      throw new Error(`wrong credentials`);
    }

    return of('Success!');
  }

  register(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      throw new Error('Must provide name, email and password');
    }

    return of('Success!');
  }
}
