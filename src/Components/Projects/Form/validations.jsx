export const registerOptions = {
  name: {
    required: 'Name is required',
    minLength: {
      value: 3,
      message: 'Name must be at least 3 characters long.'
    },
    maxLength: {
      value: 50,
      message: 'Name must be no longer than 50 characters.'
    },
    pattern: {
      value: /^([^0-9]*)$/i,
      message: 'Name must not contain numbers or special characters.'
    }
  },
  description: {
    required: 'Description is required',
    minLength: {
      value: 10,
      message: 'Description must be at least 10 characters long.'
    },
    maxLength: {
      value: 50,
      message: 'Description must be no longer than 50 characters.'
    },
    pattern: {
      value: /^[a-zA-Z0-9]+$/i,
      message: 'Description must not contain special characters.'
    }
  },
  clientName: {
    required: 'Client name is required',
    minLength: {
      value: 3,
      message: 'Client name must be at least 3 characters long.'
    },
    maxLength: {
      value: 50,
      message: 'Client name must be no longer than 50 characters.'
    },
    pattern: {
      value: /^([^0-9]*)$/i,
      message: 'Client name must not contain numbers or special characters.'
    }
  },
  startDate: { required: 'Start date is required' },
  endDate: { required: 'End date is required' },
  employee: {
    required: 'Employee is required',
    pattern: {
      value: /^[a-zA-Z0-9]+$/i,
      message: 'Employee is required and must not contain special characters.'
    }
  },
  rate: {
    required: 'Rate is required',
    pattern: {
      value: /^[0-9]*$/i,
      message: 'Rate must be a number.'
    },
    min: {
      value: 1,
      message: 'Rate must be a positive number.'
    }
  },
  role: {
    required: 'Role is required',
    pattern: {
      value: /(DEV|QA|TL)\b/i,
      message: 'Role must be DEV, QA or TL only.'
    }
  }
};

