import validateParams from '../../src/app/helpers/validateParams';
import ApplicationError from '../../src/app/helpers/ApplicationError';

it('should throw because queryParams is empty', () => {
  expect(() => validateParams({}, ['i'])).toThrow(ApplicationError);
});

it("should throw because queryParams isn't valid", () => {
  expect(() => validateParams({ a: 'a' }, ['i'])).toThrow(ApplicationError);
});
