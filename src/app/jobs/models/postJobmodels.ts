export const PlanPrices = {
  basic: {
    name: "Basic",
    subName: "S",
    priority: 6,
    days: 15
  },
  start: {
    name: "Start",
    subName: "S",
    priority: 6,
    days: 15
  },
  standard: {
    name: "Standard",
    subName: "S+",
    priority: 5,
    days: 30
  },
  professional: {
    name: "Professional",
    subName: "Pro",
    priority: 4,
    days: 30
  },
  professionalPlus: {
    name: "Professional+",
    subName: "Pro+",
    priority: 3,
    days: 30
  },
  exclusive: {
    name: "Exclusive",
    subName: "Exc",
    priority: 2,
    days: 30
  },
  premium: {
    name: "Premium",
    subName: "Pre",
    priority: 1,
    days: 30
  }
};


export const JobMetaDays = [
  {
    name:"15 days",
    days:15,
  },
  {
    name:"30 days",
    days:30,
  },
  {
    name:"60 days",
    days:60,
  },
  {
    name:"Select months",
    select:[
      {
        name:"3 month",
        days:90,
      },
      {
        name:"4 month",
        days:120,
      },
      {
        name:"5 month",
        days:150,
      },
      {
        name:"6 month",
        days:180,
      },
      {
        name:"7 month",
        days:210,
      },
      {
        name:"8 month",
        days:240,
      },
      {
        name:"9 month",
        days:270,
      },
      {
        name:"10 month",
        days:300,
      },
      {
        name:"11 month",
        days:330,
      },
      {
        name:"1 year",
        days:360,
      },
    ]
  }
]




export const Renewal = [0, 1, 2, 3, 4];
export const Languages = [1, 2, 3, 4, 5];

export const SalaryInterval = [
  {
    id: "Any"
  },
  {
    id: "Monthly"
  },
  {
    id: "Hourly"
  },
  {
    id: "Annual"
  }
];


