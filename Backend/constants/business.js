export const RESTAURANT_NAME = 'Foodly Signature Kitchen';

export const BRANCHES = [
  {
    code: 'gulshan',
    name: 'Gulshan Branch',
    freeDeliveryThreshold: 900,
    deliveryCharge: 60,
    estimatedDeliveryMinutes: 40
  },
  {
    code: 'dhanmondi',
    name: 'Dhanmondi Branch',
    freeDeliveryThreshold: 800,
    deliveryCharge: 50,
    estimatedDeliveryMinutes: 35
  },
  {
    code: 'uttara',
    name: 'Uttara Branch',
    freeDeliveryThreshold: 700,
    deliveryCharge: 45,
    estimatedDeliveryMinutes: 30
  }
];

export const DEFAULT_BRANCH_CODE = BRANCHES[0].code;

export const PAYMENT_METHODS = ['cash_on_delivery'];

export const SERVICE_CHARGE_RATE = 0.05;
export const VAT_RATE = 0.05;

export const getBranchByCode = (branchCode) => BRANCHES.find((branch) => branch.code === branchCode);
