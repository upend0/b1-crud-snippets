/**
 * Module for the AuthorizationController.
 *
 * @author Maria Fredriksson
 * @version 1.0.0
 */

import { Snippet } from '../models/snippet.js'

/**
 * Encapsulates a controller.
 */
export class AuthorizationController {
  /**
   * Middleware to check if the user is authorized to access the resource.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   *
   * @returns {undefined}
   */
  async ifNOTLoggedIn (req, res, next) {
    // If the user is not logged in
    if (!req.session.user) {
      const error = new Error('Forbidden')
      error.status = 403
      return next(error)
    }

    // If the user is logged in
    next()
  }

  /**
   * Middleware to check if the user is authorized to access the resource.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   *
   * @returns {undefined}
   */
  async ifLoggedIn (req, res, next) {
    // If the user is not logged in
    if (req.session.user) {
      const error = new Error('Forbidden')
      error.status = 403
      return next(error)
    }

    // If the user is logged in
    next()
  }

  /**
   * Middleware to check if the user is authorized to access the resource.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   *
   * @returns {undefined}
   */
  async authorizeUser (req, res, next) {
    try {
      const snippet = await Snippet.findById(req.params.id)

      // If the user is not the author
      if (req.session.user !== snippet.author) {
        const error = new Error('Forbidden')
        error.status = 403
        return next(error)
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}
