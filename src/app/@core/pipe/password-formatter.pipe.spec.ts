import { PasswordFormatterPipe } from './password-formatter.pipe';

describe('PasswordFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new PasswordFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
