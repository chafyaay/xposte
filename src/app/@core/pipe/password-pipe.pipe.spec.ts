import { PasswordPipePipe } from './password-pipe.pipe';

describe('PasswordPipePipe', () => {
  it('create an instance', () => {
    const pipe = new PasswordPipePipe();
    expect(pipe).toBeTruthy();
  });
});
