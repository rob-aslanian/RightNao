const DEALTYPE = {
    Category_Animals: [
        { name: 'Sell',  id: 'DealType_Sell' },
        { name: 'Give away & Adoption',  id: 'DealType_GiveAwayAdoption' },
        { name: 'Lost & Found', id: 'DealType_LostFound' },
        { name: 'Pets settings', id: 'DealType_PetsSettings' },
        { name: 'Pets Services', id: 'DealType_PetsService' },
    ],
    Category_Plants: [
        { name: 'Sell',  id: 'DealType_Sell' },
        { name: 'Give away & Adoption',      id: 'DealType_GiveAwayAdoption' }
    ],
    Category_FoodAccessories: [
        { name: 'Sell',  id: 'DealType_Sell' },
        { name: 'Give away & Adoption',    id: 'DealType_GiveAwayAdoption' }
    ],
    Category_Seeds: [
        { name: 'Sell',  id: 'DealType_Sell' },
        { name: 'Give away & adoption', id: 'DealType_GiveAwayAdoption' }
    ],
};						

export const GARDEN_SUPPLIES_TOOLS = [
    {
        id: 'GardenSupplies_Apparel',
        name: 'Apparel'
    },
    {
        id: 'GardenSupplies_BioDomeSeed',	
        name: 'Bio Dome Seed Starters & Indoor Growing'
    },
    {
        id: 'GardenSupplies_BirdsAndWildlife',
        name: 'Birds & Wildlife'
    },
    {
        id: 'GardenSupplies_Composting',
        name: 'Composting'
    },
    {
        id: 'GardenSupplies_Decor',
        name: 'Decor'
    },
    {
        id:   'GardenSupplies_DiseaseControl',
        name: 'Disease Control'
    },
    {
        id: 'GardenSupplies_FallCleanUp',
        name: 'Fall Clean Up'
    },
    {
        id: 'GardenSupplies_GardenSoils',
        name: 'Garden Soils'
    },
    {
        id: 'GardenSupplies_GardenSuppliesForChildren',
        name: 'Garden Supplies for Children'
    },
    {
        id: 'GardenSupplies_GardeningTools',
        name: 'Gardening Tools'
    },
    {
        id: 'GardenSupplies_GreenhousesPlantProtection',
        name: 'Greenhouses & Plant Protection'
    },
    {
        id: 'GardenSupplies_HomeCanning',
        name: 'Home Canning'
    },
    {
        id: 'GardenSupplies_IrrigationWatering',
        name: 'Irrigation/Watering'
    },
    {
        id: 'GardenSupplies_OrganicNaturalSupplies',
        name: 'Organic & Natural Supplies'
    },
    {
        id: 'GardenSupplies_PestDiseaseControl',
        name: 'Pest & Disease Control'
    },
    {
        id: 'GardenSupplies_PlantLabels',
        name: 'Plant Labels'
    },
    {
        id: 'GardenSupplies_PottingBenches',
        name: 'Potting Benches'
    },
    {
        id: 'GardenSupplies_RaisedGardenBeds',
        name: 'Raised Garden Beds'
    },
    {
        id: 'GardenSupplies_SeedPlantFertilizers',
        name: 'Seed & Plant Fertilizers'
    },
    {
        id: 'GardenSupplies_PlantersRaisedGardenBeds',
        name: 'Storage'
    },
    {
        id: 'GardenSupplies_Structures',
        name: 'Structures'
    },
    {
        id: 'GardenSupplies_SupportsStructures',
        name: 'Supports & Structures'
    },
    {
        id: 'GardenSupplies_Other',
        name: 'Other'
    }
];


export const SUB_CATEGORY = [
    {
        id: 'Food_SubCategory_FruitAndVegetableFertilizer',
        name: 'Fruit & Vegatable fertilizer'
    },
    {
        id: 'Food_Sub_Category_PlantAndVegetableFertilizer',
        name: 'Plant & Vegetable fertilizer'
    },
    {
        id: 'Food_Sub_Category_ShrubAndTreeFertilizer',
        name: 'shrub & Tree Fertilizer'
    }
];