export const JobBenefits = [
  { 
    id: "labor_agreement", 
    name: "836", 
    icon:"assets/img/benefits/401.svg",
    is_selected: false 
  },
  { 
    id: "remote_working",
    name: "1182", 
    is_selected: false, 
    icon:"assets/img/benefits/402.svg",
  },
  { 
    id: "floater", 
    name: "627", 
    is_selected: false,
    icon:"assets/img/benefits/403.svg",
  },
  { 
    id: "paid_timeoff", 
    name: "1025", 
    is_selected: false,
    icon:"assets/img/benefits/404.svg", 
  },
  {
    id: "flexible_working_hours",
    name: "626",
    is_selected: false,
    icon:"assets/img/benefits/405.svg",
  },
  { 
    id: "additional_timeoff", 
    name: "114", 
    is_selected: false,
    icon:"assets/img/benefits/406.svg", 
  },
  {
    id: "additional_parental_leave",
    name: "113",
    is_selected: false,
    icon:"assets/img/benefits/407.svg",
  },
  {
    id: "other",
    name: "113",
    is_selected: false,
    icon:"assets/img/benefits/407.svg",
  },
  {
    id: "sick_leave_for_family_members",
    name: "1313",
    is_selected: false,
    icon:"assets/img/benefits/408.svg",
  },
  { 
    id: "company_daycare", 
    name: "343", 
    is_selected: false,
    icon:"assets/img/benefits/409.svg",
   },
  { 
    id: "sport_facilities",
     name: "1340", 
     is_selected: false,
     icon:"assets/img/benefits/410.svg", 
  },
  {
    id: "access_for_handicapped_persons",
    name: "37",
    is_selected: false,
    icon:"assets/img/benefits/412.svg", 
  },
  { 
    id: "employee_parking", 
    name: "514", 
    is_selected: false,
    icon:"assets/img/benefits/413.svg",  
  },

  { 
    id: "shuttle_service", 
    name: "1312", 
    is_selected: false,
    icon:"assets/img/benefits/414.svg",  
  },
  {
    id: "multiple_work_spaces",
    name: "934",
    is_selected: false,
    icon:"assets/img/benefits/415.svg", 
  },
  { 
    id: "corporate_events", 
    name: "386", 
    is_selected: false,
    icon:"assets/img/benefits/416.svg",  
  },
  {
    id: "trainig_and_development",
    name: "1432",
    is_selected: false,
    icon:"assets/img/benefits/417.svg", 
  },
  { 
    id: "pets_allowed", 
    name: "1058", 
    is_selected: false,
    icon:"assets/img/benefits/418.svg", 
  },
  {
    id: "corporate_medical_staff",
    name: "388",
    is_selected: false,
    icon:"assets/img/benefits/419.svg", 
  },
  { 
    id: "game_consoles", 
    name: "657", 
    is_selected: false,
    icon:"assets/img/benefits/420.svg",  
  },
  {
    id: "snack_and_drink_selfservice",
    name: "1327",
    is_selected: false,
    icon:"assets/img/benefits/421.svg", 
  },
  {
    id: "private_pension_scheme",
    name: "1103",
    is_selected: false,
    icon:"assets/img/benefits/422.svg", 
  },
  { 
    id: "health_insurance", 
    name: "705", 
    is_selected: false,
    icon:"assets/img/benefits/423.svg",  
  },
  { 
    id: "dental_care", 
    name: "459", 
    is_selected: false,
    icon:"assets/img/benefits/424.svg",  
  },
  { 
    id: "car_insurance", 
    name: "291", 
    is_selected: false,
    icon:"assets/img/benefits/425.svg",  
  },
  { 
    id: "relocation_package", 
    name: "1178", 
    is_selected: false,
    icon:"assets/img/benefits/657.svg",
  },
  { 
    id: "tution_fees", 
    name: "1440", 
    is_selected: false,
    icon:"assets/img/benefits/426.svg",  
  },
  {
    id: "permfomance_related_bonus",
    name: "1048",
    is_selected: false,
    icon:"assets/img/benefits/427.svg", 
  },
  { 
    id: "stock_options", 
    name: "1359", 
    is_selected: false,
    icon:"assets/img/benefits/428.svg",  
  },
  {
    id: "profit_earning_bonus",
    name: "1115",
    is_selected: false,
    icon:"assets/img/benefits/429.svg", 
  },
  {
    id: "additional_months_salary",
    name: "112",
    is_selected: false,
    icon:"assets/img/benefits/430.svg", 
  },
  {
    id: "employers_matching_contributions",
    name: "516",
    is_selected: false,
    icon:"assets/img/benefits/431.svg", 
  },
  { 
    id: "parental_bonus", 
    name: "1026", 
    is_selected: false,
    icon:"assets/img/benefits/432.svg",  
  },
  { 
    id: "tax_deductions", 
    name: "1384", 
    is_selected: false,
    icon:"assets/img/benefits/433.svg",  
  },
  { 
    id: "language_courses", 
    name: "839", 
    is_selected: false,
    icon:"assets/img/benefits/434.svg",  
  },
  { 
    id: "company_car", 
    name: "342", 
    is_selected: false,
    icon:"assets/img/benefits/435.svg",  
  },
  { 
    id: "laptop", 
    name: "843", 
    is_selected: false,
    icon:"assets/img/benefits/436.svg",  
  },
  {
    id: "discounts_on_company_products_and_services",
    name: "470",
    is_selected: false,
    icon:"assets/img/benefits/437.svg", 
  },
  { 
    id: "holiday_vouchers", 
    name: "714", 
    is_selected: false,
    icon:"assets/img/benefits/438.svg",  
  },
  { 
    id: "restraunt_vouchers", 
    name: "1204", 
    is_selected: false,
    icon:"assets/img/benefits/439.svg",  
  },
  { 
    id: "corporate_housing", 
    name: "387", 
    is_selected: false,
    icon:"assets/img/benefits/440.svg",  
  },
  { 
    id: "mobile_phone", 
    name: "923", 
    is_selected: false,
    icon:"assets/img/benefits/441.svg",  
  },
  { 
    id: "gift_vouchers", 
    name: "681", 
    is_selected: false,
    icon:"assets/img/benefits/442.svg", 
  },
  {
    id: "cultural_or_sporting_activites",
    name: "418",
    is_selected: false,
    icon:"assets/img/benefits/443.svg",
  },
  {
    id: "employee_service_vouchers",
    name: "515",
    is_selected: false,
    icon:"assets/img/benefits/444.svg",
  },
  {
    id: "corporate_credit_card",
    name: "385",
    is_selected: false,
    icon:"assets/img/benefits/445.svg",
  },

];


