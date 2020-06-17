export const dealType = {
    DealType_Sell: [
        { name: 'New homes',  id: 'PropertyType_NewHomes' },
        { name: 'House',      id: 'PropertyType_Houses' },
        { name: 'Homes',      id: 'PropertyType_Homes' },
        { name: 'Apartments', id: 'PropertyType_Appartments' },
        { name: 'Garages',    id: 'PropertyType_Garages' },
        { name: 'Storage rooms',  id: 'PropertyType_StorageRooms' },
        { name: 'Offices',  id: 'PropertyType_Offices' },
        { name: 'Commercial property',  id: 'PropertyType_CommercialProperties' },
        { name: 'Buildings',  id: 'PropertyType_Buildings' },
        { name: 'Land',  id: 'PropertyType_Land' },
        { name: 'Summer cottage',  id: 'PropertyType_SummerCottage' },
        { name: 'Rural / Farm',  id: 'PropertyType_RuralFarm' },
    ],
    DealType_Rent: [
        { name: 'New homes',  id: 'PropertyType_NewHomes' },
        { name: 'House',      id: 'PropertyType_Houses' },
        { name: 'Homes',      id: 'PropertyType_Homes' },
        { name: 'Apartments', id: 'PropertyType_Appartments' },
        { name: 'Hotel room',    id: 'PropertyType_HotelRoom' },
        { name: 'Garages',    id: 'PropertyType_Garages' },
        { name: 'Storage rooms',  id: 'PropertyType_StorageRooms' },
        { name: 'Offices',  id: 'PropertyType_Offices' },
        { name: 'Commercial property',  id: 'PropertyType_CommercialProperties' },
        { name: 'Buildings',  id: 'PropertyType_Buildings' },
        { name: 'Land',  id: 'PropertyType_Land' },
        { name: 'Summer cottage',  id: 'PropertyType_SummerCottage' },
        { name: 'Rural / Farm',  id: 'PropertyType_RuralFarm' },
    ],
    DealType_Lease: [
        { name: 'New homes',  id: 'PropertyType_NewHomes' },
        { name: 'House',      id: 'PropertyType_Houses' },
        { name: 'Apartments', id: 'PropertyType_Appartments' },
        { name: 'Garages',    id: 'PropertyType_Garages' },
        { name: 'Storage rooms',  id: 'PropertyType_StorageRooms' },
        { name: 'Offices',  id: 'PropertyType_Offices' },
        { name: 'Commercial property',  id: 'PropertyType_CommercialProperties' },
        { name: 'Buildings',  id: 'PropertyType_Buildings' },
        { name: 'Land',  id: 'PropertyType_Land' },
        { name: 'Summer cottage',  id: 'PropertyType_SummerCottage' },
        { name: 'Rural / Farm',  id: 'PropertyType_RuralFarm' },
    ],
    DealType_Share: [
        { name: 'House',      id: 'PropertyType_Houses' },
        { name: 'Apartments', id: 'PropertyType_Appartments' },
        { name: 'Garages',    id: 'PropertyType_Garages' },
        { name: 'Storage rooms',  id: 'PropertyType_StorageRooms' },
        { name: 'Offices',  id: 'PropertyType_Offices' },
        { name: 'Commercial property',  id: 'PropertyType_CommercialProperties' },
        { name: 'Buildings',  id: 'PropertyType_Buildings' },
        { name: 'Land',  id: 'PropertyType_Land' },
        { name: 'Summer cottage',  id: 'PropertyType_SummerCottage' },
    ],

};

const status = [
    {    
        name: "Old build",
        id: "Status_OldBuild",
        checked: false
    } ,
    {
        name: "New building",
        id: "Status_NewBuilding",
        checked: false

    } ,
    {
        name: "Under construction",
        id: "Status_UnderConstruction",
        checked: false
    } 
        ];

