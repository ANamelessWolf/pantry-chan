export const AuthSchema = {
    Register: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          description: 'User email address'
        },
        password: {
          type: 'string',
          description: 'User password'
        }
      }
    },
    Login: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          description: 'User email address'
        },
        password: {
          type: 'string',
          description: 'User password'
        }
      }
    }
  };
  