const COMPONENTSMODEL = {
    Category_Animals: {
        DealType_Sell: ['AnimalCategoryComponent', 'BreedGenderComponent',
               'AgeComponent', 'ColorComponent', 'SizeComponent', 'LocationComponent', 
               'TransferedPetsComponent',  'PriceComponent' ],

        DealType_GiveAwayAdoption: ['AnimalCategoryComponent', 'BreedGenderComponent', 'AgeComponent', 'ColorComponent', 
                              'LocationComponent', 'TransferedPetsComponent' ],

        DealType_LostFound: ['AnimalCategoryComponent', 'BreedGenderComponent',  'ColorComponent', 
                             'SizeComponent', 'LocationComponent'],
        DealType_PetsSettings: [ 'AnimalCategoryComponent', 'LocationComponent', 'PriceComponent'  ],
        DealType_PetsService: [ 'AnimalCategoryComponent', 'PetsServiceComponent', 'LocationComponent', 'PriceComponent' ],
    },
    Category_Plants: {
        DealType_Sell: [ 'PlantTypeComponent', 'LightSeedsComponent', 'WaterSeedsComponent',
                                  'LandscapeUsedComponent', 'FlowersSeasonComponent', 'LocationComponent', 'PriceComponent' ],
        DealType_GiveAwayAdoption: [  'PlantTypeComponent', 'LightSeedsComponent', 'WaterSeedsComponent',
                                 'LandscapeUsedComponent', 'FlowersSeasonComponent', 'LocationComponent'],
    },
    Category_FoodAccessories: {
         DealType_Sell: {
            'FoodCategory_AnimalFood': [
                'LocationComponent', 'AnimalCategoryComponent', 'PriceComponent'
            ],
            'FoodCategory_AnimalAccessories': [
                 'LocationComponent', 'AnimalCategoryComponent', 'PriceComponent'
            ],
            'FoodCategory_GardenSuppliesAndTools': [
                'LocationComponent', 'GardenSuppliesComponent', 'PriceComponent'
            ],
            'FoodCategory_PlantFoodAndFertilizer': [
                'SubCategoryComponent', 'OrganicComponent', 
                'LocationComponent', 'PriceComponent'
            ] 
         },
         DealType_GiveAwayAdoption:   {
            'FoodCategory_AnimalFood': [
                'AnimalFoodComponent',
                'LocationComponent'
            ], 
            'FoodCategory_AnimalAccessories': [
                'AnimalAccessoriesComponent',
                'LocationComponent'
            ], 
            'FoodCategory_GardenSuppliesAndTools': [
                'GardenSuppliesComponent',
                'LocationComponent'
            ], 
            'FoodCategory_PlantFoodAndFertilizer': [
                'OrganicComponent',
                'OrganicCheckComponent',
                'LocationComponent'
            ]
         }
    },
    Category_Seeds: {
        DealType_Sell: [
            'SeedsCategoryComponent',
            'PlantingTimeComponent',
            'PriceComponent',
            'LocationComponent'
        ],
        DealType_GiveAwayAdoption: [
            'SeedsCategoryComponent',
            'PlantingTimeComponent',
            'LocationComponent'
        ]
    }
};

const CATEGORIES = [
    {
        id: 'FoodCategory_AnimalFood',
        name: 'Animal food'
    },
    {
        id: 'FoodCategory_AnimalAccessories',
        name: 'Animal accessories'
    },
    {
        id: 'FoodCategory_GardenSuppliesAndTools',
        name: 'Garden supplies & Tools'
    },
    {
        id: 'FoodCategory_PlantFoodAndFertilizer',
        name: 'Plant food & Fertilizer'
    }
];

const COLORS = [
    '#914706', '#000000', '#F5C9A3',
    '#5D3614', '#D68238', '#959595',
    '#707070', '#C2C2C2', '#FCFFD2', 
    '#D56D39', '#CCA168', '#AB7575'
];

const ANIMALS_SHARED = [
    {
        formControl: 'aniCtrl',
        func: 'animal_category'
    },
    {
        formControl: 'breedCtrl',
        func: 'breed'
    },
    {
        formControl: 'genderCtrl',
        func: 'gender'
    },
    {
        formControl: 'colorCtrl',
        func: 'color'
    },
    {
        formControl: 'sizeCtrl',
        func: 'size'
    }
];
 
const PLANTS_SHARED = [
    {
        formControl: 'petCtrl',
        func: 'plant_type'
    },
    {
        formControl: 'lightCtrl',
        func: 'light_need'
    },
    {
        formControl: 'waterCtrl',
        func: 'water_need'
    },
    {
        formControl: 'landCtrl',
        func: 'landscape_used'
    },
    {
        formControl: 'flowerCtrl',
        func: 'season'
    },
];

