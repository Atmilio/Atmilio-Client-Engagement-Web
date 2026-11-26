# Firebase account setup

The learning site uses the Firebase web SDK with the `atmilio` project. The web configuration identifies the project and is not an administrative credential. Never put service-account keys in the website or repository.

Before enabling accounts for real users:

1. In Firebase Authentication, enable the Email/Password provider and add `atmilio.com` and any other actual site origins to Authentication's authorized domains. Use HTTPS for the live site. Add localhost for development if necessary.
2. Create the default Cloud Firestore database and configure its location. Review the existing project's security rules. Add the `learningProfiles/{userId}` rule from `firestore-learning.rules` to the existing rules, or use that file as the complete ruleset only if no other collections need access. Publish the rules in Firebase. Do not deploy it over existing rules without checking: doing so can block other applications, and other permissive matching rules can still grant access to these documents.
3. Configure Firebase Authentication email templates and sender settings. Test email verification and password reset delivery, including expiration and spam folders. Enable email enumeration protection, an enforced password policy (minimum eight characters or stronger), and appropriate sign-up abuse protections in the Firebase console.
4. Confirm a verified account can save a profile, another account cannot read or modify it, and unverified users cannot access it. Test the actual published rules with the Firebase Emulator Suite and the live deployment. Firebase setup and deployed rules are required; the checked-in rules file does not enforce anything until published.

Guest profiles remain in local browser storage. A verified user can explicitly copy a guest profile into their account; the original local copy remains until deleted separately. Account profile deletion removes the Firestore learning profile, not the Firebase Authentication account. Account data is not used as a payment entitlement and this site does not implement a paywall.

Course progress uses separate `learningProgress/{uid}/courses/{courseId}` documents. Include the matching rule from `firestore-learning.rules` when publishing rules, and verify that another user and an unverified user cannot read or modify these documents. Opening an available course creates a started record; learners mark lessons complete themselves. Guest progress remains on the device and is not automatically transferred when signing in. Course completion is self-reported, not a certificate, assessment, or payment entitlement. Course and lesson identifiers must remain stable when updating content; currently lesson identifiers depend on lesson order.

The payment profile section is a placeholder. Do not store card numbers, security codes, or payment credentials in Firestore or browser storage. A real payment profile and purchase history require a payment provider, trusted server-side integration, and server-verified entitlements.

The SDK uses browser modules from Google's pinned CDN version and needs a web server, not a `file://` URL. Analytics is not initialized; enabling analytics requires an appropriate privacy and consent policy.