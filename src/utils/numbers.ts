import BigNumber from 'bignumber.js';

export function numberWithCommas(x: string | number, decimals = false) {
  const number = Number(x);
  if (number < 1) {
    return x;
  }

  if (decimals) {
    return parseFloat(number.toString()).toLocaleString('el-GR');
  } else {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

export function preventExponetialNotation(x: number | string) {
  return ('' + +x).replace(
    /(-?)(\d*)\.?(\d*)e([+-]\d+)/,
    function (a, b, c, d, e) {
      return e < 0
        ? b + '0.' + Array(1 - e - c.length).join('0') + c + d
        : b + c + d + Array(e - d.length + 1).join('0');
    }
  );
}

export const validatePercent = (value: string | number): boolean => {
  const number = Number(value);
  if (number < 0 || number > 100) {
    return false;
  }
  return true;
};

export function calculatePercentage(
  total: BigNumber,
  value: BigNumber
): BigNumber {
  if (total.isZero()) {
    throw new Error('Total must not be zero to avoid division by zero.');
  }
  return value.dividedBy(total).multipliedBy(100);
}

export function hexToBigNumber(hexString: string): bigint {
  // Remove any leading '0x' if present
  if (hexString.startsWith('0x')) {
    hexString = hexString.slice(2);
  }

  // Convert the hex string to a BigInt
  const bigNumber = BigInt('0x' + hexString);

  return bigNumber;
}

export function formatBigNumber(input: string | number | BigNumber): string {
  // Convertir el input a BigNumber
  const num = new BigNumber(input);

  // Definir los límites y los sufijos
  const thresholds = [
    { value: new BigNumber(1e12), suffix: 'T' }, // Trillones
    { value: new BigNumber(1e9), suffix: 'B' }, // Billones
    { value: new BigNumber(1e6), suffix: 'M' }, // Millones
    { value: new BigNumber(1e3), suffix: 'K' } // Miles
  ];

  // Buscar el sufijo adecuado
  for (let i = 0; i < thresholds.length; i++) {
    if (num.isGreaterThanOrEqualTo(thresholds[i].value)) {
      let formattedNumber = num.dividedBy(thresholds[i].value).toFixed(2); // Una decimal
      // Eliminar el decimal si es .0
      if (formattedNumber.endsWith('.0')) {
        formattedNumber = formattedNumber.slice(0, -2);
      }
      return `${formattedNumber} ${thresholds[i].suffix}`;
    }
  }

  // Si el número es menor que 1000, devolverlo tal cual
  return num.toString();
}

export const isValidNumber = (value: string) => {
  if (value === '') return false;
  if (value === '.') return false;

  const regex = /^[0-9]*\.?[0-9]*$/;
  return regex.test(value);
};
