/**
 * Application-wide constants
 */
export const APP_CONSTANTS = {
  // Pagination
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  
  // Search
  SEARCH_WILDCARD: '%',
  
  // Database
  UNIQUE_CONSTRAINT_VIOLATION_CODE: '23505',
  
  // Error Messages
  ERROR_MESSAGES: {
    ITEM_NOT_FOUND: 'Item not found',
    ITEM_CREATION_FAILED: 'Failed to create item',
    ITEM_UPDATE_FAILED: 'Failed to update item',
    ITEM_DELETION_FAILED: 'Failed to delete item',
    ITEM_ALREADY_EXISTS: 'Item with this title already exists',
    INVALID_PAGINATION_LIMIT: 'Limit cannot exceed 100',
    INVALID_PAGINATION_PAGE: 'Page must be greater than 0',
  },
  
  // Log Messages
  LOG_MESSAGES: {
    ITEM_CREATED: 'Item created successfully',
    ITEM_UPDATED: 'Item updated successfully',
    ITEM_DELETED: 'Item deleted successfully',
    ITEM_FOUND: 'Item retrieved successfully',
    ITEMS_FOUND: 'Items retrieved successfully',
    STATS_RETRIEVED: 'Item statistics retrieved successfully',
    CATEGORIES_RETRIEVED: 'Categories retrieved successfully',
  },
} as const;

/**
 * Database error codes for PostgreSQL
 */
export const DB_ERROR_CODES = {
  UNIQUE_VIOLATION: '23505',
  FOREIGN_KEY_VIOLATION: '23503',
  NOT_NULL_VIOLATION: '23502',
  CHECK_VIOLATION: '23514',
} as const;