const outdoor_features = [
    {
        name: "Swimming pool",
        id: "OutdoorFeatures_SwimmingPool",   
        checked: false 
    },
    {
        name: "Undercover parking",
        id: "OutdoorFeatures_UndercoverParking",  
        checked: false           
    },
    {
        name: "Tennis court",
        id: "OutdoorFeatures_TennisCourt", 
        checked: false 
    },
    {
        name: "Balocony",
        id: "OutdoorFeatures_Balcony",
        checked: false 
    },
    {
        name: "Full fenched",
        id: "OutdoorFeatures_FullyFenced", 
        checked: false 
    },
    {
        name: "Outdoor are",
        id: "OutdoorFeatures_OutdoorArea",    
        checked: false 
    },
    {
        name: "Shed",
        id: "OutdoorFeatures_Shed",    
        checked: false 
    },
    {
        name: "Garage",
        id: "OutdoorFeatures_Garage",  
        checked: false 
    },
    {
        name: "Garden",
        id: "OutdoorFeatures_Garden",  
        checked: false 
    },
    {
        name: "Outdoor spa",
        id: "OutdoorFeatures_OutdoorSpa",  
        checked: false 
    },
  ];

const indoor_features = [
    {
        name: "Ensuite",
        id: "IndoorFeatures_Ensuit",    
        checked: false
    },
    {
        name: "Floorboards",
        id: "IndoorFeatures_Floorboards",    
        checked: false

    },
    {
        name: "Built in robes",
        id: "IndoorFeatures_BuiltInRobes",    
        checked: false

    },
    {
        name: "Workshop",
        id: "IndoorFeatures_Workshop", 
        checked: false

    },
    {
        name: "Study",
        id: "IndoorFeatures_Study",  
        checked: false

    },
    {
        name: "Rumpus room",
        id: "IndoorFeatures_RumpusRoom",    
        checked: false

    },
    {
        name: "Broadband",
        id: "IndoorFeatures_Broadband",    
        checked: false

    },
    {
        name: "Alarm system",
        id: "IndoorFeatures_AlarmSystem",    
        checked: false

    },
    {
        name: "Dishwasher",
        id: "IndoorFeatures_Dishwasher",  
        checked: false

    },
    {
        name: "Gym",
        id: "IndoorFeatures_Gym",    
        checked: false

    },
    {
        name: "Storage room",
        id: "IndoorFeatures_StorageRoom",    
        checked: false

    },
    {
        name: "Lift",
        id: "IndoorFeatures_Lift",    
        checked: false

    },
  ];

const climat_control = [
    {
        name: "Air conditioning",
        id: "ClimatControl_AirConditioning",    
        checked: false
    },
    {
        name: "Water tank",
        id: "ClimatControl_WaterTank", 
        checked: false

    },
    {
        name: "Hight energy efficiency",
        id: "ClimatControl_HighEnergyEfficiency",    
        checked: false

    },
    {
        name: "Heating",
        id: "ClimatControl_Hearting",    
        checked: false

    },
    {
        name: "Solar panels",
        id: "ClimatControl_SolarPanels",    
        checked: false

    },
    {
        name: "Solar hot water",
        id: "ClimatControlSolarHotWater",    
        checked: false

    },
    {
        name: "Zone heating",
        id: "ClimatControl_ZonalHeating",    
        checked: false

    },
    {
        name: "Central Heating",
        id: "ClimatControl_CentralHeating",    
        checked: false

    },
  ];

const type_of_property = [
    {
        name: "Apartaments",
        id: "TypeOfProperty_Appartaments",  
        checked: false   
    },
    {
        name: "Country homes",
        id: "TypeOfProperty_CountryHomes",    
        checked: false   

    },
    {
        name: "Penthouses",
        id: "TypeOfProperty_Penthouses",  
        checked: false   

    },
    {
        name: "Houeses",
        id: "TypeOfProperty_Houses",   
        checked: false   

    },
    {
        name: "Duplex",
        id: "TypeOfProperty_Duplex",    
        checked: false   

    },
    {
        name: "bungalow",
        id: "TypeOfProperty_Bungalow",    
        checked: false   

    }
  ];

const  information = [
    {
        name: "Published by agents only",
        id: "By_agents_only"
    },
    {
        name: "Published by users",
        id: "By_users"
    },
   
  ]

const addational_filters = [
    {
        name: "Motobike garage",
        id: "Additional_Filter_MotoBikeGarage",
        checked: false
    },
    {
        name: "Automatic door",
        id: "Additional_Filter_AutomaticDoor",
        checked: false
    },
    { 
        name: "Security system and guards",
        id: "Additional_Filter_SecuritySystem",
        checked: false
    }
]
 
