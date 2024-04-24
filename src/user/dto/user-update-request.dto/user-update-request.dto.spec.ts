import { UserUpdateRequestDto } from './user-update-request.dto';

describe('UserUpdateRequestDto', () => {
  it('should be defined', () => {
    expect(new UserUpdateRequestDto()).toBeDefined();
  });
});
