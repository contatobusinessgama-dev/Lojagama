# Phase 0: Payload-First Security TDD Specification

## 1. Data Invariants
1. **UserVault Isolation (`user_vaults/{userId}`)**:
   - Only a signed-in, email-verified user whose `request.auth.uid == userId` can read, create, or update their own `UserVault`.
   - `uid` in the payload must match `userId` and `request.auth.uid`.
   - `cartIds` is bounded (`size() <= 30`) and `ownedIds` is bounded (`size() <= 50`).
   - `createdAt` is immutable on update and must equal `request.time` on create; `updatedAt` must equal `request.time` on create and update.

2. **UserReceipt Subcollection (`user_vaults/{userId}/receipts/{receiptId}`)**:
   - Master Gate: Parent `user_vaults/{userId}` must exist (or be created in the same batch via `existsAfter`) and belong to `request.auth.uid`.
   - Receipts are immutable once created (`status == 'completed'`, `allow update, delete: if false`).
   - `total` must be a non-negative number (`>= 0 && <= 100000`).

3. **AppReviewDoc (`app_reviews/{reviewId}`)**:
   - Reviews contain no PII (no email/phone/address) and are readable by store visitors for specific apps, while creation requires a verified user (`request.auth.token.email_verified == true`) where `incoming().authorUid == request.auth.uid`.
   - `rating` must be an integer/number between 1 and 5.
   - Reviews cannot be updated after publication (immutable), only deleted by their author (`resource.data.authorUid == request.auth.uid`).

## 2. The "Dirty Dozen" Payloads
1. **Identity Spoofing on UserVault**: User `uid_A` creates `/user_vaults/uid_A` with `{ uid: "uid_B", ... }` -> REJECTED.
2. **Cross-Tenant Vault Read (PII/Private State)**: User `uid_A` attempts `get` on `/user_vaults/uid_B` -> REJECTED.
3. **Unverified Email Write**: User `uid_A` with `email_verified: false` attempts to create `/user_vaults/uid_A` -> REJECTED.
4. **Shadow Field Injection on UserVault**: User `uid_A` sends `{ ..., isAdmin: true }` -> REJECTED by `hasOnly()`.
5. **Unbounded Array Denial-of-Wallet**: User `uid_A` sends `cartIds` with 500 elements -> REJECTED by `size() <= 30`.
6. **Timestamp Forgery**: User `uid_A` sends `createdAt` in the past instead of `request.time` -> REJECTED.
7. **Immortal Field Mutation**: User `uid_A` updates `UserVault` and modifies `createdAt` or `uid` -> REJECTED.
8. **Orphaned Receipt Creation**: User `uid_A` creates `/user_vaults/uid_A/receipts/rec_1` when `/user_vaults/uid_A` does not exist -> REJECTED by Master Gate.
9. **Terminal Receipt Tampering**: User `uid_A` attempts to update `/user_vaults/uid_A/receipts/rec_1` to change `total` -> REJECTED (`allow update: if false`).
10. **Review Author Spoofing**: User `uid_A` creates `/app_reviews/rev_1` with `authorUid: "uid_B"` -> REJECTED.
11. **Out-of-Bounds Review Rating**: User `uid_A` creates `/app_reviews/rev_1` with `rating: 99` -> REJECTED.
12. **Poisoned Document ID**: User `uid_A` creates `/app_reviews/bad$id!with/slashes` or >128 chars -> REJECTED by `isValidId()`.