const layout = [
    {
        name: "Indifferent",
        id: "Layout_Indifferent"
    },
    {
        name: "Open plan",
        id: "Layout_OpenPlan"
    },
    { 
        name: "Walls",
        id: "Layout_Walls"
    }
];

const building_use = [
    {
        name: "Indifferent",
        id: "Building_Use_Indifferent"
    },
    {
        name: "Only office",
        id: "Building_Use_OnlyOffice"
    },
    { 
        name: "Mixed use",
        id: "Building_Use_Mixed"
    }
]

const  commerical_propery = [
    {
        name: "office space",
        id: "CommericalProperty_OfficeSpace",
        checked: false
    },
    {
       name: "Warehouse",
       id: "CommericalProperty_Warehouse",
       checked: false

    },
    {
       name: "Basement",
       id: "CommericalProperty_Basement",
       checked: false

    },
    {
       name: "Garage",
       id: "CommericalProperty_Garage",
       checked: false

    },
    {
       name: "Commercial premises",
       id: "CommericalProperty_CommercialPremises",
       checked: false

    },
    {
       name: "Food facility",
       id: "CommericalProperty_FoodFacility",
       checked: false

    },
    {
       name: "Tranding place",
       id: "CommericalProperty_TradingPlace",
       checked: false

    },
    {
       name: "Industrial building",
       id: "CommericalProperty_IndustrialBuilding",
       checked: false

    },
];

const commercial_location =   [
    {
        name: "Indifferent",
        id: "CommericalPropertyLocation_Indifferent",
        checked: false
    },
    {
       name: "On street level",
       id: "CommericalPropertyLocation_Garage",
       checked: false

    },
    {
       name: "Below ground",
       id: "Below_ground",
       checked: false

    },
    {
       name: "in a shopping center",
       id: "CommericalPropertyLocation_InShoppingCentre",
       checked: false

    },
    {
       name: "Below ground",
       id: "CommericalPropertyLocation_BelowGround",
       checked: false

    },
    {
       name: "in a shopping center",
       id: "in_a_shopping_center",
       checked: false

    },
    {
       name: "Mezzanine",
       id: "CommericalPropertyLocation_Mezzanine",
       checked: false

    },
    {
       name: "Other",
       id: "CommericalPropertyLocation_Other",
       checked: false

    },
    {
        name: "Garage",
        id: "Garage",
        checked: false

     },
];

const  land =  [
    {
        name: "Developed",
        id: "StatusDeveloped",
        checked: false
    },
    {
        name: "Buildable",
        id: "Status_Buildable",
        checked: false
    },
    {
        name: "Non building",
        id: "Status_NonBuilding",
        checked: false
    },
    {
        name: "Old  building",
        id: "Status_OldBuild",
        checked: false
    },
    {
        name: "New  building",
        id: "Status_NewBuilding",
        checked: false
    },
    {
        name: "Under Construction",
        id: "Status_UnderConstruction",
        checked: false
    },
 ];

const  more =  [
    {
        name: "Elelctricity",
        id: "Additional_Filter_Electricity",
        checked: false
    },
    {
        name: "Water",
        id: "Additional_Filter_Water",
        checked: false

    },
    {
        name: "Natural gas",
        id: "Additional_Filter_NaturalGas",
        checked: false

    },
    {
        name: "Sewage",
        id: "Additional_Filter_Sewage",
        checked: false

    },
 ];

const  rural_type =  [
    {
        id: "PropertyType_Houses",
        name: "House",
        checked: false
    },
    {
      id: "PropertyType_CommercialProperties",
      name: "Commercial property",
      checked: false
    },
    {
      id: "PropertyType_BareLand",
      name: "Bare land",
      checked: false
    },
    {
      id: "PropertyType_Appartments",
      name: "Apartment",
      checked: false
    },
    {
      id: "PropertyType_Land",
      name: "Land",
      checked: false
    },
    {
      id: "PropertyType_Barn",
      name: "Barn",
      checked: false
    },

];

