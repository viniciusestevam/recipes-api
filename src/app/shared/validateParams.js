import ApplicationError from '../../error/ApplicationError';

/**
 *
 * @param {any} queryParams Parameters received on http request.
 * @param {string[]} validQuery Array with the valid params the method accepts.
 */
export default function validateParams(queryParams, validQuery) {
  try {
    if (!Object.keys(queryParams).length) {
      throw new ApplicationError(400, 'Any parameter has been provided.');
    }
    for (const param in queryParams) {
      if (!validQuery.includes(param)) {
        throw new ApplicationError(400, 'Invalid params.');
      }
    }
  } catch (error) {
    throw new ApplicationError(500, 'Internal server error.');
  }
}
