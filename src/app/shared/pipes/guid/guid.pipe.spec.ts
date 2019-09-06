import { GuidPipe } from './guid.pipe';

describe('GuidPipe', () => {
  it('create an instance', () => {
    const pipe = new GuidPipe();
    expect(pipe).toBeTruthy();
  });
});
