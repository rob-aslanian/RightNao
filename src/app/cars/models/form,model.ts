import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";







export const MainComponents = {
    'CAR': [ 'CarsAddMainBrandComponent', 'CarsAddMainLocationComponent' ],
    'MOTOCYCLES': [ 'CarsAddMainBrandComponent', 'CarsAddMainLocationComponent' ],
    'MOTORHOME': [ 'CarsAddMainBrandComponent', 'CarsAddMainLocationComponent' ],
    'TRUCK': [ 'CarsAddMainBrandComponent', 'CarsAddMainLocationComponent']
}

const SharedComponents = [ 'CarsAddFormConditionComponent', 'CarsAddFormYearsComponent', 'CarsAddFormMileageComponent', 
                            'CarsAddFormTransmissionComponent', 'CarsAddFormPowerComponent', 'CarsAddFormFuelComponent',
                            'CarsAddFormColorComponent', 'CarsAddFormHistoryComponent',  'CarsAddFormOwnersComponent', 
                            'CarsAddFormTitleComponent',  'CarsAddFormFinanceComponent', 'CarsAddFormPriceComponent', 
                            'CarsAddFormPhoneComponent', 'CarsAddFormRepossessedComponent' ]

export const FormComponents = {
    'CAR': [ 'CarsAddFormConditionComponent', 'CarsAddFormYearsComponent', 'CarsAddFormMileageComponent', 'CarsAddFormTransmissionComponent',
                'CarsAddFormColorComponent', 'CarsAddFormBodyComponent', 'CarsAddFormFeaturesComponent', 'CarsAddFormLifeComponent',
                'CarsAddFormConditioningComponent', 'CarsAddFormDoorsComponent', 'CarsAddFormSeatsComponent',
                'CarsAddFormFuelComponent', 'CarsAddFormEngineComponent', 'CarsAddFormPowerComponent', 
                'CarsAddFormCylindersComponent', 'CarsAddFormConsumptionComponent', 'CarsAddFormHistoryComponent',
                'CarsAddFormOwnersComponent', 'CarsAddFormTitleComponent', 'CarsAddFormFinanceComponent',
                'CarsAddFormPriceComponent', 'CarsAddFormPhoneComponent', 'CarsAddFormRepossessedComponent' ],

    'MOTOCYCLES': [ 'CarsAddFormConditionComponent', 'CarsAddFormYearsComponent', 'CarsAddFormMileageComponent', 
                    'CarsAddFormTransmissionComponent','CarsAddFormColorComponent', 'CarsAddFormBodyComponent',
                    'CarsAddFormFeaturesComponent', 
                    'CarsAddFormFuelComponent', 'CarsAddFormPowerComponent', 'CarsAddFormCubicComponent',
                    'CarsAddFormHistoryComponent',  'CarsAddFormOwnersComponent', 'CarsAddFormTitleComponent',  
                    'CarsAddFormFinanceComponent', 'CarsAddFormPriceComponent', 'CarsAddFormPhoneComponent', 
                    'CarsAddFormRepossessedComponent' ],

    'MOTORHOME': [ 'CarsAddFormConditionComponent', 'CarsAddFormYearsComponent', 'CarsAddFormMileageComponent', 
                    'CarsAddFormTransmissionComponent', 'CarsAddFormColorComponent', 'CarsAddFormHomeTypeComponent',
                    'CarsAddFormConditioningComponent', 'CarsAddFormFeaturesComponent', 'CarsAddFormHistoryComponent','CarsAddFormOwnersComponent', 
                    'CarsAddFormTitleComponent', 'CarsAddFormFinanceComponent', 'CarsAddFormPriceComponent', 
                    'CarsAddFormPhoneComponent', 'CarsAddFormRepossessedComponent'  ],

    'BUS': [ 'CarsAddFormConditionComponent', 'CarsAddFormYearsComponent', 'CarsAddFormMileageComponent', 
            'CarsAddFormTransmissionComponent', 'CarsAddFormPowerComponent', 'CarsAddFormFuelComponent',
            'CarsAddFormColorComponent', 'CarsAddFormFeaturesComponent' ,'CarsAddFormSeatsComponent', 'CarsAddFormWeightComponent',
             'CarsAddFormHeightComponent', 'CarsAddFormHistoryComponent',  'CarsAddFormOwnersComponent', 
             'CarsAddFormTitleComponent',  'CarsAddFormFinanceComponent', 'CarsAddFormPriceComponent', 
             'CarsAddFormPhoneComponent', 'CarsAddFormRepossessedComponent' ],

    'CARAVAN': [ 'CarsAddFormConditionComponent', 'CarsAddFormYearsComponent', 'CarsAddFormMileageComponent', 
                'CarsAddFormTransmissionComponent', 'CarsAddFormPowerComponent', 'CarsAddFormFuelComponent',
                'CarsAddFormColorComponent', 'CarsAddFormFeaturesComponent', 'CarsAddFormBedstypeComponent',  'CarsAddFormSeatsComponent',
                'CarsAddFormHeightComponent', 'CarsAddFormWeightComponent', 'CarsAddFormBedsnumberComponent',
                'CarsAddFormHistoryComponent',  'CarsAddFormOwnersComponent', 'CarsAddFormTitleComponent',  
                'CarsAddFormFinanceComponent', 'CarsAddFormPriceComponent',  'CarsAddFormPhoneComponent', 
                'CarsAddFormRepossessedComponent' ],

    'CONTAINER': [ 'CarsAddFormConditionComponent', 'CarsAddFormYearsComponent', 'CarsAddFormMileageComponent', 
                    'CarsAddFormTransmissionComponent', 'CarsAddFormPowerComponent', 'CarsAddFormFuelComponent',
                    'CarsAddFormColorComponent', 'CarsAddFormLiftComponent',  'CarsAddFormCapacityComponent',
                    'CarsAddFormHistoryComponent',  'CarsAddFormOwnersComponent', 'CarsAddFormTitleComponent',  
                    'CarsAddFormFinanceComponent', 'CarsAddFormPriceComponent',  'CarsAddFormPhoneComponent', 
                    'CarsAddFormRepossessedComponent' ],

    'FORKLIFT': [ 'CarsAddFormConditionComponent', 'CarsAddFormYearsComponent', 'CarsAddFormMileageComponent', 
                    'CarsAddFormTransmissionComponent', 'CarsAddFormPowerComponent', 'CarsAddFormFuelComponent',
                    'CarsAddFormColorComponent', 'CarsAddFormHeightComponent', 'CarsAddFormLiftComponent',  'CarsAddFormCapacityComponent',
                    'CarsAddFormHistoryComponent',  'CarsAddFormOwnersComponent', 'CarsAddFormTitleComponent',  
                    'CarsAddFormFinanceComponent', 'CarsAddFormPriceComponent',  'CarsAddFormPhoneComponent', 
                    'CarsAddFormRepossessedComponent' ],
                    
    'PUBLIC_UTILITY': [ 'CarsAddFormConditionComponent', 'CarsAddFormYearsComponent', 'CarsAddFormMileageComponent', 
                        'CarsAddFormTransmissionComponent', 'CarsAddFormPowerComponent', 'CarsAddFormFuelComponent',
                        'CarsAddFormColorComponent', 'CarsAddFormWeightComponent',
                        'CarsAddFormHistoryComponent',  'CarsAddFormOwnersComponent', 'CarsAddFormTitleComponent',  
                        'CarsAddFormFinanceComponent', 'CarsAddFormPriceComponent',  'CarsAddFormPhoneComponent', 
                        'CarsAddFormRepossessedComponent' ],
    'SEMITRAILER': SharedComponents,
    'TRACTOR': SharedComponents,
    'TRUCK': SharedComponents,
    'TRAILER': SharedComponents,
    'VAN': SharedComponents,
    'AGRICULTURA': SharedComponents,
    'CONSTRUCTION': SharedComponents
}


