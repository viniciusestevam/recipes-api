import validateParams from '../../src/app/shared/validateParams';
import ApplicationError from '../../src/error/ApplicationError';

it('should throw with empty params', () => {
  expect(() => validateParams({}, ['i'])).toThrow(ApplicationError);
});

it('should throw with invalid params', () => {
  expect(() => validateParams({ a: 'a' }, ['i'])).toThrow(ApplicationError);
});

it('should throw without function arguments', () => {
  expect(() => validateParams()).toThrow(ApplicationError);
});
