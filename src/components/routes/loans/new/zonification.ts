const branches = {
  1: 'IDUMAGBO',
  2: 'IDUMOTA',
  3: 'EBUTE-METTA',
  4: 'MUSHIN',
  5: 'AGEGE',
  6: 'IKORODU',
  7: 'IKEJA',
  8: 'TRADE-FAIR',
  9: 'IKOTUN',
  10: 'SANGO',
}

const branchesArr = Object.values(branches)

const locations = {
  IKOTUN: 9,
  'AGEGE AP': 5,
  EGBEDA: 9,
  'IGANDO MARKET': 9,
  'IGANDO ROAD': 9,
  'IJEGUN BUS STOP': 9,
  'IJEGUN ROAD': 9,
  'JANKANDE GATE': 9,
  'AKOWONJO ROAD, EGBEDA': 9,
  'CEMENT, IKEJA ALONG': 5,
  DOPEMU: 5,
  ILOGBO: 10,
  COMMAND: 5,
  IJOKO: 10,
  'OGBA-AYO': 10,
  'AGEGE PEN-CINEMA': 5,
  OJODU: 5,
  'IFAKO-IJAYE': 5,
  'LADIPO MUSHIN': 4,
  TEJUOSHO: 3,
  'IYANA-IBA': 8,
  IJU: 5,
  'IKEJA COMPUTER VILLAGE': 7,
  SANGODETO: 0,
  MARYLAND: 7,
  SHOMOLU: 0,
  OBANIKORO: 0,
  'DALEKO MUSHIN': 4,
  'IDI-ORO MUSHIN': 4,
  'OGBA MARKET': 5,
  'OREGUN ROAD IKEJA': 7,
  ATAN: 10,
  'IDIMU ROAD': 9,
  'ISOLO ROAD': 4,
  'AMU MARKET MUSHIN': 4,
  'EBUTE-METTA': 3,
  YABA: 3,
  'LAGOS ISLAND': 1,
  AJAH: 1,
  LEKKI: 1,
  'LAGOS ISLAND (Idm)': 2,
  'AJAH (Idm)': 2,
  'LEKKI (Idm)': 2,
  IKORODU: 6,
  KETU: 6,
  'MILE 12': 6,
  'FESTAC TOWN': 8,
  'ALABA INTERNATIONAL': 8,
  'TRADE-FAIR': 8,
  'IYANA-IPAJA': 5,
  'ABULE-EGBA': 5,
  IJAYE: 5,
  SANGO: 5,
  'OJU-ORE': 5,
  OJOTA: 7,
  IKEJA: 7,
  BARIGA: 3,
  SURULERE: 3,
  'CELE EXPRESS': 4,
  'AGO PALACE': 0,
  EJIGBO: 4,
  ILUPEJU: 4,
  OSHODI: 4,
  BADAGRY: 5,
  ORILE: 8,
  'ODUNADE MARKET': 8,
  'OGBA COLLEGE ROAD': 5,
  'BERGER/OJODU': 5,
  'MOWE/IBAFO': 5,
  'AKUTE/LANBE': 5,
  OJUELEGBA: 3,
  'AIRPORT ROAD/AJAO': 4,
  APAPA: 1,
  AJEGUNLE: 1,
  'APAPA (Idm)': 2,
  'AJEGUNLE (Idm)': 2,
  IJORA: 3,
  'VICTORIAL ISALND/IKOYI (Idm)': 2,
  'VICTORIAL ISALND/IKOYI': 1,
  AYOBO: 5,
}
type Location = keyof typeof locations
const locationsArr = Object.keys(locations)

function getZoneNumber(value: string) {
  const x: Location = value as Location
  return locations[x]
}

const getZoneColor = (branchId: number, locationId: number) => {
  if (branchId === locationId) {
    return 'bg-green-600'
  }

  if (locationId - branchId === 1) {
    return 'bg-blue-600'
  }

  return 'bg-red-500'
}

export { branchesArr, locations, locationsArr, getZoneNumber, getZoneColor }