// isCommon
const FORMSMODEL = {
    Category_Animals: {
        'DealType_Sell': [
            ...ANIMALS_SHARED,
            {
                formControl: 'ageCtrl',
                func: 'age'
            },
            {
                formControl: 'day',
                func: 'age_type'
            },
            {
                formControl: 'transported',
                func: 'can_transported'
            },
            {
                formControl: 'price',
                isCommon: true
            },
        ],
        'DealType_GiveAwayAdoption':  [
            ...ANIMALS_SHARED,
            {
                formControl: 'ageCtrl',
                func: 'age'
            },
            {
                formControl: 'day',
                func: 'age_type'
            },
            {
                formControl: 'transported',
                func: 'can_transported'
            }
        ],
        'DealType_LostFound': ANIMALS_SHARED,
        'DealType_PetsSettings': [
            {
                formControl: 'aniCtrl',
                func: 'animal_category'
            },
            {
                formControl: 'price',
                isCommon: true
            },
        ],
        'DealType_PetsService': [
            {
                formControl: 'aniCtrl',
                func: 'animal_category'
            },
            {
                formControl: 'pet_serviceCtrl',
                func: 'pet_service'
            },
            {
                formControl: 'price',
                isCommon: true
            }
        ]
    },
    Category_Plants: {
        'DealType_Sell': [
            {
                formControl: 'price',
                isCommon: true
            },
            ...PLANTS_SHARED
        ],
        'DealType_GiveAwayAdoption': PLANTS_SHARED
    },
    Category_FoodAccessories: {
        DealType_Sell: {
            FoodCategory_AnimalFood: [
                {
                    formControl: 'aniCtrl',
                    func: 'animal_category'
                },
                {
                    formControl: 'price',
                    isCommon: true
                },
                {
                    formControl: 'foodCtrl',
                    func: 'food_category'
                }
            ],
            FoodCategory_AnimalAccessories: [
                {
                    formControl: 'aniCtrl',
                    func: 'animal_category'
                },
                {
                    formControl: 'price',
                    isCommon: true
                },
                {
                    formControl: 'foodCtrl',
                    func: 'food_category'
                }
            ],
            FoodCategory_GardenSuppliesAndTools: [
                {
                    formControl: 'price',
                    isCommon: true
                },
                {
                    formControl: 'gardenCtrl',
                    func: 'garden_supplies'
                },
                {
                    formControl: 'foodCtrl',
                    func: 'food_category'
                }
            ],
            FoodCategory_PlantFoodAndFertilizer: [
                {
                    formControl: 'price',
                    isCommon: true
                },
                {
                    formControl: 'subCtrl',
                    func: 'food_sub_category'
                },
                {
                    formControl: 'subCtrl',
                    func: 'food_sub_category'
                },
                {
                    formControl: 'isOrganicCtrl',
                    func: 'is_organic'
                },
                {
                    formControl: 'foodCtrl',
                    func: 'food_category'
                },
            ]
        },
        DealType_GiveAwayAdoption: {
            FoodCategory_AnimalFood: [
                {
                    formControl: 'foodCtrl',
                    func: 'food_category'
                },
            ],
            FoodCategory_AnimalAccessories: [
                {
                    formControl: 'foodCtrl',
                    func: 'food_category'
                }
            ],
            FoodCategory_GardenSuppliesAndTools: [
                {
                    formControl: 'gardenCtrl',
                    func: 'garden_supplies'
                },
                {
                    formControl: 'foodCtrl',
                    func: 'food_category'
                }
            ],
            FoodCategory_PlantFoodAndFertilizer: [
                {
                    formControl: 'organicCtrl',
                    func: 'organic'
                },
                {
                    formControl: 'isOrganicCtrl',
                    func: 'is_organic'
                },
                {
                    formControl: 'foodCtrl',
                    func: 'food_category'
                }
            ]
        }

    },
    Category_Seeds: {
        DealType_Sell: [
            {
                formControl: 'seedsCtrl',
                func: 'seeds_category'
            },
            {
                formControl: 'planting',
                func: 'planting_time'
            },
            {
                formControl: 'price',
                isCommon: true
            }
        ],
        DealType_GiveAwayAdoption: [
            {
                formControl: 'seedsCtrl',
                func: 'seeds_category'
            },
            {
                formControl: 'planting',
                func: 'planting_time'
            }
        ]
    }
};

export {
    COMPONENTSMODEL,
    DEALTYPE,
    COLORS,
    CATEGORIES,
    FORMSMODEL
};