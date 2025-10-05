import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception for item-related errors
 */
export class ItemNotFoundException extends HttpException {
  constructor(itemId: string) {
    super(`Item with ID ${itemId} not found`, HttpStatus.NOT_FOUND);
  }
}

/**
 * Custom exception for item creation conflicts
 */
export class ItemAlreadyExistsException extends HttpException {
  constructor(title: string) {
    super(`Item with title "${title}" already exists`, HttpStatus.CONFLICT);
  }
}

/**
 * Custom exception for item operation failures
 */
export class ItemOperationException extends HttpException {
  constructor(operation: string, details?: string) {
    const message = details 
      ? `Failed to ${operation}: ${details}`
      : `Failed to ${operation}`;
    super(message, HttpStatus.BAD_REQUEST);
  }
}

/**
 * Custom exception for validation errors
 */
export class ItemValidationException extends HttpException {
  constructor(message: string, errors?: any[]) {
    super(
      {
        message,
        errors,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
