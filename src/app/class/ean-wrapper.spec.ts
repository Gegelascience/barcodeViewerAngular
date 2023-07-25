import { EanWrapper } from './ean-wrapper';

describe('EanWrapper', () => {
  it('should create an instance', () => {
    expect(new EanWrapper("3666154117284")).toBeTruthy();
    
  });
});
