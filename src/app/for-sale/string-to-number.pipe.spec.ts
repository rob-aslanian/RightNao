import { StringToNumberPipe } from './string-to-number.pipe';

describe('StringToNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new StringToNumberPipe();
    expect(pipe).toBeTruthy();
  });
});
