
/**
 * Represents a user account with associated details.
 *
 * @typedef {Object} UserAccount
 * @property {string} username - The username of the account.
 * @property {string} profile_url - The URL to the user's profile picture or page.
 * @property {AccountNotification[]} notifications - A list of notifications associated with the account.
 *
 * @example
 * const exampleUserAccount: UserAccount = {
 *   username: "john_doe",
 *   profile_url: "https://example.com/profiles/john_doe",
 *   notifications: [
 *     {
 *       id: 1,
 *       message: "Welcome to our platform!",
 *       read: false,
 *     },
 *     {
 *       id: 2,
 *       message: "Your profile has been updated.",
 *       read: true,
 *     },
 *   ],
 * };
 */


type AccountNotification = {
    id: string;
    message: string;
    icon: string;
    timestamp: Date;
}