import { Auth } from 'aws-amplify';

export default {
  /**
   * Get the current authentication status
   * @returns {boolean} Whether or not the user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      // If the user is not auth'd, this will throw an exception
      await Auth.currentAuthenticatedUser();
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Gets the current user's name
   * @returns {string} Name if authenticated, blank if not
   */
  async getUserName(): Promise<string> {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user.attributes.given_name;
    } catch {
      return '';
    }
  },

  /**
   * Authenticate the user
   * @param {string} username The username
   * @param {string} password The password
   * @returns {string|null}
   */
  async signIn(username: string, password: string): Promise<string | null> {
    try {
      const user = await Auth.signIn(username, password);
      console.log('user auth', user);

      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        return 'password_change_required';
      }

      return null; // All is good...
    } catch (err) {
      throw new Error(err);
    }
  },

  /**
   * Sign out the user
   */
  async signOut(): Promise<void> {
    try {
      await Auth.signOut();
    } catch (err) {
      console.error(err);
    }
  },

  /**
   * Gets the current access token
   * @returns {string} The access token if available
   */
  async getAccessToken(): Promise<string | null> {
    try {
      const accessToken = (await Auth.currentSession()).getIdToken().getJwtToken();
      return accessToken;
    } catch {
      return null;
    }
  },
};
