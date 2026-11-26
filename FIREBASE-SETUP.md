# Firebase account setup

The learning site uses the Firebase web SDK with the `atmilio` project. The web configuration identifies the project and is not an administrative credential. Never put service-account keys in the website or repository.

## Provisioning status (2026-11-26)

The `atmilio` project has a default Firestore database in `us-central1` (Standard, free tier at creation). The learning profile and progress rules in `firestore-learning.rules` were compiled and deployed. Email/password Authentication is enabled, email enumeration protection is active, and the server enforces a minimum of eight password characters without forcing existing users to change passwords on sign-in. `atmilio.com` and `localhost` were added to the existing authorized domains.

Live smoke tests created temporary accounts and verified that an unverified user cannot read profile data, a verified user can read and write their own profile and progress, and a different verified user cannot read or modify those records. The test records and accounts were deleted. A real mailbox is still needed to verify signup email delivery, email verification, password reset delivery, and the complete production UI flow.

Before relying on accounts for real users:

1. Review Authentication authorized domains and add any other actual site origins if needed. Use HTTPS for the live site.
2. Before changing Firestore rules, review the existing project's security rules. Do not deploy the checked-in learning-only rules over unrelated rules without checking: doing so can block other applications, and other permissive matching rules can still grant access to these documents.
3. Configure Firebase Authentication email templates and sender settings. Test email verification and password reset delivery, including expiration and spam folders. Enable email enumeration protection, an enforced password policy (minimum eight characters or stronger), and appropriate sign-up abuse protections in the Firebase console.
4. Confirm a verified account can save a profile, another account cannot read or modify it, and unverified users cannot access it. Test the actual published rules with the Firebase Emulator Suite and the live deployment. Firebase setup and deployed rules are required; the checked-in rules file does not enforce anything until published.

Guest profiles remain in local browser storage. A verified user can explicitly copy a guest profile into their account; the original local copy remains until deleted separately. Account profile deletion removes the Firestore learning profile, not the Firebase Authentication account. Account data is not used as a payment entitlement and this site does not implement a paywall.

Course progress uses separate `learningProgress/{uid}/courses/{courseId}` documents. Include the matching rule from `firestore-learning.rules` when publishing rules, and verify that another user and an unverified user cannot read or modify these documents. Opening an available course creates a started record; learners mark lessons complete themselves. Guest progress remains on the device and is not automatically transferred when signing in. Course completion is self-reported, not a certificate, assessment, or payment entitlement. Course and lesson identifiers must remain stable when updating content; currently lesson identifiers depend on lesson order.

The payment profile section is a placeholder. Do not store card numbers, security codes, or payment credentials in Firestore or browser storage. A real payment profile and purchase history require a payment provider, trusted server-side integration, and server-verified entitlements.

The SDK uses browser modules from Google's pinned CDN version and needs a web server, not a `file://` URL. Analytics is not initialized; enabling analytics requires an appropriate privacy and consent policy.