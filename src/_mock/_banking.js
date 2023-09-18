import _mock from './_mock';

// ----------------------------------------------------------------------

export const _bankingContacts = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  avatar: _mock.image.avatar(index),
}));

export const _bankingCreditCard = [
  {
    id: _mock.id(2),
    balance: 23432.03,
    cardType: 'mastercard',
    cardHolder: _mock.name.fullName(2),
    cardNumber: '**** **** **** 3640',
    cardValid: '11/22',
  },
  {
    id: _mock.id(3),
    balance: 18000.23,
    cardType: 'visa',
    cardHolder: _mock.name.fullName(3),
    cardNumber: '**** **** **** 8864',
    cardValid: '11/25',
  },
  {
    id: _mock.id(4),
    balance: 2000.89,
    cardType: 'mastercard',
    cardHolder: _mock.name.fullName(4),
    cardNumber: '**** **** **** 7755',
    cardValid: '11/22',
  },
];

export const _bankingRecentTransitions = [
  {
    id: _mock.id(2),
    name: _mock.name.fullName(2),
    avatar: _mock.image.avatar(8),
    type: 'Income',
    message: '102332',
    category: 'Sıcak',
    date: 1627556358365,
    status: 'in_progress',
    amount: 811.45,
    cash: '30.656.5',
    percent: 78,
    stockColor: '#0eed2c',
    deviceName: 'Letta',
    location: 'Kocaeli',
    chartData: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
  },
  {
    id: _mock.id(3),
    name: _mock.name.fullName(3),
    avatar: _mock.image.avatar(9),
    type: 'Expenses',
    message: '65656',
    category: 'Soğuk',
    date: 1627556329038,
    status: 'completed',
    amount: 436.03,
    cash: '55.656.5',
    percent: 51,
    stockColor: '#FFC436',
    deviceName: 'Harput',
    location: 'Elazığ',
    chartData: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
  },
  {
    id: _mock.id(4),
    name: _mock.name.fullName(4),
    avatar: _mock.image.avatar(12),
    type: 'Receive',
    message: '549855',
    category: 'Normal',
    date: 1627556339677,
    status: 'failed',
    amount: 82.26,
    cash: '45.656.5',
    percent: 0,
    stockColor: '',
    deviceName: 'KurtKöy',
    location: 'İstanbul',
    chartData: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
  },
  {
    id: _mock.id(5),
    name: null,
    avatar: null,
    type: 'Expenses',
    message: '165165',
    category: 'Normal',
    date: 1627547330510,
    status: 'completed',
    amount: 480.73,
    cash: '45.656.5',
    percent: 100,
    stockColor: '#0eed2c',
    deviceName: 'Bilişim Vadisi',
    location: 'Kocaeli',
    chartData: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
  },
  {
    id: _mock.id(6),
    name: null,
    avatar: null,
    type: 'Expenses',
    message: '5665518',
    category: 'Sıcak',
    date: 1627556347676,
    status: 'in_progress',
    amount: 11.45,
    cash: '49.656.5',
    percent: 10,
    stockColor: '#BB2525',
    deviceName: 'Etimesgut',
    location: 'Ankara',
    chartData: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
  },
];
