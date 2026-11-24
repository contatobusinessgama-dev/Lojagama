/**
 * Phase 0: Security Rules Verification Specification (Dirty Dozen Test Matrix)
 */

export interface SecurityTestCase {
  id: number;
  name: string;
  collection: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  expected: 'PERMISSION_DENIED';
}

export const DIRTY_DOZEN_TESTS: SecurityTestCase[] = [
  { id: 1, name: 'Identity Spoofing on UserVault', collection: 'user_vaults', operation: 'create', expected: 'PERMISSION_DENIED' },
  { id: 2, name: 'Cross-Tenant Vault Read', collection: 'user_vaults', operation: 'get', expected: 'PERMISSION_DENIED' },
  { id: 3, name: 'Unverified Email Write', collection: 'user_vaults', operation: 'create', expected: 'PERMISSION_DENIED' },
  { id: 4, name: 'Shadow Field Injection on UserVault', collection: 'user_vaults', operation: 'update', expected: 'PERMISSION_DENIED' },
  { id: 5, name: 'Unbounded Array Denial-of-Wallet', collection: 'user_vaults', operation: 'update', expected: 'PERMISSION_DENIED' },
  { id: 6, name: 'Timestamp Forgery', collection: 'user_vaults', operation: 'create', expected: 'PERMISSION_DENIED' },
  { id: 7, name: 'Immortal Field Mutation', collection: 'user_vaults', operation: 'update', expected: 'PERMISSION_DENIED' },
  { id: 8, name: 'Orphaned Receipt Creation', collection: 'user_vaults/receipts', operation: 'create', expected: 'PERMISSION_DENIED' },
  { id: 9, name: 'Terminal Receipt Tampering', collection: 'user_vaults/receipts', operation: 'update', expected: 'PERMISSION_DENIED' },
  { id: 10, name: 'Review Author Spoofing', collection: 'app_reviews', operation: 'create', expected: 'PERMISSION_DENIED' },
  { id: 11, name: 'Out-of-Bounds Review Rating', collection: 'app_reviews', operation: 'create', expected: 'PERMISSION_DENIED' },
  { id: 12, name: 'Poisoned Document ID', collection: 'app_reviews', operation: 'create', expected: 'PERMISSION_DENIED' }
];