const rural_addationial = [
     {
        id: "Additional_Filter_SwimmingPool",
        name: "Swimming pool",
        checked: false
      },
      {
        id: "Additional_Filter_Outbuildings",
        name: "Outbuildings",
        checked: false
      },
 ];

const addational_filters_commerical =  [
    {
        id: 'Additional_Filter_AireConditioning',
        name: 'Air conditioning',
        checked: false
    },
    {
       id: 'Additional_Filter_Heating',
       name: 'Heating',
       checked: false
    },  
    {
        id: 'Additional_Filter_OnCorner',
        name: 'On a corner',
        checked: false
    },
    {
       id: 'Additional_Filter_SmokeExtractor',
       name: 'Smoke extractor',
       checked: false
    },

];

const who_will_live =  [
    {
        id: 'WhoLive_Mortgagor',
        name: 'The mortgagor',
        checked: false
    },
    {
        id: 'WhoLive_Owner',
        name: 'The owner',
        checked: false
    }
];

const layot = [
    {
       name: 'Open plan',
       id: 'Layout_OpenPlan'
    },
    {
        name: 'Walls',
        id: 'Layout_Walls'
     }
];
 

const PropertyType_Garages = { addational_filters, layot, building_use },
      PropertyType_Offices = { layout, building_use, status },
      PropertyType_CommercialProperties = { commerical_propery, commercial_location, addational_filters_commerical, status },
      PropertyType_Buildings = { status },
      PropertyType_Land = {  land, more },
      PropertyType_RuralFarm = { rural_type, rural_addationial },
         // Includes
        //PropertyType_Appartments
       // Storage Rooms
      PropertyType_NewHomes = { type_of_property, outdoor_features, 
          indoor_features, climat_control }; 


const propertTypes = {
    PropertyType_Garages,
    PropertyType_Offices,
    PropertyType_Buildings,
    PropertyType_Land,
    PropertyType_RuralFarm,
    PropertyType_NewHomes,
};
 
      
const components = {
      PropertyType_NewHomes: 'NewHomeFormComponent',
      PropertyType_Houses: 'NewHomeFormComponent',
      PropertyType_Homes: 'NewHomeFormComponent',
      PropertyType_Appartments: 'NewHomeFormComponent',
      PropertyType_Garages: 'GaragesFormComponent',
      PropertyType_StorageRooms: 'BuildingsFormComponent',
      PropertyType_Offices: 'OfficesFormComponent' ,
      PropertyType_CommercialProperties: 'CommericalFormComponent' ,
      PropertyType_Buildings: 'BuildingsFormComponent',
      PropertyType_Land: 'TypeOfLandComponent' ,
      PropertyType_SummerCottage: 'NewHomeFormComponent' ,
      PropertyType_RuralFarm: 'RuralFormComponent',
      PropertyType_HotelRoom: 'HotelRoomFormComponent'
};

const select_materials = [
    {
        id: 'Material_Lumber_Composites',
        name: 'Lumber & Composites',
        checked: false
    },
    {
        id: 'Material_Fencing',
        name: 'Fencing',
        checked: false

    },
    {
        id: 'Material_Decking',
        name: 'Decking',
        checked: false

    },
    {
        id: 'Material_Fastners',
        name: 'Fasteners',
        checked: false
    },
    {
        id: 'Material_Moulding_Millwork',
        name: 'Moulding & Millwork',
        checked: false
    },
    {
        id: 'Material_Paint',
        name: 'Paint',
        checked: false
    },
    {
        id: 'Material_Drywall',
        name: 'Drywall',
        checked: false
    },
    {
        id: 'Material_Doors_Windows',
        name: 'Doors & Windows',
        checked: false
    },
    {
        id: 'Material_Roofing_Gutters',
        name: 'Roofing & Gutters'
    },
    {
        id: 'Material_Ladders',
        name: 'Ladders'
    },
    {
        id: 'Material_Scaffolding',
        name: 'Scaffolding'
    },
    {
        id: 'Material_Plumbing',
        name: 'Plumbing'
    },
    {
        id: 'Material_Siding',
        name: 'Siding'
    },
    {
        id: 'Material_Insulation',
        name: 'Insulation'
    },
    {
        id: 'Material_Ceilings',
        name: 'Ceilings'
    },
    {
        id: 'Material_Wall_Paneling',
        name: 'Wall Paneling'
    },
    {
        id: 'Material_Flooring',
        name: 'Floring'
    },
    {
        id: 'Material_Concrete_Cement_Masonry',
        name: 'Concrete, Cement & Masonry'
    },
    {
        id: 'Material_Material_Handling_Equipment',
        name: 'Material Handling Equipment'
    },
    {
        id: 'Material_Building_Hardware',
        name: 'Building Hardware'
    },
    {
        id: 'Material_Glass_and_Plastic_Sheets',
        name: 'Glass and Plastic Sheets'
    },
    {
        id: 'Material_Heating_venting_Cooling',
        name: 'Heating, venting & Cooling'
    }
];

