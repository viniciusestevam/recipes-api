import validateParams from '../../src/app/shared/validateParams';
import ApplicationError from '../../src/error/ApplicationError';

it('should throw because queryParams is empty', () => {
  expect(() => validateParams({}, ['i'])).toThrow(ApplicationError);
});

it("should throw because queryParams isn't valid", () => {
  expect(() => validateParams({ a: 'a' }, ['i'])).toThrow(ApplicationError);
});
