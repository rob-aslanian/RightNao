const companyEmployee = {
  size_unknown: "Size Unknown",
  size_self_employed: "Self-employed",
  size_1_10_employees: "1-10 employees",
  size_11_50_employees: "11-50 employees",
  size_51_200_employees: "51-200 employees",
  size_201_500_employees: "201-500 employees ",
  size_501_1000_employees: "501-1000 employees",
  size_1001_5000_employees: "1001-5000 employees",
  size_5001_10000_employees: "5001-10,000 employees",
  size_10001_plus_employees: "10,001+ employees"
};

const companyType = {
  type_unknown:"Type Unknown",
  type_self_employed:"Self-employed",
  type_educational_institution:"Educational Institution",
  type_government_agency:"Government Agency",
  type_sole_proprietorship:"Sole Proprietorship",
  type_privately_held:"Privately Held",
  type_partnership:"Partnership",
  type_public_company:"Public company",
}

const companyParking = {
  parking_unknown: "Parking Unknown",
  parking_no_parking: "Parking No Parking",
  parking_street_parking: "Street Parking",
  parking_parking_lot: "Parking Lot"
};

type ComapnyType = 'type_unknown' | 'type_self_emplyed' | 'type_educational_institution' |
                   'type_government_agency' | 'type_sole_proprietorship' | 'type_privately_held' |
                   'type_partnership' | 'type_public_company';



export { companyEmployee, companyParking , companyType , ComapnyType };
