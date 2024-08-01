export type CollateralPledgeData = {
  colName: string
  desc: string
  year: string
  ecmv: number
  fsv: number
  cov: number
  docType: string
  expDate: string
  chaNo: string
  ownership: string
}

export const collateralPledge: CollateralPledgeData[] = [
  {
    chaNo: '',
    colName: '',
    cov: 0,
    desc: '',
    docType: '',
    ecmv: 0,
    expDate: '',
    fsv: 0,
    ownership: '',
    year: '',
  },
  {
    chaNo: '',
    colName: '',
    cov: 0,
    desc: '',
    docType: '',
    ecmv: 0,
    expDate: '',
    fsv: 0,
    ownership: '',
    year: '',
  },
  {
    chaNo: '',
    colName: '',
    cov: 0,
    desc: '',
    docType: '',
    ecmv: 0,
    expDate: '',
    fsv: 0,
    ownership: '',
    year: '',
  },
  {
    chaNo: '',
    colName: '',
    cov: 0,
    desc: '',
    docType: '',
    ecmv: 0,
    expDate: '',
    fsv: 0,
    ownership: '',
    year: '',
  },
  {
    chaNo: '',
    colName: '',
    cov: 0,
    desc: '',
    docType: '',
    ecmv: 0,
    expDate: '',
    fsv: 0,
    ownership: '',
    year: '',
  },
  {
    chaNo: '',
    colName: '',
    cov: 0,
    desc: '',
    docType: '',
    ecmv: 0,
    expDate: '',
    fsv: 0,
    ownership: '',
    year: '',
  },
  {
    chaNo: '',
    colName: '',
    cov: 0,
    desc: '',
    docType: '',
    ecmv: 0,
    expDate: '',
    fsv: 0,
    ownership: '',
    year: '',
  },
]

export const calculateColTotal = (
  data: CollateralPledgeData[],
  item: keyof Pick<CollateralPledgeData, 'cov' | 'ecmv' | 'fsv'>,
  { start, end }: { start: number; end: number }
) => {
  if (start > end) {
    return 0
  }

  if (end > data.length) {
    return 0
  }

  let total = 0
  const sliced = data.slice(start, end + 1)
  for (let i = 0; i < sliced.length; i++) {
    total += sliced[i][item]
  }

  return total
}

export type CompleteCollateralData = {
  table: CollateralPledgeData[]
  loanAmount: number
  cashCollateral: number
  stock: number
}

export const compileCollateralData = (
  data: CollateralPledgeData[],
  loanAmount: number,
  cashCollateral: number,
  stock: number
): CompleteCollateralData => {
  return {
    table: data,
    loanAmount,
    cashCollateral,
    stock,
  }
}