const move_location = [
    {
        name: "local",
        id: "Location_Local",
        checked: false
    },
    {
        name: "International",
        id: "Location_International",
        checked: false
    }
];
 
const deal_type = {
    DealType_Rent: 'Rent',
    DealType_Sell: 'Sell',
    DealType_Share: 'Share',
    DealType_Lease: 'Lease',
    DealType_Build:  'Build',
    DealType_Materials: 'Materials',
    DealType_Renovation: 'Renovation', 
    DealType_Move: 'Move',
};

 
const select_services = [
    {
        id: 'Service_Auto_Transport',
        name: 'Auto Transport',
        checked: false
    },
    {
        id: 'Service_Storage',
        name: 'Storage',
        checked: false

    },
    {
        id: 'Service_Moving_Supplies',
        name: 'Moving Supplies',
        checked: false
    },
    {
        id: 'Service_Furniture_Movers',
        name: 'Firmotire Movers',
        checked: false
    },
];

export const timing = [
    {
        id: 'Timing_Flexible',
        name: 'Timing is flexible',
        checked: false
    },{
        id: 'Timing_6Months',
        name: 'Withing a yeard',
        checked: false
    },{
        id: 'Timing_Year',
        name: 'More than one year',
        checked: false
    },
];


const PROPERTIES = [
    { name: 'New homes',  key: 'PropertyType_NewHomes' },
    { name: 'House',      key: 'PropertyType_Houses' },
    { name: 'Homes',      key: 'PropertyType_Homes' },
    { name: 'Apartments', key: 'PropertyType_Appartments' },
    { name: 'Garages',    key: 'PropertyType_Garages' },
    { name: 'Storage rooms',  key: 'PropertyType_StorageRooms' },
    { name: 'Offices',  key: 'PropertyType_Offices' },
    { name: 'Commercial property',  key: 'PropertyType_CommercialProperties' },
    { name: 'Buildings',  key: 'PropertyType_Buildings' },
    { name: 'Land',  key: 'PropertyType_Land' },
    { name: 'Summer cottage',  key: 'PropertyType_SummerCottage' },
    { name: 'Rural / Farm',  key: 'PropertyType_RuralFarm' },
];

const DEAL_TYPE_WITH_PROPERTIES = [
    {
        name:"Buy",
        key:"DealType_Any",
        properties:PROPERTIES,
    },
    {
        name:"Rent",
        key:"DealType_Rent",
        properties:PROPERTIES,
    },
    {
        name:"Sell",
        key:"DealType_Sell",
        properties:PROPERTIES,
    },
    {
        name:"Share",
        key:"DealType_Share",
        properties:PROPERTIES,
    },
    {
        name:"Lease",
        key:"DealType_Lease",
        properties:PROPERTIES,
    },
    {
        name:"Build",
        key:"DealType_Build",
    },
    {
        name:"Materials",
        key:"DealType_Materials",
    },
    {
        name:"Renovation",
        key:"DealType_Renovation",
    },
    {
        name:"Move",
        key:"DealType_Move",
    },
];


export { 
         PropertyType_NewHomes,
         PropertyType_Garages, 
         PropertyType_Offices, 
         PropertyType_CommercialProperties, 
         PropertyType_Buildings, 
         PropertyType_RuralFarm, 
         PropertyType_Land,
         components,
         deal_type,
         commerical_propery,
         status,
         information,
         move_location,
         select_materials,
         select_services,
         propertTypes,
         who_will_live,
         DEAL_TYPE_WITH_PROPERTIES
};