export class CarsForm {
    form: FormGroup;

    constructor(
        public type
    ) {

    }

    public generateMainForm() {
        let sharedControls = {
            vehicleType: new FormControl('', Validators.required),
            brand: new FormControl('', Validators.required),
            model: new FormControl('', Validators.required),
            trim: new FormControl('', Validators.required),
            cityID: new FormControl('', Validators.required),
        }
        
        switch(this.type) {
            case 'TRUCK': {
                return new FormGroup({
                    ...sharedControls,
                    truckType: new FormControl()
                })
            }
            default: {
                return new FormGroup({
                    ...sharedControls
                })
            }
        }
    }

    public generateForm() {

        let sharedControls = {
            condition: new FormControl('', Validators.required),
            years: new FormControl(null, Validators.required),
            mileage: new FormControl('', Validators.required),
            mileageUnit: new FormControl('', Validators.required),
            transmission: new FormControl(),
            colour: new FormControl(),
            power: new FormControl(),
            powerUnit: new FormControl(),
            feature: new FormControl('', Validators.required),
            fuelType: new FormControl('', Validators.required),
            vehicleHistory: new FormControl('', Validators.required),
            ownersAmount: new FormControl('', Validators.required),
            title: new FormControl('', Validators.required),
            desciption: new FormControl('', Validators.required),
            price: new FormGroup({
                amount: new FormControl('', Validators.required),
                currency: new FormControl('Dollar', Validators.required)
            }),
            finance: new FormGroup({
                firstInstalment: new FormControl('', Validators.required),
                mth: new FormControl(null, Validators.required),
                currency: new FormControl('Dollar', Validators.required)
            }),
            phoneNumber: new FormArray([], Validators.required),
            isRepossessed: new FormControl(false),
            isDealer: new FormControl('', Validators.required),
        }

        switch(this.type){
            case "CAR": {
                return new FormGroup({
                    ...sharedControls,
                    bodyType: new FormControl(),
                    lifeStyle: new FormControl(),
                    airConditioning: new FormControl(),
                    doorsAmount: new FormControl(),
                    seatsAmount: new FormControl(),
                    engineSize: new FormControl(),
                    cylinders: new FormControl(),
                    fuelConsumtion: new FormControl()
                })
            }
            case 'MOTOCYCLES': {
                return new FormGroup({
                    ...sharedControls,
                    bodyType: new FormControl(),
                    capacity: new FormControl(),
                })
            }
            case 'MOTORHOME': {
                return new FormGroup({
                    ...sharedControls,
                    motorhomeType: new FormControl(),
                    airConditioning: new FormControl(),
                    vehicleLength: new FormControl(),
                    vehicleLengthUnit: new FormControl()

                })
            }
            case 'BUS': {
                return new FormGroup({
                    ...sharedControls,
                    vehicleWeight: new FormControl(),
                    vehicleWeightUnit: new FormControl(),
                    vehicleHeight: new FormControl(),
                    vehicleHeightUnit: new FormControl(),
                    seatsAmount: new FormControl()
                })
            }
            case 'CARAVAN': {
                return new FormGroup({
                    ...sharedControls,
                    vehicleWeight: new FormControl(),
                    vehicleWeightUnit: new FormControl(),
                    vehicleHeight: new FormControl(),
                    vehicleHeightUnit: new FormControl(),
                    typeOfBeds: new FormControl(),
                    numberOfBeds: new FormControl(),
                    seatsAmount: new FormControl()
                })
            }
            case 'CONTAINER': {
                return new FormGroup({
                    ...sharedControls,
                    vehicleLiftHeight: new FormControl(),
                    vehicleLiftHeightUnit: new FormControl(),
                    capacity: new FormControl(),
                    vehicleCapacityUnit: new FormControl()
                })
            }
            case 'FORKLIFT': {
                return new FormGroup({
                    ...sharedControls,
                    vehicleHeight: new FormControl(),
                    vehicleHeightUnit: new FormControl(),
                    vehicleLiftHeight: new FormControl(),
                    vehicleLiftHeightUnit: new FormControl(),
                    capacity: new FormControl(),
                    vehicleCapacityUnit: new FormControl()
                })
            }
            case 'PUBLIC_UTILITY': {
                return new FormGroup({
                    ...sharedControls,
                    vehicleWeight: new FormControl(),
                    vehicleWeightUnit: new FormControl()
                })
            }
            case 'SEMITRAILER': {
                return new FormGroup({
                    ...sharedControls
                })
            }
            case 'TRACTOR': {
                return new FormGroup({
                    ...sharedControls
                })
            }
            case 'TRAILER': {
                return new FormGroup({
                    ...sharedControls
                })
            }
            case 'TRUCK': {
                return new FormGroup({
                    ...sharedControls
                })
            }
            case 'VAN': {
                return new FormGroup({
                    ...sharedControls
                })
            }
            case 'AGRICULTURA': {
                return new FormGroup({
                    ...sharedControls
                })
            }
            case 'CONSTRUCTION': {
                return new FormGroup({
                    ...sharedControls
                })
            }
        }
    }
}