export const JobStatuses = [
  {
    name: "All"
  },
  {
    name: "Active"
  },
  {
    name: "Draft"
  },
  {
    name: "Paused"
  },
  {
    name: "Expired"
  }
];




export const JobFunctions = [
  {
    name: "Accounting",
    value:'accounting'
  },
  {
    name: "Administrative",
    value:'administrative'
  },
  {
    name: "Arts and Design",
    value:'arts_design',
  },
  {
    name: "Business Development",
    value:'business_development'                        
  },
  {
    name: "Community & Social Services",
    value:'community_social_services'
  },
  {
    name: "Consulting",
    value:'consulting',
  },
  {
    name: "Education",
    value:'education'
  },
  
  {
    name: "Engineering",
    value:'engineering'
  },
  {
    name: "Entrepreneurship",
    value:'entrepreneurship',
  },
  {
    name: "Finance",
    value:'finance'
  },
  {
    name: "Healthcare Services",
    value:'healthcare_services'
  },
  {
    name: "Human Resources",
    value:'human_resources',
  },
  {
    name: "Information Technology",
    value:'information_technology'
  },
  {
    name: "Legal",
    value:'legal'
  },
  {
    name: "Marketing",
    value:'marketing',
  },
  {
    name: "Media & Communications",
    value:'media_communications'
  },
  {
    name: "Military & Protective Services",
    value:'military_protective_services'
  },
  {
    name: "Operations",
    value:'operations',
  },
  {
    name: "Product Management",
    value:'product_management'
  },
  {
    name: "Program & Product Management",
    value:'program_product_management'
  },
  {
    name: "Purchasing",
    value:'purchasing',
  },
  {
    name: "Quality Assurance",
    value:'quality_assurance'
  },
  {
    name: "Real Estate",
    value:'real_estate'
  },
  {
    name: "Rersearch",
    value:'rersearch',
  },
  {
    name: "Sales",
    value:'sales'
  },
  {
    name: "Support",
    value:'support',
  },
]




export const JobHighlight = [
  {
    name: "Frame",
    value:'blue'
  },
  {
    name: "Frame",
    value:'white'
  },
  {
    name: "None",
    value:'none',
  },
];

export const JobLocationType = [
  {
    name: "On-site work",
    value:'On_Site_Work'
  },
  {
    name: "Remote",
    value:'Remote_only'
  },
];

export const JobAdditionalCompensation = [
  {
    name: "Bonus",
    value:'bonus'
  },
  {
    name: "Sales commission",
    value:'sales_commission'
  },
  {
    name: "Tips / Gratuities",
    value:'tips_gratuities',
  },
  {
    name: "Profit sharing",
    value:'profit_sharing',
  },
];

export const JobTravelRequirement = [
  {
    name: "All the time",
    value:'all_time',
  },
  {
    name: "At least once a week",
    value:'once_week',
  },
  {
    name: "At least once a month",
    value:'once_month',
  },
  {
    name: "A few times a year",
    value:'few_times',
  },
  {
    name: "Once in a few years",
    value:'once_year',
  },
];

export const JobSpecialOffers = [
    {
      name: "Travel",
      value:'travel'
    },
    {
      name: "Relocation Package",
      value:'relocation_package',
    },
];

export const JobSuitableFor = [
    {
      name: "Student",
      value:'student'
    },
    {
      name: "Person with a disability",
      value:'person_with_a_disability',
    },
    {
      name: "Single parent",
      value:'single_parent',
    },
];

export const JobSteppers = {
  1:`
    <p class="page-section-text-grey mt-4">
      Select the advertising plans that fits your needs
    </p>
    <p class="page-section-text-grey mb-0">
      Get premium placement to speed up the hiring process
    </p>
  `,
  2:`
  <p class="page-section-text-grey mt-4">
    Fill up job details and find right talent for your open position
  </p>
  <p class="page-section-text-grey mb-0">
      Our description template help you create the best post
  </p>
  `,
  3:`
  <p class="page-section-text-grey mt-4">
      Applicant Matching score (0% - 100%)
      is based on the required and 
      preferred qualifications. Include more 
      details such as experience level, skills, 
      languages and etc. 
  </p>`
  
}
  